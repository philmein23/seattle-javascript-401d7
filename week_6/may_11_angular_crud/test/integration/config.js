module.exports = exports = {
  config:  {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['intro-db-spec.js'],
    onPrepare: function() {
      require('babel-core/register')
    }
  }
};
