var Request = require("request");

describe("App api", () => {
  var server;
  beforeAll(() => {
    server = require("../src/app");
  });

  describe("GET home", () => {
    var data = {};
    beforeAll((done) => {
      Request.get("http://localhost:8080", (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it("Status 200", () => {
      expect(data.status).toBe(200);
      expect(data.body).toContain("Welcome to image-processing-api");
    });
  });

  describe("GET image exited", () => {
    var data = {};
    beforeAll((done) => {
      Request.get(
        "http://localhost:8080/api/images?filename=vinh ha long",
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = body;
          done();
        }
      );
    });
    it("Status 200", () => {
      expect(data.status).toBe(200);
    });
  });

  describe("GET image not exited", () => {
    var data = {};
    beforeAll((done) => {
      Request.get(
        "http://localhost:8080/api/images?filename=vinh ha lon",
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = body;
          done();
        }
      );
    });
    it("Status 200", () => {
      expect(data.status).toBe(200);
      expect(data.body).toContain("Welcome to image-processing-api");
      expect(data.body).toContain("List images available:");
      expect(data.body).toContain("/api/images?filename=vinh ha long");
    });
  });

  describe("GET image exited thumd", () => {
    var data = {};
    beforeAll((done) => {
      Request.get(
        "http://localhost:8080/api/images?filename=vinh ha long&width=300&height=800",
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = body;
          done();
        }
      );
    });
    it("Status 200", () => {
      expect(data.status).toBe(200);
    });
  });

  describe("GET image exited thumb not width", () => {
    var data = {};
    beforeAll((done) => {
      Request.get(
        "http://localhost:8080/api/images?filename=vinh ha long&height=800",
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = body;
          done();
        }
      );
    });
    it("Status 200", () => {
      expect(data.status).toBe(200);
      expect(data.body).toContain(
        "Please provide a positive numerical value for the 'width' query segment."
      );
    });
  });

  describe("GET image exited thumb height not valid", () => {
    var data = {};
    beforeAll((done) => {
      Request.get(
        "http://localhost:8080/api/images?filename=vinh ha long&width=300&height=-800",
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = body;
          done();
        }
      );
    });
    it("Status 200", () => {
      expect(data.status).toBe(200);
      expect(data.body).toContain(
        "Please provide a positive numerical value for the 'height' query segment."
      );
    });
  });
});
