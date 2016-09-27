var googleUser = {};
var _initGoogle = function() {
  gapi.load('auth2', function(){
    // Retrieve the singleton for the GoogleAuth library and set up the client.
    auth2 = gapi.auth2.init({
      client_id: '297992214250-i9cu5dcdbr30qmdbaiiumqoj4m4asojp.apps.googleusercontent.com',
      cookiepolicy: 'single_host_origin',
      // Request scopes in addition to 'profile' and 'email'
      //scope: 'additional_scope'
    });
    _onGoogleRdy();
  });
};

var isGoogleReady = false;
var functionsToExecuteWhenGoogleRdy = [];
var _onGoogleRdy = function() {
  isGoogleReady = true;

  while(functionsToExecuteWhenGoogleRdy.length) {
    var callbackArray = functionsToExecuteWhenGoogleRdy.pop();
    callbackArray[0](callbackArray[1], callbackArray[2]);
  }
}

var _executeWhenGoogleRdy = function(method, param1, param2) {
  if (isGoogleReady) {
    method(param1, param2);
  } else {
    functionsToExecuteWhenGoogleRdy.push([method, param1, param2]);
  }
}

function attachSigninWhenRdy(element) {
  _executeWhenGoogleRdy(_attachSigninNow, element);
}

function _attachSigninNow(element) {
  auth2.attachClickHandler(element, {},
      function(_googleUser) {
        console.log("Signed in as: ", _googleUser.getBasicProfile().getName());
        googleUser = _googleUser;
        _onLoggedIn();
      }, function(error) {
        alert(JSON.stringify(error, undefined, 2));
      });
}

var isLoggedIn = false;
var functionsToExecuteWhenLoginRdy = [];
var _onLoggedIn = function() {
  isLoggedIn = true;

  while(functionsToExecuteWhenLoginRdy.length) {
    var callbackArray = functionsToExecuteWhenLoginRdy.pop();
    callbackArray[0](callbackArray[1], callbackArray[2]);
  }
}

var executeWhenLoginRdy = function(method, param1, param2) {
  if (isLoggedIn) {
    method(param1, param2);
  } else {
    functionsToExecuteWhenLoginRdy.push([method, param1, param2]);
  }
}

_initGoogle();
