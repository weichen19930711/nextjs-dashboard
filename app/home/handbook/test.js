var abee = ['', 1];
console.log(typeof abee);
// 剩余元素[string, number, ...boolean[]]
function readButtonInput3(args) {
    console.log(args);
    var name = args[0], version = args[1], input = args.slice(2);
    // ...
}
function readButtonInput32() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    console.log(args);
    var name = args[0], version = args[1], input = args.slice(2);
    // ...
}
function readButtonInput322(name, version) {
    var input = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        input[_i - 2] = arguments[_i];
    }
    // ...
}
readButtonInput3(['beautiful', 2, true]);
readButtonInput32('beautiful', 2, true);
