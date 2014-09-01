(function() {
  var utils;

  utils = {
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
    parseFloat: function(value, vars) {
      var res, _ref;
      if (vars == null) {
        vars = {};
      }
      res = parseFloat(value);
      if (isNaN(res)) {
        res = parseFloat((_ref = vars[value]) != null ? _ref.value : void 0);
      }
      return res;
    },
    parseInt: function(value, base, vars) {
      var res, _ref, _ref1;
      if (vars == null) {
        vars = {};
      }
      if (typeof base === 'object') {
        _ref = [10, base], base = _ref[0], vars = _ref[1];
      }
      res = parseInt(value, base);
      if (isNaN(res)) {
        res = parseInt((_ref1 = vars[value]) != null ? _ref1.value : void 0, base);
      }
      return res;
    },
    parseIntOrPercent: function(value, vars) {
      var res, _ref;
      if (vars == null) {
        vars = {};
      }
      if (!/\d+/.test(value)) {
        value = (_ref = vars[value]) != null ? _ref.value : void 0;
      }
      if (value == null) {
        return NaN;
      }
      if (value.indexOf('%') !== -1) {
        res = Math.round(parseFloat(value) * 2.55);
      } else {
        res = parseInt(value);
      }
      return res;
    },
    parseFloatOrPercent: function(amount, vars) {
      var res, _ref;
      if (vars == null) {
        vars = {};
      }
      if (!/\d+/.test(amount)) {
        amount = (_ref = vars[amount]) != null ? _ref.value : void 0;
      }
      if (amount == null) {
        return NaN;
      }
      if (amount.indexOf('%') !== -1) {
        res = parseFloat(amount) / 100;
      } else {
        res = parseFloat(amount);
      }
      return res;
    },
    findClosingIndex: function(s, startIndex, openingChar, closingChar) {
      var curStr, index, nests;
      if (startIndex == null) {
        startIndex = 0;
      }
      if (openingChar == null) {
        openingChar = "[";
      }
      if (closingChar == null) {
        closingChar = "]";
      }
      index = startIndex;
      nests = 1;
      while (nests && index < s.length) {
        curStr = s.substr(index++, 1);
        if (curStr === closingChar) {
          nests--;
        } else if (curStr === openingChar) {
          nests++;
        }
      }
      if (nests === 0) {
        return index - 1;
      } else {
        return -1;
      }
    },
    split: function(s, sep) {
      var a, c, i, l, start;
      if (sep == null) {
        sep = ",";
      }
      a = [];
      l = s.length;
      i = 0;
      start = 0;
      while (i < l) {
        c = s.substr(i, 1);
        switch (c) {
          case "(":
            i = utils.findClosingIndex(s, i + 1, c, ")");
            break;
          case "[":
            i = utils.findClosingIndex(s, i + 1, c, "]");
            break;
          case "":
            i = utils.findClosingIndex(s, i + 1, c, "");
            break;
          case sep:
            a.push(utils.strip(s.substr(start, i - start)));
            start = i + 1;
        }
        i++;
      }
      a.push(utils.strip(s.substr(start, i - start)));
      return a;
    }
  };

  module.exports = utils;

}).call(this);
