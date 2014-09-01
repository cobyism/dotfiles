(function() {
  var Color, clamp, clampInt, colorRegexp, colors, comma, float, floatOrPercent, hexa, int, intOrPercent, notQuote, parseFloat, parseFloatOrPercent, parseInt, parseIntOrPercent, pe, percent, ps, strip, variables, _ref, _ref1;

  Color = require('./color-model');

  _ref = require('./regexes'), int = _ref.int, float = _ref.float, percent = _ref.percent, intOrPercent = _ref.intOrPercent, floatOrPercent = _ref.floatOrPercent, comma = _ref.comma, notQuote = _ref.notQuote, hexa = _ref.hexa, ps = _ref.ps, pe = _ref.pe, variables = _ref.variables;

  _ref1 = require('./utils'), strip = _ref1.strip, clamp = _ref1.clamp, clampInt = _ref1.clampInt, parseInt = _ref1.parseInt, parseFloat = _ref1.parseFloat, parseIntOrPercent = _ref1.parseIntOrPercent, parseFloatOrPercent = _ref1.parseFloatOrPercent;

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

  Color.addExpression('css_rgb', strip("  rgb" + ps + "\\s*    (" + intOrPercent + "|" + variables + ")    " + comma + "    (" + intOrPercent + "|" + variables + ")    " + comma + "    (" + intOrPercent + "|" + variables + ")  " + pe + ""), function(color, expression, fileVariables) {
    var b, g, r, _, _ref2;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], r = _ref2[1], _ = _ref2[2], _ = _ref2[3], g = _ref2[4], _ = _ref2[5], _ = _ref2[6], b = _ref2[7];
    color.red = parseIntOrPercent(r.match, fileVariables);
    color.green = parseIntOrPercent(g.match, fileVariables);
    color.blue = parseIntOrPercent(b.match, fileVariables);
    return color.alpha = 1;
  });

  Color.addExpression('css_rgba', strip("  rgba" + ps + "\\s*    (" + intOrPercent + "|" + variables + ")    " + comma + "    (" + intOrPercent + "|" + variables + ")    " + comma + "    (" + intOrPercent + "|" + variables + ")    " + comma + "    (" + float + "|" + variables + ")  " + pe + ""), function(color, expression, fileVariables) {
    var a, b, g, r, _, _ref2;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], r = _ref2[1], _ = _ref2[2], _ = _ref2[3], g = _ref2[4], _ = _ref2[5], _ = _ref2[6], b = _ref2[7], _ = _ref2[8], _ = _ref2[9], a = _ref2[10];
    color.red = parseIntOrPercent(r.match, fileVariables);
    color.green = parseIntOrPercent(g.match, fileVariables);
    color.blue = parseIntOrPercent(b.match, fileVariables);
    return color.alpha = parseFloat(a.match, fileVariables);
  });

  Color.addExpression('css_hsl', strip("  hsl" + ps + "\\s*    (" + int + "|" + variables + ")    " + comma + "    (" + percent + "|" + variables + ")    " + comma + "    (" + percent + "|" + variables + ")  " + pe + ""), function(color, expression, fileVariables) {
    var h, l, s, _, _ref2;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], h = _ref2[1], _ = _ref2[2], s = _ref2[3], _ = _ref2[4], l = _ref2[5];
    color.hsl = [parseInt(h.match, fileVariables), parseFloat(s.match, fileVariables), parseFloat(l.match, fileVariables)];
    return color.alpha = 1;
  });

  Color.addExpression('css_hsla', strip("  hsla" + ps + "\\s*    (" + int + "|" + variables + ")    " + comma + "    (" + percent + "|" + variables + ")    " + comma + "    (" + percent + "|" + variables + ")    " + comma + "    (" + float + "|" + variables + ")  " + pe + ""), function(color, expression, fileVariables) {
    var a, h, l, s, _, _ref2;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], h = _ref2[1], _ = _ref2[2], s = _ref2[3], _ = _ref2[4], l = _ref2[5], _ = _ref2[6], a = _ref2[7];
    color.hsl = [parseInt(h.match, fileVariables), parseFloat(s.match, fileVariables), parseFloat(l.match, fileVariables)];
    return color.alpha = parseFloat(a.match, fileVariables);
  });

  Color.addExpression('hsv', strip("  hsv" + ps + "\\s*    (" + int + "|" + variables + ")    " + comma + "    (" + percent + "|" + variables + ")    " + comma + "    (" + percent + "|" + variables + ")  " + pe + ""), function(color, expression, fileVariables) {
    var h, s, v, _, _ref2;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], h = _ref2[1], _ = _ref2[2], s = _ref2[3], _ = _ref2[4], v = _ref2[5];
    color.hsv = [parseInt(h.match, fileVariables), parseFloat(s.match, fileVariables), parseFloat(v.match, fileVariables)];
    return color.alpha = 1;
  });

  Color.addExpression('hsva', strip("  hsva" + ps + "\\s*    (" + int + "|" + variables + ")    " + comma + "    (" + percent + "|" + variables + ")    " + comma + "    (" + percent + "|" + variables + ")    " + comma + "    (" + float + "|" + variables + ")  " + pe + ""), function(color, expression, fileVariables) {
    var a, h, s, v, _, _ref2;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], h = _ref2[1], _ = _ref2[2], s = _ref2[3], _ = _ref2[4], v = _ref2[5], _ = _ref2[6], a = _ref2[7];
    color.hsv = [parseInt(h.match, fileVariables), parseFloat(s.match, fileVariables), parseFloat(v.match, fileVariables)];
    return color.alpha = parseFloat(a.match, fileVariables);
  });

  Color.addExpression('vec4', strip("  vec4" + ps + "\\s*    (" + float + ")    " + comma + "    (" + float + ")    " + comma + "    (" + float + ")    " + comma + "    (" + float + ")  " + pe + ""), function(color, expression) {
    var a, h, l, s, _, _ref2;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], h = _ref2[1], s = _ref2[2], l = _ref2[3], a = _ref2[4];
    return color.rgba = [parseFloat(h.match) * 255, parseFloat(s.match) * 255, parseFloat(l.match) * 255, parseFloat(a.match)];
  });

  Color.addExpression('hwb', strip("  hwb" + ps + "\\s*    (" + int + "|" + variables + ")    " + comma + "    (" + percent + "|" + variables + ")    " + comma + "    (" + percent + "|" + variables + ")    (" + comma + "(" + float + "|" + variables + "))?  " + pe + ""), function(color, expression, fileVariables) {
    var a, b, h, w, _, _ref2;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], h = _ref2[1], _ = _ref2[2], w = _ref2[3], _ = _ref2[4], b = _ref2[5], _ = _ref2[6], _ = _ref2[7], a = _ref2[8];
    color.hwb = [parseInt(h.match, fileVariables), parseFloat(w.match, fileVariables), parseFloat(b.match, fileVariables)];
    return color.alpha = a.match.length ? parseFloat(a.match, fileVariables) : 1;
  });

  Color.addExpression('gray', strip("  gray" + ps + "\\s*    (" + percent + ")    (" + comma + "(" + float + "))?  " + pe), 1, function(color, expression) {
    var a, p, _, _ref2;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], p = _ref2[1], _ = _ref2[2], a = _ref2[3];
    p = parseFloat(p.match) / 100 * 255;
    color.rgb = [p, p, p];
    return color.alpha = a.match.length ? parseFloat(a.match) : 1;
  });

  colors = Object.keys(Color.namedColors);

  colorRegexp = "\\b(?<![\\.\\$@-])(?i)(" + (colors.join('|')) + ")(?-i)(?!\\s*[-\\.:=])\\b";

  Color.addExpression('named_colors', colorRegexp, function(color, expression) {
    var name, _, _ref2;
    _ref2 = this.onigRegExp.searchSync(expression), _ = _ref2[0], name = _ref2[1];
    return color.name = name.match;
  });

}).call(this);
