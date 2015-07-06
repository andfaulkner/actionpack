# actionpack
Create a bundle of Javascript functions and parameters that can be collected and run in sequence with a single command.

## Usage

####Constructor
```javascript
var bundleInstance = actionpack();  //Create a new actionPack object
```
* each call to actionpack creates a new instance.

####bundleInstance.addFn(fn, paramOrArrayOfParams, thisArg, isAddFunctionToStart)
* Add a function to the bundle
* fn: function to add to the bundle (i.e. the list of functions to call in sequence)
* parameter to pass to the function when it is called, or an array of parameters if the function takes several arguments
* thisArg: what object 'this' points to for the function being run
* isAddFunctionToStart: if true, the added function is placed at the start of the list of functions, and will thus be triggered first (unless another function is added with this parameter equal to true).

####bundleInstance.wipeAll();
* remove all functions from the bundle

####bundleInstance.fireAll(doRemoveAfterRunning);
* fire all functions in the bundle, in order.
* doRemoveAfterRunning: if true, wipe the array clean after running.

```javascript
var hello = function(yourName) {
    alert("hello " + yourName);
    return "hellohello";
};
var goodbyeToBoth = function(name1, name2) {
    alert("goodbye " + yourName + " and " + name2);
    return "byebye";
};
var seeya = function() {
    alert("See ya!");
    return "bye!";
};

myCommandBundle.addFn(goodbyeToBoth, ["Coffee", "Kyra"], goodbyeToBoth);
myCommandBundle.addFn(goodbyeToBoth, ["Meeka", "Callie"], goodbyeToBoth);
myCommandBundle.addFn(seeya, null, seeya);
myCommandBundle.addFn(hello, "Meeka", hello, true);
var returnVals = myCommandBundle.fireAll();
//--> displays (in order): 1) "hello Meeka"; 2) "goodbye Coffee and Kyra"; 3) "goodbye Meeka and Callie"; 4) "See ya!"; returnVals now equals ["hellohello", "byebye", "bye!"] - the return values are stored in an array.   

myCommandBundle.fireAll(true);
//--> displays the same as before;

myCommandBundle.fireAll();
//--> displays nothing at all. The functions were wiped from the array by the previous call

myCommandBundle.addFn(seeya, null, seeya);
myCommandBundle.wipeAll();
myCommandBundle.fireAll();
//--> displays nothing. The functions were wiped by the call to wipeAll.
```
