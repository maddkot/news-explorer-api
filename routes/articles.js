const router = require('express').Router();
const { getArticle, createArticles, deleteArticle } = require('../controllers/articles');
const { celebrateValidationCreateArticles, celebrateValidationDeleteArticle } = require('../middlewares/celebrateValidation');

router.get('/', getArticle);
router.post('/', celebrateValidationCreateArticles, createArticles);
router.delete('/:articleId', celebrateValidationDeleteArticle, deleteArticle);

module.exports = router;
