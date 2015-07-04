var global = Function("return this;")();
/*!
  * Ender: open module JavaScript framework (client-lib)
  * copyright Dustin Diaz & Jacob Thornton 2011 (@ded @fat)
  * http://ender.no.de
  * License MIT
  */
!function (context) {

  // a global object for node.js module compatiblity
  // ============================================

  context['global'] = context

  // Implements simple module system
  // losely based on CommonJS Modules spec v1.1.1
  // ============================================

  var modules = {}
    , old = context.$

  function require (identifier) {
    // modules can be required from ender's build system, or found on the window
    var module = modules[identifier] || window[identifier]
    if (!module) throw new Error("Requested module '" + identifier + "' has not been defined.")
    return module
  }

  function provide (name, what) {
    return (modules[name] = what)
  }

  context['provide'] = provide
  context['require'] = require

  function aug(o, o2) {
    for (var k in o2) k != 'noConflict' && k != '_VERSION' && (o[k] = o2[k])
    return o
  }

  function boosh(s, r, els) {
    // string || node || nodelist || window
    if (typeof s == 'string' || s.nodeName || (s.length && 'item' in s) || s == window) {
      els = ender._select(s, r)
      els.selector = s
    } else els = isFinite(s.length) ? s : [s]
    return aug(els, boosh)
  }

  function ender(s, r) {
    return boosh(s, r)
  }

  aug(ender, {
      _VERSION: '0.3.6'
    , fn: boosh // for easy compat to jQuery plugins
    , ender: function (o, chain) {
        aug(chain ? boosh : ender, o)
      }
    , _select: function (s, r) {
        return (r || document).querySelectorAll(s)
      }
  })

  aug(boosh, {
    forEach: function (fn, scope, i) {
      // opt out of native forEach so we can intentionally call our own scope
      // defaulting to the current item and be able to return self
      for (i = 0, l = this.length; i < l; ++i) i in this && fn.call(scope || this[i], this[i], i, this)
      // return self for chaining
      return this
    },
    $: ender // handy reference to self
  })

  ender.noConflict = function () {
    context.$ = old
    return this
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = ender
  // use subscript notation as extern for Closure compilation
  context['ender'] = context['$'] = context['ender'] || ender

}(this);
// pakmanager:actionpack
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  var actionpack = function() {
        var isArray = function(obj) {
            return (obj && typeof obj === 'object' && obj.constructor == Array) || 
                false;
        }
        return({
            fnArr: [],
            addFn: function(fn, argArr, thisVal, isAddToStart) {
                var len;
                //Add nothing if it didn't receive a function
                if (! (typeof fn === "function")) return false;
                if (!isAddToStart) { 
                    this.fnArr.push({ func: fn });
                    len = this.fnArr.length - 1;
                } else { 
                    this.fnArr.unshift({ func: fn });
                    len = 0;
                };
                if (typeof argArr !== "undefined") this.fnArr[len].args = argArr;
                this.fnArr[len].thisVal = thisVal || fn;
                return this.fnArr;
            },
    
            runAll: function(isKeep) {
                this.fnArr.forEach(function(fn){
                    fn.thisVal = fn.thisVal || fn.func;
                    if (!fn.args) {
                        fn['func'].call(fn.thisVal);
                    } else if (isArray(fn.args)) { 
                        fn['func'].apply(fn.thisVal, fn.args);
                        return;
                    } else {
                        fn['func'].call(fn.thisVal, fn.args);
                    }
                    return;
                });
                if (!isKeep) this.fnArr = [];
            },
            
            wipeAll: function() {
                this.fnArr = [];
            },
    
        });
    };
    
  provide("actionpack", module.exports);
}(global));