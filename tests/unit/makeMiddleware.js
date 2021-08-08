"use strict";

require("should");
const sinon = require("sinon");

const makeMiddleware = require("../../src/makeMiddleware");
const testData = require("./data/makeMiddleware");

describe("Make Middleware", () => {
  describe("middleware", () => {
    it("should add validator to request", () => {
      const { context } = testData;
      const next = sinon.mock().once();
      const middleware = makeMiddleware(null);

      middleware(context, next);

      context.should.have.property("validator");
      next.verify();
    });
  });
});
