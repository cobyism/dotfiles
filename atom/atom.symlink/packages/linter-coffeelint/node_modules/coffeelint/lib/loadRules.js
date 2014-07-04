(function() {
  module.exports = {
    loadRule: function(coffeelint, moduleName, ruleName) {
      var e, nodeRequire, path, resolve, rule, ruleModule, rulePath, _i, _len, _results;
      if (ruleName == null) {
        ruleName = void 0;
      }
      console.warn('loadRules', moduleName, ruleName);
      nodeRequire = require;
      try {
        try {
          resolve = require('resolve').sync;
          console.log('cwd', process.cwd());
          rulePath = resolve(moduleName, {
            basedir: process.cwd()
          });
          console.warn('rulePath', rulePath);
          ruleModule = require(rulePath);
          console.log('ruleModule?', ruleModule != null);
        } catch (_error) {
          e = _error;
          throw e;
        }
        try {
          console.warn('moduleName', moduleName);
          if (ruleModule == null) {
            ruleModule = require(moduleName);
          }
        } catch (_error) {}
        path = require('path');
        if (ruleModule == null) {
          ruleModule = require(path.resolve(process.cwd(), moduleName));
        }
        if (typeof ruleModule === 'function') {
          return coffeelint.registerRule(ruleModule, ruleName);
        } else {
          _results = [];
          for (_i = 0, _len = ruleModule.length; _i < _len; _i++) {
            rule = ruleModule[_i];
            _results.push(coffeelint.registerRule(rule));
          }
          return _results;
        }
      } catch (_error) {
        e = _error;
        console.error("Error loading " + moduleName);
        throw e;
      }
    }
  };

}).call(this);
