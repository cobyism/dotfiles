(function() {
  var OnigRegExp, OnigScanner;

  OnigScanner = require('../build/Release/onig_scanner.node').OnigScanner;

  OnigRegExp = require('./onig-reg-exp');

  OnigScanner.prototype.findNextMatch = function(string, startPosition, callback) {
    if (startPosition == null) {
      startPosition = 0;
    }
    if (typeof startPosition === 'function') {
      callback = startPosition;
      startPosition = 0;
    }
    return this._findNextMatch(string, startPosition, (function(_this) {
      return function(error, match) {
        if (match != null) {
          match.scanner = _this;
        }
        return typeof callback === "function" ? callback(error, match) : void 0;
      };
    })(this));
  };

  OnigScanner.prototype.findNextMatchSync = function(string, startPosition) {
    var match;
    if (startPosition == null) {
      startPosition = 0;
    }
    match = this._findNextMatchSync(string, startPosition);
    if (match != null) {
      match.scanner = this;
    }
    return match;
  };

  exports.OnigScanner = OnigScanner;

  exports.OnigRegExp = OnigRegExp;

}).call(this);
