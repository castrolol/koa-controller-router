import chai, { expect } from "chai";
import sinonChai from "sinon-chai";
import { spy } from "sinon";
import controllerRouterMiddleware from "../src/middlewares/controller-router.middleware";
import { get, prefix, post } from "../src/decorators";
import routeBag from "../src/route-bag";

chai.use(sinonChai);
const _consoleError = console.error;

describe("controller router middleware", () => {
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
    const middleware = controllerRouterMiddleware();

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
    const middleware = controllerRouterMiddleware();

    await middleware(ctx, next);

    expect(ctx.status).to.equal(404);
    expect(next).to.be.calledOnce;
  });

  it("Should set ok, on match route", async () => {
    @prefix("foo")
    class SomeController {
      @post("bar")
      action() {}
    }

    const next = spy();
    const ctx = { method: "POST", path: "/foo/bar" };
    const middleware = controllerRouterMiddleware();

    await middleware(ctx, next);

    expect(ctx.status).to.equal(200);
    expect(next).to.be.calledOnce;
  });

  it("Should call action, on match route", async () => {
    const action = spy();

    @prefix("foo")
    class SomeController {
      @post("bar")
      bar() {
        action();
      }
    }

    const next = spy();
    const ctx = { method: "POST", path: "/foo/bar" };
    const middleware = controllerRouterMiddleware();

    await middleware(ctx, next);

    expect(ctx.status).to.equal(200);
    expect(next).to.be.calledOnce;
    expect(action).to.be.calledOnce;
  });


  it("Should call action passing parameters, on match route", async () => {
    const action = spy();

    @prefix("foo")
    class SomeController {
      @post("bar/:id/baz/:name")
      bar({ id, name }) {
        action(id, name);
      }
    }

    const next = spy();
    const ctx = { method: "POST", path: "/foo/bar/15/baz/azul-marinho" };
    const middleware = controllerRouterMiddleware();

    await middleware(ctx, next);

    expect(ctx.status).to.equal(200);
    expect(next).to.be.calledOnce;
    expect(action).to.be.calledWith('15', 'azul-marinho');
  });


  it("Should set internal server error, when throws", async () => {

    @prefix("foo")
    class SomeController {
      @post("bar/:id/baz/:name")
      bar({ id, name }) {
          throw Error("💩")
      }
    }

    const next = spy();
    const ctx = { method: "POST", path: "/foo/bar/15/baz/azul-marinho" };
    const middleware = controllerRouterMiddleware();
 
    const consoleError = spy();
    console.error = consoleError;
    await middleware(ctx, next);
    console.error = _consoleError;

    expect(ctx.status).to.equal(500);
    expect(next).to.be.calledOnce;
    expect(consoleError).to.be.calledOnce;
  });



});
