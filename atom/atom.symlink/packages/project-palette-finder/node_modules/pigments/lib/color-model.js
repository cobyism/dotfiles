(function() {
  var Color, ColorConversions, ColorParsing, ColorVariablesParsing, NamedColors, OnigRegExp, PropertyAccessors, _;

  _ = require('underscore-plus');

  PropertyAccessors = require('property-accessors');

  ColorConversions = require('./color-conversions');

  ColorParsing = require('./color-parsing');

  ColorVariablesParsing = require('./color-variables-parsing');

  NamedColors = require('./named-colors');

  OnigRegExp = require('oniguruma').OnigRegExp;

  module.exports = Color = (function() {
    var _this = this;

    PropertyAccessors.includeInto(Color);

    ColorConversions.extend(Color);

    ColorParsing.includeInto(Color);

    ColorVariablesParsing.includeInto(Color);

    NamedColors.extend(Color);

    Color.sortedColorExpressions = function() {
      var e, k;
      return ((function() {
        var _ref, _results;
        _ref = this.colorExpressions;
        _results = [];
        for (k in _ref) {
          e = _ref[k];
          _results.push(e);
        }
        return _results;
      }).call(this)).sort(function(a, b) {
        return b.priority - a.priority;
      });
    };

    Color.colorRegExp = function() {
      return this.sortedColorExpressions().map(function(e) {
        return "(" + e.regexp + ")";
      }).join('|');
    };

    Color.canHandle = function(expr) {
      var e, k, _ref;
      _ref = this.colorExpressions;
      for (k in _ref) {
        e = _ref[k];
        if (e.canHandle(expr)) {
          return true;
        }
      }
      return false;
    };

    Color.mixColors = function(color1, color2, amount) {
      var color, inverse;
      if (amount == null) {
        amount = 0.5;
      }
      inverse = 1 - amount;
      color = new Color;
      color.rgba = [Math.floor(color1.red * amount) + Math.floor(color2.red * inverse), Math.floor(color1.green * amount) + Math.floor(color2.green * inverse), Math.floor(color1.blue * amount) + Math.floor(color2.blue * inverse), color1.alpha * amount + color2.alpha * inverse];
      return color;
    };

    Color.colorComponents = [['red', 0], ['green', 1], ['blue', 2], ['alpha', 3]];

    Color.colorComponents.forEach(function(_arg) {
      var component, index;
      component = _arg[0], index = _arg[1];
      return Color.prototype.accessor(component, {
        get: function() {
          return this[index];
        },
        set: function(component) {
          this[index] = component;
          if (isNaN(component)) {
            return this.isInvalid = true;
          }
        }
      });
    });

    Color.prototype.accessor('name', {
      get: function() {
        return this._name;
      },
      set: function(_name) {
        var color;
        this._name = _name;
        if (color = Color.namedColors[this._name.toLowerCase()].replace('#', '')) {
          return this.hex = color;
        }
      }
    });

    Color.prototype.accessor('rgb', {
      get: function() {
        return [this.red, this.green, this.blue];
      },
      set: function(_arg) {
        this.red = _arg[0], this.green = _arg[1], this.blue = _arg[2];
      }
    });

    Color.prototype.accessor('rgba', {
      get: function() {
        return [this.red, this.green, this.blue, this.alpha];
      },
      set: function(_arg) {
        this.red = _arg[0], this.green = _arg[1], this.blue = _arg[2], this.alpha = _arg[3];
      }
    });

    Color.prototype.accessor('hsv', {
      get: function() {
        return this.constructor.rgbToHSV(this.red, this.green, this.blue);
      },
      set: function(hsv) {
        var _ref;
        return _ref = this.constructor.hsvToRGB.apply(this.constructor, hsv), this.red = _ref[0], this.green = _ref[1], this.blue = _ref[2], _ref;
      }
    });

    Color.prototype.accessor('hwb', {
      get: function() {
        return this.constructor.rgbToHWB(this.red, this.green, this.blue);
      },
      set: function(hwb) {
        var _ref;
        return _ref = this.constructor.hwbToRGB.apply(this.constructor, hwb), this.red = _ref[0], this.green = _ref[1], this.blue = _ref[2], _ref;
      }
    });

    Color.prototype.accessor('hsl', {
      get: function() {
        return this.constructor.rgbToHSL(this.red, this.green, this.blue);
      },
      set: function(hsl) {
        var _ref;
        return _ref = this.constructor.hslToRGB.apply(this.constructor, hsl), this.red = _ref[0], this.green = _ref[1], this.blue = _ref[2], _ref;
      }
    });

    Color.prototype.accessor('hex', {
      get: function() {
        return this.constructor.rgbToHex(this.red, this.green, this.blue);
      },
      set: function(hex) {
        var _ref;
        return _ref = this.constructor.hexToRGB(hex), this.red = _ref[0], this.green = _ref[1], this.blue = _ref[2], _ref;
      }
    });

    Color.prototype.accessor('hexARGB', {
      get: function() {
        return this.constructor.rgbToHexARGB(this.red, this.green, this.blue, this.alpha);
      },
      set: function(hex) {
        var _ref;
        return _ref = this.constructor.hexARGBToRGB(hex), this.red = _ref[0], this.green = _ref[1], this.blue = _ref[2], this.alpha = _ref[3], _ref;
      }
    });

    Color.prototype.accessor('length', {
      get: function() {
        return 4;
      }
    });

    Color.prototype.accessor('hue', {
      get: function() {
        return this.hsl[0];
      },
      set: function(hue) {
        var hsl;
        hsl = this.hsl;
        hsl[0] = hue;
        return this.hsl = hsl;
      }
    });

    Color.prototype.accessor('saturation', {
      get: function() {
        return this.hsl[1];
      },
      set: function(saturation) {
        var hsl;
        hsl = this.hsl;
        hsl[1] = saturation;
        return this.hsl = hsl;
      }
    });

    Color.prototype.accessor('lightness', {
      get: function() {
        return this.hsl[2];
      },
      set: function(lightness) {
        var hsl;
        hsl = this.hsl;
        hsl[2] = lightness;
        return this.hsl = hsl;
      }
    });

    function Color(colorExpression, fileVariables) {
      var _ref;
      if (colorExpression == null) {
        colorExpression = null;
      }
      if (fileVariables == null) {
        fileVariables = {};
      }
      _ref = [0, 0, 0, 1, false], this.red = _ref[0], this.green = _ref[1], this.blue = _ref[2], this.alpha = _ref[3], this.isInvalid = _ref[4];
      if (colorExpression != null) {
        this.parseExpression(colorExpression, fileVariables);
      }
    }

    Color.prototype.luma = function() {
      var b, g, r;
      r = this[0] / 255;
      g = this[1] / 255;
      b = this[2] / 255;
      r = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
      g = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
      b = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    Color.prototype.toCSS = function() {
      return this.name || ("rgba(" + (Math.round(this.red)) + ",          " + (Math.round(this.green)) + ",          " + (Math.round(this.blue)) + ",          " + this.alpha + ")");
    };

    return Color;

  }).call(this);

}).call(this);
