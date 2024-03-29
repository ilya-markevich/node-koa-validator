"use strict";

require("should");
const sinon = require("sinon");

const KoaValidator = require("../../src/koaValidator");
const testData = require("./data/koaValidator");

describe("Koa Validator", () => {
  describe("Initial State", () => {
    it("should check initial state", () => {
      const { context } = testData;
      const validator = new KoaValidator(context);

      (validator._queryValidator === null).should.be.eql(true);
      (validator._bodyValidator === null).should.be.eql(true);
      (validator._paramsValidator === null).should.be.eql(true);
      validator.context.should.be.eql(context);
    });

    it("should check singleton getters", () => {
      const { context } = testData;
      const validator = new KoaValidator(context);

      const bodyValidator = validator.bodyValidator;
      const paramsValidator = validator.paramsValidator;
      const queryValidator = validator.queryValidator;

      bodyValidator.should.be.eql(validator.bodyValidator);
      paramsValidator.should.be.eql(validator.paramsValidator);
      queryValidator.should.be.eql(validator.queryValidator);
    });
  });

  describe("Static Methods", () => {
    describe("#extend", () => {
      // eslint-disable-next-line max-nested-callbacks
      it("should call extend even if methods not passed", () => {
        KoaValidator.extend(null);
      });
    });
  });

  describe("#hasErrors", () => {
    it("should return that validator has errors", async () => {
      const { context } = testData;
      const validator = new KoaValidator(context);

      validator.bodyValidator.hasErrors = sinon
        .stub()
        .returns(Promise.resolve(false));
      validator.paramsValidator.hasErrors = sinon
        .stub()
        .returns(Promise.resolve(false));
      validator.queryValidator.hasErrors = sinon
        .stub()
        .returns(Promise.resolve(true));

      (await validator.hasErrors()).should.be.eql(true);
    });

    it("should return that validator has no errors", async () => {
      const { context } = testData;
      const validator = new KoaValidator(context);

      validator.bodyValidator.hasErrors = sinon
        .stub()
        .returns(Promise.resolve(false));
      validator.paramsValidator.hasErrors = sinon
        .stub()
        .returns(Promise.resolve(false));
      validator.queryValidator.hasErrors = sinon
        .stub()
        .returns(Promise.resolve(false));

      (await validator.hasErrors()).should.be.eql(false);
    });
  });

  describe("#getErrors", () => {
    it("should return errors", async () => {
      const { context, validatorError, koaValidatorErrors } = testData;
      const validator = new KoaValidator(context);

      validator.bodyValidator.getErrors = sinon
        .stub()
        .returns([validatorError]);
      validator.paramsValidator.getErrors = sinon
        .stub()
        .returns(Promise.resolve([]));
      validator.queryValidator.getErrors = sinon
        .stub()
        .returns(Promise.resolve([]));

      (await validator.getErrors()).should.be.eql(koaValidatorErrors);
    });
  });
});
