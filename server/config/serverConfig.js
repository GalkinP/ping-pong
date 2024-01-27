const express = require('express');
const cookieParser = require('cookie-parser');
const fileupload=require('express-fileupload')
const ssr = require('../middleware/ssr');
const { verifyAccessToken } = require('../middleware/verifyTokens');
const { checkUser } = require('../middleware/auth');
const morgan = require('morgan')

const config = (app) => {

  //чтобы логировались запросы
  app.use(morgan('dev'))

  app.use(fileupload());

  // сервер умеет читать json
  app.use(express.json());

  //чтобы при отправке формы появлялось req.body
  app.use(express.urlencoded({ extended: true }));

  // для подключения стилей(первым делом ищет в папке public)
  app.use(express.static('public'));
  app.use(ssr);

  // у объекта req и res появились методы cookie
  app.use(cookieParser());
  app.use(verifyAccessToken);
  app.use(checkUser);
};

module.exports = config;
