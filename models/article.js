const mongoose = require('mongoose');
const validator = require('validator');

const articleScheme = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, 'поле keyword не заполнено'],
  },
  title: {
    type: String,
    required: [true, 'Поле title не заполнено'],
  },
  text: {
    type: String,
    required: [true, 'Поле text  не заполнено'],
  },
  date: {
    type: String,
    required: [true, 'Поле date не заполнено'],
  },
  source: {
    type: String,
    required: [true, 'Поле source не заполнено'],
  },
  link: {
    type: String,
    required: [true, 'поле link не заполнено'],
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
      message: (props) => `${props.value} передан в неверном формате`,
    },
  },
  image: {
    type: String,
    required: [true, 'поле image не заполнено'],
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
      message: (props) => `${props.value} передан в неверном формате`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('article', articleScheme);
