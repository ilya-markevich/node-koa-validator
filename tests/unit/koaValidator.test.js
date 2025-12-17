import KoaValidator from '../../src/koaValidator';
import testData from './data/koaValidator';

describe('Koa Validator', () => {
  describe('Initial State', () => {
    it('should check initial state', () => {
      const { context } = testData;
      const validator = new KoaValidator(context);

      expect(validator._queryValidator === null).toBe(true);
      expect(validator._bodyValidator === null).toBe(true);
      expect(validator._paramsValidator === null).toBe(true);

      expect(validator.context).toEqual(context);
    });

    it('should check singleton getters', () => {
      const { context } = testData;
      const validator = new KoaValidator(context);

      const bodyValidator = validator.bodyValidator;
      const paramsValidator = validator.paramsValidator;
      const queryValidator = validator.queryValidator;

      expect(bodyValidator).toEqual(validator.bodyValidator);
      expect(paramsValidator).toEqual(validator.paramsValidator);
      expect(queryValidator).toEqual(validator.queryValidator);
    });
  });

  describe('Static Methods', () => {
    describe('#extend', () => {
      it('should call extend even if methods not passed', () => {
        KoaValidator.extend(null);
      });
    });
  });

  describe('#hasErrors', () => {
    it('should return that validator has errors', async () => {
      const { context } = testData;
      const validator = new KoaValidator(context);

      validator.bodyValidator.hasErrors = jest.fn().mockResolvedValue(false);
      validator.paramsValidator.hasErrors = jest.fn().mockResolvedValue(false);
      validator.queryValidator.hasErrors = jest.fn().mockResolvedValue(true);

      expect(await validator.hasErrors()).toBe(true);
    });

    it('should return that validator has no errors', async () => {
      const { context } = testData;
      const validator = new KoaValidator(context);

      validator.bodyValidator.hasErrors = jest.fn().mockResolvedValue(false);
      validator.paramsValidator.hasErrors = jest.fn().mockResolvedValue(false);
      validator.queryValidator.hasErrors = jest.fn().mockResolvedValue(false);

      expect(await validator.hasErrors()).toBe(false);
    });
  });

  describe('#getErrors', () => {
    it('should return errors', async () => {
      const { context, validatorError, koaValidatorErrors } = testData;
      const validator = new KoaValidator(context);

      validator.bodyValidator.getErrors = jest.fn().mockResolvedValue([validatorError]);
      validator.paramsValidator.getErrors = jest.fn().mockResolvedValue([]);
      validator.queryValidator.getErrors = jest.fn().mockResolvedValue([validatorError]);

      expect(await validator.getErrors()).toEqual(koaValidatorErrors);
    });
  });
});
