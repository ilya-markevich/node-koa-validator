# Koa Dee Validator

[![npm](https://img.shields.io/npm/v/koa-dee-validator.svg?maxAge=1000)](https://www.npmjs.com/package/koa-dee-validator)
[![npm](https://img.shields.io/npm/dt/koa-dee-validator.svg?maxAge=1000)](https://www.npmjs.com/package/koa-dee-validator)

[Dee-validator](https://github.com/ilya-markevich/node-validator) port for Koa framework.

# Table of contents
* [Migration to v2](#migration-to-v2)
* [Usage](#usage)
* [What's in a name?](#whats-in-a-name)
* [Author](#author)

# Migration to v2

The [v1](https://github.com/ilya-markevich/node-koa-validator/tree/v1.1.1) doesn't support async validators meaning the API is synchronous.
For migration to v2, await `getErrors` and `hasErrors` methods.

# Usage

The middleware creates validator which contains three [dee-validators](https://github.com/ilya-markevich/node-validator) for `ctx.request.body`, `ctx.params` and `ctx.request.query` objects.
You can use each validator separately.

The example of code:
```javascript

const Koa = require('koa');
const validator = require('koa-dee-validator');

const app = new Koa();
const customValidators = { // custom validators
    isTestString: {
        execute: value => value === 'test'
    }
}

app.use(validator(customValidators));

app.use(async (ctx, next) => {
    const validator = ctx.validator;
    const { bodyValidator, paramsValidator, queryValidator } = validator;

    console.log(validator.context); // you can get context object from the ctx.validator

    bodyValidator.property('name').isNotEmpty().isTestString();

    paramsValidator.property('id').isNotEmpty();

    if (await validator.hasErrors()) { // return true in case if no errors in body, params and query validators
      return Promise.reject({
        errors: await validator.getErrors() // here you can get errors from all of the validators
      });
    } else {
      return next();
    }
})
```

You can find more details about creation of custom validators and dee-validator usage [here](https://github.com/ilya-markevich/node-validator).

Example of errors format:
``` javascript
{
    'name': {
        param: 'name',
        message: 'name should be a string',
        value: 0
    },
    'id': {
        param: 'id',
        message: 'id should be an integer',
        value: 'test'
    }
}
```

# Author
Ilya Markevich
