(function() {
  var ColorExpression, ColorOperation, ColorParsing, Mixin, OnigRegExp, Q, _, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mixin = require('mixto');

  _ = require('underscore-plus');

  Q = require('q');

  OnigRegExp = require('oniguruma').OnigRegExp;

  ColorExpression = require('./color-expression');

  ColorOperation = require('./color-operation');

  module.exports = ColorParsing = (function(_super) {
    __extends(ColorParsing, _super);

    function ColorParsing() {
      _ref = ColorParsing.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ColorParsing.colorExpressions = {};

    ColorParsing.addExpression = function(name, regexp, priority, handle) {
      var _ref1;
      if (priority == null) {
        priority = 0;
      }
      if (handle == null) {
        handle = function() {};
      }
      if (typeof priority === 'function') {
        _ref1 = [0, priority], priority = _ref1[0], handle = _ref1[1];
      }
      return this.colorExpressions[name] = new ColorExpression(name, regexp, handle, priority);
    };

    ColorParsing.removeExpression = function(name) {
      return delete this.colorExpressions[name];
    };

    ColorParsing.scanBufferForColors = function(buffer, variables, callback) {
      if (variables == null) {
        variables = null;
      }
      return this.scanBufferForColorsInRange(buffer, [[0, 0], [Infinity, Infinity]], variables, callback);
    };

    ColorParsing.scanBufferForColorsInRange = function(buffer, range, variables, callback) {
      var Color, Range, bufferText, defer, end, start, variablesPromise, _ref1,
        _this = this;
      if (range == null) {
        range = [[0, 0], [Infinity, Infinity]];
      }
      if (variables == null) {
        variables = null;
      }
      if (callback == null) {
        callback = function() {};
      }
      if (buffer == null) {
        throw new Error('Missing buffer');
      }
      if (typeof variables === 'function') {
        _ref1 = [variables], callback = _ref1[0], variables = _ref1[1];
      }
      Range = buffer.constructor.Range;
      defer = Q.defer();
      range = Range.fromObject(range);
      start = buffer.characterIndexForPosition(range.start);
      end = buffer.characterIndexForPosition(range.end);
      bufferText = buffer.getText();
      variablesPromise = variables != null ? Q.fcall(function() {
        return variables;
      }) : this.scanBufferForVariablesInRange(buffer, range);
      Color = this;
      variablesPromise.then(function(variablesMap) {
        var iterator, k, paletteRegexp, results;
        variables = ((function() {
          var _results;
          _results = [];
          for (k in variablesMap) {
            _results.push(k);
          }
          return _results;
        })()).filter(function(s) {
          return variablesMap[s].isColor;
        }).map(function(s) {
          return _.escapeRegExp(s);
        });
        if (variables.length > 0) {
          paletteRegexp = '(' + variables.join('|') + ')\\b(?!-|\\s*[\\.:=])';
          Color.addExpression('variables', paletteRegexp, 1, function(color, expr) {
            return color.rgba = new Color(variablesMap[expr].value, variablesMap).rgba;
          });
        }
        results = [];
        iterator = function(result) {
          var matchEnd, matchStart, _ref2;
          if (result != null) {
            _ref2 = result.range, matchStart = _ref2[0], matchEnd = _ref2[1];
            if (matchEnd <= end) {
              result.color = new Color(result.match, variablesMap);
              result.bufferRange = new Range(buffer.positionForCharacterIndex(result.range[0]), buffer.positionForCharacterIndex(result.range[1]));
              results.push(result);
              callback(result);
              start = matchEnd;
              return _this.searchColor(bufferText, start, iterator);
            } else {
              defer.resolve(results.length > 0 ? results : void 0);
              return Color.removeExpression('variables');
            }
          } else {
            defer.resolve(results.length > 0 ? results : void 0);
            return Color.removeExpression('variables');
          }
        };
        return _this.searchColor(bufferText, start, iterator);
      }).fail(function(reason) {
        return defer.reject(reason);
      });
      return defer.promise;
    };

    ColorParsing.searchColorSync = function(text, start) {
      if (start == null) {
        start = 0;
      }
      return this.searchExpressionSync(text, start);
    };

    ColorParsing.searchExpressionSync = function(text, start) {
      var match, matchText, matches, ore;
      if (start == null) {
        start = 0;
      }
      ore = new OnigRegExp(this.colorRegExp());
      matches = ore.searchSync(text, start);
      if (matches == null) {
        return;
      }
      match = matches[0];
      matchText = match.match;
      return {
        match: matchText,
        range: [match.start, match.end]
      };
    };

    ColorParsing.searchColor = function(text, start, callback) {
      if (start == null) {
        start = 0;
      }
      if (callback == null) {
        callback = function() {};
      }
      return this.searchExpression(text, start, callback);
    };

    ColorParsing.searchExpression = function(text, start, callback) {
      var defer, ore;
      if (start == null) {
        start = 0;
      }
      if (callback == null) {
        callback = function() {};
      }
      defer = Q.defer();
      ore = new OnigRegExp(this.colorRegExp());
      ore.search(text, start, function(err, matches) {
        var match, matchText, result;
        if (err != null) {
          return defer.reject(err);
        }
        if (matches == null) {
          callback();
          return defer.resolve();
        }
        match = matches[0];
        matchText = match.match;
        result = {
          match: matchText,
          range: [match.start, match.end]
        };
        callback(result);
        return defer.resolve(result);
      });
      return defer.promise;
    };

    ColorParsing.prototype.parseExpression = function(colorExpression, fileVariables) {
      var expr, _i, _len, _ref1;
      if (fileVariables == null) {
        fileVariables = {};
      }
      _ref1 = this.constructor.sortedColorExpressions();
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        expr = _ref1[_i];
        if (expr.canHandle(colorExpression)) {
          expr.handle(this, colorExpression, fileVariables);
          return;
        }
      }
    };

    return ColorParsing;

  })(Mixin);

}).call(this);
