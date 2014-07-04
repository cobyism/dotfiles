(function() {
  var ColorOperation, OnigRegExp, Q, comma, commaRegexp;

  Q = require('q');

  OnigRegExp = require('oniguruma').OnigRegExp;

  comma = require('./regexes').comma;

  commaRegexp = new OnigRegExp('\\G' + comma);

  module.exports = ColorOperation = (function() {
    function ColorOperation(name, begin, args, end, handle, Color) {
      this.name = name;
      this.begin = begin;
      this.args = args;
      this.end = end;
      this.handle = handle;
      this.Color = Color;
      this.onigBegin = new OnigRegExp(this.begin);
      this.onigEnd = new OnigRegExp('\\G' + this.end);
    }

    ColorOperation.prototype.canHandle = function(operation) {
      return this.search(operation) != null;
    };

    ColorOperation.prototype.searchSync = function(text, start) {
      var arg, argMatch, argMatches, commaMatch, endMatch, i, match, onigRegex, range, startMatch, _, _i, _len, _ref, _ref1;
      if (start == null) {
        start = 0;
      }
      while (startMatch = this.onigBegin.searchSync(text, start)) {
        argMatches = [];
        start = startMatch[0].end;
        _ref = this.args;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          arg = _ref[i];
          if (arg === this.Color) {
            argMatch = this.Color.searchColorSync(text, start);
          } else {
            onigRegex = new OnigRegExp('\\G' + arg);
            match = onigRegex.searchSync(text, start);
            if (match == null) {
              break;
            }
            range = [match[0].start, match[0].end];
            argMatch = {
              range: range,
              match: text.slice(range[0], range[1])
            };
          }
          if (argMatch == null) {
            break;
          }
          if (argMatch.range[0] !== start) {
            break;
          }
          _ref1 = argMatch.range, _ = _ref1[0], start = _ref1[1];
          argMatches.push(argMatch);
          if (i !== this.args.length - 1) {
            commaMatch = commaRegexp.searchSync(text, start);
            if (commaMatch == null) {
              break;
            }
            start = commaMatch[0].end;
          }
        }
        if (argMatches.length !== this.args.length) {
          continue;
        }
        endMatch = this.onigEnd.searchSync(text, start);
        if (endMatch == null) {
          continue;
        }
        range = [startMatch[0].start, endMatch[0].end];
        return {
          range: range,
          match: text.slice(range[0], range[1]),
          argMatches: argMatches
        };
      }
      return void 0;
    };

    ColorOperation.prototype.search = function(text, start, callback) {
      var defer, iterate, results, verifyArgument,
        _this = this;
      if (start == null) {
        start = 0;
      }
      if (callback == null) {
        callback = function() {};
      }
      verifyArgument = function(arg, isLast) {
        if (isLast == null) {
          isLast = false;
        }
        return function() {
          var defer, onigRegex;
          defer = Q.defer();
          if (arg === _this.Color) {
            _this.Color.searchColor(text, start, function(argMatch) {
              var _, _ref;
              if (argMatch == null) {
                return defer.reject("Can't find Color argument at " + start);
              }
              _ref = argMatch.range, _ = _ref[0], start = _ref[1];
              if (!isLast) {
                return commaRegexp.search(text, start, function(err, commaMatch) {
                  if (err != null) {
                    return defer.reject(err);
                  }
                  if (commaMatch == null) {
                    return defer.reject("Can't find comma at " + start);
                  }
                  start = commaMatch[0].end;
                  return defer.resolve(argMatch);
                });
              } else {
                return defer.resolve(argMatch);
              }
            });
          } else {
            onigRegex = new OnigRegExp('\\G' + arg);
            onigRegex.search(text, start, function(err, match) {
              var argMatch, range, _, _ref;
              if (err != null) {
                return defer.reject(err);
              }
              if (match == null) {
                return defer.reject("Can't find argument '" + arg + "' at " + start);
              }
              range = [match[0].start, match[0].end];
              argMatch = {
                range: range,
                match: text.slice(range[0], range[1])
              };
              _ref = argMatch.range, _ = _ref[0], start = _ref[1];
              if (!isLast) {
                return commaRegexp.search(text, start, function(err, commaMatch) {
                  if (err != null) {
                    return defer.reject(err);
                  }
                  if (commaMatch == null) {
                    return defer.reject("Can't find comma at " + start);
                  }
                  start = commaMatch[0].end;
                  return defer.resolve(argMatch);
                });
              } else {
                return defer.resolve(argMatch);
              }
            });
          }
          return defer.promise;
        };
      };
      defer = Q.defer();
      results = void 0;
      iterate = function() {
        return _this.onigBegin.search(text, start, function(err, startMatch) {
          var arg, argMatches, i, p, _i, _len, _ref;
          argMatches = [];
          if (startMatch != null) {
            start = startMatch[0].end;
            p = Q.fcall(function() {});
            _ref = _this.args;
            for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
              arg = _ref[i];
              p = p.then(verifyArgument(arg, i === _this.args.length - 1)).then(function(argMatch) {
                return argMatches.push(argMatch);
              });
            }
            return p.then(function(results) {
              return _this.onigEnd.search(text, start, function(err, endMatch) {
                var range;
                if (err != null) {
                  return defer.reject(err);
                }
                if (endMatch == null) {
                  return defer.reject("Can't find end match at " + start);
                }
                range = [startMatch[0].start, endMatch[0].end];
                return defer.resolve({
                  range: range,
                  match: text.slice(range[0], range[1]),
                  argMatches: argMatches
                });
              });
            }).fail(function(e) {
              return setImmediate(function() {
                return iterate();
              });
            });
          } else {
            return defer.resolve();
          }
        });
      };
      iterate();
      return defer.promise;
    };

    return ColorOperation;

  })();

}).call(this);
