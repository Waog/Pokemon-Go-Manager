var nodeRestClient = require('node-rest-client').Client;
var client = new nodeRestClient();

exports.getTrainer = (googleID, callback) => {

  // direct way
  client.get("http://52.59.233.107:3000/api/trainer/", function (data, response) {
    var result = data.find(function(trainer) {return trainer.googleID == googleID});
    console.log('found for googleID ' + googleID + ':', result);
    callback(result);
  });
}

exports.createTrainer = (jsonObj, callback) => {

  // set content-type header and data as json in args parameter
  var args = {
    data: jsonObj,
    headers: { "Content-Type": "application/json" }
  };

  client.post("http://52.59.233.107:3000/api/trainer/", args, function (data, response) {
    // parsed response body as js object
    console.log('REST post data', data);
    // raw response
    console.log('REST post response', response);
    if (callback) {
      callback(data);
    }
  });
}

exports.updateTrainer = (jsonObj) => {

  // set content-type header and data as json in args parameter
  var args = {
    data: jsonObj,
    headers: { "Content-Type": "application/json" }
  };

  client.put("http://52.59.233.107:3000/api/trainer/" + jsonObj._id, args, function (data, response) {
    // parsed response body as js object
    console.log('REST put data', data);
    // raw response
    console.log('REST put response', response);
  });
}
