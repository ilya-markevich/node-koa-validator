"use strict";

const KoaValidator = require("./koaValidator");

module.exports = (customMethods) => (ctx, next) => {
  ctx.validator = new KoaValidator(ctx);
  KoaValidator.extend(customMethods);

  return next();
};
