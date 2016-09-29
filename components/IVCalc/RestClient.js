var nodeRestClient = require('node-rest-client').Client;
var client = new nodeRestClient();

exports.getTrainer = (googleID, callback) => {

  client.get("http://52.59.233.107:3000/api/trainer/", function (data, response) {
    var result = data.find(function(trainer) {return trainer.googleID == googleID});
    callback(result);
  });
}

exports.createTrainer = (jsonObj, callback) => {

  var args = {
    data: jsonObj,
    headers: { "Content-Type": "application/json" }
  };

  client.post("http://52.59.233.107:3000/api/trainer/", args, function (data, response) {
    if (callback) {
      callback(data);
    }
  });
}

exports.updateTrainer = (jsonObj) => {

  var args = {
    data: jsonObj,
    headers: { "Content-Type": "application/json" }
  };

  client.put("http://52.59.233.107:3000/api/trainer/" + jsonObj._id, args, function (data, response) {});
}
