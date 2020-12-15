const Article = require('../models/article');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getArticle = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((article) => {
      res.status(200).send(article);
    })
    .catch(next);
};

const createArticles = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;
  const owner = req.user._id;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner,
  })
    .then((article) => {
      res.status(200).send(article);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        throw new ValidationError('Введены некорректные по формату данные');
      }
      next(error);
    })
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId).select('+owner')
    .orFail(new NotFoundError('Статья не найдена'))
    .then((article) => {
      if (article.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Удалить можно только свои статьи - нет прав');
      }
      article.remove();
      res.send({ message: 'Статья удалена' });
    })
    .catch(next);
};

module.exports = {
  getArticle,
  createArticles,
  deleteArticle,
};
