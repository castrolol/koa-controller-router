import { expect } from "chai";
import Controller from "../src/classes/controller";

describe("Controller", () => {
  it("Should be init", () => {
    const ctx = {};
    const controller = new Controller(ctx);

    expect(controller).to.be.instanceOf(Controller);
  });

  it("Should set body and status on ok method", () => {
    const ctx = {};
    const response = {};
    const controller = new Controller(ctx);

    controller.ok(response);


    expect(ctx.body).to.equal(response);
    expect(ctx.status).to.equal(200);

  });
});
