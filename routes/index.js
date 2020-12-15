const router = require('express').Router();
const routerUser = require('./users');
const routerArticle = require('./articles');
const NotFoundError = require('../errors/NotFoundError');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { celebrateValidationlogin, celebrateValidationCreateUser } = require('../middlewares/celebrateValidation');

router.post('/signin', celebrateValidationlogin, login);
router.post('/signup', celebrateValidationCreateUser, createUser);

router.use('/users', auth, routerUser);
router.use('/articles', auth, routerArticle);
router.all('/*', auth, (req, res, next) => {
  const error = new NotFoundError('Запрашиваемый адрес не найден');
  next(error);
});

module.exports = router;
