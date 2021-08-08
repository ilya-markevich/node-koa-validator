"use strict";

const context = {
  request: { body: {}, query: {} },
  params: {},
};

const validatorError = {
  path: "test",
  errorMessage: "error message",
  value: 0,
};
const koaValidatorErrors = {
  test: {
    param: validatorError.path,
    msg: validatorError.errorMessage,
    value: validatorError.value,
  },
};

module.exports = {
  context,
  validatorError,
  koaValidatorErrors,
};
