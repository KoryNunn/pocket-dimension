const uuid = require("../uuid");
const now = require("../get-now");

const contentType = { "Content-Type": "application/json" };

function responseHandler(code, status, data, response) {
  response.writeHead(code, contentType);
  response.write(
    JSON.stringify({
      status: status,
      data: data
    })
  );
  response.end();
}

const util = {
  buildItem: function createItemObject(payload) {
    var id = payload.id || uuid();
    var timestamp = payload.timestamp || now();

    let item = {
      key: { id: id, timestamp: timestamp },
      item: {
        id: id,
        timestamp: timestamp,
        title: payload.title || "",
        body: payload.body || "",
        type: payload.type || "note",
        generateTitle: payload.generateTitle || false
      }
    };

    return item;
  },
  getJSONfromRequest: function parsePayload(request, callback) {
    let payload = "";
    request.on("data", function(data) {
      payload += data;
    });
    request.on("error", function(err) {
      callback(err);
    });
    request.on("end", function() {
      let parsed = JSON.parse(payload);
      callback(null, parsed);
    });
  },
  respond: {
    success: function successResponse(data, response) {
      return responseHandler(200, "SUCCESS", data, response);
    },
    error: function errorResponse(data, response) {
      return responseHandler(500, "ERROR", data.message, response);
    },
    unauthorized: function unauthorizedResponse(data, response) {
      return responseHandler(401, "UNAUTHORIZED", data, response);
    }
  },
  matchTitle: function matchTitle(data) {
    var match = data.match(/\<title.*\>([^]*)\<\/title\>/);

    if (!match) {
      return;
    }

    return match[1];
  }
};

module.exports = util;
