require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');

class AppController {

  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    if(process.env.NODE_ENV !== 'production') {
      this.express.use(cors({
        origin: '*'
      }));
    } else if(process.env.NODE_ENV === 'production') {
      this.express.use(cors({
        credentials: true,
        origin: 'https://finance.carrilho.tech',
        optionsSuccessStatus: 200
      }));
    }
    
    this.express.use(morgan('common'));
    this.express.use(express.json());
  }
  routes() {
    this.express.use(routes);
    if(process.env.NODE_ENV === 'production') {
      this.express.use(express.static(path.join(__dirname, '..', 'client')));
      this.express.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
      });
    }
  }
}

module.exports = new AppController().express;
