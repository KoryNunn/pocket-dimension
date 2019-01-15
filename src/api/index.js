const cpjax = require("cpjax");

module.exports = {
  get: {
    all: function getAllItems(callback) {
      cpjax({ url: "/api/items/all", json: true }, function(error, data) {
        if (error) {
          return callback(error);
        }
        let items = JSON.parse(data).data;
        callback(null, items);
      });
    }
  },
  update: function updateItem(item, callback) {
    cpjax(
      {
        url: `/api/item/update/?id=${item.id}&timestamp=${item.timestamp}`,
        method: "PUT",
        data: JSON.stringify(item)
      },
      function(error, data) {
        if (error) {
          return callback(error);
        }
        let status = JSON.parse(data).status;
        callback(null, status);
      }
    );
  },
  create: function postItem(item, callback) {
    cpjax(
      { url: "/api/items/create", method: "POST", data: JSON.stringify(item) },
      function(error, data) {
        if (error) {
          return callback(error);
        }
        let items = JSON.parse(data).data;
        callback(null, items);
      }
    );
  },
  delete: {
    item: function deleteItem(id, timestamp, callback) {
      cpjax(
        {
          url: `/api/items/delete/?id=${id}&timestamp=${timestamp}`,
          method: "DELETE"
        },
        function(error, data) {
          if (error) {
            return callback(error);
          }
          let status = JSON.parse(data).status;
          callback(null, status);
        }
      );
    }
  }
};
