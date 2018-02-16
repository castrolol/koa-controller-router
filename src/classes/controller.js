// @flow

class Controller {
  server: MiddlewareContext;
  __reponseSended: boolean = false;

  constructor(server: MiddlewareContext) {
    Object.defineProperty(this, "server", {
        enumerable: false,
        writable: false,
        configurable: false,
        value: server
    });
  }

  ensureResponseIsSended() {
    if (this.__reponseSended) throw "The response already sended";
  }

  markResponseAsSended() {
    this.__reponseSended = true;
  }

  response(action: () => void) {
    this.ensureResponseIsSended();
    action();
    this.markResponseAsSended();
  }

  ok(response?: mixed) {
    this.response(() => {
      var code: HttpStatusCode = 201;
      if (response) {
        this.server.body = response;
        code = 200;
      }
      this.server.status = code;
    });
  }

  notFound() {
    this.response(() => {
      this.server.status = 404;
    });
  }

  error(message: string) {
    this.response(() => {
      this.server.status = 400;
      this.server.body = { message };
    });
  }

  exception(err: string) {
    this.response(() => {
      this.server.status = 500;
      this.server.body = new Error(err);
    });
  }
}

export default Controller;
