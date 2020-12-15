const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const AuthError = require('../errors/AuthError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле name не заполнено'],
    minlength: [2, 'Минимальная длинна поля - 2 символа'],
    maxlength: [30, 'превышен лимит символов. Максимальное значение - 30'],
  },
  password: {
    type: String,
    required: [true, 'Поле password не заполнено'],
    select: false,
  },
  email: {
    type: String,
    required: [true, 'Поле email должно быть заполнено'],
    unique: [true, 'Такой email уже зарегистрирован'],
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: (props) => `${props.value} передан в неверном формате`,
    },
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError('Неправильные почта или пароль');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
