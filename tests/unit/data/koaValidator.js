const context = {
  request: { body: {}, query: {} },
  params: {}
};

const validatorError = {
  path: 'test',
  errorMessage: 'error message',
  value: 0
};
const koaValidatorErrors = [
  {
    path: validatorError.path,
    errorMessage: validatorError.errorMessage,
    value: validatorError.value
  },
  {
    path: validatorError.path,
    errorMessage: validatorError.errorMessage,
    value: validatorError.value
  }
];

export default {
  context,
  validatorError,
  koaValidatorErrors
};
