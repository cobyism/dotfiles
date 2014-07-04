(function() {
  var ColorVariablesParsing, Mixin, OnigRegExp, Q, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mixin = require('mixto');

  Q = require('q');

  OnigRegExp = require('oniguruma').OnigRegExp;

  module.exports = ColorVariablesParsing = (function(_super) {
    __extends(ColorVariablesParsing, _super);

    function ColorVariablesParsing() {
      _ref = ColorVariablesParsing.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ColorVariablesParsing.variableExpressions = {};

    ColorVariablesParsing.addVariableExpression = function(name, regexp) {
      return this.variableExpressions[name] = regexp;
    };

    ColorVariablesParsing.removeVariableExpression = function(name) {
      return delete this.variableExpressions[name];
    };

    ColorVariablesParsing.scanBufferForColorVariables = function(buffer, callback) {
      return this.scanBufferForColorVariablesInRange(buffer, [[0, 0], [Infinity, Infinity]], callback);
    };

    ColorVariablesParsing.scanBufferForColorVariablesInRange = function(buffer, range, callback) {
      var Range, bufferText, defer, end, re, results, searchOccurences, start,
        _this = this;
      if (buffer == null) {
        hrow(new Error('Missing buffer'));
      }
      Range = buffer.constructor.Range;
      defer = Q.defer();
      range = Range.fromObject(range);
      start = buffer.characterIndexForPosition(range.start);
      end = buffer.characterIndexForPosition(range.end);
      bufferText = buffer.getText().slice(start, +end + 1 || 9e9);
      re = this.getVariableExpressionsRegexp();
      results = {};
      searchOccurences = function(str, cb, start) {
        if (start == null) {
          start = 0;
        }
        return re.search(str, start, function(err, match) {
          var key, value, _ref1;
          if (err != null) {
            defer.reject(err);
          }
          if ((match != null) && match[0].match !== '') {
            _ref1 = _this.extractVariableElements(match[0].match), key = _ref1[0], value = _ref1[1];
            if (_this.canHandle(value)) {
              results[key] = value;
              if (typeof cb === "function") {
                cb(match);
              }
            }
            return searchOccurences(str, cb, match[0].end);
          } else {
            return defer.resolve(results);
          }
        });
      };
      searchOccurences(bufferText, callback);
      return defer.promise;
    };

    ColorVariablesParsing.extractVariableElements = function(string) {
      var k, key, m, ore, re, value, _, _ref1;
      _ref1 = this.variableExpressions;
      for (k in _ref1) {
        re = _ref1[k];
        ore = new OnigRegExp(re);
        m = ore.searchSync(string);
        if (m != null) {
          _ = m[0], key = m[1], value = m[2];
          return [key.match, value.match];
        }
      }
      return null;
    };

    ColorVariablesParsing.getVariableExpressionsRegexp = function() {
      var k, regex, v;
      regex = ((function() {
        var _ref1, _results;
        _ref1 = this.variableExpressions;
        _results = [];
        for (k in _ref1) {
          v = _ref1[k];
          _results.push(v);
        }
        return _results;
      }).call(this)).join('|');
      return new OnigRegExp("(" + regex + ")");
    };

    return ColorVariablesParsing;

  })(Mixin);

}).call(this);
