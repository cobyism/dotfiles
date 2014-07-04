(function() {
  var ColorExpression, OnigRegExp, Q;

  Q = require('q');

  OnigRegExp = require('oniguruma').OnigRegExp;

  module.exports = ColorExpression = (function() {
    function ColorExpression(name, regexp, handle, priority) {
      this.name = name;
      this.regexp = regexp;
      this.handle = handle;
      this.priority = priority != null ? priority : 0;
      this.onigRegExp = new OnigRegExp("^" + this.regexp + "$");
    }

    ColorExpression.prototype.canHandle = function(expression) {
      return this.onigRegExp.testSync(expression);
    };

    ColorExpression.prototype.searchSync = function(text, start) {
      var match, range, re, results;
      if (start == null) {
        start = 0;
      }
      results = void 0;
      re = new OnigRegExp(this.regexp);
      if (match = re.searchSync(text, start)) {
        match = match[0];
        range = [match.start, match.end];
        results = {
          range: range,
          match: text.slice(range[0], range[1])
        };
      }
      return results;
    };

    ColorExpression.prototype.search = function(text, start, callback) {
      var defer, re;
      if (start == null) {
        start = 0;
      }
      if (callback == null) {
        callback = function() {};
      }
      defer = Q.defer();
      re = new OnigRegExp(this.regexp);
      re.search(text, start, function(err, match) {
        var range, results;
        if (match == null) {
          defer.resolve();
          callback();
          return;
        }
        match = match[0];
        range = [match.start, match.end];
        results = {
          range: range,
          match: text.slice(range[0], range[1])
        };
        defer.resolve(results);
        return callback(results);
      });
      return defer.promise;
    };

    return ColorExpression;

  })();

}).call(this);
