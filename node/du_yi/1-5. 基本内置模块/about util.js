const util = require("util");

// 1. util.format(format, ...args)	字符串格式化，支持 %s、%d、%j 占位符，分别代表字符串、数字和 JSON
console.log('util.format() ===>', util.format('Name: %s, Age: %d, Sex: %j', 'Alice', 25, {type: 'man'})) // Name: Alice, Age: 25, Sex: {"type":"man"}

// 2. util.inspect(object[, options])	将对象转换为字符串，用于调试。
console.log('util.inspect() ===>', util.inspect({ a: 1, b: 2, c: { d: { e: { f: { g: { h: 3 } } } } } }, { showHidden: false, depth: null, colors: true }))
// {
//   a: 1,
//   b: 2,
//   c: {
//     d: {
//       e: { f: { g: { h: 3 } } }
//     }
//   }
// }

// 3. util.promisify(function)	将回调风格的函数转换为返回 Promise 的函数。
function delayCallBack(duration, callback) {
  setTimeout(() => {
    callback(null, duration);
  }, duration);
}
const delay = util.promisify(delayCallBack);
(async () => {
  const r = await delay(500);
  console.log(r); // 500
})();

// 4. util.callbackify(fn)	将返回 Promise 的函数转换为回调风格函数。
async function fn() {
  return 'hello world';
}
const callbackFunction = util.callbackify(fn);

callbackFunction((err, ret) => {
  if (err) throw err;
  console.log(ret); // hello world
});

// 5. util.inherits(constructor, superConstructor)	让一个构造函数继承另一个构造函数的原型方法。

// 6. util.deprecate(fn, message)	标记函数为废弃，调用时会打印警告消息。

// 7. util.isDeepStrictEqual(val1, val2)	判断两个值是否深度相等，类似于深度比较。
function f1() {}
function f2() {}
const o1 = {
  a: 1,
  b: {
    c: 3,
    d: {
      e: 5,
      f: f1
    }
  }
}

const o2 = {
  a: 1,
  b: {
    c: 3,
    d: {
      e: 5,
      f: f2
    }
  }
}
// o1和o2如果没有f方法，则这里的值为true
console.log(util.isDeepStrictEqual(o1, o2)) // false

// 8. util.getSystemErrorName(err.errno) 、util.getSystemErrorMap() 	根据错误码返回系统错误名称。

// 9. util.types 包含多种类型检测方法的集合，例如 isAnyArrayBuffer、isBigInt64Array。

// 9.1 util.types.isAnyArrayBuffer(value)	检查值是否为 ArrayBuffer 或 SharedArrayBuffer。
console.log('util.types.isAnyArrayBuffer() ===>', util.types.isAnyArrayBuffer(new ArrayBuffer()))

// 9.2 util.types.isArrayBuffer(value)	检查值是否为 ArrayBuffer。

// 9.3 util.types.isAsyncFunction(value)	检查值是否为异步函数。

// 9.4 util.types.isBigInt64Array(value)	检查值是否为 BigInt64Array。

// 9.5 util.types.isBigUint64Array(value)	检查值是否为 BigUint64Array。

// 9.6 util.types.isBooleanObject(value)	检查值是否为布尔对象。

// 9.7 util.types.isDataView(value)	检查值是否为 DataView。

// 9.8 util.types.isDate(value)	检查值是否为 Date。

// 9.9 util.types.isGeneratorFunction(value)	检查值是否为生成器函数。

// 9.10 util.types.isMap(value)	检查值是否为 Map。

// 9.11 util.types.isSet(value)	检查值是否为 Set。

// 9.12 util.types.isRegExp(value)	检查值是否为正则表达式。

// 9.13 util.types.isSymbolObject(value)	检查值是否为符号对象。
