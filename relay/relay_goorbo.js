/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 7987:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(7981);

module.exports = parent;

/***/ }),

/***/ 2529:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(9390);

__webpack_require__(5892);

var entryUnbind = __webpack_require__(1305);

module.exports = entryUnbind('Array', 'flat');

/***/ }),

/***/ 1755:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* unused reexport */ __webpack_require__(3642);

/***/ }),

/***/ 3642:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(7987);

module.exports = parent;

/***/ }),

/***/ 8257:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(9212);

var tryToString = __webpack_require__(5637);

var $TypeError = TypeError; // `Assert: IsCallable(argument) is true`

module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw $TypeError(tryToString(argument) + ' is not a function');
};

/***/ }),

/***/ 6288:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(3649);

var create = __webpack_require__(3590);

var defineProperty = (__webpack_require__(4615).f);

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype; // Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

if (ArrayPrototype[UNSCOPABLES] == undefined) {
  defineProperty(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
} // add a key to Array.prototype[@@unscopables]


module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};

/***/ }),

/***/ 2569:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(794);

var $String = String;
var $TypeError = TypeError; // `Assert: Type(argument) is Object`

module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw $TypeError($String(argument) + ' is not an object');
};

/***/ }),

/***/ 5766:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIndexedObject = __webpack_require__(2977);

var toAbsoluteIndex = __webpack_require__(6782);

var lengthOfArrayLike = __webpack_require__(1825); // `Array.prototype.{ indexOf, includes }` methods implementation


var createMethod = function createMethod(IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value; // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check

    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++]; // eslint-disable-next-line no-self-compare -- NaN check

      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    }
    return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

/***/ }),

/***/ 5289:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isArray = __webpack_require__(4521);

var isConstructor = __webpack_require__(2097);

var isObject = __webpack_require__(794);

var wellKnownSymbol = __webpack_require__(3649);

var SPECIES = wellKnownSymbol('species');
var $Array = Array; // a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate

module.exports = function (originalArray) {
  var C;

  if (isArray(originalArray)) {
    C = originalArray.constructor; // cross-realm fallback

    if (isConstructor(C) && (C === $Array || isArray(C.prototype))) C = undefined;else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  }

  return C === undefined ? $Array : C;
};

/***/ }),

/***/ 4822:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arraySpeciesConstructor = __webpack_require__(5289); // `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate


module.exports = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};

/***/ }),

/***/ 9624:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};

/***/ }),

/***/ 3058:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var TO_STRING_TAG_SUPPORT = __webpack_require__(8191);

var isCallable = __webpack_require__(9212);

var classofRaw = __webpack_require__(9624);

var wellKnownSymbol = __webpack_require__(3649);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Object = Object; // ES3 wrong here

var CORRECT_ARGUMENTS = classofRaw(function () {
  return arguments;
}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

var tryGet = function tryGet(it, key) {
  try {
    return it[key];
  } catch (error) {
    /* empty */
  }
}; // getting tag from ES6+ `Object.prototype.toString`


module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
  : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag // builtinTag case
  : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
  : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};

/***/ }),

/***/ 3478:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hasOwn = __webpack_require__(2870);

var ownKeys = __webpack_require__(929);

var getOwnPropertyDescriptorModule = __webpack_require__(6683);

var definePropertyModule = __webpack_require__(4615);

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];

    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};

/***/ }),

/***/ 57:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var definePropertyModule = __webpack_require__(4615);

var createPropertyDescriptor = __webpack_require__(4677);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

/***/ }),

/***/ 4677:
/***/ ((module) => {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

/***/ }),

/***/ 5999:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var toPropertyKey = __webpack_require__(8734);

var definePropertyModule = __webpack_require__(4615);

var createPropertyDescriptor = __webpack_require__(4677);

module.exports = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));else object[propertyKey] = value;
};

/***/ }),

/***/ 3746:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(9212);

var definePropertyModule = __webpack_require__(4615);

var makeBuiltIn = __webpack_require__(9594);

var defineGlobalProperty = __webpack_require__(2296);

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);

  if (options.global) {
    if (simple) O[key] = value;else defineGlobalProperty(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];else if (O[key]) simple = true;
    } catch (error) {
      /* empty */
    }

    if (simple) O[key] = value;else definePropertyModule.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  }

  return O;
};

/***/ }),

/***/ 2296:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583); // eslint-disable-next-line es-x/no-object-defineproperty -- safe


var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, {
      value: value,
      configurable: true,
      writable: true
    });
  } catch (error) {
    global[key] = value;
  }

  return value;
};

/***/ }),

/***/ 8494:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(6544); // Detect IE8's incomplete defineProperty implementation


module.exports = !fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, {
    get: function get() {
      return 7;
    }
  })[1] != 7;
});

/***/ }),

/***/ 6668:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var isObject = __webpack_require__(794);

var document = global.document; // typeof document.createElement is 'object' in old IE

var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};

/***/ }),

/***/ 6768:
/***/ ((module) => {

var $TypeError = TypeError;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

module.exports = function (it) {
  if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded');
  return it;
};

/***/ }),

/***/ 6918:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(5897);

module.exports = getBuiltIn('navigator', 'userAgent') || '';

/***/ }),

/***/ 4061:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var userAgent = __webpack_require__(6918);

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.'); // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us

  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
} // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0


if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);

  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;

/***/ }),

/***/ 1305:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var uncurryThis = __webpack_require__(7386);

module.exports = function (CONSTRUCTOR, METHOD) {
  return uncurryThis(global[CONSTRUCTOR].prototype[METHOD]);
};

/***/ }),

/***/ 5690:
/***/ ((module) => {

// IE8- don't enum bug keys
module.exports = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

/***/ }),

/***/ 7263:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var getOwnPropertyDescriptor = (__webpack_require__(6683).f);

var createNonEnumerableProperty = __webpack_require__(57);

var defineBuiltIn = __webpack_require__(3746);

var defineGlobalProperty = __webpack_require__(2296);

var copyConstructorProperties = __webpack_require__(3478);

var isForced = __webpack_require__(4451);
/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/


module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;

  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }

  if (target) for (key in source) {
    sourceProperty = source[key];

    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];

    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    } // add a flag to not completely full polyfills


    if (options.sham || targetProperty && targetProperty.sham) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }

    defineBuiltIn(target, key, sourceProperty, options);
  }
};

/***/ }),

/***/ 6544:
/***/ ((module) => {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

/***/ }),

/***/ 1266:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isArray = __webpack_require__(4521);

var lengthOfArrayLike = __webpack_require__(1825);

var doesNotExceedSafeInteger = __webpack_require__(6768);

var bind = __webpack_require__(2938); // `FlattenIntoArray` abstract operation
// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray


var flattenIntoArray = function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? bind(mapper, thisArg) : false;
  var element, elementLen;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      if (depth > 0 && isArray(element)) {
        elementLen = lengthOfArrayLike(element);
        targetIndex = flattenIntoArray(target, original, element, elementLen, targetIndex, depth - 1) - 1;
      } else {
        doesNotExceedSafeInteger(targetIndex + 1);
        target[targetIndex] = element;
      }

      targetIndex++;
    }

    sourceIndex++;
  }

  return targetIndex;
};

module.exports = flattenIntoArray;

/***/ }),

/***/ 2938:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var aCallable = __webpack_require__(8257);

var NATIVE_BIND = __webpack_require__(8987);

var bind = uncurryThis(uncurryThis.bind); // optional / simple context binding

module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function
    /* ...args */
  () {
    return fn.apply(that, arguments);
  };
};

/***/ }),

/***/ 8987:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(6544);

module.exports = !fails(function () {
  // eslint-disable-next-line es-x/no-function-prototype-bind -- safe
  var test = function () {
    /* empty */
  }.bind(); // eslint-disable-next-line no-prototype-builtins -- safe


  return typeof test != 'function' || test.hasOwnProperty('prototype');
});

/***/ }),

/***/ 8262:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_BIND = __webpack_require__(8987);

var call = Function.prototype.call;
module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};

/***/ }),

/***/ 4340:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var hasOwn = __webpack_require__(2870);

var FunctionPrototype = Function.prototype; // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe

var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;
var EXISTS = hasOwn(FunctionPrototype, 'name'); // additional protection from minified / mangled / dropped function names

var PROPER = EXISTS && function something() {
  /* empty */
}.name === 'something';

var CONFIGURABLE = EXISTS && (!DESCRIPTORS || DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable);
module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};

/***/ }),

/***/ 7386:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_BIND = __webpack_require__(8987);

var FunctionPrototype = Function.prototype;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;
var uncurryThis = NATIVE_BIND && bind.bind(call, call);
module.exports = NATIVE_BIND ? function (fn) {
  return fn && uncurryThis(fn);
} : function (fn) {
  return fn && function () {
    return call.apply(fn, arguments);
  };
};

/***/ }),

/***/ 5897:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var isCallable = __webpack_require__(9212);

var aFunction = function aFunction(argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};

/***/ }),

/***/ 8272:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(3058);

var getMethod = __webpack_require__(911);

var Iterators = __webpack_require__(339);

var wellKnownSymbol = __webpack_require__(3649);

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return getMethod(it, ITERATOR) || getMethod(it, '@@iterator') || Iterators[classof(it)];
};

/***/ }),

/***/ 6307:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(8262);

var aCallable = __webpack_require__(8257);

var anObject = __webpack_require__(2569);

var tryToString = __webpack_require__(5637);

var getIteratorMethod = __webpack_require__(8272);

var $TypeError = TypeError;

module.exports = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
  throw $TypeError(tryToString(argument) + ' is not iterable');
};

/***/ }),

/***/ 911:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var aCallable = __webpack_require__(8257); // `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod


module.exports = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable(func);
};

/***/ }),

/***/ 7583:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var check = function check(it) {
  return it && it.Math == Math && it;
}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


module.exports = // eslint-disable-next-line es-x/no-global-this -- safe
check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
check(typeof self == 'object' && self) || check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) || // eslint-disable-next-line no-new-func -- fallback
function () {
  return this;
}() || Function('return this')();

/***/ }),

/***/ 2870:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var toObject = __webpack_require__(1324);

var hasOwnProperty = uncurryThis({}.hasOwnProperty); // `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es-x/no-object-hasown -- safe

module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};

/***/ }),

/***/ 4639:
/***/ ((module) => {

module.exports = {};

/***/ }),

/***/ 482:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(5897);

module.exports = getBuiltIn('document', 'documentElement');

/***/ }),

/***/ 275:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var fails = __webpack_require__(6544);

var createElement = __webpack_require__(6668); // Thanks to IE8 for its funny defineProperty


module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function get() {
      return 7;
    }
  }).a != 7;
});

/***/ }),

/***/ 5044:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var fails = __webpack_require__(6544);

var classof = __webpack_require__(9624);

var $Object = Object;
var split = uncurryThis(''.split); // fallback for non-array-like ES3 and non-enumerable old V8 strings

module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : $Object(it);
} : $Object;

/***/ }),

/***/ 9734:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var isCallable = __webpack_require__(9212);

var store = __webpack_require__(1314);

var functionToString = uncurryThis(Function.toString); // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper

if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;

/***/ }),

/***/ 2743:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_WEAK_MAP = __webpack_require__(9491);

var global = __webpack_require__(7583);

var uncurryThis = __webpack_require__(7386);

var isObject = __webpack_require__(794);

var createNonEnumerableProperty = __webpack_require__(57);

var hasOwn = __webpack_require__(2870);

var shared = __webpack_require__(1314);

var sharedKey = __webpack_require__(9137);

var hiddenKeys = __webpack_require__(4639);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function enforce(it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function getterFor(TYPE) {
  return function (it) {
    var state;

    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    }

    return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = uncurryThis(store.get);
  var wmhas = uncurryThis(store.has);
  var wmset = uncurryThis(store.set);

  set = function set(it, metadata) {
    if (wmhas(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };

  get = function get(it) {
    return wmget(store, it) || {};
  };

  has = function has(it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;

  set = function set(it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };

  get = function get(it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };

  has = function has(it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

/***/ }),

/***/ 114:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(3649);

var Iterators = __webpack_require__(339);

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype; // check on default Array iterator

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};

/***/ }),

/***/ 4521:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(9624); // `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es-x/no-array-isarray -- safe


module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) == 'Array';
};

/***/ }),

/***/ 9212:
/***/ ((module) => {

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = function (argument) {
  return typeof argument == 'function';
};

/***/ }),

/***/ 2097:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var fails = __webpack_require__(6544);

var isCallable = __webpack_require__(9212);

var classof = __webpack_require__(3058);

var getBuiltIn = __webpack_require__(5897);

var inspectSource = __webpack_require__(9734);

var noop = function noop() {
  /* empty */
};

var empty = [];
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = uncurryThis(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable(argument)) return false;

  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable(argument)) return false;

  switch (classof(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction':
      return false;
  }

  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true; // `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor

module.exports = !construct || fails(function () {
  var called;
  return isConstructorModern(isConstructorModern.call) || !isConstructorModern(Object) || !isConstructorModern(function () {
    called = true;
  }) || called;
}) ? isConstructorLegacy : isConstructorModern;

/***/ }),

/***/ 4451:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(6544);

var isCallable = __webpack_require__(9212);

var replacement = /#|\.prototype\./;

var isForced = function isForced(feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true : value == NATIVE ? false : isCallable(detection) ? fails(detection) : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';
module.exports = isForced;

/***/ }),

/***/ 794:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(9212);

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};

/***/ }),

/***/ 6268:
/***/ ((module) => {

module.exports = false;

/***/ }),

/***/ 5871:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(5897);

var isCallable = __webpack_require__(9212);

var isPrototypeOf = __webpack_require__(2447);

var USE_SYMBOL_AS_UID = __webpack_require__(7786);

var $Object = Object;
module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};

/***/ }),

/***/ 4026:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var bind = __webpack_require__(2938);

var call = __webpack_require__(8262);

var anObject = __webpack_require__(2569);

var tryToString = __webpack_require__(5637);

var isArrayIteratorMethod = __webpack_require__(114);

var lengthOfArrayLike = __webpack_require__(1825);

var isPrototypeOf = __webpack_require__(2447);

var getIterator = __webpack_require__(6307);

var getIteratorMethod = __webpack_require__(8272);

var iteratorClose = __webpack_require__(7093);

var $TypeError = TypeError;

var Result = function Result(stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var ResultPrototype = Result.prototype;

module.exports = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_RECORD = !!(options && options.IS_RECORD);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function stop(condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function callFn(value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    }

    return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_RECORD) {
    iterator = iterable.iterator;
  } else if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (!iterFn) throw $TypeError(tryToString(iterable) + ' is not iterable'); // optimisation for array iterators

    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf(ResultPrototype, result)) return result;
      }

      return new Result(false);
    }

    iterator = getIterator(iterable, iterFn);
  }

  next = IS_RECORD ? iterable.next : iterator.next;

  while (!(step = call(next, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }

    if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
  }

  return new Result(false);
};

/***/ }),

/***/ 7093:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(8262);

var anObject = __webpack_require__(2569);

var getMethod = __webpack_require__(911);

module.exports = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject(iterator);

  try {
    innerResult = getMethod(iterator, 'return');

    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }

    innerResult = call(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }

  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject(innerResult);
  return value;
};

/***/ }),

/***/ 339:
/***/ ((module) => {

module.exports = {};

/***/ }),

/***/ 1825:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toLength = __webpack_require__(97); // `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike


module.exports = function (obj) {
  return toLength(obj.length);
};

/***/ }),

/***/ 9594:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(6544);

var isCallable = __webpack_require__(9212);

var hasOwn = __webpack_require__(2870);

var DESCRIPTORS = __webpack_require__(8494);

var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(4340).CONFIGURABLE);

var inspectSource = __webpack_require__(9734);

var InternalStateModule = __webpack_require__(2743);

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get; // eslint-disable-next-line es-x/no-object-defineproperty -- safe

var defineProperty = Object.defineProperty;
var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () {
    /* empty */
  }, 'length', {
    value: 8
  }).length !== 8;
});
var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (String(name).slice(0, 7) === 'Symbol(') {
    name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
  }

  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;

  if (!hasOwn(value, 'name') || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
    if (DESCRIPTORS) defineProperty(value, 'name', {
      value: name,
      configurable: true
    });else value.name = name;
  }

  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', {
      value: options.arity
    });
  }

  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', {
        writable: false
      }); // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) {
    /* empty */
  }

  var state = enforceInternalState(value);

  if (!hasOwn(state, 'source')) {
    state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
  }

  return value;
}; // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required


Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');

/***/ }),

/***/ 9021:
/***/ ((module) => {

var ceil = Math.ceil;
var floor = Math.floor; // `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es-x/no-math-trunc -- safe

module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};

/***/ }),

/***/ 8640:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es-x/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(4061);

var fails = __webpack_require__(6544); // eslint-disable-next-line es-x/no-object-getownpropertysymbols -- required for testing


module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol(); // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances

  return !String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
  !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

/***/ }),

/***/ 9491:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var isCallable = __webpack_require__(9212);

var inspectSource = __webpack_require__(9734);

var WeakMap = global.WeakMap;
module.exports = isCallable(WeakMap) && /native code/.test(inspectSource(WeakMap));

/***/ }),

/***/ 3590:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__(2569);

var definePropertiesModule = __webpack_require__(8728);

var enumBugKeys = __webpack_require__(5690);

var hiddenKeys = __webpack_require__(4639);

var html = __webpack_require__(482);

var documentCreateElement = __webpack_require__(6668);

var sharedKey = __webpack_require__(9137);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function EmptyConstructor() {
  /* empty */
};

var scriptTag = function scriptTag(content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
}; // Create object with fake `null` prototype: use ActiveX Object with cleared prototype


var NullProtoObjectViaActiveX = function NullProtoObjectViaActiveX(activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak

  return temp;
}; // Create object with fake `null` prototype: use iframe Object with cleared prototype


var NullProtoObjectViaIFrame = function NullProtoObjectViaIFrame() {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe); // https://github.com/zloirock/core-js/issues/475

  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
}; // Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug


var activeXDocument;

var _NullProtoObject = function NullProtoObject() {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) {
    /* ignore */
  }

  _NullProtoObject = typeof document != 'undefined' ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) // old IE
  : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument); // WSH

  var length = enumBugKeys.length;

  while (length--) {
    delete _NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  }

  return _NullProtoObject();
};

hiddenKeys[IE_PROTO] = true; // `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es-x/no-object-create -- safe

module.exports = Object.create || function create(O, Properties) {
  var result;

  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

    result[IE_PROTO] = O;
  } else result = _NullProtoObject();

  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};

/***/ }),

/***/ 8728:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(7670);

var definePropertyModule = __webpack_require__(4615);

var anObject = __webpack_require__(2569);

var toIndexedObject = __webpack_require__(2977);

var objectKeys = __webpack_require__(5432); // `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es-x/no-object-defineproperties -- safe


exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;

  while (length > index) {
    definePropertyModule.f(O, key = keys[index++], props[key]);
  }

  return O;
};

/***/ }),

/***/ 4615:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var IE8_DOM_DEFINE = __webpack_require__(275);

var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(7670);

var anObject = __webpack_require__(2569);

var toPropertyKey = __webpack_require__(8734);

var $TypeError = TypeError; // eslint-disable-next-line es-x/no-object-defineproperty -- safe

var $defineProperty = Object.defineProperty; // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe

var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable'; // `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty

exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);

  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);

    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  }

  return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) {
    /* empty */
  }
  if ('get' in Attributes || 'set' in Attributes) throw $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

/***/ }),

/***/ 6683:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var call = __webpack_require__(8262);

var propertyIsEnumerableModule = __webpack_require__(112);

var createPropertyDescriptor = __webpack_require__(4677);

var toIndexedObject = __webpack_require__(2977);

var toPropertyKey = __webpack_require__(8734);

var hasOwn = __webpack_require__(2870);

var IE8_DOM_DEFINE = __webpack_require__(275); // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe


var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) {
    /* empty */
  }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};

/***/ }),

/***/ 9275:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(8356);

var enumBugKeys = __webpack_require__(5690);

var hiddenKeys = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es-x/no-object-getownpropertynames -- safe

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};

/***/ }),

/***/ 4012:
/***/ ((__unused_webpack_module, exports) => {

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;

/***/ }),

/***/ 2447:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

module.exports = uncurryThis({}.isPrototypeOf);

/***/ }),

/***/ 8356:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var hasOwn = __webpack_require__(2870);

var toIndexedObject = __webpack_require__(2977);

var indexOf = (__webpack_require__(5766).indexOf);

var hiddenKeys = __webpack_require__(4639);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;

  for (key in O) {
    !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  } // Don't enum bug & hidden keys


  while (names.length > i) {
    if (hasOwn(O, key = names[i++])) {
      ~indexOf(result, key) || push(result, key);
    }
  }

  return result;
};

/***/ }),

/***/ 5432:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(8356);

var enumBugKeys = __webpack_require__(5690); // `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es-x/no-object-keys -- safe


module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};

/***/ }),

/***/ 112:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


var $propertyIsEnumerable = {}.propertyIsEnumerable; // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe

var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({
  1: 2
}, 1); // `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable

exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

/***/ }),

/***/ 9953:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var uncurryThis = __webpack_require__(7386);

var objectKeys = __webpack_require__(5432);

var toIndexedObject = __webpack_require__(2977);

var $propertyIsEnumerable = (__webpack_require__(112).f);

var propertyIsEnumerable = uncurryThis($propertyIsEnumerable);
var push = uncurryThis([].push); // `Object.{ entries, values }` methods implementation

var createMethod = function createMethod(TO_ENTRIES) {
  return function (it) {
    var O = toIndexedObject(it);
    var keys = objectKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;

    while (length > i) {
      key = keys[i++];

      if (!DESCRIPTORS || propertyIsEnumerable(O, key)) {
        push(result, TO_ENTRIES ? [key, O[key]] : O[key]);
      }
    }

    return result;
  };
};

module.exports = {
  // `Object.entries` method
  // https://tc39.es/ecma262/#sec-object.entries
  entries: createMethod(true),
  // `Object.values` method
  // https://tc39.es/ecma262/#sec-object.values
  values: createMethod(false)
};

/***/ }),

/***/ 6252:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(8262);

var isCallable = __webpack_require__(9212);

var isObject = __webpack_require__(794);

var $TypeError = TypeError; // `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive

module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw $TypeError("Can't convert object to primitive value");
};

/***/ }),

/***/ 929:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(5897);

var uncurryThis = __webpack_require__(7386);

var getOwnPropertyNamesModule = __webpack_require__(9275);

var getOwnPropertySymbolsModule = __webpack_require__(4012);

var anObject = __webpack_require__(2569);

var concat = uncurryThis([].concat); // all object keys, includes non-enumerable and symbols

module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};

/***/ }),

/***/ 3955:
/***/ ((module) => {

var $TypeError = TypeError; // `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible

module.exports = function (it) {
  if (it == undefined) throw $TypeError("Can't call method on " + it);
  return it;
};

/***/ }),

/***/ 9137:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var shared = __webpack_require__(7836);

var uid = __webpack_require__(8284);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

/***/ }),

/***/ 1314:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var defineGlobalProperty = __webpack_require__(2296);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || defineGlobalProperty(SHARED, {});
module.exports = store;

/***/ }),

/***/ 7836:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var IS_PURE = __webpack_require__(6268);

var store = __webpack_require__(1314);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.23.5',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.23.5/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});

/***/ }),

/***/ 6782:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIntegerOrInfinity = __webpack_require__(7486);

var max = Math.max;
var min = Math.min; // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

/***/ }),

/***/ 2977:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(5044);

var requireObjectCoercible = __webpack_require__(3955);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};

/***/ }),

/***/ 7486:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var trunc = __webpack_require__(9021); // `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity


module.exports = function (argument) {
  var number = +argument; // eslint-disable-next-line no-self-compare -- NaN check

  return number !== number || number === 0 ? 0 : trunc(number);
};

/***/ }),

/***/ 97:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIntegerOrInfinity = __webpack_require__(7486);

var min = Math.min; // `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength

module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

/***/ }),

/***/ 1324:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var requireObjectCoercible = __webpack_require__(3955);

var $Object = Object; // `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject

module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};

/***/ }),

/***/ 2670:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(8262);

var isObject = __webpack_require__(794);

var isSymbol = __webpack_require__(5871);

var getMethod = __webpack_require__(911);

var ordinaryToPrimitive = __webpack_require__(6252);

var wellKnownSymbol = __webpack_require__(3649);

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive'); // `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive

module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;

  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw $TypeError("Can't convert object to primitive value");
  }

  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

/***/ }),

/***/ 8734:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toPrimitive = __webpack_require__(2670);

var isSymbol = __webpack_require__(5871); // `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey


module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};

/***/ }),

/***/ 8191:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(3649);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};
test[TO_STRING_TAG] = 'z';
module.exports = String(test) === '[object z]';

/***/ }),

/***/ 5637:
/***/ ((module) => {

var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};

/***/ }),

/***/ 8284:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};

/***/ }),

/***/ 7786:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es-x/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(8640);

module.exports = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == 'symbol';

/***/ }),

/***/ 7670:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var fails = __webpack_require__(6544); // V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334


module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () {
    /* empty */
  }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});

/***/ }),

/***/ 3649:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var shared = __webpack_require__(7836);

var hasOwn = __webpack_require__(2870);

var uid = __webpack_require__(8284);

var NATIVE_SYMBOL = __webpack_require__(8640);

var USE_SYMBOL_AS_UID = __webpack_require__(7786);

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var symbolFor = Symbol && Symbol['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;

    if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  }

  return WellKnownSymbolsStore[name];
};

/***/ }),

/***/ 9390:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var $ = __webpack_require__(7263);

var flattenIntoArray = __webpack_require__(1266);

var toObject = __webpack_require__(1324);

var lengthOfArrayLike = __webpack_require__(1825);

var toIntegerOrInfinity = __webpack_require__(7486);

var arraySpeciesCreate = __webpack_require__(4822); // `Array.prototype.flat` method
// https://tc39.es/ecma262/#sec-array.prototype.flat


$({
  target: 'Array',
  proto: true
}, {
  flat: function
    /* depthArg = 1 */
  flat() {
    var depthArg = arguments.length ? arguments[0] : undefined;
    var O = toObject(this);
    var sourceLen = lengthOfArrayLike(O);
    var A = arraySpeciesCreate(O, 0);
    A.length = flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toIntegerOrInfinity(depthArg));
    return A;
  }
});

/***/ }),

/***/ 5892:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// this method was added to unscopables after implementation
// in popular engines, so it's moved to a separate module
var addToUnscopables = __webpack_require__(6288); // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables


addToUnscopables('flat');

/***/ }),

/***/ 6737:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(7263);

var $entries = (__webpack_require__(9953).entries); // `Object.entries` method
// https://tc39.es/ecma262/#sec-object.entries


$({
  target: 'Object',
  stat: true
}, {
  entries: function entries(O) {
    return $entries(O);
  }
});

/***/ }),

/***/ 5809:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(7263);

var iterate = __webpack_require__(4026);

var createProperty = __webpack_require__(5999); // `Object.fromEntries` method
// https://github.com/tc39/proposal-object-from-entries


$({
  target: 'Object',
  stat: true
}, {
  fromEntries: function fromEntries(iterable) {
    var obj = {};
    iterate(iterable, function (k, v) {
      createProperty(obj, k, v);
    }, {
      AS_ENTRIES: true
    });
    return obj;
  }
});

/***/ }),

/***/ 7981:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(2529);

module.exports = parent;

/***/ }),

/***/ 2139:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/******/(()=>{// webpackBootstrap
/******/"use strict";/******/var __webpack_modules__={/***/447:/***/module=>{module.exports="data:application/javascript;base64,KGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHsKCWlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JykKCQltb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTsKCWVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKQoJCWRlZmluZShbXSwgZmFjdG9yeSk7CgllbHNlIHsKCQl2YXIgYSA9IGZhY3RvcnkoKTsKCQlmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07Cgl9Cn0pKHNlbGYsICgpID0+IHsKcmV0dXJuIC8qKioqKiovICgoKSA9PiB7IC8vIHdlYnBhY2tCb290c3RyYXAKLyoqKioqKi8gCSJ1c2Ugc3RyaWN0IjsKLyoqKioqKi8gCXZhciBfX3dlYnBhY2tfbW9kdWxlc19fID0gKHsKCi8qKiovIDI0MjoKLyoqKi8gKChfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgX193ZWJwYWNrX2V4cG9ydHNfXywgX193ZWJwYWNrX3JlcXVpcmVfXykgPT4gewoKCi8vIEVYUE9SVFMKX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIHsKICAiWiI6ICgpID0+ICgvKiBiaW5kaW5nICovIHJlbGF5X0FwcCkKfSk7Cgo7Ly8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9ub2RlX21vZHVsZXMvQHJlbWl4LXJ1bi9yb3V0ZXIvZGlzdC9yb3V0ZXIuanMKLyoqCiAqIEByZW1peC1ydW4vcm91dGVyIHYxLjAuMwogKgogKiBDb3B5cmlnaHQgKGMpIFJlbWl4IFNvZnR3YXJlIEluYy4KICoKICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlCiAqIExJQ0VOU0UubWQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4KICoKICogQGxpY2Vuc2UgTUlUCiAqLwpmdW5jdGlvbiBfZXh0ZW5kcygpIHsKICBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gPyBPYmplY3QuYXNzaWduLmJpbmQoKSA6IGZ1bmN0aW9uICh0YXJnZXQpIHsKICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7CiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07CgogICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7CiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsKICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07CiAgICAgICAgfQogICAgICB9CiAgICB9CgogICAgcmV0dXJuIHRhcmdldDsKICB9OwogIHJldHVybiBfZXh0ZW5kcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpOwp9CgovLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLwovLyNyZWdpb24gVHlwZXMgYW5kIENvbnN0YW50cwovLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLwoKLyoqCiAqIEFjdGlvbnMgcmVwcmVzZW50IHRoZSB0eXBlIG9mIGNoYW5nZSB0byBhIGxvY2F0aW9uIHZhbHVlLgogKi8KdmFyIEFjdGlvbjsKCihmdW5jdGlvbiAoQWN0aW9uKSB7CiAgLyoqCiAgICogQSBQT1AgaW5kaWNhdGVzIGEgY2hhbmdlIHRvIGFuIGFyYml0cmFyeSBpbmRleCBpbiB0aGUgaGlzdG9yeSBzdGFjaywgc3VjaAogICAqIGFzIGEgYmFjayBvciBmb3J3YXJkIG5hdmlnYXRpb24uIEl0IGRvZXMgbm90IGRlc2NyaWJlIHRoZSBkaXJlY3Rpb24gb2YgdGhlCiAgICogbmF2aWdhdGlvbiwgb25seSB0aGF0IHRoZSBjdXJyZW50IGluZGV4IGNoYW5nZWQuCiAgICoKICAgKiBOb3RlOiBUaGlzIGlzIHRoZSBkZWZhdWx0IGFjdGlvbiBmb3IgbmV3bHkgY3JlYXRlZCBoaXN0b3J5IG9iamVjdHMuCiAgICovCiAgQWN0aW9uWyJQb3AiXSA9ICJQT1AiOwogIC8qKgogICAqIEEgUFVTSCBpbmRpY2F0ZXMgYSBuZXcgZW50cnkgYmVpbmcgYWRkZWQgdG8gdGhlIGhpc3Rvcnkgc3RhY2ssIHN1Y2ggYXMgd2hlbgogICAqIGEgbGluayBpcyBjbGlja2VkIGFuZCBhIG5ldyBwYWdlIGxvYWRzLiBXaGVuIHRoaXMgaGFwcGVucywgYWxsIHN1YnNlcXVlbnQKICAgKiBlbnRyaWVzIGluIHRoZSBzdGFjayBhcmUgbG9zdC4KICAgKi8KCiAgQWN0aW9uWyJQdXNoIl0gPSAiUFVTSCI7CiAgLyoqCiAgICogQSBSRVBMQUNFIGluZGljYXRlcyB0aGUgZW50cnkgYXQgdGhlIGN1cnJlbnQgaW5kZXggaW4gdGhlIGhpc3Rvcnkgc3RhY2sKICAgKiBiZWluZyByZXBsYWNlZCBieSBhIG5ldyBvbmUuCiAgICovCgogIEFjdGlvblsiUmVwbGFjZSJdID0gIlJFUExBQ0UiOwp9KShBY3Rpb24gfHwgKEFjdGlvbiA9IHt9KSk7Cgpjb25zdCBQb3BTdGF0ZUV2ZW50VHlwZSA9ICJwb3BzdGF0ZSI7Ci8qKgogKiBNZW1vcnkgaGlzdG9yeSBzdG9yZXMgdGhlIGN1cnJlbnQgbG9jYXRpb24gaW4gbWVtb3J5LiBJdCBpcyBkZXNpZ25lZCBmb3IgdXNlCiAqIGluIHN0YXRlZnVsIG5vbi1icm93c2VyIGVudmlyb25tZW50cyBsaWtlIHRlc3RzIGFuZCBSZWFjdCBOYXRpdmUuCiAqLwoKZnVuY3Rpb24gcm91dGVyX2NyZWF0ZU1lbW9yeUhpc3Rvcnkob3B0aW9ucykgewogIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsKICAgIG9wdGlvbnMgPSB7fTsKICB9CgogIGxldCB7CiAgICBpbml0aWFsRW50cmllcyA9IFsiLyJdLAogICAgaW5pdGlhbEluZGV4LAogICAgdjVDb21wYXQgPSBmYWxzZQogIH0gPSBvcHRpb25zOwogIGxldCBlbnRyaWVzOyAvLyBEZWNsYXJlIHNvIHdlIGNhbiBhY2Nlc3MgZnJvbSBjcmVhdGVNZW1vcnlMb2NhdGlvbgoKICBlbnRyaWVzID0gaW5pdGlhbEVudHJpZXMubWFwKChlbnRyeSwgaW5kZXgpID0+IGNyZWF0ZU1lbW9yeUxvY2F0aW9uKGVudHJ5LCB0eXBlb2YgZW50cnkgPT09ICJzdHJpbmciID8gbnVsbCA6IGVudHJ5LnN0YXRlLCBpbmRleCA9PT0gMCA/ICJkZWZhdWx0IiA6IHVuZGVmaW5lZCkpOwogIGxldCBpbmRleCA9IGNsYW1wSW5kZXgoaW5pdGlhbEluZGV4ID09IG51bGwgPyBlbnRyaWVzLmxlbmd0aCAtIDEgOiBpbml0aWFsSW5kZXgpOwogIGxldCBhY3Rpb24gPSBBY3Rpb24uUG9wOwogIGxldCBsaXN0ZW5lciA9IG51bGw7CgogIGZ1bmN0aW9uIGNsYW1wSW5kZXgobikgewogICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KG4sIDApLCBlbnRyaWVzLmxlbmd0aCAtIDEpOwogIH0KCiAgZnVuY3Rpb24gZ2V0Q3VycmVudExvY2F0aW9uKCkgewogICAgcmV0dXJuIGVudHJpZXNbaW5kZXhdOwogIH0KCiAgZnVuY3Rpb24gY3JlYXRlTWVtb3J5TG9jYXRpb24odG8sIHN0YXRlLCBrZXkpIHsKICAgIGlmIChzdGF0ZSA9PT0gdm9pZCAwKSB7CiAgICAgIHN0YXRlID0gbnVsbDsKICAgIH0KCiAgICBsZXQgbG9jYXRpb24gPSBjcmVhdGVMb2NhdGlvbihlbnRyaWVzID8gZ2V0Q3VycmVudExvY2F0aW9uKCkucGF0aG5hbWUgOiAiLyIsIHRvLCBzdGF0ZSwga2V5KTsKICAgIHdhcm5pbmckMShsb2NhdGlvbi5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICIvIiwgInJlbGF0aXZlIHBhdGhuYW1lcyBhcmUgbm90IHN1cHBvcnRlZCBpbiBtZW1vcnkgaGlzdG9yeTogIiArIEpTT04uc3RyaW5naWZ5KHRvKSk7CiAgICByZXR1cm4gbG9jYXRpb247CiAgfQoKICBsZXQgaGlzdG9yeSA9IHsKICAgIGdldCBpbmRleCgpIHsKICAgICAgcmV0dXJuIGluZGV4OwogICAgfSwKCiAgICBnZXQgYWN0aW9uKCkgewogICAgICByZXR1cm4gYWN0aW9uOwogICAgfSwKCiAgICBnZXQgbG9jYXRpb24oKSB7CiAgICAgIHJldHVybiBnZXRDdXJyZW50TG9jYXRpb24oKTsKICAgIH0sCgogICAgY3JlYXRlSHJlZih0bykgewogICAgICByZXR1cm4gdHlwZW9mIHRvID09PSAic3RyaW5nIiA/IHRvIDogcm91dGVyX2NyZWF0ZVBhdGgodG8pOwogICAgfSwKCiAgICBlbmNvZGVMb2NhdGlvbihsb2NhdGlvbikgewogICAgICByZXR1cm4gbG9jYXRpb247CiAgICB9LAoKICAgIHB1c2godG8sIHN0YXRlKSB7CiAgICAgIGFjdGlvbiA9IEFjdGlvbi5QdXNoOwogICAgICBsZXQgbmV4dExvY2F0aW9uID0gY3JlYXRlTWVtb3J5TG9jYXRpb24odG8sIHN0YXRlKTsKICAgICAgaW5kZXggKz0gMTsKICAgICAgZW50cmllcy5zcGxpY2UoaW5kZXgsIGVudHJpZXMubGVuZ3RoLCBuZXh0TG9jYXRpb24pOwoKICAgICAgaWYgKHY1Q29tcGF0ICYmIGxpc3RlbmVyKSB7CiAgICAgICAgbGlzdGVuZXIoewogICAgICAgICAgYWN0aW9uLAogICAgICAgICAgbG9jYXRpb246IG5leHRMb2NhdGlvbgogICAgICAgIH0pOwogICAgICB9CiAgICB9LAoKICAgIHJlcGxhY2UodG8sIHN0YXRlKSB7CiAgICAgIGFjdGlvbiA9IEFjdGlvbi5SZXBsYWNlOwogICAgICBsZXQgbmV4dExvY2F0aW9uID0gY3JlYXRlTWVtb3J5TG9jYXRpb24odG8sIHN0YXRlKTsKICAgICAgZW50cmllc1tpbmRleF0gPSBuZXh0TG9jYXRpb247CgogICAgICBpZiAodjVDb21wYXQgJiYgbGlzdGVuZXIpIHsKICAgICAgICBsaXN0ZW5lcih7CiAgICAgICAgICBhY3Rpb24sCiAgICAgICAgICBsb2NhdGlvbjogbmV4dExvY2F0aW9uCiAgICAgICAgfSk7CiAgICAgIH0KICAgIH0sCgogICAgZ28oZGVsdGEpIHsKICAgICAgYWN0aW9uID0gQWN0aW9uLlBvcDsKICAgICAgaW5kZXggPSBjbGFtcEluZGV4KGluZGV4ICsgZGVsdGEpOwoKICAgICAgaWYgKGxpc3RlbmVyKSB7CiAgICAgICAgbGlzdGVuZXIoewogICAgICAgICAgYWN0aW9uLAogICAgICAgICAgbG9jYXRpb246IGdldEN1cnJlbnRMb2NhdGlvbigpCiAgICAgICAgfSk7CiAgICAgIH0KICAgIH0sCgogICAgbGlzdGVuKGZuKSB7CiAgICAgIGxpc3RlbmVyID0gZm47CiAgICAgIHJldHVybiAoKSA9PiB7CiAgICAgICAgbGlzdGVuZXIgPSBudWxsOwogICAgICB9OwogICAgfQoKICB9OwogIHJldHVybiBoaXN0b3J5Owp9Ci8qKgogKiBCcm93c2VyIGhpc3Rvcnkgc3RvcmVzIHRoZSBsb2NhdGlvbiBpbiByZWd1bGFyIFVSTHMuIFRoaXMgaXMgdGhlIHN0YW5kYXJkIGZvcgogKiBtb3N0IHdlYiBhcHBzLCBidXQgaXQgcmVxdWlyZXMgc29tZSBjb25maWd1cmF0aW9uIG9uIHRoZSBzZXJ2ZXIgdG8gZW5zdXJlIHlvdQogKiBzZXJ2ZSB0aGUgc2FtZSBhcHAgYXQgbXVsdGlwbGUgVVJMcy4KICoKICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vcmVtaXgtcnVuL2hpc3RvcnkvdHJlZS9tYWluL2RvY3MvYXBpLXJlZmVyZW5jZS5tZCNjcmVhdGVicm93c2VyaGlzdG9yeQogKi8KCmZ1bmN0aW9uIHJvdXRlcl9jcmVhdGVCcm93c2VySGlzdG9yeShvcHRpb25zKSB7CiAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgewogICAgb3B0aW9ucyA9IHt9OwogIH0KCiAgZnVuY3Rpb24gY3JlYXRlQnJvd3NlckxvY2F0aW9uKHdpbmRvdywgZ2xvYmFsSGlzdG9yeSkgewogICAgbGV0IHsKICAgICAgcGF0aG5hbWUsCiAgICAgIHNlYXJjaCwKICAgICAgaGFzaAogICAgfSA9IHdpbmRvdy5sb2NhdGlvbjsKICAgIHJldHVybiBjcmVhdGVMb2NhdGlvbigiIiwgewogICAgICBwYXRobmFtZSwKICAgICAgc2VhcmNoLAogICAgICBoYXNoCiAgICB9LCAvLyBzdGF0ZSBkZWZhdWx0cyB0byBgbnVsbGAgYmVjYXVzZSBgd2luZG93Lmhpc3Rvcnkuc3RhdGVgIGRvZXMKICAgIGdsb2JhbEhpc3Rvcnkuc3RhdGUgJiYgZ2xvYmFsSGlzdG9yeS5zdGF0ZS51c3IgfHwgbnVsbCwgZ2xvYmFsSGlzdG9yeS5zdGF0ZSAmJiBnbG9iYWxIaXN0b3J5LnN0YXRlLmtleSB8fCAiZGVmYXVsdCIpOwogIH0KCiAgZnVuY3Rpb24gY3JlYXRlQnJvd3NlckhyZWYod2luZG93LCB0bykgewogICAgcmV0dXJuIHR5cGVvZiB0byA9PT0gInN0cmluZyIgPyB0byA6IHJvdXRlcl9jcmVhdGVQYXRoKHRvKTsKICB9CgogIHJldHVybiBnZXRVcmxCYXNlZEhpc3RvcnkoY3JlYXRlQnJvd3NlckxvY2F0aW9uLCBjcmVhdGVCcm93c2VySHJlZiwgbnVsbCwgb3B0aW9ucyk7Cn0KLyoqCiAqIEhhc2ggaGlzdG9yeSBzdG9yZXMgdGhlIGxvY2F0aW9uIGluIHdpbmRvdy5sb2NhdGlvbi5oYXNoLiBUaGlzIG1ha2VzIGl0IGlkZWFsCiAqIGZvciBzaXR1YXRpb25zIHdoZXJlIHlvdSBkb24ndCB3YW50IHRvIHNlbmQgdGhlIGxvY2F0aW9uIHRvIHRoZSBzZXJ2ZXIgZm9yCiAqIHNvbWUgcmVhc29uLCBlaXRoZXIgYmVjYXVzZSB5b3UgZG8gY2Fubm90IGNvbmZpZ3VyZSBpdCBvciB0aGUgVVJMIHNwYWNlIGlzCiAqIHJlc2VydmVkIGZvciBzb21ldGhpbmcgZWxzZS4KICoKICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vcmVtaXgtcnVuL2hpc3RvcnkvdHJlZS9tYWluL2RvY3MvYXBpLXJlZmVyZW5jZS5tZCNjcmVhdGVoYXNoaGlzdG9yeQogKi8KCmZ1bmN0aW9uIHJvdXRlcl9jcmVhdGVIYXNoSGlzdG9yeShvcHRpb25zKSB7CiAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgewogICAgb3B0aW9ucyA9IHt9OwogIH0KCiAgZnVuY3Rpb24gY3JlYXRlSGFzaExvY2F0aW9uKHdpbmRvdywgZ2xvYmFsSGlzdG9yeSkgewogICAgbGV0IHsKICAgICAgcGF0aG5hbWUgPSAiLyIsCiAgICAgIHNlYXJjaCA9ICIiLAogICAgICBoYXNoID0gIiIKICAgIH0gPSBwYXJzZVBhdGgod2luZG93LmxvY2F0aW9uLmhhc2guc3Vic3RyKDEpKTsKICAgIHJldHVybiBjcmVhdGVMb2NhdGlvbigiIiwgewogICAgICBwYXRobmFtZSwKICAgICAgc2VhcmNoLAogICAgICBoYXNoCiAgICB9LCAvLyBzdGF0ZSBkZWZhdWx0cyB0byBgbnVsbGAgYmVjYXVzZSBgd2luZG93Lmhpc3Rvcnkuc3RhdGVgIGRvZXMKICAgIGdsb2JhbEhpc3Rvcnkuc3RhdGUgJiYgZ2xvYmFsSGlzdG9yeS5zdGF0ZS51c3IgfHwgbnVsbCwgZ2xvYmFsSGlzdG9yeS5zdGF0ZSAmJiBnbG9iYWxIaXN0b3J5LnN0YXRlLmtleSB8fCAiZGVmYXVsdCIpOwogIH0KCiAgZnVuY3Rpb24gY3JlYXRlSGFzaEhyZWYod2luZG93LCB0bykgewogICAgbGV0IGJhc2UgPSB3aW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3RvcigiYmFzZSIpOwogICAgbGV0IGhyZWYgPSAiIjsKCiAgICBpZiAoYmFzZSAmJiBiYXNlLmdldEF0dHJpYnV0ZSgiaHJlZiIpKSB7CiAgICAgIGxldCB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjsKICAgICAgbGV0IGhhc2hJbmRleCA9IHVybC5pbmRleE9mKCIjIik7CiAgICAgIGhyZWYgPSBoYXNoSW5kZXggPT09IC0xID8gdXJsIDogdXJsLnNsaWNlKDAsIGhhc2hJbmRleCk7CiAgICB9CgogICAgcmV0dXJuIGhyZWYgKyAiIyIgKyAodHlwZW9mIHRvID09PSAic3RyaW5nIiA/IHRvIDogcm91dGVyX2NyZWF0ZVBhdGgodG8pKTsKICB9CgogIGZ1bmN0aW9uIHZhbGlkYXRlSGFzaExvY2F0aW9uKGxvY2F0aW9uLCB0bykgewogICAgd2FybmluZyQxKGxvY2F0aW9uLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gIi8iLCAicmVsYXRpdmUgcGF0aG5hbWVzIGFyZSBub3Qgc3VwcG9ydGVkIGluIGhhc2ggaGlzdG9yeS5wdXNoKCIgKyBKU09OLnN0cmluZ2lmeSh0bykgKyAiKSIpOwogIH0KCiAgcmV0dXJuIGdldFVybEJhc2VkSGlzdG9yeShjcmVhdGVIYXNoTG9jYXRpb24sIGNyZWF0ZUhhc2hIcmVmLCB2YWxpZGF0ZUhhc2hMb2NhdGlvbiwgb3B0aW9ucyk7Cn0gLy8jZW5kcmVnaW9uCi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vCi8vI3JlZ2lvbiBVVElMUwovLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLwoKZnVuY3Rpb24gd2FybmluZyQxKGNvbmQsIG1lc3NhZ2UpIHsKICBpZiAoIWNvbmQpIHsKICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlCiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICJ1bmRlZmluZWQiKSBjb25zb2xlLndhcm4obWVzc2FnZSk7CgogICAgdHJ5IHsKICAgICAgLy8gV2VsY29tZSB0byBkZWJ1Z2dpbmcgaGlzdG9yeSEKICAgICAgLy8KICAgICAgLy8gVGhpcyBlcnJvciBpcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB5b3UgY2FuIG1vcmUgZWFzaWx5CiAgICAgIC8vIGZpbmQgdGhlIHNvdXJjZSBmb3IgYSB3YXJuaW5nIHRoYXQgYXBwZWFycyBpbiB0aGUgY29uc29sZSBieQogICAgICAvLyBlbmFibGluZyAicGF1c2Ugb24gZXhjZXB0aW9ucyIgaW4geW91ciBKYXZhU2NyaXB0IGRlYnVnZ2VyLgogICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lbXB0eQogICAgfSBjYXRjaCAoZSkge30KICB9Cn0KCmZ1bmN0aW9uIGNyZWF0ZUtleSgpIHsKICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIDgpOwp9Ci8qKgogKiBGb3IgYnJvd3Nlci1iYXNlZCBoaXN0b3JpZXMsIHdlIGNvbWJpbmUgdGhlIHN0YXRlIGFuZCBrZXkgaW50byBhbiBvYmplY3QKICovCgoKZnVuY3Rpb24gZ2V0SGlzdG9yeVN0YXRlKGxvY2F0aW9uKSB7CiAgcmV0dXJuIHsKICAgIHVzcjogbG9jYXRpb24uc3RhdGUsCiAgICBrZXk6IGxvY2F0aW9uLmtleQogIH07Cn0KLyoqCiAqIENyZWF0ZXMgYSBMb2NhdGlvbiBvYmplY3Qgd2l0aCBhIHVuaXF1ZSBrZXkgZnJvbSB0aGUgZ2l2ZW4gUGF0aAogKi8KCgpmdW5jdGlvbiBjcmVhdGVMb2NhdGlvbihjdXJyZW50LCB0bywgc3RhdGUsIGtleSkgewogIGlmIChzdGF0ZSA9PT0gdm9pZCAwKSB7CiAgICBzdGF0ZSA9IG51bGw7CiAgfQoKICBsZXQgbG9jYXRpb24gPSBfZXh0ZW5kcyh7CiAgICBwYXRobmFtZTogdHlwZW9mIGN1cnJlbnQgPT09ICJzdHJpbmciID8gY3VycmVudCA6IGN1cnJlbnQucGF0aG5hbWUsCiAgICBzZWFyY2g6ICIiLAogICAgaGFzaDogIiIKICB9LCB0eXBlb2YgdG8gPT09ICJzdHJpbmciID8gcGFyc2VQYXRoKHRvKSA6IHRvLCB7CiAgICBzdGF0ZSwKICAgIC8vIFRPRE86IFRoaXMgY291bGQgYmUgY2xlYW5lZCB1cC4gIHB1c2gvcmVwbGFjZSBzaG91bGQgcHJvYmFibHkganVzdCB0YWtlCiAgICAvLyBmdWxsIExvY2F0aW9ucyBub3cgYW5kIGF2b2lkIHRoZSBuZWVkIHRvIHJ1biB0aHJvdWdoIHRoaXMgZmxvdyBhdCBhbGwKICAgIC8vIEJ1dCB0aGF0J3MgYSBwcmV0dHkgYmlnIHJlZmFjdG9yIHRvIHRoZSBjdXJyZW50IHRlc3Qgc3VpdGUgc28gZ29pbmcgdG8KICAgIC8vIGtlZXAgYXMgaXMgZm9yIHRoZSB0aW1lIGJlaW5nIGFuZCBqdXN0IGxldCBhbnkgaW5jb21pbmcga2V5cyB0YWtlIHByZWNlZGVuY2UKICAgIGtleTogdG8gJiYgdG8ua2V5IHx8IGtleSB8fCBjcmVhdGVLZXkoKQogIH0pOwoKICByZXR1cm4gbG9jYXRpb247Cn0KLyoqCiAqIENyZWF0ZXMgYSBzdHJpbmcgVVJMIHBhdGggZnJvbSB0aGUgZ2l2ZW4gcGF0aG5hbWUsIHNlYXJjaCwgYW5kIGhhc2ggY29tcG9uZW50cy4KICovCgpmdW5jdGlvbiByb3V0ZXJfY3JlYXRlUGF0aChfcmVmKSB7CiAgbGV0IHsKICAgIHBhdGhuYW1lID0gIi8iLAogICAgc2VhcmNoID0gIiIsCiAgICBoYXNoID0gIiIKICB9ID0gX3JlZjsKICBpZiAoc2VhcmNoICYmIHNlYXJjaCAhPT0gIj8iKSBwYXRobmFtZSArPSBzZWFyY2guY2hhckF0KDApID09PSAiPyIgPyBzZWFyY2ggOiAiPyIgKyBzZWFyY2g7CiAgaWYgKGhhc2ggJiYgaGFzaCAhPT0gIiMiKSBwYXRobmFtZSArPSBoYXNoLmNoYXJBdCgwKSA9PT0gIiMiID8gaGFzaCA6ICIjIiArIGhhc2g7CiAgcmV0dXJuIHBhdGhuYW1lOwp9Ci8qKgogKiBQYXJzZXMgYSBzdHJpbmcgVVJMIHBhdGggaW50byBpdHMgc2VwYXJhdGUgcGF0aG5hbWUsIHNlYXJjaCwgYW5kIGhhc2ggY29tcG9uZW50cy4KICovCgpmdW5jdGlvbiBwYXJzZVBhdGgocGF0aCkgewogIGxldCBwYXJzZWRQYXRoID0ge307CgogIGlmIChwYXRoKSB7CiAgICBsZXQgaGFzaEluZGV4ID0gcGF0aC5pbmRleE9mKCIjIik7CgogICAgaWYgKGhhc2hJbmRleCA+PSAwKSB7CiAgICAgIHBhcnNlZFBhdGguaGFzaCA9IHBhdGguc3Vic3RyKGhhc2hJbmRleCk7CiAgICAgIHBhdGggPSBwYXRoLnN1YnN0cigwLCBoYXNoSW5kZXgpOwogICAgfQoKICAgIGxldCBzZWFyY2hJbmRleCA9IHBhdGguaW5kZXhPZigiPyIpOwoKICAgIGlmIChzZWFyY2hJbmRleCA+PSAwKSB7CiAgICAgIHBhcnNlZFBhdGguc2VhcmNoID0gcGF0aC5zdWJzdHIoc2VhcmNoSW5kZXgpOwogICAgICBwYXRoID0gcGF0aC5zdWJzdHIoMCwgc2VhcmNoSW5kZXgpOwogICAgfQoKICAgIGlmIChwYXRoKSB7CiAgICAgIHBhcnNlZFBhdGgucGF0aG5hbWUgPSBwYXRoOwogICAgfQogIH0KCiAgcmV0dXJuIHBhcnNlZFBhdGg7Cn0KZnVuY3Rpb24gY3JlYXRlVVJMKGxvY2F0aW9uKSB7CiAgLy8gd2luZG93LmxvY2F0aW9uLm9yaWdpbiBpcyAibnVsbCIgKHRoZSBsaXRlcmFsIHN0cmluZyB2YWx1ZSkgaW4gRmlyZWZveAogIC8vIHVuZGVyIGNlcnRhaW4gY29uZGl0aW9ucywgbm90YWJseSB3aGVuIHNlcnZpbmcgZnJvbSBhIGxvY2FsIEhUTUwgZmlsZQogIC8vIFNlZSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD04NzgyOTcKICBsZXQgYmFzZSA9IHR5cGVvZiB3aW5kb3cgIT09ICJ1bmRlZmluZWQiICYmIHR5cGVvZiB3aW5kb3cubG9jYXRpb24gIT09ICJ1bmRlZmluZWQiICYmIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gIT09ICJudWxsIiA/IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gOiAidW5rbm93bjovL3Vua25vd24iOwogIGxldCBocmVmID0gdHlwZW9mIGxvY2F0aW9uID09PSAic3RyaW5nIiA/IGxvY2F0aW9uIDogcm91dGVyX2NyZWF0ZVBhdGgobG9jYXRpb24pOwogIHJldHVybiBuZXcgVVJMKGhyZWYsIGJhc2UpOwp9CgpmdW5jdGlvbiBnZXRVcmxCYXNlZEhpc3RvcnkoZ2V0TG9jYXRpb24sIGNyZWF0ZUhyZWYsIHZhbGlkYXRlTG9jYXRpb24sIG9wdGlvbnMpIHsKICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7CiAgICBvcHRpb25zID0ge307CiAgfQoKICBsZXQgewogICAgd2luZG93ID0gZG9jdW1lbnQuZGVmYXVsdFZpZXcsCiAgICB2NUNvbXBhdCA9IGZhbHNlCiAgfSA9IG9wdGlvbnM7CiAgbGV0IGdsb2JhbEhpc3RvcnkgPSB3aW5kb3cuaGlzdG9yeTsKICBsZXQgYWN0aW9uID0gQWN0aW9uLlBvcDsKICBsZXQgbGlzdGVuZXIgPSBudWxsOwoKICBmdW5jdGlvbiBoYW5kbGVQb3AoKSB7CiAgICBhY3Rpb24gPSBBY3Rpb24uUG9wOwoKICAgIGlmIChsaXN0ZW5lcikgewogICAgICBsaXN0ZW5lcih7CiAgICAgICAgYWN0aW9uLAogICAgICAgIGxvY2F0aW9uOiBoaXN0b3J5LmxvY2F0aW9uCiAgICAgIH0pOwogICAgfQogIH0KCiAgZnVuY3Rpb24gcHVzaCh0bywgc3RhdGUpIHsKICAgIGFjdGlvbiA9IEFjdGlvbi5QdXNoOwogICAgbGV0IGxvY2F0aW9uID0gY3JlYXRlTG9jYXRpb24oaGlzdG9yeS5sb2NhdGlvbiwgdG8sIHN0YXRlKTsKICAgIGlmICh2YWxpZGF0ZUxvY2F0aW9uKSB2YWxpZGF0ZUxvY2F0aW9uKGxvY2F0aW9uLCB0byk7CiAgICBsZXQgaGlzdG9yeVN0YXRlID0gZ2V0SGlzdG9yeVN0YXRlKGxvY2F0aW9uKTsKICAgIGxldCB1cmwgPSBoaXN0b3J5LmNyZWF0ZUhyZWYobG9jYXRpb24pOyAvLyB0cnkuLi5jYXRjaCBiZWNhdXNlIGlPUyBsaW1pdHMgdXMgdG8gMTAwIHB1c2hTdGF0ZSBjYWxscyA6LwoKICAgIHRyeSB7CiAgICAgIGdsb2JhbEhpc3RvcnkucHVzaFN0YXRlKGhpc3RvcnlTdGF0ZSwgIiIsIHVybCk7CiAgICB9IGNhdGNoIChlcnJvcikgewogICAgICAvLyBUaGV5IGFyZSBnb2luZyB0byBsb3NlIHN0YXRlIGhlcmUsIGJ1dCB0aGVyZSBpcyBubyByZWFsCiAgICAgIC8vIHdheSB0byB3YXJuIHRoZW0gYWJvdXQgaXQgc2luY2UgdGhlIHBhZ2Ugd2lsbCByZWZyZXNoLi4uCiAgICAgIHdpbmRvdy5sb2NhdGlvbi5hc3NpZ24odXJsKTsKICAgIH0KCiAgICBpZiAodjVDb21wYXQgJiYgbGlzdGVuZXIpIHsKICAgICAgbGlzdGVuZXIoewogICAgICAgIGFjdGlvbiwKICAgICAgICBsb2NhdGlvbjogaGlzdG9yeS5sb2NhdGlvbgogICAgICB9KTsKICAgIH0KICB9CgogIGZ1bmN0aW9uIHJlcGxhY2UodG8sIHN0YXRlKSB7CiAgICBhY3Rpb24gPSBBY3Rpb24uUmVwbGFjZTsKICAgIGxldCBsb2NhdGlvbiA9IGNyZWF0ZUxvY2F0aW9uKGhpc3RvcnkubG9jYXRpb24sIHRvLCBzdGF0ZSk7CiAgICBpZiAodmFsaWRhdGVMb2NhdGlvbikgdmFsaWRhdGVMb2NhdGlvbihsb2NhdGlvbiwgdG8pOwogICAgbGV0IGhpc3RvcnlTdGF0ZSA9IGdldEhpc3RvcnlTdGF0ZShsb2NhdGlvbik7CiAgICBsZXQgdXJsID0gaGlzdG9yeS5jcmVhdGVIcmVmKGxvY2F0aW9uKTsKICAgIGdsb2JhbEhpc3RvcnkucmVwbGFjZVN0YXRlKGhpc3RvcnlTdGF0ZSwgIiIsIHVybCk7CgogICAgaWYgKHY1Q29tcGF0ICYmIGxpc3RlbmVyKSB7CiAgICAgIGxpc3RlbmVyKHsKICAgICAgICBhY3Rpb24sCiAgICAgICAgbG9jYXRpb246IGhpc3RvcnkubG9jYXRpb24KICAgICAgfSk7CiAgICB9CiAgfQoKICBsZXQgaGlzdG9yeSA9IHsKICAgIGdldCBhY3Rpb24oKSB7CiAgICAgIHJldHVybiBhY3Rpb247CiAgICB9LAoKICAgIGdldCBsb2NhdGlvbigpIHsKICAgICAgcmV0dXJuIGdldExvY2F0aW9uKHdpbmRvdywgZ2xvYmFsSGlzdG9yeSk7CiAgICB9LAoKICAgIGxpc3RlbihmbikgewogICAgICBpZiAobGlzdGVuZXIpIHsKICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIkEgaGlzdG9yeSBvbmx5IGFjY2VwdHMgb25lIGFjdGl2ZSBsaXN0ZW5lciIpOwogICAgICB9CgogICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihQb3BTdGF0ZUV2ZW50VHlwZSwgaGFuZGxlUG9wKTsKICAgICAgbGlzdGVuZXIgPSBmbjsKICAgICAgcmV0dXJuICgpID0+IHsKICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihQb3BTdGF0ZUV2ZW50VHlwZSwgaGFuZGxlUG9wKTsKICAgICAgICBsaXN0ZW5lciA9IG51bGw7CiAgICAgIH07CiAgICB9LAoKICAgIGNyZWF0ZUhyZWYodG8pIHsKICAgICAgcmV0dXJuIGNyZWF0ZUhyZWYod2luZG93LCB0byk7CiAgICB9LAoKICAgIGVuY29kZUxvY2F0aW9uKGxvY2F0aW9uKSB7CiAgICAgIC8vIEVuY29kZSBhIExvY2F0aW9uIHRoZSBzYW1lIHdheSB3aW5kb3cubG9jYXRpb24gd291bGQKICAgICAgbGV0IHVybCA9IGNyZWF0ZVVSTChyb3V0ZXJfY3JlYXRlUGF0aChsb2NhdGlvbikpOwogICAgICByZXR1cm4gX2V4dGVuZHMoe30sIGxvY2F0aW9uLCB7CiAgICAgICAgcGF0aG5hbWU6IHVybC5wYXRobmFtZSwKICAgICAgICBzZWFyY2g6IHVybC5zZWFyY2gsCiAgICAgICAgaGFzaDogdXJsLmhhc2gKICAgICAgfSk7CiAgICB9LAoKICAgIHB1c2gsCiAgICByZXBsYWNlLAoKICAgIGdvKG4pIHsKICAgICAgcmV0dXJuIGdsb2JhbEhpc3RvcnkuZ28obik7CiAgICB9CgogIH07CiAgcmV0dXJuIGhpc3Rvcnk7Cn0gLy8jZW5kcmVnaW9uCgp2YXIgUmVzdWx0VHlwZTsKCihmdW5jdGlvbiAoUmVzdWx0VHlwZSkgewogIFJlc3VsdFR5cGVbImRhdGEiXSA9ICJkYXRhIjsKICBSZXN1bHRUeXBlWyJkZWZlcnJlZCJdID0gImRlZmVycmVkIjsKICBSZXN1bHRUeXBlWyJyZWRpcmVjdCJdID0gInJlZGlyZWN0IjsKICBSZXN1bHRUeXBlWyJlcnJvciJdID0gImVycm9yIjsKfSkoUmVzdWx0VHlwZSB8fCAoUmVzdWx0VHlwZSA9IHt9KSk7CgpmdW5jdGlvbiBpc0luZGV4Um91dGUocm91dGUpIHsKICByZXR1cm4gcm91dGUuaW5kZXggPT09IHRydWU7Cn0gLy8gV2FsayB0aGUgcm91dGUgdHJlZSBnZW5lcmF0aW5nIHVuaXF1ZSBJRHMgd2hlcmUgbmVjZXNzYXJ5IHNvIHdlIGFyZSB3b3JraW5nCi8vIHNvbGVseSB3aXRoIEFnbm9zdGljRGF0YVJvdXRlT2JqZWN0J3Mgd2l0aGluIHRoZSBSb3V0ZXIKCgpmdW5jdGlvbiBjb252ZXJ0Um91dGVzVG9EYXRhUm91dGVzKHJvdXRlcywgcGFyZW50UGF0aCwgYWxsSWRzKSB7CiAgaWYgKHBhcmVudFBhdGggPT09IHZvaWQgMCkgewogICAgcGFyZW50UGF0aCA9IFtdOwogIH0KCiAgaWYgKGFsbElkcyA9PT0gdm9pZCAwKSB7CiAgICBhbGxJZHMgPSBuZXcgU2V0KCk7CiAgfQoKICByZXR1cm4gcm91dGVzLm1hcCgocm91dGUsIGluZGV4KSA9PiB7CiAgICBsZXQgdHJlZVBhdGggPSBbLi4ucGFyZW50UGF0aCwgaW5kZXhdOwogICAgbGV0IGlkID0gdHlwZW9mIHJvdXRlLmlkID09PSAic3RyaW5nIiA/IHJvdXRlLmlkIDogdHJlZVBhdGguam9pbigiLSIpOwogICAgcm91dGVyX2ludmFyaWFudChyb3V0ZS5pbmRleCAhPT0gdHJ1ZSB8fCAhcm91dGUuY2hpbGRyZW4sICJDYW5ub3Qgc3BlY2lmeSBjaGlsZHJlbiBvbiBhbiBpbmRleCByb3V0ZSIpOwogICAgcm91dGVyX2ludmFyaWFudCghYWxsSWRzLmhhcyhpZCksICJGb3VuZCBhIHJvdXRlIGlkIGNvbGxpc2lvbiBvbiBpZCBcIiIgKyBpZCArICJcIi4gIFJvdXRlICIgKyAiaWQncyBtdXN0IGJlIGdsb2JhbGx5IHVuaXF1ZSB3aXRoaW4gRGF0YSBSb3V0ZXIgdXNhZ2VzIik7CiAgICBhbGxJZHMuYWRkKGlkKTsKCiAgICBpZiAoaXNJbmRleFJvdXRlKHJvdXRlKSkgewogICAgICBsZXQgaW5kZXhSb3V0ZSA9IF9leHRlbmRzKHt9LCByb3V0ZSwgewogICAgICAgIGlkCiAgICAgIH0pOwoKICAgICAgcmV0dXJuIGluZGV4Um91dGU7CiAgICB9IGVsc2UgewogICAgICBsZXQgcGF0aE9yTGF5b3V0Um91dGUgPSBfZXh0ZW5kcyh7fSwgcm91dGUsIHsKICAgICAgICBpZCwKICAgICAgICBjaGlsZHJlbjogcm91dGUuY2hpbGRyZW4gPyBjb252ZXJ0Um91dGVzVG9EYXRhUm91dGVzKHJvdXRlLmNoaWxkcmVuLCB0cmVlUGF0aCwgYWxsSWRzKSA6IHVuZGVmaW5lZAogICAgICB9KTsKCiAgICAgIHJldHVybiBwYXRoT3JMYXlvdXRSb3V0ZTsKICAgIH0KICB9KTsKfQovKioKICogTWF0Y2hlcyB0aGUgZ2l2ZW4gcm91dGVzIHRvIGEgbG9jYXRpb24gYW5kIHJldHVybnMgdGhlIG1hdGNoIGRhdGEuCiAqCiAqIEBzZWUgaHR0cHM6Ly9yZWFjdHJvdXRlci5jb20vZG9jcy9lbi92Ni91dGlscy9tYXRjaC1yb3V0ZXMKICovCgpmdW5jdGlvbiBtYXRjaFJvdXRlcyhyb3V0ZXMsIGxvY2F0aW9uQXJnLCBiYXNlbmFtZSkgewogIGlmIChiYXNlbmFtZSA9PT0gdm9pZCAwKSB7CiAgICBiYXNlbmFtZSA9ICIvIjsKICB9CgogIGxldCBsb2NhdGlvbiA9IHR5cGVvZiBsb2NhdGlvbkFyZyA9PT0gInN0cmluZyIgPyBwYXJzZVBhdGgobG9jYXRpb25BcmcpIDogbG9jYXRpb25Bcmc7CiAgbGV0IHBhdGhuYW1lID0gc3RyaXBCYXNlbmFtZShsb2NhdGlvbi5wYXRobmFtZSB8fCAiLyIsIGJhc2VuYW1lKTsKCiAgaWYgKHBhdGhuYW1lID09IG51bGwpIHsKICAgIHJldHVybiBudWxsOwogIH0KCiAgbGV0IGJyYW5jaGVzID0gZmxhdHRlblJvdXRlcyhyb3V0ZXMpOwogIHJhbmtSb3V0ZUJyYW5jaGVzKGJyYW5jaGVzKTsKICBsZXQgbWF0Y2hlcyA9IG51bGw7CgogIGZvciAobGV0IGkgPSAwOyBtYXRjaGVzID09IG51bGwgJiYgaSA8IGJyYW5jaGVzLmxlbmd0aDsgKytpKSB7CiAgICBtYXRjaGVzID0gbWF0Y2hSb3V0ZUJyYW5jaChicmFuY2hlc1tpXSwgLy8gSW5jb21pbmcgcGF0aG5hbWVzIGFyZSBnZW5lcmFsbHkgZW5jb2RlZCBmcm9tIGVpdGhlciB3aW5kb3cubG9jYXRpb24KICAgIC8vIG9yIGZyb20gcm91dGVyLm5hdmlnYXRlLCBidXQgd2Ugd2FudCB0byBtYXRjaCBhZ2FpbnN0IHRoZSB1bmVuY29kZWQKICAgIC8vIHBhdGhzIGluIHRoZSByb3V0ZSBkZWZpbml0aW9ucy4gIE1lbW9yeSByb3V0ZXIgbG9jYXRpb25zIHdvbid0IGJlCiAgICAvLyBlbmNvZGVkIGhlcmUgYnV0IHRoZXJlIGFsc28gc2hvdWxkbid0IGJlIGFueXRoaW5nIHRvIGRlY29kZSBzbyB0aGlzCiAgICAvLyBzaG91bGQgYmUgYSBzYWZlIG9wZXJhdGlvbi4gIFRoaXMgYXZvaWRzIG5lZWRpbmcgbWF0Y2hSb3V0ZXMgdG8gYmUKICAgIC8vIGhpc3RvcnktYXdhcmUuCiAgICBzYWZlbHlEZWNvZGVVUkkocGF0aG5hbWUpKTsKICB9CgogIHJldHVybiBtYXRjaGVzOwp9CgpmdW5jdGlvbiBmbGF0dGVuUm91dGVzKHJvdXRlcywgYnJhbmNoZXMsIHBhcmVudHNNZXRhLCBwYXJlbnRQYXRoKSB7CiAgaWYgKGJyYW5jaGVzID09PSB2b2lkIDApIHsKICAgIGJyYW5jaGVzID0gW107CiAgfQoKICBpZiAocGFyZW50c01ldGEgPT09IHZvaWQgMCkgewogICAgcGFyZW50c01ldGEgPSBbXTsKICB9CgogIGlmIChwYXJlbnRQYXRoID09PSB2b2lkIDApIHsKICAgIHBhcmVudFBhdGggPSAiIjsKICB9CgogIHJvdXRlcy5mb3JFYWNoKChyb3V0ZSwgaW5kZXgpID0+IHsKICAgIGxldCBtZXRhID0gewogICAgICByZWxhdGl2ZVBhdGg6IHJvdXRlLnBhdGggfHwgIiIsCiAgICAgIGNhc2VTZW5zaXRpdmU6IHJvdXRlLmNhc2VTZW5zaXRpdmUgPT09IHRydWUsCiAgICAgIGNoaWxkcmVuSW5kZXg6IGluZGV4LAogICAgICByb3V0ZQogICAgfTsKCiAgICBpZiAobWV0YS5yZWxhdGl2ZVBhdGguc3RhcnRzV2l0aCgiLyIpKSB7CiAgICAgIHJvdXRlcl9pbnZhcmlhbnQobWV0YS5yZWxhdGl2ZVBhdGguc3RhcnRzV2l0aChwYXJlbnRQYXRoKSwgIkFic29sdXRlIHJvdXRlIHBhdGggXCIiICsgbWV0YS5yZWxhdGl2ZVBhdGggKyAiXCIgbmVzdGVkIHVuZGVyIHBhdGggIiArICgiXCIiICsgcGFyZW50UGF0aCArICJcIiBpcyBub3QgdmFsaWQuIEFuIGFic29sdXRlIGNoaWxkIHJvdXRlIHBhdGggIikgKyAibXVzdCBzdGFydCB3aXRoIHRoZSBjb21iaW5lZCBwYXRoIG9mIGFsbCBpdHMgcGFyZW50IHJvdXRlcy4iKTsKICAgICAgbWV0YS5yZWxhdGl2ZVBhdGggPSBtZXRhLnJlbGF0aXZlUGF0aC5zbGljZShwYXJlbnRQYXRoLmxlbmd0aCk7CiAgICB9CgogICAgbGV0IHBhdGggPSByb3V0ZXJfam9pblBhdGhzKFtwYXJlbnRQYXRoLCBtZXRhLnJlbGF0aXZlUGF0aF0pOwogICAgbGV0IHJvdXRlc01ldGEgPSBwYXJlbnRzTWV0YS5jb25jYXQobWV0YSk7IC8vIEFkZCB0aGUgY2hpbGRyZW4gYmVmb3JlIGFkZGluZyB0aGlzIHJvdXRlIHRvIHRoZSBhcnJheSBzbyB3ZSB0cmF2ZXJzZSB0aGUKICAgIC8vIHJvdXRlIHRyZWUgZGVwdGgtZmlyc3QgYW5kIGNoaWxkIHJvdXRlcyBhcHBlYXIgYmVmb3JlIHRoZWlyIHBhcmVudHMgaW4KICAgIC8vIHRoZSAiZmxhdHRlbmVkIiB2ZXJzaW9uLgoKICAgIGlmIChyb3V0ZS5jaGlsZHJlbiAmJiByb3V0ZS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7CiAgICAgIHJvdXRlcl9pbnZhcmlhbnQoIC8vIE91ciB0eXBlcyBrbm93IGJldHRlciwgYnV0IHJ1bnRpbWUgSlMgbWF5IG5vdCEKICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvcgogICAgICByb3V0ZS5pbmRleCAhPT0gdHJ1ZSwgIkluZGV4IHJvdXRlcyBtdXN0IG5vdCBoYXZlIGNoaWxkIHJvdXRlcy4gUGxlYXNlIHJlbW92ZSAiICsgKCJhbGwgY2hpbGQgcm91dGVzIGZyb20gcm91dGUgcGF0aCBcIiIgKyBwYXRoICsgIlwiLiIpKTsKICAgICAgZmxhdHRlblJvdXRlcyhyb3V0ZS5jaGlsZHJlbiwgYnJhbmNoZXMsIHJvdXRlc01ldGEsIHBhdGgpOwogICAgfSAvLyBSb3V0ZXMgd2l0aG91dCBhIHBhdGggc2hvdWxkbid0IGV2ZXIgbWF0Y2ggYnkgdGhlbXNlbHZlcyB1bmxlc3MgdGhleSBhcmUKICAgIC8vIGluZGV4IHJvdXRlcywgc28gZG9uJ3QgYWRkIHRoZW0gdG8gdGhlIGxpc3Qgb2YgcG9zc2libGUgYnJhbmNoZXMuCgoKICAgIGlmIChyb3V0ZS5wYXRoID09IG51bGwgJiYgIXJvdXRlLmluZGV4KSB7CiAgICAgIHJldHVybjsKICAgIH0KCiAgICBicmFuY2hlcy5wdXNoKHsKICAgICAgcGF0aCwKICAgICAgc2NvcmU6IGNvbXB1dGVTY29yZShwYXRoLCByb3V0ZS5pbmRleCksCiAgICAgIHJvdXRlc01ldGEKICAgIH0pOwogIH0pOwogIHJldHVybiBicmFuY2hlczsKfQoKZnVuY3Rpb24gcmFua1JvdXRlQnJhbmNoZXMoYnJhbmNoZXMpIHsKICBicmFuY2hlcy5zb3J0KChhLCBiKSA9PiBhLnNjb3JlICE9PSBiLnNjb3JlID8gYi5zY29yZSAtIGEuc2NvcmUgLy8gSGlnaGVyIHNjb3JlIGZpcnN0CiAgOiBjb21wYXJlSW5kZXhlcyhhLnJvdXRlc01ldGEubWFwKG1ldGEgPT4gbWV0YS5jaGlsZHJlbkluZGV4KSwgYi5yb3V0ZXNNZXRhLm1hcChtZXRhID0+IG1ldGEuY2hpbGRyZW5JbmRleCkpKTsKfQoKY29uc3QgcGFyYW1SZSA9IC9eOlx3KyQvOwpjb25zdCBkeW5hbWljU2VnbWVudFZhbHVlID0gMzsKY29uc3QgaW5kZXhSb3V0ZVZhbHVlID0gMjsKY29uc3QgZW1wdHlTZWdtZW50VmFsdWUgPSAxOwpjb25zdCBzdGF0aWNTZWdtZW50VmFsdWUgPSAxMDsKY29uc3Qgc3BsYXRQZW5hbHR5ID0gLTI7Cgpjb25zdCBpc1NwbGF0ID0gcyA9PiBzID09PSAiKiI7CgpmdW5jdGlvbiBjb21wdXRlU2NvcmUocGF0aCwgaW5kZXgpIHsKICBsZXQgc2VnbWVudHMgPSBwYXRoLnNwbGl0KCIvIik7CiAgbGV0IGluaXRpYWxTY29yZSA9IHNlZ21lbnRzLmxlbmd0aDsKCiAgaWYgKHNlZ21lbnRzLnNvbWUoaXNTcGxhdCkpIHsKICAgIGluaXRpYWxTY29yZSArPSBzcGxhdFBlbmFsdHk7CiAgfQoKICBpZiAoaW5kZXgpIHsKICAgIGluaXRpYWxTY29yZSArPSBpbmRleFJvdXRlVmFsdWU7CiAgfQoKICByZXR1cm4gc2VnbWVudHMuZmlsdGVyKHMgPT4gIWlzU3BsYXQocykpLnJlZHVjZSgoc2NvcmUsIHNlZ21lbnQpID0+IHNjb3JlICsgKHBhcmFtUmUudGVzdChzZWdtZW50KSA/IGR5bmFtaWNTZWdtZW50VmFsdWUgOiBzZWdtZW50ID09PSAiIiA/IGVtcHR5U2VnbWVudFZhbHVlIDogc3RhdGljU2VnbWVudFZhbHVlKSwgaW5pdGlhbFNjb3JlKTsKfQoKZnVuY3Rpb24gY29tcGFyZUluZGV4ZXMoYSwgYikgewogIGxldCBzaWJsaW5ncyA9IGEubGVuZ3RoID09PSBiLmxlbmd0aCAmJiBhLnNsaWNlKDAsIC0xKS5ldmVyeSgobiwgaSkgPT4gbiA9PT0gYltpXSk7CiAgcmV0dXJuIHNpYmxpbmdzID8gLy8gSWYgdHdvIHJvdXRlcyBhcmUgc2libGluZ3MsIHdlIHNob3VsZCB0cnkgdG8gbWF0Y2ggdGhlIGVhcmxpZXIgc2libGluZwogIC8vIGZpcnN0LiBUaGlzIGFsbG93cyBwZW9wbGUgdG8gaGF2ZSBmaW5lLWdyYWluZWQgY29udHJvbCBvdmVyIHRoZSBtYXRjaGluZwogIC8vIGJlaGF2aW9yIGJ5IHNpbXBseSBwdXR0aW5nIHJvdXRlcyB3aXRoIGlkZW50aWNhbCBwYXRocyBpbiB0aGUgb3JkZXIgdGhleQogIC8vIHdhbnQgdGhlbSB0cmllZC4KICBhW2EubGVuZ3RoIC0gMV0gLSBiW2IubGVuZ3RoIC0gMV0gOiAvLyBPdGhlcndpc2UsIGl0IGRvZXNuJ3QgcmVhbGx5IG1ha2Ugc2Vuc2UgdG8gcmFuayBub24tc2libGluZ3MgYnkgaW5kZXgsCiAgLy8gc28gdGhleSBzb3J0IGVxdWFsbHkuCiAgMDsKfQoKZnVuY3Rpb24gbWF0Y2hSb3V0ZUJyYW5jaChicmFuY2gsIHBhdGhuYW1lKSB7CiAgbGV0IHsKICAgIHJvdXRlc01ldGEKICB9ID0gYnJhbmNoOwogIGxldCBtYXRjaGVkUGFyYW1zID0ge307CiAgbGV0IG1hdGNoZWRQYXRobmFtZSA9ICIvIjsKICBsZXQgbWF0Y2hlcyA9IFtdOwoKICBmb3IgKGxldCBpID0gMDsgaSA8IHJvdXRlc01ldGEubGVuZ3RoOyArK2kpIHsKICAgIGxldCBtZXRhID0gcm91dGVzTWV0YVtpXTsKICAgIGxldCBlbmQgPSBpID09PSByb3V0ZXNNZXRhLmxlbmd0aCAtIDE7CiAgICBsZXQgcmVtYWluaW5nUGF0aG5hbWUgPSBtYXRjaGVkUGF0aG5hbWUgPT09ICIvIiA/IHBhdGhuYW1lIDogcGF0aG5hbWUuc2xpY2UobWF0Y2hlZFBhdGhuYW1lLmxlbmd0aCkgfHwgIi8iOwogICAgbGV0IG1hdGNoID0gcm91dGVyX21hdGNoUGF0aCh7CiAgICAgIHBhdGg6IG1ldGEucmVsYXRpdmVQYXRoLAogICAgICBjYXNlU2Vuc2l0aXZlOiBtZXRhLmNhc2VTZW5zaXRpdmUsCiAgICAgIGVuZAogICAgfSwgcmVtYWluaW5nUGF0aG5hbWUpOwogICAgaWYgKCFtYXRjaCkgcmV0dXJuIG51bGw7CiAgICBPYmplY3QuYXNzaWduKG1hdGNoZWRQYXJhbXMsIG1hdGNoLnBhcmFtcyk7CiAgICBsZXQgcm91dGUgPSBtZXRhLnJvdXRlOwogICAgbWF0Y2hlcy5wdXNoKHsKICAgICAgLy8gVE9ETzogQ2FuIHRoaXMgYXMgYmUgYXZvaWRlZD8KICAgICAgcGFyYW1zOiBtYXRjaGVkUGFyYW1zLAogICAgICBwYXRobmFtZTogcm91dGVyX2pvaW5QYXRocyhbbWF0Y2hlZFBhdGhuYW1lLCBtYXRjaC5wYXRobmFtZV0pLAogICAgICBwYXRobmFtZUJhc2U6IG5vcm1hbGl6ZVBhdGhuYW1lKHJvdXRlcl9qb2luUGF0aHMoW21hdGNoZWRQYXRobmFtZSwgbWF0Y2gucGF0aG5hbWVCYXNlXSkpLAogICAgICByb3V0ZQogICAgfSk7CgogICAgaWYgKG1hdGNoLnBhdGhuYW1lQmFzZSAhPT0gIi8iKSB7CiAgICAgIG1hdGNoZWRQYXRobmFtZSA9IHJvdXRlcl9qb2luUGF0aHMoW21hdGNoZWRQYXRobmFtZSwgbWF0Y2gucGF0aG5hbWVCYXNlXSk7CiAgICB9CiAgfQoKICByZXR1cm4gbWF0Y2hlczsKfQovKioKICogUmV0dXJucyBhIHBhdGggd2l0aCBwYXJhbXMgaW50ZXJwb2xhdGVkLgogKgogKiBAc2VlIGh0dHBzOi8vcmVhY3Ryb3V0ZXIuY29tL2RvY3MvZW4vdjYvdXRpbHMvZ2VuZXJhdGUtcGF0aAogKi8KCgpmdW5jdGlvbiBnZW5lcmF0ZVBhdGgocGF0aCwgcGFyYW1zKSB7CiAgaWYgKHBhcmFtcyA9PT0gdm9pZCAwKSB7CiAgICBwYXJhbXMgPSB7fTsKICB9CgogIHJldHVybiBwYXRoLnJlcGxhY2UoLzooXHcrKS9nLCAoXywga2V5KSA9PiB7CiAgICByb3V0ZXJfaW52YXJpYW50KHBhcmFtc1trZXldICE9IG51bGwsICJNaXNzaW5nIFwiOiIgKyBrZXkgKyAiXCIgcGFyYW0iKTsKICAgIHJldHVybiBwYXJhbXNba2V5XTsKICB9KS5yZXBsYWNlKC8oXC8/KVwqLywgKF8sIHByZWZpeCwgX18sIHN0cikgPT4gewogICAgY29uc3Qgc3RhciA9ICIqIjsKCiAgICBpZiAocGFyYW1zW3N0YXJdID09IG51bGwpIHsKICAgICAgLy8gSWYgbm8gc3BsYXQgd2FzIHByb3ZpZGVkLCB0cmltIHRoZSB0cmFpbGluZyBzbGFzaCBfdW5sZXNzXyBpdCdzCiAgICAgIC8vIHRoZSBlbnRpcmUgcGF0aAogICAgICByZXR1cm4gc3RyID09PSAiLyoiID8gIi8iIDogIiI7CiAgICB9IC8vIEFwcGx5IHRoZSBzcGxhdAoKCiAgICByZXR1cm4gIiIgKyBwcmVmaXggKyBwYXJhbXNbc3Rhcl07CiAgfSk7Cn0KLyoqCiAqIFBlcmZvcm1zIHBhdHRlcm4gbWF0Y2hpbmcgb24gYSBVUkwgcGF0aG5hbWUgYW5kIHJldHVybnMgaW5mb3JtYXRpb24gYWJvdXQKICogdGhlIG1hdGNoLgogKgogKiBAc2VlIGh0dHBzOi8vcmVhY3Ryb3V0ZXIuY29tL2RvY3MvZW4vdjYvdXRpbHMvbWF0Y2gtcGF0aAogKi8KCmZ1bmN0aW9uIHJvdXRlcl9tYXRjaFBhdGgocGF0dGVybiwgcGF0aG5hbWUpIHsKICBpZiAodHlwZW9mIHBhdHRlcm4gPT09ICJzdHJpbmciKSB7CiAgICBwYXR0ZXJuID0gewogICAgICBwYXRoOiBwYXR0ZXJuLAogICAgICBjYXNlU2Vuc2l0aXZlOiBmYWxzZSwKICAgICAgZW5kOiB0cnVlCiAgICB9OwogIH0KCiAgbGV0IFttYXRjaGVyLCBwYXJhbU5hbWVzXSA9IGNvbXBpbGVQYXRoKHBhdHRlcm4ucGF0aCwgcGF0dGVybi5jYXNlU2Vuc2l0aXZlLCBwYXR0ZXJuLmVuZCk7CiAgbGV0IG1hdGNoID0gcGF0aG5hbWUubWF0Y2gobWF0Y2hlcik7CiAgaWYgKCFtYXRjaCkgcmV0dXJuIG51bGw7CiAgbGV0IG1hdGNoZWRQYXRobmFtZSA9IG1hdGNoWzBdOwogIGxldCBwYXRobmFtZUJhc2UgPSBtYXRjaGVkUGF0aG5hbWUucmVwbGFjZSgvKC4pXC8rJC8sICIkMSIpOwogIGxldCBjYXB0dXJlR3JvdXBzID0gbWF0Y2guc2xpY2UoMSk7CiAgbGV0IHBhcmFtcyA9IHBhcmFtTmFtZXMucmVkdWNlKChtZW1vLCBwYXJhbU5hbWUsIGluZGV4KSA9PiB7CiAgICAvLyBXZSBuZWVkIHRvIGNvbXB1dGUgdGhlIHBhdGhuYW1lQmFzZSBoZXJlIHVzaW5nIHRoZSByYXcgc3BsYXQgdmFsdWUKICAgIC8vIGluc3RlYWQgb2YgdXNpbmcgcGFyYW1zWyIqIl0gbGF0ZXIgYmVjYXVzZSBpdCB3aWxsIGJlIGRlY29kZWQgdGhlbgogICAgaWYgKHBhcmFtTmFtZSA9PT0gIioiKSB7CiAgICAgIGxldCBzcGxhdFZhbHVlID0gY2FwdHVyZUdyb3Vwc1tpbmRleF0gfHwgIiI7CiAgICAgIHBhdGhuYW1lQmFzZSA9IG1hdGNoZWRQYXRobmFtZS5zbGljZSgwLCBtYXRjaGVkUGF0aG5hbWUubGVuZ3RoIC0gc3BsYXRWYWx1ZS5sZW5ndGgpLnJlcGxhY2UoLyguKVwvKyQvLCAiJDEiKTsKICAgIH0KCiAgICBtZW1vW3BhcmFtTmFtZV0gPSBzYWZlbHlEZWNvZGVVUklDb21wb25lbnQoY2FwdHVyZUdyb3Vwc1tpbmRleF0gfHwgIiIsIHBhcmFtTmFtZSk7CiAgICByZXR1cm4gbWVtbzsKICB9LCB7fSk7CiAgcmV0dXJuIHsKICAgIHBhcmFtcywKICAgIHBhdGhuYW1lOiBtYXRjaGVkUGF0aG5hbWUsCiAgICBwYXRobmFtZUJhc2UsCiAgICBwYXR0ZXJuCiAgfTsKfQoKZnVuY3Rpb24gY29tcGlsZVBhdGgocGF0aCwgY2FzZVNlbnNpdGl2ZSwgZW5kKSB7CiAgaWYgKGNhc2VTZW5zaXRpdmUgPT09IHZvaWQgMCkgewogICAgY2FzZVNlbnNpdGl2ZSA9IGZhbHNlOwogIH0KCiAgaWYgKGVuZCA9PT0gdm9pZCAwKSB7CiAgICBlbmQgPSB0cnVlOwogIH0KCiAgd2FybmluZyhwYXRoID09PSAiKiIgfHwgIXBhdGguZW5kc1dpdGgoIioiKSB8fCBwYXRoLmVuZHNXaXRoKCIvKiIpLCAiUm91dGUgcGF0aCBcIiIgKyBwYXRoICsgIlwiIHdpbGwgYmUgdHJlYXRlZCBhcyBpZiBpdCB3ZXJlICIgKyAoIlwiIiArIHBhdGgucmVwbGFjZSgvXCokLywgIi8qIikgKyAiXCIgYmVjYXVzZSB0aGUgYCpgIGNoYXJhY3RlciBtdXN0ICIpICsgImFsd2F5cyBmb2xsb3cgYSBgL2AgaW4gdGhlIHBhdHRlcm4uIFRvIGdldCByaWQgb2YgdGhpcyB3YXJuaW5nLCAiICsgKCJwbGVhc2UgY2hhbmdlIHRoZSByb3V0ZSBwYXRoIHRvIFwiIiArIHBhdGgucmVwbGFjZSgvXCokLywgIi8qIikgKyAiXCIuIikpOwogIGxldCBwYXJhbU5hbWVzID0gW107CiAgbGV0IHJlZ2V4cFNvdXJjZSA9ICJeIiArIHBhdGgucmVwbGFjZSgvXC8qXCo/JC8sICIiKSAvLyBJZ25vcmUgdHJhaWxpbmcgLyBhbmQgLyosIHdlJ2xsIGhhbmRsZSBpdCBiZWxvdwogIC5yZXBsYWNlKC9eXC8qLywgIi8iKSAvLyBNYWtlIHN1cmUgaXQgaGFzIGEgbGVhZGluZyAvCiAgLnJlcGxhY2UoL1tcXC4qK14kP3t9fCgpW1xdXS9nLCAiXFwkJiIpIC8vIEVzY2FwZSBzcGVjaWFsIHJlZ2V4IGNoYXJzCiAgLnJlcGxhY2UoLzooXHcrKS9nLCAoXywgcGFyYW1OYW1lKSA9PiB7CiAgICBwYXJhbU5hbWVzLnB1c2gocGFyYW1OYW1lKTsKICAgIHJldHVybiAiKFteXFwvXSspIjsKICB9KTsKCiAgaWYgKHBhdGguZW5kc1dpdGgoIioiKSkgewogICAgcGFyYW1OYW1lcy5wdXNoKCIqIik7CiAgICByZWdleHBTb3VyY2UgKz0gcGF0aCA9PT0gIioiIHx8IHBhdGggPT09ICIvKiIgPyAiKC4qKSQiIC8vIEFscmVhZHkgbWF0Y2hlZCB0aGUgaW5pdGlhbCAvLCBqdXN0IG1hdGNoIHRoZSByZXN0CiAgICA6ICIoPzpcXC8oLispfFxcLyopJCI7IC8vIERvbid0IGluY2x1ZGUgdGhlIC8gaW4gcGFyYW1zWyIqIl0KICB9IGVsc2UgaWYgKGVuZCkgewogICAgLy8gV2hlbiBtYXRjaGluZyB0byB0aGUgZW5kLCBpZ25vcmUgdHJhaWxpbmcgc2xhc2hlcwogICAgcmVnZXhwU291cmNlICs9ICJcXC8qJCI7CiAgfSBlbHNlIGlmIChwYXRoICE9PSAiIiAmJiBwYXRoICE9PSAiLyIpIHsKICAgIC8vIElmIG91ciBwYXRoIGlzIG5vbi1lbXB0eSBhbmQgY29udGFpbnMgYW55dGhpbmcgYmV5b25kIGFuIGluaXRpYWwgc2xhc2gsCiAgICAvLyB0aGVuIHdlIGhhdmUgX3NvbWVfIGZvcm0gb2YgcGF0aCBpbiBvdXIgcmVnZXggc28gd2Ugc2hvdWxkIGV4cGVjdCB0bwogICAgLy8gbWF0Y2ggb25seSBpZiB3ZSBmaW5kIHRoZSBlbmQgb2YgdGhpcyBwYXRoIHNlZ21lbnQuICBMb29rIGZvciBhbiBvcHRpb25hbAogICAgLy8gbm9uLWNhcHR1cmVkIHRyYWlsaW5nIHNsYXNoICh0byBtYXRjaCBhIHBvcnRpb24gb2YgdGhlIFVSTCkgb3IgdGhlIGVuZAogICAgLy8gb2YgdGhlIHBhdGggKGlmIHdlJ3ZlIG1hdGNoZWQgdG8gdGhlIGVuZCkuICBXZSB1c2VkIHRvIGRvIHRoaXMgd2l0aCBhCiAgICAvLyB3b3JkIGJvdW5kYXJ5IGJ1dCB0aGF0IGdpdmVzIGZhbHNlIHBvc2l0aXZlcyBvbiByb3V0ZXMgbGlrZQogICAgLy8gL3VzZXItcHJlZmVyZW5jZXMgc2luY2UgYC1gIGNvdW50cyBhcyBhIHdvcmQgYm91bmRhcnkuCiAgICByZWdleHBTb3VyY2UgKz0gIig/Oig/PVxcL3wkKSkiOwogIH0gZWxzZSA7CgogIGxldCBtYXRjaGVyID0gbmV3IFJlZ0V4cChyZWdleHBTb3VyY2UsIGNhc2VTZW5zaXRpdmUgPyB1bmRlZmluZWQgOiAiaSIpOwogIHJldHVybiBbbWF0Y2hlciwgcGFyYW1OYW1lc107Cn0KCmZ1bmN0aW9uIHNhZmVseURlY29kZVVSSSh2YWx1ZSkgewogIHRyeSB7CiAgICByZXR1cm4gZGVjb2RlVVJJKHZhbHVlKTsKICB9IGNhdGNoIChlcnJvcikgewogICAgd2FybmluZyhmYWxzZSwgIlRoZSBVUkwgcGF0aCBcIiIgKyB2YWx1ZSArICJcIiBjb3VsZCBub3QgYmUgZGVjb2RlZCBiZWNhdXNlIGl0IGlzIGlzIGEgIiArICJtYWxmb3JtZWQgVVJMIHNlZ21lbnQuIFRoaXMgaXMgcHJvYmFibHkgZHVlIHRvIGEgYmFkIHBlcmNlbnQgIiArICgiZW5jb2RpbmcgKCIgKyBlcnJvciArICIpLiIpKTsKICAgIHJldHVybiB2YWx1ZTsKICB9Cn0KCmZ1bmN0aW9uIHNhZmVseURlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSwgcGFyYW1OYW1lKSB7CiAgdHJ5IHsKICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQodmFsdWUpOwogIH0gY2F0Y2ggKGVycm9yKSB7CiAgICB3YXJuaW5nKGZhbHNlLCAiVGhlIHZhbHVlIGZvciB0aGUgVVJMIHBhcmFtIFwiIiArIHBhcmFtTmFtZSArICJcIiB3aWxsIG5vdCBiZSBkZWNvZGVkIGJlY2F1c2UiICsgKCIgdGhlIHN0cmluZyBcIiIgKyB2YWx1ZSArICJcIiBpcyBhIG1hbGZvcm1lZCBVUkwgc2VnbWVudC4gVGhpcyBpcyBwcm9iYWJseSIpICsgKCIgZHVlIHRvIGEgYmFkIHBlcmNlbnQgZW5jb2RpbmcgKCIgKyBlcnJvciArICIpLiIpKTsKICAgIHJldHVybiB2YWx1ZTsKICB9Cn0KLyoqCiAqIEBwcml2YXRlCiAqLwoKCmZ1bmN0aW9uIHN0cmlwQmFzZW5hbWUocGF0aG5hbWUsIGJhc2VuYW1lKSB7CiAgaWYgKGJhc2VuYW1lID09PSAiLyIpIHJldHVybiBwYXRobmFtZTsKCiAgaWYgKCFwYXRobmFtZS50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoYmFzZW5hbWUudG9Mb3dlckNhc2UoKSkpIHsKICAgIHJldHVybiBudWxsOwogIH0gLy8gV2Ugd2FudCB0byBsZWF2ZSB0cmFpbGluZyBzbGFzaCBiZWhhdmlvciBpbiB0aGUgdXNlcidzIGNvbnRyb2wsIHNvIGlmIHRoZXkKICAvLyBzcGVjaWZ5IGEgYmFzZW5hbWUgd2l0aCBhIHRyYWlsaW5nIHNsYXNoLCB3ZSBzaG91bGQgc3VwcG9ydCBpdAoKCiAgbGV0IHN0YXJ0SW5kZXggPSBiYXNlbmFtZS5lbmRzV2l0aCgiLyIpID8gYmFzZW5hbWUubGVuZ3RoIC0gMSA6IGJhc2VuYW1lLmxlbmd0aDsKICBsZXQgbmV4dENoYXIgPSBwYXRobmFtZS5jaGFyQXQoc3RhcnRJbmRleCk7CgogIGlmIChuZXh0Q2hhciAmJiBuZXh0Q2hhciAhPT0gIi8iKSB7CiAgICAvLyBwYXRobmFtZSBkb2VzIG5vdCBzdGFydCB3aXRoIGJhc2VuYW1lLwogICAgcmV0dXJuIG51bGw7CiAgfQoKICByZXR1cm4gcGF0aG5hbWUuc2xpY2Uoc3RhcnRJbmRleCkgfHwgIi8iOwp9CmZ1bmN0aW9uIHJvdXRlcl9pbnZhcmlhbnQodmFsdWUsIG1lc3NhZ2UpIHsKICBpZiAodmFsdWUgPT09IGZhbHNlIHx8IHZhbHVlID09PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gInVuZGVmaW5lZCIpIHsKICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTsKICB9Cn0KLyoqCiAqIEBwcml2YXRlCiAqLwoKZnVuY3Rpb24gd2FybmluZyhjb25kLCBtZXNzYWdlKSB7CiAgaWYgKCFjb25kKSB7CiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZQogICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAidW5kZWZpbmVkIikgY29uc29sZS53YXJuKG1lc3NhZ2UpOwoKICAgIHRyeSB7CiAgICAgIC8vIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IFJvdXRlciEKICAgICAgLy8KICAgICAgLy8gVGhpcyBlcnJvciBpcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB5b3UgY2FuIG1vcmUgZWFzaWx5CiAgICAgIC8vIGZpbmQgdGhlIHNvdXJjZSBmb3IgYSB3YXJuaW5nIHRoYXQgYXBwZWFycyBpbiB0aGUgY29uc29sZSBieQogICAgICAvLyBlbmFibGluZyAicGF1c2Ugb24gZXhjZXB0aW9ucyIgaW4geW91ciBKYXZhU2NyaXB0IGRlYnVnZ2VyLgogICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lbXB0eQogICAgfSBjYXRjaCAoZSkge30KICB9Cn0KLyoqCiAqIFJldHVybnMgYSByZXNvbHZlZCBwYXRoIG9iamVjdCByZWxhdGl2ZSB0byB0aGUgZ2l2ZW4gcGF0aG5hbWUuCiAqCiAqIEBzZWUgaHR0cHM6Ly9yZWFjdHJvdXRlci5jb20vZG9jcy9lbi92Ni91dGlscy9yZXNvbHZlLXBhdGgKICovCgpmdW5jdGlvbiByZXNvbHZlUGF0aCh0bywgZnJvbVBhdGhuYW1lKSB7CiAgaWYgKGZyb21QYXRobmFtZSA9PT0gdm9pZCAwKSB7CiAgICBmcm9tUGF0aG5hbWUgPSAiLyI7CiAgfQoKICBsZXQgewogICAgcGF0aG5hbWU6IHRvUGF0aG5hbWUsCiAgICBzZWFyY2ggPSAiIiwKICAgIGhhc2ggPSAiIgogIH0gPSB0eXBlb2YgdG8gPT09ICJzdHJpbmciID8gcGFyc2VQYXRoKHRvKSA6IHRvOwogIGxldCBwYXRobmFtZSA9IHRvUGF0aG5hbWUgPyB0b1BhdGhuYW1lLnN0YXJ0c1dpdGgoIi8iKSA/IHRvUGF0aG5hbWUgOiByZXNvbHZlUGF0aG5hbWUodG9QYXRobmFtZSwgZnJvbVBhdGhuYW1lKSA6IGZyb21QYXRobmFtZTsKICByZXR1cm4gewogICAgcGF0aG5hbWUsCiAgICBzZWFyY2g6IG5vcm1hbGl6ZVNlYXJjaChzZWFyY2gpLAogICAgaGFzaDogbm9ybWFsaXplSGFzaChoYXNoKQogIH07Cn0KCmZ1bmN0aW9uIHJlc29sdmVQYXRobmFtZShyZWxhdGl2ZVBhdGgsIGZyb21QYXRobmFtZSkgewogIGxldCBzZWdtZW50cyA9IGZyb21QYXRobmFtZS5yZXBsYWNlKC9cLyskLywgIiIpLnNwbGl0KCIvIik7CiAgbGV0IHJlbGF0aXZlU2VnbWVudHMgPSByZWxhdGl2ZVBhdGguc3BsaXQoIi8iKTsKICByZWxhdGl2ZVNlZ21lbnRzLmZvckVhY2goc2VnbWVudCA9PiB7CiAgICBpZiAoc2VnbWVudCA9PT0gIi4uIikgewogICAgICAvLyBLZWVwIHRoZSByb290ICIiIHNlZ21lbnQgc28gdGhlIHBhdGhuYW1lIHN0YXJ0cyBhdCAvCiAgICAgIGlmIChzZWdtZW50cy5sZW5ndGggPiAxKSBzZWdtZW50cy5wb3AoKTsKICAgIH0gZWxzZSBpZiAoc2VnbWVudCAhPT0gIi4iKSB7CiAgICAgIHNlZ21lbnRzLnB1c2goc2VnbWVudCk7CiAgICB9CiAgfSk7CiAgcmV0dXJuIHNlZ21lbnRzLmxlbmd0aCA+IDEgPyBzZWdtZW50cy5qb2luKCIvIikgOiAiLyI7Cn0KCmZ1bmN0aW9uIGdldEludmFsaWRQYXRoRXJyb3IoY2hhciwgZmllbGQsIGRlc3QsIHBhdGgpIHsKICByZXR1cm4gIkNhbm5vdCBpbmNsdWRlIGEgJyIgKyBjaGFyICsgIicgY2hhcmFjdGVyIGluIGEgbWFudWFsbHkgc3BlY2lmaWVkICIgKyAoImB0by4iICsgZmllbGQgKyAiYCBmaWVsZCBbIiArIEpTT04uc3RyaW5naWZ5KHBhdGgpICsgIl0uICBQbGVhc2Ugc2VwYXJhdGUgaXQgb3V0IHRvIHRoZSAiKSArICgiYHRvLiIgKyBkZXN0ICsgImAgZmllbGQuIEFsdGVybmF0aXZlbHkgeW91IG1heSBwcm92aWRlIHRoZSBmdWxsIHBhdGggYXMgIikgKyAiYSBzdHJpbmcgaW4gPExpbmsgdG89XCIuLi5cIj4gYW5kIHRoZSByb3V0ZXIgd2lsbCBwYXJzZSBpdCBmb3IgeW91LiI7Cn0KLyoqCiAqIEBwcml2YXRlCiAqCiAqIFdoZW4gcHJvY2Vzc2luZyByZWxhdGl2ZSBuYXZpZ2F0aW9uIHdlIHdhbnQgdG8gaWdub3JlIGFuY2VzdG9yIHJvdXRlcyB0aGF0CiAqIGRvIG5vdCBjb250cmlidXRlIHRvIHRoZSBwYXRoLCBzdWNoIHRoYXQgaW5kZXgvcGF0aGxlc3MgbGF5b3V0IHJvdXRlcyBkb24ndAogKiBpbnRlcmZlcmUuCiAqCiAqIEZvciBleGFtcGxlLCB3aGVuIG1vdmluZyBhIHJvdXRlIGVsZW1lbnQgaW50byBhbiBpbmRleCByb3V0ZSBhbmQvb3IgYQogKiBwYXRobGVzcyBsYXlvdXQgcm91dGUsIHJlbGF0aXZlIGxpbmsgYmVoYXZpb3IgY29udGFpbmVkIHdpdGhpbiBzaG91bGQgc3RheQogKiB0aGUgc2FtZS4gIEJvdGggb2YgdGhlIGZvbGxvd2luZyBleGFtcGxlcyBzaG91bGQgbGluayBiYWNrIHRvIHRoZSByb290OgogKgogKiAgIDxSb3V0ZSBwYXRoPSIvIj4KICogICAgIDxSb3V0ZSBwYXRoPSJhY2NvdW50cyIgZWxlbWVudD17PExpbmsgdG89Ii4uIn0+CiAqICAgPC9Sb3V0ZT4KICoKICogICA8Um91dGUgcGF0aD0iLyI+CiAqICAgICA8Um91dGUgcGF0aD0iYWNjb3VudHMiPgogKiAgICAgICA8Um91dGUgZWxlbWVudD17PEFjY291bnRzTGF5b3V0IC8+fT4gICAgICAgLy8gPC0tIERvZXMgbm90IGNvbnRyaWJ1dGUKICogICAgICAgICA8Um91dGUgaW5kZXggZWxlbWVudD17PExpbmsgdG89Ii4uIn0gLz4gIC8vIDwtLSBEb2VzIG5vdCBjb250cmlidXRlCiAqICAgICAgIDwvUm91dGUKICogICAgIDwvUm91dGU+CiAqICAgPC9Sb3V0ZT4KICovCgoKZnVuY3Rpb24gZ2V0UGF0aENvbnRyaWJ1dGluZ01hdGNoZXMobWF0Y2hlcykgewogIHJldHVybiBtYXRjaGVzLmZpbHRlcigobWF0Y2gsIGluZGV4KSA9PiBpbmRleCA9PT0gMCB8fCBtYXRjaC5yb3V0ZS5wYXRoICYmIG1hdGNoLnJvdXRlLnBhdGgubGVuZ3RoID4gMCk7Cn0KLyoqCiAqIEBwcml2YXRlCiAqLwoKZnVuY3Rpb24gcmVzb2x2ZVRvKHRvQXJnLCByb3V0ZVBhdGhuYW1lcywgbG9jYXRpb25QYXRobmFtZSwgaXNQYXRoUmVsYXRpdmUpIHsKICBpZiAoaXNQYXRoUmVsYXRpdmUgPT09IHZvaWQgMCkgewogICAgaXNQYXRoUmVsYXRpdmUgPSBmYWxzZTsKICB9CgogIGxldCB0bzsKCiAgaWYgKHR5cGVvZiB0b0FyZyA9PT0gInN0cmluZyIpIHsKICAgIHRvID0gcGFyc2VQYXRoKHRvQXJnKTsKICB9IGVsc2UgewogICAgdG8gPSBfZXh0ZW5kcyh7fSwgdG9BcmcpOwogICAgcm91dGVyX2ludmFyaWFudCghdG8ucGF0aG5hbWUgfHwgIXRvLnBhdGhuYW1lLmluY2x1ZGVzKCI/IiksIGdldEludmFsaWRQYXRoRXJyb3IoIj8iLCAicGF0aG5hbWUiLCAic2VhcmNoIiwgdG8pKTsKICAgIHJvdXRlcl9pbnZhcmlhbnQoIXRvLnBhdGhuYW1lIHx8ICF0by5wYXRobmFtZS5pbmNsdWRlcygiIyIpLCBnZXRJbnZhbGlkUGF0aEVycm9yKCIjIiwgInBhdGhuYW1lIiwgImhhc2giLCB0bykpOwogICAgcm91dGVyX2ludmFyaWFudCghdG8uc2VhcmNoIHx8ICF0by5zZWFyY2guaW5jbHVkZXMoIiMiKSwgZ2V0SW52YWxpZFBhdGhFcnJvcigiIyIsICJzZWFyY2giLCAiaGFzaCIsIHRvKSk7CiAgfQoKICBsZXQgaXNFbXB0eVBhdGggPSB0b0FyZyA9PT0gIiIgfHwgdG8ucGF0aG5hbWUgPT09ICIiOwogIGxldCB0b1BhdGhuYW1lID0gaXNFbXB0eVBhdGggPyAiLyIgOiB0by5wYXRobmFtZTsKICBsZXQgZnJvbTsgLy8gUm91dGluZyBpcyByZWxhdGl2ZSB0byB0aGUgY3VycmVudCBwYXRobmFtZSBpZiBleHBsaWNpdGx5IHJlcXVlc3RlZC4KICAvLwogIC8vIElmIGEgcGF0aG5hbWUgaXMgZXhwbGljaXRseSBwcm92aWRlZCBpbiBgdG9gLCBpdCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlCiAgLy8gcm91dGUgY29udGV4dC4gVGhpcyBpcyBleHBsYWluZWQgaW4gYE5vdGUgb24gYDxMaW5rIHRvPmAgdmFsdWVzYCBpbiBvdXIKICAvLyBtaWdyYXRpb24gZ3VpZGUgZnJvbSB2NSBhcyBhIG1lYW5zIG9mIGRpc2FtYmlndWF0aW9uIGJldHdlZW4gYHRvYCB2YWx1ZXMKICAvLyB0aGF0IGJlZ2luIHdpdGggYC9gIGFuZCB0aG9zZSB0aGF0IGRvIG5vdC4gSG93ZXZlciwgdGhpcyBpcyBwcm9ibGVtYXRpYyBmb3IKICAvLyBgdG9gIHZhbHVlcyB0aGF0IGRvIG5vdCBwcm92aWRlIGEgcGF0aG5hbWUuIGB0b2AgY2FuIHNpbXBseSBiZSBhIHNlYXJjaCBvcgogIC8vIGhhc2ggc3RyaW5nLCBpbiB3aGljaCBjYXNlIHdlIHNob3VsZCBhc3N1bWUgdGhhdCB0aGUgbmF2aWdhdGlvbiBpcyByZWxhdGl2ZQogIC8vIHRvIHRoZSBjdXJyZW50IGxvY2F0aW9uJ3MgcGF0aG5hbWUgYW5kICpub3QqIHRoZSByb3V0ZSBwYXRobmFtZS4KCiAgaWYgKGlzUGF0aFJlbGF0aXZlIHx8IHRvUGF0aG5hbWUgPT0gbnVsbCkgewogICAgZnJvbSA9IGxvY2F0aW9uUGF0aG5hbWU7CiAgfSBlbHNlIHsKICAgIGxldCByb3V0ZVBhdGhuYW1lSW5kZXggPSByb3V0ZVBhdGhuYW1lcy5sZW5ndGggLSAxOwoKICAgIGlmICh0b1BhdGhuYW1lLnN0YXJ0c1dpdGgoIi4uIikpIHsKICAgICAgbGV0IHRvU2VnbWVudHMgPSB0b1BhdGhuYW1lLnNwbGl0KCIvIik7IC8vIEVhY2ggbGVhZGluZyAuLiBzZWdtZW50IG1lYW5zICJnbyB1cCBvbmUgcm91dGUiIGluc3RlYWQgb2YgImdvIHVwIG9uZQogICAgICAvLyBVUkwgc2VnbWVudCIuICBUaGlzIGlzIGEga2V5IGRpZmZlcmVuY2UgZnJvbSBob3cgPGEgaHJlZj4gd29ya3MgYW5kIGEKICAgICAgLy8gbWFqb3IgcmVhc29uIHdlIGNhbGwgdGhpcyBhICJ0byIgdmFsdWUgaW5zdGVhZCBvZiBhICJocmVmIi4KCiAgICAgIHdoaWxlICh0b1NlZ21lbnRzWzBdID09PSAiLi4iKSB7CiAgICAgICAgdG9TZWdtZW50cy5zaGlmdCgpOwogICAgICAgIHJvdXRlUGF0aG5hbWVJbmRleCAtPSAxOwogICAgICB9CgogICAgICB0by5wYXRobmFtZSA9IHRvU2VnbWVudHMuam9pbigiLyIpOwogICAgfSAvLyBJZiB0aGVyZSBhcmUgbW9yZSAiLi4iIHNlZ21lbnRzIHRoYW4gcGFyZW50IHJvdXRlcywgcmVzb2x2ZSByZWxhdGl2ZSB0bwogICAgLy8gdGhlIHJvb3QgLyBVUkwuCgoKICAgIGZyb20gPSByb3V0ZVBhdGhuYW1lSW5kZXggPj0gMCA/IHJvdXRlUGF0aG5hbWVzW3JvdXRlUGF0aG5hbWVJbmRleF0gOiAiLyI7CiAgfQoKICBsZXQgcGF0aCA9IHJlc29sdmVQYXRoKHRvLCBmcm9tKTsgLy8gRW5zdXJlIHRoZSBwYXRobmFtZSBoYXMgYSB0cmFpbGluZyBzbGFzaCBpZiB0aGUgb3JpZ2luYWwgInRvIiBoYWQgb25lCgogIGxldCBoYXNFeHBsaWNpdFRyYWlsaW5nU2xhc2ggPSB0b1BhdGhuYW1lICYmIHRvUGF0aG5hbWUgIT09ICIvIiAmJiB0b1BhdGhuYW1lLmVuZHNXaXRoKCIvIik7IC8vIE9yIGlmIHRoaXMgd2FzIGEgbGluayB0byB0aGUgY3VycmVudCBwYXRoIHdoaWNoIGhhcyBhIHRyYWlsaW5nIHNsYXNoCgogIGxldCBoYXNDdXJyZW50VHJhaWxpbmdTbGFzaCA9IChpc0VtcHR5UGF0aCB8fCB0b1BhdGhuYW1lID09PSAiLiIpICYmIGxvY2F0aW9uUGF0aG5hbWUuZW5kc1dpdGgoIi8iKTsKCiAgaWYgKCFwYXRoLnBhdGhuYW1lLmVuZHNXaXRoKCIvIikgJiYgKGhhc0V4cGxpY2l0VHJhaWxpbmdTbGFzaCB8fCBoYXNDdXJyZW50VHJhaWxpbmdTbGFzaCkpIHsKICAgIHBhdGgucGF0aG5hbWUgKz0gIi8iOwogIH0KCiAgcmV0dXJuIHBhdGg7Cn0KLyoqCiAqIEBwcml2YXRlCiAqLwoKZnVuY3Rpb24gZ2V0VG9QYXRobmFtZSh0bykgewogIC8vIEVtcHR5IHN0cmluZ3Mgc2hvdWxkIGJlIHRyZWF0ZWQgdGhlIHNhbWUgYXMgLyBwYXRocwogIHJldHVybiB0byA9PT0gIiIgfHwgdG8ucGF0aG5hbWUgPT09ICIiID8gIi8iIDogdHlwZW9mIHRvID09PSAic3RyaW5nIiA/IHBhcnNlUGF0aCh0bykucGF0aG5hbWUgOiB0by5wYXRobmFtZTsKfQovKioKICogQHByaXZhdGUKICovCgpjb25zdCByb3V0ZXJfam9pblBhdGhzID0gcGF0aHMgPT4gcGF0aHMuam9pbigiLyIpLnJlcGxhY2UoL1wvXC8rL2csICIvIik7Ci8qKgogKiBAcHJpdmF0ZQogKi8KCmNvbnN0IG5vcm1hbGl6ZVBhdGhuYW1lID0gcGF0aG5hbWUgPT4gcGF0aG5hbWUucmVwbGFjZSgvXC8rJC8sICIiKS5yZXBsYWNlKC9eXC8qLywgIi8iKTsKLyoqCiAqIEBwcml2YXRlCiAqLwoKY29uc3Qgbm9ybWFsaXplU2VhcmNoID0gc2VhcmNoID0+ICFzZWFyY2ggfHwgc2VhcmNoID09PSAiPyIgPyAiIiA6IHNlYXJjaC5zdGFydHNXaXRoKCI/IikgPyBzZWFyY2ggOiAiPyIgKyBzZWFyY2g7Ci8qKgogKiBAcHJpdmF0ZQogKi8KCmNvbnN0IG5vcm1hbGl6ZUhhc2ggPSBoYXNoID0+ICFoYXNoIHx8IGhhc2ggPT09ICIjIiA/ICIiIDogaGFzaC5zdGFydHNXaXRoKCIjIikgPyBoYXNoIDogIiMiICsgaGFzaDsKLyoqCiAqIFRoaXMgaXMgYSBzaG9ydGN1dCBmb3IgY3JlYXRpbmcgYGFwcGxpY2F0aW9uL2pzb25gIHJlc3BvbnNlcy4gQ29udmVydHMgYGRhdGFgCiAqIHRvIEpTT04gYW5kIHNldHMgdGhlIGBDb250ZW50LVR5cGVgIGhlYWRlci4KICovCgpjb25zdCBqc29uID0gZnVuY3Rpb24ganNvbihkYXRhLCBpbml0KSB7CiAgaWYgKGluaXQgPT09IHZvaWQgMCkgewogICAgaW5pdCA9IHt9OwogIH0KCiAgbGV0IHJlc3BvbnNlSW5pdCA9IHR5cGVvZiBpbml0ID09PSAibnVtYmVyIiA/IHsKICAgIHN0YXR1czogaW5pdAogIH0gOiBpbml0OwogIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMocmVzcG9uc2VJbml0LmhlYWRlcnMpOwoKICBpZiAoIWhlYWRlcnMuaGFzKCJDb250ZW50LVR5cGUiKSkgewogICAgaGVhZGVycy5zZXQoIkNvbnRlbnQtVHlwZSIsICJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Iik7CiAgfQoKICByZXR1cm4gbmV3IFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KGRhdGEpLCBfZXh0ZW5kcyh7fSwgcmVzcG9uc2VJbml0LCB7CiAgICBoZWFkZXJzCiAgfSkpOwp9OwpjbGFzcyByb3V0ZXJfQWJvcnRlZERlZmVycmVkRXJyb3IgZXh0ZW5kcyBFcnJvciB7fQpjbGFzcyBEZWZlcnJlZERhdGEgewogIGNvbnN0cnVjdG9yKGRhdGEpIHsKICAgIHRoaXMucGVuZGluZ0tleXMgPSBuZXcgU2V0KCk7CiAgICB0aGlzLnN1YnNjcmliZXIgPSB1bmRlZmluZWQ7CiAgICByb3V0ZXJfaW52YXJpYW50KGRhdGEgJiYgdHlwZW9mIGRhdGEgPT09ICJvYmplY3QiICYmICFBcnJheS5pc0FycmF5KGRhdGEpLCAiZGVmZXIoKSBvbmx5IGFjY2VwdHMgcGxhaW4gb2JqZWN0cyIpOyAvLyBTZXQgdXAgYW4gQWJvcnRDb250cm9sbGVyICsgUHJvbWlzZSB3ZSBjYW4gcmFjZSBhZ2FpbnN0IHRvIGV4aXQgZWFybHkKICAgIC8vIGNhbmNlbGxhdGlvbgoKICAgIGxldCByZWplY3Q7CiAgICB0aGlzLmFib3J0UHJvbWlzZSA9IG5ldyBQcm9taXNlKChfLCByKSA9PiByZWplY3QgPSByKTsKICAgIHRoaXMuY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTsKCiAgICBsZXQgb25BYm9ydCA9ICgpID0+IHJlamVjdChuZXcgcm91dGVyX0Fib3J0ZWREZWZlcnJlZEVycm9yKCJEZWZlcnJlZCBkYXRhIGFib3J0ZWQiKSk7CgogICAgdGhpcy51bmxpc3RlbkFib3J0U2lnbmFsID0gKCkgPT4gdGhpcy5jb250cm9sbGVyLnNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCJhYm9ydCIsIG9uQWJvcnQpOwoKICAgIHRoaXMuY29udHJvbGxlci5zaWduYWwuYWRkRXZlbnRMaXN0ZW5lcigiYWJvcnQiLCBvbkFib3J0KTsKICAgIHRoaXMuZGF0YSA9IE9iamVjdC5lbnRyaWVzKGRhdGEpLnJlZHVjZSgoYWNjLCBfcmVmKSA9PiB7CiAgICAgIGxldCBba2V5LCB2YWx1ZV0gPSBfcmVmOwogICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihhY2MsIHsKICAgICAgICBba2V5XTogdGhpcy50cmFja1Byb21pc2Uoa2V5LCB2YWx1ZSkKICAgICAgfSk7CiAgICB9LCB7fSk7CiAgfQoKICB0cmFja1Byb21pc2Uoa2V5LCB2YWx1ZSkgewogICAgaWYgKCEodmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlKSkgewogICAgICByZXR1cm4gdmFsdWU7CiAgICB9CgogICAgdGhpcy5wZW5kaW5nS2V5cy5hZGQoa2V5KTsgLy8gV2Ugc3RvcmUgYSBsaXR0bGUgd3JhcHBlciBwcm9taXNlIHRoYXQgd2lsbCBiZSBleHRlbmRlZCB3aXRoCiAgICAvLyBfZGF0YS9fZXJyb3IgcHJvcHMgdXBvbiByZXNvbHZlL3JlamVjdAoKICAgIGxldCBwcm9taXNlID0gUHJvbWlzZS5yYWNlKFt2YWx1ZSwgdGhpcy5hYm9ydFByb21pc2VdKS50aGVuKGRhdGEgPT4gdGhpcy5vblNldHRsZShwcm9taXNlLCBrZXksIG51bGwsIGRhdGEpLCBlcnJvciA9PiB0aGlzLm9uU2V0dGxlKHByb21pc2UsIGtleSwgZXJyb3IpKTsgLy8gUmVnaXN0ZXIgcmVqZWN0aW9uIGxpc3RlbmVycyB0byBhdm9pZCB1bmNhdWdodCBwcm9taXNlIHJlamVjdGlvbnMgb24KICAgIC8vIGVycm9ycyBvciBhYm9ydGVkIGRlZmVycmVkIHZhbHVlcwoKICAgIHByb21pc2UuY2F0Y2goKCkgPT4ge30pOwogICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb21pc2UsICJfdHJhY2tlZCIsIHsKICAgICAgZ2V0OiAoKSA9PiB0cnVlCiAgICB9KTsKICAgIHJldHVybiBwcm9taXNlOwogIH0KCiAgb25TZXR0bGUocHJvbWlzZSwga2V5LCBlcnJvciwgZGF0YSkgewogICAgaWYgKHRoaXMuY29udHJvbGxlci5zaWduYWwuYWJvcnRlZCAmJiBlcnJvciBpbnN0YW5jZW9mIHJvdXRlcl9BYm9ydGVkRGVmZXJyZWRFcnJvcikgewogICAgICB0aGlzLnVubGlzdGVuQWJvcnRTaWduYWwoKTsKICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb21pc2UsICJfZXJyb3IiLCB7CiAgICAgICAgZ2V0OiAoKSA9PiBlcnJvcgogICAgICB9KTsKICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTsKICAgIH0KCiAgICB0aGlzLnBlbmRpbmdLZXlzLmRlbGV0ZShrZXkpOwoKICAgIGlmICh0aGlzLmRvbmUpIHsKICAgICAgLy8gTm90aGluZyBsZWZ0IHRvIGFib3J0IQogICAgICB0aGlzLnVubGlzdGVuQWJvcnRTaWduYWwoKTsKICAgIH0KCiAgICBjb25zdCBzdWJzY3JpYmVyID0gdGhpcy5zdWJzY3JpYmVyOwoKICAgIGlmIChlcnJvcikgewogICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvbWlzZSwgIl9lcnJvciIsIHsKICAgICAgICBnZXQ6ICgpID0+IGVycm9yCiAgICAgIH0pOwogICAgICBzdWJzY3JpYmVyICYmIHN1YnNjcmliZXIoZmFsc2UpOwogICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpOwogICAgfQoKICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm9taXNlLCAiX2RhdGEiLCB7CiAgICAgIGdldDogKCkgPT4gZGF0YQogICAgfSk7CiAgICBzdWJzY3JpYmVyICYmIHN1YnNjcmliZXIoZmFsc2UpOwogICAgcmV0dXJuIGRhdGE7CiAgfQoKICBzdWJzY3JpYmUoZm4pIHsKICAgIHRoaXMuc3Vic2NyaWJlciA9IGZuOwogIH0KCiAgY2FuY2VsKCkgewogICAgdGhpcy5jb250cm9sbGVyLmFib3J0KCk7CiAgICB0aGlzLnBlbmRpbmdLZXlzLmZvckVhY2goKHYsIGspID0+IHRoaXMucGVuZGluZ0tleXMuZGVsZXRlKGspKTsKICAgIGxldCBzdWJzY3JpYmVyID0gdGhpcy5zdWJzY3JpYmVyOwogICAgc3Vic2NyaWJlciAmJiBzdWJzY3JpYmVyKHRydWUpOwogIH0KCiAgYXN5bmMgcmVzb2x2ZURhdGEoc2lnbmFsKSB7CiAgICBsZXQgYWJvcnRlZCA9IGZhbHNlOwoKICAgIGlmICghdGhpcy5kb25lKSB7CiAgICAgIGxldCBvbkFib3J0ID0gKCkgPT4gdGhpcy5jYW5jZWwoKTsKCiAgICAgIHNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCJhYm9ydCIsIG9uQWJvcnQpOwogICAgICBhYm9ydGVkID0gYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7CiAgICAgICAgdGhpcy5zdWJzY3JpYmUoYWJvcnRlZCA9PiB7CiAgICAgICAgICBzaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigiYWJvcnQiLCBvbkFib3J0KTsKCiAgICAgICAgICBpZiAoYWJvcnRlZCB8fCB0aGlzLmRvbmUpIHsKICAgICAgICAgICAgcmVzb2x2ZShhYm9ydGVkKTsKICAgICAgICAgIH0KICAgICAgICB9KTsKICAgICAgfSk7CiAgICB9CgogICAgcmV0dXJuIGFib3J0ZWQ7CiAgfQoKICBnZXQgZG9uZSgpIHsKICAgIHJldHVybiB0aGlzLnBlbmRpbmdLZXlzLnNpemUgPT09IDA7CiAgfQoKICBnZXQgdW53cmFwcGVkRGF0YSgpIHsKICAgIHJvdXRlcl9pbnZhcmlhbnQodGhpcy5kYXRhICE9PSBudWxsICYmIHRoaXMuZG9uZSwgIkNhbiBvbmx5IHVud3JhcCBkYXRhIG9uIGluaXRpYWxpemVkIGFuZCBzZXR0bGVkIGRlZmVycmVkcyIpOwogICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHRoaXMuZGF0YSkucmVkdWNlKChhY2MsIF9yZWYyKSA9PiB7CiAgICAgIGxldCBba2V5LCB2YWx1ZV0gPSBfcmVmMjsKICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oYWNjLCB7CiAgICAgICAgW2tleV06IHVud3JhcFRyYWNrZWRQcm9taXNlKHZhbHVlKQogICAgICB9KTsKICAgIH0sIHt9KTsKICB9Cgp9CgpmdW5jdGlvbiBpc1RyYWNrZWRQcm9taXNlKHZhbHVlKSB7CiAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSAmJiB2YWx1ZS5fdHJhY2tlZCA9PT0gdHJ1ZTsKfQoKZnVuY3Rpb24gdW53cmFwVHJhY2tlZFByb21pc2UodmFsdWUpIHsKICBpZiAoIWlzVHJhY2tlZFByb21pc2UodmFsdWUpKSB7CiAgICByZXR1cm4gdmFsdWU7CiAgfQoKICBpZiAodmFsdWUuX2Vycm9yKSB7CiAgICB0aHJvdyB2YWx1ZS5fZXJyb3I7CiAgfQoKICByZXR1cm4gdmFsdWUuX2RhdGE7Cn0KCmZ1bmN0aW9uIGRlZmVyKGRhdGEpIHsKICByZXR1cm4gbmV3IERlZmVycmVkRGF0YShkYXRhKTsKfQovKioKICogQSByZWRpcmVjdCByZXNwb25zZS4gU2V0cyB0aGUgc3RhdHVzIGNvZGUgYW5kIHRoZSBgTG9jYXRpb25gIGhlYWRlci4KICogRGVmYXVsdHMgdG8gIjMwMiBGb3VuZCIuCiAqLwoKY29uc3QgcmVkaXJlY3QgPSBmdW5jdGlvbiByZWRpcmVjdCh1cmwsIGluaXQpIHsKICBpZiAoaW5pdCA9PT0gdm9pZCAwKSB7CiAgICBpbml0ID0gMzAyOwogIH0KCiAgbGV0IHJlc3BvbnNlSW5pdCA9IGluaXQ7CgogIGlmICh0eXBlb2YgcmVzcG9uc2VJbml0ID09PSAibnVtYmVyIikgewogICAgcmVzcG9uc2VJbml0ID0gewogICAgICBzdGF0dXM6IHJlc3BvbnNlSW5pdAogICAgfTsKICB9IGVsc2UgaWYgKHR5cGVvZiByZXNwb25zZUluaXQuc3RhdHVzID09PSAidW5kZWZpbmVkIikgewogICAgcmVzcG9uc2VJbml0LnN0YXR1cyA9IDMwMjsKICB9CgogIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMocmVzcG9uc2VJbml0LmhlYWRlcnMpOwogIGhlYWRlcnMuc2V0KCJMb2NhdGlvbiIsIHVybCk7CiAgcmV0dXJuIG5ldyBSZXNwb25zZShudWxsLCBfZXh0ZW5kcyh7fSwgcmVzcG9uc2VJbml0LCB7CiAgICBoZWFkZXJzCiAgfSkpOwp9OwovKioKICogQHByaXZhdGUKICogVXRpbGl0eSBjbGFzcyB3ZSB1c2UgdG8gaG9sZCBhdXRvLXVud3JhcHBlZCA0eHgvNXh4IFJlc3BvbnNlIGJvZGllcwogKi8KCmNsYXNzIEVycm9yUmVzcG9uc2UgewogIGNvbnN0cnVjdG9yKHN0YXR1cywgc3RhdHVzVGV4dCwgZGF0YSkgewogICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7CiAgICB0aGlzLnN0YXR1c1RleHQgPSBzdGF0dXNUZXh0IHx8ICIiOwogICAgdGhpcy5kYXRhID0gZGF0YTsKICB9Cgp9Ci8qKgogKiBDaGVjayBpZiB0aGUgZ2l2ZW4gZXJyb3IgaXMgYW4gRXJyb3JSZXNwb25zZSBnZW5lcmF0ZWQgZnJvbSBhIDR4eC81eHgKICogUmVzcG9uc2UgdGhyb3cgZnJvbSBhbiBhY3Rpb24vbG9hZGVyCiAqLwoKZnVuY3Rpb24gaXNSb3V0ZUVycm9yUmVzcG9uc2UoZSkgewogIHJldHVybiBlIGluc3RhbmNlb2YgRXJyb3JSZXNwb25zZTsKfQoKY29uc3QgSURMRV9OQVZJR0FUSU9OID0gewogIHN0YXRlOiAiaWRsZSIsCiAgbG9jYXRpb246IHVuZGVmaW5lZCwKICBmb3JtTWV0aG9kOiB1bmRlZmluZWQsCiAgZm9ybUFjdGlvbjogdW5kZWZpbmVkLAogIGZvcm1FbmNUeXBlOiB1bmRlZmluZWQsCiAgZm9ybURhdGE6IHVuZGVmaW5lZAp9Owpjb25zdCBJRExFX0ZFVENIRVIgPSB7CiAgc3RhdGU6ICJpZGxlIiwKICBkYXRhOiB1bmRlZmluZWQsCiAgZm9ybU1ldGhvZDogdW5kZWZpbmVkLAogIGZvcm1BY3Rpb246IHVuZGVmaW5lZCwKICBmb3JtRW5jVHlwZTogdW5kZWZpbmVkLAogIGZvcm1EYXRhOiB1bmRlZmluZWQKfTsKY29uc3QgaXNCcm93c2VyID0gdHlwZW9mIHdpbmRvdyAhPT0gInVuZGVmaW5lZCIgJiYgdHlwZW9mIHdpbmRvdy5kb2N1bWVudCAhPT0gInVuZGVmaW5lZCIgJiYgdHlwZW9mIHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50ICE9PSAidW5kZWZpbmVkIjsKY29uc3QgaXNTZXJ2ZXIgPSAhaXNCcm93c2VyOyAvLyNlbmRyZWdpb24KLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8KLy8jcmVnaW9uIGNyZWF0ZVJvdXRlcgovLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLwoKLyoqCiAqIENyZWF0ZSBhIHJvdXRlciBhbmQgbGlzdGVuIHRvIGhpc3RvcnkgUE9QIG5hdmlnYXRpb25zCiAqLwoKZnVuY3Rpb24gcm91dGVyX2NyZWF0ZVJvdXRlcihpbml0KSB7CiAgcm91dGVyX2ludmFyaWFudChpbml0LnJvdXRlcy5sZW5ndGggPiAwLCAiWW91IG11c3QgcHJvdmlkZSBhIG5vbi1lbXB0eSByb3V0ZXMgYXJyYXkgdG8gY3JlYXRlUm91dGVyIik7CiAgbGV0IGRhdGFSb3V0ZXMgPSBjb252ZXJ0Um91dGVzVG9EYXRhUm91dGVzKGluaXQucm91dGVzKTsgLy8gQ2xlYW51cCBmdW5jdGlvbiBmb3IgaGlzdG9yeQoKICBsZXQgdW5saXN0ZW5IaXN0b3J5ID0gbnVsbDsgLy8gRXh0ZXJuYWxseS1wcm92aWRlZCBmdW5jdGlvbnMgdG8gY2FsbCBvbiBhbGwgc3RhdGUgY2hhbmdlcwoKICBsZXQgc3Vic2NyaWJlcnMgPSBuZXcgU2V0KCk7IC8vIEV4dGVybmFsbHktcHJvdmlkZWQgb2JqZWN0IHRvIGhvbGQgc2Nyb2xsIHJlc3RvcmF0aW9uIGxvY2F0aW9ucyBkdXJpbmcgcm91dGluZwoKICBsZXQgc2F2ZWRTY3JvbGxQb3NpdGlvbnMgPSBudWxsOyAvLyBFeHRlcm5hbGx5LXByb3ZpZGVkIGZ1bmN0aW9uIHRvIGdldCBzY3JvbGwgcmVzdG9yYXRpb24ga2V5cwoKICBsZXQgZ2V0U2Nyb2xsUmVzdG9yYXRpb25LZXkgPSBudWxsOyAvLyBFeHRlcm5hbGx5LXByb3ZpZGVkIGZ1bmN0aW9uIHRvIGdldCBjdXJyZW50IHNjcm9sbCBwb3NpdGlvbgoKICBsZXQgZ2V0U2Nyb2xsUG9zaXRpb24gPSBudWxsOyAvLyBPbmUtdGltZSBmbGFnIHRvIGNvbnRyb2wgdGhlIGluaXRpYWwgaHlkcmF0aW9uIHNjcm9sbCByZXN0b3JhdGlvbi4gIEJlY2F1c2UKICAvLyB3ZSBkb24ndCBnZXQgdGhlIHNhdmVkIHBvc2l0aW9ucyBmcm9tIDxTY3JvbGxSZXN0b3JhdGlvbiAvPiB1bnRpbCBfYWZ0ZXJfCiAgLy8gdGhlIGluaXRpYWwgcmVuZGVyLCB3ZSBuZWVkIHRvIG1hbnVhbGx5IHRyaWdnZXIgYSBzZXBhcmF0ZSB1cGRhdGVTdGF0ZSB0bwogIC8vIHNlbmQgYWxvbmcgdGhlIHJlc3RvcmVTY3JvbGxQb3NpdGlvbgoKICBsZXQgaW5pdGlhbFNjcm9sbFJlc3RvcmVkID0gZmFsc2U7CiAgbGV0IGluaXRpYWxNYXRjaGVzID0gbWF0Y2hSb3V0ZXMoZGF0YVJvdXRlcywgaW5pdC5oaXN0b3J5LmxvY2F0aW9uLCBpbml0LmJhc2VuYW1lKTsKICBsZXQgaW5pdGlhbEVycm9ycyA9IG51bGw7CgogIGlmIChpbml0aWFsTWF0Y2hlcyA9PSBudWxsKSB7CiAgICAvLyBJZiB3ZSBkbyBub3QgbWF0Y2ggYSB1c2VyLXByb3ZpZGVkLXJvdXRlLCBmYWxsIGJhY2sgdG8gdGhlIHJvb3QKICAgIC8vIHRvIGFsbG93IHRoZSBlcnJvciBib3VuZGFyeSB0byB0YWtlIG92ZXIKICAgIGxldCB7CiAgICAgIG1hdGNoZXMsCiAgICAgIHJvdXRlLAogICAgICBlcnJvcgogICAgfSA9IGdldE5vdEZvdW5kTWF0Y2hlcyhkYXRhUm91dGVzKTsKICAgIGluaXRpYWxNYXRjaGVzID0gbWF0Y2hlczsKICAgIGluaXRpYWxFcnJvcnMgPSB7CiAgICAgIFtyb3V0ZS5pZF06IGVycm9yCiAgICB9OwogIH0KCiAgbGV0IGluaXRpYWxpemVkID0gIWluaXRpYWxNYXRjaGVzLnNvbWUobSA9PiBtLnJvdXRlLmxvYWRlcikgfHwgaW5pdC5oeWRyYXRpb25EYXRhICE9IG51bGw7CiAgbGV0IHJvdXRlcjsKICBsZXQgc3RhdGUgPSB7CiAgICBoaXN0b3J5QWN0aW9uOiBpbml0Lmhpc3RvcnkuYWN0aW9uLAogICAgbG9jYXRpb246IGluaXQuaGlzdG9yeS5sb2NhdGlvbiwKICAgIG1hdGNoZXM6IGluaXRpYWxNYXRjaGVzLAogICAgaW5pdGlhbGl6ZWQsCiAgICBuYXZpZ2F0aW9uOiBJRExFX05BVklHQVRJT04sCiAgICByZXN0b3JlU2Nyb2xsUG9zaXRpb246IG51bGwsCiAgICBwcmV2ZW50U2Nyb2xsUmVzZXQ6IGZhbHNlLAogICAgcmV2YWxpZGF0aW9uOiAiaWRsZSIsCiAgICBsb2FkZXJEYXRhOiBpbml0Lmh5ZHJhdGlvbkRhdGEgJiYgaW5pdC5oeWRyYXRpb25EYXRhLmxvYWRlckRhdGEgfHwge30sCiAgICBhY3Rpb25EYXRhOiBpbml0Lmh5ZHJhdGlvbkRhdGEgJiYgaW5pdC5oeWRyYXRpb25EYXRhLmFjdGlvbkRhdGEgfHwgbnVsbCwKICAgIGVycm9yczogaW5pdC5oeWRyYXRpb25EYXRhICYmIGluaXQuaHlkcmF0aW9uRGF0YS5lcnJvcnMgfHwgaW5pdGlhbEVycm9ycywKICAgIGZldGNoZXJzOiBuZXcgTWFwKCkKICB9OyAvLyAtLSBTdGF0ZWZ1bCBpbnRlcm5hbCB2YXJpYWJsZXMgdG8gbWFuYWdlIG5hdmlnYXRpb25zIC0tCiAgLy8gQ3VycmVudCBuYXZpZ2F0aW9uIGluIHByb2dyZXNzICh0byBiZSBjb21taXR0ZWQgaW4gY29tcGxldGVOYXZpZ2F0aW9uKQoKICBsZXQgcGVuZGluZ0FjdGlvbiA9IEFjdGlvbi5Qb3A7IC8vIFNob3VsZCB0aGUgY3VycmVudCBuYXZpZ2F0aW9uIHByZXZlbnQgdGhlIHNjcm9sbCByZXNldCBpZiBzY3JvbGwgY2Fubm90CiAgLy8gYmUgcmVzdG9yZWQ/CgogIGxldCBwZW5kaW5nUHJldmVudFNjcm9sbFJlc2V0ID0gZmFsc2U7IC8vIEFib3J0Q29udHJvbGxlciBmb3IgdGhlIGFjdGl2ZSBuYXZpZ2F0aW9uCgogIGxldCBwZW5kaW5nTmF2aWdhdGlvbkNvbnRyb2xsZXI7IC8vIFdlIHVzZSB0aGlzIHRvIGF2b2lkIHRvdWNoaW5nIGhpc3RvcnkgaW4gY29tcGxldGVOYXZpZ2F0aW9uIGlmIGEKICAvLyByZXZhbGlkYXRpb24gaXMgZW50aXJlbHkgdW5pbnRlcnJ1cHRlZAoKICBsZXQgaXNVbmludGVycnVwdGVkUmV2YWxpZGF0aW9uID0gZmFsc2U7IC8vIFVzZSB0aGlzIGludGVybmFsIGZsYWcgdG8gZm9yY2UgcmV2YWxpZGF0aW9uIG9mIGFsbCBsb2FkZXJzOgogIC8vICAtIHN1Ym1pc3Npb25zIChjb21wbGV0ZWQgb3IgaW50ZXJydXB0ZWQpCiAgLy8gIC0gdXNlUmV2YWxpZGF0ZSgpCiAgLy8gIC0gWC1SZW1peC1SZXZhbGlkYXRlIChmcm9tIHJlZGlyZWN0KQoKICBsZXQgaXNSZXZhbGlkYXRpb25SZXF1aXJlZCA9IGZhbHNlOyAvLyBVc2UgdGhpcyBpbnRlcm5hbCBhcnJheSB0byBjYXB0dXJlIHJvdXRlcyB0aGF0IHJlcXVpcmUgcmV2YWxpZGF0aW9uIGR1ZQogIC8vIHRvIGEgY2FuY2VsbGVkIGRlZmVycmVkIG9uIGFjdGlvbiBzdWJtaXNzaW9uCgogIGxldCBjYW5jZWxsZWREZWZlcnJlZFJvdXRlcyA9IFtdOyAvLyBVc2UgdGhpcyBpbnRlcm5hbCBhcnJheSB0byBjYXB0dXJlIGZldGNoZXIgbG9hZHMgdGhhdCB3ZXJlIGNhbmNlbGxlZCBieSBhbgogIC8vIGFjdGlvbiBuYXZpZ2F0aW9uIGFuZCByZXF1aXJlIHJldmFsaWRhdGlvbgoKICBsZXQgY2FuY2VsbGVkRmV0Y2hlckxvYWRzID0gW107IC8vIEFib3J0Q29udHJvbGxlcnMgZm9yIGFueSBpbi1mbGlnaHQgZmV0Y2hlcnMKCiAgbGV0IGZldGNoQ29udHJvbGxlcnMgPSBuZXcgTWFwKCk7IC8vIFRyYWNrIGxvYWRzIGJhc2VkIG9uIHRoZSBvcmRlciBpbiB3aGljaCB0aGV5IHN0YXJ0ZWQKCiAgbGV0IGluY3JlbWVudGluZ0xvYWRJZCA9IDA7IC8vIFRyYWNrIHRoZSBvdXRzdGFuZGluZyBwZW5kaW5nIG5hdmlnYXRpb24gZGF0YSBsb2FkIHRvIGJlIGNvbXBhcmVkIGFnYWluc3QKICAvLyB0aGUgZ2xvYmFsbHkgaW5jcmVtZW50aW5nIGxvYWQgd2hlbiBhIGZldGNoZXIgbG9hZCBsYW5kcyBhZnRlciBhIGNvbXBsZXRlZAogIC8vIG5hdmlnYXRpb24KCiAgbGV0IHBlbmRpbmdOYXZpZ2F0aW9uTG9hZElkID0gLTE7IC8vIEZldGNoZXJzIHRoYXQgdHJpZ2dlcmVkIGRhdGEgcmVsb2FkcyBhcyBhIHJlc3VsdCBvZiB0aGVpciBhY3Rpb25zCgogIGxldCBmZXRjaFJlbG9hZElkcyA9IG5ldyBNYXAoKTsgLy8gRmV0Y2hlcnMgdGhhdCB0cmlnZ2VyZWQgcmVkaXJlY3QgbmF2aWdhdGlvbnMgZnJvbSB0aGVpciBhY3Rpb25zCgogIGxldCBmZXRjaFJlZGlyZWN0SWRzID0gbmV3IFNldCgpOyAvLyBNb3N0IHJlY2VudCBocmVmL21hdGNoIGZvciBmZXRjaGVyLmxvYWQgY2FsbHMgZm9yIGZldGNoZXJzCgogIGxldCBmZXRjaExvYWRNYXRjaGVzID0gbmV3IE1hcCgpOyAvLyBTdG9yZSBEZWZlcnJlZERhdGEgaW5zdGFuY2VzIGZvciBhY3RpdmUgcm91dGUgbWF0Y2hlcy4gIFdoZW4gYQogIC8vIHJvdXRlIGxvYWRlciByZXR1cm5zIGRlZmVyKCkgd2Ugc3RpY2sgb25lIGluIGhlcmUuICBUaGVuLCB3aGVuIGEgbmVzdGVkCiAgLy8gcHJvbWlzZSByZXNvbHZlcyB3ZSB1cGRhdGUgbG9hZGVyRGF0YS4gIElmIGEgbmV3IG5hdmlnYXRpb24gc3RhcnRzIHdlCiAgLy8gY2FuY2VsIGFjdGl2ZSBkZWZlcnJlZHMgZm9yIGVsaW1pbmF0ZWQgcm91dGVzLgoKICBsZXQgYWN0aXZlRGVmZXJyZWRzID0gbmV3IE1hcCgpOyAvLyBJbml0aWFsaXplIHRoZSByb3V0ZXIsIGFsbCBzaWRlIGVmZmVjdHMgc2hvdWxkIGJlIGtpY2tlZCBvZmYgZnJvbSBoZXJlLgogIC8vIEltcGxlbWVudGVkIGFzIGEgRmx1ZW50IEFQSSBmb3IgZWFzZSBvZjoKICAvLyAgIGxldCByb3V0ZXIgPSBjcmVhdGVSb3V0ZXIoaW5pdCkuaW5pdGlhbGl6ZSgpOwoKICBmdW5jdGlvbiBpbml0aWFsaXplKCkgewogICAgLy8gSWYgaGlzdG9yeSBpbmZvcm1zIHVzIG9mIGEgUE9QIG5hdmlnYXRpb24sIHN0YXJ0IHRoZSBuYXZpZ2F0aW9uIGJ1dCBkbyBub3QgdXBkYXRlCiAgICAvLyBzdGF0ZS4gIFdlJ2xsIHVwZGF0ZSBvdXIgb3duIHN0YXRlIG9uY2UgdGhlIG5hdmlnYXRpb24gY29tcGxldGVzCiAgICB1bmxpc3Rlbkhpc3RvcnkgPSBpbml0Lmhpc3RvcnkubGlzdGVuKF9yZWYgPT4gewogICAgICBsZXQgewogICAgICAgIGFjdGlvbjogaGlzdG9yeUFjdGlvbiwKICAgICAgICBsb2NhdGlvbgogICAgICB9ID0gX3JlZjsKICAgICAgcmV0dXJuIHN0YXJ0TmF2aWdhdGlvbihoaXN0b3J5QWN0aW9uLCBsb2NhdGlvbik7CiAgICB9KTsgLy8gS2ljayBvZmYgaW5pdGlhbCBkYXRhIGxvYWQgaWYgbmVlZGVkLiAgVXNlIFBvcCB0byBhdm9pZCBtb2RpZnlpbmcgaGlzdG9yeQoKICAgIGlmICghc3RhdGUuaW5pdGlhbGl6ZWQpIHsKICAgICAgc3RhcnROYXZpZ2F0aW9uKEFjdGlvbi5Qb3AsIHN0YXRlLmxvY2F0aW9uKTsKICAgIH0KCiAgICByZXR1cm4gcm91dGVyOwogIH0gLy8gQ2xlYW4gdXAgYSByb3V0ZXIgYW5kIGl0J3Mgc2lkZSBlZmZlY3RzCgoKICBmdW5jdGlvbiBkaXNwb3NlKCkgewogICAgaWYgKHVubGlzdGVuSGlzdG9yeSkgewogICAgICB1bmxpc3Rlbkhpc3RvcnkoKTsKICAgIH0KCiAgICBzdWJzY3JpYmVycy5jbGVhcigpOwogICAgcGVuZGluZ05hdmlnYXRpb25Db250cm9sbGVyICYmIHBlbmRpbmdOYXZpZ2F0aW9uQ29udHJvbGxlci5hYm9ydCgpOwogICAgc3RhdGUuZmV0Y2hlcnMuZm9yRWFjaCgoXywga2V5KSA9PiBkZWxldGVGZXRjaGVyKGtleSkpOwogIH0gLy8gU3Vic2NyaWJlIHRvIHN0YXRlIHVwZGF0ZXMgZm9yIHRoZSByb3V0ZXIKCgogIGZ1bmN0aW9uIHN1YnNjcmliZShmbikgewogICAgc3Vic2NyaWJlcnMuYWRkKGZuKTsKICAgIHJldHVybiAoKSA9PiBzdWJzY3JpYmVycy5kZWxldGUoZm4pOwogIH0gLy8gVXBkYXRlIG91ciBzdGF0ZSBhbmQgbm90aWZ5IHRoZSBjYWxsaW5nIGNvbnRleHQgb2YgdGhlIGNoYW5nZQoKCiAgZnVuY3Rpb24gdXBkYXRlU3RhdGUobmV3U3RhdGUpIHsKICAgIHN0YXRlID0gX2V4dGVuZHMoe30sIHN0YXRlLCBuZXdTdGF0ZSk7CiAgICBzdWJzY3JpYmVycy5mb3JFYWNoKHN1YnNjcmliZXIgPT4gc3Vic2NyaWJlcihzdGF0ZSkpOwogIH0gLy8gQ29tcGxldGUgYSBuYXZpZ2F0aW9uIHJldHVybmluZyB0aGUgc3RhdGUubmF2aWdhdGlvbiBiYWNrIHRvIHRoZSBJRExFX05BVklHQVRJT04KICAvLyBhbmQgc2V0dGluZyBzdGF0ZS5baGlzdG9yeUFjdGlvbi9sb2NhdGlvbi9tYXRjaGVzXSB0byB0aGUgbmV3IHJvdXRlLgogIC8vIC0gTG9jYXRpb24gaXMgYSByZXF1aXJlZCBwYXJhbQogIC8vIC0gTmF2aWdhdGlvbiB3aWxsIGFsd2F5cyBiZSBzZXQgdG8gSURMRV9OQVZJR0FUSU9OCiAgLy8gLSBDYW4gcGFzcyBhbnkgb3RoZXIgc3RhdGUgaW4gbmV3U3RhdGUKCgogIGZ1bmN0aW9uIGNvbXBsZXRlTmF2aWdhdGlvbihsb2NhdGlvbiwgbmV3U3RhdGUpIHsKICAgIHZhciBfc3RhdGUkbmF2aWdhdGlvbiRmb3I7CgogICAgLy8gRGVkdWNlIGlmIHdlJ3JlIGluIGEgbG9hZGluZy9hY3Rpb25SZWxvYWQgc3RhdGU6CiAgICAvLyAtIFdlIGhhdmUgY29tbWl0dGVkIGFjdGlvbkRhdGEgaW4gdGhlIHN0b3JlCiAgICAvLyAtIFRoZSBjdXJyZW50IG5hdmlnYXRpb24gd2FzIGEgc3VibWlzc2lvbgogICAgLy8gLSBXZSdyZSBwYXN0IHRoZSBzdWJtaXR0aW5nIHN0YXRlIGFuZCBpbnRvIHRoZSBsb2FkaW5nIHN0YXRlCiAgICAvLyAtIFRoZSBsb2NhdGlvbiB3ZSd2ZSBmaW5pc2hlZCBsb2FkaW5nIGlzIGRpZmZlcmVudCBmcm9tIHRoZSBzdWJtaXNzaW9uCiAgICAvLyAgIGxvY2F0aW9uLCBpbmRpY2F0aW5nIHdlIHJlZGlyZWN0ZWQgZnJvbSB0aGUgYWN0aW9uIChhdm9pZHMgZmFsc2UKICAgIC8vICAgcG9zaXRpdmVzIGZvciBsb2FkaW5nL3N1Ym1pc3Npb25SZWRpcmVjdCB3aGVuIGFjdGlvbkRhdGEgcmV0dXJuZWQKICAgIC8vICAgb24gYSBwcmlvciBzdWJtaXNzaW9uKQogICAgbGV0IGlzQWN0aW9uUmVsb2FkID0gc3RhdGUuYWN0aW9uRGF0YSAhPSBudWxsICYmIHN0YXRlLm5hdmlnYXRpb24uZm9ybU1ldGhvZCAhPSBudWxsICYmIHN0YXRlLm5hdmlnYXRpb24uc3RhdGUgPT09ICJsb2FkaW5nIiAmJiAoKF9zdGF0ZSRuYXZpZ2F0aW9uJGZvciA9IHN0YXRlLm5hdmlnYXRpb24uZm9ybUFjdGlvbikgPT0gbnVsbCA/IHZvaWQgMCA6IF9zdGF0ZSRuYXZpZ2F0aW9uJGZvci5zcGxpdCgiPyIpWzBdKSA9PT0gbG9jYXRpb24ucGF0aG5hbWU7IC8vIEFsd2F5cyBwcmVzZXJ2ZSBhbnkgZXhpc3RpbmcgbG9hZGVyRGF0YSBmcm9tIHJlLXVzZWQgcm91dGVzCgogICAgbGV0IG5ld0xvYWRlckRhdGEgPSBuZXdTdGF0ZS5sb2FkZXJEYXRhID8gewogICAgICBsb2FkZXJEYXRhOiBtZXJnZUxvYWRlckRhdGEoc3RhdGUubG9hZGVyRGF0YSwgbmV3U3RhdGUubG9hZGVyRGF0YSwgbmV3U3RhdGUubWF0Y2hlcyB8fCBbXSkKICAgIH0gOiB7fTsKICAgIHVwZGF0ZVN0YXRlKF9leHRlbmRzKHt9LCBpc0FjdGlvblJlbG9hZCA/IHt9IDogewogICAgICBhY3Rpb25EYXRhOiBudWxsCiAgICB9LCBuZXdTdGF0ZSwgbmV3TG9hZGVyRGF0YSwgewogICAgICBoaXN0b3J5QWN0aW9uOiBwZW5kaW5nQWN0aW9uLAogICAgICBsb2NhdGlvbiwKICAgICAgaW5pdGlhbGl6ZWQ6IHRydWUsCiAgICAgIG5hdmlnYXRpb246IElETEVfTkFWSUdBVElPTiwKICAgICAgcmV2YWxpZGF0aW9uOiAiaWRsZSIsCiAgICAgIC8vIERvbid0IHJlc3RvcmUgb24gc3VibWlzc2lvbiBuYXZpZ2F0aW9ucwogICAgICByZXN0b3JlU2Nyb2xsUG9zaXRpb246IHN0YXRlLm5hdmlnYXRpb24uZm9ybURhdGEgPyBmYWxzZSA6IGdldFNhdmVkU2Nyb2xsUG9zaXRpb24obG9jYXRpb24sIG5ld1N0YXRlLm1hdGNoZXMgfHwgc3RhdGUubWF0Y2hlcyksCiAgICAgIHByZXZlbnRTY3JvbGxSZXNldDogcGVuZGluZ1ByZXZlbnRTY3JvbGxSZXNldAogICAgfSkpOwoKICAgIGlmIChpc1VuaW50ZXJydXB0ZWRSZXZhbGlkYXRpb24pIDsgZWxzZSBpZiAocGVuZGluZ0FjdGlvbiA9PT0gQWN0aW9uLlBvcCkgOyBlbHNlIGlmIChwZW5kaW5nQWN0aW9uID09PSBBY3Rpb24uUHVzaCkgewogICAgICBpbml0Lmhpc3RvcnkucHVzaChsb2NhdGlvbiwgbG9jYXRpb24uc3RhdGUpOwogICAgfSBlbHNlIGlmIChwZW5kaW5nQWN0aW9uID09PSBBY3Rpb24uUmVwbGFjZSkgewogICAgICBpbml0Lmhpc3RvcnkucmVwbGFjZShsb2NhdGlvbiwgbG9jYXRpb24uc3RhdGUpOwogICAgfSAvLyBSZXNldCBzdGF0ZWZ1bCBuYXZpZ2F0aW9uIHZhcnMKCgogICAgcGVuZGluZ0FjdGlvbiA9IEFjdGlvbi5Qb3A7CiAgICBwZW5kaW5nUHJldmVudFNjcm9sbFJlc2V0ID0gZmFsc2U7CiAgICBpc1VuaW50ZXJydXB0ZWRSZXZhbGlkYXRpb24gPSBmYWxzZTsKICAgIGlzUmV2YWxpZGF0aW9uUmVxdWlyZWQgPSBmYWxzZTsKICAgIGNhbmNlbGxlZERlZmVycmVkUm91dGVzID0gW107CiAgICBjYW5jZWxsZWRGZXRjaGVyTG9hZHMgPSBbXTsKICB9IC8vIFRyaWdnZXIgYSBuYXZpZ2F0aW9uIGV2ZW50LCB3aGljaCBjYW4gZWl0aGVyIGJlIGEgbnVtZXJpY2FsIFBPUCBvciBhIFBVU0gKICAvLyByZXBsYWNlIHdpdGggYW4gb3B0aW9uYWwgc3VibWlzc2lvbgoKCiAgYXN5bmMgZnVuY3Rpb24gbmF2aWdhdGUodG8sIG9wdHMpIHsKICAgIGlmICh0eXBlb2YgdG8gPT09ICJudW1iZXIiKSB7CiAgICAgIGluaXQuaGlzdG9yeS5nbyh0byk7CiAgICAgIHJldHVybjsKICAgIH0KCiAgICBsZXQgewogICAgICBwYXRoLAogICAgICBzdWJtaXNzaW9uLAogICAgICBlcnJvcgogICAgfSA9IG5vcm1hbGl6ZU5hdmlnYXRlT3B0aW9ucyh0bywgb3B0cyk7CiAgICBsZXQgbG9jYXRpb24gPSBjcmVhdGVMb2NhdGlvbihzdGF0ZS5sb2NhdGlvbiwgcGF0aCwgb3B0cyAmJiBvcHRzLnN0YXRlKTsgLy8gV2hlbiB1c2luZyBuYXZpZ2F0ZSBhcyBhIFBVU0gvUkVQTEFDRSB3ZSBhcmVuJ3QgcmVhZGluZyBhbiBhbHJlYWR5LWVuY29kZWQKICAgIC8vIFVSTCBmcm9tIHdpbmRvdy5sb2NhdGlvbiwgc28gd2UgbmVlZCB0byBlbmNvZGUgaXQgaGVyZSBzbyB0aGUgYmVoYXZpb3IKICAgIC8vIHJlbWFpbnMgdGhlIHNhbWUgYXMgUE9QIGFuZCBub24tZGF0YS1yb3V0ZXIgdXNhZ2VzLiAgbmV3IFVSTCgpIGRvZXMgYWxsCiAgICAvLyB0aGUgc2FtZSBlbmNvZGluZyB3ZSdkIGdldCBmcm9tIGEgaGlzdG9yeS5wdXNoU3RhdGUvd2luZG93LmxvY2F0aW9uIHJlYWQKICAgIC8vIHdpdGhvdXQgaGF2aW5nIHRvIHRvdWNoIGhpc3RvcnkKCiAgICBsb2NhdGlvbiA9IGluaXQuaGlzdG9yeS5lbmNvZGVMb2NhdGlvbihsb2NhdGlvbik7CiAgICBsZXQgaGlzdG9yeUFjdGlvbiA9IChvcHRzICYmIG9wdHMucmVwbGFjZSkgPT09IHRydWUgfHwgc3VibWlzc2lvbiAhPSBudWxsID8gQWN0aW9uLlJlcGxhY2UgOiBBY3Rpb24uUHVzaDsKICAgIGxldCBwcmV2ZW50U2Nyb2xsUmVzZXQgPSBvcHRzICYmICJwcmV2ZW50U2Nyb2xsUmVzZXQiIGluIG9wdHMgPyBvcHRzLnByZXZlbnRTY3JvbGxSZXNldCA9PT0gdHJ1ZSA6IHVuZGVmaW5lZDsKICAgIHJldHVybiBhd2FpdCBzdGFydE5hdmlnYXRpb24oaGlzdG9yeUFjdGlvbiwgbG9jYXRpb24sIHsKICAgICAgc3VibWlzc2lvbiwKICAgICAgLy8gU2VuZCB0aHJvdWdoIHRoZSBmb3JtRGF0YSBzZXJpYWxpemF0aW9uIGVycm9yIGlmIHdlIGhhdmUgb25lIHNvIHdlIGNhbgogICAgICAvLyByZW5kZXIgYXQgdGhlIHJpZ2h0IGVycm9yIGJvdW5kYXJ5IGFmdGVyIHdlIG1hdGNoIHJvdXRlcwogICAgICBwZW5kaW5nRXJyb3I6IGVycm9yLAogICAgICBwcmV2ZW50U2Nyb2xsUmVzZXQsCiAgICAgIHJlcGxhY2U6IG9wdHMgJiYgb3B0cy5yZXBsYWNlCiAgICB9KTsKICB9IC8vIFJldmFsaWRhdGUgYWxsIGN1cnJlbnQgbG9hZGVycy4gIElmIGEgbmF2aWdhdGlvbiBpcyBpbiBwcm9ncmVzcyBvciBpZiB0aGlzCiAgLy8gaXMgaW50ZXJydXB0ZWQgYnkgYSBuYXZpZ2F0aW9uLCBhbGxvdyB0aGlzIHRvICJzdWNjZWVkIiBieSBjYWxsaW5nIGFsbAogIC8vIGxvYWRlcnMgZHVyaW5nIHRoZSBuZXh0IGxvYWRlciByb3VuZAoKCiAgZnVuY3Rpb24gcmV2YWxpZGF0ZSgpIHsKICAgIGludGVycnVwdEFjdGl2ZUxvYWRzKCk7CiAgICB1cGRhdGVTdGF0ZSh7CiAgICAgIHJldmFsaWRhdGlvbjogImxvYWRpbmciCiAgICB9KTsgLy8gSWYgd2UncmUgY3VycmVudGx5IHN1Ym1pdHRpbmcgYW4gYWN0aW9uLCB3ZSBkb24ndCBuZWVkIHRvIHN0YXJ0IGEgbmV3CiAgICAvLyBuYXZpZ2F0aW9uLCB3ZSdsbCBqdXN0IGxldCB0aGUgZm9sbG93IHVwIGxvYWRlciBleGVjdXRpb24gY2FsbCBhbGwgbG9hZGVycwoKICAgIGlmIChzdGF0ZS5uYXZpZ2F0aW9uLnN0YXRlID09PSAic3VibWl0dGluZyIpIHsKICAgICAgcmV0dXJuOwogICAgfSAvLyBJZiB3ZSdyZSBjdXJyZW50bHkgaW4gYW4gaWRsZSBzdGF0ZSwgc3RhcnQgYSBuZXcgbmF2aWdhdGlvbiBmb3IgdGhlIGN1cnJlbnQKICAgIC8vIGFjdGlvbi9sb2NhdGlvbiBhbmQgbWFyayBpdCBhcyB1bmludGVycnVwdGVkLCB3aGljaCB3aWxsIHNraXAgdGhlIGhpc3RvcnkKICAgIC8vIHVwZGF0ZSBpbiBjb21wbGV0ZU5hdmlnYXRpb24KCgogICAgaWYgKHN0YXRlLm5hdmlnYXRpb24uc3RhdGUgPT09ICJpZGxlIikgewogICAgICBzdGFydE5hdmlnYXRpb24oc3RhdGUuaGlzdG9yeUFjdGlvbiwgc3RhdGUubG9jYXRpb24sIHsKICAgICAgICBzdGFydFVuaW50ZXJydXB0ZWRSZXZhbGlkYXRpb246IHRydWUKICAgICAgfSk7CiAgICAgIHJldHVybjsKICAgIH0gLy8gT3RoZXJ3aXNlLCBpZiB3ZSdyZSBjdXJyZW50bHkgaW4gYSBsb2FkaW5nIHN0YXRlLCBqdXN0IHN0YXJ0IGEgbmV3CiAgICAvLyBuYXZpZ2F0aW9uIHRvIHRoZSBuYXZpZ2F0aW9uLmxvY2F0aW9uIGJ1dCBkbyBub3QgdHJpZ2dlciBhbiB1bmludGVycnVwdGVkCiAgICAvLyByZXZhbGlkYXRpb24gc28gdGhhdCBoaXN0b3J5IGNvcnJlY3RseSB1cGRhdGVzIG9uY2UgdGhlIG5hdmlnYXRpb24gY29tcGxldGVzCgoKICAgIHN0YXJ0TmF2aWdhdGlvbihwZW5kaW5nQWN0aW9uIHx8IHN0YXRlLmhpc3RvcnlBY3Rpb24sIHN0YXRlLm5hdmlnYXRpb24ubG9jYXRpb24sIHsKICAgICAgb3ZlcnJpZGVOYXZpZ2F0aW9uOiBzdGF0ZS5uYXZpZ2F0aW9uCiAgICB9KTsKICB9IC8vIFN0YXJ0IGEgbmF2aWdhdGlvbiB0byB0aGUgZ2l2ZW4gYWN0aW9uL2xvY2F0aW9uLiAgQ2FuIG9wdGlvbmFsbHkgcHJvdmlkZSBhCiAgLy8gb3ZlcnJpZGVOYXZpZ2F0aW9uIHdoaWNoIHdpbGwgb3ZlcnJpZGUgdGhlIG5vcm1hbExvYWQgaW4gdGhlIGNhc2Ugb2YgYSByZWRpcmVjdAogIC8vIG5hdmlnYXRpb24KCgogIGFzeW5jIGZ1bmN0aW9uIHN0YXJ0TmF2aWdhdGlvbihoaXN0b3J5QWN0aW9uLCBsb2NhdGlvbiwgb3B0cykgewogICAgLy8gQWJvcnQgYW55IGluLXByb2dyZXNzIG5hdmlnYXRpb25zIGFuZCBzdGFydCBhIG5ldyBvbmUuIFVuc2V0IGFueSBvbmdvaW5nCiAgICAvLyB1bmludGVycnVwdGVkIHJldmFsaWRhdGlvbnMgdW5sZXNzIHRvbGQgb3RoZXJ3aXNlLCBzaW5jZSB3ZSB3YW50IHRoaXMKICAgIC8vIG5ldyBuYXZpZ2F0aW9uIHRvIHVwZGF0ZSBoaXN0b3J5IG5vcm1hbGx5CiAgICBwZW5kaW5nTmF2aWdhdGlvbkNvbnRyb2xsZXIgJiYgcGVuZGluZ05hdmlnYXRpb25Db250cm9sbGVyLmFib3J0KCk7CiAgICBwZW5kaW5nTmF2aWdhdGlvbkNvbnRyb2xsZXIgPSBudWxsOwogICAgcGVuZGluZ0FjdGlvbiA9IGhpc3RvcnlBY3Rpb247CiAgICBpc1VuaW50ZXJydXB0ZWRSZXZhbGlkYXRpb24gPSAob3B0cyAmJiBvcHRzLnN0YXJ0VW5pbnRlcnJ1cHRlZFJldmFsaWRhdGlvbikgPT09IHRydWU7IC8vIFNhdmUgdGhlIGN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uIGV2ZXJ5IHRpbWUgd2Ugc3RhcnQgYSBuZXcgbmF2aWdhdGlvbiwKICAgIC8vIGFuZCB0cmFjayB3aGV0aGVyIHdlIHNob3VsZCByZXNldCBzY3JvbGwgb24gY29tcGxldGlvbgoKICAgIHNhdmVTY3JvbGxQb3NpdGlvbihzdGF0ZS5sb2NhdGlvbiwgc3RhdGUubWF0Y2hlcyk7CiAgICBwZW5kaW5nUHJldmVudFNjcm9sbFJlc2V0ID0gKG9wdHMgJiYgb3B0cy5wcmV2ZW50U2Nyb2xsUmVzZXQpID09PSB0cnVlOwogICAgbGV0IGxvYWRpbmdOYXZpZ2F0aW9uID0gb3B0cyAmJiBvcHRzLm92ZXJyaWRlTmF2aWdhdGlvbjsKICAgIGxldCBtYXRjaGVzID0gbWF0Y2hSb3V0ZXMoZGF0YVJvdXRlcywgbG9jYXRpb24sIGluaXQuYmFzZW5hbWUpOyAvLyBTaG9ydCBjaXJjdWl0IHdpdGggYSA0MDQgb24gdGhlIHJvb3QgZXJyb3IgYm91bmRhcnkgaWYgd2UgbWF0Y2ggbm90aGluZwoKICAgIGlmICghbWF0Y2hlcykgewogICAgICBsZXQgewogICAgICAgIG1hdGNoZXM6IG5vdEZvdW5kTWF0Y2hlcywKICAgICAgICByb3V0ZSwKICAgICAgICBlcnJvcgogICAgICB9ID0gZ2V0Tm90Rm91bmRNYXRjaGVzKGRhdGFSb3V0ZXMpOyAvLyBDYW5jZWwgYWxsIHBlbmRpbmcgZGVmZXJyZWQgb24gNDA0cyBzaW5jZSB3ZSBkb24ndCBrZWVwIGFueSByb3V0ZXMKCiAgICAgIGNhbmNlbEFjdGl2ZURlZmVycmVkcygpOwogICAgICBjb21wbGV0ZU5hdmlnYXRpb24obG9jYXRpb24sIHsKICAgICAgICBtYXRjaGVzOiBub3RGb3VuZE1hdGNoZXMsCiAgICAgICAgbG9hZGVyRGF0YToge30sCiAgICAgICAgZXJyb3JzOiB7CiAgICAgICAgICBbcm91dGUuaWRdOiBlcnJvcgogICAgICAgIH0KICAgICAgfSk7CiAgICAgIHJldHVybjsKICAgIH0gLy8gU2hvcnQgY2lyY3VpdCBpZiBpdCdzIG9ubHkgYSBoYXNoIGNoYW5nZQoKCiAgICBpZiAoaXNIYXNoQ2hhbmdlT25seShzdGF0ZS5sb2NhdGlvbiwgbG9jYXRpb24pKSB7CiAgICAgIGNvbXBsZXRlTmF2aWdhdGlvbihsb2NhdGlvbiwgewogICAgICAgIG1hdGNoZXMKICAgICAgfSk7CiAgICAgIHJldHVybjsKICAgIH0gLy8gQ3JlYXRlIGEgY29udHJvbGxlci9SZXF1ZXN0IGZvciB0aGlzIG5hdmlnYXRpb24KCgogICAgcGVuZGluZ05hdmlnYXRpb25Db250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpOwogICAgbGV0IHJlcXVlc3QgPSBjcmVhdGVSZXF1ZXN0KGxvY2F0aW9uLCBwZW5kaW5nTmF2aWdhdGlvbkNvbnRyb2xsZXIuc2lnbmFsLCBvcHRzICYmIG9wdHMuc3VibWlzc2lvbik7CiAgICBsZXQgcGVuZGluZ0FjdGlvbkRhdGE7CiAgICBsZXQgcGVuZGluZ0Vycm9yOwoKICAgIGlmIChvcHRzICYmIG9wdHMucGVuZGluZ0Vycm9yKSB7CiAgICAgIC8vIElmIHdlIGhhdmUgYSBwZW5kaW5nRXJyb3IsIGl0IG1lYW5zIHRoZSB1c2VyIGF0dGVtcHRlZCBhIEdFVCBzdWJtaXNzaW9uCiAgICAgIC8vIHdpdGggYmluYXJ5IEZvcm1EYXRhIHNvIGFzc2lnbiBoZXJlIGFuZCBza2lwIHRvIGhhbmRsZUxvYWRlcnMuICBUaGF0CiAgICAgIC8vIHdheSB3ZSBoYW5kbGUgY2FsbGluZyBsb2FkZXJzIGFib3ZlIHRoZSBib3VuZGFyeSBldGMuICBJdCdzIG5vdCByZWFsbHkKICAgICAgLy8gZGlmZmVyZW50IGZyb20gYW4gYWN0aW9uRXJyb3IgaW4gdGhhdCBzZW5zZS4KICAgICAgcGVuZGluZ0Vycm9yID0gewogICAgICAgIFtmaW5kTmVhcmVzdEJvdW5kYXJ5KG1hdGNoZXMpLnJvdXRlLmlkXTogb3B0cy5wZW5kaW5nRXJyb3IKICAgICAgfTsKICAgIH0gZWxzZSBpZiAob3B0cyAmJiBvcHRzLnN1Ym1pc3Npb24pIHsKICAgICAgLy8gQ2FsbCBhY3Rpb24gaWYgd2UgcmVjZWl2ZWQgYW4gYWN0aW9uIHN1Ym1pc3Npb24KICAgICAgbGV0IGFjdGlvbk91dHB1dCA9IGF3YWl0IGhhbmRsZUFjdGlvbihyZXF1ZXN0LCBsb2NhdGlvbiwgb3B0cy5zdWJtaXNzaW9uLCBtYXRjaGVzLCB7CiAgICAgICAgcmVwbGFjZTogb3B0cy5yZXBsYWNlCiAgICAgIH0pOwoKICAgICAgaWYgKGFjdGlvbk91dHB1dC5zaG9ydENpcmN1aXRlZCkgewogICAgICAgIHJldHVybjsKICAgICAgfQoKICAgICAgcGVuZGluZ0FjdGlvbkRhdGEgPSBhY3Rpb25PdXRwdXQucGVuZGluZ0FjdGlvbkRhdGE7CiAgICAgIHBlbmRpbmdFcnJvciA9IGFjdGlvbk91dHB1dC5wZW5kaW5nQWN0aW9uRXJyb3I7CgogICAgICBsZXQgbmF2aWdhdGlvbiA9IF9leHRlbmRzKHsKICAgICAgICBzdGF0ZTogImxvYWRpbmciLAogICAgICAgIGxvY2F0aW9uCiAgICAgIH0sIG9wdHMuc3VibWlzc2lvbik7CgogICAgICBsb2FkaW5nTmF2aWdhdGlvbiA9IG5hdmlnYXRpb247CiAgICB9IC8vIENhbGwgbG9hZGVycwoKCiAgICBsZXQgewogICAgICBzaG9ydENpcmN1aXRlZCwKICAgICAgbG9hZGVyRGF0YSwKICAgICAgZXJyb3JzCiAgICB9ID0gYXdhaXQgaGFuZGxlTG9hZGVycyhyZXF1ZXN0LCBsb2NhdGlvbiwgbWF0Y2hlcywgbG9hZGluZ05hdmlnYXRpb24sIG9wdHMgJiYgb3B0cy5zdWJtaXNzaW9uLCBvcHRzICYmIG9wdHMucmVwbGFjZSwgcGVuZGluZ0FjdGlvbkRhdGEsIHBlbmRpbmdFcnJvcik7CgogICAgaWYgKHNob3J0Q2lyY3VpdGVkKSB7CiAgICAgIHJldHVybjsKICAgIH0gLy8gQ2xlYW4gdXAgbm93IHRoYXQgdGhlIGFjdGlvbi9sb2FkZXJzIGhhdmUgY29tcGxldGVkLiAgRG9uJ3QgY2xlYW4gdXAgaWYKICAgIC8vIHdlIHNob3J0IGNpcmN1aXRlZCBiZWNhdXNlIHBlbmRpbmdOYXZpZ2F0aW9uQ29udHJvbGxlciB3aWxsIGhhdmUgYWxyZWFkeQogICAgLy8gYmVlbiBhc3NpZ25lZCB0byBhIG5ldyBjb250cm9sbGVyIGZvciB0aGUgbmV4dCBuYXZpZ2F0aW9uCgoKICAgIHBlbmRpbmdOYXZpZ2F0aW9uQ29udHJvbGxlciA9IG51bGw7CiAgICBjb21wbGV0ZU5hdmlnYXRpb24obG9jYXRpb24sIHsKICAgICAgbWF0Y2hlcywKICAgICAgbG9hZGVyRGF0YSwKICAgICAgZXJyb3JzCiAgICB9KTsKICB9IC8vIENhbGwgdGhlIGFjdGlvbiBtYXRjaGVkIGJ5IHRoZSBsZWFmIHJvdXRlIGZvciB0aGlzIG5hdmlnYXRpb24gYW5kIGhhbmRsZQogIC8vIHJlZGlyZWN0cy9lcnJvcnMKCgogIGFzeW5jIGZ1bmN0aW9uIGhhbmRsZUFjdGlvbihyZXF1ZXN0LCBsb2NhdGlvbiwgc3VibWlzc2lvbiwgbWF0Y2hlcywgb3B0cykgewogICAgaW50ZXJydXB0QWN0aXZlTG9hZHMoKTsgLy8gUHV0IHVzIGluIGEgc3VibWl0dGluZyBzdGF0ZQoKICAgIGxldCBuYXZpZ2F0aW9uID0gX2V4dGVuZHMoewogICAgICBzdGF0ZTogInN1Ym1pdHRpbmciLAogICAgICBsb2NhdGlvbgogICAgfSwgc3VibWlzc2lvbik7CgogICAgdXBkYXRlU3RhdGUoewogICAgICBuYXZpZ2F0aW9uCiAgICB9KTsgLy8gQ2FsbCBvdXIgYWN0aW9uIGFuZCBnZXQgdGhlIHJlc3VsdAoKICAgIGxldCByZXN1bHQ7CiAgICBsZXQgYWN0aW9uTWF0Y2ggPSBnZXRUYXJnZXRNYXRjaChtYXRjaGVzLCBsb2NhdGlvbik7CgogICAgaWYgKCFhY3Rpb25NYXRjaC5yb3V0ZS5hY3Rpb24pIHsKICAgICAgcmVzdWx0ID0gZ2V0TWV0aG9kTm90QWxsb3dlZFJlc3VsdChsb2NhdGlvbik7CiAgICB9IGVsc2UgewogICAgICByZXN1bHQgPSBhd2FpdCBjYWxsTG9hZGVyT3JBY3Rpb24oImFjdGlvbiIsIHJlcXVlc3QsIGFjdGlvbk1hdGNoLCBtYXRjaGVzLCByb3V0ZXIuYmFzZW5hbWUpOwoKICAgICAgaWYgKHJlcXVlc3Quc2lnbmFsLmFib3J0ZWQpIHsKICAgICAgICByZXR1cm4gewogICAgICAgICAgc2hvcnRDaXJjdWl0ZWQ6IHRydWUKICAgICAgICB9OwogICAgICB9CiAgICB9CgogICAgaWYgKGlzUmVkaXJlY3RSZXN1bHQocmVzdWx0KSkgewogICAgICBsZXQgcmVkaXJlY3ROYXZpZ2F0aW9uID0gX2V4dGVuZHMoewogICAgICAgIHN0YXRlOiAibG9hZGluZyIsCiAgICAgICAgbG9jYXRpb246IGNyZWF0ZUxvY2F0aW9uKHN0YXRlLmxvY2F0aW9uLCByZXN1bHQubG9jYXRpb24pCiAgICAgIH0sIHN1Ym1pc3Npb24pOwoKICAgICAgYXdhaXQgc3RhcnRSZWRpcmVjdE5hdmlnYXRpb24ocmVzdWx0LCByZWRpcmVjdE5hdmlnYXRpb24sIG9wdHMgJiYgb3B0cy5yZXBsYWNlKTsKICAgICAgcmV0dXJuIHsKICAgICAgICBzaG9ydENpcmN1aXRlZDogdHJ1ZQogICAgICB9OwogICAgfQoKICAgIGlmIChpc0Vycm9yUmVzdWx0KHJlc3VsdCkpIHsKICAgICAgLy8gU3RvcmUgb2ZmIHRoZSBwZW5kaW5nIGVycm9yIC0gd2UgdXNlIGl0IHRvIGRldGVybWluZSB3aGljaCBsb2FkZXJzCiAgICAgIC8vIHRvIGNhbGwgYW5kIHdpbGwgY29tbWl0IGl0IHdoZW4gd2UgY29tcGxldGUgdGhlIG5hdmlnYXRpb24KICAgICAgbGV0IGJvdW5kYXJ5TWF0Y2ggPSBmaW5kTmVhcmVzdEJvdW5kYXJ5KG1hdGNoZXMsIGFjdGlvbk1hdGNoLnJvdXRlLmlkKTsgLy8gQnkgZGVmYXVsdCwgYWxsIHN1Ym1pc3Npb25zIGFyZSBSRVBMQUNFIG5hdmlnYXRpb25zLCBidXQgaWYgdGhlCiAgICAgIC8vIGFjdGlvbiB0aHJldyBhbiBlcnJvciB0aGF0J2xsIGJlIHJlbmRlcmVkIGluIGFuIGVycm9yRWxlbWVudCwgd2UgZmFsbAogICAgICAvLyBiYWNrIHRvIFBVU0ggc28gdGhhdCB0aGUgdXNlciBjYW4gdXNlIHRoZSBiYWNrIGJ1dHRvbiB0byBnZXQgYmFjayB0bwogICAgICAvLyB0aGUgcHJlLXN1Ym1pc3Npb24gZm9ybSBsb2NhdGlvbiB0byB0cnkgYWdhaW4KCiAgICAgIGlmICgob3B0cyAmJiBvcHRzLnJlcGxhY2UpICE9PSB0cnVlKSB7CiAgICAgICAgcGVuZGluZ0FjdGlvbiA9IEFjdGlvbi5QdXNoOwogICAgICB9CgogICAgICByZXR1cm4gewogICAgICAgIHBlbmRpbmdBY3Rpb25FcnJvcjogewogICAgICAgICAgW2JvdW5kYXJ5TWF0Y2gucm91dGUuaWRdOiByZXN1bHQuZXJyb3IKICAgICAgICB9CiAgICAgIH07CiAgICB9CgogICAgaWYgKGlzRGVmZXJyZWRSZXN1bHQocmVzdWx0KSkgewogICAgICB0aHJvdyBuZXcgRXJyb3IoImRlZmVyKCkgaXMgbm90IHN1cHBvcnRlZCBpbiBhY3Rpb25zIik7CiAgICB9CgogICAgcmV0dXJuIHsKICAgICAgcGVuZGluZ0FjdGlvbkRhdGE6IHsKICAgICAgICBbYWN0aW9uTWF0Y2gucm91dGUuaWRdOiByZXN1bHQuZGF0YQogICAgICB9CiAgICB9OwogIH0gLy8gQ2FsbCBhbGwgYXBwbGljYWJsZSBsb2FkZXJzIGZvciB0aGUgZ2l2ZW4gbWF0Y2hlcywgaGFuZGxpbmcgcmVkaXJlY3RzLAogIC8vIGVycm9ycywgZXRjLgoKCiAgYXN5bmMgZnVuY3Rpb24gaGFuZGxlTG9hZGVycyhyZXF1ZXN0LCBsb2NhdGlvbiwgbWF0Y2hlcywgb3ZlcnJpZGVOYXZpZ2F0aW9uLCBzdWJtaXNzaW9uLCByZXBsYWNlLCBwZW5kaW5nQWN0aW9uRGF0YSwgcGVuZGluZ0Vycm9yKSB7CiAgICAvLyBGaWd1cmUgb3V0IHRoZSByaWdodCBuYXZpZ2F0aW9uIHdlIHdhbnQgdG8gdXNlIGZvciBkYXRhIGxvYWRpbmcKICAgIGxldCBsb2FkaW5nTmF2aWdhdGlvbiA9IG92ZXJyaWRlTmF2aWdhdGlvbjsKCiAgICBpZiAoIWxvYWRpbmdOYXZpZ2F0aW9uKSB7CiAgICAgIGxldCBuYXZpZ2F0aW9uID0gewogICAgICAgIHN0YXRlOiAibG9hZGluZyIsCiAgICAgICAgbG9jYXRpb24sCiAgICAgICAgZm9ybU1ldGhvZDogdW5kZWZpbmVkLAogICAgICAgIGZvcm1BY3Rpb246IHVuZGVmaW5lZCwKICAgICAgICBmb3JtRW5jVHlwZTogdW5kZWZpbmVkLAogICAgICAgIGZvcm1EYXRhOiB1bmRlZmluZWQKICAgICAgfTsKICAgICAgbG9hZGluZ05hdmlnYXRpb24gPSBuYXZpZ2F0aW9uOwogICAgfQoKICAgIGxldCBbbWF0Y2hlc1RvTG9hZCwgcmV2YWxpZGF0aW5nRmV0Y2hlcnNdID0gZ2V0TWF0Y2hlc1RvTG9hZChzdGF0ZSwgbWF0Y2hlcywgc3VibWlzc2lvbiwgbG9jYXRpb24sIGlzUmV2YWxpZGF0aW9uUmVxdWlyZWQsIGNhbmNlbGxlZERlZmVycmVkUm91dGVzLCBjYW5jZWxsZWRGZXRjaGVyTG9hZHMsIHBlbmRpbmdBY3Rpb25EYXRhLCBwZW5kaW5nRXJyb3IsIGZldGNoTG9hZE1hdGNoZXMpOyAvLyBDYW5jZWwgcGVuZGluZyBkZWZlcnJlZHMgZm9yIG5vLWxvbmdlci1tYXRjaGVkIHJvdXRlcyBvciByb3V0ZXMgd2UncmUKICAgIC8vIGFib3V0IHRvIHJlbG9hZC4gIE5vdGUgdGhhdCBpZiB0aGlzIGlzIGFuIGFjdGlvbiByZWxvYWQgd2Ugd291bGQgaGF2ZQogICAgLy8gYWxyZWFkeSBjYW5jZWxsZWQgYWxsIHBlbmRpbmcgZGVmZXJyZWRzIHNvIHRoaXMgd291bGQgYmUgYSBuby1vcAoKICAgIGNhbmNlbEFjdGl2ZURlZmVycmVkcyhyb3V0ZUlkID0+ICEobWF0Y2hlcyAmJiBtYXRjaGVzLnNvbWUobSA9PiBtLnJvdXRlLmlkID09PSByb3V0ZUlkKSkgfHwgbWF0Y2hlc1RvTG9hZCAmJiBtYXRjaGVzVG9Mb2FkLnNvbWUobSA9PiBtLnJvdXRlLmlkID09PSByb3V0ZUlkKSk7IC8vIFNob3J0IGNpcmN1aXQgaWYgd2UgaGF2ZSBubyBsb2FkZXJzIHRvIHJ1bgoKICAgIGlmIChtYXRjaGVzVG9Mb2FkLmxlbmd0aCA9PT0gMCAmJiByZXZhbGlkYXRpbmdGZXRjaGVycy5sZW5ndGggPT09IDApIHsKICAgICAgY29tcGxldGVOYXZpZ2F0aW9uKGxvY2F0aW9uLCB7CiAgICAgICAgbWF0Y2hlcywKICAgICAgICBsb2FkZXJEYXRhOiBtZXJnZUxvYWRlckRhdGEoc3RhdGUubG9hZGVyRGF0YSwge30sIG1hdGNoZXMpLAogICAgICAgIC8vIENvbW1pdCBwZW5kaW5nIGVycm9yIGlmIHdlJ3JlIHNob3J0IGNpcmN1aXRpbmcKICAgICAgICBlcnJvcnM6IHBlbmRpbmdFcnJvciB8fCBudWxsLAogICAgICAgIGFjdGlvbkRhdGE6IHBlbmRpbmdBY3Rpb25EYXRhIHx8IG51bGwKICAgICAgfSk7CiAgICAgIHJldHVybiB7CiAgICAgICAgc2hvcnRDaXJjdWl0ZWQ6IHRydWUKICAgICAgfTsKICAgIH0gLy8gSWYgdGhpcyBpcyBhbiB1bmludGVycnVwdGVkIHJldmFsaWRhdGlvbiwgd2UgcmVtYWluIGluIG91ciBjdXJyZW50IGlkbGUKICAgIC8vIHN0YXRlLiAgSWYgbm90LCB3ZSBuZWVkIHRvIHN3aXRjaCB0byBvdXIgbG9hZGluZyBzdGF0ZSBhbmQgbG9hZCBkYXRhLAogICAgLy8gcHJlc2VydmluZyBhbnkgbmV3IGFjdGlvbiBkYXRhIG9yIGV4aXN0aW5nIGFjdGlvbiBkYXRhIChpbiB0aGUgY2FzZSBvZgogICAgLy8gYSByZXZhbGlkYXRpb24gaW50ZXJydXB0aW5nIGFuIGFjdGlvblJlbG9hZCkKCgogICAgaWYgKCFpc1VuaW50ZXJydXB0ZWRSZXZhbGlkYXRpb24pIHsKICAgICAgcmV2YWxpZGF0aW5nRmV0Y2hlcnMuZm9yRWFjaChfcmVmMiA9PiB7CiAgICAgICAgbGV0IFtrZXldID0gX3JlZjI7CiAgICAgICAgbGV0IGZldGNoZXIgPSBzdGF0ZS5mZXRjaGVycy5nZXQoa2V5KTsKICAgICAgICBsZXQgcmV2YWxpZGF0aW5nRmV0Y2hlciA9IHsKICAgICAgICAgIHN0YXRlOiAibG9hZGluZyIsCiAgICAgICAgICBkYXRhOiBmZXRjaGVyICYmIGZldGNoZXIuZGF0YSwKICAgICAgICAgIGZvcm1NZXRob2Q6IHVuZGVmaW5lZCwKICAgICAgICAgIGZvcm1BY3Rpb246IHVuZGVmaW5lZCwKICAgICAgICAgIGZvcm1FbmNUeXBlOiB1bmRlZmluZWQsCiAgICAgICAgICBmb3JtRGF0YTogdW5kZWZpbmVkCiAgICAgICAgfTsKICAgICAgICBzdGF0ZS5mZXRjaGVycy5zZXQoa2V5LCByZXZhbGlkYXRpbmdGZXRjaGVyKTsKICAgICAgfSk7CiAgICAgIHVwZGF0ZVN0YXRlKF9leHRlbmRzKHsKICAgICAgICBuYXZpZ2F0aW9uOiBsb2FkaW5nTmF2aWdhdGlvbiwKICAgICAgICBhY3Rpb25EYXRhOiBwZW5kaW5nQWN0aW9uRGF0YSB8fCBzdGF0ZS5hY3Rpb25EYXRhIHx8IG51bGwKICAgICAgfSwgcmV2YWxpZGF0aW5nRmV0Y2hlcnMubGVuZ3RoID4gMCA/IHsKICAgICAgICBmZXRjaGVyczogbmV3IE1hcChzdGF0ZS5mZXRjaGVycykKICAgICAgfSA6IHt9KSk7CiAgICB9CgogICAgcGVuZGluZ05hdmlnYXRpb25Mb2FkSWQgPSArK2luY3JlbWVudGluZ0xvYWRJZDsKICAgIHJldmFsaWRhdGluZ0ZldGNoZXJzLmZvckVhY2goX3JlZjMgPT4gewogICAgICBsZXQgW2tleV0gPSBfcmVmMzsKICAgICAgcmV0dXJuIGZldGNoQ29udHJvbGxlcnMuc2V0KGtleSwgcGVuZGluZ05hdmlnYXRpb25Db250cm9sbGVyKTsKICAgIH0pOwogICAgbGV0IHsKICAgICAgcmVzdWx0cywKICAgICAgbG9hZGVyUmVzdWx0cywKICAgICAgZmV0Y2hlclJlc3VsdHMKICAgIH0gPSBhd2FpdCBjYWxsTG9hZGVyc0FuZE1heWJlUmVzb2x2ZURhdGEoc3RhdGUubWF0Y2hlcywgbWF0Y2hlcywgbWF0Y2hlc1RvTG9hZCwgcmV2YWxpZGF0aW5nRmV0Y2hlcnMsIHJlcXVlc3QpOwoKICAgIGlmIChyZXF1ZXN0LnNpZ25hbC5hYm9ydGVkKSB7CiAgICAgIHJldHVybiB7CiAgICAgICAgc2hvcnRDaXJjdWl0ZWQ6IHRydWUKICAgICAgfTsKICAgIH0gLy8gQ2xlYW4gdXAgX2FmdGVyXyBsb2FkZXJzIGhhdmUgY29tcGxldGVkLiAgRG9uJ3QgY2xlYW4gdXAgaWYgd2Ugc2hvcnQKICAgIC8vIGNpcmN1aXRlZCBiZWNhdXNlIGZldGNoQ29udHJvbGxlcnMgd291bGQgaGF2ZSBiZWVuIGFib3J0ZWQgYW5kCiAgICAvLyByZWFzc2lnbmVkIHRvIG5ldyBjb250cm9sbGVycyBmb3IgdGhlIG5leHQgbmF2aWdhdGlvbgoKCiAgICByZXZhbGlkYXRpbmdGZXRjaGVycy5mb3JFYWNoKF9yZWY0ID0+IHsKICAgICAgbGV0IFtrZXldID0gX3JlZjQ7CiAgICAgIHJldHVybiBmZXRjaENvbnRyb2xsZXJzLmRlbGV0ZShrZXkpOwogICAgfSk7IC8vIElmIGFueSBsb2FkZXJzIHJldHVybmVkIGEgcmVkaXJlY3QgUmVzcG9uc2UsIHN0YXJ0IGEgbmV3IFJFUExBQ0UgbmF2aWdhdGlvbgoKICAgIGxldCByZWRpcmVjdCA9IGZpbmRSZWRpcmVjdChyZXN1bHRzKTsKCiAgICBpZiAocmVkaXJlY3QpIHsKICAgICAgbGV0IHJlZGlyZWN0TmF2aWdhdGlvbiA9IGdldExvYWRlclJlZGlyZWN0KHN0YXRlLCByZWRpcmVjdCk7CiAgICAgIGF3YWl0IHN0YXJ0UmVkaXJlY3ROYXZpZ2F0aW9uKHJlZGlyZWN0LCByZWRpcmVjdE5hdmlnYXRpb24sIHJlcGxhY2UpOwogICAgICByZXR1cm4gewogICAgICAgIHNob3J0Q2lyY3VpdGVkOiB0cnVlCiAgICAgIH07CiAgICB9IC8vIFByb2Nlc3MgYW5kIGNvbW1pdCBvdXRwdXQgZnJvbSBsb2FkZXJzCgoKICAgIGxldCB7CiAgICAgIGxvYWRlckRhdGEsCiAgICAgIGVycm9ycwogICAgfSA9IHByb2Nlc3NMb2FkZXJEYXRhKHN0YXRlLCBtYXRjaGVzLCBtYXRjaGVzVG9Mb2FkLCBsb2FkZXJSZXN1bHRzLCBwZW5kaW5nRXJyb3IsIHJldmFsaWRhdGluZ0ZldGNoZXJzLCBmZXRjaGVyUmVzdWx0cywgYWN0aXZlRGVmZXJyZWRzKTsgLy8gV2lyZSB1cCBzdWJzY3JpYmVycyB0byB1cGRhdGUgbG9hZGVyRGF0YSBhcyBwcm9taXNlcyBzZXR0bGUKCiAgICBhY3RpdmVEZWZlcnJlZHMuZm9yRWFjaCgoZGVmZXJyZWREYXRhLCByb3V0ZUlkKSA9PiB7CiAgICAgIGRlZmVycmVkRGF0YS5zdWJzY3JpYmUoYWJvcnRlZCA9PiB7CiAgICAgICAgLy8gTm90ZTogTm8gbmVlZCB0byB1cGRhdGVTdGF0ZSBoZXJlIHNpbmNlIHRoZSBUcmFja2VkUHJvbWlzZSBvbgogICAgICAgIC8vIGxvYWRlckRhdGEgaXMgc3RhYmxlIGFjcm9zcyByZXNvbHZlL3JlamVjdAogICAgICAgIC8vIFJlbW92ZSB0aGlzIGluc3RhbmNlIGlmIHdlIHdlcmUgYWJvcnRlZCBvciBpZiBwcm9taXNlcyBoYXZlIHNldHRsZWQKICAgICAgICBpZiAoYWJvcnRlZCB8fCBkZWZlcnJlZERhdGEuZG9uZSkgewogICAgICAgICAgYWN0aXZlRGVmZXJyZWRzLmRlbGV0ZShyb3V0ZUlkKTsKICAgICAgICB9CiAgICAgIH0pOwogICAgfSk7CiAgICBtYXJrRmV0Y2hSZWRpcmVjdHNEb25lKCk7CiAgICBsZXQgZGlkQWJvcnRGZXRjaExvYWRzID0gYWJvcnRTdGFsZUZldGNoTG9hZHMocGVuZGluZ05hdmlnYXRpb25Mb2FkSWQpOwogICAgcmV0dXJuIF9leHRlbmRzKHsKICAgICAgbG9hZGVyRGF0YSwKICAgICAgZXJyb3JzCiAgICB9LCBkaWRBYm9ydEZldGNoTG9hZHMgfHwgcmV2YWxpZGF0aW5nRmV0Y2hlcnMubGVuZ3RoID4gMCA/IHsKICAgICAgZmV0Y2hlcnM6IG5ldyBNYXAoc3RhdGUuZmV0Y2hlcnMpCiAgICB9IDoge30pOwogIH0KCiAgZnVuY3Rpb24gZ2V0RmV0Y2hlcihrZXkpIHsKICAgIHJldHVybiBzdGF0ZS5mZXRjaGVycy5nZXQoa2V5KSB8fCBJRExFX0ZFVENIRVI7CiAgfSAvLyBUcmlnZ2VyIGEgZmV0Y2hlciBsb2FkL3N1Ym1pdCBmb3IgdGhlIGdpdmVuIGZldGNoZXIga2V5CgoKICBmdW5jdGlvbiBmZXRjaChrZXksIHJvdXRlSWQsIGhyZWYsIG9wdHMpIHsKICAgIGlmIChpc1NlcnZlcikgewogICAgICB0aHJvdyBuZXcgRXJyb3IoInJvdXRlci5mZXRjaCgpIHdhcyBjYWxsZWQgZHVyaW5nIHRoZSBzZXJ2ZXIgcmVuZGVyLCBidXQgaXQgc2hvdWxkbid0IGJlLiAiICsgIllvdSBhcmUgbGlrZWx5IGNhbGxpbmcgYSB1c2VGZXRjaGVyKCkgbWV0aG9kIGluIHRoZSBib2R5IG9mIHlvdXIgY29tcG9uZW50LiAiICsgIlRyeSBtb3ZpbmcgaXQgdG8gYSB1c2VFZmZlY3Qgb3IgYSBjYWxsYmFjay4iKTsKICAgIH0KCiAgICBpZiAoZmV0Y2hDb250cm9sbGVycy5oYXMoa2V5KSkgYWJvcnRGZXRjaGVyKGtleSk7CiAgICBsZXQgbWF0Y2hlcyA9IG1hdGNoUm91dGVzKGRhdGFSb3V0ZXMsIGhyZWYsIGluaXQuYmFzZW5hbWUpOwoKICAgIGlmICghbWF0Y2hlcykgewogICAgICBzZXRGZXRjaGVyRXJyb3Ioa2V5LCByb3V0ZUlkLCBuZXcgRXJyb3JSZXNwb25zZSg0MDQsICJOb3QgRm91bmQiLCBudWxsKSk7CiAgICAgIHJldHVybjsKICAgIH0KCiAgICBsZXQgewogICAgICBwYXRoLAogICAgICBzdWJtaXNzaW9uCiAgICB9ID0gbm9ybWFsaXplTmF2aWdhdGVPcHRpb25zKGhyZWYsIG9wdHMsIHRydWUpOwogICAgbGV0IG1hdGNoID0gZ2V0VGFyZ2V0TWF0Y2gobWF0Y2hlcywgcGF0aCk7CgogICAgaWYgKHN1Ym1pc3Npb24pIHsKICAgICAgaGFuZGxlRmV0Y2hlckFjdGlvbihrZXksIHJvdXRlSWQsIHBhdGgsIG1hdGNoLCBtYXRjaGVzLCBzdWJtaXNzaW9uKTsKICAgICAgcmV0dXJuOwogICAgfSAvLyBTdG9yZSBvZmYgdGhlIG1hdGNoIHNvIHdlIGNhbiBjYWxsIGl0J3Mgc2hvdWxkUmV2YWxpZGF0ZSBvbiBzdWJzZXF1ZW50CiAgICAvLyByZXZhbGlkYXRpb25zCgoKICAgIGZldGNoTG9hZE1hdGNoZXMuc2V0KGtleSwgW3BhdGgsIG1hdGNoLCBtYXRjaGVzXSk7CiAgICBoYW5kbGVGZXRjaGVyTG9hZGVyKGtleSwgcm91dGVJZCwgcGF0aCwgbWF0Y2gsIG1hdGNoZXMpOwogIH0gLy8gQ2FsbCB0aGUgYWN0aW9uIGZvciB0aGUgbWF0Y2hlZCBmZXRjaGVyLnN1Ym1pdCgpLCBhbmQgdGhlbiBoYW5kbGUgcmVkaXJlY3RzLAogIC8vIGVycm9ycywgYW5kIHJldmFsaWRhdGlvbgoKCiAgYXN5bmMgZnVuY3Rpb24gaGFuZGxlRmV0Y2hlckFjdGlvbihrZXksIHJvdXRlSWQsIHBhdGgsIG1hdGNoLCByZXF1ZXN0TWF0Y2hlcywgc3VibWlzc2lvbikgewogICAgaW50ZXJydXB0QWN0aXZlTG9hZHMoKTsKICAgIGZldGNoTG9hZE1hdGNoZXMuZGVsZXRlKGtleSk7CgogICAgaWYgKCFtYXRjaC5yb3V0ZS5hY3Rpb24pIHsKICAgICAgbGV0IHsKICAgICAgICBlcnJvcgogICAgICB9ID0gZ2V0TWV0aG9kTm90QWxsb3dlZFJlc3VsdChwYXRoKTsKICAgICAgc2V0RmV0Y2hlckVycm9yKGtleSwgcm91dGVJZCwgZXJyb3IpOwogICAgICByZXR1cm47CiAgICB9IC8vIFB1dCB0aGlzIGZldGNoZXIgaW50byBpdCdzIHN1Ym1pdHRpbmcgc3RhdGUKCgogICAgbGV0IGV4aXN0aW5nRmV0Y2hlciA9IHN0YXRlLmZldGNoZXJzLmdldChrZXkpOwoKICAgIGxldCBmZXRjaGVyID0gX2V4dGVuZHMoewogICAgICBzdGF0ZTogInN1Ym1pdHRpbmciCiAgICB9LCBzdWJtaXNzaW9uLCB7CiAgICAgIGRhdGE6IGV4aXN0aW5nRmV0Y2hlciAmJiBleGlzdGluZ0ZldGNoZXIuZGF0YQogICAgfSk7CgogICAgc3RhdGUuZmV0Y2hlcnMuc2V0KGtleSwgZmV0Y2hlcik7CiAgICB1cGRhdGVTdGF0ZSh7CiAgICAgIGZldGNoZXJzOiBuZXcgTWFwKHN0YXRlLmZldGNoZXJzKQogICAgfSk7IC8vIENhbGwgdGhlIGFjdGlvbiBmb3IgdGhlIGZldGNoZXIKCiAgICBsZXQgYWJvcnRDb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpOwogICAgbGV0IGZldGNoUmVxdWVzdCA9IGNyZWF0ZVJlcXVlc3QocGF0aCwgYWJvcnRDb250cm9sbGVyLnNpZ25hbCwgc3VibWlzc2lvbik7CiAgICBmZXRjaENvbnRyb2xsZXJzLnNldChrZXksIGFib3J0Q29udHJvbGxlcik7CiAgICBsZXQgYWN0aW9uUmVzdWx0ID0gYXdhaXQgY2FsbExvYWRlck9yQWN0aW9uKCJhY3Rpb24iLCBmZXRjaFJlcXVlc3QsIG1hdGNoLCByZXF1ZXN0TWF0Y2hlcywgcm91dGVyLmJhc2VuYW1lKTsKCiAgICBpZiAoZmV0Y2hSZXF1ZXN0LnNpZ25hbC5hYm9ydGVkKSB7CiAgICAgIC8vIFdlIGNhbiBkZWxldGUgdGhpcyBzbyBsb25nIGFzIHdlIHdlcmVuJ3QgYWJvcnRlZCBieSBvdSBvdXIgb3duIGZldGNoZXIKICAgICAgLy8gcmUtc3VibWl0IHdoaWNoIHdvdWxkIGhhdmUgcHV0IF9uZXdfIGNvbnRyb2xsZXIgaXMgaW4gZmV0Y2hDb250cm9sbGVycwogICAgICBpZiAoZmV0Y2hDb250cm9sbGVycy5nZXQoa2V5KSA9PT0gYWJvcnRDb250cm9sbGVyKSB7CiAgICAgICAgZmV0Y2hDb250cm9sbGVycy5kZWxldGUoa2V5KTsKICAgICAgfQoKICAgICAgcmV0dXJuOwogICAgfQoKICAgIGlmIChpc1JlZGlyZWN0UmVzdWx0KGFjdGlvblJlc3VsdCkpIHsKICAgICAgZmV0Y2hDb250cm9sbGVycy5kZWxldGUoa2V5KTsKICAgICAgZmV0Y2hSZWRpcmVjdElkcy5hZGQoa2V5KTsKCiAgICAgIGxldCBsb2FkaW5nRmV0Y2hlciA9IF9leHRlbmRzKHsKICAgICAgICBzdGF0ZTogImxvYWRpbmciCiAgICAgIH0sIHN1Ym1pc3Npb24sIHsKICAgICAgICBkYXRhOiB1bmRlZmluZWQKICAgICAgfSk7CgogICAgICBzdGF0ZS5mZXRjaGVycy5zZXQoa2V5LCBsb2FkaW5nRmV0Y2hlcik7CiAgICAgIHVwZGF0ZVN0YXRlKHsKICAgICAgICBmZXRjaGVyczogbmV3IE1hcChzdGF0ZS5mZXRjaGVycykKICAgICAgfSk7CgogICAgICBsZXQgcmVkaXJlY3ROYXZpZ2F0aW9uID0gX2V4dGVuZHMoewogICAgICAgIHN0YXRlOiAibG9hZGluZyIsCiAgICAgICAgbG9jYXRpb246IGNyZWF0ZUxvY2F0aW9uKHN0YXRlLmxvY2F0aW9uLCBhY3Rpb25SZXN1bHQubG9jYXRpb24pCiAgICAgIH0sIHN1Ym1pc3Npb24pOwoKICAgICAgYXdhaXQgc3RhcnRSZWRpcmVjdE5hdmlnYXRpb24oYWN0aW9uUmVzdWx0LCByZWRpcmVjdE5hdmlnYXRpb24pOwogICAgICByZXR1cm47CiAgICB9IC8vIFByb2Nlc3MgYW55IG5vbi1yZWRpcmVjdCBlcnJvcnMgdGhyb3duCgoKICAgIGlmIChpc0Vycm9yUmVzdWx0KGFjdGlvblJlc3VsdCkpIHsKICAgICAgc2V0RmV0Y2hlckVycm9yKGtleSwgcm91dGVJZCwgYWN0aW9uUmVzdWx0LmVycm9yKTsKICAgICAgcmV0dXJuOwogICAgfQoKICAgIGlmIChpc0RlZmVycmVkUmVzdWx0KGFjdGlvblJlc3VsdCkpIHsKICAgICAgcm91dGVyX2ludmFyaWFudChmYWxzZSwgImRlZmVyKCkgaXMgbm90IHN1cHBvcnRlZCBpbiBhY3Rpb25zIik7CiAgICB9IC8vIFN0YXJ0IHRoZSBkYXRhIGxvYWQgZm9yIGN1cnJlbnQgbWF0Y2hlcywgb3IgdGhlIG5leHQgbG9jYXRpb24gaWYgd2UncmUKICAgIC8vIGluIHRoZSBtaWRkbGUgb2YgYSBuYXZpZ2F0aW9uCgoKICAgIGxldCBuZXh0TG9jYXRpb24gPSBzdGF0ZS5uYXZpZ2F0aW9uLmxvY2F0aW9uIHx8IHN0YXRlLmxvY2F0aW9uOwogICAgbGV0IHJldmFsaWRhdGlvblJlcXVlc3QgPSBjcmVhdGVSZXF1ZXN0KG5leHRMb2NhdGlvbiwgYWJvcnRDb250cm9sbGVyLnNpZ25hbCk7CiAgICBsZXQgbWF0Y2hlcyA9IHN0YXRlLm5hdmlnYXRpb24uc3RhdGUgIT09ICJpZGxlIiA/IG1hdGNoUm91dGVzKGRhdGFSb3V0ZXMsIHN0YXRlLm5hdmlnYXRpb24ubG9jYXRpb24sIGluaXQuYmFzZW5hbWUpIDogc3RhdGUubWF0Y2hlczsKICAgIHJvdXRlcl9pbnZhcmlhbnQobWF0Y2hlcywgIkRpZG4ndCBmaW5kIGFueSBtYXRjaGVzIGFmdGVyIGZldGNoZXIgYWN0aW9uIik7CiAgICBsZXQgbG9hZElkID0gKytpbmNyZW1lbnRpbmdMb2FkSWQ7CiAgICBmZXRjaFJlbG9hZElkcy5zZXQoa2V5LCBsb2FkSWQpOwoKICAgIGxldCBsb2FkRmV0Y2hlciA9IF9leHRlbmRzKHsKICAgICAgc3RhdGU6ICJsb2FkaW5nIiwKICAgICAgZGF0YTogYWN0aW9uUmVzdWx0LmRhdGEKICAgIH0sIHN1Ym1pc3Npb24pOwoKICAgIHN0YXRlLmZldGNoZXJzLnNldChrZXksIGxvYWRGZXRjaGVyKTsKICAgIGxldCBbbWF0Y2hlc1RvTG9hZCwgcmV2YWxpZGF0aW5nRmV0Y2hlcnNdID0gZ2V0TWF0Y2hlc1RvTG9hZChzdGF0ZSwgbWF0Y2hlcywgc3VibWlzc2lvbiwgbmV4dExvY2F0aW9uLCBpc1JldmFsaWRhdGlvblJlcXVpcmVkLCBjYW5jZWxsZWREZWZlcnJlZFJvdXRlcywgY2FuY2VsbGVkRmV0Y2hlckxvYWRzLCB7CiAgICAgIFttYXRjaC5yb3V0ZS5pZF06IGFjdGlvblJlc3VsdC5kYXRhCiAgICB9LCB1bmRlZmluZWQsIC8vIE5vIG5lZWQgdG8gc2VuZCB0aHJvdWdoIGVycm9ycyBzaW5jZSB3ZSBzaG9ydCBjaXJjdWl0IGFib3ZlCiAgICBmZXRjaExvYWRNYXRjaGVzKTsgLy8gUHV0IGFsbCByZXZhbGlkYXRpbmcgZmV0Y2hlcnMgaW50byB0aGUgbG9hZGluZyBzdGF0ZSwgZXhjZXB0IGZvciB0aGUKICAgIC8vIGN1cnJlbnQgZmV0Y2hlciB3aGljaCB3ZSB3YW50IHRvIGtlZXAgaW4gaXQncyBjdXJyZW50IGxvYWRpbmcgc3RhdGUgd2hpY2gKICAgIC8vIGNvbnRhaW5zIGl0J3MgYWN0aW9uIHN1Ym1pc3Npb24gaW5mbyArIGFjdGlvbiBkYXRhCgogICAgcmV2YWxpZGF0aW5nRmV0Y2hlcnMuZmlsdGVyKF9yZWY1ID0+IHsKICAgICAgbGV0IFtzdGFsZUtleV0gPSBfcmVmNTsKICAgICAgcmV0dXJuIHN0YWxlS2V5ICE9PSBrZXk7CiAgICB9KS5mb3JFYWNoKF9yZWY2ID0+IHsKICAgICAgbGV0IFtzdGFsZUtleV0gPSBfcmVmNjsKICAgICAgbGV0IGV4aXN0aW5nRmV0Y2hlciA9IHN0YXRlLmZldGNoZXJzLmdldChzdGFsZUtleSk7CiAgICAgIGxldCByZXZhbGlkYXRpbmdGZXRjaGVyID0gewogICAgICAgIHN0YXRlOiAibG9hZGluZyIsCiAgICAgICAgZGF0YTogZXhpc3RpbmdGZXRjaGVyICYmIGV4aXN0aW5nRmV0Y2hlci5kYXRhLAogICAgICAgIGZvcm1NZXRob2Q6IHVuZGVmaW5lZCwKICAgICAgICBmb3JtQWN0aW9uOiB1bmRlZmluZWQsCiAgICAgICAgZm9ybUVuY1R5cGU6IHVuZGVmaW5lZCwKICAgICAgICBmb3JtRGF0YTogdW5kZWZpbmVkCiAgICAgIH07CiAgICAgIHN0YXRlLmZldGNoZXJzLnNldChzdGFsZUtleSwgcmV2YWxpZGF0aW5nRmV0Y2hlcik7CiAgICAgIGZldGNoQ29udHJvbGxlcnMuc2V0KHN0YWxlS2V5LCBhYm9ydENvbnRyb2xsZXIpOwogICAgfSk7CiAgICB1cGRhdGVTdGF0ZSh7CiAgICAgIGZldGNoZXJzOiBuZXcgTWFwKHN0YXRlLmZldGNoZXJzKQogICAgfSk7CiAgICBsZXQgewogICAgICByZXN1bHRzLAogICAgICBsb2FkZXJSZXN1bHRzLAogICAgICBmZXRjaGVyUmVzdWx0cwogICAgfSA9IGF3YWl0IGNhbGxMb2FkZXJzQW5kTWF5YmVSZXNvbHZlRGF0YShzdGF0ZS5tYXRjaGVzLCBtYXRjaGVzLCBtYXRjaGVzVG9Mb2FkLCByZXZhbGlkYXRpbmdGZXRjaGVycywgcmV2YWxpZGF0aW9uUmVxdWVzdCk7CgogICAgaWYgKGFib3J0Q29udHJvbGxlci5zaWduYWwuYWJvcnRlZCkgewogICAgICByZXR1cm47CiAgICB9CgogICAgZmV0Y2hSZWxvYWRJZHMuZGVsZXRlKGtleSk7CiAgICBmZXRjaENvbnRyb2xsZXJzLmRlbGV0ZShrZXkpOwogICAgcmV2YWxpZGF0aW5nRmV0Y2hlcnMuZm9yRWFjaChfcmVmNyA9PiB7CiAgICAgIGxldCBbc3RhbGVLZXldID0gX3JlZjc7CiAgICAgIHJldHVybiBmZXRjaENvbnRyb2xsZXJzLmRlbGV0ZShzdGFsZUtleSk7CiAgICB9KTsKICAgIGxldCByZWRpcmVjdCA9IGZpbmRSZWRpcmVjdChyZXN1bHRzKTsKCiAgICBpZiAocmVkaXJlY3QpIHsKICAgICAgbGV0IHJlZGlyZWN0TmF2aWdhdGlvbiA9IGdldExvYWRlclJlZGlyZWN0KHN0YXRlLCByZWRpcmVjdCk7CiAgICAgIGF3YWl0IHN0YXJ0UmVkaXJlY3ROYXZpZ2F0aW9uKHJlZGlyZWN0LCByZWRpcmVjdE5hdmlnYXRpb24pOwogICAgICByZXR1cm47CiAgICB9IC8vIFByb2Nlc3MgYW5kIGNvbW1pdCBvdXRwdXQgZnJvbSBsb2FkZXJzCgoKICAgIGxldCB7CiAgICAgIGxvYWRlckRhdGEsCiAgICAgIGVycm9ycwogICAgfSA9IHByb2Nlc3NMb2FkZXJEYXRhKHN0YXRlLCBzdGF0ZS5tYXRjaGVzLCBtYXRjaGVzVG9Mb2FkLCBsb2FkZXJSZXN1bHRzLCB1bmRlZmluZWQsIHJldmFsaWRhdGluZ0ZldGNoZXJzLCBmZXRjaGVyUmVzdWx0cywgYWN0aXZlRGVmZXJyZWRzKTsKICAgIGxldCBkb25lRmV0Y2hlciA9IHsKICAgICAgc3RhdGU6ICJpZGxlIiwKICAgICAgZGF0YTogYWN0aW9uUmVzdWx0LmRhdGEsCiAgICAgIGZvcm1NZXRob2Q6IHVuZGVmaW5lZCwKICAgICAgZm9ybUFjdGlvbjogdW5kZWZpbmVkLAogICAgICBmb3JtRW5jVHlwZTogdW5kZWZpbmVkLAogICAgICBmb3JtRGF0YTogdW5kZWZpbmVkCiAgICB9OwogICAgc3RhdGUuZmV0Y2hlcnMuc2V0KGtleSwgZG9uZUZldGNoZXIpOwogICAgbGV0IGRpZEFib3J0RmV0Y2hMb2FkcyA9IGFib3J0U3RhbGVGZXRjaExvYWRzKGxvYWRJZCk7IC8vIElmIHdlIGFyZSBjdXJyZW50bHkgaW4gYSBuYXZpZ2F0aW9uIGxvYWRpbmcgc3RhdGUgYW5kIHRoaXMgZmV0Y2hlciBpcwogICAgLy8gbW9yZSByZWNlbnQgdGhhbiB0aGUgbmF2aWdhdGlvbiwgd2Ugd2FudCB0aGUgbmV3ZXIgZGF0YSBzbyBhYm9ydCB0aGUKICAgIC8vIG5hdmlnYXRpb24gYW5kIGNvbXBsZXRlIGl0IHdpdGggdGhlIGZldGNoZXIgZGF0YQoKICAgIGlmIChzdGF0ZS5uYXZpZ2F0aW9uLnN0YXRlID09PSAibG9hZGluZyIgJiYgbG9hZElkID4gcGVuZGluZ05hdmlnYXRpb25Mb2FkSWQpIHsKICAgICAgcm91dGVyX2ludmFyaWFudChwZW5kaW5nQWN0aW9uLCAiRXhwZWN0ZWQgcGVuZGluZyBhY3Rpb24iKTsKICAgICAgcGVuZGluZ05hdmlnYXRpb25Db250cm9sbGVyICYmIHBlbmRpbmdOYXZpZ2F0aW9uQ29udHJvbGxlci5hYm9ydCgpOwogICAgICBjb21wbGV0ZU5hdmlnYXRpb24oc3RhdGUubmF2aWdhdGlvbi5sb2NhdGlvbiwgewogICAgICAgIG1hdGNoZXMsCiAgICAgICAgbG9hZGVyRGF0YSwKICAgICAgICBlcnJvcnMsCiAgICAgICAgZmV0Y2hlcnM6IG5ldyBNYXAoc3RhdGUuZmV0Y2hlcnMpCiAgICAgIH0pOwogICAgfSBlbHNlIHsKICAgICAgLy8gb3RoZXJ3aXNlIGp1c3QgdXBkYXRlIHdpdGggdGhlIGZldGNoZXIgZGF0YSwgcHJlc2VydmluZyBhbnkgZXhpc3RpbmcKICAgICAgLy8gbG9hZGVyRGF0YSBmb3IgbG9hZGVycyB0aGF0IGRpZCBub3QgbmVlZCB0byByZWxvYWQuICBXZSBoYXZlIHRvCiAgICAgIC8vIG1hbnVhbGx5IG1lcmdlIGhlcmUgc2luY2Ugd2UgYXJlbid0IGdvaW5nIHRocm91Z2ggY29tcGxldGVOYXZpZ2F0aW9uCiAgICAgIHVwZGF0ZVN0YXRlKF9leHRlbmRzKHsKICAgICAgICBlcnJvcnMsCiAgICAgICAgbG9hZGVyRGF0YTogbWVyZ2VMb2FkZXJEYXRhKHN0YXRlLmxvYWRlckRhdGEsIGxvYWRlckRhdGEsIG1hdGNoZXMpCiAgICAgIH0sIGRpZEFib3J0RmV0Y2hMb2FkcyA/IHsKICAgICAgICBmZXRjaGVyczogbmV3IE1hcChzdGF0ZS5mZXRjaGVycykKICAgICAgfSA6IHt9KSk7CiAgICAgIGlzUmV2YWxpZGF0aW9uUmVxdWlyZWQgPSBmYWxzZTsKICAgIH0KICB9IC8vIENhbGwgdGhlIG1hdGNoZWQgbG9hZGVyIGZvciBmZXRjaGVyLmxvYWQoKSwgaGFuZGxpbmcgcmVkaXJlY3RzLCBlcnJvcnMsIGV0Yy4KCgogIGFzeW5jIGZ1bmN0aW9uIGhhbmRsZUZldGNoZXJMb2FkZXIoa2V5LCByb3V0ZUlkLCBwYXRoLCBtYXRjaCwgbWF0Y2hlcykgewogICAgbGV0IGV4aXN0aW5nRmV0Y2hlciA9IHN0YXRlLmZldGNoZXJzLmdldChrZXkpOyAvLyBQdXQgdGhpcyBmZXRjaGVyIGludG8gaXQncyBsb2FkaW5nIHN0YXRlCgogICAgbGV0IGxvYWRpbmdGZXRjaGVyID0gewogICAgICBzdGF0ZTogImxvYWRpbmciLAogICAgICBmb3JtTWV0aG9kOiB1bmRlZmluZWQsCiAgICAgIGZvcm1BY3Rpb246IHVuZGVmaW5lZCwKICAgICAgZm9ybUVuY1R5cGU6IHVuZGVmaW5lZCwKICAgICAgZm9ybURhdGE6IHVuZGVmaW5lZCwKICAgICAgZGF0YTogZXhpc3RpbmdGZXRjaGVyICYmIGV4aXN0aW5nRmV0Y2hlci5kYXRhCiAgICB9OwogICAgc3RhdGUuZmV0Y2hlcnMuc2V0KGtleSwgbG9hZGluZ0ZldGNoZXIpOwogICAgdXBkYXRlU3RhdGUoewogICAgICBmZXRjaGVyczogbmV3IE1hcChzdGF0ZS5mZXRjaGVycykKICAgIH0pOyAvLyBDYWxsIHRoZSBsb2FkZXIgZm9yIHRoaXMgZmV0Y2hlciByb3V0ZSBtYXRjaAoKICAgIGxldCBhYm9ydENvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7CiAgICBsZXQgZmV0Y2hSZXF1ZXN0ID0gY3JlYXRlUmVxdWVzdChwYXRoLCBhYm9ydENvbnRyb2xsZXIuc2lnbmFsKTsKICAgIGZldGNoQ29udHJvbGxlcnMuc2V0KGtleSwgYWJvcnRDb250cm9sbGVyKTsKICAgIGxldCByZXN1bHQgPSBhd2FpdCBjYWxsTG9hZGVyT3JBY3Rpb24oImxvYWRlciIsIGZldGNoUmVxdWVzdCwgbWF0Y2gsIG1hdGNoZXMsIHJvdXRlci5iYXNlbmFtZSk7IC8vIERlZmVycmVkIGlzbid0IHN1cHBvcnRlZCBvciBmZXRjaGVyIGxvYWRzLCBhd2FpdCBldmVyeXRoaW5nIGFuZCB0cmVhdCBpdAogICAgLy8gYXMgYSBub3JtYWwgbG9hZC4gIHJlc29sdmVEZWZlcnJlZERhdGEgd2lsbCByZXR1cm4gdW5kZWZpbmVkIGlmIHRoaXMKICAgIC8vIGZldGNoZXIgZ2V0cyBhYm9ydGVkLCBzbyB3ZSBqdXN0IGxlYXZlIHJlc3VsdCB1bnRvdWNoZWQgYW5kIHNob3J0IGNpcmN1aXQKICAgIC8vIGJlbG93IGlmIHRoYXQgaGFwcGVucwoKICAgIGlmIChpc0RlZmVycmVkUmVzdWx0KHJlc3VsdCkpIHsKICAgICAgcmVzdWx0ID0gKGF3YWl0IHJlc29sdmVEZWZlcnJlZERhdGEocmVzdWx0LCBmZXRjaFJlcXVlc3Quc2lnbmFsLCB0cnVlKSkgfHwgcmVzdWx0OwogICAgfSAvLyBXZSBjYW4gZGVsZXRlIHRoaXMgc28gbG9uZyBhcyB3ZSB3ZXJlbid0IGFib3J0ZWQgYnkgb3Ugb3VyIG93biBmZXRjaGVyCiAgICAvLyByZS1sb2FkIHdoaWNoIHdvdWxkIGhhdmUgcHV0IF9uZXdfIGNvbnRyb2xsZXIgaXMgaW4gZmV0Y2hDb250cm9sbGVycwoKCiAgICBpZiAoZmV0Y2hDb250cm9sbGVycy5nZXQoa2V5KSA9PT0gYWJvcnRDb250cm9sbGVyKSB7CiAgICAgIGZldGNoQ29udHJvbGxlcnMuZGVsZXRlKGtleSk7CiAgICB9CgogICAgaWYgKGZldGNoUmVxdWVzdC5zaWduYWwuYWJvcnRlZCkgewogICAgICByZXR1cm47CiAgICB9IC8vIElmIHRoZSBsb2FkZXIgdGhyZXcgYSByZWRpcmVjdCBSZXNwb25zZSwgc3RhcnQgYSBuZXcgUkVQTEFDRSBuYXZpZ2F0aW9uCgoKICAgIGlmIChpc1JlZGlyZWN0UmVzdWx0KHJlc3VsdCkpIHsKICAgICAgbGV0IHJlZGlyZWN0TmF2aWdhdGlvbiA9IGdldExvYWRlclJlZGlyZWN0KHN0YXRlLCByZXN1bHQpOwogICAgICBhd2FpdCBzdGFydFJlZGlyZWN0TmF2aWdhdGlvbihyZXN1bHQsIHJlZGlyZWN0TmF2aWdhdGlvbik7CiAgICAgIHJldHVybjsKICAgIH0gLy8gUHJvY2VzcyBhbnkgbm9uLXJlZGlyZWN0IGVycm9ycyB0aHJvd24KCgogICAgaWYgKGlzRXJyb3JSZXN1bHQocmVzdWx0KSkgewogICAgICBsZXQgYm91bmRhcnlNYXRjaCA9IGZpbmROZWFyZXN0Qm91bmRhcnkoc3RhdGUubWF0Y2hlcywgcm91dGVJZCk7CiAgICAgIHN0YXRlLmZldGNoZXJzLmRlbGV0ZShrZXkpOyAvLyBUT0RPOiBJbiByZW1peCwgdGhpcyB3b3VsZCByZXNldCB0byBJRExFX05BVklHQVRJT04gaWYgaXQgd2FzIGEgY2F0Y2ggLQogICAgICAvLyBkbyB3ZSBuZWVkIHRvIGJlaGF2ZSBhbnkgZGlmZmVyZW50bHkgd2l0aCBvdXIgbm9uLXJlZGlyZWN0IGVycm9ycz8KICAgICAgLy8gV2hhdCBpZiBpdCB3YXMgYSBub24tcmVkaXJlY3QgUmVzcG9uc2U/CgogICAgICB1cGRhdGVTdGF0ZSh7CiAgICAgICAgZmV0Y2hlcnM6IG5ldyBNYXAoc3RhdGUuZmV0Y2hlcnMpLAogICAgICAgIGVycm9yczogewogICAgICAgICAgW2JvdW5kYXJ5TWF0Y2gucm91dGUuaWRdOiByZXN1bHQuZXJyb3IKICAgICAgICB9CiAgICAgIH0pOwogICAgICByZXR1cm47CiAgICB9CgogICAgcm91dGVyX2ludmFyaWFudCghaXNEZWZlcnJlZFJlc3VsdChyZXN1bHQpLCAiVW5oYW5kbGVkIGZldGNoZXIgZGVmZXJyZWQgZGF0YSIpOyAvLyBQdXQgdGhlIGZldGNoZXIgYmFjayBpbnRvIGFuIGlkbGUgc3RhdGUKCiAgICBsZXQgZG9uZUZldGNoZXIgPSB7CiAgICAgIHN0YXRlOiAiaWRsZSIsCiAgICAgIGRhdGE6IHJlc3VsdC5kYXRhLAogICAgICBmb3JtTWV0aG9kOiB1bmRlZmluZWQsCiAgICAgIGZvcm1BY3Rpb246IHVuZGVmaW5lZCwKICAgICAgZm9ybUVuY1R5cGU6IHVuZGVmaW5lZCwKICAgICAgZm9ybURhdGE6IHVuZGVmaW5lZAogICAgfTsKICAgIHN0YXRlLmZldGNoZXJzLnNldChrZXksIGRvbmVGZXRjaGVyKTsKICAgIHVwZGF0ZVN0YXRlKHsKICAgICAgZmV0Y2hlcnM6IG5ldyBNYXAoc3RhdGUuZmV0Y2hlcnMpCiAgICB9KTsKICB9CiAgLyoqCiAgICogVXRpbGl0eSBmdW5jdGlvbiB0byBoYW5kbGUgcmVkaXJlY3RzIHJldHVybmVkIGZyb20gYW4gYWN0aW9uIG9yIGxvYWRlci4KICAgKiBOb3JtYWxseSwgYSByZWRpcmVjdCAicmVwbGFjZXMiIHRoZSBuYXZpZ2F0aW9uIHRoYXQgdHJpZ2dlcmVkIGl0LiAgU28sIGZvcgogICAqIGV4YW1wbGU6CiAgICoKICAgKiAgLSB1c2VyIGlzIG9uIC9hCiAgICogIC0gdXNlciBjbGlja3MgYSBsaW5rIHRvIC9iCiAgICogIC0gbG9hZGVyIGZvciAvYiByZWRpcmVjdHMgdG8gL2MKICAgKgogICAqIEluIGEgbm9uLUpTIGFwcCB0aGUgYnJvd3NlciB3b3VsZCB0cmFjayB0aGUgaW4tZmxpZ2h0IG5hdmlnYXRpb24gdG8gL2IgYW5kCiAgICogdGhlbiByZXBsYWNlIGl0IHdpdGggL2Mgd2hlbiBpdCBlbmNvdW50ZXJlZCB0aGUgcmVkaXJlY3QgcmVzcG9uc2UuICBJbgogICAqIHRoZSBlbmQgaXQgd291bGQgb25seSBldmVyIHVwZGF0ZSB0aGUgVVJMIGJhciB3aXRoIC9jLgogICAqCiAgICogSW4gY2xpZW50LXNpZGUgcm91dGluZyB1c2luZyBwdXNoU3RhdGUvcmVwbGFjZVN0YXRlLCB3ZSBhaW0gdG8gZW11bGF0ZQogICAqIHRoaXMgYmVoYXZpb3IgYW5kIHdlIGFsc28gZG8gbm90IHVwZGF0ZSBoaXN0b3J5IHVudGlsIHRoZSBlbmQgb2YgdGhlCiAgICogbmF2aWdhdGlvbiAoaW5jbHVkaW5nIHByb2Nlc3NlZCByZWRpcmVjdHMpLiAgVGhpcyBtZWFucyB0aGF0IHdlIG5ldmVyCiAgICogYWN0dWFsbHkgdG91Y2ggaGlzdG9yeSB1bnRpbCB3ZSd2ZSBwcm9jZXNzZWQgcmVkaXJlY3RzLCBzbyB3ZSBqdXN0IHVzZQogICAqIHRoZSBoaXN0b3J5IGFjdGlvbiBmcm9tIHRoZSBvcmlnaW5hbCBuYXZpZ2F0aW9uIChQVVNIIG9yIFJFUExBQ0UpLgogICAqLwoKCiAgYXN5bmMgZnVuY3Rpb24gc3RhcnRSZWRpcmVjdE5hdmlnYXRpb24ocmVkaXJlY3QsIG5hdmlnYXRpb24sIHJlcGxhY2UpIHsKICAgIGlmIChyZWRpcmVjdC5yZXZhbGlkYXRlKSB7CiAgICAgIGlzUmV2YWxpZGF0aW9uUmVxdWlyZWQgPSB0cnVlOwogICAgfQoKICAgIHJvdXRlcl9pbnZhcmlhbnQobmF2aWdhdGlvbi5sb2NhdGlvbiwgIkV4cGVjdGVkIGEgbG9jYXRpb24gb24gdGhlIHJlZGlyZWN0IG5hdmlnYXRpb24iKTsgLy8gVGhlcmUncyBubyBuZWVkIHRvIGFib3J0IG9uIHJlZGlyZWN0cywgc2luY2Ugd2UgZG9uJ3QgZGV0ZWN0IHRoZQogICAgLy8gcmVkaXJlY3QgdW50aWwgdGhlIGFjdGlvbi9sb2FkZXJzIGhhdmUgc2V0dGxlZAoKICAgIHBlbmRpbmdOYXZpZ2F0aW9uQ29udHJvbGxlciA9IG51bGw7CiAgICBsZXQgcmVkaXJlY3RIaXN0b3J5QWN0aW9uID0gcmVwbGFjZSA9PT0gdHJ1ZSA/IEFjdGlvbi5SZXBsYWNlIDogQWN0aW9uLlB1c2g7CiAgICBhd2FpdCBzdGFydE5hdmlnYXRpb24ocmVkaXJlY3RIaXN0b3J5QWN0aW9uLCBuYXZpZ2F0aW9uLmxvY2F0aW9uLCB7CiAgICAgIG92ZXJyaWRlTmF2aWdhdGlvbjogbmF2aWdhdGlvbgogICAgfSk7CiAgfQoKICBhc3luYyBmdW5jdGlvbiBjYWxsTG9hZGVyc0FuZE1heWJlUmVzb2x2ZURhdGEoY3VycmVudE1hdGNoZXMsIG1hdGNoZXMsIG1hdGNoZXNUb0xvYWQsIGZldGNoZXJzVG9Mb2FkLCByZXF1ZXN0KSB7CiAgICAvLyBDYWxsIGFsbCBuYXZpZ2F0aW9uIGxvYWRlcnMgYW5kIHJldmFsaWRhdGluZyBmZXRjaGVyIGxvYWRlcnMgaW4gcGFyYWxsZWwsCiAgICAvLyB0aGVuIHNsaWNlIG9mZiB0aGUgcmVzdWx0cyBpbnRvIHNlcGFyYXRlIGFycmF5cyBzbyB3ZSBjYW4gaGFuZGxlIHRoZW0KICAgIC8vIGFjY29yZGluZ2x5CiAgICBsZXQgcmVzdWx0cyA9IGF3YWl0IFByb21pc2UuYWxsKFsuLi5tYXRjaGVzVG9Mb2FkLm1hcChtYXRjaCA9PiBjYWxsTG9hZGVyT3JBY3Rpb24oImxvYWRlciIsIHJlcXVlc3QsIG1hdGNoLCBtYXRjaGVzLCByb3V0ZXIuYmFzZW5hbWUpKSwgLi4uZmV0Y2hlcnNUb0xvYWQubWFwKF9yZWY4ID0+IHsKICAgICAgbGV0IFssIGhyZWYsIG1hdGNoLCBmZXRjaE1hdGNoZXNdID0gX3JlZjg7CiAgICAgIHJldHVybiBjYWxsTG9hZGVyT3JBY3Rpb24oImxvYWRlciIsIGNyZWF0ZVJlcXVlc3QoaHJlZiwgcmVxdWVzdC5zaWduYWwpLCBtYXRjaCwgZmV0Y2hNYXRjaGVzLCByb3V0ZXIuYmFzZW5hbWUpOwogICAgfSldKTsKICAgIGxldCBsb2FkZXJSZXN1bHRzID0gcmVzdWx0cy5zbGljZSgwLCBtYXRjaGVzVG9Mb2FkLmxlbmd0aCk7CiAgICBsZXQgZmV0Y2hlclJlc3VsdHMgPSByZXN1bHRzLnNsaWNlKG1hdGNoZXNUb0xvYWQubGVuZ3RoKTsKICAgIGF3YWl0IFByb21pc2UuYWxsKFtyZXNvbHZlRGVmZXJyZWRSZXN1bHRzKGN1cnJlbnRNYXRjaGVzLCBtYXRjaGVzVG9Mb2FkLCBsb2FkZXJSZXN1bHRzLCByZXF1ZXN0LnNpZ25hbCwgZmFsc2UsIHN0YXRlLmxvYWRlckRhdGEpLCByZXNvbHZlRGVmZXJyZWRSZXN1bHRzKGN1cnJlbnRNYXRjaGVzLCBmZXRjaGVyc1RvTG9hZC5tYXAoX3JlZjkgPT4gewogICAgICBsZXQgWywsIG1hdGNoXSA9IF9yZWY5OwogICAgICByZXR1cm4gbWF0Y2g7CiAgICB9KSwgZmV0Y2hlclJlc3VsdHMsIHJlcXVlc3Quc2lnbmFsLCB0cnVlKV0pOwogICAgcmV0dXJuIHsKICAgICAgcmVzdWx0cywKICAgICAgbG9hZGVyUmVzdWx0cywKICAgICAgZmV0Y2hlclJlc3VsdHMKICAgIH07CiAgfQoKICBmdW5jdGlvbiBpbnRlcnJ1cHRBY3RpdmVMb2FkcygpIHsKICAgIC8vIEV2ZXJ5IGludGVycnVwdGlvbiB0cmlnZ2VycyBhIHJldmFsaWRhdGlvbgogICAgaXNSZXZhbGlkYXRpb25SZXF1aXJlZCA9IHRydWU7IC8vIENhbmNlbCBwZW5kaW5nIHJvdXRlLWxldmVsIGRlZmVycmVkcyBhbmQgbWFyayBjYW5jZWxsZWQgcm91dGVzIGZvcgogICAgLy8gcmV2YWxpZGF0aW9uCgogICAgY2FuY2VsbGVkRGVmZXJyZWRSb3V0ZXMucHVzaCguLi5jYW5jZWxBY3RpdmVEZWZlcnJlZHMoKSk7IC8vIEFib3J0IGluLWZsaWdodCBmZXRjaGVyIGxvYWRzCgogICAgZmV0Y2hMb2FkTWF0Y2hlcy5mb3JFYWNoKChfLCBrZXkpID0+IHsKICAgICAgaWYgKGZldGNoQ29udHJvbGxlcnMuaGFzKGtleSkpIHsKICAgICAgICBjYW5jZWxsZWRGZXRjaGVyTG9hZHMucHVzaChrZXkpOwogICAgICAgIGFib3J0RmV0Y2hlcihrZXkpOwogICAgICB9CiAgICB9KTsKICB9CgogIGZ1bmN0aW9uIHNldEZldGNoZXJFcnJvcihrZXksIHJvdXRlSWQsIGVycm9yKSB7CiAgICBsZXQgYm91bmRhcnlNYXRjaCA9IGZpbmROZWFyZXN0Qm91bmRhcnkoc3RhdGUubWF0Y2hlcywgcm91dGVJZCk7CiAgICBkZWxldGVGZXRjaGVyKGtleSk7CiAgICB1cGRhdGVTdGF0ZSh7CiAgICAgIGVycm9yczogewogICAgICAgIFtib3VuZGFyeU1hdGNoLnJvdXRlLmlkXTogZXJyb3IKICAgICAgfSwKICAgICAgZmV0Y2hlcnM6IG5ldyBNYXAoc3RhdGUuZmV0Y2hlcnMpCiAgICB9KTsKICB9CgogIGZ1bmN0aW9uIGRlbGV0ZUZldGNoZXIoa2V5KSB7CiAgICBpZiAoZmV0Y2hDb250cm9sbGVycy5oYXMoa2V5KSkgYWJvcnRGZXRjaGVyKGtleSk7CiAgICBmZXRjaExvYWRNYXRjaGVzLmRlbGV0ZShrZXkpOwogICAgZmV0Y2hSZWxvYWRJZHMuZGVsZXRlKGtleSk7CiAgICBmZXRjaFJlZGlyZWN0SWRzLmRlbGV0ZShrZXkpOwogICAgc3RhdGUuZmV0Y2hlcnMuZGVsZXRlKGtleSk7CiAgfQoKICBmdW5jdGlvbiBhYm9ydEZldGNoZXIoa2V5KSB7CiAgICBsZXQgY29udHJvbGxlciA9IGZldGNoQ29udHJvbGxlcnMuZ2V0KGtleSk7CiAgICByb3V0ZXJfaW52YXJpYW50KGNvbnRyb2xsZXIsICJFeHBlY3RlZCBmZXRjaCBjb250cm9sbGVyOiAiICsga2V5KTsKICAgIGNvbnRyb2xsZXIuYWJvcnQoKTsKICAgIGZldGNoQ29udHJvbGxlcnMuZGVsZXRlKGtleSk7CiAgfQoKICBmdW5jdGlvbiBtYXJrRmV0Y2hlcnNEb25lKGtleXMpIHsKICAgIGZvciAobGV0IGtleSBvZiBrZXlzKSB7CiAgICAgIGxldCBmZXRjaGVyID0gZ2V0RmV0Y2hlcihrZXkpOwogICAgICBsZXQgZG9uZUZldGNoZXIgPSB7CiAgICAgICAgc3RhdGU6ICJpZGxlIiwKICAgICAgICBkYXRhOiBmZXRjaGVyLmRhdGEsCiAgICAgICAgZm9ybU1ldGhvZDogdW5kZWZpbmVkLAogICAgICAgIGZvcm1BY3Rpb246IHVuZGVmaW5lZCwKICAgICAgICBmb3JtRW5jVHlwZTogdW5kZWZpbmVkLAogICAgICAgIGZvcm1EYXRhOiB1bmRlZmluZWQKICAgICAgfTsKICAgICAgc3RhdGUuZmV0Y2hlcnMuc2V0KGtleSwgZG9uZUZldGNoZXIpOwogICAgfQogIH0KCiAgZnVuY3Rpb24gbWFya0ZldGNoUmVkaXJlY3RzRG9uZSgpIHsKICAgIGxldCBkb25lS2V5cyA9IFtdOwoKICAgIGZvciAobGV0IGtleSBvZiBmZXRjaFJlZGlyZWN0SWRzKSB7CiAgICAgIGxldCBmZXRjaGVyID0gc3RhdGUuZmV0Y2hlcnMuZ2V0KGtleSk7CiAgICAgIHJvdXRlcl9pbnZhcmlhbnQoZmV0Y2hlciwgIkV4cGVjdGVkIGZldGNoZXI6ICIgKyBrZXkpOwoKICAgICAgaWYgKGZldGNoZXIuc3RhdGUgPT09ICJsb2FkaW5nIikgewogICAgICAgIGZldGNoUmVkaXJlY3RJZHMuZGVsZXRlKGtleSk7CiAgICAgICAgZG9uZUtleXMucHVzaChrZXkpOwogICAgICB9CiAgICB9CgogICAgbWFya0ZldGNoZXJzRG9uZShkb25lS2V5cyk7CiAgfQoKICBmdW5jdGlvbiBhYm9ydFN0YWxlRmV0Y2hMb2FkcyhsYW5kZWRJZCkgewogICAgbGV0IHllZXRlZEtleXMgPSBbXTsKCiAgICBmb3IgKGxldCBba2V5LCBpZF0gb2YgZmV0Y2hSZWxvYWRJZHMpIHsKICAgICAgaWYgKGlkIDwgbGFuZGVkSWQpIHsKICAgICAgICBsZXQgZmV0Y2hlciA9IHN0YXRlLmZldGNoZXJzLmdldChrZXkpOwogICAgICAgIHJvdXRlcl9pbnZhcmlhbnQoZmV0Y2hlciwgIkV4cGVjdGVkIGZldGNoZXI6ICIgKyBrZXkpOwoKICAgICAgICBpZiAoZmV0Y2hlci5zdGF0ZSA9PT0gImxvYWRpbmciKSB7CiAgICAgICAgICBhYm9ydEZldGNoZXIoa2V5KTsKICAgICAgICAgIGZldGNoUmVsb2FkSWRzLmRlbGV0ZShrZXkpOwogICAgICAgICAgeWVldGVkS2V5cy5wdXNoKGtleSk7CiAgICAgICAgfQogICAgICB9CiAgICB9CgogICAgbWFya0ZldGNoZXJzRG9uZSh5ZWV0ZWRLZXlzKTsKICAgIHJldHVybiB5ZWV0ZWRLZXlzLmxlbmd0aCA+IDA7CiAgfQoKICBmdW5jdGlvbiBjYW5jZWxBY3RpdmVEZWZlcnJlZHMocHJlZGljYXRlKSB7CiAgICBsZXQgY2FuY2VsbGVkUm91dGVJZHMgPSBbXTsKICAgIGFjdGl2ZURlZmVycmVkcy5mb3JFYWNoKChkZmQsIHJvdXRlSWQpID0+IHsKICAgICAgaWYgKCFwcmVkaWNhdGUgfHwgcHJlZGljYXRlKHJvdXRlSWQpKSB7CiAgICAgICAgLy8gQ2FuY2VsIHRoZSBkZWZlcnJlZCAtIGJ1dCBkbyBub3QgcmVtb3ZlIGZyb20gYWN0aXZlRGVmZXJyZWRzIGhlcmUgLQogICAgICAgIC8vIHdlIHJlbHkgb24gdGhlIHN1YnNjcmliZXJzIHRvIGRvIHRoYXQgc28gb3VyIHRlc3RzIGNhbiBhc3NlcnQgcHJvcGVyCiAgICAgICAgLy8gY2xlYW51cCB2aWEgX2ludGVybmFsQWN0aXZlRGVmZXJyZWRzCiAgICAgICAgZGZkLmNhbmNlbCgpOwogICAgICAgIGNhbmNlbGxlZFJvdXRlSWRzLnB1c2gocm91dGVJZCk7CiAgICAgICAgYWN0aXZlRGVmZXJyZWRzLmRlbGV0ZShyb3V0ZUlkKTsKICAgICAgfQogICAgfSk7CiAgICByZXR1cm4gY2FuY2VsbGVkUm91dGVJZHM7CiAgfSAvLyBPcHQgaW4gdG8gY2FwdHVyaW5nIGFuZCByZXBvcnRpbmcgc2Nyb2xsIHBvc2l0aW9ucyBkdXJpbmcgbmF2aWdhdGlvbnMsCiAgLy8gdXNlZCBieSB0aGUgPFNjcm9sbFJlc3RvcmF0aW9uPiBjb21wb25lbnQKCgogIGZ1bmN0aW9uIGVuYWJsZVNjcm9sbFJlc3RvcmF0aW9uKHBvc2l0aW9ucywgZ2V0UG9zaXRpb24sIGdldEtleSkgewogICAgc2F2ZWRTY3JvbGxQb3NpdGlvbnMgPSBwb3NpdGlvbnM7CiAgICBnZXRTY3JvbGxQb3NpdGlvbiA9IGdldFBvc2l0aW9uOwoKICAgIGdldFNjcm9sbFJlc3RvcmF0aW9uS2V5ID0gZ2V0S2V5IHx8IChsb2NhdGlvbiA9PiBsb2NhdGlvbi5rZXkpOyAvLyBQZXJmb3JtIGluaXRpYWwgaHlkcmF0aW9uIHNjcm9sbCByZXN0b3JhdGlvbiwgc2luY2Ugd2UgbWlzcyB0aGUgYm9hdCBvbgogICAgLy8gdGhlIGluaXRpYWwgdXBkYXRlU3RhdGUoKSBiZWNhdXNlIHdlJ3ZlIG5vdCB5ZXQgcmVuZGVyZWQgPFNjcm9sbFJlc3RvcmF0aW9uLz4KICAgIC8vIGFuZCB0aGVyZWZvcmUgaGF2ZSBubyBzYXZlZFNjcm9sbFBvc2l0aW9ucyBhdmFpbGFibGUKCgogICAgaWYgKCFpbml0aWFsU2Nyb2xsUmVzdG9yZWQgJiYgc3RhdGUubmF2aWdhdGlvbiA9PT0gSURMRV9OQVZJR0FUSU9OKSB7CiAgICAgIGluaXRpYWxTY3JvbGxSZXN0b3JlZCA9IHRydWU7CiAgICAgIGxldCB5ID0gZ2V0U2F2ZWRTY3JvbGxQb3NpdGlvbihzdGF0ZS5sb2NhdGlvbiwgc3RhdGUubWF0Y2hlcyk7CgogICAgICBpZiAoeSAhPSBudWxsKSB7CiAgICAgICAgdXBkYXRlU3RhdGUoewogICAgICAgICAgcmVzdG9yZVNjcm9sbFBvc2l0aW9uOiB5CiAgICAgICAgfSk7CiAgICAgIH0KICAgIH0KCiAgICByZXR1cm4gKCkgPT4gewogICAgICBzYXZlZFNjcm9sbFBvc2l0aW9ucyA9IG51bGw7CiAgICAgIGdldFNjcm9sbFBvc2l0aW9uID0gbnVsbDsKICAgICAgZ2V0U2Nyb2xsUmVzdG9yYXRpb25LZXkgPSBudWxsOwogICAgfTsKICB9CgogIGZ1bmN0aW9uIHNhdmVTY3JvbGxQb3NpdGlvbihsb2NhdGlvbiwgbWF0Y2hlcykgewogICAgaWYgKHNhdmVkU2Nyb2xsUG9zaXRpb25zICYmIGdldFNjcm9sbFJlc3RvcmF0aW9uS2V5ICYmIGdldFNjcm9sbFBvc2l0aW9uKSB7CiAgICAgIGxldCB1c2VyTWF0Y2hlcyA9IG1hdGNoZXMubWFwKG0gPT4gY3JlYXRlVXNlTWF0Y2hlc01hdGNoKG0sIHN0YXRlLmxvYWRlckRhdGEpKTsKICAgICAgbGV0IGtleSA9IGdldFNjcm9sbFJlc3RvcmF0aW9uS2V5KGxvY2F0aW9uLCB1c2VyTWF0Y2hlcykgfHwgbG9jYXRpb24ua2V5OwogICAgICBzYXZlZFNjcm9sbFBvc2l0aW9uc1trZXldID0gZ2V0U2Nyb2xsUG9zaXRpb24oKTsKICAgIH0KICB9CgogIGZ1bmN0aW9uIGdldFNhdmVkU2Nyb2xsUG9zaXRpb24obG9jYXRpb24sIG1hdGNoZXMpIHsKICAgIGlmIChzYXZlZFNjcm9sbFBvc2l0aW9ucyAmJiBnZXRTY3JvbGxSZXN0b3JhdGlvbktleSAmJiBnZXRTY3JvbGxQb3NpdGlvbikgewogICAgICBsZXQgdXNlck1hdGNoZXMgPSBtYXRjaGVzLm1hcChtID0+IGNyZWF0ZVVzZU1hdGNoZXNNYXRjaChtLCBzdGF0ZS5sb2FkZXJEYXRhKSk7CiAgICAgIGxldCBrZXkgPSBnZXRTY3JvbGxSZXN0b3JhdGlvbktleShsb2NhdGlvbiwgdXNlck1hdGNoZXMpIHx8IGxvY2F0aW9uLmtleTsKICAgICAgbGV0IHkgPSBzYXZlZFNjcm9sbFBvc2l0aW9uc1trZXldOwoKICAgICAgaWYgKHR5cGVvZiB5ID09PSAibnVtYmVyIikgewogICAgICAgIHJldHVybiB5OwogICAgICB9CiAgICB9CgogICAgcmV0dXJuIG51bGw7CiAgfQoKICByb3V0ZXIgPSB7CiAgICBnZXQgYmFzZW5hbWUoKSB7CiAgICAgIHJldHVybiBpbml0LmJhc2VuYW1lOwogICAgfSwKCiAgICBnZXQgc3RhdGUoKSB7CiAgICAgIHJldHVybiBzdGF0ZTsKICAgIH0sCgogICAgZ2V0IHJvdXRlcygpIHsKICAgICAgcmV0dXJuIGRhdGFSb3V0ZXM7CiAgICB9LAoKICAgIGluaXRpYWxpemUsCiAgICBzdWJzY3JpYmUsCiAgICBlbmFibGVTY3JvbGxSZXN0b3JhdGlvbiwKICAgIG5hdmlnYXRlLAogICAgZmV0Y2gsCiAgICByZXZhbGlkYXRlLAogICAgLy8gUGFzc3Rocm91Z2ggdG8gaGlzdG9yeS1hd2FyZSBjcmVhdGVIcmVmIHVzZWQgYnkgdXNlSHJlZiBzbyB3ZSBnZXQgcHJvcGVyCiAgICAvLyBoYXNoLWF3YXJlIFVSTHMgaW4gRE9NIHBhdGhzCiAgICBjcmVhdGVIcmVmOiB0byA9PiBpbml0Lmhpc3RvcnkuY3JlYXRlSHJlZih0byksCiAgICBnZXRGZXRjaGVyLAogICAgZGVsZXRlRmV0Y2hlciwKICAgIGRpc3Bvc2UsCiAgICBfaW50ZXJuYWxGZXRjaENvbnRyb2xsZXJzOiBmZXRjaENvbnRyb2xsZXJzLAogICAgX2ludGVybmFsQWN0aXZlRGVmZXJyZWRzOiBhY3RpdmVEZWZlcnJlZHMKICB9OwogIHJldHVybiByb3V0ZXI7Cn0gLy8jZW5kcmVnaW9uCi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vCi8vI3JlZ2lvbiBjcmVhdGVTdGF0aWNIYW5kbGVyCi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vCgpjb25zdCB2YWxpZEFjdGlvbk1ldGhvZHMgPSBuZXcgU2V0KFsiUE9TVCIsICJQVVQiLCAiUEFUQ0giLCAiREVMRVRFIl0pOwpjb25zdCB2YWxpZFJlcXVlc3RNZXRob2RzID0gbmV3IFNldChbIkdFVCIsICJIRUFEIiwgLi4udmFsaWRBY3Rpb25NZXRob2RzXSk7CmZ1bmN0aW9uIHVuc3RhYmxlX2NyZWF0ZVN0YXRpY0hhbmRsZXIocm91dGVzKSB7CiAgcm91dGVyX2ludmFyaWFudChyb3V0ZXMubGVuZ3RoID4gMCwgIllvdSBtdXN0IHByb3ZpZGUgYSBub24tZW1wdHkgcm91dGVzIGFycmF5IHRvIHVuc3RhYmxlX2NyZWF0ZVN0YXRpY0hhbmRsZXIiKTsKICBsZXQgZGF0YVJvdXRlcyA9IGNvbnZlcnRSb3V0ZXNUb0RhdGFSb3V0ZXMocm91dGVzKTsKICAvKioKICAgKiBUaGUgcXVlcnkoKSBtZXRob2QgaXMgaW50ZW5kZWQgZm9yIGRvY3VtZW50IHJlcXVlc3RzLCBpbiB3aGljaCB3ZSB3YW50IHRvCiAgICogY2FsbCBhbiBvcHRpb25hbCBhY3Rpb24gYW5kIHBvdGVudGlhbGx5IG11bHRpcGxlIGxvYWRlcnMgZm9yIGFsbCBuZXN0ZWQKICAgKiByb3V0ZXMuICBJdCByZXR1cm5zIGEgU3RhdGljSGFuZGxlckNvbnRleHQgb2JqZWN0LCB3aGljaCBpcyB2ZXJ5IHNpbWlsYXIKICAgKiB0byB0aGUgcm91dGVyIHN0YXRlIChsb2NhdGlvbiwgbG9hZGVyRGF0YSwgYWN0aW9uRGF0YSwgZXJyb3JzLCBldGMuKSBhbmQKICAgKiBhbHNvIGFkZHMgU1NSLXNwZWNpZmljIGluZm9ybWF0aW9uIHN1Y2ggYXMgdGhlIHN0YXR1c0NvZGUgYW5kIGhlYWRlcnMKICAgKiBmcm9tIGFjdGlvbi9sb2FkZXJzIFJlc3BvbnNlcy4KICAgKgogICAqIEl0IF9zaG91bGRfIG5ldmVyIHRocm93IGFuZCBzaG91bGQgcmVwb3J0IGFsbCBlcnJvcnMgdGhyb3VnaCB0aGUKICAgKiByZXR1cm5lZCBjb250ZXh0LmVycm9ycyBvYmplY3QsIHByb3Blcmx5IGFzc29jaWF0aW5nIGVycm9ycyB0byB0aGVpciBlcnJvcgogICAqIGJvdW5kYXJ5LiAgQWRkaXRpb25hbGx5LCBpdCB0cmFja3MgX2RlZXBlc3RSZW5kZXJlZEJvdW5kYXJ5SWQgd2hpY2ggY2FuIGJlCiAgICogdXNlZCB0byBlbXVsYXRlIFJlYWN0IGVycm9yIGJvdW5kYXJpZXMgZHVyaW5nIFNTciBieSBwZXJmb3JtaW5nIGEgc2Vjb25kCiAgICogcGFzcyBvbmx5IGRvd24gdG8gdGhlIGJvdW5kYXJ5SWQuCiAgICoKICAgKiBUaGUgb25lIGV4Y2VwdGlvbiB3aGVyZSB3ZSBkbyBub3QgcmV0dXJuIGEgU3RhdGljSGFuZGxlckNvbnRleHQgaXMgd2hlbiBhCiAgICogcmVkaXJlY3QgcmVzcG9uc2UgaXMgcmV0dXJuZWQgb3IgdGhyb3duIGZyb20gYW55IGFjdGlvbi9sb2FkZXIuICBXZQogICAqIHByb3BhZ2F0ZSB0aGF0IG91dCBhbmQgcmV0dXJuIHRoZSByYXcgUmVzcG9uc2Ugc28gdGhlIEhUVFAgc2VydmVyIGNhbgogICAqIHJldHVybiBpdCBkaXJlY3RseS4KICAgKi8KCiAgYXN5bmMgZnVuY3Rpb24gcXVlcnkocmVxdWVzdCkgewogICAgbGV0IHVybCA9IG5ldyBVUkwocmVxdWVzdC51cmwpOwogICAgbGV0IGxvY2F0aW9uID0gY3JlYXRlTG9jYXRpb24oIiIsIHJvdXRlcl9jcmVhdGVQYXRoKHVybCksIG51bGwsICJkZWZhdWx0Iik7CiAgICBsZXQgbWF0Y2hlcyA9IG1hdGNoUm91dGVzKGRhdGFSb3V0ZXMsIGxvY2F0aW9uKTsKCiAgICBpZiAoIXZhbGlkUmVxdWVzdE1ldGhvZHMuaGFzKHJlcXVlc3QubWV0aG9kKSkgewogICAgICBsZXQgewogICAgICAgIG1hdGNoZXM6IG1ldGhvZE5vdEFsbG93ZWRNYXRjaGVzLAogICAgICAgIHJvdXRlLAogICAgICAgIGVycm9yCiAgICAgIH0gPSBnZXRNZXRob2ROb3RBbGxvd2VkTWF0Y2hlcyhkYXRhUm91dGVzKTsKICAgICAgcmV0dXJuIHsKICAgICAgICBsb2NhdGlvbiwKICAgICAgICBtYXRjaGVzOiBtZXRob2ROb3RBbGxvd2VkTWF0Y2hlcywKICAgICAgICBsb2FkZXJEYXRhOiB7fSwKICAgICAgICBhY3Rpb25EYXRhOiBudWxsLAogICAgICAgIGVycm9yczogewogICAgICAgICAgW3JvdXRlLmlkXTogZXJyb3IKICAgICAgICB9LAogICAgICAgIHN0YXR1c0NvZGU6IGVycm9yLnN0YXR1cywKICAgICAgICBsb2FkZXJIZWFkZXJzOiB7fSwKICAgICAgICBhY3Rpb25IZWFkZXJzOiB7fQogICAgICB9OwogICAgfSBlbHNlIGlmICghbWF0Y2hlcykgewogICAgICBsZXQgewogICAgICAgIG1hdGNoZXM6IG5vdEZvdW5kTWF0Y2hlcywKICAgICAgICByb3V0ZSwKICAgICAgICBlcnJvcgogICAgICB9ID0gZ2V0Tm90Rm91bmRNYXRjaGVzKGRhdGFSb3V0ZXMpOwogICAgICByZXR1cm4gewogICAgICAgIGxvY2F0aW9uLAogICAgICAgIG1hdGNoZXM6IG5vdEZvdW5kTWF0Y2hlcywKICAgICAgICBsb2FkZXJEYXRhOiB7fSwKICAgICAgICBhY3Rpb25EYXRhOiBudWxsLAogICAgICAgIGVycm9yczogewogICAgICAgICAgW3JvdXRlLmlkXTogZXJyb3IKICAgICAgICB9LAogICAgICAgIHN0YXR1c0NvZGU6IGVycm9yLnN0YXR1cywKICAgICAgICBsb2FkZXJIZWFkZXJzOiB7fSwKICAgICAgICBhY3Rpb25IZWFkZXJzOiB7fQogICAgICB9OwogICAgfQoKICAgIGxldCByZXN1bHQgPSBhd2FpdCBxdWVyeUltcGwocmVxdWVzdCwgbG9jYXRpb24sIG1hdGNoZXMpOwoKICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBSZXNwb25zZSkgewogICAgICByZXR1cm4gcmVzdWx0OwogICAgfSAvLyBXaGVuIHJldHVybmluZyBTdGF0aWNIYW5kbGVyQ29udGV4dCwgd2UgcGF0Y2ggYmFjayBpbiB0aGUgbG9jYXRpb24gaGVyZQogICAgLy8gc2luY2Ugd2UgbmVlZCBpdCBmb3IgUmVhY3QgQ29udGV4dC4gIEJ1dCB0aGlzIGhlbHBzIGtlZXAgb3VyIHN1Ym1pdCBhbmQKICAgIC8vIGxvYWRSb3V0ZURhdGEgb3BlcmF0aW5nIG9uIGEgUmVxdWVzdCBpbnN0ZWFkIG9mIGEgTG9jYXRpb24KCgogICAgcmV0dXJuIF9leHRlbmRzKHsKICAgICAgbG9jYXRpb24KICAgIH0sIHJlc3VsdCk7CiAgfQogIC8qKgogICAqIFRoZSBxdWVyeVJvdXRlKCkgbWV0aG9kIGlzIGludGVuZGVkIGZvciB0YXJnZXRlZCByb3V0ZSByZXF1ZXN0cywgZWl0aGVyCiAgICogZm9yIGZldGNoID9fZGF0YSByZXF1ZXN0cyBvciByZXNvdXJjZSByb3V0ZSByZXF1ZXN0cy4gIEluIHRoaXMgY2FzZSwgd2UKICAgKiBhcmUgb25seSBldmVyIGNhbGxpbmcgYSBzaW5nbGUgYWN0aW9uIG9yIGxvYWRlciwgYW5kIHdlIGFyZSByZXR1cm5pbmcgdGhlCiAgICogcmV0dXJuZWQgdmFsdWUgZGlyZWN0bHkuICBJbiBtb3N0IGNhc2VzLCB0aGlzIHdpbGwgYmUgYSBSZXNwb25zZSByZXR1cm5lZAogICAqIGZyb20gdGhlIGFjdGlvbi9sb2FkZXIsIGJ1dCBpdCBtYXkgYmUgYSBwcmltaXRpdmUgb3Igb3RoZXIgdmFsdWUgYXMgd2VsbCAtCiAgICogYW5kIGluIHN1Y2ggY2FzZXMgdGhlIGNhbGxpbmcgY29udGV4dCBzaG91bGQgaGFuZGxlIHRoYXQgYWNjb3JkaW5nbHkuCiAgICoKICAgKiBXZSBkbyByZXNwZWN0IHRoZSB0aHJvdy9yZXR1cm4gZGlmZmVyZW50aWF0aW9uLCBzbyBpZiBhbiBhY3Rpb24vbG9hZGVyCiAgICogdGhyb3dzLCB0aGVuIHRoaXMgbWV0aG9kIHdpbGwgdGhyb3cgdGhlIHZhbHVlLiAgVGhpcyBpcyBpbXBvcnRhbnQgc28gd2UKICAgKiBjYW4gZG8gcHJvcGVyIGJvdW5kYXJ5IGlkZW50aWZpY2F0aW9uIGluIFJlbWl4IHdoZXJlIGEgdGhyb3duIFJlc3BvbnNlCiAgICogbXVzdCBnbyB0byB0aGUgQ2F0Y2ggQm91bmRhcnkgYnV0IGEgcmV0dXJuZWQgUmVzcG9uc2UgaXMgaGFwcHktcGF0aC4KICAgKgogICAqIE9uZSB0aGluZyB0byBub3RlIGlzIHRoYXQgYW55IFJvdXRlci1pbml0aWF0ZWQgdGhyb3duIFJlc3BvbnNlIChzdWNoIGFzIGEKICAgKiA0MDQgb3IgNDA1KSB3aWxsIGhhdmUgYSBjdXN0b20gWC1SZW1peC1Sb3V0ZXItRXJyb3I6ICJ5ZXMiIGhlYWRlciBvbiBpdAogICAqIGluIG9yZGVyIHRvIGRpZmZlcmVudGlhdGUgZnJvbSByZXNwb25zZXMgdGhyb3duIGZyb20gdXNlciBhY3Rpb25zL2xvYWRlcnMuCiAgICovCgoKICBhc3luYyBmdW5jdGlvbiBxdWVyeVJvdXRlKHJlcXVlc3QsIHJvdXRlSWQpIHsKICAgIGxldCB1cmwgPSBuZXcgVVJMKHJlcXVlc3QudXJsKTsKICAgIGxldCBsb2NhdGlvbiA9IGNyZWF0ZUxvY2F0aW9uKCIiLCByb3V0ZXJfY3JlYXRlUGF0aCh1cmwpLCBudWxsLCAiZGVmYXVsdCIpOwogICAgbGV0IG1hdGNoZXMgPSBtYXRjaFJvdXRlcyhkYXRhUm91dGVzLCBsb2NhdGlvbik7CgogICAgaWYgKCF2YWxpZFJlcXVlc3RNZXRob2RzLmhhcyhyZXF1ZXN0Lm1ldGhvZCkpIHsKICAgICAgdGhyb3cgY3JlYXRlUm91dGVyRXJyb3JSZXNwb25zZShudWxsLCB7CiAgICAgICAgc3RhdHVzOiA0MDUsCiAgICAgICAgc3RhdHVzVGV4dDogIk1ldGhvZCBOb3QgQWxsb3dlZCIKICAgICAgfSk7CiAgICB9IGVsc2UgaWYgKCFtYXRjaGVzKSB7CiAgICAgIHRocm93IGNyZWF0ZVJvdXRlckVycm9yUmVzcG9uc2UobnVsbCwgewogICAgICAgIHN0YXR1czogNDA0LAogICAgICAgIHN0YXR1c1RleHQ6ICJOb3QgRm91bmQiCiAgICAgIH0pOwogICAgfQoKICAgIGxldCBtYXRjaCA9IHJvdXRlSWQgPyBtYXRjaGVzLmZpbmQobSA9PiBtLnJvdXRlLmlkID09PSByb3V0ZUlkKSA6IGdldFRhcmdldE1hdGNoKG1hdGNoZXMsIGxvY2F0aW9uKTsKCiAgICBpZiAoIW1hdGNoKSB7CiAgICAgIHRocm93IGNyZWF0ZVJvdXRlckVycm9yUmVzcG9uc2UobnVsbCwgewogICAgICAgIHN0YXR1czogNDA0LAogICAgICAgIHN0YXR1c1RleHQ6ICJOb3QgRm91bmQiCiAgICAgIH0pOwogICAgfQoKICAgIGxldCByZXN1bHQgPSBhd2FpdCBxdWVyeUltcGwocmVxdWVzdCwgbG9jYXRpb24sIG1hdGNoZXMsIG1hdGNoKTsKCiAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUmVzcG9uc2UpIHsKICAgICAgcmV0dXJuIHJlc3VsdDsKICAgIH0KCiAgICBsZXQgZXJyb3IgPSByZXN1bHQuZXJyb3JzID8gT2JqZWN0LnZhbHVlcyhyZXN1bHQuZXJyb3JzKVswXSA6IHVuZGVmaW5lZDsKCiAgICBpZiAoZXJyb3IgIT09IHVuZGVmaW5lZCkgewogICAgICAvLyBJZiB3ZSBnb3QgYmFjayByZXN1bHQuZXJyb3JzLCB0aGF0IG1lYW5zIHRoZSBsb2FkZXIvYWN0aW9uIHRocmV3CiAgICAgIC8vIF9zb21ldGhpbmdfIHRoYXQgd2Fzbid0IGEgUmVzcG9uc2UsIGJ1dCBpdCdzIG5vdCBndWFyYW50ZWVkL3JlcXVpcmVkCiAgICAgIC8vIHRvIGJlIGFuIGBpbnN0YW5jZW9mIEVycm9yYCBlaXRoZXIsIHNvIHdlIGhhdmUgdG8gdXNlIHRocm93IGhlcmUgdG8KICAgICAgLy8gcHJlc2VydmUgdGhlICJlcnJvciIgc3RhdGUgb3V0c2lkZSBvZiBxdWVyeUltcGwuCiAgICAgIHRocm93IGVycm9yOwogICAgfSAvLyBQaWNrIG9mZiB0aGUgcmlnaHQgc3RhdGUgdmFsdWUgdG8gcmV0dXJuCgoKICAgIGxldCByb3V0ZURhdGEgPSBbcmVzdWx0LmFjdGlvbkRhdGEsIHJlc3VsdC5sb2FkZXJEYXRhXS5maW5kKHYgPT4gdik7CiAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyhyb3V0ZURhdGEgfHwge30pWzBdOwogIH0KCiAgYXN5bmMgZnVuY3Rpb24gcXVlcnlJbXBsKHJlcXVlc3QsIGxvY2F0aW9uLCBtYXRjaGVzLCByb3V0ZU1hdGNoKSB7CiAgICByb3V0ZXJfaW52YXJpYW50KHJlcXVlc3Quc2lnbmFsLCAicXVlcnkoKS9xdWVyeVJvdXRlKCkgcmVxdWVzdHMgbXVzdCBjb250YWluIGFuIEFib3J0Q29udHJvbGxlciBzaWduYWwiKTsKCiAgICB0cnkgewogICAgICBpZiAodmFsaWRBY3Rpb25NZXRob2RzLmhhcyhyZXF1ZXN0Lm1ldGhvZCkpIHsKICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgc3VibWl0KHJlcXVlc3QsIG1hdGNoZXMsIHJvdXRlTWF0Y2ggfHwgZ2V0VGFyZ2V0TWF0Y2gobWF0Y2hlcywgbG9jYXRpb24pLCByb3V0ZU1hdGNoICE9IG51bGwpOwogICAgICAgIHJldHVybiByZXN1bHQ7CiAgICAgIH0KCiAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBsb2FkUm91dGVEYXRhKHJlcXVlc3QsIG1hdGNoZXMsIHJvdXRlTWF0Y2gpOwogICAgICByZXR1cm4gcmVzdWx0IGluc3RhbmNlb2YgUmVzcG9uc2UgPyByZXN1bHQgOiBfZXh0ZW5kcyh7fSwgcmVzdWx0LCB7CiAgICAgICAgYWN0aW9uRGF0YTogbnVsbCwKICAgICAgICBhY3Rpb25IZWFkZXJzOiB7fQogICAgICB9KTsKICAgIH0gY2F0Y2ggKGUpIHsKICAgICAgLy8gSWYgdGhlIHVzZXIgdGhyZXcvcmV0dXJuZWQgYSBSZXNwb25zZSBpbiBjYWxsTG9hZGVyT3JBY3Rpb24sIHdlIHRocm93CiAgICAgIC8vIGl0IHRvIGJhaWwgb3V0IGFuZCB0aGVuIHJldHVybiBvciB0aHJvdyBoZXJlIGJhc2VkIG9uIHdoZXRoZXIgdGhlIHVzZXIKICAgICAgLy8gcmV0dXJuZWQgb3IgdGhyZXcKICAgICAgaWYgKGlzUXVlcnlSb3V0ZVJlc3BvbnNlKGUpKSB7CiAgICAgICAgaWYgKGUudHlwZSA9PT0gUmVzdWx0VHlwZS5lcnJvciAmJiAhaXNSZWRpcmVjdFJlc3BvbnNlKGUucmVzcG9uc2UpKSB7CiAgICAgICAgICB0aHJvdyBlLnJlc3BvbnNlOwogICAgICAgIH0KCiAgICAgICAgcmV0dXJuIGUucmVzcG9uc2U7CiAgICAgIH0gLy8gUmVkaXJlY3RzIGFyZSBhbHdheXMgcmV0dXJuZWQgc2luY2UgdGhleSBkb24ndCBwcm9wYWdhdGUgdG8gY2F0Y2gKICAgICAgLy8gYm91bmRhcmllcwoKCiAgICAgIGlmIChpc1JlZGlyZWN0UmVzcG9uc2UoZSkpIHsKICAgICAgICByZXR1cm4gZTsKICAgICAgfQoKICAgICAgdGhyb3cgZTsKICAgIH0KICB9CgogIGFzeW5jIGZ1bmN0aW9uIHN1Ym1pdChyZXF1ZXN0LCBtYXRjaGVzLCBhY3Rpb25NYXRjaCwgaXNSb3V0ZVJlcXVlc3QpIHsKICAgIGxldCByZXN1bHQ7CgogICAgaWYgKCFhY3Rpb25NYXRjaC5yb3V0ZS5hY3Rpb24pIHsKICAgICAgaWYgKGlzUm91dGVSZXF1ZXN0KSB7CiAgICAgICAgdGhyb3cgY3JlYXRlUm91dGVyRXJyb3JSZXNwb25zZShudWxsLCB7CiAgICAgICAgICBzdGF0dXM6IDQwNSwKICAgICAgICAgIHN0YXR1c1RleHQ6ICJNZXRob2QgTm90IEFsbG93ZWQiCiAgICAgICAgfSk7CiAgICAgIH0KCiAgICAgIHJlc3VsdCA9IGdldE1ldGhvZE5vdEFsbG93ZWRSZXN1bHQocmVxdWVzdC51cmwpOwogICAgfSBlbHNlIHsKICAgICAgcmVzdWx0ID0gYXdhaXQgY2FsbExvYWRlck9yQWN0aW9uKCJhY3Rpb24iLCByZXF1ZXN0LCBhY3Rpb25NYXRjaCwgbWF0Y2hlcywgdW5kZWZpbmVkLCAvLyBCYXNlbmFtZSBub3QgY3VycmVudGx5IHN1cHBvcnRlZCBpbiBzdGF0aWMgaGFuZGxlcnMKICAgICAgdHJ1ZSwgaXNSb3V0ZVJlcXVlc3QpOwoKICAgICAgaWYgKHJlcXVlc3Quc2lnbmFsLmFib3J0ZWQpIHsKICAgICAgICBsZXQgbWV0aG9kID0gaXNSb3V0ZVJlcXVlc3QgPyAicXVlcnlSb3V0ZSIgOiAicXVlcnkiOwogICAgICAgIHRocm93IG5ldyBFcnJvcihtZXRob2QgKyAiKCkgY2FsbCBhYm9ydGVkIik7CiAgICAgIH0KICAgIH0KCiAgICBpZiAoaXNSZWRpcmVjdFJlc3VsdChyZXN1bHQpKSB7CiAgICAgIC8vIFVoaGhoIC0gdGhpcyBzaG91bGQgbmV2ZXIgaGFwcGVuLCB3ZSBzaG91bGQgYWx3YXlzIHRocm93IHRoZXNlIGZyb20KICAgICAgLy8gY2FsbExvYWRlck9yQWN0aW9uLCBidXQgdGhlIHR5cGUgbmFycm93aW5nIGhlcmUga2VlcHMgVFMgaGFwcHkgYW5kIHdlCiAgICAgIC8vIGNhbiBnZXQgYmFjayBvbiB0aGUgInRocm93IGFsbCByZWRpcmVjdCByZXNwb25zZXMiIHRyYWluIGhlcmUgc2hvdWxkCiAgICAgIC8vIHRoaXMgZXZlciBoYXBwZW4gOi8KICAgICAgdGhyb3cgbmV3IFJlc3BvbnNlKG51bGwsIHsKICAgICAgICBzdGF0dXM6IHJlc3VsdC5zdGF0dXMsCiAgICAgICAgaGVhZGVyczogewogICAgICAgICAgTG9jYXRpb246IHJlc3VsdC5sb2NhdGlvbgogICAgICAgIH0KICAgICAgfSk7CiAgICB9CgogICAgaWYgKGlzRGVmZXJyZWRSZXN1bHQocmVzdWx0KSkgewogICAgICB0aHJvdyBuZXcgRXJyb3IoImRlZmVyKCkgaXMgbm90IHN1cHBvcnRlZCBpbiBhY3Rpb25zIik7CiAgICB9CgogICAgaWYgKGlzUm91dGVSZXF1ZXN0KSB7CiAgICAgIC8vIE5vdGU6IFRoaXMgc2hvdWxkIG9ubHkgYmUgbm9uLVJlc3BvbnNlIHZhbHVlcyBpZiB3ZSBnZXQgaGVyZSwgc2luY2UKICAgICAgLy8gaXNSb3V0ZVJlcXVlc3Qgc2hvdWxkIHRocm93IGFueSBSZXNwb25zZSByZWNlaXZlZCBpbiBjYWxsTG9hZGVyT3JBY3Rpb24KICAgICAgaWYgKGlzRXJyb3JSZXN1bHQocmVzdWx0KSkgewogICAgICAgIGxldCBib3VuZGFyeU1hdGNoID0gZmluZE5lYXJlc3RCb3VuZGFyeShtYXRjaGVzLCBhY3Rpb25NYXRjaC5yb3V0ZS5pZCk7CiAgICAgICAgcmV0dXJuIHsKICAgICAgICAgIG1hdGNoZXM6IFthY3Rpb25NYXRjaF0sCiAgICAgICAgICBsb2FkZXJEYXRhOiB7fSwKICAgICAgICAgIGFjdGlvbkRhdGE6IG51bGwsCiAgICAgICAgICBlcnJvcnM6IHsKICAgICAgICAgICAgW2JvdW5kYXJ5TWF0Y2gucm91dGUuaWRdOiByZXN1bHQuZXJyb3IKICAgICAgICAgIH0sCiAgICAgICAgICAvLyBOb3RlOiBzdGF0dXNDb2RlICsgaGVhZGVycyBhcmUgdW51c2VkIGhlcmUgc2luY2UgcXVlcnlSb3V0ZSB3aWxsCiAgICAgICAgICAvLyByZXR1cm4gdGhlIHJhdyBSZXNwb25zZSBvciB2YWx1ZQogICAgICAgICAgc3RhdHVzQ29kZTogNTAwLAogICAgICAgICAgbG9hZGVySGVhZGVyczoge30sCiAgICAgICAgICBhY3Rpb25IZWFkZXJzOiB7fQogICAgICAgIH07CiAgICAgIH0KCiAgICAgIHJldHVybiB7CiAgICAgICAgbWF0Y2hlczogW2FjdGlvbk1hdGNoXSwKICAgICAgICBsb2FkZXJEYXRhOiB7fSwKICAgICAgICBhY3Rpb25EYXRhOiB7CiAgICAgICAgICBbYWN0aW9uTWF0Y2gucm91dGUuaWRdOiByZXN1bHQuZGF0YQogICAgICAgIH0sCiAgICAgICAgZXJyb3JzOiBudWxsLAogICAgICAgIC8vIE5vdGU6IHN0YXR1c0NvZGUgKyBoZWFkZXJzIGFyZSB1bnVzZWQgaGVyZSBzaW5jZSBxdWVyeVJvdXRlIHdpbGwKICAgICAgICAvLyByZXR1cm4gdGhlIHJhdyBSZXNwb25zZSBvciB2YWx1ZQogICAgICAgIHN0YXR1c0NvZGU6IDIwMCwKICAgICAgICBsb2FkZXJIZWFkZXJzOiB7fSwKICAgICAgICBhY3Rpb25IZWFkZXJzOiB7fQogICAgICB9OwogICAgfQoKICAgIGlmIChpc0Vycm9yUmVzdWx0KHJlc3VsdCkpIHsKICAgICAgLy8gU3RvcmUgb2ZmIHRoZSBwZW5kaW5nIGVycm9yIC0gd2UgdXNlIGl0IHRvIGRldGVybWluZSB3aGljaCBsb2FkZXJzCiAgICAgIC8vIHRvIGNhbGwgYW5kIHdpbGwgY29tbWl0IGl0IHdoZW4gd2UgY29tcGxldGUgdGhlIG5hdmlnYXRpb24KICAgICAgbGV0IGJvdW5kYXJ5TWF0Y2ggPSBmaW5kTmVhcmVzdEJvdW5kYXJ5KG1hdGNoZXMsIGFjdGlvbk1hdGNoLnJvdXRlLmlkKTsKICAgICAgbGV0IGNvbnRleHQgPSBhd2FpdCBsb2FkUm91dGVEYXRhKHJlcXVlc3QsIG1hdGNoZXMsIHVuZGVmaW5lZCwgewogICAgICAgIFtib3VuZGFyeU1hdGNoLnJvdXRlLmlkXTogcmVzdWx0LmVycm9yCiAgICAgIH0pOyAvLyBhY3Rpb24gc3RhdHVzIGNvZGVzIHRha2UgcHJlY2VkZW5jZSBvdmVyIGxvYWRlciBzdGF0dXMgY29kZXMKCiAgICAgIHJldHVybiBfZXh0ZW5kcyh7fSwgY29udGV4dCwgewogICAgICAgIHN0YXR1c0NvZGU6IGlzUm91dGVFcnJvclJlc3BvbnNlKHJlc3VsdC5lcnJvcikgPyByZXN1bHQuZXJyb3Iuc3RhdHVzIDogNTAwLAogICAgICAgIGFjdGlvbkRhdGE6IG51bGwsCiAgICAgICAgYWN0aW9uSGVhZGVyczogX2V4dGVuZHMoe30sIHJlc3VsdC5oZWFkZXJzID8gewogICAgICAgICAgW2FjdGlvbk1hdGNoLnJvdXRlLmlkXTogcmVzdWx0LmhlYWRlcnMKICAgICAgICB9IDoge30pCiAgICAgIH0pOwogICAgfQoKICAgIGxldCBjb250ZXh0ID0gYXdhaXQgbG9hZFJvdXRlRGF0YShyZXF1ZXN0LCBtYXRjaGVzKTsKICAgIHJldHVybiBfZXh0ZW5kcyh7fSwgY29udGV4dCwgcmVzdWx0LnN0YXR1c0NvZGUgPyB7CiAgICAgIHN0YXR1c0NvZGU6IHJlc3VsdC5zdGF0dXNDb2RlCiAgICB9IDoge30sIHsKICAgICAgYWN0aW9uRGF0YTogewogICAgICAgIFthY3Rpb25NYXRjaC5yb3V0ZS5pZF06IHJlc3VsdC5kYXRhCiAgICAgIH0sCiAgICAgIGFjdGlvbkhlYWRlcnM6IF9leHRlbmRzKHt9LCByZXN1bHQuaGVhZGVycyA/IHsKICAgICAgICBbYWN0aW9uTWF0Y2gucm91dGUuaWRdOiByZXN1bHQuaGVhZGVycwogICAgICB9IDoge30pCiAgICB9KTsKICB9CgogIGFzeW5jIGZ1bmN0aW9uIGxvYWRSb3V0ZURhdGEocmVxdWVzdCwgbWF0Y2hlcywgcm91dGVNYXRjaCwgcGVuZGluZ0FjdGlvbkVycm9yKSB7CiAgICBsZXQgaXNSb3V0ZVJlcXVlc3QgPSByb3V0ZU1hdGNoICE9IG51bGw7CiAgICBsZXQgcmVxdWVzdE1hdGNoZXMgPSByb3V0ZU1hdGNoID8gW3JvdXRlTWF0Y2hdIDogZ2V0TG9hZGVyTWF0Y2hlc1VudGlsQm91bmRhcnkobWF0Y2hlcywgT2JqZWN0LmtleXMocGVuZGluZ0FjdGlvbkVycm9yIHx8IHt9KVswXSk7CiAgICBsZXQgbWF0Y2hlc1RvTG9hZCA9IHJlcXVlc3RNYXRjaGVzLmZpbHRlcihtID0+IG0ucm91dGUubG9hZGVyKTsgLy8gU2hvcnQgY2lyY3VpdCBpZiB3ZSBoYXZlIG5vIGxvYWRlcnMgdG8gcnVuCgogICAgaWYgKG1hdGNoZXNUb0xvYWQubGVuZ3RoID09PSAwKSB7CiAgICAgIHJldHVybiB7CiAgICAgICAgbWF0Y2hlcywKICAgICAgICBsb2FkZXJEYXRhOiB7fSwKICAgICAgICBlcnJvcnM6IHBlbmRpbmdBY3Rpb25FcnJvciB8fCBudWxsLAogICAgICAgIHN0YXR1c0NvZGU6IDIwMCwKICAgICAgICBsb2FkZXJIZWFkZXJzOiB7fQogICAgICB9OwogICAgfQoKICAgIGxldCByZXN1bHRzID0gYXdhaXQgUHJvbWlzZS5hbGwoWy4uLm1hdGNoZXNUb0xvYWQubWFwKG1hdGNoID0+IGNhbGxMb2FkZXJPckFjdGlvbigibG9hZGVyIiwgcmVxdWVzdCwgbWF0Y2gsIG1hdGNoZXMsIHVuZGVmaW5lZCwgLy8gQmFzZW5hbWUgbm90IGN1cnJlbnRseSBzdXBwb3J0ZWQgaW4gc3RhdGljIGhhbmRsZXJzCiAgICB0cnVlLCBpc1JvdXRlUmVxdWVzdCkpXSk7CgogICAgaWYgKHJlcXVlc3Quc2lnbmFsLmFib3J0ZWQpIHsKICAgICAgbGV0IG1ldGhvZCA9IGlzUm91dGVSZXF1ZXN0ID8gInF1ZXJ5Um91dGUiIDogInF1ZXJ5IjsKICAgICAgdGhyb3cgbmV3IEVycm9yKG1ldGhvZCArICIoKSBjYWxsIGFib3J0ZWQiKTsKICAgIH0gLy8gQ2FuJ3QgZG8gYW55dGhpbmcgd2l0aCB0aGVzZSB3aXRob3V0IHRoZSBSZW1peCBzaWRlIG9mIHRoaW5ncywgc28ganVzdAogICAgLy8gY2FuY2VsIHRoZW0gZm9yIG5vdwoKCiAgICByZXN1bHRzLmZvckVhY2gocmVzdWx0ID0+IHsKICAgICAgaWYgKGlzRGVmZXJyZWRSZXN1bHQocmVzdWx0KSkgewogICAgICAgIHJlc3VsdC5kZWZlcnJlZERhdGEuY2FuY2VsKCk7CiAgICAgIH0KICAgIH0pOyAvLyBQcm9jZXNzIGFuZCBjb21taXQgb3V0cHV0IGZyb20gbG9hZGVycwoKICAgIGxldCBjb250ZXh0ID0gcHJvY2Vzc1JvdXRlTG9hZGVyRGF0YShtYXRjaGVzLCBtYXRjaGVzVG9Mb2FkLCByZXN1bHRzLCBwZW5kaW5nQWN0aW9uRXJyb3IpOwogICAgcmV0dXJuIF9leHRlbmRzKHt9LCBjb250ZXh0LCB7CiAgICAgIG1hdGNoZXMKICAgIH0pOwogIH0KCiAgZnVuY3Rpb24gY3JlYXRlUm91dGVyRXJyb3JSZXNwb25zZShib2R5LCBpbml0KSB7CiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKGJvZHksIF9leHRlbmRzKHt9LCBpbml0LCB7CiAgICAgIGhlYWRlcnM6IF9leHRlbmRzKHt9LCBpbml0LmhlYWRlcnMsIHsKICAgICAgICAiWC1SZW1peC1Sb3V0ZXItRXJyb3IiOiAieWVzIgogICAgICB9KQogICAgfSkpOwogIH0KCiAgcmV0dXJuIHsKICAgIGRhdGFSb3V0ZXMsCiAgICBxdWVyeSwKICAgIHF1ZXJ5Um91dGUKICB9Owp9IC8vI2VuZHJlZ2lvbgovLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLwovLyNyZWdpb24gSGVscGVycwovLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLwoKLyoqCiAqIEdpdmVuIGFuIGV4aXN0aW5nIFN0YXRpY0hhbmRsZXJDb250ZXh0IGFuZCBhbiBlcnJvciB0aHJvd24gYXQgcmVuZGVyIHRpbWUsCiAqIHByb3ZpZGUgYW4gdXBkYXRlZCBTdGF0aWNIYW5kbGVyQ29udGV4dCBzdWl0YWJsZSBmb3IgYSBzZWNvbmQgU1NSIHJlbmRlcgogKi8KCmZ1bmN0aW9uIGdldFN0YXRpY0NvbnRleHRGcm9tRXJyb3Iocm91dGVzLCBjb250ZXh0LCBlcnJvcikgewogIGxldCBuZXdDb250ZXh0ID0gX2V4dGVuZHMoe30sIGNvbnRleHQsIHsKICAgIHN0YXR1c0NvZGU6IDUwMCwKICAgIGVycm9yczogewogICAgICBbY29udGV4dC5fZGVlcGVzdFJlbmRlcmVkQm91bmRhcnlJZCB8fCByb3V0ZXNbMF0uaWRdOiBlcnJvcgogICAgfQogIH0pOwoKICByZXR1cm4gbmV3Q29udGV4dDsKfSAvLyBOb3JtYWxpemUgbmF2aWdhdGlvbiBvcHRpb25zIGJ5IGNvbnZlcnRpbmcgZm9ybU1ldGhvZD1HRVQgZm9ybURhdGEgb2JqZWN0cyB0bwovLyBVUkxTZWFyY2hQYXJhbXMgc28gdGhleSBiZWhhdmUgaWRlbnRpY2FsbHkgdG8gbGlua3Mgd2l0aCBxdWVyeSBwYXJhbXMKCmZ1bmN0aW9uIG5vcm1hbGl6ZU5hdmlnYXRlT3B0aW9ucyh0bywgb3B0cywgaXNGZXRjaGVyKSB7CiAgaWYgKGlzRmV0Y2hlciA9PT0gdm9pZCAwKSB7CiAgICBpc0ZldGNoZXIgPSBmYWxzZTsKICB9CgogIGxldCBwYXRoID0gdHlwZW9mIHRvID09PSAic3RyaW5nIiA/IHRvIDogcm91dGVyX2NyZWF0ZVBhdGgodG8pOyAvLyBSZXR1cm4gbG9jYXRpb24gdmVyYmF0aW0gb24gbm9uLXN1Ym1pc3Npb24gbmF2aWdhdGlvbnMKCiAgaWYgKCFvcHRzIHx8ICEoImZvcm1NZXRob2QiIGluIG9wdHMpICYmICEoImZvcm1EYXRhIiBpbiBvcHRzKSkgewogICAgcmV0dXJuIHsKICAgICAgcGF0aAogICAgfTsKICB9IC8vIENyZWF0ZSBhIFN1Ym1pc3Npb24gb24gbm9uLUdFVCBuYXZpZ2F0aW9ucwoKCiAgaWYgKG9wdHMuZm9ybU1ldGhvZCAhPSBudWxsICYmIG9wdHMuZm9ybU1ldGhvZCAhPT0gImdldCIpIHsKICAgIHJldHVybiB7CiAgICAgIHBhdGgsCiAgICAgIHN1Ym1pc3Npb246IHsKICAgICAgICBmb3JtTWV0aG9kOiBvcHRzLmZvcm1NZXRob2QsCiAgICAgICAgZm9ybUFjdGlvbjogc3RyaXBIYXNoRnJvbVBhdGgocGF0aCksCiAgICAgICAgZm9ybUVuY1R5cGU6IG9wdHMgJiYgb3B0cy5mb3JtRW5jVHlwZSB8fCAiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkIiwKICAgICAgICBmb3JtRGF0YTogb3B0cy5mb3JtRGF0YQogICAgICB9CiAgICB9OwogIH0gLy8gTm8gZm9ybURhdGEgdG8gZmxhdHRlbiBmb3IgR0VUIHN1Ym1pc3Npb24KCgogIGlmICghb3B0cy5mb3JtRGF0YSkgewogICAgcmV0dXJuIHsKICAgICAgcGF0aAogICAgfTsKICB9IC8vIEZsYXR0ZW4gc3VibWlzc2lvbiBvbnRvIFVSTFNlYXJjaFBhcmFtcyBmb3IgR0VUIHN1Ym1pc3Npb25zCgoKICBsZXQgcGFyc2VkUGF0aCA9IHBhcnNlUGF0aChwYXRoKTsKCiAgdHJ5IHsKICAgIGxldCBzZWFyY2hQYXJhbXMgPSBjb252ZXJ0Rm9ybURhdGFUb1NlYXJjaFBhcmFtcyhvcHRzLmZvcm1EYXRhKTsgLy8gU2luY2UgZmV0Y2hlciBHRVQgc3VibWlzc2lvbnMgb25seSBydW4gYSBzaW5nbGUgbG9hZGVyIChhcyBvcHBvc2VkIHRvCiAgICAvLyBuYXZpZ2F0aW9uIEdFVCBzdWJtaXNzaW9ucyB3aGljaCBydW4gYWxsIGxvYWRlcnMpLCB3ZSBuZWVkIHRvIHByZXNlcnZlCiAgICAvLyBhbnkgaW5jb21pbmcgP2luZGV4IHBhcmFtcwoKICAgIGlmIChpc0ZldGNoZXIgJiYgcGFyc2VkUGF0aC5zZWFyY2ggJiYgaGFzTmFrZWRJbmRleFF1ZXJ5KHBhcnNlZFBhdGguc2VhcmNoKSkgewogICAgICBzZWFyY2hQYXJhbXMuYXBwZW5kKCJpbmRleCIsICIiKTsKICAgIH0KCiAgICBwYXJzZWRQYXRoLnNlYXJjaCA9ICI/IiArIHNlYXJjaFBhcmFtczsKICB9IGNhdGNoIChlKSB7CiAgICByZXR1cm4gewogICAgICBwYXRoLAogICAgICBlcnJvcjogbmV3IEVycm9yUmVzcG9uc2UoNDAwLCAiQmFkIFJlcXVlc3QiLCAiQ2Fubm90IHN1Ym1pdCBiaW5hcnkgZm9ybSBkYXRhIHVzaW5nIEdFVCIpCiAgICB9OwogIH0KCiAgcmV0dXJuIHsKICAgIHBhdGg6IHJvdXRlcl9jcmVhdGVQYXRoKHBhcnNlZFBhdGgpCiAgfTsKfQoKZnVuY3Rpb24gZ2V0TG9hZGVyUmVkaXJlY3Qoc3RhdGUsIHJlZGlyZWN0KSB7CiAgbGV0IHsKICAgIGZvcm1NZXRob2QsCiAgICBmb3JtQWN0aW9uLAogICAgZm9ybUVuY1R5cGUsCiAgICBmb3JtRGF0YQogIH0gPSBzdGF0ZS5uYXZpZ2F0aW9uOwogIGxldCBuYXZpZ2F0aW9uID0gewogICAgc3RhdGU6ICJsb2FkaW5nIiwKICAgIGxvY2F0aW9uOiBjcmVhdGVMb2NhdGlvbihzdGF0ZS5sb2NhdGlvbiwgcmVkaXJlY3QubG9jYXRpb24pLAogICAgZm9ybU1ldGhvZDogZm9ybU1ldGhvZCB8fCB1bmRlZmluZWQsCiAgICBmb3JtQWN0aW9uOiBmb3JtQWN0aW9uIHx8IHVuZGVmaW5lZCwKICAgIGZvcm1FbmNUeXBlOiBmb3JtRW5jVHlwZSB8fCB1bmRlZmluZWQsCiAgICBmb3JtRGF0YTogZm9ybURhdGEgfHwgdW5kZWZpbmVkCiAgfTsKICByZXR1cm4gbmF2aWdhdGlvbjsKfSAvLyBGaWx0ZXIgb3V0IGFsbCByb3V0ZXMgYmVsb3cgYW55IGNhdWdodCBlcnJvciBhcyB0aGV5IGFyZW4ndCBnb2luZyB0bwovLyByZW5kZXIgc28gd2UgZG9uJ3QgbmVlZCB0byBsb2FkIHRoZW0KCgpmdW5jdGlvbiBnZXRMb2FkZXJNYXRjaGVzVW50aWxCb3VuZGFyeShtYXRjaGVzLCBib3VuZGFyeUlkKSB7CiAgbGV0IGJvdW5kYXJ5TWF0Y2hlcyA9IG1hdGNoZXM7CgogIGlmIChib3VuZGFyeUlkKSB7CiAgICBsZXQgaW5kZXggPSBtYXRjaGVzLmZpbmRJbmRleChtID0+IG0ucm91dGUuaWQgPT09IGJvdW5kYXJ5SWQpOwoKICAgIGlmIChpbmRleCA+PSAwKSB7CiAgICAgIGJvdW5kYXJ5TWF0Y2hlcyA9IG1hdGNoZXMuc2xpY2UoMCwgaW5kZXgpOwogICAgfQogIH0KCiAgcmV0dXJuIGJvdW5kYXJ5TWF0Y2hlczsKfQoKZnVuY3Rpb24gZ2V0TWF0Y2hlc1RvTG9hZChzdGF0ZSwgbWF0Y2hlcywgc3VibWlzc2lvbiwgbG9jYXRpb24sIGlzUmV2YWxpZGF0aW9uUmVxdWlyZWQsIGNhbmNlbGxlZERlZmVycmVkUm91dGVzLCBjYW5jZWxsZWRGZXRjaGVyTG9hZHMsIHBlbmRpbmdBY3Rpb25EYXRhLCBwZW5kaW5nRXJyb3IsIGZldGNoTG9hZE1hdGNoZXMpIHsKICBsZXQgYWN0aW9uUmVzdWx0ID0gcGVuZGluZ0Vycm9yID8gT2JqZWN0LnZhbHVlcyhwZW5kaW5nRXJyb3IpWzBdIDogcGVuZGluZ0FjdGlvbkRhdGEgPyBPYmplY3QudmFsdWVzKHBlbmRpbmdBY3Rpb25EYXRhKVswXSA6IG51bGw7IC8vIFBpY2sgbmF2aWdhdGlvbiBtYXRjaGVzIHRoYXQgYXJlIG5ldC1uZXcgb3IgcXVhbGlmeSBmb3IgcmV2YWxpZGF0aW9uCgogIGxldCBib3VuZGFyeUlkID0gcGVuZGluZ0Vycm9yID8gT2JqZWN0LmtleXMocGVuZGluZ0Vycm9yKVswXSA6IHVuZGVmaW5lZDsKICBsZXQgYm91bmRhcnlNYXRjaGVzID0gZ2V0TG9hZGVyTWF0Y2hlc1VudGlsQm91bmRhcnkobWF0Y2hlcywgYm91bmRhcnlJZCk7CiAgbGV0IG5hdmlnYXRpb25NYXRjaGVzID0gYm91bmRhcnlNYXRjaGVzLmZpbHRlcigobWF0Y2gsIGluZGV4KSA9PiBtYXRjaC5yb3V0ZS5sb2FkZXIgIT0gbnVsbCAmJiAoaXNOZXdMb2FkZXIoc3RhdGUubG9hZGVyRGF0YSwgc3RhdGUubWF0Y2hlc1tpbmRleF0sIG1hdGNoKSB8fCAvLyBJZiB0aGlzIHJvdXRlIGhhZCBhIHBlbmRpbmcgZGVmZXJyZWQgY2FuY2VsbGVkIGl0IG11c3QgYmUgcmV2YWxpZGF0ZWQKICBjYW5jZWxsZWREZWZlcnJlZFJvdXRlcy5zb21lKGlkID0+IGlkID09PSBtYXRjaC5yb3V0ZS5pZCkgfHwgc2hvdWxkUmV2YWxpZGF0ZUxvYWRlcihzdGF0ZS5sb2NhdGlvbiwgc3RhdGUubWF0Y2hlc1tpbmRleF0sIHN1Ym1pc3Npb24sIGxvY2F0aW9uLCBtYXRjaCwgaXNSZXZhbGlkYXRpb25SZXF1aXJlZCwgYWN0aW9uUmVzdWx0KSkpOyAvLyBQaWNrIGZldGNoZXIubG9hZHMgdGhhdCBuZWVkIHRvIGJlIHJldmFsaWRhdGVkCgogIGxldCByZXZhbGlkYXRpbmdGZXRjaGVycyA9IFtdOwogIGZldGNoTG9hZE1hdGNoZXMgJiYgZmV0Y2hMb2FkTWF0Y2hlcy5mb3JFYWNoKChfcmVmMTAsIGtleSkgPT4gewogICAgbGV0IFtocmVmLCBtYXRjaCwgZmV0Y2hNYXRjaGVzXSA9IF9yZWYxMDsKCiAgICAvLyBUaGlzIGZldGNoZXIgd2FzIGNhbmNlbGxlZCBmcm9tIGEgcHJpb3IgYWN0aW9uIHN1Ym1pc3Npb24gLSBmb3JjZSByZWxvYWQKICAgIGlmIChjYW5jZWxsZWRGZXRjaGVyTG9hZHMuaW5jbHVkZXMoa2V5KSkgewogICAgICByZXZhbGlkYXRpbmdGZXRjaGVycy5wdXNoKFtrZXksIGhyZWYsIG1hdGNoLCBmZXRjaE1hdGNoZXNdKTsKICAgIH0gZWxzZSBpZiAoaXNSZXZhbGlkYXRpb25SZXF1aXJlZCkgewogICAgICBsZXQgc2hvdWxkUmV2YWxpZGF0ZSA9IHNob3VsZFJldmFsaWRhdGVMb2FkZXIoaHJlZiwgbWF0Y2gsIHN1Ym1pc3Npb24sIGhyZWYsIG1hdGNoLCBpc1JldmFsaWRhdGlvblJlcXVpcmVkLCBhY3Rpb25SZXN1bHQpOwoKICAgICAgaWYgKHNob3VsZFJldmFsaWRhdGUpIHsKICAgICAgICByZXZhbGlkYXRpbmdGZXRjaGVycy5wdXNoKFtrZXksIGhyZWYsIG1hdGNoLCBmZXRjaE1hdGNoZXNdKTsKICAgICAgfQogICAgfQogIH0pOwogIHJldHVybiBbbmF2aWdhdGlvbk1hdGNoZXMsIHJldmFsaWRhdGluZ0ZldGNoZXJzXTsKfQoKZnVuY3Rpb24gaXNOZXdMb2FkZXIoY3VycmVudExvYWRlckRhdGEsIGN1cnJlbnRNYXRjaCwgbWF0Y2gpIHsKICBsZXQgaXNOZXcgPSAvLyBbYV0gLT4gW2EsIGJdCiAgIWN1cnJlbnRNYXRjaCB8fCAvLyBbYSwgYl0gLT4gW2EsIGNdCiAgbWF0Y2gucm91dGUuaWQgIT09IGN1cnJlbnRNYXRjaC5yb3V0ZS5pZDsgLy8gSGFuZGxlIHRoZSBjYXNlIHRoYXQgd2UgZG9uJ3QgaGF2ZSBkYXRhIGZvciBhIHJlLXVzZWQgcm91dGUsIHBvdGVudGlhbGx5CiAgLy8gZnJvbSBhIHByaW9yIGVycm9yIG9yIGZyb20gYSBjYW5jZWxsZWQgcGVuZGluZyBkZWZlcnJlZAoKICBsZXQgaXNNaXNzaW5nRGF0YSA9IGN1cnJlbnRMb2FkZXJEYXRhW21hdGNoLnJvdXRlLmlkXSA9PT0gdW5kZWZpbmVkOyAvLyBBbHdheXMgbG9hZCBpZiB0aGlzIGlzIGEgbmV0LW5ldyByb3V0ZSBvciB3ZSBkb24ndCB5ZXQgaGF2ZSBkYXRhCgogIHJldHVybiBpc05ldyB8fCBpc01pc3NpbmdEYXRhOwp9CgpmdW5jdGlvbiBpc05ld1JvdXRlSW5zdGFuY2UoY3VycmVudE1hdGNoLCBtYXRjaCkgewogIGxldCBjdXJyZW50UGF0aCA9IGN1cnJlbnRNYXRjaC5yb3V0ZS5wYXRoOwogIHJldHVybiAoLy8gcGFyYW0gY2hhbmdlIGZvciB0aGlzIG1hdGNoLCAvdXNlcnMvMTIzIC0+IC91c2Vycy80NTYKICAgIGN1cnJlbnRNYXRjaC5wYXRobmFtZSAhPT0gbWF0Y2gucGF0aG5hbWUgfHwgLy8gc3BsYXQgcGFyYW0gY2hhbmdlZCwgd2hpY2ggaXMgbm90IHByZXNlbnQgaW4gbWF0Y2gucGF0aAogICAgLy8gZS5nLiAvZmlsZXMvaW1hZ2VzL2F2YXRhci5qcGcgLT4gZmlsZXMvZmluYW5jZXMueGxzCiAgICBjdXJyZW50UGF0aCAmJiBjdXJyZW50UGF0aC5lbmRzV2l0aCgiKiIpICYmIGN1cnJlbnRNYXRjaC5wYXJhbXNbIioiXSAhPT0gbWF0Y2gucGFyYW1zWyIqIl0KICApOwp9CgpmdW5jdGlvbiBzaG91bGRSZXZhbGlkYXRlTG9hZGVyKGN1cnJlbnRMb2NhdGlvbiwgY3VycmVudE1hdGNoLCBzdWJtaXNzaW9uLCBsb2NhdGlvbiwgbWF0Y2gsIGlzUmV2YWxpZGF0aW9uUmVxdWlyZWQsIGFjdGlvblJlc3VsdCkgewogIGxldCBjdXJyZW50VXJsID0gY3JlYXRlVVJMKGN1cnJlbnRMb2NhdGlvbik7CiAgbGV0IGN1cnJlbnRQYXJhbXMgPSBjdXJyZW50TWF0Y2gucGFyYW1zOwogIGxldCBuZXh0VXJsID0gY3JlYXRlVVJMKGxvY2F0aW9uKTsKICBsZXQgbmV4dFBhcmFtcyA9IG1hdGNoLnBhcmFtczsgLy8gVGhpcyBpcyB0aGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBhcyB0byB3aGVuIHdlIHJldmFsaWRhdGUuICBJZiB0aGUgcm91dGUKICAvLyBwcm92aWRlcyBpdCdzIG93biBpbXBsZW1lbnRhdGlvbiwgdGhlbiB3ZSBnaXZlIHRoZW0gZnVsbCBjb250cm9sIGJ1dAogIC8vIHByb3ZpZGUgdGhpcyB2YWx1ZSBzbyB0aGV5IGNhbiBsZXZlcmFnZSBpdCBpZiBuZWVkZWQgYWZ0ZXIgdGhleSBjaGVjawogIC8vIHRoZWlyIG93biBzcGVjaWZpYyB1c2UgY2FzZXMKICAvLyBOb3RlIHRoYXQgZmV0Y2hlcnMgYWx3YXlzIHByb3ZpZGUgdGhlIHNhbWUgY3VycmVudC9uZXh0IGxvY2F0aW9ucyBzbyB0aGUKICAvLyBVUkwtYmFzZWQgY2hlY2tzIGhlcmUgZG9uJ3QgYXBwbHkgdG8gZmV0Y2hlciBzaG91bGRSZXZhbGlkYXRlIGNhbGxzCgogIGxldCBkZWZhdWx0U2hvdWxkUmV2YWxpZGF0ZSA9IGlzTmV3Um91dGVJbnN0YW5jZShjdXJyZW50TWF0Y2gsIG1hdGNoKSB8fCAvLyBDbGlja2VkIHRoZSBzYW1lIGxpbmssIHJlc3VibWl0dGVkIGEgR0VUIGZvcm0KICBjdXJyZW50VXJsLnRvU3RyaW5nKCkgPT09IG5leHRVcmwudG9TdHJpbmcoKSB8fCAvLyBTZWFyY2ggcGFyYW1zIGFmZmVjdCBhbGwgbG9hZGVycwogIGN1cnJlbnRVcmwuc2VhcmNoICE9PSBuZXh0VXJsLnNlYXJjaCB8fCAvLyBGb3JjZWQgcmV2YWxpZGF0aW9uIGR1ZSB0byBzdWJtaXNzaW9uLCB1c2VSZXZhbGlkYXRlLCBvciBYLVJlbWl4LVJldmFsaWRhdGUKICBpc1JldmFsaWRhdGlvblJlcXVpcmVkOwoKICBpZiAobWF0Y2gucm91dGUuc2hvdWxkUmV2YWxpZGF0ZSkgewogICAgbGV0IHJvdXRlQ2hvaWNlID0gbWF0Y2gucm91dGUuc2hvdWxkUmV2YWxpZGF0ZShfZXh0ZW5kcyh7CiAgICAgIGN1cnJlbnRVcmwsCiAgICAgIGN1cnJlbnRQYXJhbXMsCiAgICAgIG5leHRVcmwsCiAgICAgIG5leHRQYXJhbXMKICAgIH0sIHN1Ym1pc3Npb24sIHsKICAgICAgYWN0aW9uUmVzdWx0LAogICAgICBkZWZhdWx0U2hvdWxkUmV2YWxpZGF0ZQogICAgfSkpOwoKICAgIGlmICh0eXBlb2Ygcm91dGVDaG9pY2UgPT09ICJib29sZWFuIikgewogICAgICByZXR1cm4gcm91dGVDaG9pY2U7CiAgICB9CiAgfQoKICByZXR1cm4gZGVmYXVsdFNob3VsZFJldmFsaWRhdGU7Cn0KCmFzeW5jIGZ1bmN0aW9uIGNhbGxMb2FkZXJPckFjdGlvbih0eXBlLCByZXF1ZXN0LCBtYXRjaCwgbWF0Y2hlcywgYmFzZW5hbWUsIGlzU3RhdGljUmVxdWVzdCwgaXNSb3V0ZVJlcXVlc3QpIHsKICBpZiAoaXNTdGF0aWNSZXF1ZXN0ID09PSB2b2lkIDApIHsKICAgIGlzU3RhdGljUmVxdWVzdCA9IGZhbHNlOwogIH0KCiAgaWYgKGlzUm91dGVSZXF1ZXN0ID09PSB2b2lkIDApIHsKICAgIGlzUm91dGVSZXF1ZXN0ID0gZmFsc2U7CiAgfQoKICBsZXQgcmVzdWx0VHlwZTsKICBsZXQgcmVzdWx0OyAvLyBTZXR1cCBhIHByb21pc2Ugd2UgY2FuIHJhY2UgYWdhaW5zdCBzbyB0aGF0IGFib3J0IHNpZ25hbHMgc2hvcnQgY2lyY3VpdAoKICBsZXQgcmVqZWN0OwogIGxldCBhYm9ydFByb21pc2UgPSBuZXcgUHJvbWlzZSgoXywgcikgPT4gcmVqZWN0ID0gcik7CgogIGxldCBvblJlamVjdCA9ICgpID0+IHJlamVjdCgpOwoKICByZXF1ZXN0LnNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCJhYm9ydCIsIG9uUmVqZWN0KTsKCiAgdHJ5IHsKICAgIGxldCBoYW5kbGVyID0gbWF0Y2gucm91dGVbdHlwZV07CiAgICByb3V0ZXJfaW52YXJpYW50KGhhbmRsZXIsICJDb3VsZCBub3QgZmluZCB0aGUgIiArIHR5cGUgKyAiIHRvIHJ1biBvbiB0aGUgXCIiICsgbWF0Y2gucm91dGUuaWQgKyAiXCIgcm91dGUiKTsKICAgIHJlc3VsdCA9IGF3YWl0IFByb21pc2UucmFjZShbaGFuZGxlcih7CiAgICAgIHJlcXVlc3QsCiAgICAgIHBhcmFtczogbWF0Y2gucGFyYW1zCiAgICB9KSwgYWJvcnRQcm9taXNlXSk7CiAgfSBjYXRjaCAoZSkgewogICAgcmVzdWx0VHlwZSA9IFJlc3VsdFR5cGUuZXJyb3I7CiAgICByZXN1bHQgPSBlOwogIH0gZmluYWxseSB7CiAgICByZXF1ZXN0LnNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCJhYm9ydCIsIG9uUmVqZWN0KTsKICB9CgogIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBSZXNwb25zZSkgewogICAgbGV0IHN0YXR1cyA9IHJlc3VsdC5zdGF0dXM7IC8vIFByb2Nlc3MgcmVkaXJlY3RzCgogICAgaWYgKHN0YXR1cyA+PSAzMDAgJiYgc3RhdHVzIDw9IDM5OSkgewogICAgICBsZXQgbG9jYXRpb24gPSByZXN1bHQuaGVhZGVycy5nZXQoIkxvY2F0aW9uIik7CiAgICAgIHJvdXRlcl9pbnZhcmlhbnQobG9jYXRpb24sICJSZWRpcmVjdHMgcmV0dXJuZWQvdGhyb3duIGZyb20gbG9hZGVycy9hY3Rpb25zIG11c3QgaGF2ZSBhIExvY2F0aW9uIGhlYWRlciIpOyAvLyBTdXBwb3J0IHJlbGF0aXZlIHJvdXRpbmcgaW4gcmVkaXJlY3RzCgogICAgICBsZXQgYWN0aXZlTWF0Y2hlcyA9IG1hdGNoZXMuc2xpY2UoMCwgbWF0Y2hlcy5pbmRleE9mKG1hdGNoKSArIDEpOwogICAgICBsZXQgcm91dGVQYXRobmFtZXMgPSBnZXRQYXRoQ29udHJpYnV0aW5nTWF0Y2hlcyhhY3RpdmVNYXRjaGVzKS5tYXAobWF0Y2ggPT4gbWF0Y2gucGF0aG5hbWVCYXNlKTsKICAgICAgbGV0IHJlcXVlc3RQYXRoID0gY3JlYXRlVVJMKHJlcXVlc3QudXJsKS5wYXRobmFtZTsKICAgICAgbGV0IHJlc29sdmVkTG9jYXRpb24gPSByZXNvbHZlVG8obG9jYXRpb24sIHJvdXRlUGF0aG5hbWVzLCByZXF1ZXN0UGF0aCk7CiAgICAgIHJvdXRlcl9pbnZhcmlhbnQocm91dGVyX2NyZWF0ZVBhdGgocmVzb2x2ZWRMb2NhdGlvbiksICJVbmFibGUgdG8gcmVzb2x2ZSByZWRpcmVjdCBsb2NhdGlvbjogIiArIHJlc3VsdC5oZWFkZXJzLmdldCgiTG9jYXRpb24iKSk7IC8vIFByZXBlbmQgdGhlIGJhc2VuYW1lIHRvIHRoZSByZWRpcmVjdCBsb2NhdGlvbiBpZiB3ZSBoYXZlIG9uZQoKICAgICAgaWYgKGJhc2VuYW1lKSB7CiAgICAgICAgbGV0IHBhdGggPSByZXNvbHZlZExvY2F0aW9uLnBhdGhuYW1lOwogICAgICAgIHJlc29sdmVkTG9jYXRpb24ucGF0aG5hbWUgPSBwYXRoID09PSAiLyIgPyBiYXNlbmFtZSA6IHJvdXRlcl9qb2luUGF0aHMoW2Jhc2VuYW1lLCBwYXRoXSk7CiAgICAgIH0KCiAgICAgIGxvY2F0aW9uID0gcm91dGVyX2NyZWF0ZVBhdGgocmVzb2x2ZWRMb2NhdGlvbik7IC8vIERvbid0IHByb2Nlc3MgcmVkaXJlY3RzIGluIHRoZSByb3V0ZXIgZHVyaW5nIHN0YXRpYyByZXF1ZXN0cyByZXF1ZXN0cy4KICAgICAgLy8gSW5zdGVhZCwgdGhyb3cgdGhlIFJlc3BvbnNlIGFuZCBsZXQgdGhlIHNlcnZlciBoYW5kbGUgaXQgd2l0aCBhbiBIVFRQCiAgICAgIC8vIHJlZGlyZWN0LiAgV2UgYWxzbyB1cGRhdGUgdGhlIExvY2F0aW9uIGhlYWRlciBpbiBwbGFjZSBpbiB0aGlzIGZsb3cgc28KICAgICAgLy8gYmFzZW5hbWUgYW5kIHJlbGF0aXZlIHJvdXRpbmcgaXMgdGFrZW4gaW50byBhY2NvdW50CgogICAgICBpZiAoaXNTdGF0aWNSZXF1ZXN0KSB7CiAgICAgICAgcmVzdWx0LmhlYWRlcnMuc2V0KCJMb2NhdGlvbiIsIGxvY2F0aW9uKTsKICAgICAgICB0aHJvdyByZXN1bHQ7CiAgICAgIH0KCiAgICAgIHJldHVybiB7CiAgICAgICAgdHlwZTogUmVzdWx0VHlwZS5yZWRpcmVjdCwKICAgICAgICBzdGF0dXMsCiAgICAgICAgbG9jYXRpb24sCiAgICAgICAgcmV2YWxpZGF0ZTogcmVzdWx0LmhlYWRlcnMuZ2V0KCJYLVJlbWl4LVJldmFsaWRhdGUiKSAhPT0gbnVsbAogICAgICB9OwogICAgfSAvLyBGb3IgU1NSIHNpbmdsZS1yb3V0ZSByZXF1ZXN0cywgd2Ugd2FudCB0byBoYW5kIFJlc3BvbnNlcyBiYWNrIGRpcmVjdGx5CiAgICAvLyB3aXRob3V0IHVud3JhcHBpbmcuICBXZSBkbyB0aGlzIHdpdGggdGhlIFF1ZXJ5Um91dGVSZXNwb25zZSB3cmFwcGVyCiAgICAvLyBpbnRlcmZhY2Ugc28gd2UgY2FuIGtub3cgd2hldGhlciBpdCB3YXMgcmV0dXJuZWQgb3IgdGhyb3duCgoKICAgIGlmIChpc1JvdXRlUmVxdWVzdCkgewogICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdGhyb3ctbGl0ZXJhbAogICAgICB0aHJvdyB7CiAgICAgICAgdHlwZTogcmVzdWx0VHlwZSB8fCBSZXN1bHRUeXBlLmRhdGEsCiAgICAgICAgcmVzcG9uc2U6IHJlc3VsdAogICAgICB9OwogICAgfQoKICAgIGxldCBkYXRhOwogICAgbGV0IGNvbnRlbnRUeXBlID0gcmVzdWx0LmhlYWRlcnMuZ2V0KCJDb250ZW50LVR5cGUiKTsKCiAgICBpZiAoY29udGVudFR5cGUgJiYgY29udGVudFR5cGUuc3RhcnRzV2l0aCgiYXBwbGljYXRpb24vanNvbiIpKSB7CiAgICAgIGRhdGEgPSBhd2FpdCByZXN1bHQuanNvbigpOwogICAgfSBlbHNlIHsKICAgICAgZGF0YSA9IGF3YWl0IHJlc3VsdC50ZXh0KCk7CiAgICB9CgogICAgaWYgKHJlc3VsdFR5cGUgPT09IFJlc3VsdFR5cGUuZXJyb3IpIHsKICAgICAgcmV0dXJuIHsKICAgICAgICB0eXBlOiByZXN1bHRUeXBlLAogICAgICAgIGVycm9yOiBuZXcgRXJyb3JSZXNwb25zZShzdGF0dXMsIHJlc3VsdC5zdGF0dXNUZXh0LCBkYXRhKSwKICAgICAgICBoZWFkZXJzOiByZXN1bHQuaGVhZGVycwogICAgICB9OwogICAgfQoKICAgIHJldHVybiB7CiAgICAgIHR5cGU6IFJlc3VsdFR5cGUuZGF0YSwKICAgICAgZGF0YSwKICAgICAgc3RhdHVzQ29kZTogcmVzdWx0LnN0YXR1cywKICAgICAgaGVhZGVyczogcmVzdWx0LmhlYWRlcnMKICAgIH07CiAgfQoKICBpZiAocmVzdWx0VHlwZSA9PT0gUmVzdWx0VHlwZS5lcnJvcikgewogICAgcmV0dXJuIHsKICAgICAgdHlwZTogcmVzdWx0VHlwZSwKICAgICAgZXJyb3I6IHJlc3VsdAogICAgfTsKICB9CgogIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBEZWZlcnJlZERhdGEpIHsKICAgIHJldHVybiB7CiAgICAgIHR5cGU6IFJlc3VsdFR5cGUuZGVmZXJyZWQsCiAgICAgIGRlZmVycmVkRGF0YTogcmVzdWx0CiAgICB9OwogIH0KCiAgcmV0dXJuIHsKICAgIHR5cGU6IFJlc3VsdFR5cGUuZGF0YSwKICAgIGRhdGE6IHJlc3VsdAogIH07Cn0KCmZ1bmN0aW9uIGNyZWF0ZVJlcXVlc3QobG9jYXRpb24sIHNpZ25hbCwgc3VibWlzc2lvbikgewogIGxldCB1cmwgPSBjcmVhdGVVUkwoc3RyaXBIYXNoRnJvbVBhdGgobG9jYXRpb24pKS50b1N0cmluZygpOwogIGxldCBpbml0ID0gewogICAgc2lnbmFsCiAgfTsKCiAgaWYgKHN1Ym1pc3Npb24pIHsKICAgIGxldCB7CiAgICAgIGZvcm1NZXRob2QsCiAgICAgIGZvcm1FbmNUeXBlLAogICAgICBmb3JtRGF0YQogICAgfSA9IHN1Ym1pc3Npb247CiAgICBpbml0Lm1ldGhvZCA9IGZvcm1NZXRob2QudG9VcHBlckNhc2UoKTsKICAgIGluaXQuYm9keSA9IGZvcm1FbmNUeXBlID09PSAiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkIiA/IGNvbnZlcnRGb3JtRGF0YVRvU2VhcmNoUGFyYW1zKGZvcm1EYXRhKSA6IGZvcm1EYXRhOwogIH0gLy8gQ29udGVudC1UeXBlIGlzIGluZmVycmVkIChodHRwczovL2ZldGNoLnNwZWMud2hhdHdnLm9yZy8jZG9tLXJlcXVlc3QpCgoKICByZXR1cm4gbmV3IFJlcXVlc3QodXJsLCBpbml0KTsKfQoKZnVuY3Rpb24gY29udmVydEZvcm1EYXRhVG9TZWFyY2hQYXJhbXMoZm9ybURhdGEpIHsKICBsZXQgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpOwoKICBmb3IgKGxldCBba2V5LCB2YWx1ZV0gb2YgZm9ybURhdGEuZW50cmllcygpKSB7CiAgICByb3V0ZXJfaW52YXJpYW50KHR5cGVvZiB2YWx1ZSA9PT0gInN0cmluZyIsICdGaWxlIGlucHV0cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIGVuY1R5cGUgImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCIsICcgKyAncGxlYXNlIHVzZSAibXVsdGlwYXJ0L2Zvcm0tZGF0YSIgaW5zdGVhZC4nKTsKICAgIHNlYXJjaFBhcmFtcy5hcHBlbmQoa2V5LCB2YWx1ZSk7CiAgfQoKICByZXR1cm4gc2VhcmNoUGFyYW1zOwp9CgpmdW5jdGlvbiBwcm9jZXNzUm91dGVMb2FkZXJEYXRhKG1hdGNoZXMsIG1hdGNoZXNUb0xvYWQsIHJlc3VsdHMsIHBlbmRpbmdFcnJvciwgYWN0aXZlRGVmZXJyZWRzKSB7CiAgLy8gRmlsbCBpbiBsb2FkZXJEYXRhL2Vycm9ycyBmcm9tIG91ciBsb2FkZXJzCiAgbGV0IGxvYWRlckRhdGEgPSB7fTsKICBsZXQgZXJyb3JzID0gbnVsbDsKICBsZXQgc3RhdHVzQ29kZTsKICBsZXQgZm91bmRFcnJvciA9IGZhbHNlOwogIGxldCBsb2FkZXJIZWFkZXJzID0ge307IC8vIFByb2Nlc3MgbG9hZGVyIHJlc3VsdHMgaW50byBzdGF0ZS5sb2FkZXJEYXRhL3N0YXRlLmVycm9ycwoKICByZXN1bHRzLmZvckVhY2goKHJlc3VsdCwgaW5kZXgpID0+IHsKICAgIGxldCBpZCA9IG1hdGNoZXNUb0xvYWRbaW5kZXhdLnJvdXRlLmlkOwogICAgcm91dGVyX2ludmFyaWFudCghaXNSZWRpcmVjdFJlc3VsdChyZXN1bHQpLCAiQ2Fubm90IGhhbmRsZSByZWRpcmVjdCByZXN1bHRzIGluIHByb2Nlc3NMb2FkZXJEYXRhIik7CgogICAgaWYgKGlzRXJyb3JSZXN1bHQocmVzdWx0KSkgewogICAgICAvLyBMb29rIHVwd2FyZHMgZnJvbSB0aGUgbWF0Y2hlZCByb3V0ZSBmb3IgdGhlIGNsb3Nlc3QgYW5jZXN0b3IKICAgICAgLy8gZXJyb3IgYm91bmRhcnksIGRlZmF1bHRpbmcgdG8gdGhlIHJvb3QgbWF0Y2gKICAgICAgbGV0IGJvdW5kYXJ5TWF0Y2ggPSBmaW5kTmVhcmVzdEJvdW5kYXJ5KG1hdGNoZXMsIGlkKTsKICAgICAgbGV0IGVycm9yID0gcmVzdWx0LmVycm9yOyAvLyBJZiB3ZSBoYXZlIGEgcGVuZGluZyBhY3Rpb24gZXJyb3IsIHdlIHJlcG9ydCBpdCBhdCB0aGUgaGlnaGVzdC1yb3V0ZQogICAgICAvLyB0aGF0IHRocm93cyBhIGxvYWRlciBlcnJvciwgYW5kIHRoZW4gY2xlYXIgaXQgb3V0IHRvIGluZGljYXRlIHRoYXQKICAgICAgLy8gaXQgd2FzIGNvbnN1bWVkCgogICAgICBpZiAocGVuZGluZ0Vycm9yKSB7CiAgICAgICAgZXJyb3IgPSBPYmplY3QudmFsdWVzKHBlbmRpbmdFcnJvcilbMF07CiAgICAgICAgcGVuZGluZ0Vycm9yID0gdW5kZWZpbmVkOwogICAgICB9CgogICAgICBlcnJvcnMgPSBPYmplY3QuYXNzaWduKGVycm9ycyB8fCB7fSwgewogICAgICAgIFtib3VuZGFyeU1hdGNoLnJvdXRlLmlkXTogZXJyb3IKICAgICAgfSk7IC8vIE9uY2Ugd2UgZmluZCBvdXIgZmlyc3QgKGhpZ2hlc3QpIGVycm9yLCB3ZSBzZXQgdGhlIHN0YXR1cyBjb2RlIGFuZAogICAgICAvLyBwcmV2ZW50IGRlZXBlciBzdGF0dXMgY29kZXMgZnJvbSBvdmVycmlkaW5nCgogICAgICBpZiAoIWZvdW5kRXJyb3IpIHsKICAgICAgICBmb3VuZEVycm9yID0gdHJ1ZTsKICAgICAgICBzdGF0dXNDb2RlID0gaXNSb3V0ZUVycm9yUmVzcG9uc2UocmVzdWx0LmVycm9yKSA/IHJlc3VsdC5lcnJvci5zdGF0dXMgOiA1MDA7CiAgICAgIH0KCiAgICAgIGlmIChyZXN1bHQuaGVhZGVycykgewogICAgICAgIGxvYWRlckhlYWRlcnNbaWRdID0gcmVzdWx0LmhlYWRlcnM7CiAgICAgIH0KICAgIH0gZWxzZSBpZiAoaXNEZWZlcnJlZFJlc3VsdChyZXN1bHQpKSB7CiAgICAgIGFjdGl2ZURlZmVycmVkcyAmJiBhY3RpdmVEZWZlcnJlZHMuc2V0KGlkLCByZXN1bHQuZGVmZXJyZWREYXRhKTsKICAgICAgbG9hZGVyRGF0YVtpZF0gPSByZXN1bHQuZGVmZXJyZWREYXRhLmRhdGE7IC8vIFRPRE86IEFkZCBzdGF0dXNDb2RlL2hlYWRlcnMgb25jZSB3ZSB3aXJlIHVwIHN0cmVhbWluZyBpbiBSZW1peAogICAgfSBlbHNlIHsKICAgICAgbG9hZGVyRGF0YVtpZF0gPSByZXN1bHQuZGF0YTsgLy8gRXJyb3Igc3RhdHVzIGNvZGVzIGFsd2F5cyBvdmVycmlkZSBzdWNjZXNzIHN0YXR1cyBjb2RlcywgYnV0IGlmIGFsbAogICAgICAvLyBsb2FkZXJzIGFyZSBzdWNjZXNzZnVsIHdlIHRha2UgdGhlIGRlZXBlc3Qgc3RhdHVzIGNvZGUuCgogICAgICBpZiAocmVzdWx0LnN0YXR1c0NvZGUgIT0gbnVsbCAmJiByZXN1bHQuc3RhdHVzQ29kZSAhPT0gMjAwICYmICFmb3VuZEVycm9yKSB7CiAgICAgICAgc3RhdHVzQ29kZSA9IHJlc3VsdC5zdGF0dXNDb2RlOwogICAgICB9CgogICAgICBpZiAocmVzdWx0LmhlYWRlcnMpIHsKICAgICAgICBsb2FkZXJIZWFkZXJzW2lkXSA9IHJlc3VsdC5oZWFkZXJzOwogICAgICB9CiAgICB9CiAgfSk7IC8vIElmIHdlIGRpZG4ndCBjb25zdW1lIHRoZSBwZW5kaW5nIGFjdGlvbiBlcnJvciAoaS5lLiwgYWxsIGxvYWRlcnMKICAvLyByZXNvbHZlZCksIHRoZW4gY29uc3VtZSBpdCBoZXJlCgogIGlmIChwZW5kaW5nRXJyb3IpIHsKICAgIGVycm9ycyA9IHBlbmRpbmdFcnJvcjsKICB9CgogIHJldHVybiB7CiAgICBsb2FkZXJEYXRhLAogICAgZXJyb3JzLAogICAgc3RhdHVzQ29kZTogc3RhdHVzQ29kZSB8fCAyMDAsCiAgICBsb2FkZXJIZWFkZXJzCiAgfTsKfQoKZnVuY3Rpb24gcHJvY2Vzc0xvYWRlckRhdGEoc3RhdGUsIG1hdGNoZXMsIG1hdGNoZXNUb0xvYWQsIHJlc3VsdHMsIHBlbmRpbmdFcnJvciwgcmV2YWxpZGF0aW5nRmV0Y2hlcnMsIGZldGNoZXJSZXN1bHRzLCBhY3RpdmVEZWZlcnJlZHMpIHsKICBsZXQgewogICAgbG9hZGVyRGF0YSwKICAgIGVycm9ycwogIH0gPSBwcm9jZXNzUm91dGVMb2FkZXJEYXRhKG1hdGNoZXMsIG1hdGNoZXNUb0xvYWQsIHJlc3VsdHMsIHBlbmRpbmdFcnJvciwgYWN0aXZlRGVmZXJyZWRzKTsgLy8gUHJvY2VzcyByZXN1bHRzIGZyb20gb3VyIHJldmFsaWRhdGluZyBmZXRjaGVycwoKICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgcmV2YWxpZGF0aW5nRmV0Y2hlcnMubGVuZ3RoOyBpbmRleCsrKSB7CiAgICBsZXQgW2tleSwsIG1hdGNoXSA9IHJldmFsaWRhdGluZ0ZldGNoZXJzW2luZGV4XTsKICAgIHJvdXRlcl9pbnZhcmlhbnQoZmV0Y2hlclJlc3VsdHMgIT09IHVuZGVmaW5lZCAmJiBmZXRjaGVyUmVzdWx0c1tpbmRleF0gIT09IHVuZGVmaW5lZCwgIkRpZCBub3QgZmluZCBjb3JyZXNwb25kaW5nIGZldGNoZXIgcmVzdWx0Iik7CiAgICBsZXQgcmVzdWx0ID0gZmV0Y2hlclJlc3VsdHNbaW5kZXhdOyAvLyBQcm9jZXNzIGZldGNoZXIgbm9uLXJlZGlyZWN0IGVycm9ycwoKICAgIGlmIChpc0Vycm9yUmVzdWx0KHJlc3VsdCkpIHsKICAgICAgbGV0IGJvdW5kYXJ5TWF0Y2ggPSBmaW5kTmVhcmVzdEJvdW5kYXJ5KHN0YXRlLm1hdGNoZXMsIG1hdGNoLnJvdXRlLmlkKTsKCiAgICAgIGlmICghKGVycm9ycyAmJiBlcnJvcnNbYm91bmRhcnlNYXRjaC5yb3V0ZS5pZF0pKSB7CiAgICAgICAgZXJyb3JzID0gX2V4dGVuZHMoe30sIGVycm9ycywgewogICAgICAgICAgW2JvdW5kYXJ5TWF0Y2gucm91dGUuaWRdOiByZXN1bHQuZXJyb3IKICAgICAgICB9KTsKICAgICAgfQoKICAgICAgc3RhdGUuZmV0Y2hlcnMuZGVsZXRlKGtleSk7CiAgICB9IGVsc2UgaWYgKGlzUmVkaXJlY3RSZXN1bHQocmVzdWx0KSkgewogICAgICAvLyBTaG91bGQgbmV2ZXIgZ2V0IGhlcmUsIHJlZGlyZWN0cyBzaG91bGQgZ2V0IHByb2Nlc3NlZCBhYm92ZSwgYnV0IHdlCiAgICAgIC8vIGtlZXAgdGhpcyB0byB0eXBlIG5hcnJvdyB0byBhIHN1Y2Nlc3MgcmVzdWx0IGluIHRoZSBlbHNlCiAgICAgIHRocm93IG5ldyBFcnJvcigiVW5oYW5kbGVkIGZldGNoZXIgcmV2YWxpZGF0aW9uIHJlZGlyZWN0Iik7CiAgICB9IGVsc2UgaWYgKGlzRGVmZXJyZWRSZXN1bHQocmVzdWx0KSkgewogICAgICAvLyBTaG91bGQgbmV2ZXIgZ2V0IGhlcmUsIGRlZmVycmVkIGRhdGEgc2hvdWxkIGJlIGF3YWl0ZWQgZm9yIGZldGNoZXJzCiAgICAgIC8vIGluIHJlc29sdmVEZWZlcnJlZFJlc3VsdHMKICAgICAgdGhyb3cgbmV3IEVycm9yKCJVbmhhbmRsZWQgZmV0Y2hlciBkZWZlcnJlZCBkYXRhIik7CiAgICB9IGVsc2UgewogICAgICBsZXQgZG9uZUZldGNoZXIgPSB7CiAgICAgICAgc3RhdGU6ICJpZGxlIiwKICAgICAgICBkYXRhOiByZXN1bHQuZGF0YSwKICAgICAgICBmb3JtTWV0aG9kOiB1bmRlZmluZWQsCiAgICAgICAgZm9ybUFjdGlvbjogdW5kZWZpbmVkLAogICAgICAgIGZvcm1FbmNUeXBlOiB1bmRlZmluZWQsCiAgICAgICAgZm9ybURhdGE6IHVuZGVmaW5lZAogICAgICB9OwogICAgICBzdGF0ZS5mZXRjaGVycy5zZXQoa2V5LCBkb25lRmV0Y2hlcik7CiAgICB9CiAgfQoKICByZXR1cm4gewogICAgbG9hZGVyRGF0YSwKICAgIGVycm9ycwogIH07Cn0KCmZ1bmN0aW9uIG1lcmdlTG9hZGVyRGF0YShsb2FkZXJEYXRhLCBuZXdMb2FkZXJEYXRhLCBtYXRjaGVzKSB7CiAgbGV0IG1lcmdlZExvYWRlckRhdGEgPSBfZXh0ZW5kcyh7fSwgbmV3TG9hZGVyRGF0YSk7CgogIG1hdGNoZXMuZm9yRWFjaChtYXRjaCA9PiB7CiAgICBsZXQgaWQgPSBtYXRjaC5yb3V0ZS5pZDsKCiAgICBpZiAobmV3TG9hZGVyRGF0YVtpZF0gPT09IHVuZGVmaW5lZCAmJiBsb2FkZXJEYXRhW2lkXSAhPT0gdW5kZWZpbmVkKSB7CiAgICAgIG1lcmdlZExvYWRlckRhdGFbaWRdID0gbG9hZGVyRGF0YVtpZF07CiAgICB9CiAgfSk7CiAgcmV0dXJuIG1lcmdlZExvYWRlckRhdGE7Cn0gLy8gRmluZCB0aGUgbmVhcmVzdCBlcnJvciBib3VuZGFyeSwgbG9va2luZyB1cHdhcmRzIGZyb20gdGhlIGxlYWYgcm91dGUgKG9yIHRoZQovLyByb3V0ZSBzcGVjaWZpZWQgYnkgcm91dGVJZCkgZm9yIHRoZSBjbG9zZXN0IGFuY2VzdG9yIGVycm9yIGJvdW5kYXJ5LAovLyBkZWZhdWx0aW5nIHRvIHRoZSByb290IG1hdGNoCgoKZnVuY3Rpb24gZmluZE5lYXJlc3RCb3VuZGFyeShtYXRjaGVzLCByb3V0ZUlkKSB7CiAgbGV0IGVsaWdpYmxlTWF0Y2hlcyA9IHJvdXRlSWQgPyBtYXRjaGVzLnNsaWNlKDAsIG1hdGNoZXMuZmluZEluZGV4KG0gPT4gbS5yb3V0ZS5pZCA9PT0gcm91dGVJZCkgKyAxKSA6IFsuLi5tYXRjaGVzXTsKICByZXR1cm4gZWxpZ2libGVNYXRjaGVzLnJldmVyc2UoKS5maW5kKG0gPT4gbS5yb3V0ZS5oYXNFcnJvckJvdW5kYXJ5ID09PSB0cnVlKSB8fCBtYXRjaGVzWzBdOwp9CgpmdW5jdGlvbiBnZXRTaG9ydENpcmN1aXRNYXRjaGVzKHJvdXRlcywgc3RhdHVzLCBzdGF0dXNUZXh0KSB7CiAgLy8gUHJlZmVyIGEgcm9vdCBsYXlvdXQgcm91dGUgaWYgcHJlc2VudCwgb3RoZXJ3aXNlIHNoaW0gaW4gYSByb3V0ZSBvYmplY3QKICBsZXQgcm91dGUgPSByb3V0ZXMuZmluZChyID0+IHIuaW5kZXggfHwgIXIucGF0aCB8fCByLnBhdGggPT09ICIvIikgfHwgewogICAgaWQ6ICJfX3NoaW0tIiArIHN0YXR1cyArICItcm91dGVfXyIKICB9OwogIHJldHVybiB7CiAgICBtYXRjaGVzOiBbewogICAgICBwYXJhbXM6IHt9LAogICAgICBwYXRobmFtZTogIiIsCiAgICAgIHBhdGhuYW1lQmFzZTogIiIsCiAgICAgIHJvdXRlCiAgICB9XSwKICAgIHJvdXRlLAogICAgZXJyb3I6IG5ldyBFcnJvclJlc3BvbnNlKHN0YXR1cywgc3RhdHVzVGV4dCwgbnVsbCkKICB9Owp9CgpmdW5jdGlvbiBnZXROb3RGb3VuZE1hdGNoZXMocm91dGVzKSB7CiAgcmV0dXJuIGdldFNob3J0Q2lyY3VpdE1hdGNoZXMocm91dGVzLCA0MDQsICJOb3QgRm91bmQiKTsKfQoKZnVuY3Rpb24gZ2V0TWV0aG9kTm90QWxsb3dlZE1hdGNoZXMocm91dGVzKSB7CiAgcmV0dXJuIGdldFNob3J0Q2lyY3VpdE1hdGNoZXMocm91dGVzLCA0MDUsICJNZXRob2QgTm90IEFsbG93ZWQiKTsKfQoKZnVuY3Rpb24gZ2V0TWV0aG9kTm90QWxsb3dlZFJlc3VsdChwYXRoKSB7CiAgbGV0IGhyZWYgPSB0eXBlb2YgcGF0aCA9PT0gInN0cmluZyIgPyBwYXRoIDogcm91dGVyX2NyZWF0ZVBhdGgocGF0aCk7CiAgY29uc29sZS53YXJuKCJZb3UncmUgdHJ5aW5nIHRvIHN1Ym1pdCB0byBhIHJvdXRlIHRoYXQgZG9lcyBub3QgaGF2ZSBhbiBhY3Rpb24uICBUbyAiICsgImZpeCB0aGlzLCBwbGVhc2UgYWRkIGFuIGBhY3Rpb25gIGZ1bmN0aW9uIHRvIHRoZSByb3V0ZSBmb3IgIiArICgiWyIgKyBocmVmICsgIl0iKSk7CiAgcmV0dXJuIHsKICAgIHR5cGU6IFJlc3VsdFR5cGUuZXJyb3IsCiAgICBlcnJvcjogbmV3IEVycm9yUmVzcG9uc2UoNDA1LCAiTWV0aG9kIE5vdCBBbGxvd2VkIiwgIiIpCiAgfTsKfSAvLyBGaW5kIGFueSByZXR1cm5lZCByZWRpcmVjdCBlcnJvcnMsIHN0YXJ0aW5nIGZyb20gdGhlIGxvd2VzdCBtYXRjaAoKCmZ1bmN0aW9uIGZpbmRSZWRpcmVjdChyZXN1bHRzKSB7CiAgZm9yIChsZXQgaSA9IHJlc3VsdHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHsKICAgIGxldCByZXN1bHQgPSByZXN1bHRzW2ldOwoKICAgIGlmIChpc1JlZGlyZWN0UmVzdWx0KHJlc3VsdCkpIHsKICAgICAgcmV0dXJuIHJlc3VsdDsKICAgIH0KICB9Cn0KCmZ1bmN0aW9uIHN0cmlwSGFzaEZyb21QYXRoKHBhdGgpIHsKICBsZXQgcGFyc2VkUGF0aCA9IHR5cGVvZiBwYXRoID09PSAic3RyaW5nIiA/IHBhcnNlUGF0aChwYXRoKSA6IHBhdGg7CiAgcmV0dXJuIHJvdXRlcl9jcmVhdGVQYXRoKF9leHRlbmRzKHt9LCBwYXJzZWRQYXRoLCB7CiAgICBoYXNoOiAiIgogIH0pKTsKfQoKZnVuY3Rpb24gaXNIYXNoQ2hhbmdlT25seShhLCBiKSB7CiAgcmV0dXJuIGEucGF0aG5hbWUgPT09IGIucGF0aG5hbWUgJiYgYS5zZWFyY2ggPT09IGIuc2VhcmNoICYmIGEuaGFzaCAhPT0gYi5oYXNoOwp9CgpmdW5jdGlvbiBpc0RlZmVycmVkUmVzdWx0KHJlc3VsdCkgewogIHJldHVybiByZXN1bHQudHlwZSA9PT0gUmVzdWx0VHlwZS5kZWZlcnJlZDsKfQoKZnVuY3Rpb24gaXNFcnJvclJlc3VsdChyZXN1bHQpIHsKICByZXR1cm4gcmVzdWx0LnR5cGUgPT09IFJlc3VsdFR5cGUuZXJyb3I7Cn0KCmZ1bmN0aW9uIGlzUmVkaXJlY3RSZXN1bHQocmVzdWx0KSB7CiAgcmV0dXJuIChyZXN1bHQgJiYgcmVzdWx0LnR5cGUpID09PSBSZXN1bHRUeXBlLnJlZGlyZWN0Owp9CgpmdW5jdGlvbiBpc1JlZGlyZWN0UmVzcG9uc2UocmVzdWx0KSB7CiAgaWYgKCEocmVzdWx0IGluc3RhbmNlb2YgUmVzcG9uc2UpKSB7CiAgICByZXR1cm4gZmFsc2U7CiAgfQoKICBsZXQgc3RhdHVzID0gcmVzdWx0LnN0YXR1czsKICBsZXQgbG9jYXRpb24gPSByZXN1bHQuaGVhZGVycy5nZXQoIkxvY2F0aW9uIik7CiAgcmV0dXJuIHN0YXR1cyA+PSAzMDAgJiYgc3RhdHVzIDw9IDM5OSAmJiBsb2NhdGlvbiAhPSBudWxsOwp9CgpmdW5jdGlvbiBpc1F1ZXJ5Um91dGVSZXNwb25zZShvYmopIHsKICByZXR1cm4gb2JqICYmIG9iai5yZXNwb25zZSBpbnN0YW5jZW9mIFJlc3BvbnNlICYmIChvYmoudHlwZSA9PT0gUmVzdWx0VHlwZS5kYXRhIHx8IFJlc3VsdFR5cGUuZXJyb3IpOwp9Cgphc3luYyBmdW5jdGlvbiByZXNvbHZlRGVmZXJyZWRSZXN1bHRzKGN1cnJlbnRNYXRjaGVzLCBtYXRjaGVzVG9Mb2FkLCByZXN1bHRzLCBzaWduYWwsIGlzRmV0Y2hlciwgY3VycmVudExvYWRlckRhdGEpIHsKICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgcmVzdWx0cy5sZW5ndGg7IGluZGV4KyspIHsKICAgIGxldCByZXN1bHQgPSByZXN1bHRzW2luZGV4XTsKICAgIGxldCBtYXRjaCA9IG1hdGNoZXNUb0xvYWRbaW5kZXhdOwogICAgbGV0IGN1cnJlbnRNYXRjaCA9IGN1cnJlbnRNYXRjaGVzLmZpbmQobSA9PiBtLnJvdXRlLmlkID09PSBtYXRjaC5yb3V0ZS5pZCk7CiAgICBsZXQgaXNSZXZhbGlkYXRpbmdMb2FkZXIgPSBjdXJyZW50TWF0Y2ggIT0gbnVsbCAmJiAhaXNOZXdSb3V0ZUluc3RhbmNlKGN1cnJlbnRNYXRjaCwgbWF0Y2gpICYmIChjdXJyZW50TG9hZGVyRGF0YSAmJiBjdXJyZW50TG9hZGVyRGF0YVttYXRjaC5yb3V0ZS5pZF0pICE9PSB1bmRlZmluZWQ7CgogICAgaWYgKGlzRGVmZXJyZWRSZXN1bHQocmVzdWx0KSAmJiAoaXNGZXRjaGVyIHx8IGlzUmV2YWxpZGF0aW5nTG9hZGVyKSkgewogICAgICAvLyBOb3RlOiB3ZSBkbyBub3QgaGF2ZSB0byB0b3VjaCBhY3RpdmVEZWZlcnJlZHMgaGVyZSBzaW5jZSB3ZSByYWNlIHRoZW0KICAgICAgLy8gYWdhaW5zdCB0aGUgc2lnbmFsIGluIHJlc29sdmVEZWZlcnJlZERhdGEgYW5kIHRoZXknbGwgZ2V0IGFib3J0ZWQKICAgICAgLy8gdGhlcmUgaWYgbmVlZGVkCiAgICAgIGF3YWl0IHJlc29sdmVEZWZlcnJlZERhdGEocmVzdWx0LCBzaWduYWwsIGlzRmV0Y2hlcikudGhlbihyZXN1bHQgPT4gewogICAgICAgIGlmIChyZXN1bHQpIHsKICAgICAgICAgIHJlc3VsdHNbaW5kZXhdID0gcmVzdWx0IHx8IHJlc3VsdHNbaW5kZXhdOwogICAgICAgIH0KICAgICAgfSk7CiAgICB9CiAgfQp9Cgphc3luYyBmdW5jdGlvbiByZXNvbHZlRGVmZXJyZWREYXRhKHJlc3VsdCwgc2lnbmFsLCB1bndyYXApIHsKICBpZiAodW53cmFwID09PSB2b2lkIDApIHsKICAgIHVud3JhcCA9IGZhbHNlOwogIH0KCiAgbGV0IGFib3J0ZWQgPSBhd2FpdCByZXN1bHQuZGVmZXJyZWREYXRhLnJlc29sdmVEYXRhKHNpZ25hbCk7CgogIGlmIChhYm9ydGVkKSB7CiAgICByZXR1cm47CiAgfQoKICBpZiAodW53cmFwKSB7CiAgICB0cnkgewogICAgICByZXR1cm4gewogICAgICAgIHR5cGU6IFJlc3VsdFR5cGUuZGF0YSwKICAgICAgICBkYXRhOiByZXN1bHQuZGVmZXJyZWREYXRhLnVud3JhcHBlZERhdGEKICAgICAgfTsKICAgIH0gY2F0Y2ggKGUpIHsKICAgICAgLy8gSGFuZGxlIGFueSBUcmFja2VkUHJvbWlzZS5fZXJyb3IgdmFsdWVzIGVuY291bnRlcmVkIHdoaWxlIHVud3JhcHBpbmcKICAgICAgcmV0dXJuIHsKICAgICAgICB0eXBlOiBSZXN1bHRUeXBlLmVycm9yLAogICAgICAgIGVycm9yOiBlCiAgICAgIH07CiAgICB9CiAgfQoKICByZXR1cm4gewogICAgdHlwZTogUmVzdWx0VHlwZS5kYXRhLAogICAgZGF0YTogcmVzdWx0LmRlZmVycmVkRGF0YS5kYXRhCiAgfTsKfQoKZnVuY3Rpb24gaGFzTmFrZWRJbmRleFF1ZXJ5KHNlYXJjaCkgewogIHJldHVybiBuZXcgVVJMU2VhcmNoUGFyYW1zKHNlYXJjaCkuZ2V0QWxsKCJpbmRleCIpLnNvbWUodiA9PiB2ID09PSAiIik7Cn0gLy8gTm90ZTogVGhpcyBzaG91bGQgbWF0Y2ggdGhlIGZvcm1hdCBleHBvcnRlZCBieSB1c2VNYXRjaGVzLCBzbyBpZiB5b3UgY2hhbmdlCi8vIHRoaXMgcGxlYXNlIGFsc28gY2hhbmdlIHRoYXQgOikgIEV2ZW50dWFsbHkgd2UnbGwgRFJZIHRoaXMgdXAKCgpmdW5jdGlvbiBjcmVhdGVVc2VNYXRjaGVzTWF0Y2gobWF0Y2gsIGxvYWRlckRhdGEpIHsKICBsZXQgewogICAgcm91dGUsCiAgICBwYXRobmFtZSwKICAgIHBhcmFtcwogIH0gPSBtYXRjaDsKICByZXR1cm4gewogICAgaWQ6IHJvdXRlLmlkLAogICAgcGF0aG5hbWUsCiAgICBwYXJhbXMsCiAgICBkYXRhOiBsb2FkZXJEYXRhW3JvdXRlLmlkXSwKICAgIGhhbmRsZTogcm91dGUuaGFuZGxlCiAgfTsKfQoKZnVuY3Rpb24gZ2V0VGFyZ2V0TWF0Y2gobWF0Y2hlcywgbG9jYXRpb24pIHsKICBsZXQgc2VhcmNoID0gdHlwZW9mIGxvY2F0aW9uID09PSAic3RyaW5nIiA/IHBhcnNlUGF0aChsb2NhdGlvbikuc2VhcmNoIDogbG9jYXRpb24uc2VhcmNoOwoKICBpZiAobWF0Y2hlc1ttYXRjaGVzLmxlbmd0aCAtIDFdLnJvdXRlLmluZGV4ICYmIGhhc05ha2VkSW5kZXhRdWVyeShzZWFyY2ggfHwgIiIpKSB7CiAgICAvLyBSZXR1cm4gdGhlIGxlYWYgaW5kZXggcm91dGUgd2hlbiBpbmRleCBpcyBwcmVzZW50CiAgICByZXR1cm4gbWF0Y2hlc1ttYXRjaGVzLmxlbmd0aCAtIDFdOwogIH0gLy8gT3RoZXJ3aXNlIGdyYWIgdGhlIGRlZXBlc3QgInBhdGggY29udHJpYnV0aW5nIiBtYXRjaCAoaWdub3JpbmcgaW5kZXggYW5kCiAgLy8gcGF0aGxlc3MgbGF5b3V0IHJvdXRlcykKCgogIGxldCBwYXRoTWF0Y2hlcyA9IGdldFBhdGhDb250cmlidXRpbmdNYXRjaGVzKG1hdGNoZXMpOwogIHJldHVybiBwYXRoTWF0Y2hlc1twYXRoTWF0Y2hlcy5sZW5ndGggLSAxXTsKfSAvLyNlbmRyZWdpb24KCgovLyMgc291cmNlTWFwcGluZ1VSTD1yb3V0ZXIuanMubWFwCgovLyBFWFRFUk5BTCBNT0RVTEU6IC4vbm9kZV9tb2R1bGVzL3JlYWN0L2luZGV4LmpzCnZhciByZWFjdCA9IF9fd2VicGFja19yZXF1aXJlX18oMjk0KTsKdmFyIHJlYWN0X25hbWVzcGFjZU9iamVjdCA9IC8qI19fUFVSRV9fKi9fX3dlYnBhY2tfcmVxdWlyZV9fLnQocmVhY3QsIDIpOwo7Ly8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL2Rpc3QvaW5kZXguanMKLyoqCiAqIFJlYWN0IFJvdXRlciB2Ni40LjMKICoKICogQ29weXJpZ2h0IChjKSBSZW1peCBTb2Z0d2FyZSBJbmMuCiAqCiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZQogKiBMSUNFTlNFLm1kIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuCiAqCiAqIEBsaWNlbnNlIE1JVAogKi8KCgoKCmZ1bmN0aW9uIGRpc3RfZXh0ZW5kcygpIHsKICBkaXN0X2V4dGVuZHMgPSBPYmplY3QuYXNzaWduID8gT2JqZWN0LmFzc2lnbi5iaW5kKCkgOiBmdW5jdGlvbiAodGFyZ2V0KSB7CiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgewogICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOwoKICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgewogICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7CiAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOwogICAgICAgIH0KICAgICAgfQogICAgfQoKICAgIHJldHVybiB0YXJnZXQ7CiAgfTsKICByZXR1cm4gZGlzdF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7Cn0KCi8qKgogKiBDb3B5cmlnaHQgKGMpIEZhY2Vib29rLCBJbmMuIGFuZCBpdHMgYWZmaWxpYXRlcy4KICoKICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlCiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4KICovCi8qKgogKiBpbmxpbmVkIE9iamVjdC5pcyBwb2x5ZmlsbCB0byBhdm9pZCByZXF1aXJpbmcgY29uc3VtZXJzIHNoaXAgdGhlaXIgb3duCiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9pcwogKi8KCmZ1bmN0aW9uIGlzUG9seWZpbGwoeCwgeSkgewogIHJldHVybiB4ID09PSB5ICYmICh4ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geSkgfHwgeCAhPT0geCAmJiB5ICE9PSB5IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2VsZi1jb21wYXJlCiAgOwp9Cgpjb25zdCBpcyA9IHR5cGVvZiBPYmplY3QuaXMgPT09ICJmdW5jdGlvbiIgPyBPYmplY3QuaXMgOiBpc1BvbHlmaWxsOyAvLyBJbnRlbnRpb25hbGx5IG5vdCB1c2luZyBuYW1lZCBpbXBvcnRzIGJlY2F1c2UgUm9sbHVwIHVzZXMgZHluYW1pYwovLyBkaXNwYXRjaCBmb3IgQ29tbW9uSlMgaW50ZXJvcCBuYW1lZCBpbXBvcnRzLgoKY29uc3QgewogIHVzZVN0YXRlLAogIHVzZUVmZmVjdCwKICB1c2VMYXlvdXRFZmZlY3QsCiAgdXNlRGVidWdWYWx1ZQp9ID0gcmVhY3RfbmFtZXNwYWNlT2JqZWN0OwpsZXQgZGlkV2Fybk9sZDE4QWxwaGEgPSBmYWxzZTsKbGV0IGRpZFdhcm5VbmNhY2hlZEdldFNuYXBzaG90ID0gZmFsc2U7IC8vIERpc2NsYWltZXI6IFRoaXMgc2hpbSBicmVha3MgbWFueSBvZiB0aGUgcnVsZXMgb2YgUmVhY3QsIGFuZCBvbmx5IHdvcmtzCi8vIGJlY2F1c2Ugb2YgYSB2ZXJ5IHBhcnRpY3VsYXIgc2V0IG9mIGltcGxlbWVudGF0aW9uIGRldGFpbHMgYW5kIGFzc3VtcHRpb25zCi8vIC0tIGNoYW5nZSBhbnkgb25lIG9mIHRoZW0gYW5kIGl0IHdpbGwgYnJlYWsuIFRoZSBtb3N0IGltcG9ydGFudCBhc3N1bXB0aW9uCi8vIGlzIHRoYXQgdXBkYXRlcyBhcmUgYWx3YXlzIHN5bmNocm9ub3VzLCBiZWNhdXNlIGNvbmN1cnJlbnQgcmVuZGVyaW5nIGlzCi8vIG9ubHkgYXZhaWxhYmxlIGluIHZlcnNpb25zIG9mIFJlYWN0IHRoYXQgYWxzbyBoYXZlIGEgYnVpbHQtaW4KLy8gdXNlU3luY0V4dGVybmFsU3RvcmUgQVBJLiBBbmQgd2Ugb25seSB1c2UgdGhpcyBzaGltIHdoZW4gdGhlIGJ1aWx0LWluIEFQSQovLyBkb2VzIG5vdCBleGlzdC4KLy8KLy8gRG8gbm90IGFzc3VtZSB0aGF0IHRoZSBjbGV2ZXIgaGFja3MgdXNlZCBieSB0aGlzIGhvb2sgYWxzbyB3b3JrIGluIGdlbmVyYWwuCi8vIFRoZSBwb2ludCBvZiB0aGlzIHNoaW0gaXMgdG8gcmVwbGFjZSB0aGUgbmVlZCBmb3IgaGFja3MgYnkgb3RoZXIgbGlicmFyaWVzLgoKZnVuY3Rpb24gdXNlU3luY0V4dGVybmFsU3RvcmUkMihzdWJzY3JpYmUsIGdldFNuYXBzaG90LCAvLyBOb3RlOiBUaGUgc2hpbSBkb2VzIG5vdCB1c2UgZ2V0U2VydmVyU25hcHNob3QsIGJlY2F1c2UgcHJlLTE4IHZlcnNpb25zIG9mCi8vIFJlYWN0IGRvIG5vdCBleHBvc2UgYSB3YXkgdG8gY2hlY2sgaWYgd2UncmUgaHlkcmF0aW5nLiBTbyB1c2VycyBvZiB0aGUgc2hpbQovLyB3aWxsIG5lZWQgdG8gdHJhY2sgdGhhdCB0aGVtc2VsdmVzIGFuZCByZXR1cm4gdGhlIGNvcnJlY3QgdmFsdWUKLy8gZnJvbSBgZ2V0U25hcHNob3RgLgpnZXRTZXJ2ZXJTbmFwc2hvdCkgewogIGlmIChmYWxzZSkge30gLy8gUmVhZCB0aGUgY3VycmVudCBzbmFwc2hvdCBmcm9tIHRoZSBzdG9yZSBvbiBldmVyeSByZW5kZXIuIEFnYWluLCB0aGlzCiAgLy8gYnJlYWtzIHRoZSBydWxlcyBvZiBSZWFjdCwgYW5kIG9ubHkgd29ya3MgaGVyZSBiZWNhdXNlIG9mIHNwZWNpZmljCiAgLy8gaW1wbGVtZW50YXRpb24gZGV0YWlscywgbW9zdCBpbXBvcnRhbnRseSB0aGF0IHVwZGF0ZXMgYXJlCiAgLy8gYWx3YXlzIHN5bmNocm9ub3VzLgoKCiAgY29uc3QgdmFsdWUgPSBnZXRTbmFwc2hvdCgpOwoKICBpZiAoZmFsc2UpIHt9IC8vIEJlY2F1c2UgdXBkYXRlcyBhcmUgc3luY2hyb25vdXMsIHdlIGRvbid0IHF1ZXVlIHRoZW0uIEluc3RlYWQgd2UgZm9yY2UgYQogIC8vIHJlLXJlbmRlciB3aGVuZXZlciB0aGUgc3Vic2NyaWJlZCBzdGF0ZSBjaGFuZ2VzIGJ5IHVwZGF0aW5nIGFuIHNvbWUKICAvLyBhcmJpdHJhcnkgdXNlU3RhdGUgaG9vay4gVGhlbiwgZHVyaW5nIHJlbmRlciwgd2UgY2FsbCBnZXRTbmFwc2hvdCB0byByZWFkCiAgLy8gdGhlIGN1cnJlbnQgdmFsdWUuCiAgLy8KICAvLyBCZWNhdXNlIHdlIGRvbid0IGFjdHVhbGx5IHVzZSB0aGUgc3RhdGUgcmV0dXJuZWQgYnkgdGhlIHVzZVN0YXRlIGhvb2ssIHdlCiAgLy8gY2FuIHNhdmUgYSBiaXQgb2YgbWVtb3J5IGJ5IHN0b3Jpbmcgb3RoZXIgc3R1ZmYgaW4gdGhhdCBzbG90LgogIC8vCiAgLy8gVG8gaW1wbGVtZW50IHRoZSBlYXJseSBiYWlsb3V0LCB3ZSBuZWVkIHRvIHRyYWNrIHNvbWUgdGhpbmdzIG9uIGEgbXV0YWJsZQogIC8vIG9iamVjdC4gVXN1YWxseSwgd2Ugd291bGQgcHV0IHRoYXQgaW4gYSB1c2VSZWYgaG9vaywgYnV0IHdlIGNhbiBzdGFzaCBpdCBpbgogIC8vIG91ciB1c2VTdGF0ZSBob29rIGluc3RlYWQuCiAgLy8KICAvLyBUbyBmb3JjZSBhIHJlLXJlbmRlciwgd2UgY2FsbCBmb3JjZVVwZGF0ZSh7aW5zdH0pLiBUaGF0IHdvcmtzIGJlY2F1c2UgdGhlCiAgLy8gbmV3IG9iamVjdCBhbHdheXMgZmFpbHMgYW4gZXF1YWxpdHkgY2hlY2suCgoKICBjb25zdCBbewogICAgaW5zdAogIH0sIGZvcmNlVXBkYXRlXSA9IHVzZVN0YXRlKHsKICAgIGluc3Q6IHsKICAgICAgdmFsdWUsCiAgICAgIGdldFNuYXBzaG90CiAgICB9CiAgfSk7IC8vIFRyYWNrIHRoZSBsYXRlc3QgZ2V0U25hcHNob3QgZnVuY3Rpb24gd2l0aCBhIHJlZi4gVGhpcyBuZWVkcyB0byBiZSB1cGRhdGVkCiAgLy8gaW4gdGhlIGxheW91dCBwaGFzZSBzbyB3ZSBjYW4gYWNjZXNzIGl0IGR1cmluZyB0aGUgdGVhcmluZyBjaGVjayB0aGF0CiAgLy8gaGFwcGVucyBvbiBzdWJzY3JpYmUuCgogIHVzZUxheW91dEVmZmVjdCgoKSA9PiB7CiAgICBpbnN0LnZhbHVlID0gdmFsdWU7CiAgICBpbnN0LmdldFNuYXBzaG90ID0gZ2V0U25hcHNob3Q7IC8vIFdoZW5ldmVyIGdldFNuYXBzaG90IG9yIHN1YnNjcmliZSBjaGFuZ2VzLCB3ZSBuZWVkIHRvIGNoZWNrIGluIHRoZQogICAgLy8gY29tbWl0IHBoYXNlIGlmIHRoZXJlIHdhcyBhbiBpbnRlcmxlYXZlZCBtdXRhdGlvbi4gSW4gY29uY3VycmVudCBtb2RlCiAgICAvLyB0aGlzIGNhbiBoYXBwZW4gYWxsIHRoZSB0aW1lLCBidXQgZXZlbiBpbiBzeW5jaHJvbm91cyBtb2RlLCBhbiBlYXJsaWVyCiAgICAvLyBlZmZlY3QgbWF5IGhhdmUgbXV0YXRlZCB0aGUgc3RvcmUuCgogICAgaWYgKGNoZWNrSWZTbmFwc2hvdENoYW5nZWQoaW5zdCkpIHsKICAgICAgLy8gRm9yY2UgYSByZS1yZW5kZXIuCiAgICAgIGZvcmNlVXBkYXRlKHsKICAgICAgICBpbnN0CiAgICAgIH0pOwogICAgfSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaG9va3MvZXhoYXVzdGl2ZS1kZXBzCgogIH0sIFtzdWJzY3JpYmUsIHZhbHVlLCBnZXRTbmFwc2hvdF0pOwogIHVzZUVmZmVjdCgoKSA9PiB7CiAgICAvLyBDaGVjayBmb3IgY2hhbmdlcyByaWdodCBiZWZvcmUgc3Vic2NyaWJpbmcuIFN1YnNlcXVlbnQgY2hhbmdlcyB3aWxsIGJlCiAgICAvLyBkZXRlY3RlZCBpbiB0aGUgc3Vic2NyaXB0aW9uIGhhbmRsZXIuCiAgICBpZiAoY2hlY2tJZlNuYXBzaG90Q2hhbmdlZChpbnN0KSkgewogICAgICAvLyBGb3JjZSBhIHJlLXJlbmRlci4KICAgICAgZm9yY2VVcGRhdGUoewogICAgICAgIGluc3QKICAgICAgfSk7CiAgICB9CgogICAgY29uc3QgaGFuZGxlU3RvcmVDaGFuZ2UgPSAoKSA9PiB7CiAgICAgIC8vIFRPRE86IEJlY2F1c2UgdGhlcmUgaXMgbm8gY3Jvc3MtcmVuZGVyZXIgQVBJIGZvciBiYXRjaGluZyB1cGRhdGVzLCBpdCdzCiAgICAgIC8vIHVwIHRvIHRoZSBjb25zdW1lciBvZiB0aGlzIGxpYnJhcnkgdG8gd3JhcCB0aGVpciBzdWJzY3JpcHRpb24gZXZlbnQKICAgICAgLy8gd2l0aCB1bnN0YWJsZV9iYXRjaGVkVXBkYXRlcy4gU2hvdWxkIHdlIHRyeSB0byBkZXRlY3Qgd2hlbiB0aGlzIGlzbid0CiAgICAgIC8vIHRoZSBjYXNlIGFuZCBwcmludCBhIHdhcm5pbmcgaW4gZGV2ZWxvcG1lbnQ/CiAgICAgIC8vIFRoZSBzdG9yZSBjaGFuZ2VkLiBDaGVjayBpZiB0aGUgc25hcHNob3QgY2hhbmdlZCBzaW5jZSB0aGUgbGFzdCB0aW1lIHdlCiAgICAgIC8vIHJlYWQgZnJvbSB0aGUgc3RvcmUuCiAgICAgIGlmIChjaGVja0lmU25hcHNob3RDaGFuZ2VkKGluc3QpKSB7CiAgICAgICAgLy8gRm9yY2UgYSByZS1yZW5kZXIuCiAgICAgICAgZm9yY2VVcGRhdGUoewogICAgICAgICAgaW5zdAogICAgICAgIH0pOwogICAgICB9CiAgICB9OyAvLyBTdWJzY3JpYmUgdG8gdGhlIHN0b3JlIGFuZCByZXR1cm4gYSBjbGVhbi11cCBmdW5jdGlvbi4KCgogICAgcmV0dXJuIHN1YnNjcmliZShoYW5kbGVTdG9yZUNoYW5nZSk7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1ob29rcy9leGhhdXN0aXZlLWRlcHMKICB9LCBbc3Vic2NyaWJlXSk7CiAgdXNlRGVidWdWYWx1ZSh2YWx1ZSk7CiAgcmV0dXJuIHZhbHVlOwp9CgpmdW5jdGlvbiBjaGVja0lmU25hcHNob3RDaGFuZ2VkKGluc3QpIHsKICBjb25zdCBsYXRlc3RHZXRTbmFwc2hvdCA9IGluc3QuZ2V0U25hcHNob3Q7CiAgY29uc3QgcHJldlZhbHVlID0gaW5zdC52YWx1ZTsKCiAgdHJ5IHsKICAgIGNvbnN0IG5leHRWYWx1ZSA9IGxhdGVzdEdldFNuYXBzaG90KCk7CiAgICByZXR1cm4gIWlzKHByZXZWYWx1ZSwgbmV4dFZhbHVlKTsKICB9IGNhdGNoIChlcnJvcikgewogICAgcmV0dXJuIHRydWU7CiAgfQp9CgovKioKICogQ29weXJpZ2h0IChjKSBGYWNlYm9vaywgSW5jLiBhbmQgaXRzIGFmZmlsaWF0ZXMuCiAqCiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZQogKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuCiAqCiAqIEBmbG93CiAqLwpmdW5jdGlvbiB1c2VTeW5jRXh0ZXJuYWxTdG9yZSQxKHN1YnNjcmliZSwgZ2V0U25hcHNob3QsIGdldFNlcnZlclNuYXBzaG90KSB7CiAgLy8gTm90ZTogVGhlIHNoaW0gZG9lcyBub3QgdXNlIGdldFNlcnZlclNuYXBzaG90LCBiZWNhdXNlIHByZS0xOCB2ZXJzaW9ucyBvZgogIC8vIFJlYWN0IGRvIG5vdCBleHBvc2UgYSB3YXkgdG8gY2hlY2sgaWYgd2UncmUgaHlkcmF0aW5nLiBTbyB1c2VycyBvZiB0aGUgc2hpbQogIC8vIHdpbGwgbmVlZCB0byB0cmFjayB0aGF0IHRoZW1zZWx2ZXMgYW5kIHJldHVybiB0aGUgY29ycmVjdCB2YWx1ZQogIC8vIGZyb20gYGdldFNuYXBzaG90YC4KICByZXR1cm4gZ2V0U25hcHNob3QoKTsKfQoKLyoqCiAqIElubGluZWQgaW50byB0aGUgcmVhY3Qtcm91dGVyIHJlcG8gc2luY2UgdXNlLXN5bmMtZXh0ZXJuYWwtc3RvcmUgZG9lcyBub3QKICogcHJvdmlkZSBhIFVNRC1jb21wYXRpYmxlIHBhY2thZ2UsIHNvIHdlIG5lZWQgdGhpcyB0byBiZSBhYmxlIHRvIGRpc3RyaWJ1dGUKICogVU1EIHJlYWN0LXJvdXRlciBidW5kbGVzCiAqLwpjb25zdCBjYW5Vc2VET00gPSAhISh0eXBlb2Ygd2luZG93ICE9PSAidW5kZWZpbmVkIiAmJiB0eXBlb2Ygd2luZG93LmRvY3VtZW50ICE9PSAidW5kZWZpbmVkIiAmJiB0eXBlb2Ygd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgIT09ICJ1bmRlZmluZWQiKTsKY29uc3QgaXNTZXJ2ZXJFbnZpcm9ubWVudCA9ICFjYW5Vc2VET007CmNvbnN0IHNoaW0gPSBpc1NlcnZlckVudmlyb25tZW50ID8gdXNlU3luY0V4dGVybmFsU3RvcmUkMSA6IHVzZVN5bmNFeHRlcm5hbFN0b3JlJDI7CmNvbnN0IHVzZVN5bmNFeHRlcm5hbFN0b3JlID0gIHRydWUgPyAobW9kdWxlID0+IG1vZHVsZS51c2VTeW5jRXh0ZXJuYWxTdG9yZSkocmVhY3RfbmFtZXNwYWNlT2JqZWN0KSA6IHNoaW07CgovLyBDb250ZXh0cyBmb3IgZGF0YSByb3V0ZXJzCmNvbnN0IERhdGFTdGF0aWNSb3V0ZXJDb250ZXh0ID0gLyojX19QVVJFX18qL3JlYWN0LmNyZWF0ZUNvbnRleHQobnVsbCk7CgppZiAoZmFsc2UpIHt9Cgpjb25zdCBEYXRhUm91dGVyQ29udGV4dCA9IC8qI19fUFVSRV9fKi9yZWFjdC5jcmVhdGVDb250ZXh0KG51bGwpOwoKaWYgKGZhbHNlKSB7fQoKY29uc3QgRGF0YVJvdXRlclN0YXRlQ29udGV4dCA9IC8qI19fUFVSRV9fKi9yZWFjdC5jcmVhdGVDb250ZXh0KG51bGwpOwoKaWYgKGZhbHNlKSB7fQoKY29uc3QgQXdhaXRDb250ZXh0ID0gLyojX19QVVJFX18qLygvKiB1bnVzZWQgcHVyZSBleHByZXNzaW9uIG9yIHN1cGVyICovIG51bGwgJiYgKFJlYWN0LmNyZWF0ZUNvbnRleHQobnVsbCkpKTsKCmlmIChmYWxzZSkge30KCmNvbnN0IE5hdmlnYXRpb25Db250ZXh0ID0gLyojX19QVVJFX18qL3JlYWN0LmNyZWF0ZUNvbnRleHQobnVsbCk7CgppZiAoZmFsc2UpIHt9Cgpjb25zdCBMb2NhdGlvbkNvbnRleHQgPSAvKiNfX1BVUkVfXyovcmVhY3QuY3JlYXRlQ29udGV4dChudWxsKTsKCmlmIChmYWxzZSkge30KCmNvbnN0IFJvdXRlQ29udGV4dCA9IC8qI19fUFVSRV9fKi9yZWFjdC5jcmVhdGVDb250ZXh0KHsKICBvdXRsZXQ6IG51bGwsCiAgbWF0Y2hlczogW10KfSk7CgppZiAoZmFsc2UpIHt9Cgpjb25zdCBSb3V0ZUVycm9yQ29udGV4dCA9IC8qI19fUFVSRV9fKi9yZWFjdC5jcmVhdGVDb250ZXh0KG51bGwpOwoKaWYgKGZhbHNlKSB7fQoKLyoqCiAqIFJldHVybnMgdGhlIGZ1bGwgaHJlZiBmb3IgdGhlIGdpdmVuICJ0byIgdmFsdWUuIFRoaXMgaXMgdXNlZnVsIGZvciBidWlsZGluZwogKiBjdXN0b20gbGlua3MgdGhhdCBhcmUgYWxzbyBhY2Nlc3NpYmxlIGFuZCBwcmVzZXJ2ZSByaWdodC1jbGljayBiZWhhdmlvci4KICoKICogQHNlZSBodHRwczovL3JlYWN0cm91dGVyLmNvbS9kb2NzL2VuL3Y2L2hvb2tzL3VzZS1ocmVmCiAqLwoKZnVuY3Rpb24gdXNlSHJlZih0bywgX3RlbXApIHsKICBsZXQgewogICAgcmVsYXRpdmUKICB9ID0gX3RlbXAgPT09IHZvaWQgMCA/IHt9IDogX3RlbXA7CiAgIXVzZUluUm91dGVyQ29udGV4dCgpID8gIGZhbHNlID8gMCA6IHJvdXRlcl9pbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwOwogIGxldCB7CiAgICBiYXNlbmFtZSwKICAgIG5hdmlnYXRvcgogIH0gPSByZWFjdC51c2VDb250ZXh0KE5hdmlnYXRpb25Db250ZXh0KTsKICBsZXQgewogICAgaGFzaCwKICAgIHBhdGhuYW1lLAogICAgc2VhcmNoCiAgfSA9IGRpc3RfdXNlUmVzb2x2ZWRQYXRoKHRvLCB7CiAgICByZWxhdGl2ZQogIH0pOwogIGxldCBqb2luZWRQYXRobmFtZSA9IHBhdGhuYW1lOyAvLyBJZiB3ZSdyZSBvcGVyYXRpbmcgd2l0aGluIGEgYmFzZW5hbWUsIHByZXBlbmQgaXQgdG8gdGhlIHBhdGhuYW1lIHByaW9yCiAgLy8gdG8gY3JlYXRpbmcgdGhlIGhyZWYuICBJZiB0aGlzIGlzIGEgcm9vdCBuYXZpZ2F0aW9uLCB0aGVuIGp1c3QgdXNlIHRoZSByYXcKICAvLyBiYXNlbmFtZSB3aGljaCBhbGxvd3MgdGhlIGJhc2VuYW1lIHRvIGhhdmUgZnVsbCBjb250cm9sIG92ZXIgdGhlIHByZXNlbmNlCiAgLy8gb2YgYSB0cmFpbGluZyBzbGFzaCBvbiByb290IGxpbmtzCgogIGlmIChiYXNlbmFtZSAhPT0gIi8iKSB7CiAgICBqb2luZWRQYXRobmFtZSA9IHBhdGhuYW1lID09PSAiLyIgPyBiYXNlbmFtZSA6IHJvdXRlcl9qb2luUGF0aHMoW2Jhc2VuYW1lLCBwYXRobmFtZV0pOwogIH0KCiAgcmV0dXJuIG5hdmlnYXRvci5jcmVhdGVIcmVmKHsKICAgIHBhdGhuYW1lOiBqb2luZWRQYXRobmFtZSwKICAgIHNlYXJjaCwKICAgIGhhc2gKICB9KTsKfQovKioKICogUmV0dXJucyB0cnVlIGlmIHRoaXMgY29tcG9uZW50IGlzIGEgZGVzY2VuZGFudCBvZiBhIDxSb3V0ZXI+LgogKgogKiBAc2VlIGh0dHBzOi8vcmVhY3Ryb3V0ZXIuY29tL2RvY3MvZW4vdjYvaG9va3MvdXNlLWluLXJvdXRlci1jb250ZXh0CiAqLwoKZnVuY3Rpb24gdXNlSW5Sb3V0ZXJDb250ZXh0KCkgewogIHJldHVybiByZWFjdC51c2VDb250ZXh0KExvY2F0aW9uQ29udGV4dCkgIT0gbnVsbDsKfQovKioKICogUmV0dXJucyB0aGUgY3VycmVudCBsb2NhdGlvbiBvYmplY3QsIHdoaWNoIHJlcHJlc2VudHMgdGhlIGN1cnJlbnQgVVJMIGluIHdlYgogKiBicm93c2Vycy4KICoKICogTm90ZTogSWYgeW91J3JlIHVzaW5nIHRoaXMgaXQgbWF5IG1lYW4geW91J3JlIGRvaW5nIHNvbWUgb2YgeW91ciBvd24KICogInJvdXRpbmciIGluIHlvdXIgYXBwLCBhbmQgd2UnZCBsaWtlIHRvIGtub3cgd2hhdCB5b3VyIHVzZSBjYXNlIGlzLiBXZSBtYXkKICogYmUgYWJsZSB0byBwcm92aWRlIHNvbWV0aGluZyBoaWdoZXItbGV2ZWwgdG8gYmV0dGVyIHN1aXQgeW91ciBuZWVkcy4KICoKICogQHNlZSBodHRwczovL3JlYWN0cm91dGVyLmNvbS9kb2NzL2VuL3Y2L2hvb2tzL3VzZS1sb2NhdGlvbgogKi8KCmZ1bmN0aW9uIGRpc3RfdXNlTG9jYXRpb24oKSB7CiAgIXVzZUluUm91dGVyQ29udGV4dCgpID8gIGZhbHNlID8gMCA6IHJvdXRlcl9pbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwOwogIHJldHVybiByZWFjdC51c2VDb250ZXh0KExvY2F0aW9uQ29udGV4dCkubG9jYXRpb247Cn0KLyoqCiAqIFJldHVybnMgdGhlIGN1cnJlbnQgbmF2aWdhdGlvbiBhY3Rpb24gd2hpY2ggZGVzY3JpYmVzIGhvdyB0aGUgcm91dGVyIGNhbWUgdG8KICogdGhlIGN1cnJlbnQgbG9jYXRpb24sIGVpdGhlciBieSBhIHBvcCwgcHVzaCwgb3IgcmVwbGFjZSBvbiB0aGUgaGlzdG9yeSBzdGFjay4KICoKICogQHNlZSBodHRwczovL3JlYWN0cm91dGVyLmNvbS9kb2NzL2VuL3Y2L2hvb2tzL3VzZS1uYXZpZ2F0aW9uLXR5cGUKICovCgpmdW5jdGlvbiB1c2VOYXZpZ2F0aW9uVHlwZSgpIHsKICByZXR1cm4gUmVhY3QudXNlQ29udGV4dChMb2NhdGlvbkNvbnRleHQpLm5hdmlnYXRpb25UeXBlOwp9Ci8qKgogKiBSZXR1cm5zIHRydWUgaWYgdGhlIFVSTCBmb3IgdGhlIGdpdmVuICJ0byIgdmFsdWUgbWF0Y2hlcyB0aGUgY3VycmVudCBVUkwuCiAqIFRoaXMgaXMgdXNlZnVsIGZvciBjb21wb25lbnRzIHRoYXQgbmVlZCB0byBrbm93ICJhY3RpdmUiIHN0YXRlLCBlLmcuCiAqIDxOYXZMaW5rPi4KICoKICogQHNlZSBodHRwczovL3JlYWN0cm91dGVyLmNvbS9kb2NzL2VuL3Y2L2hvb2tzL3VzZS1tYXRjaAogKi8KCmZ1bmN0aW9uIHVzZU1hdGNoKHBhdHRlcm4pIHsKICAhdXNlSW5Sb3V0ZXJDb250ZXh0KCkgPyAgZmFsc2UgPyAwIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDsKICBsZXQgewogICAgcGF0aG5hbWUKICB9ID0gZGlzdF91c2VMb2NhdGlvbigpOwogIHJldHVybiBSZWFjdC51c2VNZW1vKCgpID0+IG1hdGNoUGF0aChwYXR0ZXJuLCBwYXRobmFtZSksIFtwYXRobmFtZSwgcGF0dGVybl0pOwp9Ci8qKgogKiBUaGUgaW50ZXJmYWNlIGZvciB0aGUgbmF2aWdhdGUoKSBmdW5jdGlvbiByZXR1cm5lZCBmcm9tIHVzZU5hdmlnYXRlKCkuCiAqLwoKLyoqCiAqIFJldHVybnMgYW4gaW1wZXJhdGl2ZSBtZXRob2QgZm9yIGNoYW5naW5nIHRoZSBsb2NhdGlvbi4gVXNlZCBieSA8TGluaz5zLCBidXQKICogbWF5IGFsc28gYmUgdXNlZCBieSBvdGhlciBlbGVtZW50cyB0byBjaGFuZ2UgdGhlIGxvY2F0aW9uLgogKgogKiBAc2VlIGh0dHBzOi8vcmVhY3Ryb3V0ZXIuY29tL2RvY3MvZW4vdjYvaG9va3MvdXNlLW5hdmlnYXRlCiAqLwpmdW5jdGlvbiBkaXN0X3VzZU5hdmlnYXRlKCkgewogICF1c2VJblJvdXRlckNvbnRleHQoKSA/ICBmYWxzZSA/IDAgOiByb3V0ZXJfaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDsKICBsZXQgewogICAgYmFzZW5hbWUsCiAgICBuYXZpZ2F0b3IKICB9ID0gcmVhY3QudXNlQ29udGV4dChOYXZpZ2F0aW9uQ29udGV4dCk7CiAgbGV0IHsKICAgIG1hdGNoZXMKICB9ID0gcmVhY3QudXNlQ29udGV4dChSb3V0ZUNvbnRleHQpOwogIGxldCB7CiAgICBwYXRobmFtZTogbG9jYXRpb25QYXRobmFtZQogIH0gPSBkaXN0X3VzZUxvY2F0aW9uKCk7CiAgbGV0IHJvdXRlUGF0aG5hbWVzSnNvbiA9IEpTT04uc3RyaW5naWZ5KGdldFBhdGhDb250cmlidXRpbmdNYXRjaGVzKG1hdGNoZXMpLm1hcChtYXRjaCA9PiBtYXRjaC5wYXRobmFtZUJhc2UpKTsKICBsZXQgYWN0aXZlUmVmID0gcmVhY3QudXNlUmVmKGZhbHNlKTsKICByZWFjdC51c2VFZmZlY3QoKCkgPT4gewogICAgYWN0aXZlUmVmLmN1cnJlbnQgPSB0cnVlOwogIH0pOwogIGxldCBuYXZpZ2F0ZSA9IHJlYWN0LnVzZUNhbGxiYWNrKGZ1bmN0aW9uICh0bywgb3B0aW9ucykgewogICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgewogICAgICBvcHRpb25zID0ge307CiAgICB9CgogICAgIGZhbHNlID8gMCA6IHZvaWQgMDsKICAgIGlmICghYWN0aXZlUmVmLmN1cnJlbnQpIHJldHVybjsKCiAgICBpZiAodHlwZW9mIHRvID09PSAibnVtYmVyIikgewogICAgICBuYXZpZ2F0b3IuZ28odG8pOwogICAgICByZXR1cm47CiAgICB9CgogICAgbGV0IHBhdGggPSByZXNvbHZlVG8odG8sIEpTT04ucGFyc2Uocm91dGVQYXRobmFtZXNKc29uKSwgbG9jYXRpb25QYXRobmFtZSwgb3B0aW9ucy5yZWxhdGl2ZSA9PT0gInBhdGgiKTsgLy8gSWYgd2UncmUgb3BlcmF0aW5nIHdpdGhpbiBhIGJhc2VuYW1lLCBwcmVwZW5kIGl0IHRvIHRoZSBwYXRobmFtZSBwcmlvcgogICAgLy8gdG8gaGFuZGluZyBvZmYgdG8gaGlzdG9yeS4gIElmIHRoaXMgaXMgYSByb290IG5hdmlnYXRpb24sIHRoZW4gd2UKICAgIC8vIG5hdmlnYXRlIHRvIHRoZSByYXcgYmFzZW5hbWUgd2hpY2ggYWxsb3dzIHRoZSBiYXNlbmFtZSB0byBoYXZlIGZ1bGwKICAgIC8vIGNvbnRyb2wgb3ZlciB0aGUgcHJlc2VuY2Ugb2YgYSB0cmFpbGluZyBzbGFzaCBvbiByb290IGxpbmtzCgogICAgaWYgKGJhc2VuYW1lICE9PSAiLyIpIHsKICAgICAgcGF0aC5wYXRobmFtZSA9IHBhdGgucGF0aG5hbWUgPT09ICIvIiA/IGJhc2VuYW1lIDogcm91dGVyX2pvaW5QYXRocyhbYmFzZW5hbWUsIHBhdGgucGF0aG5hbWVdKTsKICAgIH0KCiAgICAoISFvcHRpb25zLnJlcGxhY2UgPyBuYXZpZ2F0b3IucmVwbGFjZSA6IG5hdmlnYXRvci5wdXNoKShwYXRoLCBvcHRpb25zLnN0YXRlLCBvcHRpb25zKTsKICB9LCBbYmFzZW5hbWUsIG5hdmlnYXRvciwgcm91dGVQYXRobmFtZXNKc29uLCBsb2NhdGlvblBhdGhuYW1lXSk7CiAgcmV0dXJuIG5hdmlnYXRlOwp9CmNvbnN0IE91dGxldENvbnRleHQgPSAvKiNfX1BVUkVfXyovcmVhY3QuY3JlYXRlQ29udGV4dChudWxsKTsKLyoqCiAqIFJldHVybnMgdGhlIGNvbnRleHQgKGlmIHByb3ZpZGVkKSBmb3IgdGhlIGNoaWxkIHJvdXRlIGF0IHRoaXMgbGV2ZWwgb2YgdGhlIHJvdXRlCiAqIGhpZXJhcmNoeS4KICogQHNlZSBodHRwczovL3JlYWN0cm91dGVyLmNvbS9kb2NzL2VuL3Y2L2hvb2tzL3VzZS1vdXRsZXQtY29udGV4dAogKi8KCmZ1bmN0aW9uIHVzZU91dGxldENvbnRleHQoKSB7CiAgcmV0dXJuIFJlYWN0LnVzZUNvbnRleHQoT3V0bGV0Q29udGV4dCk7Cn0KLyoqCiAqIFJldHVybnMgdGhlIGVsZW1lbnQgZm9yIHRoZSBjaGlsZCByb3V0ZSBhdCB0aGlzIGxldmVsIG9mIHRoZSByb3V0ZQogKiBoaWVyYXJjaHkuIFVzZWQgaW50ZXJuYWxseSBieSA8T3V0bGV0PiB0byByZW5kZXIgY2hpbGQgcm91dGVzLgogKgogKiBAc2VlIGh0dHBzOi8vcmVhY3Ryb3V0ZXIuY29tL2RvY3MvZW4vdjYvaG9va3MvdXNlLW91dGxldAogKi8KCmZ1bmN0aW9uIHVzZU91dGxldChjb250ZXh0KSB7CiAgbGV0IG91dGxldCA9IHJlYWN0LnVzZUNvbnRleHQoUm91dGVDb250ZXh0KS5vdXRsZXQ7CgogIGlmIChvdXRsZXQpIHsKICAgIHJldHVybiAvKiNfX1BVUkVfXyovcmVhY3QuY3JlYXRlRWxlbWVudChPdXRsZXRDb250ZXh0LlByb3ZpZGVyLCB7CiAgICAgIHZhbHVlOiBjb250ZXh0CiAgICB9LCBvdXRsZXQpOwogIH0KCiAgcmV0dXJuIG91dGxldDsKfQovKioKICogUmV0dXJucyBhbiBvYmplY3Qgb2Yga2V5L3ZhbHVlIHBhaXJzIG9mIHRoZSBkeW5hbWljIHBhcmFtcyBmcm9tIHRoZSBjdXJyZW50CiAqIFVSTCB0aGF0IHdlcmUgbWF0Y2hlZCBieSB0aGUgcm91dGUgcGF0aC4KICoKICogQHNlZSBodHRwczovL3JlYWN0cm91dGVyLmNvbS9kb2NzL2VuL3Y2L2hvb2tzL3VzZS1wYXJhbXMKICovCgpmdW5jdGlvbiB1c2VQYXJhbXMoKSB7CiAgbGV0IHsKICAgIG1hdGNoZXMKICB9ID0gUmVhY3QudXNlQ29udGV4dChSb3V0ZUNvbnRleHQpOwogIGxldCByb3V0ZU1hdGNoID0gbWF0Y2hlc1ttYXRjaGVzLmxlbmd0aCAtIDFdOwogIHJldHVybiByb3V0ZU1hdGNoID8gcm91dGVNYXRjaC5wYXJhbXMgOiB7fTsKfQovKioKICogUmVzb2x2ZXMgdGhlIHBhdGhuYW1lIG9mIHRoZSBnaXZlbiBgdG9gIHZhbHVlIGFnYWluc3QgdGhlIGN1cnJlbnQgbG9jYXRpb24uCiAqCiAqIEBzZWUgaHR0cHM6Ly9yZWFjdHJvdXRlci5jb20vZG9jcy9lbi92Ni9ob29rcy91c2UtcmVzb2x2ZWQtcGF0aAogKi8KCmZ1bmN0aW9uIGRpc3RfdXNlUmVzb2x2ZWRQYXRoKHRvLCBfdGVtcDIpIHsKICBsZXQgewogICAgcmVsYXRpdmUKICB9ID0gX3RlbXAyID09PSB2b2lkIDAgPyB7fSA6IF90ZW1wMjsKICBsZXQgewogICAgbWF0Y2hlcwogIH0gPSByZWFjdC51c2VDb250ZXh0KFJvdXRlQ29udGV4dCk7CiAgbGV0IHsKICAgIHBhdGhuYW1lOiBsb2NhdGlvblBhdGhuYW1lCiAgfSA9IGRpc3RfdXNlTG9jYXRpb24oKTsKICBsZXQgcm91dGVQYXRobmFtZXNKc29uID0gSlNPTi5zdHJpbmdpZnkoZ2V0UGF0aENvbnRyaWJ1dGluZ01hdGNoZXMobWF0Y2hlcykubWFwKG1hdGNoID0+IG1hdGNoLnBhdGhuYW1lQmFzZSkpOwogIHJldHVybiByZWFjdC51c2VNZW1vKCgpID0+IHJlc29sdmVUbyh0bywgSlNPTi5wYXJzZShyb3V0ZVBhdGhuYW1lc0pzb24pLCBsb2NhdGlvblBhdGhuYW1lLCByZWxhdGl2ZSA9PT0gInBhdGgiKSwgW3RvLCByb3V0ZVBhdGhuYW1lc0pzb24sIGxvY2F0aW9uUGF0aG5hbWUsIHJlbGF0aXZlXSk7Cn0KLyoqCiAqIFJldHVybnMgdGhlIGVsZW1lbnQgb2YgdGhlIHJvdXRlIHRoYXQgbWF0Y2hlZCB0aGUgY3VycmVudCBsb2NhdGlvbiwgcHJlcGFyZWQKICogd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0IHRvIHJlbmRlciB0aGUgcmVtYWluZGVyIG9mIHRoZSByb3V0ZSB0cmVlLiBSb3V0ZQogKiBlbGVtZW50cyBpbiB0aGUgdHJlZSBtdXN0IHJlbmRlciBhbiA8T3V0bGV0PiB0byByZW5kZXIgdGhlaXIgY2hpbGQgcm91dGUncwogKiBlbGVtZW50LgogKgogKiBAc2VlIGh0dHBzOi8vcmVhY3Ryb3V0ZXIuY29tL2RvY3MvZW4vdjYvaG9va3MvdXNlLXJvdXRlcwogKi8KCmZ1bmN0aW9uIHVzZVJvdXRlcyhyb3V0ZXMsIGxvY2F0aW9uQXJnKSB7CiAgIXVzZUluUm91dGVyQ29udGV4dCgpID8gIGZhbHNlID8gMCA6IHJvdXRlcl9pbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwOwogIGxldCBkYXRhUm91dGVyU3RhdGVDb250ZXh0ID0gcmVhY3QudXNlQ29udGV4dChEYXRhUm91dGVyU3RhdGVDb250ZXh0KTsKICBsZXQgewogICAgbWF0Y2hlczogcGFyZW50TWF0Y2hlcwogIH0gPSByZWFjdC51c2VDb250ZXh0KFJvdXRlQ29udGV4dCk7CiAgbGV0IHJvdXRlTWF0Y2ggPSBwYXJlbnRNYXRjaGVzW3BhcmVudE1hdGNoZXMubGVuZ3RoIC0gMV07CiAgbGV0IHBhcmVudFBhcmFtcyA9IHJvdXRlTWF0Y2ggPyByb3V0ZU1hdGNoLnBhcmFtcyA6IHt9OwogIGxldCBwYXJlbnRQYXRobmFtZSA9IHJvdXRlTWF0Y2ggPyByb3V0ZU1hdGNoLnBhdGhuYW1lIDogIi8iOwogIGxldCBwYXJlbnRQYXRobmFtZUJhc2UgPSByb3V0ZU1hdGNoID8gcm91dGVNYXRjaC5wYXRobmFtZUJhc2UgOiAiLyI7CiAgbGV0IHBhcmVudFJvdXRlID0gcm91dGVNYXRjaCAmJiByb3V0ZU1hdGNoLnJvdXRlOwoKICBpZiAoZmFsc2UpIHt9CgogIGxldCBsb2NhdGlvbkZyb21Db250ZXh0ID0gZGlzdF91c2VMb2NhdGlvbigpOwogIGxldCBsb2NhdGlvbjsKCiAgaWYgKGxvY2F0aW9uQXJnKSB7CiAgICB2YXIgX3BhcnNlZExvY2F0aW9uQXJnJHBhOwoKICAgIGxldCBwYXJzZWRMb2NhdGlvbkFyZyA9IHR5cGVvZiBsb2NhdGlvbkFyZyA9PT0gInN0cmluZyIgPyBwYXJzZVBhdGgobG9jYXRpb25BcmcpIDogbG9jYXRpb25Bcmc7CiAgICAhKHBhcmVudFBhdGhuYW1lQmFzZSA9PT0gIi8iIHx8ICgoX3BhcnNlZExvY2F0aW9uQXJnJHBhID0gcGFyc2VkTG9jYXRpb25BcmcucGF0aG5hbWUpID09IG51bGwgPyB2b2lkIDAgOiBfcGFyc2VkTG9jYXRpb25BcmckcGEuc3RhcnRzV2l0aChwYXJlbnRQYXRobmFtZUJhc2UpKSkgPyAgZmFsc2UgPyAwIDogcm91dGVyX2ludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7CiAgICBsb2NhdGlvbiA9IHBhcnNlZExvY2F0aW9uQXJnOwogIH0gZWxzZSB7CiAgICBsb2NhdGlvbiA9IGxvY2F0aW9uRnJvbUNvbnRleHQ7CiAgfQoKICBsZXQgcGF0aG5hbWUgPSBsb2NhdGlvbi5wYXRobmFtZSB8fCAiLyI7CiAgbGV0IHJlbWFpbmluZ1BhdGhuYW1lID0gcGFyZW50UGF0aG5hbWVCYXNlID09PSAiLyIgPyBwYXRobmFtZSA6IHBhdGhuYW1lLnNsaWNlKHBhcmVudFBhdGhuYW1lQmFzZS5sZW5ndGgpIHx8ICIvIjsKICBsZXQgbWF0Y2hlcyA9IG1hdGNoUm91dGVzKHJvdXRlcywgewogICAgcGF0aG5hbWU6IHJlbWFpbmluZ1BhdGhuYW1lCiAgfSk7CgogIGlmIChmYWxzZSkge30KCiAgbGV0IHJlbmRlcmVkTWF0Y2hlcyA9IF9yZW5kZXJNYXRjaGVzKG1hdGNoZXMgJiYgbWF0Y2hlcy5tYXAobWF0Y2ggPT4gT2JqZWN0LmFzc2lnbih7fSwgbWF0Y2gsIHsKICAgIHBhcmFtczogT2JqZWN0LmFzc2lnbih7fSwgcGFyZW50UGFyYW1zLCBtYXRjaC5wYXJhbXMpLAogICAgcGF0aG5hbWU6IHJvdXRlcl9qb2luUGF0aHMoW3BhcmVudFBhdGhuYW1lQmFzZSwgbWF0Y2gucGF0aG5hbWVdKSwKICAgIHBhdGhuYW1lQmFzZTogbWF0Y2gucGF0aG5hbWVCYXNlID09PSAiLyIgPyBwYXJlbnRQYXRobmFtZUJhc2UgOiByb3V0ZXJfam9pblBhdGhzKFtwYXJlbnRQYXRobmFtZUJhc2UsIG1hdGNoLnBhdGhuYW1lQmFzZV0pCiAgfSkpLCBwYXJlbnRNYXRjaGVzLCBkYXRhUm91dGVyU3RhdGVDb250ZXh0IHx8IHVuZGVmaW5lZCk7IC8vIFdoZW4gYSB1c2VyIHBhc3NlcyBpbiBhIGBsb2NhdGlvbkFyZ2AsIHRoZSBhc3NvY2lhdGVkIHJvdXRlcyBuZWVkIHRvCiAgLy8gYmUgd3JhcHBlZCBpbiBhIG5ldyBgTG9jYXRpb25Db250ZXh0LlByb3ZpZGVyYCBpbiBvcmRlciBmb3IgYHVzZUxvY2F0aW9uYAogIC8vIHRvIHVzZSB0aGUgc2NvcGVkIGxvY2F0aW9uIGluc3RlYWQgb2YgdGhlIGdsb2JhbCBsb2NhdGlvbi4KCgogIGlmIChsb2NhdGlvbkFyZyAmJiByZW5kZXJlZE1hdGNoZXMpIHsKICAgIHJldHVybiAvKiNfX1BVUkVfXyovcmVhY3QuY3JlYXRlRWxlbWVudChMb2NhdGlvbkNvbnRleHQuUHJvdmlkZXIsIHsKICAgICAgdmFsdWU6IHsKICAgICAgICBsb2NhdGlvbjogZGlzdF9leHRlbmRzKHsKICAgICAgICAgIHBhdGhuYW1lOiAiLyIsCiAgICAgICAgICBzZWFyY2g6ICIiLAogICAgICAgICAgaGFzaDogIiIsCiAgICAgICAgICBzdGF0ZTogbnVsbCwKICAgICAgICAgIGtleTogImRlZmF1bHQiCiAgICAgICAgfSwgbG9jYXRpb24pLAogICAgICAgIG5hdmlnYXRpb25UeXBlOiBBY3Rpb24uUG9wCiAgICAgIH0KICAgIH0sIHJlbmRlcmVkTWF0Y2hlcyk7CiAgfQoKICByZXR1cm4gcmVuZGVyZWRNYXRjaGVzOwp9CgpmdW5jdGlvbiBEZWZhdWx0RXJyb3JFbGVtZW50KCkgewogIGxldCBlcnJvciA9IHVzZVJvdXRlRXJyb3IoKTsKICBsZXQgbWVzc2FnZSA9IGlzUm91dGVFcnJvclJlc3BvbnNlKGVycm9yKSA/IGVycm9yLnN0YXR1cyArICIgIiArIGVycm9yLnN0YXR1c1RleHQgOiBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IEpTT04uc3RyaW5naWZ5KGVycm9yKTsKICBsZXQgc3RhY2sgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3Iuc3RhY2sgOiBudWxsOwogIGxldCBsaWdodGdyZXkgPSAicmdiYSgyMDAsMjAwLDIwMCwgMC41KSI7CiAgbGV0IHByZVN0eWxlcyA9IHsKICAgIHBhZGRpbmc6ICIwLjVyZW0iLAogICAgYmFja2dyb3VuZENvbG9yOiBsaWdodGdyZXkKICB9OwogIGxldCBjb2RlU3R5bGVzID0gewogICAgcGFkZGluZzogIjJweCA0cHgiLAogICAgYmFja2dyb3VuZENvbG9yOiBsaWdodGdyZXkKICB9OwogIHJldHVybiAvKiNfX1BVUkVfXyovcmVhY3QuY3JlYXRlRWxlbWVudChyZWFjdC5GcmFnbWVudCwgbnVsbCwgLyojX19QVVJFX18qL3JlYWN0LmNyZWF0ZUVsZW1lbnQoImgyIiwgbnVsbCwgIlVuaGFuZGxlZCBUaHJvd24gRXJyb3IhIiksIC8qI19fUFVSRV9fKi9yZWFjdC5jcmVhdGVFbGVtZW50KCJoMyIsIHsKICAgIHN0eWxlOiB7CiAgICAgIGZvbnRTdHlsZTogIml0YWxpYyIKICAgIH0KICB9LCBtZXNzYWdlKSwgc3RhY2sgPyAvKiNfX1BVUkVfXyovcmVhY3QuY3JlYXRlRWxlbWVudCgicHJlIiwgewogICAgc3R5bGU6IHByZVN0eWxlcwogIH0sIHN0YWNrKSA6IG51bGwsIC8qI19fUFVSRV9fKi9yZWFjdC5jcmVhdGVFbGVtZW50KCJwIiwgbnVsbCwgIlx1RDgzRFx1RENCRiBIZXkgZGV2ZWxvcGVyIFx1RDgzRFx1REM0QiIpLCAvKiNfX1BVUkVfXyovcmVhY3QuY3JlYXRlRWxlbWVudCgicCIsIG51bGwsICJZb3UgY2FuIHByb3ZpZGUgYSB3YXkgYmV0dGVyIFVYIHRoYW4gdGhpcyB3aGVuIHlvdXIgYXBwIHRocm93cyBlcnJvcnMgYnkgcHJvdmlkaW5nIHlvdXIgb3duXHhBMCIsIC8qI19fUFVSRV9fKi9yZWFjdC5jcmVhdGVFbGVtZW50KCJjb2RlIiwgewogICAgc3R5bGU6IGNvZGVTdHlsZXMKICB9LCAiZXJyb3JFbGVtZW50IiksICIgcHJvcHMgb25ceEEwIiwgLyojX19QVVJFX18qL3JlYWN0LmNyZWF0ZUVsZW1lbnQoImNvZGUiLCB7CiAgICBzdHlsZTogY29kZVN0eWxlcwogIH0sICI8Um91dGU+IikpKTsKfQoKY2xhc3MgUmVuZGVyRXJyb3JCb3VuZGFyeSBleHRlbmRzIHJlYWN0LkNvbXBvbmVudCB7CiAgY29uc3RydWN0b3IocHJvcHMpIHsKICAgIHN1cGVyKHByb3BzKTsKICAgIHRoaXMuc3RhdGUgPSB7CiAgICAgIGxvY2F0aW9uOiBwcm9wcy5sb2NhdGlvbiwKICAgICAgZXJyb3I6IHByb3BzLmVycm9yCiAgICB9OwogIH0KCiAgc3RhdGljIGdldERlcml2ZWRTdGF0ZUZyb21FcnJvcihlcnJvcikgewogICAgcmV0dXJuIHsKICAgICAgZXJyb3I6IGVycm9yCiAgICB9OwogIH0KCiAgc3RhdGljIGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyhwcm9wcywgc3RhdGUpIHsKICAgIC8vIFdoZW4gd2UgZ2V0IGludG8gYW4gZXJyb3Igc3RhdGUsIHRoZSB1c2VyIHdpbGwgbGlrZWx5IGNsaWNrICJiYWNrIiB0byB0aGUKICAgIC8vIHByZXZpb3VzIHBhZ2UgdGhhdCBkaWRuJ3QgaGF2ZSBhbiBlcnJvci4gQmVjYXVzZSB0aGlzIHdyYXBzIHRoZSBlbnRpcmUKICAgIC8vIGFwcGxpY2F0aW9uLCB0aGF0IHdpbGwgaGF2ZSBubyBlZmZlY3QtLXRoZSBlcnJvciBwYWdlIGNvbnRpbnVlcyB0byBkaXNwbGF5LgogICAgLy8gVGhpcyBnaXZlcyB1cyBhIG1lY2hhbmlzbSB0byByZWNvdmVyIGZyb20gdGhlIGVycm9yIHdoZW4gdGhlIGxvY2F0aW9uIGNoYW5nZXMuCiAgICAvLwogICAgLy8gV2hldGhlciB3ZSdyZSBpbiBhbiBlcnJvciBzdGF0ZSBvciBub3QsIHdlIHVwZGF0ZSB0aGUgbG9jYXRpb24gaW4gc3RhdGUKICAgIC8vIHNvIHRoYXQgd2hlbiB3ZSBhcmUgaW4gYW4gZXJyb3Igc3RhdGUsIGl0IGdldHMgcmVzZXQgd2hlbiBhIG5ldyBsb2NhdGlvbgogICAgLy8gY29tZXMgaW4gYW5kIHRoZSB1c2VyIHJlY292ZXJzIGZyb20gdGhlIGVycm9yLgogICAgaWYgKHN0YXRlLmxvY2F0aW9uICE9PSBwcm9wcy5sb2NhdGlvbikgewogICAgICByZXR1cm4gewogICAgICAgIGVycm9yOiBwcm9wcy5lcnJvciwKICAgICAgICBsb2NhdGlvbjogcHJvcHMubG9jYXRpb24KICAgICAgfTsKICAgIH0gLy8gSWYgd2UncmUgbm90IGNoYW5naW5nIGxvY2F0aW9ucywgcHJlc2VydmUgdGhlIGxvY2F0aW9uIGJ1dCBzdGlsbCBzdXJmYWNlCiAgICAvLyBhbnkgbmV3IGVycm9ycyB0aGF0IG1heSBjb21lIHRocm91Z2guIFdlIHJldGFpbiB0aGUgZXhpc3RpbmcgZXJyb3IsIHdlIGRvCiAgICAvLyB0aGlzIGJlY2F1c2UgdGhlIGVycm9yIHByb3ZpZGVkIGZyb20gdGhlIGFwcCBzdGF0ZSBtYXkgYmUgY2xlYXJlZCB3aXRob3V0CiAgICAvLyB0aGUgbG9jYXRpb24gY2hhbmdpbmcuCgoKICAgIHJldHVybiB7CiAgICAgIGVycm9yOiBwcm9wcy5lcnJvciB8fCBzdGF0ZS5lcnJvciwKICAgICAgbG9jYXRpb246IHN0YXRlLmxvY2F0aW9uCiAgICB9OwogIH0KCiAgY29tcG9uZW50RGlkQ2F0Y2goZXJyb3IsIGVycm9ySW5mbykgewogICAgY29uc29sZS5lcnJvcigiUmVhY3QgUm91dGVyIGNhdWdodCB0aGUgZm9sbG93aW5nIGVycm9yIGR1cmluZyByZW5kZXIiLCBlcnJvciwgZXJyb3JJbmZvKTsKICB9CgogIHJlbmRlcigpIHsKICAgIHJldHVybiB0aGlzLnN0YXRlLmVycm9yID8gLyojX19QVVJFX18qL3JlYWN0LmNyZWF0ZUVsZW1lbnQoUm91dGVFcnJvckNvbnRleHQuUHJvdmlkZXIsIHsKICAgICAgdmFsdWU6IHRoaXMuc3RhdGUuZXJyb3IsCiAgICAgIGNoaWxkcmVuOiB0aGlzLnByb3BzLmNvbXBvbmVudAogICAgfSkgOiB0aGlzLnByb3BzLmNoaWxkcmVuOwogIH0KCn0KCmZ1bmN0aW9uIFJlbmRlcmVkUm91dGUoX3JlZikgewogIGxldCB7CiAgICByb3V0ZUNvbnRleHQsCiAgICBtYXRjaCwKICAgIGNoaWxkcmVuCiAgfSA9IF9yZWY7CiAgbGV0IGRhdGFTdGF0aWNSb3V0ZXJDb250ZXh0ID0gcmVhY3QudXNlQ29udGV4dChEYXRhU3RhdGljUm91dGVyQ29udGV4dCk7IC8vIFRyYWNrIGhvdyBkZWVwIHdlIGdvdCBpbiBvdXIgcmVuZGVyIHBhc3MgdG8gZW11bGF0ZSBTU1IgY29tcG9uZW50RGlkQ2F0Y2gKICAvLyBpbiBhIERhdGFTdGF0aWNSb3V0ZXIKCiAgaWYgKGRhdGFTdGF0aWNSb3V0ZXJDb250ZXh0ICYmIG1hdGNoLnJvdXRlLmVycm9yRWxlbWVudCkgewogICAgZGF0YVN0YXRpY1JvdXRlckNvbnRleHQuX2RlZXBlc3RSZW5kZXJlZEJvdW5kYXJ5SWQgPSBtYXRjaC5yb3V0ZS5pZDsKICB9CgogIHJldHVybiAvKiNfX1BVUkVfXyovcmVhY3QuY3JlYXRlRWxlbWVudChSb3V0ZUNvbnRleHQuUHJvdmlkZXIsIHsKICAgIHZhbHVlOiByb3V0ZUNvbnRleHQKICB9LCBjaGlsZHJlbik7Cn0KCmZ1bmN0aW9uIF9yZW5kZXJNYXRjaGVzKG1hdGNoZXMsIHBhcmVudE1hdGNoZXMsIGRhdGFSb3V0ZXJTdGF0ZSkgewogIGlmIChwYXJlbnRNYXRjaGVzID09PSB2b2lkIDApIHsKICAgIHBhcmVudE1hdGNoZXMgPSBbXTsKICB9CgogIGlmIChtYXRjaGVzID09IG51bGwpIHsKICAgIGlmIChkYXRhUm91dGVyU3RhdGUgIT0gbnVsbCAmJiBkYXRhUm91dGVyU3RhdGUuZXJyb3JzKSB7CiAgICAgIC8vIERvbid0IGJhaWwgaWYgd2UgaGF2ZSBkYXRhIHJvdXRlciBlcnJvcnMgc28gd2UgY2FuIHJlbmRlciB0aGVtIGluIHRoZQogICAgICAvLyBib3VuZGFyeS4gIFVzZSB0aGUgcHJlLW1hdGNoZWQgKG9yIHNoaW1tZWQpIG1hdGNoZXMKICAgICAgbWF0Y2hlcyA9IGRhdGFSb3V0ZXJTdGF0ZS5tYXRjaGVzOwogICAgfSBlbHNlIHsKICAgICAgcmV0dXJuIG51bGw7CiAgICB9CiAgfQoKICBsZXQgcmVuZGVyZWRNYXRjaGVzID0gbWF0Y2hlczsgLy8gSWYgd2UgaGF2ZSBkYXRhIGVycm9ycywgdHJpbSBtYXRjaGVzIHRvIHRoZSBoaWdoZXN0IGVycm9yIGJvdW5kYXJ5CgogIGxldCBlcnJvcnMgPSBkYXRhUm91dGVyU3RhdGUgPT0gbnVsbCA/IHZvaWQgMCA6IGRhdGFSb3V0ZXJTdGF0ZS5lcnJvcnM7CgogIGlmIChlcnJvcnMgIT0gbnVsbCkgewogICAgbGV0IGVycm9ySW5kZXggPSByZW5kZXJlZE1hdGNoZXMuZmluZEluZGV4KG0gPT4gbS5yb3V0ZS5pZCAmJiAoZXJyb3JzID09IG51bGwgPyB2b2lkIDAgOiBlcnJvcnNbbS5yb3V0ZS5pZF0pKTsKICAgICEoZXJyb3JJbmRleCA+PSAwKSA/ICBmYWxzZSA/IDAgOiByb3V0ZXJfaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDsKICAgIHJlbmRlcmVkTWF0Y2hlcyA9IHJlbmRlcmVkTWF0Y2hlcy5zbGljZSgwLCBNYXRoLm1pbihyZW5kZXJlZE1hdGNoZXMubGVuZ3RoLCBlcnJvckluZGV4ICsgMSkpOwogIH0KCiAgcmV0dXJuIHJlbmRlcmVkTWF0Y2hlcy5yZWR1Y2VSaWdodCgob3V0bGV0LCBtYXRjaCwgaW5kZXgpID0+IHsKICAgIGxldCBlcnJvciA9IG1hdGNoLnJvdXRlLmlkID8gZXJyb3JzID09IG51bGwgPyB2b2lkIDAgOiBlcnJvcnNbbWF0Y2gucm91dGUuaWRdIDogbnVsbDsgLy8gT25seSBkYXRhIHJvdXRlcnMgaGFuZGxlIGVycm9ycwoKICAgIGxldCBlcnJvckVsZW1lbnQgPSBkYXRhUm91dGVyU3RhdGUgPyBtYXRjaC5yb3V0ZS5lcnJvckVsZW1lbnQgfHwgLyojX19QVVJFX18qL3JlYWN0LmNyZWF0ZUVsZW1lbnQoRGVmYXVsdEVycm9yRWxlbWVudCwgbnVsbCkgOiBudWxsOwoKICAgIGxldCBnZXRDaGlsZHJlbiA9ICgpID0+IC8qI19fUFVSRV9fKi9yZWFjdC5jcmVhdGVFbGVtZW50KFJlbmRlcmVkUm91dGUsIHsKICAgICAgbWF0Y2g6IG1hdGNoLAogICAgICByb3V0ZUNvbnRleHQ6IHsKICAgICAgICBvdXRsZXQsCiAgICAgICAgbWF0Y2hlczogcGFyZW50TWF0Y2hlcy5jb25jYXQocmVuZGVyZWRNYXRjaGVzLnNsaWNlKDAsIGluZGV4ICsgMSkpCiAgICAgIH0KICAgIH0sIGVycm9yID8gZXJyb3JFbGVtZW50IDogbWF0Y2gucm91dGUuZWxlbWVudCAhPT0gdW5kZWZpbmVkID8gbWF0Y2gucm91dGUuZWxlbWVudCA6IG91dGxldCk7IC8vIE9ubHkgd3JhcCBpbiBhbiBlcnJvciBib3VuZGFyeSB3aXRoaW4gZGF0YSByb3V0ZXIgdXNhZ2VzIHdoZW4gd2UgaGF2ZSBhbgogICAgLy8gZXJyb3JFbGVtZW50IG9uIHRoaXMgcm91dGUuICBPdGhlcndpc2UgbGV0IGl0IGJ1YmJsZSB1cCB0byBhbiBhbmNlc3RvcgogICAgLy8gZXJyb3JFbGVtZW50CgoKICAgIHJldHVybiBkYXRhUm91dGVyU3RhdGUgJiYgKG1hdGNoLnJvdXRlLmVycm9yRWxlbWVudCB8fCBpbmRleCA9PT0gMCkgPyAvKiNfX1BVUkVfXyovcmVhY3QuY3JlYXRlRWxlbWVudChSZW5kZXJFcnJvckJvdW5kYXJ5LCB7CiAgICAgIGxvY2F0aW9uOiBkYXRhUm91dGVyU3RhdGUubG9jYXRpb24sCiAgICAgIGNvbXBvbmVudDogZXJyb3JFbGVtZW50LAogICAgICBlcnJvcjogZXJyb3IsCiAgICAgIGNoaWxkcmVuOiBnZXRDaGlsZHJlbigpCiAgICB9KSA6IGdldENoaWxkcmVuKCk7CiAgfSwgbnVsbCk7Cn0KdmFyIERhdGFSb3V0ZXJIb29rOwoKKGZ1bmN0aW9uIChEYXRhUm91dGVySG9vaykgewogIERhdGFSb3V0ZXJIb29rWyJVc2VSZXZhbGlkYXRvciJdID0gInVzZVJldmFsaWRhdG9yIjsKfSkoRGF0YVJvdXRlckhvb2sgfHwgKERhdGFSb3V0ZXJIb29rID0ge30pKTsKCnZhciBEYXRhUm91dGVyU3RhdGVIb29rOwoKKGZ1bmN0aW9uIChEYXRhUm91dGVyU3RhdGVIb29rKSB7CiAgRGF0YVJvdXRlclN0YXRlSG9va1siVXNlTG9hZGVyRGF0YSJdID0gInVzZUxvYWRlckRhdGEiOwogIERhdGFSb3V0ZXJTdGF0ZUhvb2tbIlVzZUFjdGlvbkRhdGEiXSA9ICJ1c2VBY3Rpb25EYXRhIjsKICBEYXRhUm91dGVyU3RhdGVIb29rWyJVc2VSb3V0ZUVycm9yIl0gPSAidXNlUm91dGVFcnJvciI7CiAgRGF0YVJvdXRlclN0YXRlSG9va1siVXNlTmF2aWdhdGlvbiJdID0gInVzZU5hdmlnYXRpb24iOwogIERhdGFSb3V0ZXJTdGF0ZUhvb2tbIlVzZVJvdXRlTG9hZGVyRGF0YSJdID0gInVzZVJvdXRlTG9hZGVyRGF0YSI7CiAgRGF0YVJvdXRlclN0YXRlSG9va1siVXNlTWF0Y2hlcyJdID0gInVzZU1hdGNoZXMiOwogIERhdGFSb3V0ZXJTdGF0ZUhvb2tbIlVzZVJldmFsaWRhdG9yIl0gPSAidXNlUmV2YWxpZGF0b3IiOwp9KShEYXRhUm91dGVyU3RhdGVIb29rIHx8IChEYXRhUm91dGVyU3RhdGVIb29rID0ge30pKTsKCmZ1bmN0aW9uIGdldERhdGFSb3V0ZXJDb25zb2xlRXJyb3IoaG9va05hbWUpIHsKICByZXR1cm4gaG9va05hbWUgKyAiIG11c3QgYmUgdXNlZCB3aXRoaW4gYSBkYXRhIHJvdXRlci4gIFNlZSBodHRwczovL3JlYWN0cm91dGVyLmNvbS9lbi9tYWluL3JvdXRlcnMvcGlja2luZy1hLXJvdXRlci4iOwp9CgpmdW5jdGlvbiB1c2VEYXRhUm91dGVyQ29udGV4dChob29rTmFtZSkgewogIGxldCBjdHggPSBSZWFjdC51c2VDb250ZXh0KERhdGFSb3V0ZXJDb250ZXh0KTsKICAhY3R4ID8gIGZhbHNlID8gMCA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7CiAgcmV0dXJuIGN0eDsKfQoKZnVuY3Rpb24gdXNlRGF0YVJvdXRlclN0YXRlKGhvb2tOYW1lKSB7CiAgbGV0IHN0YXRlID0gcmVhY3QudXNlQ29udGV4dChEYXRhUm91dGVyU3RhdGVDb250ZXh0KTsKICAhc3RhdGUgPyAgZmFsc2UgPyAwIDogcm91dGVyX2ludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7CiAgcmV0dXJuIHN0YXRlOwp9Ci8qKgogKiBSZXR1cm5zIHRoZSBjdXJyZW50IG5hdmlnYXRpb24sIGRlZmF1bHRpbmcgdG8gYW4gImlkbGUiIG5hdmlnYXRpb24gd2hlbgogKiBubyBuYXZpZ2F0aW9uIGlzIGluIHByb2dyZXNzCiAqLwoKCmZ1bmN0aW9uIGRpc3RfdXNlTmF2aWdhdGlvbigpIHsKICBsZXQgc3RhdGUgPSB1c2VEYXRhUm91dGVyU3RhdGUoRGF0YVJvdXRlclN0YXRlSG9vay5Vc2VOYXZpZ2F0aW9uKTsKICByZXR1cm4gc3RhdGUubmF2aWdhdGlvbjsKfQovKioKICogUmV0dXJucyBhIHJldmFsaWRhdGUgZnVuY3Rpb24gZm9yIG1hbnVhbGx5IHRyaWdnZXJpbmcgcmV2YWxpZGF0aW9uLCBhcyB3ZWxsCiAqIGFzIHRoZSBjdXJyZW50IHN0YXRlIG9mIGFueSBtYW51YWwgcmV2YWxpZGF0aW9ucwogKi8KCmZ1bmN0aW9uIHVzZVJldmFsaWRhdG9yKCkgewogIGxldCBkYXRhUm91dGVyQ29udGV4dCA9IHVzZURhdGFSb3V0ZXJDb250ZXh0KERhdGFSb3V0ZXJIb29rLlVzZVJldmFsaWRhdG9yKTsKICBsZXQgc3RhdGUgPSB1c2VEYXRhUm91dGVyU3RhdGUoRGF0YVJvdXRlclN0YXRlSG9vay5Vc2VSZXZhbGlkYXRvcik7CiAgcmV0dXJuIHsKICAgIHJldmFsaWRhdGU6IGRhdGFSb3V0ZXJDb250ZXh0LnJvdXRlci5yZXZhbGlkYXRlLAogICAgc3RhdGU6IHN0YXRlLnJldmFsaWRhdGlvbgogIH07Cn0KLyoqCiAqIFJldHVybnMgdGhlIGFjdGl2ZSByb3V0ZSBtYXRjaGVzLCB1c2VmdWwgZm9yIGFjY2Vzc2luZyBsb2FkZXJEYXRhIGZvcgogKiBwYXJlbnQvY2hpbGQgcm91dGVzIG9yIHRoZSByb3V0ZSAiaGFuZGxlIiBwcm9wZXJ0eQogKi8KCmZ1bmN0aW9uIGRpc3RfdXNlTWF0Y2hlcygpIHsKICBsZXQgewogICAgbWF0Y2hlcywKICAgIGxvYWRlckRhdGEKICB9ID0gdXNlRGF0YVJvdXRlclN0YXRlKERhdGFSb3V0ZXJTdGF0ZUhvb2suVXNlTWF0Y2hlcyk7CiAgcmV0dXJuIFJlYWN0LnVzZU1lbW8oKCkgPT4gbWF0Y2hlcy5tYXAobWF0Y2ggPT4gewogICAgbGV0IHsKICAgICAgcGF0aG5hbWUsCiAgICAgIHBhcmFtcwogICAgfSA9IG1hdGNoOyAvLyBOb3RlOiBUaGlzIHN0cnVjdHVyZSBtYXRjaGVzIHRoYXQgY3JlYXRlZCBieSBjcmVhdGVVc2VNYXRjaGVzTWF0Y2gKICAgIC8vIGluIHRoZSBAcmVtaXgtcnVuL3JvdXRlciAsIHNvIGlmIHlvdSBjaGFuZ2UgdGhpcyBwbGVhc2UgYWxzbyBjaGFuZ2UKICAgIC8vIHRoYXQgOikgIEV2ZW50dWFsbHkgd2UnbGwgRFJZIHRoaXMgdXAKCiAgICByZXR1cm4gewogICAgICBpZDogbWF0Y2gucm91dGUuaWQsCiAgICAgIHBhdGhuYW1lLAogICAgICBwYXJhbXMsCiAgICAgIGRhdGE6IGxvYWRlckRhdGFbbWF0Y2gucm91dGUuaWRdLAogICAgICBoYW5kbGU6IG1hdGNoLnJvdXRlLmhhbmRsZQogICAgfTsKICB9KSwgW21hdGNoZXMsIGxvYWRlckRhdGFdKTsKfQovKioKICogUmV0dXJucyB0aGUgbG9hZGVyIGRhdGEgZm9yIHRoZSBuZWFyZXN0IGFuY2VzdG9yIFJvdXRlIGxvYWRlcgogKi8KCmZ1bmN0aW9uIHVzZUxvYWRlckRhdGEoKSB7CiAgbGV0IHN0YXRlID0gdXNlRGF0YVJvdXRlclN0YXRlKERhdGFSb3V0ZXJTdGF0ZUhvb2suVXNlTG9hZGVyRGF0YSk7CiAgbGV0IHJvdXRlID0gUmVhY3QudXNlQ29udGV4dChSb3V0ZUNvbnRleHQpOwogICFyb3V0ZSA/ICBmYWxzZSA/IDAgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwOwogIGxldCB0aGlzUm91dGUgPSByb3V0ZS5tYXRjaGVzW3JvdXRlLm1hdGNoZXMubGVuZ3RoIC0gMV07CiAgIXRoaXNSb3V0ZS5yb3V0ZS5pZCA/ICBmYWxzZSA/IDAgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwOwogIHJldHVybiBzdGF0ZS5sb2FkZXJEYXRhW3RoaXNSb3V0ZS5yb3V0ZS5pZF07Cn0KLyoqCiAqIFJldHVybnMgdGhlIGxvYWRlckRhdGEgZm9yIHRoZSBnaXZlbiByb3V0ZUlkCiAqLwoKZnVuY3Rpb24gdXNlUm91dGVMb2FkZXJEYXRhKHJvdXRlSWQpIHsKICBsZXQgc3RhdGUgPSB1c2VEYXRhUm91dGVyU3RhdGUoRGF0YVJvdXRlclN0YXRlSG9vay5Vc2VSb3V0ZUxvYWRlckRhdGEpOwogIHJldHVybiBzdGF0ZS5sb2FkZXJEYXRhW3JvdXRlSWRdOwp9Ci8qKgogKiBSZXR1cm5zIHRoZSBhY3Rpb24gZGF0YSBmb3IgdGhlIG5lYXJlc3QgYW5jZXN0b3IgUm91dGUgYWN0aW9uCiAqLwoKZnVuY3Rpb24gdXNlQWN0aW9uRGF0YSgpIHsKICBsZXQgc3RhdGUgPSB1c2VEYXRhUm91dGVyU3RhdGUoRGF0YVJvdXRlclN0YXRlSG9vay5Vc2VBY3Rpb25EYXRhKTsKICBsZXQgcm91dGUgPSBSZWFjdC51c2VDb250ZXh0KFJvdXRlQ29udGV4dCk7CiAgIXJvdXRlID8gIGZhbHNlID8gMCA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7CiAgcmV0dXJuIE9iamVjdC52YWx1ZXMoKHN0YXRlID09IG51bGwgPyB2b2lkIDAgOiBzdGF0ZS5hY3Rpb25EYXRhKSB8fCB7fSlbMF07Cn0KLyoqCiAqIFJldHVybnMgdGhlIG5lYXJlc3QgYW5jZXN0b3IgUm91dGUgZXJyb3IsIHdoaWNoIGNvdWxkIGJlIGEgbG9hZGVyL2FjdGlvbgogKiBlcnJvciBvciBhIHJlbmRlciBlcnJvci4gIFRoaXMgaXMgaW50ZW5kZWQgdG8gYmUgY2FsbGVkIGZyb20geW91cgogKiBlcnJvckVsZW1lbnQgdG8gZGlzcGxheSBhIHByb3BlciBlcnJvciBtZXNzYWdlLgogKi8KCmZ1bmN0aW9uIHVzZVJvdXRlRXJyb3IoKSB7CiAgdmFyIF9zdGF0ZSRlcnJvcnM7CgogIGxldCBlcnJvciA9IHJlYWN0LnVzZUNvbnRleHQoUm91dGVFcnJvckNvbnRleHQpOwogIGxldCBzdGF0ZSA9IHVzZURhdGFSb3V0ZXJTdGF0ZShEYXRhUm91dGVyU3RhdGVIb29rLlVzZVJvdXRlRXJyb3IpOwogIGxldCByb3V0ZSA9IHJlYWN0LnVzZUNvbnRleHQoUm91dGVDb250ZXh0KTsKICBsZXQgdGhpc1JvdXRlID0gcm91dGUubWF0Y2hlc1tyb3V0ZS5tYXRjaGVzLmxlbmd0aCAtIDFdOyAvLyBJZiB0aGlzIHdhcyBhIHJlbmRlciBlcnJvciwgd2UgcHV0IGl0IGluIGEgUm91dGVFcnJvciBjb250ZXh0IGluc2lkZQogIC8vIG9mIFJlbmRlckVycm9yQm91bmRhcnkKCiAgaWYgKGVycm9yKSB7CiAgICByZXR1cm4gZXJyb3I7CiAgfQoKICAhcm91dGUgPyAgZmFsc2UgPyAwIDogcm91dGVyX2ludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7CiAgIXRoaXNSb3V0ZS5yb3V0ZS5pZCA/ICBmYWxzZSA/IDAgOiByb3V0ZXJfaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDsgLy8gT3RoZXJ3aXNlIGxvb2sgZm9yIGVycm9ycyBmcm9tIG91ciBkYXRhIHJvdXRlciBzdGF0ZQoKICByZXR1cm4gKF9zdGF0ZSRlcnJvcnMgPSBzdGF0ZS5lcnJvcnMpID09IG51bGwgPyB2b2lkIDAgOiBfc3RhdGUkZXJyb3JzW3RoaXNSb3V0ZS5yb3V0ZS5pZF07Cn0KLyoqCiAqIFJldHVybnMgdGhlIGhhcHB5LXBhdGggZGF0YSBmcm9tIHRoZSBuZWFyZXN0IGFuY2VzdG9yIDxBd2FpdCAvPiB2YWx1ZQogKi8KCmZ1bmN0aW9uIHVzZUFzeW5jVmFsdWUoKSB7CiAgbGV0IHZhbHVlID0gUmVhY3QudXNlQ29udGV4dChBd2FpdENvbnRleHQpOwogIHJldHVybiB2YWx1ZSA9PSBudWxsID8gdm9pZCAwIDogdmFsdWUuX2RhdGE7Cn0KLyoqCiAqIFJldHVybnMgdGhlIGVycm9yIGZyb20gdGhlIG5lYXJlc3QgYW5jZXN0b3IgPEF3YWl0IC8+IHZhbHVlCiAqLwoKZnVuY3Rpb24gdXNlQXN5bmNFcnJvcigpIHsKICBsZXQgdmFsdWUgPSBSZWFjdC51c2VDb250ZXh0KEF3YWl0Q29udGV4dCk7CiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyB2b2lkIDAgOiB2YWx1ZS5fZXJyb3I7Cn0KY29uc3QgYWxyZWFkeVdhcm5lZCA9IHt9OwoKZnVuY3Rpb24gd2FybmluZ09uY2Uoa2V5LCBjb25kLCBtZXNzYWdlKSB7CiAgaWYgKCFjb25kICYmICFhbHJlYWR5V2FybmVkW2tleV0pIHsKICAgIGFscmVhZHlXYXJuZWRba2V5XSA9IHRydWU7CiAgICAgZmFsc2UgPyAwIDogdm9pZCAwOwogIH0KfQoKLyoqCiAqIEdpdmVuIGEgUmVtaXggUm91dGVyIGluc3RhbmNlLCByZW5kZXIgdGhlIGFwcHJvcHJpYXRlIFVJCiAqLwpmdW5jdGlvbiBSb3V0ZXJQcm92aWRlcihfcmVmKSB7CiAgbGV0IHsKICAgIGZhbGxiYWNrRWxlbWVudCwKICAgIHJvdXRlcgogIH0gPSBfcmVmOwogIC8vIFN5bmMgcm91dGVyIHN0YXRlIHRvIG91ciBjb21wb25lbnQgc3RhdGUgdG8gZm9yY2UgcmUtcmVuZGVycwogIGxldCBzdGF0ZSA9IHVzZVN5bmNFeHRlcm5hbFN0b3JlKHJvdXRlci5zdWJzY3JpYmUsICgpID0+IHJvdXRlci5zdGF0ZSwgLy8gV2UgaGF2ZSB0byBwcm92aWRlIHRoaXMgc28gUmVhY3RAMTggZG9lc24ndCBjb21wbGFpbiBkdXJpbmcgaHlkcmF0aW9uLAogIC8vIGJ1dCB3ZSBwYXNzIG91ciBzZXJpYWxpemVkIGh5ZHJhdGlvbiBkYXRhIGludG8gdGhlIHJvdXRlciBzbyBzdGF0ZSBoZXJlCiAgLy8gaXMgYWxyZWFkeSBzeW5jZWQgd2l0aCB3aGF0IHRoZSBzZXJ2ZXIgc2F3CiAgKCkgPT4gcm91dGVyLnN0YXRlKTsKICBsZXQgbmF2aWdhdG9yID0gUmVhY3QudXNlTWVtbygoKSA9PiB7CiAgICByZXR1cm4gewogICAgICBjcmVhdGVIcmVmOiByb3V0ZXIuY3JlYXRlSHJlZiwKICAgICAgZ286IG4gPT4gcm91dGVyLm5hdmlnYXRlKG4pLAogICAgICBwdXNoOiAodG8sIHN0YXRlLCBvcHRzKSA9PiByb3V0ZXIubmF2aWdhdGUodG8sIHsKICAgICAgICBzdGF0ZSwKICAgICAgICBwcmV2ZW50U2Nyb2xsUmVzZXQ6IG9wdHMgPT0gbnVsbCA/IHZvaWQgMCA6IG9wdHMucHJldmVudFNjcm9sbFJlc2V0CiAgICAgIH0pLAogICAgICByZXBsYWNlOiAodG8sIHN0YXRlLCBvcHRzKSA9PiByb3V0ZXIubmF2aWdhdGUodG8sIHsKICAgICAgICByZXBsYWNlOiB0cnVlLAogICAgICAgIHN0YXRlLAogICAgICAgIHByZXZlbnRTY3JvbGxSZXNldDogb3B0cyA9PSBudWxsID8gdm9pZCAwIDogb3B0cy5wcmV2ZW50U2Nyb2xsUmVzZXQKICAgICAgfSkKICAgIH07CiAgfSwgW3JvdXRlcl0pOwogIGxldCBiYXNlbmFtZSA9IHJvdXRlci5iYXNlbmFtZSB8fCAiLyI7CiAgcmV0dXJuIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KERhdGFSb3V0ZXJDb250ZXh0LlByb3ZpZGVyLCB7CiAgICB2YWx1ZTogewogICAgICByb3V0ZXIsCiAgICAgIG5hdmlnYXRvciwKICAgICAgc3RhdGljOiBmYWxzZSwKICAgICAgLy8gRG8gd2UgbmVlZCB0aGlzPwogICAgICBiYXNlbmFtZQogICAgfQogIH0sIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KERhdGFSb3V0ZXJTdGF0ZUNvbnRleHQuUHJvdmlkZXIsIHsKICAgIHZhbHVlOiBzdGF0ZQogIH0sIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KGRpc3RfUm91dGVyLCB7CiAgICBiYXNlbmFtZTogcm91dGVyLmJhc2VuYW1lLAogICAgbG9jYXRpb246IHJvdXRlci5zdGF0ZS5sb2NhdGlvbiwKICAgIG5hdmlnYXRpb25UeXBlOiByb3V0ZXIuc3RhdGUuaGlzdG9yeUFjdGlvbiwKICAgIG5hdmlnYXRvcjogbmF2aWdhdG9yCiAgfSwgcm91dGVyLnN0YXRlLmluaXRpYWxpemVkID8gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoUm91dGVzLCBudWxsKSA6IGZhbGxiYWNrRWxlbWVudCkpKTsKfQoKLyoqCiAqIEEgPFJvdXRlcj4gdGhhdCBzdG9yZXMgYWxsIGVudHJpZXMgaW4gbWVtb3J5LgogKgogKiBAc2VlIGh0dHBzOi8vcmVhY3Ryb3V0ZXIuY29tL2RvY3MvZW4vdjYvcm91dGVycy9tZW1vcnktcm91dGVyCiAqLwpmdW5jdGlvbiBNZW1vcnlSb3V0ZXIoX3JlZjIpIHsKICBsZXQgewogICAgYmFzZW5hbWUsCiAgICBjaGlsZHJlbiwKICAgIGluaXRpYWxFbnRyaWVzLAogICAgaW5pdGlhbEluZGV4CiAgfSA9IF9yZWYyOwogIGxldCBoaXN0b3J5UmVmID0gcmVhY3QudXNlUmVmKCk7CgogIGlmIChoaXN0b3J5UmVmLmN1cnJlbnQgPT0gbnVsbCkgewogICAgaGlzdG9yeVJlZi5jdXJyZW50ID0gcm91dGVyX2NyZWF0ZU1lbW9yeUhpc3RvcnkoewogICAgICBpbml0aWFsRW50cmllcywKICAgICAgaW5pdGlhbEluZGV4LAogICAgICB2NUNvbXBhdDogdHJ1ZQogICAgfSk7CiAgfQoKICBsZXQgaGlzdG9yeSA9IGhpc3RvcnlSZWYuY3VycmVudDsKICBsZXQgW3N0YXRlLCBzZXRTdGF0ZV0gPSByZWFjdC51c2VTdGF0ZSh7CiAgICBhY3Rpb246IGhpc3RvcnkuYWN0aW9uLAogICAgbG9jYXRpb246IGhpc3RvcnkubG9jYXRpb24KICB9KTsKICByZWFjdC51c2VMYXlvdXRFZmZlY3QoKCkgPT4gaGlzdG9yeS5saXN0ZW4oc2V0U3RhdGUpLCBbaGlzdG9yeV0pOwogIHJldHVybiAvKiNfX1BVUkVfXyovcmVhY3QuY3JlYXRlRWxlbWVudChkaXN0X1JvdXRlciwgewogICAgYmFzZW5hbWU6IGJhc2VuYW1lLAogICAgY2hpbGRyZW46IGNoaWxkcmVuLAogICAgbG9jYXRpb246IHN0YXRlLmxvY2F0aW9uLAogICAgbmF2aWdhdGlvblR5cGU6IHN0YXRlLmFjdGlvbiwKICAgIG5hdmlnYXRvcjogaGlzdG9yeQogIH0pOwp9CgovKioKICogQ2hhbmdlcyB0aGUgY3VycmVudCBsb2NhdGlvbi4KICoKICogTm90ZTogVGhpcyBBUEkgaXMgbW9zdGx5IHVzZWZ1bCBpbiBSZWFjdC5Db21wb25lbnQgc3ViY2xhc3NlcyB0aGF0IGFyZSBub3QKICogYWJsZSB0byB1c2UgaG9va3MuIEluIGZ1bmN0aW9uYWwgY29tcG9uZW50cywgd2UgcmVjb21tZW5kIHlvdSB1c2UgdGhlCiAqIGB1c2VOYXZpZ2F0ZWAgaG9vayBpbnN0ZWFkLgogKgogKiBAc2VlIGh0dHBzOi8vcmVhY3Ryb3V0ZXIuY29tL2RvY3MvZW4vdjYvY29tcG9uZW50cy9uYXZpZ2F0ZQogKi8KZnVuY3Rpb24gTmF2aWdhdGUoX3JlZjMpIHsKICBsZXQgewogICAgdG8sCiAgICByZXBsYWNlLAogICAgc3RhdGUsCiAgICByZWxhdGl2ZQogIH0gPSBfcmVmMzsKICAhdXNlSW5Sb3V0ZXJDb250ZXh0KCkgPyAgZmFsc2UgPyAwIDogcm91dGVyX2ludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7CiAgIGZhbHNlID8gMCA6IHZvaWQgMDsKICBsZXQgZGF0YVJvdXRlclN0YXRlID0gcmVhY3QudXNlQ29udGV4dChEYXRhUm91dGVyU3RhdGVDb250ZXh0KTsKICBsZXQgbmF2aWdhdGUgPSBkaXN0X3VzZU5hdmlnYXRlKCk7CiAgcmVhY3QudXNlRWZmZWN0KCgpID0+IHsKICAgIC8vIEF2b2lkIGtpY2tpbmcgb2ZmIG11bHRpcGxlIG5hdmlnYXRpb25zIGlmIHdlJ3JlIGluIHRoZSBtaWRkbGUgb2YgYQogICAgLy8gZGF0YS1yb3V0ZXIgbmF2aWdhdGlvbiwgc2luY2UgY29tcG9uZW50cyBnZXQgcmUtcmVuZGVyZWQgd2hlbiB3ZSBlbnRlcgogICAgLy8gYSBzdWJtaXR0aW5nL2xvYWRpbmcgc3RhdGUKICAgIGlmIChkYXRhUm91dGVyU3RhdGUgJiYgZGF0YVJvdXRlclN0YXRlLm5hdmlnYXRpb24uc3RhdGUgIT09ICJpZGxlIikgewogICAgICByZXR1cm47CiAgICB9CgogICAgbmF2aWdhdGUodG8sIHsKICAgICAgcmVwbGFjZSwKICAgICAgc3RhdGUsCiAgICAgIHJlbGF0aXZlCiAgICB9KTsKICB9KTsKICByZXR1cm4gbnVsbDsKfQoKLyoqCiAqIFJlbmRlcnMgdGhlIGNoaWxkIHJvdXRlJ3MgZWxlbWVudCwgaWYgdGhlcmUgaXMgb25lLgogKgogKiBAc2VlIGh0dHBzOi8vcmVhY3Ryb3V0ZXIuY29tL2RvY3MvZW4vdjYvY29tcG9uZW50cy9vdXRsZXQKICovCmZ1bmN0aW9uIE91dGxldChwcm9wcykgewogIHJldHVybiB1c2VPdXRsZXQocHJvcHMuY29udGV4dCk7Cn0KCi8qKgogKiBEZWNsYXJlcyBhbiBlbGVtZW50IHRoYXQgc2hvdWxkIGJlIHJlbmRlcmVkIGF0IGEgY2VydGFpbiBVUkwgcGF0aC4KICoKICogQHNlZSBodHRwczovL3JlYWN0cm91dGVyLmNvbS9kb2NzL2VuL3Y2L2NvbXBvbmVudHMvcm91dGUKICovCmZ1bmN0aW9uIFJvdXRlKF9wcm9wcykgewogICBmYWxzZSA/IDAgOiByb3V0ZXJfaW52YXJpYW50KGZhbHNlKSA7Cn0KCi8qKgogKiBQcm92aWRlcyBsb2NhdGlvbiBjb250ZXh0IGZvciB0aGUgcmVzdCBvZiB0aGUgYXBwLgogKgogKiBOb3RlOiBZb3UgdXN1YWxseSB3b24ndCByZW5kZXIgYSA8Um91dGVyPiBkaXJlY3RseS4gSW5zdGVhZCwgeW91J2xsIHJlbmRlciBhCiAqIHJvdXRlciB0aGF0IGlzIG1vcmUgc3BlY2lmaWMgdG8geW91ciBlbnZpcm9ubWVudCBzdWNoIGFzIGEgPEJyb3dzZXJSb3V0ZXI+CiAqIGluIHdlYiBicm93c2VycyBvciBhIDxTdGF0aWNSb3V0ZXI+IGZvciBzZXJ2ZXIgcmVuZGVyaW5nLgogKgogKiBAc2VlIGh0dHBzOi8vcmVhY3Ryb3V0ZXIuY29tL2RvY3MvZW4vdjYvcm91dGVycy9yb3V0ZXIKICovCmZ1bmN0aW9uIGRpc3RfUm91dGVyKF9yZWY0KSB7CiAgbGV0IHsKICAgIGJhc2VuYW1lOiBiYXNlbmFtZVByb3AgPSAiLyIsCiAgICBjaGlsZHJlbiA9IG51bGwsCiAgICBsb2NhdGlvbjogbG9jYXRpb25Qcm9wLAogICAgbmF2aWdhdGlvblR5cGUgPSBBY3Rpb24uUG9wLAogICAgbmF2aWdhdG9yLAogICAgc3RhdGljOiBzdGF0aWNQcm9wID0gZmFsc2UKICB9ID0gX3JlZjQ7CiAgISF1c2VJblJvdXRlckNvbnRleHQoKSA/ICBmYWxzZSA/IDAgOiByb3V0ZXJfaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDsgLy8gUHJlc2VydmUgdHJhaWxpbmcgc2xhc2hlcyBvbiBiYXNlbmFtZSwgc28gd2UgY2FuIGxldCB0aGUgdXNlciBjb250cm9sCiAgLy8gdGhlIGVuZm9yY2VtZW50IG9mIHRyYWlsaW5nIHNsYXNoZXMgdGhyb3VnaG91dCB0aGUgYXBwCgogIGxldCBiYXNlbmFtZSA9IGJhc2VuYW1lUHJvcC5yZXBsYWNlKC9eXC8qLywgIi8iKTsKICBsZXQgbmF2aWdhdGlvbkNvbnRleHQgPSByZWFjdC51c2VNZW1vKCgpID0+ICh7CiAgICBiYXNlbmFtZSwKICAgIG5hdmlnYXRvciwKICAgIHN0YXRpYzogc3RhdGljUHJvcAogIH0pLCBbYmFzZW5hbWUsIG5hdmlnYXRvciwgc3RhdGljUHJvcF0pOwoKICBpZiAodHlwZW9mIGxvY2F0aW9uUHJvcCA9PT0gInN0cmluZyIpIHsKICAgIGxvY2F0aW9uUHJvcCA9IHBhcnNlUGF0aChsb2NhdGlvblByb3ApOwogIH0KCiAgbGV0IHsKICAgIHBhdGhuYW1lID0gIi8iLAogICAgc2VhcmNoID0gIiIsCiAgICBoYXNoID0gIiIsCiAgICBzdGF0ZSA9IG51bGwsCiAgICBrZXkgPSAiZGVmYXVsdCIKICB9ID0gbG9jYXRpb25Qcm9wOwogIGxldCBsb2NhdGlvbiA9IHJlYWN0LnVzZU1lbW8oKCkgPT4gewogICAgbGV0IHRyYWlsaW5nUGF0aG5hbWUgPSBzdHJpcEJhc2VuYW1lKHBhdGhuYW1lLCBiYXNlbmFtZSk7CgogICAgaWYgKHRyYWlsaW5nUGF0aG5hbWUgPT0gbnVsbCkgewogICAgICByZXR1cm4gbnVsbDsKICAgIH0KCiAgICByZXR1cm4gewogICAgICBwYXRobmFtZTogdHJhaWxpbmdQYXRobmFtZSwKICAgICAgc2VhcmNoLAogICAgICBoYXNoLAogICAgICBzdGF0ZSwKICAgICAga2V5CiAgICB9OwogIH0sIFtiYXNlbmFtZSwgcGF0aG5hbWUsIHNlYXJjaCwgaGFzaCwgc3RhdGUsIGtleV0pOwogICBmYWxzZSA/IDAgOiB2b2lkIDA7CgogIGlmIChsb2NhdGlvbiA9PSBudWxsKSB7CiAgICByZXR1cm4gbnVsbDsKICB9CgogIHJldHVybiAvKiNfX1BVUkVfXyovcmVhY3QuY3JlYXRlRWxlbWVudChOYXZpZ2F0aW9uQ29udGV4dC5Qcm92aWRlciwgewogICAgdmFsdWU6IG5hdmlnYXRpb25Db250ZXh0CiAgfSwgLyojX19QVVJFX18qL3JlYWN0LmNyZWF0ZUVsZW1lbnQoTG9jYXRpb25Db250ZXh0LlByb3ZpZGVyLCB7CiAgICBjaGlsZHJlbjogY2hpbGRyZW4sCiAgICB2YWx1ZTogewogICAgICBsb2NhdGlvbiwKICAgICAgbmF2aWdhdGlvblR5cGUKICAgIH0KICB9KSk7Cn0KCi8qKgogKiBBIGNvbnRhaW5lciBmb3IgYSBuZXN0ZWQgdHJlZSBvZiA8Um91dGU+IGVsZW1lbnRzIHRoYXQgcmVuZGVycyB0aGUgYnJhbmNoCiAqIHRoYXQgYmVzdCBtYXRjaGVzIHRoZSBjdXJyZW50IGxvY2F0aW9uLgogKgogKiBAc2VlIGh0dHBzOi8vcmVhY3Ryb3V0ZXIuY29tL2RvY3MvZW4vdjYvY29tcG9uZW50cy9yb3V0ZXMKICovCmZ1bmN0aW9uIFJvdXRlcyhfcmVmNSkgewogIGxldCB7CiAgICBjaGlsZHJlbiwKICAgIGxvY2F0aW9uCiAgfSA9IF9yZWY1OwogIGxldCBkYXRhUm91dGVyQ29udGV4dCA9IHJlYWN0LnVzZUNvbnRleHQoRGF0YVJvdXRlckNvbnRleHQpOyAvLyBXaGVuIGluIGEgRGF0YVJvdXRlckNvbnRleHQgX3dpdGhvdXRfIGNoaWxkcmVuLCB3ZSB1c2UgdGhlIHJvdXRlciByb3V0ZXMKICAvLyBkaXJlY3RseS4gIElmIHdlIGhhdmUgY2hpbGRyZW4sIHRoZW4gd2UncmUgaW4gYSBkZXNjZW5kYW50IHRyZWUgYW5kIHdlCiAgLy8gbmVlZCB0byB1c2UgY2hpbGQgcm91dGVzLgoKICBsZXQgcm91dGVzID0gZGF0YVJvdXRlckNvbnRleHQgJiYgIWNoaWxkcmVuID8gZGF0YVJvdXRlckNvbnRleHQucm91dGVyLnJvdXRlcyA6IGNyZWF0ZVJvdXRlc0Zyb21DaGlsZHJlbihjaGlsZHJlbik7CiAgcmV0dXJuIHVzZVJvdXRlcyhyb3V0ZXMsIGxvY2F0aW9uKTsKfQoKLyoqCiAqIENvbXBvbmVudCB0byB1c2UgZm9yIHJlbmRlcmluZyBsYXppbHkgbG9hZGVkIGRhdGEgZnJvbSByZXR1cm5pbmcgZGVmZXIoKQogKiBpbiBhIGxvYWRlciBmdW5jdGlvbgogKi8KZnVuY3Rpb24gQXdhaXQoX3JlZjYpIHsKICBsZXQgewogICAgY2hpbGRyZW4sCiAgICBlcnJvckVsZW1lbnQsCiAgICByZXNvbHZlCiAgfSA9IF9yZWY2OwogIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChBd2FpdEVycm9yQm91bmRhcnksIHsKICAgIHJlc29sdmU6IHJlc29sdmUsCiAgICBlcnJvckVsZW1lbnQ6IGVycm9yRWxlbWVudAogIH0sIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFJlc29sdmVBd2FpdCwgbnVsbCwgY2hpbGRyZW4pKTsKfQp2YXIgQXdhaXRSZW5kZXJTdGF0dXM7CgooZnVuY3Rpb24gKEF3YWl0UmVuZGVyU3RhdHVzKSB7CiAgQXdhaXRSZW5kZXJTdGF0dXNbQXdhaXRSZW5kZXJTdGF0dXNbInBlbmRpbmciXSA9IDBdID0gInBlbmRpbmciOwogIEF3YWl0UmVuZGVyU3RhdHVzW0F3YWl0UmVuZGVyU3RhdHVzWyJzdWNjZXNzIl0gPSAxXSA9ICJzdWNjZXNzIjsKICBBd2FpdFJlbmRlclN0YXR1c1tBd2FpdFJlbmRlclN0YXR1c1siZXJyb3IiXSA9IDJdID0gImVycm9yIjsKfSkoQXdhaXRSZW5kZXJTdGF0dXMgfHwgKEF3YWl0UmVuZGVyU3RhdHVzID0ge30pKTsKCmNvbnN0IG5ldmVyU2V0dGxlZFByb21pc2UgPSBuZXcgUHJvbWlzZSgoKSA9PiB7fSk7CgpjbGFzcyBBd2FpdEVycm9yQm91bmRhcnkgZXh0ZW5kcyByZWFjdC5Db21wb25lbnQgewogIGNvbnN0cnVjdG9yKHByb3BzKSB7CiAgICBzdXBlcihwcm9wcyk7CiAgICB0aGlzLnN0YXRlID0gewogICAgICBlcnJvcjogbnVsbAogICAgfTsKICB9CgogIHN0YXRpYyBnZXREZXJpdmVkU3RhdGVGcm9tRXJyb3IoZXJyb3IpIHsKICAgIHJldHVybiB7CiAgICAgIGVycm9yCiAgICB9OwogIH0KCiAgY29tcG9uZW50RGlkQ2F0Y2goZXJyb3IsIGVycm9ySW5mbykgewogICAgY29uc29sZS5lcnJvcigiPEF3YWl0PiBjYXVnaHQgdGhlIGZvbGxvd2luZyBlcnJvciBkdXJpbmcgcmVuZGVyIiwgZXJyb3IsIGVycm9ySW5mbyk7CiAgfQoKICByZW5kZXIoKSB7CiAgICBsZXQgewogICAgICBjaGlsZHJlbiwKICAgICAgZXJyb3JFbGVtZW50LAogICAgICByZXNvbHZlCiAgICB9ID0gdGhpcy5wcm9wczsKICAgIGxldCBwcm9taXNlID0gbnVsbDsKICAgIGxldCBzdGF0dXMgPSBBd2FpdFJlbmRlclN0YXR1cy5wZW5kaW5nOwoKICAgIGlmICghKHJlc29sdmUgaW5zdGFuY2VvZiBQcm9taXNlKSkgewogICAgICAvLyBEaWRuJ3QgZ2V0IGEgcHJvbWlzZSAtIHByb3ZpZGUgYXMgYSByZXNvbHZlZCBwcm9taXNlCiAgICAgIHN0YXR1cyA9IEF3YWl0UmVuZGVyU3RhdHVzLnN1Y2Nlc3M7CiAgICAgIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKTsKICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb21pc2UsICJfdHJhY2tlZCIsIHsKICAgICAgICBnZXQ6ICgpID0+IHRydWUKICAgICAgfSk7CiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm9taXNlLCAiX2RhdGEiLCB7CiAgICAgICAgZ2V0OiAoKSA9PiByZXNvbHZlCiAgICAgIH0pOwogICAgfSBlbHNlIGlmICh0aGlzLnN0YXRlLmVycm9yKSB7CiAgICAgIC8vIENhdWdodCBhIHJlbmRlciBlcnJvciwgcHJvdmlkZSBpdCBhcyBhIHJlamVjdGVkIHByb21pc2UKICAgICAgc3RhdHVzID0gQXdhaXRSZW5kZXJTdGF0dXMuZXJyb3I7CiAgICAgIGxldCByZW5kZXJFcnJvciA9IHRoaXMuc3RhdGUuZXJyb3I7CiAgICAgIHByb21pc2UgPSBQcm9taXNlLnJlamVjdCgpLmNhdGNoKCgpID0+IHt9KTsgLy8gQXZvaWQgdW5oYW5kbGVkIHJlamVjdGlvbiB3YXJuaW5ncwoKICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb21pc2UsICJfdHJhY2tlZCIsIHsKICAgICAgICBnZXQ6ICgpID0+IHRydWUKICAgICAgfSk7CiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm9taXNlLCAiX2Vycm9yIiwgewogICAgICAgIGdldDogKCkgPT4gcmVuZGVyRXJyb3IKICAgICAgfSk7CiAgICB9IGVsc2UgaWYgKHJlc29sdmUuX3RyYWNrZWQpIHsKICAgICAgLy8gQWxyZWFkeSB0cmFja2VkIHByb21pc2UgLSBjaGVjayBjb250ZW50cwogICAgICBwcm9taXNlID0gcmVzb2x2ZTsKICAgICAgc3RhdHVzID0gcHJvbWlzZS5fZXJyb3IgIT09IHVuZGVmaW5lZCA/IEF3YWl0UmVuZGVyU3RhdHVzLmVycm9yIDogcHJvbWlzZS5fZGF0YSAhPT0gdW5kZWZpbmVkID8gQXdhaXRSZW5kZXJTdGF0dXMuc3VjY2VzcyA6IEF3YWl0UmVuZGVyU3RhdHVzLnBlbmRpbmc7CiAgICB9IGVsc2UgewogICAgICAvLyBSYXcgKHVudHJhY2tlZCkgcHJvbWlzZSAtIHRyYWNrIGl0CiAgICAgIHN0YXR1cyA9IEF3YWl0UmVuZGVyU3RhdHVzLnBlbmRpbmc7CiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXNvbHZlLCAiX3RyYWNrZWQiLCB7CiAgICAgICAgZ2V0OiAoKSA9PiB0cnVlCiAgICAgIH0pOwogICAgICBwcm9taXNlID0gcmVzb2x2ZS50aGVuKGRhdGEgPT4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlc29sdmUsICJfZGF0YSIsIHsKICAgICAgICBnZXQ6ICgpID0+IGRhdGEKICAgICAgfSksIGVycm9yID0+IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXNvbHZlLCAiX2Vycm9yIiwgewogICAgICAgIGdldDogKCkgPT4gZXJyb3IKICAgICAgfSkpOwogICAgfQoKICAgIGlmIChzdGF0dXMgPT09IEF3YWl0UmVuZGVyU3RhdHVzLmVycm9yICYmIHByb21pc2UuX2Vycm9yIGluc3RhbmNlb2YgQWJvcnRlZERlZmVycmVkRXJyb3IpIHsKICAgICAgLy8gRnJlZXplIHRoZSBVSSBieSB0aHJvd2luZyBhIG5ldmVyIHJlc29sdmVkIHByb21pc2UKICAgICAgdGhyb3cgbmV2ZXJTZXR0bGVkUHJvbWlzZTsKICAgIH0KCiAgICBpZiAoc3RhdHVzID09PSBBd2FpdFJlbmRlclN0YXR1cy5lcnJvciAmJiAhZXJyb3JFbGVtZW50KSB7CiAgICAgIC8vIE5vIGVycm9yRWxlbWVudCwgdGhyb3cgdG8gdGhlIG5lYXJlc3Qgcm91dGUtbGV2ZWwgZXJyb3IgYm91bmRhcnkKICAgICAgdGhyb3cgcHJvbWlzZS5fZXJyb3I7CiAgICB9CgogICAgaWYgKHN0YXR1cyA9PT0gQXdhaXRSZW5kZXJTdGF0dXMuZXJyb3IpIHsKICAgICAgLy8gUmVuZGVyIHZpYSBvdXIgZXJyb3JFbGVtZW50CiAgICAgIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChBd2FpdENvbnRleHQuUHJvdmlkZXIsIHsKICAgICAgICB2YWx1ZTogcHJvbWlzZSwKICAgICAgICBjaGlsZHJlbjogZXJyb3JFbGVtZW50CiAgICAgIH0pOwogICAgfQoKICAgIGlmIChzdGF0dXMgPT09IEF3YWl0UmVuZGVyU3RhdHVzLnN1Y2Nlc3MpIHsKICAgICAgLy8gUmVuZGVyIGNoaWxkcmVuIHdpdGggcmVzb2x2ZWQgdmFsdWUKICAgICAgcmV0dXJuIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEF3YWl0Q29udGV4dC5Qcm92aWRlciwgewogICAgICAgIHZhbHVlOiBwcm9taXNlLAogICAgICAgIGNoaWxkcmVuOiBjaGlsZHJlbgogICAgICB9KTsKICAgIH0gLy8gVGhyb3cgdG8gdGhlIHN1c3BlbnNlIGJvdW5kYXJ5CgoKICAgIHRocm93IHByb21pc2U7CiAgfQoKfQovKioKICogQHByaXZhdGUKICogSW5kaXJlY3Rpb24gdG8gbGV2ZXJhZ2UgdXNlQXN5bmNWYWx1ZSBmb3IgYSByZW5kZXItcHJvcCBBUEkgb24gPEF3YWl0PgogKi8KCgpmdW5jdGlvbiBSZXNvbHZlQXdhaXQoX3JlZjcpIHsKICBsZXQgewogICAgY2hpbGRyZW4KICB9ID0gX3JlZjc7CiAgbGV0IGRhdGEgPSB1c2VBc3luY1ZhbHVlKCk7CgogIGlmICh0eXBlb2YgY2hpbGRyZW4gPT09ICJmdW5jdGlvbiIpIHsKICAgIHJldHVybiBjaGlsZHJlbihkYXRhKTsKICB9CgogIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCwgY2hpbGRyZW4pOwp9IC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8KLy8gVVRJTFMKLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLwoKLyoqCiAqIENyZWF0ZXMgYSByb3V0ZSBjb25maWcgZnJvbSBhIFJlYWN0ICJjaGlsZHJlbiIgb2JqZWN0LCB3aGljaCBpcyB1c3VhbGx5CiAqIGVpdGhlciBhIGA8Um91dGU+YCBlbGVtZW50IG9yIGFuIGFycmF5IG9mIHRoZW0uIFVzZWQgaW50ZXJuYWxseSBieQogKiBgPFJvdXRlcz5gIHRvIGNyZWF0ZSBhIHJvdXRlIGNvbmZpZyBmcm9tIGl0cyBjaGlsZHJlbi4KICoKICogQHNlZSBodHRwczovL3JlYWN0cm91dGVyLmNvbS9kb2NzL2VuL3Y2L3V0aWxzL2NyZWF0ZS1yb3V0ZXMtZnJvbS1jaGlsZHJlbgogKi8KCgpmdW5jdGlvbiBjcmVhdGVSb3V0ZXNGcm9tQ2hpbGRyZW4oY2hpbGRyZW4sIHBhcmVudFBhdGgpIHsKICBpZiAocGFyZW50UGF0aCA9PT0gdm9pZCAwKSB7CiAgICBwYXJlbnRQYXRoID0gW107CiAgfQoKICBsZXQgcm91dGVzID0gW107CiAgcmVhY3QuQ2hpbGRyZW4uZm9yRWFjaChjaGlsZHJlbiwgKGVsZW1lbnQsIGluZGV4KSA9PiB7CiAgICBpZiAoISAvKiNfX1BVUkVfXyovcmVhY3QuaXNWYWxpZEVsZW1lbnQoZWxlbWVudCkpIHsKICAgICAgLy8gSWdub3JlIG5vbi1lbGVtZW50cy4gVGhpcyBhbGxvd3MgcGVvcGxlIHRvIG1vcmUgZWFzaWx5IGlubGluZQogICAgICAvLyBjb25kaXRpb25hbHMgaW4gdGhlaXIgcm91dGUgY29uZmlnLgogICAgICByZXR1cm47CiAgICB9CgogICAgaWYgKGVsZW1lbnQudHlwZSA9PT0gcmVhY3QuRnJhZ21lbnQpIHsKICAgICAgLy8gVHJhbnNwYXJlbnRseSBzdXBwb3J0IFJlYWN0LkZyYWdtZW50IGFuZCBpdHMgY2hpbGRyZW4uCiAgICAgIHJvdXRlcy5wdXNoLmFwcGx5KHJvdXRlcywgY3JlYXRlUm91dGVzRnJvbUNoaWxkcmVuKGVsZW1lbnQucHJvcHMuY2hpbGRyZW4sIHBhcmVudFBhdGgpKTsKICAgICAgcmV0dXJuOwogICAgfQoKICAgICEoZWxlbWVudC50eXBlID09PSBSb3V0ZSkgPyAgZmFsc2UgPyAwIDogcm91dGVyX2ludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7CiAgICAhKCFlbGVtZW50LnByb3BzLmluZGV4IHx8ICFlbGVtZW50LnByb3BzLmNoaWxkcmVuKSA/ICBmYWxzZSA/IDAgOiByb3V0ZXJfaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDsKICAgIGxldCB0cmVlUGF0aCA9IFsuLi5wYXJlbnRQYXRoLCBpbmRleF07CiAgICBsZXQgcm91dGUgPSB7CiAgICAgIGlkOiBlbGVtZW50LnByb3BzLmlkIHx8IHRyZWVQYXRoLmpvaW4oIi0iKSwKICAgICAgY2FzZVNlbnNpdGl2ZTogZWxlbWVudC5wcm9wcy5jYXNlU2Vuc2l0aXZlLAogICAgICBlbGVtZW50OiBlbGVtZW50LnByb3BzLmVsZW1lbnQsCiAgICAgIGluZGV4OiBlbGVtZW50LnByb3BzLmluZGV4LAogICAgICBwYXRoOiBlbGVtZW50LnByb3BzLnBhdGgsCiAgICAgIGxvYWRlcjogZWxlbWVudC5wcm9wcy5sb2FkZXIsCiAgICAgIGFjdGlvbjogZWxlbWVudC5wcm9wcy5hY3Rpb24sCiAgICAgIGVycm9yRWxlbWVudDogZWxlbWVudC5wcm9wcy5lcnJvckVsZW1lbnQsCiAgICAgIGhhc0Vycm9yQm91bmRhcnk6IGVsZW1lbnQucHJvcHMuZXJyb3JFbGVtZW50ICE9IG51bGwsCiAgICAgIHNob3VsZFJldmFsaWRhdGU6IGVsZW1lbnQucHJvcHMuc2hvdWxkUmV2YWxpZGF0ZSwKICAgICAgaGFuZGxlOiBlbGVtZW50LnByb3BzLmhhbmRsZQogICAgfTsKCiAgICBpZiAoZWxlbWVudC5wcm9wcy5jaGlsZHJlbikgewogICAgICByb3V0ZS5jaGlsZHJlbiA9IGNyZWF0ZVJvdXRlc0Zyb21DaGlsZHJlbihlbGVtZW50LnByb3BzLmNoaWxkcmVuLCB0cmVlUGF0aCk7CiAgICB9CgogICAgcm91dGVzLnB1c2gocm91dGUpOwogIH0pOwogIHJldHVybiByb3V0ZXM7Cn0KLyoqCiAqIFJlbmRlcnMgdGhlIHJlc3VsdCBvZiBgbWF0Y2hSb3V0ZXMoKWAgaW50byBhIFJlYWN0IGVsZW1lbnQuCiAqLwoKZnVuY3Rpb24gcmVuZGVyTWF0Y2hlcyhtYXRjaGVzKSB7CiAgcmV0dXJuIF9yZW5kZXJNYXRjaGVzKG1hdGNoZXMpOwp9Ci8qKgogKiBAcHJpdmF0ZQogKiBXYWxrIHRoZSByb3V0ZSB0cmVlIGFuZCBhZGQgaGFzRXJyb3JCb3VuZGFyeSBpZiBpdCdzIG5vdCBwcm92aWRlZCwgc28gdGhhdAogKiB1c2VycyBwcm92aWRpbmcgbWFudWFsIHJvdXRlIGFycmF5cyBjYW4ganVzdCBzcGVjaWZ5IGVycm9yRWxlbWVudAogKi8KCmZ1bmN0aW9uIGVuaGFuY2VNYW51YWxSb3V0ZU9iamVjdHMocm91dGVzKSB7CiAgcmV0dXJuIHJvdXRlcy5tYXAocm91dGUgPT4gewogICAgbGV0IHJvdXRlQ2xvbmUgPSBkaXN0X2V4dGVuZHMoe30sIHJvdXRlKTsKCiAgICBpZiAocm91dGVDbG9uZS5oYXNFcnJvckJvdW5kYXJ5ID09IG51bGwpIHsKICAgICAgcm91dGVDbG9uZS5oYXNFcnJvckJvdW5kYXJ5ID0gcm91dGVDbG9uZS5lcnJvckVsZW1lbnQgIT0gbnVsbDsKICAgIH0KCiAgICBpZiAocm91dGVDbG9uZS5jaGlsZHJlbikgewogICAgICByb3V0ZUNsb25lLmNoaWxkcmVuID0gZW5oYW5jZU1hbnVhbFJvdXRlT2JqZWN0cyhyb3V0ZUNsb25lLmNoaWxkcmVuKTsKICAgIH0KCiAgICByZXR1cm4gcm91dGVDbG9uZTsKICB9KTsKfQoKZnVuY3Rpb24gY3JlYXRlTWVtb3J5Um91dGVyKHJvdXRlcywgb3B0cykgewogIHJldHVybiBjcmVhdGVSb3V0ZXIoewogICAgYmFzZW5hbWU6IG9wdHMgPT0gbnVsbCA/IHZvaWQgMCA6IG9wdHMuYmFzZW5hbWUsCiAgICBoaXN0b3J5OiBjcmVhdGVNZW1vcnlIaXN0b3J5KHsKICAgICAgaW5pdGlhbEVudHJpZXM6IG9wdHMgPT0gbnVsbCA/IHZvaWQgMCA6IG9wdHMuaW5pdGlhbEVudHJpZXMsCiAgICAgIGluaXRpYWxJbmRleDogb3B0cyA9PSBudWxsID8gdm9pZCAwIDogb3B0cy5pbml0aWFsSW5kZXgKICAgIH0pLAogICAgaHlkcmF0aW9uRGF0YTogb3B0cyA9PSBudWxsID8gdm9pZCAwIDogb3B0cy5oeWRyYXRpb25EYXRhLAogICAgcm91dGVzOiBlbmhhbmNlTWFudWFsUm91dGVPYmplY3RzKHJvdXRlcykKICB9KS5pbml0aWFsaXplKCk7Cn0gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLwoKCi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcAoKOy8vIENPTkNBVEVOQVRFRCBNT0RVTEU6IC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci1kb20vZGlzdC9pbmRleC5qcwovKioKICogUmVhY3QgUm91dGVyIERPTSB2Ni40LjMKICoKICogQ29weXJpZ2h0IChjKSBSZW1peCBTb2Z0d2FyZSBJbmMuCiAqCiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZQogKiBMSUNFTlNFLm1kIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuCiAqCiAqIEBsaWNlbnNlIE1JVAogKi8KCgoKCgpmdW5jdGlvbiByZWFjdF9yb3V0ZXJfZG9tX2Rpc3RfZXh0ZW5kcygpIHsKICByZWFjdF9yb3V0ZXJfZG9tX2Rpc3RfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gPyBPYmplY3QuYXNzaWduLmJpbmQoKSA6IGZ1bmN0aW9uICh0YXJnZXQpIHsKICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7CiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07CgogICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7CiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsKICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07CiAgICAgICAgfQogICAgICB9CiAgICB9CgogICAgcmV0dXJuIHRhcmdldDsKICB9OwogIHJldHVybiByZWFjdF9yb3V0ZXJfZG9tX2Rpc3RfZXh0ZW5kcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpOwp9CgpmdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShzb3VyY2UsIGV4Y2x1ZGVkKSB7CiAgaWYgKHNvdXJjZSA9PSBudWxsKSByZXR1cm4ge307CiAgdmFyIHRhcmdldCA9IHt9OwogIHZhciBzb3VyY2VLZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTsKICB2YXIga2V5LCBpOwoKICBmb3IgKGkgPSAwOyBpIDwgc291cmNlS2V5cy5sZW5ndGg7IGkrKykgewogICAga2V5ID0gc291cmNlS2V5c1tpXTsKICAgIGlmIChleGNsdWRlZC5pbmRleE9mKGtleSkgPj0gMCkgY29udGludWU7CiAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOwogIH0KCiAgcmV0dXJuIHRhcmdldDsKfQoKY29uc3QgZGVmYXVsdE1ldGhvZCA9ICJnZXQiOwpjb25zdCBkZWZhdWx0RW5jVHlwZSA9ICJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQiOwpmdW5jdGlvbiBpc0h0bWxFbGVtZW50KG9iamVjdCkgewogIHJldHVybiBvYmplY3QgIT0gbnVsbCAmJiB0eXBlb2Ygb2JqZWN0LnRhZ05hbWUgPT09ICJzdHJpbmciOwp9CmZ1bmN0aW9uIGlzQnV0dG9uRWxlbWVudChvYmplY3QpIHsKICByZXR1cm4gaXNIdG1sRWxlbWVudChvYmplY3QpICYmIG9iamVjdC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICJidXR0b24iOwp9CmZ1bmN0aW9uIGlzRm9ybUVsZW1lbnQob2JqZWN0KSB7CiAgcmV0dXJuIGlzSHRtbEVsZW1lbnQob2JqZWN0KSAmJiBvYmplY3QudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAiZm9ybSI7Cn0KZnVuY3Rpb24gaXNJbnB1dEVsZW1lbnQob2JqZWN0KSB7CiAgcmV0dXJuIGlzSHRtbEVsZW1lbnQob2JqZWN0KSAmJiBvYmplY3QudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAiaW5wdXQiOwp9CgpmdW5jdGlvbiBpc01vZGlmaWVkRXZlbnQoZXZlbnQpIHsKICByZXR1cm4gISEoZXZlbnQubWV0YUtleSB8fCBldmVudC5hbHRLZXkgfHwgZXZlbnQuY3RybEtleSB8fCBldmVudC5zaGlmdEtleSk7Cn0KCmZ1bmN0aW9uIHNob3VsZFByb2Nlc3NMaW5rQ2xpY2soZXZlbnQsIHRhcmdldCkgewogIHJldHVybiBldmVudC5idXR0b24gPT09IDAgJiYgKCAvLyBJZ25vcmUgZXZlcnl0aGluZyBidXQgbGVmdCBjbGlja3MKICAhdGFyZ2V0IHx8IHRhcmdldCA9PT0gIl9zZWxmIikgJiYgLy8gTGV0IGJyb3dzZXIgaGFuZGxlICJ0YXJnZXQ9X2JsYW5rIiBldGMuCiAgIWlzTW9kaWZpZWRFdmVudChldmVudCkgLy8gSWdub3JlIGNsaWNrcyB3aXRoIG1vZGlmaWVyIGtleXMKICA7Cn0KLyoqCiAqIENyZWF0ZXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0IHVzaW5nIHRoZSBnaXZlbiBpbml0aWFsaXplci4KICoKICogVGhpcyBpcyBpZGVudGljYWwgdG8gYG5ldyBVUkxTZWFyY2hQYXJhbXMoaW5pdClgIGV4Y2VwdCBpdCBhbHNvCiAqIHN1cHBvcnRzIGFycmF5cyBhcyB2YWx1ZXMgaW4gdGhlIG9iamVjdCBmb3JtIG9mIHRoZSBpbml0aWFsaXplcgogKiBpbnN0ZWFkIG9mIGp1c3Qgc3RyaW5ncy4gVGhpcyBpcyBjb252ZW5pZW50IHdoZW4geW91IG5lZWQgbXVsdGlwbGUKICogdmFsdWVzIGZvciBhIGdpdmVuIGtleSwgYnV0IGRvbid0IHdhbnQgdG8gdXNlIGFuIGFycmF5IGluaXRpYWxpemVyLgogKgogKiBGb3IgZXhhbXBsZSwgaW5zdGVhZCBvZjoKICoKICogICBsZXQgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhbCiAqICAgICBbJ3NvcnQnLCAnbmFtZSddLAogKiAgICAgWydzb3J0JywgJ3ByaWNlJ10KICogICBdKTsKICoKICogeW91IGNhbiBkbzoKICoKICogICBsZXQgc2VhcmNoUGFyYW1zID0gY3JlYXRlU2VhcmNoUGFyYW1zKHsKICogICAgIHNvcnQ6IFsnbmFtZScsICdwcmljZSddCiAqICAgfSk7CiAqLwoKZnVuY3Rpb24gY3JlYXRlU2VhcmNoUGFyYW1zKGluaXQpIHsKICBpZiAoaW5pdCA9PT0gdm9pZCAwKSB7CiAgICBpbml0ID0gIiI7CiAgfQoKICByZXR1cm4gbmV3IFVSTFNlYXJjaFBhcmFtcyh0eXBlb2YgaW5pdCA9PT0gInN0cmluZyIgfHwgQXJyYXkuaXNBcnJheShpbml0KSB8fCBpbml0IGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zID8gaW5pdCA6IE9iamVjdC5rZXlzKGluaXQpLnJlZHVjZSgobWVtbywga2V5KSA9PiB7CiAgICBsZXQgdmFsdWUgPSBpbml0W2tleV07CiAgICByZXR1cm4gbWVtby5jb25jYXQoQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5tYXAodiA9PiBba2V5LCB2XSkgOiBbW2tleSwgdmFsdWVdXSk7CiAgfSwgW10pKTsKfQpmdW5jdGlvbiBnZXRTZWFyY2hQYXJhbXNGb3JMb2NhdGlvbihsb2NhdGlvblNlYXJjaCwgZGVmYXVsdFNlYXJjaFBhcmFtcykgewogIGxldCBzZWFyY2hQYXJhbXMgPSBjcmVhdGVTZWFyY2hQYXJhbXMobG9jYXRpb25TZWFyY2gpOwoKICBmb3IgKGxldCBrZXkgb2YgZGVmYXVsdFNlYXJjaFBhcmFtcy5rZXlzKCkpIHsKICAgIGlmICghc2VhcmNoUGFyYW1zLmhhcyhrZXkpKSB7CiAgICAgIGRlZmF1bHRTZWFyY2hQYXJhbXMuZ2V0QWxsKGtleSkuZm9yRWFjaCh2YWx1ZSA9PiB7CiAgICAgICAgc2VhcmNoUGFyYW1zLmFwcGVuZChrZXksIHZhbHVlKTsKICAgICAgfSk7CiAgICB9CiAgfQoKICByZXR1cm4gc2VhcmNoUGFyYW1zOwp9CmZ1bmN0aW9uIGdldEZvcm1TdWJtaXNzaW9uSW5mbyh0YXJnZXQsIGRlZmF1bHRBY3Rpb24sIG9wdGlvbnMpIHsKICBsZXQgbWV0aG9kOwogIGxldCBhY3Rpb247CiAgbGV0IGVuY1R5cGU7CiAgbGV0IGZvcm1EYXRhOwoKICBpZiAoaXNGb3JtRWxlbWVudCh0YXJnZXQpKSB7CiAgICBsZXQgc3VibWlzc2lvblRyaWdnZXIgPSBvcHRpb25zLnN1Ym1pc3Npb25UcmlnZ2VyOwogICAgbWV0aG9kID0gb3B0aW9ucy5tZXRob2QgfHwgdGFyZ2V0LmdldEF0dHJpYnV0ZSgibWV0aG9kIikgfHwgZGVmYXVsdE1ldGhvZDsKICAgIGFjdGlvbiA9IG9wdGlvbnMuYWN0aW9uIHx8IHRhcmdldC5nZXRBdHRyaWJ1dGUoImFjdGlvbiIpIHx8IGRlZmF1bHRBY3Rpb247CiAgICBlbmNUeXBlID0gb3B0aW9ucy5lbmNUeXBlIHx8IHRhcmdldC5nZXRBdHRyaWJ1dGUoImVuY3R5cGUiKSB8fCBkZWZhdWx0RW5jVHlwZTsKICAgIGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKHRhcmdldCk7CgogICAgaWYgKHN1Ym1pc3Npb25UcmlnZ2VyICYmIHN1Ym1pc3Npb25UcmlnZ2VyLm5hbWUpIHsKICAgICAgZm9ybURhdGEuYXBwZW5kKHN1Ym1pc3Npb25UcmlnZ2VyLm5hbWUsIHN1Ym1pc3Npb25UcmlnZ2VyLnZhbHVlKTsKICAgIH0KICB9IGVsc2UgaWYgKGlzQnV0dG9uRWxlbWVudCh0YXJnZXQpIHx8IGlzSW5wdXRFbGVtZW50KHRhcmdldCkgJiYgKHRhcmdldC50eXBlID09PSAic3VibWl0IiB8fCB0YXJnZXQudHlwZSA9PT0gImltYWdlIikpIHsKICAgIGxldCBmb3JtID0gdGFyZ2V0LmZvcm07CgogICAgaWYgKGZvcm0gPT0gbnVsbCkgewogICAgICB0aHJvdyBuZXcgRXJyb3IoIkNhbm5vdCBzdWJtaXQgYSA8YnV0dG9uPiBvciA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiPiB3aXRob3V0IGEgPGZvcm0+Iik7CiAgICB9IC8vIDxidXR0b24+LzxpbnB1dCB0eXBlPSJzdWJtaXQiPiBtYXkgb3ZlcnJpZGUgYXR0cmlidXRlcyBvZiA8Zm9ybT4KCgogICAgbWV0aG9kID0gb3B0aW9ucy5tZXRob2QgfHwgdGFyZ2V0LmdldEF0dHJpYnV0ZSgiZm9ybW1ldGhvZCIpIHx8IGZvcm0uZ2V0QXR0cmlidXRlKCJtZXRob2QiKSB8fCBkZWZhdWx0TWV0aG9kOwogICAgYWN0aW9uID0gb3B0aW9ucy5hY3Rpb24gfHwgdGFyZ2V0LmdldEF0dHJpYnV0ZSgiZm9ybWFjdGlvbiIpIHx8IGZvcm0uZ2V0QXR0cmlidXRlKCJhY3Rpb24iKSB8fCBkZWZhdWx0QWN0aW9uOwogICAgZW5jVHlwZSA9IG9wdGlvbnMuZW5jVHlwZSB8fCB0YXJnZXQuZ2V0QXR0cmlidXRlKCJmb3JtZW5jdHlwZSIpIHx8IGZvcm0uZ2V0QXR0cmlidXRlKCJlbmN0eXBlIikgfHwgZGVmYXVsdEVuY1R5cGU7CiAgICBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtKTsgLy8gSW5jbHVkZSBuYW1lICsgdmFsdWUgZnJvbSBhIDxidXR0b24+LCBhcHBlbmRpbmcgaW4gY2FzZSB0aGUgYnV0dG9uIG5hbWUKICAgIC8vIG1hdGNoZXMgYW4gZXhpc3RpbmcgaW5wdXQgbmFtZQoKICAgIGlmICh0YXJnZXQubmFtZSkgewogICAgICBmb3JtRGF0YS5hcHBlbmQodGFyZ2V0Lm5hbWUsIHRhcmdldC52YWx1ZSk7CiAgICB9CiAgfSBlbHNlIGlmIChpc0h0bWxFbGVtZW50KHRhcmdldCkpIHsKICAgIHRocm93IG5ldyBFcnJvcigiQ2Fubm90IHN1Ym1pdCBlbGVtZW50IHRoYXQgaXMgbm90IDxmb3JtPiwgPGJ1dHRvbj4sIG9yICIgKyAiPGlucHV0IHR5cGU9XCJzdWJtaXR8aW1hZ2VcIj4iKTsKICB9IGVsc2UgewogICAgbWV0aG9kID0gb3B0aW9ucy5tZXRob2QgfHwgZGVmYXVsdE1ldGhvZDsKICAgIGFjdGlvbiA9IG9wdGlvbnMuYWN0aW9uIHx8IGRlZmF1bHRBY3Rpb247CiAgICBlbmNUeXBlID0gb3B0aW9ucy5lbmNUeXBlIHx8IGRlZmF1bHRFbmNUeXBlOwoKICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBGb3JtRGF0YSkgewogICAgICBmb3JtRGF0YSA9IHRhcmdldDsKICAgIH0gZWxzZSB7CiAgICAgIGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7CgogICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zKSB7CiAgICAgICAgZm9yIChsZXQgW25hbWUsIHZhbHVlXSBvZiB0YXJnZXQpIHsKICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChuYW1lLCB2YWx1ZSk7CiAgICAgICAgfQogICAgICB9IGVsc2UgaWYgKHRhcmdldCAhPSBudWxsKSB7CiAgICAgICAgZm9yIChsZXQgbmFtZSBvZiBPYmplY3Qua2V5cyh0YXJnZXQpKSB7CiAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQobmFtZSwgdGFyZ2V0W25hbWVdKTsKICAgICAgICB9CiAgICAgIH0KICAgIH0KICB9CgogIGxldCB7CiAgICBwcm90b2NvbCwKICAgIGhvc3QKICB9ID0gd2luZG93LmxvY2F0aW9uOwogIGxldCB1cmwgPSBuZXcgVVJMKGFjdGlvbiwgcHJvdG9jb2wgKyAiLy8iICsgaG9zdCk7CiAgcmV0dXJuIHsKICAgIHVybCwKICAgIG1ldGhvZCwKICAgIGVuY1R5cGUsCiAgICBmb3JtRGF0YQogIH07Cn0KCmNvbnN0IF9leGNsdWRlZCA9IFsib25DbGljayIsICJyZWxhdGl2ZSIsICJyZWxvYWREb2N1bWVudCIsICJyZXBsYWNlIiwgInN0YXRlIiwgInRhcmdldCIsICJ0byIsICJwcmV2ZW50U2Nyb2xsUmVzZXQiXSwKICAgICAgX2V4Y2x1ZGVkMiA9IFsiYXJpYS1jdXJyZW50IiwgImNhc2VTZW5zaXRpdmUiLCAiY2xhc3NOYW1lIiwgImVuZCIsICJzdHlsZSIsICJ0byIsICJjaGlsZHJlbiJdLAogICAgICBfZXhjbHVkZWQzID0gKC8qIHVudXNlZCBwdXJlIGV4cHJlc3Npb24gb3Igc3VwZXIgKi8gbnVsbCAmJiAoWyJyZWxvYWREb2N1bWVudCIsICJyZXBsYWNlIiwgIm1ldGhvZCIsICJhY3Rpb24iLCAib25TdWJtaXQiLCAiZmV0Y2hlcktleSIsICJyb3V0ZUlkIiwgInJlbGF0aXZlIl0pKTsKLy8jcmVnaW9uIFJvdXRlcnMKLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8KCmZ1bmN0aW9uIGNyZWF0ZUJyb3dzZXJSb3V0ZXIocm91dGVzLCBvcHRzKSB7CiAgdmFyIF93aW5kb3c7CgogIHJldHVybiBjcmVhdGVSb3V0ZXIoewogICAgYmFzZW5hbWU6IG9wdHMgPT0gbnVsbCA/IHZvaWQgMCA6IG9wdHMuYmFzZW5hbWUsCiAgICBoaXN0b3J5OiBjcmVhdGVCcm93c2VySGlzdG9yeSh7CiAgICAgIHdpbmRvdzogb3B0cyA9PSBudWxsID8gdm9pZCAwIDogb3B0cy53aW5kb3cKICAgIH0pLAogICAgaHlkcmF0aW9uRGF0YTogKG9wdHMgPT0gbnVsbCA/IHZvaWQgMCA6IG9wdHMuaHlkcmF0aW9uRGF0YSkgfHwgKChfd2luZG93ID0gd2luZG93KSA9PSBudWxsID8gdm9pZCAwIDogX3dpbmRvdy5fX3N0YXRpY1JvdXRlckh5ZHJhdGlvbkRhdGEpLAogICAgcm91dGVzOiBVTlNBRkVfZW5oYW5jZU1hbnVhbFJvdXRlT2JqZWN0cyhyb3V0ZXMpCiAgfSkuaW5pdGlhbGl6ZSgpOwp9CmZ1bmN0aW9uIGNyZWF0ZUhhc2hSb3V0ZXIocm91dGVzLCBvcHRzKSB7CiAgdmFyIF93aW5kb3cyOwoKICByZXR1cm4gY3JlYXRlUm91dGVyKHsKICAgIGJhc2VuYW1lOiBvcHRzID09IG51bGwgPyB2b2lkIDAgOiBvcHRzLmJhc2VuYW1lLAogICAgaGlzdG9yeTogY3JlYXRlSGFzaEhpc3RvcnkoewogICAgICB3aW5kb3c6IG9wdHMgPT0gbnVsbCA/IHZvaWQgMCA6IG9wdHMud2luZG93CiAgICB9KSwKICAgIGh5ZHJhdGlvbkRhdGE6IChvcHRzID09IG51bGwgPyB2b2lkIDAgOiBvcHRzLmh5ZHJhdGlvbkRhdGEpIHx8ICgoX3dpbmRvdzIgPSB3aW5kb3cpID09IG51bGwgPyB2b2lkIDAgOiBfd2luZG93Mi5fX3N0YXRpY1JvdXRlckh5ZHJhdGlvbkRhdGEpLAogICAgcm91dGVzOiBVTlNBRkVfZW5oYW5jZU1hbnVhbFJvdXRlT2JqZWN0cyhyb3V0ZXMpCiAgfSkuaW5pdGlhbGl6ZSgpOwp9Ci8qKgogKiBBIGA8Um91dGVyPmAgZm9yIHVzZSBpbiB3ZWIgYnJvd3NlcnMuIFByb3ZpZGVzIHRoZSBjbGVhbmVzdCBVUkxzLgogKi8KCmZ1bmN0aW9uIEJyb3dzZXJSb3V0ZXIoX3JlZikgewogIGxldCB7CiAgICBiYXNlbmFtZSwKICAgIGNoaWxkcmVuLAogICAgd2luZG93CiAgfSA9IF9yZWY7CiAgbGV0IGhpc3RvcnlSZWYgPSBSZWFjdC51c2VSZWYoKTsKCiAgaWYgKGhpc3RvcnlSZWYuY3VycmVudCA9PSBudWxsKSB7CiAgICBoaXN0b3J5UmVmLmN1cnJlbnQgPSBjcmVhdGVCcm93c2VySGlzdG9yeSh7CiAgICAgIHdpbmRvdywKICAgICAgdjVDb21wYXQ6IHRydWUKICAgIH0pOwogIH0KCiAgbGV0IGhpc3RvcnkgPSBoaXN0b3J5UmVmLmN1cnJlbnQ7CiAgbGV0IFtzdGF0ZSwgc2V0U3RhdGVdID0gUmVhY3QudXNlU3RhdGUoewogICAgYWN0aW9uOiBoaXN0b3J5LmFjdGlvbiwKICAgIGxvY2F0aW9uOiBoaXN0b3J5LmxvY2F0aW9uCiAgfSk7CiAgUmVhY3QudXNlTGF5b3V0RWZmZWN0KCgpID0+IGhpc3RvcnkubGlzdGVuKHNldFN0YXRlKSwgW2hpc3RvcnldKTsKICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoUm91dGVyLCB7CiAgICBiYXNlbmFtZTogYmFzZW5hbWUsCiAgICBjaGlsZHJlbjogY2hpbGRyZW4sCiAgICBsb2NhdGlvbjogc3RhdGUubG9jYXRpb24sCiAgICBuYXZpZ2F0aW9uVHlwZTogc3RhdGUuYWN0aW9uLAogICAgbmF2aWdhdG9yOiBoaXN0b3J5CiAgfSk7Cn0KLyoqCiAqIEEgYDxSb3V0ZXI+YCBmb3IgdXNlIGluIHdlYiBicm93c2Vycy4gU3RvcmVzIHRoZSBsb2NhdGlvbiBpbiB0aGUgaGFzaAogKiBwb3J0aW9uIG9mIHRoZSBVUkwgc28gaXQgaXMgbm90IHNlbnQgdG8gdGhlIHNlcnZlci4KICovCgpmdW5jdGlvbiBIYXNoUm91dGVyKF9yZWYyKSB7CiAgbGV0IHsKICAgIGJhc2VuYW1lLAogICAgY2hpbGRyZW4sCiAgICB3aW5kb3cKICB9ID0gX3JlZjI7CiAgbGV0IGhpc3RvcnlSZWYgPSBSZWFjdC51c2VSZWYoKTsKCiAgaWYgKGhpc3RvcnlSZWYuY3VycmVudCA9PSBudWxsKSB7CiAgICBoaXN0b3J5UmVmLmN1cnJlbnQgPSBjcmVhdGVIYXNoSGlzdG9yeSh7CiAgICAgIHdpbmRvdywKICAgICAgdjVDb21wYXQ6IHRydWUKICAgIH0pOwogIH0KCiAgbGV0IGhpc3RvcnkgPSBoaXN0b3J5UmVmLmN1cnJlbnQ7CiAgbGV0IFtzdGF0ZSwgc2V0U3RhdGVdID0gUmVhY3QudXNlU3RhdGUoewogICAgYWN0aW9uOiBoaXN0b3J5LmFjdGlvbiwKICAgIGxvY2F0aW9uOiBoaXN0b3J5LmxvY2F0aW9uCiAgfSk7CiAgUmVhY3QudXNlTGF5b3V0RWZmZWN0KCgpID0+IGhpc3RvcnkubGlzdGVuKHNldFN0YXRlKSwgW2hpc3RvcnldKTsKICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoUm91dGVyLCB7CiAgICBiYXNlbmFtZTogYmFzZW5hbWUsCiAgICBjaGlsZHJlbjogY2hpbGRyZW4sCiAgICBsb2NhdGlvbjogc3RhdGUubG9jYXRpb24sCiAgICBuYXZpZ2F0aW9uVHlwZTogc3RhdGUuYWN0aW9uLAogICAgbmF2aWdhdG9yOiBoaXN0b3J5CiAgfSk7Cn0KLyoqCiAqIEEgYDxSb3V0ZXI+YCB0aGF0IGFjY2VwdHMgYSBwcmUtaW5zdGFudGlhdGVkIGhpc3Rvcnkgb2JqZWN0LiBJdCdzIGltcG9ydGFudAogKiB0byBub3RlIHRoYXQgdXNpbmcgeW91ciBvd24gaGlzdG9yeSBvYmplY3QgaXMgaGlnaGx5IGRpc2NvdXJhZ2VkIGFuZCBtYXkgYWRkCiAqIHR3byB2ZXJzaW9ucyBvZiB0aGUgaGlzdG9yeSBsaWJyYXJ5IHRvIHlvdXIgYnVuZGxlcyB1bmxlc3MgeW91IHVzZSB0aGUgc2FtZQogKiB2ZXJzaW9uIG9mIHRoZSBoaXN0b3J5IGxpYnJhcnkgdGhhdCBSZWFjdCBSb3V0ZXIgdXNlcyBpbnRlcm5hbGx5LgogKi8KCmZ1bmN0aW9uIEhpc3RvcnlSb3V0ZXIoX3JlZjMpIHsKICBsZXQgewogICAgYmFzZW5hbWUsCiAgICBjaGlsZHJlbiwKICAgIGhpc3RvcnkKICB9ID0gX3JlZjM7CiAgY29uc3QgW3N0YXRlLCBzZXRTdGF0ZV0gPSBSZWFjdC51c2VTdGF0ZSh7CiAgICBhY3Rpb246IGhpc3RvcnkuYWN0aW9uLAogICAgbG9jYXRpb246IGhpc3RvcnkubG9jYXRpb24KICB9KTsKICBSZWFjdC51c2VMYXlvdXRFZmZlY3QoKCkgPT4gaGlzdG9yeS5saXN0ZW4oc2V0U3RhdGUpLCBbaGlzdG9yeV0pOwogIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChSb3V0ZXIsIHsKICAgIGJhc2VuYW1lOiBiYXNlbmFtZSwKICAgIGNoaWxkcmVuOiBjaGlsZHJlbiwKICAgIGxvY2F0aW9uOiBzdGF0ZS5sb2NhdGlvbiwKICAgIG5hdmlnYXRpb25UeXBlOiBzdGF0ZS5hY3Rpb24sCiAgICBuYXZpZ2F0b3I6IGhpc3RvcnkKICB9KTsKfQoKaWYgKGZhbHNlKSB7fQovKioKICogVGhlIHB1YmxpYyBBUEkgZm9yIHJlbmRlcmluZyBhIGhpc3RvcnktYXdhcmUgPGE+LgogKi8KCmNvbnN0IExpbmsgPSAvKiNfX1BVUkVfXyovcmVhY3QuZm9yd2FyZFJlZihmdW5jdGlvbiBMaW5rV2l0aFJlZihfcmVmNCwgcmVmKSB7CiAgbGV0IHsKICAgIG9uQ2xpY2ssCiAgICByZWxhdGl2ZSwKICAgIHJlbG9hZERvY3VtZW50LAogICAgcmVwbGFjZSwKICAgIHN0YXRlLAogICAgdGFyZ2V0LAogICAgdG8sCiAgICBwcmV2ZW50U2Nyb2xsUmVzZXQKICB9ID0gX3JlZjQsCiAgICAgIHJlc3QgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfcmVmNCwgX2V4Y2x1ZGVkKTsKCiAgbGV0IGhyZWYgPSB1c2VIcmVmKHRvLCB7CiAgICByZWxhdGl2ZQogIH0pOwogIGxldCBpbnRlcm5hbE9uQ2xpY2sgPSB1c2VMaW5rQ2xpY2tIYW5kbGVyKHRvLCB7CiAgICByZXBsYWNlLAogICAgc3RhdGUsCiAgICB0YXJnZXQsCiAgICBwcmV2ZW50U2Nyb2xsUmVzZXQsCiAgICByZWxhdGl2ZQogIH0pOwoKICBmdW5jdGlvbiBoYW5kbGVDbGljayhldmVudCkgewogICAgaWYgKG9uQ2xpY2spIG9uQ2xpY2soZXZlbnQpOwoKICAgIGlmICghZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkgewogICAgICBpbnRlcm5hbE9uQ2xpY2soZXZlbnQpOwogICAgfQogIH0KCiAgcmV0dXJuICgKICAgIC8qI19fUFVSRV9fKi8KICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBqc3gtYTExeS9hbmNob3ItaGFzLWNvbnRlbnQKICAgIHJlYWN0LmNyZWF0ZUVsZW1lbnQoImEiLCByZWFjdF9yb3V0ZXJfZG9tX2Rpc3RfZXh0ZW5kcyh7fSwgcmVzdCwgewogICAgICBocmVmOiBocmVmLAogICAgICBvbkNsaWNrOiByZWxvYWREb2N1bWVudCA/IG9uQ2xpY2sgOiBoYW5kbGVDbGljaywKICAgICAgcmVmOiByZWYsCiAgICAgIHRhcmdldDogdGFyZ2V0CiAgICB9KSkKICApOwp9KTsKCmlmIChmYWxzZSkge30KLyoqCiAqIEEgPExpbms+IHdyYXBwZXIgdGhhdCBrbm93cyBpZiBpdCdzICJhY3RpdmUiIG9yIG5vdC4KICovCgoKY29uc3QgTmF2TGluayA9IC8qI19fUFVSRV9fKi9yZWFjdC5mb3J3YXJkUmVmKGZ1bmN0aW9uIE5hdkxpbmtXaXRoUmVmKF9yZWY1LCByZWYpIHsKICBsZXQgewogICAgImFyaWEtY3VycmVudCI6IGFyaWFDdXJyZW50UHJvcCA9ICJwYWdlIiwKICAgIGNhc2VTZW5zaXRpdmUgPSBmYWxzZSwKICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lUHJvcCA9ICIiLAogICAgZW5kID0gZmFsc2UsCiAgICBzdHlsZTogc3R5bGVQcm9wLAogICAgdG8sCiAgICBjaGlsZHJlbgogIH0gPSBfcmVmNSwKICAgICAgcmVzdCA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF9yZWY1LCBfZXhjbHVkZWQyKTsKCiAgbGV0IHBhdGggPSBkaXN0X3VzZVJlc29sdmVkUGF0aCh0bywgewogICAgcmVsYXRpdmU6IHJlc3QucmVsYXRpdmUKICB9KTsKICBsZXQgbG9jYXRpb24gPSBkaXN0X3VzZUxvY2F0aW9uKCk7CiAgbGV0IHJvdXRlclN0YXRlID0gcmVhY3QudXNlQ29udGV4dChEYXRhUm91dGVyU3RhdGVDb250ZXh0KTsKICBsZXQgdG9QYXRobmFtZSA9IHBhdGgucGF0aG5hbWU7CiAgbGV0IGxvY2F0aW9uUGF0aG5hbWUgPSBsb2NhdGlvbi5wYXRobmFtZTsKICBsZXQgbmV4dExvY2F0aW9uUGF0aG5hbWUgPSByb3V0ZXJTdGF0ZSAmJiByb3V0ZXJTdGF0ZS5uYXZpZ2F0aW9uICYmIHJvdXRlclN0YXRlLm5hdmlnYXRpb24ubG9jYXRpb24gPyByb3V0ZXJTdGF0ZS5uYXZpZ2F0aW9uLmxvY2F0aW9uLnBhdGhuYW1lIDogbnVsbDsKCiAgaWYgKCFjYXNlU2Vuc2l0aXZlKSB7CiAgICBsb2NhdGlvblBhdGhuYW1lID0gbG9jYXRpb25QYXRobmFtZS50b0xvd2VyQ2FzZSgpOwogICAgbmV4dExvY2F0aW9uUGF0aG5hbWUgPSBuZXh0TG9jYXRpb25QYXRobmFtZSA/IG5leHRMb2NhdGlvblBhdGhuYW1lLnRvTG93ZXJDYXNlKCkgOiBudWxsOwogICAgdG9QYXRobmFtZSA9IHRvUGF0aG5hbWUudG9Mb3dlckNhc2UoKTsKICB9CgogIGxldCBpc0FjdGl2ZSA9IGxvY2F0aW9uUGF0aG5hbWUgPT09IHRvUGF0aG5hbWUgfHwgIWVuZCAmJiBsb2NhdGlvblBhdGhuYW1lLnN0YXJ0c1dpdGgodG9QYXRobmFtZSkgJiYgbG9jYXRpb25QYXRobmFtZS5jaGFyQXQodG9QYXRobmFtZS5sZW5ndGgpID09PSAiLyI7CiAgbGV0IGlzUGVuZGluZyA9IG5leHRMb2NhdGlvblBhdGhuYW1lICE9IG51bGwgJiYgKG5leHRMb2NhdGlvblBhdGhuYW1lID09PSB0b1BhdGhuYW1lIHx8ICFlbmQgJiYgbmV4dExvY2F0aW9uUGF0aG5hbWUuc3RhcnRzV2l0aCh0b1BhdGhuYW1lKSAmJiBuZXh0TG9jYXRpb25QYXRobmFtZS5jaGFyQXQodG9QYXRobmFtZS5sZW5ndGgpID09PSAiLyIpOwogIGxldCBhcmlhQ3VycmVudCA9IGlzQWN0aXZlID8gYXJpYUN1cnJlbnRQcm9wIDogdW5kZWZpbmVkOwogIGxldCBjbGFzc05hbWU7CgogIGlmICh0eXBlb2YgY2xhc3NOYW1lUHJvcCA9PT0gImZ1bmN0aW9uIikgewogICAgY2xhc3NOYW1lID0gY2xhc3NOYW1lUHJvcCh7CiAgICAgIGlzQWN0aXZlLAogICAgICBpc1BlbmRpbmcKICAgIH0pOwogIH0gZWxzZSB7CiAgICAvLyBJZiB0aGUgY2xhc3NOYW1lIHByb3AgaXMgbm90IGEgZnVuY3Rpb24sIHdlIHVzZSBhIGRlZmF1bHQgYGFjdGl2ZWAKICAgIC8vIGNsYXNzIGZvciA8TmF2TGluayAvPnMgdGhhdCBhcmUgYWN0aXZlLiBJbiB2NSBgYWN0aXZlYCB3YXMgdGhlIGRlZmF1bHQKICAgIC8vIHZhbHVlIGZvciBgYWN0aXZlQ2xhc3NOYW1lYCwgYnV0IHdlIGFyZSByZW1vdmluZyB0aGF0IEFQSSBhbmQgY2FuIHN0aWxsCiAgICAvLyB1c2UgdGhlIG9sZCBkZWZhdWx0IGJlaGF2aW9yIGZvciBhIGNsZWFuZXIgdXBncmFkZSBwYXRoIGFuZCBrZWVwIHRoZQogICAgLy8gc2ltcGxlIHN0eWxpbmcgcnVsZXMgd29ya2luZyBhcyB0aGV5IGN1cnJlbnRseSBkby4KICAgIGNsYXNzTmFtZSA9IFtjbGFzc05hbWVQcm9wLCBpc0FjdGl2ZSA/ICJhY3RpdmUiIDogbnVsbCwgaXNQZW5kaW5nID8gInBlbmRpbmciIDogbnVsbF0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oIiAiKTsKICB9CgogIGxldCBzdHlsZSA9IHR5cGVvZiBzdHlsZVByb3AgPT09ICJmdW5jdGlvbiIgPyBzdHlsZVByb3AoewogICAgaXNBY3RpdmUsCiAgICBpc1BlbmRpbmcKICB9KSA6IHN0eWxlUHJvcDsKICByZXR1cm4gLyojX19QVVJFX18qL3JlYWN0LmNyZWF0ZUVsZW1lbnQoTGluaywgcmVhY3Rfcm91dGVyX2RvbV9kaXN0X2V4dGVuZHMoe30sIHJlc3QsIHsKICAgICJhcmlhLWN1cnJlbnQiOiBhcmlhQ3VycmVudCwKICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lLAogICAgcmVmOiByZWYsCiAgICBzdHlsZTogc3R5bGUsCiAgICB0bzogdG8KICB9KSwgdHlwZW9mIGNoaWxkcmVuID09PSAiZnVuY3Rpb24iID8gY2hpbGRyZW4oewogICAgaXNBY3RpdmUsCiAgICBpc1BlbmRpbmcKICB9KSA6IGNoaWxkcmVuKTsKfSk7CgppZiAoZmFsc2UpIHt9Ci8qKgogKiBBIGBAcmVtaXgtcnVuL3JvdXRlcmAtYXdhcmUgYDxmb3JtPmAuIEl0IGJlaGF2ZXMgbGlrZSBhIG5vcm1hbCBmb3JtIGV4Y2VwdAogKiB0aGF0IHRoZSBpbnRlcmFjdGlvbiB3aXRoIHRoZSBzZXJ2ZXIgaXMgd2l0aCBgZmV0Y2hgIGluc3RlYWQgb2YgbmV3IGRvY3VtZW50CiAqIHJlcXVlc3RzLCBhbGxvd2luZyBjb21wb25lbnRzIHRvIGFkZCBuaWNlciBVWCB0byB0aGUgcGFnZSBhcyB0aGUgZm9ybSBpcwogKiBzdWJtaXR0ZWQgYW5kIHJldHVybnMgd2l0aCBkYXRhLgogKi8KCgpjb25zdCBGb3JtID0gLyojX19QVVJFX18qLygvKiB1bnVzZWQgcHVyZSBleHByZXNzaW9uIG9yIHN1cGVyICovIG51bGwgJiYgKFJlYWN0LmZvcndhcmRSZWYoKHByb3BzLCByZWYpID0+IHsKICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoRm9ybUltcGwsIHJlYWN0X3JvdXRlcl9kb21fZGlzdF9leHRlbmRzKHt9LCBwcm9wcywgewogICAgcmVmOiByZWYKICB9KSk7Cn0pKSk7CgppZiAoZmFsc2UpIHt9Cgpjb25zdCBGb3JtSW1wbCA9IC8qI19fUFVSRV9fKi8oLyogdW51c2VkIHB1cmUgZXhwcmVzc2lvbiBvciBzdXBlciAqLyBudWxsICYmIChSZWFjdC5mb3J3YXJkUmVmKChfcmVmNiwgZm9yd2FyZGVkUmVmKSA9PiB7CiAgbGV0IHsKICAgIHJlbG9hZERvY3VtZW50LAogICAgcmVwbGFjZSwKICAgIG1ldGhvZCA9IGRlZmF1bHRNZXRob2QsCiAgICBhY3Rpb24sCiAgICBvblN1Ym1pdCwKICAgIGZldGNoZXJLZXksCiAgICByb3V0ZUlkLAogICAgcmVsYXRpdmUKICB9ID0gX3JlZjYsCiAgICAgIHByb3BzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3JlZjYsIF9leGNsdWRlZDMpOwoKICBsZXQgc3VibWl0ID0gdXNlU3VibWl0SW1wbChmZXRjaGVyS2V5LCByb3V0ZUlkKTsKICBsZXQgZm9ybU1ldGhvZCA9IG1ldGhvZC50b0xvd2VyQ2FzZSgpID09PSAiZ2V0IiA/ICJnZXQiIDogInBvc3QiOwogIGxldCBmb3JtQWN0aW9uID0gdXNlRm9ybUFjdGlvbihhY3Rpb24sIHsKICAgIHJlbGF0aXZlCiAgfSk7CgogIGxldCBzdWJtaXRIYW5kbGVyID0gZXZlbnQgPT4gewogICAgb25TdWJtaXQgJiYgb25TdWJtaXQoZXZlbnQpOwogICAgaWYgKGV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHJldHVybjsKICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7CiAgICBsZXQgc3VibWl0dGVyID0gZXZlbnQubmF0aXZlRXZlbnQuc3VibWl0dGVyOwogICAgc3VibWl0KHN1Ym1pdHRlciB8fCBldmVudC5jdXJyZW50VGFyZ2V0LCB7CiAgICAgIG1ldGhvZCwKICAgICAgcmVwbGFjZSwKICAgICAgcmVsYXRpdmUKICAgIH0pOwogIH07CgogIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudCgiZm9ybSIsIHJlYWN0X3JvdXRlcl9kb21fZGlzdF9leHRlbmRzKHsKICAgIHJlZjogZm9yd2FyZGVkUmVmLAogICAgbWV0aG9kOiBmb3JtTWV0aG9kLAogICAgYWN0aW9uOiBmb3JtQWN0aW9uLAogICAgb25TdWJtaXQ6IHJlbG9hZERvY3VtZW50ID8gb25TdWJtaXQgOiBzdWJtaXRIYW5kbGVyCiAgfSwgcHJvcHMpKTsKfSkpKTsKCmlmIChmYWxzZSkge30KLyoqCiAqIFRoaXMgY29tcG9uZW50IHdpbGwgZW11bGF0ZSB0aGUgYnJvd3NlcidzIHNjcm9sbCByZXN0b3JhdGlvbiBvbiBsb2NhdGlvbgogKiBjaGFuZ2VzLgogKi8KCgpmdW5jdGlvbiBTY3JvbGxSZXN0b3JhdGlvbihfcmVmNykgewogIGxldCB7CiAgICBnZXRLZXksCiAgICBzdG9yYWdlS2V5CiAgfSA9IF9yZWY3OwogIHVzZVNjcm9sbFJlc3RvcmF0aW9uKHsKICAgIGdldEtleSwKICAgIHN0b3JhZ2VLZXkKICB9KTsKICByZXR1cm4gbnVsbDsKfQoKaWYgKGZhbHNlKSB7fSAvLyNlbmRyZWdpb24KLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8KLy8jcmVnaW9uIEhvb2tzCi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vCgoKdmFyIGRpc3RfRGF0YVJvdXRlckhvb2s7CgooZnVuY3Rpb24gKERhdGFSb3V0ZXJIb29rKSB7CiAgRGF0YVJvdXRlckhvb2tbIlVzZVNjcm9sbFJlc3RvcmF0aW9uIl0gPSAidXNlU2Nyb2xsUmVzdG9yYXRpb24iOwogIERhdGFSb3V0ZXJIb29rWyJVc2VTdWJtaXRJbXBsIl0gPSAidXNlU3VibWl0SW1wbCI7CiAgRGF0YVJvdXRlckhvb2tbIlVzZUZldGNoZXIiXSA9ICJ1c2VGZXRjaGVyIjsKfSkoZGlzdF9EYXRhUm91dGVySG9vayB8fCAoZGlzdF9EYXRhUm91dGVySG9vayA9IHt9KSk7Cgp2YXIgZGlzdF9EYXRhUm91dGVyU3RhdGVIb29rOwoKKGZ1bmN0aW9uIChEYXRhUm91dGVyU3RhdGVIb29rKSB7CiAgRGF0YVJvdXRlclN0YXRlSG9va1siVXNlRmV0Y2hlcnMiXSA9ICJ1c2VGZXRjaGVycyI7CiAgRGF0YVJvdXRlclN0YXRlSG9va1siVXNlU2Nyb2xsUmVzdG9yYXRpb24iXSA9ICJ1c2VTY3JvbGxSZXN0b3JhdGlvbiI7Cn0pKGRpc3RfRGF0YVJvdXRlclN0YXRlSG9vayB8fCAoZGlzdF9EYXRhUm91dGVyU3RhdGVIb29rID0ge30pKTsKCmZ1bmN0aW9uIGRpc3RfZ2V0RGF0YVJvdXRlckNvbnNvbGVFcnJvcihob29rTmFtZSkgewogIHJldHVybiBob29rTmFtZSArICIgbXVzdCBiZSB1c2VkIHdpdGhpbiBhIGRhdGEgcm91dGVyLiAgU2VlIGh0dHBzOi8vcmVhY3Ryb3V0ZXIuY29tL2VuL21haW4vcm91dGVycy9waWNraW5nLWEtcm91dGVyLiI7Cn0KCmZ1bmN0aW9uIGRpc3RfdXNlRGF0YVJvdXRlckNvbnRleHQoaG9va05hbWUpIHsKICBsZXQgY3R4ID0gUmVhY3QudXNlQ29udGV4dChVTlNBRkVfRGF0YVJvdXRlckNvbnRleHQpOwogICFjdHggPyAgZmFsc2UgPyAwIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDsKICByZXR1cm4gY3R4Owp9CgpmdW5jdGlvbiBkaXN0X3VzZURhdGFSb3V0ZXJTdGF0ZShob29rTmFtZSkgewogIGxldCBzdGF0ZSA9IFJlYWN0LnVzZUNvbnRleHQoVU5TQUZFX0RhdGFSb3V0ZXJTdGF0ZUNvbnRleHQpOwogICFzdGF0ZSA/ICBmYWxzZSA/IDAgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwOwogIHJldHVybiBzdGF0ZTsKfQovKioKICogSGFuZGxlcyB0aGUgY2xpY2sgYmVoYXZpb3IgZm9yIHJvdXRlciBgPExpbms+YCBjb21wb25lbnRzLiBUaGlzIGlzIHVzZWZ1bCBpZgogKiB5b3UgbmVlZCB0byBjcmVhdGUgY3VzdG9tIGA8TGluaz5gIGNvbXBvbmVudHMgd2l0aCB0aGUgc2FtZSBjbGljayBiZWhhdmlvciB3ZQogKiB1c2UgaW4gb3VyIGV4cG9ydGVkIGA8TGluaz5gLgogKi8KCgpmdW5jdGlvbiB1c2VMaW5rQ2xpY2tIYW5kbGVyKHRvLCBfdGVtcCkgewogIGxldCB7CiAgICB0YXJnZXQsCiAgICByZXBsYWNlOiByZXBsYWNlUHJvcCwKICAgIHN0YXRlLAogICAgcHJldmVudFNjcm9sbFJlc2V0LAogICAgcmVsYXRpdmUKICB9ID0gX3RlbXAgPT09IHZvaWQgMCA/IHt9IDogX3RlbXA7CiAgbGV0IG5hdmlnYXRlID0gZGlzdF91c2VOYXZpZ2F0ZSgpOwogIGxldCBsb2NhdGlvbiA9IGRpc3RfdXNlTG9jYXRpb24oKTsKICBsZXQgcGF0aCA9IGRpc3RfdXNlUmVzb2x2ZWRQYXRoKHRvLCB7CiAgICByZWxhdGl2ZQogIH0pOwogIHJldHVybiByZWFjdC51c2VDYWxsYmFjayhldmVudCA9PiB7CiAgICBpZiAoc2hvdWxkUHJvY2Vzc0xpbmtDbGljayhldmVudCwgdGFyZ2V0KSkgewogICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBJZiB0aGUgVVJMIGhhc24ndCBjaGFuZ2VkLCBhIHJlZ3VsYXIgPGE+IHdpbGwgZG8gYSByZXBsYWNlIGluc3RlYWQgb2YKICAgICAgLy8gYSBwdXNoLCBzbyBkbyB0aGUgc2FtZSBoZXJlIHVubGVzcyB0aGUgcmVwbGFjZSBwcm9wIGlzIGV4cGxpY2l0bHkgc2V0CgogICAgICBsZXQgcmVwbGFjZSA9IHJlcGxhY2VQcm9wICE9PSB1bmRlZmluZWQgPyByZXBsYWNlUHJvcCA6IHJvdXRlcl9jcmVhdGVQYXRoKGxvY2F0aW9uKSA9PT0gcm91dGVyX2NyZWF0ZVBhdGgocGF0aCk7CiAgICAgIG5hdmlnYXRlKHRvLCB7CiAgICAgICAgcmVwbGFjZSwKICAgICAgICBzdGF0ZSwKICAgICAgICBwcmV2ZW50U2Nyb2xsUmVzZXQsCiAgICAgICAgcmVsYXRpdmUKICAgICAgfSk7CiAgICB9CiAgfSwgW2xvY2F0aW9uLCBuYXZpZ2F0ZSwgcGF0aCwgcmVwbGFjZVByb3AsIHN0YXRlLCB0YXJnZXQsIHRvLCBwcmV2ZW50U2Nyb2xsUmVzZXQsIHJlbGF0aXZlXSk7Cn0KLyoqCiAqIEEgY29udmVuaWVudCB3cmFwcGVyIGZvciByZWFkaW5nIGFuZCB3cml0aW5nIHNlYXJjaCBwYXJhbWV0ZXJzIHZpYSB0aGUKICogVVJMU2VhcmNoUGFyYW1zIGludGVyZmFjZS4KICovCgpmdW5jdGlvbiB1c2VTZWFyY2hQYXJhbXMoZGVmYXVsdEluaXQpIHsKICAgZmFsc2UgPyAwIDogdm9pZCAwOwogIGxldCBkZWZhdWx0U2VhcmNoUGFyYW1zUmVmID0gUmVhY3QudXNlUmVmKGNyZWF0ZVNlYXJjaFBhcmFtcyhkZWZhdWx0SW5pdCkpOwogIGxldCBsb2NhdGlvbiA9IHVzZUxvY2F0aW9uKCk7CiAgbGV0IHNlYXJjaFBhcmFtcyA9IFJlYWN0LnVzZU1lbW8oKCkgPT4gZ2V0U2VhcmNoUGFyYW1zRm9yTG9jYXRpb24obG9jYXRpb24uc2VhcmNoLCBkZWZhdWx0U2VhcmNoUGFyYW1zUmVmLmN1cnJlbnQpLCBbbG9jYXRpb24uc2VhcmNoXSk7CiAgbGV0IG5hdmlnYXRlID0gdXNlTmF2aWdhdGUoKTsKICBsZXQgc2V0U2VhcmNoUGFyYW1zID0gUmVhY3QudXNlQ2FsbGJhY2soKG5leHRJbml0LCBuYXZpZ2F0ZU9wdGlvbnMpID0+IHsKICAgIGNvbnN0IG5ld1NlYXJjaFBhcmFtcyA9IGNyZWF0ZVNlYXJjaFBhcmFtcyh0eXBlb2YgbmV4dEluaXQgPT09ICJmdW5jdGlvbiIgPyBuZXh0SW5pdChzZWFyY2hQYXJhbXMpIDogbmV4dEluaXQpOwogICAgbmF2aWdhdGUoIj8iICsgbmV3U2VhcmNoUGFyYW1zLCBuYXZpZ2F0ZU9wdGlvbnMpOwogIH0sIFtuYXZpZ2F0ZSwgc2VhcmNoUGFyYW1zXSk7CiAgcmV0dXJuIFtzZWFyY2hQYXJhbXMsIHNldFNlYXJjaFBhcmFtc107Cn0KLyoqCiAqIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IG1heSBiZSB1c2VkIHRvIHByb2dyYW1tYXRpY2FsbHkgc3VibWl0IGEgZm9ybSAob3IKICogc29tZSBhcmJpdHJhcnkgZGF0YSkgdG8gdGhlIHNlcnZlci4KICovCgpmdW5jdGlvbiB1c2VTdWJtaXQoKSB7CiAgcmV0dXJuIHVzZVN1Ym1pdEltcGwoKTsKfQoKZnVuY3Rpb24gdXNlU3VibWl0SW1wbChmZXRjaGVyS2V5LCByb3V0ZUlkKSB7CiAgbGV0IHsKICAgIHJvdXRlcgogIH0gPSBkaXN0X3VzZURhdGFSb3V0ZXJDb250ZXh0KGRpc3RfRGF0YVJvdXRlckhvb2suVXNlU3VibWl0SW1wbCk7CiAgbGV0IGRlZmF1bHRBY3Rpb24gPSB1c2VGb3JtQWN0aW9uKCk7CiAgcmV0dXJuIFJlYWN0LnVzZUNhbGxiYWNrKGZ1bmN0aW9uICh0YXJnZXQsIG9wdGlvbnMpIHsKICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsKICAgICAgb3B0aW9ucyA9IHt9OwogICAgfQoKICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICJ1bmRlZmluZWQiKSB7CiAgICAgIHRocm93IG5ldyBFcnJvcigiWW91IGFyZSBjYWxsaW5nIHN1Ym1pdCBkdXJpbmcgdGhlIHNlcnZlciByZW5kZXIuICIgKyAiVHJ5IGNhbGxpbmcgc3VibWl0IHdpdGhpbiBhIGB1c2VFZmZlY3RgIG9yIGNhbGxiYWNrIGluc3RlYWQuIik7CiAgICB9CgogICAgbGV0IHsKICAgICAgbWV0aG9kLAogICAgICBlbmNUeXBlLAogICAgICBmb3JtRGF0YSwKICAgICAgdXJsCiAgICB9ID0gZ2V0Rm9ybVN1Ym1pc3Npb25JbmZvKHRhcmdldCwgZGVmYXVsdEFjdGlvbiwgb3B0aW9ucyk7CiAgICBsZXQgaHJlZiA9IHVybC5wYXRobmFtZSArIHVybC5zZWFyY2g7CiAgICBsZXQgb3B0cyA9IHsKICAgICAgcmVwbGFjZTogb3B0aW9ucy5yZXBsYWNlLAogICAgICBmb3JtRGF0YSwKICAgICAgZm9ybU1ldGhvZDogbWV0aG9kLAogICAgICBmb3JtRW5jVHlwZTogZW5jVHlwZQogICAgfTsKCiAgICBpZiAoZmV0Y2hlcktleSkgewogICAgICAhKHJvdXRlSWQgIT0gbnVsbCkgPyAgZmFsc2UgPyAwIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDsKICAgICAgcm91dGVyLmZldGNoKGZldGNoZXJLZXksIHJvdXRlSWQsIGhyZWYsIG9wdHMpOwogICAgfSBlbHNlIHsKICAgICAgcm91dGVyLm5hdmlnYXRlKGhyZWYsIG9wdHMpOwogICAgfQogIH0sIFtkZWZhdWx0QWN0aW9uLCByb3V0ZXIsIGZldGNoZXJLZXksIHJvdXRlSWRdKTsKfQoKZnVuY3Rpb24gdXNlRm9ybUFjdGlvbihhY3Rpb24sIF90ZW1wMikgewogIGxldCB7CiAgICByZWxhdGl2ZQogIH0gPSBfdGVtcDIgPT09IHZvaWQgMCA/IHt9IDogX3RlbXAyOwogIGxldCB7CiAgICBiYXNlbmFtZQogIH0gPSBSZWFjdC51c2VDb250ZXh0KFVOU0FGRV9OYXZpZ2F0aW9uQ29udGV4dCk7CiAgbGV0IHJvdXRlQ29udGV4dCA9IFJlYWN0LnVzZUNvbnRleHQoVU5TQUZFX1JvdXRlQ29udGV4dCk7CiAgIXJvdXRlQ29udGV4dCA/ICBmYWxzZSA/IDAgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwOwogIGxldCBbbWF0Y2hdID0gcm91dGVDb250ZXh0Lm1hdGNoZXMuc2xpY2UoLTEpOwogIGxldCByZXNvbHZlZEFjdGlvbiA9IGFjdGlvbiAhPSBudWxsID8gYWN0aW9uIDogIi4iOyAvLyBTaGFsbG93IGNsb25lIHBhdGggc28gd2UgY2FuIG1vZGlmeSBpdCBiZWxvdywgb3RoZXJ3aXNlIHdlIG1vZGlmeSB0aGUKICAvLyBvYmplY3QgcmVmZXJlbmNlZCBieSB1c2VNZW1vIGluc2lkZSB1c2VSZXNvbHZlZFBhdGgKCiAgbGV0IHBhdGggPSByZWFjdF9yb3V0ZXJfZG9tX2Rpc3RfZXh0ZW5kcyh7fSwgdXNlUmVzb2x2ZWRQYXRoKHJlc29sdmVkQWN0aW9uLCB7CiAgICByZWxhdGl2ZQogIH0pKTsgLy8gUHJldmlvdXNseSB3ZSBzZXQgdGhlIGRlZmF1bHQgYWN0aW9uIHRvICIuIi4gVGhlIHByb2JsZW0gd2l0aCB0aGlzIGlzIHRoYXQKICAvLyBgdXNlUmVzb2x2ZWRQYXRoKCIuIilgIGV4Y2x1ZGVzIHNlYXJjaCBwYXJhbXMgYW5kIHRoZSBoYXNoIG9mIHRoZSByZXNvbHZlZAogIC8vIFVSTC4gVGhpcyBpcyB0aGUgaW50ZW5kZWQgYmVoYXZpb3Igb2Ygd2hlbiAiLiIgaXMgc3BlY2lmaWNhbGx5IHByb3ZpZGVkIGFzCiAgLy8gdGhlIGZvcm0gYWN0aW9uLCBidXQgaW5jb25zaXN0ZW50IHcvIGJyb3dzZXJzIHdoZW4gdGhlIGFjdGlvbiBpcyBvbWl0dGVkLgogIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9yZW1peC1ydW4vcmVtaXgvaXNzdWVzLzkyNwoKCiAgbGV0IGxvY2F0aW9uID0gdXNlTG9jYXRpb24oKTsKCiAgaWYgKGFjdGlvbiA9PSBudWxsKSB7CiAgICAvLyBTYWZlIHRvIHdyaXRlIHRvIHRoZXNlIGRpcmVjdGx5IGhlcmUgc2luY2UgaWYgYWN0aW9uIHdhcyB1bmRlZmluZWQsIHdlCiAgICAvLyB3b3VsZCBoYXZlIGNhbGxlZCB1c2VSZXNvbHZlZFBhdGgoIi4iKSB3aGljaCB3aWxsIG5ldmVyIGluY2x1ZGUgYSBzZWFyY2gKICAgIC8vIG9yIGhhc2gKICAgIHBhdGguc2VhcmNoID0gbG9jYXRpb24uc2VhcmNoOwogICAgcGF0aC5oYXNoID0gbG9jYXRpb24uaGFzaDsgLy8gV2hlbiBncmFiYmluZyBzZWFyY2ggcGFyYW1zIGZyb20gdGhlIFVSTCwgcmVtb3ZlIHRoZSBhdXRvbWF0aWNhbGx5CiAgICAvLyBpbnNlcnRlZCA/aW5kZXggcGFyYW0gc28gd2UgbWF0Y2ggdGhlIHVzZVJlc29sdmVkUGF0aCBzZWFyY2ggYmVoYXZpb3IKICAgIC8vIHdoaWNoIHdvdWxkIG5vdCBpbmNsdWRlID9pbmRleAoKICAgIGlmIChtYXRjaC5yb3V0ZS5pbmRleCkgewogICAgICBsZXQgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhwYXRoLnNlYXJjaCk7CiAgICAgIHBhcmFtcy5kZWxldGUoImluZGV4Iik7CiAgICAgIHBhdGguc2VhcmNoID0gcGFyYW1zLnRvU3RyaW5nKCkgPyAiPyIgKyBwYXJhbXMudG9TdHJpbmcoKSA6ICIiOwogICAgfQogIH0KCiAgaWYgKCghYWN0aW9uIHx8IGFjdGlvbiA9PT0gIi4iKSAmJiBtYXRjaC5yb3V0ZS5pbmRleCkgewogICAgcGF0aC5zZWFyY2ggPSBwYXRoLnNlYXJjaCA/IHBhdGguc2VhcmNoLnJlcGxhY2UoL15cPy8sICI/aW5kZXgmIikgOiAiP2luZGV4IjsKICB9IC8vIElmIHdlJ3JlIG9wZXJhdGluZyB3aXRoaW4gYSBiYXNlbmFtZSwgcHJlcGVuZCBpdCB0byB0aGUgcGF0aG5hbWUgcHJpb3IKICAvLyB0byBjcmVhdGluZyB0aGUgZm9ybSBhY3Rpb24uICBJZiB0aGlzIGlzIGEgcm9vdCBuYXZpZ2F0aW9uLCB0aGVuIGp1c3QgdXNlCiAgLy8gdGhlIHJhdyBiYXNlbmFtZSB3aGljaCBhbGxvd3MgdGhlIGJhc2VuYW1lIHRvIGhhdmUgZnVsbCBjb250cm9sIG92ZXIgdGhlCiAgLy8gcHJlc2VuY2Ugb2YgYSB0cmFpbGluZyBzbGFzaCBvbiByb290IGFjdGlvbnMKCgogIGlmIChiYXNlbmFtZSAhPT0gIi8iKSB7CiAgICBwYXRoLnBhdGhuYW1lID0gcGF0aC5wYXRobmFtZSA9PT0gIi8iID8gYmFzZW5hbWUgOiBqb2luUGF0aHMoW2Jhc2VuYW1lLCBwYXRoLnBhdGhuYW1lXSk7CiAgfQoKICByZXR1cm4gY3JlYXRlUGF0aChwYXRoKTsKfQoKZnVuY3Rpb24gY3JlYXRlRmV0Y2hlckZvcm0oZmV0Y2hlcktleSwgcm91dGVJZCkgewogIGxldCBGZXRjaGVyRm9ybSA9IC8qI19fUFVSRV9fKi9SZWFjdC5mb3J3YXJkUmVmKChwcm9wcywgcmVmKSA9PiB7CiAgICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoRm9ybUltcGwsIHJlYWN0X3JvdXRlcl9kb21fZGlzdF9leHRlbmRzKHt9LCBwcm9wcywgewogICAgICByZWY6IHJlZiwKICAgICAgZmV0Y2hlcktleTogZmV0Y2hlcktleSwKICAgICAgcm91dGVJZDogcm91dGVJZAogICAgfSkpOwogIH0pOwoKICBpZiAoZmFsc2UpIHt9CgogIHJldHVybiBGZXRjaGVyRm9ybTsKfQoKbGV0IGZldGNoZXJJZCA9IDA7Ci8qKgogKiBJbnRlcmFjdHMgd2l0aCByb3V0ZSBsb2FkZXJzIGFuZCBhY3Rpb25zIHdpdGhvdXQgY2F1c2luZyBhIG5hdmlnYXRpb24uIEdyZWF0CiAqIGZvciBhbnkgaW50ZXJhY3Rpb24gdGhhdCBzdGF5cyBvbiB0aGUgc2FtZSBwYWdlLgogKi8KCmZ1bmN0aW9uIHVzZUZldGNoZXIoKSB7CiAgdmFyIF9yb3V0ZSRtYXRjaGVzOwoKICBsZXQgewogICAgcm91dGVyCiAgfSA9IGRpc3RfdXNlRGF0YVJvdXRlckNvbnRleHQoZGlzdF9EYXRhUm91dGVySG9vay5Vc2VGZXRjaGVyKTsKICBsZXQgcm91dGUgPSBSZWFjdC51c2VDb250ZXh0KFVOU0FGRV9Sb3V0ZUNvbnRleHQpOwogICFyb3V0ZSA/ICBmYWxzZSA/IDAgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwOwogIGxldCByb3V0ZUlkID0gKF9yb3V0ZSRtYXRjaGVzID0gcm91dGUubWF0Y2hlc1tyb3V0ZS5tYXRjaGVzLmxlbmd0aCAtIDFdKSA9PSBudWxsID8gdm9pZCAwIDogX3JvdXRlJG1hdGNoZXMucm91dGUuaWQ7CiAgIShyb3V0ZUlkICE9IG51bGwpID8gIGZhbHNlID8gMCA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7CiAgbGV0IFtmZXRjaGVyS2V5XSA9IFJlYWN0LnVzZVN0YXRlKCgpID0+IFN0cmluZygrK2ZldGNoZXJJZCkpOwogIGxldCBbRm9ybV0gPSBSZWFjdC51c2VTdGF0ZSgoKSA9PiB7CiAgICAhcm91dGVJZCA/ICBmYWxzZSA/IDAgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwOwogICAgcmV0dXJuIGNyZWF0ZUZldGNoZXJGb3JtKGZldGNoZXJLZXksIHJvdXRlSWQpOwogIH0pOwogIGxldCBbbG9hZF0gPSBSZWFjdC51c2VTdGF0ZSgoKSA9PiBocmVmID0+IHsKICAgICFyb3V0ZXIgPyAgZmFsc2UgPyAwIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDsKICAgICFyb3V0ZUlkID8gIGZhbHNlID8gMCA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7CiAgICByb3V0ZXIuZmV0Y2goZmV0Y2hlcktleSwgcm91dGVJZCwgaHJlZik7CiAgfSk7CiAgbGV0IHN1Ym1pdCA9IHVzZVN1Ym1pdEltcGwoZmV0Y2hlcktleSwgcm91dGVJZCk7CiAgbGV0IGZldGNoZXIgPSByb3V0ZXIuZ2V0RmV0Y2hlcihmZXRjaGVyS2V5KTsKICBsZXQgZmV0Y2hlcldpdGhDb21wb25lbnRzID0gUmVhY3QudXNlTWVtbygoKSA9PiByZWFjdF9yb3V0ZXJfZG9tX2Rpc3RfZXh0ZW5kcyh7CiAgICBGb3JtLAogICAgc3VibWl0LAogICAgbG9hZAogIH0sIGZldGNoZXIpLCBbZmV0Y2hlciwgRm9ybSwgc3VibWl0LCBsb2FkXSk7CiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHsKICAgIC8vIElzIHRoaXMgYnVzdGVkIHdoZW4gdGhlIFJlYWN0IHRlYW0gZ2V0cyByZWFsIHdlaXJkIGFuZCBjYWxscyBlZmZlY3RzCiAgICAvLyB0d2ljZSBvbiBtb3VudD8gIFdlIHJlYWxseSBqdXN0IG5lZWQgdG8gZ2FyYmFnZSBjb2xsZWN0IGhlcmUgd2hlbiB0aGlzCiAgICAvLyBmZXRjaGVyIGlzIG5vIGxvbmdlciBhcm91bmQuCiAgICByZXR1cm4gKCkgPT4gewogICAgICBpZiAoIXJvdXRlcikgewogICAgICAgIGNvbnNvbGUud2FybigiTm8gZmV0Y2hlciBhdmFpbGFibGUgdG8gY2xlYW4gdXAgZnJvbSB1c2VGZXRjaGVyKCkiKTsKICAgICAgICByZXR1cm47CiAgICAgIH0KCiAgICAgIHJvdXRlci5kZWxldGVGZXRjaGVyKGZldGNoZXJLZXkpOwogICAgfTsKICB9LCBbcm91dGVyLCBmZXRjaGVyS2V5XSk7CiAgcmV0dXJuIGZldGNoZXJXaXRoQ29tcG9uZW50czsKfQovKioKICogUHJvdmlkZXMgYWxsIGZldGNoZXJzIGN1cnJlbnRseSBvbiB0aGUgcGFnZS4gVXNlZnVsIGZvciBsYXlvdXRzIGFuZCBwYXJlbnQKICogcm91dGVzIHRoYXQgbmVlZCB0byBwcm92aWRlIHBlbmRpbmcvb3B0aW1pc3RpYyBVSSByZWdhcmRpbmcgdGhlIGZldGNoLgogKi8KCmZ1bmN0aW9uIHVzZUZldGNoZXJzKCkgewogIGxldCBzdGF0ZSA9IGRpc3RfdXNlRGF0YVJvdXRlclN0YXRlKGRpc3RfRGF0YVJvdXRlclN0YXRlSG9vay5Vc2VGZXRjaGVycyk7CiAgcmV0dXJuIFsuLi5zdGF0ZS5mZXRjaGVycy52YWx1ZXMoKV07Cn0KY29uc3QgU0NST0xMX1JFU1RPUkFUSU9OX1NUT1JBR0VfS0VZID0gInJlYWN0LXJvdXRlci1zY3JvbGwtcG9zaXRpb25zIjsKbGV0IHNhdmVkU2Nyb2xsUG9zaXRpb25zID0ge307Ci8qKgogKiBXaGVuIHJlbmRlcmVkIGluc2lkZSBhIFJvdXRlclByb3ZpZGVyLCB3aWxsIHJlc3RvcmUgc2Nyb2xsIHBvc2l0aW9ucyBvbiBuYXZpZ2F0aW9ucwogKi8KCmZ1bmN0aW9uIHVzZVNjcm9sbFJlc3RvcmF0aW9uKF90ZW1wMykgewogIGxldCB7CiAgICBnZXRLZXksCiAgICBzdG9yYWdlS2V5CiAgfSA9IF90ZW1wMyA9PT0gdm9pZCAwID8ge30gOiBfdGVtcDM7CiAgbGV0IHsKICAgIHJvdXRlcgogIH0gPSBkaXN0X3VzZURhdGFSb3V0ZXJDb250ZXh0KGRpc3RfRGF0YVJvdXRlckhvb2suVXNlU2Nyb2xsUmVzdG9yYXRpb24pOwogIGxldCB7CiAgICByZXN0b3JlU2Nyb2xsUG9zaXRpb24sCiAgICBwcmV2ZW50U2Nyb2xsUmVzZXQKICB9ID0gZGlzdF91c2VEYXRhUm91dGVyU3RhdGUoZGlzdF9EYXRhUm91dGVyU3RhdGVIb29rLlVzZVNjcm9sbFJlc3RvcmF0aW9uKTsKICBsZXQgbG9jYXRpb24gPSB1c2VMb2NhdGlvbigpOwogIGxldCBtYXRjaGVzID0gdXNlTWF0Y2hlcygpOwogIGxldCBuYXZpZ2F0aW9uID0gdXNlTmF2aWdhdGlvbigpOyAvLyBUcmlnZ2VyIG1hbnVhbCBzY3JvbGwgcmVzdG9yYXRpb24gd2hpbGUgd2UncmUgYWN0aXZlCgogIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7CiAgICB3aW5kb3cuaGlzdG9yeS5zY3JvbGxSZXN0b3JhdGlvbiA9ICJtYW51YWwiOwogICAgcmV0dXJuICgpID0+IHsKICAgICAgd2luZG93Lmhpc3Rvcnkuc2Nyb2xsUmVzdG9yYXRpb24gPSAiYXV0byI7CiAgICB9OwogIH0sIFtdKTsgLy8gU2F2ZSBwb3NpdGlvbnMgb24gdW5sb2FkCgogIHVzZUJlZm9yZVVubG9hZChSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7CiAgICBpZiAobmF2aWdhdGlvbi5zdGF0ZSA9PT0gImlkbGUiKSB7CiAgICAgIGxldCBrZXkgPSAoZ2V0S2V5ID8gZ2V0S2V5KGxvY2F0aW9uLCBtYXRjaGVzKSA6IG51bGwpIHx8IGxvY2F0aW9uLmtleTsKICAgICAgc2F2ZWRTY3JvbGxQb3NpdGlvbnNba2V5XSA9IHdpbmRvdy5zY3JvbGxZOwogICAgfQoKICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oc3RvcmFnZUtleSB8fCBTQ1JPTExfUkVTVE9SQVRJT05fU1RPUkFHRV9LRVksIEpTT04uc3RyaW5naWZ5KHNhdmVkU2Nyb2xsUG9zaXRpb25zKSk7CiAgICB3aW5kb3cuaGlzdG9yeS5zY3JvbGxSZXN0b3JhdGlvbiA9ICJhdXRvIjsKICB9LCBbc3RvcmFnZUtleSwgZ2V0S2V5LCBuYXZpZ2F0aW9uLnN0YXRlLCBsb2NhdGlvbiwgbWF0Y2hlc10pKTsgLy8gUmVhZCBpbiBhbnkgc2F2ZWQgc2Nyb2xsIGxvY2F0aW9ucwoKICBSZWFjdC51c2VMYXlvdXRFZmZlY3QoKCkgPT4gewogICAgdHJ5IHsKICAgICAgbGV0IHNlc3Npb25Qb3NpdGlvbnMgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKHN0b3JhZ2VLZXkgfHwgU0NST0xMX1JFU1RPUkFUSU9OX1NUT1JBR0VfS0VZKTsKCiAgICAgIGlmIChzZXNzaW9uUG9zaXRpb25zKSB7CiAgICAgICAgc2F2ZWRTY3JvbGxQb3NpdGlvbnMgPSBKU09OLnBhcnNlKHNlc3Npb25Qb3NpdGlvbnMpOwogICAgICB9CiAgICB9IGNhdGNoIChlKSB7Ly8gbm8tb3AsIHVzZSBkZWZhdWx0IGVtcHR5IG9iamVjdAogICAgfQogIH0sIFtzdG9yYWdlS2V5XSk7IC8vIEVuYWJsZSBzY3JvbGwgcmVzdG9yYXRpb24gaW4gdGhlIHJvdXRlcgoKICBSZWFjdC51c2VMYXlvdXRFZmZlY3QoKCkgPT4gewogICAgbGV0IGRpc2FibGVTY3JvbGxSZXN0b3JhdGlvbiA9IHJvdXRlciA9PSBudWxsID8gdm9pZCAwIDogcm91dGVyLmVuYWJsZVNjcm9sbFJlc3RvcmF0aW9uKHNhdmVkU2Nyb2xsUG9zaXRpb25zLCAoKSA9PiB3aW5kb3cuc2Nyb2xsWSwgZ2V0S2V5KTsKICAgIHJldHVybiAoKSA9PiBkaXNhYmxlU2Nyb2xsUmVzdG9yYXRpb24gJiYgZGlzYWJsZVNjcm9sbFJlc3RvcmF0aW9uKCk7CiAgfSwgW3JvdXRlciwgZ2V0S2V5XSk7IC8vIFJlc3RvcmUgc2Nyb2xsaW5nIHdoZW4gc3RhdGUucmVzdG9yZVNjcm9sbFBvc2l0aW9uIGNoYW5nZXMKCiAgUmVhY3QudXNlTGF5b3V0RWZmZWN0KCgpID0+IHsKICAgIC8vIEV4cGxpY2l0IGZhbHNlIG1lYW5zIGRvbid0IGRvIGFueXRoaW5nICh1c2VkIGZvciBzdWJtaXNzaW9ucykKICAgIGlmIChyZXN0b3JlU2Nyb2xsUG9zaXRpb24gPT09IGZhbHNlKSB7CiAgICAgIHJldHVybjsKICAgIH0gLy8gYmVlbiBoZXJlIGJlZm9yZSwgc2Nyb2xsIHRvIGl0CgoKICAgIGlmICh0eXBlb2YgcmVzdG9yZVNjcm9sbFBvc2l0aW9uID09PSAibnVtYmVyIikgewogICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgcmVzdG9yZVNjcm9sbFBvc2l0aW9uKTsKICAgICAgcmV0dXJuOwogICAgfSAvLyB0cnkgdG8gc2Nyb2xsIHRvIHRoZSBoYXNoCgoKICAgIGlmIChsb2NhdGlvbi5oYXNoKSB7CiAgICAgIGxldCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGxvY2F0aW9uLmhhc2guc2xpY2UoMSkpOwoKICAgICAgaWYgKGVsKSB7CiAgICAgICAgZWwuc2Nyb2xsSW50b1ZpZXcoKTsKICAgICAgICByZXR1cm47CiAgICAgIH0KICAgIH0gLy8gT3B0IG91dCBvZiBzY3JvbGwgcmVzZXQgaWYgdGhpcyBsaW5rIHJlcXVlc3RlZCBpdAoKCiAgICBpZiAocHJldmVudFNjcm9sbFJlc2V0ID09PSB0cnVlKSB7CiAgICAgIHJldHVybjsKICAgIH0gLy8gb3RoZXJ3aXNlIGdvIHRvIHRoZSB0b3Agb24gbmV3IGxvY2F0aW9ucwoKCiAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7CiAgfSwgW2xvY2F0aW9uLCByZXN0b3JlU2Nyb2xsUG9zaXRpb24sIHByZXZlbnRTY3JvbGxSZXNldF0pOwp9CgpmdW5jdGlvbiB1c2VCZWZvcmVVbmxvYWQoY2FsbGJhY2spIHsKICBSZWFjdC51c2VFZmZlY3QoKCkgPT4gewogICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoImJlZm9yZXVubG9hZCIsIGNhbGxiYWNrKTsKICAgIHJldHVybiAoKSA9PiB7CiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCJiZWZvcmV1bmxvYWQiLCBjYWxsYmFjayk7CiAgICB9OwogIH0sIFtjYWxsYmFja10pOwp9IC8vI2VuZHJlZ2lvbgovLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLwovLyNyZWdpb24gVXRpbHMKLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8KCgpmdW5jdGlvbiBkaXN0X3dhcm5pbmcoY29uZCwgbWVzc2FnZSkgewogIGlmICghY29uZCkgewogICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGUKICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gInVuZGVmaW5lZCIpIGNvbnNvbGUud2FybihtZXNzYWdlKTsKCiAgICB0cnkgewogICAgICAvLyBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCBSb3V0ZXIhCiAgICAgIC8vCiAgICAgIC8vIFRoaXMgZXJyb3IgaXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28geW91IGNhbiBtb3JlIGVhc2lseQogICAgICAvLyBmaW5kIHRoZSBzb3VyY2UgZm9yIGEgd2FybmluZyB0aGF0IGFwcGVhcnMgaW4gdGhlIGNvbnNvbGUgYnkKICAgICAgLy8gZW5hYmxpbmcgInBhdXNlIG9uIGV4Y2VwdGlvbnMiIGluIHlvdXIgSmF2YVNjcmlwdCBkZWJ1Z2dlci4KICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZW1wdHkKICAgIH0gY2F0Y2ggKGUpIHt9CiAgfQp9IC8vI2VuZHJlZ2lvbgoKCi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcAoKOy8vIENPTkNBVEVOQVRFRCBNT0RVTEU6IC4vc3JjL3JlbGF5L2NvbXBvbmVudHMvTGF5b3V0LnRzeAoKCgoKdmFyIExheW91dCA9IGZ1bmN0aW9uIExheW91dChfcmVmKSB7dmFyIHBhZ2VzID0gX3JlZi5wYWdlczsKICB2YXIgb3V0bGV0ID0gLyojX19QVVJFX18qLwogIHJlYWN0LmNyZWF0ZUVsZW1lbnQocmVhY3QuRnJhZ21lbnQsIG51bGwsIC8qI19fUFVSRV9fKi8KICByZWFjdC5jcmVhdGVFbGVtZW50KCJkaXYiLCB7IGlkOiAibm90aWZpY2F0aW9uc0NvbnRhaW5lciIgfSksIC8qI19fUFVSRV9fKi8KICByZWFjdC5jcmVhdGVFbGVtZW50KCJkaXYiLCB7IGlkOiAicmVsYXlDb250YWluZXIiIH0sIC8qI19fUFVSRV9fKi8KICByZWFjdC5jcmVhdGVFbGVtZW50KE91dGxldCwgbnVsbCkpKTsKCgoKCiAgaWYgKHBhZ2VzLmxlbmd0aCA8PSAxKSB7CiAgICByZXR1cm4gb3V0bGV0OwogIH0KCiAgcmV0dXJuIC8qI19fUFVSRV9fKi8oCiAgICByZWFjdC5jcmVhdGVFbGVtZW50KHJlYWN0LkZyYWdtZW50LCBudWxsLAogICAgIiAiLCAvKiNfX1BVUkVfXyovCiAgICByZWFjdC5jcmVhdGVFbGVtZW50KCJuYXYiLCBudWxsLCAvKiNfX1BVUkVfXyovCiAgICByZWFjdC5jcmVhdGVFbGVtZW50KCJkaXYiLCB7IGNsYXNzTmFtZTogInRvcEJhciIgfSwKICAgICIgIiwKICAgIHBhZ2VzLm1hcChmdW5jdGlvbiAocCwgaW5kZXgpIHtyZXR1cm4gLyojX19QVVJFX18qLygKICAgICAgICByZWFjdC5jcmVhdGVFbGVtZW50KCJkaXYiLCB7IGtleTogaW5kZXgsIGNsYXNzTmFtZTogInRhYkVudHJ5IiB9LCAvKiNfX1BVUkVfXyovCiAgICAgICAgcmVhY3QuY3JlYXRlRWxlbWVudChOYXZMaW5rLCB7IHRvOiAiLyIgKyBwLmZpbGUgfSwgcC5wYWdlKSwgIiAiKSk7fSkpKSwKCgoKICAgICIgIiwKICAgIG91dGxldCkpOwoKCn07CgovKiBoYXJtb255IGRlZmF1bHQgZXhwb3J0ICovIGNvbnN0IGNvbXBvbmVudHNfTGF5b3V0ID0gKExheW91dCk7CjsvLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy9yZWxheS9hcGkvQXBpUmVxdWVzdC50c3gKZnVuY3Rpb24gX3R5cGVvZihvYmopIHsiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2YiO3JldHVybiBfdHlwZW9mID0gImZ1bmN0aW9uIiA9PSB0eXBlb2YgU3ltYm9sICYmICJzeW1ib2wiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAob2JqKSB7cmV0dXJuIHR5cGVvZiBvYmo7fSA6IGZ1bmN0aW9uIChvYmopIHtyZXR1cm4gb2JqICYmICJmdW5jdGlvbiIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyAic3ltYm9sIiA6IHR5cGVvZiBvYmo7fSwgX3R5cGVvZihvYmopO31mdW5jdGlvbiBfcmVnZW5lcmF0b3JSdW50aW1lKCkgeyJ1c2Ugc3RyaWN0IjsKLyohIHJlZ2VuZXJhdG9yLXJ1bnRpbWUgLS0gQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuIC0tIGxpY2Vuc2UgKE1JVCk6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9ibG9iL21haW4vTElDRU5TRSAqL19yZWdlbmVyYXRvclJ1bnRpbWUgPSBmdW5jdGlvbiBfcmVnZW5lcmF0b3JSdW50aW1lKCkge3JldHVybiBleHBvcnRzO307dmFyIGV4cG9ydHMgPSB7fSxPcCA9IE9iamVjdC5wcm90b3R5cGUsaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHksZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkgfHwgZnVuY3Rpb24gKG9iaiwga2V5LCBkZXNjKSB7b2JqW2tleV0gPSBkZXNjLnZhbHVlO30sJFN5bWJvbCA9ICJmdW5jdGlvbiIgPT0gdHlwZW9mIFN5bWJvbCA/IFN5bWJvbCA6IHt9LGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCAiQEBpdGVyYXRvciIsYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCAiQEBhc3luY0l0ZXJhdG9yIix0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgIkBAdG9TdHJpbmdUYWciO2Z1bmN0aW9uIGRlZmluZShvYmosIGtleSwgdmFsdWUpIHtyZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogITAsIGNvbmZpZ3VyYWJsZTogITAsIHdyaXRhYmxlOiAhMCB9KSwgb2JqW2tleV07fXRyeSB7ZGVmaW5lKHt9LCAiIik7fSBjYXRjaCAoZXJyKSB7ZGVmaW5lID0gZnVuY3Rpb24gZGVmaW5lKG9iaiwga2V5LCB2YWx1ZSkge3JldHVybiBvYmpba2V5XSA9IHZhbHVlO307fWZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHt2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcixnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSksY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtyZXR1cm4gZGVmaW5lUHJvcGVydHkoZ2VuZXJhdG9yLCAiX2ludm9rZSIsIHsgdmFsdWU6IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkgfSksIGdlbmVyYXRvcjt9ZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7dHJ5IHtyZXR1cm4geyB0eXBlOiAibm9ybWFsIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O30gY2F0Y2ggKGVycikge3JldHVybiB7IHR5cGU6ICJ0aHJvdyIsIGFyZzogZXJyIH07fX1leHBvcnRzLndyYXAgPSB3cmFwO3ZhciBDb250aW51ZVNlbnRpbmVsID0ge307ZnVuY3Rpb24gR2VuZXJhdG9yKCkge31mdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9ZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fXZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O2RlZmluZShJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtyZXR1cm4gdGhpczt9KTt2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YsTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7TmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiYgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkgJiYgKEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUpO3ZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9IEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7WyJuZXh0IiwgInRocm93IiwgInJldHVybiJdLmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZCkge2RlZmluZShwcm90b3R5cGUsIG1ldGhvZCwgZnVuY3Rpb24gKGFyZykge3JldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO30pO30pO31mdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvciwgUHJvbWlzZUltcGwpIHtmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge3ZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO2lmICgidGhyb3ciICE9PSByZWNvcmQudHlwZSkge3ZhciByZXN1bHQgPSByZWNvcmQuYXJnLHZhbHVlID0gcmVzdWx0LnZhbHVlO3JldHVybiB2YWx1ZSAmJiAib2JqZWN0IiA9PSBfdHlwZW9mKHZhbHVlKSAmJiBoYXNPd24uY2FsbCh2YWx1ZSwgIl9fYXdhaXQiKSA/IFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtpbnZva2UoIm5leHQiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTt9LCBmdW5jdGlvbiAoZXJyKSB7aW52b2tlKCJ0aHJvdyIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTt9KSA6IFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24gKHVud3JhcHBlZCkge3Jlc3VsdC52YWx1ZSA9IHVud3JhcHBlZCwgcmVzb2x2ZShyZXN1bHQpO30sIGZ1bmN0aW9uIChlcnJvcikge3JldHVybiBpbnZva2UoInRocm93IiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7fSk7fXJlamVjdChyZWNvcmQuYXJnKTt9dmFyIHByZXZpb3VzUHJvbWlzZTtkZWZpbmVQcm9wZXJ0eSh0aGlzLCAiX2ludm9rZSIsIHsgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKG1ldGhvZCwgYXJnKSB7ZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7cmV0dXJuIG5ldyBQcm9taXNlSW1wbChmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7aW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO30pO31yZXR1cm4gcHJldmlvdXNQcm9taXNlID0gcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7fSB9KTt9ZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7dmFyIHN0YXRlID0gInN1c3BlbmRlZFN0YXJ0IjtyZXR1cm4gZnVuY3Rpb24gKG1ldGhvZCwgYXJnKSB7aWYgKCJleGVjdXRpbmciID09PSBzdGF0ZSkgdGhyb3cgbmV3IEVycm9yKCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nIik7aWYgKCJjb21wbGV0ZWQiID09PSBzdGF0ZSkge2lmICgidGhyb3ciID09PSBtZXRob2QpIHRocm93IGFyZztyZXR1cm4gZG9uZVJlc3VsdCgpO31mb3IgKGNvbnRleHQubWV0aG9kID0gbWV0aG9kLCBjb250ZXh0LmFyZyA9IGFyZzs7KSB7dmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtpZiAoZGVsZWdhdGUpIHt2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtpZiAoZGVsZWdhdGVSZXN1bHQpIHtpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO3JldHVybiBkZWxlZ2F0ZVJlc3VsdDt9fWlmICgibmV4dCIgPT09IGNvbnRleHQubWV0aG9kKSBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7ZWxzZSBpZiAoInRocm93IiA9PT0gY29udGV4dC5tZXRob2QpIHtpZiAoInN1c3BlbmRlZFN0YXJ0IiA9PT0gc3RhdGUpIHRocm93IHN0YXRlID0gImNvbXBsZXRlZCIsIGNvbnRleHQuYXJnO2NvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpO30gZWxzZSAicmV0dXJuIiA9PT0gY29udGV4dC5tZXRob2QgJiYgY29udGV4dC5hYnJ1cHQoInJldHVybiIsIGNvbnRleHQuYXJnKTtzdGF0ZSA9ICJleGVjdXRpbmciO3ZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtpZiAoIm5vcm1hbCIgPT09IHJlY29yZC50eXBlKSB7aWYgKHN0YXRlID0gY29udGV4dC5kb25lID8gImNvbXBsZXRlZCIgOiAic3VzcGVuZGVkWWllbGQiLCByZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtyZXR1cm4geyB2YWx1ZTogcmVjb3JkLmFyZywgZG9uZTogY29udGV4dC5kb25lIH07fSJ0aHJvdyIgPT09IHJlY29yZC50eXBlICYmIChzdGF0ZSA9ICJjb21wbGV0ZWQiLCBjb250ZXh0Lm1ldGhvZCA9ICJ0aHJvdyIsIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZyk7fX07fWZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHt2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO2lmICh1bmRlZmluZWQgPT09IG1ldGhvZCkge2lmIChjb250ZXh0LmRlbGVnYXRlID0gbnVsbCwgInRocm93IiA9PT0gY29udGV4dC5tZXRob2QpIHtpZiAoZGVsZWdhdGUuaXRlcmF0b3JbInJldHVybiJdICYmIChjb250ZXh0Lm1ldGhvZCA9ICJyZXR1cm4iLCBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZCwgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCksICJ0aHJvdyIgPT09IGNvbnRleHQubWV0aG9kKSkgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7Y29udGV4dC5tZXRob2QgPSAidGhyb3ciLCBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ3Rocm93JyBtZXRob2QiKTt9cmV0dXJuIENvbnRpbnVlU2VudGluZWw7fXZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7aWYgKCJ0aHJvdyIgPT09IHJlY29yZC50eXBlKSByZXR1cm4gY29udGV4dC5tZXRob2QgPSAidGhyb3ciLCBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmcsIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsLCBDb250aW51ZVNlbnRpbmVsO3ZhciBpbmZvID0gcmVjb3JkLmFyZztyZXR1cm4gaW5mbyA/IGluZm8uZG9uZSA/IChjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZSwgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYywgInJldHVybiIgIT09IGNvbnRleHQubWV0aG9kICYmIChjb250ZXh0Lm1ldGhvZCA9ICJuZXh0IiwgY29udGV4dC5hcmcgPSB1bmRlZmluZWQpLCBjb250ZXh0LmRlbGVnYXRlID0gbnVsbCwgQ29udGludWVTZW50aW5lbCkgOiBpbmZvIDogKGNvbnRleHQubWV0aG9kID0gInRocm93IiwgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdCIpLCBjb250ZXh0LmRlbGVnYXRlID0gbnVsbCwgQ29udGludWVTZW50aW5lbCk7fWZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7dmFyIGVudHJ5ID0geyB0cnlMb2M6IGxvY3NbMF0gfTsxIGluIGxvY3MgJiYgKGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXSksIDIgaW4gbG9jcyAmJiAoZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl0sIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXSksIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTt9ZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge3ZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O3JlY29yZC50eXBlID0gIm5vcm1hbCIsIGRlbGV0ZSByZWNvcmQuYXJnLCBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO31mdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7dGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiAicm9vdCIgfV0sIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKSwgdGhpcy5yZXNldCghMCk7fWZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge2lmIChpdGVyYWJsZSkge3ZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtpZiAoaXRlcmF0b3JNZXRob2QpIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtpZiAoImZ1bmN0aW9uIiA9PSB0eXBlb2YgaXRlcmFibGUubmV4dCkgcmV0dXJuIGl0ZXJhYmxlO2lmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge3ZhciBpID0gLTEsbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7Zm9yICg7ICsraSA8IGl0ZXJhYmxlLmxlbmd0aDspIHtpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSByZXR1cm4gbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldLCBuZXh0LmRvbmUgPSAhMSwgbmV4dDt9cmV0dXJuIG5leHQudmFsdWUgPSB1bmRlZmluZWQsIG5leHQuZG9uZSA9ICEwLCBuZXh0O307cmV0dXJuIG5leHQubmV4dCA9IG5leHQ7fX1yZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07fWZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7cmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogITAgfTt9cmV0dXJuIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCBkZWZpbmVQcm9wZXJ0eShHcCwgImNvbnN0cnVjdG9yIiwgeyB2YWx1ZTogR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIGNvbmZpZ3VyYWJsZTogITAgfSksIGRlZmluZVByb3BlcnR5KEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCAiY29uc3RydWN0b3IiLCB7IHZhbHVlOiBHZW5lcmF0b3JGdW5jdGlvbiwgY29uZmlndXJhYmxlOiAhMCB9KSwgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBkZWZpbmUoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIHRvU3RyaW5nVGFnU3ltYm9sLCAiR2VuZXJhdG9yRnVuY3Rpb24iKSwgZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24gKGdlbkZ1bikge3ZhciBjdG9yID0gImZ1bmN0aW9uIiA9PSB0eXBlb2YgZ2VuRnVuICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtyZXR1cm4gISFjdG9yICYmIChjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fCAiR2VuZXJhdG9yRnVuY3Rpb24iID09PSAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpKTt9LCBleHBvcnRzLm1hcmsgPSBmdW5jdGlvbiAoZ2VuRnVuKSB7cmV0dXJuIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKSA6IChnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIGRlZmluZShnZW5GdW4sIHRvU3RyaW5nVGFnU3ltYm9sLCAiR2VuZXJhdG9yRnVuY3Rpb24iKSksIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKSwgZ2VuRnVuO30sIGV4cG9ydHMuYXdyYXAgPSBmdW5jdGlvbiAoYXJnKSB7cmV0dXJuIHsgX19hd2FpdDogYXJnIH07fSwgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKSwgZGVmaW5lKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlLCBhc3luY0l0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXM7fSksIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3IsIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbiAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QsIFByb21pc2VJbXBsKSB7dm9pZCAwID09PSBQcm9taXNlSW1wbCAmJiAoUHJvbWlzZUltcGwgPSBQcm9taXNlKTt2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpLCBQcm9taXNlSW1wbCk7cmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKSA/IGl0ZXIgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtyZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTt9KTt9LCBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApLCBkZWZpbmUoR3AsIHRvU3RyaW5nVGFnU3ltYm9sLCAiR2VuZXJhdG9yIiksIGRlZmluZShHcCwgaXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtyZXR1cm4gdGhpczt9KSwgZGVmaW5lKEdwLCAidG9TdHJpbmciLCBmdW5jdGlvbiAoKSB7cmV0dXJuICJbb2JqZWN0IEdlbmVyYXRvcl0iO30pLCBleHBvcnRzLmtleXMgPSBmdW5jdGlvbiAodmFsKSB7dmFyIG9iamVjdCA9IE9iamVjdCh2YWwpLGtleXMgPSBbXTtmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7a2V5cy5wdXNoKGtleSk7fXJldHVybiBrZXlzLnJldmVyc2UoKSwgZnVuY3Rpb24gbmV4dCgpIHtmb3IgKDsga2V5cy5sZW5ndGg7KSB7dmFyIGtleSA9IGtleXMucG9wKCk7aWYgKGtleSBpbiBvYmplY3QpIHJldHVybiBuZXh0LnZhbHVlID0ga2V5LCBuZXh0LmRvbmUgPSAhMSwgbmV4dDt9cmV0dXJuIG5leHQuZG9uZSA9ICEwLCBuZXh0O307fSwgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXMsIENvbnRleHQucHJvdG90eXBlID0geyBjb25zdHJ1Y3RvcjogQ29udGV4dCwgcmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KHNraXBUZW1wUmVzZXQpIHtpZiAodGhpcy5wcmV2ID0gMCwgdGhpcy5uZXh0ID0gMCwgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZCwgdGhpcy5kb25lID0gITEsIHRoaXMuZGVsZWdhdGUgPSBudWxsLCB0aGlzLm1ldGhvZCA9ICJuZXh0IiwgdGhpcy5hcmcgPSB1bmRlZmluZWQsIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpLCAhc2tpcFRlbXBSZXNldCkgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7InQiID09PSBuYW1lLmNoYXJBdCgwKSAmJiBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJiAhaXNOYU4oK25hbWUuc2xpY2UoMSkpICYmICh0aGlzW25hbWVdID0gdW5kZWZpbmVkKTt9fSwgc3RvcDogZnVuY3Rpb24gc3RvcCgpIHt0aGlzLmRvbmUgPSAhMDt2YXIgcm9vdFJlY29yZCA9IHRoaXMudHJ5RW50cmllc1swXS5jb21wbGV0aW9uO2lmICgidGhyb3ciID09PSByb290UmVjb3JkLnR5cGUpIHRocm93IHJvb3RSZWNvcmQuYXJnO3JldHVybiB0aGlzLnJ2YWw7fSwgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uIGRpc3BhdGNoRXhjZXB0aW9uKGV4Y2VwdGlvbikge2lmICh0aGlzLmRvbmUpIHRocm93IGV4Y2VwdGlvbjt2YXIgY29udGV4dCA9IHRoaXM7ZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7cmV0dXJuIHJlY29yZC50eXBlID0gInRocm93IiwgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbiwgY29udGV4dC5uZXh0ID0gbG9jLCBjYXVnaHQgJiYgKGNvbnRleHQubWV0aG9kID0gIm5leHQiLCBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZCksICEhY2F1Z2h0O31mb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7dmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldLHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247aWYgKCJyb290IiA9PT0gZW50cnkudHJ5TG9jKSByZXR1cm4gaGFuZGxlKCJlbmQiKTtpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge3ZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCAiY2F0Y2hMb2MiKSxoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksICJmaW5hbGx5TG9jIik7aWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsICEwKTtpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTt9IGVsc2UgaWYgKGhhc0NhdGNoKSB7aWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCAhMCk7fSBlbHNlIHtpZiAoIWhhc0ZpbmFsbHkpIHRocm93IG5ldyBFcnJvcigidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHkiKTtpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTt9fX19LCBhYnJ1cHQ6IGZ1bmN0aW9uIGFicnVwdCh0eXBlLCBhcmcpIHtmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7dmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO2lmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmIGhhc093bi5jYWxsKGVudHJ5LCAiZmluYWxseUxvYyIpICYmIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHt2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7YnJlYWs7fX1maW5hbGx5RW50cnkgJiYgKCJicmVhayIgPT09IHR5cGUgfHwgImNvbnRpbnVlIiA9PT0gdHlwZSkgJiYgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiYgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jICYmIChmaW5hbGx5RW50cnkgPSBudWxsKTt2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtyZXR1cm4gcmVjb3JkLnR5cGUgPSB0eXBlLCByZWNvcmQuYXJnID0gYXJnLCBmaW5hbGx5RW50cnkgPyAodGhpcy5tZXRob2QgPSAibmV4dCIsIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jLCBDb250aW51ZVNlbnRpbmVsKSA6IHRoaXMuY29tcGxldGUocmVjb3JkKTt9LCBjb21wbGV0ZTogZnVuY3Rpb24gY29tcGxldGUocmVjb3JkLCBhZnRlckxvYykge2lmICgidGhyb3ciID09PSByZWNvcmQudHlwZSkgdGhyb3cgcmVjb3JkLmFyZztyZXR1cm4gImJyZWFrIiA9PT0gcmVjb3JkLnR5cGUgfHwgImNvbnRpbnVlIiA9PT0gcmVjb3JkLnR5cGUgPyB0aGlzLm5leHQgPSByZWNvcmQuYXJnIDogInJldHVybiIgPT09IHJlY29yZC50eXBlID8gKHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZywgdGhpcy5tZXRob2QgPSAicmV0dXJuIiwgdGhpcy5uZXh0ID0gImVuZCIpIDogIm5vcm1hbCIgPT09IHJlY29yZC50eXBlICYmIGFmdGVyTG9jICYmICh0aGlzLm5leHQgPSBhZnRlckxvYyksIENvbnRpbnVlU2VudGluZWw7fSwgZmluaXNoOiBmdW5jdGlvbiBmaW5pc2goZmluYWxseUxvYykge2ZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHt2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07aWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHJldHVybiB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKSwgcmVzZXRUcnlFbnRyeShlbnRyeSksIENvbnRpbnVlU2VudGluZWw7fX0sICJjYXRjaCI6IGZ1bmN0aW9uIF9jYXRjaCh0cnlMb2MpIHtmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7dmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO2lmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge3ZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO2lmICgidGhyb3ciID09PSByZWNvcmQudHlwZSkge3ZhciB0aHJvd24gPSByZWNvcmQuYXJnO3Jlc2V0VHJ5RW50cnkoZW50cnkpO31yZXR1cm4gdGhyb3duO319dGhyb3cgbmV3IEVycm9yKCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHQiKTt9LCBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbiBkZWxlZ2F0ZVlpZWxkKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7cmV0dXJuIHRoaXMuZGVsZWdhdGUgPSB7IGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLCByZXN1bHROYW1lOiByZXN1bHROYW1lLCBuZXh0TG9jOiBuZXh0TG9jIH0sICJuZXh0IiA9PT0gdGhpcy5tZXRob2QgJiYgKHRoaXMuYXJnID0gdW5kZWZpbmVkKSwgQ29udGludWVTZW50aW5lbDt9IH0sIGV4cG9ydHM7fWZ1bmN0aW9uIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywga2V5LCBhcmcpIHt0cnkge3ZhciBpbmZvID0gZ2VuW2tleV0oYXJnKTt2YXIgdmFsdWUgPSBpbmZvLnZhbHVlO30gY2F0Y2ggKGVycm9yKSB7cmVqZWN0KGVycm9yKTtyZXR1cm47fWlmIChpbmZvLmRvbmUpIHtyZXNvbHZlKHZhbHVlKTt9IGVsc2Uge1Byb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihfbmV4dCwgX3Rocm93KTt9fWZ1bmN0aW9uIF9hc3luY1RvR2VuZXJhdG9yKGZuKSB7cmV0dXJuIGZ1bmN0aW9uICgpIHt2YXIgc2VsZiA9IHRoaXMsYXJncyA9IGFyZ3VtZW50cztyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge3ZhciBnZW4gPSBmbi5hcHBseShzZWxmLCBhcmdzKTtmdW5jdGlvbiBfbmV4dCh2YWx1ZSkge2FzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgIm5leHQiLCB2YWx1ZSk7fWZ1bmN0aW9uIF90aHJvdyhlcnIpIHthc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csICJ0aHJvdyIsIGVycik7fV9uZXh0KHVuZGVmaW5lZCk7fSk7fTt9CmZ1bmN0aW9uIGFkZE5vdGlmaWNhdGlvbihub3RpZmljYXRpb24pIHsKICB2YXIgZWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgiZGl2Iik7CiAgZWxlLmNsYXNzTmFtZSA9ICJub3RpZmljYXRpb24iOwogIGVsZS5hZGRFdmVudExpc3RlbmVyKCJhbmltYXRpb25lbmQiLCBmdW5jdGlvbiAoKSB7cmV0dXJuIGVsZS5yZW1vdmUoKTt9KTsKICBlbGUuaW5uZXJUZXh0ID0gbm90aWZpY2F0aW9uOwoKICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIm5vdGlmaWNhdGlvbnNDb250YWluZXIiKTsKCiAgaWYgKCFjb250YWluZXIpIHsKICAgIHJldHVybjsKICB9CgogIGNvbnRhaW5lci5hcHBlbmRDaGlsZChlbGUpOwp9CgpmdW5jdGlvbiBzYXZlU2V0dGluZ3MoCnByb3BlcnRpZXMpCnsKICByZXR1cm4gc2V0UHJvcGVydGllcygKICBwcm9wZXJ0aWVzLgogIGZpbHRlcihmdW5jdGlvbiAocCkgewogICAgaWYgKHAucHJldmlvdXNWYWx1ZSA9PT0gcC52YWx1ZSkgewogICAgICByZXR1cm4gZmFsc2U7CiAgICB9CgogICAgcC5wcmV2aW91c1ZhbHVlID0gcC52YWx1ZTsKICAgIHJldHVybiB0cnVlOwogIH0pLgogIG1hcChmdW5jdGlvbiAocHJvcCkge3JldHVybiBbcHJvcC5wcmVmZXJlbmNlLCBwcm9wLnZhbHVlLnRyaW0oKV07fSkpOwoKfQoKZnVuY3Rpb24gc2V0UHJvcGVydGllcygKcHJvcGVydGllcykKewogIHJldHVybiBydW5SZWxheSgic2V0UHJvcGVydGllcyIsIEpTT04uc3RyaW5naWZ5KHByb3BlcnRpZXMpKS50aGVuKGZ1bmN0aW9uICh2YWwpIHtyZXR1cm4gKAogICAgICBKU09OLnBhcnNlKHZhbCkpO30pOwoKfWZ1bmN0aW9uCgpydW5SZWxheShfeCwgX3gyKSB7cmV0dXJuIF9ydW5SZWxheS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO31mdW5jdGlvbiBfcnVuUmVsYXkoKSB7X3J1blJlbGF5ID0gX2FzeW5jVG9HZW5lcmF0b3IoIC8qI19fUFVSRV9fKi9fcmVnZW5lcmF0b3JSdW50aW1lKCkubWFyayhmdW5jdGlvbiBfY2FsbGVlKGZvcm1OYW1lLCBwYXJhbSkge3JldHVybiBfcmVnZW5lcmF0b3JSdW50aW1lKCkud3JhcChmdW5jdGlvbiBfY2FsbGVlJChfY29udGV4dCkge3doaWxlICgxKSB7c3dpdGNoIChfY29udGV4dC5wcmV2ID0gX2NvbnRleHQubmV4dCkge2Nhc2UgMDpyZXR1cm4gX2NvbnRleHQuYWJydXB0KCJyZXR1cm4iLAogICAgICAgICAgICBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkgewogICAgICAgICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsKICAgICAgICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gInRleHQiOwogICAgICAgICAgICAgIHhoci5vcGVuKCJQT1NUIiwgZG9jdW1lbnQubG9jYXRpb24uaHJlZiwgdHJ1ZSk7CiAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoIkNvbnRlbnQtVHlwZSIsICJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQiKTsKICAgICAgICAgICAgICB4aHIuc2VuZChmb3JtTmFtZSArICI9IiArIGVuY29kZVVSSUNvbXBvbmVudChwYXJhbSkpOwogICAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7CiAgICAgICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgIT0gNCB8fCB4aHIuc3RhdHVzICE9IDIwMCkgewogICAgICAgICAgICAgICAgICByZXR1cm47CiAgICAgICAgICAgICAgICB9CgogICAgICAgICAgICAgICAgcmVzb2x2ZSh4aHIucmVzcG9uc2VUZXh0KTsKICAgICAgICAgICAgICB9OwogICAgICAgICAgICB9KSk7Y2FzZSAxOmNhc2UgImVuZCI6cmV0dXJuIF9jb250ZXh0LnN0b3AoKTt9fX0sIF9jYWxsZWUpO30pKTtyZXR1cm4gX3J1blJlbGF5LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7fQo7Ly8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvcmVsYXkvYXBpL1NldHRpbmdWYWxpZGF0b3IudHN4CmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkge3JldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7fWZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7dGhyb3cgbmV3IFR5cGVFcnJvcigiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC4iKTt9ZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkge3ZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09ICJ1bmRlZmluZWQiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFyclsiQEBpdGVyYXRvciJdO2lmIChfaSA9PSBudWxsKSByZXR1cm47dmFyIF9hcnIgPSBbXTt2YXIgX24gPSB0cnVlO3ZhciBfZCA9IGZhbHNlO3ZhciBfcywgX2U7dHJ5IHtmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7X2Fyci5wdXNoKF9zLnZhbHVlKTtpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7fX0gY2F0Y2ggKGVycikge19kID0gdHJ1ZTtfZSA9IGVycjt9IGZpbmFsbHkge3RyeSB7aWYgKCFfbiAmJiBfaVsicmV0dXJuIl0gIT0gbnVsbCkgX2lbInJldHVybiJdKCk7fSBmaW5hbGx5IHtpZiAoX2QpIHRocm93IF9lO319cmV0dXJuIF9hcnI7fWZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHtpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyO31mdW5jdGlvbiBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlcihvLCBhbGxvd0FycmF5TGlrZSkge3ZhciBpdCA9IHR5cGVvZiBTeW1ib2wgIT09ICJ1bmRlZmluZWQiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSB8fCBvWyJAQGl0ZXJhdG9yIl07aWYgKCFpdCkge2lmIChBcnJheS5pc0FycmF5KG8pIHx8IChpdCA9IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvKSkgfHwgYWxsb3dBcnJheUxpa2UgJiYgbyAmJiB0eXBlb2Ygby5sZW5ndGggPT09ICJudW1iZXIiKSB7aWYgKGl0KSBvID0gaXQ7dmFyIGkgPSAwO3ZhciBGID0gZnVuY3Rpb24gRigpIHt9O3JldHVybiB7IHM6IEYsIG46IGZ1bmN0aW9uIG4oKSB7aWYgKGkgPj0gby5sZW5ndGgpIHJldHVybiB7IGRvbmU6IHRydWUgfTtyZXR1cm4geyBkb25lOiBmYWxzZSwgdmFsdWU6IG9baSsrXSB9O30sIGU6IGZ1bmN0aW9uIGUoX2UyKSB7dGhyb3cgX2UyO30sIGY6IEYgfTt9dGhyb3cgbmV3IFR5cGVFcnJvcigiSW52YWxpZCBhdHRlbXB0IHRvIGl0ZXJhdGUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLiIpO312YXIgbm9ybWFsQ29tcGxldGlvbiA9IHRydWUsZGlkRXJyID0gZmFsc2UsZXJyO3JldHVybiB7IHM6IGZ1bmN0aW9uIHMoKSB7aXQgPSBpdC5jYWxsKG8pO30sIG46IGZ1bmN0aW9uIG4oKSB7dmFyIHN0ZXAgPSBpdC5uZXh0KCk7bm9ybWFsQ29tcGxldGlvbiA9IHN0ZXAuZG9uZTtyZXR1cm4gc3RlcDt9LCBlOiBmdW5jdGlvbiBlKF9lMykge2RpZEVyciA9IHRydWU7ZXJyID0gX2UzO30sIGY6IGZ1bmN0aW9uIGYoKSB7dHJ5IHtpZiAoIW5vcm1hbENvbXBsZXRpb24gJiYgaXRbInJldHVybiJdICE9IG51bGwpIGl0WyJyZXR1cm4iXSgpO30gZmluYWxseSB7aWYgKGRpZEVycikgdGhyb3cgZXJyO319IH07fWZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHtpZiAoIW8pIHJldHVybjtpZiAodHlwZW9mIG8gPT09ICJzdHJpbmciKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTt2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7aWYgKG4gPT09ICJPYmplY3QiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7aWYgKG4gPT09ICJNYXAiIHx8IG4gPT09ICJTZXQiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtpZiAobiA9PT0gIkFyZ3VtZW50cyIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO31mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikge2lmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoO2ZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykge2FycjJbaV0gPSBhcnJbaV07fXJldHVybiBhcnIyO31mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7aWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHt0aHJvdyBuZXcgVHlwZUVycm9yKCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24iKTt9fWZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7dmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7ZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO2lmICgidmFsdWUiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTt9fWZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7T2JqZWN0LmRlZmluZVByb3BlcnR5KENvbnN0cnVjdG9yLCAicHJvdG90eXBlIiwgeyB3cml0YWJsZTogZmFsc2UgfSk7cmV0dXJuIENvbnN0cnVjdG9yO31mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7aWYgKGtleSBpbiBvYmopIHtPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pO30gZWxzZSB7b2JqW2tleV0gPSB2YWx1ZTt9cmV0dXJuIG9iajt9dmFyCgoKU2V0dGluZ1ZhbGlkYXRvciA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7ZnVuY3Rpb24gU2V0dGluZ1ZhbGlkYXRvcigpIHtfY2xhc3NDYWxsQ2hlY2sodGhpcywgU2V0dGluZ1ZhbGlkYXRvcik7X2RlZmluZVByb3BlcnR5KHRoaXMsICJzZXR0aW5ncyIsCiAgICBbXSk7X2RlZmluZVByb3BlcnR5KHRoaXMsICJvYmplY3QiLAogICAge30pO31fY3JlYXRlQ2xhc3MoU2V0dGluZ1ZhbGlkYXRvciwgW3sga2V5OiAiYWRkU2V0dGluZyIsIHZhbHVlOgoKICAgIGZ1bmN0aW9uIGFkZFNldHRpbmcoc2V0dGluZywgc2V0U3RhdGUpIHsKICAgICAgdGhpcy5zZXR0aW5ncy5wdXNoKFtzZXR0aW5nLCBzZXRTdGF0ZV0pOwogICAgfSB9LCB7IGtleTogInVwZGF0ZVNldHRpbmciLCB2YWx1ZToKCiAgICBmdW5jdGlvbiB1cGRhdGVTZXR0aW5nKHNldHRpbmcpIHsKICAgICAgdGhpcy5vYmplY3Rbc2V0dGluZy5wcmVmZXJlbmNlXSA9IHNldHRpbmcudmFsdWU7CiAgICAgIHRoaXMuZG9WYWxpZGF0ZXMoKTsKICAgIH0gfSwgeyBrZXk6ICJ1cGRhdGVPYmplY3QiLCB2YWx1ZToKCiAgICBmdW5jdGlvbiB1cGRhdGVPYmplY3QoKSB7dmFyIF9pdGVyYXRvciA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyKAogICAgICAgIHRoaXMuc2V0dGluZ3MpLF9zdGVwO3RyeSB7Zm9yIChfaXRlcmF0b3IucygpOyAhKF9zdGVwID0gX2l0ZXJhdG9yLm4oKSkuZG9uZTspIHt2YXIgX3N0ZXAkdmFsdWUgPSBfc2xpY2VkVG9BcnJheShfc3RlcC52YWx1ZSwgMSksc2V0dGluZyA9IF9zdGVwJHZhbHVlWzBdOwogICAgICAgICAgdGhpcy5vYmplY3Rbc2V0dGluZy5wcmVmZXJlbmNlXSA9IHNldHRpbmcudmFsdWU7CiAgICAgICAgfX0gY2F0Y2ggKGVycikge19pdGVyYXRvci5lKGVycik7fSBmaW5hbGx5IHtfaXRlcmF0b3IuZigpO30KICAgIH0gfSwgeyBrZXk6ICJkb1ZhbGlkYXRlcyIsIHZhbHVlOgoKICAgIGZ1bmN0aW9uIGRvVmFsaWRhdGVzKCkge3ZhciBfaXRlcmF0b3IyID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIoCiAgICAgICAgdGhpcy5zZXR0aW5ncyksX3N0ZXAyO3RyeSB7Zm9yIChfaXRlcmF0b3IyLnMoKTsgIShfc3RlcDIgPSBfaXRlcmF0b3IyLm4oKSkuZG9uZTspIHt2YXIgX3N0ZXAyJHZhbHVlID0gX3NsaWNlZFRvQXJyYXkoX3N0ZXAyLnZhbHVlLCAyKSxzZXR0aW5nID0gX3N0ZXAyJHZhbHVlWzBdLHNldFZhbGlkID0gX3N0ZXAyJHZhbHVlWzFdOwogICAgICAgICAgc2V0VmFsaWQodGhpcy5pc1ZhbGlkKHNldHRpbmcpKTsKICAgICAgICB9fSBjYXRjaCAoZXJyKSB7X2l0ZXJhdG9yMi5lKGVycik7fSBmaW5hbGx5IHtfaXRlcmF0b3IyLmYoKTt9CiAgICB9IH0sIHsga2V5OiAiaXNWYWxpZCIsIHZhbHVlOgoKICAgIGZ1bmN0aW9uIGlzVmFsaWQoc2V0dGluZykgewogICAgICByZXR1cm4gKAogICAgICAgIHNldHRpbmcudmFsaWRhdGUgPT0gbnVsbCB8fCBzZXR0aW5nLnZhbGlkYXRlKHNldHRpbmcudmFsdWUsIHRoaXMub2JqZWN0KSk7CgogICAgfSB9XSk7cmV0dXJuIFNldHRpbmdWYWxpZGF0b3I7fSgpOwoKCi8qIGhhcm1vbnkgZGVmYXVsdCBleHBvcnQgKi8gY29uc3QgYXBpX1NldHRpbmdWYWxpZGF0b3IgPSAoU2V0dGluZ1ZhbGlkYXRvcik7CjsvLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy9yZWxheS9jb21wb25lbnRzL0ludGVycnVwdC50c3gKZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge3JldHVybiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5KGFycikgfHwgSW50ZXJydXB0X3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFycikgfHwgX25vbkl0ZXJhYmxlU3ByZWFkKCk7fWZ1bmN0aW9uIF9ub25JdGVyYWJsZVNwcmVhZCgpIHt0aHJvdyBuZXcgVHlwZUVycm9yKCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC4iKTt9ZnVuY3Rpb24gSW50ZXJydXB0X3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge2lmICghbykgcmV0dXJuO2lmICh0eXBlb2YgbyA9PT0gInN0cmluZyIpIHJldHVybiBJbnRlcnJ1cHRfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO3ZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtpZiAobiA9PT0gIk9iamVjdCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTtpZiAobiA9PT0gIk1hcCIgfHwgbiA9PT0gIlNldCIpIHJldHVybiBBcnJheS5mcm9tKG8pO2lmIChuID09PSAiQXJndW1lbnRzIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIEludGVycnVwdF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7fWZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkoaXRlcikge2lmICh0eXBlb2YgU3ltYm9sICE9PSAidW5kZWZpbmVkIiAmJiBpdGVyW1N5bWJvbC5pdGVyYXRvcl0gIT0gbnVsbCB8fCBpdGVyWyJAQGl0ZXJhdG9yIl0gIT0gbnVsbCkgcmV0dXJuIEFycmF5LmZyb20oaXRlcik7fWZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHtpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gSW50ZXJydXB0X2FycmF5TGlrZVRvQXJyYXkoYXJyKTt9ZnVuY3Rpb24gSW50ZXJydXB0X2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHtpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDtmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHthcnIyW2ldID0gYXJyW2ldO31yZXR1cm4gYXJyMjt9ZnVuY3Rpb24gSW50ZXJydXB0X2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge2lmIChrZXkgaW4gb2JqKSB7T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTt9IGVsc2Uge29ialtrZXldID0gdmFsdWU7fXJldHVybiBvYmo7fQoKCgpmdW5jdGlvbiBJbnRlcnJ1cHQoX3JlZikge3ZhciBidXR0b24gPSBfcmVmLmJ1dHRvbjsKICB2YXIgQ1NTc3RyaW5nID0gZnVuY3Rpb24gQ1NTc3RyaW5nKHN0cmluZykgewogICAgdmFyIGNzc19qc29uID0gIntcIiIuY29uY2F0KHN0cmluZy4KICAgIHJlcGxhY2UoLzsgL2csICciLCAiJykuCiAgICByZXBsYWNlKC86IC9nLCAnIjogIicpLgogICAgcmVwbGFjZSgiOyIsICIiKSwgIlwifSIpOwoKICAgIHZhciBvYmogPSBKU09OLnBhcnNlKGNzc19qc29uKTsKCiAgICB2YXIga2V5VmFsdWVzID0gT2JqZWN0LmtleXMob2JqKS5tYXAoZnVuY3Rpb24gKGtleSkgewogICAgICB2YXIgY2FtZWxDYXNlZCA9IGtleS5yZXBsYWNlKC8tW2Etel0vZywgZnVuY3Rpb24gKGcpIHtyZXR1cm4gZ1sxXS50b1VwcGVyQ2FzZSgpO30pOwogICAgICByZXR1cm4gSW50ZXJydXB0X2RlZmluZVByb3BlcnR5KHt9LCBjYW1lbENhc2VkLCBvYmpba2V5XSk7CiAgICB9KTsKCiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbi5hcHBseShPYmplY3QsIFt7fV0uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheShrZXlWYWx1ZXMpKSk7CiAgfTsKCiAgcmV0dXJuIC8qI19fUFVSRV9fKi8oCiAgICByZWFjdC5jcmVhdGVFbGVtZW50KCJpbnB1dCIsIHsKICAgICAgY2xhc3NOYW1lOiAiaW50ZXJydXB0IiwKICAgICAgc3R5bGU6IGJ1dHRvbi5jc3MgPyBDU1NzdHJpbmcoYnV0dG9uLmNzcykgOiBudWxsLAogICAgICB0eXBlOiAic3VibWl0IiwKICAgICAgdmFsdWU6IGJ1dHRvbi5uYW1lLAogICAgICBvbkNsaWNrOiBmdW5jdGlvbiBvbkNsaWNrKCkgewogICAgICAgIHNldFByb3BlcnRpZXMoCiAgICAgICAgYnV0dG9uLmFjdGlvbnMubWFwKGZ1bmN0aW9uIChfcmVmMykge3ZhciBwcmVmZXJlbmNlID0gX3JlZjMucHJlZmVyZW5jZSx2YWx1ZSA9IF9yZWYzLnZhbHVlO3JldHVybiBbcHJlZmVyZW5jZSwgdmFsdWVdO30pKS4KICAgICAgICB0aGVuKGZ1bmN0aW9uICgpIHtyZXR1cm4gYWRkTm90aWZpY2F0aW9uKGJ1dHRvbi5ub3RpZmljYXRpb24gfHwgIkludGVycnVwdGVkISIpO30pOwogICAgICB9IH0pKTsKCgp9CgovKiBoYXJtb255IGRlZmF1bHQgZXhwb3J0ICovIGNvbnN0IGNvbXBvbmVudHNfSW50ZXJydXB0ID0gKEludGVycnVwdCk7CjsvLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy9yZWxheS90eXBlcy9UeXBlcy50c3gKCgp2YXIgUmVsYXlDb21wb25lbnRUeXBlOyhmdW5jdGlvbiAoUmVsYXlDb21wb25lbnRUeXBlKSB7UmVsYXlDb21wb25lbnRUeXBlWyJCT09MRUFOIl0gPSAiYm9vbGVhbiI7UmVsYXlDb21wb25lbnRUeXBlWyJEUk9QRE9XTiJdID0gImRyb3Bkb3duIjtSZWxheUNvbXBvbmVudFR5cGVbIlNUUklORyJdID0gInN0cmluZyI7UmVsYXlDb21wb25lbnRUeXBlWyJIVE1MIl0gPSAiaHRtbCI7UmVsYXlDb21wb25lbnRUeXBlWyJJTlRFUlJVUFQiXSA9ICJpbnRlcnJ1cHQiO30pKFJlbGF5Q29tcG9uZW50VHlwZSB8fCAoUmVsYXlDb21wb25lbnRUeXBlID0ge30pKTsKOy8vIENPTkNBVEVOQVRFRCBNT0RVTEU6IC4vc3JjL3JlbGF5L2NvbXBvbmVudHMvc2V0dGluZ3MvQm9vbGVhbklucHV0LnRzeApmdW5jdGlvbiBCb29sZWFuSW5wdXRfc2xpY2VkVG9BcnJheShhcnIsIGkpIHtyZXR1cm4gQm9vbGVhbklucHV0X2FycmF5V2l0aEhvbGVzKGFycikgfHwgQm9vbGVhbklucHV0X2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgQm9vbGVhbklucHV0X3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgQm9vbGVhbklucHV0X25vbkl0ZXJhYmxlUmVzdCgpO31mdW5jdGlvbiBCb29sZWFuSW5wdXRfbm9uSXRlcmFibGVSZXN0KCkge3Rocm93IG5ldyBUeXBlRXJyb3IoIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuIik7fWZ1bmN0aW9uIEJvb2xlYW5JbnB1dF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHtpZiAoIW8pIHJldHVybjtpZiAodHlwZW9mIG8gPT09ICJzdHJpbmciKSByZXR1cm4gQm9vbGVhbklucHV0X2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTt2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7aWYgKG4gPT09ICJPYmplY3QiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7aWYgKG4gPT09ICJNYXAiIHx8IG4gPT09ICJTZXQiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtpZiAobiA9PT0gIkFyZ3VtZW50cyIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBCb29sZWFuSW5wdXRfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO31mdW5jdGlvbiBCb29sZWFuSW5wdXRfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikge2lmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoO2ZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykge2FycjJbaV0gPSBhcnJbaV07fXJldHVybiBhcnIyO31mdW5jdGlvbiBCb29sZWFuSW5wdXRfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7dmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gInVuZGVmaW5lZCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyWyJAQGl0ZXJhdG9yIl07aWYgKF9pID09IG51bGwpIHJldHVybjt2YXIgX2FyciA9IFtdO3ZhciBfbiA9IHRydWU7dmFyIF9kID0gZmFsc2U7dmFyIF9zLCBfZTt0cnkge2ZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtfYXJyLnB1c2goX3MudmFsdWUpO2lmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazt9fSBjYXRjaCAoZXJyKSB7X2QgPSB0cnVlO19lID0gZXJyO30gZmluYWxseSB7dHJ5IHtpZiAoIV9uICYmIF9pWyJyZXR1cm4iXSAhPSBudWxsKSBfaVsicmV0dXJuIl0oKTt9IGZpbmFsbHkge2lmIChfZCkgdGhyb3cgX2U7fX1yZXR1cm4gX2Fycjt9ZnVuY3Rpb24gQm9vbGVhbklucHV0X2FycmF5V2l0aEhvbGVzKGFycikge2lmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7fQoKCgpmdW5jdGlvbiBCb29sZWFuSW5wdXQoX3JlZikge3ZhciBidXR0b24gPSBfcmVmLmJ1dHRvbjsKICB2YXIgX3VzZVN0YXRlID0gKDAscmVhY3QudXNlU3RhdGUpKGJ1dHRvbi52YWx1ZSA9PT0gInRydWUiKSxfdXNlU3RhdGUyID0gQm9vbGVhbklucHV0X3NsaWNlZFRvQXJyYXkoX3VzZVN0YXRlLCAyKSx2YWx1ZSA9IF91c2VTdGF0ZTJbMF0sc2V0VmFsdWUgPSBfdXNlU3RhdGUyWzFdOwoKICByZXR1cm4gLyojX19QVVJFX18qLygKICAgIHJlYWN0LmNyZWF0ZUVsZW1lbnQoImxhYmVsIiwgeyBjbGFzc05hbWU6ICJjaGVja2NvbnRhaW5lciIgfSwgLyojX19QVVJFX18qLwogICAgcmVhY3QuY3JlYXRlRWxlbWVudCgiaW5wdXQiLCB7IHR5cGU6ICJoaWRkZW4iLCBuYW1lOiBidXR0b24ubmFtZSwgdmFsdWU6IGJ1dHRvbi52YWx1ZSB9KSwgLyojX19QVVJFX18qLwogICAgcmVhY3QuY3JlYXRlRWxlbWVudCgiZGl2IiwgewogICAgICBjbGFzc05hbWU6ICJ0b2dnbGUtdHJhY2siLAogICAgICBvbkNsaWNrOiBmdW5jdGlvbiBvbkNsaWNrKCkgewogICAgICAgIHNldFZhbHVlKCF2YWx1ZSk7CiAgICAgICAgYnV0dG9uLnNldFZhbHVlKCghdmFsdWUpLnRvU3RyaW5nKCkpOwogICAgICB9IH0sIC8qI19fUFVSRV9fKi8KCiAgICByZWFjdC5jcmVhdGVFbGVtZW50KCJzcGFuIiwgeyBjbGFzc05hbWU6ICJ0b2dnbGUtaW5kaWNhdG9yIiB9LCAvKiNfX1BVUkVfXyovCiAgICByZWFjdC5jcmVhdGVFbGVtZW50KCJzcGFuIiwgeyBjbGFzc05hbWU6ICJjaGVja01hcmsiIH0sIC8qI19fUFVSRV9fKi8KICAgIHJlYWN0LmNyZWF0ZUVsZW1lbnQoInN2ZyIsIHsKICAgICAgdmlld0JveDogIjAgMCAyNCAyNCIsCiAgICAgIGlkOiAiZ2hxLXN2Zy1jaGVjayIsCiAgICAgIHJvbGU6ICJwcmVzZW50YXRpb24iLAogICAgICAiYXJpYS1oaWRkZW4iOiAidHJ1ZSIgfSwgLyojX19QVVJFX18qLwoKICAgIHJlYWN0LmNyZWF0ZUVsZW1lbnQoInBhdGgiLCB7IGQ6ICJNOS44NiAxOGExIDEgMCAwMS0uNzMtLjMybC00Ljg2LTUuMTdhMS4wMDEgMS4wMDEgMCAwMTEuNDYtMS4zN2w0LjEyIDQuMzkgOC40MS05LjJhMSAxIDAgMTExLjQ4IDEuMzRsLTkuMTQgMTBhMSAxIDAgMDEtLjczLjMzaC0uMDF6IiB9KSkpKSkpKTsKCgoKCgoKfQoKLyoKPGRpdgogIGNsYXNzPSJjaGVja21hcmsiCiAgb25DbGljaz17KCkgPT4gewogICAgc2V0VmFsdWUoIXZhbHVlKTsKICB9fQovPgogKi8KLyogaGFybW9ueSBkZWZhdWx0IGV4cG9ydCAqLyBjb25zdCBzZXR0aW5nc19Cb29sZWFuSW5wdXQgPSAoQm9vbGVhbklucHV0KTsKOy8vIENPTkNBVEVOQVRFRCBNT0RVTEU6IC4vc3JjL3JlbGF5L2NvbXBvbmVudHMvc2V0dGluZ3MvRHJvcGRvd25JbnB1dC50c3gKCgoKZnVuY3Rpb24gRHJvcGRvd25JbnB1dChfcmVmKSB7dmFyIGJ1dHRvbiA9IF9yZWYuYnV0dG9uOwogIHJldHVybiAvKiNfX1BVUkVfXyovKAogICAgcmVhY3QuY3JlYXRlRWxlbWVudCgic2VsZWN0IiwgewogICAgICBjbGFzc05hbWU6ICJkcm9wZG93bmNvbnRhaW5lciIsCiAgICAgIG5hbWU6IGJ1dHRvbi5uYW1lLAogICAgICBkZWZhdWx0VmFsdWU6IGJ1dHRvbi52YWx1ZSwKICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIG9uQ2hhbmdlKGUpIHtyZXR1cm4gYnV0dG9uLnNldFZhbHVlKGUudGFyZ2V0LnZhbHVlKTt9IH0sCgogICAgYnV0dG9uLmRyb3Bkb3duLm1hcChmdW5jdGlvbiAob3B0aW9uKSB7CiAgICAgIHJldHVybiAvKiNfX1BVUkVfXyovKAogICAgICAgIHJlYWN0LmNyZWF0ZUVsZW1lbnQoIm9wdGlvbiIsIHsga2V5OiBvcHRpb24udmFsdWUsIHZhbHVlOiBvcHRpb24udmFsdWUgfSwKICAgICAgICBvcHRpb24uZGlzcGxheSB8fCBvcHRpb24udmFsdWUpKTsKCgogICAgfSkpKTsKCgp9CgovKiBoYXJtb255IGRlZmF1bHQgZXhwb3J0ICovIGNvbnN0IHNldHRpbmdzX0Ryb3Bkb3duSW5wdXQgPSAoRHJvcGRvd25JbnB1dCk7CjsvLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy9yZWxheS9jb21wb25lbnRzL3NldHRpbmdzL1N0cmluZ0lucHV0LnRzeAoKCgpmdW5jdGlvbiBTdHJpbmdJbnB1dChfcmVmKSB7dmFyIGJ1dHRvbiA9IF9yZWYuYnV0dG9uOwogIHJldHVybiAvKiNfX1BVUkVfXyovKAogICAgcmVhY3QuY3JlYXRlRWxlbWVudCgiaW5wdXQiLCB7CiAgICAgIGNsYXNzTmFtZTogInN0cmluZ2NvbnRhaW5lciIsCiAgICAgIG5hbWU6IGJ1dHRvbi5uYW1lLAogICAgICBkZWZhdWx0VmFsdWU6IGJ1dHRvbi52YWx1ZSwKICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIG9uQ2hhbmdlKGUpIHtyZXR1cm4gYnV0dG9uLnNldFZhbHVlKGUudGFyZ2V0LnZhbHVlKTt9IH0pKTsKCgp9CgovKiBoYXJtb255IGRlZmF1bHQgZXhwb3J0ICovIGNvbnN0IHNldHRpbmdzX1N0cmluZ0lucHV0ID0gKFN0cmluZ0lucHV0KTsKOy8vIENPTkNBVEVOQVRFRCBNT0RVTEU6IC4vc3JjL3JlbGF5L2NvbXBvbmVudHMvc2V0dGluZ3MvU2V0dGluZy50c3gKZnVuY3Rpb24gU2V0dGluZ19zbGljZWRUb0FycmF5KGFyciwgaSkge3JldHVybiBTZXR0aW5nX2FycmF5V2l0aEhvbGVzKGFycikgfHwgU2V0dGluZ19pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IFNldHRpbmdfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBTZXR0aW5nX25vbkl0ZXJhYmxlUmVzdCgpO31mdW5jdGlvbiBTZXR0aW5nX25vbkl0ZXJhYmxlUmVzdCgpIHt0aHJvdyBuZXcgVHlwZUVycm9yKCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLiIpO31mdW5jdGlvbiBTZXR0aW5nX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge2lmICghbykgcmV0dXJuO2lmICh0eXBlb2YgbyA9PT0gInN0cmluZyIpIHJldHVybiBTZXR0aW5nX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTt2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7aWYgKG4gPT09ICJPYmplY3QiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7aWYgKG4gPT09ICJNYXAiIHx8IG4gPT09ICJTZXQiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtpZiAobiA9PT0gIkFyZ3VtZW50cyIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBTZXR0aW5nX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTt9ZnVuY3Rpb24gU2V0dGluZ19hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7aWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7Zm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7YXJyMltpXSA9IGFycltpXTt9cmV0dXJuIGFycjI7fWZ1bmN0aW9uIFNldHRpbmdfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7dmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gInVuZGVmaW5lZCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyWyJAQGl0ZXJhdG9yIl07aWYgKF9pID09IG51bGwpIHJldHVybjt2YXIgX2FyciA9IFtdO3ZhciBfbiA9IHRydWU7dmFyIF9kID0gZmFsc2U7dmFyIF9zLCBfZTt0cnkge2ZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtfYXJyLnB1c2goX3MudmFsdWUpO2lmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazt9fSBjYXRjaCAoZXJyKSB7X2QgPSB0cnVlO19lID0gZXJyO30gZmluYWxseSB7dHJ5IHtpZiAoIV9uICYmIF9pWyJyZXR1cm4iXSAhPSBudWxsKSBfaVsicmV0dXJuIl0oKTt9IGZpbmFsbHkge2lmIChfZCkgdGhyb3cgX2U7fX1yZXR1cm4gX2Fycjt9ZnVuY3Rpb24gU2V0dGluZ19hcnJheVdpdGhIb2xlcyhhcnIpIHtpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyO30KCgoKCgoKZnVuY3Rpb24gU2V0dGluZyhfcmVmKQoKCgoKCnt2YXIgYnV0dG9uID0gX3JlZi5idXR0b24sdmFsaWRhdG9yID0gX3JlZi52YWxpZGF0b3I7CiAgdmFyIF91c2VTdGF0ZSA9ICgwLHJlYWN0LnVzZVN0YXRlKSh2YWxpZGF0b3IuaXNWYWxpZChidXR0b24pKSxfdXNlU3RhdGUyID0gU2V0dGluZ19zbGljZWRUb0FycmF5KF91c2VTdGF0ZSwgMiksdmFsaWQgPSBfdXNlU3RhdGUyWzBdLHNldFZhbGlkID0gX3VzZVN0YXRlMlsxXTsKCiAgYnV0dG9uLnNldFZhbHVlID0gZnVuY3Rpb24gKHZhbCkgewogICAgYnV0dG9uLnZhbHVlID0gdmFsOwogICAgdmFsaWRhdG9yLnVwZGF0ZVNldHRpbmcoYnV0dG9uKTsKICB9OwoKICB2YWxpZGF0b3IuYWRkU2V0dGluZyhidXR0b24sIHNldFZhbGlkKTsKCiAgcmV0dXJuIC8qI19fUFVSRV9fKi8oCiAgICByZWFjdC5jcmVhdGVFbGVtZW50KCJ0ciIsIHsgY2xhc3NOYW1lOiAidXNlclByZWZlcmVuY2UiLCBrZXk6IGJ1dHRvbi5wcmVmZXJlbmNlIH0sIC8qI19fUFVSRV9fKi8KICAgIHJlYWN0LmNyZWF0ZUVsZW1lbnQoInRkIiwgeyBjbGFzc05hbWU6ICJzZXR0aW5nIiB9LAogICAgYnV0dG9uLm5hbWUsIC8qI19fUFVSRV9fKi8KICAgIHJlYWN0LmNyZWF0ZUVsZW1lbnQoImRpdiIsIHsgY2xhc3NOYW1lOiAic2V0dGluZ05hbWVIb3ZlciIgfSwgYnV0dG9uLnByZWZlcmVuY2UpKSwgLyojX19QVVJFX18qLwoKICAgIHJlYWN0LmNyZWF0ZUVsZW1lbnQoInRkIiwgeyBjbGFzc05hbWU6IHZhbGlkID8gInNldHRpbmdJbnB1dCIgOiAic2V0dGluZ0lucHV0IGludmFsaWQtc2V0dGluZyIgfSwKICAgIGJ1dHRvbi50eXBlID09PSBSZWxheUNvbXBvbmVudFR5cGUuQk9PTEVBTiA/IC8qI19fUFVSRV9fKi8KICAgIHJlYWN0LmNyZWF0ZUVsZW1lbnQoc2V0dGluZ3NfQm9vbGVhbklucHV0LCB7IGJ1dHRvbjogYnV0dG9uIH0pIDoKICAgIGJ1dHRvbi50eXBlID09PSBSZWxheUNvbXBvbmVudFR5cGUuRFJPUERPV04gPyAvKiNfX1BVUkVfXyovCiAgICByZWFjdC5jcmVhdGVFbGVtZW50KHNldHRpbmdzX0Ryb3Bkb3duSW5wdXQsIHsgYnV0dG9uOiBidXR0b24gfSkgOiAvKiNfX1BVUkVfXyovCgogICAgcmVhY3QuY3JlYXRlRWxlbWVudChzZXR0aW5nc19TdHJpbmdJbnB1dCwgeyBidXR0b246IGJ1dHRvbiB9KSwKCiAgICBidXR0b24uaW52YWxpZFJlYXNvbiAhPSBudWxsID8gLyojX19QVVJFX18qLwogICAgcmVhY3QuY3JlYXRlRWxlbWVudCgiZGl2IiwgeyBjbGFzc05hbWU6ICJpbnZhbGlkLXJlYXNvbiIsIGhpZGRlbjogdmFsaWQgfSwgLyojX19QVVJFX18qLwogICAgcmVhY3QuY3JlYXRlRWxlbWVudCgic21hbGwiLCBudWxsLCBidXR0b24uaW52YWxpZFJlYXNvbikpIDogLyojX19QVVJFX18qLwoKCiAgICByZWFjdC5jcmVhdGVFbGVtZW50KHJlYWN0LkZyYWdtZW50LCBudWxsKSwgLyojX19QVVJFX18qLwoKCiAgICByZWFjdC5jcmVhdGVFbGVtZW50KCJkaXYiLCB7IGNsYXNzTmFtZTogImhvdmVyQm94IiB9LCAvKiNfX1BVUkVfXyovCiAgICByZWFjdC5jcmVhdGVFbGVtZW50KCJzbWFsbCIsIHsgY2xhc3NOYW1lOiAic2V0dGluZ0RlZmF1bHRIb3ZlciIgfSwKICAgIGJ1dHRvblsiZGVmYXVsdCJdICE9IG51bGwgPwogICAgIkRlZmF1bHQ6ICIgKyAoCiAgICBidXR0b25bImRlZmF1bHQiXSA9PSAiIiA/ICI8RW1wdHk+IiA6IGJ1dHRvblsiZGVmYXVsdCJdKSA6CiAgICAiRGVmYXVsdCBub3Qgc2V0IikpKSwgLyojX19QVVJFX18qLwoKCgogICAgcmVhY3QuY3JlYXRlRWxlbWVudCgidGQiLCBudWxsLCBidXR0b24uZGVzY3JpcHRpb24pKSk7CgoKfQoKLyogaGFybW9ueSBkZWZhdWx0IGV4cG9ydCAqLyBjb25zdCBzZXR0aW5nc19TZXR0aW5nID0gKFNldHRpbmcpOwo7Ly8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvcmVsYXkvcm91dGVzL1JlbGF5UGFnZS50c3gKZnVuY3Rpb24gUmVsYXlQYWdlX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIobywgYWxsb3dBcnJheUxpa2UpIHt2YXIgaXQgPSB0eXBlb2YgU3ltYm9sICE9PSAidW5kZWZpbmVkIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0gfHwgb1siQEBpdGVyYXRvciJdO2lmICghaXQpIHtpZiAoQXJyYXkuaXNBcnJheShvKSB8fCAoaXQgPSBSZWxheVBhZ2VfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobykpIHx8IGFsbG93QXJyYXlMaWtlICYmIG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSAibnVtYmVyIikge2lmIChpdCkgbyA9IGl0O3ZhciBpID0gMDt2YXIgRiA9IGZ1bmN0aW9uIEYoKSB7fTtyZXR1cm4geyBzOiBGLCBuOiBmdW5jdGlvbiBuKCkge2lmIChpID49IG8ubGVuZ3RoKSByZXR1cm4geyBkb25lOiB0cnVlIH07cmV0dXJuIHsgZG9uZTogZmFsc2UsIHZhbHVlOiBvW2krK10gfTt9LCBlOiBmdW5jdGlvbiBlKF9lKSB7dGhyb3cgX2U7fSwgZjogRiB9O310aHJvdyBuZXcgVHlwZUVycm9yKCJJbnZhbGlkIGF0dGVtcHQgdG8gaXRlcmF0ZSBub24taXRlcmFibGUgaW5zdGFuY2UuXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuIik7fXZhciBub3JtYWxDb21wbGV0aW9uID0gdHJ1ZSxkaWRFcnIgPSBmYWxzZSxlcnI7cmV0dXJuIHsgczogZnVuY3Rpb24gcygpIHtpdCA9IGl0LmNhbGwobyk7fSwgbjogZnVuY3Rpb24gbigpIHt2YXIgc3RlcCA9IGl0Lm5leHQoKTtub3JtYWxDb21wbGV0aW9uID0gc3RlcC5kb25lO3JldHVybiBzdGVwO30sIGU6IGZ1bmN0aW9uIGUoX2UyKSB7ZGlkRXJyID0gdHJ1ZTtlcnIgPSBfZTI7fSwgZjogZnVuY3Rpb24gZigpIHt0cnkge2lmICghbm9ybWFsQ29tcGxldGlvbiAmJiBpdFsicmV0dXJuIl0gIT0gbnVsbCkgaXRbInJldHVybiJdKCk7fSBmaW5hbGx5IHtpZiAoZGlkRXJyKSB0aHJvdyBlcnI7fX0gfTt9ZnVuY3Rpb24gUmVsYXlQYWdlX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge2lmICghbykgcmV0dXJuO2lmICh0eXBlb2YgbyA9PT0gInN0cmluZyIpIHJldHVybiBSZWxheVBhZ2VfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO3ZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtpZiAobiA9PT0gIk9iamVjdCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTtpZiAobiA9PT0gIk1hcCIgfHwgbiA9PT0gIlNldCIpIHJldHVybiBBcnJheS5mcm9tKG8pO2lmIChuID09PSAiQXJndW1lbnRzIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIFJlbGF5UGFnZV9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7fWZ1bmN0aW9uIFJlbGF5UGFnZV9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7aWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7Zm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7YXJyMltpXSA9IGFycltpXTt9cmV0dXJuIGFycjI7fQoKCgoKCgpmdW5jdGlvbiBSZWxheVBhZ2UoX3JlZikge3ZhciBwYWdlID0gX3JlZi5wYWdlOwogIHZhciBncm91cHMgPSBbXTsKICB2YXIgY3VycmVudEdyb3VwID0gbnVsbDt2YXIgX2l0ZXJhdG9yID0gUmVsYXlQYWdlX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIoCgogICAgcGFnZS5jb21wb25lbnRzKSxfc3RlcDt0cnkge2ZvciAoX2l0ZXJhdG9yLnMoKTsgIShfc3RlcCA9IF9pdGVyYXRvci5uKCkpLmRvbmU7KSB7dmFyIGNvbXBvbmVudCA9IF9zdGVwLnZhbHVlOwogICAgICBpZiAoCiAgICAgIGNvbXBvbmVudC50eXBlID09IFJlbGF5Q29tcG9uZW50VHlwZS5IVE1MIHx8CiAgICAgIGNvbXBvbmVudC50eXBlID09IFJlbGF5Q29tcG9uZW50VHlwZS5JTlRFUlJVUFQpCiAgICAgIHsKICAgICAgICBncm91cHMucHVzaChjb21wb25lbnQpOwogICAgICAgIGN1cnJlbnRHcm91cCA9IG51bGw7CiAgICAgICAgY29udGludWU7CiAgICAgIH0KCiAgICAgIGlmIChjdXJyZW50R3JvdXAgPT0gbnVsbCkgewogICAgICAgIGN1cnJlbnRHcm91cCA9IFtdOwogICAgICAgIGdyb3Vwcy5wdXNoKGN1cnJlbnRHcm91cCk7CiAgICAgIH0KCiAgICAgIGN1cnJlbnRHcm91cC5wdXNoKGNvbXBvbmVudCk7CiAgICB9fSBjYXRjaCAoZXJyKSB7X2l0ZXJhdG9yLmUoZXJyKTt9IGZpbmFsbHkge19pdGVyYXRvci5mKCk7fQoKICB2YXIgZWxlbWVudHMgPSBbXTsKICB2YXIgdmFsaWRhdG9yID0gbmV3IGFwaV9TZXR0aW5nVmFsaWRhdG9yKCk7CgogIGdyb3Vwcy5mb3JFYWNoKGZ1bmN0aW9uIChjb21wb25lbnRzKSB7CiAgICBpZiAoY29tcG9uZW50cy50eXBlID09IFJlbGF5Q29tcG9uZW50VHlwZS5IVE1MKSB7CiAgICAgIHZhciBodG1sID0gY29tcG9uZW50czsKCiAgICAgIGlmIChodG1sLmRhdGEgPT0gbnVsbCkgewogICAgICAgIHJldHVybjsKICAgICAgfQoKICAgICAgZWxlbWVudHMucHVzaCggLyojX19QVVJFX18qLwogICAgICByZWFjdC5jcmVhdGVFbGVtZW50KCJkaXYiLCB7CiAgICAgICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw6IHsKICAgICAgICAgIF9faHRtbDogY29tcG9uZW50cy5kYXRhCiAgICAgICAgfSB9KSk7CgoKICAgICAgcmV0dXJuOwogICAgfQoKICAgIGlmIChjb21wb25lbnRzLnR5cGUgPT0gUmVsYXlDb21wb25lbnRUeXBlLklOVEVSUlVQVCkgewogICAgICBlbGVtZW50cy5wdXNoKCAvKiNfX1BVUkVfXyovCiAgICAgIHJlYWN0LmNyZWF0ZUVsZW1lbnQoY29tcG9uZW50c19JbnRlcnJ1cHQsIHsgYnV0dG9uOiBjb21wb25lbnRzIH0pKTsKCiAgICAgIHJldHVybjsKICAgIH0KCiAgICB2YXIgYnV0dG9ucyA9IGNvbXBvbmVudHM7CgogICAgZWxlbWVudHMucHVzaCggLyojX19QVVJFX18qLwogICAgcmVhY3QuY3JlYXRlRWxlbWVudCgidGFibGUiLCBudWxsLCAvKiNfX1BVUkVfXyovCiAgICByZWFjdC5jcmVhdGVFbGVtZW50KCJ0Ym9keSIsIG51bGwsCiAgICBidXR0b25zLm1hcChmdW5jdGlvbiAoc2V0dGluZywgaW5kZXgpIHtyZXR1cm4gLyojX19QVVJFX18qLygKICAgICAgICByZWFjdC5jcmVhdGVFbGVtZW50KHNldHRpbmdzX1NldHRpbmcsIHsga2V5OiBpbmRleCwgYnV0dG9uOiBzZXR0aW5nLCB2YWxpZGF0b3I6IHZhbGlkYXRvciB9KSk7fSkpKSk7CgoKCgogIH0pOwoKICB2YWxpZGF0b3IudXBkYXRlT2JqZWN0KCk7CgogIC8vIElmIHdlIGhhdmUgbm8gc2V0dGluZ3MgaW4gd2hpY2ggd2UnZCBzYXZlIHN0dWZmLCBkb24ndCBib3RoZXIgcmVuZGVyaW5nIHNhdmUgYnV0dG9uCiAgaWYgKAogIHBhZ2UuY29tcG9uZW50cy5maW5kKGZ1bmN0aW9uIChjKSB7cmV0dXJuIGMucHJlZmVyZW5jZSAhPSBudWxsO30pID09CiAgbnVsbCkKICB7CiAgICByZXR1cm4gLyojX19QVVJFX18qL3JlYWN0LmNyZWF0ZUVsZW1lbnQocmVhY3QuRnJhZ21lbnQsIG51bGwsIGVsZW1lbnRzKTsKICB9CgogIHJldHVybiAvKiNfX1BVUkVfXyovKAogICAgcmVhY3QuY3JlYXRlRWxlbWVudChyZWFjdC5GcmFnbWVudCwgbnVsbCwKICAgICIgIiwKICAgIGVsZW1lbnRzLCAiICIsIC8qI19fUFVSRV9fKi9yZWFjdC5jcmVhdGVFbGVtZW50KCJiciIsIG51bGwpLCAvKiNfX1BVUkVfXyovCiAgICByZWFjdC5jcmVhdGVFbGVtZW50KCJpbnB1dCIsIHsKICAgICAgY2xhc3NOYW1lOiAic2F2ZSIsCiAgICAgIG9uQ2xpY2s6IGZ1bmN0aW9uIG9uQ2xpY2soKSB7cmV0dXJuICgKICAgICAgICAgIHNhdmVTZXR0aW5ncygKICAgICAgICAgIHBhZ2UuY29tcG9uZW50cy5maWx0ZXIoCiAgICAgICAgICBmdW5jdGlvbiAoYikge3JldHVybiBiLnByZWZlcmVuY2UgIT0gbnVsbDt9KSkuCgogICAgICAgICAgdGhlbihmdW5jdGlvbiAobm90aWZzKSB7dmFyIF9pdGVyYXRvcjIgPSBSZWxheVBhZ2VfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlcigKICAgICAgICAgICAgICBub3RpZnMpLF9zdGVwMjt0cnkge2ZvciAoX2l0ZXJhdG9yMi5zKCk7ICEoX3N0ZXAyID0gX2l0ZXJhdG9yMi5uKCkpLmRvbmU7KSB7dmFyIG5vdGlmID0gX3N0ZXAyLnZhbHVlOwogICAgICAgICAgICAgICAgYWRkTm90aWZpY2F0aW9uKG5vdGlmKTsKICAgICAgICAgICAgICB9fSBjYXRjaCAoZXJyKSB7X2l0ZXJhdG9yMi5lKGVycik7fSBmaW5hbGx5IHtfaXRlcmF0b3IyLmYoKTt9CiAgICAgICAgICB9KSk7fSwKCiAgICAgIHR5cGU6ICJzdWJtaXQiLAogICAgICB2YWx1ZTogIlNhdmUgQ2hhbmdlcyIgfSkpKTsKCgoKfQoKLyogaGFybW9ueSBkZWZhdWx0IGV4cG9ydCAqLyBjb25zdCByb3V0ZXNfUmVsYXlQYWdlID0gKFJlbGF5UGFnZSk7CjsvLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy9yZWxheS9BcHAudHN4CgoKCgoKCmZ1bmN0aW9uIEFwcChfcmVmKSB7dmFyIHBhZ2VzID0gX3JlZi5wYWdlczsKICByZXR1cm4gLyojX19QVVJFX18qLygKICAgIHJlYWN0LmNyZWF0ZUVsZW1lbnQoTWVtb3J5Um91dGVyLCBudWxsLAogICAgIiAiLCAvKiNfX1BVUkVfXyovCiAgICByZWFjdC5jcmVhdGVFbGVtZW50KFJvdXRlcywgbnVsbCwKICAgICIgIiwgLyojX19QVVJFX18qLwogICAgcmVhY3QuY3JlYXRlRWxlbWVudChSb3V0ZSwgeyBlbGVtZW50OiAvKiNfX1BVUkVfXyovcmVhY3QuY3JlYXRlRWxlbWVudChjb21wb25lbnRzX0xheW91dCwgeyBwYWdlczogcGFnZXMgfSkgfSwKICAgICIgIiwgLyojX19QVVJFX18qLwogICAgcmVhY3QuY3JlYXRlRWxlbWVudChSb3V0ZSwgewogICAgICBwYXRoOiAiLyIsCiAgICAgIGVsZW1lbnQ6IC8qI19fUFVSRV9fKi9yZWFjdC5jcmVhdGVFbGVtZW50KE5hdmlnYXRlLCB7IHRvOiAiLyIgKyBwYWdlc1swXS5maWxlLCByZXBsYWNlOiB0cnVlIH0pIH0pLAogICAgIiAiLAogICAgcGFnZXMubWFwKGZ1bmN0aW9uIChwLCBpbmRleCkgewogICAgICByZXR1cm4gLyojX19QVVJFX18qLygKICAgICAgICByZWFjdC5jcmVhdGVFbGVtZW50KFJvdXRlLCB7CiAgICAgICAgICBrZXk6IGluZGV4LAogICAgICAgICAgcGF0aDogIi8iICsgcC5maWxlLAogICAgICAgICAgZWxlbWVudDogLyojX19QVVJFX18qL3JlYWN0LmNyZWF0ZUVsZW1lbnQocm91dGVzX1JlbGF5UGFnZSwgeyBwYWdlOiBwIH0pIH0pKTsKCgogICAgfSksICIgIiksCiAgICAiICIpLAogICAgIiAiKSk7CgoKfQoKLyogaGFybW9ueSBkZWZhdWx0IGV4cG9ydCAqLyBjb25zdCByZWxheV9BcHAgPSAoQXBwKTsKCi8qKiovIH0pLAoKLyoqKi8gNDQ4OgovKioqLyAoKF9fdW51c2VkX3dlYnBhY2tfbW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSA9PiB7CgovKioKICogQGxpY2Vuc2UgUmVhY3QKICogcmVhY3QtZG9tLnByb2R1Y3Rpb24ubWluLmpzCiAqCiAqIENvcHlyaWdodCAoYykgRmFjZWJvb2ssIEluYy4gYW5kIGl0cyBhZmZpbGlhdGVzLgogKgogKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGUKICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLgogKi8KLyoKIE1vZGVybml6ciAzLjAuMHByZSAoQ3VzdG9tIEJ1aWxkKSB8IE1JVAoqLwp2YXIgYWE9X193ZWJwYWNrX3JlcXVpcmVfXygyOTQpLGNhPV9fd2VicGFja19yZXF1aXJlX18oODQwKTtmdW5jdGlvbiBwKGEpe2Zvcih2YXIgYj0iaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL2Vycm9yLWRlY29kZXIuaHRtbD9pbnZhcmlhbnQ9IithLGM9MTtjPGFyZ3VtZW50cy5sZW5ndGg7YysrKWIrPSImYXJnc1tdPSIrZW5jb2RlVVJJQ29tcG9uZW50KGFyZ3VtZW50c1tjXSk7cmV0dXJuIk1pbmlmaWVkIFJlYWN0IGVycm9yICMiK2ErIjsgdmlzaXQgIitiKyIgZm9yIHRoZSBmdWxsIG1lc3NhZ2Ugb3IgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50IGZvciBmdWxsIGVycm9ycyBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLiJ9dmFyIGRhPW5ldyBTZXQsZWE9e307ZnVuY3Rpb24gZmEoYSxiKXtoYShhLGIpO2hhKGErIkNhcHR1cmUiLGIpfQpmdW5jdGlvbiBoYShhLGIpe2VhW2FdPWI7Zm9yKGE9MDthPGIubGVuZ3RoO2ErKylkYS5hZGQoYlthXSl9CnZhciBpYT0hKCJ1bmRlZmluZWQiPT09dHlwZW9mIHdpbmRvd3x8InVuZGVmaW5lZCI9PT10eXBlb2Ygd2luZG93LmRvY3VtZW50fHwidW5kZWZpbmVkIj09PXR5cGVvZiB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCksamE9T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSxrYT0vXls6QS1aX2Etelx1MDBDMC1cdTAwRDZcdTAwRDgtXHUwMEY2XHUwMEY4LVx1MDJGRlx1MDM3MC1cdTAzN0RcdTAzN0YtXHUxRkZGXHUyMDBDLVx1MjAwRFx1MjA3MC1cdTIxOEZcdTJDMDAtXHUyRkVGXHUzMDAxLVx1RDdGRlx1RjkwMC1cdUZEQ0ZcdUZERjAtXHVGRkZEXVs6QS1aX2Etelx1MDBDMC1cdTAwRDZcdTAwRDgtXHUwMEY2XHUwMEY4LVx1MDJGRlx1MDM3MC1cdTAzN0RcdTAzN0YtXHUxRkZGXHUyMDBDLVx1MjAwRFx1MjA3MC1cdTIxOEZcdTJDMDAtXHUyRkVGXHUzMDAxLVx1RDdGRlx1RjkwMC1cdUZEQ0ZcdUZERjAtXHVGRkZEXC0uMC05XHUwMEI3XHUwMzAwLVx1MDM2Rlx1MjAzRi1cdTIwNDBdKiQvLGxhPQp7fSxtYT17fTtmdW5jdGlvbiBvYShhKXtpZihqYS5jYWxsKG1hLGEpKXJldHVybiEwO2lmKGphLmNhbGwobGEsYSkpcmV0dXJuITE7aWYoa2EudGVzdChhKSlyZXR1cm4gbWFbYV09ITA7bGFbYV09ITA7cmV0dXJuITF9ZnVuY3Rpb24gcGEoYSxiLGMsZCl7aWYobnVsbCE9PWMmJjA9PT1jLnR5cGUpcmV0dXJuITE7c3dpdGNoKHR5cGVvZiBiKXtjYXNlICJmdW5jdGlvbiI6Y2FzZSAic3ltYm9sIjpyZXR1cm4hMDtjYXNlICJib29sZWFuIjppZihkKXJldHVybiExO2lmKG51bGwhPT1jKXJldHVybiFjLmFjY2VwdHNCb29sZWFuczthPWEudG9Mb3dlckNhc2UoKS5zbGljZSgwLDUpO3JldHVybiJkYXRhLSIhPT1hJiYiYXJpYS0iIT09YTtkZWZhdWx0OnJldHVybiExfX0KZnVuY3Rpb24gcWEoYSxiLGMsZCl7aWYobnVsbD09PWJ8fCJ1bmRlZmluZWQiPT09dHlwZW9mIGJ8fHBhKGEsYixjLGQpKXJldHVybiEwO2lmKGQpcmV0dXJuITE7aWYobnVsbCE9PWMpc3dpdGNoKGMudHlwZSl7Y2FzZSAzOnJldHVybiFiO2Nhc2UgNDpyZXR1cm4hMT09PWI7Y2FzZSA1OnJldHVybiBpc05hTihiKTtjYXNlIDY6cmV0dXJuIGlzTmFOKGIpfHwxPmJ9cmV0dXJuITF9ZnVuY3Rpb24gdihhLGIsYyxkLGUsZixnKXt0aGlzLmFjY2VwdHNCb29sZWFucz0yPT09Ynx8Mz09PWJ8fDQ9PT1iO3RoaXMuYXR0cmlidXRlTmFtZT1kO3RoaXMuYXR0cmlidXRlTmFtZXNwYWNlPWU7dGhpcy5tdXN0VXNlUHJvcGVydHk9Yzt0aGlzLnByb3BlcnR5TmFtZT1hO3RoaXMudHlwZT1iO3RoaXMuc2FuaXRpemVVUkw9Zjt0aGlzLnJlbW92ZUVtcHR5U3RyaW5nPWd9dmFyIHo9e307CiJjaGlsZHJlbiBkYW5nZXJvdXNseVNldElubmVySFRNTCBkZWZhdWx0VmFsdWUgZGVmYXVsdENoZWNrZWQgaW5uZXJIVE1MIHN1cHByZXNzQ29udGVudEVkaXRhYmxlV2FybmluZyBzdXBwcmVzc0h5ZHJhdGlvbldhcm5pbmcgc3R5bGUiLnNwbGl0KCIgIikuZm9yRWFjaChmdW5jdGlvbihhKXt6W2FdPW5ldyB2KGEsMCwhMSxhLG51bGwsITEsITEpfSk7W1siYWNjZXB0Q2hhcnNldCIsImFjY2VwdC1jaGFyc2V0Il0sWyJjbGFzc05hbWUiLCJjbGFzcyJdLFsiaHRtbEZvciIsImZvciJdLFsiaHR0cEVxdWl2IiwiaHR0cC1lcXVpdiJdXS5mb3JFYWNoKGZ1bmN0aW9uKGEpe3ZhciBiPWFbMF07eltiXT1uZXcgdihiLDEsITEsYVsxXSxudWxsLCExLCExKX0pO1siY29udGVudEVkaXRhYmxlIiwiZHJhZ2dhYmxlIiwic3BlbGxDaGVjayIsInZhbHVlIl0uZm9yRWFjaChmdW5jdGlvbihhKXt6W2FdPW5ldyB2KGEsMiwhMSxhLnRvTG93ZXJDYXNlKCksbnVsbCwhMSwhMSl9KTsKWyJhdXRvUmV2ZXJzZSIsImV4dGVybmFsUmVzb3VyY2VzUmVxdWlyZWQiLCJmb2N1c2FibGUiLCJwcmVzZXJ2ZUFscGhhIl0uZm9yRWFjaChmdW5jdGlvbihhKXt6W2FdPW5ldyB2KGEsMiwhMSxhLG51bGwsITEsITEpfSk7ImFsbG93RnVsbFNjcmVlbiBhc3luYyBhdXRvRm9jdXMgYXV0b1BsYXkgY29udHJvbHMgZGVmYXVsdCBkZWZlciBkaXNhYmxlZCBkaXNhYmxlUGljdHVyZUluUGljdHVyZSBkaXNhYmxlUmVtb3RlUGxheWJhY2sgZm9ybU5vVmFsaWRhdGUgaGlkZGVuIGxvb3Agbm9Nb2R1bGUgbm9WYWxpZGF0ZSBvcGVuIHBsYXlzSW5saW5lIHJlYWRPbmx5IHJlcXVpcmVkIHJldmVyc2VkIHNjb3BlZCBzZWFtbGVzcyBpdGVtU2NvcGUiLnNwbGl0KCIgIikuZm9yRWFjaChmdW5jdGlvbihhKXt6W2FdPW5ldyB2KGEsMywhMSxhLnRvTG93ZXJDYXNlKCksbnVsbCwhMSwhMSl9KTsKWyJjaGVja2VkIiwibXVsdGlwbGUiLCJtdXRlZCIsInNlbGVjdGVkIl0uZm9yRWFjaChmdW5jdGlvbihhKXt6W2FdPW5ldyB2KGEsMywhMCxhLG51bGwsITEsITEpfSk7WyJjYXB0dXJlIiwiZG93bmxvYWQiXS5mb3JFYWNoKGZ1bmN0aW9uKGEpe3pbYV09bmV3IHYoYSw0LCExLGEsbnVsbCwhMSwhMSl9KTtbImNvbHMiLCJyb3dzIiwic2l6ZSIsInNwYW4iXS5mb3JFYWNoKGZ1bmN0aW9uKGEpe3pbYV09bmV3IHYoYSw2LCExLGEsbnVsbCwhMSwhMSl9KTtbInJvd1NwYW4iLCJzdGFydCJdLmZvckVhY2goZnVuY3Rpb24oYSl7elthXT1uZXcgdihhLDUsITEsYS50b0xvd2VyQ2FzZSgpLG51bGwsITEsITEpfSk7dmFyIHJhPS9bXC06XShbYS16XSkvZztmdW5jdGlvbiBzYShhKXtyZXR1cm4gYVsxXS50b1VwcGVyQ2FzZSgpfQoiYWNjZW50LWhlaWdodCBhbGlnbm1lbnQtYmFzZWxpbmUgYXJhYmljLWZvcm0gYmFzZWxpbmUtc2hpZnQgY2FwLWhlaWdodCBjbGlwLXBhdGggY2xpcC1ydWxlIGNvbG9yLWludGVycG9sYXRpb24gY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzIGNvbG9yLXByb2ZpbGUgY29sb3ItcmVuZGVyaW5nIGRvbWluYW50LWJhc2VsaW5lIGVuYWJsZS1iYWNrZ3JvdW5kIGZpbGwtb3BhY2l0eSBmaWxsLXJ1bGUgZmxvb2QtY29sb3IgZmxvb2Qtb3BhY2l0eSBmb250LWZhbWlseSBmb250LXNpemUgZm9udC1zaXplLWFkanVzdCBmb250LXN0cmV0Y2ggZm9udC1zdHlsZSBmb250LXZhcmlhbnQgZm9udC13ZWlnaHQgZ2x5cGgtbmFtZSBnbHlwaC1vcmllbnRhdGlvbi1ob3Jpem9udGFsIGdseXBoLW9yaWVudGF0aW9uLXZlcnRpY2FsIGhvcml6LWFkdi14IGhvcml6LW9yaWdpbi14IGltYWdlLXJlbmRlcmluZyBsZXR0ZXItc3BhY2luZyBsaWdodGluZy1jb2xvciBtYXJrZXItZW5kIG1hcmtlci1taWQgbWFya2VyLXN0YXJ0IG92ZXJsaW5lLXBvc2l0aW9uIG92ZXJsaW5lLXRoaWNrbmVzcyBwYWludC1vcmRlciBwYW5vc2UtMSBwb2ludGVyLWV2ZW50cyByZW5kZXJpbmctaW50ZW50IHNoYXBlLXJlbmRlcmluZyBzdG9wLWNvbG9yIHN0b3Atb3BhY2l0eSBzdHJpa2V0aHJvdWdoLXBvc2l0aW9uIHN0cmlrZXRocm91Z2gtdGhpY2tuZXNzIHN0cm9rZS1kYXNoYXJyYXkgc3Ryb2tlLWRhc2hvZmZzZXQgc3Ryb2tlLWxpbmVjYXAgc3Ryb2tlLWxpbmVqb2luIHN0cm9rZS1taXRlcmxpbWl0IHN0cm9rZS1vcGFjaXR5IHN0cm9rZS13aWR0aCB0ZXh0LWFuY2hvciB0ZXh0LWRlY29yYXRpb24gdGV4dC1yZW5kZXJpbmcgdW5kZXJsaW5lLXBvc2l0aW9uIHVuZGVybGluZS10aGlja25lc3MgdW5pY29kZS1iaWRpIHVuaWNvZGUtcmFuZ2UgdW5pdHMtcGVyLWVtIHYtYWxwaGFiZXRpYyB2LWhhbmdpbmcgdi1pZGVvZ3JhcGhpYyB2LW1hdGhlbWF0aWNhbCB2ZWN0b3ItZWZmZWN0IHZlcnQtYWR2LXkgdmVydC1vcmlnaW4teCB2ZXJ0LW9yaWdpbi15IHdvcmQtc3BhY2luZyB3cml0aW5nLW1vZGUgeG1sbnM6eGxpbmsgeC1oZWlnaHQiLnNwbGl0KCIgIikuZm9yRWFjaChmdW5jdGlvbihhKXt2YXIgYj1hLnJlcGxhY2UocmEsCnNhKTt6W2JdPW5ldyB2KGIsMSwhMSxhLG51bGwsITEsITEpfSk7InhsaW5rOmFjdHVhdGUgeGxpbms6YXJjcm9sZSB4bGluazpyb2xlIHhsaW5rOnNob3cgeGxpbms6dGl0bGUgeGxpbms6dHlwZSIuc3BsaXQoIiAiKS5mb3JFYWNoKGZ1bmN0aW9uKGEpe3ZhciBiPWEucmVwbGFjZShyYSxzYSk7eltiXT1uZXcgdihiLDEsITEsYSwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIsITEsITEpfSk7WyJ4bWw6YmFzZSIsInhtbDpsYW5nIiwieG1sOnNwYWNlIl0uZm9yRWFjaChmdW5jdGlvbihhKXt2YXIgYj1hLnJlcGxhY2UocmEsc2EpO3pbYl09bmV3IHYoYiwxLCExLGEsImh0dHA6Ly93d3cudzMub3JnL1hNTC8xOTk4L25hbWVzcGFjZSIsITEsITEpfSk7WyJ0YWJJbmRleCIsImNyb3NzT3JpZ2luIl0uZm9yRWFjaChmdW5jdGlvbihhKXt6W2FdPW5ldyB2KGEsMSwhMSxhLnRvTG93ZXJDYXNlKCksbnVsbCwhMSwhMSl9KTsKei54bGlua0hyZWY9bmV3IHYoInhsaW5rSHJlZiIsMSwhMSwieGxpbms6aHJlZiIsImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiLCEwLCExKTtbInNyYyIsImhyZWYiLCJhY3Rpb24iLCJmb3JtQWN0aW9uIl0uZm9yRWFjaChmdW5jdGlvbihhKXt6W2FdPW5ldyB2KGEsMSwhMSxhLnRvTG93ZXJDYXNlKCksbnVsbCwhMCwhMCl9KTsKZnVuY3Rpb24gdGEoYSxiLGMsZCl7dmFyIGU9ei5oYXNPd25Qcm9wZXJ0eShiKT96W2JdOm51bGw7aWYobnVsbCE9PWU/MCE9PWUudHlwZTpkfHwhKDI8Yi5sZW5ndGgpfHwibyIhPT1iWzBdJiYiTyIhPT1iWzBdfHwibiIhPT1iWzFdJiYiTiIhPT1iWzFdKXFhKGIsYyxlLGQpJiYoYz1udWxsKSxkfHxudWxsPT09ZT9vYShiKSYmKG51bGw9PT1jP2EucmVtb3ZlQXR0cmlidXRlKGIpOmEuc2V0QXR0cmlidXRlKGIsIiIrYykpOmUubXVzdFVzZVByb3BlcnR5P2FbZS5wcm9wZXJ0eU5hbWVdPW51bGw9PT1jPzM9PT1lLnR5cGU/ITE6IiI6YzooYj1lLmF0dHJpYnV0ZU5hbWUsZD1lLmF0dHJpYnV0ZU5hbWVzcGFjZSxudWxsPT09Yz9hLnJlbW92ZUF0dHJpYnV0ZShiKTooZT1lLnR5cGUsYz0zPT09ZXx8ND09PWUmJiEwPT09Yz8iIjoiIitjLGQ/YS5zZXRBdHRyaWJ1dGVOUyhkLGIsYyk6YS5zZXRBdHRyaWJ1dGUoYixjKSkpfQp2YXIgdWE9YWEuX19TRUNSRVRfSU5URVJOQUxTX0RPX05PVF9VU0VfT1JfWU9VX1dJTExfQkVfRklSRUQsdmE9U3ltYm9sLmZvcigicmVhY3QuZWxlbWVudCIpLHdhPVN5bWJvbC5mb3IoInJlYWN0LnBvcnRhbCIpLHlhPVN5bWJvbC5mb3IoInJlYWN0LmZyYWdtZW50IiksemE9U3ltYm9sLmZvcigicmVhY3Quc3RyaWN0X21vZGUiKSxBYT1TeW1ib2wuZm9yKCJyZWFjdC5wcm9maWxlciIpLEJhPVN5bWJvbC5mb3IoInJlYWN0LnByb3ZpZGVyIiksQ2E9U3ltYm9sLmZvcigicmVhY3QuY29udGV4dCIpLERhPVN5bWJvbC5mb3IoInJlYWN0LmZvcndhcmRfcmVmIiksRWE9U3ltYm9sLmZvcigicmVhY3Quc3VzcGVuc2UiKSxGYT1TeW1ib2wuZm9yKCJyZWFjdC5zdXNwZW5zZV9saXN0IiksR2E9U3ltYm9sLmZvcigicmVhY3QubWVtbyIpLEhhPVN5bWJvbC5mb3IoInJlYWN0LmxhenkiKTtTeW1ib2wuZm9yKCJyZWFjdC5zY29wZSIpO1N5bWJvbC5mb3IoInJlYWN0LmRlYnVnX3RyYWNlX21vZGUiKTsKdmFyIElhPVN5bWJvbC5mb3IoInJlYWN0Lm9mZnNjcmVlbiIpO1N5bWJvbC5mb3IoInJlYWN0LmxlZ2FjeV9oaWRkZW4iKTtTeW1ib2wuZm9yKCJyZWFjdC5jYWNoZSIpO1N5bWJvbC5mb3IoInJlYWN0LnRyYWNpbmdfbWFya2VyIik7dmFyIEphPVN5bWJvbC5pdGVyYXRvcjtmdW5jdGlvbiBLYShhKXtpZihudWxsPT09YXx8Im9iamVjdCIhPT10eXBlb2YgYSlyZXR1cm4gbnVsbDthPUphJiZhW0phXXx8YVsiQEBpdGVyYXRvciJdO3JldHVybiJmdW5jdGlvbiI9PT10eXBlb2YgYT9hOm51bGx9dmFyIEE9T2JqZWN0LmFzc2lnbixMYTtmdW5jdGlvbiBNYShhKXtpZih2b2lkIDA9PT1MYSl0cnl7dGhyb3cgRXJyb3IoKTt9Y2F0Y2goYyl7dmFyIGI9Yy5zdGFjay50cmltKCkubWF0Y2goL1xuKCAqKGF0ICk/KS8pO0xhPWImJmJbMV18fCIifXJldHVybiJcbiIrTGErYX12YXIgTmE9ITE7CmZ1bmN0aW9uIE9hKGEsYil7aWYoIWF8fE5hKXJldHVybiIiO05hPSEwO3ZhciBjPUVycm9yLnByZXBhcmVTdGFja1RyYWNlO0Vycm9yLnByZXBhcmVTdGFja1RyYWNlPXZvaWQgMDt0cnl7aWYoYilpZihiPWZ1bmN0aW9uKCl7dGhyb3cgRXJyb3IoKTt9LE9iamVjdC5kZWZpbmVQcm9wZXJ0eShiLnByb3RvdHlwZSwicHJvcHMiLHtzZXQ6ZnVuY3Rpb24oKXt0aHJvdyBFcnJvcigpO319KSwib2JqZWN0Ij09PXR5cGVvZiBSZWZsZWN0JiZSZWZsZWN0LmNvbnN0cnVjdCl7dHJ5e1JlZmxlY3QuY29uc3RydWN0KGIsW10pfWNhdGNoKGwpe3ZhciBkPWx9UmVmbGVjdC5jb25zdHJ1Y3QoYSxbXSxiKX1lbHNle3RyeXtiLmNhbGwoKX1jYXRjaChsKXtkPWx9YS5jYWxsKGIucHJvdG90eXBlKX1lbHNle3RyeXt0aHJvdyBFcnJvcigpO31jYXRjaChsKXtkPWx9YSgpfX1jYXRjaChsKXtpZihsJiZkJiYic3RyaW5nIj09PXR5cGVvZiBsLnN0YWNrKXtmb3IodmFyIGU9bC5zdGFjay5zcGxpdCgiXG4iKSwKZj1kLnN0YWNrLnNwbGl0KCJcbiIpLGc9ZS5sZW5ndGgtMSxoPWYubGVuZ3RoLTE7MTw9ZyYmMDw9aCYmZVtnXSE9PWZbaF07KWgtLTtmb3IoOzE8PWcmJjA8PWg7Zy0tLGgtLSlpZihlW2ddIT09ZltoXSl7aWYoMSE9PWd8fDEhPT1oKXtkbyBpZihnLS0saC0tLDA+aHx8ZVtnXSE9PWZbaF0pe3ZhciBrPSJcbiIrZVtnXS5yZXBsYWNlKCIgYXQgbmV3ICIsIiBhdCAiKTthLmRpc3BsYXlOYW1lJiZrLmluY2x1ZGVzKCI8YW5vbnltb3VzPiIpJiYoaz1rLnJlcGxhY2UoIjxhbm9ueW1vdXM+IixhLmRpc3BsYXlOYW1lKSk7cmV0dXJuIGt9d2hpbGUoMTw9ZyYmMDw9aCl9YnJlYWt9fX1maW5hbGx5e05hPSExLEVycm9yLnByZXBhcmVTdGFja1RyYWNlPWN9cmV0dXJuKGE9YT9hLmRpc3BsYXlOYW1lfHxhLm5hbWU6IiIpP01hKGEpOiIifQpmdW5jdGlvbiBQYShhKXtzd2l0Y2goYS50YWcpe2Nhc2UgNTpyZXR1cm4gTWEoYS50eXBlKTtjYXNlIDE2OnJldHVybiBNYSgiTGF6eSIpO2Nhc2UgMTM6cmV0dXJuIE1hKCJTdXNwZW5zZSIpO2Nhc2UgMTk6cmV0dXJuIE1hKCJTdXNwZW5zZUxpc3QiKTtjYXNlIDA6Y2FzZSAyOmNhc2UgMTU6cmV0dXJuIGE9T2EoYS50eXBlLCExKSxhO2Nhc2UgMTE6cmV0dXJuIGE9T2EoYS50eXBlLnJlbmRlciwhMSksYTtjYXNlIDE6cmV0dXJuIGE9T2EoYS50eXBlLCEwKSxhO2RlZmF1bHQ6cmV0dXJuIiJ9fQpmdW5jdGlvbiBRYShhKXtpZihudWxsPT1hKXJldHVybiBudWxsO2lmKCJmdW5jdGlvbiI9PT10eXBlb2YgYSlyZXR1cm4gYS5kaXNwbGF5TmFtZXx8YS5uYW1lfHxudWxsO2lmKCJzdHJpbmciPT09dHlwZW9mIGEpcmV0dXJuIGE7c3dpdGNoKGEpe2Nhc2UgeWE6cmV0dXJuIkZyYWdtZW50IjtjYXNlIHdhOnJldHVybiJQb3J0YWwiO2Nhc2UgQWE6cmV0dXJuIlByb2ZpbGVyIjtjYXNlIHphOnJldHVybiJTdHJpY3RNb2RlIjtjYXNlIEVhOnJldHVybiJTdXNwZW5zZSI7Y2FzZSBGYTpyZXR1cm4iU3VzcGVuc2VMaXN0In1pZigib2JqZWN0Ij09PXR5cGVvZiBhKXN3aXRjaChhLiQkdHlwZW9mKXtjYXNlIENhOnJldHVybihhLmRpc3BsYXlOYW1lfHwiQ29udGV4dCIpKyIuQ29uc3VtZXIiO2Nhc2UgQmE6cmV0dXJuKGEuX2NvbnRleHQuZGlzcGxheU5hbWV8fCJDb250ZXh0IikrIi5Qcm92aWRlciI7Y2FzZSBEYTp2YXIgYj1hLnJlbmRlcjthPWEuZGlzcGxheU5hbWU7YXx8KGE9Yi5kaXNwbGF5TmFtZXx8CmIubmFtZXx8IiIsYT0iIiE9PWE/IkZvcndhcmRSZWYoIithKyIpIjoiRm9yd2FyZFJlZiIpO3JldHVybiBhO2Nhc2UgR2E6cmV0dXJuIGI9YS5kaXNwbGF5TmFtZXx8bnVsbCxudWxsIT09Yj9iOlFhKGEudHlwZSl8fCJNZW1vIjtjYXNlIEhhOmI9YS5fcGF5bG9hZDthPWEuX2luaXQ7dHJ5e3JldHVybiBRYShhKGIpKX1jYXRjaChjKXt9fXJldHVybiBudWxsfQpmdW5jdGlvbiBSYShhKXt2YXIgYj1hLnR5cGU7c3dpdGNoKGEudGFnKXtjYXNlIDI0OnJldHVybiJDYWNoZSI7Y2FzZSA5OnJldHVybihiLmRpc3BsYXlOYW1lfHwiQ29udGV4dCIpKyIuQ29uc3VtZXIiO2Nhc2UgMTA6cmV0dXJuKGIuX2NvbnRleHQuZGlzcGxheU5hbWV8fCJDb250ZXh0IikrIi5Qcm92aWRlciI7Y2FzZSAxODpyZXR1cm4iRGVoeWRyYXRlZEZyYWdtZW50IjtjYXNlIDExOnJldHVybiBhPWIucmVuZGVyLGE9YS5kaXNwbGF5TmFtZXx8YS5uYW1lfHwiIixiLmRpc3BsYXlOYW1lfHwoIiIhPT1hPyJGb3J3YXJkUmVmKCIrYSsiKSI6IkZvcndhcmRSZWYiKTtjYXNlIDc6cmV0dXJuIkZyYWdtZW50IjtjYXNlIDU6cmV0dXJuIGI7Y2FzZSA0OnJldHVybiJQb3J0YWwiO2Nhc2UgMzpyZXR1cm4iUm9vdCI7Y2FzZSA2OnJldHVybiJUZXh0IjtjYXNlIDE2OnJldHVybiBRYShiKTtjYXNlIDg6cmV0dXJuIGI9PT16YT8iU3RyaWN0TW9kZSI6Ik1vZGUiO2Nhc2UgMjI6cmV0dXJuIk9mZnNjcmVlbiI7CmNhc2UgMTI6cmV0dXJuIlByb2ZpbGVyIjtjYXNlIDIxOnJldHVybiJTY29wZSI7Y2FzZSAxMzpyZXR1cm4iU3VzcGVuc2UiO2Nhc2UgMTk6cmV0dXJuIlN1c3BlbnNlTGlzdCI7Y2FzZSAyNTpyZXR1cm4iVHJhY2luZ01hcmtlciI7Y2FzZSAxOmNhc2UgMDpjYXNlIDE3OmNhc2UgMjpjYXNlIDE0OmNhc2UgMTU6aWYoImZ1bmN0aW9uIj09PXR5cGVvZiBiKXJldHVybiBiLmRpc3BsYXlOYW1lfHxiLm5hbWV8fG51bGw7aWYoInN0cmluZyI9PT10eXBlb2YgYilyZXR1cm4gYn1yZXR1cm4gbnVsbH1mdW5jdGlvbiBTYShhKXtzd2l0Y2godHlwZW9mIGEpe2Nhc2UgImJvb2xlYW4iOmNhc2UgIm51bWJlciI6Y2FzZSAic3RyaW5nIjpjYXNlICJ1bmRlZmluZWQiOnJldHVybiBhO2Nhc2UgIm9iamVjdCI6cmV0dXJuIGE7ZGVmYXVsdDpyZXR1cm4iIn19CmZ1bmN0aW9uIFRhKGEpe3ZhciBiPWEudHlwZTtyZXR1cm4oYT1hLm5vZGVOYW1lKSYmImlucHV0Ij09PWEudG9Mb3dlckNhc2UoKSYmKCJjaGVja2JveCI9PT1ifHwicmFkaW8iPT09Yil9CmZ1bmN0aW9uIFVhKGEpe3ZhciBiPVRhKGEpPyJjaGVja2VkIjoidmFsdWUiLGM9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihhLmNvbnN0cnVjdG9yLnByb3RvdHlwZSxiKSxkPSIiK2FbYl07aWYoIWEuaGFzT3duUHJvcGVydHkoYikmJiJ1bmRlZmluZWQiIT09dHlwZW9mIGMmJiJmdW5jdGlvbiI9PT10eXBlb2YgYy5nZXQmJiJmdW5jdGlvbiI9PT10eXBlb2YgYy5zZXQpe3ZhciBlPWMuZ2V0LGY9Yy5zZXQ7T2JqZWN0LmRlZmluZVByb3BlcnR5KGEsYix7Y29uZmlndXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBlLmNhbGwodGhpcyl9LHNldDpmdW5jdGlvbihhKXtkPSIiK2E7Zi5jYWxsKHRoaXMsYSl9fSk7T2JqZWN0LmRlZmluZVByb3BlcnR5KGEsYix7ZW51bWVyYWJsZTpjLmVudW1lcmFibGV9KTtyZXR1cm57Z2V0VmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gZH0sc2V0VmFsdWU6ZnVuY3Rpb24oYSl7ZD0iIithfSxzdG9wVHJhY2tpbmc6ZnVuY3Rpb24oKXthLl92YWx1ZVRyYWNrZXI9Cm51bGw7ZGVsZXRlIGFbYl19fX19ZnVuY3Rpb24gVmEoYSl7YS5fdmFsdWVUcmFja2VyfHwoYS5fdmFsdWVUcmFja2VyPVVhKGEpKX1mdW5jdGlvbiBXYShhKXtpZighYSlyZXR1cm4hMTt2YXIgYj1hLl92YWx1ZVRyYWNrZXI7aWYoIWIpcmV0dXJuITA7dmFyIGM9Yi5nZXRWYWx1ZSgpO3ZhciBkPSIiO2EmJihkPVRhKGEpP2EuY2hlY2tlZD8idHJ1ZSI6ImZhbHNlIjphLnZhbHVlKTthPWQ7cmV0dXJuIGEhPT1jPyhiLnNldFZhbHVlKGEpLCEwKTohMX1mdW5jdGlvbiBYYShhKXthPWF8fCgidW5kZWZpbmVkIiE9PXR5cGVvZiBkb2N1bWVudD9kb2N1bWVudDp2b2lkIDApO2lmKCJ1bmRlZmluZWQiPT09dHlwZW9mIGEpcmV0dXJuIG51bGw7dHJ5e3JldHVybiBhLmFjdGl2ZUVsZW1lbnR8fGEuYm9keX1jYXRjaChiKXtyZXR1cm4gYS5ib2R5fX0KZnVuY3Rpb24gWWEoYSxiKXt2YXIgYz1iLmNoZWNrZWQ7cmV0dXJuIEEoe30sYix7ZGVmYXVsdENoZWNrZWQ6dm9pZCAwLGRlZmF1bHRWYWx1ZTp2b2lkIDAsdmFsdWU6dm9pZCAwLGNoZWNrZWQ6bnVsbCE9Yz9jOmEuX3dyYXBwZXJTdGF0ZS5pbml0aWFsQ2hlY2tlZH0pfWZ1bmN0aW9uIFphKGEsYil7dmFyIGM9bnVsbD09Yi5kZWZhdWx0VmFsdWU/IiI6Yi5kZWZhdWx0VmFsdWUsZD1udWxsIT1iLmNoZWNrZWQ/Yi5jaGVja2VkOmIuZGVmYXVsdENoZWNrZWQ7Yz1TYShudWxsIT1iLnZhbHVlP2IudmFsdWU6Yyk7YS5fd3JhcHBlclN0YXRlPXtpbml0aWFsQ2hlY2tlZDpkLGluaXRpYWxWYWx1ZTpjLGNvbnRyb2xsZWQ6ImNoZWNrYm94Ij09PWIudHlwZXx8InJhZGlvIj09PWIudHlwZT9udWxsIT1iLmNoZWNrZWQ6bnVsbCE9Yi52YWx1ZX19ZnVuY3Rpb24gYWIoYSxiKXtiPWIuY2hlY2tlZDtudWxsIT1iJiZ0YShhLCJjaGVja2VkIixiLCExKX0KZnVuY3Rpb24gYmIoYSxiKXthYihhLGIpO3ZhciBjPVNhKGIudmFsdWUpLGQ9Yi50eXBlO2lmKG51bGwhPWMpaWYoIm51bWJlciI9PT1kKXtpZigwPT09YyYmIiI9PT1hLnZhbHVlfHxhLnZhbHVlIT1jKWEudmFsdWU9IiIrY31lbHNlIGEudmFsdWUhPT0iIitjJiYoYS52YWx1ZT0iIitjKTtlbHNlIGlmKCJzdWJtaXQiPT09ZHx8InJlc2V0Ij09PWQpe2EucmVtb3ZlQXR0cmlidXRlKCJ2YWx1ZSIpO3JldHVybn1iLmhhc093blByb3BlcnR5KCJ2YWx1ZSIpP2NiKGEsYi50eXBlLGMpOmIuaGFzT3duUHJvcGVydHkoImRlZmF1bHRWYWx1ZSIpJiZjYihhLGIudHlwZSxTYShiLmRlZmF1bHRWYWx1ZSkpO251bGw9PWIuY2hlY2tlZCYmbnVsbCE9Yi5kZWZhdWx0Q2hlY2tlZCYmKGEuZGVmYXVsdENoZWNrZWQ9ISFiLmRlZmF1bHRDaGVja2VkKX0KZnVuY3Rpb24gZGIoYSxiLGMpe2lmKGIuaGFzT3duUHJvcGVydHkoInZhbHVlIil8fGIuaGFzT3duUHJvcGVydHkoImRlZmF1bHRWYWx1ZSIpKXt2YXIgZD1iLnR5cGU7aWYoISgic3VibWl0IiE9PWQmJiJyZXNldCIhPT1kfHx2b2lkIDAhPT1iLnZhbHVlJiZudWxsIT09Yi52YWx1ZSkpcmV0dXJuO2I9IiIrYS5fd3JhcHBlclN0YXRlLmluaXRpYWxWYWx1ZTtjfHxiPT09YS52YWx1ZXx8KGEudmFsdWU9Yik7YS5kZWZhdWx0VmFsdWU9Yn1jPWEubmFtZTsiIiE9PWMmJihhLm5hbWU9IiIpO2EuZGVmYXVsdENoZWNrZWQ9ISFhLl93cmFwcGVyU3RhdGUuaW5pdGlhbENoZWNrZWQ7IiIhPT1jJiYoYS5uYW1lPWMpfQpmdW5jdGlvbiBjYihhLGIsYyl7aWYoIm51bWJlciIhPT1ifHxYYShhLm93bmVyRG9jdW1lbnQpIT09YSludWxsPT1jP2EuZGVmYXVsdFZhbHVlPSIiK2EuX3dyYXBwZXJTdGF0ZS5pbml0aWFsVmFsdWU6YS5kZWZhdWx0VmFsdWUhPT0iIitjJiYoYS5kZWZhdWx0VmFsdWU9IiIrYyl9dmFyIGViPUFycmF5LmlzQXJyYXk7CmZ1bmN0aW9uIGZiKGEsYixjLGQpe2E9YS5vcHRpb25zO2lmKGIpe2I9e307Zm9yKHZhciBlPTA7ZTxjLmxlbmd0aDtlKyspYlsiJCIrY1tlXV09ITA7Zm9yKGM9MDtjPGEubGVuZ3RoO2MrKyllPWIuaGFzT3duUHJvcGVydHkoIiQiK2FbY10udmFsdWUpLGFbY10uc2VsZWN0ZWQhPT1lJiYoYVtjXS5zZWxlY3RlZD1lKSxlJiZkJiYoYVtjXS5kZWZhdWx0U2VsZWN0ZWQ9ITApfWVsc2V7Yz0iIitTYShjKTtiPW51bGw7Zm9yKGU9MDtlPGEubGVuZ3RoO2UrKyl7aWYoYVtlXS52YWx1ZT09PWMpe2FbZV0uc2VsZWN0ZWQ9ITA7ZCYmKGFbZV0uZGVmYXVsdFNlbGVjdGVkPSEwKTtyZXR1cm59bnVsbCE9PWJ8fGFbZV0uZGlzYWJsZWR8fChiPWFbZV0pfW51bGwhPT1iJiYoYi5zZWxlY3RlZD0hMCl9fQpmdW5jdGlvbiBnYihhLGIpe2lmKG51bGwhPWIuZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwpdGhyb3cgRXJyb3IocCg5MSkpO3JldHVybiBBKHt9LGIse3ZhbHVlOnZvaWQgMCxkZWZhdWx0VmFsdWU6dm9pZCAwLGNoaWxkcmVuOiIiK2EuX3dyYXBwZXJTdGF0ZS5pbml0aWFsVmFsdWV9KX1mdW5jdGlvbiBoYihhLGIpe3ZhciBjPWIudmFsdWU7aWYobnVsbD09Yyl7Yz1iLmNoaWxkcmVuO2I9Yi5kZWZhdWx0VmFsdWU7aWYobnVsbCE9Yyl7aWYobnVsbCE9Yil0aHJvdyBFcnJvcihwKDkyKSk7aWYoZWIoYykpe2lmKDE8Yy5sZW5ndGgpdGhyb3cgRXJyb3IocCg5MykpO2M9Y1swXX1iPWN9bnVsbD09YiYmKGI9IiIpO2M9Yn1hLl93cmFwcGVyU3RhdGU9e2luaXRpYWxWYWx1ZTpTYShjKX19CmZ1bmN0aW9uIGliKGEsYil7dmFyIGM9U2EoYi52YWx1ZSksZD1TYShiLmRlZmF1bHRWYWx1ZSk7bnVsbCE9YyYmKGM9IiIrYyxjIT09YS52YWx1ZSYmKGEudmFsdWU9YyksbnVsbD09Yi5kZWZhdWx0VmFsdWUmJmEuZGVmYXVsdFZhbHVlIT09YyYmKGEuZGVmYXVsdFZhbHVlPWMpKTtudWxsIT1kJiYoYS5kZWZhdWx0VmFsdWU9IiIrZCl9ZnVuY3Rpb24gamIoYSl7dmFyIGI9YS50ZXh0Q29udGVudDtiPT09YS5fd3JhcHBlclN0YXRlLmluaXRpYWxWYWx1ZSYmIiIhPT1iJiZudWxsIT09YiYmKGEudmFsdWU9Yil9ZnVuY3Rpb24ga2IoYSl7c3dpdGNoKGEpe2Nhc2UgInN2ZyI6cmV0dXJuImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIjtjYXNlICJtYXRoIjpyZXR1cm4iaHR0cDovL3d3dy53My5vcmcvMTk5OC9NYXRoL01hdGhNTCI7ZGVmYXVsdDpyZXR1cm4iaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCJ9fQpmdW5jdGlvbiBsYihhLGIpe3JldHVybiBudWxsPT1hfHwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCI9PT1hP2tiKGIpOiJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI9PT1hJiYiZm9yZWlnbk9iamVjdCI9PT1iPyJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sIjphfQp2YXIgbWIsbmI9ZnVuY3Rpb24oYSl7cmV0dXJuInVuZGVmaW5lZCIhPT10eXBlb2YgTVNBcHAmJk1TQXBwLmV4ZWNVbnNhZmVMb2NhbEZ1bmN0aW9uP2Z1bmN0aW9uKGIsYyxkLGUpe01TQXBwLmV4ZWNVbnNhZmVMb2NhbEZ1bmN0aW9uKGZ1bmN0aW9uKCl7cmV0dXJuIGEoYixjLGQsZSl9KX06YX0oZnVuY3Rpb24oYSxiKXtpZigiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIT09YS5uYW1lc3BhY2VVUkl8fCJpbm5lckhUTUwiaW4gYSlhLmlubmVySFRNTD1iO2Vsc2V7bWI9bWJ8fGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoImRpdiIpO21iLmlubmVySFRNTD0iPHN2Zz4iK2IudmFsdWVPZigpLnRvU3RyaW5nKCkrIjwvc3ZnPiI7Zm9yKGI9bWIuZmlyc3RDaGlsZDthLmZpcnN0Q2hpbGQ7KWEucmVtb3ZlQ2hpbGQoYS5maXJzdENoaWxkKTtmb3IoO2IuZmlyc3RDaGlsZDspYS5hcHBlbmRDaGlsZChiLmZpcnN0Q2hpbGQpfX0pOwpmdW5jdGlvbiBvYihhLGIpe2lmKGIpe3ZhciBjPWEuZmlyc3RDaGlsZDtpZihjJiZjPT09YS5sYXN0Q2hpbGQmJjM9PT1jLm5vZGVUeXBlKXtjLm5vZGVWYWx1ZT1iO3JldHVybn19YS50ZXh0Q29udGVudD1ifQp2YXIgcGI9e2FuaW1hdGlvbkl0ZXJhdGlvbkNvdW50OiEwLGFzcGVjdFJhdGlvOiEwLGJvcmRlckltYWdlT3V0c2V0OiEwLGJvcmRlckltYWdlU2xpY2U6ITAsYm9yZGVySW1hZ2VXaWR0aDohMCxib3hGbGV4OiEwLGJveEZsZXhHcm91cDohMCxib3hPcmRpbmFsR3JvdXA6ITAsY29sdW1uQ291bnQ6ITAsY29sdW1uczohMCxmbGV4OiEwLGZsZXhHcm93OiEwLGZsZXhQb3NpdGl2ZTohMCxmbGV4U2hyaW5rOiEwLGZsZXhOZWdhdGl2ZTohMCxmbGV4T3JkZXI6ITAsZ3JpZEFyZWE6ITAsZ3JpZFJvdzohMCxncmlkUm93RW5kOiEwLGdyaWRSb3dTcGFuOiEwLGdyaWRSb3dTdGFydDohMCxncmlkQ29sdW1uOiEwLGdyaWRDb2x1bW5FbmQ6ITAsZ3JpZENvbHVtblNwYW46ITAsZ3JpZENvbHVtblN0YXJ0OiEwLGZvbnRXZWlnaHQ6ITAsbGluZUNsYW1wOiEwLGxpbmVIZWlnaHQ6ITAsb3BhY2l0eTohMCxvcmRlcjohMCxvcnBoYW5zOiEwLHRhYlNpemU6ITAsd2lkb3dzOiEwLHpJbmRleDohMCwKem9vbTohMCxmaWxsT3BhY2l0eTohMCxmbG9vZE9wYWNpdHk6ITAsc3RvcE9wYWNpdHk6ITAsc3Ryb2tlRGFzaGFycmF5OiEwLHN0cm9rZURhc2hvZmZzZXQ6ITAsc3Ryb2tlTWl0ZXJsaW1pdDohMCxzdHJva2VPcGFjaXR5OiEwLHN0cm9rZVdpZHRoOiEwfSxxYj1bIldlYmtpdCIsIm1zIiwiTW96IiwiTyJdO09iamVjdC5rZXlzKHBiKS5mb3JFYWNoKGZ1bmN0aW9uKGEpe3FiLmZvckVhY2goZnVuY3Rpb24oYil7Yj1iK2EuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkrYS5zdWJzdHJpbmcoMSk7cGJbYl09cGJbYV19KX0pO2Z1bmN0aW9uIHJiKGEsYixjKXtyZXR1cm4gbnVsbD09Ynx8ImJvb2xlYW4iPT09dHlwZW9mIGJ8fCIiPT09Yj8iIjpjfHwibnVtYmVyIiE9PXR5cGVvZiBifHwwPT09Ynx8cGIuaGFzT3duUHJvcGVydHkoYSkmJnBiW2FdPygiIitiKS50cmltKCk6YisicHgifQpmdW5jdGlvbiBzYihhLGIpe2E9YS5zdHlsZTtmb3IodmFyIGMgaW4gYilpZihiLmhhc093blByb3BlcnR5KGMpKXt2YXIgZD0wPT09Yy5pbmRleE9mKCItLSIpLGU9cmIoYyxiW2NdLGQpOyJmbG9hdCI9PT1jJiYoYz0iY3NzRmxvYXQiKTtkP2Euc2V0UHJvcGVydHkoYyxlKTphW2NdPWV9fXZhciB0Yj1BKHttZW51aXRlbTohMH0se2FyZWE6ITAsYmFzZTohMCxicjohMCxjb2w6ITAsZW1iZWQ6ITAsaHI6ITAsaW1nOiEwLGlucHV0OiEwLGtleWdlbjohMCxsaW5rOiEwLG1ldGE6ITAscGFyYW06ITAsc291cmNlOiEwLHRyYWNrOiEwLHdicjohMH0pOwpmdW5jdGlvbiB1YihhLGIpe2lmKGIpe2lmKHRiW2FdJiYobnVsbCE9Yi5jaGlsZHJlbnx8bnVsbCE9Yi5kYW5nZXJvdXNseVNldElubmVySFRNTCkpdGhyb3cgRXJyb3IocCgxMzcsYSkpO2lmKG51bGwhPWIuZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwpe2lmKG51bGwhPWIuY2hpbGRyZW4pdGhyb3cgRXJyb3IocCg2MCkpO2lmKCJvYmplY3QiIT09dHlwZW9mIGIuZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUx8fCEoIl9faHRtbCJpbiBiLmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MKSl0aHJvdyBFcnJvcihwKDYxKSk7fWlmKG51bGwhPWIuc3R5bGUmJiJvYmplY3QiIT09dHlwZW9mIGIuc3R5bGUpdGhyb3cgRXJyb3IocCg2MikpO319CmZ1bmN0aW9uIHZiKGEsYil7aWYoLTE9PT1hLmluZGV4T2YoIi0iKSlyZXR1cm4ic3RyaW5nIj09PXR5cGVvZiBiLmlzO3N3aXRjaChhKXtjYXNlICJhbm5vdGF0aW9uLXhtbCI6Y2FzZSAiY29sb3ItcHJvZmlsZSI6Y2FzZSAiZm9udC1mYWNlIjpjYXNlICJmb250LWZhY2Utc3JjIjpjYXNlICJmb250LWZhY2UtdXJpIjpjYXNlICJmb250LWZhY2UtZm9ybWF0IjpjYXNlICJmb250LWZhY2UtbmFtZSI6Y2FzZSAibWlzc2luZy1nbHlwaCI6cmV0dXJuITE7ZGVmYXVsdDpyZXR1cm4hMH19dmFyIHdiPW51bGw7ZnVuY3Rpb24geGIoYSl7YT1hLnRhcmdldHx8YS5zcmNFbGVtZW50fHx3aW5kb3c7YS5jb3JyZXNwb25kaW5nVXNlRWxlbWVudCYmKGE9YS5jb3JyZXNwb25kaW5nVXNlRWxlbWVudCk7cmV0dXJuIDM9PT1hLm5vZGVUeXBlP2EucGFyZW50Tm9kZTphfXZhciB5Yj1udWxsLHpiPW51bGwsQWI9bnVsbDsKZnVuY3Rpb24gQmIoYSl7aWYoYT1DYihhKSl7aWYoImZ1bmN0aW9uIiE9PXR5cGVvZiB5Yil0aHJvdyBFcnJvcihwKDI4MCkpO3ZhciBiPWEuc3RhdGVOb2RlO2ImJihiPURiKGIpLHliKGEuc3RhdGVOb2RlLGEudHlwZSxiKSl9fWZ1bmN0aW9uIEViKGEpe3piP0FiP0FiLnB1c2goYSk6QWI9W2FdOnpiPWF9ZnVuY3Rpb24gRmIoKXtpZih6Yil7dmFyIGE9emIsYj1BYjtBYj16Yj1udWxsO0JiKGEpO2lmKGIpZm9yKGE9MDthPGIubGVuZ3RoO2ErKylCYihiW2FdKX19ZnVuY3Rpb24gR2IoYSxiKXtyZXR1cm4gYShiKX1mdW5jdGlvbiBIYigpe312YXIgSWI9ITE7ZnVuY3Rpb24gSmIoYSxiLGMpe2lmKEliKXJldHVybiBhKGIsYyk7SWI9ITA7dHJ5e3JldHVybiBHYihhLGIsYyl9ZmluYWxseXtpZihJYj0hMSxudWxsIT09emJ8fG51bGwhPT1BYilIYigpLEZiKCl9fQpmdW5jdGlvbiBLYihhLGIpe3ZhciBjPWEuc3RhdGVOb2RlO2lmKG51bGw9PT1jKXJldHVybiBudWxsO3ZhciBkPURiKGMpO2lmKG51bGw9PT1kKXJldHVybiBudWxsO2M9ZFtiXTthOnN3aXRjaChiKXtjYXNlICJvbkNsaWNrIjpjYXNlICJvbkNsaWNrQ2FwdHVyZSI6Y2FzZSAib25Eb3VibGVDbGljayI6Y2FzZSAib25Eb3VibGVDbGlja0NhcHR1cmUiOmNhc2UgIm9uTW91c2VEb3duIjpjYXNlICJvbk1vdXNlRG93bkNhcHR1cmUiOmNhc2UgIm9uTW91c2VNb3ZlIjpjYXNlICJvbk1vdXNlTW92ZUNhcHR1cmUiOmNhc2UgIm9uTW91c2VVcCI6Y2FzZSAib25Nb3VzZVVwQ2FwdHVyZSI6Y2FzZSAib25Nb3VzZUVudGVyIjooZD0hZC5kaXNhYmxlZCl8fChhPWEudHlwZSxkPSEoImJ1dHRvbiI9PT1hfHwiaW5wdXQiPT09YXx8InNlbGVjdCI9PT1hfHwidGV4dGFyZWEiPT09YSkpO2E9IWQ7YnJlYWsgYTtkZWZhdWx0OmE9ITF9aWYoYSlyZXR1cm4gbnVsbDtpZihjJiYiZnVuY3Rpb24iIT09CnR5cGVvZiBjKXRocm93IEVycm9yKHAoMjMxLGIsdHlwZW9mIGMpKTtyZXR1cm4gY312YXIgTGI9ITE7aWYoaWEpdHJ5e3ZhciBNYj17fTtPYmplY3QuZGVmaW5lUHJvcGVydHkoTWIsInBhc3NpdmUiLHtnZXQ6ZnVuY3Rpb24oKXtMYj0hMH19KTt3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigidGVzdCIsTWIsTWIpO3dpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCJ0ZXN0IixNYixNYil9Y2F0Y2goYSl7TGI9ITF9ZnVuY3Rpb24gTmIoYSxiLGMsZCxlLGYsZyxoLGspe3ZhciBsPUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywzKTt0cnl7Yi5hcHBseShjLGwpfWNhdGNoKG0pe3RoaXMub25FcnJvcihtKX19dmFyIE9iPSExLFBiPW51bGwsUWI9ITEsUmI9bnVsbCxTYj17b25FcnJvcjpmdW5jdGlvbihhKXtPYj0hMDtQYj1hfX07ZnVuY3Rpb24gVGIoYSxiLGMsZCxlLGYsZyxoLGspe09iPSExO1BiPW51bGw7TmIuYXBwbHkoU2IsYXJndW1lbnRzKX0KZnVuY3Rpb24gVWIoYSxiLGMsZCxlLGYsZyxoLGspe1RiLmFwcGx5KHRoaXMsYXJndW1lbnRzKTtpZihPYil7aWYoT2Ipe3ZhciBsPVBiO09iPSExO1BiPW51bGx9ZWxzZSB0aHJvdyBFcnJvcihwKDE5OCkpO1FifHwoUWI9ITAsUmI9bCl9fWZ1bmN0aW9uIFZiKGEpe3ZhciBiPWEsYz1hO2lmKGEuYWx0ZXJuYXRlKWZvcig7Yi5yZXR1cm47KWI9Yi5yZXR1cm47ZWxzZXthPWI7ZG8gYj1hLDAhPT0oYi5mbGFncyY0MDk4KSYmKGM9Yi5yZXR1cm4pLGE9Yi5yZXR1cm47d2hpbGUoYSl9cmV0dXJuIDM9PT1iLnRhZz9jOm51bGx9ZnVuY3Rpb24gV2IoYSl7aWYoMTM9PT1hLnRhZyl7dmFyIGI9YS5tZW1vaXplZFN0YXRlO251bGw9PT1iJiYoYT1hLmFsdGVybmF0ZSxudWxsIT09YSYmKGI9YS5tZW1vaXplZFN0YXRlKSk7aWYobnVsbCE9PWIpcmV0dXJuIGIuZGVoeWRyYXRlZH1yZXR1cm4gbnVsbH1mdW5jdGlvbiBYYihhKXtpZihWYihhKSE9PWEpdGhyb3cgRXJyb3IocCgxODgpKTt9CmZ1bmN0aW9uIFliKGEpe3ZhciBiPWEuYWx0ZXJuYXRlO2lmKCFiKXtiPVZiKGEpO2lmKG51bGw9PT1iKXRocm93IEVycm9yKHAoMTg4KSk7cmV0dXJuIGIhPT1hP251bGw6YX1mb3IodmFyIGM9YSxkPWI7Oyl7dmFyIGU9Yy5yZXR1cm47aWYobnVsbD09PWUpYnJlYWs7dmFyIGY9ZS5hbHRlcm5hdGU7aWYobnVsbD09PWYpe2Q9ZS5yZXR1cm47aWYobnVsbCE9PWQpe2M9ZDtjb250aW51ZX1icmVha31pZihlLmNoaWxkPT09Zi5jaGlsZCl7Zm9yKGY9ZS5jaGlsZDtmOyl7aWYoZj09PWMpcmV0dXJuIFhiKGUpLGE7aWYoZj09PWQpcmV0dXJuIFhiKGUpLGI7Zj1mLnNpYmxpbmd9dGhyb3cgRXJyb3IocCgxODgpKTt9aWYoYy5yZXR1cm4hPT1kLnJldHVybiljPWUsZD1mO2Vsc2V7Zm9yKHZhciBnPSExLGg9ZS5jaGlsZDtoOyl7aWYoaD09PWMpe2c9ITA7Yz1lO2Q9ZjticmVha31pZihoPT09ZCl7Zz0hMDtkPWU7Yz1mO2JyZWFrfWg9aC5zaWJsaW5nfWlmKCFnKXtmb3IoaD1mLmNoaWxkO2g7KXtpZihoPT09CmMpe2c9ITA7Yz1mO2Q9ZTticmVha31pZihoPT09ZCl7Zz0hMDtkPWY7Yz1lO2JyZWFrfWg9aC5zaWJsaW5nfWlmKCFnKXRocm93IEVycm9yKHAoMTg5KSk7fX1pZihjLmFsdGVybmF0ZSE9PWQpdGhyb3cgRXJyb3IocCgxOTApKTt9aWYoMyE9PWMudGFnKXRocm93IEVycm9yKHAoMTg4KSk7cmV0dXJuIGMuc3RhdGVOb2RlLmN1cnJlbnQ9PT1jP2E6Yn1mdW5jdGlvbiBaYihhKXthPVliKGEpO3JldHVybiBudWxsIT09YT8kYihhKTpudWxsfWZ1bmN0aW9uICRiKGEpe2lmKDU9PT1hLnRhZ3x8Nj09PWEudGFnKXJldHVybiBhO2ZvcihhPWEuY2hpbGQ7bnVsbCE9PWE7KXt2YXIgYj0kYihhKTtpZihudWxsIT09YilyZXR1cm4gYjthPWEuc2libGluZ31yZXR1cm4gbnVsbH0KdmFyIGFjPWNhLnVuc3RhYmxlX3NjaGVkdWxlQ2FsbGJhY2ssYmM9Y2EudW5zdGFibGVfY2FuY2VsQ2FsbGJhY2ssY2M9Y2EudW5zdGFibGVfc2hvdWxkWWllbGQsZGM9Y2EudW5zdGFibGVfcmVxdWVzdFBhaW50LEI9Y2EudW5zdGFibGVfbm93LGVjPWNhLnVuc3RhYmxlX2dldEN1cnJlbnRQcmlvcml0eUxldmVsLGZjPWNhLnVuc3RhYmxlX0ltbWVkaWF0ZVByaW9yaXR5LGdjPWNhLnVuc3RhYmxlX1VzZXJCbG9ja2luZ1ByaW9yaXR5LGhjPWNhLnVuc3RhYmxlX05vcm1hbFByaW9yaXR5LGljPWNhLnVuc3RhYmxlX0xvd1ByaW9yaXR5LGpjPWNhLnVuc3RhYmxlX0lkbGVQcmlvcml0eSxrYz1udWxsLGxjPW51bGw7ZnVuY3Rpb24gbWMoYSl7aWYobGMmJiJmdW5jdGlvbiI9PT10eXBlb2YgbGMub25Db21taXRGaWJlclJvb3QpdHJ5e2xjLm9uQ29tbWl0RmliZXJSb290KGtjLGEsdm9pZCAwLDEyOD09PShhLmN1cnJlbnQuZmxhZ3MmMTI4KSl9Y2F0Y2goYil7fX0KdmFyIG9jPU1hdGguY2x6MzI/TWF0aC5jbHozMjpuYyxwYz1NYXRoLmxvZyxxYz1NYXRoLkxOMjtmdW5jdGlvbiBuYyhhKXthPj4+PTA7cmV0dXJuIDA9PT1hPzMyOjMxLShwYyhhKS9xY3wwKXwwfXZhciByYz02NCxzYz00MTk0MzA0OwpmdW5jdGlvbiB0YyhhKXtzd2l0Y2goYSYtYSl7Y2FzZSAxOnJldHVybiAxO2Nhc2UgMjpyZXR1cm4gMjtjYXNlIDQ6cmV0dXJuIDQ7Y2FzZSA4OnJldHVybiA4O2Nhc2UgMTY6cmV0dXJuIDE2O2Nhc2UgMzI6cmV0dXJuIDMyO2Nhc2UgNjQ6Y2FzZSAxMjg6Y2FzZSAyNTY6Y2FzZSA1MTI6Y2FzZSAxMDI0OmNhc2UgMjA0ODpjYXNlIDQwOTY6Y2FzZSA4MTkyOmNhc2UgMTYzODQ6Y2FzZSAzMjc2ODpjYXNlIDY1NTM2OmNhc2UgMTMxMDcyOmNhc2UgMjYyMTQ0OmNhc2UgNTI0Mjg4OmNhc2UgMTA0ODU3NjpjYXNlIDIwOTcxNTI6cmV0dXJuIGEmNDE5NDI0MDtjYXNlIDQxOTQzMDQ6Y2FzZSA4Mzg4NjA4OmNhc2UgMTY3NzcyMTY6Y2FzZSAzMzU1NDQzMjpjYXNlIDY3MTA4ODY0OnJldHVybiBhJjEzMDAyMzQyNDtjYXNlIDEzNDIxNzcyODpyZXR1cm4gMTM0MjE3NzI4O2Nhc2UgMjY4NDM1NDU2OnJldHVybiAyNjg0MzU0NTY7Y2FzZSA1MzY4NzA5MTI6cmV0dXJuIDUzNjg3MDkxMjtjYXNlIDEwNzM3NDE4MjQ6cmV0dXJuIDEwNzM3NDE4MjQ7CmRlZmF1bHQ6cmV0dXJuIGF9fWZ1bmN0aW9uIHVjKGEsYil7dmFyIGM9YS5wZW5kaW5nTGFuZXM7aWYoMD09PWMpcmV0dXJuIDA7dmFyIGQ9MCxlPWEuc3VzcGVuZGVkTGFuZXMsZj1hLnBpbmdlZExhbmVzLGc9YyYyNjg0MzU0NTU7aWYoMCE9PWcpe3ZhciBoPWcmfmU7MCE9PWg/ZD10YyhoKTooZiY9ZywwIT09ZiYmKGQ9dGMoZikpKX1lbHNlIGc9YyZ+ZSwwIT09Zz9kPXRjKGcpOjAhPT1mJiYoZD10YyhmKSk7aWYoMD09PWQpcmV0dXJuIDA7aWYoMCE9PWImJmIhPT1kJiYwPT09KGImZSkmJihlPWQmLWQsZj1iJi1iLGU+PWZ8fDE2PT09ZSYmMCE9PShmJjQxOTQyNDApKSlyZXR1cm4gYjswIT09KGQmNCkmJihkfD1jJjE2KTtiPWEuZW50YW5nbGVkTGFuZXM7aWYoMCE9PWIpZm9yKGE9YS5lbnRhbmdsZW1lbnRzLGImPWQ7MDxiOyljPTMxLW9jKGIpLGU9MTw8YyxkfD1hW2NdLGImPX5lO3JldHVybiBkfQpmdW5jdGlvbiB2YyhhLGIpe3N3aXRjaChhKXtjYXNlIDE6Y2FzZSAyOmNhc2UgNDpyZXR1cm4gYisyNTA7Y2FzZSA4OmNhc2UgMTY6Y2FzZSAzMjpjYXNlIDY0OmNhc2UgMTI4OmNhc2UgMjU2OmNhc2UgNTEyOmNhc2UgMTAyNDpjYXNlIDIwNDg6Y2FzZSA0MDk2OmNhc2UgODE5MjpjYXNlIDE2Mzg0OmNhc2UgMzI3Njg6Y2FzZSA2NTUzNjpjYXNlIDEzMTA3MjpjYXNlIDI2MjE0NDpjYXNlIDUyNDI4ODpjYXNlIDEwNDg1NzY6Y2FzZSAyMDk3MTUyOnJldHVybiBiKzVFMztjYXNlIDQxOTQzMDQ6Y2FzZSA4Mzg4NjA4OmNhc2UgMTY3NzcyMTY6Y2FzZSAzMzU1NDQzMjpjYXNlIDY3MTA4ODY0OnJldHVybi0xO2Nhc2UgMTM0MjE3NzI4OmNhc2UgMjY4NDM1NDU2OmNhc2UgNTM2ODcwOTEyOmNhc2UgMTA3Mzc0MTgyNDpyZXR1cm4tMTtkZWZhdWx0OnJldHVybi0xfX0KZnVuY3Rpb24gd2MoYSxiKXtmb3IodmFyIGM9YS5zdXNwZW5kZWRMYW5lcyxkPWEucGluZ2VkTGFuZXMsZT1hLmV4cGlyYXRpb25UaW1lcyxmPWEucGVuZGluZ0xhbmVzOzA8Zjspe3ZhciBnPTMxLW9jKGYpLGg9MTw8ZyxrPWVbZ107aWYoLTE9PT1rKXtpZigwPT09KGgmYyl8fDAhPT0oaCZkKSllW2ddPXZjKGgsYil9ZWxzZSBrPD1iJiYoYS5leHBpcmVkTGFuZXN8PWgpO2YmPX5ofX1mdW5jdGlvbiB4YyhhKXthPWEucGVuZGluZ0xhbmVzJi0xMDczNzQxODI1O3JldHVybiAwIT09YT9hOmEmMTA3Mzc0MTgyND8xMDczNzQxODI0OjB9ZnVuY3Rpb24geWMoKXt2YXIgYT1yYztyYzw8PTE7MD09PShyYyY0MTk0MjQwKSYmKHJjPTY0KTtyZXR1cm4gYX1mdW5jdGlvbiB6YyhhKXtmb3IodmFyIGI9W10sYz0wOzMxPmM7YysrKWIucHVzaChhKTtyZXR1cm4gYn0KZnVuY3Rpb24gQWMoYSxiLGMpe2EucGVuZGluZ0xhbmVzfD1iOzUzNjg3MDkxMiE9PWImJihhLnN1c3BlbmRlZExhbmVzPTAsYS5waW5nZWRMYW5lcz0wKTthPWEuZXZlbnRUaW1lcztiPTMxLW9jKGIpO2FbYl09Y31mdW5jdGlvbiBCYyhhLGIpe3ZhciBjPWEucGVuZGluZ0xhbmVzJn5iO2EucGVuZGluZ0xhbmVzPWI7YS5zdXNwZW5kZWRMYW5lcz0wO2EucGluZ2VkTGFuZXM9MDthLmV4cGlyZWRMYW5lcyY9YjthLm11dGFibGVSZWFkTGFuZXMmPWI7YS5lbnRhbmdsZWRMYW5lcyY9YjtiPWEuZW50YW5nbGVtZW50czt2YXIgZD1hLmV2ZW50VGltZXM7Zm9yKGE9YS5leHBpcmF0aW9uVGltZXM7MDxjOyl7dmFyIGU9MzEtb2MoYyksZj0xPDxlO2JbZV09MDtkW2VdPS0xO2FbZV09LTE7YyY9fmZ9fQpmdW5jdGlvbiBDYyhhLGIpe3ZhciBjPWEuZW50YW5nbGVkTGFuZXN8PWI7Zm9yKGE9YS5lbnRhbmdsZW1lbnRzO2M7KXt2YXIgZD0zMS1vYyhjKSxlPTE8PGQ7ZSZifGFbZF0mYiYmKGFbZF18PWIpO2MmPX5lfX12YXIgQz0wO2Z1bmN0aW9uIERjKGEpe2EmPS1hO3JldHVybiAxPGE/NDxhPzAhPT0oYSYyNjg0MzU0NTUpPzE2OjUzNjg3MDkxMjo0OjF9dmFyIEVjLEZjLEdjLEhjLEljLEpjPSExLEtjPVtdLExjPW51bGwsTWM9bnVsbCxOYz1udWxsLE9jPW5ldyBNYXAsUGM9bmV3IE1hcCxRYz1bXSxSYz0ibW91c2Vkb3duIG1vdXNldXAgdG91Y2hjYW5jZWwgdG91Y2hlbmQgdG91Y2hzdGFydCBhdXhjbGljayBkYmxjbGljayBwb2ludGVyY2FuY2VsIHBvaW50ZXJkb3duIHBvaW50ZXJ1cCBkcmFnZW5kIGRyYWdzdGFydCBkcm9wIGNvbXBvc2l0aW9uZW5kIGNvbXBvc2l0aW9uc3RhcnQga2V5ZG93biBrZXlwcmVzcyBrZXl1cCBpbnB1dCB0ZXh0SW5wdXQgY29weSBjdXQgcGFzdGUgY2xpY2sgY2hhbmdlIGNvbnRleHRtZW51IHJlc2V0IHN1Ym1pdCIuc3BsaXQoIiAiKTsKZnVuY3Rpb24gU2MoYSxiKXtzd2l0Y2goYSl7Y2FzZSAiZm9jdXNpbiI6Y2FzZSAiZm9jdXNvdXQiOkxjPW51bGw7YnJlYWs7Y2FzZSAiZHJhZ2VudGVyIjpjYXNlICJkcmFnbGVhdmUiOk1jPW51bGw7YnJlYWs7Y2FzZSAibW91c2VvdmVyIjpjYXNlICJtb3VzZW91dCI6TmM9bnVsbDticmVhaztjYXNlICJwb2ludGVyb3ZlciI6Y2FzZSAicG9pbnRlcm91dCI6T2MuZGVsZXRlKGIucG9pbnRlcklkKTticmVhaztjYXNlICJnb3Rwb2ludGVyY2FwdHVyZSI6Y2FzZSAibG9zdHBvaW50ZXJjYXB0dXJlIjpQYy5kZWxldGUoYi5wb2ludGVySWQpfX0KZnVuY3Rpb24gVGMoYSxiLGMsZCxlLGYpe2lmKG51bGw9PT1hfHxhLm5hdGl2ZUV2ZW50IT09ZilyZXR1cm4gYT17YmxvY2tlZE9uOmIsZG9tRXZlbnROYW1lOmMsZXZlbnRTeXN0ZW1GbGFnczpkLG5hdGl2ZUV2ZW50OmYsdGFyZ2V0Q29udGFpbmVyczpbZV19LG51bGwhPT1iJiYoYj1DYihiKSxudWxsIT09YiYmRmMoYikpLGE7YS5ldmVudFN5c3RlbUZsYWdzfD1kO2I9YS50YXJnZXRDb250YWluZXJzO251bGwhPT1lJiYtMT09PWIuaW5kZXhPZihlKSYmYi5wdXNoKGUpO3JldHVybiBhfQpmdW5jdGlvbiBVYyhhLGIsYyxkLGUpe3N3aXRjaChiKXtjYXNlICJmb2N1c2luIjpyZXR1cm4gTGM9VGMoTGMsYSxiLGMsZCxlKSwhMDtjYXNlICJkcmFnZW50ZXIiOnJldHVybiBNYz1UYyhNYyxhLGIsYyxkLGUpLCEwO2Nhc2UgIm1vdXNlb3ZlciI6cmV0dXJuIE5jPVRjKE5jLGEsYixjLGQsZSksITA7Y2FzZSAicG9pbnRlcm92ZXIiOnZhciBmPWUucG9pbnRlcklkO09jLnNldChmLFRjKE9jLmdldChmKXx8bnVsbCxhLGIsYyxkLGUpKTtyZXR1cm4hMDtjYXNlICJnb3Rwb2ludGVyY2FwdHVyZSI6cmV0dXJuIGY9ZS5wb2ludGVySWQsUGMuc2V0KGYsVGMoUGMuZ2V0KGYpfHxudWxsLGEsYixjLGQsZSkpLCEwfXJldHVybiExfQpmdW5jdGlvbiBWYyhhKXt2YXIgYj1XYyhhLnRhcmdldCk7aWYobnVsbCE9PWIpe3ZhciBjPVZiKGIpO2lmKG51bGwhPT1jKWlmKGI9Yy50YWcsMTM9PT1iKXtpZihiPVdiKGMpLG51bGwhPT1iKXthLmJsb2NrZWRPbj1iO0ljKGEucHJpb3JpdHksZnVuY3Rpb24oKXtHYyhjKX0pO3JldHVybn19ZWxzZSBpZigzPT09YiYmYy5zdGF0ZU5vZGUuY3VycmVudC5tZW1vaXplZFN0YXRlLmlzRGVoeWRyYXRlZCl7YS5ibG9ja2VkT249Mz09PWMudGFnP2Muc3RhdGVOb2RlLmNvbnRhaW5lckluZm86bnVsbDtyZXR1cm59fWEuYmxvY2tlZE9uPW51bGx9CmZ1bmN0aW9uIFhjKGEpe2lmKG51bGwhPT1hLmJsb2NrZWRPbilyZXR1cm4hMTtmb3IodmFyIGI9YS50YXJnZXRDb250YWluZXJzOzA8Yi5sZW5ndGg7KXt2YXIgYz1ZYyhhLmRvbUV2ZW50TmFtZSxhLmV2ZW50U3lzdGVtRmxhZ3MsYlswXSxhLm5hdGl2ZUV2ZW50KTtpZihudWxsPT09Yyl7Yz1hLm5hdGl2ZUV2ZW50O3ZhciBkPW5ldyBjLmNvbnN0cnVjdG9yKGMudHlwZSxjKTt3Yj1kO2MudGFyZ2V0LmRpc3BhdGNoRXZlbnQoZCk7d2I9bnVsbH1lbHNlIHJldHVybiBiPUNiKGMpLG51bGwhPT1iJiZGYyhiKSxhLmJsb2NrZWRPbj1jLCExO2Iuc2hpZnQoKX1yZXR1cm4hMH1mdW5jdGlvbiBaYyhhLGIsYyl7WGMoYSkmJmMuZGVsZXRlKGIpfWZ1bmN0aW9uICRjKCl7SmM9ITE7bnVsbCE9PUxjJiZYYyhMYykmJihMYz1udWxsKTtudWxsIT09TWMmJlhjKE1jKSYmKE1jPW51bGwpO251bGwhPT1OYyYmWGMoTmMpJiYoTmM9bnVsbCk7T2MuZm9yRWFjaChaYyk7UGMuZm9yRWFjaChaYyl9CmZ1bmN0aW9uIGFkKGEsYil7YS5ibG9ja2VkT249PT1iJiYoYS5ibG9ja2VkT249bnVsbCxKY3x8KEpjPSEwLGNhLnVuc3RhYmxlX3NjaGVkdWxlQ2FsbGJhY2soY2EudW5zdGFibGVfTm9ybWFsUHJpb3JpdHksJGMpKSl9CmZ1bmN0aW9uIGJkKGEpe2Z1bmN0aW9uIGIoYil7cmV0dXJuIGFkKGIsYSl9aWYoMDxLYy5sZW5ndGgpe2FkKEtjWzBdLGEpO2Zvcih2YXIgYz0xO2M8S2MubGVuZ3RoO2MrKyl7dmFyIGQ9S2NbY107ZC5ibG9ja2VkT249PT1hJiYoZC5ibG9ja2VkT249bnVsbCl9fW51bGwhPT1MYyYmYWQoTGMsYSk7bnVsbCE9PU1jJiZhZChNYyxhKTtudWxsIT09TmMmJmFkKE5jLGEpO09jLmZvckVhY2goYik7UGMuZm9yRWFjaChiKTtmb3IoYz0wO2M8UWMubGVuZ3RoO2MrKylkPVFjW2NdLGQuYmxvY2tlZE9uPT09YSYmKGQuYmxvY2tlZE9uPW51bGwpO2Zvcig7MDxRYy5sZW5ndGgmJihjPVFjWzBdLG51bGw9PT1jLmJsb2NrZWRPbik7KVZjKGMpLG51bGw9PT1jLmJsb2NrZWRPbiYmUWMuc2hpZnQoKX12YXIgY2Q9dWEuUmVhY3RDdXJyZW50QmF0Y2hDb25maWcsZGQ9ITA7CmZ1bmN0aW9uIGVkKGEsYixjLGQpe3ZhciBlPUMsZj1jZC50cmFuc2l0aW9uO2NkLnRyYW5zaXRpb249bnVsbDt0cnl7Qz0xLGZkKGEsYixjLGQpfWZpbmFsbHl7Qz1lLGNkLnRyYW5zaXRpb249Zn19ZnVuY3Rpb24gZ2QoYSxiLGMsZCl7dmFyIGU9QyxmPWNkLnRyYW5zaXRpb247Y2QudHJhbnNpdGlvbj1udWxsO3RyeXtDPTQsZmQoYSxiLGMsZCl9ZmluYWxseXtDPWUsY2QudHJhbnNpdGlvbj1mfX0KZnVuY3Rpb24gZmQoYSxiLGMsZCl7aWYoZGQpe3ZhciBlPVljKGEsYixjLGQpO2lmKG51bGw9PT1lKWhkKGEsYixkLGlkLGMpLFNjKGEsZCk7ZWxzZSBpZihVYyhlLGEsYixjLGQpKWQuc3RvcFByb3BhZ2F0aW9uKCk7ZWxzZSBpZihTYyhhLGQpLGImNCYmLTE8UmMuaW5kZXhPZihhKSl7Zm9yKDtudWxsIT09ZTspe3ZhciBmPUNiKGUpO251bGwhPT1mJiZFYyhmKTtmPVljKGEsYixjLGQpO251bGw9PT1mJiZoZChhLGIsZCxpZCxjKTtpZihmPT09ZSlicmVhaztlPWZ9bnVsbCE9PWUmJmQuc3RvcFByb3BhZ2F0aW9uKCl9ZWxzZSBoZChhLGIsZCxudWxsLGMpfX12YXIgaWQ9bnVsbDsKZnVuY3Rpb24gWWMoYSxiLGMsZCl7aWQ9bnVsbDthPXhiKGQpO2E9V2MoYSk7aWYobnVsbCE9PWEpaWYoYj1WYihhKSxudWxsPT09YilhPW51bGw7ZWxzZSBpZihjPWIudGFnLDEzPT09Yyl7YT1XYihiKTtpZihudWxsIT09YSlyZXR1cm4gYTthPW51bGx9ZWxzZSBpZigzPT09Yyl7aWYoYi5zdGF0ZU5vZGUuY3VycmVudC5tZW1vaXplZFN0YXRlLmlzRGVoeWRyYXRlZClyZXR1cm4gMz09PWIudGFnP2Iuc3RhdGVOb2RlLmNvbnRhaW5lckluZm86bnVsbDthPW51bGx9ZWxzZSBiIT09YSYmKGE9bnVsbCk7aWQ9YTtyZXR1cm4gbnVsbH0KZnVuY3Rpb24gamQoYSl7c3dpdGNoKGEpe2Nhc2UgImNhbmNlbCI6Y2FzZSAiY2xpY2siOmNhc2UgImNsb3NlIjpjYXNlICJjb250ZXh0bWVudSI6Y2FzZSAiY29weSI6Y2FzZSAiY3V0IjpjYXNlICJhdXhjbGljayI6Y2FzZSAiZGJsY2xpY2siOmNhc2UgImRyYWdlbmQiOmNhc2UgImRyYWdzdGFydCI6Y2FzZSAiZHJvcCI6Y2FzZSAiZm9jdXNpbiI6Y2FzZSAiZm9jdXNvdXQiOmNhc2UgImlucHV0IjpjYXNlICJpbnZhbGlkIjpjYXNlICJrZXlkb3duIjpjYXNlICJrZXlwcmVzcyI6Y2FzZSAia2V5dXAiOmNhc2UgIm1vdXNlZG93biI6Y2FzZSAibW91c2V1cCI6Y2FzZSAicGFzdGUiOmNhc2UgInBhdXNlIjpjYXNlICJwbGF5IjpjYXNlICJwb2ludGVyY2FuY2VsIjpjYXNlICJwb2ludGVyZG93biI6Y2FzZSAicG9pbnRlcnVwIjpjYXNlICJyYXRlY2hhbmdlIjpjYXNlICJyZXNldCI6Y2FzZSAicmVzaXplIjpjYXNlICJzZWVrZWQiOmNhc2UgInN1Ym1pdCI6Y2FzZSAidG91Y2hjYW5jZWwiOmNhc2UgInRvdWNoZW5kIjpjYXNlICJ0b3VjaHN0YXJ0IjpjYXNlICJ2b2x1bWVjaGFuZ2UiOmNhc2UgImNoYW5nZSI6Y2FzZSAic2VsZWN0aW9uY2hhbmdlIjpjYXNlICJ0ZXh0SW5wdXQiOmNhc2UgImNvbXBvc2l0aW9uc3RhcnQiOmNhc2UgImNvbXBvc2l0aW9uZW5kIjpjYXNlICJjb21wb3NpdGlvbnVwZGF0ZSI6Y2FzZSAiYmVmb3JlYmx1ciI6Y2FzZSAiYWZ0ZXJibHVyIjpjYXNlICJiZWZvcmVpbnB1dCI6Y2FzZSAiYmx1ciI6Y2FzZSAiZnVsbHNjcmVlbmNoYW5nZSI6Y2FzZSAiZm9jdXMiOmNhc2UgImhhc2hjaGFuZ2UiOmNhc2UgInBvcHN0YXRlIjpjYXNlICJzZWxlY3QiOmNhc2UgInNlbGVjdHN0YXJ0IjpyZXR1cm4gMTtjYXNlICJkcmFnIjpjYXNlICJkcmFnZW50ZXIiOmNhc2UgImRyYWdleGl0IjpjYXNlICJkcmFnbGVhdmUiOmNhc2UgImRyYWdvdmVyIjpjYXNlICJtb3VzZW1vdmUiOmNhc2UgIm1vdXNlb3V0IjpjYXNlICJtb3VzZW92ZXIiOmNhc2UgInBvaW50ZXJtb3ZlIjpjYXNlICJwb2ludGVyb3V0IjpjYXNlICJwb2ludGVyb3ZlciI6Y2FzZSAic2Nyb2xsIjpjYXNlICJ0b2dnbGUiOmNhc2UgInRvdWNobW92ZSI6Y2FzZSAid2hlZWwiOmNhc2UgIm1vdXNlZW50ZXIiOmNhc2UgIm1vdXNlbGVhdmUiOmNhc2UgInBvaW50ZXJlbnRlciI6Y2FzZSAicG9pbnRlcmxlYXZlIjpyZXR1cm4gNDsKY2FzZSAibWVzc2FnZSI6c3dpdGNoKGVjKCkpe2Nhc2UgZmM6cmV0dXJuIDE7Y2FzZSBnYzpyZXR1cm4gNDtjYXNlIGhjOmNhc2UgaWM6cmV0dXJuIDE2O2Nhc2UgamM6cmV0dXJuIDUzNjg3MDkxMjtkZWZhdWx0OnJldHVybiAxNn1kZWZhdWx0OnJldHVybiAxNn19dmFyIGtkPW51bGwsbGQ9bnVsbCxtZD1udWxsO2Z1bmN0aW9uIG5kKCl7aWYobWQpcmV0dXJuIG1kO3ZhciBhLGI9bGQsYz1iLmxlbmd0aCxkLGU9InZhbHVlImluIGtkP2tkLnZhbHVlOmtkLnRleHRDb250ZW50LGY9ZS5sZW5ndGg7Zm9yKGE9MDthPGMmJmJbYV09PT1lW2FdO2ErKyk7dmFyIGc9Yy1hO2ZvcihkPTE7ZDw9ZyYmYltjLWRdPT09ZVtmLWRdO2QrKyk7cmV0dXJuIG1kPWUuc2xpY2UoYSwxPGQ/MS1kOnZvaWQgMCl9CmZ1bmN0aW9uIG9kKGEpe3ZhciBiPWEua2V5Q29kZTsiY2hhckNvZGUiaW4gYT8oYT1hLmNoYXJDb2RlLDA9PT1hJiYxMz09PWImJihhPTEzKSk6YT1iOzEwPT09YSYmKGE9MTMpO3JldHVybiAzMjw9YXx8MTM9PT1hP2E6MH1mdW5jdGlvbiBwZCgpe3JldHVybiEwfWZ1bmN0aW9uIHFkKCl7cmV0dXJuITF9CmZ1bmN0aW9uIHJkKGEpe2Z1bmN0aW9uIGIoYixkLGUsZixnKXt0aGlzLl9yZWFjdE5hbWU9Yjt0aGlzLl90YXJnZXRJbnN0PWU7dGhpcy50eXBlPWQ7dGhpcy5uYXRpdmVFdmVudD1mO3RoaXMudGFyZ2V0PWc7dGhpcy5jdXJyZW50VGFyZ2V0PW51bGw7Zm9yKHZhciBjIGluIGEpYS5oYXNPd25Qcm9wZXJ0eShjKSYmKGI9YVtjXSx0aGlzW2NdPWI/YihmKTpmW2NdKTt0aGlzLmlzRGVmYXVsdFByZXZlbnRlZD0obnVsbCE9Zi5kZWZhdWx0UHJldmVudGVkP2YuZGVmYXVsdFByZXZlbnRlZDohMT09PWYucmV0dXJuVmFsdWUpP3BkOnFkO3RoaXMuaXNQcm9wYWdhdGlvblN0b3BwZWQ9cWQ7cmV0dXJuIHRoaXN9QShiLnByb3RvdHlwZSx7cHJldmVudERlZmF1bHQ6ZnVuY3Rpb24oKXt0aGlzLmRlZmF1bHRQcmV2ZW50ZWQ9ITA7dmFyIGE9dGhpcy5uYXRpdmVFdmVudDthJiYoYS5wcmV2ZW50RGVmYXVsdD9hLnByZXZlbnREZWZhdWx0KCk6InVua25vd24iIT09dHlwZW9mIGEucmV0dXJuVmFsdWUmJgooYS5yZXR1cm5WYWx1ZT0hMSksdGhpcy5pc0RlZmF1bHRQcmV2ZW50ZWQ9cGQpfSxzdG9wUHJvcGFnYXRpb246ZnVuY3Rpb24oKXt2YXIgYT10aGlzLm5hdGl2ZUV2ZW50O2EmJihhLnN0b3BQcm9wYWdhdGlvbj9hLnN0b3BQcm9wYWdhdGlvbigpOiJ1bmtub3duIiE9PXR5cGVvZiBhLmNhbmNlbEJ1YmJsZSYmKGEuY2FuY2VsQnViYmxlPSEwKSx0aGlzLmlzUHJvcGFnYXRpb25TdG9wcGVkPXBkKX0scGVyc2lzdDpmdW5jdGlvbigpe30saXNQZXJzaXN0ZW50OnBkfSk7cmV0dXJuIGJ9CnZhciBzZD17ZXZlbnRQaGFzZTowLGJ1YmJsZXM6MCxjYW5jZWxhYmxlOjAsdGltZVN0YW1wOmZ1bmN0aW9uKGEpe3JldHVybiBhLnRpbWVTdGFtcHx8RGF0ZS5ub3coKX0sZGVmYXVsdFByZXZlbnRlZDowLGlzVHJ1c3RlZDowfSx0ZD1yZChzZCksdWQ9QSh7fSxzZCx7dmlldzowLGRldGFpbDowfSksdmQ9cmQodWQpLHdkLHhkLHlkLEFkPUEoe30sdWQse3NjcmVlblg6MCxzY3JlZW5ZOjAsY2xpZW50WDowLGNsaWVudFk6MCxwYWdlWDowLHBhZ2VZOjAsY3RybEtleTowLHNoaWZ0S2V5OjAsYWx0S2V5OjAsbWV0YUtleTowLGdldE1vZGlmaWVyU3RhdGU6emQsYnV0dG9uOjAsYnV0dG9uczowLHJlbGF0ZWRUYXJnZXQ6ZnVuY3Rpb24oYSl7cmV0dXJuIHZvaWQgMD09PWEucmVsYXRlZFRhcmdldD9hLmZyb21FbGVtZW50PT09YS5zcmNFbGVtZW50P2EudG9FbGVtZW50OmEuZnJvbUVsZW1lbnQ6YS5yZWxhdGVkVGFyZ2V0fSxtb3ZlbWVudFg6ZnVuY3Rpb24oYSl7aWYoIm1vdmVtZW50WCJpbgphKXJldHVybiBhLm1vdmVtZW50WDthIT09eWQmJih5ZCYmIm1vdXNlbW92ZSI9PT1hLnR5cGU/KHdkPWEuc2NyZWVuWC15ZC5zY3JlZW5YLHhkPWEuc2NyZWVuWS15ZC5zY3JlZW5ZKTp4ZD13ZD0wLHlkPWEpO3JldHVybiB3ZH0sbW92ZW1lbnRZOmZ1bmN0aW9uKGEpe3JldHVybiJtb3ZlbWVudFkiaW4gYT9hLm1vdmVtZW50WTp4ZH19KSxCZD1yZChBZCksQ2Q9QSh7fSxBZCx7ZGF0YVRyYW5zZmVyOjB9KSxEZD1yZChDZCksRWQ9QSh7fSx1ZCx7cmVsYXRlZFRhcmdldDowfSksRmQ9cmQoRWQpLEdkPUEoe30sc2Qse2FuaW1hdGlvbk5hbWU6MCxlbGFwc2VkVGltZTowLHBzZXVkb0VsZW1lbnQ6MH0pLEhkPXJkKEdkKSxJZD1BKHt9LHNkLHtjbGlwYm9hcmREYXRhOmZ1bmN0aW9uKGEpe3JldHVybiJjbGlwYm9hcmREYXRhImluIGE/YS5jbGlwYm9hcmREYXRhOndpbmRvdy5jbGlwYm9hcmREYXRhfX0pLEpkPXJkKElkKSxLZD1BKHt9LHNkLHtkYXRhOjB9KSxMZD1yZChLZCksTWQ9e0VzYzoiRXNjYXBlIiwKU3BhY2ViYXI6IiAiLExlZnQ6IkFycm93TGVmdCIsVXA6IkFycm93VXAiLFJpZ2h0OiJBcnJvd1JpZ2h0IixEb3duOiJBcnJvd0Rvd24iLERlbDoiRGVsZXRlIixXaW46Ik9TIixNZW51OiJDb250ZXh0TWVudSIsQXBwczoiQ29udGV4dE1lbnUiLFNjcm9sbDoiU2Nyb2xsTG9jayIsTW96UHJpbnRhYmxlS2V5OiJVbmlkZW50aWZpZWQifSxOZD17ODoiQmFja3NwYWNlIiw5OiJUYWIiLDEyOiJDbGVhciIsMTM6IkVudGVyIiwxNjoiU2hpZnQiLDE3OiJDb250cm9sIiwxODoiQWx0IiwxOToiUGF1c2UiLDIwOiJDYXBzTG9jayIsMjc6IkVzY2FwZSIsMzI6IiAiLDMzOiJQYWdlVXAiLDM0OiJQYWdlRG93biIsMzU6IkVuZCIsMzY6IkhvbWUiLDM3OiJBcnJvd0xlZnQiLDM4OiJBcnJvd1VwIiwzOToiQXJyb3dSaWdodCIsNDA6IkFycm93RG93biIsNDU6Ikluc2VydCIsNDY6IkRlbGV0ZSIsMTEyOiJGMSIsMTEzOiJGMiIsMTE0OiJGMyIsMTE1OiJGNCIsMTE2OiJGNSIsMTE3OiJGNiIsMTE4OiJGNyIsCjExOToiRjgiLDEyMDoiRjkiLDEyMToiRjEwIiwxMjI6IkYxMSIsMTIzOiJGMTIiLDE0NDoiTnVtTG9jayIsMTQ1OiJTY3JvbGxMb2NrIiwyMjQ6Ik1ldGEifSxPZD17QWx0OiJhbHRLZXkiLENvbnRyb2w6ImN0cmxLZXkiLE1ldGE6Im1ldGFLZXkiLFNoaWZ0OiJzaGlmdEtleSJ9O2Z1bmN0aW9uIFBkKGEpe3ZhciBiPXRoaXMubmF0aXZlRXZlbnQ7cmV0dXJuIGIuZ2V0TW9kaWZpZXJTdGF0ZT9iLmdldE1vZGlmaWVyU3RhdGUoYSk6KGE9T2RbYV0pPyEhYlthXTohMX1mdW5jdGlvbiB6ZCgpe3JldHVybiBQZH0KdmFyIFFkPUEoe30sdWQse2tleTpmdW5jdGlvbihhKXtpZihhLmtleSl7dmFyIGI9TWRbYS5rZXldfHxhLmtleTtpZigiVW5pZGVudGlmaWVkIiE9PWIpcmV0dXJuIGJ9cmV0dXJuImtleXByZXNzIj09PWEudHlwZT8oYT1vZChhKSwxMz09PWE/IkVudGVyIjpTdHJpbmcuZnJvbUNoYXJDb2RlKGEpKToia2V5ZG93biI9PT1hLnR5cGV8fCJrZXl1cCI9PT1hLnR5cGU/TmRbYS5rZXlDb2RlXXx8IlVuaWRlbnRpZmllZCI6IiJ9LGNvZGU6MCxsb2NhdGlvbjowLGN0cmxLZXk6MCxzaGlmdEtleTowLGFsdEtleTowLG1ldGFLZXk6MCxyZXBlYXQ6MCxsb2NhbGU6MCxnZXRNb2RpZmllclN0YXRlOnpkLGNoYXJDb2RlOmZ1bmN0aW9uKGEpe3JldHVybiJrZXlwcmVzcyI9PT1hLnR5cGU/b2QoYSk6MH0sa2V5Q29kZTpmdW5jdGlvbihhKXtyZXR1cm4ia2V5ZG93biI9PT1hLnR5cGV8fCJrZXl1cCI9PT1hLnR5cGU/YS5rZXlDb2RlOjB9LHdoaWNoOmZ1bmN0aW9uKGEpe3JldHVybiJrZXlwcmVzcyI9PT0KYS50eXBlP29kKGEpOiJrZXlkb3duIj09PWEudHlwZXx8ImtleXVwIj09PWEudHlwZT9hLmtleUNvZGU6MH19KSxSZD1yZChRZCksU2Q9QSh7fSxBZCx7cG9pbnRlcklkOjAsd2lkdGg6MCxoZWlnaHQ6MCxwcmVzc3VyZTowLHRhbmdlbnRpYWxQcmVzc3VyZTowLHRpbHRYOjAsdGlsdFk6MCx0d2lzdDowLHBvaW50ZXJUeXBlOjAsaXNQcmltYXJ5OjB9KSxUZD1yZChTZCksVWQ9QSh7fSx1ZCx7dG91Y2hlczowLHRhcmdldFRvdWNoZXM6MCxjaGFuZ2VkVG91Y2hlczowLGFsdEtleTowLG1ldGFLZXk6MCxjdHJsS2V5OjAsc2hpZnRLZXk6MCxnZXRNb2RpZmllclN0YXRlOnpkfSksVmQ9cmQoVWQpLFdkPUEoe30sc2Qse3Byb3BlcnR5TmFtZTowLGVsYXBzZWRUaW1lOjAscHNldWRvRWxlbWVudDowfSksWGQ9cmQoV2QpLFlkPUEoe30sQWQse2RlbHRhWDpmdW5jdGlvbihhKXtyZXR1cm4iZGVsdGFYImluIGE/YS5kZWx0YVg6IndoZWVsRGVsdGFYImluIGE/LWEud2hlZWxEZWx0YVg6MH0sCmRlbHRhWTpmdW5jdGlvbihhKXtyZXR1cm4iZGVsdGFZImluIGE/YS5kZWx0YVk6IndoZWVsRGVsdGFZImluIGE/LWEud2hlZWxEZWx0YVk6IndoZWVsRGVsdGEiaW4gYT8tYS53aGVlbERlbHRhOjB9LGRlbHRhWjowLGRlbHRhTW9kZTowfSksWmQ9cmQoWWQpLCRkPVs5LDEzLDI3LDMyXSxhZT1pYSYmIkNvbXBvc2l0aW9uRXZlbnQiaW4gd2luZG93LGJlPW51bGw7aWEmJiJkb2N1bWVudE1vZGUiaW4gZG9jdW1lbnQmJihiZT1kb2N1bWVudC5kb2N1bWVudE1vZGUpO3ZhciBjZT1pYSYmIlRleHRFdmVudCJpbiB3aW5kb3cmJiFiZSxkZT1pYSYmKCFhZXx8YmUmJjg8YmUmJjExPj1iZSksZWU9U3RyaW5nLmZyb21DaGFyQ29kZSgzMiksZmU9ITE7CmZ1bmN0aW9uIGdlKGEsYil7c3dpdGNoKGEpe2Nhc2UgImtleXVwIjpyZXR1cm4tMSE9PSRkLmluZGV4T2YoYi5rZXlDb2RlKTtjYXNlICJrZXlkb3duIjpyZXR1cm4gMjI5IT09Yi5rZXlDb2RlO2Nhc2UgImtleXByZXNzIjpjYXNlICJtb3VzZWRvd24iOmNhc2UgImZvY3Vzb3V0IjpyZXR1cm4hMDtkZWZhdWx0OnJldHVybiExfX1mdW5jdGlvbiBoZShhKXthPWEuZGV0YWlsO3JldHVybiJvYmplY3QiPT09dHlwZW9mIGEmJiJkYXRhImluIGE/YS5kYXRhOm51bGx9dmFyIGllPSExO2Z1bmN0aW9uIGplKGEsYil7c3dpdGNoKGEpe2Nhc2UgImNvbXBvc2l0aW9uZW5kIjpyZXR1cm4gaGUoYik7Y2FzZSAia2V5cHJlc3MiOmlmKDMyIT09Yi53aGljaClyZXR1cm4gbnVsbDtmZT0hMDtyZXR1cm4gZWU7Y2FzZSAidGV4dElucHV0IjpyZXR1cm4gYT1iLmRhdGEsYT09PWVlJiZmZT9udWxsOmE7ZGVmYXVsdDpyZXR1cm4gbnVsbH19CmZ1bmN0aW9uIGtlKGEsYil7aWYoaWUpcmV0dXJuImNvbXBvc2l0aW9uZW5kIj09PWF8fCFhZSYmZ2UoYSxiKT8oYT1uZCgpLG1kPWxkPWtkPW51bGwsaWU9ITEsYSk6bnVsbDtzd2l0Y2goYSl7Y2FzZSAicGFzdGUiOnJldHVybiBudWxsO2Nhc2UgImtleXByZXNzIjppZighKGIuY3RybEtleXx8Yi5hbHRLZXl8fGIubWV0YUtleSl8fGIuY3RybEtleSYmYi5hbHRLZXkpe2lmKGIuY2hhciYmMTxiLmNoYXIubGVuZ3RoKXJldHVybiBiLmNoYXI7aWYoYi53aGljaClyZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShiLndoaWNoKX1yZXR1cm4gbnVsbDtjYXNlICJjb21wb3NpdGlvbmVuZCI6cmV0dXJuIGRlJiYia28iIT09Yi5sb2NhbGU/bnVsbDpiLmRhdGE7ZGVmYXVsdDpyZXR1cm4gbnVsbH19CnZhciBsZT17Y29sb3I6ITAsZGF0ZTohMCxkYXRldGltZTohMCwiZGF0ZXRpbWUtbG9jYWwiOiEwLGVtYWlsOiEwLG1vbnRoOiEwLG51bWJlcjohMCxwYXNzd29yZDohMCxyYW5nZTohMCxzZWFyY2g6ITAsdGVsOiEwLHRleHQ6ITAsdGltZTohMCx1cmw6ITAsd2VlazohMH07ZnVuY3Rpb24gbWUoYSl7dmFyIGI9YSYmYS5ub2RlTmFtZSYmYS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO3JldHVybiJpbnB1dCI9PT1iPyEhbGVbYS50eXBlXToidGV4dGFyZWEiPT09Yj8hMDohMX1mdW5jdGlvbiBuZShhLGIsYyxkKXtFYihkKTtiPW9lKGIsIm9uQ2hhbmdlIik7MDxiLmxlbmd0aCYmKGM9bmV3IHRkKCJvbkNoYW5nZSIsImNoYW5nZSIsbnVsbCxjLGQpLGEucHVzaCh7ZXZlbnQ6YyxsaXN0ZW5lcnM6Yn0pKX12YXIgcGU9bnVsbCxxZT1udWxsO2Z1bmN0aW9uIHJlKGEpe3NlKGEsMCl9ZnVuY3Rpb24gdGUoYSl7dmFyIGI9dWUoYSk7aWYoV2EoYikpcmV0dXJuIGF9CmZ1bmN0aW9uIHZlKGEsYil7aWYoImNoYW5nZSI9PT1hKXJldHVybiBifXZhciB3ZT0hMTtpZihpYSl7dmFyIHhlO2lmKGlhKXt2YXIgeWU9Im9uaW5wdXQiaW4gZG9jdW1lbnQ7aWYoIXllKXt2YXIgemU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgiZGl2Iik7emUuc2V0QXR0cmlidXRlKCJvbmlucHV0IiwicmV0dXJuOyIpO3llPSJmdW5jdGlvbiI9PT10eXBlb2YgemUub25pbnB1dH14ZT15ZX1lbHNlIHhlPSExO3dlPXhlJiYoIWRvY3VtZW50LmRvY3VtZW50TW9kZXx8OTxkb2N1bWVudC5kb2N1bWVudE1vZGUpfWZ1bmN0aW9uIEFlKCl7cGUmJihwZS5kZXRhY2hFdmVudCgib25wcm9wZXJ0eWNoYW5nZSIsQmUpLHFlPXBlPW51bGwpfWZ1bmN0aW9uIEJlKGEpe2lmKCJ2YWx1ZSI9PT1hLnByb3BlcnR5TmFtZSYmdGUocWUpKXt2YXIgYj1bXTtuZShiLHFlLGEseGIoYSkpO0piKHJlLGIpfX0KZnVuY3Rpb24gQ2UoYSxiLGMpeyJmb2N1c2luIj09PWE/KEFlKCkscGU9YixxZT1jLHBlLmF0dGFjaEV2ZW50KCJvbnByb3BlcnR5Y2hhbmdlIixCZSkpOiJmb2N1c291dCI9PT1hJiZBZSgpfWZ1bmN0aW9uIERlKGEpe2lmKCJzZWxlY3Rpb25jaGFuZ2UiPT09YXx8ImtleXVwIj09PWF8fCJrZXlkb3duIj09PWEpcmV0dXJuIHRlKHFlKX1mdW5jdGlvbiBFZShhLGIpe2lmKCJjbGljayI9PT1hKXJldHVybiB0ZShiKX1mdW5jdGlvbiBGZShhLGIpe2lmKCJpbnB1dCI9PT1hfHwiY2hhbmdlIj09PWEpcmV0dXJuIHRlKGIpfWZ1bmN0aW9uIEdlKGEsYil7cmV0dXJuIGE9PT1iJiYoMCE9PWF8fDEvYT09PTEvYil8fGEhPT1hJiZiIT09Yn12YXIgSGU9ImZ1bmN0aW9uIj09PXR5cGVvZiBPYmplY3QuaXM/T2JqZWN0LmlzOkdlOwpmdW5jdGlvbiBJZShhLGIpe2lmKEhlKGEsYikpcmV0dXJuITA7aWYoIm9iamVjdCIhPT10eXBlb2YgYXx8bnVsbD09PWF8fCJvYmplY3QiIT09dHlwZW9mIGJ8fG51bGw9PT1iKXJldHVybiExO3ZhciBjPU9iamVjdC5rZXlzKGEpLGQ9T2JqZWN0LmtleXMoYik7aWYoYy5sZW5ndGghPT1kLmxlbmd0aClyZXR1cm4hMTtmb3IoZD0wO2Q8Yy5sZW5ndGg7ZCsrKXt2YXIgZT1jW2RdO2lmKCFqYS5jYWxsKGIsZSl8fCFIZShhW2VdLGJbZV0pKXJldHVybiExfXJldHVybiEwfWZ1bmN0aW9uIEplKGEpe2Zvcig7YSYmYS5maXJzdENoaWxkOylhPWEuZmlyc3RDaGlsZDtyZXR1cm4gYX0KZnVuY3Rpb24gS2UoYSxiKXt2YXIgYz1KZShhKTthPTA7Zm9yKHZhciBkO2M7KXtpZigzPT09Yy5ub2RlVHlwZSl7ZD1hK2MudGV4dENvbnRlbnQubGVuZ3RoO2lmKGE8PWImJmQ+PWIpcmV0dXJue25vZGU6YyxvZmZzZXQ6Yi1hfTthPWR9YTp7Zm9yKDtjOyl7aWYoYy5uZXh0U2libGluZyl7Yz1jLm5leHRTaWJsaW5nO2JyZWFrIGF9Yz1jLnBhcmVudE5vZGV9Yz12b2lkIDB9Yz1KZShjKX19ZnVuY3Rpb24gTGUoYSxiKXtyZXR1cm4gYSYmYj9hPT09Yj8hMDphJiYzPT09YS5ub2RlVHlwZT8hMTpiJiYzPT09Yi5ub2RlVHlwZT9MZShhLGIucGFyZW50Tm9kZSk6ImNvbnRhaW5zImluIGE/YS5jb250YWlucyhiKTphLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uPyEhKGEuY29tcGFyZURvY3VtZW50UG9zaXRpb24oYikmMTYpOiExOiExfQpmdW5jdGlvbiBNZSgpe2Zvcih2YXIgYT13aW5kb3csYj1YYSgpO2IgaW5zdGFuY2VvZiBhLkhUTUxJRnJhbWVFbGVtZW50Oyl7dHJ5e3ZhciBjPSJzdHJpbmciPT09dHlwZW9mIGIuY29udGVudFdpbmRvdy5sb2NhdGlvbi5ocmVmfWNhdGNoKGQpe2M9ITF9aWYoYylhPWIuY29udGVudFdpbmRvdztlbHNlIGJyZWFrO2I9WGEoYS5kb2N1bWVudCl9cmV0dXJuIGJ9ZnVuY3Rpb24gTmUoYSl7dmFyIGI9YSYmYS5ub2RlTmFtZSYmYS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO3JldHVybiBiJiYoImlucHV0Ij09PWImJigidGV4dCI9PT1hLnR5cGV8fCJzZWFyY2giPT09YS50eXBlfHwidGVsIj09PWEudHlwZXx8InVybCI9PT1hLnR5cGV8fCJwYXNzd29yZCI9PT1hLnR5cGUpfHwidGV4dGFyZWEiPT09Ynx8InRydWUiPT09YS5jb250ZW50RWRpdGFibGUpfQpmdW5jdGlvbiBPZShhKXt2YXIgYj1NZSgpLGM9YS5mb2N1c2VkRWxlbSxkPWEuc2VsZWN0aW9uUmFuZ2U7aWYoYiE9PWMmJmMmJmMub3duZXJEb2N1bWVudCYmTGUoYy5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudCxjKSl7aWYobnVsbCE9PWQmJk5lKGMpKWlmKGI9ZC5zdGFydCxhPWQuZW5kLHZvaWQgMD09PWEmJihhPWIpLCJzZWxlY3Rpb25TdGFydCJpbiBjKWMuc2VsZWN0aW9uU3RhcnQ9YixjLnNlbGVjdGlvbkVuZD1NYXRoLm1pbihhLGMudmFsdWUubGVuZ3RoKTtlbHNlIGlmKGE9KGI9Yy5vd25lckRvY3VtZW50fHxkb2N1bWVudCkmJmIuZGVmYXVsdFZpZXd8fHdpbmRvdyxhLmdldFNlbGVjdGlvbil7YT1hLmdldFNlbGVjdGlvbigpO3ZhciBlPWMudGV4dENvbnRlbnQubGVuZ3RoLGY9TWF0aC5taW4oZC5zdGFydCxlKTtkPXZvaWQgMD09PWQuZW5kP2Y6TWF0aC5taW4oZC5lbmQsZSk7IWEuZXh0ZW5kJiZmPmQmJihlPWQsZD1mLGY9ZSk7ZT1LZShjLGYpO3ZhciBnPUtlKGMsCmQpO2UmJmcmJigxIT09YS5yYW5nZUNvdW50fHxhLmFuY2hvck5vZGUhPT1lLm5vZGV8fGEuYW5jaG9yT2Zmc2V0IT09ZS5vZmZzZXR8fGEuZm9jdXNOb2RlIT09Zy5ub2RlfHxhLmZvY3VzT2Zmc2V0IT09Zy5vZmZzZXQpJiYoYj1iLmNyZWF0ZVJhbmdlKCksYi5zZXRTdGFydChlLm5vZGUsZS5vZmZzZXQpLGEucmVtb3ZlQWxsUmFuZ2VzKCksZj5kPyhhLmFkZFJhbmdlKGIpLGEuZXh0ZW5kKGcubm9kZSxnLm9mZnNldCkpOihiLnNldEVuZChnLm5vZGUsZy5vZmZzZXQpLGEuYWRkUmFuZ2UoYikpKX1iPVtdO2ZvcihhPWM7YT1hLnBhcmVudE5vZGU7KTE9PT1hLm5vZGVUeXBlJiZiLnB1c2goe2VsZW1lbnQ6YSxsZWZ0OmEuc2Nyb2xsTGVmdCx0b3A6YS5zY3JvbGxUb3B9KTsiZnVuY3Rpb24iPT09dHlwZW9mIGMuZm9jdXMmJmMuZm9jdXMoKTtmb3IoYz0wO2M8Yi5sZW5ndGg7YysrKWE9YltjXSxhLmVsZW1lbnQuc2Nyb2xsTGVmdD1hLmxlZnQsYS5lbGVtZW50LnNjcm9sbFRvcD1hLnRvcH19CnZhciBQZT1pYSYmImRvY3VtZW50TW9kZSJpbiBkb2N1bWVudCYmMTE+PWRvY3VtZW50LmRvY3VtZW50TW9kZSxRZT1udWxsLFJlPW51bGwsU2U9bnVsbCxUZT0hMTsKZnVuY3Rpb24gVWUoYSxiLGMpe3ZhciBkPWMud2luZG93PT09Yz9jLmRvY3VtZW50Ojk9PT1jLm5vZGVUeXBlP2M6Yy5vd25lckRvY3VtZW50O1RlfHxudWxsPT1RZXx8UWUhPT1YYShkKXx8KGQ9UWUsInNlbGVjdGlvblN0YXJ0ImluIGQmJk5lKGQpP2Q9e3N0YXJ0OmQuc2VsZWN0aW9uU3RhcnQsZW5kOmQuc2VsZWN0aW9uRW5kfTooZD0oZC5vd25lckRvY3VtZW50JiZkLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXd8fHdpbmRvdykuZ2V0U2VsZWN0aW9uKCksZD17YW5jaG9yTm9kZTpkLmFuY2hvck5vZGUsYW5jaG9yT2Zmc2V0OmQuYW5jaG9yT2Zmc2V0LGZvY3VzTm9kZTpkLmZvY3VzTm9kZSxmb2N1c09mZnNldDpkLmZvY3VzT2Zmc2V0fSksU2UmJkllKFNlLGQpfHwoU2U9ZCxkPW9lKFJlLCJvblNlbGVjdCIpLDA8ZC5sZW5ndGgmJihiPW5ldyB0ZCgib25TZWxlY3QiLCJzZWxlY3QiLG51bGwsYixjKSxhLnB1c2goe2V2ZW50OmIsbGlzdGVuZXJzOmR9KSxiLnRhcmdldD1RZSkpKX0KZnVuY3Rpb24gVmUoYSxiKXt2YXIgYz17fTtjW2EudG9Mb3dlckNhc2UoKV09Yi50b0xvd2VyQ2FzZSgpO2NbIldlYmtpdCIrYV09IndlYmtpdCIrYjtjWyJNb3oiK2FdPSJtb3oiK2I7cmV0dXJuIGN9dmFyIFdlPXthbmltYXRpb25lbmQ6VmUoIkFuaW1hdGlvbiIsIkFuaW1hdGlvbkVuZCIpLGFuaW1hdGlvbml0ZXJhdGlvbjpWZSgiQW5pbWF0aW9uIiwiQW5pbWF0aW9uSXRlcmF0aW9uIiksYW5pbWF0aW9uc3RhcnQ6VmUoIkFuaW1hdGlvbiIsIkFuaW1hdGlvblN0YXJ0IiksdHJhbnNpdGlvbmVuZDpWZSgiVHJhbnNpdGlvbiIsIlRyYW5zaXRpb25FbmQiKX0sWGU9e30sWWU9e307CmlhJiYoWWU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgiZGl2Iikuc3R5bGUsIkFuaW1hdGlvbkV2ZW50ImluIHdpbmRvd3x8KGRlbGV0ZSBXZS5hbmltYXRpb25lbmQuYW5pbWF0aW9uLGRlbGV0ZSBXZS5hbmltYXRpb25pdGVyYXRpb24uYW5pbWF0aW9uLGRlbGV0ZSBXZS5hbmltYXRpb25zdGFydC5hbmltYXRpb24pLCJUcmFuc2l0aW9uRXZlbnQiaW4gd2luZG93fHxkZWxldGUgV2UudHJhbnNpdGlvbmVuZC50cmFuc2l0aW9uKTtmdW5jdGlvbiBaZShhKXtpZihYZVthXSlyZXR1cm4gWGVbYV07aWYoIVdlW2FdKXJldHVybiBhO3ZhciBiPVdlW2FdLGM7Zm9yKGMgaW4gYilpZihiLmhhc093blByb3BlcnR5KGMpJiZjIGluIFllKXJldHVybiBYZVthXT1iW2NdO3JldHVybiBhfXZhciAkZT1aZSgiYW5pbWF0aW9uZW5kIiksYWY9WmUoImFuaW1hdGlvbml0ZXJhdGlvbiIpLGJmPVplKCJhbmltYXRpb25zdGFydCIpLGNmPVplKCJ0cmFuc2l0aW9uZW5kIiksZGY9bmV3IE1hcCxlZj0iYWJvcnQgYXV4Q2xpY2sgY2FuY2VsIGNhblBsYXkgY2FuUGxheVRocm91Z2ggY2xpY2sgY2xvc2UgY29udGV4dE1lbnUgY29weSBjdXQgZHJhZyBkcmFnRW5kIGRyYWdFbnRlciBkcmFnRXhpdCBkcmFnTGVhdmUgZHJhZ092ZXIgZHJhZ1N0YXJ0IGRyb3AgZHVyYXRpb25DaGFuZ2UgZW1wdGllZCBlbmNyeXB0ZWQgZW5kZWQgZXJyb3IgZ290UG9pbnRlckNhcHR1cmUgaW5wdXQgaW52YWxpZCBrZXlEb3duIGtleVByZXNzIGtleVVwIGxvYWQgbG9hZGVkRGF0YSBsb2FkZWRNZXRhZGF0YSBsb2FkU3RhcnQgbG9zdFBvaW50ZXJDYXB0dXJlIG1vdXNlRG93biBtb3VzZU1vdmUgbW91c2VPdXQgbW91c2VPdmVyIG1vdXNlVXAgcGFzdGUgcGF1c2UgcGxheSBwbGF5aW5nIHBvaW50ZXJDYW5jZWwgcG9pbnRlckRvd24gcG9pbnRlck1vdmUgcG9pbnRlck91dCBwb2ludGVyT3ZlciBwb2ludGVyVXAgcHJvZ3Jlc3MgcmF0ZUNoYW5nZSByZXNldCByZXNpemUgc2Vla2VkIHNlZWtpbmcgc3RhbGxlZCBzdWJtaXQgc3VzcGVuZCB0aW1lVXBkYXRlIHRvdWNoQ2FuY2VsIHRvdWNoRW5kIHRvdWNoU3RhcnQgdm9sdW1lQ2hhbmdlIHNjcm9sbCB0b2dnbGUgdG91Y2hNb3ZlIHdhaXRpbmcgd2hlZWwiLnNwbGl0KCIgIik7CmZ1bmN0aW9uIGZmKGEsYil7ZGYuc2V0KGEsYik7ZmEoYixbYV0pfWZvcih2YXIgZ2Y9MDtnZjxlZi5sZW5ndGg7Z2YrKyl7dmFyIGhmPWVmW2dmXSxqZj1oZi50b0xvd2VyQ2FzZSgpLGtmPWhmWzBdLnRvVXBwZXJDYXNlKCkraGYuc2xpY2UoMSk7ZmYoamYsIm9uIitrZil9ZmYoJGUsIm9uQW5pbWF0aW9uRW5kIik7ZmYoYWYsIm9uQW5pbWF0aW9uSXRlcmF0aW9uIik7ZmYoYmYsIm9uQW5pbWF0aW9uU3RhcnQiKTtmZigiZGJsY2xpY2siLCJvbkRvdWJsZUNsaWNrIik7ZmYoImZvY3VzaW4iLCJvbkZvY3VzIik7ZmYoImZvY3Vzb3V0Iiwib25CbHVyIik7ZmYoY2YsIm9uVHJhbnNpdGlvbkVuZCIpO2hhKCJvbk1vdXNlRW50ZXIiLFsibW91c2VvdXQiLCJtb3VzZW92ZXIiXSk7aGEoIm9uTW91c2VMZWF2ZSIsWyJtb3VzZW91dCIsIm1vdXNlb3ZlciJdKTtoYSgib25Qb2ludGVyRW50ZXIiLFsicG9pbnRlcm91dCIsInBvaW50ZXJvdmVyIl0pOwpoYSgib25Qb2ludGVyTGVhdmUiLFsicG9pbnRlcm91dCIsInBvaW50ZXJvdmVyIl0pO2ZhKCJvbkNoYW5nZSIsImNoYW5nZSBjbGljayBmb2N1c2luIGZvY3Vzb3V0IGlucHV0IGtleWRvd24ga2V5dXAgc2VsZWN0aW9uY2hhbmdlIi5zcGxpdCgiICIpKTtmYSgib25TZWxlY3QiLCJmb2N1c291dCBjb250ZXh0bWVudSBkcmFnZW5kIGZvY3VzaW4ga2V5ZG93biBrZXl1cCBtb3VzZWRvd24gbW91c2V1cCBzZWxlY3Rpb25jaGFuZ2UiLnNwbGl0KCIgIikpO2ZhKCJvbkJlZm9yZUlucHV0IixbImNvbXBvc2l0aW9uZW5kIiwia2V5cHJlc3MiLCJ0ZXh0SW5wdXQiLCJwYXN0ZSJdKTtmYSgib25Db21wb3NpdGlvbkVuZCIsImNvbXBvc2l0aW9uZW5kIGZvY3Vzb3V0IGtleWRvd24ga2V5cHJlc3Mga2V5dXAgbW91c2Vkb3duIi5zcGxpdCgiICIpKTtmYSgib25Db21wb3NpdGlvblN0YXJ0IiwiY29tcG9zaXRpb25zdGFydCBmb2N1c291dCBrZXlkb3duIGtleXByZXNzIGtleXVwIG1vdXNlZG93biIuc3BsaXQoIiAiKSk7CmZhKCJvbkNvbXBvc2l0aW9uVXBkYXRlIiwiY29tcG9zaXRpb251cGRhdGUgZm9jdXNvdXQga2V5ZG93biBrZXlwcmVzcyBrZXl1cCBtb3VzZWRvd24iLnNwbGl0KCIgIikpO3ZhciBsZj0iYWJvcnQgY2FucGxheSBjYW5wbGF5dGhyb3VnaCBkdXJhdGlvbmNoYW5nZSBlbXB0aWVkIGVuY3J5cHRlZCBlbmRlZCBlcnJvciBsb2FkZWRkYXRhIGxvYWRlZG1ldGFkYXRhIGxvYWRzdGFydCBwYXVzZSBwbGF5IHBsYXlpbmcgcHJvZ3Jlc3MgcmF0ZWNoYW5nZSByZXNpemUgc2Vla2VkIHNlZWtpbmcgc3RhbGxlZCBzdXNwZW5kIHRpbWV1cGRhdGUgdm9sdW1lY2hhbmdlIHdhaXRpbmciLnNwbGl0KCIgIiksbWY9bmV3IFNldCgiY2FuY2VsIGNsb3NlIGludmFsaWQgbG9hZCBzY3JvbGwgdG9nZ2xlIi5zcGxpdCgiICIpLmNvbmNhdChsZikpOwpmdW5jdGlvbiBuZihhLGIsYyl7dmFyIGQ9YS50eXBlfHwidW5rbm93bi1ldmVudCI7YS5jdXJyZW50VGFyZ2V0PWM7VWIoZCxiLHZvaWQgMCxhKTthLmN1cnJlbnRUYXJnZXQ9bnVsbH0KZnVuY3Rpb24gc2UoYSxiKXtiPTAhPT0oYiY0KTtmb3IodmFyIGM9MDtjPGEubGVuZ3RoO2MrKyl7dmFyIGQ9YVtjXSxlPWQuZXZlbnQ7ZD1kLmxpc3RlbmVyczthOnt2YXIgZj12b2lkIDA7aWYoYilmb3IodmFyIGc9ZC5sZW5ndGgtMTswPD1nO2ctLSl7dmFyIGg9ZFtnXSxrPWguaW5zdGFuY2UsbD1oLmN1cnJlbnRUYXJnZXQ7aD1oLmxpc3RlbmVyO2lmKGshPT1mJiZlLmlzUHJvcGFnYXRpb25TdG9wcGVkKCkpYnJlYWsgYTtuZihlLGgsbCk7Zj1rfWVsc2UgZm9yKGc9MDtnPGQubGVuZ3RoO2crKyl7aD1kW2ddO2s9aC5pbnN0YW5jZTtsPWguY3VycmVudFRhcmdldDtoPWgubGlzdGVuZXI7aWYoayE9PWYmJmUuaXNQcm9wYWdhdGlvblN0b3BwZWQoKSlicmVhayBhO25mKGUsaCxsKTtmPWt9fX1pZihRYil0aHJvdyBhPVJiLFFiPSExLFJiPW51bGwsYTt9CmZ1bmN0aW9uIEQoYSxiKXt2YXIgYz1iW29mXTt2b2lkIDA9PT1jJiYoYz1iW29mXT1uZXcgU2V0KTt2YXIgZD1hKyJfX2J1YmJsZSI7Yy5oYXMoZCl8fChwZihiLGEsMiwhMSksYy5hZGQoZCkpfWZ1bmN0aW9uIHFmKGEsYixjKXt2YXIgZD0wO2ImJihkfD00KTtwZihjLGEsZCxiKX12YXIgcmY9Il9yZWFjdExpc3RlbmluZyIrTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc2xpY2UoMik7ZnVuY3Rpb24gc2YoYSl7aWYoIWFbcmZdKXthW3JmXT0hMDtkYS5mb3JFYWNoKGZ1bmN0aW9uKGIpeyJzZWxlY3Rpb25jaGFuZ2UiIT09YiYmKG1mLmhhcyhiKXx8cWYoYiwhMSxhKSxxZihiLCEwLGEpKX0pO3ZhciBiPTk9PT1hLm5vZGVUeXBlP2E6YS5vd25lckRvY3VtZW50O251bGw9PT1ifHxiW3JmXXx8KGJbcmZdPSEwLHFmKCJzZWxlY3Rpb25jaGFuZ2UiLCExLGIpKX19CmZ1bmN0aW9uIHBmKGEsYixjLGQpe3N3aXRjaChqZChiKSl7Y2FzZSAxOnZhciBlPWVkO2JyZWFrO2Nhc2UgNDplPWdkO2JyZWFrO2RlZmF1bHQ6ZT1mZH1jPWUuYmluZChudWxsLGIsYyxhKTtlPXZvaWQgMDshTGJ8fCJ0b3VjaHN0YXJ0IiE9PWImJiJ0b3VjaG1vdmUiIT09YiYmIndoZWVsIiE9PWJ8fChlPSEwKTtkP3ZvaWQgMCE9PWU/YS5hZGRFdmVudExpc3RlbmVyKGIsYyx7Y2FwdHVyZTohMCxwYXNzaXZlOmV9KTphLmFkZEV2ZW50TGlzdGVuZXIoYixjLCEwKTp2b2lkIDAhPT1lP2EuYWRkRXZlbnRMaXN0ZW5lcihiLGMse3Bhc3NpdmU6ZX0pOmEuYWRkRXZlbnRMaXN0ZW5lcihiLGMsITEpfQpmdW5jdGlvbiBoZChhLGIsYyxkLGUpe3ZhciBmPWQ7aWYoMD09PShiJjEpJiYwPT09KGImMikmJm51bGwhPT1kKWE6Zm9yKDs7KXtpZihudWxsPT09ZClyZXR1cm47dmFyIGc9ZC50YWc7aWYoMz09PWd8fDQ9PT1nKXt2YXIgaD1kLnN0YXRlTm9kZS5jb250YWluZXJJbmZvO2lmKGg9PT1lfHw4PT09aC5ub2RlVHlwZSYmaC5wYXJlbnROb2RlPT09ZSlicmVhaztpZig0PT09Zylmb3IoZz1kLnJldHVybjtudWxsIT09Zzspe3ZhciBrPWcudGFnO2lmKDM9PT1rfHw0PT09aylpZihrPWcuc3RhdGVOb2RlLmNvbnRhaW5lckluZm8saz09PWV8fDg9PT1rLm5vZGVUeXBlJiZrLnBhcmVudE5vZGU9PT1lKXJldHVybjtnPWcucmV0dXJufWZvcig7bnVsbCE9PWg7KXtnPVdjKGgpO2lmKG51bGw9PT1nKXJldHVybjtrPWcudGFnO2lmKDU9PT1rfHw2PT09ayl7ZD1mPWc7Y29udGludWUgYX1oPWgucGFyZW50Tm9kZX19ZD1kLnJldHVybn1KYihmdW5jdGlvbigpe3ZhciBkPWYsZT14YihjKSxnPVtdOwphOnt2YXIgaD1kZi5nZXQoYSk7aWYodm9pZCAwIT09aCl7dmFyIGs9dGQsbj1hO3N3aXRjaChhKXtjYXNlICJrZXlwcmVzcyI6aWYoMD09PW9kKGMpKWJyZWFrIGE7Y2FzZSAia2V5ZG93biI6Y2FzZSAia2V5dXAiOms9UmQ7YnJlYWs7Y2FzZSAiZm9jdXNpbiI6bj0iZm9jdXMiO2s9RmQ7YnJlYWs7Y2FzZSAiZm9jdXNvdXQiOm49ImJsdXIiO2s9RmQ7YnJlYWs7Y2FzZSAiYmVmb3JlYmx1ciI6Y2FzZSAiYWZ0ZXJibHVyIjprPUZkO2JyZWFrO2Nhc2UgImNsaWNrIjppZigyPT09Yy5idXR0b24pYnJlYWsgYTtjYXNlICJhdXhjbGljayI6Y2FzZSAiZGJsY2xpY2siOmNhc2UgIm1vdXNlZG93biI6Y2FzZSAibW91c2Vtb3ZlIjpjYXNlICJtb3VzZXVwIjpjYXNlICJtb3VzZW91dCI6Y2FzZSAibW91c2VvdmVyIjpjYXNlICJjb250ZXh0bWVudSI6az1CZDticmVhaztjYXNlICJkcmFnIjpjYXNlICJkcmFnZW5kIjpjYXNlICJkcmFnZW50ZXIiOmNhc2UgImRyYWdleGl0IjpjYXNlICJkcmFnbGVhdmUiOmNhc2UgImRyYWdvdmVyIjpjYXNlICJkcmFnc3RhcnQiOmNhc2UgImRyb3AiOms9CkRkO2JyZWFrO2Nhc2UgInRvdWNoY2FuY2VsIjpjYXNlICJ0b3VjaGVuZCI6Y2FzZSAidG91Y2htb3ZlIjpjYXNlICJ0b3VjaHN0YXJ0IjprPVZkO2JyZWFrO2Nhc2UgJGU6Y2FzZSBhZjpjYXNlIGJmOms9SGQ7YnJlYWs7Y2FzZSBjZjprPVhkO2JyZWFrO2Nhc2UgInNjcm9sbCI6az12ZDticmVhaztjYXNlICJ3aGVlbCI6az1aZDticmVhaztjYXNlICJjb3B5IjpjYXNlICJjdXQiOmNhc2UgInBhc3RlIjprPUpkO2JyZWFrO2Nhc2UgImdvdHBvaW50ZXJjYXB0dXJlIjpjYXNlICJsb3N0cG9pbnRlcmNhcHR1cmUiOmNhc2UgInBvaW50ZXJjYW5jZWwiOmNhc2UgInBvaW50ZXJkb3duIjpjYXNlICJwb2ludGVybW92ZSI6Y2FzZSAicG9pbnRlcm91dCI6Y2FzZSAicG9pbnRlcm92ZXIiOmNhc2UgInBvaW50ZXJ1cCI6az1UZH12YXIgdD0wIT09KGImNCksSj0hdCYmInNjcm9sbCI9PT1hLHg9dD9udWxsIT09aD9oKyJDYXB0dXJlIjpudWxsOmg7dD1bXTtmb3IodmFyIHc9ZCx1O251bGwhPT0Kdzspe3U9dzt2YXIgRj11LnN0YXRlTm9kZTs1PT09dS50YWcmJm51bGwhPT1GJiYodT1GLG51bGwhPT14JiYoRj1LYih3LHgpLG51bGwhPUYmJnQucHVzaCh0Zih3LEYsdSkpKSk7aWYoSilicmVhazt3PXcucmV0dXJufTA8dC5sZW5ndGgmJihoPW5ldyBrKGgsbixudWxsLGMsZSksZy5wdXNoKHtldmVudDpoLGxpc3RlbmVyczp0fSkpfX1pZigwPT09KGImNykpe2E6e2g9Im1vdXNlb3ZlciI9PT1hfHwicG9pbnRlcm92ZXIiPT09YTtrPSJtb3VzZW91dCI9PT1hfHwicG9pbnRlcm91dCI9PT1hO2lmKGgmJmMhPT13YiYmKG49Yy5yZWxhdGVkVGFyZ2V0fHxjLmZyb21FbGVtZW50KSYmKFdjKG4pfHxuW3VmXSkpYnJlYWsgYTtpZihrfHxoKXtoPWUud2luZG93PT09ZT9lOihoPWUub3duZXJEb2N1bWVudCk/aC5kZWZhdWx0Vmlld3x8aC5wYXJlbnRXaW5kb3c6d2luZG93O2lmKGspe2lmKG49Yy5yZWxhdGVkVGFyZ2V0fHxjLnRvRWxlbWVudCxrPWQsbj1uP1djKG4pOm51bGwsbnVsbCE9PQpuJiYoSj1WYihuKSxuIT09Snx8NSE9PW4udGFnJiY2IT09bi50YWcpKW49bnVsbH1lbHNlIGs9bnVsbCxuPWQ7aWYoayE9PW4pe3Q9QmQ7Rj0ib25Nb3VzZUxlYXZlIjt4PSJvbk1vdXNlRW50ZXIiO3c9Im1vdXNlIjtpZigicG9pbnRlcm91dCI9PT1hfHwicG9pbnRlcm92ZXIiPT09YSl0PVRkLEY9Im9uUG9pbnRlckxlYXZlIix4PSJvblBvaW50ZXJFbnRlciIsdz0icG9pbnRlciI7Sj1udWxsPT1rP2g6dWUoayk7dT1udWxsPT1uP2g6dWUobik7aD1uZXcgdChGLHcrImxlYXZlIixrLGMsZSk7aC50YXJnZXQ9SjtoLnJlbGF0ZWRUYXJnZXQ9dTtGPW51bGw7V2MoZSk9PT1kJiYodD1uZXcgdCh4LHcrImVudGVyIixuLGMsZSksdC50YXJnZXQ9dSx0LnJlbGF0ZWRUYXJnZXQ9SixGPXQpO0o9RjtpZihrJiZuKWI6e3Q9azt4PW47dz0wO2Zvcih1PXQ7dTt1PXZmKHUpKXcrKzt1PTA7Zm9yKEY9eDtGO0Y9dmYoRikpdSsrO2Zvcig7MDx3LXU7KXQ9dmYodCksdy0tO2Zvcig7MDx1LXc7KXg9CnZmKHgpLHUtLTtmb3IoO3ctLTspe2lmKHQ9PT14fHxudWxsIT09eCYmdD09PXguYWx0ZXJuYXRlKWJyZWFrIGI7dD12Zih0KTt4PXZmKHgpfXQ9bnVsbH1lbHNlIHQ9bnVsbDtudWxsIT09ayYmd2YoZyxoLGssdCwhMSk7bnVsbCE9PW4mJm51bGwhPT1KJiZ3ZihnLEosbix0LCEwKX19fWE6e2g9ZD91ZShkKTp3aW5kb3c7az1oLm5vZGVOYW1lJiZoLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7aWYoInNlbGVjdCI9PT1rfHwiaW5wdXQiPT09ayYmImZpbGUiPT09aC50eXBlKXZhciBuYT12ZTtlbHNlIGlmKG1lKGgpKWlmKHdlKW5hPUZlO2Vsc2V7bmE9RGU7dmFyIHhhPUNlfWVsc2Uoaz1oLm5vZGVOYW1lKSYmImlucHV0Ij09PWsudG9Mb3dlckNhc2UoKSYmKCJjaGVja2JveCI9PT1oLnR5cGV8fCJyYWRpbyI9PT1oLnR5cGUpJiYobmE9RWUpO2lmKG5hJiYobmE9bmEoYSxkKSkpe25lKGcsbmEsYyxlKTticmVhayBhfXhhJiZ4YShhLGgsZCk7ImZvY3Vzb3V0Ij09PWEmJih4YT1oLl93cmFwcGVyU3RhdGUpJiYKeGEuY29udHJvbGxlZCYmIm51bWJlciI9PT1oLnR5cGUmJmNiKGgsIm51bWJlciIsaC52YWx1ZSl9eGE9ZD91ZShkKTp3aW5kb3c7c3dpdGNoKGEpe2Nhc2UgImZvY3VzaW4iOmlmKG1lKHhhKXx8InRydWUiPT09eGEuY29udGVudEVkaXRhYmxlKVFlPXhhLFJlPWQsU2U9bnVsbDticmVhaztjYXNlICJmb2N1c291dCI6U2U9UmU9UWU9bnVsbDticmVhaztjYXNlICJtb3VzZWRvd24iOlRlPSEwO2JyZWFrO2Nhc2UgImNvbnRleHRtZW51IjpjYXNlICJtb3VzZXVwIjpjYXNlICJkcmFnZW5kIjpUZT0hMTtVZShnLGMsZSk7YnJlYWs7Y2FzZSAic2VsZWN0aW9uY2hhbmdlIjppZihQZSlicmVhaztjYXNlICJrZXlkb3duIjpjYXNlICJrZXl1cCI6VWUoZyxjLGUpfXZhciAkYTtpZihhZSliOntzd2l0Y2goYSl7Y2FzZSAiY29tcG9zaXRpb25zdGFydCI6dmFyIGJhPSJvbkNvbXBvc2l0aW9uU3RhcnQiO2JyZWFrIGI7Y2FzZSAiY29tcG9zaXRpb25lbmQiOmJhPSJvbkNvbXBvc2l0aW9uRW5kIjsKYnJlYWsgYjtjYXNlICJjb21wb3NpdGlvbnVwZGF0ZSI6YmE9Im9uQ29tcG9zaXRpb25VcGRhdGUiO2JyZWFrIGJ9YmE9dm9pZCAwfWVsc2UgaWU/Z2UoYSxjKSYmKGJhPSJvbkNvbXBvc2l0aW9uRW5kIik6ImtleWRvd24iPT09YSYmMjI5PT09Yy5rZXlDb2RlJiYoYmE9Im9uQ29tcG9zaXRpb25TdGFydCIpO2JhJiYoZGUmJiJrbyIhPT1jLmxvY2FsZSYmKGllfHwib25Db21wb3NpdGlvblN0YXJ0IiE9PWJhPyJvbkNvbXBvc2l0aW9uRW5kIj09PWJhJiZpZSYmKCRhPW5kKCkpOihrZD1lLGxkPSJ2YWx1ZSJpbiBrZD9rZC52YWx1ZTprZC50ZXh0Q29udGVudCxpZT0hMCkpLHhhPW9lKGQsYmEpLDA8eGEubGVuZ3RoJiYoYmE9bmV3IExkKGJhLGEsbnVsbCxjLGUpLGcucHVzaCh7ZXZlbnQ6YmEsbGlzdGVuZXJzOnhhfSksJGE/YmEuZGF0YT0kYTooJGE9aGUoYyksbnVsbCE9PSRhJiYoYmEuZGF0YT0kYSkpKSk7aWYoJGE9Y2U/amUoYSxjKTprZShhLGMpKWQ9b2UoZCwib25CZWZvcmVJbnB1dCIpLAowPGQubGVuZ3RoJiYoZT1uZXcgTGQoIm9uQmVmb3JlSW5wdXQiLCJiZWZvcmVpbnB1dCIsbnVsbCxjLGUpLGcucHVzaCh7ZXZlbnQ6ZSxsaXN0ZW5lcnM6ZH0pLGUuZGF0YT0kYSl9c2UoZyxiKX0pfWZ1bmN0aW9uIHRmKGEsYixjKXtyZXR1cm57aW5zdGFuY2U6YSxsaXN0ZW5lcjpiLGN1cnJlbnRUYXJnZXQ6Y319ZnVuY3Rpb24gb2UoYSxiKXtmb3IodmFyIGM9YisiQ2FwdHVyZSIsZD1bXTtudWxsIT09YTspe3ZhciBlPWEsZj1lLnN0YXRlTm9kZTs1PT09ZS50YWcmJm51bGwhPT1mJiYoZT1mLGY9S2IoYSxjKSxudWxsIT1mJiZkLnVuc2hpZnQodGYoYSxmLGUpKSxmPUtiKGEsYiksbnVsbCE9ZiYmZC5wdXNoKHRmKGEsZixlKSkpO2E9YS5yZXR1cm59cmV0dXJuIGR9ZnVuY3Rpb24gdmYoYSl7aWYobnVsbD09PWEpcmV0dXJuIG51bGw7ZG8gYT1hLnJldHVybjt3aGlsZShhJiY1IT09YS50YWcpO3JldHVybiBhP2E6bnVsbH0KZnVuY3Rpb24gd2YoYSxiLGMsZCxlKXtmb3IodmFyIGY9Yi5fcmVhY3ROYW1lLGc9W107bnVsbCE9PWMmJmMhPT1kOyl7dmFyIGg9YyxrPWguYWx0ZXJuYXRlLGw9aC5zdGF0ZU5vZGU7aWYobnVsbCE9PWsmJms9PT1kKWJyZWFrOzU9PT1oLnRhZyYmbnVsbCE9PWwmJihoPWwsZT8oaz1LYihjLGYpLG51bGwhPWsmJmcudW5zaGlmdCh0ZihjLGssaCkpKTplfHwoaz1LYihjLGYpLG51bGwhPWsmJmcucHVzaCh0ZihjLGssaCkpKSk7Yz1jLnJldHVybn0wIT09Zy5sZW5ndGgmJmEucHVzaCh7ZXZlbnQ6YixsaXN0ZW5lcnM6Z30pfXZhciB4Zj0vXHJcbj8vZyx5Zj0vXHUwMDAwfFx1RkZGRC9nO2Z1bmN0aW9uIHpmKGEpe3JldHVybigic3RyaW5nIj09PXR5cGVvZiBhP2E6IiIrYSkucmVwbGFjZSh4ZiwiXG4iKS5yZXBsYWNlKHlmLCIiKX1mdW5jdGlvbiBBZihhLGIsYyl7Yj16ZihiKTtpZih6ZihhKSE9PWImJmMpdGhyb3cgRXJyb3IocCg0MjUpKTt9ZnVuY3Rpb24gQmYoKXt9CnZhciBDZj1udWxsLERmPW51bGw7ZnVuY3Rpb24gRWYoYSxiKXtyZXR1cm4idGV4dGFyZWEiPT09YXx8Im5vc2NyaXB0Ij09PWF8fCJzdHJpbmciPT09dHlwZW9mIGIuY2hpbGRyZW58fCJudW1iZXIiPT09dHlwZW9mIGIuY2hpbGRyZW58fCJvYmplY3QiPT09dHlwZW9mIGIuZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwmJm51bGwhPT1iLmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MJiZudWxsIT1iLmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MLl9faHRtbH0KdmFyIEZmPSJmdW5jdGlvbiI9PT10eXBlb2Ygc2V0VGltZW91dD9zZXRUaW1lb3V0OnZvaWQgMCxHZj0iZnVuY3Rpb24iPT09dHlwZW9mIGNsZWFyVGltZW91dD9jbGVhclRpbWVvdXQ6dm9pZCAwLEhmPSJmdW5jdGlvbiI9PT10eXBlb2YgUHJvbWlzZT9Qcm9taXNlOnZvaWQgMCxKZj0iZnVuY3Rpb24iPT09dHlwZW9mIHF1ZXVlTWljcm90YXNrP3F1ZXVlTWljcm90YXNrOiJ1bmRlZmluZWQiIT09dHlwZW9mIEhmP2Z1bmN0aW9uKGEpe3JldHVybiBIZi5yZXNvbHZlKG51bGwpLnRoZW4oYSkuY2F0Y2goSWYpfTpGZjtmdW5jdGlvbiBJZihhKXtzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dGhyb3cgYTt9KX0KZnVuY3Rpb24gS2YoYSxiKXt2YXIgYz1iLGQ9MDtkb3t2YXIgZT1jLm5leHRTaWJsaW5nO2EucmVtb3ZlQ2hpbGQoYyk7aWYoZSYmOD09PWUubm9kZVR5cGUpaWYoYz1lLmRhdGEsIi8kIj09PWMpe2lmKDA9PT1kKXthLnJlbW92ZUNoaWxkKGUpO2JkKGIpO3JldHVybn1kLS19ZWxzZSIkIiE9PWMmJiIkPyIhPT1jJiYiJCEiIT09Y3x8ZCsrO2M9ZX13aGlsZShjKTtiZChiKX1mdW5jdGlvbiBMZihhKXtmb3IoO251bGwhPWE7YT1hLm5leHRTaWJsaW5nKXt2YXIgYj1hLm5vZGVUeXBlO2lmKDE9PT1ifHwzPT09YilicmVhaztpZig4PT09Yil7Yj1hLmRhdGE7aWYoIiQiPT09Ynx8IiQhIj09PWJ8fCIkPyI9PT1iKWJyZWFrO2lmKCIvJCI9PT1iKXJldHVybiBudWxsfX1yZXR1cm4gYX0KZnVuY3Rpb24gTWYoYSl7YT1hLnByZXZpb3VzU2libGluZztmb3IodmFyIGI9MDthOyl7aWYoOD09PWEubm9kZVR5cGUpe3ZhciBjPWEuZGF0YTtpZigiJCI9PT1jfHwiJCEiPT09Y3x8IiQ/Ij09PWMpe2lmKDA9PT1iKXJldHVybiBhO2ItLX1lbHNlIi8kIj09PWMmJmIrK31hPWEucHJldmlvdXNTaWJsaW5nfXJldHVybiBudWxsfXZhciBOZj1NYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zbGljZSgyKSxPZj0iX19yZWFjdEZpYmVyJCIrTmYsUGY9Il9fcmVhY3RQcm9wcyQiK05mLHVmPSJfX3JlYWN0Q29udGFpbmVyJCIrTmYsb2Y9Il9fcmVhY3RFdmVudHMkIitOZixRZj0iX19yZWFjdExpc3RlbmVycyQiK05mLFJmPSJfX3JlYWN0SGFuZGxlcyQiK05mOwpmdW5jdGlvbiBXYyhhKXt2YXIgYj1hW09mXTtpZihiKXJldHVybiBiO2Zvcih2YXIgYz1hLnBhcmVudE5vZGU7Yzspe2lmKGI9Y1t1Zl18fGNbT2ZdKXtjPWIuYWx0ZXJuYXRlO2lmKG51bGwhPT1iLmNoaWxkfHxudWxsIT09YyYmbnVsbCE9PWMuY2hpbGQpZm9yKGE9TWYoYSk7bnVsbCE9PWE7KXtpZihjPWFbT2ZdKXJldHVybiBjO2E9TWYoYSl9cmV0dXJuIGJ9YT1jO2M9YS5wYXJlbnROb2RlfXJldHVybiBudWxsfWZ1bmN0aW9uIENiKGEpe2E9YVtPZl18fGFbdWZdO3JldHVybiFhfHw1IT09YS50YWcmJjYhPT1hLnRhZyYmMTMhPT1hLnRhZyYmMyE9PWEudGFnP251bGw6YX1mdW5jdGlvbiB1ZShhKXtpZig1PT09YS50YWd8fDY9PT1hLnRhZylyZXR1cm4gYS5zdGF0ZU5vZGU7dGhyb3cgRXJyb3IocCgzMykpO31mdW5jdGlvbiBEYihhKXtyZXR1cm4gYVtQZl18fG51bGx9dmFyIFNmPVtdLFRmPS0xO2Z1bmN0aW9uIFVmKGEpe3JldHVybntjdXJyZW50OmF9fQpmdW5jdGlvbiBFKGEpezA+VGZ8fChhLmN1cnJlbnQ9U2ZbVGZdLFNmW1RmXT1udWxsLFRmLS0pfWZ1bmN0aW9uIEcoYSxiKXtUZisrO1NmW1RmXT1hLmN1cnJlbnQ7YS5jdXJyZW50PWJ9dmFyIFZmPXt9LEg9VWYoVmYpLFdmPVVmKCExKSxYZj1WZjtmdW5jdGlvbiBZZihhLGIpe3ZhciBjPWEudHlwZS5jb250ZXh0VHlwZXM7aWYoIWMpcmV0dXJuIFZmO3ZhciBkPWEuc3RhdGVOb2RlO2lmKGQmJmQuX19yZWFjdEludGVybmFsTWVtb2l6ZWRVbm1hc2tlZENoaWxkQ29udGV4dD09PWIpcmV0dXJuIGQuX19yZWFjdEludGVybmFsTWVtb2l6ZWRNYXNrZWRDaGlsZENvbnRleHQ7dmFyIGU9e30sZjtmb3IoZiBpbiBjKWVbZl09YltmXTtkJiYoYT1hLnN0YXRlTm9kZSxhLl9fcmVhY3RJbnRlcm5hbE1lbW9pemVkVW5tYXNrZWRDaGlsZENvbnRleHQ9YixhLl9fcmVhY3RJbnRlcm5hbE1lbW9pemVkTWFza2VkQ2hpbGRDb250ZXh0PWUpO3JldHVybiBlfQpmdW5jdGlvbiBaZihhKXthPWEuY2hpbGRDb250ZXh0VHlwZXM7cmV0dXJuIG51bGwhPT1hJiZ2b2lkIDAhPT1hfWZ1bmN0aW9uICRmKCl7RShXZik7RShIKX1mdW5jdGlvbiBhZyhhLGIsYyl7aWYoSC5jdXJyZW50IT09VmYpdGhyb3cgRXJyb3IocCgxNjgpKTtHKEgsYik7RyhXZixjKX1mdW5jdGlvbiBiZyhhLGIsYyl7dmFyIGQ9YS5zdGF0ZU5vZGU7Yj1iLmNoaWxkQ29udGV4dFR5cGVzO2lmKCJmdW5jdGlvbiIhPT10eXBlb2YgZC5nZXRDaGlsZENvbnRleHQpcmV0dXJuIGM7ZD1kLmdldENoaWxkQ29udGV4dCgpO2Zvcih2YXIgZSBpbiBkKWlmKCEoZSBpbiBiKSl0aHJvdyBFcnJvcihwKDEwOCxSYShhKXx8IlVua25vd24iLGUpKTtyZXR1cm4gQSh7fSxjLGQpfQpmdW5jdGlvbiBjZyhhKXthPShhPWEuc3RhdGVOb2RlKSYmYS5fX3JlYWN0SW50ZXJuYWxNZW1vaXplZE1lcmdlZENoaWxkQ29udGV4dHx8VmY7WGY9SC5jdXJyZW50O0coSCxhKTtHKFdmLFdmLmN1cnJlbnQpO3JldHVybiEwfWZ1bmN0aW9uIGRnKGEsYixjKXt2YXIgZD1hLnN0YXRlTm9kZTtpZighZCl0aHJvdyBFcnJvcihwKDE2OSkpO2M/KGE9YmcoYSxiLFhmKSxkLl9fcmVhY3RJbnRlcm5hbE1lbW9pemVkTWVyZ2VkQ2hpbGRDb250ZXh0PWEsRShXZiksRShIKSxHKEgsYSkpOkUoV2YpO0coV2YsYyl9dmFyIGVnPW51bGwsZmc9ITEsZ2c9ITE7ZnVuY3Rpb24gaGcoYSl7bnVsbD09PWVnP2VnPVthXTplZy5wdXNoKGEpfWZ1bmN0aW9uIGlnKGEpe2ZnPSEwO2hnKGEpfQpmdW5jdGlvbiBqZygpe2lmKCFnZyYmbnVsbCE9PWVnKXtnZz0hMDt2YXIgYT0wLGI9Qzt0cnl7dmFyIGM9ZWc7Zm9yKEM9MTthPGMubGVuZ3RoO2ErKyl7dmFyIGQ9Y1thXTtkbyBkPWQoITApO3doaWxlKG51bGwhPT1kKX1lZz1udWxsO2ZnPSExfWNhdGNoKGUpe3Rocm93IG51bGwhPT1lZyYmKGVnPWVnLnNsaWNlKGErMSkpLGFjKGZjLGpnKSxlO31maW5hbGx5e0M9YixnZz0hMX19cmV0dXJuIG51bGx9dmFyIGtnPVtdLGxnPTAsbWc9bnVsbCxuZz0wLG9nPVtdLHBnPTAscWc9bnVsbCxyZz0xLHNnPSIiO2Z1bmN0aW9uIHRnKGEsYil7a2dbbGcrK109bmc7a2dbbGcrK109bWc7bWc9YTtuZz1ifQpmdW5jdGlvbiB1ZyhhLGIsYyl7b2dbcGcrK109cmc7b2dbcGcrK109c2c7b2dbcGcrK109cWc7cWc9YTt2YXIgZD1yZzthPXNnO3ZhciBlPTMyLW9jKGQpLTE7ZCY9figxPDxlKTtjKz0xO3ZhciBmPTMyLW9jKGIpK2U7aWYoMzA8Zil7dmFyIGc9ZS1lJTU7Zj0oZCYoMTw8ZyktMSkudG9TdHJpbmcoMzIpO2Q+Pj1nO2UtPWc7cmc9MTw8MzItb2MoYikrZXxjPDxlfGQ7c2c9ZithfWVsc2Ugcmc9MTw8ZnxjPDxlfGQsc2c9YX1mdW5jdGlvbiB2ZyhhKXtudWxsIT09YS5yZXR1cm4mJih0ZyhhLDEpLHVnKGEsMSwwKSl9ZnVuY3Rpb24gd2coYSl7Zm9yKDthPT09bWc7KW1nPWtnWy0tbGddLGtnW2xnXT1udWxsLG5nPWtnWy0tbGddLGtnW2xnXT1udWxsO2Zvcig7YT09PXFnOylxZz1vZ1stLXBnXSxvZ1twZ109bnVsbCxzZz1vZ1stLXBnXSxvZ1twZ109bnVsbCxyZz1vZ1stLXBnXSxvZ1twZ109bnVsbH12YXIgeGc9bnVsbCx5Zz1udWxsLEk9ITEsemc9bnVsbDsKZnVuY3Rpb24gQWcoYSxiKXt2YXIgYz1CZyg1LG51bGwsbnVsbCwwKTtjLmVsZW1lbnRUeXBlPSJERUxFVEVEIjtjLnN0YXRlTm9kZT1iO2MucmV0dXJuPWE7Yj1hLmRlbGV0aW9ucztudWxsPT09Yj8oYS5kZWxldGlvbnM9W2NdLGEuZmxhZ3N8PTE2KTpiLnB1c2goYyl9CmZ1bmN0aW9uIENnKGEsYil7c3dpdGNoKGEudGFnKXtjYXNlIDU6dmFyIGM9YS50eXBlO2I9MSE9PWIubm9kZVR5cGV8fGMudG9Mb3dlckNhc2UoKSE9PWIubm9kZU5hbWUudG9Mb3dlckNhc2UoKT9udWxsOmI7cmV0dXJuIG51bGwhPT1iPyhhLnN0YXRlTm9kZT1iLHhnPWEseWc9TGYoYi5maXJzdENoaWxkKSwhMCk6ITE7Y2FzZSA2OnJldHVybiBiPSIiPT09YS5wZW5kaW5nUHJvcHN8fDMhPT1iLm5vZGVUeXBlP251bGw6YixudWxsIT09Yj8oYS5zdGF0ZU5vZGU9Yix4Zz1hLHlnPW51bGwsITApOiExO2Nhc2UgMTM6cmV0dXJuIGI9OCE9PWIubm9kZVR5cGU/bnVsbDpiLG51bGwhPT1iPyhjPW51bGwhPT1xZz97aWQ6cmcsb3ZlcmZsb3c6c2d9Om51bGwsYS5tZW1vaXplZFN0YXRlPXtkZWh5ZHJhdGVkOmIsdHJlZUNvbnRleHQ6YyxyZXRyeUxhbmU6MTA3Mzc0MTgyNH0sYz1CZygxOCxudWxsLG51bGwsMCksYy5zdGF0ZU5vZGU9YixjLnJldHVybj1hLGEuY2hpbGQ9Yyx4Zz1hLHlnPQpudWxsLCEwKTohMTtkZWZhdWx0OnJldHVybiExfX1mdW5jdGlvbiBEZyhhKXtyZXR1cm4gMCE9PShhLm1vZGUmMSkmJjA9PT0oYS5mbGFncyYxMjgpfWZ1bmN0aW9uIEVnKGEpe2lmKEkpe3ZhciBiPXlnO2lmKGIpe3ZhciBjPWI7aWYoIUNnKGEsYikpe2lmKERnKGEpKXRocm93IEVycm9yKHAoNDE4KSk7Yj1MZihjLm5leHRTaWJsaW5nKTt2YXIgZD14ZztiJiZDZyhhLGIpP0FnKGQsYyk6KGEuZmxhZ3M9YS5mbGFncyYtNDA5N3wyLEk9ITEseGc9YSl9fWVsc2V7aWYoRGcoYSkpdGhyb3cgRXJyb3IocCg0MTgpKTthLmZsYWdzPWEuZmxhZ3MmLTQwOTd8MjtJPSExO3hnPWF9fX1mdW5jdGlvbiBGZyhhKXtmb3IoYT1hLnJldHVybjtudWxsIT09YSYmNSE9PWEudGFnJiYzIT09YS50YWcmJjEzIT09YS50YWc7KWE9YS5yZXR1cm47eGc9YX0KZnVuY3Rpb24gR2coYSl7aWYoYSE9PXhnKXJldHVybiExO2lmKCFJKXJldHVybiBGZyhhKSxJPSEwLCExO3ZhciBiOyhiPTMhPT1hLnRhZykmJiEoYj01IT09YS50YWcpJiYoYj1hLnR5cGUsYj0iaGVhZCIhPT1iJiYiYm9keSIhPT1iJiYhRWYoYS50eXBlLGEubWVtb2l6ZWRQcm9wcykpO2lmKGImJihiPXlnKSl7aWYoRGcoYSkpdGhyb3cgSGcoKSxFcnJvcihwKDQxOCkpO2Zvcig7YjspQWcoYSxiKSxiPUxmKGIubmV4dFNpYmxpbmcpfUZnKGEpO2lmKDEzPT09YS50YWcpe2E9YS5tZW1vaXplZFN0YXRlO2E9bnVsbCE9PWE/YS5kZWh5ZHJhdGVkOm51bGw7aWYoIWEpdGhyb3cgRXJyb3IocCgzMTcpKTthOnthPWEubmV4dFNpYmxpbmc7Zm9yKGI9MDthOyl7aWYoOD09PWEubm9kZVR5cGUpe3ZhciBjPWEuZGF0YTtpZigiLyQiPT09Yyl7aWYoMD09PWIpe3lnPUxmKGEubmV4dFNpYmxpbmcpO2JyZWFrIGF9Yi0tfWVsc2UiJCIhPT1jJiYiJCEiIT09YyYmIiQ/IiE9PWN8fGIrK31hPWEubmV4dFNpYmxpbmd9eWc9Cm51bGx9fWVsc2UgeWc9eGc/TGYoYS5zdGF0ZU5vZGUubmV4dFNpYmxpbmcpOm51bGw7cmV0dXJuITB9ZnVuY3Rpb24gSGcoKXtmb3IodmFyIGE9eWc7YTspYT1MZihhLm5leHRTaWJsaW5nKX1mdW5jdGlvbiBJZygpe3lnPXhnPW51bGw7ST0hMX1mdW5jdGlvbiBKZyhhKXtudWxsPT09emc/emc9W2FdOnpnLnB1c2goYSl9dmFyIEtnPXVhLlJlYWN0Q3VycmVudEJhdGNoQ29uZmlnO2Z1bmN0aW9uIExnKGEsYil7aWYoYSYmYS5kZWZhdWx0UHJvcHMpe2I9QSh7fSxiKTthPWEuZGVmYXVsdFByb3BzO2Zvcih2YXIgYyBpbiBhKXZvaWQgMD09PWJbY10mJihiW2NdPWFbY10pO3JldHVybiBifXJldHVybiBifXZhciBNZz1VZihudWxsKSxOZz1udWxsLE9nPW51bGwsUGc9bnVsbDtmdW5jdGlvbiBRZygpe1BnPU9nPU5nPW51bGx9ZnVuY3Rpb24gUmcoYSl7dmFyIGI9TWcuY3VycmVudDtFKE1nKTthLl9jdXJyZW50VmFsdWU9Yn0KZnVuY3Rpb24gU2coYSxiLGMpe2Zvcig7bnVsbCE9PWE7KXt2YXIgZD1hLmFsdGVybmF0ZTsoYS5jaGlsZExhbmVzJmIpIT09Yj8oYS5jaGlsZExhbmVzfD1iLG51bGwhPT1kJiYoZC5jaGlsZExhbmVzfD1iKSk6bnVsbCE9PWQmJihkLmNoaWxkTGFuZXMmYikhPT1iJiYoZC5jaGlsZExhbmVzfD1iKTtpZihhPT09YylicmVhazthPWEucmV0dXJufX1mdW5jdGlvbiBUZyhhLGIpe05nPWE7UGc9T2c9bnVsbDthPWEuZGVwZW5kZW5jaWVzO251bGwhPT1hJiZudWxsIT09YS5maXJzdENvbnRleHQmJigwIT09KGEubGFuZXMmYikmJihVZz0hMCksYS5maXJzdENvbnRleHQ9bnVsbCl9CmZ1bmN0aW9uIFZnKGEpe3ZhciBiPWEuX2N1cnJlbnRWYWx1ZTtpZihQZyE9PWEpaWYoYT17Y29udGV4dDphLG1lbW9pemVkVmFsdWU6YixuZXh0Om51bGx9LG51bGw9PT1PZyl7aWYobnVsbD09PU5nKXRocm93IEVycm9yKHAoMzA4KSk7T2c9YTtOZy5kZXBlbmRlbmNpZXM9e2xhbmVzOjAsZmlyc3RDb250ZXh0OmF9fWVsc2UgT2c9T2cubmV4dD1hO3JldHVybiBifXZhciBXZz1udWxsO2Z1bmN0aW9uIFhnKGEpe251bGw9PT1XZz9XZz1bYV06V2cucHVzaChhKX1mdW5jdGlvbiBZZyhhLGIsYyxkKXt2YXIgZT1iLmludGVybGVhdmVkO251bGw9PT1lPyhjLm5leHQ9YyxYZyhiKSk6KGMubmV4dD1lLm5leHQsZS5uZXh0PWMpO2IuaW50ZXJsZWF2ZWQ9YztyZXR1cm4gWmcoYSxkKX0KZnVuY3Rpb24gWmcoYSxiKXthLmxhbmVzfD1iO3ZhciBjPWEuYWx0ZXJuYXRlO251bGwhPT1jJiYoYy5sYW5lc3w9Yik7Yz1hO2ZvcihhPWEucmV0dXJuO251bGwhPT1hOylhLmNoaWxkTGFuZXN8PWIsYz1hLmFsdGVybmF0ZSxudWxsIT09YyYmKGMuY2hpbGRMYW5lc3w9YiksYz1hLGE9YS5yZXR1cm47cmV0dXJuIDM9PT1jLnRhZz9jLnN0YXRlTm9kZTpudWxsfXZhciAkZz0hMTtmdW5jdGlvbiBhaChhKXthLnVwZGF0ZVF1ZXVlPXtiYXNlU3RhdGU6YS5tZW1vaXplZFN0YXRlLGZpcnN0QmFzZVVwZGF0ZTpudWxsLGxhc3RCYXNlVXBkYXRlOm51bGwsc2hhcmVkOntwZW5kaW5nOm51bGwsaW50ZXJsZWF2ZWQ6bnVsbCxsYW5lczowfSxlZmZlY3RzOm51bGx9fQpmdW5jdGlvbiBiaChhLGIpe2E9YS51cGRhdGVRdWV1ZTtiLnVwZGF0ZVF1ZXVlPT09YSYmKGIudXBkYXRlUXVldWU9e2Jhc2VTdGF0ZTphLmJhc2VTdGF0ZSxmaXJzdEJhc2VVcGRhdGU6YS5maXJzdEJhc2VVcGRhdGUsbGFzdEJhc2VVcGRhdGU6YS5sYXN0QmFzZVVwZGF0ZSxzaGFyZWQ6YS5zaGFyZWQsZWZmZWN0czphLmVmZmVjdHN9KX1mdW5jdGlvbiBjaChhLGIpe3JldHVybntldmVudFRpbWU6YSxsYW5lOmIsdGFnOjAscGF5bG9hZDpudWxsLGNhbGxiYWNrOm51bGwsbmV4dDpudWxsfX0KZnVuY3Rpb24gZGgoYSxiLGMpe3ZhciBkPWEudXBkYXRlUXVldWU7aWYobnVsbD09PWQpcmV0dXJuIG51bGw7ZD1kLnNoYXJlZDtpZigwIT09KEsmMikpe3ZhciBlPWQucGVuZGluZztudWxsPT09ZT9iLm5leHQ9YjooYi5uZXh0PWUubmV4dCxlLm5leHQ9Yik7ZC5wZW5kaW5nPWI7cmV0dXJuIFpnKGEsYyl9ZT1kLmludGVybGVhdmVkO251bGw9PT1lPyhiLm5leHQ9YixYZyhkKSk6KGIubmV4dD1lLm5leHQsZS5uZXh0PWIpO2QuaW50ZXJsZWF2ZWQ9YjtyZXR1cm4gWmcoYSxjKX1mdW5jdGlvbiBlaChhLGIsYyl7Yj1iLnVwZGF0ZVF1ZXVlO2lmKG51bGwhPT1iJiYoYj1iLnNoYXJlZCwwIT09KGMmNDE5NDI0MCkpKXt2YXIgZD1iLmxhbmVzO2QmPWEucGVuZGluZ0xhbmVzO2N8PWQ7Yi5sYW5lcz1jO0NjKGEsYyl9fQpmdW5jdGlvbiBmaChhLGIpe3ZhciBjPWEudXBkYXRlUXVldWUsZD1hLmFsdGVybmF0ZTtpZihudWxsIT09ZCYmKGQ9ZC51cGRhdGVRdWV1ZSxjPT09ZCkpe3ZhciBlPW51bGwsZj1udWxsO2M9Yy5maXJzdEJhc2VVcGRhdGU7aWYobnVsbCE9PWMpe2Rve3ZhciBnPXtldmVudFRpbWU6Yy5ldmVudFRpbWUsbGFuZTpjLmxhbmUsdGFnOmMudGFnLHBheWxvYWQ6Yy5wYXlsb2FkLGNhbGxiYWNrOmMuY2FsbGJhY2ssbmV4dDpudWxsfTtudWxsPT09Zj9lPWY9ZzpmPWYubmV4dD1nO2M9Yy5uZXh0fXdoaWxlKG51bGwhPT1jKTtudWxsPT09Zj9lPWY9YjpmPWYubmV4dD1ifWVsc2UgZT1mPWI7Yz17YmFzZVN0YXRlOmQuYmFzZVN0YXRlLGZpcnN0QmFzZVVwZGF0ZTplLGxhc3RCYXNlVXBkYXRlOmYsc2hhcmVkOmQuc2hhcmVkLGVmZmVjdHM6ZC5lZmZlY3RzfTthLnVwZGF0ZVF1ZXVlPWM7cmV0dXJufWE9Yy5sYXN0QmFzZVVwZGF0ZTtudWxsPT09YT9jLmZpcnN0QmFzZVVwZGF0ZT1iOmEubmV4dD0KYjtjLmxhc3RCYXNlVXBkYXRlPWJ9CmZ1bmN0aW9uIGdoKGEsYixjLGQpe3ZhciBlPWEudXBkYXRlUXVldWU7JGc9ITE7dmFyIGY9ZS5maXJzdEJhc2VVcGRhdGUsZz1lLmxhc3RCYXNlVXBkYXRlLGg9ZS5zaGFyZWQucGVuZGluZztpZihudWxsIT09aCl7ZS5zaGFyZWQucGVuZGluZz1udWxsO3ZhciBrPWgsbD1rLm5leHQ7ay5uZXh0PW51bGw7bnVsbD09PWc/Zj1sOmcubmV4dD1sO2c9azt2YXIgbT1hLmFsdGVybmF0ZTtudWxsIT09bSYmKG09bS51cGRhdGVRdWV1ZSxoPW0ubGFzdEJhc2VVcGRhdGUsaCE9PWcmJihudWxsPT09aD9tLmZpcnN0QmFzZVVwZGF0ZT1sOmgubmV4dD1sLG0ubGFzdEJhc2VVcGRhdGU9aykpfWlmKG51bGwhPT1mKXt2YXIgcT1lLmJhc2VTdGF0ZTtnPTA7bT1sPWs9bnVsbDtoPWY7ZG97dmFyIHI9aC5sYW5lLHk9aC5ldmVudFRpbWU7aWYoKGQmcik9PT1yKXtudWxsIT09bSYmKG09bS5uZXh0PXtldmVudFRpbWU6eSxsYW5lOjAsdGFnOmgudGFnLHBheWxvYWQ6aC5wYXlsb2FkLGNhbGxiYWNrOmguY2FsbGJhY2ssCm5leHQ6bnVsbH0pO2E6e3ZhciBuPWEsdD1oO3I9Yjt5PWM7c3dpdGNoKHQudGFnKXtjYXNlIDE6bj10LnBheWxvYWQ7aWYoImZ1bmN0aW9uIj09PXR5cGVvZiBuKXtxPW4uY2FsbCh5LHEscik7YnJlYWsgYX1xPW47YnJlYWsgYTtjYXNlIDM6bi5mbGFncz1uLmZsYWdzJi02NTUzN3wxMjg7Y2FzZSAwOm49dC5wYXlsb2FkO3I9ImZ1bmN0aW9uIj09PXR5cGVvZiBuP24uY2FsbCh5LHEscik6bjtpZihudWxsPT09cnx8dm9pZCAwPT09cilicmVhayBhO3E9QSh7fSxxLHIpO2JyZWFrIGE7Y2FzZSAyOiRnPSEwfX1udWxsIT09aC5jYWxsYmFjayYmMCE9PWgubGFuZSYmKGEuZmxhZ3N8PTY0LHI9ZS5lZmZlY3RzLG51bGw9PT1yP2UuZWZmZWN0cz1baF06ci5wdXNoKGgpKX1lbHNlIHk9e2V2ZW50VGltZTp5LGxhbmU6cix0YWc6aC50YWcscGF5bG9hZDpoLnBheWxvYWQsY2FsbGJhY2s6aC5jYWxsYmFjayxuZXh0Om51bGx9LG51bGw9PT1tPyhsPW09eSxrPXEpOm09bS5uZXh0PXksZ3w9cjsKaD1oLm5leHQ7aWYobnVsbD09PWgpaWYoaD1lLnNoYXJlZC5wZW5kaW5nLG51bGw9PT1oKWJyZWFrO2Vsc2Ugcj1oLGg9ci5uZXh0LHIubmV4dD1udWxsLGUubGFzdEJhc2VVcGRhdGU9cixlLnNoYXJlZC5wZW5kaW5nPW51bGx9d2hpbGUoMSk7bnVsbD09PW0mJihrPXEpO2UuYmFzZVN0YXRlPWs7ZS5maXJzdEJhc2VVcGRhdGU9bDtlLmxhc3RCYXNlVXBkYXRlPW07Yj1lLnNoYXJlZC5pbnRlcmxlYXZlZDtpZihudWxsIT09Yil7ZT1iO2RvIGd8PWUubGFuZSxlPWUubmV4dDt3aGlsZShlIT09Yil9ZWxzZSBudWxsPT09ZiYmKGUuc2hhcmVkLmxhbmVzPTApO2hofD1nO2EubGFuZXM9ZzthLm1lbW9pemVkU3RhdGU9cX19CmZ1bmN0aW9uIGloKGEsYixjKXthPWIuZWZmZWN0cztiLmVmZmVjdHM9bnVsbDtpZihudWxsIT09YSlmb3IoYj0wO2I8YS5sZW5ndGg7YisrKXt2YXIgZD1hW2JdLGU9ZC5jYWxsYmFjaztpZihudWxsIT09ZSl7ZC5jYWxsYmFjaz1udWxsO2Q9YztpZigiZnVuY3Rpb24iIT09dHlwZW9mIGUpdGhyb3cgRXJyb3IocCgxOTEsZSkpO2UuY2FsbChkKX19fXZhciBqaD0obmV3IGFhLkNvbXBvbmVudCkucmVmcztmdW5jdGlvbiBraChhLGIsYyxkKXtiPWEubWVtb2l6ZWRTdGF0ZTtjPWMoZCxiKTtjPW51bGw9PT1jfHx2b2lkIDA9PT1jP2I6QSh7fSxiLGMpO2EubWVtb2l6ZWRTdGF0ZT1jOzA9PT1hLmxhbmVzJiYoYS51cGRhdGVRdWV1ZS5iYXNlU3RhdGU9Yyl9CnZhciBuaD17aXNNb3VudGVkOmZ1bmN0aW9uKGEpe3JldHVybihhPWEuX3JlYWN0SW50ZXJuYWxzKT9WYihhKT09PWE6ITF9LGVucXVldWVTZXRTdGF0ZTpmdW5jdGlvbihhLGIsYyl7YT1hLl9yZWFjdEludGVybmFsczt2YXIgZD1MKCksZT1saChhKSxmPWNoKGQsZSk7Zi5wYXlsb2FkPWI7dm9pZCAwIT09YyYmbnVsbCE9PWMmJihmLmNhbGxiYWNrPWMpO2I9ZGgoYSxmLGUpO251bGwhPT1iJiYobWgoYixhLGUsZCksZWgoYixhLGUpKX0sZW5xdWV1ZVJlcGxhY2VTdGF0ZTpmdW5jdGlvbihhLGIsYyl7YT1hLl9yZWFjdEludGVybmFsczt2YXIgZD1MKCksZT1saChhKSxmPWNoKGQsZSk7Zi50YWc9MTtmLnBheWxvYWQ9Yjt2b2lkIDAhPT1jJiZudWxsIT09YyYmKGYuY2FsbGJhY2s9Yyk7Yj1kaChhLGYsZSk7bnVsbCE9PWImJihtaChiLGEsZSxkKSxlaChiLGEsZSkpfSxlbnF1ZXVlRm9yY2VVcGRhdGU6ZnVuY3Rpb24oYSxiKXthPWEuX3JlYWN0SW50ZXJuYWxzO3ZhciBjPUwoKSxkPQpsaChhKSxlPWNoKGMsZCk7ZS50YWc9Mjt2b2lkIDAhPT1iJiZudWxsIT09YiYmKGUuY2FsbGJhY2s9Yik7Yj1kaChhLGUsZCk7bnVsbCE9PWImJihtaChiLGEsZCxjKSxlaChiLGEsZCkpfX07ZnVuY3Rpb24gb2goYSxiLGMsZCxlLGYsZyl7YT1hLnN0YXRlTm9kZTtyZXR1cm4iZnVuY3Rpb24iPT09dHlwZW9mIGEuc2hvdWxkQ29tcG9uZW50VXBkYXRlP2Euc2hvdWxkQ29tcG9uZW50VXBkYXRlKGQsZixnKTpiLnByb3RvdHlwZSYmYi5wcm90b3R5cGUuaXNQdXJlUmVhY3RDb21wb25lbnQ/IUllKGMsZCl8fCFJZShlLGYpOiEwfQpmdW5jdGlvbiBwaChhLGIsYyl7dmFyIGQ9ITEsZT1WZjt2YXIgZj1iLmNvbnRleHRUeXBlOyJvYmplY3QiPT09dHlwZW9mIGYmJm51bGwhPT1mP2Y9VmcoZik6KGU9WmYoYik/WGY6SC5jdXJyZW50LGQ9Yi5jb250ZXh0VHlwZXMsZj0oZD1udWxsIT09ZCYmdm9pZCAwIT09ZCk/WWYoYSxlKTpWZik7Yj1uZXcgYihjLGYpO2EubWVtb2l6ZWRTdGF0ZT1udWxsIT09Yi5zdGF0ZSYmdm9pZCAwIT09Yi5zdGF0ZT9iLnN0YXRlOm51bGw7Yi51cGRhdGVyPW5oO2Euc3RhdGVOb2RlPWI7Yi5fcmVhY3RJbnRlcm5hbHM9YTtkJiYoYT1hLnN0YXRlTm9kZSxhLl9fcmVhY3RJbnRlcm5hbE1lbW9pemVkVW5tYXNrZWRDaGlsZENvbnRleHQ9ZSxhLl9fcmVhY3RJbnRlcm5hbE1lbW9pemVkTWFza2VkQ2hpbGRDb250ZXh0PWYpO3JldHVybiBifQpmdW5jdGlvbiBxaChhLGIsYyxkKXthPWIuc3RhdGU7ImZ1bmN0aW9uIj09PXR5cGVvZiBiLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMmJmIuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhjLGQpOyJmdW5jdGlvbiI9PT10eXBlb2YgYi5VTlNBRkVfY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyYmYi5VTlNBRkVfY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhjLGQpO2Iuc3RhdGUhPT1hJiZuaC5lbnF1ZXVlUmVwbGFjZVN0YXRlKGIsYi5zdGF0ZSxudWxsKX0KZnVuY3Rpb24gcmgoYSxiLGMsZCl7dmFyIGU9YS5zdGF0ZU5vZGU7ZS5wcm9wcz1jO2Uuc3RhdGU9YS5tZW1vaXplZFN0YXRlO2UucmVmcz1qaDthaChhKTt2YXIgZj1iLmNvbnRleHRUeXBlOyJvYmplY3QiPT09dHlwZW9mIGYmJm51bGwhPT1mP2UuY29udGV4dD1WZyhmKTooZj1aZihiKT9YZjpILmN1cnJlbnQsZS5jb250ZXh0PVlmKGEsZikpO2Uuc3RhdGU9YS5tZW1vaXplZFN0YXRlO2Y9Yi5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHM7ImZ1bmN0aW9uIj09PXR5cGVvZiBmJiYoa2goYSxiLGYsYyksZS5zdGF0ZT1hLm1lbW9pemVkU3RhdGUpOyJmdW5jdGlvbiI9PT10eXBlb2YgYi5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHN8fCJmdW5jdGlvbiI9PT10eXBlb2YgZS5nZXRTbmFwc2hvdEJlZm9yZVVwZGF0ZXx8ImZ1bmN0aW9uIiE9PXR5cGVvZiBlLlVOU0FGRV9jb21wb25lbnRXaWxsTW91bnQmJiJmdW5jdGlvbiIhPT10eXBlb2YgZS5jb21wb25lbnRXaWxsTW91bnR8fChiPWUuc3RhdGUsCiJmdW5jdGlvbiI9PT10eXBlb2YgZS5jb21wb25lbnRXaWxsTW91bnQmJmUuY29tcG9uZW50V2lsbE1vdW50KCksImZ1bmN0aW9uIj09PXR5cGVvZiBlLlVOU0FGRV9jb21wb25lbnRXaWxsTW91bnQmJmUuVU5TQUZFX2NvbXBvbmVudFdpbGxNb3VudCgpLGIhPT1lLnN0YXRlJiZuaC5lbnF1ZXVlUmVwbGFjZVN0YXRlKGUsZS5zdGF0ZSxudWxsKSxnaChhLGMsZSxkKSxlLnN0YXRlPWEubWVtb2l6ZWRTdGF0ZSk7ImZ1bmN0aW9uIj09PXR5cGVvZiBlLmNvbXBvbmVudERpZE1vdW50JiYoYS5mbGFnc3w9NDE5NDMwOCl9CmZ1bmN0aW9uIHNoKGEsYixjKXthPWMucmVmO2lmKG51bGwhPT1hJiYiZnVuY3Rpb24iIT09dHlwZW9mIGEmJiJvYmplY3QiIT09dHlwZW9mIGEpe2lmKGMuX293bmVyKXtjPWMuX293bmVyO2lmKGMpe2lmKDEhPT1jLnRhZyl0aHJvdyBFcnJvcihwKDMwOSkpO3ZhciBkPWMuc3RhdGVOb2RlfWlmKCFkKXRocm93IEVycm9yKHAoMTQ3LGEpKTt2YXIgZT1kLGY9IiIrYTtpZihudWxsIT09YiYmbnVsbCE9PWIucmVmJiYiZnVuY3Rpb24iPT09dHlwZW9mIGIucmVmJiZiLnJlZi5fc3RyaW5nUmVmPT09ZilyZXR1cm4gYi5yZWY7Yj1mdW5jdGlvbihhKXt2YXIgYj1lLnJlZnM7Yj09PWpoJiYoYj1lLnJlZnM9e30pO251bGw9PT1hP2RlbGV0ZSBiW2ZdOmJbZl09YX07Yi5fc3RyaW5nUmVmPWY7cmV0dXJuIGJ9aWYoInN0cmluZyIhPT10eXBlb2YgYSl0aHJvdyBFcnJvcihwKDI4NCkpO2lmKCFjLl9vd25lcil0aHJvdyBFcnJvcihwKDI5MCxhKSk7fXJldHVybiBhfQpmdW5jdGlvbiB0aChhLGIpe2E9T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGIpO3Rocm93IEVycm9yKHAoMzEsIltvYmplY3QgT2JqZWN0XSI9PT1hPyJvYmplY3Qgd2l0aCBrZXlzIHsiK09iamVjdC5rZXlzKGIpLmpvaW4oIiwgIikrIn0iOmEpKTt9ZnVuY3Rpb24gdWgoYSl7dmFyIGI9YS5faW5pdDtyZXR1cm4gYihhLl9wYXlsb2FkKX0KZnVuY3Rpb24gdmgoYSl7ZnVuY3Rpb24gYihiLGMpe2lmKGEpe3ZhciBkPWIuZGVsZXRpb25zO251bGw9PT1kPyhiLmRlbGV0aW9ucz1bY10sYi5mbGFnc3w9MTYpOmQucHVzaChjKX19ZnVuY3Rpb24gYyhjLGQpe2lmKCFhKXJldHVybiBudWxsO2Zvcig7bnVsbCE9PWQ7KWIoYyxkKSxkPWQuc2libGluZztyZXR1cm4gbnVsbH1mdW5jdGlvbiBkKGEsYil7Zm9yKGE9bmV3IE1hcDtudWxsIT09YjspbnVsbCE9PWIua2V5P2Euc2V0KGIua2V5LGIpOmEuc2V0KGIuaW5kZXgsYiksYj1iLnNpYmxpbmc7cmV0dXJuIGF9ZnVuY3Rpb24gZShhLGIpe2E9d2goYSxiKTthLmluZGV4PTA7YS5zaWJsaW5nPW51bGw7cmV0dXJuIGF9ZnVuY3Rpb24gZihiLGMsZCl7Yi5pbmRleD1kO2lmKCFhKXJldHVybiBiLmZsYWdzfD0xMDQ4NTc2LGM7ZD1iLmFsdGVybmF0ZTtpZihudWxsIT09ZClyZXR1cm4gZD1kLmluZGV4LGQ8Yz8oYi5mbGFnc3w9MixjKTpkO2IuZmxhZ3N8PTI7cmV0dXJuIGN9ZnVuY3Rpb24gZyhiKXthJiYKbnVsbD09PWIuYWx0ZXJuYXRlJiYoYi5mbGFnc3w9Mik7cmV0dXJuIGJ9ZnVuY3Rpb24gaChhLGIsYyxkKXtpZihudWxsPT09Ynx8NiE9PWIudGFnKXJldHVybiBiPXhoKGMsYS5tb2RlLGQpLGIucmV0dXJuPWEsYjtiPWUoYixjKTtiLnJldHVybj1hO3JldHVybiBifWZ1bmN0aW9uIGsoYSxiLGMsZCl7dmFyIGY9Yy50eXBlO2lmKGY9PT15YSlyZXR1cm4gbShhLGIsYy5wcm9wcy5jaGlsZHJlbixkLGMua2V5KTtpZihudWxsIT09YiYmKGIuZWxlbWVudFR5cGU9PT1mfHwib2JqZWN0Ij09PXR5cGVvZiBmJiZudWxsIT09ZiYmZi4kJHR5cGVvZj09PUhhJiZ1aChmKT09PWIudHlwZSkpcmV0dXJuIGQ9ZShiLGMucHJvcHMpLGQucmVmPXNoKGEsYixjKSxkLnJldHVybj1hLGQ7ZD15aChjLnR5cGUsYy5rZXksYy5wcm9wcyxudWxsLGEubW9kZSxkKTtkLnJlZj1zaChhLGIsYyk7ZC5yZXR1cm49YTtyZXR1cm4gZH1mdW5jdGlvbiBsKGEsYixjLGQpe2lmKG51bGw9PT1ifHw0IT09Yi50YWd8fApiLnN0YXRlTm9kZS5jb250YWluZXJJbmZvIT09Yy5jb250YWluZXJJbmZvfHxiLnN0YXRlTm9kZS5pbXBsZW1lbnRhdGlvbiE9PWMuaW1wbGVtZW50YXRpb24pcmV0dXJuIGI9emgoYyxhLm1vZGUsZCksYi5yZXR1cm49YSxiO2I9ZShiLGMuY2hpbGRyZW58fFtdKTtiLnJldHVybj1hO3JldHVybiBifWZ1bmN0aW9uIG0oYSxiLGMsZCxmKXtpZihudWxsPT09Ynx8NyE9PWIudGFnKXJldHVybiBiPUFoKGMsYS5tb2RlLGQsZiksYi5yZXR1cm49YSxiO2I9ZShiLGMpO2IucmV0dXJuPWE7cmV0dXJuIGJ9ZnVuY3Rpb24gcShhLGIsYyl7aWYoInN0cmluZyI9PT10eXBlb2YgYiYmIiIhPT1ifHwibnVtYmVyIj09PXR5cGVvZiBiKXJldHVybiBiPXhoKCIiK2IsYS5tb2RlLGMpLGIucmV0dXJuPWEsYjtpZigib2JqZWN0Ij09PXR5cGVvZiBiJiZudWxsIT09Yil7c3dpdGNoKGIuJCR0eXBlb2Ype2Nhc2UgdmE6cmV0dXJuIGM9eWgoYi50eXBlLGIua2V5LGIucHJvcHMsbnVsbCxhLm1vZGUsYyksCmMucmVmPXNoKGEsbnVsbCxiKSxjLnJldHVybj1hLGM7Y2FzZSB3YTpyZXR1cm4gYj16aChiLGEubW9kZSxjKSxiLnJldHVybj1hLGI7Y2FzZSBIYTp2YXIgZD1iLl9pbml0O3JldHVybiBxKGEsZChiLl9wYXlsb2FkKSxjKX1pZihlYihiKXx8S2EoYikpcmV0dXJuIGI9QWgoYixhLm1vZGUsYyxudWxsKSxiLnJldHVybj1hLGI7dGgoYSxiKX1yZXR1cm4gbnVsbH1mdW5jdGlvbiByKGEsYixjLGQpe3ZhciBlPW51bGwhPT1iP2Iua2V5Om51bGw7aWYoInN0cmluZyI9PT10eXBlb2YgYyYmIiIhPT1jfHwibnVtYmVyIj09PXR5cGVvZiBjKXJldHVybiBudWxsIT09ZT9udWxsOmgoYSxiLCIiK2MsZCk7aWYoIm9iamVjdCI9PT10eXBlb2YgYyYmbnVsbCE9PWMpe3N3aXRjaChjLiQkdHlwZW9mKXtjYXNlIHZhOnJldHVybiBjLmtleT09PWU/ayhhLGIsYyxkKTpudWxsO2Nhc2Ugd2E6cmV0dXJuIGMua2V5PT09ZT9sKGEsYixjLGQpOm51bGw7Y2FzZSBIYTpyZXR1cm4gZT1jLl9pbml0LHIoYSwKYixlKGMuX3BheWxvYWQpLGQpfWlmKGViKGMpfHxLYShjKSlyZXR1cm4gbnVsbCE9PWU/bnVsbDptKGEsYixjLGQsbnVsbCk7dGgoYSxjKX1yZXR1cm4gbnVsbH1mdW5jdGlvbiB5KGEsYixjLGQsZSl7aWYoInN0cmluZyI9PT10eXBlb2YgZCYmIiIhPT1kfHwibnVtYmVyIj09PXR5cGVvZiBkKXJldHVybiBhPWEuZ2V0KGMpfHxudWxsLGgoYixhLCIiK2QsZSk7aWYoIm9iamVjdCI9PT10eXBlb2YgZCYmbnVsbCE9PWQpe3N3aXRjaChkLiQkdHlwZW9mKXtjYXNlIHZhOnJldHVybiBhPWEuZ2V0KG51bGw9PT1kLmtleT9jOmQua2V5KXx8bnVsbCxrKGIsYSxkLGUpO2Nhc2Ugd2E6cmV0dXJuIGE9YS5nZXQobnVsbD09PWQua2V5P2M6ZC5rZXkpfHxudWxsLGwoYixhLGQsZSk7Y2FzZSBIYTp2YXIgZj1kLl9pbml0O3JldHVybiB5KGEsYixjLGYoZC5fcGF5bG9hZCksZSl9aWYoZWIoZCl8fEthKGQpKXJldHVybiBhPWEuZ2V0KGMpfHxudWxsLG0oYixhLGQsZSxudWxsKTt0aChiLGQpfXJldHVybiBudWxsfQpmdW5jdGlvbiBuKGUsZyxoLGspe2Zvcih2YXIgbD1udWxsLG09bnVsbCx1PWcsdz1nPTAseD1udWxsO251bGwhPT11JiZ3PGgubGVuZ3RoO3crKyl7dS5pbmRleD53Pyh4PXUsdT1udWxsKTp4PXUuc2libGluZzt2YXIgbj1yKGUsdSxoW3ddLGspO2lmKG51bGw9PT1uKXtudWxsPT09dSYmKHU9eCk7YnJlYWt9YSYmdSYmbnVsbD09PW4uYWx0ZXJuYXRlJiZiKGUsdSk7Zz1mKG4sZyx3KTtudWxsPT09bT9sPW46bS5zaWJsaW5nPW47bT1uO3U9eH1pZih3PT09aC5sZW5ndGgpcmV0dXJuIGMoZSx1KSxJJiZ0ZyhlLHcpLGw7aWYobnVsbD09PXUpe2Zvcig7dzxoLmxlbmd0aDt3KyspdT1xKGUsaFt3XSxrKSxudWxsIT09dSYmKGc9Zih1LGcsdyksbnVsbD09PW0/bD11Om0uc2libGluZz11LG09dSk7SSYmdGcoZSx3KTtyZXR1cm4gbH1mb3IodT1kKGUsdSk7dzxoLmxlbmd0aDt3KyspeD15KHUsZSx3LGhbd10sayksbnVsbCE9PXgmJihhJiZudWxsIT09eC5hbHRlcm5hdGUmJnUuZGVsZXRlKG51bGw9PT0KeC5rZXk/dzp4LmtleSksZz1mKHgsZyx3KSxudWxsPT09bT9sPXg6bS5zaWJsaW5nPXgsbT14KTthJiZ1LmZvckVhY2goZnVuY3Rpb24oYSl7cmV0dXJuIGIoZSxhKX0pO0kmJnRnKGUsdyk7cmV0dXJuIGx9ZnVuY3Rpb24gdChlLGcsaCxrKXt2YXIgbD1LYShoKTtpZigiZnVuY3Rpb24iIT09dHlwZW9mIGwpdGhyb3cgRXJyb3IocCgxNTApKTtoPWwuY2FsbChoKTtpZihudWxsPT1oKXRocm93IEVycm9yKHAoMTUxKSk7Zm9yKHZhciB1PWw9bnVsbCxtPWcsdz1nPTAseD1udWxsLG49aC5uZXh0KCk7bnVsbCE9PW0mJiFuLmRvbmU7dysrLG49aC5uZXh0KCkpe20uaW5kZXg+dz8oeD1tLG09bnVsbCk6eD1tLnNpYmxpbmc7dmFyIHQ9cihlLG0sbi52YWx1ZSxrKTtpZihudWxsPT09dCl7bnVsbD09PW0mJihtPXgpO2JyZWFrfWEmJm0mJm51bGw9PT10LmFsdGVybmF0ZSYmYihlLG0pO2c9Zih0LGcsdyk7bnVsbD09PXU/bD10OnUuc2libGluZz10O3U9dDttPXh9aWYobi5kb25lKXJldHVybiBjKGUsCm0pLEkmJnRnKGUsdyksbDtpZihudWxsPT09bSl7Zm9yKDshbi5kb25lO3crKyxuPWgubmV4dCgpKW49cShlLG4udmFsdWUsayksbnVsbCE9PW4mJihnPWYobixnLHcpLG51bGw9PT11P2w9bjp1LnNpYmxpbmc9bix1PW4pO0kmJnRnKGUsdyk7cmV0dXJuIGx9Zm9yKG09ZChlLG0pOyFuLmRvbmU7dysrLG49aC5uZXh0KCkpbj15KG0sZSx3LG4udmFsdWUsayksbnVsbCE9PW4mJihhJiZudWxsIT09bi5hbHRlcm5hdGUmJm0uZGVsZXRlKG51bGw9PT1uLmtleT93Om4ua2V5KSxnPWYobixnLHcpLG51bGw9PT11P2w9bjp1LnNpYmxpbmc9bix1PW4pO2EmJm0uZm9yRWFjaChmdW5jdGlvbihhKXtyZXR1cm4gYihlLGEpfSk7SSYmdGcoZSx3KTtyZXR1cm4gbH1mdW5jdGlvbiBKKGEsZCxmLGgpeyJvYmplY3QiPT09dHlwZW9mIGYmJm51bGwhPT1mJiZmLnR5cGU9PT15YSYmbnVsbD09PWYua2V5JiYoZj1mLnByb3BzLmNoaWxkcmVuKTtpZigib2JqZWN0Ij09PXR5cGVvZiBmJiZudWxsIT09Zil7c3dpdGNoKGYuJCR0eXBlb2Ype2Nhc2UgdmE6YTp7Zm9yKHZhciBrPQpmLmtleSxsPWQ7bnVsbCE9PWw7KXtpZihsLmtleT09PWspe2s9Zi50eXBlO2lmKGs9PT15YSl7aWYoNz09PWwudGFnKXtjKGEsbC5zaWJsaW5nKTtkPWUobCxmLnByb3BzLmNoaWxkcmVuKTtkLnJldHVybj1hO2E9ZDticmVhayBhfX1lbHNlIGlmKGwuZWxlbWVudFR5cGU9PT1rfHwib2JqZWN0Ij09PXR5cGVvZiBrJiZudWxsIT09ayYmay4kJHR5cGVvZj09PUhhJiZ1aChrKT09PWwudHlwZSl7YyhhLGwuc2libGluZyk7ZD1lKGwsZi5wcm9wcyk7ZC5yZWY9c2goYSxsLGYpO2QucmV0dXJuPWE7YT1kO2JyZWFrIGF9YyhhLGwpO2JyZWFrfWVsc2UgYihhLGwpO2w9bC5zaWJsaW5nfWYudHlwZT09PXlhPyhkPUFoKGYucHJvcHMuY2hpbGRyZW4sYS5tb2RlLGgsZi5rZXkpLGQucmV0dXJuPWEsYT1kKTooaD15aChmLnR5cGUsZi5rZXksZi5wcm9wcyxudWxsLGEubW9kZSxoKSxoLnJlZj1zaChhLGQsZiksaC5yZXR1cm49YSxhPWgpfXJldHVybiBnKGEpO2Nhc2Ugd2E6YTp7Zm9yKGw9Zi5rZXk7bnVsbCE9PQpkOyl7aWYoZC5rZXk9PT1sKWlmKDQ9PT1kLnRhZyYmZC5zdGF0ZU5vZGUuY29udGFpbmVySW5mbz09PWYuY29udGFpbmVySW5mbyYmZC5zdGF0ZU5vZGUuaW1wbGVtZW50YXRpb249PT1mLmltcGxlbWVudGF0aW9uKXtjKGEsZC5zaWJsaW5nKTtkPWUoZCxmLmNoaWxkcmVufHxbXSk7ZC5yZXR1cm49YTthPWQ7YnJlYWsgYX1lbHNle2MoYSxkKTticmVha31lbHNlIGIoYSxkKTtkPWQuc2libGluZ31kPXpoKGYsYS5tb2RlLGgpO2QucmV0dXJuPWE7YT1kfXJldHVybiBnKGEpO2Nhc2UgSGE6cmV0dXJuIGw9Zi5faW5pdCxKKGEsZCxsKGYuX3BheWxvYWQpLGgpfWlmKGViKGYpKXJldHVybiBuKGEsZCxmLGgpO2lmKEthKGYpKXJldHVybiB0KGEsZCxmLGgpO3RoKGEsZil9cmV0dXJuInN0cmluZyI9PT10eXBlb2YgZiYmIiIhPT1mfHwibnVtYmVyIj09PXR5cGVvZiBmPyhmPSIiK2YsbnVsbCE9PWQmJjY9PT1kLnRhZz8oYyhhLGQuc2libGluZyksZD1lKGQsZiksZC5yZXR1cm49YSxhPWQpOgooYyhhLGQpLGQ9eGgoZixhLm1vZGUsaCksZC5yZXR1cm49YSxhPWQpLGcoYSkpOmMoYSxkKX1yZXR1cm4gSn12YXIgQmg9dmgoITApLENoPXZoKCExKSxEaD17fSxFaD1VZihEaCksRmg9VWYoRGgpLEdoPVVmKERoKTtmdW5jdGlvbiBIaChhKXtpZihhPT09RGgpdGhyb3cgRXJyb3IocCgxNzQpKTtyZXR1cm4gYX1mdW5jdGlvbiBJaChhLGIpe0coR2gsYik7RyhGaCxhKTtHKEVoLERoKTthPWIubm9kZVR5cGU7c3dpdGNoKGEpe2Nhc2UgOTpjYXNlIDExOmI9KGI9Yi5kb2N1bWVudEVsZW1lbnQpP2IubmFtZXNwYWNlVVJJOmxiKG51bGwsIiIpO2JyZWFrO2RlZmF1bHQ6YT04PT09YT9iLnBhcmVudE5vZGU6YixiPWEubmFtZXNwYWNlVVJJfHxudWxsLGE9YS50YWdOYW1lLGI9bGIoYixhKX1FKEVoKTtHKEVoLGIpfWZ1bmN0aW9uIEpoKCl7RShFaCk7RShGaCk7RShHaCl9CmZ1bmN0aW9uIEtoKGEpe0hoKEdoLmN1cnJlbnQpO3ZhciBiPUhoKEVoLmN1cnJlbnQpO3ZhciBjPWxiKGIsYS50eXBlKTtiIT09YyYmKEcoRmgsYSksRyhFaCxjKSl9ZnVuY3Rpb24gTGgoYSl7RmguY3VycmVudD09PWEmJihFKEVoKSxFKEZoKSl9dmFyIE09VWYoMCk7CmZ1bmN0aW9uIE1oKGEpe2Zvcih2YXIgYj1hO251bGwhPT1iOyl7aWYoMTM9PT1iLnRhZyl7dmFyIGM9Yi5tZW1vaXplZFN0YXRlO2lmKG51bGwhPT1jJiYoYz1jLmRlaHlkcmF0ZWQsbnVsbD09PWN8fCIkPyI9PT1jLmRhdGF8fCIkISI9PT1jLmRhdGEpKXJldHVybiBifWVsc2UgaWYoMTk9PT1iLnRhZyYmdm9pZCAwIT09Yi5tZW1vaXplZFByb3BzLnJldmVhbE9yZGVyKXtpZigwIT09KGIuZmxhZ3MmMTI4KSlyZXR1cm4gYn1lbHNlIGlmKG51bGwhPT1iLmNoaWxkKXtiLmNoaWxkLnJldHVybj1iO2I9Yi5jaGlsZDtjb250aW51ZX1pZihiPT09YSlicmVhaztmb3IoO251bGw9PT1iLnNpYmxpbmc7KXtpZihudWxsPT09Yi5yZXR1cm58fGIucmV0dXJuPT09YSlyZXR1cm4gbnVsbDtiPWIucmV0dXJufWIuc2libGluZy5yZXR1cm49Yi5yZXR1cm47Yj1iLnNpYmxpbmd9cmV0dXJuIG51bGx9dmFyIE5oPVtdOwpmdW5jdGlvbiBPaCgpe2Zvcih2YXIgYT0wO2E8TmgubGVuZ3RoO2ErKylOaFthXS5fd29ya0luUHJvZ3Jlc3NWZXJzaW9uUHJpbWFyeT1udWxsO05oLmxlbmd0aD0wfXZhciBQaD11YS5SZWFjdEN1cnJlbnREaXNwYXRjaGVyLFFoPXVhLlJlYWN0Q3VycmVudEJhdGNoQ29uZmlnLFJoPTAsTj1udWxsLE89bnVsbCxQPW51bGwsU2g9ITEsVGg9ITEsVWg9MCxWaD0wO2Z1bmN0aW9uIFEoKXt0aHJvdyBFcnJvcihwKDMyMSkpO31mdW5jdGlvbiBXaChhLGIpe2lmKG51bGw9PT1iKXJldHVybiExO2Zvcih2YXIgYz0wO2M8Yi5sZW5ndGgmJmM8YS5sZW5ndGg7YysrKWlmKCFIZShhW2NdLGJbY10pKXJldHVybiExO3JldHVybiEwfQpmdW5jdGlvbiBYaChhLGIsYyxkLGUsZil7Umg9ZjtOPWI7Yi5tZW1vaXplZFN0YXRlPW51bGw7Yi51cGRhdGVRdWV1ZT1udWxsO2IubGFuZXM9MDtQaC5jdXJyZW50PW51bGw9PT1hfHxudWxsPT09YS5tZW1vaXplZFN0YXRlP1loOlpoO2E9YyhkLGUpO2lmKFRoKXtmPTA7ZG97VGg9ITE7VWg9MDtpZigyNTw9Zil0aHJvdyBFcnJvcihwKDMwMSkpO2YrPTE7UD1PPW51bGw7Yi51cGRhdGVRdWV1ZT1udWxsO1BoLmN1cnJlbnQ9JGg7YT1jKGQsZSl9d2hpbGUoVGgpfVBoLmN1cnJlbnQ9YWk7Yj1udWxsIT09TyYmbnVsbCE9PU8ubmV4dDtSaD0wO1A9Tz1OPW51bGw7U2g9ITE7aWYoYil0aHJvdyBFcnJvcihwKDMwMCkpO3JldHVybiBhfWZ1bmN0aW9uIGJpKCl7dmFyIGE9MCE9PVVoO1VoPTA7cmV0dXJuIGF9CmZ1bmN0aW9uIGNpKCl7dmFyIGE9e21lbW9pemVkU3RhdGU6bnVsbCxiYXNlU3RhdGU6bnVsbCxiYXNlUXVldWU6bnVsbCxxdWV1ZTpudWxsLG5leHQ6bnVsbH07bnVsbD09PVA/Ti5tZW1vaXplZFN0YXRlPVA9YTpQPVAubmV4dD1hO3JldHVybiBQfWZ1bmN0aW9uIGRpKCl7aWYobnVsbD09PU8pe3ZhciBhPU4uYWx0ZXJuYXRlO2E9bnVsbCE9PWE/YS5tZW1vaXplZFN0YXRlOm51bGx9ZWxzZSBhPU8ubmV4dDt2YXIgYj1udWxsPT09UD9OLm1lbW9pemVkU3RhdGU6UC5uZXh0O2lmKG51bGwhPT1iKVA9YixPPWE7ZWxzZXtpZihudWxsPT09YSl0aHJvdyBFcnJvcihwKDMxMCkpO089YTthPXttZW1vaXplZFN0YXRlOk8ubWVtb2l6ZWRTdGF0ZSxiYXNlU3RhdGU6Ty5iYXNlU3RhdGUsYmFzZVF1ZXVlOk8uYmFzZVF1ZXVlLHF1ZXVlOk8ucXVldWUsbmV4dDpudWxsfTtudWxsPT09UD9OLm1lbW9pemVkU3RhdGU9UD1hOlA9UC5uZXh0PWF9cmV0dXJuIFB9CmZ1bmN0aW9uIGVpKGEsYil7cmV0dXJuImZ1bmN0aW9uIj09PXR5cGVvZiBiP2IoYSk6Yn0KZnVuY3Rpb24gZmkoYSl7dmFyIGI9ZGkoKSxjPWIucXVldWU7aWYobnVsbD09PWMpdGhyb3cgRXJyb3IocCgzMTEpKTtjLmxhc3RSZW5kZXJlZFJlZHVjZXI9YTt2YXIgZD1PLGU9ZC5iYXNlUXVldWUsZj1jLnBlbmRpbmc7aWYobnVsbCE9PWYpe2lmKG51bGwhPT1lKXt2YXIgZz1lLm5leHQ7ZS5uZXh0PWYubmV4dDtmLm5leHQ9Z31kLmJhc2VRdWV1ZT1lPWY7Yy5wZW5kaW5nPW51bGx9aWYobnVsbCE9PWUpe2Y9ZS5uZXh0O2Q9ZC5iYXNlU3RhdGU7dmFyIGg9Zz1udWxsLGs9bnVsbCxsPWY7ZG97dmFyIG09bC5sYW5lO2lmKChSaCZtKT09PW0pbnVsbCE9PWsmJihrPWsubmV4dD17bGFuZTowLGFjdGlvbjpsLmFjdGlvbixoYXNFYWdlclN0YXRlOmwuaGFzRWFnZXJTdGF0ZSxlYWdlclN0YXRlOmwuZWFnZXJTdGF0ZSxuZXh0Om51bGx9KSxkPWwuaGFzRWFnZXJTdGF0ZT9sLmVhZ2VyU3RhdGU6YShkLGwuYWN0aW9uKTtlbHNle3ZhciBxPXtsYW5lOm0sYWN0aW9uOmwuYWN0aW9uLGhhc0VhZ2VyU3RhdGU6bC5oYXNFYWdlclN0YXRlLAplYWdlclN0YXRlOmwuZWFnZXJTdGF0ZSxuZXh0Om51bGx9O251bGw9PT1rPyhoPWs9cSxnPWQpOms9ay5uZXh0PXE7Ti5sYW5lc3w9bTtoaHw9bX1sPWwubmV4dH13aGlsZShudWxsIT09bCYmbCE9PWYpO251bGw9PT1rP2c9ZDprLm5leHQ9aDtIZShkLGIubWVtb2l6ZWRTdGF0ZSl8fChVZz0hMCk7Yi5tZW1vaXplZFN0YXRlPWQ7Yi5iYXNlU3RhdGU9ZztiLmJhc2VRdWV1ZT1rO2MubGFzdFJlbmRlcmVkU3RhdGU9ZH1hPWMuaW50ZXJsZWF2ZWQ7aWYobnVsbCE9PWEpe2U9YTtkbyBmPWUubGFuZSxOLmxhbmVzfD1mLGhofD1mLGU9ZS5uZXh0O3doaWxlKGUhPT1hKX1lbHNlIG51bGw9PT1lJiYoYy5sYW5lcz0wKTtyZXR1cm5bYi5tZW1vaXplZFN0YXRlLGMuZGlzcGF0Y2hdfQpmdW5jdGlvbiBnaShhKXt2YXIgYj1kaSgpLGM9Yi5xdWV1ZTtpZihudWxsPT09Yyl0aHJvdyBFcnJvcihwKDMxMSkpO2MubGFzdFJlbmRlcmVkUmVkdWNlcj1hO3ZhciBkPWMuZGlzcGF0Y2gsZT1jLnBlbmRpbmcsZj1iLm1lbW9pemVkU3RhdGU7aWYobnVsbCE9PWUpe2MucGVuZGluZz1udWxsO3ZhciBnPWU9ZS5uZXh0O2RvIGY9YShmLGcuYWN0aW9uKSxnPWcubmV4dDt3aGlsZShnIT09ZSk7SGUoZixiLm1lbW9pemVkU3RhdGUpfHwoVWc9ITApO2IubWVtb2l6ZWRTdGF0ZT1mO251bGw9PT1iLmJhc2VRdWV1ZSYmKGIuYmFzZVN0YXRlPWYpO2MubGFzdFJlbmRlcmVkU3RhdGU9Zn1yZXR1cm5bZixkXX1mdW5jdGlvbiBoaSgpe30KZnVuY3Rpb24gaWkoYSxiKXt2YXIgYz1OLGQ9ZGkoKSxlPWIoKSxmPSFIZShkLm1lbW9pemVkU3RhdGUsZSk7ZiYmKGQubWVtb2l6ZWRTdGF0ZT1lLFVnPSEwKTtkPWQucXVldWU7amkoa2kuYmluZChudWxsLGMsZCxhKSxbYV0pO2lmKGQuZ2V0U25hcHNob3QhPT1ifHxmfHxudWxsIT09UCYmUC5tZW1vaXplZFN0YXRlLnRhZyYxKXtjLmZsYWdzfD0yMDQ4O2xpKDksbWkuYmluZChudWxsLGMsZCxlLGIpLHZvaWQgMCxudWxsKTtpZihudWxsPT09Uil0aHJvdyBFcnJvcihwKDM0OSkpOzAhPT0oUmgmMzApfHxuaShjLGIsZSl9cmV0dXJuIGV9ZnVuY3Rpb24gbmkoYSxiLGMpe2EuZmxhZ3N8PTE2Mzg0O2E9e2dldFNuYXBzaG90OmIsdmFsdWU6Y307Yj1OLnVwZGF0ZVF1ZXVlO251bGw9PT1iPyhiPXtsYXN0RWZmZWN0Om51bGwsc3RvcmVzOm51bGx9LE4udXBkYXRlUXVldWU9YixiLnN0b3Jlcz1bYV0pOihjPWIuc3RvcmVzLG51bGw9PT1jP2Iuc3RvcmVzPVthXTpjLnB1c2goYSkpfQpmdW5jdGlvbiBtaShhLGIsYyxkKXtiLnZhbHVlPWM7Yi5nZXRTbmFwc2hvdD1kO29pKGIpJiZwaShhKX1mdW5jdGlvbiBraShhLGIsYyl7cmV0dXJuIGMoZnVuY3Rpb24oKXtvaShiKSYmcGkoYSl9KX1mdW5jdGlvbiBvaShhKXt2YXIgYj1hLmdldFNuYXBzaG90O2E9YS52YWx1ZTt0cnl7dmFyIGM9YigpO3JldHVybiFIZShhLGMpfWNhdGNoKGQpe3JldHVybiEwfX1mdW5jdGlvbiBwaShhKXt2YXIgYj1aZyhhLDEpO251bGwhPT1iJiZtaChiLGEsMSwtMSl9CmZ1bmN0aW9uIHFpKGEpe3ZhciBiPWNpKCk7ImZ1bmN0aW9uIj09PXR5cGVvZiBhJiYoYT1hKCkpO2IubWVtb2l6ZWRTdGF0ZT1iLmJhc2VTdGF0ZT1hO2E9e3BlbmRpbmc6bnVsbCxpbnRlcmxlYXZlZDpudWxsLGxhbmVzOjAsZGlzcGF0Y2g6bnVsbCxsYXN0UmVuZGVyZWRSZWR1Y2VyOmVpLGxhc3RSZW5kZXJlZFN0YXRlOmF9O2IucXVldWU9YTthPWEuZGlzcGF0Y2g9cmkuYmluZChudWxsLE4sYSk7cmV0dXJuW2IubWVtb2l6ZWRTdGF0ZSxhXX0KZnVuY3Rpb24gbGkoYSxiLGMsZCl7YT17dGFnOmEsY3JlYXRlOmIsZGVzdHJveTpjLGRlcHM6ZCxuZXh0Om51bGx9O2I9Ti51cGRhdGVRdWV1ZTtudWxsPT09Yj8oYj17bGFzdEVmZmVjdDpudWxsLHN0b3JlczpudWxsfSxOLnVwZGF0ZVF1ZXVlPWIsYi5sYXN0RWZmZWN0PWEubmV4dD1hKTooYz1iLmxhc3RFZmZlY3QsbnVsbD09PWM/Yi5sYXN0RWZmZWN0PWEubmV4dD1hOihkPWMubmV4dCxjLm5leHQ9YSxhLm5leHQ9ZCxiLmxhc3RFZmZlY3Q9YSkpO3JldHVybiBhfWZ1bmN0aW9uIHNpKCl7cmV0dXJuIGRpKCkubWVtb2l6ZWRTdGF0ZX1mdW5jdGlvbiB0aShhLGIsYyxkKXt2YXIgZT1jaSgpO04uZmxhZ3N8PWE7ZS5tZW1vaXplZFN0YXRlPWxpKDF8YixjLHZvaWQgMCx2b2lkIDA9PT1kP251bGw6ZCl9CmZ1bmN0aW9uIHVpKGEsYixjLGQpe3ZhciBlPWRpKCk7ZD12b2lkIDA9PT1kP251bGw6ZDt2YXIgZj12b2lkIDA7aWYobnVsbCE9PU8pe3ZhciBnPU8ubWVtb2l6ZWRTdGF0ZTtmPWcuZGVzdHJveTtpZihudWxsIT09ZCYmV2goZCxnLmRlcHMpKXtlLm1lbW9pemVkU3RhdGU9bGkoYixjLGYsZCk7cmV0dXJufX1OLmZsYWdzfD1hO2UubWVtb2l6ZWRTdGF0ZT1saSgxfGIsYyxmLGQpfWZ1bmN0aW9uIHZpKGEsYil7cmV0dXJuIHRpKDgzOTA2NTYsOCxhLGIpfWZ1bmN0aW9uIGppKGEsYil7cmV0dXJuIHVpKDIwNDgsOCxhLGIpfWZ1bmN0aW9uIHdpKGEsYil7cmV0dXJuIHVpKDQsMixhLGIpfWZ1bmN0aW9uIHhpKGEsYil7cmV0dXJuIHVpKDQsNCxhLGIpfQpmdW5jdGlvbiB5aShhLGIpe2lmKCJmdW5jdGlvbiI9PT10eXBlb2YgYilyZXR1cm4gYT1hKCksYihhKSxmdW5jdGlvbigpe2IobnVsbCl9O2lmKG51bGwhPT1iJiZ2b2lkIDAhPT1iKXJldHVybiBhPWEoKSxiLmN1cnJlbnQ9YSxmdW5jdGlvbigpe2IuY3VycmVudD1udWxsfX1mdW5jdGlvbiB6aShhLGIsYyl7Yz1udWxsIT09YyYmdm9pZCAwIT09Yz9jLmNvbmNhdChbYV0pOm51bGw7cmV0dXJuIHVpKDQsNCx5aS5iaW5kKG51bGwsYixhKSxjKX1mdW5jdGlvbiBBaSgpe31mdW5jdGlvbiBCaShhLGIpe3ZhciBjPWRpKCk7Yj12b2lkIDA9PT1iP251bGw6Yjt2YXIgZD1jLm1lbW9pemVkU3RhdGU7aWYobnVsbCE9PWQmJm51bGwhPT1iJiZXaChiLGRbMV0pKXJldHVybiBkWzBdO2MubWVtb2l6ZWRTdGF0ZT1bYSxiXTtyZXR1cm4gYX0KZnVuY3Rpb24gQ2koYSxiKXt2YXIgYz1kaSgpO2I9dm9pZCAwPT09Yj9udWxsOmI7dmFyIGQ9Yy5tZW1vaXplZFN0YXRlO2lmKG51bGwhPT1kJiZudWxsIT09YiYmV2goYixkWzFdKSlyZXR1cm4gZFswXTthPWEoKTtjLm1lbW9pemVkU3RhdGU9W2EsYl07cmV0dXJuIGF9ZnVuY3Rpb24gRGkoYSxiLGMpe2lmKDA9PT0oUmgmMjEpKXJldHVybiBhLmJhc2VTdGF0ZSYmKGEuYmFzZVN0YXRlPSExLFVnPSEwKSxhLm1lbW9pemVkU3RhdGU9YztIZShjLGIpfHwoYz15YygpLE4ubGFuZXN8PWMsaGh8PWMsYS5iYXNlU3RhdGU9ITApO3JldHVybiBifWZ1bmN0aW9uIEVpKGEsYil7dmFyIGM9QztDPTAhPT1jJiY0PmM/Yzo0O2EoITApO3ZhciBkPVFoLnRyYW5zaXRpb247UWgudHJhbnNpdGlvbj17fTt0cnl7YSghMSksYigpfWZpbmFsbHl7Qz1jLFFoLnRyYW5zaXRpb249ZH19ZnVuY3Rpb24gRmkoKXtyZXR1cm4gZGkoKS5tZW1vaXplZFN0YXRlfQpmdW5jdGlvbiBHaShhLGIsYyl7dmFyIGQ9bGgoYSk7Yz17bGFuZTpkLGFjdGlvbjpjLGhhc0VhZ2VyU3RhdGU6ITEsZWFnZXJTdGF0ZTpudWxsLG5leHQ6bnVsbH07aWYoSGkoYSkpSWkoYixjKTtlbHNlIGlmKGM9WWcoYSxiLGMsZCksbnVsbCE9PWMpe3ZhciBlPUwoKTttaChjLGEsZCxlKTtKaShjLGIsZCl9fQpmdW5jdGlvbiByaShhLGIsYyl7dmFyIGQ9bGgoYSksZT17bGFuZTpkLGFjdGlvbjpjLGhhc0VhZ2VyU3RhdGU6ITEsZWFnZXJTdGF0ZTpudWxsLG5leHQ6bnVsbH07aWYoSGkoYSkpSWkoYixlKTtlbHNle3ZhciBmPWEuYWx0ZXJuYXRlO2lmKDA9PT1hLmxhbmVzJiYobnVsbD09PWZ8fDA9PT1mLmxhbmVzKSYmKGY9Yi5sYXN0UmVuZGVyZWRSZWR1Y2VyLG51bGwhPT1mKSl0cnl7dmFyIGc9Yi5sYXN0UmVuZGVyZWRTdGF0ZSxoPWYoZyxjKTtlLmhhc0VhZ2VyU3RhdGU9ITA7ZS5lYWdlclN0YXRlPWg7aWYoSGUoaCxnKSl7dmFyIGs9Yi5pbnRlcmxlYXZlZDtudWxsPT09az8oZS5uZXh0PWUsWGcoYikpOihlLm5leHQ9ay5uZXh0LGsubmV4dD1lKTtiLmludGVybGVhdmVkPWU7cmV0dXJufX1jYXRjaChsKXt9ZmluYWxseXt9Yz1ZZyhhLGIsZSxkKTtudWxsIT09YyYmKGU9TCgpLG1oKGMsYSxkLGUpLEppKGMsYixkKSl9fQpmdW5jdGlvbiBIaShhKXt2YXIgYj1hLmFsdGVybmF0ZTtyZXR1cm4gYT09PU58fG51bGwhPT1iJiZiPT09Tn1mdW5jdGlvbiBJaShhLGIpe1RoPVNoPSEwO3ZhciBjPWEucGVuZGluZztudWxsPT09Yz9iLm5leHQ9YjooYi5uZXh0PWMubmV4dCxjLm5leHQ9Yik7YS5wZW5kaW5nPWJ9ZnVuY3Rpb24gSmkoYSxiLGMpe2lmKDAhPT0oYyY0MTk0MjQwKSl7dmFyIGQ9Yi5sYW5lcztkJj1hLnBlbmRpbmdMYW5lcztjfD1kO2IubGFuZXM9YztDYyhhLGMpfX0KdmFyIGFpPXtyZWFkQ29udGV4dDpWZyx1c2VDYWxsYmFjazpRLHVzZUNvbnRleHQ6USx1c2VFZmZlY3Q6USx1c2VJbXBlcmF0aXZlSGFuZGxlOlEsdXNlSW5zZXJ0aW9uRWZmZWN0OlEsdXNlTGF5b3V0RWZmZWN0OlEsdXNlTWVtbzpRLHVzZVJlZHVjZXI6USx1c2VSZWY6USx1c2VTdGF0ZTpRLHVzZURlYnVnVmFsdWU6USx1c2VEZWZlcnJlZFZhbHVlOlEsdXNlVHJhbnNpdGlvbjpRLHVzZU11dGFibGVTb3VyY2U6USx1c2VTeW5jRXh0ZXJuYWxTdG9yZTpRLHVzZUlkOlEsdW5zdGFibGVfaXNOZXdSZWNvbmNpbGVyOiExfSxZaD17cmVhZENvbnRleHQ6VmcsdXNlQ2FsbGJhY2s6ZnVuY3Rpb24oYSxiKXtjaSgpLm1lbW9pemVkU3RhdGU9W2Esdm9pZCAwPT09Yj9udWxsOmJdO3JldHVybiBhfSx1c2VDb250ZXh0OlZnLHVzZUVmZmVjdDp2aSx1c2VJbXBlcmF0aXZlSGFuZGxlOmZ1bmN0aW9uKGEsYixjKXtjPW51bGwhPT1jJiZ2b2lkIDAhPT1jP2MuY29uY2F0KFthXSk6bnVsbDtyZXR1cm4gdGkoNDE5NDMwOCwKNCx5aS5iaW5kKG51bGwsYixhKSxjKX0sdXNlTGF5b3V0RWZmZWN0OmZ1bmN0aW9uKGEsYil7cmV0dXJuIHRpKDQxOTQzMDgsNCxhLGIpfSx1c2VJbnNlcnRpb25FZmZlY3Q6ZnVuY3Rpb24oYSxiKXtyZXR1cm4gdGkoNCwyLGEsYil9LHVzZU1lbW86ZnVuY3Rpb24oYSxiKXt2YXIgYz1jaSgpO2I9dm9pZCAwPT09Yj9udWxsOmI7YT1hKCk7Yy5tZW1vaXplZFN0YXRlPVthLGJdO3JldHVybiBhfSx1c2VSZWR1Y2VyOmZ1bmN0aW9uKGEsYixjKXt2YXIgZD1jaSgpO2I9dm9pZCAwIT09Yz9jKGIpOmI7ZC5tZW1vaXplZFN0YXRlPWQuYmFzZVN0YXRlPWI7YT17cGVuZGluZzpudWxsLGludGVybGVhdmVkOm51bGwsbGFuZXM6MCxkaXNwYXRjaDpudWxsLGxhc3RSZW5kZXJlZFJlZHVjZXI6YSxsYXN0UmVuZGVyZWRTdGF0ZTpifTtkLnF1ZXVlPWE7YT1hLmRpc3BhdGNoPUdpLmJpbmQobnVsbCxOLGEpO3JldHVybltkLm1lbW9pemVkU3RhdGUsYV19LHVzZVJlZjpmdW5jdGlvbihhKXt2YXIgYj0KY2koKTthPXtjdXJyZW50OmF9O3JldHVybiBiLm1lbW9pemVkU3RhdGU9YX0sdXNlU3RhdGU6cWksdXNlRGVidWdWYWx1ZTpBaSx1c2VEZWZlcnJlZFZhbHVlOmZ1bmN0aW9uKGEpe3JldHVybiBjaSgpLm1lbW9pemVkU3RhdGU9YX0sdXNlVHJhbnNpdGlvbjpmdW5jdGlvbigpe3ZhciBhPXFpKCExKSxiPWFbMF07YT1FaS5iaW5kKG51bGwsYVsxXSk7Y2koKS5tZW1vaXplZFN0YXRlPWE7cmV0dXJuW2IsYV19LHVzZU11dGFibGVTb3VyY2U6ZnVuY3Rpb24oKXt9LHVzZVN5bmNFeHRlcm5hbFN0b3JlOmZ1bmN0aW9uKGEsYixjKXt2YXIgZD1OLGU9Y2koKTtpZihJKXtpZih2b2lkIDA9PT1jKXRocm93IEVycm9yKHAoNDA3KSk7Yz1jKCl9ZWxzZXtjPWIoKTtpZihudWxsPT09Uil0aHJvdyBFcnJvcihwKDM0OSkpOzAhPT0oUmgmMzApfHxuaShkLGIsYyl9ZS5tZW1vaXplZFN0YXRlPWM7dmFyIGY9e3ZhbHVlOmMsZ2V0U25hcHNob3Q6Yn07ZS5xdWV1ZT1mO3ZpKGtpLmJpbmQobnVsbCxkLApmLGEpLFthXSk7ZC5mbGFnc3w9MjA0ODtsaSg5LG1pLmJpbmQobnVsbCxkLGYsYyxiKSx2b2lkIDAsbnVsbCk7cmV0dXJuIGN9LHVzZUlkOmZ1bmN0aW9uKCl7dmFyIGE9Y2koKSxiPVIuaWRlbnRpZmllclByZWZpeDtpZihJKXt2YXIgYz1zZzt2YXIgZD1yZztjPShkJn4oMTw8MzItb2MoZCktMSkpLnRvU3RyaW5nKDMyKStjO2I9IjoiK2IrIlIiK2M7Yz1VaCsrOzA8YyYmKGIrPSJIIitjLnRvU3RyaW5nKDMyKSk7Yis9IjoifWVsc2UgYz1WaCsrLGI9IjoiK2IrInIiK2MudG9TdHJpbmcoMzIpKyI6IjtyZXR1cm4gYS5tZW1vaXplZFN0YXRlPWJ9LHVuc3RhYmxlX2lzTmV3UmVjb25jaWxlcjohMX0sWmg9e3JlYWRDb250ZXh0OlZnLHVzZUNhbGxiYWNrOkJpLHVzZUNvbnRleHQ6VmcsdXNlRWZmZWN0OmppLHVzZUltcGVyYXRpdmVIYW5kbGU6emksdXNlSW5zZXJ0aW9uRWZmZWN0OndpLHVzZUxheW91dEVmZmVjdDp4aSx1c2VNZW1vOkNpLHVzZVJlZHVjZXI6ZmksdXNlUmVmOnNpLHVzZVN0YXRlOmZ1bmN0aW9uKCl7cmV0dXJuIGZpKGVpKX0sCnVzZURlYnVnVmFsdWU6QWksdXNlRGVmZXJyZWRWYWx1ZTpmdW5jdGlvbihhKXt2YXIgYj1kaSgpO3JldHVybiBEaShiLE8ubWVtb2l6ZWRTdGF0ZSxhKX0sdXNlVHJhbnNpdGlvbjpmdW5jdGlvbigpe3ZhciBhPWZpKGVpKVswXSxiPWRpKCkubWVtb2l6ZWRTdGF0ZTtyZXR1cm5bYSxiXX0sdXNlTXV0YWJsZVNvdXJjZTpoaSx1c2VTeW5jRXh0ZXJuYWxTdG9yZTppaSx1c2VJZDpGaSx1bnN0YWJsZV9pc05ld1JlY29uY2lsZXI6ITF9LCRoPXtyZWFkQ29udGV4dDpWZyx1c2VDYWxsYmFjazpCaSx1c2VDb250ZXh0OlZnLHVzZUVmZmVjdDpqaSx1c2VJbXBlcmF0aXZlSGFuZGxlOnppLHVzZUluc2VydGlvbkVmZmVjdDp3aSx1c2VMYXlvdXRFZmZlY3Q6eGksdXNlTWVtbzpDaSx1c2VSZWR1Y2VyOmdpLHVzZVJlZjpzaSx1c2VTdGF0ZTpmdW5jdGlvbigpe3JldHVybiBnaShlaSl9LHVzZURlYnVnVmFsdWU6QWksdXNlRGVmZXJyZWRWYWx1ZTpmdW5jdGlvbihhKXt2YXIgYj1kaSgpO3JldHVybiBudWxsPT09Ck8/Yi5tZW1vaXplZFN0YXRlPWE6RGkoYixPLm1lbW9pemVkU3RhdGUsYSl9LHVzZVRyYW5zaXRpb246ZnVuY3Rpb24oKXt2YXIgYT1naShlaSlbMF0sYj1kaSgpLm1lbW9pemVkU3RhdGU7cmV0dXJuW2EsYl19LHVzZU11dGFibGVTb3VyY2U6aGksdXNlU3luY0V4dGVybmFsU3RvcmU6aWksdXNlSWQ6RmksdW5zdGFibGVfaXNOZXdSZWNvbmNpbGVyOiExfTtmdW5jdGlvbiBLaShhLGIpe3RyeXt2YXIgYz0iIixkPWI7ZG8gYys9UGEoZCksZD1kLnJldHVybjt3aGlsZShkKTt2YXIgZT1jfWNhdGNoKGYpe2U9IlxuRXJyb3IgZ2VuZXJhdGluZyBzdGFjazogIitmLm1lc3NhZ2UrIlxuIitmLnN0YWNrfXJldHVybnt2YWx1ZTphLHNvdXJjZTpiLHN0YWNrOmUsZGlnZXN0Om51bGx9fWZ1bmN0aW9uIExpKGEsYixjKXtyZXR1cm57dmFsdWU6YSxzb3VyY2U6bnVsbCxzdGFjazpudWxsIT1jP2M6bnVsbCxkaWdlc3Q6bnVsbCE9Yj9iOm51bGx9fQpmdW5jdGlvbiBNaShhLGIpe3RyeXtjb25zb2xlLmVycm9yKGIudmFsdWUpfWNhdGNoKGMpe3NldFRpbWVvdXQoZnVuY3Rpb24oKXt0aHJvdyBjO30pfX12YXIgTmk9ImZ1bmN0aW9uIj09PXR5cGVvZiBXZWFrTWFwP1dlYWtNYXA6TWFwO2Z1bmN0aW9uIE9pKGEsYixjKXtjPWNoKC0xLGMpO2MudGFnPTM7Yy5wYXlsb2FkPXtlbGVtZW50Om51bGx9O3ZhciBkPWIudmFsdWU7Yy5jYWxsYmFjaz1mdW5jdGlvbigpe1BpfHwoUGk9ITAsUWk9ZCk7TWkoYSxiKX07cmV0dXJuIGN9CmZ1bmN0aW9uIFJpKGEsYixjKXtjPWNoKC0xLGMpO2MudGFnPTM7dmFyIGQ9YS50eXBlLmdldERlcml2ZWRTdGF0ZUZyb21FcnJvcjtpZigiZnVuY3Rpb24iPT09dHlwZW9mIGQpe3ZhciBlPWIudmFsdWU7Yy5wYXlsb2FkPWZ1bmN0aW9uKCl7cmV0dXJuIGQoZSl9O2MuY2FsbGJhY2s9ZnVuY3Rpb24oKXtNaShhLGIpfX12YXIgZj1hLnN0YXRlTm9kZTtudWxsIT09ZiYmImZ1bmN0aW9uIj09PXR5cGVvZiBmLmNvbXBvbmVudERpZENhdGNoJiYoYy5jYWxsYmFjaz1mdW5jdGlvbigpe01pKGEsYik7ImZ1bmN0aW9uIiE9PXR5cGVvZiBkJiYobnVsbD09PVNpP1NpPW5ldyBTZXQoW3RoaXNdKTpTaS5hZGQodGhpcykpO3ZhciBjPWIuc3RhY2s7dGhpcy5jb21wb25lbnREaWRDYXRjaChiLnZhbHVlLHtjb21wb25lbnRTdGFjazpudWxsIT09Yz9jOiIifSl9KTtyZXR1cm4gY30KZnVuY3Rpb24gVGkoYSxiLGMpe3ZhciBkPWEucGluZ0NhY2hlO2lmKG51bGw9PT1kKXtkPWEucGluZ0NhY2hlPW5ldyBOaTt2YXIgZT1uZXcgU2V0O2Quc2V0KGIsZSl9ZWxzZSBlPWQuZ2V0KGIpLHZvaWQgMD09PWUmJihlPW5ldyBTZXQsZC5zZXQoYixlKSk7ZS5oYXMoYyl8fChlLmFkZChjKSxhPVVpLmJpbmQobnVsbCxhLGIsYyksYi50aGVuKGEsYSkpfWZ1bmN0aW9uIFZpKGEpe2Rve3ZhciBiO2lmKGI9MTM9PT1hLnRhZyliPWEubWVtb2l6ZWRTdGF0ZSxiPW51bGwhPT1iP251bGwhPT1iLmRlaHlkcmF0ZWQ/ITA6ITE6ITA7aWYoYilyZXR1cm4gYTthPWEucmV0dXJufXdoaWxlKG51bGwhPT1hKTtyZXR1cm4gbnVsbH0KZnVuY3Rpb24gV2koYSxiLGMsZCxlKXtpZigwPT09KGEubW9kZSYxKSlyZXR1cm4gYT09PWI/YS5mbGFnc3w9NjU1MzY6KGEuZmxhZ3N8PTEyOCxjLmZsYWdzfD0xMzEwNzIsYy5mbGFncyY9LTUyODA1LDE9PT1jLnRhZyYmKG51bGw9PT1jLmFsdGVybmF0ZT9jLnRhZz0xNzooYj1jaCgtMSwxKSxiLnRhZz0yLGRoKGMsYiwxKSkpLGMubGFuZXN8PTEpLGE7YS5mbGFnc3w9NjU1MzY7YS5sYW5lcz1lO3JldHVybiBhfXZhciBYaT11YS5SZWFjdEN1cnJlbnRPd25lcixVZz0hMTtmdW5jdGlvbiBZaShhLGIsYyxkKXtiLmNoaWxkPW51bGw9PT1hP0NoKGIsbnVsbCxjLGQpOkJoKGIsYS5jaGlsZCxjLGQpfQpmdW5jdGlvbiBaaShhLGIsYyxkLGUpe2M9Yy5yZW5kZXI7dmFyIGY9Yi5yZWY7VGcoYixlKTtkPVhoKGEsYixjLGQsZixlKTtjPWJpKCk7aWYobnVsbCE9PWEmJiFVZylyZXR1cm4gYi51cGRhdGVRdWV1ZT1hLnVwZGF0ZVF1ZXVlLGIuZmxhZ3MmPS0yMDUzLGEubGFuZXMmPX5lLCRpKGEsYixlKTtJJiZjJiZ2ZyhiKTtiLmZsYWdzfD0xO1lpKGEsYixkLGUpO3JldHVybiBiLmNoaWxkfQpmdW5jdGlvbiBhaihhLGIsYyxkLGUpe2lmKG51bGw9PT1hKXt2YXIgZj1jLnR5cGU7aWYoImZ1bmN0aW9uIj09PXR5cGVvZiBmJiYhYmooZikmJnZvaWQgMD09PWYuZGVmYXVsdFByb3BzJiZudWxsPT09Yy5jb21wYXJlJiZ2b2lkIDA9PT1jLmRlZmF1bHRQcm9wcylyZXR1cm4gYi50YWc9MTUsYi50eXBlPWYsY2ooYSxiLGYsZCxlKTthPXloKGMudHlwZSxudWxsLGQsYixiLm1vZGUsZSk7YS5yZWY9Yi5yZWY7YS5yZXR1cm49YjtyZXR1cm4gYi5jaGlsZD1hfWY9YS5jaGlsZDtpZigwPT09KGEubGFuZXMmZSkpe3ZhciBnPWYubWVtb2l6ZWRQcm9wcztjPWMuY29tcGFyZTtjPW51bGwhPT1jP2M6SWU7aWYoYyhnLGQpJiZhLnJlZj09PWIucmVmKXJldHVybiAkaShhLGIsZSl9Yi5mbGFnc3w9MTthPXdoKGYsZCk7YS5yZWY9Yi5yZWY7YS5yZXR1cm49YjtyZXR1cm4gYi5jaGlsZD1hfQpmdW5jdGlvbiBjaihhLGIsYyxkLGUpe2lmKG51bGwhPT1hKXt2YXIgZj1hLm1lbW9pemVkUHJvcHM7aWYoSWUoZixkKSYmYS5yZWY9PT1iLnJlZilpZihVZz0hMSxiLnBlbmRpbmdQcm9wcz1kPWYsMCE9PShhLmxhbmVzJmUpKTAhPT0oYS5mbGFncyYxMzEwNzIpJiYoVWc9ITApO2Vsc2UgcmV0dXJuIGIubGFuZXM9YS5sYW5lcywkaShhLGIsZSl9cmV0dXJuIGRqKGEsYixjLGQsZSl9CmZ1bmN0aW9uIGVqKGEsYixjKXt2YXIgZD1iLnBlbmRpbmdQcm9wcyxlPWQuY2hpbGRyZW4sZj1udWxsIT09YT9hLm1lbW9pemVkU3RhdGU6bnVsbDtpZigiaGlkZGVuIj09PWQubW9kZSlpZigwPT09KGIubW9kZSYxKSliLm1lbW9pemVkU3RhdGU9e2Jhc2VMYW5lczowLGNhY2hlUG9vbDpudWxsLHRyYW5zaXRpb25zOm51bGx9LEcoZmosZ2opLGdqfD1jO2Vsc2V7aWYoMD09PShjJjEwNzM3NDE4MjQpKXJldHVybiBhPW51bGwhPT1mP2YuYmFzZUxhbmVzfGM6YyxiLmxhbmVzPWIuY2hpbGRMYW5lcz0xMDczNzQxODI0LGIubWVtb2l6ZWRTdGF0ZT17YmFzZUxhbmVzOmEsY2FjaGVQb29sOm51bGwsdHJhbnNpdGlvbnM6bnVsbH0sYi51cGRhdGVRdWV1ZT1udWxsLEcoZmosZ2opLGdqfD1hLG51bGw7Yi5tZW1vaXplZFN0YXRlPXtiYXNlTGFuZXM6MCxjYWNoZVBvb2w6bnVsbCx0cmFuc2l0aW9uczpudWxsfTtkPW51bGwhPT1mP2YuYmFzZUxhbmVzOmM7Ryhmaixnaik7Z2p8PWR9ZWxzZSBudWxsIT09CmY/KGQ9Zi5iYXNlTGFuZXN8YyxiLm1lbW9pemVkU3RhdGU9bnVsbCk6ZD1jLEcoZmosZ2opLGdqfD1kO1lpKGEsYixlLGMpO3JldHVybiBiLmNoaWxkfWZ1bmN0aW9uIGhqKGEsYil7dmFyIGM9Yi5yZWY7aWYobnVsbD09PWEmJm51bGwhPT1jfHxudWxsIT09YSYmYS5yZWYhPT1jKWIuZmxhZ3N8PTUxMixiLmZsYWdzfD0yMDk3MTUyfWZ1bmN0aW9uIGRqKGEsYixjLGQsZSl7dmFyIGY9WmYoYyk/WGY6SC5jdXJyZW50O2Y9WWYoYixmKTtUZyhiLGUpO2M9WGgoYSxiLGMsZCxmLGUpO2Q9YmkoKTtpZihudWxsIT09YSYmIVVnKXJldHVybiBiLnVwZGF0ZVF1ZXVlPWEudXBkYXRlUXVldWUsYi5mbGFncyY9LTIwNTMsYS5sYW5lcyY9fmUsJGkoYSxiLGUpO0kmJmQmJnZnKGIpO2IuZmxhZ3N8PTE7WWkoYSxiLGMsZSk7cmV0dXJuIGIuY2hpbGR9CmZ1bmN0aW9uIGlqKGEsYixjLGQsZSl7aWYoWmYoYykpe3ZhciBmPSEwO2NnKGIpfWVsc2UgZj0hMTtUZyhiLGUpO2lmKG51bGw9PT1iLnN0YXRlTm9kZSlqaihhLGIpLHBoKGIsYyxkKSxyaChiLGMsZCxlKSxkPSEwO2Vsc2UgaWYobnVsbD09PWEpe3ZhciBnPWIuc3RhdGVOb2RlLGg9Yi5tZW1vaXplZFByb3BzO2cucHJvcHM9aDt2YXIgaz1nLmNvbnRleHQsbD1jLmNvbnRleHRUeXBlOyJvYmplY3QiPT09dHlwZW9mIGwmJm51bGwhPT1sP2w9VmcobCk6KGw9WmYoYyk/WGY6SC5jdXJyZW50LGw9WWYoYixsKSk7dmFyIG09Yy5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMscT0iZnVuY3Rpb24iPT09dHlwZW9mIG18fCJmdW5jdGlvbiI9PT10eXBlb2YgZy5nZXRTbmFwc2hvdEJlZm9yZVVwZGF0ZTtxfHwiZnVuY3Rpb24iIT09dHlwZW9mIGcuVU5TQUZFX2NvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMmJiJmdW5jdGlvbiIhPT10eXBlb2YgZy5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzfHwKKGghPT1kfHxrIT09bCkmJnFoKGIsZyxkLGwpOyRnPSExO3ZhciByPWIubWVtb2l6ZWRTdGF0ZTtnLnN0YXRlPXI7Z2goYixkLGcsZSk7az1iLm1lbW9pemVkU3RhdGU7aCE9PWR8fHIhPT1rfHxXZi5jdXJyZW50fHwkZz8oImZ1bmN0aW9uIj09PXR5cGVvZiBtJiYoa2goYixjLG0sZCksaz1iLm1lbW9pemVkU3RhdGUpLChoPSRnfHxvaChiLGMsaCxkLHIsayxsKSk/KHF8fCJmdW5jdGlvbiIhPT10eXBlb2YgZy5VTlNBRkVfY29tcG9uZW50V2lsbE1vdW50JiYiZnVuY3Rpb24iIT09dHlwZW9mIGcuY29tcG9uZW50V2lsbE1vdW50fHwoImZ1bmN0aW9uIj09PXR5cGVvZiBnLmNvbXBvbmVudFdpbGxNb3VudCYmZy5jb21wb25lbnRXaWxsTW91bnQoKSwiZnVuY3Rpb24iPT09dHlwZW9mIGcuVU5TQUZFX2NvbXBvbmVudFdpbGxNb3VudCYmZy5VTlNBRkVfY29tcG9uZW50V2lsbE1vdW50KCkpLCJmdW5jdGlvbiI9PT10eXBlb2YgZy5jb21wb25lbnREaWRNb3VudCYmKGIuZmxhZ3N8PTQxOTQzMDgpKToKKCJmdW5jdGlvbiI9PT10eXBlb2YgZy5jb21wb25lbnREaWRNb3VudCYmKGIuZmxhZ3N8PTQxOTQzMDgpLGIubWVtb2l6ZWRQcm9wcz1kLGIubWVtb2l6ZWRTdGF0ZT1rKSxnLnByb3BzPWQsZy5zdGF0ZT1rLGcuY29udGV4dD1sLGQ9aCk6KCJmdW5jdGlvbiI9PT10eXBlb2YgZy5jb21wb25lbnREaWRNb3VudCYmKGIuZmxhZ3N8PTQxOTQzMDgpLGQ9ITEpfWVsc2V7Zz1iLnN0YXRlTm9kZTtiaChhLGIpO2g9Yi5tZW1vaXplZFByb3BzO2w9Yi50eXBlPT09Yi5lbGVtZW50VHlwZT9oOkxnKGIudHlwZSxoKTtnLnByb3BzPWw7cT1iLnBlbmRpbmdQcm9wcztyPWcuY29udGV4dDtrPWMuY29udGV4dFR5cGU7Im9iamVjdCI9PT10eXBlb2YgayYmbnVsbCE9PWs/az1WZyhrKTooaz1aZihjKT9YZjpILmN1cnJlbnQsaz1ZZihiLGspKTt2YXIgeT1jLmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wczsobT0iZnVuY3Rpb24iPT09dHlwZW9mIHl8fCJmdW5jdGlvbiI9PT10eXBlb2YgZy5nZXRTbmFwc2hvdEJlZm9yZVVwZGF0ZSl8fAoiZnVuY3Rpb24iIT09dHlwZW9mIGcuVU5TQUZFX2NvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMmJiJmdW5jdGlvbiIhPT10eXBlb2YgZy5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzfHwoaCE9PXF8fHIhPT1rKSYmcWgoYixnLGQsayk7JGc9ITE7cj1iLm1lbW9pemVkU3RhdGU7Zy5zdGF0ZT1yO2doKGIsZCxnLGUpO3ZhciBuPWIubWVtb2l6ZWRTdGF0ZTtoIT09cXx8ciE9PW58fFdmLmN1cnJlbnR8fCRnPygiZnVuY3Rpb24iPT09dHlwZW9mIHkmJihraChiLGMseSxkKSxuPWIubWVtb2l6ZWRTdGF0ZSksKGw9JGd8fG9oKGIsYyxsLGQscixuLGspfHwhMSk/KG18fCJmdW5jdGlvbiIhPT10eXBlb2YgZy5VTlNBRkVfY29tcG9uZW50V2lsbFVwZGF0ZSYmImZ1bmN0aW9uIiE9PXR5cGVvZiBnLmNvbXBvbmVudFdpbGxVcGRhdGV8fCgiZnVuY3Rpb24iPT09dHlwZW9mIGcuY29tcG9uZW50V2lsbFVwZGF0ZSYmZy5jb21wb25lbnRXaWxsVXBkYXRlKGQsbixrKSwiZnVuY3Rpb24iPT09dHlwZW9mIGcuVU5TQUZFX2NvbXBvbmVudFdpbGxVcGRhdGUmJgpnLlVOU0FGRV9jb21wb25lbnRXaWxsVXBkYXRlKGQsbixrKSksImZ1bmN0aW9uIj09PXR5cGVvZiBnLmNvbXBvbmVudERpZFVwZGF0ZSYmKGIuZmxhZ3N8PTQpLCJmdW5jdGlvbiI9PT10eXBlb2YgZy5nZXRTbmFwc2hvdEJlZm9yZVVwZGF0ZSYmKGIuZmxhZ3N8PTEwMjQpKTooImZ1bmN0aW9uIiE9PXR5cGVvZiBnLmNvbXBvbmVudERpZFVwZGF0ZXx8aD09PWEubWVtb2l6ZWRQcm9wcyYmcj09PWEubWVtb2l6ZWRTdGF0ZXx8KGIuZmxhZ3N8PTQpLCJmdW5jdGlvbiIhPT10eXBlb2YgZy5nZXRTbmFwc2hvdEJlZm9yZVVwZGF0ZXx8aD09PWEubWVtb2l6ZWRQcm9wcyYmcj09PWEubWVtb2l6ZWRTdGF0ZXx8KGIuZmxhZ3N8PTEwMjQpLGIubWVtb2l6ZWRQcm9wcz1kLGIubWVtb2l6ZWRTdGF0ZT1uKSxnLnByb3BzPWQsZy5zdGF0ZT1uLGcuY29udGV4dD1rLGQ9bCk6KCJmdW5jdGlvbiIhPT10eXBlb2YgZy5jb21wb25lbnREaWRVcGRhdGV8fGg9PT1hLm1lbW9pemVkUHJvcHMmJnI9PT0KYS5tZW1vaXplZFN0YXRlfHwoYi5mbGFnc3w9NCksImZ1bmN0aW9uIiE9PXR5cGVvZiBnLmdldFNuYXBzaG90QmVmb3JlVXBkYXRlfHxoPT09YS5tZW1vaXplZFByb3BzJiZyPT09YS5tZW1vaXplZFN0YXRlfHwoYi5mbGFnc3w9MTAyNCksZD0hMSl9cmV0dXJuIGtqKGEsYixjLGQsZixlKX0KZnVuY3Rpb24ga2ooYSxiLGMsZCxlLGYpe2hqKGEsYik7dmFyIGc9MCE9PShiLmZsYWdzJjEyOCk7aWYoIWQmJiFnKXJldHVybiBlJiZkZyhiLGMsITEpLCRpKGEsYixmKTtkPWIuc3RhdGVOb2RlO1hpLmN1cnJlbnQ9Yjt2YXIgaD1nJiYiZnVuY3Rpb24iIT09dHlwZW9mIGMuZ2V0RGVyaXZlZFN0YXRlRnJvbUVycm9yP251bGw6ZC5yZW5kZXIoKTtiLmZsYWdzfD0xO251bGwhPT1hJiZnPyhiLmNoaWxkPUJoKGIsYS5jaGlsZCxudWxsLGYpLGIuY2hpbGQ9QmgoYixudWxsLGgsZikpOllpKGEsYixoLGYpO2IubWVtb2l6ZWRTdGF0ZT1kLnN0YXRlO2UmJmRnKGIsYywhMCk7cmV0dXJuIGIuY2hpbGR9ZnVuY3Rpb24gbGooYSl7dmFyIGI9YS5zdGF0ZU5vZGU7Yi5wZW5kaW5nQ29udGV4dD9hZyhhLGIucGVuZGluZ0NvbnRleHQsYi5wZW5kaW5nQ29udGV4dCE9PWIuY29udGV4dCk6Yi5jb250ZXh0JiZhZyhhLGIuY29udGV4dCwhMSk7SWgoYSxiLmNvbnRhaW5lckluZm8pfQpmdW5jdGlvbiBtaihhLGIsYyxkLGUpe0lnKCk7SmcoZSk7Yi5mbGFnc3w9MjU2O1lpKGEsYixjLGQpO3JldHVybiBiLmNoaWxkfXZhciBuaj17ZGVoeWRyYXRlZDpudWxsLHRyZWVDb250ZXh0Om51bGwscmV0cnlMYW5lOjB9O2Z1bmN0aW9uIG9qKGEpe3JldHVybntiYXNlTGFuZXM6YSxjYWNoZVBvb2w6bnVsbCx0cmFuc2l0aW9uczpudWxsfX0KZnVuY3Rpb24gcGooYSxiLGMpe3ZhciBkPWIucGVuZGluZ1Byb3BzLGU9TS5jdXJyZW50LGY9ITEsZz0wIT09KGIuZmxhZ3MmMTI4KSxoOyhoPWcpfHwoaD1udWxsIT09YSYmbnVsbD09PWEubWVtb2l6ZWRTdGF0ZT8hMTowIT09KGUmMikpO2lmKGgpZj0hMCxiLmZsYWdzJj0tMTI5O2Vsc2UgaWYobnVsbD09PWF8fG51bGwhPT1hLm1lbW9pemVkU3RhdGUpZXw9MTtHKE0sZSYxKTtpZihudWxsPT09YSl7RWcoYik7YT1iLm1lbW9pemVkU3RhdGU7aWYobnVsbCE9PWEmJihhPWEuZGVoeWRyYXRlZCxudWxsIT09YSkpcmV0dXJuIDA9PT0oYi5tb2RlJjEpP2IubGFuZXM9MToiJCEiPT09YS5kYXRhP2IubGFuZXM9ODpiLmxhbmVzPTEwNzM3NDE4MjQsbnVsbDtnPWQuY2hpbGRyZW47YT1kLmZhbGxiYWNrO3JldHVybiBmPyhkPWIubW9kZSxmPWIuY2hpbGQsZz17bW9kZToiaGlkZGVuIixjaGlsZHJlbjpnfSwwPT09KGQmMSkmJm51bGwhPT1mPyhmLmNoaWxkTGFuZXM9MCxmLnBlbmRpbmdQcm9wcz0KZyk6Zj1xaihnLGQsMCxudWxsKSxhPUFoKGEsZCxjLG51bGwpLGYucmV0dXJuPWIsYS5yZXR1cm49YixmLnNpYmxpbmc9YSxiLmNoaWxkPWYsYi5jaGlsZC5tZW1vaXplZFN0YXRlPW9qKGMpLGIubWVtb2l6ZWRTdGF0ZT1uaixhKTpyaihiLGcpfWU9YS5tZW1vaXplZFN0YXRlO2lmKG51bGwhPT1lJiYoaD1lLmRlaHlkcmF0ZWQsbnVsbCE9PWgpKXJldHVybiBzaihhLGIsZyxkLGgsZSxjKTtpZihmKXtmPWQuZmFsbGJhY2s7Zz1iLm1vZGU7ZT1hLmNoaWxkO2g9ZS5zaWJsaW5nO3ZhciBrPXttb2RlOiJoaWRkZW4iLGNoaWxkcmVuOmQuY2hpbGRyZW59OzA9PT0oZyYxKSYmYi5jaGlsZCE9PWU/KGQ9Yi5jaGlsZCxkLmNoaWxkTGFuZXM9MCxkLnBlbmRpbmdQcm9wcz1rLGIuZGVsZXRpb25zPW51bGwpOihkPXdoKGUsayksZC5zdWJ0cmVlRmxhZ3M9ZS5zdWJ0cmVlRmxhZ3MmMTQ2ODAwNjQpO251bGwhPT1oP2Y9d2goaCxmKTooZj1BaChmLGcsYyxudWxsKSxmLmZsYWdzfD0yKTtmLnJldHVybj0KYjtkLnJldHVybj1iO2Quc2libGluZz1mO2IuY2hpbGQ9ZDtkPWY7Zj1iLmNoaWxkO2c9YS5jaGlsZC5tZW1vaXplZFN0YXRlO2c9bnVsbD09PWc/b2ooYyk6e2Jhc2VMYW5lczpnLmJhc2VMYW5lc3xjLGNhY2hlUG9vbDpudWxsLHRyYW5zaXRpb25zOmcudHJhbnNpdGlvbnN9O2YubWVtb2l6ZWRTdGF0ZT1nO2YuY2hpbGRMYW5lcz1hLmNoaWxkTGFuZXMmfmM7Yi5tZW1vaXplZFN0YXRlPW5qO3JldHVybiBkfWY9YS5jaGlsZDthPWYuc2libGluZztkPXdoKGYse21vZGU6InZpc2libGUiLGNoaWxkcmVuOmQuY2hpbGRyZW59KTswPT09KGIubW9kZSYxKSYmKGQubGFuZXM9Yyk7ZC5yZXR1cm49YjtkLnNpYmxpbmc9bnVsbDtudWxsIT09YSYmKGM9Yi5kZWxldGlvbnMsbnVsbD09PWM/KGIuZGVsZXRpb25zPVthXSxiLmZsYWdzfD0xNik6Yy5wdXNoKGEpKTtiLmNoaWxkPWQ7Yi5tZW1vaXplZFN0YXRlPW51bGw7cmV0dXJuIGR9CmZ1bmN0aW9uIHJqKGEsYil7Yj1xaih7bW9kZToidmlzaWJsZSIsY2hpbGRyZW46Yn0sYS5tb2RlLDAsbnVsbCk7Yi5yZXR1cm49YTtyZXR1cm4gYS5jaGlsZD1ifWZ1bmN0aW9uIHRqKGEsYixjLGQpe251bGwhPT1kJiZKZyhkKTtCaChiLGEuY2hpbGQsbnVsbCxjKTthPXJqKGIsYi5wZW5kaW5nUHJvcHMuY2hpbGRyZW4pO2EuZmxhZ3N8PTI7Yi5tZW1vaXplZFN0YXRlPW51bGw7cmV0dXJuIGF9CmZ1bmN0aW9uIHNqKGEsYixjLGQsZSxmLGcpe2lmKGMpe2lmKGIuZmxhZ3MmMjU2KXJldHVybiBiLmZsYWdzJj0tMjU3LGQ9TGkoRXJyb3IocCg0MjIpKSksdGooYSxiLGcsZCk7aWYobnVsbCE9PWIubWVtb2l6ZWRTdGF0ZSlyZXR1cm4gYi5jaGlsZD1hLmNoaWxkLGIuZmxhZ3N8PTEyOCxudWxsO2Y9ZC5mYWxsYmFjaztlPWIubW9kZTtkPXFqKHttb2RlOiJ2aXNpYmxlIixjaGlsZHJlbjpkLmNoaWxkcmVufSxlLDAsbnVsbCk7Zj1BaChmLGUsZyxudWxsKTtmLmZsYWdzfD0yO2QucmV0dXJuPWI7Zi5yZXR1cm49YjtkLnNpYmxpbmc9ZjtiLmNoaWxkPWQ7MCE9PShiLm1vZGUmMSkmJkJoKGIsYS5jaGlsZCxudWxsLGcpO2IuY2hpbGQubWVtb2l6ZWRTdGF0ZT1vaihnKTtiLm1lbW9pemVkU3RhdGU9bmo7cmV0dXJuIGZ9aWYoMD09PShiLm1vZGUmMSkpcmV0dXJuIHRqKGEsYixnLG51bGwpO2lmKCIkISI9PT1lLmRhdGEpe2Q9ZS5uZXh0U2libGluZyYmZS5uZXh0U2libGluZy5kYXRhc2V0OwppZihkKXZhciBoPWQuZGdzdDtkPWg7Zj1FcnJvcihwKDQxOSkpO2Q9TGkoZixkLHZvaWQgMCk7cmV0dXJuIHRqKGEsYixnLGQpfWg9MCE9PShnJmEuY2hpbGRMYW5lcyk7aWYoVWd8fGgpe2Q9UjtpZihudWxsIT09ZCl7c3dpdGNoKGcmLWcpe2Nhc2UgNDplPTI7YnJlYWs7Y2FzZSAxNjplPTg7YnJlYWs7Y2FzZSA2NDpjYXNlIDEyODpjYXNlIDI1NjpjYXNlIDUxMjpjYXNlIDEwMjQ6Y2FzZSAyMDQ4OmNhc2UgNDA5NjpjYXNlIDgxOTI6Y2FzZSAxNjM4NDpjYXNlIDMyNzY4OmNhc2UgNjU1MzY6Y2FzZSAxMzEwNzI6Y2FzZSAyNjIxNDQ6Y2FzZSA1MjQyODg6Y2FzZSAxMDQ4NTc2OmNhc2UgMjA5NzE1MjpjYXNlIDQxOTQzMDQ6Y2FzZSA4Mzg4NjA4OmNhc2UgMTY3NzcyMTY6Y2FzZSAzMzU1NDQzMjpjYXNlIDY3MTA4ODY0OmU9MzI7YnJlYWs7Y2FzZSA1MzY4NzA5MTI6ZT0yNjg0MzU0NTY7YnJlYWs7ZGVmYXVsdDplPTB9ZT0wIT09KGUmKGQuc3VzcGVuZGVkTGFuZXN8ZykpPzA6ZTsKMCE9PWUmJmUhPT1mLnJldHJ5TGFuZSYmKGYucmV0cnlMYW5lPWUsWmcoYSxlKSxtaChkLGEsZSwtMSkpfXVqKCk7ZD1MaShFcnJvcihwKDQyMSkpKTtyZXR1cm4gdGooYSxiLGcsZCl9aWYoIiQ/Ij09PWUuZGF0YSlyZXR1cm4gYi5mbGFnc3w9MTI4LGIuY2hpbGQ9YS5jaGlsZCxiPXZqLmJpbmQobnVsbCxhKSxlLl9yZWFjdFJldHJ5PWIsbnVsbDthPWYudHJlZUNvbnRleHQ7eWc9TGYoZS5uZXh0U2libGluZyk7eGc9YjtJPSEwO3pnPW51bGw7bnVsbCE9PWEmJihvZ1twZysrXT1yZyxvZ1twZysrXT1zZyxvZ1twZysrXT1xZyxyZz1hLmlkLHNnPWEub3ZlcmZsb3cscWc9Yik7Yj1yaihiLGQuY2hpbGRyZW4pO2IuZmxhZ3N8PTQwOTY7cmV0dXJuIGJ9ZnVuY3Rpb24gd2ooYSxiLGMpe2EubGFuZXN8PWI7dmFyIGQ9YS5hbHRlcm5hdGU7bnVsbCE9PWQmJihkLmxhbmVzfD1iKTtTZyhhLnJldHVybixiLGMpfQpmdW5jdGlvbiB4aihhLGIsYyxkLGUpe3ZhciBmPWEubWVtb2l6ZWRTdGF0ZTtudWxsPT09Zj9hLm1lbW9pemVkU3RhdGU9e2lzQmFja3dhcmRzOmIscmVuZGVyaW5nOm51bGwscmVuZGVyaW5nU3RhcnRUaW1lOjAsbGFzdDpkLHRhaWw6Yyx0YWlsTW9kZTplfTooZi5pc0JhY2t3YXJkcz1iLGYucmVuZGVyaW5nPW51bGwsZi5yZW5kZXJpbmdTdGFydFRpbWU9MCxmLmxhc3Q9ZCxmLnRhaWw9YyxmLnRhaWxNb2RlPWUpfQpmdW5jdGlvbiB5aihhLGIsYyl7dmFyIGQ9Yi5wZW5kaW5nUHJvcHMsZT1kLnJldmVhbE9yZGVyLGY9ZC50YWlsO1lpKGEsYixkLmNoaWxkcmVuLGMpO2Q9TS5jdXJyZW50O2lmKDAhPT0oZCYyKSlkPWQmMXwyLGIuZmxhZ3N8PTEyODtlbHNle2lmKG51bGwhPT1hJiYwIT09KGEuZmxhZ3MmMTI4KSlhOmZvcihhPWIuY2hpbGQ7bnVsbCE9PWE7KXtpZigxMz09PWEudGFnKW51bGwhPT1hLm1lbW9pemVkU3RhdGUmJndqKGEsYyxiKTtlbHNlIGlmKDE5PT09YS50YWcpd2ooYSxjLGIpO2Vsc2UgaWYobnVsbCE9PWEuY2hpbGQpe2EuY2hpbGQucmV0dXJuPWE7YT1hLmNoaWxkO2NvbnRpbnVlfWlmKGE9PT1iKWJyZWFrIGE7Zm9yKDtudWxsPT09YS5zaWJsaW5nOyl7aWYobnVsbD09PWEucmV0dXJufHxhLnJldHVybj09PWIpYnJlYWsgYTthPWEucmV0dXJufWEuc2libGluZy5yZXR1cm49YS5yZXR1cm47YT1hLnNpYmxpbmd9ZCY9MX1HKE0sZCk7aWYoMD09PShiLm1vZGUmMSkpYi5tZW1vaXplZFN0YXRlPQpudWxsO2Vsc2Ugc3dpdGNoKGUpe2Nhc2UgImZvcndhcmRzIjpjPWIuY2hpbGQ7Zm9yKGU9bnVsbDtudWxsIT09YzspYT1jLmFsdGVybmF0ZSxudWxsIT09YSYmbnVsbD09PU1oKGEpJiYoZT1jKSxjPWMuc2libGluZztjPWU7bnVsbD09PWM/KGU9Yi5jaGlsZCxiLmNoaWxkPW51bGwpOihlPWMuc2libGluZyxjLnNpYmxpbmc9bnVsbCk7eGooYiwhMSxlLGMsZik7YnJlYWs7Y2FzZSAiYmFja3dhcmRzIjpjPW51bGw7ZT1iLmNoaWxkO2ZvcihiLmNoaWxkPW51bGw7bnVsbCE9PWU7KXthPWUuYWx0ZXJuYXRlO2lmKG51bGwhPT1hJiZudWxsPT09TWgoYSkpe2IuY2hpbGQ9ZTticmVha31hPWUuc2libGluZztlLnNpYmxpbmc9YztjPWU7ZT1hfXhqKGIsITAsYyxudWxsLGYpO2JyZWFrO2Nhc2UgInRvZ2V0aGVyIjp4aihiLCExLG51bGwsbnVsbCx2b2lkIDApO2JyZWFrO2RlZmF1bHQ6Yi5tZW1vaXplZFN0YXRlPW51bGx9cmV0dXJuIGIuY2hpbGR9CmZ1bmN0aW9uIGpqKGEsYil7MD09PShiLm1vZGUmMSkmJm51bGwhPT1hJiYoYS5hbHRlcm5hdGU9bnVsbCxiLmFsdGVybmF0ZT1udWxsLGIuZmxhZ3N8PTIpfWZ1bmN0aW9uICRpKGEsYixjKXtudWxsIT09YSYmKGIuZGVwZW5kZW5jaWVzPWEuZGVwZW5kZW5jaWVzKTtoaHw9Yi5sYW5lcztpZigwPT09KGMmYi5jaGlsZExhbmVzKSlyZXR1cm4gbnVsbDtpZihudWxsIT09YSYmYi5jaGlsZCE9PWEuY2hpbGQpdGhyb3cgRXJyb3IocCgxNTMpKTtpZihudWxsIT09Yi5jaGlsZCl7YT1iLmNoaWxkO2M9d2goYSxhLnBlbmRpbmdQcm9wcyk7Yi5jaGlsZD1jO2ZvcihjLnJldHVybj1iO251bGwhPT1hLnNpYmxpbmc7KWE9YS5zaWJsaW5nLGM9Yy5zaWJsaW5nPXdoKGEsYS5wZW5kaW5nUHJvcHMpLGMucmV0dXJuPWI7Yy5zaWJsaW5nPW51bGx9cmV0dXJuIGIuY2hpbGR9CmZ1bmN0aW9uIHpqKGEsYixjKXtzd2l0Y2goYi50YWcpe2Nhc2UgMzpsaihiKTtJZygpO2JyZWFrO2Nhc2UgNTpLaChiKTticmVhaztjYXNlIDE6WmYoYi50eXBlKSYmY2coYik7YnJlYWs7Y2FzZSA0OkloKGIsYi5zdGF0ZU5vZGUuY29udGFpbmVySW5mbyk7YnJlYWs7Y2FzZSAxMDp2YXIgZD1iLnR5cGUuX2NvbnRleHQsZT1iLm1lbW9pemVkUHJvcHMudmFsdWU7RyhNZyxkLl9jdXJyZW50VmFsdWUpO2QuX2N1cnJlbnRWYWx1ZT1lO2JyZWFrO2Nhc2UgMTM6ZD1iLm1lbW9pemVkU3RhdGU7aWYobnVsbCE9PWQpe2lmKG51bGwhPT1kLmRlaHlkcmF0ZWQpcmV0dXJuIEcoTSxNLmN1cnJlbnQmMSksYi5mbGFnc3w9MTI4LG51bGw7aWYoMCE9PShjJmIuY2hpbGQuY2hpbGRMYW5lcykpcmV0dXJuIHBqKGEsYixjKTtHKE0sTS5jdXJyZW50JjEpO2E9JGkoYSxiLGMpO3JldHVybiBudWxsIT09YT9hLnNpYmxpbmc6bnVsbH1HKE0sTS5jdXJyZW50JjEpO2JyZWFrO2Nhc2UgMTk6ZD0wIT09KGMmCmIuY2hpbGRMYW5lcyk7aWYoMCE9PShhLmZsYWdzJjEyOCkpe2lmKGQpcmV0dXJuIHlqKGEsYixjKTtiLmZsYWdzfD0xMjh9ZT1iLm1lbW9pemVkU3RhdGU7bnVsbCE9PWUmJihlLnJlbmRlcmluZz1udWxsLGUudGFpbD1udWxsLGUubGFzdEVmZmVjdD1udWxsKTtHKE0sTS5jdXJyZW50KTtpZihkKWJyZWFrO2Vsc2UgcmV0dXJuIG51bGw7Y2FzZSAyMjpjYXNlIDIzOnJldHVybiBiLmxhbmVzPTAsZWooYSxiLGMpfXJldHVybiAkaShhLGIsYyl9dmFyIEFqLEJqLENqLERqOwpBaj1mdW5jdGlvbihhLGIpe2Zvcih2YXIgYz1iLmNoaWxkO251bGwhPT1jOyl7aWYoNT09PWMudGFnfHw2PT09Yy50YWcpYS5hcHBlbmRDaGlsZChjLnN0YXRlTm9kZSk7ZWxzZSBpZig0IT09Yy50YWcmJm51bGwhPT1jLmNoaWxkKXtjLmNoaWxkLnJldHVybj1jO2M9Yy5jaGlsZDtjb250aW51ZX1pZihjPT09YilicmVhaztmb3IoO251bGw9PT1jLnNpYmxpbmc7KXtpZihudWxsPT09Yy5yZXR1cm58fGMucmV0dXJuPT09YilyZXR1cm47Yz1jLnJldHVybn1jLnNpYmxpbmcucmV0dXJuPWMucmV0dXJuO2M9Yy5zaWJsaW5nfX07Qmo9ZnVuY3Rpb24oKXt9OwpDaj1mdW5jdGlvbihhLGIsYyxkKXt2YXIgZT1hLm1lbW9pemVkUHJvcHM7aWYoZSE9PWQpe2E9Yi5zdGF0ZU5vZGU7SGgoRWguY3VycmVudCk7dmFyIGY9bnVsbDtzd2l0Y2goYyl7Y2FzZSAiaW5wdXQiOmU9WWEoYSxlKTtkPVlhKGEsZCk7Zj1bXTticmVhaztjYXNlICJzZWxlY3QiOmU9QSh7fSxlLHt2YWx1ZTp2b2lkIDB9KTtkPUEoe30sZCx7dmFsdWU6dm9pZCAwfSk7Zj1bXTticmVhaztjYXNlICJ0ZXh0YXJlYSI6ZT1nYihhLGUpO2Q9Z2IoYSxkKTtmPVtdO2JyZWFrO2RlZmF1bHQ6ImZ1bmN0aW9uIiE9PXR5cGVvZiBlLm9uQ2xpY2smJiJmdW5jdGlvbiI9PT10eXBlb2YgZC5vbkNsaWNrJiYoYS5vbmNsaWNrPUJmKX11YihjLGQpO3ZhciBnO2M9bnVsbDtmb3IobCBpbiBlKWlmKCFkLmhhc093blByb3BlcnR5KGwpJiZlLmhhc093blByb3BlcnR5KGwpJiZudWxsIT1lW2xdKWlmKCJzdHlsZSI9PT1sKXt2YXIgaD1lW2xdO2ZvcihnIGluIGgpaC5oYXNPd25Qcm9wZXJ0eShnKSYmCihjfHwoYz17fSksY1tnXT0iIil9ZWxzZSJkYW5nZXJvdXNseVNldElubmVySFRNTCIhPT1sJiYiY2hpbGRyZW4iIT09bCYmInN1cHByZXNzQ29udGVudEVkaXRhYmxlV2FybmluZyIhPT1sJiYic3VwcHJlc3NIeWRyYXRpb25XYXJuaW5nIiE9PWwmJiJhdXRvRm9jdXMiIT09bCYmKGVhLmhhc093blByb3BlcnR5KGwpP2Z8fChmPVtdKTooZj1mfHxbXSkucHVzaChsLG51bGwpKTtmb3IobCBpbiBkKXt2YXIgaz1kW2xdO2g9bnVsbCE9ZT9lW2xdOnZvaWQgMDtpZihkLmhhc093blByb3BlcnR5KGwpJiZrIT09aCYmKG51bGwhPWt8fG51bGwhPWgpKWlmKCJzdHlsZSI9PT1sKWlmKGgpe2ZvcihnIGluIGgpIWguaGFzT3duUHJvcGVydHkoZyl8fGsmJmsuaGFzT3duUHJvcGVydHkoZyl8fChjfHwoYz17fSksY1tnXT0iIik7Zm9yKGcgaW4gaylrLmhhc093blByb3BlcnR5KGcpJiZoW2ddIT09a1tnXSYmKGN8fChjPXt9KSxjW2ddPWtbZ10pfWVsc2UgY3x8KGZ8fChmPVtdKSxmLnB1c2gobCwKYykpLGM9aztlbHNlImRhbmdlcm91c2x5U2V0SW5uZXJIVE1MIj09PWw/KGs9az9rLl9faHRtbDp2b2lkIDAsaD1oP2guX19odG1sOnZvaWQgMCxudWxsIT1rJiZoIT09ayYmKGY9Znx8W10pLnB1c2gobCxrKSk6ImNoaWxkcmVuIj09PWw/InN0cmluZyIhPT10eXBlb2YgayYmIm51bWJlciIhPT10eXBlb2Yga3x8KGY9Znx8W10pLnB1c2gobCwiIitrKToic3VwcHJlc3NDb250ZW50RWRpdGFibGVXYXJuaW5nIiE9PWwmJiJzdXBwcmVzc0h5ZHJhdGlvbldhcm5pbmciIT09bCYmKGVhLmhhc093blByb3BlcnR5KGwpPyhudWxsIT1rJiYib25TY3JvbGwiPT09bCYmRCgic2Nyb2xsIixhKSxmfHxoPT09a3x8KGY9W10pKTooZj1mfHxbXSkucHVzaChsLGspKX1jJiYoZj1mfHxbXSkucHVzaCgic3R5bGUiLGMpO3ZhciBsPWY7aWYoYi51cGRhdGVRdWV1ZT1sKWIuZmxhZ3N8PTR9fTtEaj1mdW5jdGlvbihhLGIsYyxkKXtjIT09ZCYmKGIuZmxhZ3N8PTQpfTsKZnVuY3Rpb24gRWooYSxiKXtpZighSSlzd2l0Y2goYS50YWlsTW9kZSl7Y2FzZSAiaGlkZGVuIjpiPWEudGFpbDtmb3IodmFyIGM9bnVsbDtudWxsIT09YjspbnVsbCE9PWIuYWx0ZXJuYXRlJiYoYz1iKSxiPWIuc2libGluZztudWxsPT09Yz9hLnRhaWw9bnVsbDpjLnNpYmxpbmc9bnVsbDticmVhaztjYXNlICJjb2xsYXBzZWQiOmM9YS50YWlsO2Zvcih2YXIgZD1udWxsO251bGwhPT1jOyludWxsIT09Yy5hbHRlcm5hdGUmJihkPWMpLGM9Yy5zaWJsaW5nO251bGw9PT1kP2J8fG51bGw9PT1hLnRhaWw/YS50YWlsPW51bGw6YS50YWlsLnNpYmxpbmc9bnVsbDpkLnNpYmxpbmc9bnVsbH19CmZ1bmN0aW9uIFMoYSl7dmFyIGI9bnVsbCE9PWEuYWx0ZXJuYXRlJiZhLmFsdGVybmF0ZS5jaGlsZD09PWEuY2hpbGQsYz0wLGQ9MDtpZihiKWZvcih2YXIgZT1hLmNoaWxkO251bGwhPT1lOyljfD1lLmxhbmVzfGUuY2hpbGRMYW5lcyxkfD1lLnN1YnRyZWVGbGFncyYxNDY4MDA2NCxkfD1lLmZsYWdzJjE0NjgwMDY0LGUucmV0dXJuPWEsZT1lLnNpYmxpbmc7ZWxzZSBmb3IoZT1hLmNoaWxkO251bGwhPT1lOyljfD1lLmxhbmVzfGUuY2hpbGRMYW5lcyxkfD1lLnN1YnRyZWVGbGFncyxkfD1lLmZsYWdzLGUucmV0dXJuPWEsZT1lLnNpYmxpbmc7YS5zdWJ0cmVlRmxhZ3N8PWQ7YS5jaGlsZExhbmVzPWM7cmV0dXJuIGJ9CmZ1bmN0aW9uIEZqKGEsYixjKXt2YXIgZD1iLnBlbmRpbmdQcm9wczt3ZyhiKTtzd2l0Y2goYi50YWcpe2Nhc2UgMjpjYXNlIDE2OmNhc2UgMTU6Y2FzZSAwOmNhc2UgMTE6Y2FzZSA3OmNhc2UgODpjYXNlIDEyOmNhc2UgOTpjYXNlIDE0OnJldHVybiBTKGIpLG51bGw7Y2FzZSAxOnJldHVybiBaZihiLnR5cGUpJiYkZigpLFMoYiksbnVsbDtjYXNlIDM6ZD1iLnN0YXRlTm9kZTtKaCgpO0UoV2YpO0UoSCk7T2goKTtkLnBlbmRpbmdDb250ZXh0JiYoZC5jb250ZXh0PWQucGVuZGluZ0NvbnRleHQsZC5wZW5kaW5nQ29udGV4dD1udWxsKTtpZihudWxsPT09YXx8bnVsbD09PWEuY2hpbGQpR2coYik/Yi5mbGFnc3w9NDpudWxsPT09YXx8YS5tZW1vaXplZFN0YXRlLmlzRGVoeWRyYXRlZCYmMD09PShiLmZsYWdzJjI1Nil8fChiLmZsYWdzfD0xMDI0LG51bGwhPT16ZyYmKEdqKHpnKSx6Zz1udWxsKSk7QmooYSxiKTtTKGIpO3JldHVybiBudWxsO2Nhc2UgNTpMaChiKTt2YXIgZT1IaChHaC5jdXJyZW50KTsKYz1iLnR5cGU7aWYobnVsbCE9PWEmJm51bGwhPWIuc3RhdGVOb2RlKUNqKGEsYixjLGQsZSksYS5yZWYhPT1iLnJlZiYmKGIuZmxhZ3N8PTUxMixiLmZsYWdzfD0yMDk3MTUyKTtlbHNle2lmKCFkKXtpZihudWxsPT09Yi5zdGF0ZU5vZGUpdGhyb3cgRXJyb3IocCgxNjYpKTtTKGIpO3JldHVybiBudWxsfWE9SGgoRWguY3VycmVudCk7aWYoR2coYikpe2Q9Yi5zdGF0ZU5vZGU7Yz1iLnR5cGU7dmFyIGY9Yi5tZW1vaXplZFByb3BzO2RbT2ZdPWI7ZFtQZl09ZjthPTAhPT0oYi5tb2RlJjEpO3N3aXRjaChjKXtjYXNlICJkaWFsb2ciOkQoImNhbmNlbCIsZCk7RCgiY2xvc2UiLGQpO2JyZWFrO2Nhc2UgImlmcmFtZSI6Y2FzZSAib2JqZWN0IjpjYXNlICJlbWJlZCI6RCgibG9hZCIsZCk7YnJlYWs7Y2FzZSAidmlkZW8iOmNhc2UgImF1ZGlvIjpmb3IoZT0wO2U8bGYubGVuZ3RoO2UrKylEKGxmW2VdLGQpO2JyZWFrO2Nhc2UgInNvdXJjZSI6RCgiZXJyb3IiLGQpO2JyZWFrO2Nhc2UgImltZyI6Y2FzZSAiaW1hZ2UiOmNhc2UgImxpbmsiOkQoImVycm9yIiwKZCk7RCgibG9hZCIsZCk7YnJlYWs7Y2FzZSAiZGV0YWlscyI6RCgidG9nZ2xlIixkKTticmVhaztjYXNlICJpbnB1dCI6WmEoZCxmKTtEKCJpbnZhbGlkIixkKTticmVhaztjYXNlICJzZWxlY3QiOmQuX3dyYXBwZXJTdGF0ZT17d2FzTXVsdGlwbGU6ISFmLm11bHRpcGxlfTtEKCJpbnZhbGlkIixkKTticmVhaztjYXNlICJ0ZXh0YXJlYSI6aGIoZCxmKSxEKCJpbnZhbGlkIixkKX11YihjLGYpO2U9bnVsbDtmb3IodmFyIGcgaW4gZilpZihmLmhhc093blByb3BlcnR5KGcpKXt2YXIgaD1mW2ddOyJjaGlsZHJlbiI9PT1nPyJzdHJpbmciPT09dHlwZW9mIGg/ZC50ZXh0Q29udGVudCE9PWgmJighMCE9PWYuc3VwcHJlc3NIeWRyYXRpb25XYXJuaW5nJiZBZihkLnRleHRDb250ZW50LGgsYSksZT1bImNoaWxkcmVuIixoXSk6Im51bWJlciI9PT10eXBlb2YgaCYmZC50ZXh0Q29udGVudCE9PSIiK2gmJighMCE9PWYuc3VwcHJlc3NIeWRyYXRpb25XYXJuaW5nJiZBZihkLnRleHRDb250ZW50LApoLGEpLGU9WyJjaGlsZHJlbiIsIiIraF0pOmVhLmhhc093blByb3BlcnR5KGcpJiZudWxsIT1oJiYib25TY3JvbGwiPT09ZyYmRCgic2Nyb2xsIixkKX1zd2l0Y2goYyl7Y2FzZSAiaW5wdXQiOlZhKGQpO2RiKGQsZiwhMCk7YnJlYWs7Y2FzZSAidGV4dGFyZWEiOlZhKGQpO2piKGQpO2JyZWFrO2Nhc2UgInNlbGVjdCI6Y2FzZSAib3B0aW9uIjpicmVhaztkZWZhdWx0OiJmdW5jdGlvbiI9PT10eXBlb2YgZi5vbkNsaWNrJiYoZC5vbmNsaWNrPUJmKX1kPWU7Yi51cGRhdGVRdWV1ZT1kO251bGwhPT1kJiYoYi5mbGFnc3w9NCl9ZWxzZXtnPTk9PT1lLm5vZGVUeXBlP2U6ZS5vd25lckRvY3VtZW50OyJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sIj09PWEmJihhPWtiKGMpKTsiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCI9PT1hPyJzY3JpcHQiPT09Yz8oYT1nLmNyZWF0ZUVsZW1lbnQoImRpdiIpLGEuaW5uZXJIVE1MPSI8c2NyaXB0Plx4M2Mvc2NyaXB0PiIsYT1hLnJlbW92ZUNoaWxkKGEuZmlyc3RDaGlsZCkpOgoic3RyaW5nIj09PXR5cGVvZiBkLmlzP2E9Zy5jcmVhdGVFbGVtZW50KGMse2lzOmQuaXN9KTooYT1nLmNyZWF0ZUVsZW1lbnQoYyksInNlbGVjdCI9PT1jJiYoZz1hLGQubXVsdGlwbGU/Zy5tdWx0aXBsZT0hMDpkLnNpemUmJihnLnNpemU9ZC5zaXplKSkpOmE9Zy5jcmVhdGVFbGVtZW50TlMoYSxjKTthW09mXT1iO2FbUGZdPWQ7QWooYSxiLCExLCExKTtiLnN0YXRlTm9kZT1hO2E6e2c9dmIoYyxkKTtzd2l0Y2goYyl7Y2FzZSAiZGlhbG9nIjpEKCJjYW5jZWwiLGEpO0QoImNsb3NlIixhKTtlPWQ7YnJlYWs7Y2FzZSAiaWZyYW1lIjpjYXNlICJvYmplY3QiOmNhc2UgImVtYmVkIjpEKCJsb2FkIixhKTtlPWQ7YnJlYWs7Y2FzZSAidmlkZW8iOmNhc2UgImF1ZGlvIjpmb3IoZT0wO2U8bGYubGVuZ3RoO2UrKylEKGxmW2VdLGEpO2U9ZDticmVhaztjYXNlICJzb3VyY2UiOkQoImVycm9yIixhKTtlPWQ7YnJlYWs7Y2FzZSAiaW1nIjpjYXNlICJpbWFnZSI6Y2FzZSAibGluayI6RCgiZXJyb3IiLAphKTtEKCJsb2FkIixhKTtlPWQ7YnJlYWs7Y2FzZSAiZGV0YWlscyI6RCgidG9nZ2xlIixhKTtlPWQ7YnJlYWs7Y2FzZSAiaW5wdXQiOlphKGEsZCk7ZT1ZYShhLGQpO0QoImludmFsaWQiLGEpO2JyZWFrO2Nhc2UgIm9wdGlvbiI6ZT1kO2JyZWFrO2Nhc2UgInNlbGVjdCI6YS5fd3JhcHBlclN0YXRlPXt3YXNNdWx0aXBsZTohIWQubXVsdGlwbGV9O2U9QSh7fSxkLHt2YWx1ZTp2b2lkIDB9KTtEKCJpbnZhbGlkIixhKTticmVhaztjYXNlICJ0ZXh0YXJlYSI6aGIoYSxkKTtlPWdiKGEsZCk7RCgiaW52YWxpZCIsYSk7YnJlYWs7ZGVmYXVsdDplPWR9dWIoYyxlKTtoPWU7Zm9yKGYgaW4gaClpZihoLmhhc093blByb3BlcnR5KGYpKXt2YXIgaz1oW2ZdOyJzdHlsZSI9PT1mP3NiKGEsayk6ImRhbmdlcm91c2x5U2V0SW5uZXJIVE1MIj09PWY/KGs9az9rLl9faHRtbDp2b2lkIDAsbnVsbCE9ayYmbmIoYSxrKSk6ImNoaWxkcmVuIj09PWY/InN0cmluZyI9PT10eXBlb2Ygaz8oInRleHRhcmVhIiE9PQpjfHwiIiE9PWspJiZvYihhLGspOiJudW1iZXIiPT09dHlwZW9mIGsmJm9iKGEsIiIrayk6InN1cHByZXNzQ29udGVudEVkaXRhYmxlV2FybmluZyIhPT1mJiYic3VwcHJlc3NIeWRyYXRpb25XYXJuaW5nIiE9PWYmJiJhdXRvRm9jdXMiIT09ZiYmKGVhLmhhc093blByb3BlcnR5KGYpP251bGwhPWsmJiJvblNjcm9sbCI9PT1mJiZEKCJzY3JvbGwiLGEpOm51bGwhPWsmJnRhKGEsZixrLGcpKX1zd2l0Y2goYyl7Y2FzZSAiaW5wdXQiOlZhKGEpO2RiKGEsZCwhMSk7YnJlYWs7Y2FzZSAidGV4dGFyZWEiOlZhKGEpO2piKGEpO2JyZWFrO2Nhc2UgIm9wdGlvbiI6bnVsbCE9ZC52YWx1ZSYmYS5zZXRBdHRyaWJ1dGUoInZhbHVlIiwiIitTYShkLnZhbHVlKSk7YnJlYWs7Y2FzZSAic2VsZWN0IjphLm11bHRpcGxlPSEhZC5tdWx0aXBsZTtmPWQudmFsdWU7bnVsbCE9Zj9mYihhLCEhZC5tdWx0aXBsZSxmLCExKTpudWxsIT1kLmRlZmF1bHRWYWx1ZSYmZmIoYSwhIWQubXVsdGlwbGUsZC5kZWZhdWx0VmFsdWUsCiEwKTticmVhaztkZWZhdWx0OiJmdW5jdGlvbiI9PT10eXBlb2YgZS5vbkNsaWNrJiYoYS5vbmNsaWNrPUJmKX1zd2l0Y2goYyl7Y2FzZSAiYnV0dG9uIjpjYXNlICJpbnB1dCI6Y2FzZSAic2VsZWN0IjpjYXNlICJ0ZXh0YXJlYSI6ZD0hIWQuYXV0b0ZvY3VzO2JyZWFrIGE7Y2FzZSAiaW1nIjpkPSEwO2JyZWFrIGE7ZGVmYXVsdDpkPSExfX1kJiYoYi5mbGFnc3w9NCl9bnVsbCE9PWIucmVmJiYoYi5mbGFnc3w9NTEyLGIuZmxhZ3N8PTIwOTcxNTIpfVMoYik7cmV0dXJuIG51bGw7Y2FzZSA2OmlmKGEmJm51bGwhPWIuc3RhdGVOb2RlKURqKGEsYixhLm1lbW9pemVkUHJvcHMsZCk7ZWxzZXtpZigic3RyaW5nIiE9PXR5cGVvZiBkJiZudWxsPT09Yi5zdGF0ZU5vZGUpdGhyb3cgRXJyb3IocCgxNjYpKTtjPUhoKEdoLmN1cnJlbnQpO0hoKEVoLmN1cnJlbnQpO2lmKEdnKGIpKXtkPWIuc3RhdGVOb2RlO2M9Yi5tZW1vaXplZFByb3BzO2RbT2ZdPWI7aWYoZj1kLm5vZGVWYWx1ZSE9PWMpaWYoYT0KeGcsbnVsbCE9PWEpc3dpdGNoKGEudGFnKXtjYXNlIDM6QWYoZC5ub2RlVmFsdWUsYywwIT09KGEubW9kZSYxKSk7YnJlYWs7Y2FzZSA1OiEwIT09YS5tZW1vaXplZFByb3BzLnN1cHByZXNzSHlkcmF0aW9uV2FybmluZyYmQWYoZC5ub2RlVmFsdWUsYywwIT09KGEubW9kZSYxKSl9ZiYmKGIuZmxhZ3N8PTQpfWVsc2UgZD0oOT09PWMubm9kZVR5cGU/YzpjLm93bmVyRG9jdW1lbnQpLmNyZWF0ZVRleHROb2RlKGQpLGRbT2ZdPWIsYi5zdGF0ZU5vZGU9ZH1TKGIpO3JldHVybiBudWxsO2Nhc2UgMTM6RShNKTtkPWIubWVtb2l6ZWRTdGF0ZTtpZihudWxsPT09YXx8bnVsbCE9PWEubWVtb2l6ZWRTdGF0ZSYmbnVsbCE9PWEubWVtb2l6ZWRTdGF0ZS5kZWh5ZHJhdGVkKXtpZihJJiZudWxsIT09eWcmJjAhPT0oYi5tb2RlJjEpJiYwPT09KGIuZmxhZ3MmMTI4KSlIZygpLElnKCksYi5mbGFnc3w9OTg1NjAsZj0hMTtlbHNlIGlmKGY9R2coYiksbnVsbCE9PWQmJm51bGwhPT1kLmRlaHlkcmF0ZWQpe2lmKG51bGw9PT0KYSl7aWYoIWYpdGhyb3cgRXJyb3IocCgzMTgpKTtmPWIubWVtb2l6ZWRTdGF0ZTtmPW51bGwhPT1mP2YuZGVoeWRyYXRlZDpudWxsO2lmKCFmKXRocm93IEVycm9yKHAoMzE3KSk7ZltPZl09Yn1lbHNlIElnKCksMD09PShiLmZsYWdzJjEyOCkmJihiLm1lbW9pemVkU3RhdGU9bnVsbCksYi5mbGFnc3w9NDtTKGIpO2Y9ITF9ZWxzZSBudWxsIT09emcmJihHaih6Zyksemc9bnVsbCksZj0hMDtpZighZilyZXR1cm4gYi5mbGFncyY2NTUzNj9iOm51bGx9aWYoMCE9PShiLmZsYWdzJjEyOCkpcmV0dXJuIGIubGFuZXM9YyxiO2Q9bnVsbCE9PWQ7ZCE9PShudWxsIT09YSYmbnVsbCE9PWEubWVtb2l6ZWRTdGF0ZSkmJmQmJihiLmNoaWxkLmZsYWdzfD04MTkyLDAhPT0oYi5tb2RlJjEpJiYobnVsbD09PWF8fDAhPT0oTS5jdXJyZW50JjEpPzA9PT1UJiYoVD0zKTp1aigpKSk7bnVsbCE9PWIudXBkYXRlUXVldWUmJihiLmZsYWdzfD00KTtTKGIpO3JldHVybiBudWxsO2Nhc2UgNDpyZXR1cm4gSmgoKSwKQmooYSxiKSxudWxsPT09YSYmc2YoYi5zdGF0ZU5vZGUuY29udGFpbmVySW5mbyksUyhiKSxudWxsO2Nhc2UgMTA6cmV0dXJuIFJnKGIudHlwZS5fY29udGV4dCksUyhiKSxudWxsO2Nhc2UgMTc6cmV0dXJuIFpmKGIudHlwZSkmJiRmKCksUyhiKSxudWxsO2Nhc2UgMTk6RShNKTtmPWIubWVtb2l6ZWRTdGF0ZTtpZihudWxsPT09ZilyZXR1cm4gUyhiKSxudWxsO2Q9MCE9PShiLmZsYWdzJjEyOCk7Zz1mLnJlbmRlcmluZztpZihudWxsPT09ZylpZihkKUVqKGYsITEpO2Vsc2V7aWYoMCE9PVR8fG51bGwhPT1hJiYwIT09KGEuZmxhZ3MmMTI4KSlmb3IoYT1iLmNoaWxkO251bGwhPT1hOyl7Zz1NaChhKTtpZihudWxsIT09Zyl7Yi5mbGFnc3w9MTI4O0VqKGYsITEpO2Q9Zy51cGRhdGVRdWV1ZTtudWxsIT09ZCYmKGIudXBkYXRlUXVldWU9ZCxiLmZsYWdzfD00KTtiLnN1YnRyZWVGbGFncz0wO2Q9Yztmb3IoYz1iLmNoaWxkO251bGwhPT1jOylmPWMsYT1kLGYuZmxhZ3MmPTE0NjgwMDY2LApnPWYuYWx0ZXJuYXRlLG51bGw9PT1nPyhmLmNoaWxkTGFuZXM9MCxmLmxhbmVzPWEsZi5jaGlsZD1udWxsLGYuc3VidHJlZUZsYWdzPTAsZi5tZW1vaXplZFByb3BzPW51bGwsZi5tZW1vaXplZFN0YXRlPW51bGwsZi51cGRhdGVRdWV1ZT1udWxsLGYuZGVwZW5kZW5jaWVzPW51bGwsZi5zdGF0ZU5vZGU9bnVsbCk6KGYuY2hpbGRMYW5lcz1nLmNoaWxkTGFuZXMsZi5sYW5lcz1nLmxhbmVzLGYuY2hpbGQ9Zy5jaGlsZCxmLnN1YnRyZWVGbGFncz0wLGYuZGVsZXRpb25zPW51bGwsZi5tZW1vaXplZFByb3BzPWcubWVtb2l6ZWRQcm9wcyxmLm1lbW9pemVkU3RhdGU9Zy5tZW1vaXplZFN0YXRlLGYudXBkYXRlUXVldWU9Zy51cGRhdGVRdWV1ZSxmLnR5cGU9Zy50eXBlLGE9Zy5kZXBlbmRlbmNpZXMsZi5kZXBlbmRlbmNpZXM9bnVsbD09PWE/bnVsbDp7bGFuZXM6YS5sYW5lcyxmaXJzdENvbnRleHQ6YS5maXJzdENvbnRleHR9KSxjPWMuc2libGluZztHKE0sTS5jdXJyZW50JjF8Mik7cmV0dXJuIGIuY2hpbGR9YT0KYS5zaWJsaW5nfW51bGwhPT1mLnRhaWwmJkIoKT5IaiYmKGIuZmxhZ3N8PTEyOCxkPSEwLEVqKGYsITEpLGIubGFuZXM9NDE5NDMwNCl9ZWxzZXtpZighZClpZihhPU1oKGcpLG51bGwhPT1hKXtpZihiLmZsYWdzfD0xMjgsZD0hMCxjPWEudXBkYXRlUXVldWUsbnVsbCE9PWMmJihiLnVwZGF0ZVF1ZXVlPWMsYi5mbGFnc3w9NCksRWooZiwhMCksbnVsbD09PWYudGFpbCYmImhpZGRlbiI9PT1mLnRhaWxNb2RlJiYhZy5hbHRlcm5hdGUmJiFJKXJldHVybiBTKGIpLG51bGx9ZWxzZSAyKkIoKS1mLnJlbmRlcmluZ1N0YXJ0VGltZT5IaiYmMTA3Mzc0MTgyNCE9PWMmJihiLmZsYWdzfD0xMjgsZD0hMCxFaihmLCExKSxiLmxhbmVzPTQxOTQzMDQpO2YuaXNCYWNrd2FyZHM/KGcuc2libGluZz1iLmNoaWxkLGIuY2hpbGQ9Zyk6KGM9Zi5sYXN0LG51bGwhPT1jP2Muc2libGluZz1nOmIuY2hpbGQ9ZyxmLmxhc3Q9Zyl9aWYobnVsbCE9PWYudGFpbClyZXR1cm4gYj1mLnRhaWwsZi5yZW5kZXJpbmc9CmIsZi50YWlsPWIuc2libGluZyxmLnJlbmRlcmluZ1N0YXJ0VGltZT1CKCksYi5zaWJsaW5nPW51bGwsYz1NLmN1cnJlbnQsRyhNLGQ/YyYxfDI6YyYxKSxiO1MoYik7cmV0dXJuIG51bGw7Y2FzZSAyMjpjYXNlIDIzOnJldHVybiBJaigpLGQ9bnVsbCE9PWIubWVtb2l6ZWRTdGF0ZSxudWxsIT09YSYmbnVsbCE9PWEubWVtb2l6ZWRTdGF0ZSE9PWQmJihiLmZsYWdzfD04MTkyKSxkJiYwIT09KGIubW9kZSYxKT8wIT09KGdqJjEwNzM3NDE4MjQpJiYoUyhiKSxiLnN1YnRyZWVGbGFncyY2JiYoYi5mbGFnc3w9ODE5MikpOlMoYiksbnVsbDtjYXNlIDI0OnJldHVybiBudWxsO2Nhc2UgMjU6cmV0dXJuIG51bGx9dGhyb3cgRXJyb3IocCgxNTYsYi50YWcpKTt9CmZ1bmN0aW9uIEpqKGEsYil7d2coYik7c3dpdGNoKGIudGFnKXtjYXNlIDE6cmV0dXJuIFpmKGIudHlwZSkmJiRmKCksYT1iLmZsYWdzLGEmNjU1MzY/KGIuZmxhZ3M9YSYtNjU1Mzd8MTI4LGIpOm51bGw7Y2FzZSAzOnJldHVybiBKaCgpLEUoV2YpLEUoSCksT2goKSxhPWIuZmxhZ3MsMCE9PShhJjY1NTM2KSYmMD09PShhJjEyOCk/KGIuZmxhZ3M9YSYtNjU1Mzd8MTI4LGIpOm51bGw7Y2FzZSA1OnJldHVybiBMaChiKSxudWxsO2Nhc2UgMTM6RShNKTthPWIubWVtb2l6ZWRTdGF0ZTtpZihudWxsIT09YSYmbnVsbCE9PWEuZGVoeWRyYXRlZCl7aWYobnVsbD09PWIuYWx0ZXJuYXRlKXRocm93IEVycm9yKHAoMzQwKSk7SWcoKX1hPWIuZmxhZ3M7cmV0dXJuIGEmNjU1MzY/KGIuZmxhZ3M9YSYtNjU1Mzd8MTI4LGIpOm51bGw7Y2FzZSAxOTpyZXR1cm4gRShNKSxudWxsO2Nhc2UgNDpyZXR1cm4gSmgoKSxudWxsO2Nhc2UgMTA6cmV0dXJuIFJnKGIudHlwZS5fY29udGV4dCksbnVsbDtjYXNlIDIyOmNhc2UgMjM6cmV0dXJuIElqKCksCm51bGw7Y2FzZSAyNDpyZXR1cm4gbnVsbDtkZWZhdWx0OnJldHVybiBudWxsfX12YXIgS2o9ITEsVT0hMSxMaj0iZnVuY3Rpb24iPT09dHlwZW9mIFdlYWtTZXQ/V2Vha1NldDpTZXQsVj1udWxsO2Z1bmN0aW9uIE1qKGEsYil7dmFyIGM9YS5yZWY7aWYobnVsbCE9PWMpaWYoImZ1bmN0aW9uIj09PXR5cGVvZiBjKXRyeXtjKG51bGwpfWNhdGNoKGQpe1coYSxiLGQpfWVsc2UgYy5jdXJyZW50PW51bGx9ZnVuY3Rpb24gTmooYSxiLGMpe3RyeXtjKCl9Y2F0Y2goZCl7VyhhLGIsZCl9fXZhciBPaj0hMTsKZnVuY3Rpb24gUGooYSxiKXtDZj1kZDthPU1lKCk7aWYoTmUoYSkpe2lmKCJzZWxlY3Rpb25TdGFydCJpbiBhKXZhciBjPXtzdGFydDphLnNlbGVjdGlvblN0YXJ0LGVuZDphLnNlbGVjdGlvbkVuZH07ZWxzZSBhOntjPShjPWEub3duZXJEb2N1bWVudCkmJmMuZGVmYXVsdFZpZXd8fHdpbmRvdzt2YXIgZD1jLmdldFNlbGVjdGlvbiYmYy5nZXRTZWxlY3Rpb24oKTtpZihkJiYwIT09ZC5yYW5nZUNvdW50KXtjPWQuYW5jaG9yTm9kZTt2YXIgZT1kLmFuY2hvck9mZnNldCxmPWQuZm9jdXNOb2RlO2Q9ZC5mb2N1c09mZnNldDt0cnl7Yy5ub2RlVHlwZSxmLm5vZGVUeXBlfWNhdGNoKEYpe2M9bnVsbDticmVhayBhfXZhciBnPTAsaD0tMSxrPS0xLGw9MCxtPTAscT1hLHI9bnVsbDtiOmZvcig7Oyl7Zm9yKHZhciB5Ozspe3EhPT1jfHwwIT09ZSYmMyE9PXEubm9kZVR5cGV8fChoPWcrZSk7cSE9PWZ8fDAhPT1kJiYzIT09cS5ub2RlVHlwZXx8KGs9ZytkKTszPT09cS5ub2RlVHlwZSYmKGcrPQpxLm5vZGVWYWx1ZS5sZW5ndGgpO2lmKG51bGw9PT0oeT1xLmZpcnN0Q2hpbGQpKWJyZWFrO3I9cTtxPXl9Zm9yKDs7KXtpZihxPT09YSlicmVhayBiO3I9PT1jJiYrK2w9PT1lJiYoaD1nKTtyPT09ZiYmKyttPT09ZCYmKGs9Zyk7aWYobnVsbCE9PSh5PXEubmV4dFNpYmxpbmcpKWJyZWFrO3E9cjtyPXEucGFyZW50Tm9kZX1xPXl9Yz0tMT09PWh8fC0xPT09az9udWxsOntzdGFydDpoLGVuZDprfX1lbHNlIGM9bnVsbH1jPWN8fHtzdGFydDowLGVuZDowfX1lbHNlIGM9bnVsbDtEZj17Zm9jdXNlZEVsZW06YSxzZWxlY3Rpb25SYW5nZTpjfTtkZD0hMTtmb3IoVj1iO251bGwhPT1WOylpZihiPVYsYT1iLmNoaWxkLDAhPT0oYi5zdWJ0cmVlRmxhZ3MmMTAyOCkmJm51bGwhPT1hKWEucmV0dXJuPWIsVj1hO2Vsc2UgZm9yKDtudWxsIT09Vjspe2I9Vjt0cnl7dmFyIG49Yi5hbHRlcm5hdGU7aWYoMCE9PShiLmZsYWdzJjEwMjQpKXN3aXRjaChiLnRhZyl7Y2FzZSAwOmNhc2UgMTE6Y2FzZSAxNTpicmVhazsKY2FzZSAxOmlmKG51bGwhPT1uKXt2YXIgdD1uLm1lbW9pemVkUHJvcHMsSj1uLm1lbW9pemVkU3RhdGUseD1iLnN0YXRlTm9kZSx3PXguZ2V0U25hcHNob3RCZWZvcmVVcGRhdGUoYi5lbGVtZW50VHlwZT09PWIudHlwZT90OkxnKGIudHlwZSx0KSxKKTt4Ll9fcmVhY3RJbnRlcm5hbFNuYXBzaG90QmVmb3JlVXBkYXRlPXd9YnJlYWs7Y2FzZSAzOnZhciB1PWIuc3RhdGVOb2RlLmNvbnRhaW5lckluZm87MT09PXUubm9kZVR5cGU/dS50ZXh0Q29udGVudD0iIjo5PT09dS5ub2RlVHlwZSYmdS5kb2N1bWVudEVsZW1lbnQmJnUucmVtb3ZlQ2hpbGQodS5kb2N1bWVudEVsZW1lbnQpO2JyZWFrO2Nhc2UgNTpjYXNlIDY6Y2FzZSA0OmNhc2UgMTc6YnJlYWs7ZGVmYXVsdDp0aHJvdyBFcnJvcihwKDE2MykpO319Y2F0Y2goRil7VyhiLGIucmV0dXJuLEYpfWE9Yi5zaWJsaW5nO2lmKG51bGwhPT1hKXthLnJldHVybj1iLnJldHVybjtWPWE7YnJlYWt9Vj1iLnJldHVybn1uPU9qO09qPSExO3JldHVybiBufQpmdW5jdGlvbiBRaihhLGIsYyl7dmFyIGQ9Yi51cGRhdGVRdWV1ZTtkPW51bGwhPT1kP2QubGFzdEVmZmVjdDpudWxsO2lmKG51bGwhPT1kKXt2YXIgZT1kPWQubmV4dDtkb3tpZigoZS50YWcmYSk9PT1hKXt2YXIgZj1lLmRlc3Ryb3k7ZS5kZXN0cm95PXZvaWQgMDt2b2lkIDAhPT1mJiZOaihiLGMsZil9ZT1lLm5leHR9d2hpbGUoZSE9PWQpfX1mdW5jdGlvbiBSaihhLGIpe2I9Yi51cGRhdGVRdWV1ZTtiPW51bGwhPT1iP2IubGFzdEVmZmVjdDpudWxsO2lmKG51bGwhPT1iKXt2YXIgYz1iPWIubmV4dDtkb3tpZigoYy50YWcmYSk9PT1hKXt2YXIgZD1jLmNyZWF0ZTtjLmRlc3Ryb3k9ZCgpfWM9Yy5uZXh0fXdoaWxlKGMhPT1iKX19ZnVuY3Rpb24gU2ooYSl7dmFyIGI9YS5yZWY7aWYobnVsbCE9PWIpe3ZhciBjPWEuc3RhdGVOb2RlO3N3aXRjaChhLnRhZyl7Y2FzZSA1OmE9YzticmVhaztkZWZhdWx0OmE9Y30iZnVuY3Rpb24iPT09dHlwZW9mIGI/YihhKTpiLmN1cnJlbnQ9YX19CmZ1bmN0aW9uIFRqKGEpe3ZhciBiPWEuYWx0ZXJuYXRlO251bGwhPT1iJiYoYS5hbHRlcm5hdGU9bnVsbCxUaihiKSk7YS5jaGlsZD1udWxsO2EuZGVsZXRpb25zPW51bGw7YS5zaWJsaW5nPW51bGw7NT09PWEudGFnJiYoYj1hLnN0YXRlTm9kZSxudWxsIT09YiYmKGRlbGV0ZSBiW09mXSxkZWxldGUgYltQZl0sZGVsZXRlIGJbb2ZdLGRlbGV0ZSBiW1FmXSxkZWxldGUgYltSZl0pKTthLnN0YXRlTm9kZT1udWxsO2EucmV0dXJuPW51bGw7YS5kZXBlbmRlbmNpZXM9bnVsbDthLm1lbW9pemVkUHJvcHM9bnVsbDthLm1lbW9pemVkU3RhdGU9bnVsbDthLnBlbmRpbmdQcm9wcz1udWxsO2Euc3RhdGVOb2RlPW51bGw7YS51cGRhdGVRdWV1ZT1udWxsfWZ1bmN0aW9uIFVqKGEpe3JldHVybiA1PT09YS50YWd8fDM9PT1hLnRhZ3x8ND09PWEudGFnfQpmdW5jdGlvbiBWaihhKXthOmZvcig7Oyl7Zm9yKDtudWxsPT09YS5zaWJsaW5nOyl7aWYobnVsbD09PWEucmV0dXJufHxVaihhLnJldHVybikpcmV0dXJuIG51bGw7YT1hLnJldHVybn1hLnNpYmxpbmcucmV0dXJuPWEucmV0dXJuO2ZvcihhPWEuc2libGluZzs1IT09YS50YWcmJjYhPT1hLnRhZyYmMTghPT1hLnRhZzspe2lmKGEuZmxhZ3MmMiljb250aW51ZSBhO2lmKG51bGw9PT1hLmNoaWxkfHw0PT09YS50YWcpY29udGludWUgYTtlbHNlIGEuY2hpbGQucmV0dXJuPWEsYT1hLmNoaWxkfWlmKCEoYS5mbGFncyYyKSlyZXR1cm4gYS5zdGF0ZU5vZGV9fQpmdW5jdGlvbiBXaihhLGIsYyl7dmFyIGQ9YS50YWc7aWYoNT09PWR8fDY9PT1kKWE9YS5zdGF0ZU5vZGUsYj84PT09Yy5ub2RlVHlwZT9jLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGEsYik6Yy5pbnNlcnRCZWZvcmUoYSxiKTooOD09PWMubm9kZVR5cGU/KGI9Yy5wYXJlbnROb2RlLGIuaW5zZXJ0QmVmb3JlKGEsYykpOihiPWMsYi5hcHBlbmRDaGlsZChhKSksYz1jLl9yZWFjdFJvb3RDb250YWluZXIsbnVsbCE9PWMmJnZvaWQgMCE9PWN8fG51bGwhPT1iLm9uY2xpY2t8fChiLm9uY2xpY2s9QmYpKTtlbHNlIGlmKDQhPT1kJiYoYT1hLmNoaWxkLG51bGwhPT1hKSlmb3IoV2ooYSxiLGMpLGE9YS5zaWJsaW5nO251bGwhPT1hOylXaihhLGIsYyksYT1hLnNpYmxpbmd9CmZ1bmN0aW9uIFhqKGEsYixjKXt2YXIgZD1hLnRhZztpZig1PT09ZHx8Nj09PWQpYT1hLnN0YXRlTm9kZSxiP2MuaW5zZXJ0QmVmb3JlKGEsYik6Yy5hcHBlbmRDaGlsZChhKTtlbHNlIGlmKDQhPT1kJiYoYT1hLmNoaWxkLG51bGwhPT1hKSlmb3IoWGooYSxiLGMpLGE9YS5zaWJsaW5nO251bGwhPT1hOylYaihhLGIsYyksYT1hLnNpYmxpbmd9dmFyIFg9bnVsbCxZaj0hMTtmdW5jdGlvbiBaaihhLGIsYyl7Zm9yKGM9Yy5jaGlsZDtudWxsIT09YzspYWsoYSxiLGMpLGM9Yy5zaWJsaW5nfQpmdW5jdGlvbiBhayhhLGIsYyl7aWYobGMmJiJmdW5jdGlvbiI9PT10eXBlb2YgbGMub25Db21taXRGaWJlclVubW91bnQpdHJ5e2xjLm9uQ29tbWl0RmliZXJVbm1vdW50KGtjLGMpfWNhdGNoKGgpe31zd2l0Y2goYy50YWcpe2Nhc2UgNTpVfHxNaihjLGIpO2Nhc2UgNjp2YXIgZD1YLGU9WWo7WD1udWxsO1pqKGEsYixjKTtYPWQ7WWo9ZTtudWxsIT09WCYmKFlqPyhhPVgsYz1jLnN0YXRlTm9kZSw4PT09YS5ub2RlVHlwZT9hLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYyk6YS5yZW1vdmVDaGlsZChjKSk6WC5yZW1vdmVDaGlsZChjLnN0YXRlTm9kZSkpO2JyZWFrO2Nhc2UgMTg6bnVsbCE9PVgmJihZaj8oYT1YLGM9Yy5zdGF0ZU5vZGUsOD09PWEubm9kZVR5cGU/S2YoYS5wYXJlbnROb2RlLGMpOjE9PT1hLm5vZGVUeXBlJiZLZihhLGMpLGJkKGEpKTpLZihYLGMuc3RhdGVOb2RlKSk7YnJlYWs7Y2FzZSA0OmQ9WDtlPVlqO1g9Yy5zdGF0ZU5vZGUuY29udGFpbmVySW5mbztZaj0hMDsKWmooYSxiLGMpO1g9ZDtZaj1lO2JyZWFrO2Nhc2UgMDpjYXNlIDExOmNhc2UgMTQ6Y2FzZSAxNTppZighVSYmKGQ9Yy51cGRhdGVRdWV1ZSxudWxsIT09ZCYmKGQ9ZC5sYXN0RWZmZWN0LG51bGwhPT1kKSkpe2U9ZD1kLm5leHQ7ZG97dmFyIGY9ZSxnPWYuZGVzdHJveTtmPWYudGFnO3ZvaWQgMCE9PWcmJigwIT09KGYmMik/TmooYyxiLGcpOjAhPT0oZiY0KSYmTmooYyxiLGcpKTtlPWUubmV4dH13aGlsZShlIT09ZCl9WmooYSxiLGMpO2JyZWFrO2Nhc2UgMTppZighVSYmKE1qKGMsYiksZD1jLnN0YXRlTm9kZSwiZnVuY3Rpb24iPT09dHlwZW9mIGQuY29tcG9uZW50V2lsbFVubW91bnQpKXRyeXtkLnByb3BzPWMubWVtb2l6ZWRQcm9wcyxkLnN0YXRlPWMubWVtb2l6ZWRTdGF0ZSxkLmNvbXBvbmVudFdpbGxVbm1vdW50KCl9Y2F0Y2goaCl7VyhjLGIsaCl9WmooYSxiLGMpO2JyZWFrO2Nhc2UgMjE6WmooYSxiLGMpO2JyZWFrO2Nhc2UgMjI6Yy5tb2RlJjE/KFU9KGQ9VSl8fG51bGwhPT0KYy5tZW1vaXplZFN0YXRlLFpqKGEsYixjKSxVPWQpOlpqKGEsYixjKTticmVhaztkZWZhdWx0OlpqKGEsYixjKX19ZnVuY3Rpb24gYmsoYSl7dmFyIGI9YS51cGRhdGVRdWV1ZTtpZihudWxsIT09Yil7YS51cGRhdGVRdWV1ZT1udWxsO3ZhciBjPWEuc3RhdGVOb2RlO251bGw9PT1jJiYoYz1hLnN0YXRlTm9kZT1uZXcgTGopO2IuZm9yRWFjaChmdW5jdGlvbihiKXt2YXIgZD1jay5iaW5kKG51bGwsYSxiKTtjLmhhcyhiKXx8KGMuYWRkKGIpLGIudGhlbihkLGQpKX0pfX0KZnVuY3Rpb24gZGsoYSxiKXt2YXIgYz1iLmRlbGV0aW9ucztpZihudWxsIT09Yylmb3IodmFyIGQ9MDtkPGMubGVuZ3RoO2QrKyl7dmFyIGU9Y1tkXTt0cnl7dmFyIGY9YSxnPWIsaD1nO2E6Zm9yKDtudWxsIT09aDspe3N3aXRjaChoLnRhZyl7Y2FzZSA1Olg9aC5zdGF0ZU5vZGU7WWo9ITE7YnJlYWsgYTtjYXNlIDM6WD1oLnN0YXRlTm9kZS5jb250YWluZXJJbmZvO1lqPSEwO2JyZWFrIGE7Y2FzZSA0Olg9aC5zdGF0ZU5vZGUuY29udGFpbmVySW5mbztZaj0hMDticmVhayBhfWg9aC5yZXR1cm59aWYobnVsbD09PVgpdGhyb3cgRXJyb3IocCgxNjApKTthayhmLGcsZSk7WD1udWxsO1lqPSExO3ZhciBrPWUuYWx0ZXJuYXRlO251bGwhPT1rJiYoay5yZXR1cm49bnVsbCk7ZS5yZXR1cm49bnVsbH1jYXRjaChsKXtXKGUsYixsKX19aWYoYi5zdWJ0cmVlRmxhZ3MmMTI4NTQpZm9yKGI9Yi5jaGlsZDtudWxsIT09YjspZWsoYixhKSxiPWIuc2libGluZ30KZnVuY3Rpb24gZWsoYSxiKXt2YXIgYz1hLmFsdGVybmF0ZSxkPWEuZmxhZ3M7c3dpdGNoKGEudGFnKXtjYXNlIDA6Y2FzZSAxMTpjYXNlIDE0OmNhc2UgMTU6ZGsoYixhKTtmayhhKTtpZihkJjQpe3RyeXtRaigzLGEsYS5yZXR1cm4pLFJqKDMsYSl9Y2F0Y2godCl7VyhhLGEucmV0dXJuLHQpfXRyeXtRaig1LGEsYS5yZXR1cm4pfWNhdGNoKHQpe1coYSxhLnJldHVybix0KX19YnJlYWs7Y2FzZSAxOmRrKGIsYSk7ZmsoYSk7ZCY1MTImJm51bGwhPT1jJiZNaihjLGMucmV0dXJuKTticmVhaztjYXNlIDU6ZGsoYixhKTtmayhhKTtkJjUxMiYmbnVsbCE9PWMmJk1qKGMsYy5yZXR1cm4pO2lmKGEuZmxhZ3MmMzIpe3ZhciBlPWEuc3RhdGVOb2RlO3RyeXtvYihlLCIiKX1jYXRjaCh0KXtXKGEsYS5yZXR1cm4sdCl9fWlmKGQmNCYmKGU9YS5zdGF0ZU5vZGUsbnVsbCE9ZSkpe3ZhciBmPWEubWVtb2l6ZWRQcm9wcyxnPW51bGwhPT1jP2MubWVtb2l6ZWRQcm9wczpmLGg9YS50eXBlLGs9YS51cGRhdGVRdWV1ZTsKYS51cGRhdGVRdWV1ZT1udWxsO2lmKG51bGwhPT1rKXRyeXsiaW5wdXQiPT09aCYmInJhZGlvIj09PWYudHlwZSYmbnVsbCE9Zi5uYW1lJiZhYihlLGYpO3ZiKGgsZyk7dmFyIGw9dmIoaCxmKTtmb3IoZz0wO2c8ay5sZW5ndGg7Zys9Mil7dmFyIG09a1tnXSxxPWtbZysxXTsic3R5bGUiPT09bT9zYihlLHEpOiJkYW5nZXJvdXNseVNldElubmVySFRNTCI9PT1tP25iKGUscSk6ImNoaWxkcmVuIj09PW0/b2IoZSxxKTp0YShlLG0scSxsKX1zd2l0Y2goaCl7Y2FzZSAiaW5wdXQiOmJiKGUsZik7YnJlYWs7Y2FzZSAidGV4dGFyZWEiOmliKGUsZik7YnJlYWs7Y2FzZSAic2VsZWN0Ijp2YXIgcj1lLl93cmFwcGVyU3RhdGUud2FzTXVsdGlwbGU7ZS5fd3JhcHBlclN0YXRlLndhc011bHRpcGxlPSEhZi5tdWx0aXBsZTt2YXIgeT1mLnZhbHVlO251bGwhPXk/ZmIoZSwhIWYubXVsdGlwbGUseSwhMSk6ciE9PSEhZi5tdWx0aXBsZSYmKG51bGwhPWYuZGVmYXVsdFZhbHVlP2ZiKGUsISFmLm11bHRpcGxlLApmLmRlZmF1bHRWYWx1ZSwhMCk6ZmIoZSwhIWYubXVsdGlwbGUsZi5tdWx0aXBsZT9bXToiIiwhMSkpfWVbUGZdPWZ9Y2F0Y2godCl7VyhhLGEucmV0dXJuLHQpfX1icmVhaztjYXNlIDY6ZGsoYixhKTtmayhhKTtpZihkJjQpe2lmKG51bGw9PT1hLnN0YXRlTm9kZSl0aHJvdyBFcnJvcihwKDE2MikpO2U9YS5zdGF0ZU5vZGU7Zj1hLm1lbW9pemVkUHJvcHM7dHJ5e2Uubm9kZVZhbHVlPWZ9Y2F0Y2godCl7VyhhLGEucmV0dXJuLHQpfX1icmVhaztjYXNlIDM6ZGsoYixhKTtmayhhKTtpZihkJjQmJm51bGwhPT1jJiZjLm1lbW9pemVkU3RhdGUuaXNEZWh5ZHJhdGVkKXRyeXtiZChiLmNvbnRhaW5lckluZm8pfWNhdGNoKHQpe1coYSxhLnJldHVybix0KX1icmVhaztjYXNlIDQ6ZGsoYixhKTtmayhhKTticmVhaztjYXNlIDEzOmRrKGIsYSk7ZmsoYSk7ZT1hLmNoaWxkO2UuZmxhZ3MmODE5MiYmKGY9bnVsbCE9PWUubWVtb2l6ZWRTdGF0ZSxlLnN0YXRlTm9kZS5pc0hpZGRlbj1mLCFmfHwKbnVsbCE9PWUuYWx0ZXJuYXRlJiZudWxsIT09ZS5hbHRlcm5hdGUubWVtb2l6ZWRTdGF0ZXx8KGdrPUIoKSkpO2QmNCYmYmsoYSk7YnJlYWs7Y2FzZSAyMjptPW51bGwhPT1jJiZudWxsIT09Yy5tZW1vaXplZFN0YXRlO2EubW9kZSYxPyhVPShsPVUpfHxtLGRrKGIsYSksVT1sKTpkayhiLGEpO2ZrKGEpO2lmKGQmODE5Mil7bD1udWxsIT09YS5tZW1vaXplZFN0YXRlO2lmKChhLnN0YXRlTm9kZS5pc0hpZGRlbj1sKSYmIW0mJjAhPT0oYS5tb2RlJjEpKWZvcihWPWEsbT1hLmNoaWxkO251bGwhPT1tOyl7Zm9yKHE9Vj1tO251bGwhPT1WOyl7cj1WO3k9ci5jaGlsZDtzd2l0Y2goci50YWcpe2Nhc2UgMDpjYXNlIDExOmNhc2UgMTQ6Y2FzZSAxNTpRaig0LHIsci5yZXR1cm4pO2JyZWFrO2Nhc2UgMTpNaihyLHIucmV0dXJuKTt2YXIgbj1yLnN0YXRlTm9kZTtpZigiZnVuY3Rpb24iPT09dHlwZW9mIG4uY29tcG9uZW50V2lsbFVubW91bnQpe2Q9cjtjPXIucmV0dXJuO3RyeXtiPWQsbi5wcm9wcz0KYi5tZW1vaXplZFByb3BzLG4uc3RhdGU9Yi5tZW1vaXplZFN0YXRlLG4uY29tcG9uZW50V2lsbFVubW91bnQoKX1jYXRjaCh0KXtXKGQsYyx0KX19YnJlYWs7Y2FzZSA1Ok1qKHIsci5yZXR1cm4pO2JyZWFrO2Nhc2UgMjI6aWYobnVsbCE9PXIubWVtb2l6ZWRTdGF0ZSl7aGsocSk7Y29udGludWV9fW51bGwhPT15Pyh5LnJldHVybj1yLFY9eSk6aGsocSl9bT1tLnNpYmxpbmd9YTpmb3IobT1udWxsLHE9YTs7KXtpZig1PT09cS50YWcpe2lmKG51bGw9PT1tKXttPXE7dHJ5e2U9cS5zdGF0ZU5vZGUsbD8oZj1lLnN0eWxlLCJmdW5jdGlvbiI9PT10eXBlb2YgZi5zZXRQcm9wZXJ0eT9mLnNldFByb3BlcnR5KCJkaXNwbGF5Iiwibm9uZSIsImltcG9ydGFudCIpOmYuZGlzcGxheT0ibm9uZSIpOihoPXEuc3RhdGVOb2RlLGs9cS5tZW1vaXplZFByb3BzLnN0eWxlLGc9dm9pZCAwIT09ayYmbnVsbCE9PWsmJmsuaGFzT3duUHJvcGVydHkoImRpc3BsYXkiKT9rLmRpc3BsYXk6bnVsbCxoLnN0eWxlLmRpc3BsYXk9CnJiKCJkaXNwbGF5IixnKSl9Y2F0Y2godCl7VyhhLGEucmV0dXJuLHQpfX19ZWxzZSBpZig2PT09cS50YWcpe2lmKG51bGw9PT1tKXRyeXtxLnN0YXRlTm9kZS5ub2RlVmFsdWU9bD8iIjpxLm1lbW9pemVkUHJvcHN9Y2F0Y2godCl7VyhhLGEucmV0dXJuLHQpfX1lbHNlIGlmKCgyMiE9PXEudGFnJiYyMyE9PXEudGFnfHxudWxsPT09cS5tZW1vaXplZFN0YXRlfHxxPT09YSkmJm51bGwhPT1xLmNoaWxkKXtxLmNoaWxkLnJldHVybj1xO3E9cS5jaGlsZDtjb250aW51ZX1pZihxPT09YSlicmVhayBhO2Zvcig7bnVsbD09PXEuc2libGluZzspe2lmKG51bGw9PT1xLnJldHVybnx8cS5yZXR1cm49PT1hKWJyZWFrIGE7bT09PXEmJihtPW51bGwpO3E9cS5yZXR1cm59bT09PXEmJihtPW51bGwpO3Euc2libGluZy5yZXR1cm49cS5yZXR1cm47cT1xLnNpYmxpbmd9fWJyZWFrO2Nhc2UgMTk6ZGsoYixhKTtmayhhKTtkJjQmJmJrKGEpO2JyZWFrO2Nhc2UgMjE6YnJlYWs7ZGVmYXVsdDpkayhiLAphKSxmayhhKX19ZnVuY3Rpb24gZmsoYSl7dmFyIGI9YS5mbGFncztpZihiJjIpe3RyeXthOntmb3IodmFyIGM9YS5yZXR1cm47bnVsbCE9PWM7KXtpZihVaihjKSl7dmFyIGQ9YzticmVhayBhfWM9Yy5yZXR1cm59dGhyb3cgRXJyb3IocCgxNjApKTt9c3dpdGNoKGQudGFnKXtjYXNlIDU6dmFyIGU9ZC5zdGF0ZU5vZGU7ZC5mbGFncyYzMiYmKG9iKGUsIiIpLGQuZmxhZ3MmPS0zMyk7dmFyIGY9VmooYSk7WGooYSxmLGUpO2JyZWFrO2Nhc2UgMzpjYXNlIDQ6dmFyIGc9ZC5zdGF0ZU5vZGUuY29udGFpbmVySW5mbyxoPVZqKGEpO1dqKGEsaCxnKTticmVhaztkZWZhdWx0OnRocm93IEVycm9yKHAoMTYxKSk7fX1jYXRjaChrKXtXKGEsYS5yZXR1cm4sayl9YS5mbGFncyY9LTN9YiY0MDk2JiYoYS5mbGFncyY9LTQwOTcpfWZ1bmN0aW9uIGlrKGEsYixjKXtWPWE7amsoYSxiLGMpfQpmdW5jdGlvbiBqayhhLGIsYyl7Zm9yKHZhciBkPTAhPT0oYS5tb2RlJjEpO251bGwhPT1WOyl7dmFyIGU9VixmPWUuY2hpbGQ7aWYoMjI9PT1lLnRhZyYmZCl7dmFyIGc9bnVsbCE9PWUubWVtb2l6ZWRTdGF0ZXx8S2o7aWYoIWcpe3ZhciBoPWUuYWx0ZXJuYXRlLGs9bnVsbCE9PWgmJm51bGwhPT1oLm1lbW9pemVkU3RhdGV8fFU7aD1Lajt2YXIgbD1VO0tqPWc7aWYoKFU9aykmJiFsKWZvcihWPWU7bnVsbCE9PVY7KWc9VixrPWcuY2hpbGQsMjI9PT1nLnRhZyYmbnVsbCE9PWcubWVtb2l6ZWRTdGF0ZT9rayhlKTpudWxsIT09az8oay5yZXR1cm49ZyxWPWspOmtrKGUpO2Zvcig7bnVsbCE9PWY7KVY9ZixqayhmLGIsYyksZj1mLnNpYmxpbmc7Vj1lO0tqPWg7VT1sfWxrKGEsYixjKX1lbHNlIDAhPT0oZS5zdWJ0cmVlRmxhZ3MmODc3MikmJm51bGwhPT1mPyhmLnJldHVybj1lLFY9Zik6bGsoYSxiLGMpfX0KZnVuY3Rpb24gbGsoYSl7Zm9yKDtudWxsIT09Vjspe3ZhciBiPVY7aWYoMCE9PShiLmZsYWdzJjg3NzIpKXt2YXIgYz1iLmFsdGVybmF0ZTt0cnl7aWYoMCE9PShiLmZsYWdzJjg3NzIpKXN3aXRjaChiLnRhZyl7Y2FzZSAwOmNhc2UgMTE6Y2FzZSAxNTpVfHxSaig1LGIpO2JyZWFrO2Nhc2UgMTp2YXIgZD1iLnN0YXRlTm9kZTtpZihiLmZsYWdzJjQmJiFVKWlmKG51bGw9PT1jKWQuY29tcG9uZW50RGlkTW91bnQoKTtlbHNle3ZhciBlPWIuZWxlbWVudFR5cGU9PT1iLnR5cGU/Yy5tZW1vaXplZFByb3BzOkxnKGIudHlwZSxjLm1lbW9pemVkUHJvcHMpO2QuY29tcG9uZW50RGlkVXBkYXRlKGUsYy5tZW1vaXplZFN0YXRlLGQuX19yZWFjdEludGVybmFsU25hcHNob3RCZWZvcmVVcGRhdGUpfXZhciBmPWIudXBkYXRlUXVldWU7bnVsbCE9PWYmJmloKGIsZixkKTticmVhaztjYXNlIDM6dmFyIGc9Yi51cGRhdGVRdWV1ZTtpZihudWxsIT09Zyl7Yz1udWxsO2lmKG51bGwhPT1iLmNoaWxkKXN3aXRjaChiLmNoaWxkLnRhZyl7Y2FzZSA1OmM9CmIuY2hpbGQuc3RhdGVOb2RlO2JyZWFrO2Nhc2UgMTpjPWIuY2hpbGQuc3RhdGVOb2RlfWloKGIsZyxjKX1icmVhaztjYXNlIDU6dmFyIGg9Yi5zdGF0ZU5vZGU7aWYobnVsbD09PWMmJmIuZmxhZ3MmNCl7Yz1oO3ZhciBrPWIubWVtb2l6ZWRQcm9wcztzd2l0Y2goYi50eXBlKXtjYXNlICJidXR0b24iOmNhc2UgImlucHV0IjpjYXNlICJzZWxlY3QiOmNhc2UgInRleHRhcmVhIjprLmF1dG9Gb2N1cyYmYy5mb2N1cygpO2JyZWFrO2Nhc2UgImltZyI6ay5zcmMmJihjLnNyYz1rLnNyYyl9fWJyZWFrO2Nhc2UgNjpicmVhaztjYXNlIDQ6YnJlYWs7Y2FzZSAxMjpicmVhaztjYXNlIDEzOmlmKG51bGw9PT1iLm1lbW9pemVkU3RhdGUpe3ZhciBsPWIuYWx0ZXJuYXRlO2lmKG51bGwhPT1sKXt2YXIgbT1sLm1lbW9pemVkU3RhdGU7aWYobnVsbCE9PW0pe3ZhciBxPW0uZGVoeWRyYXRlZDtudWxsIT09cSYmYmQocSl9fX1icmVhaztjYXNlIDE5OmNhc2UgMTc6Y2FzZSAyMTpjYXNlIDIyOmNhc2UgMjM6Y2FzZSAyNTpicmVhazsKZGVmYXVsdDp0aHJvdyBFcnJvcihwKDE2MykpO31VfHxiLmZsYWdzJjUxMiYmU2ooYil9Y2F0Y2gocil7VyhiLGIucmV0dXJuLHIpfX1pZihiPT09YSl7Vj1udWxsO2JyZWFrfWM9Yi5zaWJsaW5nO2lmKG51bGwhPT1jKXtjLnJldHVybj1iLnJldHVybjtWPWM7YnJlYWt9Vj1iLnJldHVybn19ZnVuY3Rpb24gaGsoYSl7Zm9yKDtudWxsIT09Vjspe3ZhciBiPVY7aWYoYj09PWEpe1Y9bnVsbDticmVha312YXIgYz1iLnNpYmxpbmc7aWYobnVsbCE9PWMpe2MucmV0dXJuPWIucmV0dXJuO1Y9YzticmVha31WPWIucmV0dXJufX0KZnVuY3Rpb24ga2soYSl7Zm9yKDtudWxsIT09Vjspe3ZhciBiPVY7dHJ5e3N3aXRjaChiLnRhZyl7Y2FzZSAwOmNhc2UgMTE6Y2FzZSAxNTp2YXIgYz1iLnJldHVybjt0cnl7UmooNCxiKX1jYXRjaChrKXtXKGIsYyxrKX1icmVhaztjYXNlIDE6dmFyIGQ9Yi5zdGF0ZU5vZGU7aWYoImZ1bmN0aW9uIj09PXR5cGVvZiBkLmNvbXBvbmVudERpZE1vdW50KXt2YXIgZT1iLnJldHVybjt0cnl7ZC5jb21wb25lbnREaWRNb3VudCgpfWNhdGNoKGspe1coYixlLGspfX12YXIgZj1iLnJldHVybjt0cnl7U2ooYil9Y2F0Y2goayl7VyhiLGYsayl9YnJlYWs7Y2FzZSA1OnZhciBnPWIucmV0dXJuO3RyeXtTaihiKX1jYXRjaChrKXtXKGIsZyxrKX19fWNhdGNoKGspe1coYixiLnJldHVybixrKX1pZihiPT09YSl7Vj1udWxsO2JyZWFrfXZhciBoPWIuc2libGluZztpZihudWxsIT09aCl7aC5yZXR1cm49Yi5yZXR1cm47Vj1oO2JyZWFrfVY9Yi5yZXR1cm59fQp2YXIgbWs9TWF0aC5jZWlsLG5rPXVhLlJlYWN0Q3VycmVudERpc3BhdGNoZXIsb2s9dWEuUmVhY3RDdXJyZW50T3duZXIscGs9dWEuUmVhY3RDdXJyZW50QmF0Y2hDb25maWcsSz0wLFI9bnVsbCxZPW51bGwsWj0wLGdqPTAsZmo9VWYoMCksVD0wLHFrPW51bGwsaGg9MCxyaz0wLHNrPTAsdGs9bnVsbCx1az1udWxsLGdrPTAsSGo9SW5maW5pdHksdms9bnVsbCxQaT0hMSxRaT1udWxsLFNpPW51bGwsd2s9ITEseGs9bnVsbCx5az0wLHprPTAsQWs9bnVsbCxCaz0tMSxDaz0wO2Z1bmN0aW9uIEwoKXtyZXR1cm4gMCE9PShLJjYpP0IoKTotMSE9PUJrP0JrOkJrPUIoKX0KZnVuY3Rpb24gbGgoYSl7aWYoMD09PShhLm1vZGUmMSkpcmV0dXJuIDE7aWYoMCE9PShLJjIpJiYwIT09WilyZXR1cm4gWiYtWjtpZihudWxsIT09S2cudHJhbnNpdGlvbilyZXR1cm4gMD09PUNrJiYoQ2s9eWMoKSksQ2s7YT1DO2lmKDAhPT1hKXJldHVybiBhO2E9d2luZG93LmV2ZW50O2E9dm9pZCAwPT09YT8xNjpqZChhLnR5cGUpO3JldHVybiBhfWZ1bmN0aW9uIG1oKGEsYixjLGQpe2lmKDUwPHprKXRocm93IHprPTAsQWs9bnVsbCxFcnJvcihwKDE4NSkpO0FjKGEsYyxkKTtpZigwPT09KEsmMil8fGEhPT1SKWE9PT1SJiYoMD09PShLJjIpJiYocmt8PWMpLDQ9PT1UJiZEayhhLFopKSxFayhhLGQpLDE9PT1jJiYwPT09SyYmMD09PShiLm1vZGUmMSkmJihIaj1CKCkrNTAwLGZnJiZqZygpKX0KZnVuY3Rpb24gRWsoYSxiKXt2YXIgYz1hLmNhbGxiYWNrTm9kZTt3YyhhLGIpO3ZhciBkPXVjKGEsYT09PVI/WjowKTtpZigwPT09ZCludWxsIT09YyYmYmMoYyksYS5jYWxsYmFja05vZGU9bnVsbCxhLmNhbGxiYWNrUHJpb3JpdHk9MDtlbHNlIGlmKGI9ZCYtZCxhLmNhbGxiYWNrUHJpb3JpdHkhPT1iKXtudWxsIT1jJiZiYyhjKTtpZigxPT09YikwPT09YS50YWc/aWcoRmsuYmluZChudWxsLGEpKTpoZyhGay5iaW5kKG51bGwsYSkpLEpmKGZ1bmN0aW9uKCl7MD09PShLJjYpJiZqZygpfSksYz1udWxsO2Vsc2V7c3dpdGNoKERjKGQpKXtjYXNlIDE6Yz1mYzticmVhaztjYXNlIDQ6Yz1nYzticmVhaztjYXNlIDE2OmM9aGM7YnJlYWs7Y2FzZSA1MzY4NzA5MTI6Yz1qYzticmVhaztkZWZhdWx0OmM9aGN9Yz1HayhjLEhrLmJpbmQobnVsbCxhKSl9YS5jYWxsYmFja1ByaW9yaXR5PWI7YS5jYWxsYmFja05vZGU9Y319CmZ1bmN0aW9uIEhrKGEsYil7Qms9LTE7Q2s9MDtpZigwIT09KEsmNikpdGhyb3cgRXJyb3IocCgzMjcpKTt2YXIgYz1hLmNhbGxiYWNrTm9kZTtpZihJaygpJiZhLmNhbGxiYWNrTm9kZSE9PWMpcmV0dXJuIG51bGw7dmFyIGQ9dWMoYSxhPT09Uj9aOjApO2lmKDA9PT1kKXJldHVybiBudWxsO2lmKDAhPT0oZCYzMCl8fDAhPT0oZCZhLmV4cGlyZWRMYW5lcyl8fGIpYj1KayhhLGQpO2Vsc2V7Yj1kO3ZhciBlPUs7S3w9Mjt2YXIgZj1LaygpO2lmKFIhPT1hfHxaIT09Yil2az1udWxsLEhqPUIoKSs1MDAsTGsoYSxiKTtkbyB0cnl7TWsoKTticmVha31jYXRjaChoKXtOayhhLGgpfXdoaWxlKDEpO1FnKCk7bmsuY3VycmVudD1mO0s9ZTtudWxsIT09WT9iPTA6KFI9bnVsbCxaPTAsYj1UKX1pZigwIT09Yil7Mj09PWImJihlPXhjKGEpLDAhPT1lJiYoZD1lLGI9T2soYSxlKSkpO2lmKDE9PT1iKXRocm93IGM9cWssTGsoYSwwKSxEayhhLGQpLEVrKGEsQigpKSxjO2lmKDY9PT1iKURrKGEsZCk7CmVsc2V7ZT1hLmN1cnJlbnQuYWx0ZXJuYXRlO2lmKDA9PT0oZCYzMCkmJiFQayhlKSYmKGI9SmsoYSxkKSwyPT09YiYmKGY9eGMoYSksMCE9PWYmJihkPWYsYj1PayhhLGYpKSksMT09PWIpKXRocm93IGM9cWssTGsoYSwwKSxEayhhLGQpLEVrKGEsQigpKSxjO2EuZmluaXNoZWRXb3JrPWU7YS5maW5pc2hlZExhbmVzPWQ7c3dpdGNoKGIpe2Nhc2UgMDpjYXNlIDE6dGhyb3cgRXJyb3IocCgzNDUpKTtjYXNlIDI6UWsoYSx1ayx2ayk7YnJlYWs7Y2FzZSAzOkRrKGEsZCk7aWYoKGQmMTMwMDIzNDI0KT09PWQmJihiPWdrKzUwMC1CKCksMTA8Yikpe2lmKDAhPT11YyhhLDApKWJyZWFrO2U9YS5zdXNwZW5kZWRMYW5lcztpZigoZSZkKSE9PWQpe0woKTthLnBpbmdlZExhbmVzfD1hLnN1c3BlbmRlZExhbmVzJmU7YnJlYWt9YS50aW1lb3V0SGFuZGxlPUZmKFFrLmJpbmQobnVsbCxhLHVrLHZrKSxiKTticmVha31RayhhLHVrLHZrKTticmVhaztjYXNlIDQ6RGsoYSxkKTtpZigoZCY0MTk0MjQwKT09PQpkKWJyZWFrO2I9YS5ldmVudFRpbWVzO2ZvcihlPS0xOzA8ZDspe3ZhciBnPTMxLW9jKGQpO2Y9MTw8ZztnPWJbZ107Zz5lJiYoZT1nKTtkJj1+Zn1kPWU7ZD1CKCktZDtkPSgxMjA+ZD8xMjA6NDgwPmQ/NDgwOjEwODA+ZD8xMDgwOjE5MjA+ZD8xOTIwOjNFMz5kPzNFMzo0MzIwPmQ/NDMyMDoxOTYwKm1rKGQvMTk2MCkpLWQ7aWYoMTA8ZCl7YS50aW1lb3V0SGFuZGxlPUZmKFFrLmJpbmQobnVsbCxhLHVrLHZrKSxkKTticmVha31RayhhLHVrLHZrKTticmVhaztjYXNlIDU6UWsoYSx1ayx2ayk7YnJlYWs7ZGVmYXVsdDp0aHJvdyBFcnJvcihwKDMyOSkpO319fUVrKGEsQigpKTtyZXR1cm4gYS5jYWxsYmFja05vZGU9PT1jP0hrLmJpbmQobnVsbCxhKTpudWxsfQpmdW5jdGlvbiBPayhhLGIpe3ZhciBjPXRrO2EuY3VycmVudC5tZW1vaXplZFN0YXRlLmlzRGVoeWRyYXRlZCYmKExrKGEsYikuZmxhZ3N8PTI1Nik7YT1KayhhLGIpOzIhPT1hJiYoYj11ayx1az1jLG51bGwhPT1iJiZHaihiKSk7cmV0dXJuIGF9ZnVuY3Rpb24gR2ooYSl7bnVsbD09PXVrP3VrPWE6dWsucHVzaC5hcHBseSh1ayxhKX0KZnVuY3Rpb24gUGsoYSl7Zm9yKHZhciBiPWE7Oyl7aWYoYi5mbGFncyYxNjM4NCl7dmFyIGM9Yi51cGRhdGVRdWV1ZTtpZihudWxsIT09YyYmKGM9Yy5zdG9yZXMsbnVsbCE9PWMpKWZvcih2YXIgZD0wO2Q8Yy5sZW5ndGg7ZCsrKXt2YXIgZT1jW2RdLGY9ZS5nZXRTbmFwc2hvdDtlPWUudmFsdWU7dHJ5e2lmKCFIZShmKCksZSkpcmV0dXJuITF9Y2F0Y2goZyl7cmV0dXJuITF9fX1jPWIuY2hpbGQ7aWYoYi5zdWJ0cmVlRmxhZ3MmMTYzODQmJm51bGwhPT1jKWMucmV0dXJuPWIsYj1jO2Vsc2V7aWYoYj09PWEpYnJlYWs7Zm9yKDtudWxsPT09Yi5zaWJsaW5nOyl7aWYobnVsbD09PWIucmV0dXJufHxiLnJldHVybj09PWEpcmV0dXJuITA7Yj1iLnJldHVybn1iLnNpYmxpbmcucmV0dXJuPWIucmV0dXJuO2I9Yi5zaWJsaW5nfX1yZXR1cm4hMH0KZnVuY3Rpb24gRGsoYSxiKXtiJj1+c2s7YiY9fnJrO2Euc3VzcGVuZGVkTGFuZXN8PWI7YS5waW5nZWRMYW5lcyY9fmI7Zm9yKGE9YS5leHBpcmF0aW9uVGltZXM7MDxiOyl7dmFyIGM9MzEtb2MoYiksZD0xPDxjO2FbY109LTE7YiY9fmR9fWZ1bmN0aW9uIEZrKGEpe2lmKDAhPT0oSyY2KSl0aHJvdyBFcnJvcihwKDMyNykpO0lrKCk7dmFyIGI9dWMoYSwwKTtpZigwPT09KGImMSkpcmV0dXJuIEVrKGEsQigpKSxudWxsO3ZhciBjPUprKGEsYik7aWYoMCE9PWEudGFnJiYyPT09Yyl7dmFyIGQ9eGMoYSk7MCE9PWQmJihiPWQsYz1PayhhLGQpKX1pZigxPT09Yyl0aHJvdyBjPXFrLExrKGEsMCksRGsoYSxiKSxFayhhLEIoKSksYztpZig2PT09Yyl0aHJvdyBFcnJvcihwKDM0NSkpO2EuZmluaXNoZWRXb3JrPWEuY3VycmVudC5hbHRlcm5hdGU7YS5maW5pc2hlZExhbmVzPWI7UWsoYSx1ayx2ayk7RWsoYSxCKCkpO3JldHVybiBudWxsfQpmdW5jdGlvbiBSayhhLGIpe3ZhciBjPUs7S3w9MTt0cnl7cmV0dXJuIGEoYil9ZmluYWxseXtLPWMsMD09PUsmJihIaj1CKCkrNTAwLGZnJiZqZygpKX19ZnVuY3Rpb24gU2soYSl7bnVsbCE9PXhrJiYwPT09eGsudGFnJiYwPT09KEsmNikmJklrKCk7dmFyIGI9SztLfD0xO3ZhciBjPXBrLnRyYW5zaXRpb24sZD1DO3RyeXtpZihway50cmFuc2l0aW9uPW51bGwsQz0xLGEpcmV0dXJuIGEoKX1maW5hbGx5e0M9ZCxway50cmFuc2l0aW9uPWMsSz1iLDA9PT0oSyY2KSYmamcoKX19ZnVuY3Rpb24gSWooKXtnaj1mai5jdXJyZW50O0UoZmopfQpmdW5jdGlvbiBMayhhLGIpe2EuZmluaXNoZWRXb3JrPW51bGw7YS5maW5pc2hlZExhbmVzPTA7dmFyIGM9YS50aW1lb3V0SGFuZGxlOy0xIT09YyYmKGEudGltZW91dEhhbmRsZT0tMSxHZihjKSk7aWYobnVsbCE9PVkpZm9yKGM9WS5yZXR1cm47bnVsbCE9PWM7KXt2YXIgZD1jO3dnKGQpO3N3aXRjaChkLnRhZyl7Y2FzZSAxOmQ9ZC50eXBlLmNoaWxkQ29udGV4dFR5cGVzO251bGwhPT1kJiZ2b2lkIDAhPT1kJiYkZigpO2JyZWFrO2Nhc2UgMzpKaCgpO0UoV2YpO0UoSCk7T2goKTticmVhaztjYXNlIDU6TGgoZCk7YnJlYWs7Y2FzZSA0OkpoKCk7YnJlYWs7Y2FzZSAxMzpFKE0pO2JyZWFrO2Nhc2UgMTk6RShNKTticmVhaztjYXNlIDEwOlJnKGQudHlwZS5fY29udGV4dCk7YnJlYWs7Y2FzZSAyMjpjYXNlIDIzOklqKCl9Yz1jLnJldHVybn1SPWE7WT1hPXdoKGEuY3VycmVudCxudWxsKTtaPWdqPWI7VD0wO3FrPW51bGw7c2s9cms9aGg9MDt1az10az1udWxsO2lmKG51bGwhPT1XZyl7Zm9yKGI9CjA7YjxXZy5sZW5ndGg7YisrKWlmKGM9V2dbYl0sZD1jLmludGVybGVhdmVkLG51bGwhPT1kKXtjLmludGVybGVhdmVkPW51bGw7dmFyIGU9ZC5uZXh0LGY9Yy5wZW5kaW5nO2lmKG51bGwhPT1mKXt2YXIgZz1mLm5leHQ7Zi5uZXh0PWU7ZC5uZXh0PWd9Yy5wZW5kaW5nPWR9V2c9bnVsbH1yZXR1cm4gYX0KZnVuY3Rpb24gTmsoYSxiKXtkb3t2YXIgYz1ZO3RyeXtRZygpO1BoLmN1cnJlbnQ9YWk7aWYoU2gpe2Zvcih2YXIgZD1OLm1lbW9pemVkU3RhdGU7bnVsbCE9PWQ7KXt2YXIgZT1kLnF1ZXVlO251bGwhPT1lJiYoZS5wZW5kaW5nPW51bGwpO2Q9ZC5uZXh0fVNoPSExfVJoPTA7UD1PPU49bnVsbDtUaD0hMTtVaD0wO29rLmN1cnJlbnQ9bnVsbDtpZihudWxsPT09Y3x8bnVsbD09PWMucmV0dXJuKXtUPTE7cWs9YjtZPW51bGw7YnJlYWt9YTp7dmFyIGY9YSxnPWMucmV0dXJuLGg9YyxrPWI7Yj1aO2guZmxhZ3N8PTMyNzY4O2lmKG51bGwhPT1rJiYib2JqZWN0Ij09PXR5cGVvZiBrJiYiZnVuY3Rpb24iPT09dHlwZW9mIGsudGhlbil7dmFyIGw9ayxtPWgscT1tLnRhZztpZigwPT09KG0ubW9kZSYxKSYmKDA9PT1xfHwxMT09PXF8fDE1PT09cSkpe3ZhciByPW0uYWx0ZXJuYXRlO3I/KG0udXBkYXRlUXVldWU9ci51cGRhdGVRdWV1ZSxtLm1lbW9pemVkU3RhdGU9ci5tZW1vaXplZFN0YXRlLAptLmxhbmVzPXIubGFuZXMpOihtLnVwZGF0ZVF1ZXVlPW51bGwsbS5tZW1vaXplZFN0YXRlPW51bGwpfXZhciB5PVZpKGcpO2lmKG51bGwhPT15KXt5LmZsYWdzJj0tMjU3O1dpKHksZyxoLGYsYik7eS5tb2RlJjEmJlRpKGYsbCxiKTtiPXk7az1sO3ZhciBuPWIudXBkYXRlUXVldWU7aWYobnVsbD09PW4pe3ZhciB0PW5ldyBTZXQ7dC5hZGQoayk7Yi51cGRhdGVRdWV1ZT10fWVsc2Ugbi5hZGQoayk7YnJlYWsgYX1lbHNle2lmKDA9PT0oYiYxKSl7VGkoZixsLGIpO3VqKCk7YnJlYWsgYX1rPUVycm9yKHAoNDI2KSl9fWVsc2UgaWYoSSYmaC5tb2RlJjEpe3ZhciBKPVZpKGcpO2lmKG51bGwhPT1KKXswPT09KEouZmxhZ3MmNjU1MzYpJiYoSi5mbGFnc3w9MjU2KTtXaShKLGcsaCxmLGIpO0pnKEtpKGssaCkpO2JyZWFrIGF9fWY9az1LaShrLGgpOzQhPT1UJiYoVD0yKTtudWxsPT09dGs/dGs9W2ZdOnRrLnB1c2goZik7Zj1nO2Rve3N3aXRjaChmLnRhZyl7Y2FzZSAzOmYuZmxhZ3N8PTY1NTM2OwpiJj0tYjtmLmxhbmVzfD1iO3ZhciB4PU9pKGYsayxiKTtmaChmLHgpO2JyZWFrIGE7Y2FzZSAxOmg9azt2YXIgdz1mLnR5cGUsdT1mLnN0YXRlTm9kZTtpZigwPT09KGYuZmxhZ3MmMTI4KSYmKCJmdW5jdGlvbiI9PT10eXBlb2Ygdy5nZXREZXJpdmVkU3RhdGVGcm9tRXJyb3J8fG51bGwhPT11JiYiZnVuY3Rpb24iPT09dHlwZW9mIHUuY29tcG9uZW50RGlkQ2F0Y2gmJihudWxsPT09U2l8fCFTaS5oYXModSkpKSl7Zi5mbGFnc3w9NjU1MzY7YiY9LWI7Zi5sYW5lc3w9Yjt2YXIgRj1SaShmLGgsYik7ZmgoZixGKTticmVhayBhfX1mPWYucmV0dXJufXdoaWxlKG51bGwhPT1mKX1UayhjKX1jYXRjaChuYSl7Yj1uYTtZPT09YyYmbnVsbCE9PWMmJihZPWM9Yy5yZXR1cm4pO2NvbnRpbnVlfWJyZWFrfXdoaWxlKDEpfWZ1bmN0aW9uIEtrKCl7dmFyIGE9bmsuY3VycmVudDtuay5jdXJyZW50PWFpO3JldHVybiBudWxsPT09YT9haTphfQpmdW5jdGlvbiB1aigpe2lmKDA9PT1UfHwzPT09VHx8Mj09PVQpVD00O251bGw9PT1SfHwwPT09KGhoJjI2ODQzNTQ1NSkmJjA9PT0ocmsmMjY4NDM1NDU1KXx8RGsoUixaKX1mdW5jdGlvbiBKayhhLGIpe3ZhciBjPUs7S3w9Mjt2YXIgZD1LaygpO2lmKFIhPT1hfHxaIT09Yil2az1udWxsLExrKGEsYik7ZG8gdHJ5e1VrKCk7YnJlYWt9Y2F0Y2goZSl7TmsoYSxlKX13aGlsZSgxKTtRZygpO0s9Yztuay5jdXJyZW50PWQ7aWYobnVsbCE9PVkpdGhyb3cgRXJyb3IocCgyNjEpKTtSPW51bGw7Wj0wO3JldHVybiBUfWZ1bmN0aW9uIFVrKCl7Zm9yKDtudWxsIT09WTspVmsoWSl9ZnVuY3Rpb24gTWsoKXtmb3IoO251bGwhPT1ZJiYhY2MoKTspVmsoWSl9ZnVuY3Rpb24gVmsoYSl7dmFyIGI9V2soYS5hbHRlcm5hdGUsYSxnaik7YS5tZW1vaXplZFByb3BzPWEucGVuZGluZ1Byb3BzO251bGw9PT1iP1RrKGEpOlk9Yjtvay5jdXJyZW50PW51bGx9CmZ1bmN0aW9uIFRrKGEpe3ZhciBiPWE7ZG97dmFyIGM9Yi5hbHRlcm5hdGU7YT1iLnJldHVybjtpZigwPT09KGIuZmxhZ3MmMzI3NjgpKXtpZihjPUZqKGMsYixnaiksbnVsbCE9PWMpe1k9YztyZXR1cm59fWVsc2V7Yz1KaihjLGIpO2lmKG51bGwhPT1jKXtjLmZsYWdzJj0zMjc2NztZPWM7cmV0dXJufWlmKG51bGwhPT1hKWEuZmxhZ3N8PTMyNzY4LGEuc3VidHJlZUZsYWdzPTAsYS5kZWxldGlvbnM9bnVsbDtlbHNle1Q9NjtZPW51bGw7cmV0dXJufX1iPWIuc2libGluZztpZihudWxsIT09Yil7WT1iO3JldHVybn1ZPWI9YX13aGlsZShudWxsIT09Yik7MD09PVQmJihUPTUpfWZ1bmN0aW9uIFFrKGEsYixjKXt2YXIgZD1DLGU9cGsudHJhbnNpdGlvbjt0cnl7cGsudHJhbnNpdGlvbj1udWxsLEM9MSxYayhhLGIsYyxkKX1maW5hbGx5e3BrLnRyYW5zaXRpb249ZSxDPWR9cmV0dXJuIG51bGx9CmZ1bmN0aW9uIFhrKGEsYixjLGQpe2RvIElrKCk7d2hpbGUobnVsbCE9PXhrKTtpZigwIT09KEsmNikpdGhyb3cgRXJyb3IocCgzMjcpKTtjPWEuZmluaXNoZWRXb3JrO3ZhciBlPWEuZmluaXNoZWRMYW5lcztpZihudWxsPT09YylyZXR1cm4gbnVsbDthLmZpbmlzaGVkV29yaz1udWxsO2EuZmluaXNoZWRMYW5lcz0wO2lmKGM9PT1hLmN1cnJlbnQpdGhyb3cgRXJyb3IocCgxNzcpKTthLmNhbGxiYWNrTm9kZT1udWxsO2EuY2FsbGJhY2tQcmlvcml0eT0wO3ZhciBmPWMubGFuZXN8Yy5jaGlsZExhbmVzO0JjKGEsZik7YT09PVImJihZPVI9bnVsbCxaPTApOzA9PT0oYy5zdWJ0cmVlRmxhZ3MmMjA2NCkmJjA9PT0oYy5mbGFncyYyMDY0KXx8d2t8fCh3az0hMCxHayhoYyxmdW5jdGlvbigpe0lrKCk7cmV0dXJuIG51bGx9KSk7Zj0wIT09KGMuZmxhZ3MmMTU5OTApO2lmKDAhPT0oYy5zdWJ0cmVlRmxhZ3MmMTU5OTApfHxmKXtmPXBrLnRyYW5zaXRpb247cGsudHJhbnNpdGlvbj1udWxsOwp2YXIgZz1DO0M9MTt2YXIgaD1LO0t8PTQ7b2suY3VycmVudD1udWxsO1BqKGEsYyk7ZWsoYyxhKTtPZShEZik7ZGQ9ISFDZjtEZj1DZj1udWxsO2EuY3VycmVudD1jO2lrKGMsYSxlKTtkYygpO0s9aDtDPWc7cGsudHJhbnNpdGlvbj1mfWVsc2UgYS5jdXJyZW50PWM7d2smJih3az0hMSx4az1hLHlrPWUpO2Y9YS5wZW5kaW5nTGFuZXM7MD09PWYmJihTaT1udWxsKTttYyhjLnN0YXRlTm9kZSxkKTtFayhhLEIoKSk7aWYobnVsbCE9PWIpZm9yKGQ9YS5vblJlY292ZXJhYmxlRXJyb3IsYz0wO2M8Yi5sZW5ndGg7YysrKWU9YltjXSxkKGUudmFsdWUse2NvbXBvbmVudFN0YWNrOmUuc3RhY2ssZGlnZXN0OmUuZGlnZXN0fSk7aWYoUGkpdGhyb3cgUGk9ITEsYT1RaSxRaT1udWxsLGE7MCE9PSh5ayYxKSYmMCE9PWEudGFnJiZJaygpO2Y9YS5wZW5kaW5nTGFuZXM7MCE9PShmJjEpP2E9PT1Baz96aysrOih6az0wLEFrPWEpOnprPTA7amcoKTtyZXR1cm4gbnVsbH0KZnVuY3Rpb24gSWsoKXtpZihudWxsIT09eGspe3ZhciBhPURjKHlrKSxiPXBrLnRyYW5zaXRpb24sYz1DO3RyeXtway50cmFuc2l0aW9uPW51bGw7Qz0xNj5hPzE2OmE7aWYobnVsbD09PXhrKXZhciBkPSExO2Vsc2V7YT14azt4az1udWxsO3lrPTA7aWYoMCE9PShLJjYpKXRocm93IEVycm9yKHAoMzMxKSk7dmFyIGU9SztLfD00O2ZvcihWPWEuY3VycmVudDtudWxsIT09Vjspe3ZhciBmPVYsZz1mLmNoaWxkO2lmKDAhPT0oVi5mbGFncyYxNikpe3ZhciBoPWYuZGVsZXRpb25zO2lmKG51bGwhPT1oKXtmb3IodmFyIGs9MDtrPGgubGVuZ3RoO2srKyl7dmFyIGw9aFtrXTtmb3IoVj1sO251bGwhPT1WOyl7dmFyIG09Vjtzd2l0Y2gobS50YWcpe2Nhc2UgMDpjYXNlIDExOmNhc2UgMTU6UWooOCxtLGYpfXZhciBxPW0uY2hpbGQ7aWYobnVsbCE9PXEpcS5yZXR1cm49bSxWPXE7ZWxzZSBmb3IoO251bGwhPT1WOyl7bT1WO3ZhciByPW0uc2libGluZyx5PW0ucmV0dXJuO1RqKG0pO2lmKG09PT0KbCl7Vj1udWxsO2JyZWFrfWlmKG51bGwhPT1yKXtyLnJldHVybj15O1Y9cjticmVha31WPXl9fX12YXIgbj1mLmFsdGVybmF0ZTtpZihudWxsIT09bil7dmFyIHQ9bi5jaGlsZDtpZihudWxsIT09dCl7bi5jaGlsZD1udWxsO2Rve3ZhciBKPXQuc2libGluZzt0LnNpYmxpbmc9bnVsbDt0PUp9d2hpbGUobnVsbCE9PXQpfX1WPWZ9fWlmKDAhPT0oZi5zdWJ0cmVlRmxhZ3MmMjA2NCkmJm51bGwhPT1nKWcucmV0dXJuPWYsVj1nO2Vsc2UgYjpmb3IoO251bGwhPT1WOyl7Zj1WO2lmKDAhPT0oZi5mbGFncyYyMDQ4KSlzd2l0Y2goZi50YWcpe2Nhc2UgMDpjYXNlIDExOmNhc2UgMTU6UWooOSxmLGYucmV0dXJuKX12YXIgeD1mLnNpYmxpbmc7aWYobnVsbCE9PXgpe3gucmV0dXJuPWYucmV0dXJuO1Y9eDticmVhayBifVY9Zi5yZXR1cm59fXZhciB3PWEuY3VycmVudDtmb3IoVj13O251bGwhPT1WOyl7Zz1WO3ZhciB1PWcuY2hpbGQ7aWYoMCE9PShnLnN1YnRyZWVGbGFncyYyMDY0KSYmbnVsbCE9PQp1KXUucmV0dXJuPWcsVj11O2Vsc2UgYjpmb3IoZz13O251bGwhPT1WOyl7aD1WO2lmKDAhPT0oaC5mbGFncyYyMDQ4KSl0cnl7c3dpdGNoKGgudGFnKXtjYXNlIDA6Y2FzZSAxMTpjYXNlIDE1OlJqKDksaCl9fWNhdGNoKG5hKXtXKGgsaC5yZXR1cm4sbmEpfWlmKGg9PT1nKXtWPW51bGw7YnJlYWsgYn12YXIgRj1oLnNpYmxpbmc7aWYobnVsbCE9PUYpe0YucmV0dXJuPWgucmV0dXJuO1Y9RjticmVhayBifVY9aC5yZXR1cm59fUs9ZTtqZygpO2lmKGxjJiYiZnVuY3Rpb24iPT09dHlwZW9mIGxjLm9uUG9zdENvbW1pdEZpYmVyUm9vdCl0cnl7bGMub25Qb3N0Q29tbWl0RmliZXJSb290KGtjLGEpfWNhdGNoKG5hKXt9ZD0hMH1yZXR1cm4gZH1maW5hbGx5e0M9Yyxway50cmFuc2l0aW9uPWJ9fXJldHVybiExfWZ1bmN0aW9uIFlrKGEsYixjKXtiPUtpKGMsYik7Yj1PaShhLGIsMSk7YT1kaChhLGIsMSk7Yj1MKCk7bnVsbCE9PWEmJihBYyhhLDEsYiksRWsoYSxiKSl9CmZ1bmN0aW9uIFcoYSxiLGMpe2lmKDM9PT1hLnRhZylZayhhLGEsYyk7ZWxzZSBmb3IoO251bGwhPT1iOyl7aWYoMz09PWIudGFnKXtZayhiLGEsYyk7YnJlYWt9ZWxzZSBpZigxPT09Yi50YWcpe3ZhciBkPWIuc3RhdGVOb2RlO2lmKCJmdW5jdGlvbiI9PT10eXBlb2YgYi50eXBlLmdldERlcml2ZWRTdGF0ZUZyb21FcnJvcnx8ImZ1bmN0aW9uIj09PXR5cGVvZiBkLmNvbXBvbmVudERpZENhdGNoJiYobnVsbD09PVNpfHwhU2kuaGFzKGQpKSl7YT1LaShjLGEpO2E9UmkoYixhLDEpO2I9ZGgoYixhLDEpO2E9TCgpO251bGwhPT1iJiYoQWMoYiwxLGEpLEVrKGIsYSkpO2JyZWFrfX1iPWIucmV0dXJufX0KZnVuY3Rpb24gVWkoYSxiLGMpe3ZhciBkPWEucGluZ0NhY2hlO251bGwhPT1kJiZkLmRlbGV0ZShiKTtiPUwoKTthLnBpbmdlZExhbmVzfD1hLnN1c3BlbmRlZExhbmVzJmM7Uj09PWEmJihaJmMpPT09YyYmKDQ9PT1UfHwzPT09VCYmKFomMTMwMDIzNDI0KT09PVomJjUwMD5CKCktZ2s/TGsoYSwwKTpza3w9Yyk7RWsoYSxiKX1mdW5jdGlvbiBaayhhLGIpezA9PT1iJiYoMD09PShhLm1vZGUmMSk/Yj0xOihiPXNjLHNjPDw9MSwwPT09KHNjJjEzMDAyMzQyNCkmJihzYz00MTk0MzA0KSkpO3ZhciBjPUwoKTthPVpnKGEsYik7bnVsbCE9PWEmJihBYyhhLGIsYyksRWsoYSxjKSl9ZnVuY3Rpb24gdmooYSl7dmFyIGI9YS5tZW1vaXplZFN0YXRlLGM9MDtudWxsIT09YiYmKGM9Yi5yZXRyeUxhbmUpO1prKGEsYyl9CmZ1bmN0aW9uIGNrKGEsYil7dmFyIGM9MDtzd2l0Y2goYS50YWcpe2Nhc2UgMTM6dmFyIGQ9YS5zdGF0ZU5vZGU7dmFyIGU9YS5tZW1vaXplZFN0YXRlO251bGwhPT1lJiYoYz1lLnJldHJ5TGFuZSk7YnJlYWs7Y2FzZSAxOTpkPWEuc3RhdGVOb2RlO2JyZWFrO2RlZmF1bHQ6dGhyb3cgRXJyb3IocCgzMTQpKTt9bnVsbCE9PWQmJmQuZGVsZXRlKGIpO1prKGEsYyl9dmFyIFdrOwpXaz1mdW5jdGlvbihhLGIsYyl7aWYobnVsbCE9PWEpaWYoYS5tZW1vaXplZFByb3BzIT09Yi5wZW5kaW5nUHJvcHN8fFdmLmN1cnJlbnQpVWc9ITA7ZWxzZXtpZigwPT09KGEubGFuZXMmYykmJjA9PT0oYi5mbGFncyYxMjgpKXJldHVybiBVZz0hMSx6aihhLGIsYyk7VWc9MCE9PShhLmZsYWdzJjEzMTA3Mik/ITA6ITF9ZWxzZSBVZz0hMSxJJiYwIT09KGIuZmxhZ3MmMTA0ODU3NikmJnVnKGIsbmcsYi5pbmRleCk7Yi5sYW5lcz0wO3N3aXRjaChiLnRhZyl7Y2FzZSAyOnZhciBkPWIudHlwZTtqaihhLGIpO2E9Yi5wZW5kaW5nUHJvcHM7dmFyIGU9WWYoYixILmN1cnJlbnQpO1RnKGIsYyk7ZT1YaChudWxsLGIsZCxhLGUsYyk7dmFyIGY9YmkoKTtiLmZsYWdzfD0xOyJvYmplY3QiPT09dHlwZW9mIGUmJm51bGwhPT1lJiYiZnVuY3Rpb24iPT09dHlwZW9mIGUucmVuZGVyJiZ2b2lkIDA9PT1lLiQkdHlwZW9mPyhiLnRhZz0xLGIubWVtb2l6ZWRTdGF0ZT1udWxsLGIudXBkYXRlUXVldWU9Cm51bGwsWmYoZCk/KGY9ITAsY2coYikpOmY9ITEsYi5tZW1vaXplZFN0YXRlPW51bGwhPT1lLnN0YXRlJiZ2b2lkIDAhPT1lLnN0YXRlP2Uuc3RhdGU6bnVsbCxhaChiKSxlLnVwZGF0ZXI9bmgsYi5zdGF0ZU5vZGU9ZSxlLl9yZWFjdEludGVybmFscz1iLHJoKGIsZCxhLGMpLGI9a2oobnVsbCxiLGQsITAsZixjKSk6KGIudGFnPTAsSSYmZiYmdmcoYiksWWkobnVsbCxiLGUsYyksYj1iLmNoaWxkKTtyZXR1cm4gYjtjYXNlIDE2OmQ9Yi5lbGVtZW50VHlwZTthOntqaihhLGIpO2E9Yi5wZW5kaW5nUHJvcHM7ZT1kLl9pbml0O2Q9ZShkLl9wYXlsb2FkKTtiLnR5cGU9ZDtlPWIudGFnPSRrKGQpO2E9TGcoZCxhKTtzd2l0Y2goZSl7Y2FzZSAwOmI9ZGoobnVsbCxiLGQsYSxjKTticmVhayBhO2Nhc2UgMTpiPWlqKG51bGwsYixkLGEsYyk7YnJlYWsgYTtjYXNlIDExOmI9WmkobnVsbCxiLGQsYSxjKTticmVhayBhO2Nhc2UgMTQ6Yj1haihudWxsLGIsZCxMZyhkLnR5cGUsYSksYyk7YnJlYWsgYX10aHJvdyBFcnJvcihwKDMwNiwKZCwiIikpO31yZXR1cm4gYjtjYXNlIDA6cmV0dXJuIGQ9Yi50eXBlLGU9Yi5wZW5kaW5nUHJvcHMsZT1iLmVsZW1lbnRUeXBlPT09ZD9lOkxnKGQsZSksZGooYSxiLGQsZSxjKTtjYXNlIDE6cmV0dXJuIGQ9Yi50eXBlLGU9Yi5wZW5kaW5nUHJvcHMsZT1iLmVsZW1lbnRUeXBlPT09ZD9lOkxnKGQsZSksaWooYSxiLGQsZSxjKTtjYXNlIDM6YTp7bGooYik7aWYobnVsbD09PWEpdGhyb3cgRXJyb3IocCgzODcpKTtkPWIucGVuZGluZ1Byb3BzO2Y9Yi5tZW1vaXplZFN0YXRlO2U9Zi5lbGVtZW50O2JoKGEsYik7Z2goYixkLG51bGwsYyk7dmFyIGc9Yi5tZW1vaXplZFN0YXRlO2Q9Zy5lbGVtZW50O2lmKGYuaXNEZWh5ZHJhdGVkKWlmKGY9e2VsZW1lbnQ6ZCxpc0RlaHlkcmF0ZWQ6ITEsY2FjaGU6Zy5jYWNoZSxwZW5kaW5nU3VzcGVuc2VCb3VuZGFyaWVzOmcucGVuZGluZ1N1c3BlbnNlQm91bmRhcmllcyx0cmFuc2l0aW9uczpnLnRyYW5zaXRpb25zfSxiLnVwZGF0ZVF1ZXVlLmJhc2VTdGF0ZT0KZixiLm1lbW9pemVkU3RhdGU9ZixiLmZsYWdzJjI1Nil7ZT1LaShFcnJvcihwKDQyMykpLGIpO2I9bWooYSxiLGQsYyxlKTticmVhayBhfWVsc2UgaWYoZCE9PWUpe2U9S2koRXJyb3IocCg0MjQpKSxiKTtiPW1qKGEsYixkLGMsZSk7YnJlYWsgYX1lbHNlIGZvcih5Zz1MZihiLnN0YXRlTm9kZS5jb250YWluZXJJbmZvLmZpcnN0Q2hpbGQpLHhnPWIsST0hMCx6Zz1udWxsLGM9Q2goYixudWxsLGQsYyksYi5jaGlsZD1jO2M7KWMuZmxhZ3M9Yy5mbGFncyYtM3w0MDk2LGM9Yy5zaWJsaW5nO2Vsc2V7SWcoKTtpZihkPT09ZSl7Yj0kaShhLGIsYyk7YnJlYWsgYX1ZaShhLGIsZCxjKX1iPWIuY2hpbGR9cmV0dXJuIGI7Y2FzZSA1OnJldHVybiBLaChiKSxudWxsPT09YSYmRWcoYiksZD1iLnR5cGUsZT1iLnBlbmRpbmdQcm9wcyxmPW51bGwhPT1hP2EubWVtb2l6ZWRQcm9wczpudWxsLGc9ZS5jaGlsZHJlbixFZihkLGUpP2c9bnVsbDpudWxsIT09ZiYmRWYoZCxmKSYmKGIuZmxhZ3N8PTMyKSwKaGooYSxiKSxZaShhLGIsZyxjKSxiLmNoaWxkO2Nhc2UgNjpyZXR1cm4gbnVsbD09PWEmJkVnKGIpLG51bGw7Y2FzZSAxMzpyZXR1cm4gcGooYSxiLGMpO2Nhc2UgNDpyZXR1cm4gSWgoYixiLnN0YXRlTm9kZS5jb250YWluZXJJbmZvKSxkPWIucGVuZGluZ1Byb3BzLG51bGw9PT1hP2IuY2hpbGQ9QmgoYixudWxsLGQsYyk6WWkoYSxiLGQsYyksYi5jaGlsZDtjYXNlIDExOnJldHVybiBkPWIudHlwZSxlPWIucGVuZGluZ1Byb3BzLGU9Yi5lbGVtZW50VHlwZT09PWQ/ZTpMZyhkLGUpLFppKGEsYixkLGUsYyk7Y2FzZSA3OnJldHVybiBZaShhLGIsYi5wZW5kaW5nUHJvcHMsYyksYi5jaGlsZDtjYXNlIDg6cmV0dXJuIFlpKGEsYixiLnBlbmRpbmdQcm9wcy5jaGlsZHJlbixjKSxiLmNoaWxkO2Nhc2UgMTI6cmV0dXJuIFlpKGEsYixiLnBlbmRpbmdQcm9wcy5jaGlsZHJlbixjKSxiLmNoaWxkO2Nhc2UgMTA6YTp7ZD1iLnR5cGUuX2NvbnRleHQ7ZT1iLnBlbmRpbmdQcm9wcztmPWIubWVtb2l6ZWRQcm9wczsKZz1lLnZhbHVlO0coTWcsZC5fY3VycmVudFZhbHVlKTtkLl9jdXJyZW50VmFsdWU9ZztpZihudWxsIT09ZilpZihIZShmLnZhbHVlLGcpKXtpZihmLmNoaWxkcmVuPT09ZS5jaGlsZHJlbiYmIVdmLmN1cnJlbnQpe2I9JGkoYSxiLGMpO2JyZWFrIGF9fWVsc2UgZm9yKGY9Yi5jaGlsZCxudWxsIT09ZiYmKGYucmV0dXJuPWIpO251bGwhPT1mOyl7dmFyIGg9Zi5kZXBlbmRlbmNpZXM7aWYobnVsbCE9PWgpe2c9Zi5jaGlsZDtmb3IodmFyIGs9aC5maXJzdENvbnRleHQ7bnVsbCE9PWs7KXtpZihrLmNvbnRleHQ9PT1kKXtpZigxPT09Zi50YWcpe2s9Y2goLTEsYyYtYyk7ay50YWc9Mjt2YXIgbD1mLnVwZGF0ZVF1ZXVlO2lmKG51bGwhPT1sKXtsPWwuc2hhcmVkO3ZhciBtPWwucGVuZGluZztudWxsPT09bT9rLm5leHQ9azooay5uZXh0PW0ubmV4dCxtLm5leHQ9ayk7bC5wZW5kaW5nPWt9fWYubGFuZXN8PWM7az1mLmFsdGVybmF0ZTtudWxsIT09ayYmKGsubGFuZXN8PWMpO1NnKGYucmV0dXJuLApjLGIpO2gubGFuZXN8PWM7YnJlYWt9az1rLm5leHR9fWVsc2UgaWYoMTA9PT1mLnRhZylnPWYudHlwZT09PWIudHlwZT9udWxsOmYuY2hpbGQ7ZWxzZSBpZigxOD09PWYudGFnKXtnPWYucmV0dXJuO2lmKG51bGw9PT1nKXRocm93IEVycm9yKHAoMzQxKSk7Zy5sYW5lc3w9YztoPWcuYWx0ZXJuYXRlO251bGwhPT1oJiYoaC5sYW5lc3w9Yyk7U2coZyxjLGIpO2c9Zi5zaWJsaW5nfWVsc2UgZz1mLmNoaWxkO2lmKG51bGwhPT1nKWcucmV0dXJuPWY7ZWxzZSBmb3IoZz1mO251bGwhPT1nOyl7aWYoZz09PWIpe2c9bnVsbDticmVha31mPWcuc2libGluZztpZihudWxsIT09Zil7Zi5yZXR1cm49Zy5yZXR1cm47Zz1mO2JyZWFrfWc9Zy5yZXR1cm59Zj1nfVlpKGEsYixlLmNoaWxkcmVuLGMpO2I9Yi5jaGlsZH1yZXR1cm4gYjtjYXNlIDk6cmV0dXJuIGU9Yi50eXBlLGQ9Yi5wZW5kaW5nUHJvcHMuY2hpbGRyZW4sVGcoYixjKSxlPVZnKGUpLGQ9ZChlKSxiLmZsYWdzfD0xLFlpKGEsYixkLGMpLApiLmNoaWxkO2Nhc2UgMTQ6cmV0dXJuIGQ9Yi50eXBlLGU9TGcoZCxiLnBlbmRpbmdQcm9wcyksZT1MZyhkLnR5cGUsZSksYWooYSxiLGQsZSxjKTtjYXNlIDE1OnJldHVybiBjaihhLGIsYi50eXBlLGIucGVuZGluZ1Byb3BzLGMpO2Nhc2UgMTc6cmV0dXJuIGQ9Yi50eXBlLGU9Yi5wZW5kaW5nUHJvcHMsZT1iLmVsZW1lbnRUeXBlPT09ZD9lOkxnKGQsZSksamooYSxiKSxiLnRhZz0xLFpmKGQpPyhhPSEwLGNnKGIpKTphPSExLFRnKGIsYykscGgoYixkLGUpLHJoKGIsZCxlLGMpLGtqKG51bGwsYixkLCEwLGEsYyk7Y2FzZSAxOTpyZXR1cm4geWooYSxiLGMpO2Nhc2UgMjI6cmV0dXJuIGVqKGEsYixjKX10aHJvdyBFcnJvcihwKDE1NixiLnRhZykpO307ZnVuY3Rpb24gR2soYSxiKXtyZXR1cm4gYWMoYSxiKX0KZnVuY3Rpb24gYWwoYSxiLGMsZCl7dGhpcy50YWc9YTt0aGlzLmtleT1jO3RoaXMuc2libGluZz10aGlzLmNoaWxkPXRoaXMucmV0dXJuPXRoaXMuc3RhdGVOb2RlPXRoaXMudHlwZT10aGlzLmVsZW1lbnRUeXBlPW51bGw7dGhpcy5pbmRleD0wO3RoaXMucmVmPW51bGw7dGhpcy5wZW5kaW5nUHJvcHM9Yjt0aGlzLmRlcGVuZGVuY2llcz10aGlzLm1lbW9pemVkU3RhdGU9dGhpcy51cGRhdGVRdWV1ZT10aGlzLm1lbW9pemVkUHJvcHM9bnVsbDt0aGlzLm1vZGU9ZDt0aGlzLnN1YnRyZWVGbGFncz10aGlzLmZsYWdzPTA7dGhpcy5kZWxldGlvbnM9bnVsbDt0aGlzLmNoaWxkTGFuZXM9dGhpcy5sYW5lcz0wO3RoaXMuYWx0ZXJuYXRlPW51bGx9ZnVuY3Rpb24gQmcoYSxiLGMsZCl7cmV0dXJuIG5ldyBhbChhLGIsYyxkKX1mdW5jdGlvbiBiaihhKXthPWEucHJvdG90eXBlO3JldHVybiEoIWF8fCFhLmlzUmVhY3RDb21wb25lbnQpfQpmdW5jdGlvbiAkayhhKXtpZigiZnVuY3Rpb24iPT09dHlwZW9mIGEpcmV0dXJuIGJqKGEpPzE6MDtpZih2b2lkIDAhPT1hJiZudWxsIT09YSl7YT1hLiQkdHlwZW9mO2lmKGE9PT1EYSlyZXR1cm4gMTE7aWYoYT09PUdhKXJldHVybiAxNH1yZXR1cm4gMn0KZnVuY3Rpb24gd2goYSxiKXt2YXIgYz1hLmFsdGVybmF0ZTtudWxsPT09Yz8oYz1CZyhhLnRhZyxiLGEua2V5LGEubW9kZSksYy5lbGVtZW50VHlwZT1hLmVsZW1lbnRUeXBlLGMudHlwZT1hLnR5cGUsYy5zdGF0ZU5vZGU9YS5zdGF0ZU5vZGUsYy5hbHRlcm5hdGU9YSxhLmFsdGVybmF0ZT1jKTooYy5wZW5kaW5nUHJvcHM9YixjLnR5cGU9YS50eXBlLGMuZmxhZ3M9MCxjLnN1YnRyZWVGbGFncz0wLGMuZGVsZXRpb25zPW51bGwpO2MuZmxhZ3M9YS5mbGFncyYxNDY4MDA2NDtjLmNoaWxkTGFuZXM9YS5jaGlsZExhbmVzO2MubGFuZXM9YS5sYW5lcztjLmNoaWxkPWEuY2hpbGQ7Yy5tZW1vaXplZFByb3BzPWEubWVtb2l6ZWRQcm9wcztjLm1lbW9pemVkU3RhdGU9YS5tZW1vaXplZFN0YXRlO2MudXBkYXRlUXVldWU9YS51cGRhdGVRdWV1ZTtiPWEuZGVwZW5kZW5jaWVzO2MuZGVwZW5kZW5jaWVzPW51bGw9PT1iP251bGw6e2xhbmVzOmIubGFuZXMsZmlyc3RDb250ZXh0OmIuZmlyc3RDb250ZXh0fTsKYy5zaWJsaW5nPWEuc2libGluZztjLmluZGV4PWEuaW5kZXg7Yy5yZWY9YS5yZWY7cmV0dXJuIGN9CmZ1bmN0aW9uIHloKGEsYixjLGQsZSxmKXt2YXIgZz0yO2Q9YTtpZigiZnVuY3Rpb24iPT09dHlwZW9mIGEpYmooYSkmJihnPTEpO2Vsc2UgaWYoInN0cmluZyI9PT10eXBlb2YgYSlnPTU7ZWxzZSBhOnN3aXRjaChhKXtjYXNlIHlhOnJldHVybiBBaChjLmNoaWxkcmVuLGUsZixiKTtjYXNlIHphOmc9ODtlfD04O2JyZWFrO2Nhc2UgQWE6cmV0dXJuIGE9QmcoMTIsYyxiLGV8MiksYS5lbGVtZW50VHlwZT1BYSxhLmxhbmVzPWYsYTtjYXNlIEVhOnJldHVybiBhPUJnKDEzLGMsYixlKSxhLmVsZW1lbnRUeXBlPUVhLGEubGFuZXM9ZixhO2Nhc2UgRmE6cmV0dXJuIGE9QmcoMTksYyxiLGUpLGEuZWxlbWVudFR5cGU9RmEsYS5sYW5lcz1mLGE7Y2FzZSBJYTpyZXR1cm4gcWooYyxlLGYsYik7ZGVmYXVsdDppZigib2JqZWN0Ij09PXR5cGVvZiBhJiZudWxsIT09YSlzd2l0Y2goYS4kJHR5cGVvZil7Y2FzZSBCYTpnPTEwO2JyZWFrIGE7Y2FzZSBDYTpnPTk7YnJlYWsgYTtjYXNlIERhOmc9MTE7CmJyZWFrIGE7Y2FzZSBHYTpnPTE0O2JyZWFrIGE7Y2FzZSBIYTpnPTE2O2Q9bnVsbDticmVhayBhfXRocm93IEVycm9yKHAoMTMwLG51bGw9PWE/YTp0eXBlb2YgYSwiIikpO31iPUJnKGcsYyxiLGUpO2IuZWxlbWVudFR5cGU9YTtiLnR5cGU9ZDtiLmxhbmVzPWY7cmV0dXJuIGJ9ZnVuY3Rpb24gQWgoYSxiLGMsZCl7YT1CZyg3LGEsZCxiKTthLmxhbmVzPWM7cmV0dXJuIGF9ZnVuY3Rpb24gcWooYSxiLGMsZCl7YT1CZygyMixhLGQsYik7YS5lbGVtZW50VHlwZT1JYTthLmxhbmVzPWM7YS5zdGF0ZU5vZGU9e2lzSGlkZGVuOiExfTtyZXR1cm4gYX1mdW5jdGlvbiB4aChhLGIsYyl7YT1CZyg2LGEsbnVsbCxiKTthLmxhbmVzPWM7cmV0dXJuIGF9CmZ1bmN0aW9uIHpoKGEsYixjKXtiPUJnKDQsbnVsbCE9PWEuY2hpbGRyZW4/YS5jaGlsZHJlbjpbXSxhLmtleSxiKTtiLmxhbmVzPWM7Yi5zdGF0ZU5vZGU9e2NvbnRhaW5lckluZm86YS5jb250YWluZXJJbmZvLHBlbmRpbmdDaGlsZHJlbjpudWxsLGltcGxlbWVudGF0aW9uOmEuaW1wbGVtZW50YXRpb259O3JldHVybiBifQpmdW5jdGlvbiBibChhLGIsYyxkLGUpe3RoaXMudGFnPWI7dGhpcy5jb250YWluZXJJbmZvPWE7dGhpcy5maW5pc2hlZFdvcms9dGhpcy5waW5nQ2FjaGU9dGhpcy5jdXJyZW50PXRoaXMucGVuZGluZ0NoaWxkcmVuPW51bGw7dGhpcy50aW1lb3V0SGFuZGxlPS0xO3RoaXMuY2FsbGJhY2tOb2RlPXRoaXMucGVuZGluZ0NvbnRleHQ9dGhpcy5jb250ZXh0PW51bGw7dGhpcy5jYWxsYmFja1ByaW9yaXR5PTA7dGhpcy5ldmVudFRpbWVzPXpjKDApO3RoaXMuZXhwaXJhdGlvblRpbWVzPXpjKC0xKTt0aGlzLmVudGFuZ2xlZExhbmVzPXRoaXMuZmluaXNoZWRMYW5lcz10aGlzLm11dGFibGVSZWFkTGFuZXM9dGhpcy5leHBpcmVkTGFuZXM9dGhpcy5waW5nZWRMYW5lcz10aGlzLnN1c3BlbmRlZExhbmVzPXRoaXMucGVuZGluZ0xhbmVzPTA7dGhpcy5lbnRhbmdsZW1lbnRzPXpjKDApO3RoaXMuaWRlbnRpZmllclByZWZpeD1kO3RoaXMub25SZWNvdmVyYWJsZUVycm9yPWU7dGhpcy5tdXRhYmxlU291cmNlRWFnZXJIeWRyYXRpb25EYXRhPQpudWxsfWZ1bmN0aW9uIGNsKGEsYixjLGQsZSxmLGcsaCxrKXthPW5ldyBibChhLGIsYyxoLGspOzE9PT1iPyhiPTEsITA9PT1mJiYoYnw9OCkpOmI9MDtmPUJnKDMsbnVsbCxudWxsLGIpO2EuY3VycmVudD1mO2Yuc3RhdGVOb2RlPWE7Zi5tZW1vaXplZFN0YXRlPXtlbGVtZW50OmQsaXNEZWh5ZHJhdGVkOmMsY2FjaGU6bnVsbCx0cmFuc2l0aW9uczpudWxsLHBlbmRpbmdTdXNwZW5zZUJvdW5kYXJpZXM6bnVsbH07YWgoZik7cmV0dXJuIGF9ZnVuY3Rpb24gZGwoYSxiLGMpe3ZhciBkPTM8YXJndW1lbnRzLmxlbmd0aCYmdm9pZCAwIT09YXJndW1lbnRzWzNdP2FyZ3VtZW50c1szXTpudWxsO3JldHVybnskJHR5cGVvZjp3YSxrZXk6bnVsbD09ZD9udWxsOiIiK2QsY2hpbGRyZW46YSxjb250YWluZXJJbmZvOmIsaW1wbGVtZW50YXRpb246Y319CmZ1bmN0aW9uIGVsKGEpe2lmKCFhKXJldHVybiBWZjthPWEuX3JlYWN0SW50ZXJuYWxzO2E6e2lmKFZiKGEpIT09YXx8MSE9PWEudGFnKXRocm93IEVycm9yKHAoMTcwKSk7dmFyIGI9YTtkb3tzd2l0Y2goYi50YWcpe2Nhc2UgMzpiPWIuc3RhdGVOb2RlLmNvbnRleHQ7YnJlYWsgYTtjYXNlIDE6aWYoWmYoYi50eXBlKSl7Yj1iLnN0YXRlTm9kZS5fX3JlYWN0SW50ZXJuYWxNZW1vaXplZE1lcmdlZENoaWxkQ29udGV4dDticmVhayBhfX1iPWIucmV0dXJufXdoaWxlKG51bGwhPT1iKTt0aHJvdyBFcnJvcihwKDE3MSkpO31pZigxPT09YS50YWcpe3ZhciBjPWEudHlwZTtpZihaZihjKSlyZXR1cm4gYmcoYSxjLGIpfXJldHVybiBifQpmdW5jdGlvbiBmbChhLGIsYyxkLGUsZixnLGgsayl7YT1jbChjLGQsITAsYSxlLGYsZyxoLGspO2EuY29udGV4dD1lbChudWxsKTtjPWEuY3VycmVudDtkPUwoKTtlPWxoKGMpO2Y9Y2goZCxlKTtmLmNhbGxiYWNrPXZvaWQgMCE9PWImJm51bGwhPT1iP2I6bnVsbDtkaChjLGYsZSk7YS5jdXJyZW50LmxhbmVzPWU7QWMoYSxlLGQpO0VrKGEsZCk7cmV0dXJuIGF9ZnVuY3Rpb24gZ2woYSxiLGMsZCl7dmFyIGU9Yi5jdXJyZW50LGY9TCgpLGc9bGgoZSk7Yz1lbChjKTtudWxsPT09Yi5jb250ZXh0P2IuY29udGV4dD1jOmIucGVuZGluZ0NvbnRleHQ9YztiPWNoKGYsZyk7Yi5wYXlsb2FkPXtlbGVtZW50OmF9O2Q9dm9pZCAwPT09ZD9udWxsOmQ7bnVsbCE9PWQmJihiLmNhbGxiYWNrPWQpO2E9ZGgoZSxiLGcpO251bGwhPT1hJiYobWgoYSxlLGcsZiksZWgoYSxlLGcpKTtyZXR1cm4gZ30KZnVuY3Rpb24gaGwoYSl7YT1hLmN1cnJlbnQ7aWYoIWEuY2hpbGQpcmV0dXJuIG51bGw7c3dpdGNoKGEuY2hpbGQudGFnKXtjYXNlIDU6cmV0dXJuIGEuY2hpbGQuc3RhdGVOb2RlO2RlZmF1bHQ6cmV0dXJuIGEuY2hpbGQuc3RhdGVOb2RlfX1mdW5jdGlvbiBpbChhLGIpe2E9YS5tZW1vaXplZFN0YXRlO2lmKG51bGwhPT1hJiZudWxsIT09YS5kZWh5ZHJhdGVkKXt2YXIgYz1hLnJldHJ5TGFuZTthLnJldHJ5TGFuZT0wIT09YyYmYzxiP2M6Yn19ZnVuY3Rpb24gamwoYSxiKXtpbChhLGIpOyhhPWEuYWx0ZXJuYXRlKSYmaWwoYSxiKX1mdW5jdGlvbiBrbCgpe3JldHVybiBudWxsfXZhciBsbD0iZnVuY3Rpb24iPT09dHlwZW9mIHJlcG9ydEVycm9yP3JlcG9ydEVycm9yOmZ1bmN0aW9uKGEpe2NvbnNvbGUuZXJyb3IoYSl9O2Z1bmN0aW9uIG1sKGEpe3RoaXMuX2ludGVybmFsUm9vdD1hfQpubC5wcm90b3R5cGUucmVuZGVyPW1sLnByb3RvdHlwZS5yZW5kZXI9ZnVuY3Rpb24oYSl7dmFyIGI9dGhpcy5faW50ZXJuYWxSb290O2lmKG51bGw9PT1iKXRocm93IEVycm9yKHAoNDA5KSk7Z2woYSxiLG51bGwsbnVsbCl9O25sLnByb3RvdHlwZS51bm1vdW50PW1sLnByb3RvdHlwZS51bm1vdW50PWZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5faW50ZXJuYWxSb290O2lmKG51bGwhPT1hKXt0aGlzLl9pbnRlcm5hbFJvb3Q9bnVsbDt2YXIgYj1hLmNvbnRhaW5lckluZm87U2soZnVuY3Rpb24oKXtnbChudWxsLGEsbnVsbCxudWxsKX0pO2JbdWZdPW51bGx9fTtmdW5jdGlvbiBubChhKXt0aGlzLl9pbnRlcm5hbFJvb3Q9YX0KbmwucHJvdG90eXBlLnVuc3RhYmxlX3NjaGVkdWxlSHlkcmF0aW9uPWZ1bmN0aW9uKGEpe2lmKGEpe3ZhciBiPUhjKCk7YT17YmxvY2tlZE9uOm51bGwsdGFyZ2V0OmEscHJpb3JpdHk6Yn07Zm9yKHZhciBjPTA7YzxRYy5sZW5ndGgmJjAhPT1iJiZiPFFjW2NdLnByaW9yaXR5O2MrKyk7UWMuc3BsaWNlKGMsMCxhKTswPT09YyYmVmMoYSl9fTtmdW5jdGlvbiBvbChhKXtyZXR1cm4hKCFhfHwxIT09YS5ub2RlVHlwZSYmOSE9PWEubm9kZVR5cGUmJjExIT09YS5ub2RlVHlwZSl9ZnVuY3Rpb24gcGwoYSl7cmV0dXJuISghYXx8MSE9PWEubm9kZVR5cGUmJjkhPT1hLm5vZGVUeXBlJiYxMSE9PWEubm9kZVR5cGUmJig4IT09YS5ub2RlVHlwZXx8IiByZWFjdC1tb3VudC1wb2ludC11bnN0YWJsZSAiIT09YS5ub2RlVmFsdWUpKX1mdW5jdGlvbiBxbCgpe30KZnVuY3Rpb24gcmwoYSxiLGMsZCxlKXtpZihlKXtpZigiZnVuY3Rpb24iPT09dHlwZW9mIGQpe3ZhciBmPWQ7ZD1mdW5jdGlvbigpe3ZhciBhPWhsKGcpO2YuY2FsbChhKX19dmFyIGc9ZmwoYixkLGEsMCxudWxsLCExLCExLCIiLHFsKTthLl9yZWFjdFJvb3RDb250YWluZXI9ZzthW3VmXT1nLmN1cnJlbnQ7c2YoOD09PWEubm9kZVR5cGU/YS5wYXJlbnROb2RlOmEpO1NrKCk7cmV0dXJuIGd9Zm9yKDtlPWEubGFzdENoaWxkOylhLnJlbW92ZUNoaWxkKGUpO2lmKCJmdW5jdGlvbiI9PT10eXBlb2YgZCl7dmFyIGg9ZDtkPWZ1bmN0aW9uKCl7dmFyIGE9aGwoayk7aC5jYWxsKGEpfX12YXIgaz1jbChhLDAsITEsbnVsbCxudWxsLCExLCExLCIiLHFsKTthLl9yZWFjdFJvb3RDb250YWluZXI9azthW3VmXT1rLmN1cnJlbnQ7c2YoOD09PWEubm9kZVR5cGU/YS5wYXJlbnROb2RlOmEpO1NrKGZ1bmN0aW9uKCl7Z2woYixrLGMsZCl9KTtyZXR1cm4ga30KZnVuY3Rpb24gc2woYSxiLGMsZCxlKXt2YXIgZj1jLl9yZWFjdFJvb3RDb250YWluZXI7aWYoZil7dmFyIGc9ZjtpZigiZnVuY3Rpb24iPT09dHlwZW9mIGUpe3ZhciBoPWU7ZT1mdW5jdGlvbigpe3ZhciBhPWhsKGcpO2guY2FsbChhKX19Z2woYixnLGEsZSl9ZWxzZSBnPXJsKGMsYixhLGUsZCk7cmV0dXJuIGhsKGcpfUVjPWZ1bmN0aW9uKGEpe3N3aXRjaChhLnRhZyl7Y2FzZSAzOnZhciBiPWEuc3RhdGVOb2RlO2lmKGIuY3VycmVudC5tZW1vaXplZFN0YXRlLmlzRGVoeWRyYXRlZCl7dmFyIGM9dGMoYi5wZW5kaW5nTGFuZXMpOzAhPT1jJiYoQ2MoYixjfDEpLEVrKGIsQigpKSwwPT09KEsmNikmJihIaj1CKCkrNTAwLGpnKCkpKX1icmVhaztjYXNlIDEzOlNrKGZ1bmN0aW9uKCl7dmFyIGI9WmcoYSwxKTtpZihudWxsIT09Yil7dmFyIGM9TCgpO21oKGIsYSwxLGMpfX0pLGpsKGEsMSl9fTsKRmM9ZnVuY3Rpb24oYSl7aWYoMTM9PT1hLnRhZyl7dmFyIGI9WmcoYSwxMzQyMTc3MjgpO2lmKG51bGwhPT1iKXt2YXIgYz1MKCk7bWgoYixhLDEzNDIxNzcyOCxjKX1qbChhLDEzNDIxNzcyOCl9fTtHYz1mdW5jdGlvbihhKXtpZigxMz09PWEudGFnKXt2YXIgYj1saChhKSxjPVpnKGEsYik7aWYobnVsbCE9PWMpe3ZhciBkPUwoKTttaChjLGEsYixkKX1qbChhLGIpfX07SGM9ZnVuY3Rpb24oKXtyZXR1cm4gQ307SWM9ZnVuY3Rpb24oYSxiKXt2YXIgYz1DO3RyeXtyZXR1cm4gQz1hLGIoKX1maW5hbGx5e0M9Y319Owp5Yj1mdW5jdGlvbihhLGIsYyl7c3dpdGNoKGIpe2Nhc2UgImlucHV0IjpiYihhLGMpO2I9Yy5uYW1lO2lmKCJyYWRpbyI9PT1jLnR5cGUmJm51bGwhPWIpe2ZvcihjPWE7Yy5wYXJlbnROb2RlOyljPWMucGFyZW50Tm9kZTtjPWMucXVlcnlTZWxlY3RvckFsbCgiaW5wdXRbbmFtZT0iK0pTT04uc3RyaW5naWZ5KCIiK2IpKyddW3R5cGU9InJhZGlvIl0nKTtmb3IoYj0wO2I8Yy5sZW5ndGg7YisrKXt2YXIgZD1jW2JdO2lmKGQhPT1hJiZkLmZvcm09PT1hLmZvcm0pe3ZhciBlPURiKGQpO2lmKCFlKXRocm93IEVycm9yKHAoOTApKTtXYShkKTtiYihkLGUpfX19YnJlYWs7Y2FzZSAidGV4dGFyZWEiOmliKGEsYyk7YnJlYWs7Y2FzZSAic2VsZWN0IjpiPWMudmFsdWUsbnVsbCE9YiYmZmIoYSwhIWMubXVsdGlwbGUsYiwhMSl9fTtHYj1SaztIYj1TazsKdmFyIHRsPXt1c2luZ0NsaWVudEVudHJ5UG9pbnQ6ITEsRXZlbnRzOltDYix1ZSxEYixFYixGYixSa119LHVsPXtmaW5kRmliZXJCeUhvc3RJbnN0YW5jZTpXYyxidW5kbGVUeXBlOjAsdmVyc2lvbjoiMTguMi4wIixyZW5kZXJlclBhY2thZ2VOYW1lOiJyZWFjdC1kb20ifTsKdmFyIHZsPXtidW5kbGVUeXBlOnVsLmJ1bmRsZVR5cGUsdmVyc2lvbjp1bC52ZXJzaW9uLHJlbmRlcmVyUGFja2FnZU5hbWU6dWwucmVuZGVyZXJQYWNrYWdlTmFtZSxyZW5kZXJlckNvbmZpZzp1bC5yZW5kZXJlckNvbmZpZyxvdmVycmlkZUhvb2tTdGF0ZTpudWxsLG92ZXJyaWRlSG9va1N0YXRlRGVsZXRlUGF0aDpudWxsLG92ZXJyaWRlSG9va1N0YXRlUmVuYW1lUGF0aDpudWxsLG92ZXJyaWRlUHJvcHM6bnVsbCxvdmVycmlkZVByb3BzRGVsZXRlUGF0aDpudWxsLG92ZXJyaWRlUHJvcHNSZW5hbWVQYXRoOm51bGwsc2V0RXJyb3JIYW5kbGVyOm51bGwsc2V0U3VzcGVuc2VIYW5kbGVyOm51bGwsc2NoZWR1bGVVcGRhdGU6bnVsbCxjdXJyZW50RGlzcGF0Y2hlclJlZjp1YS5SZWFjdEN1cnJlbnREaXNwYXRjaGVyLGZpbmRIb3N0SW5zdGFuY2VCeUZpYmVyOmZ1bmN0aW9uKGEpe2E9WmIoYSk7cmV0dXJuIG51bGw9PT1hP251bGw6YS5zdGF0ZU5vZGV9LGZpbmRGaWJlckJ5SG9zdEluc3RhbmNlOnVsLmZpbmRGaWJlckJ5SG9zdEluc3RhbmNlfHwKa2wsZmluZEhvc3RJbnN0YW5jZXNGb3JSZWZyZXNoOm51bGwsc2NoZWR1bGVSZWZyZXNoOm51bGwsc2NoZWR1bGVSb290Om51bGwsc2V0UmVmcmVzaEhhbmRsZXI6bnVsbCxnZXRDdXJyZW50RmliZXI6bnVsbCxyZWNvbmNpbGVyVmVyc2lvbjoiMTguMi4wLW5leHQtOWUzYjc3MmI4LTIwMjIwNjA4In07aWYoInVuZGVmaW5lZCIhPT10eXBlb2YgX19SRUFDVF9ERVZUT09MU19HTE9CQUxfSE9PS19fKXt2YXIgd2w9X19SRUFDVF9ERVZUT09MU19HTE9CQUxfSE9PS19fO2lmKCF3bC5pc0Rpc2FibGVkJiZ3bC5zdXBwb3J0c0ZpYmVyKXRyeXtrYz13bC5pbmplY3QodmwpLGxjPXdsfWNhdGNoKGEpe319ZXhwb3J0cy5fX1NFQ1JFVF9JTlRFUk5BTFNfRE9fTk9UX1VTRV9PUl9ZT1VfV0lMTF9CRV9GSVJFRD10bDsKZXhwb3J0cy5jcmVhdGVQb3J0YWw9ZnVuY3Rpb24oYSxiKXt2YXIgYz0yPGFyZ3VtZW50cy5sZW5ndGgmJnZvaWQgMCE9PWFyZ3VtZW50c1syXT9hcmd1bWVudHNbMl06bnVsbDtpZighb2woYikpdGhyb3cgRXJyb3IocCgyMDApKTtyZXR1cm4gZGwoYSxiLG51bGwsYyl9O2V4cG9ydHMuY3JlYXRlUm9vdD1mdW5jdGlvbihhLGIpe2lmKCFvbChhKSl0aHJvdyBFcnJvcihwKDI5OSkpO3ZhciBjPSExLGQ9IiIsZT1sbDtudWxsIT09YiYmdm9pZCAwIT09YiYmKCEwPT09Yi51bnN0YWJsZV9zdHJpY3RNb2RlJiYoYz0hMCksdm9pZCAwIT09Yi5pZGVudGlmaWVyUHJlZml4JiYoZD1iLmlkZW50aWZpZXJQcmVmaXgpLHZvaWQgMCE9PWIub25SZWNvdmVyYWJsZUVycm9yJiYoZT1iLm9uUmVjb3ZlcmFibGVFcnJvcikpO2I9Y2woYSwxLCExLG51bGwsbnVsbCxjLCExLGQsZSk7YVt1Zl09Yi5jdXJyZW50O3NmKDg9PT1hLm5vZGVUeXBlP2EucGFyZW50Tm9kZTphKTtyZXR1cm4gbmV3IG1sKGIpfTsKZXhwb3J0cy5maW5kRE9NTm9kZT1mdW5jdGlvbihhKXtpZihudWxsPT1hKXJldHVybiBudWxsO2lmKDE9PT1hLm5vZGVUeXBlKXJldHVybiBhO3ZhciBiPWEuX3JlYWN0SW50ZXJuYWxzO2lmKHZvaWQgMD09PWIpe2lmKCJmdW5jdGlvbiI9PT10eXBlb2YgYS5yZW5kZXIpdGhyb3cgRXJyb3IocCgxODgpKTthPU9iamVjdC5rZXlzKGEpLmpvaW4oIiwiKTt0aHJvdyBFcnJvcihwKDI2OCxhKSk7fWE9WmIoYik7YT1udWxsPT09YT9udWxsOmEuc3RhdGVOb2RlO3JldHVybiBhfTtleHBvcnRzLmZsdXNoU3luYz1mdW5jdGlvbihhKXtyZXR1cm4gU2soYSl9O2V4cG9ydHMuaHlkcmF0ZT1mdW5jdGlvbihhLGIsYyl7aWYoIXBsKGIpKXRocm93IEVycm9yKHAoMjAwKSk7cmV0dXJuIHNsKG51bGwsYSxiLCEwLGMpfTsKZXhwb3J0cy5oeWRyYXRlUm9vdD1mdW5jdGlvbihhLGIsYyl7aWYoIW9sKGEpKXRocm93IEVycm9yKHAoNDA1KSk7dmFyIGQ9bnVsbCE9YyYmYy5oeWRyYXRlZFNvdXJjZXN8fG51bGwsZT0hMSxmPSIiLGc9bGw7bnVsbCE9PWMmJnZvaWQgMCE9PWMmJighMD09PWMudW5zdGFibGVfc3RyaWN0TW9kZSYmKGU9ITApLHZvaWQgMCE9PWMuaWRlbnRpZmllclByZWZpeCYmKGY9Yy5pZGVudGlmaWVyUHJlZml4KSx2b2lkIDAhPT1jLm9uUmVjb3ZlcmFibGVFcnJvciYmKGc9Yy5vblJlY292ZXJhYmxlRXJyb3IpKTtiPWZsKGIsbnVsbCxhLDEsbnVsbCE9Yz9jOm51bGwsZSwhMSxmLGcpO2FbdWZdPWIuY3VycmVudDtzZihhKTtpZihkKWZvcihhPTA7YTxkLmxlbmd0aDthKyspYz1kW2FdLGU9Yy5fZ2V0VmVyc2lvbixlPWUoYy5fc291cmNlKSxudWxsPT1iLm11dGFibGVTb3VyY2VFYWdlckh5ZHJhdGlvbkRhdGE/Yi5tdXRhYmxlU291cmNlRWFnZXJIeWRyYXRpb25EYXRhPVtjLGVdOmIubXV0YWJsZVNvdXJjZUVhZ2VySHlkcmF0aW9uRGF0YS5wdXNoKGMsCmUpO3JldHVybiBuZXcgbmwoYil9O2V4cG9ydHMucmVuZGVyPWZ1bmN0aW9uKGEsYixjKXtpZighcGwoYikpdGhyb3cgRXJyb3IocCgyMDApKTtyZXR1cm4gc2wobnVsbCxhLGIsITEsYyl9O2V4cG9ydHMudW5tb3VudENvbXBvbmVudEF0Tm9kZT1mdW5jdGlvbihhKXtpZighcGwoYSkpdGhyb3cgRXJyb3IocCg0MCkpO3JldHVybiBhLl9yZWFjdFJvb3RDb250YWluZXI/KFNrKGZ1bmN0aW9uKCl7c2wobnVsbCxudWxsLGEsITEsZnVuY3Rpb24oKXthLl9yZWFjdFJvb3RDb250YWluZXI9bnVsbDthW3VmXT1udWxsfSl9KSwhMCk6ITF9O2V4cG9ydHMudW5zdGFibGVfYmF0Y2hlZFVwZGF0ZXM9Ums7CmV4cG9ydHMudW5zdGFibGVfcmVuZGVyU3VidHJlZUludG9Db250YWluZXI9ZnVuY3Rpb24oYSxiLGMsZCl7aWYoIXBsKGMpKXRocm93IEVycm9yKHAoMjAwKSk7aWYobnVsbD09YXx8dm9pZCAwPT09YS5fcmVhY3RJbnRlcm5hbHMpdGhyb3cgRXJyb3IocCgzOCkpO3JldHVybiBzbChhLGIsYywhMSxkKX07ZXhwb3J0cy52ZXJzaW9uPSIxOC4yLjAtbmV4dC05ZTNiNzcyYjgtMjAyMjA2MDgiOwoKCi8qKiovIH0pLAoKLyoqKi8gNzQ1OgovKioqLyAoKF9fdW51c2VkX3dlYnBhY2tfbW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSA9PiB7Cgp2YXIgX193ZWJwYWNrX3VudXNlZF9leHBvcnRfXzsKCgp2YXIgbSA9IF9fd2VicGFja19yZXF1aXJlX18oOTM1KTsKaWYgKHRydWUpIHsKICBleHBvcnRzLnMgPSBtLmNyZWF0ZVJvb3Q7CiAgX193ZWJwYWNrX3VudXNlZF9leHBvcnRfXyA9IG0uaHlkcmF0ZVJvb3Q7Cn0gZWxzZSB7IHZhciBpOyB9CgoKLyoqKi8gfSksCgovKioqLyA5MzU6Ci8qKiovICgobW9kdWxlLCBfX3VudXNlZF93ZWJwYWNrX2V4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pID0+IHsKCgoKZnVuY3Rpb24gY2hlY2tEQ0UoKSB7CiAgLyogZ2xvYmFsIF9fUkVBQ1RfREVWVE9PTFNfR0xPQkFMX0hPT0tfXyAqLwogIGlmICgKICAgIHR5cGVvZiBfX1JFQUNUX0RFVlRPT0xTX0dMT0JBTF9IT09LX18gPT09ICd1bmRlZmluZWQnIHx8CiAgICB0eXBlb2YgX19SRUFDVF9ERVZUT09MU19HTE9CQUxfSE9PS19fLmNoZWNrRENFICE9PSAnZnVuY3Rpb24nCiAgKSB7CiAgICByZXR1cm47CiAgfQogIGlmIChmYWxzZSkge30KICB0cnkgewogICAgLy8gVmVyaWZ5IHRoYXQgdGhlIGNvZGUgYWJvdmUgaGFzIGJlZW4gZGVhZCBjb2RlIGVsaW1pbmF0ZWQgKERDRSdkKS4KICAgIF9fUkVBQ1RfREVWVE9PTFNfR0xPQkFMX0hPT0tfXy5jaGVja0RDRShjaGVja0RDRSk7CiAgfSBjYXRjaCAoZXJyKSB7CiAgICAvLyBEZXZUb29scyBzaG91bGRuJ3QgY3Jhc2ggUmVhY3QsIG5vIG1hdHRlciB3aGF0LgogICAgLy8gV2Ugc2hvdWxkIHN0aWxsIHJlcG9ydCBpbiBjYXNlIHdlIGJyZWFrIHRoaXMgY29kZS4KICAgIGNvbnNvbGUuZXJyb3IoZXJyKTsKICB9Cn0KCmlmICh0cnVlKSB7CiAgLy8gRENFIGNoZWNrIHNob3VsZCBoYXBwZW4gYmVmb3JlIFJlYWN0RE9NIGJ1bmRsZSBleGVjdXRlcyBzbyB0aGF0CiAgLy8gRGV2VG9vbHMgY2FuIHJlcG9ydCBiYWQgbWluaWZpY2F0aW9uIGR1cmluZyBpbmplY3Rpb24uCiAgY2hlY2tEQ0UoKTsKICBtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19yZXF1aXJlX18oNDQ4KTsKfSBlbHNlIHt9CgoKLyoqKi8gfSksCgovKioqLyA0MDg6Ci8qKiovICgoX191bnVzZWRfd2VicGFja19tb2R1bGUsIGV4cG9ydHMpID0+IHsKCi8qKgogKiBAbGljZW5zZSBSZWFjdAogKiByZWFjdC5wcm9kdWN0aW9uLm1pbi5qcwogKgogKiBDb3B5cmlnaHQgKGMpIEZhY2Vib29rLCBJbmMuIGFuZCBpdHMgYWZmaWxpYXRlcy4KICoKICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlCiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4KICovCnZhciBsPVN5bWJvbC5mb3IoInJlYWN0LmVsZW1lbnQiKSxuPVN5bWJvbC5mb3IoInJlYWN0LnBvcnRhbCIpLHA9U3ltYm9sLmZvcigicmVhY3QuZnJhZ21lbnQiKSxxPVN5bWJvbC5mb3IoInJlYWN0LnN0cmljdF9tb2RlIikscj1TeW1ib2wuZm9yKCJyZWFjdC5wcm9maWxlciIpLHQ9U3ltYm9sLmZvcigicmVhY3QucHJvdmlkZXIiKSx1PVN5bWJvbC5mb3IoInJlYWN0LmNvbnRleHQiKSx2PVN5bWJvbC5mb3IoInJlYWN0LmZvcndhcmRfcmVmIiksdz1TeW1ib2wuZm9yKCJyZWFjdC5zdXNwZW5zZSIpLHg9U3ltYm9sLmZvcigicmVhY3QubWVtbyIpLHk9U3ltYm9sLmZvcigicmVhY3QubGF6eSIpLHo9U3ltYm9sLml0ZXJhdG9yO2Z1bmN0aW9uIEEoYSl7aWYobnVsbD09PWF8fCJvYmplY3QiIT09dHlwZW9mIGEpcmV0dXJuIG51bGw7YT16JiZhW3pdfHxhWyJAQGl0ZXJhdG9yIl07cmV0dXJuImZ1bmN0aW9uIj09PXR5cGVvZiBhP2E6bnVsbH0KdmFyIEI9e2lzTW91bnRlZDpmdW5jdGlvbigpe3JldHVybiExfSxlbnF1ZXVlRm9yY2VVcGRhdGU6ZnVuY3Rpb24oKXt9LGVucXVldWVSZXBsYWNlU3RhdGU6ZnVuY3Rpb24oKXt9LGVucXVldWVTZXRTdGF0ZTpmdW5jdGlvbigpe319LEM9T2JqZWN0LmFzc2lnbixEPXt9O2Z1bmN0aW9uIEUoYSxiLGUpe3RoaXMucHJvcHM9YTt0aGlzLmNvbnRleHQ9Yjt0aGlzLnJlZnM9RDt0aGlzLnVwZGF0ZXI9ZXx8Qn1FLnByb3RvdHlwZS5pc1JlYWN0Q29tcG9uZW50PXt9OwpFLnByb3RvdHlwZS5zZXRTdGF0ZT1mdW5jdGlvbihhLGIpe2lmKCJvYmplY3QiIT09dHlwZW9mIGEmJiJmdW5jdGlvbiIhPT10eXBlb2YgYSYmbnVsbCE9YSl0aHJvdyBFcnJvcigic2V0U3RhdGUoLi4uKTogdGFrZXMgYW4gb2JqZWN0IG9mIHN0YXRlIHZhcmlhYmxlcyB0byB1cGRhdGUgb3IgYSBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGFuIG9iamVjdCBvZiBzdGF0ZSB2YXJpYWJsZXMuIik7dGhpcy51cGRhdGVyLmVucXVldWVTZXRTdGF0ZSh0aGlzLGEsYiwic2V0U3RhdGUiKX07RS5wcm90b3R5cGUuZm9yY2VVcGRhdGU9ZnVuY3Rpb24oYSl7dGhpcy51cGRhdGVyLmVucXVldWVGb3JjZVVwZGF0ZSh0aGlzLGEsImZvcmNlVXBkYXRlIil9O2Z1bmN0aW9uIEYoKXt9Ri5wcm90b3R5cGU9RS5wcm90b3R5cGU7ZnVuY3Rpb24gRyhhLGIsZSl7dGhpcy5wcm9wcz1hO3RoaXMuY29udGV4dD1iO3RoaXMucmVmcz1EO3RoaXMudXBkYXRlcj1lfHxCfXZhciBIPUcucHJvdG90eXBlPW5ldyBGOwpILmNvbnN0cnVjdG9yPUc7QyhILEUucHJvdG90eXBlKTtILmlzUHVyZVJlYWN0Q29tcG9uZW50PSEwO3ZhciBJPUFycmF5LmlzQXJyYXksSj1PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LEs9e2N1cnJlbnQ6bnVsbH0sTD17a2V5OiEwLHJlZjohMCxfX3NlbGY6ITAsX19zb3VyY2U6ITB9OwpmdW5jdGlvbiBNKGEsYixlKXt2YXIgZCxjPXt9LGs9bnVsbCxoPW51bGw7aWYobnVsbCE9Yilmb3IoZCBpbiB2b2lkIDAhPT1iLnJlZiYmKGg9Yi5yZWYpLHZvaWQgMCE9PWIua2V5JiYoaz0iIitiLmtleSksYilKLmNhbGwoYixkKSYmIUwuaGFzT3duUHJvcGVydHkoZCkmJihjW2RdPWJbZF0pO3ZhciBnPWFyZ3VtZW50cy5sZW5ndGgtMjtpZigxPT09ZyljLmNoaWxkcmVuPWU7ZWxzZSBpZigxPGcpe2Zvcih2YXIgZj1BcnJheShnKSxtPTA7bTxnO20rKylmW21dPWFyZ3VtZW50c1ttKzJdO2MuY2hpbGRyZW49Zn1pZihhJiZhLmRlZmF1bHRQcm9wcylmb3IoZCBpbiBnPWEuZGVmYXVsdFByb3BzLGcpdm9pZCAwPT09Y1tkXSYmKGNbZF09Z1tkXSk7cmV0dXJueyQkdHlwZW9mOmwsdHlwZTphLGtleTprLHJlZjpoLHByb3BzOmMsX293bmVyOksuY3VycmVudH19CmZ1bmN0aW9uIE4oYSxiKXtyZXR1cm57JCR0eXBlb2Y6bCx0eXBlOmEudHlwZSxrZXk6YixyZWY6YS5yZWYscHJvcHM6YS5wcm9wcyxfb3duZXI6YS5fb3duZXJ9fWZ1bmN0aW9uIE8oYSl7cmV0dXJuIm9iamVjdCI9PT10eXBlb2YgYSYmbnVsbCE9PWEmJmEuJCR0eXBlb2Y9PT1sfWZ1bmN0aW9uIGVzY2FwZShhKXt2YXIgYj17Ij0iOiI9MCIsIjoiOiI9MiJ9O3JldHVybiIkIithLnJlcGxhY2UoL1s9Ol0vZyxmdW5jdGlvbihhKXtyZXR1cm4gYlthXX0pfXZhciBQPS9cLysvZztmdW5jdGlvbiBRKGEsYil7cmV0dXJuIm9iamVjdCI9PT10eXBlb2YgYSYmbnVsbCE9PWEmJm51bGwhPWEua2V5P2VzY2FwZSgiIithLmtleSk6Yi50b1N0cmluZygzNil9CmZ1bmN0aW9uIFIoYSxiLGUsZCxjKXt2YXIgaz10eXBlb2YgYTtpZigidW5kZWZpbmVkIj09PWt8fCJib29sZWFuIj09PWspYT1udWxsO3ZhciBoPSExO2lmKG51bGw9PT1hKWg9ITA7ZWxzZSBzd2l0Y2goayl7Y2FzZSAic3RyaW5nIjpjYXNlICJudW1iZXIiOmg9ITA7YnJlYWs7Y2FzZSAib2JqZWN0Ijpzd2l0Y2goYS4kJHR5cGVvZil7Y2FzZSBsOmNhc2UgbjpoPSEwfX1pZihoKXJldHVybiBoPWEsYz1jKGgpLGE9IiI9PT1kPyIuIitRKGgsMCk6ZCxJKGMpPyhlPSIiLG51bGwhPWEmJihlPWEucmVwbGFjZShQLCIkJi8iKSsiLyIpLFIoYyxiLGUsIiIsZnVuY3Rpb24oYSl7cmV0dXJuIGF9KSk6bnVsbCE9YyYmKE8oYykmJihjPU4oYyxlKyghYy5rZXl8fGgmJmgua2V5PT09Yy5rZXk/IiI6KCIiK2Mua2V5KS5yZXBsYWNlKFAsIiQmLyIpKyIvIikrYSkpLGIucHVzaChjKSksMTtoPTA7ZD0iIj09PWQ/Ii4iOmQrIjoiO2lmKEkoYSkpZm9yKHZhciBnPTA7ZzxhLmxlbmd0aDtnKyspe2s9CmFbZ107dmFyIGY9ZCtRKGssZyk7aCs9UihrLGIsZSxmLGMpfWVsc2UgaWYoZj1BKGEpLCJmdW5jdGlvbiI9PT10eXBlb2YgZilmb3IoYT1mLmNhbGwoYSksZz0wOyEoaz1hLm5leHQoKSkuZG9uZTspaz1rLnZhbHVlLGY9ZCtRKGssZysrKSxoKz1SKGssYixlLGYsYyk7ZWxzZSBpZigib2JqZWN0Ij09PWspdGhyb3cgYj1TdHJpbmcoYSksRXJyb3IoIk9iamVjdHMgYXJlIG5vdCB2YWxpZCBhcyBhIFJlYWN0IGNoaWxkIChmb3VuZDogIisoIltvYmplY3QgT2JqZWN0XSI9PT1iPyJvYmplY3Qgd2l0aCBrZXlzIHsiK09iamVjdC5rZXlzKGEpLmpvaW4oIiwgIikrIn0iOmIpKyIpLiBJZiB5b3UgbWVhbnQgdG8gcmVuZGVyIGEgY29sbGVjdGlvbiBvZiBjaGlsZHJlbiwgdXNlIGFuIGFycmF5IGluc3RlYWQuIik7cmV0dXJuIGh9CmZ1bmN0aW9uIFMoYSxiLGUpe2lmKG51bGw9PWEpcmV0dXJuIGE7dmFyIGQ9W10sYz0wO1IoYSxkLCIiLCIiLGZ1bmN0aW9uKGEpe3JldHVybiBiLmNhbGwoZSxhLGMrKyl9KTtyZXR1cm4gZH1mdW5jdGlvbiBUKGEpe2lmKC0xPT09YS5fc3RhdHVzKXt2YXIgYj1hLl9yZXN1bHQ7Yj1iKCk7Yi50aGVuKGZ1bmN0aW9uKGIpe2lmKDA9PT1hLl9zdGF0dXN8fC0xPT09YS5fc3RhdHVzKWEuX3N0YXR1cz0xLGEuX3Jlc3VsdD1ifSxmdW5jdGlvbihiKXtpZigwPT09YS5fc3RhdHVzfHwtMT09PWEuX3N0YXR1cylhLl9zdGF0dXM9MixhLl9yZXN1bHQ9Yn0pOy0xPT09YS5fc3RhdHVzJiYoYS5fc3RhdHVzPTAsYS5fcmVzdWx0PWIpfWlmKDE9PT1hLl9zdGF0dXMpcmV0dXJuIGEuX3Jlc3VsdC5kZWZhdWx0O3Rocm93IGEuX3Jlc3VsdDt9CnZhciBVPXtjdXJyZW50Om51bGx9LFY9e3RyYW5zaXRpb246bnVsbH0sVz17UmVhY3RDdXJyZW50RGlzcGF0Y2hlcjpVLFJlYWN0Q3VycmVudEJhdGNoQ29uZmlnOlYsUmVhY3RDdXJyZW50T3duZXI6S307ZXhwb3J0cy5DaGlsZHJlbj17bWFwOlMsZm9yRWFjaDpmdW5jdGlvbihhLGIsZSl7UyhhLGZ1bmN0aW9uKCl7Yi5hcHBseSh0aGlzLGFyZ3VtZW50cyl9LGUpfSxjb3VudDpmdW5jdGlvbihhKXt2YXIgYj0wO1MoYSxmdW5jdGlvbigpe2IrK30pO3JldHVybiBifSx0b0FycmF5OmZ1bmN0aW9uKGEpe3JldHVybiBTKGEsZnVuY3Rpb24oYSl7cmV0dXJuIGF9KXx8W119LG9ubHk6ZnVuY3Rpb24oYSl7aWYoIU8oYSkpdGhyb3cgRXJyb3IoIlJlYWN0LkNoaWxkcmVuLm9ubHkgZXhwZWN0ZWQgdG8gcmVjZWl2ZSBhIHNpbmdsZSBSZWFjdCBlbGVtZW50IGNoaWxkLiIpO3JldHVybiBhfX07ZXhwb3J0cy5Db21wb25lbnQ9RTtleHBvcnRzLkZyYWdtZW50PXA7CmV4cG9ydHMuUHJvZmlsZXI9cjtleHBvcnRzLlB1cmVDb21wb25lbnQ9RztleHBvcnRzLlN0cmljdE1vZGU9cTtleHBvcnRzLlN1c3BlbnNlPXc7ZXhwb3J0cy5fX1NFQ1JFVF9JTlRFUk5BTFNfRE9fTk9UX1VTRV9PUl9ZT1VfV0lMTF9CRV9GSVJFRD1XOwpleHBvcnRzLmNsb25lRWxlbWVudD1mdW5jdGlvbihhLGIsZSl7aWYobnVsbD09PWF8fHZvaWQgMD09PWEpdGhyb3cgRXJyb3IoIlJlYWN0LmNsb25lRWxlbWVudCguLi4pOiBUaGUgYXJndW1lbnQgbXVzdCBiZSBhIFJlYWN0IGVsZW1lbnQsIGJ1dCB5b3UgcGFzc2VkICIrYSsiLiIpO3ZhciBkPUMoe30sYS5wcm9wcyksYz1hLmtleSxrPWEucmVmLGg9YS5fb3duZXI7aWYobnVsbCE9Yil7dm9pZCAwIT09Yi5yZWYmJihrPWIucmVmLGg9Sy5jdXJyZW50KTt2b2lkIDAhPT1iLmtleSYmKGM9IiIrYi5rZXkpO2lmKGEudHlwZSYmYS50eXBlLmRlZmF1bHRQcm9wcyl2YXIgZz1hLnR5cGUuZGVmYXVsdFByb3BzO2ZvcihmIGluIGIpSi5jYWxsKGIsZikmJiFMLmhhc093blByb3BlcnR5KGYpJiYoZFtmXT12b2lkIDA9PT1iW2ZdJiZ2b2lkIDAhPT1nP2dbZl06YltmXSl9dmFyIGY9YXJndW1lbnRzLmxlbmd0aC0yO2lmKDE9PT1mKWQuY2hpbGRyZW49ZTtlbHNlIGlmKDE8Zil7Zz1BcnJheShmKTsKZm9yKHZhciBtPTA7bTxmO20rKylnW21dPWFyZ3VtZW50c1ttKzJdO2QuY2hpbGRyZW49Z31yZXR1cm57JCR0eXBlb2Y6bCx0eXBlOmEudHlwZSxrZXk6YyxyZWY6ayxwcm9wczpkLF9vd25lcjpofX07ZXhwb3J0cy5jcmVhdGVDb250ZXh0PWZ1bmN0aW9uKGEpe2E9eyQkdHlwZW9mOnUsX2N1cnJlbnRWYWx1ZTphLF9jdXJyZW50VmFsdWUyOmEsX3RocmVhZENvdW50OjAsUHJvdmlkZXI6bnVsbCxDb25zdW1lcjpudWxsLF9kZWZhdWx0VmFsdWU6bnVsbCxfZ2xvYmFsTmFtZTpudWxsfTthLlByb3ZpZGVyPXskJHR5cGVvZjp0LF9jb250ZXh0OmF9O3JldHVybiBhLkNvbnN1bWVyPWF9O2V4cG9ydHMuY3JlYXRlRWxlbWVudD1NO2V4cG9ydHMuY3JlYXRlRmFjdG9yeT1mdW5jdGlvbihhKXt2YXIgYj1NLmJpbmQobnVsbCxhKTtiLnR5cGU9YTtyZXR1cm4gYn07ZXhwb3J0cy5jcmVhdGVSZWY9ZnVuY3Rpb24oKXtyZXR1cm57Y3VycmVudDpudWxsfX07CmV4cG9ydHMuZm9yd2FyZFJlZj1mdW5jdGlvbihhKXtyZXR1cm57JCR0eXBlb2Y6dixyZW5kZXI6YX19O2V4cG9ydHMuaXNWYWxpZEVsZW1lbnQ9TztleHBvcnRzLmxhenk9ZnVuY3Rpb24oYSl7cmV0dXJueyQkdHlwZW9mOnksX3BheWxvYWQ6e19zdGF0dXM6LTEsX3Jlc3VsdDphfSxfaW5pdDpUfX07ZXhwb3J0cy5tZW1vPWZ1bmN0aW9uKGEsYil7cmV0dXJueyQkdHlwZW9mOngsdHlwZTphLGNvbXBhcmU6dm9pZCAwPT09Yj9udWxsOmJ9fTtleHBvcnRzLnN0YXJ0VHJhbnNpdGlvbj1mdW5jdGlvbihhKXt2YXIgYj1WLnRyYW5zaXRpb247Vi50cmFuc2l0aW9uPXt9O3RyeXthKCl9ZmluYWxseXtWLnRyYW5zaXRpb249Yn19O2V4cG9ydHMudW5zdGFibGVfYWN0PWZ1bmN0aW9uKCl7dGhyb3cgRXJyb3IoImFjdCguLi4pIGlzIG5vdCBzdXBwb3J0ZWQgaW4gcHJvZHVjdGlvbiBidWlsZHMgb2YgUmVhY3QuIik7fTsKZXhwb3J0cy51c2VDYWxsYmFjaz1mdW5jdGlvbihhLGIpe3JldHVybiBVLmN1cnJlbnQudXNlQ2FsbGJhY2soYSxiKX07ZXhwb3J0cy51c2VDb250ZXh0PWZ1bmN0aW9uKGEpe3JldHVybiBVLmN1cnJlbnQudXNlQ29udGV4dChhKX07ZXhwb3J0cy51c2VEZWJ1Z1ZhbHVlPWZ1bmN0aW9uKCl7fTtleHBvcnRzLnVzZURlZmVycmVkVmFsdWU9ZnVuY3Rpb24oYSl7cmV0dXJuIFUuY3VycmVudC51c2VEZWZlcnJlZFZhbHVlKGEpfTtleHBvcnRzLnVzZUVmZmVjdD1mdW5jdGlvbihhLGIpe3JldHVybiBVLmN1cnJlbnQudXNlRWZmZWN0KGEsYil9O2V4cG9ydHMudXNlSWQ9ZnVuY3Rpb24oKXtyZXR1cm4gVS5jdXJyZW50LnVzZUlkKCl9O2V4cG9ydHMudXNlSW1wZXJhdGl2ZUhhbmRsZT1mdW5jdGlvbihhLGIsZSl7cmV0dXJuIFUuY3VycmVudC51c2VJbXBlcmF0aXZlSGFuZGxlKGEsYixlKX07CmV4cG9ydHMudXNlSW5zZXJ0aW9uRWZmZWN0PWZ1bmN0aW9uKGEsYil7cmV0dXJuIFUuY3VycmVudC51c2VJbnNlcnRpb25FZmZlY3QoYSxiKX07ZXhwb3J0cy51c2VMYXlvdXRFZmZlY3Q9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gVS5jdXJyZW50LnVzZUxheW91dEVmZmVjdChhLGIpfTtleHBvcnRzLnVzZU1lbW89ZnVuY3Rpb24oYSxiKXtyZXR1cm4gVS5jdXJyZW50LnVzZU1lbW8oYSxiKX07ZXhwb3J0cy51c2VSZWR1Y2VyPWZ1bmN0aW9uKGEsYixlKXtyZXR1cm4gVS5jdXJyZW50LnVzZVJlZHVjZXIoYSxiLGUpfTtleHBvcnRzLnVzZVJlZj1mdW5jdGlvbihhKXtyZXR1cm4gVS5jdXJyZW50LnVzZVJlZihhKX07ZXhwb3J0cy51c2VTdGF0ZT1mdW5jdGlvbihhKXtyZXR1cm4gVS5jdXJyZW50LnVzZVN0YXRlKGEpfTtleHBvcnRzLnVzZVN5bmNFeHRlcm5hbFN0b3JlPWZ1bmN0aW9uKGEsYixlKXtyZXR1cm4gVS5jdXJyZW50LnVzZVN5bmNFeHRlcm5hbFN0b3JlKGEsYixlKX07CmV4cG9ydHMudXNlVHJhbnNpdGlvbj1mdW5jdGlvbigpe3JldHVybiBVLmN1cnJlbnQudXNlVHJhbnNpdGlvbigpfTtleHBvcnRzLnZlcnNpb249IjE4LjIuMCI7CgoKLyoqKi8gfSksCgovKioqLyAyOTQ6Ci8qKiovICgobW9kdWxlLCBfX3VudXNlZF93ZWJwYWNrX2V4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pID0+IHsKCgoKaWYgKHRydWUpIHsKICBtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19yZXF1aXJlX18oNDA4KTsKfSBlbHNlIHt9CgoKLyoqKi8gfSksCgovKioqLyA1MzoKLyoqKi8gKChfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgZXhwb3J0cykgPT4gewoKLyoqCiAqIEBsaWNlbnNlIFJlYWN0CiAqIHNjaGVkdWxlci5wcm9kdWN0aW9uLm1pbi5qcwogKgogKiBDb3B5cmlnaHQgKGMpIEZhY2Vib29rLCBJbmMuIGFuZCBpdHMgYWZmaWxpYXRlcy4KICoKICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlCiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4KICovCmZ1bmN0aW9uIGYoYSxiKXt2YXIgYz1hLmxlbmd0aDthLnB1c2goYik7YTpmb3IoOzA8Yzspe3ZhciBkPWMtMT4+PjEsZT1hW2RdO2lmKDA8ZyhlLGIpKWFbZF09YixhW2NdPWUsYz1kO2Vsc2UgYnJlYWsgYX19ZnVuY3Rpb24gaChhKXtyZXR1cm4gMD09PWEubGVuZ3RoP251bGw6YVswXX1mdW5jdGlvbiBrKGEpe2lmKDA9PT1hLmxlbmd0aClyZXR1cm4gbnVsbDt2YXIgYj1hWzBdLGM9YS5wb3AoKTtpZihjIT09Yil7YVswXT1jO2E6Zm9yKHZhciBkPTAsZT1hLmxlbmd0aCx3PWU+Pj4xO2Q8dzspe3ZhciBtPTIqKGQrMSktMSxDPWFbbV0sbj1tKzEseD1hW25dO2lmKDA+ZyhDLGMpKW48ZSYmMD5nKHgsQyk/KGFbZF09eCxhW25dPWMsZD1uKTooYVtkXT1DLGFbbV09YyxkPW0pO2Vsc2UgaWYobjxlJiYwPmcoeCxjKSlhW2RdPXgsYVtuXT1jLGQ9bjtlbHNlIGJyZWFrIGF9fXJldHVybiBifQpmdW5jdGlvbiBnKGEsYil7dmFyIGM9YS5zb3J0SW5kZXgtYi5zb3J0SW5kZXg7cmV0dXJuIDAhPT1jP2M6YS5pZC1iLmlkfWlmKCJvYmplY3QiPT09dHlwZW9mIHBlcmZvcm1hbmNlJiYiZnVuY3Rpb24iPT09dHlwZW9mIHBlcmZvcm1hbmNlLm5vdyl7dmFyIGw9cGVyZm9ybWFuY2U7ZXhwb3J0cy51bnN0YWJsZV9ub3c9ZnVuY3Rpb24oKXtyZXR1cm4gbC5ub3coKX19ZWxzZXt2YXIgcD1EYXRlLHE9cC5ub3coKTtleHBvcnRzLnVuc3RhYmxlX25vdz1mdW5jdGlvbigpe3JldHVybiBwLm5vdygpLXF9fXZhciByPVtdLHQ9W10sdT0xLHY9bnVsbCx5PTMsej0hMSxBPSExLEI9ITEsRD0iZnVuY3Rpb24iPT09dHlwZW9mIHNldFRpbWVvdXQ/c2V0VGltZW91dDpudWxsLEU9ImZ1bmN0aW9uIj09PXR5cGVvZiBjbGVhclRpbWVvdXQ/Y2xlYXJUaW1lb3V0Om51bGwsRj0idW5kZWZpbmVkIiE9PXR5cGVvZiBzZXRJbW1lZGlhdGU/c2V0SW1tZWRpYXRlOm51bGw7CiJ1bmRlZmluZWQiIT09dHlwZW9mIG5hdmlnYXRvciYmdm9pZCAwIT09bmF2aWdhdG9yLnNjaGVkdWxpbmcmJnZvaWQgMCE9PW5hdmlnYXRvci5zY2hlZHVsaW5nLmlzSW5wdXRQZW5kaW5nJiZuYXZpZ2F0b3Iuc2NoZWR1bGluZy5pc0lucHV0UGVuZGluZy5iaW5kKG5hdmlnYXRvci5zY2hlZHVsaW5nKTtmdW5jdGlvbiBHKGEpe2Zvcih2YXIgYj1oKHQpO251bGwhPT1iOyl7aWYobnVsbD09PWIuY2FsbGJhY2spayh0KTtlbHNlIGlmKGIuc3RhcnRUaW1lPD1hKWsodCksYi5zb3J0SW5kZXg9Yi5leHBpcmF0aW9uVGltZSxmKHIsYik7ZWxzZSBicmVhaztiPWgodCl9fWZ1bmN0aW9uIEgoYSl7Qj0hMTtHKGEpO2lmKCFBKWlmKG51bGwhPT1oKHIpKUE9ITAsSShKKTtlbHNle3ZhciBiPWgodCk7bnVsbCE9PWImJksoSCxiLnN0YXJ0VGltZS1hKX19CmZ1bmN0aW9uIEooYSxiKXtBPSExO0ImJihCPSExLEUoTCksTD0tMSk7ej0hMDt2YXIgYz15O3RyeXtHKGIpO2Zvcih2PWgocik7bnVsbCE9PXYmJighKHYuZXhwaXJhdGlvblRpbWU+Yil8fGEmJiFNKCkpOyl7dmFyIGQ9di5jYWxsYmFjaztpZigiZnVuY3Rpb24iPT09dHlwZW9mIGQpe3YuY2FsbGJhY2s9bnVsbDt5PXYucHJpb3JpdHlMZXZlbDt2YXIgZT1kKHYuZXhwaXJhdGlvblRpbWU8PWIpO2I9ZXhwb3J0cy51bnN0YWJsZV9ub3coKTsiZnVuY3Rpb24iPT09dHlwZW9mIGU/di5jYWxsYmFjaz1lOnY9PT1oKHIpJiZrKHIpO0coYil9ZWxzZSBrKHIpO3Y9aChyKX1pZihudWxsIT09dil2YXIgdz0hMDtlbHNle3ZhciBtPWgodCk7bnVsbCE9PW0mJksoSCxtLnN0YXJ0VGltZS1iKTt3PSExfXJldHVybiB3fWZpbmFsbHl7dj1udWxsLHk9Yyx6PSExfX12YXIgTj0hMSxPPW51bGwsTD0tMSxQPTUsUT0tMTsKZnVuY3Rpb24gTSgpe3JldHVybiBleHBvcnRzLnVuc3RhYmxlX25vdygpLVE8UD8hMTohMH1mdW5jdGlvbiBSKCl7aWYobnVsbCE9PU8pe3ZhciBhPWV4cG9ydHMudW5zdGFibGVfbm93KCk7UT1hO3ZhciBiPSEwO3RyeXtiPU8oITAsYSl9ZmluYWxseXtiP1MoKTooTj0hMSxPPW51bGwpfX1lbHNlIE49ITF9dmFyIFM7aWYoImZ1bmN0aW9uIj09PXR5cGVvZiBGKVM9ZnVuY3Rpb24oKXtGKFIpfTtlbHNlIGlmKCJ1bmRlZmluZWQiIT09dHlwZW9mIE1lc3NhZ2VDaGFubmVsKXt2YXIgVD1uZXcgTWVzc2FnZUNoYW5uZWwsVT1ULnBvcnQyO1QucG9ydDEub25tZXNzYWdlPVI7Uz1mdW5jdGlvbigpe1UucG9zdE1lc3NhZ2UobnVsbCl9fWVsc2UgUz1mdW5jdGlvbigpe0QoUiwwKX07ZnVuY3Rpb24gSShhKXtPPWE7Tnx8KE49ITAsUygpKX1mdW5jdGlvbiBLKGEsYil7TD1EKGZ1bmN0aW9uKCl7YShleHBvcnRzLnVuc3RhYmxlX25vdygpKX0sYil9CmV4cG9ydHMudW5zdGFibGVfSWRsZVByaW9yaXR5PTU7ZXhwb3J0cy51bnN0YWJsZV9JbW1lZGlhdGVQcmlvcml0eT0xO2V4cG9ydHMudW5zdGFibGVfTG93UHJpb3JpdHk9NDtleHBvcnRzLnVuc3RhYmxlX05vcm1hbFByaW9yaXR5PTM7ZXhwb3J0cy51bnN0YWJsZV9Qcm9maWxpbmc9bnVsbDtleHBvcnRzLnVuc3RhYmxlX1VzZXJCbG9ja2luZ1ByaW9yaXR5PTI7ZXhwb3J0cy51bnN0YWJsZV9jYW5jZWxDYWxsYmFjaz1mdW5jdGlvbihhKXthLmNhbGxiYWNrPW51bGx9O2V4cG9ydHMudW5zdGFibGVfY29udGludWVFeGVjdXRpb249ZnVuY3Rpb24oKXtBfHx6fHwoQT0hMCxJKEopKX07CmV4cG9ydHMudW5zdGFibGVfZm9yY2VGcmFtZVJhdGU9ZnVuY3Rpb24oYSl7MD5hfHwxMjU8YT9jb25zb2xlLmVycm9yKCJmb3JjZUZyYW1lUmF0ZSB0YWtlcyBhIHBvc2l0aXZlIGludCBiZXR3ZWVuIDAgYW5kIDEyNSwgZm9yY2luZyBmcmFtZSByYXRlcyBoaWdoZXIgdGhhbiAxMjUgZnBzIGlzIG5vdCBzdXBwb3J0ZWQiKTpQPTA8YT9NYXRoLmZsb29yKDFFMy9hKTo1fTtleHBvcnRzLnVuc3RhYmxlX2dldEN1cnJlbnRQcmlvcml0eUxldmVsPWZ1bmN0aW9uKCl7cmV0dXJuIHl9O2V4cG9ydHMudW5zdGFibGVfZ2V0Rmlyc3RDYWxsYmFja05vZGU9ZnVuY3Rpb24oKXtyZXR1cm4gaChyKX07ZXhwb3J0cy51bnN0YWJsZV9uZXh0PWZ1bmN0aW9uKGEpe3N3aXRjaCh5KXtjYXNlIDE6Y2FzZSAyOmNhc2UgMzp2YXIgYj0zO2JyZWFrO2RlZmF1bHQ6Yj15fXZhciBjPXk7eT1iO3RyeXtyZXR1cm4gYSgpfWZpbmFsbHl7eT1jfX07ZXhwb3J0cy51bnN0YWJsZV9wYXVzZUV4ZWN1dGlvbj1mdW5jdGlvbigpe307CmV4cG9ydHMudW5zdGFibGVfcmVxdWVzdFBhaW50PWZ1bmN0aW9uKCl7fTtleHBvcnRzLnVuc3RhYmxlX3J1bldpdGhQcmlvcml0eT1mdW5jdGlvbihhLGIpe3N3aXRjaChhKXtjYXNlIDE6Y2FzZSAyOmNhc2UgMzpjYXNlIDQ6Y2FzZSA1OmJyZWFrO2RlZmF1bHQ6YT0zfXZhciBjPXk7eT1hO3RyeXtyZXR1cm4gYigpfWZpbmFsbHl7eT1jfX07CmV4cG9ydHMudW5zdGFibGVfc2NoZWR1bGVDYWxsYmFjaz1mdW5jdGlvbihhLGIsYyl7dmFyIGQ9ZXhwb3J0cy51bnN0YWJsZV9ub3coKTsib2JqZWN0Ij09PXR5cGVvZiBjJiZudWxsIT09Yz8oYz1jLmRlbGF5LGM9Im51bWJlciI9PT10eXBlb2YgYyYmMDxjP2QrYzpkKTpjPWQ7c3dpdGNoKGEpe2Nhc2UgMTp2YXIgZT0tMTticmVhaztjYXNlIDI6ZT0yNTA7YnJlYWs7Y2FzZSA1OmU9MTA3Mzc0MTgyMzticmVhaztjYXNlIDQ6ZT0xRTQ7YnJlYWs7ZGVmYXVsdDplPTVFM31lPWMrZTthPXtpZDp1KyssY2FsbGJhY2s6Yixwcmlvcml0eUxldmVsOmEsc3RhcnRUaW1lOmMsZXhwaXJhdGlvblRpbWU6ZSxzb3J0SW5kZXg6LTF9O2M+ZD8oYS5zb3J0SW5kZXg9YyxmKHQsYSksbnVsbD09PWgocikmJmE9PT1oKHQpJiYoQj8oRShMKSxMPS0xKTpCPSEwLEsoSCxjLWQpKSk6KGEuc29ydEluZGV4PWUsZihyLGEpLEF8fHp8fChBPSEwLEkoSikpKTtyZXR1cm4gYX07CmV4cG9ydHMudW5zdGFibGVfc2hvdWxkWWllbGQ9TTtleHBvcnRzLnVuc3RhYmxlX3dyYXBDYWxsYmFjaz1mdW5jdGlvbihhKXt2YXIgYj15O3JldHVybiBmdW5jdGlvbigpe3ZhciBjPXk7eT1iO3RyeXtyZXR1cm4gYS5hcHBseSh0aGlzLGFyZ3VtZW50cyl9ZmluYWxseXt5PWN9fX07CgoKLyoqKi8gfSksCgovKioqLyA4NDA6Ci8qKiovICgobW9kdWxlLCBfX3VudXNlZF93ZWJwYWNrX2V4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pID0+IHsKCgoKaWYgKHRydWUpIHsKICBtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19yZXF1aXJlX18oNTMpOwp9IGVsc2Uge30KCgovKioqLyB9KQoKLyoqKioqKi8gCX0pOwovKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLwovKioqKioqLyAJLy8gVGhlIG1vZHVsZSBjYWNoZQovKioqKioqLyAJdmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9OwovKioqKioqLyAJCi8qKioqKiovIAkvLyBUaGUgcmVxdWlyZSBmdW5jdGlvbgovKioqKioqLyAJZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkgewovKioqKioqLyAJCS8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZQovKioqKioqLyAJCXZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdOwovKioqKioqLyAJCWlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkgewovKioqKioqLyAJCQlyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7Ci8qKioqKiovIAkJfQovKioqKioqLyAJCS8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpCi8qKioqKiovIAkJdmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7Ci8qKioqKiovIAkJCS8vIG5vIG1vZHVsZS5pZCBuZWVkZWQKLyoqKioqKi8gCQkJLy8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWQKLyoqKioqKi8gCQkJZXhwb3J0czoge30KLyoqKioqKi8gCQl9OwovKioqKioqLyAJCi8qKioqKiovIAkJLy8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uCi8qKioqKiovIAkJX193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7Ci8qKioqKiovIAkKLyoqKioqKi8gCQkvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZQovKioqKioqLyAJCXJldHVybiBtb2R1bGUuZXhwb3J0czsKLyoqKioqKi8gCX0KLyoqKioqKi8gCQovKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLwovKioqKioqLyAJLyogd2VicGFjay9ydW50aW1lL2NyZWF0ZSBmYWtlIG5hbWVzcGFjZSBvYmplY3QgKi8KLyoqKioqKi8gCSgoKSA9PiB7Ci8qKioqKiovIAkJdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mID8gKG9iaikgPT4gKE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopKSA6IChvYmopID0+IChvYmouX19wcm90b19fKTsKLyoqKioqKi8gCQl2YXIgbGVhZlByb3RvdHlwZXM7Ci8qKioqKiovIAkJLy8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0Ci8qKioqKiovIAkJLy8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0Ci8qKioqKiovIAkJLy8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zCi8qKioqKiovIAkJLy8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0Ci8qKioqKiovIAkJLy8gbW9kZSAmIDE2OiByZXR1cm4gdmFsdWUgd2hlbiBpdCdzIFByb21pc2UtbGlrZQovKioqKioqLyAJCS8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmUKLyoqKioqKi8gCQlfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkgewovKioqKioqLyAJCQlpZihtb2RlICYgMSkgdmFsdWUgPSB0aGlzKHZhbHVlKTsKLyoqKioqKi8gCQkJaWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTsKLyoqKioqKi8gCQkJaWYodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSkgewovKioqKioqLyAJCQkJaWYoKG1vZGUgJiA0KSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7Ci8qKioqKiovIAkJCQlpZigobW9kZSAmIDE2KSAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHZhbHVlOwovKioqKioqLyAJCQl9Ci8qKioqKiovIAkJCXZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7Ci8qKioqKiovIAkJCV9fd2VicGFja19yZXF1aXJlX18ucihucyk7Ci8qKioqKiovIAkJCXZhciBkZWYgPSB7fTsKLyoqKioqKi8gCQkJbGVhZlByb3RvdHlwZXMgPSBsZWFmUHJvdG90eXBlcyB8fCBbbnVsbCwgZ2V0UHJvdG8oe30pLCBnZXRQcm90byhbXSksIGdldFByb3RvKGdldFByb3RvKV07Ci8qKioqKiovIAkJCWZvcih2YXIgY3VycmVudCA9IG1vZGUgJiAyICYmIHZhbHVlOyB0eXBlb2YgY3VycmVudCA9PSAnb2JqZWN0JyAmJiAhfmxlYWZQcm90b3R5cGVzLmluZGV4T2YoY3VycmVudCk7IGN1cnJlbnQgPSBnZXRQcm90byhjdXJyZW50KSkgewovKioqKioqLyAJCQkJT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoY3VycmVudCkuZm9yRWFjaCgoa2V5KSA9PiAoZGVmW2tleV0gPSAoKSA9PiAodmFsdWVba2V5XSkpKTsKLyoqKioqKi8gCQkJfQovKioqKioqLyAJCQlkZWZbJ2RlZmF1bHQnXSA9ICgpID0+ICh2YWx1ZSk7Ci8qKioqKiovIAkJCV9fd2VicGFja19yZXF1aXJlX18uZChucywgZGVmKTsKLyoqKioqKi8gCQkJcmV0dXJuIG5zOwovKioqKioqLyAJCX07Ci8qKioqKiovIAl9KSgpOwovKioqKioqLyAJCi8qKioqKiovIAkvKiB3ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMgKi8KLyoqKioqKi8gCSgoKSA9PiB7Ci8qKioqKiovIAkJLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0cwovKioqKioqLyAJCV9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7Ci8qKioqKiovIAkJCWZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHsKLyoqKioqKi8gCQkJCWlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkgewovKioqKioqLyAJCQkJCU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7Ci8qKioqKiovIAkJCQl9Ci8qKioqKiovIAkJCX0KLyoqKioqKi8gCQl9OwovKioqKioqLyAJfSkoKTsKLyoqKioqKi8gCQovKioqKioqLyAJLyogd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCAqLwovKioqKioqLyAJKCgpID0+IHsKLyoqKioqKi8gCQlfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpCi8qKioqKiovIAl9KSgpOwovKioqKioqLyAJCi8qKioqKiovIAkvKiB3ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0ICovCi8qKioqKiovIAkoKCkgPT4gewovKioqKioqLyAJCS8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHMKLyoqKioqKi8gCQlfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4gewovKioqKioqLyAJCQlpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHsKLyoqKioqKi8gCQkJCU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pOwovKioqKioqLyAJCQl9Ci8qKioqKiovIAkJCU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7Ci8qKioqKiovIAkJfTsKLyoqKioqKi8gCX0pKCk7Ci8qKioqKiovIAkKLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8KdmFyIF9fd2VicGFja19leHBvcnRzX18gPSB7fTsKLy8gVGhpcyBlbnRyeSBuZWVkIHRvIGJlIHdyYXBwZWQgaW4gYW4gSUlGRSBiZWNhdXNlIGl0IG5lZWQgdG8gYmUgaXNvbGF0ZWQgYWdhaW5zdCBvdGhlciBtb2R1bGVzIGluIHRoZSBjaHVuay4KKCgpID0+IHsKX193ZWJwYWNrX3JlcXVpcmVfXy5yKF9fd2VicGFja19leHBvcnRzX18pOwovKiBoYXJtb255IGltcG9ydCAqLyB2YXIgX0FwcF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNDIpOwovKiBoYXJtb255IGltcG9ydCAqLyB2YXIgcmVhY3RfZG9tX2NsaWVudF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3NDUpOwovKiBoYXJtb255IGltcG9ydCAqLyB2YXIgcmVhY3RfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfXyA9IF9fd2VicGFja19yZXF1aXJlX18oMjk0KTsKZnVuY3Rpb24gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIobywgYWxsb3dBcnJheUxpa2UpIHt2YXIgaXQgPSB0eXBlb2YgU3ltYm9sICE9PSAidW5kZWZpbmVkIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0gfHwgb1siQEBpdGVyYXRvciJdO2lmICghaXQpIHtpZiAoQXJyYXkuaXNBcnJheShvKSB8fCAoaXQgPSBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobykpIHx8IGFsbG93QXJyYXlMaWtlICYmIG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSAibnVtYmVyIikge2lmIChpdCkgbyA9IGl0O3ZhciBpID0gMDt2YXIgRiA9IGZ1bmN0aW9uIEYoKSB7fTtyZXR1cm4geyBzOiBGLCBuOiBmdW5jdGlvbiBuKCkge2lmIChpID49IG8ubGVuZ3RoKSByZXR1cm4geyBkb25lOiB0cnVlIH07cmV0dXJuIHsgZG9uZTogZmFsc2UsIHZhbHVlOiBvW2krK10gfTt9LCBlOiBmdW5jdGlvbiBlKF9lKSB7dGhyb3cgX2U7fSwgZjogRiB9O310aHJvdyBuZXcgVHlwZUVycm9yKCJJbnZhbGlkIGF0dGVtcHQgdG8gaXRlcmF0ZSBub24taXRlcmFibGUgaW5zdGFuY2UuXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuIik7fXZhciBub3JtYWxDb21wbGV0aW9uID0gdHJ1ZSxkaWRFcnIgPSBmYWxzZSxlcnI7cmV0dXJuIHsgczogZnVuY3Rpb24gcygpIHtpdCA9IGl0LmNhbGwobyk7fSwgbjogZnVuY3Rpb24gbigpIHt2YXIgc3RlcCA9IGl0Lm5leHQoKTtub3JtYWxDb21wbGV0aW9uID0gc3RlcC5kb25lO3JldHVybiBzdGVwO30sIGU6IGZ1bmN0aW9uIGUoX2UyKSB7ZGlkRXJyID0gdHJ1ZTtlcnIgPSBfZTI7fSwgZjogZnVuY3Rpb24gZigpIHt0cnkge2lmICghbm9ybWFsQ29tcGxldGlvbiAmJiBpdFsicmV0dXJuIl0gIT0gbnVsbCkgaXRbInJldHVybiJdKCk7fSBmaW5hbGx5IHtpZiAoZGlkRXJyKSB0aHJvdyBlcnI7fX0gfTt9ZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge2lmICghbykgcmV0dXJuO2lmICh0eXBlb2YgbyA9PT0gInN0cmluZyIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO3ZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtpZiAobiA9PT0gIk9iamVjdCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTtpZiAobiA9PT0gIk1hcCIgfHwgbiA9PT0gIlNldCIpIHJldHVybiBBcnJheS5mcm9tKG8pO2lmIChuID09PSAiQXJndW1lbnRzIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7fWZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7aWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7Zm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7YXJyMltpXSA9IGFycltpXTt9cmV0dXJuIGFycjI7fQoKCgoKCmdldERhdGEoZnVuY3Rpb24gKHBhZ2VzKSB7dmFyIF9pdGVyYXRvciA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyKAogICAgcGFnZXMpLF9zdGVwO3RyeSB7Zm9yIChfaXRlcmF0b3IucygpOyAhKF9zdGVwID0gX2l0ZXJhdG9yLm4oKSkuZG9uZTspIHt2YXIgcGFnZSA9IF9zdGVwLnZhbHVlOwogICAgICBmb3IgKHZhciBfaSA9IDAsIF9hcnIgPSBwYWdlLmNvbXBvbmVudHM7IF9pIDwgX2Fyci5sZW5ndGg7IF9pKyspIHt2YXIgY29tcG9uZW50ID0gX2FycltfaV07CiAgICAgICAgY29tcG9uZW50LnByZXZpb3VzVmFsdWUgPSBjb21wb25lbnQudmFsdWU7CgogICAgICAgIGlmIChjb21wb25lbnQudmFsaWRhdGUgIT0gbnVsbCkgewogICAgICAgICAgY29tcG9uZW50LnZhbGlkYXRlID0gZXZhbChjb21wb25lbnQudmFsaWRhdGUpOwogICAgICAgIH0KICAgICAgfQogICAgfX0gY2F0Y2ggKGVycikge19pdGVyYXRvci5lKGVycik7fSBmaW5hbGx5IHtfaXRlcmF0b3IuZigpO30KCiAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJyb290Iik7CiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb24KICB2YXIgcm9vdCA9ICgwLHJlYWN0X2RvbV9jbGllbnRfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXy8qIC5jcmVhdGVSb290ICovIC5zKShjb250YWluZXIpOwogIHJvb3QucmVuZGVyKCAvKiNfX1BVUkVfXyovcmVhY3RfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfXy5jcmVhdGVFbGVtZW50KF9BcHBfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIFsiZGVmYXVsdCJdICovIC5aLCB7IHBhZ2VzOiBwYWdlcyB9KSk7Cn0pOwp9KSgpOwoKLyoqKioqKi8gCXJldHVybiBfX3dlYnBhY2tfZXhwb3J0c19fOwovKioqKioqLyB9KSgpCjsKfSk7";/***/},/***/171:/***/module=>{module.exports="#relayContainer{margin:1rem;font-family:Arial,Helvetica,sans-serif}#notificationsContainer{pointer-events:none;position:fixed;top:5%;left:70%;transform:translateX(-50%);z-index:999}img{display:block;margin:auto}input.stringcontainer{background-color:#fff;border-radius:5px;border:1px solid #121943;height:24px;margin:auto;display:flex;padding-left:5px}input.interrupt{width:100%;border-color:darkred;background-color:#f1948a;color:darkred;margin:10px 0px;cursor:pointer}input.interrupt:hover{background-color:#f5867a}input.interrupt:active{background-color:#f77163}input.save,input.interrupt{margin:auto;display:block;font-size:x-large;padding:5px 25px;border-radius:10px}.notification{border:3px solid #00529b;background-color:#bde5f8;width:fit-content;margin-right:auto;margin-left:auto;border-radius:40px;color:#00529b;padding:7px 60px;animation:2s fadeOut 5s 1 forwards;cursor:default;pointer-events:auto}@keyframes fadeOut{0%{opacity:1}99%{height:100%}100%{opacity:0;height:0}}td{padding:.5rem}.toggle{align-items:center;border-radius:100px;display:flex;font-weight:700;margin-bottom:16px}.toggle:last-of-type{margin:0}.toggle__input{clip:rect(0 0 0 0);clip-path:inset(50%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px}.toggle__input:not([disabled]):active+.toggle-track,.toggle__input:not([disabled]):focus+.toggle-track{border:1px solid rgba(0,0,0,0);box-shadow:0px 0px 0px 2px #121943}.toggle__input:disabled+.toggle-track{cursor:not-allowed;opacity:.7}.toggle-track{background:#fff;border:1px solid #5a72b5;border-radius:100px;cursor:pointer;display:flex;height:30px;margin:auto;position:relative;width:60px}.toggle-indicator{align-items:center;background:#121943;border-radius:24px;bottom:2px;display:flex;height:24px;justify-content:center;left:2px;outline:solid 2px rgba(0,0,0,0);position:absolute;transition:.4s;width:24px}.checkMark{fill:#fff;height:20px;width:20px;opacity:0;transition:opacity .4s ease-in-out}.dropdowncontainer{padding:8px 16px;border:1px solid rgba(0,0,0,0);border-color:#000}input[value=true]+.toggle-track .toggle-indicator{background:#121943;transform:translateX(30px)}input[value=true]+.toggle-track .toggle-indicator .checkMark{opacity:1;transition:opacity .4s ease-in-out}@media screen and (-ms-high-contrast: active){.toggle-track{border-radius:0;background-color:red}}.topBar{display:flex}.tabEntry{margin-right:10px;border-radius:10px;background-color:#333}.tabEntry a{display:block;color:#fff;text-align:center;padding:6px;text-decoration:none}.tabEntry a[aria-current=page]{background-color:#00529b;border-radius:10px}.tabEntry a:hover[aria-current=page]{background-color:#002c53;border-radius:10px}.tabEntry a:hover{background-color:#111;border-radius:10px}.setting{position:relative}.setting .settingNameHover{visibility:hidden;background-color:#cacaca;color:#000;text-align:center;border-radius:6px;border-color:#000;position:absolute;z-index:1}.setting:hover .settingNameHover{visibility:visible;padding:5px;margin-left:15px}.hoverBox{position:relative;white-space:nowrap}.settingInput .settingDefaultHover{visibility:hidden;color:#666;position:absolute;z-index:1;left:50%;transform:translateX(-50%)}.settingInput:hover .settingDefaultHover{visibility:visible}.invalid-setting input,.invalid-setting select,.invalid-setting .toggle-track{background:pink !important}.invalid-reason{text-align:center}.invalid-reason small{padding:0px 5px;border-radius:10px;color:red}\n";/***/},/***/530:/***/module=>{module.exports=__webpack_require__(7530);/***/}/******/};/************************************************************************/ /******/ // The module cache
/******/var __webpack_module_cache__={};/******/ /******/ // The require function
/******/function __nested_webpack_require_494289__(moduleId){/******/ // Check if module is in cache
/******/var cachedModule=__webpack_module_cache__[moduleId];/******/if(cachedModule!==undefined){/******/return cachedModule.exports;/******/}/******/ // Create a new module (and put it into the cache)
/******/var module=__webpack_module_cache__[moduleId]={/******/ // no module.id needed
/******/ // no module.loaded needed
/******/exports:{}/******/};/******/ /******/ // Execute the module function
/******/__webpack_modules__[moduleId](module,module.exports,__nested_webpack_require_494289__);/******/ /******/ // Return the exports of the module
/******/return module.exports;/******/}/******/ /************************************************************************/ /******/ /* webpack/runtime/compat get default export */ /******/(()=>{/******/ // getDefaultExport function for compatibility with non-harmony modules
/******/__nested_webpack_require_494289__.n=module=>{/******/var getter=module&&module.__esModule?/******/()=>module['default']:/******/()=>module;/******/__nested_webpack_require_494289__.d(getter,{a:getter});/******/return getter;/******/};/******/})();/******/ /******/ /* webpack/runtime/define property getters */ /******/(()=>{/******/ // define getter functions for harmony exports
/******/__nested_webpack_require_494289__.d=(exports,definition)=>{/******/for(var key in definition){/******/if(__nested_webpack_require_494289__.o(definition,key)&&!__nested_webpack_require_494289__.o(exports,key)){/******/Object.defineProperty(exports,key,{enumerable:true,get:definition[key]});/******/}/******/}/******/};/******/})();/******/ /******/ /* webpack/runtime/hasOwnProperty shorthand */ /******/(()=>{/******/__nested_webpack_require_494289__.o=(obj,prop)=>Object.prototype.hasOwnProperty.call(obj,prop);/******/})();/******/ /******/ /* webpack/runtime/make namespace object */ /******/(()=>{/******/ // define __esModule on exports
/******/__nested_webpack_require_494289__.r=exports=>{/******/if(typeof Symbol!=='undefined'&&Symbol.toStringTag){/******/Object.defineProperty(exports,Symbol.toStringTag,{value:'Module'});/******/}/******/Object.defineProperty(exports,'__esModule',{value:true});/******/};/******/})();/******/ /************************************************************************/var __webpack_exports__={};// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(()=>{__nested_webpack_require_494289__.r(__webpack_exports__);/* harmony export */__nested_webpack_require_494289__.d(__webpack_exports__,{/* harmony export */"generateHTML":()=>/* binding */_generateHTML,/* harmony export */"getPagePath":()=>/* binding */_getPagePath,/* harmony export */"handleApiRequest":()=>/* binding */_handleApiRequest,/* harmony export */"parseCssFromFile":()=>/* binding */_parseCssFromFile,/* harmony export */"parsePageFromFile":()=>/* binding */_parsePageFromFile,/* harmony export */"parsePageFromJson":()=>/* binding */_parsePageFromJson/* harmony export */});/* harmony import */var kolmafia__WEBPACK_IMPORTED_MODULE_0__=__nested_webpack_require_494289__(530);/* harmony import */var kolmafia__WEBPACK_IMPORTED_MODULE_0___default=/*#__PURE__*/__nested_webpack_require_494289__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||_unsupportedIterableToArray(arr)||_nonIterableSpread();}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArray(iter){if(typeof Symbol!=="undefined"&&iter[Symbol.iterator]!=null||iter["@@iterator"]!=null)return Array.from(iter);}function _arrayWithoutHoles(arr){if(Array.isArray(arr))return _arrayLikeToArray(arr);}function _slicedToArray(arr,i){return _arrayWithHoles(arr)||_iterableToArrayLimit(arr,i)||_unsupportedIterableToArray(arr,i)||_nonIterableRest();}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr,i){var _i=arr==null?null:typeof Symbol!=="undefined"&&arr[Symbol.iterator]||arr["@@iterator"];if(_i==null)return;var _arr=[];var _n=true;var _d=false;var _s,_e;try{for(_i=_i.call(arr);!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally{try{if(!_n&&_i["return"]!=null)_i["return"]();}finally{if(_d)throw _e;}}return _arr;}function _arrayWithHoles(arr){if(Array.isArray(arr))return arr;}function _createForOfIteratorHelper(o,allowArrayLike){var it=typeof Symbol!=="undefined"&&o[Symbol.iterator]||o["@@iterator"];if(!it){if(Array.isArray(o)||(it=_unsupportedIterableToArray(o))||allowArrayLike&&o&&typeof o.length==="number"){if(it)o=it;var i=0;var F=function F(){};return{s:F,n:function n(){if(i>=o.length)return{done:true};return{done:false,value:o[i++]};},e:function e(_e2){throw _e2;},f:F};}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion=true,didErr=false,err;return{s:function s(){it=it.call(o);},n:function n(){var step=it.next();normalCompletion=step.done;return step;},e:function e(_e3){didErr=true;err=_e3;},f:function f(){try{if(!normalCompletion&&it.return!=null)it.return();}finally{if(didErr)throw err;}}};}function _unsupportedIterableToArray(o,minLen){if(!o)return;if(typeof o==="string")return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(o);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen);}function _arrayLikeToArray(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++){arr2[i]=arr[i];}return arr2;}function _handleApiRequest(){if(handleJavascript()){return true;}if(handleProperties()){return true;}return false;}function handleProperties(){var toSet=(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.formFields)()["setProperties"];if(toSet==null){return false;}var props=JSON.parse(toSet);var notifications=[];var _iterator=_createForOfIteratorHelper(props),_step;try{for(_iterator.s();!(_step=_iterator.n()).done;){var _step$value=_slicedToArray(_step.value,2),key=_step$value[0],value=_step$value[1];var prevValue=(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)(key);if(prevValue===value){continue;}(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.setProperty)(key,value);notifications.push("".concat(key," changed from `").concat(prevValue,"` to `").concat(value,"`"));}}catch(err){_iterator.e(err);}finally{_iterator.f();}if(notifications.length==0){notifications.push("No settings were modified.");}// We include the ' ' because otherwise the browser doesn't like an empty page
(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.write)(JSON.stringify(notifications));return true;}function handleJavascript(){var js=(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.formFields)()["javascript"];if(js==null){return false;}var returns=eval(js)||"";// We include the ' ' because otherwise the browser doesn't like an empty page
(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.write)(returns+(returns?"":" "));return true;}function validateComponents(components){var _iterator2=_createForOfIteratorHelper(components),_step2;try{for(_iterator2.s();!(_step2=_iterator2.n()).done;){var _button$name;var component=_step2.value;var button=component;if(button.preference==null){continue;}button.name=(_button$name=button.name)!==null&&_button$name!==void 0?_button$name:button.preference;if(button.validate!=null){try{eval(button.validate);}catch(e){(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Unable to load ".concat(button.name,"'s validator '").concat(button.validate,"'"));button.validate=null;}}if(button.default!=undefined&&typeof button.default!="string"){button.default=button.default+"";}if(button.value!=undefined&&typeof button.value!="string"){button.value=button.value+"";}if(button.default==null&&button.type=="boolean"){button.default="true";}if(button.value!=null){continue;}var val=void 0;if((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.propertyExists)(button.preference)){val=(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)(button.preference);}else if(button.default!=null){val=button.default;}else{if(button.type=="dropdown"){val=button.dropdown[0].value;}else if(button.type=="boolean"){val="true";}else{val="";}}button.value=val;}}catch(err){_iterator2.e(err);}finally{_iterator2.f();}}function _generateHTML(pages,extraHtml){pages=pages.filter(p=>p!=null);var _iterator3=_createForOfIteratorHelper(pages),_step3;try{for(_iterator3.s();!(_step3=_iterator3.n()).done;){var _page$file;var page=_step3.value;page.file=(_page$file=page.file)!==null&&_page$file!==void 0?_page$file:page.page;validateComponents(page.components);}}catch(err){_iterator3.e(err);}finally{_iterator3.f();}var buffer=[];var cssFiles=[];if(extraHtml&&extraHtml.cssFiles){cssFiles.push.apply(cssFiles,_toConsumableArray(extraHtml.cssFiles));}buffer.push("<head>");cssFiles.forEach(s=>{buffer.push("<link rel=\"stylesheet\" src=\"".concat(s,"\">"));});buffer.push("<style>");buffer.push("".concat(__nested_webpack_require_494289__(171)));if(extraHtml&&extraHtml.css){buffer.push(extraHtml.css);}buffer.push("</style>");buffer.push("</head>");buffer.push('<div id="root"></div>');buffer.push("<script>");// add script that react calls when loaded to get kol data
buffer.push("let getData = function(callback) {callback(".concat(JSON.stringify(pages),")}"));// close notifications when they are clicked on
buffer.push("document.onclick = (e) => {\n    if(e.target.classList.contains('notification')) e.target.remove();\n  }");buffer.push("</script>");// include react script
buffer.push("<script src=\"".concat(__nested_webpack_require_494289__(447),"\"></script>"));return buffer.join("\n");}function _getPagePath(file){var fileName=file.includes("/")?file:"relay/shared_relay/pages/"+file+".json";if(!fileName.endsWith(".json")&&(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.fileToBuffer)(fileName).length==0){fileName+=".json";}return fileName;}/**
 * Parses from relay/shared_relay/pages/ if no slashes are in the name, otherwise expects a valid json file
 */function _parsePageFromFile(file){var data=(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.fileToBuffer)(_getPagePath(file));return _parsePageFromJson(file,data);}function _parseCssFromFile(file){var fileName=file.includes("/")?file:"shared_relay/pages/"+file+".css";if(!fileName.endsWith(".css")){fileName+=".css";}var data=(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.fileToBuffer)(fileName);if(data.length==0){return null;}return fileName;}function _parsePageFromJson(id,jsonData){if(jsonData.length==0){return null;}var subpage=JSON.parse(jsonData);subpage.file=id;for(var _i2=0,_arr2=subpage.components;_i2<_arr2.length;_i2++){var _button$dropdown;var button=_arr2[_i2];if(button.type!="dropdown"){continue;}if(button.dropdown==null){button.dropdown=[];}else if(typeof button.dropdown[0]=="string"){button.dropdown=button.dropdown.map(s=>{return{display:s,value:s};});}if(button.dropdownFiller==null){continue;}var data=eval(button.dropdownFiller).map(_ref=>{var _ref2=_slicedToArray(_ref,2),display=_ref2[0],value=_ref2[1];return{display:display,value:value};});(_button$dropdown=button.dropdown).push.apply(_button$dropdown,_toConsumableArray(data));}return subpage;}})();var __webpack_export_target__=exports;for(var i in __webpack_exports__){__webpack_export_target__[i]=__webpack_exports__[i];}if(__webpack_exports__.__esModule)Object.defineProperty(__webpack_export_target__,"__esModule",{value:true});/******/})();

/***/ }),

/***/ 7530:
/***/ ((module) => {

"use strict";
module.exports = require("kolmafia");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "main": () => (/* binding */ main)
});

// EXTERNAL MODULE: external "kolmafia"
var external_kolmafia_ = __webpack_require__(7530);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.entries.js
var es_object_entries = __webpack_require__(6737);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.from-entries.js
var es_object_from_entries = __webpack_require__(5809);
;// CONCATENATED MODULE: ./node_modules/libram/dist/propertyTypes.js
/** THIS FILE IS AUTOMATICALLY GENERATED. See tools/parseDefaultProperties.ts for more information */
var booleanProperties = ["abortOnChoiceWhenNotInChoice", "addChatCommandLine", "addCreationQueue", "addStatusBarToFrames", "allowCloseableDesktopTabs", "allowNegativeTally", "allowNonMoodBurning", "allowSummonBurning", "autoHighlightOnFocus", "broadcastEvents", "cacheMallSearches", "chatBeep", "chatLinksUseRelay", "compactChessboard", "copyAsHTML", "customizedTabs", "debugBuy", "debugConsequences", "debugFoxtrotRemoval", "debugPathnames", "gapProtection", "gitInstallDependencies", "gitShowCommitMessages", "gitUpdateOnLogin", "greenScreenProtection", "guiUsesOneWindow", "hideServerDebugText", "logAcquiredItems", "logBattleAction", "logBrowserInteractions", "logChatMessages", "logChatRequests", "logCleanedHTML", "logDecoratedResponses", "logFamiliarActions", "logGainMessages", "logReadableHTML", "logPreferenceChange", "logMonsterHealth", "logReverseOrder", "logStatGains", "logStatusEffects", "logStatusOnLogin", "macroDebug", "macroLens", "mementoListActive", "mergeHobopolisChat", "printStackOnAbort", "proxySet", "relayAddSounds", "relayAddsCustomCombat", "relayAddsDiscoHelper", "relayAddsGraphicalCLI", "relayAddsQuickScripts", "relayAddsRestoreLinks", "relayAddsUpArrowLinks", "relayAddsUseLinks", "relayAddsWikiLinks", "relayAllowRemoteAccess", "relayBrowserOnly", "relayCacheUncacheable", "relayFormatsChatText", "relayHidesJunkMallItems", "relayMaintainsEffects", "relayMaintainsHealth", "relayMaintainsMana", "relayOverridesImages", "relayRunsAfterAdventureScript", "relayRunsBeforeBattleScript", "relayRunsBeforePVPScript", "relayScriptButtonFirst", "relayTextualizesEffects", "relayTrimsZapList", "relayUsesInlineLinks", "relayUsesIntegratedChat", "relayWarnOnRecoverFailure", "removeMalignantEffects", "saveSettingsOnSet", "sharePriceData", "showAllRequests", "showExceptionalRequests", "stealthLogin", "svnInstallDependencies", "svnShowCommitMessages", "svnUpdateOnLogin", "switchEquipmentForBuffs", "syncAfterSvnUpdate", "useChatToolbar", "useContactsFrame", "useDevProxyServer", "useDockIconBadge", "useHugglerChannel", "useImageCache", "useLastUserAgent", "useSystemTrayIcon", "useTabbedChatFrame", "useToolbars", "useCachedVolcanoMaps", "useZoneComboBox", "verboseSpeakeasy", "verboseFloundry", "wrapLongLines", "_gitUpdated", "_svnRepoFileFetched", "_svnUpdated", "antagonisticSnowmanKitAvailable", "arcadeGameHints", "armoryUnlocked", "autoForbidIgnoringStores", "autoCraft", "autoQuest", "autoEntangle", "autoGarish", "autoManaRestore", "autoFillMayoMinder", "autoPinkyRing", "autoPlantHardcore", "autoPlantSoftcore", "autoPotionID", "autoRepairBoxServants", "autoSatisfyWithCloset", "autoSatisfyWithCoinmasters", "autoSatisfyWithMall", "autoSatisfyWithNPCs", "autoSatisfyWithStash", "autoSatisfyWithStorage", "autoSetConditions", "autoSteal", "autoTuxedo", "backupCameraReverserEnabled", "badMoonEncounter01", "badMoonEncounter02", "badMoonEncounter03", "badMoonEncounter04", "badMoonEncounter05", "badMoonEncounter06", "badMoonEncounter07", "badMoonEncounter08", "badMoonEncounter09", "badMoonEncounter10", "badMoonEncounter11", "badMoonEncounter12", "badMoonEncounter13", "badMoonEncounter14", "badMoonEncounter15", "badMoonEncounter16", "badMoonEncounter17", "badMoonEncounter18", "badMoonEncounter19", "badMoonEncounter20", "badMoonEncounter21", "badMoonEncounter22", "badMoonEncounter23", "badMoonEncounter24", "badMoonEncounter25", "badMoonEncounter26", "badMoonEncounter27", "badMoonEncounter28", "badMoonEncounter29", "badMoonEncounter30", "badMoonEncounter31", "badMoonEncounter32", "badMoonEncounter33", "badMoonEncounter34", "badMoonEncounter35", "badMoonEncounter36", "badMoonEncounter37", "badMoonEncounter38", "badMoonEncounter39", "badMoonEncounter40", "badMoonEncounter41", "badMoonEncounter42", "badMoonEncounter43", "badMoonEncounter44", "badMoonEncounter45", "badMoonEncounter46", "badMoonEncounter47", "badMoonEncounter48", "barrelShrineUnlocked", "bigBrotherRescued", "blackBartsBootyAvailable", "bondAdv", "bondBeach", "bondBeat", "bondBooze", "bondBridge", "bondDesert", "bondDR", "bondDrunk1", "bondDrunk2", "bondHoney", "bondHP", "bondInit", "bondItem1", "bondItem2", "bondItem3", "bondJetpack", "bondMartiniDelivery", "bondMartiniPlus", "bondMartiniTurn", "bondMeat", "bondMox1", "bondMox2", "bondMPregen", "bondMus1", "bondMus2", "bondMys1", "bondMys2", "bondSpleen", "bondStat", "bondStat2", "bondStealth", "bondStealth2", "bondSymbols", "bondWar", "bondWeapon2", "bondWpn", "booPeakLit", "bootsCharged", "breakfastCompleted", "burrowgrubHiveUsed", "calzoneOfLegendEaten", "canteenUnlocked", "chaosButterflyThrown", "chatbotScriptExecuted", "chateauAvailable", "chatLiterate", "chatServesUpdates", "checkJackassHardcore", "checkJackassSoftcore", "clanAttacksEnabled", "coldAirportAlways", "considerShadowNoodles", "controlRoomUnlock", "concertVisited", "controlPanel1", "controlPanel2", "controlPanel3", "controlPanel4", "controlPanel5", "controlPanel6", "controlPanel7", "controlPanel8", "controlPanel9", "corralUnlocked", "dailyDungeonDone", "dampOldBootPurchased", "daycareOpen", "deepDishOfLegendEaten", "demonSummoned", "dinseyAudienceEngagement", "dinseyGarbagePirate", "dinseyRapidPassEnabled", "dinseyRollercoasterNext", "dinseySafetyProtocolsLoose", "doghouseBoarded", "dontStopForCounters", "drippingHallUnlocked", "drippyShieldUnlocked", "edUsedLash", "eldritchFissureAvailable", "eldritchHorrorAvailable", "essenceOfAnnoyanceAvailable", "essenceOfBearAvailable", "expressCardUsed", "falloutShelterChronoUsed", "falloutShelterCoolingTankUsed", "fireExtinguisherBatHoleUsed", "fireExtinguisherChasmUsed", "fireExtinguisherCyrptUsed", "fireExtinguisherDesertUsed", "fireExtinguisherHaremUsed", "fistTeachingsHaikuDungeon", "fistTeachingsPokerRoom", "fistTeachingsBarroomBrawl", "fistTeachingsConservatory", "fistTeachingsBatHole", "fistTeachingsFunHouse", "fistTeachingsMenagerie", "fistTeachingsSlums", "fistTeachingsFratHouse", "fistTeachingsRoad", "fistTeachingsNinjaSnowmen", "flickeringPixel1", "flickeringPixel2", "flickeringPixel3", "flickeringPixel4", "flickeringPixel5", "flickeringPixel6", "flickeringPixel7", "flickeringPixel8", "frAlways", "frCemetaryUnlocked", "friarsBlessingReceived", "frMountainsUnlocked", "frSwampUnlocked", "frVillageUnlocked", "frWoodUnlocked", "getawayCampsiteUnlocked", "ghostPencil1", "ghostPencil2", "ghostPencil3", "ghostPencil4", "ghostPencil5", "ghostPencil6", "ghostPencil7", "ghostPencil8", "ghostPencil9", "gingerAdvanceClockUnlocked", "gingerBlackmailAccomplished", "gingerbreadCityAvailable", "gingerExtraAdventures", "gingerNegativesDropped", "gingerSewersUnlocked", "gingerSubwayLineUnlocked", "gingerRetailUnlocked", "glitchItemAvailable", "grabCloversHardcore", "grabCloversSoftcore", "guideToSafariAvailable", "guyMadeOfBeesDefeated", "hallowienerDefiledNook", "hallowienerGuanoJunction", "hallowienerKnollGym", "hallowienerMadnessBakery", "hallowienerMiddleChamber", "hallowienerOvergrownLot", "hallowienerSkeletonStore", "hallowienerSmutOrcs", "hallowienerSonofaBeach", "hallowienerVolcoino", "hardcorePVPWarning", "harvestBatteriesHardcore", "harvestBatteriesSoftcore", "hasAutumnaton", "hasBartender", "hasChef", "hasCocktailKit", "hasCosmicBowlingBall", "hasDetectiveSchool", "hasMaydayContract", "hasOven", "hasRange", "hasShaker", "hasSushiMat", "haveBoxingDaydreamHardcore", "haveBoxingDaydreamSoftcore", "hermitHax0red", "holidayHalsBookAvailable", "horseryAvailable", "hotAirportAlways", "implementGlitchItem", "intenseCurrents", "itemBoughtPerAscension637", "itemBoughtPerAscension8266", "itemBoughtPerAscension10790", "itemBoughtPerAscension10794", "itemBoughtPerAscension10795", "itemBoughtPerCharacter6423", "itemBoughtPerCharacter6428", "itemBoughtPerCharacter6429", "kingLiberated", "lastPirateInsult1", "lastPirateInsult2", "lastPirateInsult3", "lastPirateInsult4", "lastPirateInsult5", "lastPirateInsult6", "lastPirateInsult7", "lastPirateInsult8", "lawOfAveragesAvailable", "leafletCompleted", "libraryCardUsed", "lockPicked", "logBastilleBattalionBattles", "loginRecoveryHardcore", "loginRecoverySoftcore", "lovebugsUnlocked", "loveTunnelAvailable", "lowerChamberUnlock", "madnessBakeryAvailable", "makePocketWishesHardcore", "makePocketWishesSoftcore", "manualOfNumberologyAvailable", "mappingMonsters", "mapToAnemoneMinePurchased", "mapToKokomoAvailable", "mapToMadnessReefPurchased", "mapToTheDiveBarPurchased", "mapToTheMarinaraTrenchPurchased", "mapToTheSkateParkPurchased", "maraisBeaverUnlock", "maraisCorpseUnlock", "maraisDarkUnlock", "maraisVillageUnlock", "maraisWildlifeUnlock", "maraisWizardUnlock", "maximizerAlwaysCurrent", "maximizerCreateOnHand", "maximizerCurrentMallPrices", "maximizerFoldables", "maximizerIncludeAll", "maximizerNoAdventures", "middleChamberUnlock", "milkOfMagnesiumActive", "moonTuned", "neverendingPartyAlways", "odeBuffbotCheck", "oilPeakLit", "oscusSodaUsed", "outrageousSombreroUsed", "overgrownLotAvailable", "ownsSpeakeasy", "pathedSummonsHardcore", "pathedSummonsSoftcore", "pizzaOfLegendEaten", "popularTartUnlocked", "potatoAlarmClockUsed", "prAlways", "prayedForGlamour", "prayedForProtection", "prayedForVigor", "primaryLabCheerCoreGrabbed", "pyramidBombUsed", "ROMOfOptimalityAvailable", "rageGlandVented", "readManualHardcore", "readManualSoftcore", "relayShowSpoilers", "relayShowWarnings", "rememberDesktopSize", "restUsingChateau", "restUsingCampAwayTent", "requireBoxServants", "requireSewerTestItems", "safePickpocket", "schoolOfHardKnocksDiplomaAvailable", "scriptCascadingMenus", "serverAddsCustomCombat", "SHAWARMAInitiativeUnlocked", "showForbiddenStores", "showGainsPerUnit", "showIgnoringStorePrices", "showNoSummonOnly", "showTurnFreeOnly", "skeletonStoreAvailable", "sleazeAirportAlways", "snojoAvailable", "sortByRoom", "spacegateAlways", "spacegateVaccine1", "spacegateVaccine2", "spacegateVaccine3", "spaceInvaderDefeated", "spelunkyHints", "spiceMelangeUsed", "spookyAirportAlways", "stenchAirportAlways", "stopForFixedWanderer", "stopForUltraRare", "styxPixieVisited", "suppressInappropriateNags", "suppressPowerPixellation", "suppressMallPriceCacheMessages", "telegraphOfficeAvailable", "telescopeLookedHigh", "timeTowerAvailable", "trackLightsOut", "uneffectWithHotTub", "universalSeasoningActive", "universalSeasoningAvailable", "useBookOfEverySkillHardcore", "useBookOfEverySkillSoftcore", "useCrimboToysHardcore", "useCrimboToysSoftcore", "verboseMaximizer", "visitLoungeHardcore", "visitLoungeSoftcore", "visitRumpusHardcore", "visitRumpusSoftcore", "voteAlways", "wildfireBarrelCaulked", "wildfireDusted", "wildfireFracked", "wildfirePumpGreased", "wildfireSprinkled", "yearbookCameraPending", "youRobotScavenged", "_affirmationCookieEaten", "_affirmationHateUsed", "_airFryerUsed", "_akgyxothUsed", "_alienAnimalMilkUsed", "_alienPlantPodUsed", "_allYearSucker", "_aprilShower", "_armyToddlerCast", "_authorsInkUsed", "_baconMachineUsed", "_bagOfCandy", "_bagOfCandyUsed", "_bagOTricksUsed", "_ballastTurtleUsed", "_ballInACupUsed", "_ballpit", "_barrelPrayer", "_bastilleLastBattleWon", "_beachCombing", "_bendHellUsed", "_blankoutUsed", "_bonersSummoned", "_bookOfEverySkillUsed", "_borrowedTimeUsed", "_bowleggedSwaggerUsed", "_bowlFullOfJellyUsed", "_boxOfHammersUsed", "_brainPreservationFluidUsed", "_brassDreadFlaskUsed", "_cameraUsed", "_canSeekBirds", "_carboLoaded", "_cargoPocketEmptied", "_ceciHatUsed", "_chateauDeskHarvested", "_chateauMonsterFought", "_chronerCrossUsed", "_chronerTriggerUsed", "_chubbyAndPlumpUsed", "_circleDrumUsed", "_clanFortuneBuffUsed", "_claraBellUsed", "_coalPaperweightUsed", "_cocoaDispenserUsed", "_cocktailShakerUsed", "_coldAirportToday", "_coldOne", "_communismUsed", "_confusingLEDClockUsed", "_controlPanelUsed", "_cookbookbatRecipeDrops", "_corruptedStardustUsed", "_cosmicSixPackConjured", "_crappyCameraUsed", "_creepyVoodooDollUsed", "_crimboTree", "_cursedKegUsed", "_cursedMicrowaveUsed", "_dailyDungeonMalwareUsed", "_darkChocolateHeart", "_daycareFights", "_daycareNap", "_daycareSpa", "_daycareToday", "_defectiveTokenChecked", "_defectiveTokenUsed", "_dinseyGarbageDisposed", "_discoKnife", "_distentionPillUsed", "_dnaHybrid", "_docClocksThymeCocktailDrunk", "_drippingHallDoor1", "_drippingHallDoor2", "_drippingHallDoor3", "_drippingHallDoor4", "_drippyCaviarUsed", "_drippyNuggetUsed", "_drippyPilsnerUsed", "_drippyPlumUsed", "_drippyWineUsed", "_eldritchHorrorEvoked", "_eldritchTentacleFought", "_entauntaunedToday", "_envyfishEggUsed", "_essentialTofuUsed", "_etchedHourglassUsed", "_eternalCarBatteryUsed", "_everfullGlassUsed", "_eyeAndATwistUsed", "_fancyChessSetUsed", "_falloutShelterSpaUsed", "_fancyHotDogEaten", "_farmerItemsCollected", "_favoriteBirdVisited", "_firedJokestersGun", "_fireExtinguisherRefilled", "_fireStartingKitUsed", "_fireworksShop", "_fireworksShopHatBought", "_fireworksShopEquipmentBought", "_fireworkUsed", "_fishyPipeUsed", "_floundryItemCreated", "_floundryItemUsed", "_freePillKeeperUsed", "_frToday", "_fudgeSporkUsed", "_garbageItemChanged", "_gingerBiggerAlligators", "_gingerbreadCityToday", "_gingerbreadClockAdvanced", "_gingerbreadClockVisited", "_gingerbreadColumnDestroyed", "_gingerbreadMobHitUsed", "_glennGoldenDiceUsed", "_glitchItemImplemented", "_gnollEyeUsed", "_governmentPerDiemUsed", "_grimBuff", "_guildManualUsed", "_guzzlrQuestAbandoned", "_hardKnocksDiplomaUsed", "_hippyMeatCollected", "_hobbyHorseUsed", "_holidayFunUsed", "_holoWristCrystal", "_hotAirportToday", "_hungerSauceUsed", "_hyperinflatedSealLungUsed", "_iceHotelRoomsRaided", "_iceSculptureUsed", "_incredibleSelfEsteemCast", "_infernoDiscoVisited", "_internetDailyDungeonMalwareBought", "_internetGallonOfMilkBought", "_internetPlusOneBought", "_internetPrintScreenButtonBought", "_internetViralVideoBought", "_interviewIsabella", "_interviewMasquerade", "_interviewVlad", "_inquisitorsUnidentifiableObjectUsed", "_ironicMoustache", "_jackassPlumberGame", "_jarlsCheeseSummoned", "_jarlsCreamSummoned", "_jarlsDoughSummoned", "_jarlsEggsSummoned", "_jarlsFruitSummoned", "_jarlsMeatSummoned", "_jarlsPotatoSummoned", "_jarlsVeggiesSummoned", "_jingleBellUsed", "_jukebox", "_kgbFlywheelCharged", "_kgbLeftDrawerUsed", "_kgbOpened", "_kgbRightDrawerUsed", "_kolConSixPackUsed", "_kolhsCutButNotDried", "_kolhsIsskayLikeAnAshtray", "_kolhsPoeticallyLicenced", "_kolhsSchoolSpirited", "_kudzuSaladEaten", "_lastCombatWon", "_latteBanishUsed", "_latteCopyUsed", "_latteDrinkUsed", "_legendaryBeat", "_licenseToChillUsed", "_lookingGlass", "_loveTunnelToday", "_loveTunnelUsed", "_luckyGoldRingVolcoino", "_lunchBreak", "_lupineHormonesUsed", "_lyleFavored", "_madLiquorDrunk", "_madTeaParty", "_mafiaMiddleFingerRingUsed", "_managerialManipulationUsed", "_mansquitoSerumUsed", "_maydayDropped", "_mayoDeviceRented", "_mayoTankSoaked", "_meatballMachineUsed", "_meatifyMatterUsed", "_milkOfMagnesiumUsed", "_mimeArmyShotglassUsed", "_missGravesVermouthDrunk", "_missileLauncherUsed", "_momFoodReceived", "_mrBurnsgerEaten", "_muffinOrderedToday", "_mushroomGardenVisited", "_neverendingPartyToday", "_newYouQuestCompleted", "_olympicSwimmingPool", "_olympicSwimmingPoolItemFound", "_overflowingGiftBasketUsed", "_partyHard", "_pastaAdditive", "_perfectFreezeUsed", "_perfectlyFairCoinUsed", "_petePartyThrown", "_peteRiotIncited", "_photocopyUsed", "_pickyTweezersUsed", "_pirateBellowUsed", "_pirateForkUsed", "_pixelOrbUsed", "_plumbersMushroomStewEaten", "_pneumaticityPotionUsed", "_pottedTeaTreeUsed", "_prToday", "_psychoJarFilled", "_psychoJarUsed", "_psychokineticHugUsed", "_rainStickUsed", "_redwoodRainStickUsed", "_requestSandwichSucceeded", "_rhinestonesAcquired", "_seaJellyHarvested", "_setOfJacksUsed", "_sewingKitUsed", "_sexChanged", "_shrubDecorated", "_silverDreadFlaskUsed", "_skateBuff1", "_skateBuff2", "_skateBuff3", "_skateBuff4", "_skateBuff5", "_sleazeAirportToday", "_sobrieTeaUsed", "_softwareGlitchTurnReceived", "_spacegateMurderbot", "_spacegateRuins", "_spacegateSpant", "_spacegateToday", "_spacegateVaccine", "_spaghettiBreakfast", "_spaghettiBreakfastEaten", "_spinmasterLatheVisited", "_spinningWheel", "_spookyAirportToday", "_stabonicScrollUsed", "_steelyEyedSquintUsed", "_stenchAirportToday", "_stinkyCheeseBanisherUsed", "_streamsCrossed", "_stuffedPocketwatchUsed", "_styxSprayUsed", "_summonAnnoyanceUsed", "_summonCarrotUsed", "_summonResortPassUsed", "_sweetToothUsed", "_syntheticDogHairPillUsed", "_tacoFlierUsed", "_telegraphOfficeToday", "_templeHiddenPower", "_tempuraAirUsed", "_thesisDelivered", "_timeSpinnerReplicatorUsed", "_toastSummoned", "_tonicDjinn", "_treasuryEliteMeatCollected", "_treasuryHaremMeatCollected", "_trivialAvocationsGame", "_tryptophanDartUsed", "_turtlePowerCast", "_twelveNightEnergyUsed", "_ultraMegaSourBallUsed", "_victorSpoilsUsed", "_villainLairCanLidUsed", "_villainLairColorChoiceUsed", "_villainLairDoorChoiceUsed", "_villainLairFirecrackerUsed", "_villainLairSymbologyChoiceUsed", "_villainLairWebUsed", "_vmaskBanisherUsed", "_voraciTeaUsed", "_volcanoItemRedeemed", "_volcanoSuperduperheatedMetal", "_voteToday", "_VYKEACafeteriaRaided", "_VYKEALoungeRaided", "_walfordQuestStartedToday", "_warbearBankUsed", "_warbearBreakfastMachineUsed", "_warbearGyrocopterUsed", "_warbearSodaMachineUsed", "_wildfireBarrelHarvested", "_witchessBuff", "_workshedItemUsed", "_zombieClover", "_preventScurvy", "lockedItem4637", "lockedItem4638", "lockedItem4639", "lockedItem4646", "lockedItem4647", "unknownRecipe3542", "unknownRecipe3543", "unknownRecipe3544", "unknownRecipe3545", "unknownRecipe3546", "unknownRecipe3547", "unknownRecipe3548", "unknownRecipe3749", "unknownRecipe3751", "unknownRecipe4172", "unknownRecipe4173", "unknownRecipe4174", "unknownRecipe5060", "unknownRecipe5061", "unknownRecipe5062", "unknownRecipe5063", "unknownRecipe5064", "unknownRecipe5066", "unknownRecipe5067", "unknownRecipe5069", "unknownRecipe5070", "unknownRecipe5072", "unknownRecipe5073", "unknownRecipe5670", "unknownRecipe5671", "unknownRecipe6501", "unknownRecipe6564", "unknownRecipe6565", "unknownRecipe6566", "unknownRecipe6567", "unknownRecipe6568", "unknownRecipe6569", "unknownRecipe6570", "unknownRecipe6571", "unknownRecipe6572", "unknownRecipe6573", "unknownRecipe6574", "unknownRecipe6575", "unknownRecipe6576", "unknownRecipe6577", "unknownRecipe6578", "unknownRecipe7752", "unknownRecipe7753", "unknownRecipe7754", "unknownRecipe7755", "unknownRecipe7756", "unknownRecipe7757", "unknownRecipe7758", "unknownRecipe10970", "unknownRecipe10971", "unknownRecipe10972", "unknownRecipe10973", "unknownRecipe10974", "unknownRecipe10975", "unknownRecipe10976", "unknownRecipe10977", "unknownRecipe10978", "unknownRecipe10988", "unknownRecipe10989", "unknownRecipe10990", "unknownRecipe10991", "unknownRecipe10992", "unknownRecipe11000"];
var numericProperties = ["coinMasterIndex", "dailyDeedsVersion", "defaultDropdown1", "defaultDropdown2", "defaultDropdownSplit", "defaultLimit", "fixedThreadPoolSize", "itemManagerIndex", "lastBuffRequestType", "lastGlobalCounterDay", "lastImageCacheClear", "previousUpdateRevision", "relayDelayForSVN", "relaySkillButtonCount", "scriptButtonPosition", "statusDropdown", "svnThreadPoolSize", "toolbarPosition", "_g9Effect", "addingScrolls", "affirmationCookiesEaten", "aminoAcidsUsed", "antagonisticSnowmanKitCost", "ascensionsToday", "autoAbortThreshold", "autoAntidote", "autoBuyPriceLimit", "autumnatonQuestTurn", "availableCandyCredits", "availableDimes", "availableFunPoints", "availableQuarters", "availableStoreCredits", "availableSwagger", "averageSwagger", "awolMedicine", "awolPointsBeanslinger", "awolPointsCowpuncher", "awolPointsSnakeoiler", "awolDeferredPointsBeanslinger", "awolDeferredPointsCowpuncher", "awolDeferredPointsSnakeoiler", "awolVenom", "bagOTricksCharges", "ballpitBonus", "bankedKarma", "bartenderTurnsUsed", "basementMallPrices", "basementSafetyMargin", "batmanFundsAvailable", "batmanBonusInitialFunds", "batmanTimeLeft", "bearSwagger", "beeCounter", "beGregariousCharges", "beGregariousFightsLeft", "birdformCold", "birdformHot", "birdformRoc", "birdformSleaze", "birdformSpooky", "birdformStench", "blackBartsBootyCost", "blackPuddingsDefeated", "blackForestProgress", "blankOutUsed", "bloodweiserDrunk", "bondPoints", "bondVillainsDefeated", "boneAbacusVictories", "booPeakProgress", "borisPoints", "breakableHandling", "breakableHandling1964", "breakableHandling9691", "breakableHandling9692", "breakableHandling9699", "breathitinCharges", "brodenBacteria", "brodenSprinkles", "buffBotMessageDisposal", "buffBotPhilanthropyType", "buffJimmyIngredients", "burnoutsDefeated", "burrowgrubSummonsRemaining", "camelSpit", "camerasUsed", "campAwayDecoration", "candyWitchTurnsUsed", "candyWitchCandyTotal", "carboLoading", "catBurglarBankHeists", "cellarLayout", "charitableDonations", "chasmBridgeProgress", "chefTurnsUsed", "chessboardsCleared", "chilledToTheBone", "cinderellaMinutesToMidnight", "cinderellaScore", "cocktailSummons", "commerceGhostCombats", "controlPanelOmega", "cornucopiasOpened", "cosmicBowlingBallReturnCombats", "cozyCounter6332", "cozyCounter6333", "cozyCounter6334", "craftingClay", "craftingLeather", "craftingStraw", "crimbo16BeardChakraCleanliness", "crimbo16BootsChakraCleanliness", "crimbo16BungChakraCleanliness", "crimbo16CrimboHatChakraCleanliness", "crimbo16GutsChakraCleanliness", "crimbo16HatChakraCleanliness", "crimbo16JellyChakraCleanliness", "crimbo16LiverChakraCleanliness", "crimbo16NippleChakraCleanliness", "crimbo16NoseChakraCleanliness", "crimbo16ReindeerChakraCleanliness", "crimbo16SackChakraCleanliness", "crimboTreeDays", "cubelingProgress", "currentExtremity", "currentHedgeMazeRoom", "currentMojoFilters", "currentNunneryMeat", "currentPortalEnergy", "cursedMagnifyingGlassCount", "cyrptAlcoveEvilness", "cyrptCrannyEvilness", "cyrptNicheEvilness", "cyrptNookEvilness", "cyrptTotalEvilness", "darkGyfftePoints", "daycareEquipment", "daycareInstructors", "daycareLastScavenge", "daycareToddlers", "dbNemesisSkill1", "dbNemesisSkill2", "dbNemesisSkill3", "desertExploration", "desktopHeight", "desktopWidth", "dinseyFilthLevel", "dinseyFunProgress", "dinseyNastyBearsDefeated", "dinseySocialJusticeIProgress", "dinseySocialJusticeIIProgress", "dinseyTouristsFed", "dinseyToxicMultiplier", "doctorBagQuestLights", "doctorBagUpgrades", "dreadScroll1", "dreadScroll2", "dreadScroll3", "dreadScroll4", "dreadScroll5", "dreadScroll6", "dreadScroll7", "dreadScroll8", "dripAdventuresSinceAscension", "drippingHallAdventuresSinceAscension", "drippingTreesAdventuresSinceAscension", "drippyBatsUnlocked", "drippyJuice", "drippyOrbsClaimed", "drunkenSwagger", "edDefeatAbort", "edPoints", "eldritchTentaclesFought", "electricKoolAidEaten", "encountersUntilDMTChoice", "encountersUntilNEPChoice", "ensorceleeLevel", "entauntaunedColdRes", "essenceOfAnnoyanceCost", "essenceOfBearCost", "extraRolloverAdventures", "falloutShelterLevel", "familiarSweat", "fingernailsClipped", "fistSkillsKnown", "flyeredML", "fossilB", "fossilD", "fossilN", "fossilP", "fossilS", "fossilW", "fratboysDefeated", "frenchGuardTurtlesFreed", "funGuyMansionKills", "garbageChampagneCharge", "garbageFireProgress", "garbageShirtCharge", "garbageTreeCharge", "garlandUpgrades", "gingerDigCount", "gingerLawChoice", "gingerMuscleChoice", "gingerTrainScheduleStudies", "gladiatorBallMovesKnown", "gladiatorBladeMovesKnown", "gladiatorNetMovesKnown", "glitchItemCost", "glitchItemImplementationCount", "glitchItemImplementationLevel", "glitchSwagger", "gloverPoints", "gnasirProgress", "goldenMrAccessories", "gongPath", "gooseDronesRemaining", "goreCollected", "gourdItemCount", "greyYouPoints", "grimoire1Summons", "grimoire2Summons", "grimoire3Summons", "grimstoneCharge", "guardTurtlesFreed", "guideToSafariCost", "guyMadeOfBeesCount", "guzzlrBronzeDeliveries", "guzzlrDeliveryProgress", "guzzlrGoldDeliveries", "guzzlrPlatinumDeliveries", "haciendaLayout", "hallowiener8BitRealm", "hallowienerCoinspiracy", "hareMillisecondsSaved", "heavyRainsStartingThunder", "heavyRainsStartingRain", "heavyRainsStartingLightning", "heroDonationBoris", "heroDonationJarlsberg", "heroDonationSneakyPete", "hiddenApartmentProgress", "hiddenBowlingAlleyProgress", "hiddenHospitalProgress", "hiddenOfficeProgress", "hiddenTavernUnlock", "highTopPumped", "hippiesDefeated", "holidayHalsBookCost", "holidaySwagger", "homemadeRobotUpgrades", "homebodylCharges", "hpAutoRecovery", "hpAutoRecoveryTarget", "iceSwagger", "jarlsbergPoints", "jungCharge", "junglePuns", "knownAscensions", "kolhsTotalSchoolSpirited", "lastAnticheeseDay", "lastArcadeAscension", "lastBadMoonReset", "lastBangPotionReset", "lastBattlefieldReset", "lastBeardBuff", "lastBreakfast", "lastCartographyBooPeak", "lastCartographyCastleTop", "lastCartographyDarkNeck", "lastCartographyDefiledNook", "lastCartographyFratHouse", "lastCartographyFratHouseVerge", "lastCartographyGuanoJunction", "lastCartographyHauntedBilliards", "lastCartographyHippyCampVerge", "lastCartographyZeppelinProtesters", "lastCastleGroundUnlock", "lastCastleTopUnlock", "lastCellarReset", "lastChanceThreshold", "lastChasmReset", "lastColosseumRoundWon", "lastCouncilVisit", "lastCounterDay", "lastDesertUnlock", "lastDispensaryOpen", "lastDMTDuplication", "lastDwarfFactoryReset", "lastEVHelmetValue", "lastEVHelmetReset", "lastEmptiedStorage", "lastFilthClearance", "lastGoofballBuy", "lastGuildStoreOpen", "lastGuyMadeOfBeesReset", "lastFratboyCall", "lastFriarCeremonyAscension", "lastFriarElbowNC", "lastFriarHeartNC", "lastFriarNeckNC", "lastHippyCall", "lastIslandUnlock", "lastKeyotronUse", "lastKingLiberation", "lastLightsOutTurn", "lastMushroomPlot", "lastMiningReset", "lastNemesisReset", "lastPaperStripReset", "lastPirateEphemeraReset", "lastPirateInsultReset", "lastPlusSignUnlock", "lastQuartetAscension", "lastQuartetRequest", "lastSecondFloorUnlock", "lastSkateParkReset", "lastStillBeatingSpleen", "lastTavernAscension", "lastTavernSquare", "lastTelescopeReset", "lastTempleAdventures", "lastTempleButtonsUnlock", "lastTempleUnlock", "lastThingWithNoNameDefeated", "lastTowelAscension", "lastTr4pz0rQuest", "lastVioletFogMap", "lastVoteMonsterTurn", "lastWartDinseyDefeated", "lastWuTangDefeated", "lastYearbookCameraAscension", "lastZapperWand", "lastZapperWandExplosionDay", "lawOfAveragesCost", "libramSummons", "lightsOutAutomation", "louvreDesiredGoal", "louvreGoal", "lovebugsAridDesert", "lovebugsBeachBuck", "lovebugsBooze", "lovebugsChroner", "lovebugsCoinspiracy", "lovebugsCyrpt", "lovebugsFreddy", "lovebugsFunFunds", "lovebugsHoboNickel", "lovebugsItemDrop", "lovebugsMeat", "lovebugsMeatDrop", "lovebugsMoxie", "lovebugsMuscle", "lovebugsMysticality", "lovebugsOilPeak", "lovebugsOrcChasm", "lovebugsPowder", "lovebugsWalmart", "lttQuestDifficulty", "lttQuestStageCount", "manaBurnSummonThreshold", "manaBurningThreshold", "manaBurningTrigger", "manorDrawerCount", "manualOfNumberologyCost", "mapToKokomoCost", "masksUnlocked", "maximizerMRUSize", "maximizerCombinationLimit", "maximizerEquipmentLevel", "maximizerEquipmentScope", "maximizerMaxPrice", "maximizerPriceLevel", "maxManaBurn", "mayflyExperience", "mayoLevel", "meansuckerPrice", "merkinVocabularyMastery", "miniAdvClass", "miniMartinisDrunk", "moleTunnelLevel", "mothershipProgress", "mpAutoRecovery", "mpAutoRecoveryTarget", "munchiesPillsUsed", "mushroomGardenCropLevel", "nextParanormalActivity", "nextQuantumFamiliarOwnerId", "nextQuantumFamiliarTurn", "noobPoints", "noobDeferredPoints", "noodleSummons", "nsContestants1", "nsContestants2", "nsContestants3", "nuclearAutumnPoints", "numericSwagger", "nunsVisits", "oilPeakProgress", "optimalSwagger", "optimisticCandleProgress", "palindomeDudesDefeated", "parasolUsed", "pendingMapReflections", "pirateSwagger", "plantingDay", "plumberBadgeCost", "plumberCostumeCost", "plumberPoints", "poolSharkCount", "poolSkill", "primaryLabGooIntensity", "prismaticSummons", "procrastinatorLanguageFluency", "promptAboutCrafting", "puzzleChampBonus", "pyramidPosition", "rockinRobinProgress", "ROMOfOptimalityCost", "quantumPoints", "reagentSummons", "reanimatorArms", "reanimatorLegs", "reanimatorSkulls", "reanimatorWeirdParts", "reanimatorWings", "recentLocations", "redSnapperProgress", "relayPort", "relocatePygmyJanitor", "relocatePygmyLawyer", "rumpelstiltskinTurnsUsed", "rumpelstiltskinKidsRescued", "safariSwagger", "sausageGrinderUnits", "schoolOfHardKnocksDiplomaCost", "schoolSwagger", "scrapbookCharges", "scriptMRULength", "seaodesFound", "SeasoningSwagger", "sexChanges", "shenInitiationDay", "shockingLickCharges", "singleFamiliarRun", "skillBurn3", "skillBurn90", "skillBurn153", "skillBurn154", "skillBurn155", "skillBurn1019", "skillBurn5017", "skillBurn6014", "skillBurn6015", "skillBurn6016", "skillBurn6020", "skillBurn6021", "skillBurn6022", "skillBurn6023", "skillBurn6024", "skillBurn6026", "skillBurn6028", "skillBurn7323", "skillBurn14008", "skillBurn14028", "skillBurn14038", "skillBurn15011", "skillBurn15028", "skillBurn17005", "skillBurn22034", "skillBurn22035", "skillBurn23301", "skillBurn23302", "skillBurn23303", "skillBurn23304", "skillBurn23305", "skillBurn23306", "skillLevel46", "skillLevel47", "skillLevel48", "skillLevel117", "skillLevel118", "skillLevel121", "skillLevel128", "skillLevel134", "skillLevel144", "skillLevel180", "skillLevel188", "skillLevel7254", "slimelingFullness", "slimelingStacksDropped", "slimelingStacksDue", "smoresEaten", "smutOrcNoncombatProgress", "sneakyPetePoints", "snojoMoxieWins", "snojoMuscleWins", "snojoMysticalityWins", "sourceAgentsDefeated", "sourceEnlightenment", "sourceInterval", "sourcePoints", "sourceTerminalGram", "sourceTerminalPram", "sourceTerminalSpam", "spaceBabyLanguageFluency", "spacePirateLanguageFluency", "spelunkyNextNoncombat", "spelunkySacrifices", "spelunkyWinCount", "spookyPuttyCopiesMade", "statbotUses", "sugarCounter4178", "sugarCounter4179", "sugarCounter4180", "sugarCounter4181", "sugarCounter4182", "sugarCounter4183", "sugarCounter4191", "summonAnnoyanceCost", "sweat", "tacoDanCocktailSauce", "tacoDanFishMeat", "tavernLayout", "telescopeUpgrades", "tempuraSummons", "timeSpinnerMedals", "timesRested", "tomeSummons", "totalCharitableDonations", "turtleBlessingTurns", "twinPeakProgress", "twoCRSPoints", "unicornHornInflation", "universalSeasoningCost", "usable1HWeapons", "usable1xAccs", "usable2HWeapons", "usable3HWeapons", "usableAccessories", "usableHats", "usableOffhands", "usableOther", "usablePants", "usableShirts", "valueOfAdventure", "valueOfInventory", "valueOfStill", "valueOfTome", "vintnerCharge", "vintnerWineLevel", "violetFogGoal", "walfordBucketProgress", "warehouseProgress", "welcomeBackAdv", "wolfPigsEvicted", "wolfTurnsUsed", "writingDesksDefeated", "xoSkeleltonXProgress", "xoSkeleltonOProgress", "yearbookCameraAscensions", "yearbookCameraUpgrades", "youRobotBody", "youRobotBottom", "youRobotLeft", "youRobotPoints", "youRobotRight", "youRobotTop", "zeppelinProtestors", "zigguratLianas", "zombiePoints", "_absintheDrops", "_abstractionDropsCrown", "_aguaDrops", "_xenomorphCharge", "_ancestralRecallCasts", "_antihangoverBonus", "_astralDrops", "_autumnatonQuests", "_backUpUses", "_badlyRomanticArrows", "_badgerCharge", "_balefulHowlUses", "_banderRunaways", "_bastilleCheese", "_bastilleGames", "_bastilleGameTurn", "_bastilleLastCheese", "_beanCannonUses", "_bearHugs", "_beerLensDrops", "_bellydancerPickpockets", "_benettonsCasts", "_birdsSoughtToday", "_boomBoxFights", "_boomBoxSongsLeft", "_bootStomps", "_boxingGloveArrows", "_brickoEyeSummons", "_brickoFights", "_campAwayCloudBuffs", "_campAwaySmileBuffs", "_candySummons", "_captainHagnkUsed", "_carnieCandyDrops", "_carrotNoseDrops", "_catBurglarCharge", "_catBurglarHeistsComplete", "_cheerleaderSteam", "_chestXRayUsed", "_chipBags", "_chocolateCigarsUsed", "_chocolateSculpturesUsed", "_chocolatesUsed", "_chronolithActivations", "_chronolithNextCost", "_clanFortuneConsultUses", "_clipartSummons", "_coldMedicineConsults", "_coldMedicineEquipmentTaken", "_companionshipCasts", "_cookbookbatCrafting", "_cosmicBowlingSkillsUsed", "_crimbo21ColdResistance", "_dailySpecialPrice", "_daycareGymScavenges", "_daycareRecruits", "_deckCardsDrawn", "_deluxeKlawSummons", "_demandSandwich", "_detectiveCasesCompleted", "_disavowed", "_dnaPotionsMade", "_donhosCasts", "_dreamJarDrops", "_drunkPygmyBanishes", "_edDefeats", "_edLashCount", "_elronsCasts", "_enamorangs", "_energyCollected", "_expertCornerCutterUsed", "_favorRareSummons", "_feastUsed", "_feelinTheRhythm", "_feelPrideUsed", "_feelExcitementUsed", "_feelHatredUsed", "_feelLonelyUsed", "_feelNervousUsed", "_feelEnvyUsed", "_feelDisappointedUsed", "_feelSuperiorUsed", "_feelLostUsed", "_feelNostalgicUsed", "_feelPeacefulUsed", "_fingertrapArrows", "_fireExtinguisherCharge", "_fragrantHerbsUsed", "_freeBeachWalksUsed", "_frButtonsPressed", "_fudgeWaspFights", "_gapBuffs", "_garbageFireDropsCrown", "_genieFightsUsed", "_genieWishesUsed", "_gibbererAdv", "_gibbererCharge", "_gingerbreadCityTurns", "_glarkCableUses", "_glitchMonsterFights", "_gnomeAdv", "_godLobsterFights", "_goldenMoneyCharge", "_gongDrops", "_gothKidCharge", "_gothKidFights", "_grimBrotherCharge", "_grimFairyTaleDrops", "_grimFairyTaleDropsCrown", "_grimoireConfiscatorSummons", "_grimoireGeekySummons", "_grimstoneMaskDrops", "_grimstoneMaskDropsCrown", "_grooseCharge", "_grooseDrops", "_guzzlrDeliveries", "_guzzlrGoldDeliveries", "_guzzlrPlatinumDeliveries", "_hareAdv", "_hareCharge", "_highTopPumps", "_hipsterAdv", "_hoardedCandyDropsCrown", "_hoboUnderlingSummons", "_holoWristDrops", "_holoWristProgress", "_hotAshesDrops", "_hotJellyUses", "_hotTubSoaks", "_humanMuskUses", "_iceballUses", "_inigosCasts", "_jerksHealthMagazinesUsed", "_jiggleCheese", "_jiggleCream", "_jiggleLife", "_jiggleSteak", "_jitbCharge", "_juneCleaverFightsLeft", "_juneCleaverEncounters", "_juneCleaverStench", "_juneCleaverSpooky", "_juneCleaverSleaze", "_juneCleaverHot", "_juneCleaverCold", "_juneCleaverSkips", "_jungDrops", "_kgbClicksUsed", "_kgbDispenserUses", "_kgbTranquilizerDartUses", "_klawSummons", "_kloopCharge", "_kloopDrops", "_kolhsAdventures", "_kolhsSavedByTheBell", "_lastDailyDungeonRoom", "_lastSausageMonsterTurn", "_lastZomboEye", "_latteRefillsUsed", "_leafblowerML", "_legionJackhammerCrafting", "_llamaCharge", "_longConUsed", "_lovebugsBeachBuck", "_lovebugsChroner", "_lovebugsCoinspiracy", "_lovebugsFreddy", "_lovebugsFunFunds", "_lovebugsHoboNickel", "_lovebugsWalmart", "_loveChocolatesUsed", "_lynyrdSnareUses", "_machineTunnelsAdv", "_macrometeoriteUses", "_mafiaThumbRingAdvs", "_mayflowerDrops", "_mayflySummons", "_mediumSiphons", "_meteoriteAdesUsed", "_meteorShowerUses", "_micrometeoriteUses", "_miniMartiniDrops", "_monstersMapped", "_mushroomGardenFights", "_nanorhinoCharge", "_navelRunaways", "_neverendingPartyFreeTurns", "_newYouQuestSharpensDone", "_newYouQuestSharpensToDo", "_nextColdMedicineConsult", "_nextQuantumAlignment", "_nightmareFuelCharges", "_noobSkillCount", "_nuclearStockpileUsed", "_oilExtracted", "_olfactionsUsed", "_speakeasyFreeFights", "_optimisticCandleDropsCrown", "_oreDropsCrown", "_otoscopeUsed", "_oysterEggsFound", "_pantsgivingBanish", "_pantsgivingCount", "_pantsgivingCrumbs", "_pantsgivingFullness", "_pasteDrops", "_peteJukeboxFixed", "_peteJumpedShark", "_petePeeledOut", "_pieDrops", "_piePartsCount", "_pixieCharge", "_pocketProfessorLectures", "_poisonArrows", "_pokeGrowFertilizerDrops", "_poolGames", "_powderedGoldDrops", "_powderedMadnessUses", "_powerfulGloveBatteryPowerUsed", "_powerPillDrops", "_powerPillUses", "_precisionCasts", "_radlibSummons", "_raindohCopiesMade", "_rapidPrototypingUsed", "_raveStealCount", "_reflexHammerUsed", "_resolutionAdv", "_resolutionRareSummons", "_riftletAdv", "_roboDrops", "_rogueProgramCharge", "_romanticFightsLeft", "_saberForceMonsterCount", "_saberForceUses", "_saberMod", "_saltGrainsConsumed", "_sandwormCharge", "_saplingsPlanted", "_sausageFights", "_sausagesEaten", "_sausagesMade", "_sealFigurineUses", "_sealScreeches", "_sealsSummoned", "_shatteringPunchUsed", "_shortOrderCookCharge", "_shrubCharge", "_sloppyDinerBeachBucks", "_smilesOfMrA", "_smithsnessSummons", "_snojoFreeFights", "_snojoParts", "_snokebombUsed", "_snowconeSummons", "_snowglobeDrops", "_snowSuitCount", "_sourceTerminalDigitizeMonsterCount", "_sourceTerminalDigitizeUses", "_sourceTerminalDuplicateUses", "_sourceTerminalEnhanceUses", "_sourceTerminalExtrudes", "_sourceTerminalPortscanUses", "_spaceFurDropsCrown", "_spacegatePlanetIndex", "_spacegateTurnsLeft", "_spaceJellyfishDrops", "_speakeasyDrinksDrunk", "_spelunkerCharges", "_spelunkingTalesDrops", "_spikolodonSpikeUses", "_spookyJellyUses", "_stackLumpsUses", "_steamCardDrops", "_stickerSummons", "_stinkyCheeseCount", "_stressBallSqueezes", "_sugarSummons", "_sweatOutSomeBoozeUsed", "_taffyRareSummons", "_taffyYellowSummons", "_thanksgettingFoodsEaten", "_thingfinderCasts", "_thinknerdPackageDrops", "_thorsPliersCrafting", "_timeHelmetAdv", "_timeSpinnerMinutesUsed", "_tokenDrops", "_transponderDrops", "_turkeyBlastersUsed", "_turkeyBooze", "_turkeyMuscle", "_turkeyMyst", "_turkeyMoxie", "_unaccompaniedMinerUsed", "_unconsciousCollectiveCharge", "_universalSeasoningsUsed", "_universeCalculated", "_universeImploded", "_usedReplicaBatoomerang", "_vampyreCloakeFormUses", "_villainLairProgress", "_vitachocCapsulesUsed", "_vmaskAdv", "_voidFreeFights", "_volcanoItem1", "_volcanoItem2", "_volcanoItem3", "_volcanoItemCount1", "_volcanoItemCount2", "_volcanoItemCount3", "_voteFreeFights", "_VYKEACompanionLevel", "_warbearAutoAnvilCrafting", "_whiteRiceDrops", "_witchessFights", "_xoHugsUsed", "_yellowPixelDropsCrown", "_zapCount", "_zombieSmashPocketsUsed"];
var monsterProperties = ["beGregariousMonster", "cameraMonster", "chateauMonster", "clumsinessGroveBoss", "crappyCameraMonster", "crudeMonster", "enamorangMonster", "envyfishMonster", "glacierOfJerksBoss", "iceSculptureMonster", "lastCopyableMonster", "longConMonster", "maelstromOfLoversBoss", "makeFriendsMonster", "merkinLockkeyMonster", "nosyNoseMonster", "olfactedMonster", "photocopyMonster", "rainDohMonster", "romanticTarget", "screencappedMonster", "spookyPuttyMonster", "stenchCursedMonster", "superficiallyInterestedMonster", "waxMonster", "yearbookCameraTarget", "_gallapagosMonster", "_jiggleCreamedMonster", "_latteMonster", "_nanorhinoBanishedMonster", "_newYouQuestMonster", "_relativityMonster", "_saberForceMonster", "_sourceTerminalDigitizeMonster", "_voteMonster"];
var locationProperties = ["autumnatonQuestLocation", "currentJunkyardLocation", "doctorBagQuestLocation", "ghostLocation", "guzzlrQuestLocation", "nextSpookyravenElizabethRoom", "nextSpookyravenStephenRoom", "sourceOracleTarget", "_floundryBassLocation", "_floundryCarpLocation", "_floundryCodLocation", "_floundryHatchetfishLocation", "_floundryTroutLocation", "_floundryTunaLocation"];
var stringProperties = ["autoLogin", "browserBookmarks", "chatFontSize", "combatHotkey0", "combatHotkey1", "combatHotkey2", "combatHotkey3", "combatHotkey4", "combatHotkey5", "combatHotkey6", "combatHotkey7", "combatHotkey8", "combatHotkey9", "commandLineNamespace", "dailyDeedsOptions", "defaultBorderColor", "displayName", "externalEditor", "getBreakfast", "headerStates", "highlightList", "http.proxyHost", "http.proxyPassword", "http.proxyPort", "http.proxyUser", "https.proxyHost", "https.proxyPassword", "https.proxyPort", "https.proxyUser", "initialDesktop", "initialFrames", "lastRelayUpdate", "lastUserAgent", "lastUsername", "logPreferenceChangeFilter", "loginScript", "loginServerName", "loginWindowLogo", "logoutScript", "previousNotifyList", "previousUpdateVersion", "saveState", "saveStateActive", "scriptList", "swingLookAndFeel", "userAgent", "afterAdventureScript", "autoOlfact", "autoPutty", "autumnatonUpgrades", "backupCameraMode", "banishedMonsters", "banishingShoutMonsters", "batmanStats", "batmanZone", "batmanUpgrades", "battleAction", "beachHeadsUnlocked", "beforePVPScript", "betweenBattleScript", "boomBoxSong", "breakfastAlways", "breakfastHardcore", "breakfastSoftcore", "buffBotCasting", "buyScript", "cargoPocketsEmptied", "cargoPocketScraps", "chatbotScript", "chatPlayerScript", "choiceAdventureScript", "chosenTrip", "clanFortuneReply1", "clanFortuneReply2", "clanFortuneReply3", "clanFortuneWord1", "clanFortuneWord2", "clanFortuneWord3", "commerceGhostItem", "counterScript", "copperheadClubHazard", "crimbotChassis", "crimbotArm", "crimbotPropulsion", "crystalBallPredictions", "csServicesPerformed", "currentAstralTrip", "currentDistillateMods", "currentEasyBountyItem", "currentHardBountyItem", "currentHippyStore", "currentJunkyardTool", "currentLlamaForm", "currentMood", "currentPVPSeason", "currentPvpVictories", "currentSpecialBountyItem", "customCombatScript", "cyrusAdjectives", "defaultFlowerLossMessage", "defaultFlowerWinMessage", "demonName1", "demonName2", "demonName3", "demonName4", "demonName5", "demonName6", "demonName7", "demonName8", "demonName9", "demonName10", "demonName11", "demonName12", "demonName13", "dinseyGatorStenchDamage", "dinseyRollercoasterStats", "doctorBagQuestItem", "dolphinItem", "duckAreasCleared", "duckAreasSelected", "edPiece", "enamorangMonsterTurn", "ensorcelee", "EVEDirections", "extraCosmeticModifiers", "familiarScript", "forbiddenStores", "gameProBossSpecialPower", "gooseReprocessed", "grimoireSkillsHardcore", "grimoireSkillsSoftcore", "grimstoneMaskPath", "guzzlrQuestClient", "guzzlrQuestBooze", "guzzlrQuestTier", "harvestGardenHardcore", "harvestGardenSoftcore", "hpAutoRecoveryItems", "invalidBuffMessage", "jickSwordModifier", "juneCleaverQueue", "kingLiberatedScript", "lassoTraining", "lastAdventure", "lastBangPotion819", "lastBangPotion820", "lastBangPotion821", "lastBangPotion822", "lastBangPotion823", "lastBangPotion824", "lastBangPotion825", "lastBangPotion826", "lastBangPotion827", "lastChanceBurn", "lastChessboard", "lastCombatEnvironments", "lastDwarfDiceRolls", "lastDwarfDigitRunes", "lastDwarfEquipmentRunes", "lastDwarfFactoryItem118", "lastDwarfFactoryItem119", "lastDwarfFactoryItem120", "lastDwarfFactoryItem360", "lastDwarfFactoryItem361", "lastDwarfFactoryItem362", "lastDwarfFactoryItem363", "lastDwarfFactoryItem364", "lastDwarfFactoryItem365", "lastDwarfFactoryItem910", "lastDwarfFactoryItem3199", "lastDwarfOfficeItem3208", "lastDwarfOfficeItem3209", "lastDwarfOfficeItem3210", "lastDwarfOfficeItem3211", "lastDwarfOfficeItem3212", "lastDwarfOfficeItem3213", "lastDwarfOfficeItem3214", "lastDwarfOreRunes", "lastDwarfHopper1", "lastDwarfHopper2", "lastDwarfHopper3", "lastDwarfHopper4", "lastEncounter", "lastMacroError", "lastMessageId", "lastPaperStrip3144", "lastPaperStrip4138", "lastPaperStrip4139", "lastPaperStrip4140", "lastPaperStrip4141", "lastPaperStrip4142", "lastPaperStrip4143", "lastPaperStrip4144", "lastPirateEphemera", "lastPorkoBoard", "lastPorkoPayouts", "lastPorkoExpected", "lastSlimeVial3885", "lastSlimeVial3886", "lastSlimeVial3887", "lastSlimeVial3888", "lastSlimeVial3889", "lastSlimeVial3890", "lastSlimeVial3891", "lastSlimeVial3892", "lastSlimeVial3893", "lastSlimeVial3894", "lastSlimeVial3895", "lastSlimeVial3896", "latteModifier", "latteUnlocks", "libramSkillsHardcore", "libramSkillsSoftcore", "louvreOverride", "lovePotion", "lttQuestName", "maximizerList", "maximizerMRUList", "mayoInMouth", "mayoMinderSetting", "merkinQuestPath", "mineLayout1", "mineLayout2", "mineLayout3", "mineLayout4", "mineLayout5", "mineLayout6", "mpAutoRecoveryItems", "muffinOnOrder", "nextAdventure", "nextDistillateMods", "nextQuantumFamiliarName", "nextQuantumFamiliarOwner", "nsChallenge2", "nsChallenge3", "nsChallenge4", "nsChallenge5", "nsTowerDoorKeysUsed", "oceanAction", "oceanDestination", "parkaMode", "pastaThrall1", "pastaThrall2", "pastaThrall3", "pastaThrall4", "pastaThrall5", "pastaThrall6", "pastaThrall7", "pastaThrall8", "peteMotorbikeTires", "peteMotorbikeGasTank", "peteMotorbikeHeadlight", "peteMotorbikeCowling", "peteMotorbikeMuffler", "peteMotorbikeSeat", "pieStuffing", "plantingDate", "plantingLength", "plantingScript", "plumberCostumeWorn", "pokefamBoosts", "postAscensionScript", "preAscensionScript", "retroCapeSuperhero", "retroCapeWashingInstructions", "questClumsinessGrove", "questDoctorBag", "questECoBucket", "questESlAudit", "questESlBacteria", "questESlCheeseburger", "questESlCocktail", "questESlDebt", "questESlFish", "questESlMushStash", "questESlSalt", "questESlSprinkles", "questESpEVE", "questESpJunglePun", "questESpGore", "questESpClipper", "questESpFakeMedium", "questESpSerum", "questESpSmokes", "questESpOutOfOrder", "questEStFishTrash", "questEStGiveMeFuel", "questEStNastyBears", "questEStSocialJusticeI", "questEStSocialJusticeII", "questEStSuperLuber", "questEStWorkWithFood", "questEStZippityDooDah", "questEUNewYou", "questF01Primordial", "questF02Hyboria", "questF03Future", "questF04Elves", "questF05Clancy", "questG01Meatcar", "questG02Whitecastle", "questG03Ego", "questG04Nemesis", "questG05Dark", "questG06Delivery", "questG07Myst", "questG08Moxie", "questG09Muscle", "questGlacierOfJerks", "questGuzzlr", "questI01Scapegoat", "questI02Beat", "questL02Larva", "questL03Rat", "questL04Bat", "questL05Goblin", "questL06Friar", "questL07Cyrptic", "questL08Trapper", "questL09Topping", "questL10Garbage", "questL11MacGuffin", "questL11Black", "questL11Business", "questL11Curses", "questL11Desert", "questL11Doctor", "questL11Manor", "questL11Palindome", "questL11Pyramid", "questL11Ron", "questL11Shen", "questL11Spare", "questL11Worship", "questL12War", "questL12HippyFrat", "questL13Final", "questL13Warehouse", "questLTTQuestByWire", "questM01Untinker", "questM02Artist", "questM03Bugbear", "questM05Toot", "questM06Gourd", "questM07Hammer", "questM08Baker", "questM09Rocks", "questM10Azazel", "questM11Postal", "questM12Pirate", "questM13Escape", "questM14Bounty", "questM15Lol", "questM16Temple", "questM17Babies", "questM18Swamp", "questM19Hippy", "questM20Necklace", "questM21Dance", "questM22Shirt", "questM23Meatsmith", "questM24Doc", "questM25Armorer", "questM26Oracle", "questMaelstromOfLovers", "questPAGhost", "questS01OldGuy", "questS02Monkees", "raveCombo1", "raveCombo2", "raveCombo3", "raveCombo4", "raveCombo5", "raveCombo6", "recoveryScript", "relayCounters", "royalty", "scriptMRUList", "seahorseName", "shenQuestItem", "shrubGarland", "shrubGifts", "shrubLights", "shrubTopper", "sideDefeated", "sidequestArenaCompleted", "sidequestFarmCompleted", "sidequestJunkyardCompleted", "sidequestLighthouseCompleted", "sidequestNunsCompleted", "sidequestOrchardCompleted", "skateParkStatus", "snowsuit", "sourceTerminalChips", "sourceTerminalEducate1", "sourceTerminalEducate2", "sourceTerminalEnquiry", "sourceTerminalEducateKnown", "sourceTerminalEnhanceKnown", "sourceTerminalEnquiryKnown", "sourceTerminalExtrudeKnown", "spadingData", "spadingScript", "speakeasyName", "spelunkyStatus", "spelunkyUpgrades", "spookyravenRecipeUsed", "stationaryButton1", "stationaryButton2", "stationaryButton3", "stationaryButton4", "stationaryButton5", "streamCrossDefaultTarget", "sweetSynthesisBlacklist", "telescope1", "telescope2", "telescope3", "telescope4", "telescope5", "testudinalTeachings", "textColors", "thanksMessage", "tomeSkillsHardcore", "tomeSkillsSoftcore", "trackVoteMonster", "trapperOre", "umbrellaState", "umdLastObtained", "vintnerWineEffect", "vintnerWineName", "vintnerWineType", "violetFogLayout", "volcanoMaze1", "volcanoMaze2", "volcanoMaze3", "volcanoMaze4", "volcanoMaze5", "walfordBucketItem", "warProgress", "watchedPreferences", "workteaClue", "yourFavoriteBird", "yourFavoriteBirdMods", "youRobotCPUUpgrades", "_bastilleBoosts", "_bastilleChoice1", "_bastilleChoice2", "_bastilleChoice3", "_bastilleCurrentStyles", "_bastilleEnemyCastle", "_bastilleEnemyName", "_bastilleLastBattleResults", "_bastilleLastEncounter", "_bastilleStats", "_beachHeadsUsed", "_beachLayout", "_beachMinutes", "_birdOfTheDay", "_birdOfTheDayMods", "_bittycar", "_campAwaySmileBuffSign", "_cloudTalkMessage", "_cloudTalkSmoker", "_coatOfPaintModifier", "_dailySpecial", "_deckCardsSeen", "_feastedFamiliars", "_floristPlantsUsed", "_frAreasUnlocked", "_frHoursLeft", "_frMonstersKilled", "_horsery", "_horseryCrazyMox", "_horseryCrazyMus", "_horseryCrazyMys", "_horseryCrazyName", "_horseryCurrentName", "_horseryDarkName", "_horseryNormalName", "_horseryPaleName", "_jickJarAvailable", "_jiggleCheesedMonsters", "_lastCombatStarted", "_LastPirateRealmIsland", "_locketMonstersFought", "_mummeryMods", "_mummeryUses", "_newYouQuestSkill", "_noHatModifier", "_pantogramModifier", "_pottedPowerPlant", "_questESp", "_questPartyFair", "_questPartyFairProgress", "_questPartyFairQuest", "_roboDrinks", "_roninStoragePulls", "_spacegateAnimalLife", "_spacegateCoordinates", "_spacegateGear", "_spacegateHazards", "_spacegateIntelligentLife", "_spacegatePlanetName", "_spacegatePlantLife", "_stolenAccordions", "_tempRelayCounters", "_timeSpinnerFoodAvailable", "_unknownEasyBountyItem", "_unknownHardBountyItem", "_unknownSpecialBountyItem", "_untakenEasyBountyItem", "_untakenHardBountyItem", "_untakenSpecialBountyItem", "_userMods", "_villainLairColor", "_villainLairKey", "_voteLocal1", "_voteLocal2", "_voteLocal3", "_voteLocal4", "_voteMonster1", "_voteMonster2", "_voteModifier", "_VYKEACompanionType", "_VYKEACompanionRune", "_VYKEACompanionName"];
var numericOrStringProperties = ["statusEngineering", "statusGalley", "statusMedbay", "statusMorgue", "statusNavigation", "statusScienceLab", "statusSonar", "statusSpecialOps", "statusWasteProcessing", "choiceAdventure2", "choiceAdventure3", "choiceAdventure4", "choiceAdventure5", "choiceAdventure6", "choiceAdventure7", "choiceAdventure8", "choiceAdventure9", "choiceAdventure10", "choiceAdventure11", "choiceAdventure12", "choiceAdventure14", "choiceAdventure15", "choiceAdventure16", "choiceAdventure17", "choiceAdventure18", "choiceAdventure19", "choiceAdventure20", "choiceAdventure21", "choiceAdventure22", "choiceAdventure23", "choiceAdventure24", "choiceAdventure25", "choiceAdventure26", "choiceAdventure27", "choiceAdventure28", "choiceAdventure29", "choiceAdventure40", "choiceAdventure41", "choiceAdventure42", "choiceAdventure45", "choiceAdventure46", "choiceAdventure47", "choiceAdventure71", "choiceAdventure72", "choiceAdventure73", "choiceAdventure74", "choiceAdventure75", "choiceAdventure76", "choiceAdventure77", "choiceAdventure86", "choiceAdventure87", "choiceAdventure88", "choiceAdventure89", "choiceAdventure90", "choiceAdventure91", "choiceAdventure105", "choiceAdventure106", "choiceAdventure107", "choiceAdventure108", "choiceAdventure109", "choiceAdventure110", "choiceAdventure111", "choiceAdventure112", "choiceAdventure113", "choiceAdventure114", "choiceAdventure115", "choiceAdventure116", "choiceAdventure117", "choiceAdventure118", "choiceAdventure120", "choiceAdventure123", "choiceAdventure125", "choiceAdventure126", "choiceAdventure127", "choiceAdventure129", "choiceAdventure131", "choiceAdventure132", "choiceAdventure135", "choiceAdventure136", "choiceAdventure137", "choiceAdventure138", "choiceAdventure139", "choiceAdventure140", "choiceAdventure141", "choiceAdventure142", "choiceAdventure143", "choiceAdventure144", "choiceAdventure145", "choiceAdventure146", "choiceAdventure147", "choiceAdventure148", "choiceAdventure149", "choiceAdventure151", "choiceAdventure152", "choiceAdventure153", "choiceAdventure154", "choiceAdventure155", "choiceAdventure156", "choiceAdventure157", "choiceAdventure158", "choiceAdventure159", "choiceAdventure160", "choiceAdventure161", "choiceAdventure162", "choiceAdventure163", "choiceAdventure164", "choiceAdventure165", "choiceAdventure166", "choiceAdventure167", "choiceAdventure168", "choiceAdventure169", "choiceAdventure170", "choiceAdventure171", "choiceAdventure172", "choiceAdventure177", "choiceAdventure178", "choiceAdventure180", "choiceAdventure181", "choiceAdventure182", "choiceAdventure184", "choiceAdventure185", "choiceAdventure186", "choiceAdventure187", "choiceAdventure188", "choiceAdventure189", "choiceAdventure191", "choiceAdventure197", "choiceAdventure198", "choiceAdventure199", "choiceAdventure200", "choiceAdventure201", "choiceAdventure202", "choiceAdventure203", "choiceAdventure204", "choiceAdventure205", "choiceAdventure206", "choiceAdventure207", "choiceAdventure208", "choiceAdventure211", "choiceAdventure212", "choiceAdventure213", "choiceAdventure214", "choiceAdventure215", "choiceAdventure216", "choiceAdventure217", "choiceAdventure218", "choiceAdventure219", "choiceAdventure220", "choiceAdventure221", "choiceAdventure222", "choiceAdventure223", "choiceAdventure224", "choiceAdventure225", "choiceAdventure230", "choiceAdventure272", "choiceAdventure273", "choiceAdventure276", "choiceAdventure277", "choiceAdventure278", "choiceAdventure279", "choiceAdventure280", "choiceAdventure281", "choiceAdventure282", "choiceAdventure283", "choiceAdventure284", "choiceAdventure285", "choiceAdventure286", "choiceAdventure287", "choiceAdventure288", "choiceAdventure289", "choiceAdventure290", "choiceAdventure291", "choiceAdventure292", "choiceAdventure293", "choiceAdventure294", "choiceAdventure295", "choiceAdventure296", "choiceAdventure297", "choiceAdventure298", "choiceAdventure299", "choiceAdventure302", "choiceAdventure303", "choiceAdventure304", "choiceAdventure305", "choiceAdventure306", "choiceAdventure307", "choiceAdventure308", "choiceAdventure309", "choiceAdventure310", "choiceAdventure311", "choiceAdventure317", "choiceAdventure318", "choiceAdventure319", "choiceAdventure320", "choiceAdventure321", "choiceAdventure322", "choiceAdventure326", "choiceAdventure327", "choiceAdventure328", "choiceAdventure329", "choiceAdventure330", "choiceAdventure331", "choiceAdventure332", "choiceAdventure333", "choiceAdventure334", "choiceAdventure335", "choiceAdventure336", "choiceAdventure337", "choiceAdventure338", "choiceAdventure339", "choiceAdventure340", "choiceAdventure341", "choiceAdventure342", "choiceAdventure343", "choiceAdventure344", "choiceAdventure345", "choiceAdventure346", "choiceAdventure347", "choiceAdventure348", "choiceAdventure349", "choiceAdventure350", "choiceAdventure351", "choiceAdventure352", "choiceAdventure353", "choiceAdventure354", "choiceAdventure355", "choiceAdventure356", "choiceAdventure357", "choiceAdventure358", "choiceAdventure360", "choiceAdventure361", "choiceAdventure362", "choiceAdventure363", "choiceAdventure364", "choiceAdventure365", "choiceAdventure366", "choiceAdventure367", "choiceAdventure372", "choiceAdventure376", "choiceAdventure387", "choiceAdventure388", "choiceAdventure389", "choiceAdventure390", "choiceAdventure391", "choiceAdventure392", "choiceAdventure393", "choiceAdventure395", "choiceAdventure396", "choiceAdventure397", "choiceAdventure398", "choiceAdventure399", "choiceAdventure400", "choiceAdventure401", "choiceAdventure402", "choiceAdventure403", "choiceAdventure423", "choiceAdventure424", "choiceAdventure425", "choiceAdventure426", "choiceAdventure427", "choiceAdventure428", "choiceAdventure429", "choiceAdventure430", "choiceAdventure431", "choiceAdventure432", "choiceAdventure433", "choiceAdventure435", "choiceAdventure438", "choiceAdventure439", "choiceAdventure442", "choiceAdventure444", "choiceAdventure445", "choiceAdventure446", "choiceAdventure447", "choiceAdventure448", "choiceAdventure449", "choiceAdventure451", "choiceAdventure452", "choiceAdventure453", "choiceAdventure454", "choiceAdventure455", "choiceAdventure456", "choiceAdventure457", "choiceAdventure458", "choiceAdventure460", "choiceAdventure461", "choiceAdventure462", "choiceAdventure463", "choiceAdventure464", "choiceAdventure465", "choiceAdventure467", "choiceAdventure468", "choiceAdventure469", "choiceAdventure470", "choiceAdventure471", "choiceAdventure472", "choiceAdventure473", "choiceAdventure474", "choiceAdventure475", "choiceAdventure477", "choiceAdventure478", "choiceAdventure480", "choiceAdventure483", "choiceAdventure484", "choiceAdventure485", "choiceAdventure486", "choiceAdventure488", "choiceAdventure489", "choiceAdventure490", "choiceAdventure491", "choiceAdventure496", "choiceAdventure497", "choiceAdventure502", "choiceAdventure503", "choiceAdventure504", "choiceAdventure505", "choiceAdventure506", "choiceAdventure507", "choiceAdventure509", "choiceAdventure510", "choiceAdventure511", "choiceAdventure512", "choiceAdventure513", "choiceAdventure514", "choiceAdventure515", "choiceAdventure517", "choiceAdventure518", "choiceAdventure519", "choiceAdventure521", "choiceAdventure522", "choiceAdventure523", "choiceAdventure527", "choiceAdventure528", "choiceAdventure529", "choiceAdventure530", "choiceAdventure531", "choiceAdventure532", "choiceAdventure533", "choiceAdventure534", "choiceAdventure535", "choiceAdventure536", "choiceAdventure538", "choiceAdventure539", "choiceAdventure542", "choiceAdventure543", "choiceAdventure544", "choiceAdventure546", "choiceAdventure548", "choiceAdventure549", "choiceAdventure550", "choiceAdventure551", "choiceAdventure552", "choiceAdventure553", "choiceAdventure554", "choiceAdventure556", "choiceAdventure557", "choiceAdventure558", "choiceAdventure559", "choiceAdventure560", "choiceAdventure561", "choiceAdventure562", "choiceAdventure563", "choiceAdventure564", "choiceAdventure565", "choiceAdventure566", "choiceAdventure567", "choiceAdventure568", "choiceAdventure569", "choiceAdventure571", "choiceAdventure572", "choiceAdventure573", "choiceAdventure574", "choiceAdventure575", "choiceAdventure576", "choiceAdventure577", "choiceAdventure578", "choiceAdventure579", "choiceAdventure581", "choiceAdventure582", "choiceAdventure583", "choiceAdventure584", "choiceAdventure594", "choiceAdventure595", "choiceAdventure596", "choiceAdventure597", "choiceAdventure598", "choiceAdventure599", "choiceAdventure600", "choiceAdventure603", "choiceAdventure604", "choiceAdventure616", "choiceAdventure634", "choiceAdventure640", "choiceAdventure654", "choiceAdventure655", "choiceAdventure656", "choiceAdventure657", "choiceAdventure658", "choiceAdventure664", "choiceAdventure669", "choiceAdventure670", "choiceAdventure671", "choiceAdventure672", "choiceAdventure673", "choiceAdventure674", "choiceAdventure675", "choiceAdventure676", "choiceAdventure677", "choiceAdventure678", "choiceAdventure679", "choiceAdventure681", "choiceAdventure683", "choiceAdventure684", "choiceAdventure685", "choiceAdventure686", "choiceAdventure687", "choiceAdventure688", "choiceAdventure689", "choiceAdventure690", "choiceAdventure691", "choiceAdventure692", "choiceAdventure693", "choiceAdventure694", "choiceAdventure695", "choiceAdventure696", "choiceAdventure697", "choiceAdventure698", "choiceAdventure700", "choiceAdventure701", "choiceAdventure705", "choiceAdventure706", "choiceAdventure707", "choiceAdventure708", "choiceAdventure709", "choiceAdventure710", "choiceAdventure711", "choiceAdventure712", "choiceAdventure713", "choiceAdventure714", "choiceAdventure715", "choiceAdventure716", "choiceAdventure717", "choiceAdventure721", "choiceAdventure725", "choiceAdventure729", "choiceAdventure733", "choiceAdventure737", "choiceAdventure741", "choiceAdventure745", "choiceAdventure749", "choiceAdventure753", "choiceAdventure771", "choiceAdventure778", "choiceAdventure780", "choiceAdventure781", "choiceAdventure783", "choiceAdventure784", "choiceAdventure785", "choiceAdventure786", "choiceAdventure787", "choiceAdventure788", "choiceAdventure789", "choiceAdventure791", "choiceAdventure793", "choiceAdventure794", "choiceAdventure795", "choiceAdventure796", "choiceAdventure797", "choiceAdventure803", "choiceAdventure805", "choiceAdventure808", "choiceAdventure809", "choiceAdventure813", "choiceAdventure815", "choiceAdventure830", "choiceAdventure832", "choiceAdventure833", "choiceAdventure834", "choiceAdventure835", "choiceAdventure837", "choiceAdventure838", "choiceAdventure839", "choiceAdventure840", "choiceAdventure841", "choiceAdventure842", "choiceAdventure851", "choiceAdventure852", "choiceAdventure853", "choiceAdventure854", "choiceAdventure855", "choiceAdventure856", "choiceAdventure857", "choiceAdventure858", "choiceAdventure866", "choiceAdventure873", "choiceAdventure875", "choiceAdventure876", "choiceAdventure877", "choiceAdventure878", "choiceAdventure879", "choiceAdventure880", "choiceAdventure881", "choiceAdventure882", "choiceAdventure888", "choiceAdventure889", "choiceAdventure918", "choiceAdventure919", "choiceAdventure920", "choiceAdventure921", "choiceAdventure923", "choiceAdventure924", "choiceAdventure925", "choiceAdventure926", "choiceAdventure927", "choiceAdventure928", "choiceAdventure929", "choiceAdventure930", "choiceAdventure931", "choiceAdventure932", "choiceAdventure940", "choiceAdventure941", "choiceAdventure942", "choiceAdventure943", "choiceAdventure944", "choiceAdventure945", "choiceAdventure946", "choiceAdventure950", "choiceAdventure955", "choiceAdventure957", "choiceAdventure958", "choiceAdventure959", "choiceAdventure960", "choiceAdventure961", "choiceAdventure962", "choiceAdventure963", "choiceAdventure964", "choiceAdventure965", "choiceAdventure966", "choiceAdventure970", "choiceAdventure973", "choiceAdventure974", "choiceAdventure975", "choiceAdventure976", "choiceAdventure977", "choiceAdventure979", "choiceAdventure980", "choiceAdventure981", "choiceAdventure982", "choiceAdventure983", "choiceAdventure988", "choiceAdventure989", "choiceAdventure993", "choiceAdventure998", "choiceAdventure1000", "choiceAdventure1003", "choiceAdventure1005", "choiceAdventure1006", "choiceAdventure1007", "choiceAdventure1008", "choiceAdventure1009", "choiceAdventure1010", "choiceAdventure1011", "choiceAdventure1012", "choiceAdventure1013", "choiceAdventure1015", "choiceAdventure1016", "choiceAdventure1017", "choiceAdventure1018", "choiceAdventure1019", "choiceAdventure1020", "choiceAdventure1021", "choiceAdventure1022", "choiceAdventure1023", "choiceAdventure1026", "choiceAdventure1027", "choiceAdventure1028", "choiceAdventure1029", "choiceAdventure1030", "choiceAdventure1031", "choiceAdventure1032", "choiceAdventure1033", "choiceAdventure1034", "choiceAdventure1035", "choiceAdventure1036", "choiceAdventure1037", "choiceAdventure1038", "choiceAdventure1039", "choiceAdventure1040", "choiceAdventure1041", "choiceAdventure1042", "choiceAdventure1044", "choiceAdventure1045", "choiceAdventure1046", "choiceAdventure1048", "choiceAdventure1051", "choiceAdventure1052", "choiceAdventure1053", "choiceAdventure1054", "choiceAdventure1055", "choiceAdventure1056", "choiceAdventure1057", "choiceAdventure1059", "choiceAdventure1060", "choiceAdventure1061", "choiceAdventure1062", "choiceAdventure1065", "choiceAdventure1067", "choiceAdventure1068", "choiceAdventure1069", "choiceAdventure1070", "choiceAdventure1071", "choiceAdventure1073", "choiceAdventure1077", "choiceAdventure1080", "choiceAdventure1081", "choiceAdventure1082", "choiceAdventure1083", "choiceAdventure1084", "choiceAdventure1085", "choiceAdventure1091", "choiceAdventure1094", "choiceAdventure1095", "choiceAdventure1096", "choiceAdventure1097", "choiceAdventure1102", "choiceAdventure1106", "choiceAdventure1107", "choiceAdventure1108", "choiceAdventure1110", "choiceAdventure1114", "choiceAdventure1115", "choiceAdventure1116", "choiceAdventure1118", "choiceAdventure1119", "choiceAdventure1120", "choiceAdventure1121", "choiceAdventure1122", "choiceAdventure1123", "choiceAdventure1171", "choiceAdventure1172", "choiceAdventure1173", "choiceAdventure1174", "choiceAdventure1175", "choiceAdventure1193", "choiceAdventure1195", "choiceAdventure1196", "choiceAdventure1197", "choiceAdventure1198", "choiceAdventure1199", "choiceAdventure1202", "choiceAdventure1203", "choiceAdventure1204", "choiceAdventure1205", "choiceAdventure1206", "choiceAdventure1207", "choiceAdventure1208", "choiceAdventure1209", "choiceAdventure1210", "choiceAdventure1211", "choiceAdventure1212", "choiceAdventure1213", "choiceAdventure1214", "choiceAdventure1215", "choiceAdventure1219", "choiceAdventure1222", "choiceAdventure1223", "choiceAdventure1224", "choiceAdventure1225", "choiceAdventure1226", "choiceAdventure1227", "choiceAdventure1228", "choiceAdventure1229", "choiceAdventure1236", "choiceAdventure1237", "choiceAdventure1238", "choiceAdventure1239", "choiceAdventure1240", "choiceAdventure1241", "choiceAdventure1242", "choiceAdventure1243", "choiceAdventure1244", "choiceAdventure1245", "choiceAdventure1246", "choiceAdventure1247", "choiceAdventure1248", "choiceAdventure1249", "choiceAdventure1250", "choiceAdventure1251", "choiceAdventure1252", "choiceAdventure1253", "choiceAdventure1254", "choiceAdventure1255", "choiceAdventure1256", "choiceAdventure1266", "choiceAdventure1280", "choiceAdventure1281", "choiceAdventure1282", "choiceAdventure1283", "choiceAdventure1284", "choiceAdventure1285", "choiceAdventure1286", "choiceAdventure1287", "choiceAdventure1288", "choiceAdventure1289", "choiceAdventure1290", "choiceAdventure1291", "choiceAdventure1292", "choiceAdventure1293", "choiceAdventure1294", "choiceAdventure1295", "choiceAdventure1296", "choiceAdventure1297", "choiceAdventure1298", "choiceAdventure1299", "choiceAdventure1300", "choiceAdventure1301", "choiceAdventure1302", "choiceAdventure1303", "choiceAdventure1304", "choiceAdventure1305", "choiceAdventure1307", "choiceAdventure1310", "choiceAdventure1312", "choiceAdventure1313", "choiceAdventure1314", "choiceAdventure1315", "choiceAdventure1316", "choiceAdventure1317", "choiceAdventure1318", "choiceAdventure1319", "choiceAdventure1321", "choiceAdventure1322", "choiceAdventure1323", "choiceAdventure1324", "choiceAdventure1325", "choiceAdventure1326", "choiceAdventure1327", "choiceAdventure1328", "choiceAdventure1332", "choiceAdventure1333", "choiceAdventure1335", "choiceAdventure1340", "choiceAdventure1341", "choiceAdventure1345", "choiceAdventure1389", "choiceAdventure1392", "choiceAdventure1397", "choiceAdventure1399", "choiceAdventure1405", "choiceAdventure1411", "choiceAdventure1415", "choiceAdventure1427", "choiceAdventure1428", "choiceAdventure1429", "choiceAdventure1430", "choiceAdventure1431", "choiceAdventure1432", "choiceAdventure1433", "choiceAdventure1434", "choiceAdventure1436", "choiceAdventure1460", "choiceAdventure1461", "choiceAdventure1467", "choiceAdventure1468", "choiceAdventure1469", "choiceAdventure1470", "choiceAdventure1471", "choiceAdventure1472", "choiceAdventure1473", "choiceAdventure1474", "choiceAdventure1475"];
var familiarProperties = ["commaFamiliar", "nextQuantumFamiliar", "stillsuitFamiliar"];
var statProperties = ["nsChallenge1", "snojoSetting"];
var phylumProperties = ["dnaSyringe", "locketPhylum", "redSnapperPhylum"];
;// CONCATENATED MODULE: ./node_modules/libram/dist/propertyTyping.js

var booleanPropertiesSet = new Set(booleanProperties);
var numericPropertiesSet = new Set(numericProperties);
var numericOrStringPropertiesSet = new Set(numericOrStringProperties);
var stringPropertiesSet = new Set(stringProperties);
var locationPropertiesSet = new Set(locationProperties);
var monsterPropertiesSet = new Set(monsterProperties);
var familiarPropertiesSet = new Set(familiarProperties);
var statPropertiesSet = new Set(statProperties);
var phylumPropertiesSet = new Set(phylumProperties);
function isBooleanProperty(property) {
  return booleanPropertiesSet.has(property);
}
function isNumericProperty(property) {
  return numericPropertiesSet.has(property);
}
function isNumericOrStringProperty(property) {
  return numericOrStringPropertiesSet.has(property);
}
function isStringProperty(property) {
  return stringPropertiesSet.has(property);
}
function isLocationProperty(property) {
  return locationPropertiesSet.has(property);
}
function isMonsterProperty(property) {
  return monsterPropertiesSet.has(property);
}
function isFamiliarProperty(property) {
  return familiarPropertiesSet.has(property);
}
function isStatProperty(property) {
  return statPropertiesSet.has(property);
}
function isPhylumProperty(property) {
  return phylumPropertiesSet.has(property);
}
;// CONCATENATED MODULE: ./node_modules/libram/dist/property.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var createPropertyGetter = transform => (property, default_) => {
  var value = (0,external_kolmafia_.getProperty)(property);

  if (default_ !== undefined && value === "") {
    return default_;
  }

  return transform(value, property);
};

var createMafiaClassPropertyGetter = (Type, toType) => createPropertyGetter(value => {
  if (value === "") return null;
  var v = toType(value);
  return v === Type.none ? null : v;
});

var getString = createPropertyGetter(value => value);
var getCommaSeparated = createPropertyGetter(value => value.split(/, ?/));
var getBoolean = createPropertyGetter(value => value === "true");
var getNumber = createPropertyGetter(value => Number(value));
var getBounty = createMafiaClassPropertyGetter(external_kolmafia_.Bounty, external_kolmafia_.toBounty);
var getClass = createMafiaClassPropertyGetter(external_kolmafia_.Class, external_kolmafia_.toClass);
var getCoinmaster = createMafiaClassPropertyGetter(external_kolmafia_.Coinmaster, external_kolmafia_.toCoinmaster);
var getEffect = createMafiaClassPropertyGetter(external_kolmafia_.Effect, external_kolmafia_.toEffect);
var getElement = createMafiaClassPropertyGetter(external_kolmafia_.Element, external_kolmafia_.toElement);
var getFamiliar = createMafiaClassPropertyGetter(external_kolmafia_.Familiar, external_kolmafia_.toFamiliar);
var getItem = createMafiaClassPropertyGetter(external_kolmafia_.Item, external_kolmafia_.toItem);
var getLocation = createMafiaClassPropertyGetter(external_kolmafia_.Location, external_kolmafia_.toLocation);
var getMonster = createMafiaClassPropertyGetter(external_kolmafia_.Monster, external_kolmafia_.toMonster);
var getPhylum = createMafiaClassPropertyGetter(external_kolmafia_.Phylum, external_kolmafia_.toPhylum);
var getServant = createMafiaClassPropertyGetter(external_kolmafia_.Servant, external_kolmafia_.toServant);
var getSkill = createMafiaClassPropertyGetter(external_kolmafia_.Skill, external_kolmafia_.toSkill);
var getSlot = createMafiaClassPropertyGetter(external_kolmafia_.Slot, external_kolmafia_.toSlot);
var getStat = createMafiaClassPropertyGetter(external_kolmafia_.Stat, external_kolmafia_.toStat);
var getThrall = createMafiaClassPropertyGetter(external_kolmafia_.Thrall, external_kolmafia_.toThrall);
function property_get(property, _default) {
  var value = getString(property); // Handle known properties.

  if (isBooleanProperty(property)) {
    var _getBoolean;

    return (_getBoolean = getBoolean(property, _default)) !== null && _getBoolean !== void 0 ? _getBoolean : false;
  } else if (isNumericProperty(property)) {
    var _getNumber;

    return (_getNumber = getNumber(property, _default)) !== null && _getNumber !== void 0 ? _getNumber : 0;
  } else if (isNumericOrStringProperty(property)) {
    return value.match(/^\d+$/) ? parseInt(value) : value;
  } else if (isLocationProperty(property)) {
    return getLocation(property, _default);
  } else if (isMonsterProperty(property)) {
    return getMonster(property, _default);
  } else if (isFamiliarProperty(property)) {
    return getFamiliar(property, _default);
  } else if (isStatProperty(property)) {
    return getStat(property, _default);
  } else if (isPhylumProperty(property)) {
    return getPhylum(property, _default);
  } else if (isStringProperty(property)) {
    return value;
  } // Not a KnownProperty from here on out.


  if (_default instanceof external_kolmafia_.Location) {
    return getLocation(property, _default);
  } else if (_default instanceof external_kolmafia_.Monster) {
    return getMonster(property, _default);
  } else if (_default instanceof external_kolmafia_.Familiar) {
    return getFamiliar(property, _default);
  } else if (_default instanceof external_kolmafia_.Stat) {
    return getStat(property, _default);
  } else if (_default instanceof external_kolmafia_.Phylum) {
    return getPhylum(property, _default);
  } else if (typeof _default === "boolean") {
    return value === "true" ? true : value === "false" ? false : _default;
  } else if (typeof _default === "number") {
    return value === "" ? _default : parseInt(value);
  } else if (value === "") {
    return _default === undefined ? "" : _default;
  } else {
    return value;
  }
} // eslint-disable-next-line @typescript-eslint/no-explicit-any

function property_set(property, value) {
  var stringValue = value === null ? "" : value.toString();
  setProperty(property, stringValue);
}


function setProperties(properties) {
  for (var _i = 0, _Object$entries = Object.entries(properties); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        prop = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    property_set(prop, value);
  }
}
function withProperties(properties, callback) {
  var propertiesBackup = Object.fromEntries(Object.entries(properties).map(_ref => {
    var _ref2 = _slicedToArray(_ref, 1),
        prop = _ref2[0];

    return [prop, property_get(prop)];
  }));
  setProperties(properties);

  try {
    callback();
  } finally {
    setProperties(propertiesBackup);
  }
}
function withProperty(property, value, callback) {
  withProperties(_defineProperty({}, property, value), callback);
}
function withChoices(choices, callback) {
  var properties = Object.fromEntries(Object.entries(choices).map(_ref3 => {
    var _ref4 = _slicedToArray(_ref3, 2),
        choice = _ref4[0],
        option = _ref4[1];

    return ["choiceAdventure".concat(choice), option];
  }));
  withProperties(properties, callback);
}
function withChoice(choice, value, callback) {
  withChoices(_defineProperty({}, choice, value), callback);
}
var property_PropertiesManager = /*#__PURE__*/(/* unused pure expression or super */ null && (function () {
  function PropertiesManager() {
    _classCallCheck(this, PropertiesManager);

    _defineProperty(this, "properties", {});
  }

  _createClass(PropertiesManager, [{
    key: "storedValues",
    get: function get() {
      return this.properties;
    }
    /**
     * Sets a collection of properties to the given values, storing the old values.
     * @param propertiesToSet A Properties object, keyed by property name.
     */

  }, {
    key: "set",
    value: function set(propertiesToSet) {
      for (var _i2 = 0, _Object$entries2 = Object.entries(propertiesToSet); _i2 < _Object$entries2.length; _i2++) {
        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
            propertyName = _Object$entries2$_i[0],
            propertyValue = _Object$entries2$_i[1];

        if (this.properties[propertyName] === undefined) {
          this.properties[propertyName] = property_get(propertyName);
        }

        property_set(propertyName, propertyValue);
      }
    }
    /**
     * Sets a collection of choice adventure properties to the given values, storing the old values.
     * @param choicesToSet An object keyed by choice adventure number.
     */

  }, {
    key: "setChoices",
    value: function setChoices(choicesToSet) {
      this.set(Object.fromEntries(Object.entries(choicesToSet).map(_ref5 => {
        var _ref6 = _slicedToArray(_ref5, 2),
            choiceNumber = _ref6[0],
            choiceValue = _ref6[1];

        return ["choiceAdventure".concat(choiceNumber), choiceValue];
      })));
    }
    /**
     * Sets a single choice adventure property to the given value, storing the old value.
     * @param choiceToSet The number of the choice adventure to set the property for.
     * @param value The value to assign to that choice adventure.
     */

  }, {
    key: "setChoice",
    value: function setChoice(choiceToSet, value) {
      this.setChoices(_defineProperty({}, choiceToSet, value));
    }
    /**
     * Resets the given properties to their original stored value. Does not delete entries from the manager.
     * @param properties Collection of properties to reset.
     */

  }, {
    key: "reset",
    value: function reset() {
      for (var _len = arguments.length, properties = new Array(_len), _key = 0; _key < _len; _key++) {
        properties[_key] = arguments[_key];
      }

      for (var _i3 = 0, _properties = properties; _i3 < _properties.length; _i3++) {
        var property = _properties[_i3];
        var value = this.properties[property];

        if (value) {
          property_set(property, value);
        }
      }
    }
    /**
     * Iterates over all stored values, setting each property back to its original stored value. Does not delete entries from the manager.
     */

  }, {
    key: "resetAll",
    value: function resetAll() {
      setProperties(this.properties);
    }
    /**
     * Stops storing the original values of inputted properties.
     * @param properties Properties for the manager to forget.
     */

  }, {
    key: "clear",
    value: function clear() {
      for (var _len2 = arguments.length, properties = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        properties[_key2] = arguments[_key2];
      }

      for (var _i4 = 0, _properties2 = properties; _i4 < _properties2.length; _i4++) {
        var property = _properties2[_i4];

        if (this.properties[property]) {
          delete this.properties[property];
        }
      }
    }
    /**
     * Clears all properties.
     */

  }, {
    key: "clearAll",
    value: function clearAll() {
      this.properties = {};
    }
    /**
     * Increases a numeric property to the given value if necessary.
     * @param property The numeric property we want to potentially raise.
     * @param value The minimum value we want that property to have.
     * @returns Whether we needed to change the property.
     */

  }, {
    key: "setMinimumValue",
    value: function setMinimumValue(property, value) {
      if (property_get(property, 0) < value) {
        this.set(_defineProperty({}, property, value));
        return true;
      }

      return false;
    }
    /**
     * Decrease a numeric property to the given value if necessary.
     * @param property The numeric property we want to potentially lower.
     * @param value The maximum value we want that property to have.
     * @returns Whether we needed to change the property.
     */

  }, {
    key: "setMaximumValue",
    value: function setMaximumValue(property, value) {
      if (property_get(property, 0) > value) {
        this.set(_defineProperty({}, property, value));
        return true;
      }

      return false;
    }
    /**
     * Creates a new PropertiesManager with identical stored values to this one.
     * @returns A new PropertiesManager, with identical stored values to this one.
     */

  }, {
    key: "clone",
    value: function clone() {
      var newGuy = new PropertiesManager();
      newGuy.properties = this.storedValues;
      return newGuy;
    }
    /**
     * Clamps a numeric property, modulating it up or down to fit within a specified range
     * @param property The numeric property to clamp
     * @param min The lower bound for what we want the property to be allowed to be.
     * @param max The upper bound for what we want the property to be allowed to be.
     * @returns Whether we ended up changing the property or not.
     */

  }, {
    key: "clamp",
    value: function clamp(property, min, max) {
      if (max < min) return false;
      var start = property_get(property);
      this.setMinimumValue(property, min);
      this.setMaximumValue(property, max);
      return start !== property_get(property);
    }
    /**
     * Determines whether this PropertiesManager has identical stored values to another.
     * @param other The PropertiesManager to compare to this one.
     * @returns Whether their StoredValues are identical.
     */

  }, {
    key: "equals",
    value: function equals(other) {
      var thisProps = Object.entries(this.storedValues);
      var otherProps = new Map(Object.entries(other.storedValues));
      if (thisProps.length !== otherProps.size) return false;

      for (var _i5 = 0, _thisProps = thisProps; _i5 < _thisProps.length; _i5++) {
        var _thisProps$_i = _slicedToArray(_thisProps[_i5], 2),
            propertyName = _thisProps$_i[0],
            propertyValue = _thisProps$_i[1];

        if (otherProps.get(propertyName) === propertyValue) return false;
      }

      return true;
    }
    /**
     * Merges a PropertiesManager onto this one, letting the input win in the event that both PropertiesManagers have a value stored.
     * @param other The PropertiesManager to be merged onto this one.
     * @returns A new PropertiesManager with stored values from both its parents.
     */

  }, {
    key: "merge",
    value: function merge(other) {
      var newGuy = new PropertiesManager();
      newGuy.properties = _objectSpread(_objectSpread({}, this.properties), other.properties);
      return newGuy;
    }
    /**
     * Merges an arbitrary collection of PropertiesManagers, letting the rightmost PropertiesManager win in the event of verlap.
     * @param mergees The PropertiesManagers to merge together.
     * @returns A PropertiesManager that is just an amalgam of all the constituents.
     */

  }], [{
    key: "merge",
    value: function merge() {
      for (var _len3 = arguments.length, mergees = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        mergees[_key3] = arguments[_key3];
      }

      if (mergees.length === 0) return new PropertiesManager();
      return mergees.reduce((a, b) => a.merge(b));
    }
  }]);

  return PropertiesManager;
}()));
;// CONCATENATED MODULE: ./node_modules/grimoire-kolmafia/dist/args.js
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = args_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function args_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return args_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return args_arrayLikeToArray(o, minLen); }

function args_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function args_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function args_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? args_ownKeys(Object(source), !0).forEach(function (key) { args_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : args_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function args_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function args_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function args_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function args_createClass(Constructor, protoProps, staticProps) { if (protoProps) args_defineProperties(Constructor.prototype, protoProps); if (staticProps) args_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/* eslint-disable @typescript-eslint/no-explicit-any */


var Args = /*#__PURE__*/function () {
  function Args() {
    args_classCallCheck(this, Args);
  }

  args_createClass(Args, null, [{
    key: "custom",
    value: function custom(spec, _parser, valueHelpName) {
      var _a, _b;

      var raw_options = (_a = spec.options) === null || _a === void 0 ? void 0 : _a.map(option => option[0]); // Check that the default value actually appears in the options.

      if ("default" in spec && raw_options) {
        if (!raw_options.includes(spec.default)) {
          throw "Invalid default value ".concat(spec.default);
        }
      }

      return args_objectSpread(args_objectSpread({}, spec), {}, {
        valueHelpName: valueHelpName,
        parser: value => {
          var parsed_value = _parser(value);

          if (parsed_value === undefined || parsed_value instanceof ParseError) return parsed_value;

          if (raw_options) {
            if (!raw_options.includes(parsed_value)) {
              return new ParseError("received ".concat(value, " which was not in the allowed options"));
            }
          }

          return parsed_value;
        },
        options: (_b = spec.options) === null || _b === void 0 ? void 0 : _b.map(a => ["".concat(a[0]), a[1]])
      });
    }
  }, {
    key: "arrayFromArg",
    value: function arrayFromArg(spec, argFromSpec) {
      var _a, _b, _c; // First, construct a non-array version of this argument.
      // We do this by calling argFromSpec in order to extract the parser and
      // valueHelpName (to make it easier to define the functions below).
      //
      // The default argument of an ArraySpec is of type T[], which causes
      // problems, so we must remove it.


      var spec_without_default = args_objectSpread({}, spec); // Avoid "the operand of a 'delete' operator must be optional"


      if ("default" in spec_without_default) delete spec_without_default["default"];
      var arg = argFromSpec.call(this, spec_without_default); // Next, check that all default values actually appear in the options.

      var raw_options = (_a = spec.options) === null || _a === void 0 ? void 0 : _a.map(option => option[0]);

      if ("default" in spec && raw_options) {
        var _iterator = _createForOfIteratorHelper(spec.default),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var default_entry = _step.value;
            if (!raw_options.includes(default_entry)) throw "Invalid default value ".concat(spec.default);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      var separator = (_b = spec.separator) !== null && _b !== void 0 ? _b : ",";

      var arrayParser = value => {
        // Split the array
        var values = value.split(separator);
        if (!spec.noTrim) values = values.map(v => v.trim()); // Parse all values, return the first error found if any

        var result = values.map(v => arg.parser(v));
        var error = result.find(v => v instanceof ParseError);
        if (error) return error;
        var failure_index = result.indexOf(undefined);
        if (failure_index !== -1) return new ParseError("components expected ".concat(arg.parser.name, "$ but could not parse ").concat(values[failure_index])); // Otherwise, all values are good

        return result;
      };

      return args_objectSpread(args_objectSpread({}, spec), {}, {
        valueHelpName: "".concat(arg.valueHelpName).concat(separator, " ").concat(arg.valueHelpName).concat(separator, " ..."),
        parser: arrayParser,
        options: (_c = spec.options) === null || _c === void 0 ? void 0 : _c.map(a => ["".concat(a[0]), a[1]])
      });
    }
  }, {
    key: "string",
    value: function string(spec) {
      return this.custom(spec, value => value, "TEXT");
    }
  }, {
    key: "strings",
    value: function strings(spec) {
      return this.arrayFromArg(spec, this.string);
    }
  }, {
    key: "number",
    value: function number(spec) {
      return this.custom(spec, value => isNaN(Number(value)) ? undefined : Number(value), "NUMBER");
    }
  }, {
    key: "numbers",
    value: function numbers(spec) {
      return this.arrayFromArg(spec, this.number);
    }
  }, {
    key: "boolean",
    value: function boolean(spec) {
      return this.custom(spec, value => {
        if (value.toLowerCase() === "true") return true;
        if (value.toLowerCase() === "false") return false;
        return undefined;
      }, "BOOLEAN");
    }
  }, {
    key: "booleans",
    value: function booleans(spec) {
      return this.arrayFromArg(spec, this.boolean);
    }
  }, {
    key: "flag",
    value: function flag(spec) {
      return this.custom(spec, value => {
        if (value.toLowerCase() === "true") return true;
        if (value.toLowerCase() === "false") return false;
        return undefined;
      }, "FLAG");
    }
  }, {
    key: "class",
    value: function _class(spec) {
      return this.custom(spec, value => {
        var match = external_kolmafia_.Class.get(value); // Class.get does fuzzy matching:
        //  e.g. Class.get("sc") returns disco bandit.
        // To avoid this foot-gun, only return exact matches or id lookups.

        if (match.toString().toUpperCase() === value.toString().toUpperCase()) return match;
        if (!isNaN(Number(value))) return match;
        return undefined;
      }, "CLASS");
    }
  }, {
    key: "classes",
    value: function classes(spec) {
      return this.arrayFromArg(spec, this.class);
    }
  }, {
    key: "effect",
    value: function effect(spec) {
      return this.custom(spec, external_kolmafia_.Effect.get, "EFFECT");
    }
  }, {
    key: "effects",
    value: function effects(spec) {
      return this.arrayFromArg(spec, this.effect);
    }
  }, {
    key: "familiar",
    value: function familiar(spec) {
      return this.custom(spec, external_kolmafia_.Familiar.get, "FAMILIAR");
    }
  }, {
    key: "familiars",
    value: function familiars(spec) {
      return this.arrayFromArg(spec, this.familiar);
    }
  }, {
    key: "item",
    value: function item(spec) {
      return this.custom(spec, external_kolmafia_.Item.get, "ITEM");
    }
  }, {
    key: "items",
    value: function items(spec) {
      return this.arrayFromArg(spec, this.item);
    }
  }, {
    key: "location",
    value: function location(spec) {
      return this.custom(spec, external_kolmafia_.Location.get, "LOCATION");
    }
  }, {
    key: "locations",
    value: function locations(spec) {
      return this.arrayFromArg(spec, this.location);
    }
  }, {
    key: "monster",
    value: function monster(spec) {
      return this.custom(spec, external_kolmafia_.Monster.get, "MONSTER");
    }
  }, {
    key: "monsters",
    value: function monsters(spec) {
      return this.arrayFromArg(spec, this.monster);
    }
  }, {
    key: "path",
    value: function path(spec) {
      return this.custom(spec, external_kolmafia_.Path.get, "PATH");
    }
  }, {
    key: "paths",
    value: function paths(spec) {
      return this.arrayFromArg(spec, this.path);
    }
  }, {
    key: "skill",
    value: function skill(spec) {
      return this.custom(spec, external_kolmafia_.Skill.get, "SKILL");
    }
  }, {
    key: "skills",
    value: function skills(spec) {
      return this.arrayFromArg(spec, this.skill);
    }
    /**
     * Create a group of arguments that will be printed separately in the help.
     *
     * Note that keys in the group must still be globally distinct.
     *
     * @param groupName The display name for the group in help.
     * @param args A JS object specifying the script arguments. Its values should
     *    be {@link Arg} objects (created by Args.string, Args.number, or others)
     *    or groups of arguments (created by Args.group).
     */

  }, {
    key: "group",
    value: function group(groupName, args) {
      return {
        name: groupName,
        args: args
      };
    }
    /**
     * Create a set of input arguments for a script.
     * @param scriptName Prefix for property names; often the name of the script.
     * @param scriptHelp Brief description of this script, for the help message.
     * @param args A JS object specifying the script arguments. Its values should
     *    be {@link Arg} objects (created by Args.string, Args.number, or others)
     *    or groups of arguments (created by Args.group).
     * @param options Config options for the args and arg parser.
     * @returns An object which can hold parsed argument values. The keys of this
     *    object are identical to the keys in 'args'.
     */

  }, {
    key: "create",
    value: function create(scriptName, scriptHelp, args, options) {
      var _objectSpread2;

      _traverse(args, (keySpec, key) => {
        if (key === "help" || keySpec.key === "help") throw "help is a reserved argument name";
      });

      var argsWithHelp = args_objectSpread(args_objectSpread({}, args), {}, {
        help: this.flag({
          help: "Show this message and exit.",
          setting: ""
        })
      }); // Create an object to hold argument results, with a default value for
      // each argument.


      var res = args_objectSpread(args_objectSpread({}, _loadDefaultValues(argsWithHelp)), {}, (_objectSpread2 = {}, args_defineProperty(_objectSpread2, specSymbol, argsWithHelp), args_defineProperty(_objectSpread2, scriptSymbol, scriptName), args_defineProperty(_objectSpread2, scriptHelpSymbol, scriptHelp), args_defineProperty(_objectSpread2, optionsSymbol, options !== null && options !== void 0 ? options : {}), _objectSpread2));

      var metadata = Args.getMetadata(res); // Parse values from settings.

      metadata.traverseAndMaybeSet(res, (keySpec, key) => {
        var _a, _b;

        var setting = (_a = keySpec.setting) !== null && _a !== void 0 ? _a : "".concat(scriptName, "_").concat((_b = keySpec.key) !== null && _b !== void 0 ? _b : key);
        if (setting === "") return undefined; // no setting

        var value_str = property_get(setting, "");
        if (value_str === "") return undefined; // no setting

        return parseAndValidate(keySpec, "Setting ".concat(setting), value_str);
      });

      if (options === null || options === void 0 ? void 0 : options.positionalArgs) {
        var keys = [];
        metadata.traverse((keySpec, key) => {
          var _a;

          keys.push((_a = keySpec.key) !== null && _a !== void 0 ? _a : key);
        });

        var _iterator2 = _createForOfIteratorHelper(options.positionalArgs),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var arg = _step2.value;
            if (!keys.includes(arg)) throw "Unknown key for positional arg: ".concat(arg);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }

      return res;
    }
    /**
     * Parse the command line input into the provided script arguments.
     * @param args An object to hold the parsed argument values, from Args.create(*).
     * @param command The command line input.
     */

  }, {
    key: "fill",
    value: function fill(args, command) {
      var _a;

      if (command === undefined || command === "") return;
      var metadata = Args.getMetadata(args); // Load the list of keys and flags from the arg spec

      var keys = new Set();
      var flags = new Set();
      metadata.traverse((keySpec, key) => {
        var _a;

        var name = (_a = keySpec.key) !== null && _a !== void 0 ? _a : key;
        if (flags.has(name) || keys.has(name)) throw "Duplicate arg key ".concat(name, " is not allowed");
        if (keySpec.valueHelpName === "FLAG") flags.add(name);else keys.add(name);
      }); // Parse new argments from the command line

      var parsed = new CommandParser(command, keys, flags, (_a = metadata.options.positionalArgs) !== null && _a !== void 0 ? _a : []).parse();
      metadata.traverseAndMaybeSet(args, (keySpec, key) => {
        var _a;

        var argKey = (_a = keySpec.key) !== null && _a !== void 0 ? _a : key;
        var value_str = parsed.get(argKey);
        if (value_str === undefined) return undefined; // no setting

        return parseAndValidate(keySpec, "Argument ".concat(argKey), value_str);
      });
    }
    /**
     * Parse command line input into a new set of script arguments.
     * @param scriptName Prefix to use in property names; typically the name of the script.
     * @param scriptHelp Brief description of this script, for the help message.
     * @param spec An object specifying the script arguments.
     * @param command The command line input.
     * @param options Config options for the args and arg parser.
     */

  }, {
    key: "parse",
    value: function parse(scriptName, scriptHelp, spec, command, options) {
      var args = this.create(scriptName, scriptHelp, spec, options);
      this.fill(args, command);
      return args;
    }
    /**
     * Print a description of the script arguments to the CLI.
     *
     * First, all top-level argument descriptions are printed in the order they
     * were defined. Afterwards, descriptions for groups of arguments are printed
     * in the order they were defined.
     *
     * @param args An object of parsed arguments, from Args.create(*).
     * @param maxOptionsToDisplay If given, do not list more than this many options for each arg.
     */

  }, {
    key: "showHelp",
    value: function showHelp(args, maxOptionsToDisplay) {
      var _a;

      var metadata = Args.getMetadata(args);
      (0,external_kolmafia_.printHtml)("".concat(metadata.scriptHelp));
      (0,external_kolmafia_.printHtml)("");
      (0,external_kolmafia_.printHtml)("<b>".concat((_a = metadata.options.defaultGroupName) !== null && _a !== void 0 ? _a : "Options", ":</b>"));
      metadata.traverse((arg, key) => {
        var _a, _b, _c, _d, _e;

        if (arg.hidden) return;
        var nameText = "<font color='blue'>".concat((_a = arg.key) !== null && _a !== void 0 ? _a : key, "</font>");
        var valueText = arg.valueHelpName === "FLAG" ? "" : "<font color='purple'>".concat(arg.valueHelpName, "</font>");
        var helpText = (_b = arg.help) !== null && _b !== void 0 ? _b : "";
        var defaultText = "default" in arg ? "<font color='#888888'>[default: ".concat(arg.default, "]</font>") : "";
        var settingText = arg.setting === "" ? "" : "<font color='#888888'>[setting: ".concat((_c = arg.setting) !== null && _c !== void 0 ? _c : "".concat(metadata.scriptName, "_").concat((_d = arg.key) !== null && _d !== void 0 ? _d : key), "]</font>");
        (0,external_kolmafia_.printHtml)("&nbsp;&nbsp;".concat([nameText, valueText, "-", helpText, defaultText, settingText].join(" ")));
        var valueOptions = (_e = arg.options) !== null && _e !== void 0 ? _e : [];

        if (valueOptions.length < (maxOptionsToDisplay !== null && maxOptionsToDisplay !== void 0 ? maxOptionsToDisplay : Number.MAX_VALUE)) {
          var _iterator3 = _createForOfIteratorHelper(valueOptions),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var option = _step3.value;

              if (option.length === 1) {
                (0,external_kolmafia_.printHtml)("&nbsp;&nbsp;&nbsp;&nbsp;<font color='blue'>".concat(nameText, "</font> ").concat(option[0]));
              } else {
                (0,external_kolmafia_.printHtml)("&nbsp;&nbsp;&nbsp;&nbsp;<font color='blue'>".concat(nameText, "</font> ").concat(option[0], " - ").concat(option[1]));
              }
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        }
      }, group => {
        (0,external_kolmafia_.printHtml)("");
        (0,external_kolmafia_.printHtml)("<b>".concat(group.name, ":</b>"));
      });
    }
    /**
     * Load the metadata information for a set of arguments. Only for advanced usage.
     *
     * @param args A JS object specifying the script arguments. Its values should
     *    be {@link Arg} objects (created by Args.string, Args.number, or others)
     *    or groups of arguments (created by Args.group).
     * @returns A class containing metadata information.
     */

  }, {
    key: "getMetadata",
    value: function getMetadata(args) {
      return new WrappedArgMetadata(args);
    }
  }]);

  return Args;
}();
var ParseError = /*#__PURE__*/args_createClass(function ParseError(message) {
  args_classCallCheck(this, ParseError);

  this.message = message;
});
/**
 * Metadata for the parsed arguments.
 *
 * This information is hidden within the parsed argument object so that it
 * is invisible to the user but available to fill(*) and showHelp(*).
 */

var specSymbol = Symbol("spec");
var scriptSymbol = Symbol("script");
var scriptHelpSymbol = Symbol("scriptHelp");
var optionsSymbol = Symbol("options");
/**
 * Parse a string into a value for a given argument, throwing if the parsing fails.
 * @param arg An argument that takes values in T.
 * @param source A description of where this value came from, for the error message.
 * @param value The value to parse.
 * @returns the parsed value.
 */

function parseAndValidate(arg, source, value) {
  var parsed_value;

  try {
    parsed_value = arg.parser(value);
  } catch (_a) {
    parsed_value = undefined;
  }

  if (parsed_value === undefined) throw "".concat(source, " expected ").concat(arg.parser.name, "$ but could not parse ").concat(value);
  if (parsed_value instanceof ParseError) throw "".concat(source, " ").concat(parsed_value.message);
  return parsed_value;
}
/**
 * A class that reveals the hidden metadata and specs for arguments.
 *
 * Only for advanced usage.
 */


var WrappedArgMetadata = /*#__PURE__*/function () {
  function WrappedArgMetadata(args) {
    args_classCallCheck(this, WrappedArgMetadata);

    this.spec = args[specSymbol];
    this.scriptName = args[scriptSymbol];
    this.scriptHelp = args[scriptHelpSymbol];
    this.options = args[optionsSymbol];
  }
  /**
   * Create a parsed args object from this spec using all default values.
   */


  args_createClass(WrappedArgMetadata, [{
    key: "loadDefaultValues",
    value: function loadDefaultValues() {
      return _loadDefaultValues(this.spec);
    }
    /**
     * Traverse the spec and possibly generate a value for each argument.
     *
     * @param result The object to hold the resulting argument values, typically
     *    the result of loadDefaultValues().
     * @param setTo A function to generate an argument value from each arg spec.
     *    If this function returns undefined, then the argument value is unchanged.
     */

  }, {
    key: "traverseAndMaybeSet",
    value: function traverseAndMaybeSet(result, setTo) {
      return _traverseAndMaybeSet(this.spec, result, setTo);
    }
    /**
     * Traverse the spec and call a method for each argument.
     *
     * @param process A function to call at each arg spec.
     */

  }, {
    key: "traverse",
    value: function traverse(process, onGroup) {
      return _traverse(this.spec, process, onGroup);
    }
  }]);

  return WrappedArgMetadata;
}();
/**
 * Create a parsed args object from a spec using all default values.
 *
 * @param spec The spec for all arguments.
 */


function _loadDefaultValues(spec) {
  var result = {};

  for (var k in spec) {
    var argSpec = spec[k];

    if ("args" in argSpec) {
      result[k] = _loadDefaultValues(argSpec.args);
    } else {
      if ("default" in argSpec) result[k] = argSpec.default;else result[k] = undefined;
    }
  }

  return result;
}
/**
 * Traverse the spec and possibly generate a value for each argument.
 *
 * @param spec The spec for all arguments.
 * @param result The object to hold the resulting argument values.
 * @param setTo A function to generate an argument value from each arg spec.
 *    If this function returns undefined, then the argument value is unchanged.
 */


function _traverseAndMaybeSet(spec, result, setTo) {
  var groups = [];

  for (var k in spec) {
    var argSpec = spec[k];

    if ("args" in argSpec) {
      groups.push([argSpec, k]);
    } else {
      var value = setTo(argSpec, k);
      if (value === undefined) continue;
      result[k] = value;
    }
  }

  for (var _i = 0, _groups = groups; _i < _groups.length; _i++) {
    var group_and_key = _groups[_i];

    _traverseAndMaybeSet(group_and_key[0].args, result[group_and_key[1]], setTo);
  }
}
/**
 * Traverse the spec and possibly generate a value for each argument.
 *
 * @param spec The spec for all arguments.
 * @param process A function to call at each arg spec.
 */


function _traverse(spec, process, onGroup) {
  var groups = [];

  for (var k in spec) {
    var argSpec = spec[k];

    if ("args" in argSpec) {
      groups.push([argSpec, k]);
    } else {
      process(argSpec, k);
    }
  }

  for (var _i2 = 0, _groups2 = groups; _i2 < _groups2.length; _i2++) {
    var group_and_key = _groups2[_i2];
    onGroup === null || onGroup === void 0 ? void 0 : onGroup(group_and_key[0], group_and_key[1]);

    _traverse(group_and_key[0].args, process, onGroup);
  }
}
/**
 * A parser to extract key/value pairs from a command line input.
 * @member command The command line input.
 * @member keys The set of valid keys that can appear.
 * @member flags The set of valid flags that can appear.
 * @member index An internal marker for the progress of the parser over the input.
 */


var CommandParser = /*#__PURE__*/function () {
  function CommandParser(command, keys, flags, positionalArgs) {
    args_classCallCheck(this, CommandParser);

    this.command = command;
    this.index = 0;
    this.keys = keys;
    this.flags = flags;
    this.positionalArgs = positionalArgs;
    this.positionalArgsParsed = 0;
  }
  /**
   * Perform the parsing of (key, value) pairs.
   * @returns The set of extracted (key, value) pairs.
   */


  args_createClass(CommandParser, [{
    key: "parse",
    value: function parse() {
      var _a, _b, _c, _d;

      this.index = 0; // reset the parser

      var result = new Map();

      while (!this.finished()) {
        // A flag F may appear as !F to be parsed as false.
        var parsing_negative_flag = false;

        if (this.peek() === "!") {
          parsing_negative_flag = true;
          this.consume(["!"]);
        }

        var startIndex = this.index;
        var key = this.parseKey();

        if (result.has(key)) {
          throw "Duplicate key ".concat(key, " (first set to ").concat((_a = result.get(key)) !== null && _a !== void 0 ? _a : "", ")");
        }

        if (this.flags.has(key)) {
          // The key corresponds to a flag.
          // Parse [key] as true and ![key] as false.
          result.set(key, parsing_negative_flag ? "false" : "true");
          if (this.peek() === "=") throw "Flag ".concat(key, " cannot be assigned a value");
          if (!this.finished()) this.consume([" "]);
          this.prevUnquotedKey = undefined;
        } else if (this.keys.has(key)) {
          // Parse [key]=[value] or [key] [value]
          this.consume(["=", " "]);
          var value = this.parseValue();
          if (["'", '"'].includes((_b = this.prev()) !== null && _b !== void 0 ? _b : "")) this.prevUnquotedKey = undefined;else this.prevUnquotedKey = key;
          if (!this.finished()) this.consume([" "]);
          result.set(key, value);
        } else if (this.positionalArgsParsed < this.positionalArgs.length && this.peek() !== "=") {
          // Parse [value] as the next positional arg
          var positionalKey = this.positionalArgs[this.positionalArgsParsed];
          this.positionalArgsParsed++;
          this.index = startIndex; // back up to reparse the key as a value

          var _value = this.parseValue();

          if (["'", '"'].includes((_c = this.prev()) !== null && _c !== void 0 ? _c : "")) this.prevUnquotedKey = undefined;else this.prevUnquotedKey = key;
          if (!this.finished()) this.consume([" "]);
          if (result.has(positionalKey)) throw "Cannot assign ".concat(_value, " to ").concat(positionalKey, " (positionally) since ").concat(positionalKey, " was already set to ").concat((_d = result.get(positionalKey)) !== null && _d !== void 0 ? _d : "");
          result.set(positionalKey, _value);
        } else {
          // Key not found; include a better error message if it is possible for quotes to have been missed
          if (this.prevUnquotedKey && this.peek() !== "=") throw "Unknown argument: ".concat(key, " (if this should have been parsed as part of ").concat(this.prevUnquotedKey, ", you should surround the entire value in quotes)");else throw "Unknown argument: ".concat(key);
        }
      }

      return result;
    }
    /**
     * @returns True if the entire command has been parsed.
     */

  }, {
    key: "finished",
    value: function finished() {
      return this.index >= this.command.length;
    }
    /**
     * @returns The next character to parse, if it exists.
     */

  }, {
    key: "peek",
    value: function peek() {
      if (this.index >= this.command.length) return undefined;
      return this.command.charAt(this.index);
    }
    /**
     * @returns The character just parsed, if it exists.
     */

  }, {
    key: "prev",
    value: function prev() {
      if (this.index <= 0) return undefined;
      if (this.index >= this.command.length + 1) return undefined;
      return this.command.charAt(this.index - 1);
    }
    /**
     * Advance the internal marker over the next expected character.
     * Throws an error on unexpected characters.
     *
     * @param allowed Characters that are expected.
     */

  }, {
    key: "consume",
    value: function consume(allowed) {
      var _a;

      if (this.finished()) throw "Expected ".concat(allowed);

      if (allowed.includes((_a = this.peek()) !== null && _a !== void 0 ? _a : "")) {
        this.index += 1;
      }
    }
    /**
     * Find the next occurance of one of the provided characters, or the end of
     * the string if the characters never appear again.
     *
     * @param searchValue The characters to locate.
     */

  }, {
    key: "findNext",
    value: function findNext(searchValue) {
      var result = this.command.length;

      var _iterator4 = _createForOfIteratorHelper(searchValue),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var value = _step4.value;
          var index = this.command.indexOf(value, this.index);
          if (index !== -1 && index < result) result = index;
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      return result;
    }
    /**
     * Starting from the internal marker, parse a single key.
     * This also advances the internal marker.
     *
     * @returns The next key.
     */

  }, {
    key: "parseKey",
    value: function parseKey() {
      var keyEnd = this.findNext(["=", " "]);
      var key = this.command.substring(this.index, keyEnd);
      this.index = keyEnd;
      return key;
    }
    /**
     * Starting from the internal marker, parse a single value.
     * This also advances the internal marker.
     *
     * Values are a single word or enclosed in matching quotes, i.e. one of:
     *    "[^"]*"
     *    '[^']*"
     *    [^'"][^ ]*
     *
     * @returns The next value.
     */

  }, {
    key: "parseValue",
    value: function parseValue() {
      var _a, _b;

      var valueEnder = " ";
      var quotes = ["'", '"'];

      if (quotes.includes((_a = this.peek()) !== null && _a !== void 0 ? _a : "")) {
        valueEnder = (_b = this.peek()) !== null && _b !== void 0 ? _b : ""; // The value is everything until the next quote

        this.consume([valueEnder]); // Consume opening quote
      }

      var valueEnd = this.findNext([valueEnder]);
      var value = this.command.substring(this.index, valueEnd);

      if (valueEnder !== " " && valueEnd === this.command.length) {
        throw "No closing ".concat(valueEnder, " found for ").concat(valueEnder).concat(value);
      } // Consume the value (and closing quote)


      this.index = valueEnd;
      if (valueEnder !== " ") this.consume([valueEnder]);
      return value;
    }
  }]);

  return CommandParser;
}();
;// CONCATENATED MODULE: ./node_modules/grimoire-kolmafia/dist/combat.js
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || combat_unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return combat_arrayLikeToArray(arr); }

function combat_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = combat_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function combat_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return combat_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return combat_arrayLikeToArray(o, minLen); }

function combat_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function combat_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function combat_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function combat_createClass(Constructor, protoProps, staticProps) { if (protoProps) combat_defineProperties(Constructor.prototype, protoProps); if (staticProps) combat_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }




function undelay(macro) {
  if (macro instanceof Macro) return macro;else return macro();
}
/**
 * The strategy to use for combat for a task, which indicates what to do
 * for each monster.
 *
 * There are two ways to specify in a task what to do for a given monster:
 *   1. Provide a macro directly through .macro(macro, ...monsters)
 *   2. Provide an action through .action(action, ...monsters)
 *
 * An action is a strategy for dealing with a monster that is not fully
 * defined in the task. The possible actions are set with the type parameter A.
 * Actions should typically end the fight.
 *
 * For example, a task may want to banish a monster but not necessarily know or
 * care which banisher is used. Instead, it is best for the engine to determine
 * which banisher to use on the monster. To facilitate this, "banish" can be
 * defined as an action, e.g. with CombatStrategy<"banish">;
 *
 * Each action can be resolved by the engine by:
 *   1. Providing a default macro for the action through ActionDefaults<A>,
 *      which can be done through combat_defaults in Engine options, or
 *   2. Providing a CombatResource for the action through CombatResources<A>.
 *      This is typically done in Engine.customize() by checking if a given
 *      action is requested by the task with combat.can(.), and then providing
 *      an appropriate resource with resources.provide(.).
 *
 * A monster may have both a macro and an action defined, and a macro or action
 * can be specified to be done on all monsters. The order of combat is then:
 * 1. The macro(s) given in .startingMacro().
 * 2. The monster-specific macro(s) from .macro().
 * 3. The general macro(s) from .macro().
 * 4. The monster-specific action from .action().
 * 5. The general action from .action().
 *
 * If an autoattack is set with .autoattack(), the order of the autoattack is:
 * 1. The monster-specific macro(s) from .autoattack().
 * 2. The general macro(s) from .autoattack().
 */


var combat_CombatStrategy = /*#__PURE__*/(/* unused pure expression or super */ null && (function () {
  function CombatStrategy() {
    combat_classCallCheck(this, CombatStrategy);

    this.macros = new Map();
    this.autoattacks = new Map();
    this.actions = new Map();
    this.ccs_entries = new Map();
  }
  /**
   * Add a macro to perform for this monster. If multiple macros are given
   * for the same monster, they are concatinated.
   *
   * @param macro The macro to perform.
   * @param monsters Which monsters to use the macro on. If not given, add the
   *  macro as a general macro.
   * @param prepend If true, add the macro before all previous macros for
   *    the same monster. If false, add after all previous macros.
   * @returns this
   */


  combat_createClass(CombatStrategy, [{
    key: "macro",
    value: function macro(_macro, monsters, prepend) {
      var _a, _b;

      if (monsters === undefined) {
        if (this.default_macro === undefined) this.default_macro = [];
        if (prepend) this.default_macro.unshift(_macro);else this.default_macro.push(_macro);
      } else {
        if (monsters instanceof Monster) monsters = [monsters];

        var _iterator = combat_createForOfIteratorHelper(monsters),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var monster = _step.value;
            if (!this.macros.has(monster)) this.macros.set(monster, []);
            if (prepend) (_a = this.macros.get(monster)) === null || _a === void 0 ? void 0 : _a.unshift(_macro);else (_b = this.macros.get(monster)) === null || _b === void 0 ? void 0 : _b.push(_macro);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      return this;
    }
    /**
     * Add a macro to perform as an autoattack for this monster. If multiple
     * macros are given for the same monster, they are concatinated.
     *
     * @param macro The macro to perform as autoattack.
     * @param monsters Which monsters to use the macro on. If not given, add the
     *  macro as a general macro.
     * @param prepend If true, add the macro before all previous autoattack
     *    macros for the same monster. If false, add after all previous macros.
     * @returns this
     */

  }, {
    key: "autoattack",
    value: function autoattack(macro, monsters, prepend) {
      var _a, _b;

      if (monsters === undefined) {
        if (this.default_autoattack === undefined) this.default_autoattack = [];
        if (prepend) this.default_autoattack.unshift(macro);else this.default_autoattack.push(macro);
      } else {
        if (monsters instanceof Monster) monsters = [monsters];

        var _iterator2 = combat_createForOfIteratorHelper(monsters),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var monster = _step2.value;
            if (!this.autoattacks.has(monster)) this.autoattacks.set(monster, []);
            if (prepend) (_a = this.autoattacks.get(monster)) === null || _a === void 0 ? void 0 : _a.unshift(macro);else (_b = this.autoattacks.get(monster)) === null || _b === void 0 ? void 0 : _b.push(macro);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }

      return this;
    }
    /**
     * Add a macro to perform at the start of combat.
     * @param macro The macro to perform.
     * @param prepend If true, add the macro before all previous starting
     *    macros. If false, add after all previous starting macros.
     * @returns this
     */

  }, {
    key: "startingMacro",
    value: function startingMacro(macro, prepend) {
      if (this.starting_macro === undefined) this.starting_macro = [];
      if (prepend) this.starting_macro.unshift(macro);else this.starting_macro.push(macro);
      return this;
    }
    /**
     * Add an action to perform for this monster. Only one action can be set for
     * each monster; any previous actions are overwritten.
     *
     * @param action The action to perform.
     * @param monsters Which monsters to use the action on. If not given, set the
     *  action as the general action for all monsters.
     * @returns this
     */

  }, {
    key: "action",
    value: function action(_action, monsters) {
      if (monsters === undefined) {
        this.default_action = _action;
      } else if (monsters instanceof Monster) {
        this.actions.set(monsters, _action);
      } else {
        var _iterator3 = combat_createForOfIteratorHelper(monsters),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var monster = _step3.value;
            this.actions.set(monster, _action);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }

      return this;
    }
    /**
     * Add a separate entry in the grimoire-generated CCS file for the specified
     * monster. If multiple entries are given for the same monster, they are
     * concatinated.
     *
     * This should typically be only used rarely, on monsters for which KoL does
     * not support macros in combat (e.g. rampaging adding machine).
     *
     * @param entry The entry to add for the given monster.
     * @param monsters Which monsters to add the entry to.
     * @param prepend If true, add the entry before all previous entries. If
     *   false, add after all previous entries.
     */

  }, {
    key: "ccs",
    value: function ccs(entry, monsters, prepend) {
      var _a, _b;

      if (monsters instanceof Monster) monsters = [monsters];

      var _iterator4 = combat_createForOfIteratorHelper(monsters),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var monster = _step4.value;
          if (!this.ccs_entries.has(monster)) this.ccs_entries.set(monster, []);
          if (prepend) (_a = this.ccs_entries.get(monster)) === null || _a === void 0 ? void 0 : _a.unshift(entry);else (_b = this.ccs_entries.get(monster)) === null || _b === void 0 ? void 0 : _b.push(entry);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      return this;
    }
    /**
     * Check if the provided action was requested for any monsters, or for the
     * general action.
     */

  }, {
    key: "can",
    value: function can(action) {
      if (action === this.default_action) return true;
      return Array.from(this.actions.values()).includes(action);
    }
    /**
     * Return the general action (if it exists).
     */

  }, {
    key: "getDefaultAction",
    value: function getDefaultAction() {
      return this.default_action;
    }
    /**
     * Return all monsters where the provided action was requested.
     */

  }, {
    key: "where",
    value: function where(action) {
      return Array.from(this.actions.keys()).filter(key => this.actions.get(key) === action);
    }
    /**
     * Return the requested action (if it exists) for the provided monster.
     */

  }, {
    key: "currentStrategy",
    value: function currentStrategy(monster) {
      var _a;

      return (_a = this.actions.get(monster)) !== null && _a !== void 0 ? _a : this.default_action;
    }
    /**
     * Perform a deep copy of this combat strategy.
     */

  }, {
    key: "clone",
    value: function clone() {
      var result = new CombatStrategy();
      if (this.starting_macro) result.starting_macro = _toConsumableArray(this.starting_macro);
      if (this.default_macro) result.default_macro = _toConsumableArray(this.default_macro);

      var _iterator5 = combat_createForOfIteratorHelper(this.macros),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var pair = _step5.value;
          result.macros.set(pair[0], _toConsumableArray(pair[1]));
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      if (this.default_autoattack) result.default_autoattack = _toConsumableArray(this.default_autoattack);

      var _iterator6 = combat_createForOfIteratorHelper(this.autoattacks),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var _pair = _step6.value;
          result.autoattacks.set(_pair[0], _toConsumableArray(_pair[1]));
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }

      result.default_action = this.default_action;

      var _iterator7 = combat_createForOfIteratorHelper(this.actions),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var _pair2 = _step7.value;
          result.actions.set(_pair2[0], _pair2[1]);
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }

      var _iterator8 = combat_createForOfIteratorHelper(this.ccs_entries),
          _step8;

      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var _pair3 = _step8.value;
          result.ccs_entries.set(_pair3[0], _toConsumableArray(_pair3[1]));
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }

      return result;
    }
    /**
     * Compile this combat strategy into a complete macro.
     *
     * @param resources The resources to use to fulfil actions.
     * @param defaults Macros to perform for each action without a resource.
     * @param location The adventuring location, if known.
     * @returns The compiled macro.
     */

  }, {
    key: "compile",
    value: function compile(resources, defaults, location) {
      var _a, _b;

      var result = new Macro(); // If there is macro precursor, do it now

      if (this.starting_macro) {
        result.step.apply(result, _toConsumableArray(this.starting_macro.map(undelay)));
      } // Perform any monster-specific macros (these may or may not end the fight)


      var monster_macros = new CompressedMacro();
      this.macros.forEach((value, key) => {
        var _Macro;

        monster_macros.add(key, (_Macro = new Macro()).step.apply(_Macro, _toConsumableArray(value.map(undelay))));
      });
      result.step(monster_macros.compile()); // Perform the non-monster specific macro

      if (this.default_macro) result.step.apply(result, _toConsumableArray(this.default_macro.map(undelay))); // Perform any monster-specific actions (these should end the fight)

      var monster_actions = new CompressedMacro();
      this.actions.forEach((action, key) => {
        var _a, _b;

        var macro = (_a = resources.getMacro(action)) !== null && _a !== void 0 ? _a : (_b = defaults === null || defaults === void 0 ? void 0 : defaults[action]) === null || _b === void 0 ? void 0 : _b.call(defaults, key);
        if (macro) monster_actions.add(key, new Macro().step(macro));
      });
      result.step(monster_actions.compile()); // Perform the non-monster specific action (these should end the fight)

      if (this.default_action) {
        var macro = (_a = resources.getMacro(this.default_action)) !== null && _a !== void 0 ? _a : (_b = defaults === null || defaults === void 0 ? void 0 : defaults[this.default_action]) === null || _b === void 0 ? void 0 : _b.call(defaults, location);
        if (macro) result.step(macro);
      }

      return result;
    }
    /**
     * Compile the autoattack of this combat strategy into a complete macro.
     *
     * @returns The compiled autoattack macro.
     */

  }, {
    key: "compileAutoattack",
    value: function compileAutoattack() {
      var result = new Macro(); // Perform any monster-specific autoattacks (these may or may not end the fight)

      var monster_macros = new CompressedMacro();
      this.autoattacks.forEach((value, key) => {
        var _Macro2;

        monster_macros.add(key, (_Macro2 = new Macro()).step.apply(_Macro2, _toConsumableArray(value.map(undelay))));
      });
      result.step(monster_macros.compile()); // Perform the non-monster specific macro

      if (this.default_autoattack) result.step.apply(result, _toConsumableArray(this.default_autoattack.map(undelay)));
      return result;
    }
    /**
     * Compile the CCS entries of this combat strategy into a single array.
     *
     * @returns The lines of a CCS file, not including the [default] macro.
     */

  }, {
    key: "compileCcs",
    value: function compileCcs() {
      var result = [];

      var _iterator9 = combat_createForOfIteratorHelper(this.ccs_entries),
          _step9;

      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var ccs_entry = _step9.value;
          result.push.apply(result, ["[".concat(ccs_entry[0].name, "]")].concat(_toConsumableArray(ccs_entry[1])));
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }

      return result;
    }
    /**
     * For advanced users, this method will generate a fluent API for requesting
     * actions. That is, it allows you to do
     *   combat.banish(monster1).kill(monster2)
     * instead of
     *   combat.action("banish", monster1).action("kill", monster2)
     *
     * Example usage:
     *   const myActions = ["kill", "banish"] as const;
     *   class MyCombatStrategy extends CombatStrategy.withActions(myActions) {}
     *
     *   const foo: MyCombatStrategy = new MyCombatStrategy();
     *   const bar: MyCombatStrategy = foo.banish($monster`crate`).kill($monster`tumbleweed`);
     */

  }], [{
    key: "withActions",
    value: function withActions(actions) {
      var CombatStrategyWithActions = /*#__PURE__*/function (_this) {
        _inherits(CombatStrategyWithActions, _this);

        var _super = _createSuper(CombatStrategyWithActions);

        function CombatStrategyWithActions() {
          combat_classCallCheck(this, CombatStrategyWithActions);

          return _super.apply(this, arguments);
        }

        return combat_createClass(CombatStrategyWithActions);
      }(this); // eslint-disable-next-line @typescript-eslint/no-explicit-any


      var proto = CombatStrategyWithActions.prototype;

      var _iterator10 = combat_createForOfIteratorHelper(actions),
          _step10;

      try {
        var _loop = function _loop() {
          var action = _step10.value;

          proto[action] = function (monsters) {
            return this.action(action, monsters);
          };
        };

        for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
          _loop();
        } // eslint-disable-next-line @typescript-eslint/no-explicit-any

      } catch (err) {
        _iterator10.e(err);
      } finally {
        _iterator10.f();
      }

      return CombatStrategyWithActions;
    }
  }]);

  return CombatStrategy;
}()));
/**
 * A class to build a macro that combines if statements (keyed on monster) with
 * identical body into a single if statement, to avoid the 37-action limit.
 * Ex: [if x; A; if y; B; if z; A;] will turn into [if x || z; A; if y; B]
 */

var CompressedMacro = /*#__PURE__*/(/* unused pure expression or super */ null && (function () {
  function CompressedMacro() {
    combat_classCallCheck(this, CompressedMacro);

    this.components = new Map();
  }
  /**
   * Set the macro for a given monster (replacing any previous macros).
   */


  combat_createClass(CompressedMacro, [{
    key: "add",
    value: function add(monster, macro) {
      var _a;

      var macro_text = macro.toString();
      if (macro_text.length === 0) return;
      if (!this.components.has(macro_text)) this.components.set(macro_text, [monster]);else (_a = this.components.get(macro_text)) === null || _a === void 0 ? void 0 : _a.push(monster);
    }
    /**
     * Compile the compressed form of the macro.
     */

  }, {
    key: "compile",
    value: function compile() {
      var result = new Macro();
      this.components.forEach((monsters, macro) => {
        var condition = monsters.map(mon => "monsterid ".concat(mon.id)).join(" || ");
        result.if_(condition, macro);
      });
      return result;
    }
  }]);

  return CompressedMacro;
}()));
/**
 * A class for providing resources to fulfil combat actions.
 */


var combat_CombatResources = /*#__PURE__*/(/* unused pure expression or super */ null && (function () {
  function CombatResources() {
    combat_classCallCheck(this, CombatResources);

    this.resources = new Map();
  }
  /**
   * Use the provided resource to fulfil the provided action.
   * (If the resource is undefined, this does nothing).
   */


  combat_createClass(CombatResources, [{
    key: "provide",
    value: function provide(action, resource) {
      if (resource === undefined) return;
      this.resources.set(action, resource);
    }
    /**
     * Return true if the provided action has a resource provided.
     */

  }, {
    key: "has",
    value: function has(action) {
      return this.resources.has(action);
    }
    /**
     * Return all provided combat resources.
     */

  }, {
    key: "all",
    value: function all() {
      return Array.from(this.resources.values());
    }
    /**
     * Get the macro provided by the resource for this action, or undefined if
     * no resource was provided.
     */

  }, {
    key: "getMacro",
    value: function getMacro(action) {
      var resource = this.resources.get(action);
      if (resource === undefined) return undefined;
      if (resource.do instanceof Item) return new Macro().item(resource.do);
      if (resource.do instanceof Skill) return new Macro().skill(resource.do);
      return resource.do;
    }
  }]);

  return CombatResources;
}()));
;// CONCATENATED MODULE: ./node_modules/grimoire-kolmafia/dist/outfit.js
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28, _templateObject29, _templateObject30;

function outfit_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function outfit_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? outfit_ownKeys(Object(source), !0).forEach(function (key) { outfit_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : outfit_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function outfit_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function outfit_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = outfit_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function outfit_toConsumableArray(arr) { return outfit_arrayWithoutHoles(arr) || outfit_iterableToArray(arr) || outfit_unsupportedIterableToArray(arr) || outfit_nonIterableSpread(); }

function outfit_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function outfit_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return outfit_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return outfit_arrayLikeToArray(o, minLen); }

function outfit_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function outfit_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return outfit_arrayLikeToArray(arr); }

function outfit_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function outfit_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function outfit_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function outfit_createClass(Constructor, protoProps, staticProps) { if (protoProps) outfit_defineProperties(Constructor.prototype, protoProps); if (staticProps) outfit_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var outfitSlots = (/* unused pure expression or super */ null && (["hat", "back", "weapon", "offhand", "shirt", "pants", "acc1", "acc2", "acc3", "famequip"]));

var weaponHands = i => i ? mafiaWeaponHands(i) : 0;

var modeableCommands = (/* unused pure expression or super */ null && (["backupcamera", "umbrella", "snowsuit", "edpiece", "retrocape", "parka"]));
var outfit_Outfit = /*#__PURE__*/(/* unused pure expression or super */ null && (function () {
  function Outfit() {
    outfit_classCallCheck(this, Outfit);

    this.equips = new Map();
    this.modes = {};
    this.skipDefaults = false;
    this.modifier = "";
    this.avoid = [];
  }
  /**
   * Check how many of an item is equipped on the outfit.
   */


  outfit_createClass(Outfit, [{
    key: "equippedAmount",
    value: function equippedAmount(item) {
      return outfit_toConsumableArray(this.equips.values()).filter(i => i === item).length;
    }
  }, {
    key: "isAvailable",
    value: function isAvailable(item) {
      var _a;

      if ((_a = this.avoid) === null || _a === void 0 ? void 0 : _a.includes(item)) return false;
      if (!have(item, this.equippedAmount(item) + 1)) return false;
      if (booleanModifier(item, "Single Equip") && this.equippedAmount(item) > 0) return false;
      return true;
    }
    /**
     * Check whether an item is equipped on the outfit, optionally in a specific slot.
     */

  }, {
    key: "haveEquipped",
    value: function haveEquipped(item, slot) {
      if (slot === undefined) return this.equippedAmount(item) > 0;
      return this.equips.get(slot) === item;
    }
  }, {
    key: "equipItemNone",
    value: function equipItemNone(item, slot) {
      if (item !== $item.none) return false;
      if (slot === undefined) return true;
      if (this.equips.has(slot)) return false;
      this.equips.set(slot, item);
      return true;
    }
  }, {
    key: "equipNonAccessory",
    value: function equipNonAccessory(item, slot) {
      if ($slots(_templateObject || (_templateObject = _taggedTemplateLiteral(["acc1, acc2, acc3"]))).includes(toSlot(item))) return false;
      if (slot !== undefined && slot !== toSlot(item)) return false;
      if (this.equips.has(toSlot(item))) return false;

      switch (toSlot(item)) {
        case $slot(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["off-hand"]))):
          if (this.equips.has($slot(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["weapon"])))) && weaponHands(this.equips.get($slot(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["weapon"]))))) !== 1) {
            return false;
          }

          break;

        case $slot(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["familiar"]))):
          if (this.familiar !== undefined && !canEquip(this.familiar, item)) return false;
      }

      if (toSlot(item) !== $slot(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["familiar"]))) && !canEquip(item)) return false;
      this.equips.set(toSlot(item), item);
      return true;
    }
  }, {
    key: "equipAccessory",
    value: function equipAccessory(item, slot) {
      if (![undefined].concat(outfit_toConsumableArray($slots(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["acc1, acc2, acc3"]))))).includes(slot)) return false;
      if (toSlot(item) !== $slot(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["acc1"])))) return false;
      if (!canEquip(item)) return false;

      if (slot === undefined) {
        // We don't care which of the accessory slots we equip in
        var empty = $slots(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["acc1, acc2, acc3"]))).find(s => !this.equips.has(s));
        if (empty === undefined) return false;
        this.equips.set(empty, item);
      } else {
        if (this.equips.has(slot)) return false;
        this.equips.set(slot, item);
      }

      return true;
    }
  }, {
    key: "equipUsingDualWield",
    value: function equipUsingDualWield(item, slot) {
      if (![undefined, $slot(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["off-hand"])))].includes(slot)) return false;
      if (toSlot(item) !== $slot(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["weapon"])))) return false;

      if (this.equips.has($slot(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["weapon"])))) && weaponHands(this.equips.get($slot(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["weapon"]))))) !== 1) {
        return false;
      }

      if (this.equips.has($slot(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["off-hand"]))))) return false;
      if (!have($skill(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["Double-Fisted Skull Smashing"]))))) return false;
      if (weaponHands(item) !== 1) return false;
      if (!canEquip(item)) return false;
      this.equips.set($slot(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["off-hand"]))), item);
      return true;
    }
  }, {
    key: "getHoldingFamiliar",
    value: function getHoldingFamiliar(item) {
      switch (toSlot(item)) {
        case $slot(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["weapon"]))):
          return $familiar(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["Disembodied Hand"])));

        case $slot(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["off-hand"]))):
          return $familiar(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["Left-Hand Man"])));

        default:
          return undefined;
      }
    }
  }, {
    key: "equipUsingFamiliar",
    value: function equipUsingFamiliar(item, slot) {
      if (![undefined, $slot(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["familiar"])))].includes(slot)) return false;
      if (this.equips.has($slot(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["familiar"]))))) return false;
      if (booleanModifier(item, "Single Equip")) return false;
      var familiar = this.getHoldingFamiliar(item);
      if (familiar === undefined || !this.equip(familiar)) return false;
      this.equips.set($slot(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["familiar"]))), item);
      return true;
    }
  }, {
    key: "equipItem",
    value: function equipItem(item, slot) {
      return this.haveEquipped(item, slot) || this.equipItemNone(item, slot) || this.isAvailable(item) && (this.equipNonAccessory(item, slot) || this.equipAccessory(item, slot) || this.equipUsingDualWield(item, slot) || this.equipUsingFamiliar(item, slot));
    }
  }, {
    key: "equipFamiliar",
    value: function equipFamiliar(familiar) {
      if (familiar === this.familiar) return true;
      if (this.familiar !== undefined) return false;
      if (familiar !== $familiar.none && !have(familiar)) return false;
      var item = this.equips.get($slot(_templateObject24 || (_templateObject24 = _taggedTemplateLiteral(["familiar"]))));
      if (item !== undefined && item !== $item.none && !canEquip(familiar, item)) return false;
      this.familiar = familiar;
      return true;
    }
  }, {
    key: "equipSpec",
    value: function equipSpec(spec) {
      var _this$avoid;

      var _a, _b, _c, _d;

      var succeeded = true;

      var _iterator = outfit_createForOfIteratorHelper(outfitSlots),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var slotName = _step.value;
          var slot = (_a = new Map([["famequip", $slot(_templateObject25 || (_templateObject25 = _taggedTemplateLiteral(["familiar"])))], ["offhand", $slot(_templateObject26 || (_templateObject26 = _taggedTemplateLiteral(["off-hand"])))]]).get(slotName)) !== null && _a !== void 0 ? _a : toSlot(slotName);
          var itemOrItems = spec[slotName];
          if (itemOrItems !== undefined && !this.equip(itemOrItems, slot)) succeeded = false;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var _iterator2 = outfit_createForOfIteratorHelper((_b = spec === null || spec === void 0 ? void 0 : spec.equip) !== null && _b !== void 0 ? _b : []),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var item = _step2.value;
          if (!this.equip(item)) succeeded = false;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      if ((spec === null || spec === void 0 ? void 0 : spec.familiar) !== undefined) {
        if (!this.equip(spec.familiar)) succeeded = false;
      }

      (_this$avoid = this.avoid).push.apply(_this$avoid, outfit_toConsumableArray((_c = spec === null || spec === void 0 ? void 0 : spec.avoid) !== null && _c !== void 0 ? _c : []));

      this.skipDefaults = this.skipDefaults || ((_d = spec.skipDefaults) !== null && _d !== void 0 ? _d : false);

      if (spec.modifier) {
        this.modifier = this.modifier + (this.modifier ? ", " : "") + spec.modifier;
      }

      if (spec.modes) {
        if (!this.setModes(spec.modes)) {
          succeeded = false;
        }
      }

      return succeeded;
    }
    /**
     * Equip the first thing that can be equipped to the outfit.
     *
     * @param things The things to equip.
     * @param slot The slot to equip them.
     * @returns True if one of the things is equipped, and false otherwise.
     */

  }, {
    key: "equipFirst",
    value: function equipFirst(things, slot) {
      return things.some(val => this.equip(val, slot));
    }
    /**
     * Equip a thing to the outfit.
     *
     * If no slot is given, then the thing will be equipped wherever possible
     * (possibly using dual-wielding, any of the accessory slots, or as
     * familiar equipment). If it is impossible to add this thing anywhere to
     * the outfit, this function will return false.
     *
     * If a slot is given, the item will be equipped only in that slot. If the
     * slot is filled with a different item, this function will return false.
     *
     * If the thing is already equipped in the provided slot, or if no slot is
     * given and the thing is already equipped in any slot, this function will
     * return true and not change the outfit.
     *
     * @param thing The thing or things to equip.
     * @param slot The slot to equip them.
     * @returns True if the thing was sucessfully equipped, and false otherwise.
     */

  }, {
    key: "equip",
    value: function equip(thing, slot) {
      if (Array.isArray(thing)) {
        if (slot !== undefined) return this.equipFirst(thing, slot);
        return thing.every(val => this.equip(val));
      }

      if (thing instanceof Item) return this.equipItem(thing, slot);
      if (thing instanceof Familiar) return this.equipFamiliar(thing);
      if (thing instanceof Outfit) return this.equipSpec(thing.spec());
      return this.equipSpec(thing);
    }
    /**
     * Set the provided modes for items that may be equipped in the outfit.
     *
     * This function does *not* equip items for the set modes; they must be
     * equipped separately.
     *
     * If a mode is already set for an item that is different from the provided
     * mode, this function will return false and not change the mode for that
     * item. (But other modes might still be changed if they are compatible.)
     *
     * Note that the superhero and instuctions of a retrocape can be set
     * independently (`undefined` is treated as "don't care").
     *
     * @param modes Modes to set in this outfit.
     * @returns True if all modes were sucessfully set, and false otherwise.
     */

  }, {
    key: "setModes",
    value: function setModes(modes) {
      var _a, _b;

      var compatible = true; // Check if the new modes are compatible with existing modes

      var _iterator3 = outfit_createForOfIteratorHelper(modeableCommands),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var mode = _step3.value;
          if (mode === "retrocape") continue; // checked below

          if (this.modes[mode] && modes[mode] && this.modes[mode] !== modes[mode]) {
            compatible = false;
          }
        } // Check if retrocape modes are compatible
        // (Parts that are undefined are compatible with everything)

      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      if (this.modes["retrocape"] && modes["retrocape"]) {
        if (this.modes["retrocape"][0] && modes["retrocape"][0] && this.modes["retrocape"][0] !== modes["retrocape"][0]) {
          compatible = false;
        }

        if (this.modes["retrocape"][1] && modes["retrocape"][1] && this.modes["retrocape"][1] !== modes["retrocape"][1]) {
          compatible = false;
        }

        this.modes["retrocape"][0] = (_a = this.modes["retrocape"][0]) !== null && _a !== void 0 ? _a : modes["retrocape"][0];
        this.modes["retrocape"][1] = (_b = this.modes["retrocape"][1]) !== null && _b !== void 0 ? _b : modes["retrocape"][1];
      }

      this.modes = outfit_objectSpread(outfit_objectSpread({}, modes), this.modes);
      return compatible;
    }
    /**
     * Check if it is possible to equip a thing to this outfit using .equip().
     *
     * This does not change the current outfit.
     *
     * @param thing The thing to equip.
     * @param slot The slot to equip them.
     * @returns True if this thing can be equipped.
     */

  }, {
    key: "canEquip",
    value: function canEquip(thing, slot) {
      var outfit = this.clone();
      return outfit.equip(thing, slot);
    }
    /**
     * Equip this outfit.
     * @param extraOptions Passed to any maximizer calls made.
     */

  }, {
    key: "dress",
    value: function dress(extraOptions) {
      if (this.familiar) useFamiliar(this.familiar);
      var targetEquipment = Array.from(this.equips.values());
      var usedSlots = new Set(); // First, we equip non-accessory equipment.

      var nonaccessorySlots = $slots(_templateObject27 || (_templateObject27 = _taggedTemplateLiteral(["weapon, off-hand, hat, back, shirt, pants, familiar, buddy-bjorn, crown-of-thrones"]))); // We must manually remove equipment that we want to use in a different
      // slot than where it is currently equipped, to avoid a mafia issue.
      // Order is anchored here to prevent DFSS shenanigans

      var _iterator4 = outfit_createForOfIteratorHelper(nonaccessorySlots),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var slot = _step4.value;
          if (targetEquipment.includes(equippedItem(slot)) && this.equips.get(slot) !== equippedItem(slot) || this.avoid.includes(equippedItem(slot))) equip(slot, $item.none);
        } // Then we equip all the non-accessory equipment.

      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      var _iterator5 = outfit_createForOfIteratorHelper(nonaccessorySlots),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var _slot = _step5.value;
          var equipment = this.equips.get(_slot);

          if (equipment) {
            equip(_slot, equipment);
            usedSlots.add(_slot);
          }
        } // Next, we equip accessories

      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      var accessorySlots = $slots(_templateObject28 || (_templateObject28 = _taggedTemplateLiteral(["acc1, acc2, acc3"])));
      var accessoryEquips = accessorySlots.map(slot => this.equips.get(slot)).filter(item => item !== undefined); // To plan how to equip accessories, first check which accessories are
      // already equipped in some accessory slot. There is no need to move them,
      // since KoL doesn't care what order accessories are equipped in.

      var missingAccessories = []; // accessories that are not already equipped

      var _iterator6 = outfit_createForOfIteratorHelper(accessoryEquips),
          _step6;

      try {
        var _loop = function _loop() {
          var accessory = _step6.value;
          var alreadyEquipped = accessorySlots.find(slot => !usedSlots.has(slot) && equippedItem(slot) === accessory);

          if (alreadyEquipped) {
            usedSlots.add(alreadyEquipped);
          } else {
            missingAccessories.push(accessory);
          }
        };

        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          _loop();
        } // Then, for all accessories that are not currently equipped, use the first
        // open slot to place them.

      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }

      for (var _i = 0, _missingAccessories = missingAccessories; _i < _missingAccessories.length; _i++) {
        var accessory = _missingAccessories[_i];
        var unusedSlot = accessorySlots.find(slot => !usedSlots.has(slot));

        if (unusedSlot === undefined) {
          // This should only occur if there is a bug in .dress()
          throw "No accessory slots remaining";
        }

        equip(unusedSlot, accessory);
        usedSlots.add(unusedSlot);
      } // Remaining slots are filled by the maximizer


      var modes = convertToLibramModes(this.modes);

      if (this.modifier) {
        var allRequirements = [new Requirement([this.modifier], {
          preventSlot: outfit_toConsumableArray(usedSlots),
          preventEquip: this.avoid,
          modes: modes
        })];
        if (extraOptions) allRequirements.push(new Requirement([], extraOptions));

        if (!Requirement.merge(allRequirements).maximize()) {
          throw "Unable to maximize ".concat(this.modifier);
        }

        logprint("Maximize: ".concat(this.modifier));
      } // Set the modes of any equipped items.


      applyModes(modes); // Verify that all equipment was indeed equipped

      if (this.familiar !== undefined && myFamiliar() !== this.familiar) throw "Failed to fully dress (expected: familiar ".concat(this.familiar, ")");

      var _iterator7 = outfit_createForOfIteratorHelper(nonaccessorySlots),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var _slot2 = _step7.value;

          if (this.equips.has(_slot2) && equippedItem(_slot2) !== this.equips.get(_slot2)) {
            throw "Failed to fully dress (expected: ".concat(_slot2, " ").concat(this.equips.get(_slot2), ")");
          }
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }

      var _iterator8 = outfit_createForOfIteratorHelper(accessoryEquips),
          _step8;

      try {
        var _loop2 = function _loop2() {
          var accessory = _step8.value;

          if (mafiaEquippedAmount(accessory) < accessoryEquips.filter(acc => acc === accessory).length) {
            throw "Failed to fully dress (expected: acc ".concat(accessory, ")");
          }
        };

        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          _loop2();
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
    }
    /**
     * Build an Outfit identical to this outfit.
     */

  }, {
    key: "clone",
    value: function clone() {
      var result = new Outfit();
      result.equips = new Map(this.equips);
      result.skipDefaults = this.skipDefaults;
      result.familiar = this.familiar;
      result.modifier = this.modifier;
      result.avoid = outfit_toConsumableArray(this.avoid);
      result.modes = outfit_objectSpread({}, this.modes);
      return result;
    }
    /**
     * Build an OutfitSpec identical to this outfit.
     */

  }, {
    key: "spec",
    value: function spec() {
      var _a;

      var result = {
        modifier: this.modifier,
        familiar: this.familiar,
        avoid: outfit_toConsumableArray(this.avoid),
        skipDefaults: this.skipDefaults,
        modes: outfit_objectSpread({}, this.modes)
      }; // Add all equipment forced in a particular slot

      var _iterator9 = outfit_createForOfIteratorHelper(outfitSlots),
          _step9;

      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var slotName = _step9.value;
          result[slotName] = this.equips.get((_a = new Map([["famequip", $slot(_templateObject29 || (_templateObject29 = _taggedTemplateLiteral(["familiar"])))], ["offhand", $slot(_templateObject30 || (_templateObject30 = _taggedTemplateLiteral(["off-hand"])))]]).get(slotName)) !== null && _a !== void 0 ? _a : toSlot(slotName));
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }

      return result;
    }
  }]);

  return Outfit;
}()));
/**
 * Get the modes of this outfit in a type compatible with Libram.
 *
 * This conversion is needed since we store the retrocape modes
 * internally as an array, but libram uses a string.
 *
 * @returns The modes equipped to this outfit.
 */

function convertToLibramModes(modes) {
  var _a;

  return {
    backupcamera: modes["backupcamera"],
    umbrella: modes["umbrella"],
    snowsuit: modes["snowsuit"],
    edpiece: modes["edpiece"],
    retrocape: (_a = modes["retrocape"]) === null || _a === void 0 ? void 0 : _a.filter(s => s !== undefined).join(" "),
    parka: modes["parka"]
  };
}
/**
 * Get the current modes of all items.
 *
 * @returns The current mode settings for all items, equipped or not.
 */

function getCurrentModes() {
  return {
    backupcamera: getMode("backupCameraMode", ["ml", "meat", "init"]),
    umbrella: getMode("umbrellaState", ["broken", "forward-facing", "bucket style", "pitchfork style", "constantly twirling", "cocoon"]),
    snowsuit: getMode("snowsuit", ["eyebrows", "smirk", "nose", "goatee", "hat"]),
    edpiece: getMode("edPiece", ["bear", "owl", "puma", "hyena", "mouse", "weasel", "fish"]),
    retrocape: [getMode("retroCapeSuperhero", ["vampire", "heck", "robot"]), getMode("retroCapeWashingInstructions", ["hold", "thrill", "kiss", "kill"])],
    parka: getMode("parkaMode", ["kachungasaur", "dilophosaur", "ghostasaurus", "spikolodon", "pterodactyl"])
  };
}
/**
 * Get the current value for a mode in a type-safe way.
 *
 * @param property The mafia property for the mode.
 * @param options A typed list of options for the mode.
 * @returns The mode if the property value matched a valid option, or undefined.
 */

function getMode(property, options) {
  var val = get(property, "");
  return options.find(s => s === val); // .includes has type issues
}
;// CONCATENATED MODULE: ./node_modules/grimoire-kolmafia/dist/engine.js
var engine_templateObject;

function engine_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function engine_toConsumableArray(arr) { return engine_arrayWithoutHoles(arr) || engine_iterableToArray(arr) || engine_unsupportedIterableToArray(arr) || engine_nonIterableSpread(); }

function engine_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function engine_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function engine_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return engine_arrayLikeToArray(arr); }

function engine_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = engine_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function engine_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return engine_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return engine_arrayLikeToArray(o, minLen); }

function engine_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function engine_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function engine_createClass(Constructor, protoProps, staticProps) { if (protoProps) engine_defineProperties(Constructor.prototype, protoProps); if (staticProps) engine_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function engine_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





var EngineOptions = /*#__PURE__*/(/* unused pure expression or super */ null && (engine_createClass(function EngineOptions() {
  engine_classCallCheck(this, EngineOptions);
})));
var grimoireCCS = "grimoire_macro";
var Engine = /*#__PURE__*/(/* unused pure expression or super */ null && (function () {
  /**
   * Create the engine.
   * @param tasks A list of tasks for looking up task dependencies.
   * @param options Basic configuration of the engine.
   */
  function Engine(tasks, options) {
    engine_classCallCheck(this, Engine);

    this.attempts = {};
    this.propertyManager = new PropertiesManager();
    this.tasks_by_name = new Map();
    this.cachedCcsContents = "";
    this.tasks = tasks;
    this.options = options !== null && options !== void 0 ? options : {};

    var _iterator = engine_createForOfIteratorHelper(tasks),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var task = _step.value;
        this.tasks_by_name.set(task.name, task);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    this.initPropertiesManager(this.propertyManager);
  }
  /**
   * Determine the next task to perform.
   * By default, this is the first task in the task list that is available.
   * @returns The next task to perform, or undefined if no tasks are available.
   */


  engine_createClass(Engine, [{
    key: "getNextTask",
    value: function getNextTask() {
      return this.tasks.find(task => this.available(task));
    }
    /**
     * Continually get the next task and execute it.
     * @param actions If given, only perform up to this many tasks.
     */

  }, {
    key: "run",
    value: function run(actions) {
      for (var i = 0; i < (actions !== null && actions !== void 0 ? actions : Infinity); i++) {
        var task = this.getNextTask();
        if (!task) return;
        this.execute(task);
      }
    }
    /**
     * Close the engine and reset all properties.
     * After this has been called, this object should not be used.
     */

  }, {
    key: "destruct",
    value: function destruct() {
      this.propertyManager.resetAll();
      setAutoAttack(0);
    }
    /**
     * Check if the given task is available at this moment.
     * @returns true if all dependencies are complete and the task is ready.
     *  Note that dependencies are not checked transitively. That is, if
     *  A depends on B which depends on C, then A is ready if B is complete
     *  (regardless of if C is complete or not).
     */

  }, {
    key: "available",
    value: function available(task) {
      var _a;

      var _iterator2 = engine_createForOfIteratorHelper((_a = task.after) !== null && _a !== void 0 ? _a : []),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var after = _step2.value;
          var after_task = this.tasks_by_name.get(after);
          if (after_task === undefined) throw "Unknown task dependency ".concat(after, " on ").concat(task.name);
          if (!after_task.completed()) return false;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      if (task.ready && !task.ready()) return false;
      if (task.completed()) return false;
      return true;
    }
    /**
     * Perform all steps to execute the provided task.
     * This is the main entry point for the Engine.
     * @param task The current executing task.
     */

  }, {
    key: "execute",
    value: function execute(task) {
      var _a, _b, _c, _d, _e;

      print("");
      print("Executing ".concat(task.name), "blue"); // Determine the proper postcondition for after the task executes.

      var postcondition = (_b = (_a = task.limit) === null || _a === void 0 ? void 0 : _a.guard) === null || _b === void 0 ? void 0 : _b.call(_a); // Acquire any items and effects first, possibly for later execution steps.

      this.acquireItems(task);
      this.acquireEffects(task); // Prepare the outfit, with resources.

      var task_combat = (_d = (_c = task.combat) === null || _c === void 0 ? void 0 : _c.clone()) !== null && _d !== void 0 ? _d : new CombatStrategy();
      var outfit = this.createOutfit(task);
      var task_resources = new CombatResources();
      this.customize(task, outfit, task_combat, task_resources);
      this.dress(task, outfit); // Prepare combat and choices

      this.setCombat(task, task_combat, task_resources);
      this.setChoices(task, this.propertyManager); // Actually perform the task

      var _iterator3 = engine_createForOfIteratorHelper(task_resources.all()),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var resource = _step3.value;
          (_e = resource.prepare) === null || _e === void 0 ? void 0 : _e.call(resource);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      this.prepare(task);
      this.do(task);

      while (this.shouldRepeatAdv(task)) {
        set("lastEncounter", "");
        this.do(task);
      }

      this.post(task); // Mark that we tried the task, and apply limits

      this.markAttempt(task);
      this.checkLimits(task, postcondition);
    }
    /**
     * Acquire all items for the task.
     * @param task The current executing task.
     */

  }, {
    key: "acquireItems",
    value: function acquireItems(task) {
      var _a;

      var acquire = task.acquire instanceof Function ? task.acquire() : task.acquire;

      var _iterator4 = engine_createForOfIteratorHelper(acquire || []),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var to_get = _step4.value;
          var num_needed = (_a = to_get.num) !== null && _a !== void 0 ? _a : 1;
          var num_have = itemAmount(to_get.item) + equippedAmount(to_get.item);
          if (num_needed <= num_have) continue;
          if (to_get.useful !== undefined && !to_get.useful()) continue;

          if (to_get.get) {
            to_get.get();
          } else if (to_get.price !== undefined) {
            buy(to_get.item, num_needed - num_have, to_get.price);
          } else if (Object.keys(getRelated(to_get.item, "fold")).length > 0) {
            cliExecute("fold ".concat(to_get.item));
          } else {
            retrieveItem(to_get.item, num_needed);
          }

          if (itemAmount(to_get.item) + equippedAmount(to_get.item) < num_needed && !to_get.optional) {
            throw "Task ".concat(task.name, " was unable to acquire ").concat(num_needed, " ").concat(to_get.item);
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
    /**
     * Acquire all effects for the task.
     * @param task The current executing task.
     */

  }, {
    key: "acquireEffects",
    value: function acquireEffects(task) {
      var _a;

      var effects = typeof task.effects === "function" ? task.effects() : (_a = task.effects) !== null && _a !== void 0 ? _a : [];
      var songs = effects.filter(effect => isSong(effect));
      if (songs.length > maxSongs()) throw "Too many AT songs";
      var extraSongs = Object.keys(myEffects()).map(effectName => toEffect(effectName)).filter(effect => isSong(effect) && !songs.includes(effect));

      while (songs.length + extraSongs.length > maxSongs()) {
        var toRemove = extraSongs.pop();

        if (toRemove === undefined) {
          break;
        } else {
          uneffect(toRemove);
        }
      }

      var _iterator5 = engine_createForOfIteratorHelper(effects),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var effect = _step5.value;
          ensureEffect(effect);
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
    }
    /**
     * Create an outfit for the task with all required equipment.
     * @param task The current executing task.
     */

  }, {
    key: "createOutfit",
    value: function createOutfit(task) {
      var spec = typeof task.outfit === "function" ? task.outfit() : task.outfit;
      if (spec instanceof Outfit) return spec.clone();
      var outfit = new Outfit();

      if (spec !== undefined) {
        if (!outfit.equip(spec)) {
          throw "Unable to equip all items for ".concat(task.name);
        }
      }

      return outfit;
    }
    /**
     * Equip the outfit for the task.
     * @param task The current executing task.
     * @param outfit The outfit for the task, possibly augmented by the engine.
     */

  }, {
    key: "dress",
    value: function dress(task, outfit) {
      if (task.do instanceof Location) setLocation(task.do);
      outfit.dress();
    }
    /* eslint-disable @typescript-eslint/no-unused-vars */

    /**
     * Perform any engine-specific customization for the outfit and combat plan.
     *
     * This is a natural method to override in order to:
     *   * Enable the use of any resources in the outfit or combat (e.g., allocate banishers).
     *   * Equip a default outfit.
     *   * Determine additional monster macros at a global level (e.g., use flyers).
     * @param task The current executing task.
     * @param outfit The outfit for the task.
     * @param combat The combat strategy so far for the task.
     * @param resources The combat resources assigned so far for the task.
     */

  }, {
    key: "customize",
    value: function customize(task, outfit, combat, resources) {// do nothing by default
    }
    /* eslint-enable @typescript-eslint/no-unused-vars */

    /**
     * Set the choice settings for the task.
     * @param task The current executing task.
     * @param manager The property manager to use.
     */

  }, {
    key: "setChoices",
    value: function setChoices(task, manager) {
      var choices = {};

      for (var choice_id_str in task.choices) {
        var choice_id = parseInt(choice_id_str);
        var choice = task.choices[choice_id];
        if (typeof choice === "number") choices[choice_id] = choice;else choices[choice_id] = choice();
      }

      manager.setChoices(choices);
    }
    /**
     * Save the combat macro for this task.
     * @param task The current executing task.
     * @param task_combat The completed combat strategy far for the task.
     * @param task_resources The combat resources assigned for the task.
     */

  }, {
    key: "setCombat",
    value: function setCombat(task, task_combat, task_resources) {
      var _a; // Save regular combat macro


      var macro = task_combat.compile(task_resources, (_a = this.options) === null || _a === void 0 ? void 0 : _a.combat_defaults, task.do instanceof Location ? task.do : undefined);
      macro.save();

      if (!this.options.ccs) {
        // Use the macro through a CCS file
        var otherCCSEntries = task_combat.compileCcs();
        var ccsContents = ["[default]", "\"".concat(macro.toString(), "\"")].concat(engine_toConsumableArray(otherCCSEntries)).join("\n"); // Log Macro + other CCS

        logprint("CCS: ".concat(ccsContents.replace("\n", "\\n ")));

        if (ccsContents !== this.cachedCcsContents) {
          writeCcs(ccsContents, grimoireCCS);
          cliExecute("ccs ".concat(grimoireCCS)); // force Mafia to reparse the ccs

          this.cachedCcsContents = ccsContents;
        }
      } // Save autoattack combat macro


      var autoattack = task_combat.compileAutoattack();

      if (autoattack.toString().length > 1) {
        logprint("Autoattack macro: ".concat(autoattack.toString()));
        autoattack.setAutoAttack();
      } else {
        setAutoAttack(0);
      }
    }
    /**
     * Do any task-specific preparation.
     * @param task The current executing task.
     */

  }, {
    key: "prepare",
    value: function prepare(task) {
      var _a;

      (_a = task.prepare) === null || _a === void 0 ? void 0 : _a.call(task);
    }
    /**
     * Actually perform the task.
     * @param task The current executing task.
     */

  }, {
    key: "do",
    value: function _do(task) {
      if (typeof task.do === "function") {
        task.do();
      } else {
        adv1(task.do, 0, "");
      }

      runCombat();

      while (inMultiFight()) {
        runCombat();
      }

      if (choiceFollowsFight()) runChoice(-1);
    }
    /**
     * Check if the task.do should be immediately repeated without any prep.
     *
     * By default, this is only used to repeat a task if we hit one of:
     *   1. Halloweener dog noncombats,
     *   2. June cleaver noncombats, or
     *   3. Lil' Doctor™ bag noncombt.
     * @param task The current executing task.
     * @returns True if the task should be immediately repeated.
     */

  }, {
    key: "shouldRepeatAdv",
    value: function shouldRepeatAdv(task) {
      return task.do instanceof Location && lastEncounterWasWanderingNC();
    }
    /**
     * Do any task-specific wrapup activities.
     * @param task The current executing task.
     */

  }, {
    key: "post",
    value: function post(task) {
      var _a;

      (_a = task.post) === null || _a === void 0 ? void 0 : _a.call(task);
    }
    /**
     * Mark that an attempt was made on the current task.
     * @param task The current executing task.
     */

  }, {
    key: "markAttempt",
    value: function markAttempt(task) {
      if (!(task.name in this.attempts)) this.attempts[task.name] = 0;
      this.attempts[task.name]++;
    }
    /**
     * Check if the task has passed any of its internal limits.
     * @param task The task to check.
     * @throws An error if any of the internal limits have been passed.
     */

  }, {
    key: "checkLimits",
    value: function checkLimits(task, postcondition) {
      var _a;

      if (!task.limit) return;
      var failureMessage = task.limit.message ? " ".concat(task.limit.message) : "";

      if (!task.completed()) {
        if (task.limit.tries && this.attempts[task.name] >= task.limit.tries) throw "Task ".concat(task.name, " did not complete within ").concat(task.limit.tries, " attempts. Please check what went wrong.").concat(failureMessage);
        if (task.limit.soft && this.attempts[task.name] >= task.limit.soft) throw "Task ".concat(task.name, " did not complete within ").concat(task.limit.soft, " attempts. Please check what went wrong (you may just be unlucky).").concat(failureMessage);
        if (task.limit.turns && task.do instanceof Location && task.do.turnsSpent >= task.limit.turns) throw "Task ".concat(task.name, " did not complete within ").concat(task.limit.turns, " turns. Please check what went wrong.").concat(failureMessage);
        if (task.limit.unready && ((_a = task.ready) === null || _a === void 0 ? void 0 : _a.call(task))) throw "Task ".concat(task.name, " is still ready, but it should not be. Please check what went wrong.").concat(failureMessage);
      }

      if (postcondition && !postcondition()) {
        throw "Task ".concat(task.name, " failed its guard. Please check what went wrong.").concat(failureMessage);
      }
    }
    /**
     * Initialize properties for the script.
     * @param manager The properties manager to use.
     */

  }, {
    key: "initPropertiesManager",
    value: function initPropertiesManager(manager) {
      var _a; // Properties adapted from garbo


      manager.set({
        logPreferenceChange: true,
        logPreferenceChangeFilter: engine_toConsumableArray(new Set([].concat(engine_toConsumableArray(get("logPreferenceChangeFilter").split(",")), ["libram_savedMacro", "maximizerMRUList", "testudinalTeachings", "_lastCombatStarted"]))).sort().filter(a => a).join(","),
        battleAction: "custom combat script",
        autoSatisfyWithMall: true,
        autoSatisfyWithNPCs: true,
        autoSatisfyWithCoinmasters: true,
        autoSatisfyWithStash: false,
        dontStopForCounters: true,
        maximizerFoldables: true,
        hpAutoRecovery: "-0.05",
        hpAutoRecoveryTarget: "0.0",
        mpAutoRecovery: "-0.05",
        mpAutoRecoveryTarget: "0.0",
        afterAdventureScript: "",
        betweenBattleScript: "",
        choiceAdventureScript: "",
        familiarScript: "",
        currentMood: "apathetic",
        autoTuxedo: true,
        autoPinkyRing: true,
        autoGarish: true,
        allowNonMoodBurning: false,
        allowSummonBurning: true,
        libramSkillsSoftcore: "none"
      });

      if (this.options.ccs !== "") {
        if (this.options.ccs === undefined && readCcs(grimoireCCS) === "") {
          // Write a simple CCS so we can switch to it
          writeCcs("[ default ]\nabort", grimoireCCS);
        }

        manager.set({
          customCombatScript: (_a = this.options.ccs) !== null && _a !== void 0 ? _a : grimoireCCS
        });
      }
    }
  }]);

  return Engine;
}()));
function maxSongs() {
  return have($skill(engine_templateObject || (engine_templateObject = engine_taggedTemplateLiteral(["Mariachi Memory"])))) ? 4 : 3;
}
var wanderingNCs = new Set(["Wooof! Wooooooof!", "Playing Fetch*", "A Pound of Cure", "Aunts not Ants", "Bath Time", "Beware of Aligator", "Delicious Sprouts", "Hypnotic Master", "Lost and Found", "Poetic Justice", "Summer Days", "Teacher's Pet"]);
/**
 * Return true if the last adv was one of:
 *   1. Halloweener dog noncombats,
 *   2. June cleaver noncombats, or
 *   3. Lil' Doctor™ bag noncombt.
 */

function lastEncounterWasWanderingNC() {
  return wanderingNCs.has(get("lastEncounter"));
}
;// CONCATENATED MODULE: ./node_modules/grimoire-kolmafia/dist/index.js







// EXTERNAL MODULE: ./node_modules/mafia-shared-relay/dist/index.js
var dist = __webpack_require__(2139);
;// CONCATENATED MODULE: ./node_modules/libram/dist/utils.js
function utils_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = utils_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function utils_slicedToArray(arr, i) { return utils_arrayWithHoles(arr) || utils_iterableToArrayLimit(arr, i) || utils_unsupportedIterableToArray(arr, i) || utils_nonIterableRest(); }

function utils_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function utils_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function utils_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function utils_toConsumableArray(arr) { return utils_arrayWithoutHoles(arr) || utils_iterableToArray(arr) || utils_unsupportedIterableToArray(arr) || utils_nonIterableSpread(); }

function utils_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function utils_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return utils_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return utils_arrayLikeToArray(o, minLen); }

function utils_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function utils_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return utils_arrayLikeToArray(arr); }

function utils_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function notNull(value) {
  return value !== null;
}
function parseNumber(n) {
  return Number.parseInt(n.replace(/,/g, ""));
}
/**
 * Clamp a number between lower and upper bounds.
 *
 * @param n Number to clamp.
 * @param min Lower bound.
 * @param max Upper bound.
 */

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}
/**
 * Split an {@param array} into {@param chunkSize} sized chunks
 *
 * @param array Array to split
 * @param chunkSize Size of chunk
 */

function utils_chunk(array, chunkSize) {
  var result = [];

  for (var i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }

  return result;
}
function arrayToCountedMap(array) {
  if (!Array.isArray(array)) return array;
  var map = new Map();
  array.forEach(item => {
    map.set(item, (map.get(item) || 0) + 1);
  });
  return map;
}
function countedMapToArray(map) {
  var _ref;

  return (_ref = []).concat.apply(_ref, utils_toConsumableArray(utils_toConsumableArray(map).map(_ref2 => {
    var _ref3 = utils_slicedToArray(_ref2, 2),
        item = _ref3[0],
        quantity = _ref3[1];

    return Array(quantity).fill(item);
  })));
}
function countedMapToString(map) {
  return utils_toConsumableArray(map).map(_ref4 => {
    var _ref5 = utils_slicedToArray(_ref4, 2),
        item = _ref5[0],
        quantity = _ref5[1];

    return "".concat(quantity, " x ").concat(item);
  }).join(", ");
}
/**
 * Sum an array of numbers.
 * @param addends Addends to sum.
 * @param mappingFunction function to turn elements into numbers
 */

function sum(addends, mappingFunction) {
  return addends.reduce((subtotal, element) => subtotal + mappingFunction(element), 0);
}
function sumNumbers(addends) {
  return sum(addends, x => x);
}
/**
 * Checks if a given item is in a readonly array, acting as a typeguard.
 * @param item Needle
 * @param array Readonly array haystack
 * @returns Whether the item is in the array, and narrows the type of the item.
 */

function arrayContains(item, array) {
  return array.includes(item);
}
/**
 * Checks if two arrays contain the same elements in the same quantity.
 * @param a First array for comparison
 * @param b Second array for comparison
 * @returns Whether the two arrays are equal, irrespective of order.
 */

function setEqual(a, b) {
  var sortedA = utils_toConsumableArray(a).sort();

  var sortedB = utils_toConsumableArray(b).sort();

  return a.length === b.length && sortedA.every((item, index) => item === sortedB[index]);
}
/**
 * Reverses keys and values for a given map
 * @param map Map to invert
 */

function invertMap(map) {
  var returnValue = new Map();

  var _iterator = utils_createForOfIteratorHelper(map),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = utils_slicedToArray(_step.value, 2),
          key = _step$value[0],
          value = _step$value[1];

      returnValue.set(value, key);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return returnValue;
}
/**
 * Creates a Type Guard function for a string union type defined via an array as const.
 */

function createStringUnionTypeGuardFunction(array) {
  return function (x) {
    return array.includes(x);
  };
}
/**
 * Splits a string by commas while also respecting escaping commas with a backslash
 * @param str String to split
 * @returns List of tokens
 */

function splitByCommasWithEscapes(str) {
  var returnValue = [];
  var ignoreNext = false;
  var currentString = "";

  var _iterator2 = utils_createForOfIteratorHelper(str.split("")),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var char = _step2.value;

      if (char === "\\") {
        ignoreNext = true;
      } else {
        if (char == "," && !ignoreNext) {
          returnValue.push(currentString.trim());
          currentString = "";
        } else {
          currentString += char;
        }

        ignoreNext = false;
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  returnValue.push(currentString.trim());
  return returnValue;
}
;// CONCATENATED MODULE: ./node_modules/libram/dist/template-string.js



var concatTemplateString = function concatTemplateString(literals) {
  for (var _len = arguments.length, placeholders = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    placeholders[_key - 1] = arguments[_key];
  }

  return literals.raw.reduce((acc, literal, i) => {
    var _placeholders$i;

    return acc + literal + ((_placeholders$i = placeholders[i]) !== null && _placeholders$i !== void 0 ? _placeholders$i : "");
  }, "");
};

var createSingleConstant = Type => {
  var tagFunction = function tagFunction(literals) {
    for (var _len2 = arguments.length, placeholders = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      placeholders[_key2 - 1] = arguments[_key2];
    }

    var input = concatTemplateString.apply(void 0, [literals].concat(placeholders));
    return Type.get(input);
  };

  tagFunction.none = Type.none;
  return tagFunction;
};

var createPluralConstant = Type => function (literals) {
  for (var _len3 = arguments.length, placeholders = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    placeholders[_key3 - 1] = arguments[_key3];
  }

  var input = concatTemplateString.apply(void 0, [literals].concat(placeholders));

  if (input === "") {
    return Type.all();
  }

  return Type.get(splitByCommasWithEscapes(input));
};
/**
 * A Bounty specified by name.
 *
 * @category In-game constant
 */


var $bounty = createSingleConstant(external_kolmafia_.Bounty);
/**
 * A list of Bounties specified by a comma-separated list of names.
 * For a list of all possible Bounties, leave the template string blank.
 *
 * @category In-game constant
 */

var $bounties = createPluralConstant(external_kolmafia_.Bounty);
/**
 * A Class specified by name.
 *
 * @category In-game constant
 */

var template_string_$class = createSingleConstant(external_kolmafia_.Class);
/**
 * A list of Classes specified by a comma-separated list of names.
 * For a list of all possible Classes, leave the template string blank.
 *
 * @category In-game constant
 */

var $classes = createPluralConstant(external_kolmafia_.Class);
/**
 * A Coinmaster specified by name.
 *
 * @category In-game constant
 */

var $coinmaster = createSingleConstant(external_kolmafia_.Coinmaster);
/**
 * A list of Coinmasters specified by a comma-separated list of names.
 * For a list of all possible Coinmasters, leave the template string blank.
 *
 * @category In-game constant
 */

var $coinmasters = createPluralConstant(external_kolmafia_.Coinmaster);
/**
 * An Effect specified by name.
 *
 * @category In-game constant
 */

var $effect = createSingleConstant(external_kolmafia_.Effect);
/**
 * A list of Effects specified by a comma-separated list of names.
 * For a list of all possible Effects, leave the template string blank.
 *
 * @category In-game constant
 */

var $effects = createPluralConstant(external_kolmafia_.Effect);
/**
 * An Element specified by name.
 *
 * @category In-game constant
 */

var $element = createSingleConstant(external_kolmafia_.Element);
/**
 * A list of Elements specified by a comma-separated list of names.
 * For a list of all possible Elements, leave the template string blank.
 *
 * @category In-game constant
 */

var $elements = createPluralConstant(external_kolmafia_.Element);
/**
 * A Familiar specified by name.
 *
 * @category In-game constant
 */

var template_string_$familiar = createSingleConstant(external_kolmafia_.Familiar);
/**
 * A list of Familiars specified by a comma-separated list of names.
 * For a list of all possible Familiars, leave the template string blank.
 *
 * @category In-game constant
 */

var template_string_$familiars = createPluralConstant(external_kolmafia_.Familiar);
/**
 * An Item specified by name.
 *
 * @category In-game constant
 */

var template_string_$item = createSingleConstant(external_kolmafia_.Item);
/**
 * A list of Items specified by a comma-separated list of names.
 * For a list of all possible Items, leave the template string blank.
 *
 * @category In-game constant
 */

var template_string_$items = createPluralConstant(external_kolmafia_.Item);
/**
 * A Location specified by name.
 *
 * @category In-game constant
 */

var $location = createSingleConstant(external_kolmafia_.Location);
/**
 * A list of Locations specified by a comma-separated list of names.
 * For a list of all possible Locations, leave the template string blank.
 *
 * @category In-game constant
 */

var $locations = createPluralConstant(external_kolmafia_.Location);
/**
 * A Monster specified by name.
 *
 * @category In-game constant
 */

var $monster = createSingleConstant(external_kolmafia_.Monster);
/**
 * A list of Monsters specified by a comma-separated list of names.
 * For a list of all possible Monsters, leave the template string blank.
 *
 * @category In-game constant
 */

var $monsters = createPluralConstant(external_kolmafia_.Monster);
/**
 * A Phylum specified by name.
 *
 * @category In-game constant
 */

var template_string_$phylum = createSingleConstant(external_kolmafia_.Phylum);
/**
 * A list of Phyla specified by a comma-separated list of names.
 * For a list of all possible Phyla, leave the template string blank.
 *
 * @category In-game constant
 */

var $phyla = createPluralConstant(external_kolmafia_.Phylum);
/**
 * A Servant specified by name.
 *
 * @category In-game constant
 */

var $servant = createSingleConstant(external_kolmafia_.Servant);
/**
 * A list of Servants specified by a comma-separated list of names.
 * For a list of all possible Servants, leave the template string blank.
 *
 * @category In-game constant
 */

var $servants = createPluralConstant(external_kolmafia_.Servant);
/**
 * A Skill specified by name.
 *
 * @category In-game constant
 */

var template_string_$skill = createSingleConstant(external_kolmafia_.Skill);
/**
 * A list of Skills specified by a comma-separated list of names.
 * For a list of all possible Skills, leave the template string blank.
 *
 * @category In-game constant
 */

var $skills = createPluralConstant(external_kolmafia_.Skill);
/**
 * A Slot specified by name.
 *
 * @category In-game constant
 */

var template_string_$slot = createSingleConstant(external_kolmafia_.Slot);
/**
 * A list of Slots specified by a comma-separated list of names.
 * For a list of all possible Slots, leave the template string blank.
 *
 * @category In-game constant
 */

var template_string_$slots = createPluralConstant(external_kolmafia_.Slot);
/**
 * A Stat specified by name.
 *
 * @category In-game constant
 */

var $stat = createSingleConstant(external_kolmafia_.Stat);
/**
 * A list of Stats specified by a comma-separated list of names.
 * For a list of all possible Stats, leave the template string blank.
 *
 * @category In-game constant
 */

var $stats = createPluralConstant(external_kolmafia_.Stat);
/**
 * A Thrall specified by name.
 *
 * @category In-game constant
 */

var $thrall = createSingleConstant(external_kolmafia_.Thrall);
/**
 * A list of Thralls specified by a comma-separated list of names.
 * For a list of all possible Thralls, leave the template string blank.
 *
 * @category In-game constant
 */

var $thralls = createPluralConstant(external_kolmafia_.Thrall);
/**
 * A Path specified by name.
 *
 * @category In-game constant
 */

var $path = createSingleConstant(external_kolmafia_.Path);
/**
 * A list of Paths specified by a comma-separated list of names.
 * For a list of all possible Paths, leave the template string blank.
 *
 * @category In-game constant
 */

var $paths = createPluralConstant(external_kolmafia_.Path);
;// CONCATENATED MODULE: ./src/tasks/sim.ts
var sim_templateObject, sim_templateObject2, sim_templateObject3, sim_templateObject4, sim_templateObject5, sim_templateObject6, sim_templateObject7, sim_templateObject8, sim_templateObject9, sim_templateObject10, sim_templateObject11, sim_templateObject12, sim_templateObject13, sim_templateObject14, sim_templateObject15, sim_templateObject16, sim_templateObject17, sim_templateObject18, sim_templateObject19, sim_templateObject20, sim_templateObject21, sim_templateObject22, sim_templateObject23, sim_templateObject24, sim_templateObject25, sim_templateObject26, sim_templateObject27, sim_templateObject28, sim_templateObject29, sim_templateObject30, _templateObject31, _templateObject32, _templateObject33, _templateObject34, _templateObject35, _templateObject36, _templateObject37, _templateObject38, _templateObject39, _templateObject40, _templateObject41, _templateObject42;

function sim_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = sim_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function sim_slicedToArray(arr, i) { return sim_arrayWithHoles(arr) || sim_iterableToArrayLimit(arr, i) || sim_unsupportedIterableToArray(arr, i) || sim_nonIterableRest(); }

function sim_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function sim_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return sim_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return sim_arrayLikeToArray(o, minLen); }

function sim_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function sim_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function sim_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function sim_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





/**
 * Return: a list of all things required to run the script.
 */
var generalList = [{
  thing: template_string_$familiar(sim_templateObject || (sim_templateObject = sim_taggedTemplateLiteral(["Grey Goose"]))),
  why: "Running Grey You Path"
}, {
  thing: template_string_$skill(sim_templateObject2 || (sim_templateObject2 = sim_taggedTemplateLiteral(["Curse of Weaksauce"]))),
  why: "aftercore combat"
}, {
  thing: template_string_$familiars(sim_templateObject3 || (sim_templateObject3 = sim_taggedTemplateLiteral(["Robortender, Space Jellyfish, Hobo Monkey, Leprechaun"]))),
  why: "in-run farming familiar"
}, {
  thing: template_string_$skill(sim_templateObject4 || (sim_templateObject4 = sim_taggedTemplateLiteral(["Torso Awareness"]))),
  why: "general purpose",
  optional: true
}, {
  thing: template_string_$item(sim_templateObject5 || (sim_templateObject5 = sim_taggedTemplateLiteral(["porquoise-handled sixgun"]))),
  why: "mp maintenance (20-30 free mp / combat)",
  optional: true
}];
var levelList = [{
  thing: template_string_$item(sim_templateObject6 || (sim_templateObject6 = sim_taggedTemplateLiteral(["January's Garbage Tote"]))),
  why: "aftercore leveling",
  optional: true
}, {
  thing: {
    have: () => property_get("getawayCampsiteUnlocked"),
    name: template_string_$item(sim_templateObject7 || (sim_templateObject7 = sim_taggedTemplateLiteral(["Distant Woods Getaway Brochure"]))).name
  },
  why: "aftercore leveling",
  optional: true
}, {
  thing: {
    have: () => property_get("neverendingPartyAlways"),
    name: template_string_$item(sim_templateObject8 || (sim_templateObject8 = sim_taggedTemplateLiteral(["Neverending Party invitation envelope"]))).name
  },
  why: "scaling free fights",
  optional: true
}, {
  thing: template_string_$item(sim_templateObject9 || (sim_templateObject9 = sim_taggedTemplateLiteral(["Clan VIP Lounge key"]))),
  why: "aftercore leveling",
  optional: true
}, // { thing: $skill`Sweet Synthesis`, why: "aftercore leveling", optional: true },
// { thing: $familiar`Vampire Vintner`, why: "goose charging", optional: true },
{
  thing: template_string_$item(sim_templateObject10 || (sim_templateObject10 = sim_taggedTemplateLiteral(["familiar scrapbook"]))),
  why: "aftercore leveling",
  optional: true
}, {
  thing: template_string_$item(sim_templateObject11 || (sim_templateObject11 = sim_taggedTemplateLiteral(["defective Game Grid token"]))),
  why: "aftercore leveling",
  optional: true
}, {
  thing: template_string_$item(sim_templateObject12 || (sim_templateObject12 = sim_taggedTemplateLiteral(["trench lighter"]))),
  why: "aftercore leveling",
  optional: true
}, {
  thing: template_string_$skill(sim_templateObject13 || (sim_templateObject13 = sim_taggedTemplateLiteral(["Feel Pride"]))),
  why: "aftercore leveling",
  optional: true
}, {
  thing: template_string_$item(sim_templateObject14 || (sim_templateObject14 = sim_taggedTemplateLiteral(["[glitch season reward name]"]))),
  why: "aftercore leveling",
  optional: true
}, // { thing: $item`cosmic bowling ball`, why: "aftercore leveling", optional: true },
{
  thing: template_string_$item(sim_templateObject15 || (sim_templateObject15 = sim_taggedTemplateLiteral(["fake washboard"]))),
  why: "aftercore leveling (mus)",
  optional: true
}, {
  thing: template_string_$skill(sim_templateObject16 || (sim_templateObject16 = sim_taggedTemplateLiteral(["Inscrutable Gaze"]))),
  why: "aftercore leveling (mys)",
  optional: true
}, {
  thing: template_string_$item(sim_templateObject17 || (sim_templateObject17 = sim_taggedTemplateLiteral(["basaltamander buckler"]))),
  why: "aftercore leveling (mys)",
  optional: true
}];
var profitList = [{
  thing: template_string_$item(sim_templateObject18 || (sim_templateObject18 = sim_taggedTemplateLiteral(["lucky gold ring"]))),
  why: "in-run farming profits",
  optional: true
}, {
  thing: template_string_$item(sim_templateObject19 || (sim_templateObject19 = sim_taggedTemplateLiteral(["Mr. Cheeng's spectacles"]))),
  why: "in-run farming profits",
  optional: true
}, {
  thing: template_string_$item(sim_templateObject20 || (sim_templateObject20 = sim_taggedTemplateLiteral(["mafia thumb ring"]))),
  why: "in-run farming profits",
  optional: true
}, {
  thing: template_string_$item(sim_templateObject21 || (sim_templateObject21 = sim_taggedTemplateLiteral(["SongBoom\u2122 BoomBox"]))),
  why: "in-run farming profits",
  optional: true
}, {
  thing: template_string_$items(sim_templateObject22 || (sim_templateObject22 = sim_taggedTemplateLiteral(["Asdon Martin keyfob, Little Geneticist DNA-Splicing Lab, portable Mayo Clinic, warbear induction oven, snow machine"]))),
  why: "various profits",
  optional: true
}, {
  thing: template_string_$item(sim_templateObject23 || (sim_templateObject23 = sim_taggedTemplateLiteral(["June cleaver"]))),
  why: "in-run farming profits",
  optional: true
}, {
  thing: template_string_$item(sim_templateObject24 || (sim_templateObject24 = sim_taggedTemplateLiteral(["tiny stillsuit"]))),
  why: "rollover adventures",
  optional: true
}, {
  thing: template_string_$item(sim_templateObject25 || (sim_templateObject25 = sim_taggedTemplateLiteral(["mime army shotglass"]))),
  why: "extra size-1 booze/day",
  optional: true
}, {
  thing: template_string_$familiar(sim_templateObject26 || (sim_templateObject26 = sim_taggedTemplateLiteral(["Stooper"]))),
  why: "rollover adventures",
  optional: true
}, {
  thing: template_string_$item(sim_templateObject27 || (sim_templateObject27 = sim_taggedTemplateLiteral(["Drunkula's wineglass"]))),
  why: "overdrunk farming",
  optional: true
}, {
  thing: template_string_$item(sim_templateObject28 || (sim_templateObject28 = sim_taggedTemplateLiteral(["infinite BACON machine"]))),
  why: "daily Dungeon Malware",
  optional: true
}];
var freefightList = [{
  thing: template_string_$item(sim_templateObject29 || (sim_templateObject29 = sim_taggedTemplateLiteral(["carnivorous potted plant"]))),
  why: "occasional free kill",
  optional: true
}, {
  thing: template_string_$item(sim_templateObject30 || (sim_templateObject30 = sim_taggedTemplateLiteral(["cursed magnifying glass"]))),
  why: "additional free fight",
  optional: true
}, {
  thing: template_string_$item(_templateObject31 || (_templateObject31 = sim_taggedTemplateLiteral(["miniature crystal ball"]))),
  why: "additional free fight",
  optional: true
}, {
  thing: template_string_$item(_templateObject32 || (_templateObject32 = sim_taggedTemplateLiteral(["Claw of the Infernal Seal"]))),
  why: "5 additional free seals",
  optional: true
}, {
  thing: template_string_$item(_templateObject33 || (_templateObject33 = sim_taggedTemplateLiteral(["The Jokester's gun"]))),
  why: "free kill",
  optional: true
}, {
  thing: template_string_$skill(_templateObject34 || (_templateObject34 = sim_taggedTemplateLiteral(["Gingerbread Mob Hit"]))),
  why: "free kill",
  optional: true
}, {
  thing: template_string_$skill(_templateObject35 || (_templateObject35 = sim_taggedTemplateLiteral(["Shattering Punch"]))),
  why: "3 free kills",
  optional: true
}, {
  thing: template_string_$item(_templateObject36 || (_templateObject36 = sim_taggedTemplateLiteral(["Lil' Doctor\u2122 bag"]))),
  why: "3 free kills",
  optional: true
}];
var marginalList = [{
  thing: template_string_$skill(_templateObject37 || (_templateObject37 = sim_taggedTemplateLiteral(["Snokebomb"]))),
  why: "banish",
  optional: true
}, {
  thing: template_string_$skill(_templateObject38 || (_templateObject38 = sim_taggedTemplateLiteral(["Feel Hatred"]))),
  why: "banish",
  optional: true
}, {
  thing: template_string_$item(_templateObject39 || (_templateObject39 = sim_taggedTemplateLiteral(["mafia middle finger ring"]))),
  why: "banish",
  optional: true
}, {
  thing: template_string_$item(_templateObject40 || (_templateObject40 = sim_taggedTemplateLiteral(["hewn moon-rune spoon"]))),
  why: "easier perming of gnome skills",
  optional: true
}, {
  thing: template_string_$skill(_templateObject41 || (_templateObject41 = sim_taggedTemplateLiteral(["Comprehensive Cartography"]))),
  why: "gold wedding ring",
  optional: true
}];

function checkThing(thing) {
  if ("have" in thing && "name" in thing && thing.have instanceof Function) return [thing.have(), thing.name]; //if this is a SpecialThing

  if (thing instanceof Familiar) return [have(thing), thing.hatchling.name];
  if (thing instanceof Skill) return [thing.name in getPermedSkills(), thing.name];
  if (thing instanceof Monster) return [new Set(CombatLoversLocket.unlockedLocketMonsters()).has(thing), thing.name];
  if (thing instanceof Item) return [have(thing) || storageAmount(thing) > 0, thing.name];
  return [false, thing.name];
}

function check(req) {
  if (Array.isArray(req.thing)) {
    var checks = req.thing.map(checkThing);
    return [checks.find(res => res[0]) !== undefined, checks.map(res => res[1]).join(" OR "), req];
  } else {
    var res = checkThing(req.thing);
    return [res[0], res[1], req];
  }
}

function checkReqs() {
  var missing_optional = 0;
  var missing = 0;
  var categories = [["Required", generalList], ["General", generalList], ["Leveling", levelList], ["Free Fights", freefightList], ["Profits", profitList], ["Marginal", marginalList]];
  printHtml("Checking your character... Legend: <font color='#888888'>✓ Have</font> / <font color='red'>X Missing & Required</font> / <font color='black'>X Missing & Optional");

  for (var _i = 0, _categories = categories; _i < _categories.length; _i++) {
    var _categories$_i = sim_slicedToArray(_categories[_i], 2),
        name = _categories$_i[0],
        requirements = _categories$_i[1];

    if (requirements.length === 0) continue;
    var requirements_info = requirements.map(check);
    print(name, "blue");

    var _iterator = sim_createForOfIteratorHelper(requirements_info.sort((a, b) => a[1].localeCompare(b[1]))),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = sim_slicedToArray(_step.value, 3),
            have_it = _step$value[0],
            _name = _step$value[1],
            req = _step$value[2];

        var color = have_it ? "#888888" : req.optional ? "black" : "red";
        var symbol = have_it ? "✓" : "X";
        if (!have_it && req.optional) missing_optional++;
        if (!have_it && !req.optional) missing++;
        print("".concat(symbol, " ").concat(_name, " - ").concat(req.why), color);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    print("");
  } // Print the count of missing things


  if (missing > 0) {
    print("You are missing ".concat(missing, " required things. This script will not yet work for you."), "red");
    if (missing_optional > 0) print("You are also missing ".concat(missing_optional, " optional things."));
  } else {
    if (missing_optional > 0) {
      print("You are missing ".concat(missing_optional, " optional things. This script should work, but it could do better."));
    } else {
      print("You have everything! You are the shiniest star. This script should work great.");
    }
  }
}

function spanWrap(text, color) {
  return "<span color=\"".concat(color, "\">").concat(text, "</span>");
}

function sim_coloredSkill(sk, nPerms, nClass) {
  return sk.name in getPermedSkills() ? spanWrap(sk.name, "black") : nPerms.includes(sk) && have(sk) ? spanWrap(sk.name, "fuchsia") : nPerms.includes(sk) ? spanWrap(sk.name, "blue") : have(sk) ? spanWrap(sk.name, "purple") : nClass && nClass === sk.class && nClass !== $class(_templateObject42 || (_templateObject42 = sim_taggedTemplateLiteral(["none"]))) ? spanWrap(sk.name, "navy") : spanWrap(sk.name, "gray");
}
function checkPerms() {
  var nPerms = targetPerms(false);
  var nClass = targetClass(false);
  printHtml("~~ Default Perm List ~~", false);
  printHtml("Legend: <span color=\"black\">[permed]</span>, <span color=\"fuchsia\">[targeted/known]</span>, <span color=\"blue\">[targeted/unknown]</span>, <span color=\"purple\">[known]</span>, <span color=\"navy\">[class skills]</span>, <span color=\"gray\">[other]</span>", false);
  var count = 0;
  defaultPermList().forEach(sks => printHtml("<br>~ ".concat(permTiers[count++], " ~<br> ").concat(sks.map(sk => sim_coloredSkill(sk, nPerms, nClass)).join(", ")), false));
}
;// CONCATENATED MODULE: ./src/tasks/perm.ts
var perm_templateObject, perm_templateObject2, perm_templateObject3, perm_templateObject4, perm_templateObject5, perm_templateObject6, perm_templateObject7, perm_templateObject8, perm_templateObject9, perm_templateObject10, perm_templateObject11, perm_templateObject12, perm_templateObject13, perm_templateObject14, perm_templateObject15, perm_templateObject16;

function perm_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





function perm_getClass(property, _default) {
  return toClass(get(property, _default.toString()));
}
function setClass(property, value) {
  set(property, value.toString());
}
var baseClasses = $classes(perm_templateObject || (perm_templateObject = perm_taggedTemplateLiteral(["Seal Clubber, Turtle Tamer, Pastamancer, Sauceror, Disco Bandit, Accordion Thief"])));
var gnomeSkills = $skills(perm_templateObject2 || (perm_templateObject2 = perm_taggedTemplateLiteral(["Torso Awareness, Gnefarious Pickpocketing, Powers of Observatiogn, Gnomish Hardigness, Cosmic Ugnderstanding"])));
var permBlockList = $skills(perm_templateObject3 || (perm_templateObject3 = perm_taggedTemplateLiteral(["CLEESH, Chronic Indigestion"])));
var perm_permTiers = ["Tier 0 - All permable non-guild, non-gnome skills (never target these, but perm them if you know them)", "Tier 1 - Needed for the script to run at its best", "Tier 2 - Great skills", "Tier 3 - Good skills", "Tier 4 - QoL skills", "Tier 5 - Ascension-relevant skills", "Tier 6 - Skills with non-zero utility", "Tier 7 - All other guild skills", "Tier 8 - Otherwise-blocked skills"];
var permList = [//tier 0
$skills(perm_templateObject4 || (perm_templateObject4 = perm_taggedTemplateLiteral([""]))).filter(sk => sk.permable && sk.level === -1 && !permBlockList.includes(sk) && !gnomeSkills.includes(sk)), //tier 1
$skills(perm_templateObject5 || (perm_templateObject5 = perm_taggedTemplateLiteral(["Curse of Weaksauce, Itchy Curse Finger, Torso Awareness, Cannelloni Cocoon"]))), //tier 2
$skills(perm_templateObject6 || (perm_templateObject6 = perm_taggedTemplateLiteral(["Nimble Fingers, Amphibian Sympathy, Leash of Linguini, Thief Among the Honorable, Expert Panhandling, Disco Leer, Wrath of the Wolverine, Furious Wallop, Five Finger Discount, Double-Fisted Skull Smashing, Impetuous Sauciness, Tao of the Terrapin, Saucestorm"]))), //tier 3
$skills(perm_templateObject7 || (perm_templateObject7 = perm_taggedTemplateLiteral(["Tongue of the Walrus, Mad Looting Skillz, Smooth Movement, Musk of the Moose, The Polka of Plenty, The Sonata of Sneakiness, Carlweather's Cantata of Confrontation, Mariachi Memory"]))), //tier 4
$skills(perm_templateObject8 || (perm_templateObject8 = perm_taggedTemplateLiteral(["Gnefarious Pickpocketing, Powers of Observatiogn, Gnomish Hardigness, Cosmic Ugnderstanding, Ambidextrous Funkslinging, The Long View, Wisdom of the Elder Tortoises, Inner Sauce, Springy Fusilli, Overdeveloped Sense of Self Preservation, Pulverize"]))), //tier 5
$skills(perm_templateObject9 || (perm_templateObject9 = perm_taggedTemplateLiteral(["Pastamastery, Advanced Cocktailcrafting, The Ode to Booze, The Magical Mojomuscular Melody, Advanced Saucecrafting, Saucemaven, The Way of Sauce, Fat Leon's Phat Loot Lyric, Empathy of the Newt, The Moxious Madrigal, Stuffed Mortar Shell, Flavour of Magic, Elemental Saucesphere, Spirit of Ravioli, Lunging Thrust-Smack, Entangling Noodles, Cold-Blooded Fearlessness, Northern Exposure, Diminished Gag Reflex, Tolerance of the Kitchen, Heart of Polyester, Irrepressible Spunk, Saucegeyser, Scarysauce, Ire of the Orca, Batter Up!, Disco Fever, Rage of the Reindeer, Testudinal Teachings, Disco Nap, Adventurer of Leisure, Armorcraftiness"]))), //tier 6
$skills(perm_templateObject10 || (perm_templateObject10 = perm_taggedTemplateLiteral(["Superhuman Cocktailcrafting, Transcendental Noodlecraft, Super-Advanced Meatsmithing, Patient Smile, Wry Smile, Knowing Smile, Aloysius' Antiphon of Aptitude, Pride of the Puffin, Ur-Kel's Aria of Annoyance, Sensitive Fingers, Master Accordion Master Thief, Skin of the Leatherback, Hide of the Walrus, Astral Shell, Ghostly Shell, Subtle and Quick to Anger, Master Saucier, Hero of the Half-Shell, Shield of the Pastalord, Saucy Salve, The Power Ballad of the Arrowsmith, Jalape\xF1o Saucesphere, Claws of the Walrus, Shell Up, Brawnee's Anthem of Absorption, Reptilian Fortitude, The Psalm of Pointiness, Spiky Shell, Stiff Upper Lip, Blubber Up, Disco Smirk, Blood Sugar Sauce Magic, Cletus's Canticle of Celerity, Suspicious Gaze, Icy Glare, Dirge of Dreadfulness, Snarl of the Timberwolf, Stevedave's Shanty of Superiority, Northern Explosion, That's Not a Knife"]))), //tier 7
$skills(perm_templateObject11 || (perm_templateObject11 = perm_taggedTemplateLiteral([""]))).filter(sk => sk.permable && sk.level >= 0), //tier 8
permBlockList];
var perm_defaultPermList = () => permList.slice(0, args.permtier + 1);
function permOptions(planning) {
  //planning = true: next run, false: this run
  var classChoices = planning ? baseClasses : baseClasses.includes(myClass()) ? [myClass()] : [perm_getClass("goorboNextClass", args.defaultclass)];
  var ctPerms = planning ? perm_targetPerms(false) : [];
  return !planning //current run
  ? perm_defaultPermList().map(sks => sks.filter(sk => !(sk.name in getPermedSkills()) && (have(sk) || gnomeSkills.includes(sk) && gnomadsAvailable() || classChoices.includes(sk.class) && sk.level > 0))) //for current run, include skills that we know or that we can train in this run.
  : perm_defaultPermList().map(sks => sks.filter(sk => !(sk.name in getPermedSkills() || ctPerms.includes(sk)) && (gnomeSkills.includes(sk) || classChoices.includes(sk.class) && sk.level >= 0))); //for next run, exclude all skills that we are planning to perm this run, and allow all guild and gnome skills.
}
function permTier(planning) {
  // the highest tier of unpermed skills available. Returns 0 if no non-tier 0 skills are available
  return permOptions(planning).slice(1).findIndex(sks => sks.length !== 0) + 1;
}
function expectedKarma(planning) {
  return (!planning ? get("bankedKarma") + (inHardcore() ? 200 : inCasual() ? 0 : 100) : expectedKarma(false) - perm_targetPerms(false).length * 100 + (inHardcore() ? 200 : inCasual() ? 0 : 100)) + (args.astralpet === $item(perm_templateObject12 || (perm_templateObject12 = perm_taggedTemplateLiteral(["none"]))) ? 10 : 0);
}

function shouldBankKarma(planning) {
  var tier = permTier(planning);
  return expectedKarma(planning) / 100 < tier || tier === 0;
}

function perm_targetClass(planning) {
  if (myClass() === $class(perm_templateObject13 || (perm_templateObject13 = perm_taggedTemplateLiteral(["Grey Goo"])))) {
    if (args.class && args.class !== $class(perm_templateObject14 || (perm_templateObject14 = perm_taggedTemplateLiteral(["none"])))) return args.class;
    return perm_getClass("goorboNextClass", args.defaultclass);
  }

  if (planning && args.class && args.class !== $class(perm_templateObject15 || (perm_templateObject15 = perm_taggedTemplateLiteral(["none"])))) return args.class; //can't access permed skill status in grey goo

  if (shouldBankKarma(planning)) return args.defaultclass; //if we will be banking skills

  var sk = permOptions(planning).flat().find(sk => baseClasses.includes(sk.class));
  return sk ? sk.class : args.defaultclass;
}
function perm_targetPerms(planning) {
  var pOptions = permOptions(planning);
  var tier = permTier(planning);
  var maxQty = Math.floor(expectedKarma(planning) / 100);
  if (tier > maxQty || tier === 0) //don't perm anything (bank karma), but do perm high-tier skills you happen to already know (probably due to Big Book or manually used skillbooks)
    return !planning ? pOptions.slice(0, tier + 1) //skills in tiers <= your current best perm target
    .flat().filter(sk => have(sk)).slice(0, maxQty) //don't plan to perm more than we have karma for
    : []; //don't plan to perm anything next run if we plan to bank karma

  var qty = Math.min(maxQty, tier + Math.ceil(Math.sqrt(Math.max(0, maxQty - tier))));
  var tClass = planning ? perm_targetClass(true) : $class(perm_templateObject16 || (perm_templateObject16 = perm_taggedTemplateLiteral(["none"])));
  return (!planning ? pOptions.flat().filter(sk => !gnomeSkills.includes(sk) || gnomadsAvailable()) : //filter out gnome skills if not available (non-targetClass skills filtered out in permOptions already, for current run)
  pOptions.flat().filter(sk => sk.class === tClass || gnomeSkills.includes(sk)) //filter out non-targetClass skills
  ).slice(0, qty);
}

function planHelper(perms, cls, karma) {
  if (perms.length > 0) return "Perm plan: [".concat(perms.join(", "), "] - Class: <span color=\"blue\">").concat(cls, "</span>, Expected Karma: ").concat(karma);else return "Perm Plan: bank karma - Class: <span color=\"blue\">".concat(cls, "</span>, Expected Karma: ").concat(karma);
}

function printPermPlan() {
  var cClass = perm_targetClass(false);
  var cPerms = perm_targetPerms(false);
  var nClass = perm_targetClass(true);
  var nPerms = perm_targetPerms(true);
  print();
  printHtml("Current ".concat(planHelper(cPerms.map(sk => coloredSkill(sk, cPerms, cClass)), cClass, expectedKarma(false))), true);
  printHtml("Next ".concat(planHelper(nPerms.map(sk => coloredSkill(sk, nPerms, nClass)), nClass, expectedKarma(true))), true);
}
// EXTERNAL MODULE: ./node_modules/core-js/features/array/flat.js
var flat = __webpack_require__(1755);
;// CONCATENATED MODULE: ./node_modules/libram/dist/lib.js
var lib_templateObject, lib_templateObject2, lib_templateObject3, lib_templateObject4, lib_templateObject5, lib_templateObject6, lib_templateObject7, lib_templateObject8, lib_templateObject9, lib_templateObject10, lib_templateObject11, lib_templateObject12, lib_templateObject13, lib_templateObject14, lib_templateObject15, lib_templateObject16, lib_templateObject17, lib_templateObject18, lib_templateObject19, lib_templateObject20, lib_templateObject21, lib_templateObject22, lib_templateObject23, lib_templateObject24, lib_templateObject25, lib_templateObject26, lib_templateObject27, lib_templateObject28, lib_templateObject29, lib_templateObject30, lib_templateObject31, lib_templateObject32, lib_templateObject33, lib_templateObject34;

function lib_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function lib_createClass(Constructor, protoProps, staticProps) { if (protoProps) lib_defineProperties(Constructor.prototype, protoProps); if (staticProps) lib_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function lib_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function lib_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) lib_setPrototypeOf(subClass, superClass); }

function lib_createSuper(Derived) { var hasNativeReflectConstruct = lib_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = lib_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = lib_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return lib_possibleConstructorReturn(this, result); }; }

function lib_possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return lib_assertThisInitialized(self); }

function lib_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, lib_getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return lib_setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (lib_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) lib_setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function lib_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function lib_setPrototypeOf(o, p) { lib_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return lib_setPrototypeOf(o, p); }

function lib_getPrototypeOf(o) { lib_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return lib_getPrototypeOf(o); }

function lib_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = lib_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function lib_slicedToArray(arr, i) { return lib_arrayWithHoles(arr) || lib_iterableToArrayLimit(arr, i) || lib_unsupportedIterableToArray(arr, i) || lib_nonIterableRest(); }

function lib_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function lib_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return lib_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return lib_arrayLikeToArray(o, minLen); }

function lib_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function lib_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function lib_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function lib_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/** @module GeneralLibrary */






/**
 * Returns the current maximum Accordion Thief songs the player can have in their head
 *
 * @category General
 */

function getSongLimit() {
  return 3 + (booleanModifier("Four Songs") ? 1 : 0) + numericModifier("Additional Song");
}
/**
 * Return whether the Skill or Effect provided is an Accordion Thief song
 *
 * @category General
 * @param skillOrEffect The Skill or Effect
 */

function lib_isSong(skillOrEffect) {
  if (skillOrEffect instanceof Effect && skillOrEffect.attributes.includes("song")) {
    return true;
  } else {
    var skill = skillOrEffect instanceof Effect ? toSkill(skillOrEffect) : skillOrEffect;
    return skill.class === $class(lib_templateObject || (lib_templateObject = lib_taggedTemplateLiteral(["Accordion Thief"]))) && skill.buff;
  }
}
/**
 * List all active Effects
 *
 * @category General
 */

function getActiveEffects() {
  return Object.keys(myEffects()).map(e => Effect.get(e));
}
/**
 * List currently active Accordion Thief songs
 *
 * @category General
 */

function getActiveSongs() {
  return getActiveEffects().filter(lib_isSong);
}
/**
 * List number of active Accordion Thief songs
 *
 * @category General
 */

function getSongCount() {
  return getActiveSongs().length;
}
/**
 * Returns true if the player can remember another Accordion Thief song
 *
 * @category General
 * @param quantity Number of songs to test the space for
 */

function canRememberSong() {
  var quantity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  return getSongLimit() - getSongCount() >= quantity;
}
/**
 * Return the locations in which the given monster can be encountered naturally
 *
 * @category General
 * @param monster Monster to find
 */

function getMonsterLocations(monster) {
  return Location.all().filter(location => monster.name in appearanceRates(location));
}
/**
 * Return the player's remaining liver space
 *
 * @category General
 */

function getRemainingLiver() {
  return inebrietyLimit() - myInebriety();
}
/**
 * Return the player's remaining stomach space
 *
 * @category General
 */

function getRemainingStomach() {
  return fullnessLimit() - myFullness();
}
/**
 * Return the player's remaining spleen space
 *
 * @category General
 */

function getRemainingSpleen() {
  return spleenLimit() - mySpleenUse();
}
/**
 * Return whether the player "has" any entity which one could feasibly "have".
 *
 * @category General
 * @param thing Thing to check
 * @param quantity Number to check that the player has
 */

function lib_have(thing) {
  var quantity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if (thing instanceof Effect) {
    return haveEffect(thing) >= quantity;
  }

  if (thing instanceof Familiar) {
    return haveFamiliar(thing);
  }

  if (thing instanceof Item) {
    return availableAmount(thing) >= quantity;
  }

  if (thing instanceof Servant) {
    return haveServant(thing);
  }

  if (thing instanceof Skill) {
    return haveSkill(thing);
  }

  if (thing instanceof Thrall) {
    var thrall = myThrall();
    return thrall.id === thing.id && thrall.level >= quantity;
  }

  return false;
}
/**
 * Return whether an item is in the player's campground
 *
 * @category General
 * @param item The item mafia uses to represent the campground item
 */

function haveInCampground(item) {
  return Object.keys(getCampground()).map(i => Item.get(i)).includes(item);
}
var Wanderer;

(function (Wanderer) {
  Wanderer["Digitize"] = "Digitize Monster";
  Wanderer["Enamorang"] = "Enamorang Monster";
  Wanderer["Familiar"] = "Familiar";
  Wanderer["Holiday"] = "Holiday Monster";
  Wanderer["Kramco"] = "Kramco";
  Wanderer["Nemesis"] = "Nemesis Assassin";
  Wanderer["Portscan"] = "portscan.edu";
  Wanderer["Romantic"] = "Romantic Monster";
  Wanderer["Vote"] = "Vote Monster";
})(Wanderer || (Wanderer = {}));

var deterministicWanderers = [Wanderer.Digitize, Wanderer.Portscan];
/**
 * Return whether the player has the queried counter
 *
 * @category General
 */

function haveCounter(counterName) {
  var minTurns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var maxTurns = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
  return getCounters(counterName, minTurns, maxTurns) === counterName;
}
/**
 * Return whether the player has the queried wandering counter
 *
 * @category Wanderers
 */

function haveWandererCounter(wanderer) {
  if (deterministicWanderers.includes(wanderer)) {
    return haveCounter(wanderer);
  }

  var begin = wanderer + " window begin";
  var end = wanderer + " window end";
  return haveCounter(begin) || haveCounter(end);
}
/**
 * Returns whether the player will encounter a vote wanderer on the next turn,
 * providing an "I Voted!" sticker is equipped.
 *
 * @category Wanderers
 */

function isVoteWandererNow() {
  return totalTurnsPlayed() % 11 === 1 && get("lastVoteMonsterTurn") < totalTurnsPlayed();
}
/**
 * Tells us whether we can expect a given wanderer now. Behaves differently
 * for different types of wanderer.
 *
 * - For deterministic wanderers, return whether the player will encounter
 *   the queried wanderer on the next turn
 *
 * - For variable wanderers (window), return whether the player is within
 *   an encounter window for the queried wanderer
 *
 * - For variable wanderers (chance per turn), returns true unless the player
 *   has exhausted the number of wanderers possible
 *
 * @category Wanderers
 * @param wanderer Wanderer to check
 */

function isWandererNow(wanderer) {
  if (deterministicWanderers.includes(wanderer)) {
    return haveCounter(wanderer, 0, 0);
  }

  if (wanderer === Wanderer.Kramco) {
    return true;
  }

  if (wanderer === Wanderer.Vote) {
    return isVoteWandererNow();
  }

  if (wanderer === Wanderer.Familiar) {
    return get("_hipsterAdv") < 7;
  }

  var begin = wanderer + " window begin";
  var end = wanderer + " window end";
  return !haveCounter(begin, 1) && haveCounter(end);
}
/**
 * Returns the float chance the player will encounter a sausage goblin on the
 * next turn, providing the Kramco Sausage-o-Matic is equipped.
 *
 * @category Wanderers
 */

function getKramcoWandererChance() {
  var fights = get("_sausageFights");
  var lastFight = get("_lastSausageMonsterTurn");
  var totalTurns = totalTurnsPlayed();

  if (fights < 1) {
    return lastFight === totalTurns && myTurncount() < 1 ? 0.5 : 1.0;
  }

  var turnsSinceLastFight = totalTurns - lastFight;
  return Math.min(1.0, (turnsSinceLastFight + 1) / (5 + fights * 3 + Math.pow(Math.max(0, fights - 5), 3)));
}
/**
 * Returns the float chance the player will encounter an Artistic Goth Kid or
 * Mini-Hipster wanderer on the next turn, providing a familiar is equipped.
 *
 * NOTE: You must complete one combat with the Artistic Goth Kid before you
 * can encounter any wanderers. Consequently,ƒ the first combat with the
 * Artist Goth Kid is effectively 0% chance to encounter a wanderer.
 *
 * @category Wanderers
 */

function getFamiliarWandererChance() {
  var totalFights = get("_hipsterAdv");
  var probability = [0.5, 0.4, 0.3, 0.2];

  if (totalFights < 4) {
    return probability[totalFights];
  }

  return totalFights > 7 ? 0.0 : 0.1;
}
/**
 * Returns the float chance the player will encounter the queried wanderer
 * on the next turn.
 *
 * @category Wanderers
 * @param wanderer Wanderer to check
 */

function getWandererChance(wanderer) {
  if (deterministicWanderers.includes(wanderer)) {
    return haveCounter(wanderer, 0, 0) ? 1.0 : 0.0;
  }

  if (wanderer === Wanderer.Kramco) {
    getKramcoWandererChance();
  }

  if (wanderer === Wanderer.Vote) {
    return isVoteWandererNow() ? 1.0 : 0.0;
  }

  if (wanderer === Wanderer.Familiar) {
    getFamiliarWandererChance();
  }

  var begin = wanderer + " window begin";
  var end = wanderer + " window end";

  if (haveCounter(begin, 1, 100)) {
    return 0.0;
  }

  var counters = get("relayCounters");
  var re = new RegExp("(\\d+):" + end);
  var matches = counters.match(re);

  if (matches && matches.length === 2) {
    var window = Number.parseInt(matches[1]) - myTurncount();
    return 1.0 / window;
  }

  return 0.0;
}
/**
 * Returns true if the player's current familiar is equal to the one supplied
 *
 * @category General
 * @param familiar Familiar to check
 */

function isCurrentFamiliar(familiar) {
  return myFamiliar() === familiar;
}
/**
 * Returns the fold group (if any) of which the given item is a part
 *
 * @category General
 * @param item Item that is part of the required fold group
 */

function getFoldGroup(item) {
  return Object.entries(getRelated(item, "fold")).sort((_ref, _ref2) => {
    var _ref3 = lib_slicedToArray(_ref, 2),
        a = _ref3[1];

    var _ref4 = lib_slicedToArray(_ref2, 2),
        b = _ref4[1];

    return a - b;
  }).map(_ref5 => {
    var _ref6 = lib_slicedToArray(_ref5, 1),
        i = _ref6[0];

    return Item.get(i);
  });
}
/**
 * Returns the zap group (if any) of which the given item is a part
 *
 * @category General
 * @param item Item that is part of the required zap group
 */

function getZapGroup(item) {
  return Object.keys(getRelated(item, "zap")).map(i => Item.get(i));
}
/**
 * Get a map of banished monsters keyed by what banished them
 *
 * @category General
 */

function lib_getBanishedMonsters() {
  var banishes = chunk(get("banishedMonsters").split(":"), 3);
  var result = new Map();

  var _iterator = lib_createForOfIteratorHelper(banishes),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = lib_slicedToArray(_step.value, 2),
          foe = _step$value[0],
          banisher = _step$value[1];

      if (foe === undefined || banisher === undefined) break; // toItem doesn"t error if the item doesn"t exist, so we have to use that.

      var banisherItem = toItem(banisher);

      if (banisher.toLowerCase() === "saber force") {
        result.set($skill(lib_templateObject2 || (lib_templateObject2 = lib_taggedTemplateLiteral(["Use the Force"]))), Monster.get(foe));
      } else if (banisher.toLowerCase() === "nanorhino") {
        result.set($skill(lib_templateObject3 || (lib_templateObject3 = lib_taggedTemplateLiteral(["Unleash Nanites"]))), Monster.get(foe));
      } else if ([Item.none, Item.get("training scroll:  Snokebomb"), Item.get("tomayohawk-style reflex hammer"), null].includes(banisherItem)) {
        if (Skill.get(banisher) === $skill.none) {
          break;
        } else {
          result.set(Skill.get(banisher), Monster.get(foe));
        }
      } else {
        result.set(banisherItem, Monster.get(foe));
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return result;
}
/**
 * Returns true if the item is usable
 *
 * This function will be an ongoing work in progress
 *
 * @param item Item to check
 */

function canUse(item) {
  var path = myPath();

  if (path !== Path.get("Nuclear Autumn")) {
    if ($items(lib_templateObject4 || (lib_templateObject4 = lib_taggedTemplateLiteral(["Shrieking Weasel holo-record, Power-Guy 2000 holo-record, Lucky Strikes holo-record, EMD holo-record, Superdrifter holo-record, The Pigs holo-record, Drunk Uncles holo-record"]))).includes(item)) {
      return false;
    }
  }

  if (path === Path.get("G-Lover")) {
    if (!item.name.toLowerCase().includes("g")) return false;
  }

  if (path === Path.get("Bees Hate You")) {
    if (item.name.toLowerCase().includes("b")) return false;
  }

  return true;
}
/**
 * Turn KoLmafia `none`s to JavaScript `null`s
 *
 * @param thing Thing that can have a mafia "none" value
 */

function noneToNull(thing) {
  if (thing instanceof Effect) {
    return thing === Effect.none ? null : thing;
  }

  if (thing instanceof Familiar) {
    return thing === Familiar.none ? null : thing;
  }

  if (thing instanceof Item) {
    return thing === Item.none ? null : thing;
  }

  return thing;
}
/**
 * Return the average value from the sort of range that KoLmafia encodes as a string
 *
 * @param range KoLmafia-style range string
 */

function getAverage(range) {
  var _range$match;

  if (range.indexOf("-") < 0) return Number(range);

  var _ref7 = (_range$match = range.match(/(-?[0-9]+)-(-?[0-9]+)/)) !== null && _range$match !== void 0 ? _range$match : ["0", "0", "0"],
      _ref8 = lib_slicedToArray(_ref7, 3),
      lower = _ref8[1],
      upper = _ref8[2];

  return (Number(lower) + Number(upper)) / 2;
}
/**
 * Return average adventures expected from consuming an item
 *
 * If item is not a consumable, will just return "0".
 *
 * @param item Consumable item
 */

function getAverageAdventures(item) {
  return getAverage(item.adventures);
}
/**
 * Remove an effect
 *
 * @category General
 * @param effect Effect to remove
 */

function lib_uneffect(effect) {
  return cliExecute("uneffect ".concat(effect.name));
}
/**
 * Get both the name and id of a player from either their name or id
 *
 * @param idOrName Id or name of player
 * @returns Object containing id and name of player
 */

function getPlayerFromIdOrName(idOrName) {
  var id = typeof idOrName === "number" ? idOrName : parseInt(getPlayerId(idOrName));
  return {
    name: getPlayerName(id),
    id: id
  };
}
/**
 * Return the step as a number for a given quest property.
 *
 * @param questName Name of quest property to check.
 */

function questStep(questName) {
  var stringStep = get(questName);
  if (stringStep === "unstarted") return -1;else if (stringStep === "started") return 0;else if (stringStep === "finished" || stringStep === "") return 999;else {
    if (stringStep.substring(0, 4) !== "step") {
      throw new Error("Quest state parsing error.");
    }

    return parseInt(stringStep.substring(4), 10);
  }
}
var EnsureError = /*#__PURE__*/function (_Error) {
  lib_inherits(EnsureError, _Error);

  var _super = lib_createSuper(EnsureError);

  function EnsureError(cause, reason) {
    var _this;

    lib_classCallCheck(this, EnsureError);

    _this = _super.call(this, "Failed to ensure ".concat(cause.name, "!").concat(reason ? " ".concat(reason) : ""));
    _this.name = "Ensure Error";
    return _this;
  }

  return lib_createClass(EnsureError);
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Tries to get an effect using the default method
 * @param ef effect to try to get
 * @param turns turns to aim for; default of 1
 *
 * @throws {EnsureError} Throws an error if the effect cannot be guaranteed
 */

function lib_ensureEffect(ef) {
  var turns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if (haveEffect(ef) < turns) {
    if (ef.default === null) {
      throw new EnsureError(ef, "No default action");
    }

    if (!cliExecute(ef.default) || haveEffect(ef) === 0) {
      throw new EnsureError(ef);
    }
  }
}
var valueMap = new Map();
var MALL_VALUE_MODIFIER = 0.9;
/**
 * Returns the average value--based on mallprice and autosell--of a collection of items
 * @param items items whose value you care about
 */

function getSaleValue() {
  for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++) {
    items[_key] = arguments[_key];
  }

  return items.map(item => {
    if (valueMap.has(item)) return valueMap.get(item) || 0;

    if (item.discardable) {
      valueMap.set(item, (0,external_kolmafia_.mallPrice)(item) > Math.max(2 * (0,external_kolmafia_.autosellPrice)(item), 100) ? MALL_VALUE_MODIFIER * (0,external_kolmafia_.mallPrice)(item) : (0,external_kolmafia_.autosellPrice)(item));
    } else {
      valueMap.set(item, (0,external_kolmafia_.mallPrice)(item) > 100 ? MALL_VALUE_MODIFIER * (0,external_kolmafia_.mallPrice)(item) : 0);
    }

    return valueMap.get(item) || 0;
  }).reduce((s, price) => s + price, 0) / items.length;
}
var Environment = {
  Outdoor: "outdoor",
  Indoor: "indoor",
  Underground: "underground",
  Underwater: "underwater"
};
/**
 * Returns the weight-coefficient of any leprechaunning that this familiar may find itself doing
 * Assumes the familiar is nude and thus fails for hatrack & pantsrack
 * For the Mutant Cactus Bud, returns the efficacy-multiplier instead
 * @param familiar The familiar whose leprechaun multiplier you're interested in
 */

function findLeprechaunMultiplier(familiar) {
  if (familiar === $familiar(lib_templateObject5 || (lib_templateObject5 = lib_taggedTemplateLiteral(["Mutant Cactus Bud"])))) {
    return numericModifier(familiar, "Leprechaun Effectiveness", 1, $item.none);
  }

  if (familiar === $familiar(lib_templateObject6 || (lib_templateObject6 = lib_taggedTemplateLiteral(["Reanimated Reanimator"])))) return 0;
  var meatBonus = numericModifier(familiar, "Meat Drop", 1, $item.none);
  if (meatBonus === 0) return 0;
  return Math.pow(Math.sqrt(meatBonus / 2 + 55 / 4 + 3) - Math.sqrt(55) / 2, 2);
}
/**
 * Returns the weight-coefficient of any baby gravy fairying that this familiar may find itself doing
 * Assumes the familiar is nude and thus fails for hatrack & pantsrack
 * For the Mutant Fire Ant, returns the efficacy-multiplier instead
 * @param familiar The familiar whose fairy multiplier you're interested in
 */

function findFairyMultiplier(familiar) {
  if (familiar === $familiar(lib_templateObject7 || (lib_templateObject7 = lib_taggedTemplateLiteral(["Mutant Fire Ant"])))) {
    return numericModifier(familiar, "Fairy Effectiveness", 1, $item.none);
  }

  if (familiar === $familiar(lib_templateObject8 || (lib_templateObject8 = lib_taggedTemplateLiteral(["Reanimated Reanimator"])))) return 0;
  var itemBonus = numericModifier(familiar, "Item Drop", 1, $item.none);
  if (itemBonus === 0) return 0;
  return Math.pow(Math.sqrt(itemBonus + 55 / 4 + 3) - Math.sqrt(55) / 2, 2);
}
var holidayWanderers = new Map([["El Dia De Los Muertos Borrachos", $monsters(lib_templateObject9 || (lib_templateObject9 = lib_taggedTemplateLiteral(["Novia Cad\xE1ver, Novio Cad\xE1ver, Padre Cad\xE1ver, Persona Inocente Cad\xE1ver"])))], ["Feast of Boris", $monsters(lib_templateObject10 || (lib_templateObject10 = lib_taggedTemplateLiteral(["Candied Yam Golem, Malevolent Tofurkey, Possessed Can of Cranberry Sauce, Stuffing Golem"])))], ["Talk Like a Pirate Day", $monsters(lib_templateObject11 || (lib_templateObject11 = lib_taggedTemplateLiteral(["ambulatory pirate, migratory pirate, peripatetic pirate"])))]]);
function getTodaysHolidayWanderers() {
  return holiday().split("/").map(holiday => {
    var _holidayWanderers$get;

    return (_holidayWanderers$get = holidayWanderers.get(holiday)) !== null && _holidayWanderers$get !== void 0 ? _holidayWanderers$get : [];
  }).flat();
}
/**
 * Determines & returns whether or not we can safely call visitUrl(), based on whether we're in a fight, multi-fight, choice, etc
 */

function canVisitUrl() {
  return !(currentRound() || inMultiFight() || choiceFollowsFight() || handlingChoice());
}
/**
 * Calculate damage taken from a specific element after factoring in resistance
 * @param baseDamage
 * @param element
 * @returns damage after factoring in resistances
 */

function damageTakenByElement(baseDamage, element) {
  if (baseDamage < 0) return 1;
  var res = elementalResistance(element);
  return Math.max(1, Math.ceil(baseDamage - baseDamage * res / 100));
}
var telescopeStats = new Map([["standing around flexing their muscles and using grip exercisers", $stat(lib_templateObject12 || (lib_templateObject12 = lib_taggedTemplateLiteral(["Muscle"])))], ["sitting around playing chess and solving complicated-looking logic puzzles", $stat(lib_templateObject13 || (lib_templateObject13 = lib_taggedTemplateLiteral(["Mysticality"])))], ["all wearing sunglasses and dancing", $stat(lib_templateObject14 || (lib_templateObject14 = lib_taggedTemplateLiteral(["Moxie"])))]]);
var telescopeElements = new Map([["people, all of whom appear to be on fire", $element(lib_templateObject15 || (lib_templateObject15 = lib_taggedTemplateLiteral(["hot"])))], ["people, surrounded by a cloud of eldritch mist", $element(lib_templateObject16 || (lib_templateObject16 = lib_taggedTemplateLiteral(["spooky"])))], ["greasy-looking people furtively skulking around", $element(lib_templateObject17 || (lib_templateObject17 = lib_taggedTemplateLiteral(["sleaze"])))], ["people, surrounded by garbage and clouds of flies", $element(lib_templateObject18 || (lib_templateObject18 = lib_taggedTemplateLiteral(["stench"])))], ["people, clustered around a group of igloos", $element(lib_templateObject19 || (lib_templateObject19 = lib_taggedTemplateLiteral(["cold"])))]]);
var hedgeTrap1 = new Map([["smoldering bushes on the outskirts of a hedge maze", $element(lib_templateObject20 || (lib_templateObject20 = lib_taggedTemplateLiteral(["hot"])))], ["creepy-looking black bushes on the outskirts of a hedge maze", $element(lib_templateObject21 || (lib_templateObject21 = lib_taggedTemplateLiteral(["spooky"])))], ["purplish, greasy-looking hedges", $element(lib_templateObject22 || (lib_templateObject22 = lib_taggedTemplateLiteral(["sleaze"])))], ["nasty-looking, dripping green bushes on the outskirts of a hedge maze", $element(lib_templateObject23 || (lib_templateObject23 = lib_taggedTemplateLiteral(["stench"])))], ["frost-rimed bushes on the outskirts of a hedge maze", $element(lib_templateObject24 || (lib_templateObject24 = lib_taggedTemplateLiteral(["cold"])))]]);
var hedgeTrap2 = new Map([["smoke rising from deeper within the maze", $element(lib_templateObject25 || (lib_templateObject25 = lib_taggedTemplateLiteral(["hot"])))], ["a miasma of eldritch vapors rising from deeper within the maze", $element(lib_templateObject26 || (lib_templateObject26 = lib_taggedTemplateLiteral(["spooky"])))], ["a greasy purple cloud hanging over the center of the maze", $element(lib_templateObject27 || (lib_templateObject27 = lib_taggedTemplateLiteral(["sleaze"])))], ["a cloud of green gas hovering over the maze", $element(lib_templateObject28 || (lib_templateObject28 = lib_taggedTemplateLiteral(["stench"])))], ["wintry mists rising from deeper within the maze", $element(lib_templateObject29 || (lib_templateObject29 = lib_taggedTemplateLiteral(["cold"])))]]);
var hedgeTrap3 = new Map([["with lava slowly oozing out of it", $element(lib_templateObject30 || (lib_templateObject30 = lib_taggedTemplateLiteral(["hot"])))], ["surrounded by creepy black mist", $element(lib_templateObject31 || (lib_templateObject31 = lib_taggedTemplateLiteral(["spooky"])))], ["that occasionally vomits out a greasy ball of hair", $element(lib_templateObject32 || (lib_templateObject32 = lib_taggedTemplateLiteral(["sleaze"])))], ["disgorging a really surprising amount of sewage", $element(lib_templateObject33 || (lib_templateObject33 = lib_taggedTemplateLiteral(["stench"])))], ["occasionally disgorging a bunch of ice cubes", $element(lib_templateObject34 || (lib_templateObject34 = lib_taggedTemplateLiteral(["cold"])))]]);
/**
 * @returns An object with all information the telescope gives you about the sorceress's contests and maze
 */

function telescope() {
  return {
    statContest: telescopeStats.get(get("telescope1")),
    elementContest: telescopeElements.get(get("telescope2")),
    hedge1: hedgeTrap1.get(get("telescope3")),
    hedge2: hedgeTrap2.get(get("telescope4")),
    hedge3: hedgeTrap3.get(get("telescope5"))
  };
}
;// CONCATENATED MODULE: ./src/engine/profits.ts
var profits_templateObject, profits_templateObject2, profits_templateObject3, profits_templateObject4, profits_templateObject5, profits_templateObject6, profits_templateObject7, profits_templateObject8, profits_templateObject9, profits_templateObject10, profits_templateObject11, profits_templateObject12, profits_templateObject13, profits_templateObject14, profits_templateObject15, profits_templateObject16, profits_templateObject17, profits_templateObject18, profits_templateObject19, profits_templateObject20, profits_templateObject21, profits_templateObject22, profits_templateObject23, profits_templateObject24, profits_templateObject25, profits_templateObject26, profits_templateObject27, profits_templateObject28, profits_templateObject29, profits_templateObject30, profits_templateObject31, profits_templateObject32, profits_templateObject33, profits_templateObject34, profits_templateObject35, profits_templateObject36, profits_templateObject37, profits_templateObject38, profits_templateObject39, profits_templateObject40, profits_templateObject41, profits_templateObject42, _templateObject43, _templateObject44, _templateObject45;

function profits_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function profits_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function profits_createClass(Constructor, protoProps, staticProps) { if (protoProps) profits_defineProperties(Constructor.prototype, protoProps); if (staticProps) profits_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function profits_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function profits_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function profits_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = profits_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function profits_slicedToArray(arr, i) { return profits_arrayWithHoles(arr) || profits_iterableToArrayLimit(arr, i) || profits_unsupportedIterableToArray(arr, i) || profits_nonIterableRest(); }

function profits_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function profits_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function profits_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function profits_toConsumableArray(arr) { return profits_arrayWithoutHoles(arr) || profits_iterableToArray(arr) || profits_unsupportedIterableToArray(arr) || profits_nonIterableSpread(); }

function profits_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function profits_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return profits_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return profits_arrayLikeToArray(o, minLen); }

function profits_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function profits_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return profits_arrayLikeToArray(arr); }

function profits_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





function currency() {
  for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++) {
    items[_key] = arguments[_key];
  }

  var unitCost = items.map(i => {
    var coinmaster = external_kolmafia_.Coinmaster.all().find(c => (0,external_kolmafia_.sellPrice)(c, i) > 0);

    if (!coinmaster) {
      throw "Invalid coinmaster item ".concat(i);
    } else {
      return [i, (0,external_kolmafia_.sellPrice)(coinmaster, i)];
    }
  });
  return () => Math.max.apply(Math, profits_toConsumableArray(unitCost.map(_ref => {
    var _ref2 = profits_slicedToArray(_ref, 2),
        item = _ref2[0],
        cost = _ref2[1];

    return profits_garboValue(item) / cost;
  })));
}

function complexCandy() {
  var candies = external_kolmafia_.Item.all().filter(i => i.candyType === "complex");
  var candyLookup = [[], [], [], [], []];

  var _iterator = profits_createForOfIteratorHelper(candies),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var candy = _step.value;
      var id = (0,external_kolmafia_.toInt)(candy) % 5;

      if (candy.tradeable) {
        candyLookup[id].push(candy);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var candyIdPrices = candies.filter(i => !i.tradeable).map(i => [i, () => Math.min.apply(Math, profits_toConsumableArray(candyLookup[(0,external_kolmafia_.toInt)(i) % 5].map(i => profits_garboValue(i))))]);
  return candyIdPrices;
}

var specialValueLookup = new Map([[template_string_$item(profits_templateObject || (profits_templateObject = profits_taggedTemplateLiteral(["Freddy Kruegerand"]))), currency.apply(void 0, profits_toConsumableArray(template_string_$items(profits_templateObject2 || (profits_templateObject2 = profits_taggedTemplateLiteral(["bottle of Bloodweiser, electric Kool-Aid, Dreadsylvanian skeleton key"])))))], [template_string_$item(profits_templateObject3 || (profits_templateObject3 = profits_taggedTemplateLiteral(["Beach Buck"]))), currency(template_string_$item(profits_templateObject4 || (profits_templateObject4 = profits_taggedTemplateLiteral(["one-day ticket to Spring Break Beach"]))))], [template_string_$item(profits_templateObject5 || (profits_templateObject5 = profits_taggedTemplateLiteral(["Coinspiracy"]))), currency.apply(void 0, profits_toConsumableArray(template_string_$items(profits_templateObject6 || (profits_templateObject6 = profits_taggedTemplateLiteral(["Merc Core deployment orders, karma shawarma"])))))], [template_string_$item(profits_templateObject7 || (profits_templateObject7 = profits_taggedTemplateLiteral(["FunFunds\u2122"]))), currency(template_string_$item(profits_templateObject8 || (profits_templateObject8 = profits_taggedTemplateLiteral(["one-day ticket to Dinseylandfill"]))))], [template_string_$item(profits_templateObject9 || (profits_templateObject9 = profits_taggedTemplateLiteral(["Volcoino"]))), currency(template_string_$item(profits_templateObject10 || (profits_templateObject10 = profits_taggedTemplateLiteral(["one-day ticket to That 70s Volcano"]))))], [template_string_$item(profits_templateObject11 || (profits_templateObject11 = profits_taggedTemplateLiteral(["Wal-Mart gift certificate"]))), currency(template_string_$item(profits_templateObject12 || (profits_templateObject12 = profits_taggedTemplateLiteral(["one-day ticket to The Glaciest"]))))], [template_string_$item(profits_templateObject13 || (profits_templateObject13 = profits_taggedTemplateLiteral(["Rubee\u2122"]))), currency(template_string_$item(profits_templateObject14 || (profits_templateObject14 = profits_taggedTemplateLiteral(["FantasyRealm guest pass"]))))], [template_string_$item(profits_templateObject15 || (profits_templateObject15 = profits_taggedTemplateLiteral(["Guzzlrbuck"]))), currency(template_string_$item(profits_templateObject16 || (profits_templateObject16 = profits_taggedTemplateLiteral(["Never Don't Stop Not Striving"]))))]].concat(profits_toConsumableArray(complexCandy()), [[template_string_$item(profits_templateObject17 || (profits_templateObject17 = profits_taggedTemplateLiteral(["Merc Core deployment orders"]))), () => profits_garboValue(template_string_$item(profits_templateObject18 || (profits_templateObject18 = profits_taggedTemplateLiteral(["one-day ticket to Conspiracy Island"]))))], [template_string_$item(profits_templateObject19 || (profits_templateObject19 = profits_taggedTemplateLiteral(["free-range mushroom"]))), () => 3 * Math.max(profits_garboValue(template_string_$item(profits_templateObject20 || (profits_templateObject20 = profits_taggedTemplateLiteral(["mushroom tea"])))) - profits_garboValue(template_string_$item(profits_templateObject21 || (profits_templateObject21 = profits_taggedTemplateLiteral(["soda water"])))), profits_garboValue(template_string_$item(profits_templateObject22 || (profits_templateObject22 = profits_taggedTemplateLiteral(["mushroom whiskey"])))) - profits_garboValue(template_string_$item(profits_templateObject23 || (profits_templateObject23 = profits_taggedTemplateLiteral(["fermenting powder"])))), profits_garboValue(template_string_$item(profits_templateObject24 || (profits_templateObject24 = profits_taggedTemplateLiteral(["mushroom filet"])))))], [template_string_$item(profits_templateObject25 || (profits_templateObject25 = profits_taggedTemplateLiteral(["little firkin"]))), () => profits_garboAverageValue.apply(void 0, profits_toConsumableArray(template_string_$items(profits_templateObject26 || (profits_templateObject26 = profits_taggedTemplateLiteral(["martini, screwdriver, strawberry daiquiri, margarita, vodka martini, tequila sunrise, bottle of Amontillado, barrel-aged martini, barrel gun"])))))], [template_string_$item(profits_templateObject27 || (profits_templateObject27 = profits_taggedTemplateLiteral(["normal barrel"]))), () => profits_garboAverageValue.apply(void 0, profits_toConsumableArray(template_string_$items(profits_templateObject28 || (profits_templateObject28 = profits_taggedTemplateLiteral(["a little sump'm sump'm, pink pony, rockin' wagon, roll in the hay, slip 'n' slide, slap and tickle"])))))], [template_string_$item(profits_templateObject29 || (profits_templateObject29 = profits_taggedTemplateLiteral(["big tun"]))), () => profits_garboAverageValue.apply(void 0, profits_toConsumableArray(template_string_$items(profits_templateObject30 || (profits_templateObject30 = profits_taggedTemplateLiteral(["gibson, gin and tonic, mimosette, tequila sunset, vodka and tonic, zmobie"])))))], [template_string_$item(profits_templateObject31 || (profits_templateObject31 = profits_taggedTemplateLiteral(["weathered barrel"]))), () => profits_garboAverageValue.apply(void 0, profits_toConsumableArray(template_string_$items(profits_templateObject32 || (profits_templateObject32 = profits_taggedTemplateLiteral(["bean burrito, enchanted bean burrito, jumping bean burrito"])))))], [template_string_$item(profits_templateObject33 || (profits_templateObject33 = profits_taggedTemplateLiteral(["dusty barrel"]))), () => profits_garboAverageValue.apply(void 0, profits_toConsumableArray(template_string_$items(profits_templateObject34 || (profits_templateObject34 = profits_taggedTemplateLiteral(["spicy bean burrito, spicy enchanted bean burrito, spicy jumping bean burrito"])))))], [template_string_$item(profits_templateObject35 || (profits_templateObject35 = profits_taggedTemplateLiteral(["disintegrating barrel"]))), () => profits_garboAverageValue.apply(void 0, profits_toConsumableArray(template_string_$items(profits_templateObject36 || (profits_templateObject36 = profits_taggedTemplateLiteral(["insanely spicy bean burrito, insanely spicy enchanted bean burrito, insanely spicy jumping bean burrito"])))))], [template_string_$item(profits_templateObject37 || (profits_templateObject37 = profits_taggedTemplateLiteral(["moist barrel"]))), () => profits_garboAverageValue.apply(void 0, profits_toConsumableArray(template_string_$items(profits_templateObject38 || (profits_templateObject38 = profits_taggedTemplateLiteral(["cast, concentrated magicalness pill, enchanted barbell, giant moxie weed, Mountain Stream soda"])))))], [template_string_$item(profits_templateObject39 || (profits_templateObject39 = profits_taggedTemplateLiteral(["rotting barrel"]))), () => profits_garboAverageValue.apply(void 0, profits_toConsumableArray(template_string_$items(profits_templateObject40 || (profits_templateObject40 = profits_taggedTemplateLiteral(["Doc Galaktik's Ailment Ointment, extra-strength strongness elixir, jug-o-magicalness, Marquis de Poivre soda, suntan lotion of moxiousness"])))))], [template_string_$item(profits_templateObject41 || (profits_templateObject41 = profits_taggedTemplateLiteral(["mouldering barrel"]))), () => profits_garboAverageValue.apply(void 0, profits_toConsumableArray(template_string_$items(profits_templateObject42 || (profits_templateObject42 = profits_taggedTemplateLiteral(["creepy ginger ale, haunted battery, scroll of drastic healing, synthetic marrow, the funk"])))))], [template_string_$item(_templateObject43 || (_templateObject43 = profits_taggedTemplateLiteral(["barnacled barrel"]))), () => profits_garboAverageValue.apply(void 0, profits_toConsumableArray(template_string_$items(_templateObject44 || (_templateObject44 = profits_taggedTemplateLiteral(["Alewife\u2122 Ale, bazookafish bubble gum, beefy fish meat, eel battery, glistening fish meat, ink bladder, pufferfish spine, shark cartilage, slick fish meat, slug of rum, slug of shochu, slug of vodka, temporary teardrop tattoo"])))))], [template_string_$item(_templateObject45 || (_templateObject45 = profits_taggedTemplateLiteral(["fake hand"]))), () => 50000]]));

function getHistoricalSaleValue(item) {
  if ((0,external_kolmafia_.historicalAge)(item) <= 7.0 && (0,external_kolmafia_.historicalPrice)(item) > 0) {
    var isMallMin = (0,external_kolmafia_.historicalPrice)(item) === Math.max(100, 2 * (0,external_kolmafia_.autosellPrice)(item));
    return isMallMin ? (0,external_kolmafia_.autosellPrice)(item) : 0.9 * (0,external_kolmafia_.historicalPrice)(item);
  }

  return getSaleValue(item);
}

var garboValueCache = new Map();
function profits_garboValue(item) {
  var cachedValue = garboValueCache.get(item);

  if (cachedValue === undefined) {
    var specialValueCompute = specialValueLookup.get(item);
    var value = specialValueCompute ? specialValueCompute() : getHistoricalSaleValue(item);
    (0,external_kolmafia_.print)("Valuing ".concat(item.name, " @ ").concat(value));
    garboValueCache.set(item, value);
    return value;
  }

  return cachedValue;
}
function profits_garboAverageValue() {
  for (var _len2 = arguments.length, items = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    items[_key2] = arguments[_key2];
  }

  return sumNumbers(items.map(profits_garboValue)) / items.length;
}

var DailySetting = /*#__PURE__*/(/* unused pure expression or super */ null && (function () {
  function DailySetting(key) {
    profits_classCallCheck(this, DailySetting);

    profits_defineProperty(this, "key", void 0);

    this.key = key;
  }

  profits_createClass(DailySetting, [{
    key: "get",
    value: function get(def) {
      var saved = _get(this.key, "");

      if (saved === "") return def;
      var json = JSON.parse(saved);
      if ("day" in json && "value" in json && json["day"] === gamedayToInt()) return json["value"];else return def;
    }
  }, {
    key: "set",
    value: function set(value) {
      _set(this.key, JSON.stringify({
        day: gamedayToInt(),
        value: value
      }));
    }
  }]);

  return DailySetting;
}()));

var ProfitTracker = /*#__PURE__*/(/* unused pure expression or super */ null && (function () {
  function ProfitTracker(key) {
    profits_classCallCheck(this, ProfitTracker);

    profits_defineProperty(this, "setting", void 0);

    profits_defineProperty(this, "records", void 0);

    profits_defineProperty(this, "session", void 0);

    profits_defineProperty(this, "turns", void 0);

    profits_defineProperty(this, "hours", void 0);

    profits_defineProperty(this, "pulled", void 0);

    profits_defineProperty(this, "ascensions", void 0);

    this.setting = new DailySetting(key);
    this.records = this.setting.get({});
    this.session = Session.current();
    this.turns = myTurncount();
    this.hours = gametimeToInt() / (1000 * 60 * 60);
    this.ascensions = myAscensions();
    this.pulled = new Set(_get("_roninStoragePulls").split(",").map(id => parseInt(id)).filter(id => id > 0).map(id => Item.get(id)));
  }

  profits_createClass(ProfitTracker, [{
    key: "reset",
    value: function reset() {
      this.session = Session.current();
      this.turns = myTurncount();
      this.hours = gametimeToInt() / (1000 * 60 * 60);
      this.ascensions = myAscensions();
      this.pulled = new Set(_get("_roninStoragePulls").split(",").map(id => parseInt(id)).filter(id => id > 0).map(id => Item.get(id)));
    }
  }, {
    key: "record",
    value: function record(tag) {
      if (this.ascensions < myAscensions()) {
        // Session tracking is not accurate across ascensions
        this.reset();
        return;
      } // Pulled items are tracked oddly in the Session
      // (they are included in the Session diff by default)


      var newPulls = new Set(_get("_roninStoragePulls").split(",").map(id => parseInt(id)).filter(id => id > 0).map(id => Item.get(id)));

      var _iterator2 = profits_createForOfIteratorHelper(newPulls),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _this$session$items$g;

          var item = _step2.value;
          if (this.pulled.has(item)) continue;
          this.session.items.set(item, 1 + ((_this$session$items$g = this.session.items.get(item)) !== null && _this$session$items$g !== void 0 ? _this$session$items$g : 0));
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      var diff = Session.current().diff(this.session);
      if (!(tag in this.records)) this.records[tag] = {
        meat: 0,
        items: 0,
        turns: 0,
        hours: 0
      };
      var value = diff.value(profits_garboValue);
      this.records[tag].meat += value.meat;
      this.records[tag].items += value.items;
      this.records[tag].turns += myTurncount() - this.turns;
      this.records[tag].hours += gametimeToInt() / (1000 * 60 * 60) - this.hours;
      print("Profit: ".concat(value.meat, ", ").concat(value.items, ", ").concat(myTurncount() - this.turns, ", ").concat(gametimeToInt() / (1000 * 60 * 60) - this.hours));
      this.reset();
    }
  }, {
    key: "all",
    value: function all() {
      return this.records;
    }
  }, {
    key: "save",
    value: function save() {
      this.setting.set(this.records);
    }
  }]);

  return ProfitTracker;
}()));

function profits_sum(record, where) {
  var included = [];

  for (var _key3 in record) {
    if (where(_key3)) included.push(record[_key3]);
  }

  return {
    meat: included.reduce((v, p) => v + p.meat, 0),
    items: included.reduce((v, p) => v + p.items, 0),
    turns: included.reduce((v, p) => v + p.turns, 0),
    hours: included.reduce((v, p) => v + p.hours, 0)
  };
}

function numberWithCommas(x) {
  var str = x.toString();
  if (str.includes(".")) return x.toFixed(2);
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function printProfitSegment(key, record, color) {
  if (record === undefined) return;
  print("".concat(key, ": ").concat(numberWithCommas(record.meat), " meat + ").concat(numberWithCommas(record.items), " items (").concat(record.turns, " turns + ").concat(numberWithCommas(record.hours), " hours)"), color);
}

function printProfits(records) {
  print("");
  print("== Daily Loop Profit ==");
  printProfitSegment("Aftercore", profits_sum(records, key => key.startsWith("0")), "blue");
  printProfitSegment("* Garbo", records["0@Garbo"], "green");
  if (args.voatest) printProfitSegment("* VoA Test", records["0@VoA Test"], "green");
  printProfitSegment("* Other", records["0@Other"], "green");
  printProfitSegment("Grey You", profits_sum(records, key => key.startsWith("1")), "blue");
  printProfitSegment("* Run", records["1@Run"], "green");
  printProfitSegment("* GooFarming", records["1@GooFarming"], "green");
  printProfitSegment("* Garbo", records["1@Garbo"], "green");
  printProfitSegment("* Leveling", records["1@Leveling"], "green");
  printProfitSegment("* Other", records["1@Other"], "green");
  printProfitSegment("Total", profits_sum(records, () => true), "black");
}
;// CONCATENATED MODULE: ./src/tasks/utils.ts
var utils_templateObject, utils_templateObject2, utils_templateObject3, utils_templateObject4, utils_templateObject5, utils_templateObject6, utils_templateObject7, utils_templateObject8, utils_templateObject9, utils_templateObject10, utils_templateObject11, utils_templateObject12, utils_templateObject13, utils_templateObject14, utils_templateObject15, utils_templateObject16, utils_templateObject17, utils_templateObject18, utils_templateObject19, utils_templateObject20, utils_templateObject21, utils_templateObject22, utils_templateObject23, utils_templateObject24, utils_templateObject25, utils_templateObject26, utils_templateObject27, utils_templateObject28, utils_templateObject29, utils_templateObject30, utils_templateObject31, utils_templateObject32, utils_templateObject33, utils_templateObject34, utils_templateObject35, utils_templateObject36, utils_templateObject37, utils_templateObject38, utils_templateObject39, utils_templateObject40;

function tasks_utils_toConsumableArray(arr) { return tasks_utils_arrayWithoutHoles(arr) || tasks_utils_iterableToArray(arr) || tasks_utils_unsupportedIterableToArray(arr) || tasks_utils_nonIterableSpread(); }

function tasks_utils_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function tasks_utils_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return tasks_utils_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return tasks_utils_arrayLikeToArray(o, minLen); }

function tasks_utils_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function tasks_utils_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return tasks_utils_arrayLikeToArray(arr); }

function tasks_utils_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function utils_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





function haveAll(its) {
  return its.reduce((a, it) => a && have(it), true);
}
function haveAny(its) {
  return its.reduce((a, it) => a || have(it), false);
}
function toMoonSign(str) {
  if (typeof str === "string" && ["mongoose", "wallaby", "vole", "platypus", "opossum", "marmot", "wombat", "blender", "packrat", "gnomads", "knoll", "canadia"].includes(str)) return str;
  throw new Error("".concat(str, " is not a valid MoonSign"));
}
var minusMLItems = template_string_$items(utils_templateObject || (utils_templateObject = utils_taggedTemplateLiteral(["nasty rat mask, Drowsy Sword, HOA regulation book, pocketwatch on a chain, security flashlight, Space Trip safety headphones, pine cone necklace, red badge, mushroom badge, water wings for babies, white earbuds, discarded bowtie"])));
function noML() {
  return "-ml, ".concat(minusMLItems.filter(it => have(it)).map(it => "-equip ".concat(it.name)).join(", "));
}
function maxBase() {
  return "175 bonus June Cleaver, ".concat(garboValue($item(utils_templateObject2 || (utils_templateObject2 = utils_taggedTemplateLiteral(["FunFunds\u2122"])))) / 20 + 5, " bonus lucky gold ring, 250 bonus Mr. Cheeng's spectacles, ").concat(0.4 * get("valueOfAdventure"), " bonus mafia thumb ring, 10 bonus tiny stillsuit");
}

function famValue(fam, mob) {
  switch (fam) {
    case $familiar(utils_templateObject3 || (utils_templateObject3 = utils_taggedTemplateLiteral(["Grey Goose"]))):
      return myLevel() < args.targetlevel && $familiar(utils_templateObject4 || (utils_templateObject4 = utils_taggedTemplateLiteral(["Grey Goose"]))).experience < 400 ? 6000 : 0;

    case $familiar(utils_templateObject5 || (utils_templateObject5 = utils_taggedTemplateLiteral(["Red-Nosed Snapper"]))):
      if (mob && Snapper.getTrackedPhylum() && mob.phylum === Snapper.getTrackedPhylum()) return garboValue(Snapper.phylumItem.get(Snapper.getTrackedPhylum() || $phylum(utils_templateObject6 || (utils_templateObject6 = utils_taggedTemplateLiteral(["none"])))) || $item(utils_templateObject7 || (utils_templateObject7 = utils_taggedTemplateLiteral(["none"])))) / 11;
      return 0;

    case $familiar(utils_templateObject8 || (utils_templateObject8 = utils_taggedTemplateLiteral(["Cookbookbat"]))):
      return $items(utils_templateObject9 || (utils_templateObject9 = utils_taggedTemplateLiteral([""]))).find(it => it.name.indexOf("Recipe of Before Yore") >= 0 && have(it)) ? garboAverageValue.apply(void 0, tasks_utils_toConsumableArray($items(utils_templateObject10 || (utils_templateObject10 = utils_taggedTemplateLiteral(["Yeast of Boris, Vegetable of Jarlsberg, St. Sneaky Pete's Whey"]))))) * (3.0 / 11) : 5000;

    case $familiar(utils_templateObject11 || (utils_templateObject11 = utils_taggedTemplateLiteral(["Shorter-Order Cook"]))):
      return garboAverageValue.apply(void 0, tasks_utils_toConsumableArray($items(utils_templateObject12 || (utils_templateObject12 = utils_taggedTemplateLiteral(["short white, short beer, short glass of water, short stack of pancakes, short stick of butter"]))))) / 11;
  }

  return 0;
}

function meatFam() {
  return $familiars(utils_templateObject13 || (utils_templateObject13 = utils_taggedTemplateLiteral(["Space Jellyfish, Robortender, Hobo Monkey, Cat Burglar"]))).find(fam => have(fam)) || $familiar(utils_templateObject14 || (utils_templateObject14 = utils_taggedTemplateLiteral(["Leprechaun"])));
}
function bestFam(mob) {
  var fams = $familiars(utils_templateObject15 || (utils_templateObject15 = utils_taggedTemplateLiteral(["Grey Goose, Red-Nosed Snapper, Cookbookbat, Shorter-Order Cook"]))).filter(fam => have(fam)).sort((a, b) => famValue(b, mob) - famValue(a, mob));
  return fams.find(fam => have(fam));
}
function canDiet() {
  return myFullness() < fullnessLimit() || mySpleenUse() < spleenLimit() || myInebriety() < inebrietyLimit() || have($item(utils_templateObject16 || (utils_templateObject16 = utils_taggedTemplateLiteral(["distention pill"])))) && !get("_distentionPillUsed") || have($item(utils_templateObject17 || (utils_templateObject17 = utils_taggedTemplateLiteral(["synthetic dog hair pill"])))) && !get("_syntheticDogHairPillUsed") || have($item(utils_templateObject18 || (utils_templateObject18 = utils_taggedTemplateLiteral(["designer sweatpants"])))) && get("_sweatOutSomeBoozeUsed") < 3 && get("sweat") >= 25 || have($item(utils_templateObject19 || (utils_templateObject19 = utils_taggedTemplateLiteral(["mime army shotglass"])))) && !get("_mimeArmyShotglassUsed") || get("currentMojoFilters") < 3 && mallPrice($item(utils_templateObject20 || (utils_templateObject20 = utils_taggedTemplateLiteral(["mojo filter"])))) + mallPrice($item(utils_templateObject21 || (utils_templateObject21 = utils_taggedTemplateLiteral(["transdermal smoke patch"])))) < 2.5 * get("valueOfAdventure");
}
function stooperDrunk() {
  return myInebriety() > inebrietyLimit() || myInebriety() === inebrietyLimit() && myFamiliar() === $familiar(utils_templateObject22 || (utils_templateObject22 = utils_taggedTemplateLiteral(["Stooper"])));
}
function totallyDrunk() {
  return have($familiar(utils_templateObject23 || (utils_templateObject23 = utils_taggedTemplateLiteral(["Stooper"])))) && myFamiliar() !== $familiar(utils_templateObject24 || (utils_templateObject24 = utils_taggedTemplateLiteral(["Stooper"]))) ? myInebriety() > inebrietyLimit() + 1 : myInebriety() > inebrietyLimit();
}
function doneAdventuring() {
  return !canDiet() && myAdventures() === 0 || stooperDrunk();
}
function backstageItemsDone() {
  return (have($item(utils_templateObject25 || (utils_templateObject25 = utils_taggedTemplateLiteral(["giant marshmallow"])))) ? 1 : 0) + (have($item(utils_templateObject26 || (utils_templateObject26 = utils_taggedTemplateLiteral(["beer-scented teddy bear"])))) ? 1 : 0) + itemAmount($item(utils_templateObject27 || (utils_templateObject27 = utils_taggedTemplateLiteral(["gin-soaked blotter paper"])))) >= 2 && (have($item(utils_templateObject28 || (utils_templateObject28 = utils_taggedTemplateLiteral(["booze-soaked cherry"])))) ? 1 : 0) + (have($item(utils_templateObject29 || (utils_templateObject29 = utils_taggedTemplateLiteral(["comfy pillow"])))) ? 1 : 0) + itemAmount($item(utils_templateObject30 || (utils_templateObject30 = utils_taggedTemplateLiteral(["sponge cake"])))) >= 2;
}
var gardens = template_string_$items(utils_templateObject31 || (utils_templateObject31 = utils_taggedTemplateLiteral(["packet of pumpkin seeds, Peppermint Pip Packet, packet of dragon's teeth, packet of beer seeds, packet of winter seeds, packet of thanksgarden seeds, packet of tall grass seeds, packet of mushroom spores"])));
function getGarden() {
  return gardens.find(it => it.name in getCampground()) || $item(utils_templateObject32 || (utils_templateObject32 = utils_taggedTemplateLiteral(["none"])));
}
var banishes;
function nextUnusedBanishItem() {
  if (!banishes) banishes = $items(utils_templateObject33 || (utils_templateObject33 = utils_taggedTemplateLiteral(["human musk, tennis ball, Louder Than Bomb, divine champagne popper"]))).sort((a, b) => mallPrice(a) - mallPrice(b)); //sorted from cheapest to most expensive

  return banishes.find(it => !getBanishedMonsters().get(it)) || $item(utils_templateObject34 || (utils_templateObject34 = utils_taggedTemplateLiteral(["none"]))); //return the cheapest free banish not currently in use
}
function chewOrWish(it, ef) {
  if (mallPrice(it) + mallPrice($item(utils_templateObject35 || (utils_templateObject35 = utils_taggedTemplateLiteral(["mojo filter"])))) < mallPrice($item(utils_templateObject36 || (utils_templateObject36 = utils_taggedTemplateLiteral(["pocket wish"]))))) {
    if (mySpleenUse() === spleenLimit()) use(1, $item(utils_templateObject37 || (utils_templateObject37 = utils_taggedTemplateLiteral(["mojo filter"]))));
    chew(it);
  } else {
    retrieveItem($item(utils_templateObject38 || (utils_templateObject38 = utils_taggedTemplateLiteral(["pocket wish"]))));
    cliExecute("genie effect ".concat(ef.name));
  }
}
function expectCMC() {
  return getWorkshed() !== $item(utils_templateObject39 || (utils_templateObject39 = utils_taggedTemplateLiteral(["cold medicine cabinet"]))) && have($item(utils_templateObject40 || (utils_templateObject40 = utils_taggedTemplateLiteral(["cold medicine cabinet"])))) && !get("_workshedItemUsed");
}
function isGoodGarboScript(scr) {
  // Returns true if scr includes "garbo", and doesn't include a semicolon
  return scr.includes("garbo") && !scr.includes(";");
}
;// CONCATENATED MODULE: ./src/args.ts
var args_templateObject, args_templateObject2, args_templateObject3, args_templateObject4, args_templateObject5, args_templateObject6;

function args_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }






var args_args = Args.create("goorbo", "Written by frazazel (ign: SketchySolid #422389). This is a full-day script for half-glooping. It aims to be a single-press script that will take you through your Aftercore and Grey You legs, collecting fat loot tokens, getting a Steel Liver, and leveling up to level 13 before running garbo. It chooses a class for you to learn guild skills, and to perm learned skills upon ascension.", {
  version: Args.flag({
    help: "Output script version number and exit.",
    default: false,
    setting: ""
  }),
  actions: Args.number({
    help: "Maximum number of actions to perform, if given. Can be used to execute just a few steps at a time."
  }),
  abort: Args.string({
    help: "If given, abort during the prepare() step for the task with matching name."
  }),
  sim: Args.flag({
    help: "If set, see the recommended items and skills, then return without taking any actions.",
    default: false,
    setting: ""
  }),
  simperms: Args.flag({
    help: "If set, see your current and available perms, as well as the plan for this run, then return without taking any actions.",
    default: false,
    setting: ""
  }),
  permtier: Args.number({
    help: "Target perming all skills in the given tier and all better tiers. Choose 0 to only perm non-gnome, non-guild skills that you may have manually learned",
    options: [[-1, "Do not perm anything"]].concat(perm_permTiers.map((str, num) => [num, str.length < 40 ? str.substring(9) : "".concat(str.substring(9, 37), "...")])),
    // options: [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8].map((num) => [num]),
    default: 6
  }),
  pvp: Args.flag({
    help: "If true, break hippy stone and do pvp.",
    default: false
  }),
  astralpet: Args.custom({
    help: "Choose the astral pet you want to buy in valhalla",
    options: template_string_$items(args_templateObject || (args_templateObject = args_taggedTemplateLiteral(["astral bludgeon, astral shield, astral chapeau, astral bracer, astral longbow, astral shorts, astral mace, astral trousers, astral ring, astral statuette, astral pistol, astral mask, astral pet sweater, astral shirt, astral belt, none"]))).map(it => [it]),
    default: template_string_$item(args_templateObject2 || (args_templateObject2 = args_taggedTemplateLiteral(["astral pet sweater"])))
  }, external_kolmafia_.Item.get, "ITEM"),
  moonsign: Args.custom({
    help: "Choose the moonsign you want to ascend into",
    options: ["mongoose", "wallaby", "vole", "platypus", "opossum", "marmot", "wombat", "blender", "packrat"].map(str => [toMoonSign(str)]),
    default: toMoonSign("vole")
  }, toMoonSign, "MOONSIGN"),
  defaultclass: Args.custom({
    help: "Choose your default class, if goorbo doesn't have any other goals this run",
    options: $classes(args_templateObject3 || (args_templateObject3 = args_taggedTemplateLiteral(["Seal Clubber, Turtle Tamer, Pastamancer, Sauceror, Disco Bandit, Accordion Thief"]))).map(cl => [cl]),
    default: template_string_$class(args_templateObject4 || (args_templateObject4 = args_taggedTemplateLiteral(["Seal Clubber"])))
  }, external_kolmafia_.toClass, "CLASS"),
  class: Args.custom({
    help: "Choose the class to choose at prism break. If set, will override any class that might be desired for skill-perming purposes",
    options: $classes(args_templateObject5 || (args_templateObject5 = args_taggedTemplateLiteral(["none, Seal Clubber, Turtle Tamer, Pastamancer, Sauceror, Disco Bandit, Accordion Thief"]))).map(cl => [cl]),
    default: template_string_$class(args_templateObject6 || (args_templateObject6 = args_taggedTemplateLiteral(["none"])))
  }, external_kolmafia_.toClass, "CLASS"),
  clan: Args.string({
    help: "Your VIP Clan. Goorbo will whitelist into it at the beginning of your day. Requires clan whitelist."
  }),
  targetlevel: Args.number({
    help: "What level to target via adventuring in Uncle Gator's after breaking the prism",
    default: 13
  }),
  gyouscript: Args.string({
    help: "The command that will do your Grey You run for you. Include any arguments desired.",
    default: "loopgyou delaytower tune=wombat chargegoose=20"
  }),
  garbo: Args.string({
    help: "The command that will be used to diet and use all your adventures after reaching level 13 in Day 1 aftercore.",
    default: "garbo"
  }),
  garboascend: Args.string({
    help: "The command that will be used to diet and use all your adventures in Day 2 aftercore. If it is detected to be a garbo script call, it will function with voatest and CMC will be installed in last 100 turns. If it is not, then voatest will be ignored, and CMC will be installed prior to running this script.",
    default: "garbo ascend"
  }),
  voatest: Args.boolean({
    help: "If set, will run your d2 garbo turns just like normal, but will separately track the last 100 turns, to give you an estimate of what your real-world valueOfAdventure is. Divide your total \"VoA Test\" profit by 100 for your VoA estimate. Note that it might show > 100 adventures spent, if garbo equipped the mafia thumb ring, June cleaver, or other adventure gaining equipment. This flag may be ignored if a custom setting of garboascend is used",
    default: true
  }),
  tip: Args.flag({
    help: "Send all your soap knives to the author. Thanks!",
    default: false
  })
});
;// CONCATENATED MODULE: ./src/relay.ts
function relay_slicedToArray(arr, i) { return relay_arrayWithHoles(arr) || relay_iterableToArrayLimit(arr, i) || relay_unsupportedIterableToArray(arr, i) || relay_nonIterableRest(); }

function relay_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function relay_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return relay_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return relay_arrayLikeToArray(o, minLen); }

function relay_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function relay_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function relay_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






function convertArgsToHtml() {
  var _metadata$options$def;

  var metadata = Args.getMetadata(args_args);
  var pages = [{
    page: (_metadata$options$def = metadata.options.defaultGroupName) !== null && _metadata$options$def !== void 0 ? _metadata$options$def : "Options",
    components: []
  }];
  metadata.traverse((key, name) => {
    var _key$key, _key$setting, _key$key2;

    if (key.setting === "" || key.hidden) return;
    var component = {
      type: "string",
      name: (_key$key = key.key) !== null && _key$key !== void 0 ? _key$key : name,
      description: key.help || "No Description Provided",
      preference: (_key$setting = key.setting) !== null && _key$setting !== void 0 ? _key$setting : "".concat(metadata.scriptName, "_").concat((_key$key2 = key.key) !== null && _key$key2 !== void 0 ? _key$key2 : name),
      default: "default" in key ? "".concat(key["default"]) : undefined
    };

    if (key.valueHelpName === "FLAG" || key.valueHelpName === "BOOLEAN") {
      component.type = "boolean";
    } else if (key.options !== undefined) {
      component.type = "dropdown";
      component.dropdown = key.options.map(_ref => {
        var _ref2 = relay_slicedToArray(_ref, 2),
            k = _ref2[0],
            desc = _ref2[1];

        return {
          display: desc !== null && desc !== void 0 ? desc : k,
          value: k
        };
      });
    }

    pages[pages.length - 1].components.push(component);
  }, (group, name) => {
    pages.push({
      page: name,
      components: []
    });
  });
  pages.filter(p => p.components.length > 0).forEach(p => {
    var html = {
      type: "html",
      data: "<h1 style=\"text-align: center;\">Goorbo ".concat(p.page, "</h1><div class=\"meat\"> <div> <img src=\"https://i.imgur.com/Otj39Jg.png\" height=\"75px\" width=\"75px\"></img></div><div><img src=\"https://i.imgur.com/Otj39Jg.png\" height=\"75px\" width=\"75px\"></img></div><div> <img src=\"https://i.imgur.com/Otj39Jg.png\" height=\"75px\" width=\"75px\" ></img></div><div><img src=\"https://i.imgur.com/Otj39Jg.png\" height=\"75px\" width=\"75px\"></img></div><div> <img src=\"https://i.imgur.com/Otj39Jg.png\" height=\"75px\" width=\"75px\"></img></div><div> <img src=\"https://i.imgur.com/Otj39Jg.png\" height=\"75px\" width=\"75px\"></div><div><img src=\"https://i.imgur.com/Otj39Jg.png\" height=\"75px\" width=\"75px\"></div>")
    };
    var meat = {
      type: "html",
      data: "<div class=\"meat\">".concat("<div style=\"background-image: https://i.imgur.com/Otj39Jg.png\" height=\"75px\" width=\"75px\"/>".repeat(7), "</div>")
    };
    p.components.splice(0, 0, html);
    p.components.push(meat);
  });
  return pages.filter(page => page.components.length > 0);
}

function main() {
  if ((0,dist.handleApiRequest)()) return;
  (0,external_kolmafia_.write)((0,dist.generateHTML)(convertArgsToHtml(), {
    css: ".meat,.meat div{position:absolute}.meat{width:100%;height:100%;top:0;left:0;overflow:hidden;opacity: 10%;z-index: 10;pointer-events: none}.meat div{display:block}.meat div:first-child{left:20%;animation:15s linear -2s infinite fall}.meat div:nth-child(2){left:70%;animation:15s linear -4s infinite fall}.meat div:nth-child(3){left:10%;animation:20s linear -7s infinite fall}.meat div:nth-child(4){left:50%;animation:18s linear -5s infinite fall}.meat div:nth-child(5){left:85%;animation:14s linear -5s infinite fall}.meat div:nth-child(6){left:15%;animation:16s linear -10s infinite fall}.meat div:nth-child(7){left:90%;animation:15s linear -4s infinite fall}@keyframes fall{0%{opacity:1;top:-10%;transform:translateX (20px) rotate(0)}20%{opacity:.8;transform:translateX (-20px) rotate(45deg)}40%{transform:translateX (-20px) rotate(90deg)}60%{transform:translateX (-20px) rotate(135deg)}80%{transform:translateX (-20px) rotate(180deg)}100%{top:110%;transform:translateX (-20px) rotate(225deg)}}"
  }));
}
})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;