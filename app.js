const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const rateLimiter = require('./utils/rateLimiter');
const handlerErrors = require('./errors/handlerErrors');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { dataBaseUrl, dataBaseOptions } = require('./utils/configDataBase');

const { PORT = 3000 } = process.env;
const app = express();

app.use(helmet());
app.use(rateLimiter);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(dataBaseUrl, dataBaseOptions);

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(handlerErrors);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
