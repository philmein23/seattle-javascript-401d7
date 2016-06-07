var baseUrl = require('../../config').baseUrl;
module.exports = function(app) {
  app.controller('SignUpController', ['$http', '$location',  'cfHandleError', 'cfAuth', function($http, $location, handleError, auth) {
    // AUTH_EXP: how does this differ from the sign_in_controller
    // Authenticate function creates a brand new user by having them create a username and password
    // Once the post request to sign up is resolved, then a promise is returned (res) and a token is saved
    // and getUsername is called to retieve the stored username from the api call at /api/profile to be stored in
    // the this.username property that will be called by the auth controller during its initialization when the page first loads
    this.signup = true;
    this.errors = [];
    this.buttonText = 'Create New User!'
    this.authenticate = function(user) {
      $http.post(baseUrl + '/api/signup', user)
        .then((res) => {
          auth.saveToken(res.data.token);
          auth.getUsername();
          $location.path('/bears');
        }, handleError(this.errors, 'Could not create user'));
    };
  }]);
};
