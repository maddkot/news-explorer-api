require('dotenv').config();

const dataBaseUrl = (process.env.NODE_ENV !== 'production') ? 'mongodb://localhost:27017/newsExplorerDiplom' : process.env.DIPLOM_DB;
const dataBaseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

module.exports = {
  dataBaseUrl,
  dataBaseOptions,
};
