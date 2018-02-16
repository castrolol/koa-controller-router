import chai, { expect } from "chai";
import sinonChai from "sinon-chai";
import { spy } from "sinon";
import { controllerMiddleware } from "../src/middlewares/controller.middleware";
import { get, prefix, post } from "../src/decorators";
import routeBag from "../src/route-bag";

chai.use(sinonChai);
const _consoleError = console.error;

describe("controller  middleware", () => {
  beforeEach(() => {
    routeBag.reset();
  });

  it("Should call action, on match route", async () => {
    const action = spy();
    const next = spy();
    const ctx = {
      matchedRoute: {
        action,
        controller: {},
        params: {}
      }
    };
    const middleware = controllerMiddleware();

    await middleware(ctx, next);

    expect(ctx.status).to.equal(200);
    expect(next).to.be.calledOnce;
    expect(action).to.be.calledOnce;
  });

  it("Should call action passing parameters, on match route", async () => {
    const next = spy();
    const action = spy();
    const ctx = {
      matchedRoute: {
        action,
        controller: {},
        params: [{ id: "15", nome: "azul-marinho" }]
      }
    };
    const middleware = controllerMiddleware();

    await middleware(ctx, next);

    expect(ctx.status).to.equal(200);
    expect(next).to.be.calledOnce;
    expect(action).to.be.calledWith(ctx.matchedRoute.params[0]);
  });

  it("Should set internal server error, when throws", async () => {
    const next = spy();

    const ctx = {
      matchedRoute: {
        action: () => {
          throw new Error("💩");
        },
        controller: {},
        params: [{ id: "15", nome: "azul-mariwnho" }]
      }
    };
    const middleware = controllerMiddleware();

    const consoleError = spy();
    console.error = consoleError;
    await middleware(ctx, next);
    console.error = _consoleError;

    expect(ctx.status).to.equal(500);
    expect(next).to.be.calledOnce;
    expect(consoleError).to.be.calledOnce;
  });
});
