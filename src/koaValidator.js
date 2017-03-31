'use strict';

const Validator = require('dee-validator');

class KoaValidator {
  constructor(ctx) {
    this._bodyValidator = null;
    this._paramsValidator = null;
    this._queryValidator = null;
    this._ctx = ctx;
  }

  get context() {
    return this._ctx;
  }

  get bodyValidator() {
    const self = this;

    return self._getSingleton('_bodyValidator', self.context.request.body);
  }

  get paramsValidator() {
    const self = this;

    return self._getSingleton('_paramsValidator', self.context.params);
  }

  get queryValidator() {
    const self = this;

    return self._getSingleton('_queryValidator', self.context.request.query);
  }

  _getSingleton(field, objToValidate) {
    const self = this;

    if (!self[field]) {
      self[field] = new Validator(objToValidate);
    }

    return self[field];
  }

  hasErrors() {
    const self = this;

    return self.bodyValidator.hasErrors() || self.paramsValidator.hasErrors() || self.queryValidator.hasErrors();
  }

  getErrors() {
    const self = this;
    const validators = [self.bodyValidator, self.paramsValidator, self.queryValidator];
    const errorsObj = {};

    validators.reduce((errors, validator) => errors.concat(validator.getErrors()), []).forEach(({ path, errorMessage, value }) => {
      errorsObj[path] = {
        param: path,
        msg: errorMessage,
        value
      };
    });

    return errorsObj;
  }

  static extend(customMethods) {
    Validator.extend(Object(customMethods));
  }
}

module.exports = KoaValidator;