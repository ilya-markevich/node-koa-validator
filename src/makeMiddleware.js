import KoaValidator from './koaValidator';

export default (customMethods) => (ctx, next) => {
  ctx.validator = new KoaValidator(ctx);
  KoaValidator.extend(customMethods);

  return next();
};
