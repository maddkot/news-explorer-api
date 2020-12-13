const { celebrate, Joi } = require('celebrate');

const celebrateValidationlogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .email()
      .message('Поле email обязательно')
      .required()
      .messages({
        'any.required': 'Поле обязательно!',
      }),
    password: Joi.string()
      .required()
      .messages({
        'any.required': 'Поле обязательно!',
      })
      .min(4)
      .message('Минимальная длинна - 4 символа'),
  }),
});

const celebrateValidationCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .max(30)
      .message('Максимальная длинна - 30 символов')
      .min(2)
      .message('Минимальная длинна - 2 символа')
      .required()
      .messages({
        'any.required': 'Поле обязательно!',
      }),
    email: Joi.string()
      .email()
      .message('Поле email обязательно')
      .required()
      .messages({
        'any.required': 'Поле обязательно!',
      }),
    password: Joi.string()
      .min(4)
      .message('Минимальная длинна - 4 символа')
      .required()
      .messages({
        'any.required': 'Поле обязательно!',
      }),
  }),
});

const celebrateValidationCreateArticles = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string()
      .required()
      .messages({
        'any.required': 'Поле обязательно!',
      }),
    title: Joi.string()
      .required()
      .messages({
        'any.required': 'Поле обязательно!',
      }),
    text: Joi.string()
      .required()
      .messages({
        'any.required': 'Поле обязательно!',
      }),
    date: Joi.string()
      .required()
      .messages({
        'any.required': 'Поле обязательно!',
      }),
    source: Joi.string()
      .required()
      .messages({
        'any.required': 'Поле обязательно!',
      }),
    link: Joi.string()
      .required()
      .messages({
        'any.required': 'Поле обязательно!',
      }),
    image: Joi.string()
      .required()
      .messages({
        'any.required': 'Поле обязательно!',
      }),
  }),
});

const celebrateValidationDeleteArticle = celebrate({
  body: Joi.object().keys({
    params: Joi.object().keys({
      articleId: Joi.string().required()
        .messages({
          'any.required': 'Поле обязательно!',
        }).hex(),
    }),
  }),
});

module.exports = {
  celebrateValidationlogin,
  celebrateValidationCreateUser,
  celebrateValidationCreateArticles,
  celebrateValidationDeleteArticle,
};
