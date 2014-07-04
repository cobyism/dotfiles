(function() {
  var Color, clamp, clampInt, colorRegexp, colors, comma, float, floatOrPercent, hexa, int, intOrPercent, notQuote, parseFloatOrPercent, parseIntOrPercent, pe, percent, ps, strip, _ref, _ref1;

  Color = require('./color-model');

  _ref = require('./regexes'), int = _ref.int, float = _ref.float, percent = _ref.percent, intOrPercent = _ref.intOrPercent, floatOrPercent = _ref.floatOrPercent, comma = _ref.comma, notQuote = _ref.notQuote, hexa = _ref.hexa, ps = _ref.ps, pe = _ref.pe;

  _ref1 = require('./utils'), strip = _ref1.strip, clamp = _ref1.clamp, clampInt = _ref1.clampInt, parseIntOrPercent = _ref1.parseIntOrPercent, parseFloatOrPercent = _ref1.parseFloatOrPercent;

  Color.addExpression('css_hexa_6', "#(" + hexa + "{6})(?![\\d\\w])", function(color, expression) {
    var _, _ref2;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], hexa = _ref2[1];
    return color.hex = hexa.match;
  });

  Color.addExpression('css_hexa_3', "#(" + hexa + "{3})(?![\\d\\w])", function(color, expression) {
    var colorAsInt, _, _ref2;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], hexa = _ref2[1];
    colorAsInt = parseInt(hexa.match, 16);
    color.red = (colorAsInt >> 8 & 0xf) * 17;
    color.green = (colorAsInt >> 4 & 0xf) * 17;
    return color.blue = (colorAsInt & 0xf) * 17;
  });

  Color.addExpression('int_hexa_8', "0x(" + hexa + "{8})(?!" + hexa + ")", function(color, expression) {
    var _, _ref2;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], hexa = _ref2[1];
    return color.hexARGB = hexa.match;
  });

  Color.addExpression('int_hexa_6', "0x(" + hexa + "{6})(?!" + hexa + ")", function(color, expression) {
    var _, _ref2;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], hexa = _ref2[1];
    return color.hex = hexa.match;
  });

  Color.addExpression('css_rgb', strip("  rgb" + ps + "\\s*    " + intOrPercent + "    " + comma + "    " + intOrPercent + "    " + comma + "    " + intOrPercent + "  " + pe + ""), function(color, expression) {
    var b, g, r, _, _ref2;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], r = _ref2[1], g = _ref2[2], b = _ref2[3];
    color.red = parseIntOrPercent(r.match);
    color.green = parseIntOrPercent(g.match);
    color.blue = parseIntOrPercent(b.match);
    return color.alpha = 1;
  });

  Color.addExpression('css_rgba', strip("  rgba" + ps + "\\s*    " + intOrPercent + "    " + comma + "    " + intOrPercent + "    " + comma + "    " + intOrPercent + "    " + comma + "    (" + float + ")  " + pe + ""), function(color, expression) {
    var a, b, g, r, _, _ref2;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], r = _ref2[1], g = _ref2[2], b = _ref2[3], a = _ref2[4];
    color.red = parseIntOrPercent(r.match);
    color.green = parseIntOrPercent(g.match);
    color.blue = parseIntOrPercent(b.match);
    return color.alpha = parseFloat(a.match);
  });

  Color.addExpression('css_hsl', strip("  hsl" + ps + "\\s*    (" + int + ")    " + comma + "    (" + percent + ")    " + comma + "    (" + percent + ")  " + pe + ""), function(color, expression) {
    var h, l, s, _, _ref2;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], h = _ref2[1], s = _ref2[2], l = _ref2[3];
    color.hsl = [parseInt(h.match), parseFloat(s.match), parseFloat(l.match)];
    return color.alpha = 1;
  });

  Color.addExpression('css_hsla', strip("  hsla" + ps + "\\s*    (" + int + ")    " + comma + "    (" + percent + ")    " + comma + "    (" + percent + ")    " + comma + "    (" + float + ")  " + pe + ""), function(color, expression) {
    var a, h, l, s, _, _ref2;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], h = _ref2[1], s = _ref2[2], l = _ref2[3], a = _ref2[4];
    color.hsl = [parseInt(h.match), parseFloat(s.match), parseFloat(l.match)];
    return color.alpha = parseFloat(a.match);
  });

  Color.addExpression('hsv', strip("  hsv" + ps + "\\s*    (" + int + ")    " + comma + "    (" + percent + ")    " + comma + "    (" + percent + ")  " + pe + ""), function(color, expression) {
    var h, s, v, _, _ref2;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], h = _ref2[1], s = _ref2[2], v = _ref2[3];
    color.hsv = [parseInt(h.match), parseFloat(s.match), parseFloat(v.match)];
    return color.alpha = 1;
  });

  Color.addExpression('hsva', strip("  hsva" + ps + "\\s*    (" + int + ")    " + comma + "    (" + percent + ")    " + comma + "    (" + percent + ")    " + comma + "    (" + float + ")  " + pe + ""), function(color, expression) {
    var a, h, s, v, _, _ref2;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], h = _ref2[1], s = _ref2[2], v = _ref2[3], a = _ref2[4];
    color.hsv = [parseInt(h.match), parseFloat(s.match), parseFloat(v.match)];
    return color.alpha = parseFloat(a.match);
  });

  Color.addExpression('vec4', strip("  vec4" + ps + "\\s*    (" + float + ")    " + comma + "    (" + float + ")    " + comma + "    (" + float + ")    " + comma + "    (" + float + ")  " + pe + ""), function(color, expression) {
    var a, h, l, s, _, _ref2;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], h = _ref2[1], s = _ref2[2], l = _ref2[3], a = _ref2[4];
    return color.rgba = [parseFloat(h.match) * 255, parseFloat(s.match) * 255, parseFloat(l.match) * 255, parseFloat(a.match)];
  });

  colors = Object.keys(Color.namedColors);

  colorRegexp = "\\b(?<![\\.\\$@-])(?i)(" + (colors.join('|')) + ")(?-i)(?!\\s*[-\\.:=])\\b";

  Color.addExpression('named_colors', colorRegexp, function(color, expression) {
    var name, _, _ref2;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], name = _ref2[1];
    return color.name = name.match;
  });

}).call(this);
