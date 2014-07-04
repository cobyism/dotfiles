(function() {
  var Color;

  Color = require('./color-model');

  Color.addVariableExpression('less', '(@[a-zA-Z0-9-_]+)\\s*:\\s*(.*);');

  Color.addVariableExpression('scss', '(\\$[a-zA-Z0-9-_]+):\\s*(.*);');

  Color.addVariableExpression('sass', '(\\$[a-zA-Z0-9-_]+):\\s*(.*)$');

  Color.addVariableExpression('stylus', '([a-zA-Z0-9_][a-zA-Z0-9-_]*)\\s*=\\s*([^\\n;]*);?$');

}).call(this);
