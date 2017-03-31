'use strict';

const KoaValidator = require('./koaValidator');

module.exports = (customMethods) => {
  return (ctx, next) => {
    ctx.validator = new KoaValidator(ctx);
    KoaValidator.extend(customMethods);

    next();
  };
};