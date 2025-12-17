import * as koa from 'koa';
import DeeValidator, { type ValidationError, ValidatorsObject } from 'dee-validator';

declare module 'koa' {
  interface DefaultContext {
    validator: DeeKoaValidator;
  }
}

export type DeeKoaValidator = {
  context: koa.Context;

  bodyValidator: DeeValidator;

  paramsValidator: DeeValidator;

  queryValidator: DeeValidator;

  hasErrors(): Promise<boolean>;

  getErrors(): Promise<ValidationError[]>;
};

declare function deeKoaValidatorMiddleware(customValidators?: ValidatorsObject): koa.Middleware;

export default deeKoaValidatorMiddleware;
