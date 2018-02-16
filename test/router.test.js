import { expect } from "chai";
import Path from "path-parser";
import Router from "../src/router";
import routerBag from "../src/route-bag";
import { prefix, get } from "../src/decorators";

describe("Router", () => {
  it("Should be init", () => {
    routerBag.reset();

    routerBag.addAction({
      controller: {},
      action: () => {},
      path: "/controller/action/:id",
      method: "POST"
    });

    const router = new Router();

    expect(router).to.be.instanceOf(Router);
    expect(router.paths["POST"].length).to.equal(1);
    expect(router.paths["POST"][0].matcher).to.be.instanceOf(Path);
  });

  it("Should use the controller prefix", () => {
    routerBag.reset();

    routerBag.addAction({
      controller: { $prefix: "controller" },
      action: () => {},
      path: "action/:id",
      method: "POST"
    });

    const router = new Router();

    expect(router.paths["POST"][0].path).to.equal("/controller/action/:id");
  });

  it("Should throw when has 2 identical routes", () => {
    routerBag.reset();

    routerBag.addAction({
      controller: { $prefix: "controller" },
      action: () => {},
      path: "action/:id",
      method: "POST"
    });

    routerBag.addAction({
      controller: {},
      action: () => {},
      path: "controller/action/:id",
      method: "POST"
    });

    const act = () => new Router();

    expect(act).to.throw();
  });

  it("Should not throw when has 2 identical routes with diferent methods", () => {
    routerBag.reset();

    routerBag.addAction({
      controller: { $prefix: "controller" },
      action: () => {},
      path: "action/:id",
      method: "PUT"
    });

    routerBag.addAction({
      controller: {},
      action: () => {},
      path: "controller/action/:id",
      method: "POST"
    });

    const act = () => new Router();

    expect(act).to.not.throw();
  });

  it("Should resolve the url", () => {
    routerBag.reset();

    routerBag.addAction({
      controller: {},
      action: () => {},
      path: "controller/action/:id",
      method: "POST"
    });

    const router = new Router();

    const matched = router.resolveRoute("POST", "/controller/action/5");

    expect(matched).to.exist;
    expect(matched.params).to.deep.equal([{ id: "5" }]);
  });

  it("Should fail to resolve an non-existent url", () => {
    routerBag.reset();

    routerBag.addAction({
      controller: {},
      action: () => {},
      path: "/controller/action/:id",
      method: "POST"
    });

    const router = new Router();

    const matched = router.resolveRoute("POST", "/controller/actions/5");

    expect(matched).to.be.null;
  });

  it("Should fail to resolve an wrong method", () => {
    routerBag.reset();

    routerBag.addAction({
      controller: {},
      action: () => {},
      path: "/controller/action/:id",
      method: "POST"
    });

    const router = new Router();

    const matched = router.resolveRoute("GET", "/controller/actions/5");

    expect(matched).to.be.null;
  });

  it("Should add the routes when use the decorators", () => {
    routerBag.reset();

    @prefix("some")
    class SomeController {
      @get("action/:param")
      action() {}
    }

    const router = new Router();

    expect(router.paths["GET"][0].path).to.equal("/some/action/:param");
  });

  it("Should add the routes when use the decorators, with empty last slash", () => {
    routerBag.reset();

    @prefix("some")
    class SomeController {
      @get()
      action() {}
    }

    const router = new Router();

    expect(router.paths["GET"][0].path).to.equal("/some");
  });
});
