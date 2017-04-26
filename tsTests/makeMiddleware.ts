import Koa = require('koa');
import validator = require('../index');

const app = new Koa();

app.use(validator());

app.use((ctx) => {
  const { bodyValidator, paramsValidator, queryValidator } = ctx.validator;
  const requestObj: Koa.Context = ctx.validator.context;

  requestObj.accepts();

  bodyValidator.property('prop1').optional().isArray();
  paramsValidator.property('prop2').isNotEmpty().withMessage('test message');
  queryValidator.property('prop3').optional().isBoolean();

  const hasErrors: boolean = ctx.validator.hasErrors();

  if (hasErrors) {
    const errors = ctx.validator.getErrors();

    errors.forEach((error) => {
      console.log(`${error.value}, ${error.errorMessage}, ${error.path}`);
    })
  }
});