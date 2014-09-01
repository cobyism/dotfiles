(function() {
  var ColorConversions, Mixin, clamp, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mixin = require('mixto');

  clamp = function(val) {
    return Math.min(1, Math.max(0, val));
  };

  module.exports = ColorConversions = (function(_super) {
    __extends(ColorConversions, _super);

    function ColorConversions() {
      _ref = ColorConversions.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ColorConversions.prototype.rgbToHex = function(r, g, b) {
      var rnd, value;
      rnd = Math.round;
      value = ((rnd(r) << 16) + (rnd(g) << 8) + rnd(b)).toString(16);
      while (value.length < 6) {
        value = "0" + value;
      }
      return value;
    };

    ColorConversions.prototype.hexToRGB = function(hex) {
      var b, color, g, r;
      color = parseInt(hex, 16);
      r = (color >> 16) & 0xff;
      g = (color >> 8) & 0xff;
      b = color & 0xff;
      return [r, g, b];
    };

    ColorConversions.prototype.rgbToHexARGB = function(r, g, b, a) {
      var rnd, value;
      rnd = Math.round;
      value = ((rnd(a * 255) << 24) + (rnd(r) << 16) + (rnd(g) << 8) + rnd(b)).toString(16);
      while (value.length < 8) {
        value = "0" + value;
      }
      return value;
    };

    ColorConversions.prototype.hexARGBToRGB = function(hex) {
      var a, b, color, g, r;
      color = parseInt(hex, 16);
      a = ((color >> 24) & 0xff) / 255;
      r = (color >> 16) & 0xff;
      g = (color >> 8) & 0xff;
      b = color & 0xff;
      return [r, g, b, a];
    };

    ColorConversions.prototype.rgbToHSV = function(r, g, b) {
      var delta, deltaB, deltaG, deltaR, h, maxVal, minVal, rnd, s, v;
      r = r / 255;
      g = g / 255;
      b = b / 255;
      rnd = Math.round;
      minVal = Math.min(r, g, b);
      maxVal = Math.max(r, g, b);
      delta = maxVal - minVal;
      v = maxVal;
      if (delta === 0) {
        h = 0;
        s = 0;
      } else {
        s = delta / v;
        deltaR = (((v - r) / 6) + (delta / 2)) / delta;
        deltaG = (((v - g) / 6) + (delta / 2)) / delta;
        deltaB = (((v - b) / 6) + (delta / 2)) / delta;
        if (r === v) {
          h = deltaB - deltaG;
        } else if (g === v) {
          h = (1 / 3) + deltaR - deltaB;
        } else if (b === v) {
          h = (2 / 3) + deltaG - deltaR;
        }
        if (h < 0) {
          h += 1;
        }
        if (h > 1) {
          h -= 1;
        }
      }
      return [h * 360, s * 100, v * 100];
    };

    ColorConversions.prototype.hsvToRGB = function(h, s, v) {
      var b, comp1, comp2, comp3, dominant, g, r, rnd, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
      h = h / 60;
      s = s / 100;
      v = v / 100;
      rnd = Math.round;
      if (s === 0) {
        return [rnd(v * 255), rnd(v * 255), rnd(v * 255)];
      } else {
        dominant = Math.floor(h);
        comp1 = v * (1 - s);
        comp2 = v * (1 - s * (h - dominant));
        comp3 = v * (1 - s * (1 - (h - dominant)));
        switch (dominant) {
          case 0:
            _ref1 = [v, comp3, comp1], r = _ref1[0], g = _ref1[1], b = _ref1[2];
            break;
          case 1:
            _ref2 = [comp2, v, comp1], r = _ref2[0], g = _ref2[1], b = _ref2[2];
            break;
          case 2:
            _ref3 = [comp1, v, comp3], r = _ref3[0], g = _ref3[1], b = _ref3[2];
            break;
          case 3:
            _ref4 = [comp1, comp2, v], r = _ref4[0], g = _ref4[1], b = _ref4[2];
            break;
          case 4:
            _ref5 = [comp3, comp1, v], r = _ref5[0], g = _ref5[1], b = _ref5[2];
            break;
          default:
            _ref6 = [v, comp1, comp2], r = _ref6[0], g = _ref6[1], b = _ref6[2];
        }
        return [r * 255, g * 255, b * 255];
      }
    };

    ColorConversions.prototype.rgbToHSL = function(r, g, b) {
      var d, h, l, max, min, s, _ref1;
      _ref1 = [r / 255, g / 255, b / 255], r = _ref1[0], g = _ref1[1], b = _ref1[2];
      max = Math.max(r, g, b);
      min = Math.min(r, g, b);
      h = void 0;
      s = void 0;
      l = (max + min) / 2;
      d = max - min;
      if (max === min) {
        h = s = 0;
      } else {
        s = (l > 0.5 ? d / (2 - max - min) : d / (max + min));
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
        }
        h /= 6;
      }
      return [h * 360, s * 100, l * 100];
    };

    ColorConversions.prototype.hslToRGB = function(h, s, l) {
      var hue, m1, m2;
      hue = function(h) {
        h = (h < 0 ? h + 1 : (h > 1 ? h - 1 : h));
        if (h * 6 < 1) {
          return m1 + (m2 - m1) * h * 6;
        } else if (h * 2 < 1) {
          return m2;
        } else if (h * 3 < 2) {
          return m1 + (m2 - m1) * (2 / 3 - h) * 6;
        } else {
          return m1;
        }
      };
      h = (h % 360) / 360;
      s = clamp(s / 100);
      l = clamp(l / 100);
      m2 = (l <= 0.5 ? l * (s + 1) : l + s - l * s);
      m1 = l * 2 - m2;
      return [hue(h + 1 / 3) * 255, hue(h) * 255, hue(h - 1 / 3) * 255];
    };

    ColorConversions.prototype.hsvToHWB = function(h, s, v) {
      var b, w, _ref1;
      _ref1 = [s / 100, v / 100], s = _ref1[0], v = _ref1[1];
      w = (1 - s) * v;
      b = 1 - v;
      return [h, w * 100, b * 100];
    };

    ColorConversions.prototype.hwbToHSV = function(h, w, b) {
      var s, v, _ref1;
      _ref1 = [w / 100, b / 100], w = _ref1[0], b = _ref1[1];
      s = 1 - (w / (1 - b));
      v = 1 - b;
      return [h, s * 100, v * 100];
    };

    ColorConversions.prototype.rgbToHWB = function(r, g, b) {
      return this.hsvToHWB.apply(this, this.rgbToHSV(r, g, b));
    };

    ColorConversions.prototype.hwbToRGB = function(h, w, b) {
      return this.hsvToRGB.apply(this, this.hwbToHSV(h, w, b));
    };

    return ColorConversions;

  })(Mixin);

}).call(this);
