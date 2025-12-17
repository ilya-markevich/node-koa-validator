import makeMiddlewareTest from '../../src/makeMiddleware';
import testData from './data/makeMiddleware';

describe('Make Middleware', () => {
  describe('middleware', () => {
    it('should add validator to request', () => {
      const { context } = testData;
      const next = jest.fn();
      const middleware = makeMiddlewareTest(null);

      middleware(context, next);

      expect(context).toHaveProperty('validator');
      expect(next).toHaveBeenCalled();
    });
  });
});
