const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');

const {
  createUser,
  login,
} = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// подключаем мидлвары, роуты и всё остальное...
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '60ab3927a2c7ad25606e0702',
  };

  next();
});

app.post('/signin', login);
app.post('/signup', createUser);

app.use(cardRoutes);
app.use(userRoutes);

app.listen(PORT);
