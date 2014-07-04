(function() {
  var Color, clamp, clampInt, comma, float, floatOrPercent, hexa, int, intOrPercent, notQuote, parseFloatOrPercent, parseIntOrPercent, pe, percent, ps, strip, _ref, _ref1;

  Color = require('./color-model');

  _ref = require('./regexes'), int = _ref.int, float = _ref.float, percent = _ref.percent, intOrPercent = _ref.intOrPercent, floatOrPercent = _ref.floatOrPercent, comma = _ref.comma, notQuote = _ref.notQuote, hexa = _ref.hexa, ps = _ref.ps, pe = _ref.pe;

  _ref1 = require('./utils'), strip = _ref1.strip, clamp = _ref1.clamp, clampInt = _ref1.clampInt, parseIntOrPercent = _ref1.parseIntOrPercent, parseFloatOrPercent = _ref1.parseFloatOrPercent;

  Color.addExpression('darken', "darken" + ps + "(" + notQuote + ")" + comma + "(" + percent + ")" + pe, function(color, expression) {
    var amount, baseColor, h, l, s, subexpr, _, _ref2, _ref3;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], subexpr = _ref2[1], amount = _ref2[2];
    subexpr = subexpr.match;
    amount = parseFloat(amount.match);
    if (Color.canHandle(subexpr) && !isNaN(amount)) {
      baseColor = new Color(subexpr);
      _ref3 = baseColor.hsl, h = _ref3[0], s = _ref3[1], l = _ref3[2];
      color.hsl = [h, s, clampInt(l - l * (amount / 100))];
      return color.alpha = baseColor.alpha;
    }
  });

  Color.addExpression('lighten', "lighten" + ps + "(" + notQuote + ")" + comma + "(" + percent + ")" + pe, function(color, expression) {
    var amount, baseColor, h, l, s, subexpr, _, _ref2, _ref3;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], subexpr = _ref2[1], amount = _ref2[2];
    subexpr = subexpr.match;
    amount = parseFloat(amount.match);
    if (Color.canHandle(subexpr) && !isNaN(amount)) {
      baseColor = new Color(subexpr);
      _ref3 = baseColor.hsl, h = _ref3[0], s = _ref3[1], l = _ref3[2];
      color.hsl = [h, s, clampInt(l + l * (amount / 100))];
      return color.alpha = baseColor.alpha;
    }
  });

  Color.addExpression('transparentize', "(transparentize|fadein)" + ps + "(" + notQuote + ")" + comma + "(" + floatOrPercent + ")" + pe, function(color, expression) {
    var amount, baseColor, subexpr, _, _ref2;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], _ = _ref2[1], subexpr = _ref2[2], amount = _ref2[3];
    subexpr = subexpr.match;
    amount = parseFloatOrPercent(amount.match);
    if (Color.canHandle(subexpr) && !isNaN(amount)) {
      baseColor = new Color(subexpr);
      color.rgb = baseColor.rgb;
      return color.alpha = clamp(baseColor.alpha - amount);
    }
  });

  Color.addExpression('opacify', "(opacify|fadeout)" + ps + "(" + notQuote + ")" + comma + "(" + floatOrPercent + ")" + pe, function(color, expression) {
    var amount, baseColor, subexpr, _, _ref2;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], _ = _ref2[1], subexpr = _ref2[2], amount = _ref2[3];
    subexpr = subexpr.match;
    amount = parseFloatOrPercent(amount.match);
    if (Color.canHandle(subexpr) && !isNaN(amount)) {
      baseColor = new Color(subexpr);
      color.rgb = baseColor.rgb;
      return color.alpha = clamp(baseColor.alpha + amount);
    }
  });

  Color.addExpression('adjust-hue', "adjust-hue" + ps + "(" + notQuote + ")" + comma + "(-?" + int + ")deg" + pe, function(color, expression) {
    var amount, baseColor, h, l, s, subexpr, _, _ref2, _ref3;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], subexpr = _ref2[1], amount = _ref2[2];
    subexpr = subexpr.match;
    amount = parseFloatOrPercent(amount.match);
    if (Color.canHandle(subexpr) && !isNaN(amount)) {
      baseColor = new Color(subexpr);
      _ref3 = baseColor.hsl, h = _ref3[0], s = _ref3[1], l = _ref3[2];
      color.hsl = [(h + amount) % 360, s, l];
      return color.alpha = baseColor.alpha;
    }
  });

  Color.addExpression('mix', "mix" + ps + "((" + notQuote + ")" + comma + " (" + notQuote + ")" + comma + "(" + floatOrPercent + ")|(" + notQuote + ")" + comma + "(" + notQuote + "))" + pe, function(color, expression) {
    var amount, baseColor1, baseColor2, color1, color1A, color1B, color2, color2A, color2B, _, _ref2;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], _ = _ref2[1], color1A = _ref2[2], color2A = _ref2[3], amount = _ref2[4], _ = _ref2[5], color1B = _ref2[6], color2B = _ref2[7];
    if (color1A.match.length > 0) {
      color1 = color1A.match;
      color2 = color2A.match;
      amount = parseFloatOrPercent(amount != null ? amount.match : void 0);
    } else {
      color1 = color1B.match;
      color2 = color2B.match;
      amount = 0.5;
    }
    if (Color.canHandle(color1) && Color.canHandle(color2) && !isNaN(amount)) {
      baseColor1 = new Color(color1);
      baseColor2 = new Color(color2);
      return color.rgba = Color.mixColors(baseColor1, baseColor2, amount).rgba;
    }
  });

  Color.addExpression('tint', "tint" + ps + "(" + notQuote + ")" + comma + "(" + floatOrPercent + ")" + pe, function(color, expression) {
    var amount, baseColor, subexpr, white, _, _ref2;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], subexpr = _ref2[1], amount = _ref2[2];
    subexpr = subexpr.match;
    amount = parseFloatOrPercent(amount.match);
    if (Color.canHandle(subexpr) && !isNaN(amount)) {
      baseColor = new Color(subexpr);
      white = new Color('white');
      return color.rgba = Color.mixColors(white, baseColor, amount).rgba;
    }
  });

  Color.addExpression('shade', "shade" + ps + "(" + notQuote + ")" + comma + "(" + floatOrPercent + ")" + pe, function(color, expression) {
    var amount, baseColor, black, subexpr, _, _ref2;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], subexpr = _ref2[1], amount = _ref2[2];
    subexpr = subexpr.match;
    amount = parseFloatOrPercent(amount.match);
    if (Color.canHandle(subexpr) && !isNaN(amount)) {
      baseColor = new Color(subexpr);
      black = new Color('black');
      return color.rgba = Color.mixColors(black, baseColor, amount).rgba;
    }
  });

  Color.addExpression('desaturate', "desaturate" + ps + "(" + notQuote + ")" + comma + "(" + floatOrPercent + ")" + pe, function(color, expression) {
    var amount, baseColor, h, l, s, subexpr, _, _ref2, _ref3;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], subexpr = _ref2[1], amount = _ref2[2];
    subexpr = subexpr.match;
    amount = parseFloatOrPercent(amount.match);
    if (Color.canHandle(subexpr) && !isNaN(amount)) {
      baseColor = new Color(subexpr);
      _ref3 = baseColor.hsl, h = _ref3[0], s = _ref3[1], l = _ref3[2];
      color.hsl = [h, clampInt(s - amount * 100), l];
      return color.alpha = baseColor.alpha;
    }
  });

  Color.addExpression('saturate', "saturate" + ps + "(" + notQuote + ")" + comma + "(" + floatOrPercent + ")" + pe, function(color, expression) {
    var amount, baseColor, h, l, s, subexpr, _, _ref2, _ref3;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], subexpr = _ref2[1], amount = _ref2[2];
    subexpr = subexpr.match;
    amount = parseFloatOrPercent(amount.match);
    if (Color.canHandle(subexpr) && !isNaN(amount)) {
      baseColor = new Color(subexpr);
      _ref3 = baseColor.hsl, h = _ref3[0], s = _ref3[1], l = _ref3[2];
      color.hsl = [h, clampInt(s + amount * 100), l];
      return color.alpha = baseColor.alpha;
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

}).call(this);
