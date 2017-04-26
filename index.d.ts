import * as koa from 'koa';
import DeeValidator = require('dee-validator');

declare module 'koa' {
  interface BaseContext {
    validator: deeKoaValidatorMiddleware.DeeKoaValidator
  }
}

declare namespace deeKoaValidatorMiddleware {
  interface DeeKoaValidator {
    context: koa.Context;

    bodyValidator: DeeValidator;

    paramsValidator: DeeValidator;

    queryValidator: DeeValidator;

    hasErrors(): boolean;

    getErrors(): DeeValidator.ValidationError[];
  }
}

declare function deeKoaValidatorMiddleware(customValidators?: DeeValidator.ValidatorsObject): koa.Middleware;

export = deeKoaValidatorMiddleware;


