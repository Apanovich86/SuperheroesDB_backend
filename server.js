const express = require('express');
const app = express();
const fileUpload = require("express-fileupload");

var bodyParser = require('body-parser');

global.__basedir = __dirname;

const db = require('./app/config/db.config.js');

const Hero = db.Hero;

let router = require('./app/routers/router.js');

const cors = require('cors')
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}
app.use(fileUpload({}));
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(express.static('resources'));
app.use('/', router);

// Create a Server
const server = app.listen(8080, function () {

    let host = server.address().address
    let port = server.address().port

    console.log("App listening at http://%s:%s", host, port);
})

db.sequelize.sync({force: true}).then(() => {

    Hero.sync().then(() => {
        const heroes = [
            { nickname: 'Jack', real_name: 'Smith',
                origin_description: '23', superpowers: '374 William S Canning Blvd', catch_phrase: 'sdrftygui'},
            { nickname: 'oggi', real_name: 'Smith',
                origin_description: '23', superpowers: '374 William S Canning Blvd', catch_phrase: 'sdrftygui'},
            { nickname: 'ogirok', real_name: 'Smith',
                origin_description: '23', superpowers: '374 William S Canning Blvd', catch_phrase: 'sdrftygui'},
        ]

        for(let i=0; i<heroes.length; i++){
            Hero.create(heroes[i]);
        }
    })
});