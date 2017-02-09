import Server from "../src"
import router from "./testRouter"
import assert from "power-assert"
import rp from "request-promise"

const server = new Server(router);
server.listen(3000);

describe("mock server", () =>{
  describe("url", () =>{
    it("respond to root", () => {
      return rp("http://127.0.0.1:3000")
      .then((res) => {
        assert.equal(res, "hoge");
      })
      .catch((err) => {
        assert(err);
      });
    });

    it("respond to root with /", () => {
      return rp("http://127.0.0.1:3000/")
      .then((res) => {
        assert.equal(res, "hoge");
      })
      .catch((err) => {
        assert(err);
      });
    });
    
    it("respond to routing", () => {
      return rp("http://127.0.0.1:3000/a")
      .then((res) => {
        assert.equal(res, "fuga");
      })
      .catch((err) => {
        assert(err);
      });
    });

    it("respond to nested routing", () => {
      return rp("http://127.0.0.1:3000/a/b")
      .then((res) => {
        assert(res, "piyo");
      })
      .catch((err) => {
        assert(err);
      });
    });

    it("404 for undefined routing", () => {
      return rp("http://127.0.0.1:3000/b")
      .then((res) => {
        assert(new Error("should not respond to /b, but responded"));
      })
      .catch((err) => {
        assert.equal(err.statusCode, 404);
      });
    });

  });
  
  describe("query", () =>{
    it("single query 1", () => {
      return rp("http://127.0.0.1:3000/a?q1=v1")
      .then((res) => {
        assert.equal(res, "boo");
      })
      .catch((err) => {
        assert(err);
      });
    })

    it("single query 2", () => {
      return rp("http://127.0.0.1:3000/a?q2=v2")
      .then((res) => {
        assert.equal(res, "baz");
      })
      .catch((err) => {
        assert(err);
      });
    });

    it("multiple query", () => {
      return rp("http://127.0.0.1:3000/a?q1=v1&q2=v2")
      .then((res) => {
        assert.equal(res, "boobaz");
      })
      .catch((err) => {
        assert(err);
      });
    });

    it("single query with nested url 1", () => {
      return rp("http://127.0.0.1:3000/a/b?q3=v3")
      .then((res) => {
        assert.equal(res, "foo");
      })
      .catch((err) => {
        assert(err);
      });
    })

    it("single query with nested url 2", () => {
      return rp("http://127.0.0.1:3000/a/b?q4=v4")
      .then((res) => {
        assert.equal(res, "bar");
      })
      .catch((err) => {
        assert(err);
      });
    });

    it("multiple query with nested url", () => {
      return rp("http://127.0.0.1:3000/a?q3=v3&q4=v4")
      .then((res) => {
        assert.equal(res, "foobar");
      })
      .catch((err) => {
        assert(err);
      });
    });

    it("url default value for undefined query", () => {
      return rp("http://127.0.0.1:3000/?q1=v1")
      .then((res) => {
        assert.equal(res, "hoge");
      })
      .catch((err) => {
        assert(err);
      });
    });
  });
});