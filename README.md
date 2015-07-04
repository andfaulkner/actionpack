# actionpack
Create a bundle of Javascript functions and parameters that can be collected and run in sequence with a single command.

## Usage

####Constructor
var myCommandBundle = actionPack();  //Create a new actionPack object

####myCommandBundle.addFn(fn, paramOrArrayOfParams, thisArg, isAddFunctionToStart)
* Add a function to the bundle
* fn: function to add to the bundle (i.e. the list of functions to call in sequence)
* parameter to pass to the function when it is called, or an array of parameters if the function takes several arguments
* thisArg: what object 'this' points to for the function being run
* isAddFunctionToStart: if true, the added function is placed at the start of the list of functions, and will thus be triggered first (unless another function is added with this parameter equal to true).

####myCommandBundle.wipeAll();
* remove all functions from the bundle

####myCommandBundle.fireAll(doRemoveAfterRunning);
* fire all functions in the bundle, in order.
* doRemoveAfterRunning: if true, wipe the array clean after running.

```javascript
var hello = function(yourName) {
    alert("hello " + yourName);
};
var goodbyeToBoth = function(name1, name2) {
    alert("goodbye " + yourName + " and " + name2);
};
var seeya = function() {
    ("See ya!");
};

myCommandBundle.addFn(goodbyeToBoth, ["Coffee", "Kyra"], goodbyeToBoth);
myCommandBundle.addFn(goodbyeToBoth, ["Meeka", "Callie"], goodbyeToBoth);
myCommandBundle.addFn(seeya, null, seeya);
myCommandBundle.addFn(hello, "Meeka", hello, true);
myCommandBundle.fireAll();
//--> displays (in order): 1) "hello Meeka"; 2) "goodbye Coffee and Kyra"; 3) "goodbye Meeka and Callie"; 4) "See ya!";

myCommandBundle.fireAll(true);
//--> displays the same as before;

myCommandBundle.fireAll();
//--> displays nothing at all. The functions were wiped from the array by the previous call

myCommandBundle.addFn(seeya, null, seeya);
myCommandBundle.wipeAll();
myCommandBundle.fireAll();
//--> displays nothing. The functions were wiped by the call to wipeAll.
```
