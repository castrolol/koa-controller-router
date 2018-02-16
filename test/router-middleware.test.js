import chai, { expect } from "chai";
import sinonChai from "sinon-chai";
import { spy } from "sinon";
import routerMiddleware from "../src/middlewares/router.middleware";
import { get, prefix, post } from "../src/decorators";
import routeBag from "../src/route-bag";

chai.use(sinonChai);
const _consoleError = console.error;

describe("router middleware", () => {
  beforeEach(() => {
    routeBag.reset();
  });

  it("Should set not found, on invalid method", async () => {
    class SomeController {
      @get("foo")
      action() {}
    }

    const next = spy();
    const ctx = { method: "POST", path: "/foo" };
    const middleware = routerMiddleware();

    await middleware(ctx, next);

    expect(ctx.status).to.equal(404);
    expect(next).to.be.calledOnce;
  });

  it("Should set not found, on non-match route", async () => {
    @prefix("foo")
    class SomeController {
      @get("bar")
      action() {}
    }

    const next = spy();
    const ctx = { method: "POST", path: "/foo" };
    const middleware = routerMiddleware();

    await middleware(ctx, next);

    expect(ctx.status).to.equal(404);
    expect(next).to.be.calledOnce;
  });

  it("Should set no content, on match route", async () => {
    @prefix("foo")
    class SomeController {
      @post("bar")
      action() {}
    }

    const next = spy();
    const ctx = { method: "POST", path: "/foo/bar" };
    const middleware = routerMiddleware();

    await middleware(ctx, next);

    expect(ctx.status).to.equal(201);
    expect(next).to.be.calledOnce;
  });



});
