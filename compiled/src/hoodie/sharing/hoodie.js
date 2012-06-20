// Generated by CoffeeScript 1.3.3
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define('hoodie/sharing/hoodie', ['hoodie'], function(Hoodie) {
  var SharingHoodie;
  return SharingHoodie = (function(_super) {

    __extends(SharingHoodie, _super);

    SharingHoodie.prototype.modules = ['hoodie/account', 'hoodie/remote'];

    function SharingHoodie(hoodie, sharing) {
      this.sharing = sharing;
      this.store = hoodie.store;
      this.config = this.sharing.config;
      this.config.set('remote.active', this.sharing.continuous === true);
      SharingHoodie.__super__.constructor.call(this, hoodie.base_url);
    }

    SharingHoodie.prototype.request = function(type, path, options) {
      var auth, defaults, hash;
      if (options == null) {
        options = {};
      }
      if (path === '/_session') {
        this.defer().resolve().promise();
      }
      defaults = {
        type: type,
        url: "" + this.base_url + path,
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        dataType: 'json'
      };
      if (type !== 'PUT') {
        console.log("hash: ", "sharing/" + this.sharing.id + ":" + this.sharing.password, this.sharing);
        hash = btoa("sharing/" + this.sharing.id + ":" + this.sharing.password);
        auth = "Basic " + hash;
        $.extend(defaults, {
          headers: {
            Authorization: auth
          }
        });
      }
      return $.ajax($.extend(defaults, options));
    };

    return SharingHoodie;

  })(Hoodie);
});
