(function() {
  var Directory, Emitter, File, PathWatcher, Q, crypto, fs, path, runas, _,
    __slice = [].slice;

  crypto = require('crypto');

  path = require('path');

  _ = require('underscore-plus');

  Emitter = require('emissary').Emitter;

  fs = require('fs-plus');

  Q = require('q');

  runas = require('runas');

  Directory = null;

  PathWatcher = require('./main');

  module.exports = File = (function() {
    Emitter.includeInto(File);

    File.prototype.realPath = null;

    function File(filePath, symlink) {
      this.symlink = symlink != null ? symlink : false;
      if (fs.isDirectorySync(filePath)) {
        throw new Error("" + filePath + " is a directory");
      }
      if (filePath) {
        filePath = path.normalize(filePath);
      }
      this.path = filePath;
      this.cachedContents = null;
      this.handleEventSubscriptions();
    }

    File.prototype.handleEventSubscriptions = function() {
      var eventNames, subscriptionsAdded, subscriptionsRemoved;
      eventNames = ['contents-changed', 'moved', 'removed'];
      subscriptionsAdded = eventNames.map(function(eventName) {
        return "first-" + eventName + "-subscription-will-be-added";
      });
      this.on(subscriptionsAdded.join(' '), (function(_this) {
        return function() {
          if (_this.exists()) {
            return _this.subscribeToNativeChangeEvents();
          }
        };
      })(this));
      subscriptionsRemoved = eventNames.map(function(eventName) {
        return "last-" + eventName + "-subscription-removed";
      });
      return this.on(subscriptionsRemoved.join(' '), (function(_this) {
        return function() {
          var subscriptionsEmpty;
          subscriptionsEmpty = _.every(eventNames, function(eventName) {
            return _this.getSubscriptionCount(eventName) === 0;
          });
          if (subscriptionsEmpty) {
            return _this.unsubscribeFromNativeChangeEvents();
          }
        };
      })(this));
    };

    File.prototype.isFile = function() {
      return true;
    };

    File.prototype.isDirectory = function() {
      return false;
    };

    File.prototype.setPath = function(path) {
      this.path = path;
      return this.realPath = null;
    };

    File.prototype.getPath = function() {
      return this.path;
    };

    File.prototype.getParent = function() {
      if (Directory == null) {
        Directory = require('./directory');
      }
      return new Directory(path.dirname(this.path));
    };

    File.prototype.getRealPathSync = function() {
      var error;
      if (this.realPath == null) {
        try {
          this.realPath = fs.realpathSync(this.path);
        } catch (_error) {
          error = _error;
          this.realPath = this.path;
        }
      }
      return this.realPath;
    };

    File.prototype.getBaseName = function() {
      return path.basename(this.path);
    };

    File.prototype.write = function(text) {
      var previouslyExisted;
      previouslyExisted = this.exists();
      this.writeFileWithPrivilegeEscalationSync(this.getPath(), text);
      this.cachedContents = text;
      if (!previouslyExisted && this.hasSubscriptions()) {
        this.subscribeToNativeChangeEvents();
      }
      return void 0;
    };

    File.prototype.readSync = function(flushCache) {
      if (!this.exists()) {
        this.cachedContents = null;
      } else if ((this.cachedContents == null) || flushCache) {
        this.cachedContents = fs.readFileSync(this.getPath(), 'utf8');
      }
      this.setDigest(this.cachedContents);
      return this.cachedContents;
    };

    File.prototype.read = function(flushCache) {
      var bytesRead, content, deferred, promise, readStream;
      if (!this.exists()) {
        promise = Q(null);
      } else if ((this.cachedContents == null) || flushCache) {
        deferred = Q.defer();
        promise = deferred.promise;
        content = [];
        bytesRead = 0;
        readStream = fs.createReadStream(this.getPath(), {
          encoding: 'utf8'
        });
        readStream.on('data', function(chunk) {
          content.push(chunk);
          bytesRead += chunk.length;
          return deferred.notify(bytesRead);
        });
        readStream.on('end', function() {
          return deferred.resolve(content.join(''));
        });
        readStream.on('error', function(error) {
          return deferred.reject(error);
        });
      } else {
        promise = Q(this.cachedContents);
      }
      return promise.then((function(_this) {
        return function(contents) {
          _this.setDigest(contents);
          return _this.cachedContents = contents;
        };
      })(this));
    };

    File.prototype.exists = function() {
      return fs.existsSync(this.getPath());
    };

    File.prototype.setDigest = function(contents) {
      return this.digest = crypto.createHash('sha1').update(contents != null ? contents : '').digest('hex');
    };

    File.prototype.getDigest = function() {
      var _ref;
      return (_ref = this.digest) != null ? _ref : this.setDigest(this.readSync());
    };

    File.prototype.writeFileWithPrivilegeEscalationSync = function(filePath, text) {
      var error;
      try {
        return fs.writeFileSync(filePath, text);
      } catch (_error) {
        error = _error;
        if (error.code === 'EACCES' && process.platform === 'darwin') {
          if (runas('/bin/dd', ["of=" + filePath], {
            stdin: text,
            admin: true
          }) !== 0) {
            throw error;
          }
        } else {
          throw error;
        }
      }
    };

    File.prototype.handleNativeChangeEvent = function(eventType, eventPath) {
      var oldContents;
      switch (eventType) {
        case 'delete':
          this.unsubscribeFromNativeChangeEvents();
          return this.detectResurrectionAfterDelay();
        case 'rename':
          this.setPath(eventPath);
          return this.emit('moved');
        case 'change':
          oldContents = this.cachedContents;
          return this.read(true).done((function(_this) {
            return function(newContents) {
              if (oldContents !== newContents) {
                return _this.emit('contents-changed');
              }
            };
          })(this));
      }
    };

    File.prototype.detectResurrectionAfterDelay = function() {
      return _.delay(((function(_this) {
        return function() {
          return _this.detectResurrection();
        };
      })(this)), 50);
    };

    File.prototype.detectResurrection = function() {
      if (this.exists()) {
        this.subscribeToNativeChangeEvents();
        return this.handleNativeChangeEvent('change', this.getPath());
      } else {
        this.cachedContents = null;
        return this.emit('removed');
      }
    };

    File.prototype.subscribeToNativeChangeEvents = function() {
      return this.watchSubscription != null ? this.watchSubscription : this.watchSubscription = PathWatcher.watch(this.path, (function(_this) {
        return function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          return _this.handleNativeChangeEvent.apply(_this, args);
        };
      })(this));
    };

    File.prototype.unsubscribeFromNativeChangeEvents = function() {
      if (this.watchSubscription != null) {
        this.watchSubscription.close();
        return this.watchSubscription = null;
      }
    };

    return File;

  })();

}).call(this);
