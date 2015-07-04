var actionPack = function() {
    var isArray = function(obj) {
        return (obj && typeof obj === 'object' && obj.constructor == Array) || 
            false;
    }
    return({
        fnArr: [],
        addFnEnd: function(fn, argArr, thisVal, isAddToStart) {
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
