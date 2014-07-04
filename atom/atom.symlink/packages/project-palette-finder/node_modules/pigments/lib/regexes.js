(function() {
  var float, int, percent;

  int = '\\d+';

  float = "" + int + "(?:\\." + int + ")?";

  percent = "" + float + "%";

  module.exports = {
    int: int,
    float: float,
    percent: percent,
    intOrPercent: "(" + percent + "|" + int + ")",
    floatOrPercent: "(" + percent + "|" + float + ")",
    comma: '\\s*,\\s*',
    notQuote: "[^\"'\n]*",
    hexa: '[\\da-fA-F]',
    ps: '\\(\\s*',
    pe: '\\s*\\)'
  };

}).call(this);
