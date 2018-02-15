import { expect } from "chai";
import { prefix } from "../src/decorators";

describe("@prefix", () => {
  it("Should set prefix in prototype of Constructor", () => {

    @prefix("some")
    class SomeController {}

    expect(SomeController.$prefix).to.equal("some");

  });
});
