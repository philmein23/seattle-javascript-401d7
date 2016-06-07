var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.factory('cfAuth', ['$http', '$q', function($http, $q) {
    // AUTH_EXP: explain what each of these functions are accomplishing and
    // what data we're storing in this service
    return {
      removeToken: function() {
        //this method sets the token property, username property, http header, and local storage to null
        //which allows a user to be successfully logged out
        this.token = null;
        this.username = null;
        $http.defaults.headers.common.token = null;
        window.localStorage.token = '';
      },
      saveToken: function(token) {
        // this method saves a generated token to the token property, http header, and localStorage so that a user
        // can make http requests or navigate the site while remaining logged in
        this.token = token;
        $http.defaults.headers.common.token = token;
        window.localStorage.token = token;
        return token;
      },
      getToken: function() {
        // this method retrieves a token either from the token property or from within the localStorage and returns
        // the token to be used to make requests
        this.token || this.saveToken(window.localStorage.token);
        return this.token;
      },
      getUsername: function() {
        // this function first goes throuh the conditional statements to check if
        // a username already exists, then call the resolve function to return a promise with this.username as a parameter
        //the next conditional statement checks if getToken() cannot retrieve a token, then call the reject function
        // which will call .catch to handle the error
        // The next step performs an http get request to the localhost/api/profile url. If the request is fulfilled, then
        // a promise is returned as res, which stores res.data.username into the username property
        // resolve function is called to fulfill res.data.username to return another promise in the auth controller
        return $q(function(resolve, reject) {
          if (this.username) return resolve(this.username);
          if (!this.getToken()) return reject(new Error('no authtoken'));

          $http.get(baseUrl + '/api/profile')
            .then((res) => {
              this.username = res.data.username;
              resolve(res.data.username);
            }, reject);
        }.bind(this));
      }
    }
  }]);
};
