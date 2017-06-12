//>>built
define("dojox/storage/CookieStorageProvider",["dojo","dijit","dojox","dojo/require!dojox/storage/Provider,dojox/storage/manager,dojo/cookie"],function(c,g,e){c.provide("dojox.storage.CookieStorageProvider");c.require("dojox.storage.Provider");c.require("dojox.storage.manager");c.require("dojo.cookie");c.declare("dojox.storage.CookieStorageProvider",[e.storage.Provider],{store:null,cookieName:"dojoxStorageCookie",storageLife:730,initialize:function(){this.store=c.fromJson(c.cookie(this.cookieName))||
{};this.initialized=!0;e.storage.manager.loaded()},isAvailable:function(){return c.cookie.isSupported()},put:function(a,b,f,d){this._assertIsValidKey(a);d=d||this.DEFAULT_NAMESPACE;this._assertIsValidNamespace(d);fullKey=this.getFullKey(a,d);this.store[fullKey]=c.toJson(b);this._save();(b=c.toJson(this.store)===c.cookie(this.cookieName))||this.remove(a,d);f&&f(b?this.SUCCESS:this.FAILED,a,null,d)},get:function(a,b){this._assertIsValidKey(a);b=b||this.DEFAULT_NAMESPACE;this._assertIsValidNamespace(b);
a=this.getFullKey(a,b);return this.store[a]?c.fromJson(this.store[a]):null},getKeys:function(a){a=a||this.DEFAULT_NAMESPACE;this._assertIsValidNamespace(a);a="__"+a+"_";var b=[],c;for(c in this.store)this._beginsWith(c,a)&&(c=c.substring(a.length),b.push(c));return b},clear:function(a){a=a||this.DEFAULT_NAMESPACE;this._assertIsValidNamespace(a);a="__"+a+"_";for(var b in this.store)this._beginsWith(b,a)&&delete this.store[b];this._save()},remove:function(a,b){b=b||this.DEFAULT_NAMESPACE;this._assertIsValidNamespace(b);
this._assertIsValidKey(a);a=this.getFullKey(a,b);delete this.store[a];this._save()},getNamespaces:function(){var a=[this.DEFAULT_NAMESPACE],b={};b[this.DEFAULT_NAMESPACE]=!0;var c=/^__([^_]*)_/,d;for(d in this.store)if(1==c.test(d)){var e=d.match(c)[1];"undefined"==typeof b[e]&&(b[e]=!0,a.push(e))}return a},isPermanent:function(){return!0},getMaximumSize:function(){return 4},hasSettingsUI:function(){return!1},isValidKey:function(a){return null===a||void 0===a?!1:/^[0-9A-Za-z_-]*$/.test(a)},isValidNamespace:function(a){return null===
a||void 0===a?!1:/^[0-9A-Za-z-]*$/.test(a)},getFullKey:function(a,b){return"__"+b+"_"+a},_save:function(){c.cookie(this.cookieName,c.toJson(this.store),{expires:this.storageLife})},_beginsWith:function(a,b){return b.length>a.length?!1:a.substring(0,b.length)===b},_assertIsValidNamespace:function(a){if(!1===this.isValidNamespace(a))throw Error("Invalid namespace given: "+a);},_assertIsValidKey:function(a){if(!1===this.isValidKey(a))throw Error("Invalid key given: "+a);}});e.storage.manager.register("dojox.storage.CookieStorageProvider",
new e.storage.CookieStorageProvider)});
//# sourceMappingURL=CookieStorageProvider.js.map