var baseUrl = require('../../config').baseUrl;
module.exports = function(app) {
  app.controller('SignInController', ['$http', '$location', 'cfHandleError', 'cfAuth', function($http, $location, handleError, auth) {
    // AUTH_EXP: how does this differ from the sign_up_controller?
    //This sign in controller has an authentication function that verifies the username and password, and
    // then converted to base 64. If the get request is resolved, then a promise is returned with .then
    // and the returned promise is res, where the auth service calls the saveToken function to save the generated token (from res.data.token)
    //auth.getUsername() is called to retrieve the username from the api call to api/profile and stored into the this.username property
    // a redirect is called to /#/bears page
    this.buttonText = 'Sign in to existing user';
    this.errors = [];
    this.authenticate = function(user) {
      $http({
        method: 'GET',
        url: baseUrl + '/api/signin',
        headers: {
          'Authorization': 'Basic ' + window.btoa(user.username + ':' + user.password)
        }
      })
        .then((res) => {
          auth.saveToken(res.data.token);
          auth.getUsername();
          $location.path('/bears');
        }, handleError(this.errors, 'could not sign into user'));
    };
  }]);
};
