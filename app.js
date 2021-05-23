const express = require('express');
const mongoose = require('mongoose');
const { PORT = 3000 } = process.env;
const app = express();

// подключаемся к серверу mongo
gitmongoose.connect('mongodb://localhost:27017/mestodb ', {
  useNewUrlParser: true,
  useCreateIndex: true,
    useFindAndModify: false
});

// подключаем мидлвары, роуты и всё остальное...

app.listen(PORT);