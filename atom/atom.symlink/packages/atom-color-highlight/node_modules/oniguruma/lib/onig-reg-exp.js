(function() {
  var OnigRegExp, OnigScanner;

  OnigScanner = require('../build/Release/onig_scanner.node').OnigScanner;

  module.exports = OnigRegExp = (function() {
    function OnigRegExp(source) {
      this.source = source;
      this.scanner = new OnigScanner([this.source]);
    }

    OnigRegExp.prototype.captureIndicesForMatch = function(string, match) {
      var capture, captureIndices, _i, _len;
      if (match != null) {
        captureIndices = match.captureIndices;
        for (_i = 0, _len = captureIndices.length; _i < _len; _i++) {
          capture = captureIndices[_i];
          capture.match = string.slice(capture.start, capture.end);
        }
        return captureIndices;
      } else {
        return null;
      }
    };

    OnigRegExp.prototype.searchSync = function(string, startPosition) {
      var match;
      if (startPosition == null) {
        startPosition = 0;
      }
      match = this.scanner.findNextMatchSync(string, startPosition);
      return this.captureIndicesForMatch(string, match);
    };

    OnigRegExp.prototype.search = function(string, startPosition, callback) {
      if (startPosition == null) {
        startPosition = 0;
      }
      if (typeof startPosition === 'function') {
        callback = startPosition;
        startPosition = 0;
      }
      return this.scanner.findNextMatch(string, startPosition, (function(_this) {
        return function(error, match) {
          return typeof callback === "function" ? callback(error, _this.captureIndicesForMatch(string, match)) : void 0;
        };
      })(this));
    };

    OnigRegExp.prototype.testSync = function(string) {
      return this.searchSync(string) != null;
    };

    OnigRegExp.prototype.test = function(string, callback) {
      return this.search(string, 0, function(error, result) {
        return typeof callback === "function" ? callback(error, result != null) : void 0;
      });
    };

    return OnigRegExp;

  })();

}).call(this);
