var _ = require('lodash');

module.exports = oldSchoolSearch;

function oldSchoolSearch(options, callback) {
  return new oldSchoolSearch.Search(options, callback);
}

oldSchoolSearch.Search = function(options, callback) {
  var apos = options.apos;
  var app = options.app;
  var self = this;

  self._apos = apos;
  self._app = app;
  // self._action = '/apos-oldSchoolSearch';
  // self._perPage = options.perPage || 10;
  self._options = options;

  // Mix in the ability to serve assets and templates
  // self._apos.mixinModuleAssets(self, 'oldSchoolSearch', __dirname, options);

  self.loader = function(req, callback) {
    return callback(null);
  };

  var _get = self._apos.get;
  self._apos.get = function(req, userCriteria, options, mainCallback) {
    var search = options.search || options.q;

    if(search){
      options.search = options.q = undefined;
      userCriteria['highSearchText'] = self._apos.searchify(search);
      userCriteria['published'] = true;
      // console.log('search2', search);
      // console.log(userCriteria);
    }

    _get.call(self._apos, req, userCriteria, options, mainCallback);
  };

  if (callback) {
    return process.nextTick(callback);
  }
};
