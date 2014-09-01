(function() {
  var Directory, Emitter, File, PathWatcher, async, fs, path,
    __slice = [].slice;

  path = require('path');

  async = require('async');

  Emitter = require('emissary').Emitter;

  fs = require('fs-plus');

  File = require('./file');

  PathWatcher = require('./main');

  module.exports = Directory = (function() {
    Emitter.includeInto(Directory);

    Directory.prototype.realPath = null;

    function Directory(directoryPath, symlink) {
      this.symlink = symlink != null ? symlink : false;
      if (directoryPath) {
        directoryPath = path.normalize(directoryPath);
        if (directoryPath.length > 1 && directoryPath[directoryPath.length - 1] === path.sep) {
          directoryPath = directoryPath.substring(0, directoryPath.length - 1);
        }
      }
      this.path = directoryPath;
      this.on('first-contents-changed-subscription-will-be-added', (function(_this) {
        return function() {
          return _this.subscribeToNativeChangeEvents();
        };
      })(this));
      this.on('last-contents-changed-subscription-removed', (function(_this) {
        return function() {
          return _this.unsubscribeFromNativeChangeEvents();
        };
      })(this));
      if (fs.isCaseInsensitive()) {
        this.lowerCasePath = this.path.toLowerCase();
      }
    }

    Directory.prototype.getBaseName = function() {
      return path.basename(this.path);
    };

    Directory.prototype.getPath = function() {
      return this.path;
    };

    Directory.prototype.isFile = function() {
      return false;
    };

    Directory.prototype.isDirectory = function() {
      return true;
    };

    Directory.prototype.getFile = function() {
      var filename;
      filename = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return new File(path.join.apply(path, [this.getPath()].concat(__slice.call(filename))));
    };

    Directory.prototype.getSubdirectory = function() {
      var dirname;
      dirname = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return new Directory(path.join.apply(path, [this.path].concat(__slice.call(dirname))));
    };

    Directory.prototype.getParent = function() {
      return new Directory(path.join(this.path, '..'));
    };

    Directory.prototype.isRoot = function() {
      return this.getParent().getRealPathSync() === this.getRealPathSync();
    };

    Directory.prototype.getRealPathSync = function() {
      var e;
      if (this.realPath == null) {
        try {
          this.realPath = fs.realpathSync(this.path);
          if (fs.isCaseInsensitive()) {
            this.lowerCaseRealPath = this.realPath.toLowerCase();
          }
        } catch (_error) {
          e = _error;
          this.realPath = this.path;
          if (fs.isCaseInsensitive()) {
            this.lowerCaseRealPath = this.lowerCasePath;
          }
        }
      }
      return this.realPath;
    };

    Directory.prototype.contains = function(pathToCheck) {
      var directoryPath;
      if (!pathToCheck) {
        return false;
      }
      if (process.platform === 'win32') {
        pathToCheck = pathToCheck.replace(/\//g, '\\');
      }
      if (fs.isCaseInsensitive()) {
        directoryPath = this.lowerCasePath;
        pathToCheck = pathToCheck.toLowerCase();
      } else {
        directoryPath = this.path;
      }
      if (this.isPathPrefixOf(directoryPath, pathToCheck)) {
        return true;
      }
      this.getRealPathSync();
      if (fs.isCaseInsensitive()) {
        directoryPath = this.lowerCaseRealPath;
      } else {
        directoryPath = this.realPath;
      }
      return this.isPathPrefixOf(directoryPath, pathToCheck);
    };

    Directory.prototype.relativize = function(fullPath) {
      var directoryPath, pathToCheck;
      if (!fullPath) {
        return fullPath;
      }
      if (process.platform === 'win32') {
        fullPath = fullPath.replace(/\//g, '\\');
      }
      if (fs.isCaseInsensitive()) {
        pathToCheck = fullPath.toLowerCase();
        directoryPath = this.lowerCasePath;
      } else {
        pathToCheck = fullPath;
        directoryPath = this.path;
      }
      if (pathToCheck === directoryPath) {
        return '';
      } else if (this.isPathPrefixOf(directoryPath, pathToCheck)) {
        return fullPath.substring(directoryPath.length + 1);
      }
      this.getRealPathSync();
      if (fs.isCaseInsensitive()) {
        directoryPath = this.lowerCaseRealPath;
      } else {
        directoryPath = this.realPath;
      }
      if (pathToCheck === directoryPath) {
        return '';
      } else if (this.isPathPrefixOf(directoryPath, pathToCheck)) {
        return fullPath.substring(directoryPath.length + 1);
      } else {
        return fullPath;
      }
    };

    Directory.prototype.getEntriesSync = function() {
      var directories, entryPath, files, stat, symlink, _i, _len, _ref;
      directories = [];
      files = [];
      _ref = fs.listSync(this.path);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entryPath = _ref[_i];
        try {
          stat = fs.lstatSync(entryPath);
          symlink = stat.isSymbolicLink();
          if (symlink) {
            stat = fs.statSync(entryPath);
          }
        } catch (_error) {}
        if (stat != null ? stat.isDirectory() : void 0) {
          directories.push(new Directory(entryPath, symlink));
        } else if (stat != null ? stat.isFile() : void 0) {
          files.push(new File(entryPath, symlink));
        }
      }
      return directories.concat(files);
    };

    Directory.prototype.getEntries = function(callback) {
      return fs.list(this.path, function(error, entries) {
        var addEntry, directories, files, statEntry;
        if (error != null) {
          return callback(error);
        }
        directories = [];
        files = [];
        addEntry = function(entryPath, stat, symlink, callback) {
          if (stat != null ? stat.isDirectory() : void 0) {
            directories.push(new Directory(entryPath, symlink));
          } else if (stat != null ? stat.isFile() : void 0) {
            files.push(new File(entryPath, symlink));
          }
          return callback();
        };
        statEntry = function(entryPath, callback) {
          return fs.lstat(entryPath, function(error, stat) {
            if (stat != null ? stat.isSymbolicLink() : void 0) {
              return fs.stat(entryPath, function(error, stat) {
                return addEntry(entryPath, stat, true, callback);
              });
            } else {
              return addEntry(entryPath, stat, false, callback);
            }
          });
        };
        return async.eachLimit(entries, 1, statEntry, function() {
          return callback(null, directories.concat(files));
        });
      });
    };

    Directory.prototype.subscribeToNativeChangeEvents = function() {
      return this.watchSubscription != null ? this.watchSubscription : this.watchSubscription = PathWatcher.watch(this.path, (function(_this) {
        return function(eventType) {
          if (eventType === 'change') {
            return _this.emit('contents-changed');
          }
        };
      })(this));
    };

    Directory.prototype.unsubscribeFromNativeChangeEvents = function() {
      if (this.watchSubscription != null) {
        this.watchSubscription.close();
        return this.watchSubscription = null;
      }
    };

    Directory.prototype.isPathPrefixOf = function(prefix, fullPath) {
      return fullPath.indexOf(prefix) === 0 && fullPath[prefix.length] === path.sep;
    };

    return Directory;

  })();

}).call(this);
