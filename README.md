# Koa Dee Validator

[![npm](https://img.shields.io/npm/v/koa-dee-validator.svg?maxAge=1000)](https://www.npmjs.com/package/koa-dee-validator)
[![npm](https://img.shields.io/npm/dt/koa-dee-validator.svg?maxAge=1000)](https://www.npmjs.com/package/koa-dee-validator)
[![Coverage Status](https://coveralls.io/repos/github/ilya-markevich/node-koa-validator/badge.svg?branch=master)](https://coveralls.io/github/ilya-markevich/node-koa-validator?branch=master)
[![dependency Status](https://img.shields.io/david/ilya-markevich/node-koa-validator.svg?maxAge=1000)](https://david-dm.org/ilya-markevich/node-koa-validator)
[![devDependency Status](https://img.shields.io/david/dev/ilya-markevich/node-koa-validator.svg?maxAge=1000)](https://david-dm.org/ilya-markevich/node-koa-validator?type=dev)
[![Build Status](https://img.shields.io/travis/ilya-markevich/node-koa-validator.svg?maxAge=1000)](https://travis-ci.org/ilya-markevich/node-koa-validator)
[![Known Vulnerabilities](https://snyk.io/test/github/ilya-markevich/node-koa-validator/badge.svg)](https://snyk.io/test/github/ilya-markevich/node-koa-validator)
[![node](https://img.shields.io/node/v/koa-dee-validator.svg?maxAge=1000)](https://www.npmjs.com/package/koa-dee-validator)

Validator for Koa framework.

# Table of contents
* [Usage](#usage)
* [What's in a name?](#whats-in-a-name)
* [Author](#author)

# Usage

The middleware creates validator which contains three [dee-validators](https://github.com/ilya-markevich/node-validator) for ctx.request.body, ctx.params and ctx.request.query objects.
You can use each of the validators separately.

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

app.use((ctx, next) => {
    const validator = ctx.validator;
    const { bodyValidator, paramsValidator, queryValidator } = validator;

    console.log(validator.context); // you can get context object from validator

    bodyValidator.property('name').isNotEmpty().isTestString();

    paramsValidator.property('id').isNotEmpty();

    if (validator.hasErrors()) { // return true in case if no errors in body, params and query validators
      return Promise.reject({
        errors: validator.getErrors() // here you can get errors from all of the validators
      });
    } else {
      return next();
    }
})
```

You can find more details about creation of custom validators and dee-validator usage [here](https://github.com/ilya-markevich/node-validator)

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

# What's in a name?
Dee is one of my favorite detective characters - [Judge Dee](https://en.wikipedia.org/wiki/Judge_Dee).

# Author
Ilya Markevich - [@ilya_mark91](https://twitter.com/ilya_mark91)
