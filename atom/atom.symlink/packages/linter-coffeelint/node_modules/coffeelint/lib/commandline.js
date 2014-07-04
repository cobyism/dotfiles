
/*
CoffeeLint

Copyright (c) 2011 Matthew Perpick.
CoffeeLint is freely distributable under the MIT license.
 */

(function() {
  var Cache, CoffeeScript, ErrorReport, coffeelint, config, configfinder, data, deprecatedReporter, errorReport, findCoffeeScripts, fs, getFallbackConfig, glob, lintFiles, lintSource, loadRules, optimist, options, os, path, paths, read, reportAndExit, resolve, ruleLoader, scripts, stdin, thisdir;

  resolve = require('resolve').sync;

  path = require("path");

  fs = require("fs");

  os = require("os");

  glob = require("glob");

  optimist = require("optimist");

  thisdir = path.dirname(fs.realpathSync(__filename));

  coffeelint = require(path.join(thisdir, "coffeelint"));

  configfinder = require(path.join(thisdir, "configfinder"));

  ruleLoader = require(path.join(thisdir, 'ruleLoader'));

  Cache = require(path.join(thisdir, "cache"));

  CoffeeScript = require('coffee-script');

  CoffeeScript.register();

  read = function(path) {
    var realPath;
    realPath = fs.realpathSync(path);
    return fs.readFileSync(realPath).toString();
  };

  findCoffeeScripts = function(paths) {
    var files, p, _i, _len;
    files = [];
    for (_i = 0, _len = paths.length; _i < _len; _i++) {
      p = paths[_i];
      if (fs.statSync(p).isDirectory()) {
        files = files.concat(glob.sync("" + p + "/**/*.coffee"));
      } else {
        files.push(p);
      }
    }
    return files;
  };

  ErrorReport = (function() {
    function ErrorReport() {
      this.paths = {};
    }

    ErrorReport.prototype.getExitCode = function() {
      for (path in this.paths) {
        if (this.pathHasError(path)) {
          return 1;
        }
      }
      return 0;
    };

    ErrorReport.prototype.getSummary = function() {
      var error, errorCount, errors, pathCount, warningCount, _i, _len, _ref;
      pathCount = errorCount = warningCount = 0;
      _ref = this.paths;
      for (path in _ref) {
        errors = _ref[path];
        pathCount++;
        for (_i = 0, _len = errors.length; _i < _len; _i++) {
          error = errors[_i];
          if (error.level === 'error') {
            errorCount++;
          }
          if (error.level === 'warn') {
            warningCount++;
          }
        }
      }
      return {
        errorCount: errorCount,
        warningCount: warningCount,
        pathCount: pathCount
      };
    };

    ErrorReport.prototype.getErrors = function(path) {
      return this.paths[path];
    };

    ErrorReport.prototype.pathHasWarning = function(path) {
      return this._hasLevel(path, 'warn');
    };

    ErrorReport.prototype.pathHasError = function(path) {
      return this._hasLevel(path, 'error');
    };

    ErrorReport.prototype.hasError = function() {
      for (path in this.paths) {
        if (this.pathHasError(path)) {
          return true;
        }
      }
      return false;
    };

    ErrorReport.prototype._hasLevel = function(path, level) {
      var error, _i, _len, _ref;
      _ref = this.paths[path];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        error = _ref[_i];
        if (error.level === level) {
          return true;
        }
      }
      return false;
    };

    return ErrorReport;

  })();

  lintFiles = function(files, config) {
    var errorReport, file, fileConfig, literate, source, _i, _len;
    errorReport = new ErrorReport();
    for (_i = 0, _len = files.length; _i < _len; _i++) {
      file = files[_i];
      source = read(file);
      literate = CoffeeScript.helpers.isLiterate(file);
      fileConfig = config ? config : getFallbackConfig(file);
      errorReport.paths[file] = coffeelint.lint(source, fileConfig, literate);
    }
    return errorReport;
  };

  lintSource = function(source, config, literate) {
    var errorReport;
    if (literate == null) {
      literate = false;
    }
    errorReport = new ErrorReport();
    config || (config = getFallbackConfig());
    errorReport.paths["stdin"] = coffeelint.lint(source, config, literate);
    return errorReport;
  };

  getFallbackConfig = function(filename) {
    if (filename == null) {
      filename = null;
    }
    if (!options.argv.noconfig) {
      return configfinder.getConfig(filename);
    }
  };

  loadRules = function(moduleName, ruleName) {
    var e, rule, ruleModule, rulePath, _i, _len, _results;
    if (ruleName == null) {
      ruleName = void 0;
    }
    try {
      try {
        rulePath = resolve(moduleName, {
          basedir: process.cwd()
        });
        ruleModule = require(rulePath);
      } catch (_error) {}
      try {
        if (ruleModule == null) {
          ruleModule = require(moduleName);
        }
      } catch (_error) {}
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
  };

  deprecatedReporter = function(errorReport, reporter) {
    var _base;
    if ((_base = errorReport.paths)['coffeelint_fake_file.coffee'] == null) {
      _base['coffeelint_fake_file.coffee'] = [];
    }
    errorReport.paths['coffeelint_fake_file.coffee'].push({
      "level": "warn",
      "rule": "commandline",
      "message": "parameter --" + reporter + " is deprecated. Use --reporter " + reporter + " instead",
      "lineNumber": 0
    });
    return reporter;
  };

  reportAndExit = function(errorReport, options) {
    var CSVReporter, CheckstyleReporter, DefaultReporter, JSLintReporter, RawReporter, SelectedReporter, reporter, reporterPath, strReporter;
    strReporter = options.argv.jslint ? deprecatedReporter(errorReport, 'jslint') : options.argv.csv ? deprecatedReporter(errorReport, 'csv') : options.argv.checkstyle ? deprecatedReporter(errorReport, 'checkstyle') : options.argv.reporter;
    DefaultReporter = require(path.join(thisdir, 'reporters', 'default'));
    CSVReporter = require(path.join(thisdir, 'reporters', 'csv'));
    JSLintReporter = require(path.join(thisdir, 'reporters', 'jslint'));
    CheckstyleReporter = require(path.join(thisdir, 'reporters', 'checkstyle'));
    RawReporter = require(path.join(thisdir, 'reporters', 'raw'));
    SelectedReporter = (function() {
      switch (strReporter) {
        case void 0:
        case 'default':
          return DefaultReporter;
        case 'jslint':
          return JSLintReporter;
        case 'csv':
          return CSVReporter;
        case 'checkstyle':
          return CheckstyleReporter;
        case 'raw':
          return RawReporter;
        default:
          try {
            reporterPath = resolve(strReporter, {
              basedir: process.cwd()
            });
          } catch (_error) {
            reporterPath = strReporter;
          }
          return require(reporterPath);
      }
    })();
    reporter = new SelectedReporter(errorReport, {
      colorize: !options.argv.nocolor,
      quiet: options.argv.q
    });
    reporter.publish();
    return process.on('exit', function() {
      return process.exit(errorReport.getExitCode());
    });
  };

  options = optimist.usage("Usage: coffeelint [options] source [...]").alias("f", "file").alias("h", "help").alias("v", "version").alias("s", "stdin").alias("q", "quiet").alias("c", "cache").describe("f", "Specify a custom configuration file.").describe("rules", "Specify a custom rule or directory of rules.").describe("makeconfig", "Prints a default config file").describe("noconfig", "Ignores the environment variable COFFEELINT_CONFIG.").describe("h", "Print help information.").describe("v", "Print current version number.").describe("r", "(not used, but left for backward compatibility)").describe('reporter', 'built in reporter (default, csv, jslint, checkstyle, raw), or module, or path to reporter file.').describe("csv", "[deprecated] use --reporter csv").describe("jslint", "[deprecated] use --reporter jslint").describe("checkstyle", "[deprecated] use --reporter checkstyle").describe("nocolor", "Don't colorize the output").describe("s", "Lint the source from stdin").describe("q", "Only print errors.").describe("literate", "Used with --stdin to process as Literate CoffeeScript").describe("c", "Cache linting results").boolean("csv").boolean("jslint").boolean("checkstyle").boolean("nocolor").boolean("noconfig").boolean("makeconfig").boolean("literate").boolean("r").boolean("s").boolean("q", "Print errors only.").boolean("c");

  if (options.argv.v) {
    console.log(coffeelint.VERSION);
    process.exit(0);
  } else if (options.argv.h) {
    options.showHelp();
    process.exit(0);
  } else if (options.argv.makeconfig) {
    console.log(JSON.stringify(coffeelint.getRules(), (function(k, v) {
      if (k !== 'message' && k !== 'description' && k !== 'name') {
        return v;
      }
    }), 4));
  } else if (options.argv._.length < 1 && !options.argv.s) {
    options.showHelp();
    process.exit(1);
  } else {
    if (options.argv.cache) {
      coffeelint.setCache(new Cache(path.join(os.tmpdir(), 'coffeelint')));
    }
    config = null;
    if (!options.argv.noconfig) {
      if (options.argv.f) {
        config = JSON.parse(read(options.argv.f));
      } else if (process.env.COFFEELINT_CONFIG && fs.existsSync(process.env.COFFEELINT_CONFIG)) {
        config = JSON.parse(read(process.env.COFFEELINT_CONFIG));
      }
    }
    if (options.argv.rules) {
      ruleLoader.loadRule(coffeelint, options.argv.rules);
    }
    if (options.argv.s) {
      data = '';
      stdin = process.openStdin();
      stdin.on('data', function(buffer) {
        if (buffer) {
          return data += buffer.toString();
        }
      });
      stdin.on('end', function() {
        var errorReport;
        errorReport = lintSource(data, config, options.argv.literate);
        return reportAndExit(errorReport, options);
      });
    } else {
      paths = options.argv._;
      scripts = findCoffeeScripts(paths);
      errorReport = lintFiles(scripts, config, options.argv.literate);
      reportAndExit(errorReport, options);
    }
  }

}).call(this);
