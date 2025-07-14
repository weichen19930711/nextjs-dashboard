var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var obj = { x: 0 };
// None of the following lines of code will throw compiler errors.
// Using `any` disables all further type checking, and it is assumed
// you know the environment better than TypeScript.
obj.foo();
obj();
obj.bar = 100;
obj = 'hello';
var n = obj;
function fn(s) {
    // No error?
    console.log(s.subtr(3));
}
fn(42);
function greet(name) {
    console.log('Hello, ' + name.toUpperCase() + '!!');
}
// greet(42);
function getFavoriteNumber() {
    return 26;
}
//返回 Promise 的函数
function getAsyncFavoriteNumber() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, 26];
        });
    });
}
// 匿名函数
// 上下文类型
var names = ['Alice', 'Bob', 'Eve'];
// Contextual typing for function - parameter s inferred to have type string
names.forEach(function (s) {
    console.log(s.toUpperCase());
});
// Contextual typing also applies to arrow functions
names.forEach(function (s) {
    console.log(s.toUpperCase());
});
// 对象类型 如果你没有指定number类型，则系统会默认为any
function printCoord(pt) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });
// 可选属性
function printName(obj) {
    var _a;
    // Error - might crash if 'obj.last' wasn't provided!
    //   console.log(obj.last.toUpperCase());
    if (obj.last !== undefined) {
        // OK
        console.log(obj.last.toUpperCase());
    }
    console.log((_a = obj.last) === null || _a === void 0 ? void 0 : _a.toUpperCase());
}
// Both OK
printName({ first: 'Bob' });
printName({ first: 'Alice', last: 'Alisson' });
// 联合类型
function printId(id) {
    console.log('Your ID is: ' + id);
}
// OK
printId(101);
// OK
printId('202');
// Error
// printId({ myID: 22342 });
function printTextOrNumberOrBool(textOrNumberOrBool) {
    console.log(textOrNumberOrBool);
}
function printCoord2(pt) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 100, y: 100 });
function sanitizeInput(str) {
    return sanitize(str);
}
var userInput = sanitizeInput(getInput());
userInput = 'ccccc';
//anonymous object type
function printCoord3(pt) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}
printCoord3({ x: 100, y: 100 });
var bear = getBear();
bear.name;
bear.honey;
var orchid = getOrchid();
orchid.name;
orchid.honey;
// 类型断言
/**
 * 有时您会获得 TypeScript 无法了解的值类型的信息 document.getElementById
 *      1 TypeScript 只知道这将返回某种HTMLElement
 */
var myCanvas = document.getElementById('main_canvas');
// 除非代码在.tsx文件中.和下面注释等价
// <HTMLCanvasElement>document.getElementById("main_canvas");
var a = 'expr';
var req = { url: 'https://example.com', method: 'GET' };
// req.method被推断为string，string不能直接赋值给 method
handleRequest(req.url, req.method);
// 方式 1:
var req2 = { url: 'https://example.com', method: 'GET' };
handleRequest(req2.url, req2.method);
// 方式 1:
var req3 = { url: 'https://example.com', method: 'GET' };
handleRequest(req2.url, req2.method);
// 方式 2:
var req4 = { url: 'https://example.com', method: 'GET' };
handleRequest(req4.url, req4.method);
// null和undefined
// strictNullChecks 关闭
// 关闭时，值可能或仍然可以正常访问，并且这些值可以赋值给任何类型的属性
// strictNullChecks 打开
function doSomething(x) {
    // 缩小范围
    if (x === null) {
        // do nothing
    }
    else {
        console.log('Hello, ' + x.toUpperCase());
    }
}
//非空断言运算符（后缀!）
function liveDangerously(x) {
    // No error
    console.log(x.toFixed());
}
liveDangerously(null);
