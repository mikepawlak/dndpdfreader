'use strict';

function spinUp() {
  require('dotenv').config();

  const express = require('express');
  const app = express();
  const hbs = require('express-hbs');
  const parsePDF = require("./pdf-parser.js");


  app.engine('hbs', hbs.express4({
    partialsDir   : __dirname +'/partials',
    defaultLayout : __dirname +'/layouts/main',
  }));

  app.set('view engine', 'hbs');
  app.set('views', __dirname + '/');

  const port = process.env.PORT;

  app.get('/', (req, res) => {
    parsePDF(process.argv[3])
      .then((result) => {
        res.render('index', {
          'character' : result
        });
      })
      .catch(err => {
        console.warn(err);
      });
  });

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

module.exports = spinUp();
