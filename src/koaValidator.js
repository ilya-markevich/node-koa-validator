import Validator from 'dee-validator';

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
    return this._getSingleton('_bodyValidator', this.context.request.body);
  }

  get paramsValidator() {
    return this._getSingleton('_paramsValidator', this.context.params);
  }

  get queryValidator() {
    return this._getSingleton('_queryValidator', this.context.request.query);
  }

  _getSingleton(field, objToValidate) {
    if (!this[field]) {
      this[field] = new Validator(objToValidate);
    }

    return this[field];
  }

  async hasErrors() {
    const hasErrorsResults = await Promise.all([
      this.bodyValidator.hasErrors(),
      this.paramsValidator.hasErrors(),
      this.queryValidator.hasErrors()
    ]);

    return hasErrorsResults.some((hasError) => hasError);
  }

  async getErrors() {
    const validators = [this.bodyValidator, this.paramsValidator, this.queryValidator];
    const validatorsErrors = await Promise.all(
      validators.map((validator) => validator.getErrors())
    );

    return validatorsErrors.flatMap((errors) => errors);
  }

  static extend(customMethods) {
    Validator.extend(Object(customMethods));
  }
}

export default KoaValidator;
