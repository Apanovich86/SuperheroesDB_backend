const db = require('../config/db.config.js');
const Hero = db.Hero;

exports.createHero = (req, res) => {
    let hero = {};

    try{
        hero.nickname = req.body.nickname;
        hero.real_name = req.body.real_name;
        hero.origin_description = req.body.origin_description;
        hero.superpowers = req.body.superpowers;
        hero.catch_phrase = req.body.catch_phrase;
        hero.images = req.body.images;

        Hero.create(hero,
            {attributes: ['id', 'nickname', 'real_name', 'origin_description', 'superpowers', 'catch_phrase', 'images']})
            .then(result => {
                res.status(200).json(result);
            });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.heroes = (req, res) => {
    try{
        Hero.findAll({attributes: ['id', 'nickname', 'real_name', 'origin_description', 'superpowers', 'catch_phrase', 'images']})
            .then(heroes => {
                res.status(200).json(heroes);
            })
    }catch(error) {

        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
    }
}

exports.pagination = (req, res) => {
    try{
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);

        const offset = page ? page * limit : 0;

        Hero.findAndCountAll({ limit: limit, offset:offset })
            .then(data => {
                const totalPages = Math.ceil(data.count / limit);
                const response = {
                    message: "Paginating is completed! Query parameters: page = " + page + ", limit = " + limit,
                    data: {
                        "totalItems": data.count,
                        "totalPages": totalPages,
                        "limit": limit,
                        "currentPageNumber": page + 1,
                        "currentPageSize": data.rows.length,
                        "customers": data.rows
                    }
                };
                res.send(response);
            });
    }catch(error) {
        res.status(500).send({
            message: "Error -> Can NOT complete a paging request!",
            error: error.message,
        });
    }
}

exports.getHero = (req, res) => {
    Hero.findByPk(req.params.id,
        {attributes: ['id', 'nickname', 'real_name', 'origin_description', 'superpowers', 'catch_phrase', 'images']})
        .then(hero => {
            res.status(200).json(hero);
        }).catch(error => {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
    })
}

exports.updateHero = async (req, res) => {
    try{
        let hero = await Hero.findByPk(req.body.id);
        if(!hero){

            res.status(404).json({
                message: "Not Found for updating a customer with id = " + heroId,
                error: "404"
            });
        } else {

            let updatedObject = {
                nickname: req.body.nickname,
                real_name: req.body.real_name,
                origin_description: req.body.origin_description,
                superpowers: req.body.superpowers,
                catch_phrase: req.body.catch_phrase,
              images: req.body.images
            }
            let result = await Hero.update(updatedObject,
                {
                    returning: true,
                    where: {id: req.body.id},
                    attributes: ['id', 'nickname', 'real_name', 'origin_description', 'superpowers', 'catch_phrase', 'images']
                }
            );

            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a hero with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json(result);
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a hero with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteHero = async (req, res) => {

      const id = req.params.id
       Hero.destroy({
           where: {id: id}
       })
           .then(num => {
               if(num == 1) {
                   res.send({
                       message: "Superhero was deleted succesfully!"
                   });
               } else {
                   res.send({
                       message: `Cannot delete Superhero with id=${id}. Maybe Superhero was not found!`
                   });
               }
           })
           .catch(err => {
               res.status(500).send({
                   message: "Could not delete Superhero with id=" + id
               });
           });
}

// exports.uploadFile = async (req, res) => {
// try{
// const file = req.files.file
//
//     const parent = await  File.findOne({hero: req.hero.id, _id: req.body.parent})
//     const hero = await Hero.findOne({_id: req.hero.id})
//
//     if (hero.usedSpace + file.size>hero.diskSpace){
//         return res.status(400).json({message: 'There no space on the disk'})
//     }
//
//     hero.
// }catch(e){
//     return res.status(500).json({message:"Upload error"})
// }
// }