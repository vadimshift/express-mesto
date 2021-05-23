const express = require("express");
const userRoutes = require("./routes/users");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const { PORT = 3000 } = process.env;
const app = express();

// подключаемся к серверу mongo
mongoose.connect("mongodb://localhost:27017/mestodb ", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// подключаем мидлвары, роуты и всё остальное...
app.use(bodyParser.json())
app.use(userRoutes);

app.listen(PORT);