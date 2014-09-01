(function() {
  var Color, MAX_PER_COMPONENT, clamp, clampInt, comma, cssColor, float, floatOrPercent, hexa, int, intOrPercent, notQuote, parseFloat, parseFloatOrPercent, parseInt, parseIntOrPercent, parseParam, pe, percent, ps, split, strip, variables, _ref, _ref1,
    __slice = [].slice;

  Color = require('./color-model');

  cssColor = require('css-color-function');

  _ref = require('./regexes'), int = _ref.int, float = _ref.float, percent = _ref.percent, intOrPercent = _ref.intOrPercent, floatOrPercent = _ref.floatOrPercent, comma = _ref.comma, notQuote = _ref.notQuote, hexa = _ref.hexa, ps = _ref.ps, pe = _ref.pe, variables = _ref.variables;

  _ref1 = require('./utils'), strip = _ref1.strip, split = _ref1.split, clamp = _ref1.clamp, clampInt = _ref1.clampInt, parseInt = _ref1.parseInt, parseFloat = _ref1.parseFloat, parseIntOrPercent = _ref1.parseIntOrPercent, parseFloatOrPercent = _ref1.parseFloatOrPercent;

  MAX_PER_COMPONENT = {
    red: 255,
    green: 255,
    blue: 255,
    alpha: 1,
    hue: 360,
    saturation: 100,
    lightness: 100
  };

  Color.addExpression('darken', "darken" + ps + "(" + notQuote + ")" + comma + "(" + percent + "|" + variables + ")" + pe, function(color, expression, fileVariables) {
    var amount, baseColor, h, l, s, subexpr, _, _ref2, _ref3;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], subexpr = _ref2[1], amount = _ref2[2];
    subexpr = subexpr.match;
    amount = parseFloat(amount.match, fileVariables);
    if (Color.canHandle(subexpr) && !isNaN(amount)) {
      baseColor = new Color(subexpr, fileVariables);
      _ref3 = baseColor.hsl, h = _ref3[0], s = _ref3[1], l = _ref3[2];
      color.hsl = [h, s, clampInt(l - amount)];
      return color.alpha = baseColor.alpha;
    } else {
      return color.isInvalid = true;
    }
  });

  Color.addExpression('lighten', "lighten" + ps + "(" + notQuote + ")" + comma + "(" + percent + "|" + variables + ")" + pe, function(color, expression, fileVariables) {
    var amount, baseColor, h, l, s, subexpr, _, _ref2, _ref3;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], subexpr = _ref2[1], amount = _ref2[2];
    subexpr = subexpr.match;
    amount = parseFloat(amount.match, fileVariables);
    if (Color.canHandle(subexpr) && !isNaN(amount)) {
      baseColor = new Color(subexpr);
      _ref3 = baseColor.hsl, h = _ref3[0], s = _ref3[1], l = _ref3[2];
      color.hsl = [h, s, clampInt(l + amount)];
      return color.alpha = baseColor.alpha;
    } else {
      return color.isInvalid = true;
    }
  });

  Color.addExpression('transparentize', "(transparentize|fadein)" + ps + "(" + notQuote + ")" + comma + "(" + floatOrPercent + "|" + variables + ")" + pe, function(color, expression, fileVariables) {
    var amount, baseColor, subexpr, _, _ref2;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], _ = _ref2[1], subexpr = _ref2[2], amount = _ref2[3];
    subexpr = subexpr.match;
    amount = parseFloatOrPercent(amount.match, fileVariables);
    if (Color.canHandle(subexpr) && !isNaN(amount)) {
      baseColor = new Color(subexpr);
      color.rgb = baseColor.rgb;
      return color.alpha = clamp(baseColor.alpha - amount);
    } else {
      return color.isInvalid = true;
    }
  });

  Color.addExpression('opacify', "(opacify|fadeout)" + ps + "(" + notQuote + ")" + comma + "(" + floatOrPercent + "|" + variables + ")" + pe, function(color, expression, fileVariables) {
    var amount, baseColor, subexpr, _, _ref2;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], _ = _ref2[1], subexpr = _ref2[2], amount = _ref2[3];
    subexpr = subexpr.match;
    amount = parseFloatOrPercent(amount.match, fileVariables);
    if (Color.canHandle(subexpr) && !isNaN(amount)) {
      baseColor = new Color(subexpr);
      color.rgb = baseColor.rgb;
      return color.alpha = clamp(baseColor.alpha + amount);
    } else {
      return color.isInvalid = true;
    }
  });

  Color.addExpression('adjust-hue', "adjust-hue" + ps + "(" + notQuote + ")" + comma + "(-?" + int + "deg|" + variables + ")" + pe, function(color, expression, fileVariables) {
    var amount, baseColor, h, l, s, subexpr, _, _ref2, _ref3;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], subexpr = _ref2[1], amount = _ref2[2];
    subexpr = subexpr.match;
    amount = parseFloatOrPercent(amount.match, fileVariables);
    if (Color.canHandle(subexpr) && !isNaN(amount)) {
      baseColor = new Color(subexpr);
      _ref3 = baseColor.hsl, h = _ref3[0], s = _ref3[1], l = _ref3[2];
      color.hsl = [(h + amount) % 360, s, l];
      return color.alpha = baseColor.alpha;
    } else {
      return color.isInvalid = true;
    }
  });

  Color.addExpression('mix', "mix" + ps + "((" + notQuote + ")" + comma + " (" + notQuote + ")" + comma + "(" + floatOrPercent + "|" + variables + ")|(" + notQuote + ")" + comma + "(" + notQuote + "))" + pe, function(color, expression, fileVariables) {
    var amount, baseColor1, baseColor2, color1, color1A, color1B, color2, color2A, color2B, _, _ref2;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], _ = _ref2[1], color1A = _ref2[2], color2A = _ref2[3], amount = _ref2[4], _ = _ref2[5], _ = _ref2[6], color1B = _ref2[7], color2B = _ref2[8];
    if (color1A.match.length > 0) {
      color1 = color1A.match;
      color2 = color2A.match;
      amount = parseFloatOrPercent(amount != null ? amount.match : void 0, fileVariables);
    } else {
      color1 = color1B.match;
      color2 = color2B.match;
      amount = 0.5;
    }
    if (Color.canHandle(color1) && Color.canHandle(color2) && !isNaN(amount)) {
      baseColor1 = new Color(color1);
      baseColor2 = new Color(color2);
      return color.rgba = Color.mixColors(baseColor1, baseColor2, amount).rgba;
    } else {
      return color.isInvalid = true;
    }
  });

  Color.addExpression('tint', "tint" + ps + "(" + notQuote + ")" + comma + "(" + floatOrPercent + "|" + variables + ")" + pe, function(color, expression, fileVariables) {
    var amount, baseColor, subexpr, white, _, _ref2;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], subexpr = _ref2[1], amount = _ref2[2];
    subexpr = subexpr.match;
    amount = parseFloatOrPercent(amount.match, fileVariables);
    if (Color.canHandle(subexpr) && !isNaN(amount)) {
      baseColor = new Color(subexpr);
      white = new Color('white');
      return color.rgba = Color.mixColors(white, baseColor, amount).rgba;
    } else {
      return color.isInvalid = true;
    }
  });

  Color.addExpression('shade', "shade" + ps + "(" + notQuote + ")" + comma + "(" + floatOrPercent + "|" + variables + ")" + pe, function(color, expression, fileVariables) {
    var amount, baseColor, black, subexpr, _, _ref2;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], subexpr = _ref2[1], amount = _ref2[2];
    subexpr = subexpr.match;
    amount = parseFloatOrPercent(amount.match, fileVariables);
    if (Color.canHandle(subexpr) && !isNaN(amount)) {
      baseColor = new Color(subexpr);
      black = new Color('black');
      return color.rgba = Color.mixColors(black, baseColor, amount).rgba;
    } else {
      return color.isInvalid = true;
    }
  });

  Color.addExpression('desaturate', "desaturate" + ps + "(" + notQuote + ")" + comma + "(" + floatOrPercent + "|" + variables + ")" + pe, function(color, expression, fileVariables) {
    var amount, baseColor, h, l, s, subexpr, _, _ref2, _ref3;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], subexpr = _ref2[1], amount = _ref2[2];
    subexpr = subexpr.match;
    amount = parseFloatOrPercent(amount.match, fileVariables);
    if (Color.canHandle(subexpr) && !isNaN(amount)) {
      baseColor = new Color(subexpr);
      _ref3 = baseColor.hsl, h = _ref3[0], s = _ref3[1], l = _ref3[2];
      color.hsl = [h, clampInt(s - amount * 100), l];
      return color.alpha = baseColor.alpha;
    } else {
      return color.isInvalid = true;
    }
  });

  Color.addExpression('saturate', "saturate" + ps + "(" + notQuote + ")" + comma + "(" + floatOrPercent + "|" + variables + ")" + pe, function(color, expression, fileVariables) {
    var amount, baseColor, h, l, s, subexpr, _, _ref2, _ref3;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], subexpr = _ref2[1], amount = _ref2[2];
    subexpr = subexpr.match;
    amount = parseFloatOrPercent(amount.match, fileVariables);
    if (Color.canHandle(subexpr) && !isNaN(amount)) {
      baseColor = new Color(subexpr, fileVariables);
      _ref3 = baseColor.hsl, h = _ref3[0], s = _ref3[1], l = _ref3[2];
      color.hsl = [h, clampInt(s + amount * 100), l];
      return color.alpha = baseColor.alpha;
    } else {
      return color.isInvalid = true;
    }
  });

  Color.addExpression('grayscale', "gr(a|e)yscale" + ps + "(" + notQuote + ")" + pe, function(color, expression) {
    var baseColor, h, l, s, subexpr, _, _ref2, _ref3;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], _ = _ref2[1], subexpr = _ref2[2];
    subexpr = subexpr.match;
    if (Color.canHandle(subexpr)) {
      baseColor = new Color(subexpr);
      _ref3 = baseColor.hsl, h = _ref3[0], s = _ref3[1], l = _ref3[2];
      color.hsl = [h, 0, l];
      return color.alpha = baseColor.alpha;
    }
  });

  Color.addExpression('input', "invert" + ps + "(" + notQuote + ")" + pe, function(color, expression) {
    var b, baseColor, g, r, subexpr, _, _ref2, _ref3;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], subexpr = _ref2[1];
    subexpr = subexpr.match;
    if (Color.canHandle(subexpr)) {
      baseColor = new Color(subexpr);
      _ref3 = baseColor.rgb, r = _ref3[0], g = _ref3[1], b = _ref3[2];
      color.rgb = [255 - r, 255 - g, 255 - b];
      return color.alpha = baseColor.alpha;
    }
  });

  Color.addExpression('css_color_function', "color" + ps + "(" + notQuote + ")" + pe, function(color, expression) {
    var e, rgba;
    try {
      rgba = cssColor.convert(expression);
      return color.rgba = new Color(rgba).rgba;
    } catch (_error) {
      e = _error;
      return color.isInvalid = true;
    }
  });

  parseParam = function(param, fileVariables, block) {
    var name, re, value, _, _ref2, _ref3, _ref4;
    if (fileVariables == null) {
      fileVariables = {};
    }
    if (typeof fileVariables === 'function') {
      _ref2 = [fileVariables, {}], block = _ref2[0], fileVariables = _ref2[1];
    }
    re = RegExp("\\$(\\w+):\\s*((-?" + float + ")|" + variables + ")");
    if (re.test(param)) {
      _ref3 = re.exec(param), _ = _ref3[0], name = _ref3[1], value = _ref3[2];
      if (RegExp("" + variables).test(value)) {
        value = (_ref4 = fileVariables[value]) != null ? _ref4.value : void 0;
      }
      return block(name, value);
    }
  };

  Color.addExpression('sass_adjust_color', "adjust-color" + ps + "(" + notQuote + ")" + pe, 1, function(color, expression, fileVariables) {
    var param, params, refColor, subexpr, subject, _, _i, _len, _ref2, _ref3;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], subexpr = _ref2[1];
    _ref3 = split(subexpr.match), subject = _ref3[0], params = 2 <= _ref3.length ? __slice.call(_ref3, 1) : [];
    refColor = new Color(subject, fileVariables);
    for (_i = 0, _len = params.length; _i < _len; _i++) {
      param = params[_i];
      parseParam(param, fileVariables, function(name, value) {
        return refColor[name] += parseFloat(value);
      });
    }
    return color.rgba = refColor.rgba;
  });

  Color.addExpression('sass_scale_color', "scale-color" + ps + "(" + notQuote + ")" + pe, 1, function(color, expression, fileVariables) {
    var param, params, refColor, subexpr, subject, _, _i, _len, _ref2, _ref3;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], subexpr = _ref2[1];
    _ref3 = split(subexpr.match), subject = _ref3[0], params = 2 <= _ref3.length ? __slice.call(_ref3, 1) : [];
    refColor = new Color(subject, fileVariables);
    for (_i = 0, _len = params.length; _i < _len; _i++) {
      param = params[_i];
      parseParam(param, fileVariables, function(name, value) {
        var dif, result;
        value = parseFloat(value) / 100;
        result = value > 0 ? (dif = MAX_PER_COMPONENT[name] - refColor[name], result = refColor[name] + dif * value) : result = refColor[name] * (1 + value);
        return refColor[name] = result;
      });
    }
    return color.rgba = refColor.rgba;
  });

  Color.addExpression('sass_change_color', "change-color" + ps + "(" + notQuote + ")" + pe, 1, function(color, expression, fileVariables) {
    var param, params, refColor, subexpr, subject, _, _i, _len, _ref2, _ref3;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], subexpr = _ref2[1];
    _ref3 = split(subexpr.match), subject = _ref3[0], params = 2 <= _ref3.length ? __slice.call(_ref3, 1) : [];
    refColor = new Color(subject, fileVariables);
    for (_i = 0, _len = params.length; _i < _len; _i++) {
      param = params[_i];
      parseParam(param, fileVariables, function(name, value) {
        return refColor[name] = parseFloat(value);
      });
    }
    return color.rgba = refColor.rgba;
  });

}).call(this);
