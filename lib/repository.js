'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Repository = function () {
    function Repository(values) {
        _classCallCheck(this, Repository);

        this.values = values || {};
    }

    Repository.prototype.set = function set(key, value) {
        this.values[key] = value;
    };

    Repository.prototype.get = function get(key) {
        return this.values[key];
    };

    Repository.prototype.has = function has(key) {
        return !!this.get(key);
    };

    Repository.prototype.delete = function _delete(key) {
        delete this.values[key];
    };

    return Repository;
}();

exports.Repository = Repository;