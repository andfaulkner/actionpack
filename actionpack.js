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
            var retArr = [];
            this.fnArr.forEach(function(fn){
                var retVal = "";
                fn.thisVal = fn.thisVal || fn.func;
                if (!fn.args) {
                    retVal = fn['func'].call(fn.thisVal) || "";
                } else if (isArray(fn.args)) {
                    retVal = fn['func'].apply(fn.thisVal, fn.args) || "";
                } else {
                    retVal = fn['func'].call(fn.thisVal, fn.args) || "";
                }
                retArr.push(retVal);
                return;
            });
            if (!isKeep) this.fnArr = [];
            return retArr;
        },

        
        wipeAll: function() {
            this.fnArr = [];
        },

    });
};
