(function() {
  module.exports = {
    strip: function(str) {
      return str.replace(/\s+/g, '');
    },
    clamp: function(n) {
      return Math.min(1, Math.max(0, n));
    },
    clampInt: function(n, max) {
      if (max == null) {
        max = 100;
      }
      return Math.min(max, Math.max(0, n));
    },
    parseIntOrPercent: function(value) {
      if (value.indexOf('%') !== -1) {
        return value = Math.round(parseFloat(value) * 2.55);
      } else {
        return value = parseInt(value);
      }
    },
    parseFloatOrPercent: function(amount) {
      if (amount.indexOf('%') !== -1) {
        return parseFloat(amount) / 100;
      } else {
        return parseFloat(amount);
      }
    }
  };

}).call(this);
