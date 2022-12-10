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

/***/ 9628:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(7263);

var $values = (__webpack_require__(9953).values); // `Object.values` method
// https://tc39.es/ecma262/#sec-object.values


$({
  target: 'Object',
  stat: true
}, {
  values: function values(O) {
    return $values(O);
  }
});

/***/ }),

/***/ 7981:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(2529);

module.exports = parent;

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

;// CONCATENATED MODULE: external "kolmafia"
const external_kolmafia_namespaceObject = require("kolmafia");
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
  var value = (0,external_kolmafia_namespaceObject.getProperty)(property);

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
var getBounty = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Bounty, external_kolmafia_namespaceObject.toBounty);
var getClass = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Class, external_kolmafia_namespaceObject.toClass);
var getCoinmaster = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Coinmaster, external_kolmafia_namespaceObject.toCoinmaster);
var getEffect = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Effect, external_kolmafia_namespaceObject.toEffect);
var getElement = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Element, external_kolmafia_namespaceObject.toElement);
var getFamiliar = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Familiar, external_kolmafia_namespaceObject.toFamiliar);
var getItem = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Item, external_kolmafia_namespaceObject.toItem);
var getLocation = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Location, external_kolmafia_namespaceObject.toLocation);
var getMonster = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Monster, external_kolmafia_namespaceObject.toMonster);
var getPhylum = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Phylum, external_kolmafia_namespaceObject.toPhylum);
var getServant = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Servant, external_kolmafia_namespaceObject.toServant);
var getSkill = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Skill, external_kolmafia_namespaceObject.toSkill);
var getSlot = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Slot, external_kolmafia_namespaceObject.toSlot);
var getStat = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Stat, external_kolmafia_namespaceObject.toStat);
var getThrall = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Thrall, external_kolmafia_namespaceObject.toThrall);
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


  if (_default instanceof external_kolmafia_namespaceObject.Location) {
    return getLocation(property, _default);
  } else if (_default instanceof external_kolmafia_namespaceObject.Monster) {
    return getMonster(property, _default);
  } else if (_default instanceof external_kolmafia_namespaceObject.Familiar) {
    return getFamiliar(property, _default);
  } else if (_default instanceof external_kolmafia_namespaceObject.Stat) {
    return getStat(property, _default);
  } else if (_default instanceof external_kolmafia_namespaceObject.Phylum) {
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

function _set(property, value) {
  var stringValue = value === null ? "" : value.toString();
  (0,external_kolmafia_namespaceObject.setProperty)(property, stringValue);
}


function setProperties(properties) {
  for (var _i = 0, _Object$entries = Object.entries(properties); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        prop = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    _set(prop, value);
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
var PropertiesManager = /*#__PURE__*/function () {
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

        _set(propertyName, propertyValue);
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
          _set(property, value);
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
}();
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
        var match = external_kolmafia_namespaceObject.Class.get(value); // Class.get does fuzzy matching:
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
      return this.custom(spec, external_kolmafia_namespaceObject.Effect.get, "EFFECT");
    }
  }, {
    key: "effects",
    value: function effects(spec) {
      return this.arrayFromArg(spec, this.effect);
    }
  }, {
    key: "familiar",
    value: function familiar(spec) {
      return this.custom(spec, external_kolmafia_namespaceObject.Familiar.get, "FAMILIAR");
    }
  }, {
    key: "familiars",
    value: function familiars(spec) {
      return this.arrayFromArg(spec, this.familiar);
    }
  }, {
    key: "item",
    value: function item(spec) {
      return this.custom(spec, external_kolmafia_namespaceObject.Item.get, "ITEM");
    }
  }, {
    key: "items",
    value: function items(spec) {
      return this.arrayFromArg(spec, this.item);
    }
  }, {
    key: "location",
    value: function location(spec) {
      return this.custom(spec, external_kolmafia_namespaceObject.Location.get, "LOCATION");
    }
  }, {
    key: "locations",
    value: function locations(spec) {
      return this.arrayFromArg(spec, this.location);
    }
  }, {
    key: "monster",
    value: function monster(spec) {
      return this.custom(spec, external_kolmafia_namespaceObject.Monster.get, "MONSTER");
    }
  }, {
    key: "monsters",
    value: function monsters(spec) {
      return this.arrayFromArg(spec, this.monster);
    }
  }, {
    key: "path",
    value: function path(spec) {
      return this.custom(spec, external_kolmafia_namespaceObject.Path.get, "PATH");
    }
  }, {
    key: "paths",
    value: function paths(spec) {
      return this.arrayFromArg(spec, this.path);
    }
  }, {
    key: "skill",
    value: function skill(spec) {
      return this.custom(spec, external_kolmafia_namespaceObject.Skill.get, "SKILL");
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
      (0,external_kolmafia_namespaceObject.printHtml)("".concat(metadata.scriptHelp));
      (0,external_kolmafia_namespaceObject.printHtml)("");
      (0,external_kolmafia_namespaceObject.printHtml)("<b>".concat((_a = metadata.options.defaultGroupName) !== null && _a !== void 0 ? _a : "Options", ":</b>"));
      metadata.traverse((arg, key) => {
        var _a, _b, _c, _d, _e;

        if (arg.hidden) return;
        var nameText = "<font color='blue'>".concat((_a = arg.key) !== null && _a !== void 0 ? _a : key, "</font>");
        var valueText = arg.valueHelpName === "FLAG" ? "" : "<font color='purple'>".concat(arg.valueHelpName, "</font>");
        var helpText = (_b = arg.help) !== null && _b !== void 0 ? _b : "";
        var defaultText = "default" in arg ? "<font color='#888888'>[default: ".concat(arg.default, "]</font>") : "";
        var settingText = arg.setting === "" ? "" : "<font color='#888888'>[setting: ".concat((_c = arg.setting) !== null && _c !== void 0 ? _c : "".concat(metadata.scriptName, "_").concat((_d = arg.key) !== null && _d !== void 0 ? _d : key), "]</font>");
        (0,external_kolmafia_namespaceObject.printHtml)("&nbsp;&nbsp;".concat([nameText, valueText, "-", helpText, defaultText, settingText].join(" ")));
        var valueOptions = (_e = arg.options) !== null && _e !== void 0 ? _e : [];

        if (valueOptions.length < (maxOptionsToDisplay !== null && maxOptionsToDisplay !== void 0 ? maxOptionsToDisplay : Number.MAX_VALUE)) {
          var _iterator3 = _createForOfIteratorHelper(valueOptions),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var option = _step3.value;

              if (option.length === 1) {
                (0,external_kolmafia_namespaceObject.printHtml)("&nbsp;&nbsp;&nbsp;&nbsp;<font color='blue'>".concat(nameText, "</font> ").concat(option[0]));
              } else {
                (0,external_kolmafia_namespaceObject.printHtml)("&nbsp;&nbsp;&nbsp;&nbsp;<font color='blue'>".concat(nameText, "</font> ").concat(option[0], " - ").concat(option[1]));
              }
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        }
      }, group => {
        (0,external_kolmafia_namespaceObject.printHtml)("");
        (0,external_kolmafia_namespaceObject.printHtml)("<b>".concat(group.name, ":</b>"));
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
// EXTERNAL MODULE: ./node_modules/core-js/features/array/flat.js
var flat = __webpack_require__(1755);
;// CONCATENATED MODULE: ./node_modules/libram/dist/utils.js
function utils_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = utils_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function utils_slicedToArray(arr, i) { return utils_arrayWithHoles(arr) || utils_iterableToArrayLimit(arr, i) || utils_unsupportedIterableToArray(arr, i) || utils_nonIterableRest(); }

function utils_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function utils_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function utils_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || utils_unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function utils_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return utils_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return utils_arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return utils_arrayLikeToArray(arr); }

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

function utils_clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}
/**
 * Split an {@param array} into {@param chunkSize} sized chunks
 *
 * @param array Array to split
 * @param chunkSize Size of chunk
 */

function chunk(array, chunkSize) {
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

  return (_ref = []).concat.apply(_ref, _toConsumableArray(_toConsumableArray(map).map(_ref2 => {
    var _ref3 = utils_slicedToArray(_ref2, 2),
        item = _ref3[0],
        quantity = _ref3[1];

    return Array(quantity).fill(item);
  })));
}
function countedMapToString(map) {
  return _toConsumableArray(map).map(_ref4 => {
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

function utils_arrayContains(item, array) {
  return array.includes(item);
}
/**
 * Checks if two arrays contain the same elements in the same quantity.
 * @param a First array for comparison
 * @param b Second array for comparison
 * @returns Whether the two arrays are equal, irrespective of order.
 */

function setEqual(a, b) {
  var sortedA = _toConsumableArray(a).sort();

  var sortedB = _toConsumableArray(b).sort();

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


var $bounty = createSingleConstant(external_kolmafia_namespaceObject.Bounty);
/**
 * A list of Bounties specified by a comma-separated list of names.
 * For a list of all possible Bounties, leave the template string blank.
 *
 * @category In-game constant
 */

var $bounties = createPluralConstant(external_kolmafia_namespaceObject.Bounty);
/**
 * A Class specified by name.
 *
 * @category In-game constant
 */

var $class = createSingleConstant(external_kolmafia_namespaceObject.Class);
/**
 * A list of Classes specified by a comma-separated list of names.
 * For a list of all possible Classes, leave the template string blank.
 *
 * @category In-game constant
 */

var $classes = createPluralConstant(external_kolmafia_namespaceObject.Class);
/**
 * A Coinmaster specified by name.
 *
 * @category In-game constant
 */

var $coinmaster = createSingleConstant(external_kolmafia_namespaceObject.Coinmaster);
/**
 * A list of Coinmasters specified by a comma-separated list of names.
 * For a list of all possible Coinmasters, leave the template string blank.
 *
 * @category In-game constant
 */

var $coinmasters = createPluralConstant(external_kolmafia_namespaceObject.Coinmaster);
/**
 * An Effect specified by name.
 *
 * @category In-game constant
 */

var $effect = createSingleConstant(external_kolmafia_namespaceObject.Effect);
/**
 * A list of Effects specified by a comma-separated list of names.
 * For a list of all possible Effects, leave the template string blank.
 *
 * @category In-game constant
 */

var $effects = createPluralConstant(external_kolmafia_namespaceObject.Effect);
/**
 * An Element specified by name.
 *
 * @category In-game constant
 */

var $element = createSingleConstant(external_kolmafia_namespaceObject.Element);
/**
 * A list of Elements specified by a comma-separated list of names.
 * For a list of all possible Elements, leave the template string blank.
 *
 * @category In-game constant
 */

var $elements = createPluralConstant(external_kolmafia_namespaceObject.Element);
/**
 * A Familiar specified by name.
 *
 * @category In-game constant
 */

var template_string_$familiar = createSingleConstant(external_kolmafia_namespaceObject.Familiar);
/**
 * A list of Familiars specified by a comma-separated list of names.
 * For a list of all possible Familiars, leave the template string blank.
 *
 * @category In-game constant
 */

var $familiars = createPluralConstant(external_kolmafia_namespaceObject.Familiar);
/**
 * An Item specified by name.
 *
 * @category In-game constant
 */

var template_string_$item = createSingleConstant(external_kolmafia_namespaceObject.Item);
/**
 * A list of Items specified by a comma-separated list of names.
 * For a list of all possible Items, leave the template string blank.
 *
 * @category In-game constant
 */

var template_string_$items = createPluralConstant(external_kolmafia_namespaceObject.Item);
/**
 * A Location specified by name.
 *
 * @category In-game constant
 */

var $location = createSingleConstant(external_kolmafia_namespaceObject.Location);
/**
 * A list of Locations specified by a comma-separated list of names.
 * For a list of all possible Locations, leave the template string blank.
 *
 * @category In-game constant
 */

var $locations = createPluralConstant(external_kolmafia_namespaceObject.Location);
/**
 * A Monster specified by name.
 *
 * @category In-game constant
 */

var $monster = createSingleConstant(external_kolmafia_namespaceObject.Monster);
/**
 * A list of Monsters specified by a comma-separated list of names.
 * For a list of all possible Monsters, leave the template string blank.
 *
 * @category In-game constant
 */

var $monsters = createPluralConstant(external_kolmafia_namespaceObject.Monster);
/**
 * A Phylum specified by name.
 *
 * @category In-game constant
 */

var $phylum = createSingleConstant(external_kolmafia_namespaceObject.Phylum);
/**
 * A list of Phyla specified by a comma-separated list of names.
 * For a list of all possible Phyla, leave the template string blank.
 *
 * @category In-game constant
 */

var $phyla = createPluralConstant(external_kolmafia_namespaceObject.Phylum);
/**
 * A Servant specified by name.
 *
 * @category In-game constant
 */

var $servant = createSingleConstant(external_kolmafia_namespaceObject.Servant);
/**
 * A list of Servants specified by a comma-separated list of names.
 * For a list of all possible Servants, leave the template string blank.
 *
 * @category In-game constant
 */

var $servants = createPluralConstant(external_kolmafia_namespaceObject.Servant);
/**
 * A Skill specified by name.
 *
 * @category In-game constant
 */

var $skill = createSingleConstant(external_kolmafia_namespaceObject.Skill);
/**
 * A list of Skills specified by a comma-separated list of names.
 * For a list of all possible Skills, leave the template string blank.
 *
 * @category In-game constant
 */

var $skills = createPluralConstant(external_kolmafia_namespaceObject.Skill);
/**
 * A Slot specified by name.
 *
 * @category In-game constant
 */

var $slot = createSingleConstant(external_kolmafia_namespaceObject.Slot);
/**
 * A list of Slots specified by a comma-separated list of names.
 * For a list of all possible Slots, leave the template string blank.
 *
 * @category In-game constant
 */

var $slots = createPluralConstant(external_kolmafia_namespaceObject.Slot);
/**
 * A Stat specified by name.
 *
 * @category In-game constant
 */

var $stat = createSingleConstant(external_kolmafia_namespaceObject.Stat);
/**
 * A list of Stats specified by a comma-separated list of names.
 * For a list of all possible Stats, leave the template string blank.
 *
 * @category In-game constant
 */

var $stats = createPluralConstant(external_kolmafia_namespaceObject.Stat);
/**
 * A Thrall specified by name.
 *
 * @category In-game constant
 */

var $thrall = createSingleConstant(external_kolmafia_namespaceObject.Thrall);
/**
 * A list of Thralls specified by a comma-separated list of names.
 * For a list of all possible Thralls, leave the template string blank.
 *
 * @category In-game constant
 */

var $thralls = createPluralConstant(external_kolmafia_namespaceObject.Thrall);
/**
 * A Path specified by name.
 *
 * @category In-game constant
 */

var $path = createSingleConstant(external_kolmafia_namespaceObject.Path);
/**
 * A list of Paths specified by a comma-separated list of names.
 * For a list of all possible Paths, leave the template string blank.
 *
 * @category In-game constant
 */

var $paths = createPluralConstant(external_kolmafia_namespaceObject.Path);
;// CONCATENATED MODULE: ./node_modules/libram/dist/lib.js
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28, _templateObject29, _templateObject30, _templateObject31, _templateObject32, _templateObject33, _templateObject34;

function lib_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function lib_createClass(Constructor, protoProps, staticProps) { if (protoProps) lib_defineProperties(Constructor.prototype, protoProps); if (staticProps) lib_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function lib_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function lib_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = lib_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function lib_slicedToArray(arr, i) { return lib_arrayWithHoles(arr) || lib_iterableToArrayLimit(arr, i) || lib_unsupportedIterableToArray(arr, i) || lib_nonIterableRest(); }

function lib_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function lib_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return lib_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return lib_arrayLikeToArray(o, minLen); }

function lib_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function lib_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function lib_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

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

function isSong(skillOrEffect) {
  if (skillOrEffect instanceof external_kolmafia_namespaceObject.Effect && skillOrEffect.attributes.includes("song")) {
    return true;
  } else {
    var skill = skillOrEffect instanceof external_kolmafia_namespaceObject.Effect ? (0,external_kolmafia_namespaceObject.toSkill)(skillOrEffect) : skillOrEffect;
    return skill.class === $class(_templateObject || (_templateObject = _taggedTemplateLiteral(["Accordion Thief"]))) && skill.buff;
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
  return getActiveEffects().filter(isSong);
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

  if (thing instanceof external_kolmafia_namespaceObject.Effect) {
    return (0,external_kolmafia_namespaceObject.haveEffect)(thing) >= quantity;
  }

  if (thing instanceof external_kolmafia_namespaceObject.Familiar) {
    return (0,external_kolmafia_namespaceObject.haveFamiliar)(thing);
  }

  if (thing instanceof external_kolmafia_namespaceObject.Item) {
    return (0,external_kolmafia_namespaceObject.availableAmount)(thing) >= quantity;
  }

  if (thing instanceof external_kolmafia_namespaceObject.Servant) {
    return (0,external_kolmafia_namespaceObject.haveServant)(thing);
  }

  if (thing instanceof external_kolmafia_namespaceObject.Skill) {
    return (0,external_kolmafia_namespaceObject.haveSkill)(thing);
  }

  if (thing instanceof external_kolmafia_namespaceObject.Thrall) {
    var thrall = (0,external_kolmafia_namespaceObject.myThrall)();
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
  return Object.entries((0,external_kolmafia_namespaceObject.getRelated)(item, "fold")).sort((_ref, _ref2) => {
    var _ref3 = lib_slicedToArray(_ref, 2),
        a = _ref3[1];

    var _ref4 = lib_slicedToArray(_ref2, 2),
        b = _ref4[1];

    return a - b;
  }).map(_ref5 => {
    var _ref6 = lib_slicedToArray(_ref5, 1),
        i = _ref6[0];

    return external_kolmafia_namespaceObject.Item.get(i);
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

function getBanishedMonsters() {
  var banishes = chunk(property_get("banishedMonsters").split(":"), 3);
  var result = new Map();

  var _iterator = lib_createForOfIteratorHelper(banishes),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = lib_slicedToArray(_step.value, 2),
          foe = _step$value[0],
          banisher = _step$value[1];

      if (foe === undefined || banisher === undefined) break; // toItem doesn"t error if the item doesn"t exist, so we have to use that.

      var banisherItem = (0,external_kolmafia_namespaceObject.toItem)(banisher);

      if (banisher.toLowerCase() === "saber force") {
        result.set($skill(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["Use the Force"]))), external_kolmafia_namespaceObject.Monster.get(foe));
      } else if (banisher.toLowerCase() === "nanorhino") {
        result.set($skill(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["Unleash Nanites"]))), external_kolmafia_namespaceObject.Monster.get(foe));
      } else if ([external_kolmafia_namespaceObject.Item.none, external_kolmafia_namespaceObject.Item.get("training scroll:  Snokebomb"), external_kolmafia_namespaceObject.Item.get("tomayohawk-style reflex hammer"), null].includes(banisherItem)) {
        if (external_kolmafia_namespaceObject.Skill.get(banisher) === $skill.none) {
          break;
        } else {
          result.set(external_kolmafia_namespaceObject.Skill.get(banisher), external_kolmafia_namespaceObject.Monster.get(foe));
        }
      } else {
        result.set(banisherItem, external_kolmafia_namespaceObject.Monster.get(foe));
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
    if ($items(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["Shrieking Weasel holo-record, Power-Guy 2000 holo-record, Lucky Strikes holo-record, EMD holo-record, Superdrifter holo-record, The Pigs holo-record, Drunk Uncles holo-record"]))).includes(item)) {
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

function uneffect(effect) {
  return (0,external_kolmafia_namespaceObject.cliExecute)("uneffect ".concat(effect.name));
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
  _inherits(EnsureError, _Error);

  var _super = _createSuper(EnsureError);

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

function ensureEffect(ef) {
  var turns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if ((0,external_kolmafia_namespaceObject.haveEffect)(ef) < turns) {
    if (ef.default === null) {
      throw new EnsureError(ef, "No default action");
    }

    if (!(0,external_kolmafia_namespaceObject.cliExecute)(ef.default) || (0,external_kolmafia_namespaceObject.haveEffect)(ef) === 0) {
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
      valueMap.set(item, (0,external_kolmafia_namespaceObject.mallPrice)(item) > Math.max(2 * (0,external_kolmafia_namespaceObject.autosellPrice)(item), 100) ? MALL_VALUE_MODIFIER * (0,external_kolmafia_namespaceObject.mallPrice)(item) : (0,external_kolmafia_namespaceObject.autosellPrice)(item));
    } else {
      valueMap.set(item, (0,external_kolmafia_namespaceObject.mallPrice)(item) > 100 ? MALL_VALUE_MODIFIER * (0,external_kolmafia_namespaceObject.mallPrice)(item) : 0);
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
  if (familiar === $familiar(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["Mutant Cactus Bud"])))) {
    return numericModifier(familiar, "Leprechaun Effectiveness", 1, $item.none);
  }

  if (familiar === $familiar(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["Reanimated Reanimator"])))) return 0;
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
  if (familiar === $familiar(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["Mutant Fire Ant"])))) {
    return numericModifier(familiar, "Fairy Effectiveness", 1, $item.none);
  }

  if (familiar === $familiar(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["Reanimated Reanimator"])))) return 0;
  var itemBonus = numericModifier(familiar, "Item Drop", 1, $item.none);
  if (itemBonus === 0) return 0;
  return Math.pow(Math.sqrt(itemBonus + 55 / 4 + 3) - Math.sqrt(55) / 2, 2);
}
var holidayWanderers = new Map([["El Dia De Los Muertos Borrachos", $monsters(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["Novia Cad\xE1ver, Novio Cad\xE1ver, Padre Cad\xE1ver, Persona Inocente Cad\xE1ver"])))], ["Feast of Boris", $monsters(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["Candied Yam Golem, Malevolent Tofurkey, Possessed Can of Cranberry Sauce, Stuffing Golem"])))], ["Talk Like a Pirate Day", $monsters(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["ambulatory pirate, migratory pirate, peripatetic pirate"])))]]);
function getTodaysHolidayWanderers() {
  return (0,external_kolmafia_namespaceObject.holiday)().split("/").map(holiday => {
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
var telescopeStats = new Map([["standing around flexing their muscles and using grip exercisers", $stat(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["Muscle"])))], ["sitting around playing chess and solving complicated-looking logic puzzles", $stat(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["Mysticality"])))], ["all wearing sunglasses and dancing", $stat(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["Moxie"])))]]);
var telescopeElements = new Map([["people, all of whom appear to be on fire", $element(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["hot"])))], ["people, surrounded by a cloud of eldritch mist", $element(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["spooky"])))], ["greasy-looking people furtively skulking around", $element(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["sleaze"])))], ["people, surrounded by garbage and clouds of flies", $element(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["stench"])))], ["people, clustered around a group of igloos", $element(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["cold"])))]]);
var hedgeTrap1 = new Map([["smoldering bushes on the outskirts of a hedge maze", $element(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["hot"])))], ["creepy-looking black bushes on the outskirts of a hedge maze", $element(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["spooky"])))], ["purplish, greasy-looking hedges", $element(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["sleaze"])))], ["nasty-looking, dripping green bushes on the outskirts of a hedge maze", $element(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["stench"])))], ["frost-rimed bushes on the outskirts of a hedge maze", $element(_templateObject24 || (_templateObject24 = _taggedTemplateLiteral(["cold"])))]]);
var hedgeTrap2 = new Map([["smoke rising from deeper within the maze", $element(_templateObject25 || (_templateObject25 = _taggedTemplateLiteral(["hot"])))], ["a miasma of eldritch vapors rising from deeper within the maze", $element(_templateObject26 || (_templateObject26 = _taggedTemplateLiteral(["spooky"])))], ["a greasy purple cloud hanging over the center of the maze", $element(_templateObject27 || (_templateObject27 = _taggedTemplateLiteral(["sleaze"])))], ["a cloud of green gas hovering over the maze", $element(_templateObject28 || (_templateObject28 = _taggedTemplateLiteral(["stench"])))], ["wintry mists rising from deeper within the maze", $element(_templateObject29 || (_templateObject29 = _taggedTemplateLiteral(["cold"])))]]);
var hedgeTrap3 = new Map([["with lava slowly oozing out of it", $element(_templateObject30 || (_templateObject30 = _taggedTemplateLiteral(["hot"])))], ["surrounded by creepy black mist", $element(_templateObject31 || (_templateObject31 = _taggedTemplateLiteral(["spooky"])))], ["that occasionally vomits out a greasy ball of hair", $element(_templateObject32 || (_templateObject32 = _taggedTemplateLiteral(["sleaze"])))], ["disgorging a really surprising amount of sewage", $element(_templateObject33 || (_templateObject33 = _taggedTemplateLiteral(["stench"])))], ["occasionally disgorging a bunch of ice cubes", $element(_templateObject34 || (_templateObject34 = _taggedTemplateLiteral(["cold"])))]]);
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
;// CONCATENATED MODULE: ./node_modules/libram/dist/combat.js
var combat_templateObject, combat_templateObject2;

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = combat_getPrototypeOf(object); if (object === null) break; } return object; }

function combat_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = combat_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function combat_toConsumableArray(arr) { return combat_arrayWithoutHoles(arr) || combat_iterableToArray(arr) || combat_unsupportedIterableToArray(arr) || combat_nonIterableSpread(); }

function combat_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function combat_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return combat_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return combat_arrayLikeToArray(o, minLen); }

function combat_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function combat_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return combat_arrayLikeToArray(arr); }

function combat_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function combat_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function combat_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function combat_createClass(Constructor, protoProps, staticProps) { if (protoProps) combat_defineProperties(Constructor.prototype, protoProps); if (staticProps) combat_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function combat_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function combat_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) combat_setPrototypeOf(subClass, superClass); }

function combat_createSuper(Derived) { var hasNativeReflectConstruct = combat_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = combat_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = combat_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return combat_possibleConstructorReturn(this, result); }; }

function combat_possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return combat_assertThisInitialized(self); }

function combat_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function combat_wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; combat_wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !combat_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return combat_construct(Class, arguments, combat_getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return combat_setPrototypeOf(Wrapper, Class); }; return combat_wrapNativeSuper(Class); }

function combat_construct(Parent, args, Class) { if (combat_isNativeReflectConstruct()) { combat_construct = Reflect.construct.bind(); } else { combat_construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) combat_setPrototypeOf(instance, Class.prototype); return instance; }; } return combat_construct.apply(null, arguments); }

function combat_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function combat_isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function combat_setPrototypeOf(o, p) { combat_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return combat_setPrototypeOf(o, p); }

function combat_getPrototypeOf(o) { combat_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return combat_getPrototypeOf(o); }

function combat_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var MACRO_NAME = "Script Autoattack Macro";
/**
 * Get the KoL native ID of the macro with name name.
 *
 * @category Combat
 * @returns {number} The macro ID.
 */

function getMacroId() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : MACRO_NAME;
  var macroMatches = (0,external_kolmafia_namespaceObject.xpath)((0,external_kolmafia_namespaceObject.visitUrl)("account_combatmacros.php"), "//select[@name=\"macroid\"]/option[text()=\"".concat(name, "\"]/@value"));

  if (macroMatches.length === 0) {
    (0,external_kolmafia_namespaceObject.visitUrl)("account_combatmacros.php?action=new");
    var newMacroText = (0,external_kolmafia_namespaceObject.visitUrl)("account_combatmacros.php?macroid=0&name=".concat(name, "&macrotext=abort&action=save"));
    return parseInt((0,external_kolmafia_namespaceObject.xpath)(newMacroText, "//input[@name=".concat(name, "]/@value"))[0], 10);
  } else {
    return parseInt(macroMatches[0], 10);
  }
}

function itemOrNameToItem(itemOrName) {
  return typeof itemOrName === "string" ? external_kolmafia_namespaceObject.Item.get(itemOrName) : itemOrName;
}

var substringCombatItems = template_string_$items(combat_templateObject || (combat_templateObject = combat_taggedTemplateLiteral(["spider web, really sticky spider web, dictionary, NG, Cloaca-Cola, yo-yo, top, ball, kite, yo, red potion, blue potion, adder, red button, pile of sand, mushroom, deluxe mushroom"])));
var substringCombatSkills = $skills(combat_templateObject2 || (combat_templateObject2 = combat_taggedTemplateLiteral(["Shoot, Thrust-Smack, Headbutt, Toss, Sing, Disarm, LIGHT, BURN, Extract, Meteor Shower, Cleave, Boil, Slice, Rainbow"])));

function itemOrItemsBallsMacroName(itemOrItems) {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.map(itemOrItemsBallsMacroName).join(", ");
  } else {
    var item = itemOrNameToItem(itemOrItems);
    return !substringCombatItems.includes(item) ? item.name : (0,external_kolmafia_namespaceObject.toInt)(item).toString();
  }
}

function itemOrItemsBallsMacroPredicate(itemOrItems) {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.map(itemOrItemsBallsMacroPredicate).join(" && ");
  } else {
    return "hascombatitem ".concat(itemOrItems);
  }
}

function skillOrNameToSkill(skillOrName) {
  if (typeof skillOrName === "string") {
    return external_kolmafia_namespaceObject.Skill.get(skillOrName);
  } else {
    return skillOrName;
  }
}

function skillBallsMacroName(skillOrName) {
  var skill = skillOrNameToSkill(skillOrName);
  return skill.name.match(/^[A-Za-z ]+$/) && !substringCombatSkills.includes(skill) ? skill.name : (0,external_kolmafia_namespaceObject.toInt)(skill);
}

var InvalidMacroError = /*#__PURE__*/function (_Error) {
  combat_inherits(InvalidMacroError, _Error);

  var _super = combat_createSuper(InvalidMacroError);

  function InvalidMacroError() {
    combat_classCallCheck(this, InvalidMacroError);

    return _super.apply(this, arguments);
  }

  return combat_createClass(InvalidMacroError);
}( /*#__PURE__*/combat_wrapNativeSuper(Error));
/**
 * BALLS macro builder for direct submission to KoL.
 * Create a new macro with `new Macro()` and add steps using the instance methods.
 * Uses a fluent interface, so each step returns the object for easy chaining of steps.
 * Each method is also defined as a static method that creates a new Macro with only that step.
 * For example, you can do `Macro.skill('Saucestorm').attack()`.
 */

var Macro = /*#__PURE__*/function () {
  function Macro() {
    combat_classCallCheck(this, Macro);

    combat_defineProperty(this, "components", []);

    combat_defineProperty(this, "name", MACRO_NAME);
  }

  combat_createClass(Macro, [{
    key: "toString",
    value:
    /**
     * Convert macro to string.
     */
    function toString() {
      return (this.components.join(";") + ";").replace(/;;+/g, ";");
    }
    /**
     * Gives your macro a new name to be used when saving an autoattack.
     * @param name The name to be used when saving as an autoattack.
     * @returns The previous name assigned to this macro.
     */

  }, {
    key: "rename",
    value: function rename(name) {
      var returnValue = this.name;
      this.name = name;
      return returnValue;
    }
    /**
     * Save a macro to a Mafia property for use in a consult script.
     */

  }, {
    key: "save",
    value: function save() {
      _set(Macro.SAVED_MACRO_PROPERTY, this.toString());
    }
    /**
     * Load a saved macro from the Mafia property.
     */

  }, {
    key: "step",
    value:
    /**
     * Statefully add one or several steps to a macro.
     * @param nextSteps The steps to add to the macro.
     * @returns {Macro} This object itself.
     */
    function step() {
      var _ref, _this$components;

      for (var _len = arguments.length, nextSteps = new Array(_len), _key = 0; _key < _len; _key++) {
        nextSteps[_key] = arguments[_key];
      }

      var nextStepsStrings = (_ref = []).concat.apply(_ref, combat_toConsumableArray(nextSteps.map(x => x instanceof Macro ? x.components : [x])));

      (_this$components = this.components).push.apply(_this$components, combat_toConsumableArray(nextStepsStrings.filter(s => s.length > 0)));

      return this;
    }
    /**
     * Statefully add one or several steps to a macro.
     * @param nextSteps The steps to add to the macro.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "submit",
    value:
    /**
     * Submit the built macro to KoL. Only works inside combat.
     */
    function submit() {
      var final = this.toString();
      return (0,external_kolmafia_namespaceObject.visitUrl)("fight.php?action=macro&macrotext=".concat((0,external_kolmafia_namespaceObject.urlEncode)(final)), true, true);
    }
    /**
     * Set this macro as a KoL native autoattack.
     */

  }, {
    key: "setAutoAttack",
    value: function setAutoAttack() {
      var id = Macro.cachedMacroIds.get(this.name);

      if (id === undefined) {
        id = getMacroId(this.name);
        Macro.cachedMacroIds.set(this.name, id);
      }

      if ((0,external_kolmafia_namespaceObject.getAutoAttack)() === 99000000 + id && this.toString() === Macro.cachedAutoAttacks.get(this.name)) {
        // This macro is already set. Don"t make the server request.
        return;
      }

      (0,external_kolmafia_namespaceObject.visitUrl)("account_combatmacros.php?macroid=".concat(id, "&name=").concat((0,external_kolmafia_namespaceObject.urlEncode)(this.name), "&macrotext=").concat((0,external_kolmafia_namespaceObject.urlEncode)(this.toString()), "&action=save"), true, true);
      (0,external_kolmafia_namespaceObject.visitUrl)("account.php?am=1&action=autoattack&value=".concat(99000000 + id, "&ajax=1"));
      Macro.cachedAutoAttacks.set(this.name, this.toString());
    }
    /**
     * Renames the macro, then sets it as an autoattack.
     * @param name The name to save the macro under as an autoattack.
     */

  }, {
    key: "setAutoAttackAs",
    value: function setAutoAttackAs(name) {
      this.name = name;
      this.setAutoAttack();
    }
    /**
     * Clear all cached autoattacks, and delete all stored macros server-side.
     */

  }, {
    key: "abort",
    value:
    /**
     * Add an "abort" step to this macro.
     * @returns {Macro} This object itself.
     */
    function abort() {
      return this.step("abort");
    }
    /**
     * Create a new macro with an "abort" step.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "runaway",
    value:
    /**
     * Add a "runaway" step to this macro.
     * @returns {Macro} This object itself.
     */
    function runaway() {
      return this.step("runaway");
    }
    /**
     * Create a new macro with an "runaway" step.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "if_",
    value:
    /**
     * Add an "if" statement to this macro.
     * @param condition The BALLS condition for the if statement.
     * @param ifTrue Continuation if the condition is true.
     * @returns {Macro} This object itself.
     */
    function if_(condition, ifTrue) {
      return this.step("if ".concat(Macro.makeBALLSPredicate(condition))).step(ifTrue).step("endif");
    }
    /**
     * Create a new macro with an "if" statement.
     * @param condition The BALLS condition for the if statement.
     * @param ifTrue Continuation if the condition is true.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "ifNot",
    value:
    /**
     * Add an "if" statement to this macro, inverting the condition.
     * @param condition The BALLS condition for the if statement.
     * @param ifTrue Continuation if the condition is true.
     * @returns {Macro} This object itself.
     */
    function ifNot(condition, ifTrue) {
      return this.step("if !(".concat(Macro.makeBALLSPredicate(condition), ")")).step(ifTrue).step("endif");
    }
    /**
     * Create a new macro with an "if" statement, inverting the condition.
     * @param condition The BALLS condition for the if statement.
     * @param ifTrue Continuation if the condition is true.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "while_",
    value:
    /**
     * Add a "while" statement to this macro.
     * @param condition The BALLS condition for the if statement.
     * @param contents Loop to repeat while the condition is true.
     * @returns {Macro} This object itself.
     */
    function while_(condition, contents) {
      return this.step("while ".concat(condition)).step(contents).step("endwhile");
    }
    /**
     * Create a new macro with a "while" statement.
     * @param condition The BALLS condition for the if statement.
     * @param contents Loop to repeat while the condition is true.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "externalIf",
    value:
    /**
     * Conditionally add a step to a macro based on a condition evaluated at the time of building the macro.
     * @param condition The JS condition.
     * @param ifTrue Continuation to add if the condition is true.
     * @param ifFalse Optional input to turn this into an if...else statement.
     * @returns {Macro} This object itself.
     */
    function externalIf(condition, ifTrue, ifFalse) {
      if (condition) return this.step(ifTrue);else if (ifFalse) return this.step(ifFalse);else return this;
    }
    /**
     * Create a new macro with a condition evaluated at the time of building the macro.
     * @param condition The JS condition.
     * @param ifTrue Continuation to add if the condition is true.
     * @param ifFalse Optional input to turn this into an if...else statement.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "repeat",
    value:
    /**
     * Add a repeat step to the macro.
     * @returns {Macro} This object itself.
     */
    function repeat() {
      return this.step("repeat");
    }
    /**
     * Add one or more skill cast steps to the macro.
     * @param skills Skills to cast.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "skill",
    value: function skill() {
      for (var _len2 = arguments.length, skills = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        skills[_key2] = arguments[_key2];
      }

      return this.step.apply(this, combat_toConsumableArray(skills.map(skill => {
        return "skill ".concat(skillBallsMacroName(skill));
      })));
    }
    /**
     * Create a new macro with one or more skill cast steps.
     * @param skills Skills to cast.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "trySkill",
    value:
    /**
     * Add one or more skill cast steps to the macro, where each step checks if you have the skill first.
     * @param skills Skills to try casting.
     * @returns {Macro} This object itself.
     */
    function trySkill() {
      for (var _len3 = arguments.length, skills = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        skills[_key3] = arguments[_key3];
      }

      return this.step.apply(this, combat_toConsumableArray(skills.map(skill => {
        return Macro.if_("hasskill ".concat(skillBallsMacroName(skill)), Macro.skill(skill));
      })));
    }
    /**
     * Create a new macro with one or more skill cast steps, where each step checks if you have the skill first.
     * @param skills Skills to try casting.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "trySkillRepeat",
    value:
    /**
     * Add one or more skill-cast-and-repeat steps to the macro, where each step checks if you have the skill first.
     * @param skills Skills to try repeatedly casting.
     * @returns {Macro} This object itself.
     */
    function trySkillRepeat() {
      for (var _len4 = arguments.length, skills = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        skills[_key4] = arguments[_key4];
      }

      return this.step.apply(this, combat_toConsumableArray(skills.map(skill => {
        return Macro.if_("hasskill ".concat(skillBallsMacroName(skill)), Macro.skill(skill).repeat());
      })));
    }
    /**
     * Create a new macro with one or more skill-cast-and-repeat steps, where each step checks if you have the skill first.
     * @param skills Skills to try repeatedly casting.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "item",
    value:
    /**
     * Add one or more item steps to the macro.
     * @param items Items to use. Pass a tuple [item1, item2] to funksling.
     * @returns {Macro} This object itself.
     */
    function item() {
      for (var _len5 = arguments.length, items = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        items[_key5] = arguments[_key5];
      }

      return this.step.apply(this, combat_toConsumableArray(items.map(itemOrItems => {
        return "use ".concat(itemOrItemsBallsMacroName(itemOrItems));
      })));
    }
    /**
     * Create a new macro with one or more item steps.
     * @param items Items to use. Pass a tuple [item1, item2] to funksling.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "tryItem",
    value:
    /**
     * Add one or more item steps to the macro, where each step checks to see if you have the item first.
     * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
     * @returns {Macro} This object itself.
     */
    function tryItem() {
      for (var _len6 = arguments.length, items = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        items[_key6] = arguments[_key6];
      }

      return this.step.apply(this, combat_toConsumableArray(items.map(item => {
        return Macro.if_(itemOrItemsBallsMacroPredicate(item), "use ".concat(itemOrItemsBallsMacroName(item)));
      })));
    }
    /**
     * Create a new macro with one or more item steps, where each step checks to see if you have the item first.
     * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "attack",
    value:
    /**
     * Add an attack step to the macro.
     * @returns {Macro} This object itself.
     */
    function attack() {
      return this.step("attack");
    }
    /**
     * Create a new macro with an attack step.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "ifHolidayWanderer",
    value:
    /**
     * Create an if_ statement based on what holiday of loathing it currently is. On non-holidays, returns the original macro, unmutated.
     * @param macro The macro to place in the if_ statement
     */
    function ifHolidayWanderer(macro) {
      var todaysWanderers = getTodaysHolidayWanderers();
      if (todaysWanderers.length === 0) return this;
      return this.if_(todaysWanderers.map(monster => "monsterid ".concat(monster.id)).join(" || "), macro);
    }
    /**
     * Create a new macro starting with an ifHolidayWanderer step.
     * @param macro The macro to place inside the if_ statement
     */

  }, {
    key: "ifNotHolidayWanderer",
    value:
    /**
     * Create an if_ statement based on what holiday of loathing it currently is. On non-holidays, returns the original macro, with the input macro appended.
     * @param macro The macro to place in the if_ statement.
     */
    function ifNotHolidayWanderer(macro) {
      var todaysWanderers = getTodaysHolidayWanderers();
      if (todaysWanderers.length === 0) return this.step(macro);
      return this.if_(todaysWanderers.map(monster => "!monsterid ".concat(monster.id)).join(" && "), macro);
    }
    /**
     * Create a new macro starting with an ifNotHolidayWanderer step.
     * @param macro The macro to place inside the if_ statement
     */

  }], [{
    key: "load",
    value: function load() {
      var _this;

      return (_this = new this()).step.apply(_this, combat_toConsumableArray(property_get(Macro.SAVED_MACRO_PROPERTY).split(";")));
    }
    /**
     * Clear the saved macro in the Mafia property.
     */

  }, {
    key: "clearSaved",
    value: function clearSaved() {
      (0,external_kolmafia_namespaceObject.removeProperty)(Macro.SAVED_MACRO_PROPERTY);
    }
  }, {
    key: "step",
    value: function step() {
      var _this2;

      return (_this2 = new this()).step.apply(_this2, arguments);
    }
  }, {
    key: "clearAutoAttackMacros",
    value: function clearAutoAttackMacros() {
      var _iterator = combat_createForOfIteratorHelper(Macro.cachedAutoAttacks.keys()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _Macro$cachedMacroIds;

          var name = _step.value;
          var id = (_Macro$cachedMacroIds = Macro.cachedMacroIds.get(name)) !== null && _Macro$cachedMacroIds !== void 0 ? _Macro$cachedMacroIds : getMacroId(name);
          (0,external_kolmafia_namespaceObject.visitUrl)("account_combatmacros.php?macroid=".concat(id, "&action=edit&what=Delete&confirm=1"));
          Macro.cachedAutoAttacks.delete(name);
          Macro.cachedMacroIds.delete(name);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "abort",
    value: function abort() {
      return new this().abort();
    }
  }, {
    key: "runaway",
    value: function runaway() {
      return new this().runaway();
    }
  }, {
    key: "makeBALLSPredicate",
    value: function makeBALLSPredicate(condition) {
      var ballsCondition = "";

      if (condition instanceof external_kolmafia_namespaceObject.Monster) {
        ballsCondition = "monsterid ".concat(condition.id);
      } else if (condition instanceof Array) {
        ballsCondition = condition.map(mon => "monsterid ".concat(mon.id)).join(" || ");
        ballsCondition = "(".concat(ballsCondition, ")");
      } else if (condition instanceof external_kolmafia_namespaceObject.Effect) {
        ballsCondition = "haseffect ".concat((0,external_kolmafia_namespaceObject.toInt)(condition));
      } else if (condition instanceof external_kolmafia_namespaceObject.Skill) {
        ballsCondition = "hasskill ".concat(skillBallsMacroName(condition));
      } else if (condition instanceof external_kolmafia_namespaceObject.Item) {
        if (!condition.combat) {
          throw new InvalidMacroError("Item ".concat(condition, " cannot be made a valid BALLS predicate (it is not combat-usable)"));
        }

        ballsCondition = "hascombatitem ".concat(itemOrItemsBallsMacroName(condition));
      } else if (condition instanceof external_kolmafia_namespaceObject.Location) {
        var snarfblat = condition.id;

        if (snarfblat < 1) {
          throw new InvalidMacroError("Location ".concat(condition, " cannot be made a valid BALLS predicate (it has no location id)"));
        }

        ballsCondition = "snarfblat ".concat(snarfblat);
      } else if (condition instanceof external_kolmafia_namespaceObject.Class) {
        if ((0,external_kolmafia_namespaceObject.toInt)(condition) > 6) {
          throw new InvalidMacroError("Class ".concat(condition, " cannot be made a valid BALLS predicate (it is not a standard class)"));
        }

        ballsCondition = condition.toString().replaceAll(" ", "").toLowerCase();
      } else if (condition instanceof external_kolmafia_namespaceObject.Stat) {
        ballsCondition = "".concat(condition.toString().toLowerCase(), "class");
      } else {
        ballsCondition = condition;
      }

      return ballsCondition;
    }
  }, {
    key: "if_",
    value: function if_(condition, ifTrue) {
      return new this().if_(condition, ifTrue);
    }
  }, {
    key: "ifNot",
    value: function ifNot(condition, ifTrue) {
      return new this().ifNot(condition, ifTrue);
    }
  }, {
    key: "while_",
    value: function while_(condition, contents) {
      return new this().while_(condition, contents);
    }
  }, {
    key: "externalIf",
    value: function externalIf(condition, ifTrue, ifFalse) {
      return new this().externalIf(condition, ifTrue, ifFalse);
    }
  }, {
    key: "skill",
    value: function skill() {
      var _this3;

      return (_this3 = new this()).skill.apply(_this3, arguments);
    }
  }, {
    key: "trySkill",
    value: function trySkill() {
      var _this4;

      return (_this4 = new this()).trySkill.apply(_this4, arguments);
    }
  }, {
    key: "trySkillRepeat",
    value: function trySkillRepeat() {
      var _this5;

      return (_this5 = new this()).trySkillRepeat.apply(_this5, arguments);
    }
  }, {
    key: "item",
    value: function item() {
      var _this6;

      return (_this6 = new this()).item.apply(_this6, arguments);
    }
  }, {
    key: "tryItem",
    value: function tryItem() {
      var _this7;

      return (_this7 = new this()).tryItem.apply(_this7, arguments);
    }
  }, {
    key: "attack",
    value: function attack() {
      return new this().attack();
    }
  }, {
    key: "ifHolidayWanderer",
    value: function ifHolidayWanderer(macro) {
      return new this().ifHolidayWanderer(macro);
    }
  }, {
    key: "ifNotHolidayWanderer",
    value: function ifNotHolidayWanderer(macro) {
      return new this().ifNotHolidayWanderer(macro);
    }
  }]);

  return Macro;
}();
/**
 * Adventure in a location and handle all combats with a given macro.
 * To use this function you will need to create a consult script that runs Macro.load().submit() and a CCS that calls that consult script.
 * See examples/consult.ts for an example.
 *
 * @category Combat
 * @param loc Location to adventure in.
 * @param macro Macro to execute.
 */

combat_defineProperty(Macro, "SAVED_MACRO_PROPERTY", "libram_savedMacro");

combat_defineProperty(Macro, "cachedMacroIds", new Map());

combat_defineProperty(Macro, "cachedAutoAttacks", new Map());

function adventureMacro(loc, macro) {
  macro.save();
  setAutoAttack(0);

  try {
    adv1(loc, 0, "");

    while (inMultiFight()) {
      runCombat();
    }

    if (choiceFollowsFight()) visitUrl("choice.php");
  } finally {
    Macro.clearSaved();
  }
}
/**
 * Adventure in a location and handle all combats with a given autoattack and manual macro.
 * To use the nextMacro parameter you will need to create a consult script that runs Macro.load().submit() and a CCS that calls that consult script.
 * See examples/consult.ts for an example.
 *
 * @category Combat
 * @param loc Location to adventure in.
 * @param autoMacro Macro to execute via KoL autoattack.
 * @param nextMacro Macro to execute manually after autoattack completes.
 */

function adventureMacroAuto(loc, autoMacro) {
  var _nextMacro;

  var nextMacro = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  nextMacro = (_nextMacro = nextMacro) !== null && _nextMacro !== void 0 ? _nextMacro : Macro.abort();
  autoMacro.setAutoAttack();
  nextMacro.save();

  try {
    adv1(loc, 0, "");

    while (inMultiFight()) {
      runCombat();
    }

    if (choiceFollowsFight()) visitUrl("choice.php");
  } finally {
    Macro.clearSaved();
  }
}
var StrictMacro = /*#__PURE__*/(/* unused pure expression or super */ null && (function (_Macro) {
  combat_inherits(StrictMacro, _Macro);

  var _super2 = combat_createSuper(StrictMacro);

  function StrictMacro() {
    combat_classCallCheck(this, StrictMacro);

    return _super2.apply(this, arguments);
  }

  combat_createClass(StrictMacro, [{
    key: "skill",
    value:
    /**
     * Add one or more skill cast steps to the macro.
     * @param skills Skills to cast.
     * @returns {StrictMacro} This object itself.
     */
    function skill() {
      var _get2;

      for (var _len7 = arguments.length, skills = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        skills[_key7] = arguments[_key7];
      }

      return (_get2 = _get(combat_getPrototypeOf(StrictMacro.prototype), "skill", this)).call.apply(_get2, [this].concat(skills));
    }
    /**
     * Create a new macro with one or more skill cast steps.
     * @param skills Skills to cast.
     * @returns {StrictMacro} This object itself.
     */

  }, {
    key: "item",
    value:
    /**
     * Add one or more item steps to the macro.
     * @param items Items to use. Pass a tuple [item1, item2] to funksling.
     * @returns {StrictMacro} This object itself.
     */
    function item() {
      var _get3;

      for (var _len8 = arguments.length, items = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        items[_key8] = arguments[_key8];
      }

      return (_get3 = _get(combat_getPrototypeOf(StrictMacro.prototype), "item", this)).call.apply(_get3, [this].concat(items));
    }
    /**
     * Create a new macro with one or more item steps.
     * @param items Items to use. Pass a tuple [item1, item2] to funksling.
     * @returns {StrictMacro} This object itself.
     */

  }, {
    key: "trySkill",
    value:
    /**
     * Add one or more skill cast steps to the macro, where each step checks if you have the skill first.
     * @param skills Skills to try casting.
     * @returns {StrictMacro} This object itself.
     */
    function trySkill() {
      var _get4;

      for (var _len9 = arguments.length, skills = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        skills[_key9] = arguments[_key9];
      }

      return (_get4 = _get(combat_getPrototypeOf(StrictMacro.prototype), "trySkill", this)).call.apply(_get4, [this].concat(skills));
    }
    /**
     * Create a new macro with one or more skill cast steps, where each step checks if you have the skill first.
     * @param skills Skills to try casting.
     * @returns {StrictMacro} This object itself.
     */

  }, {
    key: "tryItem",
    value:
    /**
     * Add one or more item steps to the macro, where each step checks to see if you have the item first.
     * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
     * @returns {StrictMacro} This object itself.
     */
    function tryItem() {
      var _get5;

      for (var _len10 = arguments.length, items = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        items[_key10] = arguments[_key10];
      }

      return (_get5 = _get(combat_getPrototypeOf(StrictMacro.prototype), "tryItem", this)).call.apply(_get5, [this].concat(items));
    }
    /**
     * Create a new macro with one or more item steps, where each step checks to see if you have the item first.
     * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
     * @returns {StrictMacro} This object itself.
     */

  }, {
    key: "trySkillRepeat",
    value:
    /**
     * Add one or more skill-cast-and-repeat steps to the macro, where each step checks if you have the skill first.
     * @param skills Skills to try repeatedly casting.
     * @returns {StrictMacro} This object itself.
     */
    function trySkillRepeat() {
      var _get6;

      for (var _len11 = arguments.length, skills = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
        skills[_key11] = arguments[_key11];
      }

      return (_get6 = _get(combat_getPrototypeOf(StrictMacro.prototype), "trySkillRepeat", this)).call.apply(_get6, [this].concat(skills));
    }
    /**
     * Create a new macro with one or more skill-cast-and-repeat steps, where each step checks if you have the skill first.
     * @param skills Skills to try repeatedly casting.
     * @returns {StrictMacro} This object itself.
     */

  }], [{
    key: "skill",
    value: function skill() {
      var _this8;

      return (_this8 = new this()).skill.apply(_this8, arguments);
    }
  }, {
    key: "item",
    value: function item() {
      var _this9;

      return (_this9 = new this()).item.apply(_this9, arguments);
    }
  }, {
    key: "trySkill",
    value: function trySkill() {
      var _this10;

      return (_this10 = new this()).trySkill.apply(_this10, arguments);
    }
  }, {
    key: "tryItem",
    value: function tryItem() {
      var _this11;

      return (_this11 = new this()).tryItem.apply(_this11, arguments);
    }
  }, {
    key: "trySkillRepeat",
    value: function trySkillRepeat() {
      var _this12;

      return (_this12 = new this()).trySkillRepeat.apply(_this12, arguments);
    }
  }]);

  return StrictMacro;
}(Macro)));
;// CONCATENATED MODULE: ./node_modules/grimoire-kolmafia/dist/combat.js
function dist_combat_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) dist_combat_setPrototypeOf(subClass, superClass); }

function dist_combat_setPrototypeOf(o, p) { dist_combat_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return dist_combat_setPrototypeOf(o, p); }

function dist_combat_createSuper(Derived) { var hasNativeReflectConstruct = dist_combat_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = dist_combat_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = dist_combat_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return dist_combat_possibleConstructorReturn(this, result); }; }

function dist_combat_possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return dist_combat_assertThisInitialized(self); }

function dist_combat_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function dist_combat_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function dist_combat_getPrototypeOf(o) { dist_combat_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return dist_combat_getPrototypeOf(o); }

function dist_combat_toConsumableArray(arr) { return dist_combat_arrayWithoutHoles(arr) || dist_combat_iterableToArray(arr) || dist_combat_unsupportedIterableToArray(arr) || dist_combat_nonIterableSpread(); }

function dist_combat_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function dist_combat_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function dist_combat_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return dist_combat_arrayLikeToArray(arr); }

function dist_combat_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = dist_combat_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function dist_combat_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return dist_combat_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return dist_combat_arrayLikeToArray(o, minLen); }

function dist_combat_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function dist_combat_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function dist_combat_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function dist_combat_createClass(Constructor, protoProps, staticProps) { if (protoProps) dist_combat_defineProperties(Constructor.prototype, protoProps); if (staticProps) dist_combat_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }




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


var CombatStrategy = /*#__PURE__*/function () {
  function CombatStrategy() {
    dist_combat_classCallCheck(this, CombatStrategy);

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


  dist_combat_createClass(CombatStrategy, [{
    key: "macro",
    value: function macro(_macro, monsters, prepend) {
      var _a, _b;

      if (monsters === undefined) {
        if (this.default_macro === undefined) this.default_macro = [];
        if (prepend) this.default_macro.unshift(_macro);else this.default_macro.push(_macro);
      } else {
        if (monsters instanceof external_kolmafia_namespaceObject.Monster) monsters = [monsters];

        var _iterator = dist_combat_createForOfIteratorHelper(monsters),
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
        if (monsters instanceof external_kolmafia_namespaceObject.Monster) monsters = [monsters];

        var _iterator2 = dist_combat_createForOfIteratorHelper(monsters),
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
      } else if (monsters instanceof external_kolmafia_namespaceObject.Monster) {
        this.actions.set(monsters, _action);
      } else {
        var _iterator3 = dist_combat_createForOfIteratorHelper(monsters),
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

      if (monsters instanceof external_kolmafia_namespaceObject.Monster) monsters = [monsters];

      var _iterator4 = dist_combat_createForOfIteratorHelper(monsters),
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
      if (this.starting_macro) result.starting_macro = dist_combat_toConsumableArray(this.starting_macro);
      if (this.default_macro) result.default_macro = dist_combat_toConsumableArray(this.default_macro);

      var _iterator5 = dist_combat_createForOfIteratorHelper(this.macros),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var pair = _step5.value;
          result.macros.set(pair[0], dist_combat_toConsumableArray(pair[1]));
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      if (this.default_autoattack) result.default_autoattack = dist_combat_toConsumableArray(this.default_autoattack);

      var _iterator6 = dist_combat_createForOfIteratorHelper(this.autoattacks),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var _pair = _step6.value;
          result.autoattacks.set(_pair[0], dist_combat_toConsumableArray(_pair[1]));
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }

      result.default_action = this.default_action;

      var _iterator7 = dist_combat_createForOfIteratorHelper(this.actions),
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

      var _iterator8 = dist_combat_createForOfIteratorHelper(this.ccs_entries),
          _step8;

      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var _pair3 = _step8.value;
          result.ccs_entries.set(_pair3[0], dist_combat_toConsumableArray(_pair3[1]));
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
        result.step.apply(result, dist_combat_toConsumableArray(this.starting_macro.map(undelay)));
      } // Perform any monster-specific macros (these may or may not end the fight)


      var monster_macros = new CompressedMacro();
      this.macros.forEach((value, key) => {
        var _Macro;

        monster_macros.add(key, (_Macro = new Macro()).step.apply(_Macro, dist_combat_toConsumableArray(value.map(undelay))));
      });
      result.step(monster_macros.compile()); // Perform the non-monster specific macro

      if (this.default_macro) result.step.apply(result, dist_combat_toConsumableArray(this.default_macro.map(undelay))); // Perform any monster-specific actions (these should end the fight)

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

        monster_macros.add(key, (_Macro2 = new Macro()).step.apply(_Macro2, dist_combat_toConsumableArray(value.map(undelay))));
      });
      result.step(monster_macros.compile()); // Perform the non-monster specific macro

      if (this.default_autoattack) result.step.apply(result, dist_combat_toConsumableArray(this.default_autoattack.map(undelay)));
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

      var _iterator9 = dist_combat_createForOfIteratorHelper(this.ccs_entries),
          _step9;

      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var ccs_entry = _step9.value;
          result.push.apply(result, ["[".concat(ccs_entry[0].name, "]")].concat(dist_combat_toConsumableArray(ccs_entry[1])));
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
        dist_combat_inherits(CombatStrategyWithActions, _this);

        var _super = dist_combat_createSuper(CombatStrategyWithActions);

        function CombatStrategyWithActions() {
          dist_combat_classCallCheck(this, CombatStrategyWithActions);

          return _super.apply(this, arguments);
        }

        return dist_combat_createClass(CombatStrategyWithActions);
      }(this); // eslint-disable-next-line @typescript-eslint/no-explicit-any


      var proto = CombatStrategyWithActions.prototype;

      var _iterator10 = dist_combat_createForOfIteratorHelper(actions),
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
}();
/**
 * A class to build a macro that combines if statements (keyed on monster) with
 * identical body into a single if statement, to avoid the 37-action limit.
 * Ex: [if x; A; if y; B; if z; A;] will turn into [if x || z; A; if y; B]
 */

var CompressedMacro = /*#__PURE__*/function () {
  function CompressedMacro() {
    dist_combat_classCallCheck(this, CompressedMacro);

    this.components = new Map();
  }
  /**
   * Set the macro for a given monster (replacing any previous macros).
   */


  dist_combat_createClass(CompressedMacro, [{
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
}();
/**
 * A class for providing resources to fulfil combat actions.
 */


var CombatResources = /*#__PURE__*/function () {
  function CombatResources() {
    dist_combat_classCallCheck(this, CombatResources);

    this.resources = new Map();
  }
  /**
   * Use the provided resource to fulfil the provided action.
   * (If the resource is undefined, this does nothing).
   */


  dist_combat_createClass(CombatResources, [{
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
      if (resource.do instanceof external_kolmafia_namespaceObject.Item) return new Macro().item(resource.do);
      if (resource.do instanceof external_kolmafia_namespaceObject.Skill) return new Macro().skill(resource.do);
      return resource.do;
    }
  }]);

  return CombatResources;
}();
;// CONCATENATED MODULE: ./node_modules/libram/dist/logger.js
function logger_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function logger_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function logger_createClass(Constructor, protoProps, staticProps) { if (protoProps) logger_defineProperties(Constructor.prototype, protoProps); if (staticProps) logger_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function logger_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var defaultHandlers = {
  info: message => (0,external_kolmafia_namespaceObject.printHtml)("<b>[Libram]</b> ".concat(message)),
  warning: message => (0,external_kolmafia_namespaceObject.printHtml)("<span style=\"background: orange; color: white;\"><b>[Libram]</b> ".concat(message, "</span>")),
  error: _error => (0,external_kolmafia_namespaceObject.printHtml)("<span style=\"background: red; color: white;\"><b>[Libram]</b> ".concat(_error.toString(), "</span>"))
};

var Logger = /*#__PURE__*/function () {
  function Logger() {
    logger_classCallCheck(this, Logger);

    logger_defineProperty(this, "handlers", defaultHandlers);
  }

  logger_createClass(Logger, [{
    key: "setHandler",
    value: // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function setHandler(level, callback) {
      this.handlers[level] = callback;
    } // eslint-disable-next-line @typescript-eslint/no-explicit-any

  }, {
    key: "log",
    value: function log(level, message) {
      this.handlers[level](message);
    }
  }, {
    key: "info",
    value: function info(message) {
      this.log("info", message);
    }
  }, {
    key: "warning",
    value: function warning(message) {
      this.log("warning", message);
    }
  }, {
    key: "error",
    value: function error(message) {
      this.log("error", message);
    }
  }]);

  return Logger;
}();

/* harmony default export */ const logger = (new Logger());
;// CONCATENATED MODULE: ./node_modules/libram/dist/maximize.js
var maximize_templateObject, maximize_templateObject2, maximize_templateObject3, maximize_templateObject4, maximize_templateObject5, maximize_templateObject6, maximize_templateObject7, maximize_templateObject8, maximize_templateObject9, maximize_templateObject10, maximize_templateObject11, maximize_templateObject12, maximize_templateObject13, maximize_templateObject14, maximize_templateObject15, maximize_templateObject16, maximize_templateObject17, maximize_templateObject18, maximize_templateObject19, maximize_templateObject20, maximize_templateObject21, maximize_templateObject22, maximize_templateObject23, maximize_templateObject24, maximize_templateObject25, maximize_templateObject26, maximize_templateObject27, maximize_templateObject28, maximize_templateObject29, maximize_templateObject30, maximize_templateObject31, maximize_templateObject32, maximize_templateObject33, maximize_templateObject34, _templateObject35, _templateObject36, _templateObject37, _templateObject38, _templateObject39, _templateObject40, _templateObject41, _templateObject42, _templateObject43, _templateObject44, _templateObject45, _templateObject46, _templateObject47, _templateObject48;

function maximize_slicedToArray(arr, i) { return maximize_arrayWithHoles(arr) || maximize_iterableToArrayLimit(arr, i) || maximize_unsupportedIterableToArray(arr, i) || maximize_nonIterableRest(); }

function maximize_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function maximize_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function maximize_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function maximize_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function maximize_createClass(Constructor, protoProps, staticProps) { if (protoProps) maximize_defineProperties(Constructor.prototype, protoProps); if (staticProps) maximize_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function maximize_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function maximize_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = maximize_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function maximize_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function maximize_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function maximize_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? maximize_ownKeys(Object(source), !0).forEach(function (key) { maximize_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : maximize_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function maximize_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function maximize_toConsumableArray(arr) { return maximize_arrayWithoutHoles(arr) || maximize_iterableToArray(arr) || maximize_unsupportedIterableToArray(arr) || maximize_nonIterableSpread(); }

function maximize_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function maximize_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return maximize_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return maximize_arrayLikeToArray(o, minLen); }

function maximize_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function maximize_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return maximize_arrayLikeToArray(arr); }

function maximize_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





/**
 * Merges a Partial<MaximizeOptions> onto a MaximizeOptions. We merge via overriding for all boolean properties and for onlySlot, and concat all other array properties.
 * @param defaultOptions MaximizeOptions to use as a "base."
 * @param addendums Options to attempt to merge onto defaultOptions.
 */

function mergeMaximizeOptions(defaultOptions, addendums) {
  var _addendums$updateOnFa, _addendums$updateOnCa, _addendums$useOutfitC, _addendums$forceEquip, _addendums$preventEqu, _addendums$bonusEquip, _addendums$onlySlot, _addendums$preventSlo, _addendums$forceUpdat, _addendums$modes;

  return {
    updateOnFamiliarChange: (_addendums$updateOnFa = addendums.updateOnFamiliarChange) !== null && _addendums$updateOnFa !== void 0 ? _addendums$updateOnFa : defaultOptions.updateOnFamiliarChange,
    updateOnCanEquipChanged: (_addendums$updateOnCa = addendums.updateOnCanEquipChanged) !== null && _addendums$updateOnCa !== void 0 ? _addendums$updateOnCa : defaultOptions.updateOnCanEquipChanged,
    useOutfitCaching: (_addendums$useOutfitC = addendums.useOutfitCaching) !== null && _addendums$useOutfitC !== void 0 ? _addendums$useOutfitC : defaultOptions.useOutfitCaching,
    forceEquip: [].concat(maximize_toConsumableArray(defaultOptions.forceEquip), maximize_toConsumableArray((_addendums$forceEquip = addendums.forceEquip) !== null && _addendums$forceEquip !== void 0 ? _addendums$forceEquip : [])),
    preventEquip: [].concat(maximize_toConsumableArray(defaultOptions.preventEquip), maximize_toConsumableArray((_addendums$preventEqu = addendums.preventEquip) !== null && _addendums$preventEqu !== void 0 ? _addendums$preventEqu : [])).filter(item => {
      var _addendums$forceEquip2;

      return !defaultOptions.forceEquip.includes(item) && !((_addendums$forceEquip2 = addendums.forceEquip) !== null && _addendums$forceEquip2 !== void 0 && _addendums$forceEquip2.includes(item));
    }),
    bonusEquip: new Map([].concat(maximize_toConsumableArray(defaultOptions.bonusEquip), maximize_toConsumableArray((_addendums$bonusEquip = addendums.bonusEquip) !== null && _addendums$bonusEquip !== void 0 ? _addendums$bonusEquip : []))),
    onlySlot: (_addendums$onlySlot = addendums.onlySlot) !== null && _addendums$onlySlot !== void 0 ? _addendums$onlySlot : defaultOptions.onlySlot,
    preventSlot: [].concat(maximize_toConsumableArray(defaultOptions.preventSlot), maximize_toConsumableArray((_addendums$preventSlo = addendums.preventSlot) !== null && _addendums$preventSlo !== void 0 ? _addendums$preventSlo : [])),
    forceUpdate: (_addendums$forceUpdat = addendums.forceUpdate) !== null && _addendums$forceUpdat !== void 0 ? _addendums$forceUpdat : defaultOptions.forceUpdate,
    modes: maximize_objectSpread(maximize_objectSpread({}, defaultOptions.modes), (_addendums$modes = addendums.modes) !== null && _addendums$modes !== void 0 ? _addendums$modes : {})
  };
}

var defaultMaximizeOptions = {
  updateOnFamiliarChange: true,
  updateOnCanEquipChanged: true,
  useOutfitCaching: true,
  forceEquip: [],
  preventEquip: [],
  bonusEquip: new Map(),
  onlySlot: [],
  preventSlot: [],
  forceUpdate: false,
  modes: {}
};
/**
 *
 * @param options Default options for each maximizer run.
 * @param options.updateOnFamiliarChange Re-run the maximizer if familiar has changed. Default true.
 * @param options.updateOnCanEquipChanged Re-run the maximizer if stats have changed what can be equipped. Default true.
 * @param options.forceEquip Equipment to force-equip ("equip X").
 * @param options.preventEquip Equipment to prevent equipping ("-equip X").
 * @param options.bonusEquip Equipment to apply a bonus to ("200 bonus X").
 */

function setDefaultMaximizeOptions(options) {
  Object.assign(defaultMaximizeOptions, options);
}
var modeableCommands = ["backupcamera", "umbrella", "snowsuit", "edpiece", "retrocape", "parka"];
var modeableItems = {
  backupcamera: template_string_$item(maximize_templateObject || (maximize_templateObject = maximize_taggedTemplateLiteral(["backup camera"]))),
  umbrella: template_string_$item(maximize_templateObject2 || (maximize_templateObject2 = maximize_taggedTemplateLiteral(["unbreakable umbrella"]))),
  snowsuit: template_string_$item(maximize_templateObject3 || (maximize_templateObject3 = maximize_taggedTemplateLiteral(["Snow Suit"]))),
  edpiece: template_string_$item(maximize_templateObject4 || (maximize_templateObject4 = maximize_taggedTemplateLiteral(["The Crown of Ed the Undying"]))),
  retrocape: template_string_$item(maximize_templateObject5 || (maximize_templateObject5 = maximize_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"]))),
  parka: template_string_$item(maximize_templateObject6 || (maximize_templateObject6 = maximize_taggedTemplateLiteral(["Jurassic Parka"])))
};
var modeableState = {
  backupcamera: () => (0,external_kolmafia_namespaceObject.getProperty)("backupCameraMode"),
  umbrella: () => (0,external_kolmafia_namespaceObject.getProperty)("umbrellaState"),
  snowsuit: () => (0,external_kolmafia_namespaceObject.getProperty)("snowsuit"),
  edpiece: () => (0,external_kolmafia_namespaceObject.getProperty)("edPiece"),
  retrocape: () => (0,external_kolmafia_namespaceObject.getProperty)("retroCapeSuperhero") + " " + (0,external_kolmafia_namespaceObject.getProperty)("retroCapeWashingInstructions"),
  parka: () => (0,external_kolmafia_namespaceObject.getProperty)("parkaMode")
};
function getCurrentModes() {
  var modes = {};

  var _iterator = maximize_createForOfIteratorHelper(modeableCommands),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var key = _step.value;

      if ((0,external_kolmafia_namespaceObject.haveEquipped)(modeableItems[key])) {
        modes[key] = modeableState[key]();
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return modes;
}
function applyModes(modes) {
  var _iterator2 = maximize_createForOfIteratorHelper(modeableCommands),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var command = _step2.value;

      if ((0,external_kolmafia_namespaceObject.haveEquipped)(modeableItems[command]) && modes[command] !== undefined) {
        if (modeableState[command]() !== modes[command]) {
          (0,external_kolmafia_namespaceObject.cliExecute)(command + " " + modes[command]);
        }
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
} // Subset of slots that are valid for caching.

var cachedSlots = $slots(maximize_templateObject7 || (maximize_templateObject7 = maximize_taggedTemplateLiteral(["hat, weapon, off-hand, back, shirt, pants, acc1, acc2, acc3, familiar"])));

var CacheEntry = /*#__PURE__*/maximize_createClass(function CacheEntry(equipment, rider, familiar, canEquipItemCount, modes) {
  maximize_classCallCheck(this, CacheEntry);

  maximize_defineProperty(this, "equipment", void 0);

  maximize_defineProperty(this, "rider", void 0);

  maximize_defineProperty(this, "familiar", void 0);

  maximize_defineProperty(this, "canEquipItemCount", void 0);

  maximize_defineProperty(this, "modes", void 0);

  this.equipment = equipment;
  this.rider = rider;
  this.familiar = familiar;
  this.canEquipItemCount = canEquipItemCount;
  this.modes = modes;
});

var _outfitSlots = /*#__PURE__*/new WeakMap();

var _useHistory = /*#__PURE__*/new WeakMap();

var _maxSize = /*#__PURE__*/new WeakMap();

var OutfitLRUCache = /*#__PURE__*/function () {
  // Current outfits allocated
  // Array of indices into #outfitSlots in order of use. Most recent at the front.
  function OutfitLRUCache(maxSize) {
    maximize_classCallCheck(this, OutfitLRUCache);

    _classPrivateFieldInitSpec(this, _outfitSlots, {
      writable: true,
      value: []
    });

    _classPrivateFieldInitSpec(this, _useHistory, {
      writable: true,
      value: []
    });

    _classPrivateFieldInitSpec(this, _maxSize, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _maxSize, maxSize);
  }

  maximize_createClass(OutfitLRUCache, [{
    key: "checkConsistent",
    value: function checkConsistent() {
      if (_classPrivateFieldGet(this, _useHistory).length !== _classPrivateFieldGet(this, _outfitSlots).length || !maximize_toConsumableArray(_classPrivateFieldGet(this, _useHistory)).sort().every((value, index) => value === index)) {
        throw new Error("Outfit cache consistency failed.");
      }
    }
  }, {
    key: "promote",
    value: function promote(index) {
      _classPrivateFieldSet(this, _useHistory, [index].concat(maximize_toConsumableArray(_classPrivateFieldGet(this, _useHistory).filter(i => i !== index))));

      this.checkConsistent();
    }
  }, {
    key: "get",
    value: function get(key) {
      var index = _classPrivateFieldGet(this, _outfitSlots).indexOf(key);

      if (index < 0) return undefined;
      this.promote(index);
      return "".concat(OutfitLRUCache.OUTFIT_PREFIX, " ").concat(index);
    }
  }, {
    key: "insert",
    value: function insert(key) {
      var lastUseIndex = undefined;

      if (_classPrivateFieldGet(this, _outfitSlots).length >= _classPrivateFieldGet(this, _maxSize)) {
        lastUseIndex = _classPrivateFieldGet(this, _useHistory).pop();

        if (lastUseIndex === undefined) {
          throw new Error("Outfit cache consistency failed.");
        }

        _classPrivateFieldGet(this, _useHistory).splice(0, 0, lastUseIndex);

        _classPrivateFieldGet(this, _outfitSlots)[lastUseIndex] = key;
        this.checkConsistent();
        return "".concat(OutfitLRUCache.OUTFIT_PREFIX, " ").concat(lastUseIndex);
      } else {
        var index = _classPrivateFieldGet(this, _outfitSlots).push(key) - 1;

        _classPrivateFieldGet(this, _useHistory).splice(0, 0, index);

        this.checkConsistent();
        return "".concat(OutfitLRUCache.OUTFIT_PREFIX, " ").concat(index);
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      _classPrivateFieldSet(this, _outfitSlots, []);

      _classPrivateFieldSet(this, _useHistory, []);
    }
  }]);

  return OutfitLRUCache;
}();
/**
 * Save current equipment as KoL-native outfit.
 * @param name Name of new outfit.
 */


maximize_defineProperty(OutfitLRUCache, "OUTFIT_PREFIX", "Script Outfit");

function saveOutfit(name) {
  (0,external_kolmafia_namespaceObject.cliExecute)("outfit save ".concat(name));
} // Objective cache entries.


var cachedObjectives = {}; // Outfit cache entries. Keep 6 by default to avoid cluttering list.

var outfitCache = new OutfitLRUCache(6); // Cache to prevent rescanning all items unnecessarily

var cachedStats = [0, 0, 0];
var cachedCanEquipItemCount = 0;
/**
 * Count the number of unique items that can be equipped.
 * @returns The count of unique items.
 */

function canEquipItemCount() {
  var stats = $stats(maximize_templateObject8 || (maximize_templateObject8 = maximize_taggedTemplateLiteral(["Muscle, Mysticality, Moxie"]))).map(stat => Math.min((0,external_kolmafia_namespaceObject.myBasestat)(stat), 300));

  if (stats.every((value, index) => value === cachedStats[index])) {
    return cachedCanEquipItemCount;
  }

  cachedStats = stats;
  cachedCanEquipItemCount = external_kolmafia_namespaceObject.Item.all().filter(item => (0,external_kolmafia_namespaceObject.canEquip)(item)).length;
  return cachedCanEquipItemCount;
}
/**
 * Checks the objective cache for a valid entry.
 * @param cacheKey The cache key to check.
 * @param updateOnFamiliarChange Ignore cache if familiar has changed.
 * @param updateOnCanEquipChanged Ignore cache if stats have changed what can be equipped.
 * @returns A valid CacheEntry or null.
 */


function checkCache(cacheKey, options) {
  var entry = cachedObjectives[cacheKey];

  if (!entry) {
    return null;
  }

  if (options.updateOnFamiliarChange && (0,external_kolmafia_namespaceObject.myFamiliar)() !== entry.familiar) {
    logger.warning("Equipment found in maximize cache but familiar is different.");
    return null;
  }

  if (options.updateOnCanEquipChanged && entry.canEquipItemCount !== canEquipItemCount()) {
    logger.warning("Equipment found in maximize cache but equippable item list is out of date.");
    return null;
  }

  return entry;
}
/**
 * Applies equipment that was found in the cache.
 * @param entry The CacheEntry to apply
 */


function applyCached(entry, options) {
  var outfitName = options.useOutfitCaching ? outfitCache.get(entry) : undefined;

  if (outfitName) {
    if (!(0,external_kolmafia_namespaceObject.isWearingOutfit)(outfitName)) {
      (0,external_kolmafia_namespaceObject.outfit)(outfitName);
    }

    var familiarEquip = entry.equipment.get($slot(maximize_templateObject9 || (maximize_templateObject9 = maximize_taggedTemplateLiteral(["familiar"]))));
    if (familiarEquip) (0,external_kolmafia_namespaceObject.equip)($slot(maximize_templateObject10 || (maximize_templateObject10 = maximize_taggedTemplateLiteral(["familiar"]))), familiarEquip);
  } else {
    var _iterator3 = maximize_createForOfIteratorHelper(entry.equipment),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var _step3$value = maximize_slicedToArray(_step3.value, 2),
            slot = _step3$value[0],
            item = _step3$value[1];

        if ((0,external_kolmafia_namespaceObject.equippedItem)(slot) !== item && (0,external_kolmafia_namespaceObject.availableAmount)(item) > 0) {
          (0,external_kolmafia_namespaceObject.equip)(slot, item);
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    if (verifyCached(entry) && options.useOutfitCaching) {
      var _outfitName = outfitCache.insert(entry);

      logger.info("Saving equipment to outfit ".concat(_outfitName, "."));
      saveOutfit(_outfitName);
    }
  }

  if ((0,external_kolmafia_namespaceObject.equippedAmount)(template_string_$item(maximize_templateObject11 || (maximize_templateObject11 = maximize_taggedTemplateLiteral(["Crown of Thrones"])))) > 0 && entry.rider.get(template_string_$item(maximize_templateObject12 || (maximize_templateObject12 = maximize_taggedTemplateLiteral(["Crown of Thrones"]))))) {
    (0,external_kolmafia_namespaceObject.enthroneFamiliar)(entry.rider.get(template_string_$item(maximize_templateObject13 || (maximize_templateObject13 = maximize_taggedTemplateLiteral(["Crown of Thrones"])))) || template_string_$familiar.none);
  }

  if ((0,external_kolmafia_namespaceObject.equippedAmount)(template_string_$item(maximize_templateObject14 || (maximize_templateObject14 = maximize_taggedTemplateLiteral(["Buddy Bjorn"])))) > 0 && entry.rider.get(template_string_$item(maximize_templateObject15 || (maximize_templateObject15 = maximize_taggedTemplateLiteral(["Buddy Bjorn"]))))) {
    (0,external_kolmafia_namespaceObject.bjornifyFamiliar)(entry.rider.get(template_string_$item(maximize_templateObject16 || (maximize_templateObject16 = maximize_taggedTemplateLiteral(["Buddy Bjorn"])))) || template_string_$familiar.none);
  }

  applyModes(maximize_objectSpread(maximize_objectSpread({}, entry.modes), options.modes));
}

var slotStructure = [$slots(maximize_templateObject17 || (maximize_templateObject17 = maximize_taggedTemplateLiteral(["hat"]))), $slots(maximize_templateObject18 || (maximize_templateObject18 = maximize_taggedTemplateLiteral(["back"]))), $slots(maximize_templateObject19 || (maximize_templateObject19 = maximize_taggedTemplateLiteral(["shirt"]))), $slots(maximize_templateObject20 || (maximize_templateObject20 = maximize_taggedTemplateLiteral(["weapon, off-hand"]))), $slots(maximize_templateObject21 || (maximize_templateObject21 = maximize_taggedTemplateLiteral(["pants"]))), $slots(maximize_templateObject22 || (maximize_templateObject22 = maximize_taggedTemplateLiteral(["acc1, acc2, acc3"]))), $slots(maximize_templateObject23 || (maximize_templateObject23 = maximize_taggedTemplateLiteral(["familiar"])))];
/**
 * Verifies that a CacheEntry was applied successfully.
 * @param entry The CacheEntry to verify
 * @returns If all desired equipment was appliedn in the correct slots.
 */

function verifyCached(entry) {
  var success = true;

  var _iterator4 = maximize_createForOfIteratorHelper(slotStructure),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var slotGroup = _step4.value;
      var desiredSlots = slotGroup.map(slot => {
        var _entry$equipment$get;

        return [slot, (_entry$equipment$get = entry.equipment.get(slot)) !== null && _entry$equipment$get !== void 0 ? _entry$equipment$get : null];
      }).filter(_ref => {
        var _ref2 = maximize_slicedToArray(_ref, 2),
            item = _ref2[1];

        return item !== null;
      });
      var desiredSet = desiredSlots.map(_ref3 => {
        var _ref4 = maximize_slicedToArray(_ref3, 2),
            item = _ref4[1];

        return item;
      });
      var equippedSet = desiredSlots.map(_ref5 => {
        var _ref6 = maximize_slicedToArray(_ref5, 1),
            slot = _ref6[0];

        return (0,external_kolmafia_namespaceObject.equippedItem)(slot);
      });

      if (!setEqual(desiredSet, equippedSet)) {
        logger.warning("Failed to apply cached ".concat(desiredSet.join(", "), " in ").concat(slotGroup.join(", "), "."));
        success = false;
      }
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }

  if ((0,external_kolmafia_namespaceObject.equippedAmount)(template_string_$item(maximize_templateObject24 || (maximize_templateObject24 = maximize_taggedTemplateLiteral(["Crown of Thrones"])))) > 0 && entry.rider.get(template_string_$item(maximize_templateObject25 || (maximize_templateObject25 = maximize_taggedTemplateLiteral(["Crown of Thrones"]))))) {
    if (entry.rider.get(template_string_$item(maximize_templateObject26 || (maximize_templateObject26 = maximize_taggedTemplateLiteral(["Crown of Thrones"])))) !== (0,external_kolmafia_namespaceObject.myEnthronedFamiliar)()) {
      logger.warning("Failed to apply ".concat(entry.rider.get(template_string_$item(maximize_templateObject27 || (maximize_templateObject27 = maximize_taggedTemplateLiteral(["Crown of Thrones"])))), " in ").concat(template_string_$item(maximize_templateObject28 || (maximize_templateObject28 = maximize_taggedTemplateLiteral(["Crown of Thrones"]))), "."));
      success = false;
    }
  }

  if ((0,external_kolmafia_namespaceObject.equippedAmount)(template_string_$item(maximize_templateObject29 || (maximize_templateObject29 = maximize_taggedTemplateLiteral(["Buddy Bjorn"])))) > 0 && entry.rider.get(template_string_$item(maximize_templateObject30 || (maximize_templateObject30 = maximize_taggedTemplateLiteral(["Buddy Bjorn"]))))) {
    if (entry.rider.get(template_string_$item(maximize_templateObject31 || (maximize_templateObject31 = maximize_taggedTemplateLiteral(["Buddy Bjorn"])))) !== (0,external_kolmafia_namespaceObject.myBjornedFamiliar)()) {
      logger.warning("Failed to apply".concat(entry.rider.get(template_string_$item(maximize_templateObject32 || (maximize_templateObject32 = maximize_taggedTemplateLiteral(["Buddy Bjorn"])))), " in ").concat(template_string_$item(maximize_templateObject33 || (maximize_templateObject33 = maximize_taggedTemplateLiteral(["Buddy Bjorn"]))), "."));
      success = false;
    }
  }

  return success;
}
/**
 * Save current equipment to the objective cache.
 * @param cacheKey The cache key to save.
 */


function saveCached(cacheKey, options) {
  var equipment = new Map();
  var rider = new Map();

  var _iterator5 = maximize_createForOfIteratorHelper(cachedSlots),
      _step5;

  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var _slot2 = _step5.value;
      equipment.set(_slot2, (0,external_kolmafia_namespaceObject.equippedItem)(_slot2));
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }

  if ((0,external_kolmafia_namespaceObject.equippedAmount)(template_string_$item(maximize_templateObject34 || (maximize_templateObject34 = maximize_taggedTemplateLiteral(["card sleeve"])))) > 0) {
    equipment.set($slot(_templateObject35 || (_templateObject35 = maximize_taggedTemplateLiteral(["card-sleeve"]))), (0,external_kolmafia_namespaceObject.equippedItem)($slot(_templateObject36 || (_templateObject36 = maximize_taggedTemplateLiteral(["card-sleeve"])))));
  }

  if ((0,external_kolmafia_namespaceObject.equippedAmount)(template_string_$item(_templateObject37 || (_templateObject37 = maximize_taggedTemplateLiteral(["Crown of Thrones"])))) > 0) {
    rider.set(template_string_$item(_templateObject38 || (_templateObject38 = maximize_taggedTemplateLiteral(["Crown of Thrones"]))), (0,external_kolmafia_namespaceObject.myEnthronedFamiliar)());
  }

  if ((0,external_kolmafia_namespaceObject.equippedAmount)(template_string_$item(_templateObject39 || (_templateObject39 = maximize_taggedTemplateLiteral(["Buddy Bjorn"])))) > 0) {
    rider.set(template_string_$item(_templateObject40 || (_templateObject40 = maximize_taggedTemplateLiteral(["Buddy Bjorn"]))), (0,external_kolmafia_namespaceObject.myBjornedFamiliar)());
  }

  if (options.preventSlot && options.preventSlot.length > 0) {
    var _iterator6 = maximize_createForOfIteratorHelper(options.preventSlot),
        _step6;

    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var slot = _step6.value;
        equipment.delete(slot);
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }

    if (options.preventSlot.includes($slot(_templateObject41 || (_templateObject41 = maximize_taggedTemplateLiteral(["buddy-bjorn"]))))) {
      rider.delete(template_string_$item(_templateObject42 || (_templateObject42 = maximize_taggedTemplateLiteral(["Buddy Bjorn"]))));
    }

    if (options.preventSlot.includes($slot(_templateObject43 || (_templateObject43 = maximize_taggedTemplateLiteral(["crown-of-thrones"]))))) {
      rider.delete(template_string_$item(_templateObject44 || (_templateObject44 = maximize_taggedTemplateLiteral(["Crown of Thrones"]))));
    }
  }

  if (options.onlySlot && options.onlySlot.length > 0) {
    var _iterator7 = maximize_createForOfIteratorHelper(external_kolmafia_namespaceObject.Slot.all()),
        _step7;

    try {
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
        var _slot = _step7.value;

        if (!options.onlySlot.includes(_slot)) {
          equipment.delete(_slot);
        }
      }
    } catch (err) {
      _iterator7.e(err);
    } finally {
      _iterator7.f();
    }

    if (!options.onlySlot.includes($slot(_templateObject45 || (_templateObject45 = maximize_taggedTemplateLiteral(["buddy-bjorn"]))))) {
      rider.delete(template_string_$item(_templateObject46 || (_templateObject46 = maximize_taggedTemplateLiteral(["Buddy Bjorn"]))));
    }

    if (!options.onlySlot.includes($slot(_templateObject47 || (_templateObject47 = maximize_taggedTemplateLiteral(["crown-of-thrones"]))))) {
      rider.delete(template_string_$item(_templateObject48 || (_templateObject48 = maximize_taggedTemplateLiteral(["Crown of Thrones"]))));
    }
  }

  var entry = new CacheEntry(equipment, rider, (0,external_kolmafia_namespaceObject.myFamiliar)(), canEquipItemCount(), maximize_objectSpread(maximize_objectSpread({}, getCurrentModes()), options.modes));
  cachedObjectives[cacheKey] = entry;

  if (options.useOutfitCaching) {
    var outfitName = outfitCache.insert(entry);
    logger.info("Saving equipment to outfit ".concat(outfitName, "."));
    saveOutfit(outfitName);
  }
}
/**
 * Run the maximizer, but only if the objective and certain pieces of game state haven't changed since it was last run.
 * @param objectives Objectives to maximize for.
 * @param options Options for this run of the maximizer.
 * @param options.updateOnFamiliarChange Re-run the maximizer if familiar has changed. Default true.
 * @param options.updateOnCanEquipChanged Re-run the maximizer if stats have changed what can be equipped. Default true.
 * @param options.forceEquip Equipment to force-equip ("equip X").
 * @param options.preventEquip Equipment to prevent equipping ("-equip X").
 * @param options.bonusEquip Equipment to apply a bonus to ("200 bonus X").
 * @returns Whether the maximize call succeeded.
 */


function maximizeCached(objectives) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fullOptions = mergeMaximizeOptions(defaultMaximizeOptions, options);
  var forceEquip = fullOptions.forceEquip,
      preventEquip = fullOptions.preventEquip,
      bonusEquip = fullOptions.bonusEquip,
      onlySlot = fullOptions.onlySlot,
      preventSlot = fullOptions.preventSlot,
      forceUpdate = fullOptions.forceUpdate; // Sort each group in objective to ensure consistent ordering in string

  var objective = maximize_toConsumableArray(new Set([].concat(maximize_toConsumableArray(objectives.sort()), maximize_toConsumableArray(forceEquip.map(item => "equip ".concat(item)).sort()), maximize_toConsumableArray(preventEquip.map(item => "-equip ".concat(item)).sort()), maximize_toConsumableArray(onlySlot.map(slot => "".concat(slot)).sort()), maximize_toConsumableArray(preventSlot.map(slot => "-".concat(slot)).sort()), maximize_toConsumableArray(Array.from(bonusEquip.entries()).filter(_ref7 => {
    var _ref8 = maximize_slicedToArray(_ref7, 2),
        bonus = _ref8[1];

    return bonus !== 0;
  }).map(_ref9 => {
    var _ref10 = maximize_slicedToArray(_ref9, 2),
        item = _ref10[0],
        bonus = _ref10[1];

    return "".concat(Math.round(bonus * 100) / 100, " bonus ").concat(item);
  }).sort())))).join(", "); // Items equipped in slots not touched by the maximizer must be in the cache key


  var untouchedSlots = cachedSlots.filter(slot => preventSlot.includes(slot) || onlySlot.length > 0 && !onlySlot.includes(slot));
  var cacheKey = [objective].concat(maximize_toConsumableArray(untouchedSlots.map(slot => "".concat(slot, ":").concat((0,external_kolmafia_namespaceObject.equippedItem)(slot))).sort())).join("; ");
  var cacheEntry = checkCache(cacheKey, fullOptions);

  if (cacheEntry && !forceUpdate) {
    logger.info("Equipment found in maximize cache, equipping...");
    applyCached(cacheEntry, fullOptions);

    if (verifyCached(cacheEntry)) {
      logger.info("Equipped cached ".concat(cacheKey));
      return true;
    }

    logger.warning("Maximize cache application failed, maximizing...");
  }

  var result = (0,external_kolmafia_namespaceObject.maximize)(objective, false);
  saveCached(cacheKey, fullOptions);
  return result;
}

var _maximizeParameters = /*#__PURE__*/new WeakMap();

var _maximizeOptions = /*#__PURE__*/new WeakMap();

var Requirement = /*#__PURE__*/function () {
  /**
   * A convenient way of combining maximization parameters and options
   * @param maximizeParameters Parameters you're attempting to maximize
   * @param maximizeOptions Object potentially containing forceEquips, bonusEquips, preventEquips, and preventSlots
   */
  function Requirement(maximizeParameters, maximizeOptions) {
    maximize_classCallCheck(this, Requirement);

    _classPrivateFieldInitSpec(this, _maximizeParameters, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _maximizeOptions, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _maximizeParameters, maximizeParameters);

    _classPrivateFieldSet(this, _maximizeOptions, maximizeOptions);
  }

  maximize_createClass(Requirement, [{
    key: "maximizeParameters",
    get: function get() {
      return _classPrivateFieldGet(this, _maximizeParameters);
    }
  }, {
    key: "maximizeOptions",
    get: function get() {
      return _classPrivateFieldGet(this, _maximizeOptions);
    }
    /**
     * Merges two requirements, concanating relevant arrays. Typically used in static form.
     * @param other Requirement to merge with.
     */

  }, {
    key: "merge",
    value: function merge(other) {
      var _optionsA$forceEquip, _other$maximizeOption, _optionsA$preventEqui, _other$maximizeOption3, _optionsA$bonusEquip$, _optionsA$bonusEquip, _optionsB$bonusEquip$, _optionsB$bonusEquip, _optionsA$onlySlot, _optionsB$onlySlot, _optionsA$preventSlot, _optionsB$preventSlot;

      var optionsA = this.maximizeOptions;
      var optionsB = other.maximizeOptions;
      return new Requirement([].concat(maximize_toConsumableArray(this.maximizeParameters), maximize_toConsumableArray(other.maximizeParameters)), {
        updateOnFamiliarChange: optionsA.updateOnFamiliarChange || other.maximizeOptions.updateOnFamiliarChange,
        updateOnCanEquipChanged: optionsA.updateOnCanEquipChanged || other.maximizeOptions.updateOnCanEquipChanged,
        forceEquip: [].concat(maximize_toConsumableArray((_optionsA$forceEquip = optionsA.forceEquip) !== null && _optionsA$forceEquip !== void 0 ? _optionsA$forceEquip : []), maximize_toConsumableArray((_other$maximizeOption = other.maximizeOptions.forceEquip) !== null && _other$maximizeOption !== void 0 ? _other$maximizeOption : [])).filter(x => {
          var _other$maximizeOption2;

          return !((_other$maximizeOption2 = other.maximizeOptions.preventEquip) !== null && _other$maximizeOption2 !== void 0 && _other$maximizeOption2.includes(x));
        }),
        preventEquip: [].concat(maximize_toConsumableArray((_optionsA$preventEqui = optionsA.preventEquip) !== null && _optionsA$preventEqui !== void 0 ? _optionsA$preventEqui : []), maximize_toConsumableArray((_other$maximizeOption3 = other.maximizeOptions.preventEquip) !== null && _other$maximizeOption3 !== void 0 ? _other$maximizeOption3 : [])).filter(x => {
          var _other$maximizeOption4;

          return !((_other$maximizeOption4 = other.maximizeOptions.forceEquip) !== null && _other$maximizeOption4 !== void 0 && _other$maximizeOption4.includes(x));
        }),
        bonusEquip: new Map([].concat(maximize_toConsumableArray((_optionsA$bonusEquip$ = (_optionsA$bonusEquip = optionsA.bonusEquip) === null || _optionsA$bonusEquip === void 0 ? void 0 : _optionsA$bonusEquip.entries()) !== null && _optionsA$bonusEquip$ !== void 0 ? _optionsA$bonusEquip$ : []), maximize_toConsumableArray((_optionsB$bonusEquip$ = (_optionsB$bonusEquip = optionsB.bonusEquip) === null || _optionsB$bonusEquip === void 0 ? void 0 : _optionsB$bonusEquip.entries()) !== null && _optionsB$bonusEquip$ !== void 0 ? _optionsB$bonusEquip$ : []))),
        onlySlot: [].concat(maximize_toConsumableArray((_optionsA$onlySlot = optionsA.onlySlot) !== null && _optionsA$onlySlot !== void 0 ? _optionsA$onlySlot : []), maximize_toConsumableArray((_optionsB$onlySlot = optionsB.onlySlot) !== null && _optionsB$onlySlot !== void 0 ? _optionsB$onlySlot : [])),
        preventSlot: [].concat(maximize_toConsumableArray((_optionsA$preventSlot = optionsA.preventSlot) !== null && _optionsA$preventSlot !== void 0 ? _optionsA$preventSlot : []), maximize_toConsumableArray((_optionsB$preventSlot = optionsB.preventSlot) !== null && _optionsB$preventSlot !== void 0 ? _optionsB$preventSlot : [])),
        forceUpdate: optionsA.forceUpdate || optionsB.forceUpdate
      });
    }
    /**
     * Merges a set of requirements together, starting with an empty requirement.
     * @param allRequirements Requirements to merge
     */

  }, {
    key: "maximize",
    value:
    /**
     * Runs maximizeCached, using the maximizeParameters and maximizeOptions contained by this requirement.
     * @returns Whether the maximize call succeeded.
     */
    function maximize() {
      return maximizeCached(this.maximizeParameters, this.maximizeOptions);
    }
    /**
     * Merges requirements, and then runs maximizeCached on the combined requirement.
     * @param requirements Requirements to maximize on
     */

  }], [{
    key: "merge",
    value: function merge(allRequirements) {
      return allRequirements.reduce((x, y) => x.merge(y), new Requirement([], {}));
    }
  }, {
    key: "maximize",
    value: function maximize() {
      for (var _len = arguments.length, requirements = new Array(_len), _key = 0; _key < _len; _key++) {
        requirements[_key] = arguments[_key];
      }

      Requirement.merge(requirements).maximize();
    }
  }]);

  return Requirement;
}();
/**
 * Clear all outfits cached by the maximizer.
 */

function clearMaximizerCache() {
  outfitCache.clear();

  for (var member in cachedObjectives) {
    delete cachedObjectives[member];
  }
}
;// CONCATENATED MODULE: ./node_modules/grimoire-kolmafia/dist/outfit.js
var outfit_templateObject, outfit_templateObject2, outfit_templateObject3, outfit_templateObject4, outfit_templateObject5, outfit_templateObject6, outfit_templateObject7, outfit_templateObject8, outfit_templateObject9, outfit_templateObject10, outfit_templateObject11, outfit_templateObject12, outfit_templateObject13, outfit_templateObject14, outfit_templateObject15, outfit_templateObject16, outfit_templateObject17, outfit_templateObject18, outfit_templateObject19, outfit_templateObject20, outfit_templateObject21, outfit_templateObject22, outfit_templateObject23, outfit_templateObject24, outfit_templateObject25, outfit_templateObject26, outfit_templateObject27, outfit_templateObject28, outfit_templateObject29, outfit_templateObject30;

function outfit_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function outfit_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? outfit_ownKeys(Object(source), !0).forEach(function (key) { outfit_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : outfit_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function outfit_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function outfit_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = outfit_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function outfit_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function outfit_toConsumableArray(arr) { return outfit_arrayWithoutHoles(arr) || outfit_iterableToArray(arr) || outfit_unsupportedIterableToArray(arr) || outfit_nonIterableSpread(); }

function outfit_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function outfit_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return outfit_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return outfit_arrayLikeToArray(o, minLen); }

function outfit_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function outfit_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return outfit_arrayLikeToArray(arr); }

function outfit_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function outfit_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function outfit_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function outfit_createClass(Constructor, protoProps, staticProps) { if (protoProps) outfit_defineProperties(Constructor.prototype, protoProps); if (staticProps) outfit_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var outfitSlots = ["hat", "back", "weapon", "offhand", "shirt", "pants", "acc1", "acc2", "acc3", "famequip"];

var weaponHands = i => i ? (0,external_kolmafia_namespaceObject.weaponHands)(i) : 0;

var outfit_modeableCommands = ["backupcamera", "umbrella", "snowsuit", "edpiece", "retrocape", "parka"];
var Outfit = /*#__PURE__*/function () {
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
      if (!lib_have(item, this.equippedAmount(item) + 1)) return false;
      if ((0,external_kolmafia_namespaceObject.booleanModifier)(item, "Single Equip") && this.equippedAmount(item) > 0) return false;
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
      if (item !== template_string_$item.none) return false;
      if (slot === undefined) return true;
      if (this.equips.has(slot)) return false;
      this.equips.set(slot, item);
      return true;
    }
  }, {
    key: "equipNonAccessory",
    value: function equipNonAccessory(item, slot) {
      if ($slots(outfit_templateObject || (outfit_templateObject = outfit_taggedTemplateLiteral(["acc1, acc2, acc3"]))).includes((0,external_kolmafia_namespaceObject.toSlot)(item))) return false;
      if (slot !== undefined && slot !== (0,external_kolmafia_namespaceObject.toSlot)(item)) return false;
      if (this.equips.has((0,external_kolmafia_namespaceObject.toSlot)(item))) return false;

      switch ((0,external_kolmafia_namespaceObject.toSlot)(item)) {
        case $slot(outfit_templateObject2 || (outfit_templateObject2 = outfit_taggedTemplateLiteral(["off-hand"]))):
          if (this.equips.has($slot(outfit_templateObject3 || (outfit_templateObject3 = outfit_taggedTemplateLiteral(["weapon"])))) && weaponHands(this.equips.get($slot(outfit_templateObject4 || (outfit_templateObject4 = outfit_taggedTemplateLiteral(["weapon"]))))) !== 1) {
            return false;
          }

          break;

        case $slot(outfit_templateObject5 || (outfit_templateObject5 = outfit_taggedTemplateLiteral(["familiar"]))):
          if (this.familiar !== undefined && !(0,external_kolmafia_namespaceObject.canEquip)(this.familiar, item)) return false;
      }

      if ((0,external_kolmafia_namespaceObject.toSlot)(item) !== $slot(outfit_templateObject6 || (outfit_templateObject6 = outfit_taggedTemplateLiteral(["familiar"]))) && !(0,external_kolmafia_namespaceObject.canEquip)(item)) return false;
      this.equips.set((0,external_kolmafia_namespaceObject.toSlot)(item), item);
      return true;
    }
  }, {
    key: "equipAccessory",
    value: function equipAccessory(item, slot) {
      if (![undefined].concat(outfit_toConsumableArray($slots(outfit_templateObject7 || (outfit_templateObject7 = outfit_taggedTemplateLiteral(["acc1, acc2, acc3"]))))).includes(slot)) return false;
      if ((0,external_kolmafia_namespaceObject.toSlot)(item) !== $slot(outfit_templateObject8 || (outfit_templateObject8 = outfit_taggedTemplateLiteral(["acc1"])))) return false;
      if (!(0,external_kolmafia_namespaceObject.canEquip)(item)) return false;

      if (slot === undefined) {
        // We don't care which of the accessory slots we equip in
        var empty = $slots(outfit_templateObject9 || (outfit_templateObject9 = outfit_taggedTemplateLiteral(["acc1, acc2, acc3"]))).find(s => !this.equips.has(s));
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
      if (![undefined, $slot(outfit_templateObject10 || (outfit_templateObject10 = outfit_taggedTemplateLiteral(["off-hand"])))].includes(slot)) return false;
      if ((0,external_kolmafia_namespaceObject.toSlot)(item) !== $slot(outfit_templateObject11 || (outfit_templateObject11 = outfit_taggedTemplateLiteral(["weapon"])))) return false;

      if (this.equips.has($slot(outfit_templateObject12 || (outfit_templateObject12 = outfit_taggedTemplateLiteral(["weapon"])))) && weaponHands(this.equips.get($slot(outfit_templateObject13 || (outfit_templateObject13 = outfit_taggedTemplateLiteral(["weapon"]))))) !== 1) {
        return false;
      }

      if (this.equips.has($slot(outfit_templateObject14 || (outfit_templateObject14 = outfit_taggedTemplateLiteral(["off-hand"]))))) return false;
      if (!lib_have($skill(outfit_templateObject15 || (outfit_templateObject15 = outfit_taggedTemplateLiteral(["Double-Fisted Skull Smashing"]))))) return false;
      if (weaponHands(item) !== 1) return false;
      if (!(0,external_kolmafia_namespaceObject.canEquip)(item)) return false;
      this.equips.set($slot(outfit_templateObject16 || (outfit_templateObject16 = outfit_taggedTemplateLiteral(["off-hand"]))), item);
      return true;
    }
  }, {
    key: "getHoldingFamiliar",
    value: function getHoldingFamiliar(item) {
      switch ((0,external_kolmafia_namespaceObject.toSlot)(item)) {
        case $slot(outfit_templateObject17 || (outfit_templateObject17 = outfit_taggedTemplateLiteral(["weapon"]))):
          return template_string_$familiar(outfit_templateObject18 || (outfit_templateObject18 = outfit_taggedTemplateLiteral(["Disembodied Hand"])));

        case $slot(outfit_templateObject19 || (outfit_templateObject19 = outfit_taggedTemplateLiteral(["off-hand"]))):
          return template_string_$familiar(outfit_templateObject20 || (outfit_templateObject20 = outfit_taggedTemplateLiteral(["Left-Hand Man"])));

        default:
          return undefined;
      }
    }
  }, {
    key: "equipUsingFamiliar",
    value: function equipUsingFamiliar(item, slot) {
      if (![undefined, $slot(outfit_templateObject21 || (outfit_templateObject21 = outfit_taggedTemplateLiteral(["familiar"])))].includes(slot)) return false;
      if (this.equips.has($slot(outfit_templateObject22 || (outfit_templateObject22 = outfit_taggedTemplateLiteral(["familiar"]))))) return false;
      if ((0,external_kolmafia_namespaceObject.booleanModifier)(item, "Single Equip")) return false;
      var familiar = this.getHoldingFamiliar(item);
      if (familiar === undefined || !this.equip(familiar)) return false;
      this.equips.set($slot(outfit_templateObject23 || (outfit_templateObject23 = outfit_taggedTemplateLiteral(["familiar"]))), item);
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
      if (familiar !== template_string_$familiar.none && !lib_have(familiar)) return false;
      var item = this.equips.get($slot(outfit_templateObject24 || (outfit_templateObject24 = outfit_taggedTemplateLiteral(["familiar"]))));
      if (item !== undefined && item !== template_string_$item.none && !(0,external_kolmafia_namespaceObject.canEquip)(familiar, item)) return false;
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
          var slot = (_a = new Map([["famequip", $slot(outfit_templateObject25 || (outfit_templateObject25 = outfit_taggedTemplateLiteral(["familiar"])))], ["offhand", $slot(outfit_templateObject26 || (outfit_templateObject26 = outfit_taggedTemplateLiteral(["off-hand"])))]]).get(slotName)) !== null && _a !== void 0 ? _a : (0,external_kolmafia_namespaceObject.toSlot)(slotName);
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

      if (thing instanceof external_kolmafia_namespaceObject.Item) return this.equipItem(thing, slot);
      if (thing instanceof external_kolmafia_namespaceObject.Familiar) return this.equipFamiliar(thing);
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

      var _iterator3 = outfit_createForOfIteratorHelper(outfit_modeableCommands),
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
      if (this.familiar) (0,external_kolmafia_namespaceObject.useFamiliar)(this.familiar);
      var targetEquipment = Array.from(this.equips.values());
      var usedSlots = new Set(); // First, we equip non-accessory equipment.

      var nonaccessorySlots = $slots(outfit_templateObject27 || (outfit_templateObject27 = outfit_taggedTemplateLiteral(["weapon, off-hand, hat, back, shirt, pants, familiar, buddy-bjorn, crown-of-thrones"]))); // We must manually remove equipment that we want to use in a different
      // slot than where it is currently equipped, to avoid a mafia issue.
      // Order is anchored here to prevent DFSS shenanigans

      var _iterator4 = outfit_createForOfIteratorHelper(nonaccessorySlots),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var slot = _step4.value;
          if (targetEquipment.includes((0,external_kolmafia_namespaceObject.equippedItem)(slot)) && this.equips.get(slot) !== (0,external_kolmafia_namespaceObject.equippedItem)(slot) || this.avoid.includes((0,external_kolmafia_namespaceObject.equippedItem)(slot))) (0,external_kolmafia_namespaceObject.equip)(slot, template_string_$item.none);
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
            (0,external_kolmafia_namespaceObject.equip)(_slot, equipment);
            usedSlots.add(_slot);
          }
        } // Next, we equip accessories

      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      var accessorySlots = $slots(outfit_templateObject28 || (outfit_templateObject28 = outfit_taggedTemplateLiteral(["acc1, acc2, acc3"])));
      var accessoryEquips = accessorySlots.map(slot => this.equips.get(slot)).filter(item => item !== undefined); // To plan how to equip accessories, first check which accessories are
      // already equipped in some accessory slot. There is no need to move them,
      // since KoL doesn't care what order accessories are equipped in.

      var missingAccessories = []; // accessories that are not already equipped

      var _iterator6 = outfit_createForOfIteratorHelper(accessoryEquips),
          _step6;

      try {
        var _loop = function _loop() {
          var accessory = _step6.value;
          var alreadyEquipped = accessorySlots.find(slot => !usedSlots.has(slot) && (0,external_kolmafia_namespaceObject.equippedItem)(slot) === accessory);

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

        (0,external_kolmafia_namespaceObject.equip)(unusedSlot, accessory);
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

        (0,external_kolmafia_namespaceObject.logprint)("Maximize: ".concat(this.modifier));
      } // Set the modes of any equipped items.


      applyModes(modes); // Verify that all equipment was indeed equipped

      if (this.familiar !== undefined && (0,external_kolmafia_namespaceObject.myFamiliar)() !== this.familiar) throw "Failed to fully dress (expected: familiar ".concat(this.familiar, ")");

      var _iterator7 = outfit_createForOfIteratorHelper(nonaccessorySlots),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var _slot2 = _step7.value;

          if (this.equips.has(_slot2) && (0,external_kolmafia_namespaceObject.equippedItem)(_slot2) !== this.equips.get(_slot2)) {
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

          if ((0,external_kolmafia_namespaceObject.equippedAmount)(accessory) < accessoryEquips.filter(acc => acc === accessory).length) {
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
          result[slotName] = this.equips.get((_a = new Map([["famequip", $slot(outfit_templateObject29 || (outfit_templateObject29 = outfit_taggedTemplateLiteral(["familiar"])))], ["offhand", $slot(outfit_templateObject30 || (outfit_templateObject30 = outfit_taggedTemplateLiteral(["off-hand"])))]]).get(slotName)) !== null && _a !== void 0 ? _a : (0,external_kolmafia_namespaceObject.toSlot)(slotName));
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
}();
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

function outfit_getCurrentModes() {
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
var Engine = /*#__PURE__*/function () {
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
      (0,external_kolmafia_namespaceObject.setAutoAttack)(0);
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

      (0,external_kolmafia_namespaceObject.print)("");
      (0,external_kolmafia_namespaceObject.print)("Executing ".concat(task.name), "blue"); // Determine the proper postcondition for after the task executes.

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
        _set("lastEncounter", "");
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
          var num_have = (0,external_kolmafia_namespaceObject.itemAmount)(to_get.item) + (0,external_kolmafia_namespaceObject.equippedAmount)(to_get.item);
          if (num_needed <= num_have) continue;
          if (to_get.useful !== undefined && !to_get.useful()) continue;

          if (to_get.get) {
            to_get.get();
          } else if (to_get.price !== undefined) {
            (0,external_kolmafia_namespaceObject.buy)(to_get.item, num_needed - num_have, to_get.price);
          } else if (Object.keys((0,external_kolmafia_namespaceObject.getRelated)(to_get.item, "fold")).length > 0) {
            (0,external_kolmafia_namespaceObject.cliExecute)("fold ".concat(to_get.item));
          } else {
            (0,external_kolmafia_namespaceObject.retrieveItem)(to_get.item, num_needed);
          }

          if ((0,external_kolmafia_namespaceObject.itemAmount)(to_get.item) + (0,external_kolmafia_namespaceObject.equippedAmount)(to_get.item) < num_needed && !to_get.optional) {
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
      var extraSongs = Object.keys((0,external_kolmafia_namespaceObject.myEffects)()).map(effectName => (0,external_kolmafia_namespaceObject.toEffect)(effectName)).filter(effect => isSong(effect) && !songs.includes(effect));

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
      if (task.do instanceof external_kolmafia_namespaceObject.Location) (0,external_kolmafia_namespaceObject.setLocation)(task.do);
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


      var macro = task_combat.compile(task_resources, (_a = this.options) === null || _a === void 0 ? void 0 : _a.combat_defaults, task.do instanceof external_kolmafia_namespaceObject.Location ? task.do : undefined);
      macro.save();

      if (!this.options.ccs) {
        // Use the macro through a CCS file
        var otherCCSEntries = task_combat.compileCcs();
        var ccsContents = ["[default]", "\"".concat(macro.toString(), "\"")].concat(engine_toConsumableArray(otherCCSEntries)).join("\n"); // Log Macro + other CCS

        (0,external_kolmafia_namespaceObject.logprint)("CCS: ".concat(ccsContents.replace("\n", "\\n ")));

        if (ccsContents !== this.cachedCcsContents) {
          (0,external_kolmafia_namespaceObject.writeCcs)(ccsContents, grimoireCCS);
          (0,external_kolmafia_namespaceObject.cliExecute)("ccs ".concat(grimoireCCS)); // force Mafia to reparse the ccs

          this.cachedCcsContents = ccsContents;
        }
      } // Save autoattack combat macro


      var autoattack = task_combat.compileAutoattack();

      if (autoattack.toString().length > 1) {
        (0,external_kolmafia_namespaceObject.logprint)("Autoattack macro: ".concat(autoattack.toString()));
        autoattack.setAutoAttack();
      } else {
        (0,external_kolmafia_namespaceObject.setAutoAttack)(0);
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
        (0,external_kolmafia_namespaceObject.adv1)(task.do, 0, "");
      }

      (0,external_kolmafia_namespaceObject.runCombat)();

      while ((0,external_kolmafia_namespaceObject.inMultiFight)()) {
        (0,external_kolmafia_namespaceObject.runCombat)();
      }

      if ((0,external_kolmafia_namespaceObject.choiceFollowsFight)()) (0,external_kolmafia_namespaceObject.runChoice)(-1);
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
      return task.do instanceof external_kolmafia_namespaceObject.Location && lastEncounterWasWanderingNC();
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
        if (task.limit.turns && task.do instanceof external_kolmafia_namespaceObject.Location && task.do.turnsSpent >= task.limit.turns) throw "Task ".concat(task.name, " did not complete within ").concat(task.limit.turns, " turns. Please check what went wrong.").concat(failureMessage);
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
        logPreferenceChangeFilter: engine_toConsumableArray(new Set([].concat(engine_toConsumableArray(property_get("logPreferenceChangeFilter").split(",")), ["libram_savedMacro", "maximizerMRUList", "testudinalTeachings", "_lastCombatStarted"]))).sort().filter(a => a).join(","),
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
        if (this.options.ccs === undefined && (0,external_kolmafia_namespaceObject.readCcs)(grimoireCCS) === "") {
          // Write a simple CCS so we can switch to it
          (0,external_kolmafia_namespaceObject.writeCcs)("[ default ]\nabort", grimoireCCS);
        }

        manager.set({
          customCombatScript: (_a = this.options.ccs) !== null && _a !== void 0 ? _a : grimoireCCS
        });
      }
    }
  }]);

  return Engine;
}();
function maxSongs() {
  return lib_have($skill(engine_templateObject || (engine_templateObject = engine_taggedTemplateLiteral(["Mariachi Memory"])))) ? 4 : 3;
}
var wanderingNCs = new Set(["Wooof! Wooooooof!", "Playing Fetch*", "A Pound of Cure", "Aunts not Ants", "Bath Time", "Beware of Aligator", "Delicious Sprouts", "Hypnotic Master", "Lost and Found", "Poetic Justice", "Summer Days", "Teacher's Pet"]);
/**
 * Return true if the last adv was one of:
 *   1. Halloweener dog noncombats,
 *   2. June cleaver noncombats, or
 *   3. Lil' Doctor™ bag noncombt.
 */

function lastEncounterWasWanderingNC() {
  return wanderingNCs.has(property_get("lastEncounter"));
}
;// CONCATENATED MODULE: ./node_modules/grimoire-kolmafia/dist/route.js
function route_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function route_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? route_ownKeys(Object(source), !0).forEach(function (key) { route_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : route_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function route_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function route_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = route_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function route_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return route_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return route_arrayLikeToArray(o, minLen); }

function route_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Extract a list of tasks from the provided quests.
 *
 * Each task name is prepended with the quest name ("Quest Name/Task Name").
 * The quest-local names referred to in task.after are updated appropriately.
 * The task completion condition is updated to include the quest completion.
 *
 * Tasks are returned in-order: all tasks from the first quest, then all tasks
 * from the second quest, etc.
 *
 * @param quests The list of quests. This method does not modify the quest
 *    objects or their tasks.
 * @param implicitAfter If true, each task with task.after = undefined will
 *    have a dependency added on the previous task in the list.
 * @returns A list of tasks from the input quests (with updated properties).
 */
function getTasks(quests) {
  var implicitAfter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var _a, _b;

  var result = [];

  var _iterator = route_createForOfIteratorHelper(quests),
      _step;

  try {
    var _loop = function _loop() {
      var quest = _step.value;
      var questCompleted = quest.completed;

      var _iterator3 = route_createForOfIteratorHelper(quest.tasks),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _task2 = _step3.value;

          // Include quest name in task names and dependencies (unless dependency quest is given)
          var renamedTask = route_objectSpread({}, _task2);

          renamedTask.name = "".concat(quest.name, "/").concat(_task2.name);
          renamedTask.after = (_a = _task2.after) === null || _a === void 0 ? void 0 : _a.map(after => after.includes("/") ? after : "".concat(quest.name, "/").concat(after)); // Include previous task as a dependency

          if (implicitAfter && _task2.after === undefined && result.length > 0) renamedTask.after = [result[result.length - 1].name]; // Include quest completion in task completion

          if (questCompleted !== undefined) {
            (function () {
              var taskCompleted = _task2.completed;

              renamedTask.completed = () => questCompleted() || taskCompleted();
            })();
          }

          result.push(renamedTask);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    };

    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    } // Verify the dependency names of all tasks

  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var names = new Set();

  for (var _i = 0, _result = result; _i < _result.length; _i++) {
    var task = _result[_i];
    names.add(task.name);
  }

  for (var _i2 = 0, _result2 = result; _i2 < _result2.length; _i2++) {
    var _task = _result2[_i2];

    var _iterator2 = route_createForOfIteratorHelper((_b = _task.after) !== null && _b !== void 0 ? _b : []),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var after = _step2.value;

        if (!names.has(after)) {
          throw "Unknown task dependency ".concat(after, " of ").concat(_task.name);
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }

  return result;
}
function orderByRoute(tasks, routing, ignore_missing_tasks) {
  var priorities = new Map();

  var _iterator4 = route_createForOfIteratorHelper(tasks),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var task = _step4.value;
      priorities.set(task.name, [1000, task]);
    } // Prioritize the routing list of tasks first

  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }

  function setPriorityRecursive(task, priority) {
    var _a;

    var old_priority = priorities.get(task);

    if (old_priority === undefined) {
      if (ignore_missing_tasks) return;
      throw "Unknown routing task ".concat(task);
    }

    if (old_priority[0] <= priority) return;
    priorities.set(task, [priority, old_priority[1]]);

    var _iterator5 = route_createForOfIteratorHelper((_a = old_priority[1].after) !== null && _a !== void 0 ? _a : []),
        _step5;

    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var requirement = _step5.value;
        setPriorityRecursive(requirement, priority - 0.01);
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
  }

  for (var i = 0; i < routing.length; i++) {
    setPriorityRecursive(routing[i], i);
  } // Sort all tasks by priority.
  // Since this sort is stable, we default to earlier tasks.


  var result = tasks.slice();
  result.sort((a, b) => (priorities.get(a.name) || [1000])[0] - (priorities.get(b.name) || [1000])[0]);
  return result;
}
;// CONCATENATED MODULE: ./node_modules/grimoire-kolmafia/dist/task.js

/**
 * Returns the state of a quest as a numeric value as follows:
 *   "unstarted" => -1
 *   "started" => 0
 *   "stepNUM" => NUM
 *   "finished" => 999
 */

function step(questName) {
  var stringStep = property_get(questName);
  if (stringStep === "unstarted") return -1;else if (stringStep === "started") return 0;else if (stringStep === "finished") return 999;else {
    if (stringStep.substring(0, 4) !== "step") {
      throw "Quest state parsing error.";
    }

    return parseInt(stringStep.substring(4), 10);
  }
}
;// CONCATENATED MODULE: ./node_modules/grimoire-kolmafia/dist/index.js







// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.values.js
var es_object_values = __webpack_require__(9628);
;// CONCATENATED MODULE: ./node_modules/libram/dist/resources/2017/AsdonMartin.js
var AsdonMartin_templateObject, AsdonMartin_templateObject2, AsdonMartin_templateObject3, AsdonMartin_templateObject4, AsdonMartin_templateObject5, AsdonMartin_templateObject6, AsdonMartin_templateObject7, AsdonMartin_templateObject8, AsdonMartin_templateObject9, AsdonMartin_templateObject10, AsdonMartin_templateObject11, AsdonMartin_templateObject12, AsdonMartin_templateObject13;

function AsdonMartin_slicedToArray(arr, i) { return AsdonMartin_arrayWithHoles(arr) || AsdonMartin_iterableToArrayLimit(arr, i) || AsdonMartin_unsupportedIterableToArray(arr, i) || AsdonMartin_nonIterableRest(); }

function AsdonMartin_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function AsdonMartin_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return AsdonMartin_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return AsdonMartin_arrayLikeToArray(o, minLen); }

function AsdonMartin_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function AsdonMartin_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function AsdonMartin_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function AsdonMartin_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }






var PriceAge;

(function (PriceAge) {
  PriceAge[PriceAge["HISTORICAL"] = 0] = "HISTORICAL";
  PriceAge[PriceAge["RECENT"] = 1] = "RECENT";
  PriceAge[PriceAge["TODAY"] = 2] = "TODAY";
})(PriceAge || (PriceAge = {}));
/**
 * Returns whether or not we have the Asdon installed in the workshed at present.
 */


function installed() {
  return (0,external_kolmafia_namespaceObject.getWorkshed)() === template_string_$item(AsdonMartin_templateObject || (AsdonMartin_templateObject = AsdonMartin_taggedTemplateLiteral(["Asdon Martin keyfob"])));
}
/**
 * Returns true if we have the Asdon or if it's installed.
 */

function AsdonMartin_have() {
  return installed() || haveItem($item(AsdonMartin_templateObject2 || (AsdonMartin_templateObject2 = AsdonMartin_taggedTemplateLiteral(["Asdon Martin keyfob"]))));
}
var fuelSkiplist = template_string_$items(AsdonMartin_templateObject3 || (AsdonMartin_templateObject3 = AsdonMartin_taggedTemplateLiteral(["cup of \"tea\", thermos of \"whiskey\", Lucky Lindy, Bee's Knees, Sockdollager, Ish Kabibble, Hot Socks, Phonus Balonus, Flivver, Sloppy Jalopy, glass of \"milk\""])));

function priceTooOld(item) {
  return (0,external_kolmafia_namespaceObject.historicalPrice)(item) === 0 || (0,external_kolmafia_namespaceObject.historicalAge)(item) >= 7;
} // Return mall max if historicalPrice returns -1.


function historicalPriceOrMax(item) {
  var historical = (0,external_kolmafia_namespaceObject.historicalPrice)(item);
  return historical < 0 ? 999999999 : historical;
} // Return mall max if mallPrice returns -1.


function mallPriceOrMax(item) {
  var mall = (0,external_kolmafia_namespaceObject.mallPrice)(item);
  return mall < 0 ? 999999999 : mall;
}

function price(item, priceAge) {
  switch (priceAge) {
    case PriceAge.HISTORICAL:
      {
        var historical = historicalPriceOrMax(item);
        return historical === 0 ? mallPriceOrMax(item) : historical;
      }

    case PriceAge.RECENT:
      return priceTooOld(item) ? mallPriceOrMax(item) : historicalPriceOrMax(item);

    case PriceAge.TODAY:
      return mallPriceOrMax(item);
  }
}

function inventoryItems() {
  return external_kolmafia_namespaceObject.Item.all().filter(isFuelItem).filter(item => lib_have(item) && [100, (0,external_kolmafia_namespaceObject.autosellPrice)(item)].includes(price(item, PriceAge.RECENT)));
} // Efficiency in meat per fuel.


function calculateFuelUnitCost(it) {
  var priceAge = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : PriceAge.RECENT;
  var units = getAverageAdventures(it);
  return price(it, priceAge) / units;
}

function isFuelItem(it) {
  return !(0,external_kolmafia_namespaceObject.isNpcItem)(it) && it.fullness + it.inebriety > 0 && getAverageAdventures(it) > 0 && it.tradeable && it.discardable && !fuelSkiplist.includes(it);
}

function getBestFuels() {
  // Three stages.
  // 1. Filter to reasonable items using historical cost (within 5x of historical best).
  var allFuel = external_kolmafia_namespaceObject.Item.all().filter(isFuelItem);

  if (allFuel.filter(item => (0,external_kolmafia_namespaceObject.historicalPrice)(item) === 0).length > 100) {
    (0,external_kolmafia_namespaceObject.mallPrices)("food");
    (0,external_kolmafia_namespaceObject.mallPrices)("booze");
  }

  var keyHistorical = item => calculateFuelUnitCost(item, PriceAge.HISTORICAL);

  allFuel.sort((x, y) => keyHistorical(x) - keyHistorical(y));
  var bestUnitCost = keyHistorical(allFuel[0]);
  var firstBadIndex = allFuel.findIndex(item => keyHistorical(item) > 5 * bestUnitCost);
  var potentialFuel = firstBadIndex > 0 ? allFuel.slice(0, firstBadIndex) : allFuel; // 2. Filter to top 10 candidates using prices at most a week old.

  if (potentialFuel.filter(item => priceTooOld(item)).length > 100) {
    (0,external_kolmafia_namespaceObject.mallPrices)("food");
    (0,external_kolmafia_namespaceObject.mallPrices)("booze");
  }

  var key1 = item => -getAverageAdventures(item);

  var key2 = item => calculateFuelUnitCost(item, PriceAge.RECENT);

  potentialFuel.sort((x, y) => key1(x) - key1(y));
  potentialFuel.sort((x, y) => key2(x) - key2(y)); // 3. Find result using precise price for those top candidates.

  var candidates = potentialFuel.slice(0, 10);

  var key3 = item => calculateFuelUnitCost(item, PriceAge.TODAY);

  candidates.sort((x, y) => key3(x) - key3(y));

  if (calculateFuelUnitCost(candidates[0], PriceAge.TODAY) > 100) {
    throw new Error("Could not identify any fuel with efficiency better than 100 meat per fuel. " + "This means something went wrong.");
  }

  return candidates;
}
/**
 * Fuel your Asdon Martin with a given quantity of a given item
 * @param it Item to fuel with.
 * @param quantity Number of items to fuel with.
 * @returns Whether we succeeded at fueling with the given items.
 */


function insertFuel(it) {
  var quantity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var result = (0,external_kolmafia_namespaceObject.visitUrl)("campground.php?action=fuelconvertor&pwd&qty=".concat(quantity, "&iid=").concat((0,external_kolmafia_namespaceObject.toInt)(it), "&go=Convert%21"));
  return result.includes("The display updates with a");
}
/**
 * Fill your Asdon Martin to the given fuel level in the cheapest way possible
 * @param targetUnits Fuel level to attempt to reach.
 * @returns Whether we succeeded at filling to the target fuel level.
 */

function fillTo(targetUnits) {
  if (!installed()) return false;

  while ((0,external_kolmafia_namespaceObject.getFuel)() < targetUnits) {
    // if in Hardcore/ronin, skip the price calculation and just use soda bread
    var _ref = (0,external_kolmafia_namespaceObject.canInteract)() ? getBestFuels() : [template_string_$item(AsdonMartin_templateObject4 || (AsdonMartin_templateObject4 = AsdonMartin_taggedTemplateLiteral(["loaf of soda bread"]))), undefined],
        _ref2 = AsdonMartin_slicedToArray(_ref, 2),
        bestFuel = _ref2[0],
        secondBest = _ref2[1];

    var count = Math.ceil(targetUnits / getAverageAdventures(bestFuel));
    var ceiling = undefined;

    if (secondBest) {
      var efficiencyOfSecondBest = (0,external_kolmafia_namespaceObject.mallPrice)(secondBest) / getAverageAdventures(secondBest);
      ceiling = Math.ceil(efficiencyOfSecondBest * getAverageAdventures(bestFuel));
    }

    if (!(0,external_kolmafia_namespaceObject.canInteract)()) (0,external_kolmafia_namespaceObject.retrieveItem)(count, bestFuel);else ceiling ? (0,external_kolmafia_namespaceObject.buy)(count, bestFuel, ceiling) : (0,external_kolmafia_namespaceObject.buy)(count, bestFuel);

    if (!insertFuel(bestFuel, Math.min((0,external_kolmafia_namespaceObject.itemAmount)(bestFuel), count))) {
      throw new Error("Failed to fuel Asdon Martin.");
    }
  }

  return (0,external_kolmafia_namespaceObject.getFuel)() >= targetUnits;
}

function fillWithBestInventoryItem(targetUnits) {
  var options = inventoryItems().sort((a, b) => getAverageAdventures(b) / (0,external_kolmafia_namespaceObject.autosellPrice)(b) - getAverageAdventures(a) / (0,external_kolmafia_namespaceObject.autosellPrice)(a));
  if (options.length === 0) return false;
  var best = options[0];
  if ((0,external_kolmafia_namespaceObject.autosellPrice)(best) / getAverageAdventures(best) > 100) return false;
  var amountToUse = utils_clamp(Math.ceil(targetUnits / getAverageAdventures(best)), 0, (0,external_kolmafia_namespaceObject.itemAmount)(best));
  return insertFuel(best, amountToUse);
}
/**
 * Fill your Asdon Martin by prioritizing mallmin items in your inventory. Default to the behavior of fillTo.
 * @param targetUnits Fuel level to attempt to reach.
 * @returns Whether we succeeded at filling to the target fuel level.
 */


function fillWithInventoryTo(targetUnits) {
  if (!installed()) return false;
  var continueFuelingFromInventory = true;

  while ((0,external_kolmafia_namespaceObject.getFuel)() < targetUnits && continueFuelingFromInventory) {
    continueFuelingFromInventory && (continueFuelingFromInventory = fillWithBestInventoryItem(targetUnits));
  }

  return fillTo(targetUnits);
}
/**
 * Object consisting of the various Asdon driving styles
 */

var Driving = {
  Obnoxiously: $effect(AsdonMartin_templateObject5 || (AsdonMartin_templateObject5 = AsdonMartin_taggedTemplateLiteral(["Driving Obnoxiously"]))),
  Stealthily: $effect(AsdonMartin_templateObject6 || (AsdonMartin_templateObject6 = AsdonMartin_taggedTemplateLiteral(["Driving Stealthily"]))),
  Wastefully: $effect(AsdonMartin_templateObject7 || (AsdonMartin_templateObject7 = AsdonMartin_taggedTemplateLiteral(["Driving Wastefully"]))),
  Safely: $effect(AsdonMartin_templateObject8 || (AsdonMartin_templateObject8 = AsdonMartin_taggedTemplateLiteral(["Driving Safely"]))),
  Recklessly: $effect(AsdonMartin_templateObject9 || (AsdonMartin_templateObject9 = AsdonMartin_taggedTemplateLiteral(["Driving Recklessly"]))),
  Intimidatingly: $effect(AsdonMartin_templateObject10 || (AsdonMartin_templateObject10 = AsdonMartin_taggedTemplateLiteral(["Driving Intimidatingly"]))),
  Quickly: $effect(AsdonMartin_templateObject11 || (AsdonMartin_templateObject11 = AsdonMartin_taggedTemplateLiteral(["Driving Quickly"]))),
  Observantly: $effect(AsdonMartin_templateObject12 || (AsdonMartin_templateObject12 = AsdonMartin_taggedTemplateLiteral(["Driving Observantly"]))),
  Waterproofly: $effect(AsdonMartin_templateObject13 || (AsdonMartin_templateObject13 = AsdonMartin_taggedTemplateLiteral(["Driving Waterproofly"])))
};
/**
 * Attempt to drive with a particular style for a particular number of turns.
 * @param style The driving style to use.
 * @param turns The number of turns to attempt to get.
 * @param preferInventory Whether we should preferentially value items currently in our inventory.
 * @returns Whether we have at least as many turns as requested of said driving style.
 */

function drive(style) {
  var turns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var preferInventory = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (!Object.values(Driving).includes(style)) return false;
  if (!installed()) return false;
  if ((0,external_kolmafia_namespaceObject.haveEffect)(style) >= turns) return true;
  var fuelNeeded = 37 * Math.ceil((turns - (0,external_kolmafia_namespaceObject.haveEffect)(style)) / 30);
  (preferInventory ? fillWithInventoryTo : fillTo)(fuelNeeded);

  while ((0,external_kolmafia_namespaceObject.getFuel)() >= 37 && (0,external_kolmafia_namespaceObject.haveEffect)(style) < turns) {
    (0,external_kolmafia_namespaceObject.cliExecute)("asdonmartin drive ".concat(style.name.replace("Driving ", "")));
  }

  return (0,external_kolmafia_namespaceObject.haveEffect)(style) >= turns;
}
;// CONCATENATED MODULE: ./node_modules/libram/dist/modifierTypes.js
// THIS FILE IS AUTOMATICALLY GENERATED. See tools/parseModifiers.ts for more information
var modifierTypes_booleanModifiers = ["Softcore Only", "Single Equip", "Never Fumble", "Weakens Monster", "Free Pull", "Variable", "Nonstackable Watch", "Cold Immunity", "Hot Immunity", "Sleaze Immunity", "Spooky Immunity", "Stench Immunity", "Cold Vulnerability", "Hot Vulnerability", "Sleaze Vulnerability", "Spooky Vulnerability", "Stench Vulnerability", "Moxie Controls MP", "Moxie May Control MP", "Four Songs", "Adventure Underwater", "Underwater Familiar", "Generic", "Unarmed", "No Pull", "Lasts Until Rollover", "Attacks Can't Miss", "Pirate", "Breakable", "Drops Items", "Drops Meat"];
var classModifiers = ["Class"];
var modifierTypes_numericModifiers = ["Familiar Weight", "Monster Level", "Combat Rate", "Initiative", "Experience", "Item Drop", "Meat Drop", "Damage Absorption", "Damage Reduction", "Cold Resistance", "Hot Resistance", "Sleaze Resistance", "Spooky Resistance", "Stench Resistance", "Mana Cost", "Moxie", "Moxie Percent", "Muscle", "Muscle Percent", "Mysticality", "Mysticality Percent", "Maximum HP", "Maximum HP Percent", "Maximum MP", "Maximum MP Percent", "Weapon Damage", "Ranged Damage", "Spell Damage", "Spell Damage Percent", "Cold Damage", "Hot Damage", "Sleaze Damage", "Spooky Damage", "Stench Damage", "Cold Spell Damage", "Hot Spell Damage", "Sleaze Spell Damage", "Spooky Spell Damage", "Stench Spell Damage", "Underwater Combat Rate", "Fumble", "HP Regen Min", "HP Regen Max", "MP Regen Min", "MP Regen Max", "Adventures", "Familiar Weight Percent", "Weapon Damage Percent", "Ranged Damage Percent", "Stackable Mana Cost", "Hobo Power", "Base Resting HP", "Resting HP Percent", "Bonus Resting HP", "Base Resting MP", "Resting MP Percent", "Bonus Resting MP", "Critical Hit Percent", "PvP Fights", "Volleyball", "Sombrero", "Leprechaun", "Fairy", "Meat Drop Penalty", "Hidden Familiar Weight", "Item Drop Penalty", "Initiative Penalty", "Food Drop", "Booze Drop", "Hat Drop", "Weapon Drop", "Offhand Drop", "Shirt Drop", "Pants Drop", "Accessory Drop", "Volleyball Effectiveness", "Sombrero Effectiveness", "Leprechaun Effectiveness", "Fairy Effectiveness", "Familiar Weight Cap", "Slime Resistance", "Slime Hates It", "Spell Critical Percent", "Muscle Experience", "Mysticality Experience", "Moxie Experience", "Effect Duration", "Candy Drop", "DB Combat Damage", "Sombrero Bonus", "Familiar Experience", "Sporadic Meat Drop", "Sporadic Item Drop", "Meat Bonus", "Pickpocket Chance", "Combat Mana Cost", "Muscle Experience Percent", "Mysticality Experience Percent", "Moxie Experience Percent", "Minstrel Level", "Muscle Limit", "Mysticality Limit", "Moxie Limit", "Song Duration", "Prismatic Damage", "Smithsness", "Supercold Resistance", "Reduce Enemy Defense", "Pool Skill", "Surgeonosity", "Familiar Damage", "Gear Drop", "Maximum Hooch", "Water Level", "Crimbot Outfit Power", "Familiar Tuning Muscle", "Familiar Tuning Mysticality", "Familiar Tuning Moxie", "Random Monster Modifiers", "Luck", "Othello Skill", "Disco Style", "Rollover Effect Duration", "Sixgun Damage", "Fishing Skill", "Additional Song", "Sprinkle Drop", "Absorb Adventures", "Absorb Stats", "Rubee Drop", "Kruegerand Drop", "WarBear Armor Penetration", "Clowniness", "Maximum PP", "Plumber Power", "Drippy Damage", "Drippy Resistance", "Energy", "Scrap", "Familiar Action Bonus", "Water"];
var effectModifiers = ["Effect", "Rollover Effect"];
var monsterModifiers = ["Avatar"];
var skillModifiers = ["Skill"];
var statModifiers = ["Plumber Stat"];
var stringModifiers = ["Intrinsic Effect", "Equalize", "Wiki Name", "Modifiers", "Outfit", "Stat Tuning", "Equips On", "Familiar Effect", "Jiggle", "Equalize Muscle", "Equalize Mysticality", "Equalize Moxie", "Floor Buffed Muscle", "Floor Buffed Mysticality", "Floor Buffed Moxie"];
;// CONCATENATED MODULE: ./node_modules/libram/dist/modifier.js
function modifier_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function modifier_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? modifier_ownKeys(Object(source), !0).forEach(function (key) { modifier_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : modifier_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function modifier_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





function modifier_get(name, subject) {
  if (utils_arrayContains(name, modifierTypes_booleanModifiers)) {
    return subject === undefined ? (0,external_kolmafia_namespaceObject.booleanModifier)(name) : (0,external_kolmafia_namespaceObject.booleanModifier)(subject, name);
  }

  if (utils_arrayContains(name, classModifiers)) {
    return (0,external_kolmafia_namespaceObject.classModifier)(subject, name);
  }

  if (utils_arrayContains(name, effectModifiers)) {
    return (0,external_kolmafia_namespaceObject.effectModifier)(subject, name);
  }

  if (utils_arrayContains(name, monsterModifiers)) {
    return (0,external_kolmafia_namespaceObject.monsterModifier)(subject, name);
  }

  if (utils_arrayContains(name, modifierTypes_numericModifiers)) {
    return subject === undefined ? (0,external_kolmafia_namespaceObject.numericModifier)(name) : (0,external_kolmafia_namespaceObject.numericModifier)(subject, name);
  }

  if (utils_arrayContains(name, skillModifiers)) {
    return (0,external_kolmafia_namespaceObject.skillModifier)(subject, name);
  }

  if (utils_arrayContains(name, stringModifiers)) {
    return subject === undefined ? (0,external_kolmafia_namespaceObject.stringModifier)(name) : (0,external_kolmafia_namespaceObject.stringModifier)(subject, name);
  }

  if (utils_arrayContains(name, statModifiers)) {
    return (0,external_kolmafia_namespaceObject.statModifier)(subject, name);
  }
}
/**
 * Merge two Modifiers objects into one, summing all numeric modifiers, ||ing all boolean modifiers, and otherwise letting the second object overwrite the first.
 * @param modifiers1 Modifiers objects to be merged onto.
 * @param modifiers2 Modifiers object to merge.
 * @returns A single Modifiers object obtained by merging.
 */

function pairwiseMerge(modifiers1, modifiers2) {
  var returnValue = modifier_objectSpread(modifier_objectSpread({}, modifiers1), modifiers2);

  for (var modifier in modifiers1) {
    if (Array.from(Object.values(modifiers2)).includes(modifier)) {
      if (arrayContains(modifier, numericModifiers)) {
        var _modifiers1$modifier, _modifiers2$modifier;

        returnValue[modifier] = ((_modifiers1$modifier = modifiers1[modifier]) !== null && _modifiers1$modifier !== void 0 ? _modifiers1$modifier : 0) + ((_modifiers2$modifier = modifiers2[modifier]) !== null && _modifiers2$modifier !== void 0 ? _modifiers2$modifier : 0);
      }

      if (arrayContains(modifier, booleanModifiers)) {
        var _modifiers1$modifier2, _modifiers2$modifier2;

        returnValue[modifier] = ((_modifiers1$modifier2 = modifiers1[modifier]) !== null && _modifiers1$modifier2 !== void 0 ? _modifiers1$modifier2 : false) || ((_modifiers2$modifier2 = modifiers2[modifier]) !== null && _modifiers2$modifier2 !== void 0 ? _modifiers2$modifier2 : false);
      }
    }
  }

  return returnValue;
}
/**
 * Merge arbitrarily many Modifiers objects into one, summing all numeric modifiers, and ||ing all boolean modifiers.
 * @param modifierss Modifiers objects to be merged together.
 * @returns A single Modifiers object obtained by merging.
 */


function mergeModifiers() {
  for (var _len = arguments.length, modifierss = new Array(_len), _key = 0; _key < _len; _key++) {
    modifierss[_key] = arguments[_key];
  }

  return modifierss.reduce((a, b) => pairwiseMerge(a, b), {});
}
;// CONCATENATED MODULE: ./node_modules/libram/dist/resources/2014/DNALab.js
var DNALab_templateObject, DNALab_templateObject2, DNALab_templateObject3, DNALab_templateObject4, DNALab_templateObject5, DNALab_templateObject6, DNALab_templateObject7, DNALab_templateObject8, DNALab_templateObject9, DNALab_templateObject10, DNALab_templateObject11, DNALab_templateObject12, DNALab_templateObject13, DNALab_templateObject14, DNALab_templateObject15, DNALab_templateObject16, DNALab_templateObject17, DNALab_templateObject18, DNALab_templateObject19, DNALab_templateObject20, DNALab_templateObject21, DNALab_templateObject22, DNALab_templateObject23, DNALab_templateObject24, DNALab_templateObject25, DNALab_templateObject26, DNALab_templateObject27, DNALab_templateObject28, DNALab_templateObject29, DNALab_templateObject30, DNALab_templateObject31, DNALab_templateObject32, DNALab_templateObject33, DNALab_templateObject34, DNALab_templateObject35, DNALab_templateObject36, DNALab_templateObject37, DNALab_templateObject38, DNALab_templateObject39, DNALab_templateObject40, DNALab_templateObject41, DNALab_templateObject42, DNALab_templateObject43, DNALab_templateObject44, DNALab_templateObject45, DNALab_templateObject46, DNALab_templateObject47, DNALab_templateObject48, _templateObject49, _templateObject50, _templateObject51, _templateObject52, _templateObject53, _templateObject54, _templateObject55, _templateObject56, _templateObject57, _templateObject58, _templateObject59, _templateObject60, _templateObject61, _templateObject62, _templateObject63, _templateObject64, _templateObject65, _templateObject66, _templateObject67, _templateObject68, _templateObject69, _templateObject70, _templateObject71, _templateObject72, _templateObject73, _templateObject74, _templateObject75, _templateObject76, _templateObject77, _templateObject78, _templateObject79, _templateObject80, _templateObject81, _templateObject82, _templateObject83, _templateObject84, _templateObject85;

function DNALab_slicedToArray(arr, i) { return DNALab_arrayWithHoles(arr) || DNALab_iterableToArrayLimit(arr, i) || DNALab_unsupportedIterableToArray(arr, i) || DNALab_nonIterableRest(); }

function DNALab_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function DNALab_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return DNALab_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return DNALab_arrayLikeToArray(o, minLen); }

function DNALab_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function DNALab_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function DNALab_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function DNALab_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }







var lab = template_string_$item(DNALab_templateObject || (DNALab_templateObject = DNALab_taggedTemplateLiteral(["Little Geneticist DNA-Splicing Lab"])));
/**
 * Checks if you have DNA lab in inventory or installed
 */

function DNALab_have() {
  return haveItem(lab) || getWorkshed() === lab;
}
/**
 * Checks if you have DNA lab installed
 */

function DNALab_installed() {
  return (0,external_kolmafia_namespaceObject.getWorkshed)() === lab;
}
var phylaEffects = new Map([[$phylum(DNALab_templateObject2 || (DNALab_templateObject2 = DNALab_taggedTemplateLiteral(["beast"]))), $effect(DNALab_templateObject3 || (DNALab_templateObject3 = DNALab_taggedTemplateLiteral(["Human-Beast Hybrid"])))], [$phylum(DNALab_templateObject4 || (DNALab_templateObject4 = DNALab_taggedTemplateLiteral(["bug"]))), $effect(DNALab_templateObject5 || (DNALab_templateObject5 = DNALab_taggedTemplateLiteral(["Human-Insect Hybrid"])))], [$phylum(DNALab_templateObject6 || (DNALab_templateObject6 = DNALab_taggedTemplateLiteral(["constellation"]))), $effect(DNALab_templateObject7 || (DNALab_templateObject7 = DNALab_taggedTemplateLiteral(["Human-Constellation Hybrid"])))], [$phylum(DNALab_templateObject8 || (DNALab_templateObject8 = DNALab_taggedTemplateLiteral(["construct"]))), $effect(DNALab_templateObject9 || (DNALab_templateObject9 = DNALab_taggedTemplateLiteral(["Human-Machine Hybrid"])))], [$phylum(DNALab_templateObject10 || (DNALab_templateObject10 = DNALab_taggedTemplateLiteral(["demon"]))), $effect(DNALab_templateObject11 || (DNALab_templateObject11 = DNALab_taggedTemplateLiteral(["Human-Demon Hybrid"])))], [$phylum(DNALab_templateObject12 || (DNALab_templateObject12 = DNALab_taggedTemplateLiteral(["dude"]))), $effect(DNALab_templateObject13 || (DNALab_templateObject13 = DNALab_taggedTemplateLiteral(["Human-Human Hybrid"])))], [$phylum(DNALab_templateObject14 || (DNALab_templateObject14 = DNALab_taggedTemplateLiteral(["elemental"]))), $effect(DNALab_templateObject15 || (DNALab_templateObject15 = DNALab_taggedTemplateLiteral(["Human-Elemental Hybrid"])))], [$phylum(DNALab_templateObject16 || (DNALab_templateObject16 = DNALab_taggedTemplateLiteral(["elf"]))), $effect(DNALab_templateObject17 || (DNALab_templateObject17 = DNALab_taggedTemplateLiteral(["Human-Elf Hybrid"])))], [$phylum(DNALab_templateObject18 || (DNALab_templateObject18 = DNALab_taggedTemplateLiteral(["fish"]))), $effect(DNALab_templateObject19 || (DNALab_templateObject19 = DNALab_taggedTemplateLiteral(["Human-Fish Hybrid"])))], [$phylum(DNALab_templateObject20 || (DNALab_templateObject20 = DNALab_taggedTemplateLiteral(["goblin"]))), $effect(DNALab_templateObject21 || (DNALab_templateObject21 = DNALab_taggedTemplateLiteral(["Human-Goblin Hybrid"])))], [$phylum(DNALab_templateObject22 || (DNALab_templateObject22 = DNALab_taggedTemplateLiteral(["hippy"]))), $effect(DNALab_templateObject23 || (DNALab_templateObject23 = DNALab_taggedTemplateLiteral(["Human-Hobo Hybrid"])))], [$phylum(DNALab_templateObject24 || (DNALab_templateObject24 = DNALab_taggedTemplateLiteral(["horror"]))), $effect(DNALab_templateObject25 || (DNALab_templateObject25 = DNALab_taggedTemplateLiteral(["Human-Horror Hybrid"])))], [$phylum(DNALab_templateObject26 || (DNALab_templateObject26 = DNALab_taggedTemplateLiteral(["humanoid"]))), $effect(DNALab_templateObject27 || (DNALab_templateObject27 = DNALab_taggedTemplateLiteral(["Human-Humanoid Hybrid"])))], [$phylum(DNALab_templateObject28 || (DNALab_templateObject28 = DNALab_taggedTemplateLiteral(["mer-kin"]))), $effect(DNALab_templateObject29 || (DNALab_templateObject29 = DNALab_taggedTemplateLiteral(["Human-Mer-kin Hybrid"])))], [$phylum(DNALab_templateObject30 || (DNALab_templateObject30 = DNALab_taggedTemplateLiteral(["orc"]))), $effect(DNALab_templateObject31 || (DNALab_templateObject31 = DNALab_taggedTemplateLiteral(["Human-Orc Hybrid"])))], [$phylum(DNALab_templateObject32 || (DNALab_templateObject32 = DNALab_taggedTemplateLiteral(["penguin"]))), $effect(DNALab_templateObject33 || (DNALab_templateObject33 = DNALab_taggedTemplateLiteral(["Human-Penguin Hybrid"])))], [$phylum(DNALab_templateObject34 || (DNALab_templateObject34 = DNALab_taggedTemplateLiteral(["pirate"]))), $effect(DNALab_templateObject35 || (DNALab_templateObject35 = DNALab_taggedTemplateLiteral(["Human-Pirate Hybrid"])))], [$phylum(DNALab_templateObject36 || (DNALab_templateObject36 = DNALab_taggedTemplateLiteral(["plant"]))), $effect(DNALab_templateObject37 || (DNALab_templateObject37 = DNALab_taggedTemplateLiteral(["Human-Plant Hybrid"])))], [$phylum(DNALab_templateObject38 || (DNALab_templateObject38 = DNALab_taggedTemplateLiteral(["slime"]))), $effect(DNALab_templateObject39 || (DNALab_templateObject39 = DNALab_taggedTemplateLiteral(["Human-Slime Hybrid"])))], [$phylum(DNALab_templateObject40 || (DNALab_templateObject40 = DNALab_taggedTemplateLiteral(["undead"]))), $effect(DNALab_templateObject41 || (DNALab_templateObject41 = DNALab_taggedTemplateLiteral(["Human-Undead Hybrid"])))], [$phylum(DNALab_templateObject42 || (DNALab_templateObject42 = DNALab_taggedTemplateLiteral(["weird"]))), $effect(DNALab_templateObject43 || (DNALab_templateObject43 = DNALab_taggedTemplateLiteral(["Human-Weird Thing Hybrid"])))]]);
var phylaTonics = new Map([[$phylum(DNALab_templateObject44 || (DNALab_templateObject44 = DNALab_taggedTemplateLiteral(["beast"]))), template_string_$item(DNALab_templateObject45 || (DNALab_templateObject45 = DNALab_taggedTemplateLiteral(["Gene Tonic: Beast"])))], [$phylum(DNALab_templateObject46 || (DNALab_templateObject46 = DNALab_taggedTemplateLiteral(["bug"]))), template_string_$item(DNALab_templateObject47 || (DNALab_templateObject47 = DNALab_taggedTemplateLiteral(["Gene Tonic: Insect"])))], [$phylum(DNALab_templateObject48 || (DNALab_templateObject48 = DNALab_taggedTemplateLiteral(["constellation"]))), template_string_$item(_templateObject49 || (_templateObject49 = DNALab_taggedTemplateLiteral(["Gene Tonic: Constellation"])))], [$phylum(_templateObject50 || (_templateObject50 = DNALab_taggedTemplateLiteral(["construct"]))), template_string_$item(_templateObject51 || (_templateObject51 = DNALab_taggedTemplateLiteral(["Gene Tonic: Construct"])))], [$phylum(_templateObject52 || (_templateObject52 = DNALab_taggedTemplateLiteral(["demon"]))), template_string_$item(_templateObject53 || (_templateObject53 = DNALab_taggedTemplateLiteral(["Gene Tonic: Demon"])))], [$phylum(_templateObject54 || (_templateObject54 = DNALab_taggedTemplateLiteral(["dude"]))), template_string_$item(_templateObject55 || (_templateObject55 = DNALab_taggedTemplateLiteral(["Gene Tonic: Humanoid"])))], [$phylum(_templateObject56 || (_templateObject56 = DNALab_taggedTemplateLiteral(["elemental"]))), template_string_$item(_templateObject57 || (_templateObject57 = DNALab_taggedTemplateLiteral(["Gene Tonic: Elemental"])))], [$phylum(_templateObject58 || (_templateObject58 = DNALab_taggedTemplateLiteral(["elf"]))), template_string_$item(_templateObject59 || (_templateObject59 = DNALab_taggedTemplateLiteral(["Gene Tonic: Elf"])))], [$phylum(_templateObject60 || (_templateObject60 = DNALab_taggedTemplateLiteral(["fish"]))), template_string_$item(_templateObject61 || (_templateObject61 = DNALab_taggedTemplateLiteral(["Gene Tonic: Fish"])))], [$phylum(_templateObject62 || (_templateObject62 = DNALab_taggedTemplateLiteral(["goblin"]))), template_string_$item(_templateObject63 || (_templateObject63 = DNALab_taggedTemplateLiteral(["Gene Tonic: Goblin"])))], [$phylum(_templateObject64 || (_templateObject64 = DNALab_taggedTemplateLiteral(["hippy"]))), template_string_$item(_templateObject65 || (_templateObject65 = DNALab_taggedTemplateLiteral(["Gene Tonic: Hobo"])))], [$phylum(_templateObject66 || (_templateObject66 = DNALab_taggedTemplateLiteral(["horror"]))), template_string_$item(_templateObject67 || (_templateObject67 = DNALab_taggedTemplateLiteral(["Gene Tonic: Horror"])))], [$phylum(_templateObject68 || (_templateObject68 = DNALab_taggedTemplateLiteral(["humanoid"]))), template_string_$item(_templateObject69 || (_templateObject69 = DNALab_taggedTemplateLiteral(["Gene Tonic: Humanoid"])))], [$phylum(_templateObject70 || (_templateObject70 = DNALab_taggedTemplateLiteral(["mer-kin"]))), template_string_$item(_templateObject71 || (_templateObject71 = DNALab_taggedTemplateLiteral(["Gene Tonic: Mer-kin"])))], [$phylum(_templateObject72 || (_templateObject72 = DNALab_taggedTemplateLiteral(["orc"]))), template_string_$item(_templateObject73 || (_templateObject73 = DNALab_taggedTemplateLiteral(["Gene Tonic: Orc"])))], [$phylum(_templateObject74 || (_templateObject74 = DNALab_taggedTemplateLiteral(["penguin"]))), template_string_$item(_templateObject75 || (_templateObject75 = DNALab_taggedTemplateLiteral(["Gene Tonic: Penguin"])))], [$phylum(_templateObject76 || (_templateObject76 = DNALab_taggedTemplateLiteral(["pirate"]))), template_string_$item(_templateObject77 || (_templateObject77 = DNALab_taggedTemplateLiteral(["Gene Tonic: Pirate"])))], [$phylum(_templateObject78 || (_templateObject78 = DNALab_taggedTemplateLiteral(["plant"]))), template_string_$item(_templateObject79 || (_templateObject79 = DNALab_taggedTemplateLiteral(["Gene Tonic: Plant"])))], [$phylum(_templateObject80 || (_templateObject80 = DNALab_taggedTemplateLiteral(["slime"]))), template_string_$item(_templateObject81 || (_templateObject81 = DNALab_taggedTemplateLiteral(["Gene Tonic: Slime"])))], [$phylum(_templateObject82 || (_templateObject82 = DNALab_taggedTemplateLiteral(["undead"]))), template_string_$item(_templateObject83 || (_templateObject83 = DNALab_taggedTemplateLiteral(["Gene Tonic: Undead"])))], [$phylum(_templateObject84 || (_templateObject84 = DNALab_taggedTemplateLiteral(["weird"]))), template_string_$item(_templateObject85 || (_templateObject85 = DNALab_taggedTemplateLiteral(["Gene Tonic: Weird"])))]]);
var tonicEffects = Array.from(phylaEffects.values());
/**
 * Tells you whether you are currently hybridized. When passed with an input of any sort, tells you whether you are currently hybridized with that effect.
 * @param tonic Optional input. When passed, the function returns whether that specific effect is hybridized.
 */

function isHybridized(tonic) {
  if (!tonic) return DNALab_installed() && property_get("_dnaHybrid");
  var tonicEffect = tonic instanceof external_kolmafia_namespaceObject.Effect ? tonic : tonic instanceof external_kolmafia_namespaceObject.Phylum ? DNALab_getEffect(tonic) : modifier_get("Effect", tonic);
  return tonicEffects.includes(tonicEffect) && (0,external_kolmafia_namespaceObject.haveEffect)(tonicEffect) === 2147483647;
}
/**
 * Returns the tonic item associated with a particular phylum.
 * @param phylum The phylum in question.
 * @returns The tonic item associated with that phylum; returns $item.none for $phylum.none.
 */

function getTonic(phylum) {
  var _phylaTonics$get;

  return (_phylaTonics$get = phylaTonics.get(phylum)) !== null && _phylaTonics$get !== void 0 ? _phylaTonics$get : template_string_$item.none; //return $item.none rather than null because it should never happen.
}
/**
 * Returns the tonic effect associated with a particular phylum.
 * @param phylum The phylum in question.
 * @returns The tonic effect associated with that phylum; returns $effect.none for $phylum.none.
 */

function DNALab_getEffect(phylum) {
  var _phylaEffects$get;

  return (_phylaEffects$get = phylaEffects.get(phylum)) !== null && _phylaEffects$get !== void 0 ? _phylaEffects$get : $effect.none; //return $effect.none rather than null because it should never happen
}
/**
 * Tells you which phylum to hunt down for a given effect or item.
 * @param dnatype The tonic effect or item in question
 * @returns The Phylum associated with that effect or item; null if an invalid choice
 */

function phylumFor(dnatype) {
  if (dnatype instanceof Effect) {
    var phylumPair = Array.from(phylaEffects.entries()).find(_ref => {
      var _ref2 = DNALab_slicedToArray(_ref, 2),
          effect = _ref2[1];

      return effect === dnatype;
    });
    return phylumPair ? phylumPair[0] : null;
  } else {
    var _phylumPair = Array.from(phylaTonics.entries()).find(_ref3 => {
      var _ref4 = DNALab_slicedToArray(_ref3, 2),
          tonic = _ref4[1];

      return tonic === dnatype;
    });

    return _phylumPair ? _phylumPair[0] : null;
  }
}
/**
 * Hybridize yourself with the current contents of your syringe, if possible.
 * @returns Whether or not we succeeded
 */

function hybridize() {
  if (property_get("_dnaHybrid")) return false;
  if (!DNALab_installed()) return false;
  var currentSyringe = property_get("dnaSyringe");
  if (!currentSyringe) return false;
  var tonicPotion = getTonic(currentSyringe);
  var expectedEffect = modifier_get("Effect", tonicPotion);
  (0,external_kolmafia_namespaceObject.cliExecute)("camp dnainject");
  return isHybridized(expectedEffect);
}
/**
 * Makes tonics with whatever phylum is currently in your syringe
 * @param {number} [amount=1] the number of tonics to make
 * @returns Whether we successfully made tonics; returns true if we made as many as we could, regardless of whether that was the number requested
 */

function makeTonic() {
  var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  if (!DNALab_installed()) return false;
  var currentSyringe = property_get("dnaSyringe");
  if (!currentSyringe) return false;
  var tonicPotion = getTonic(currentSyringe);
  var amountToMake = utils_clamp(amount, 0, tonicsLeft());
  var startingAmount = (0,external_kolmafia_namespaceObject.itemAmount)(tonicPotion);
  (0,external_kolmafia_namespaceObject.cliExecute)("camp dnapotion ".concat(amountToMake));
  return (0,external_kolmafia_namespaceObject.itemAmount)(tonicPotion) - startingAmount === amountToMake;
}
/**
 * Tells you how many tonics you can make the rest of the day.
 * @returns The remaining tonics you can make
 */

function tonicsLeft() {
  return utils_clamp(3 - property_get("_dnaPotionsMade"), 0, 3);
}
;// CONCATENATED MODULE: ./node_modules/libram/dist/resources/2015/ChateauMantegna.js


function ChateauMantegna_have() {
  return get("chateauAvailable");
}
function paintingMonster() {
  return get("chateauMonster");
}
function paintingFought() {
  return get("_chateauMonsterFought");
}
function fightPainting() {
  visitUrl("place.php?whichplace=chateau&action=chateau_painting", false);
  return runCombat();
}
var desks = ["fancy stationery set", "Swiss piggy bank", "continental juice bar"];
var ceilings = ["antler chandelier", "ceiling fan", "artificial skylight"];
var nightstands = ["foreign language tapes", "bowl of potpourri", "electric muscle stimulator"];
function getDesk() {
  var _desks$find;

  return (_desks$find = desks.find(desk => Object.keys(getChateau()).includes(desk))) !== null && _desks$find !== void 0 ? _desks$find : null;
}
function getCeiling() {
  var _ceilings$find;

  return (_ceilings$find = ceilings.find(ceiling => Object.keys(getChateau()).includes(ceiling))) !== null && _ceilings$find !== void 0 ? _ceilings$find : null;
}
function getNightstand() {
  var _nightstands$find;

  return (_nightstands$find = nightstands.find(nightstand => Object.keys(getChateau()).includes(nightstand))) !== null && _nightstands$find !== void 0 ? _nightstands$find : null;
}
function changeDesk(desk) {
  if (getDesk() === desk) return true;
  if (!desks.includes(desk)) return false;
  buy(Item.get(desk));
  return getDesk() === desk;
}
function changeCeiling(ceiling) {
  if (getCeiling() === ceiling) return true;
  if (!ceilings.includes(ceiling)) return false;
  buy(Item.get(ceiling));
  return getCeiling() === ceiling;
}
function changeNightstand(nightstand) {
  if (getNightstand() === nightstand) return true;
  if (!nightstands.includes(nightstand)) return false;
  buy(Item.get(nightstand));
  return getNightstand() === nightstand;
}
;// CONCATENATED MODULE: ./node_modules/libram/dist/ascend.js
var ascend_templateObject, ascend_templateObject2, ascend_templateObject3, ascend_templateObject4, ascend_templateObject5, ascend_templateObject6;

function ascend_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = ascend_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function ascend_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ascend_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ascend_createClass(Constructor, protoProps, staticProps) { if (protoProps) ascend_defineProperties(Constructor.prototype, protoProps); if (staticProps) ascend_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function ascend_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ascend_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) ascend_setPrototypeOf(subClass, superClass); }

function ascend_createSuper(Derived) { var hasNativeReflectConstruct = ascend_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = ascend_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = ascend_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return ascend_possibleConstructorReturn(this, result); }; }

function ascend_possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return ascend_assertThisInitialized(self); }

function ascend_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function ascend_wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; ascend_wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !ascend_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return ascend_construct(Class, arguments, ascend_getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return ascend_setPrototypeOf(Wrapper, Class); }; return ascend_wrapNativeSuper(Class); }

function ascend_construct(Parent, args, Class) { if (ascend_isNativeReflectConstruct()) { ascend_construct = Reflect.construct.bind(); } else { ascend_construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) ascend_setPrototypeOf(instance, Class.prototype); return instance; }; } return ascend_construct.apply(null, arguments); }

function ascend_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function ascend_isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function ascend_setPrototypeOf(o, p) { ascend_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return ascend_setPrototypeOf(o, p); }

function ascend_getPrototypeOf(o) { ascend_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return ascend_getPrototypeOf(o); }

function ascend_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function ascend_slicedToArray(arr, i) { return ascend_arrayWithHoles(arr) || ascend_iterableToArrayLimit(arr, i) || ascend_unsupportedIterableToArray(arr, i) || ascend_nonIterableRest(); }

function ascend_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function ascend_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return ascend_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return ascend_arrayLikeToArray(o, minLen); }

function ascend_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ascend_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function ascend_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var Lifestyle;

(function (Lifestyle) {
  Lifestyle[Lifestyle["casual"] = 1] = "casual";
  Lifestyle[Lifestyle["softcore"] = 2] = "softcore";
  Lifestyle[Lifestyle["normal"] = 2] = "normal";
  Lifestyle[Lifestyle["hardcore"] = 3] = "hardcore";
})(Lifestyle || (Lifestyle = {}));

function permedSkills() {
  return new Map(Array.from(Object.entries((0,external_kolmafia_namespaceObject.getPermedSkills)())).map(_ref => {
    var _ref2 = ascend_slicedToArray(_ref, 2),
        skillName = _ref2[0],
        isHardcore = _ref2[1];

    return [(0,external_kolmafia_namespaceObject.toSkill)(skillName), isHardcore ? Lifestyle.hardcore : Lifestyle.softcore];
  }));
}
var AscendError = /*#__PURE__*/function (_Error) {
  ascend_inherits(AscendError, _Error);

  var _super = ascend_createSuper(AscendError);

  function AscendError(cause) {
    var _this;

    ascend_classCallCheck(this, AscendError);

    if (!cause) {
      _this = _super.call(this, "Failed to ascend--do you have a pending trade offer?");

      ascend_defineProperty(ascend_assertThisInitialized(_this), "cause", void 0);
    } else if (cause instanceof external_kolmafia_namespaceObject.Skill) {
      var reason = cause.permable ? (0,external_kolmafia_namespaceObject.haveSkill)(cause) ? "too karmaically expensive" : "not a skill you currently know" : "unpermable";
      _this = _super.call(this, "Skill ".concat(cause, " is ").concat(reason, "!"));

      ascend_defineProperty(ascend_assertThisInitialized(_this), "cause", void 0);
    } else if (cause instanceof external_kolmafia_namespaceObject.Item) {
      _this = _super.call(this, "Invalid astral item: ".concat(cause, "!"));

      ascend_defineProperty(ascend_assertThisInitialized(_this), "cause", void 0);
    } else if (cause instanceof external_kolmafia_namespaceObject.Class) {
      _this = _super.call(this, "Invalid class ".concat(cause, " for this path!"));

      ascend_defineProperty(ascend_assertThisInitialized(_this), "cause", void 0);
    } else if (cause instanceof external_kolmafia_namespaceObject.Path) {
      _this = _super.call(this, "Invalid path ".concat(cause, "!"));

      ascend_defineProperty(ascend_assertThisInitialized(_this), "cause", void 0);
    } else {
      _this = _super.call(this, cause);

      ascend_defineProperty(ascend_assertThisInitialized(_this), "cause", void 0);
    }

    _this.cause = cause;
    return ascend_possibleConstructorReturn(_this);
  }

  return ascend_createClass(AscendError);
}( /*#__PURE__*/ascend_wrapNativeSuper(Error));
var worksheds = ["warbear LP-ROM burner", "warbear jackhammer drill press", "warbear induction oven", "warbear high-efficiency still", "warbear chemistry lab", "warbear auto-anvil", "spinning wheel", "snow machine", "Little Geneticist DNA-Splicing Lab", "portable Mayo Clinic", "Asdon Martin keyfob", "diabolic pizza cube", "cold medicine cabinet"];
var gardens = ["packet of pumpkin seeds", "Peppermint Pip Packet", "packet of dragon's teeth", "packet of beer seeds", "packet of winter seeds", "packet of thanksgarden seeds", "packet of tall grass seeds", "packet of mushroom spores"];
var eudorae = ["My Own Pen Pal kit", "GameInformPowerDailyPro subscription card", "Xi Receiver Unit", "New-You Club Membership Form", "Our Daily Candles™ order form"];
var isWorkshed = createStringUnionTypeGuardFunction(worksheds);
var isGarden = createStringUnionTypeGuardFunction(gardens);
var isEudora = createStringUnionTypeGuardFunction(eudorae);
var isDesk = createStringUnionTypeGuardFunction(desks);
var isNightstand = createStringUnionTypeGuardFunction(nightstands);
var isCeiling = createStringUnionTypeGuardFunction(ceilings);
var AscensionPrepError = /*#__PURE__*/function (_Error2) {
  ascend_inherits(AscensionPrepError, _Error2);

  var _super2 = ascend_createSuper(AscensionPrepError);

  function AscensionPrepError(cause, original) {
    var _this2;

    ascend_classCallCheck(this, AscensionPrepError);

    if (isWorkshed(cause)) {
      _this2 = _super2.call(this, "Unable to swap workshed to ".concat(cause, "; workshed is currently ").concat(original, "."));

      ascend_defineProperty(ascend_assertThisInitialized(_this2), "cause", void 0);
    } else if (isGarden(cause)) {
      _this2 = _super2.call(this, "Unable to swap garden to ".concat(cause, "; garden is currently ").concat(original, "."));

      ascend_defineProperty(ascend_assertThisInitialized(_this2), "cause", void 0);
    } else if (isEudora(cause)) {
      _this2 = _super2.call(this, "Unable to swap eudora to ".concat(cause, "; eudora is currently ").concat(original, "."));

      ascend_defineProperty(ascend_assertThisInitialized(_this2), "cause", void 0);
    } else if (isDesk(cause)) {
      _this2 = _super2.call(this, "Unable to swap chateau desk to ".concat(cause, "; desk is currently ").concat(original, "."));

      ascend_defineProperty(ascend_assertThisInitialized(_this2), "cause", void 0);
    } else if (isNightstand(cause)) {
      _this2 = _super2.call(this, "Unable to swap chateau nightstand to ".concat(cause, "; nightstand is currently ").concat(original, "."));

      ascend_defineProperty(ascend_assertThisInitialized(_this2), "cause", void 0);
    } else if (isCeiling(cause)) {
      _this2 = _super2.call(this, "Unable to swap chateau ceiling to ".concat(cause, "; ceiling is currently ").concat(original, "."));

      ascend_defineProperty(ascend_assertThisInitialized(_this2), "cause", void 0);
    } else {
      _this2 = _super2.call(this, cause);

      ascend_defineProperty(ascend_assertThisInitialized(_this2), "cause", void 0);
    }

    _this2.cause = cause;
    return ascend_possibleConstructorReturn(_this2);
  }

  return ascend_createClass(AscensionPrepError);
}( /*#__PURE__*/ascend_wrapNativeSuper(Error));

function toMoonId(moon, playerClass) {
  if (typeof moon === "number") return moon;

  var offset = () => {
    switch (playerClass.primestat) {
      case $stat(ascend_templateObject || (ascend_templateObject = ascend_taggedTemplateLiteral(["Muscle"]))):
        return 0;

      case $stat(ascend_templateObject2 || (ascend_templateObject2 = ascend_taggedTemplateLiteral(["Mysticality"]))):
        return 1;

      case $stat(ascend_templateObject3 || (ascend_templateObject3 = ascend_taggedTemplateLiteral(["Moxie"]))):
        return 2;

      default:
        throw new AscendError("unknown prime stat for ".concat(playerClass));
    }
  };

  switch (moon.toLowerCase()) {
    case "mongoose":
      return 1;

    case "wallaby":
      return 2;

    case "vole":
      return 3;

    case "platypus":
      return 4;

    case "opossum":
      return 5;

    case "marmot":
      return 6;

    case "wombat":
      return 7;

    case "blender":
      return 8;

    case "packrat":
      return 9;

    case "degrassi":
    case "degrassi knoll":
    case "friendly degrassi knoll":
    case "knoll":
      return 1 + offset();

    case "canada":
    case "canadia":
    case "little canadia":
      return 4 + offset();

    case "gnomads":
    case "gnomish":
    case "gnomish gnomads camp":
      return 7 + offset();

    default:
      throw new AscendError("Invalid moon sign!");
  }
}

function isInValhalla() {
  var charPaneText = (0,external_kolmafia_namespaceObject.visitUrl)("charpane.php"); // Match the infinity images (inf_small.gif, inf_large.gif)
  // At time of writing, the full img tag used is:
  // <img src="https://d2uyhvukfffg5a.cloudfront.net/otherimages/inf_small.gif">

  var matches = charPaneText.match(/<img src="[^"]*\/otherimages\/inf_\w+\.gif">/);
  return matches !== null;
}
/**
 * Hops the gash, perming no skills
 * @param path path of choice, as a Path object--these exist as properties of Paths
 * @param playerClass Your class of choice for this ascension
 * @param lifestyle 1 for casual, 2 for softcore, 3 for hardcore. Alternately, use the Lifestyle enum
 * @param moon Your moon sign as a string, or the zone you're looking for as a string
 * @param consumable From the astral deli. Pick the container item, not the product.
 * @param pet From the astral pet store.
 * @param permSkills A Map<Skill, Lifestyle> of skills you'd like to perm, ordered by priority.
 */


function ascend(path, playerClass, lifestyle, moon) {
  var consumable = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : template_string_$item(ascend_templateObject4 || (ascend_templateObject4 = ascend_taggedTemplateLiteral(["astral six-pack"])));
  var pet = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;
  var permOptions = arguments.length > 6 ? arguments[6] : undefined;

  if (playerClass.path !== (path.avatar ? path : external_kolmafia_namespaceObject.Path.none)) {
    throw new AscendError(playerClass);
  }

  if (path.id < 0) throw new AscendError(path);
  var moonId = toMoonId(moon, playerClass);
  if (moonId < 1 || moonId > 9) throw new Error("Invalid moon ".concat(moon));

  if (consumable && !template_string_$items(ascend_templateObject5 || (ascend_templateObject5 = ascend_taggedTemplateLiteral(["astral six-pack, astral hot dog dinner, [10882]carton of astral energy drinks"]))).includes(consumable)) {
    throw new AscendError(consumable);
  }

  if (pet && !template_string_$items(ascend_templateObject6 || (ascend_templateObject6 = ascend_taggedTemplateLiteral(["astral bludgeon, astral shield, astral chapeau, astral bracer, astral longbow, astral shorts, astral mace, astral trousers, astral ring, astral statuette, astral pistol, astral mask, astral pet sweater, astral shirt, astral belt"]))).includes(pet)) {
    throw new AscendError(pet);
  }

  var illegalSkill = permOptions ? Array.from(permOptions.permSkills.keys()).find(skill => !skill.permable || !(0,external_kolmafia_namespaceObject.haveSkill)(skill)) : undefined;

  if (illegalSkill) {
    throw new AscendError(illegalSkill);
  }

  if (!isInValhalla()) {
    (0,external_kolmafia_namespaceObject.visitUrl)("ascend.php?action=ascend&confirm=on&confirm2=on");
  }

  if (!isInValhalla()) {
    throw new AscendError();
  }

  (0,external_kolmafia_namespaceObject.visitUrl)("afterlife.php?action=pearlygates");

  if (consumable) {
    (0,external_kolmafia_namespaceObject.visitUrl)("afterlife.php?action=buydeli&whichitem=".concat((0,external_kolmafia_namespaceObject.toInt)(consumable)));
  }

  if (pet) (0,external_kolmafia_namespaceObject.visitUrl)("afterlife.php?action=buyarmory&whichitem=".concat((0,external_kolmafia_namespaceObject.toInt)(pet)));

  if (permOptions) {
    var currentPerms = permedSkills();
    var karma = property_get("bankedKarma");

    var _iterator = ascend_createForOfIteratorHelper(permOptions.permSkills.entries()),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _currentPerms$get;

        var _step$value = ascend_slicedToArray(_step.value, 2),
            skill = _step$value[0],
            prospectivePermLevel = _step$value[1];

        var currentPermLevel = (_currentPerms$get = currentPerms.get(skill)) !== null && _currentPerms$get !== void 0 ? _currentPerms$get : Lifestyle.casual;

        if (prospectivePermLevel > currentPermLevel) {
          var expectedKarma = 100 * (prospectivePermLevel - currentPermLevel);

          if (karma < expectedKarma) {
            if (!permOptions.neverAbort) throw new AscendError(skill);
            continue;
          }

          karma -= expectedKarma;
          var permText = prospectivePermLevel === Lifestyle.hardcore ? "hcperm" : "scperm";
          (0,external_kolmafia_namespaceObject.visitUrl)("afterlife.php?action=".concat(permText, "&whichskill=").concat((0,external_kolmafia_namespaceObject.toInt)(skill)));
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  (0,external_kolmafia_namespaceObject.visitUrl)("afterlife.php?action=ascend&confirmascend=1&whichsign=".concat(moonId, "&gender=2&whichclass=").concat((0,external_kolmafia_namespaceObject.toInt)(playerClass), "&whichpath=").concat(path.id, "&asctype=").concat(lifestyle, "&nopetok=1&noskillsok=1&lamepathok=1&lamesignok=1&pwd"), true);
}
/**
 * Sets up various iotms you may want to use in the coming ascension
 * @param ascensionItems.workshed Workshed to switch to.
 * @param ascensionItems.garden Garden to switch to.
 * @param ascensionItems An object potentially containing your workshed, garden, chateau, and eudora, all as strings
 * @param throwOnFail If true, this will throw an error when it fails to switch something
 */

function prepareAscension() {
  var _throwOnFail;

  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      workshed = _ref3.workshed,
      garden = _ref3.garden,
      eudora = _ref3.eudora,
      chateau = _ref3.chateau,
      throwOnFail = _ref3.throwOnFail;

  throwOnFail = (_throwOnFail = throwOnFail) !== null && _throwOnFail !== void 0 ? _throwOnFail : true;

  if (workshed && getWorkshed() !== Item.get(workshed)) {
    use(Item.get(workshed));

    if (getWorkshed().name !== workshed && throwOnFail) {
      throw new AscensionPrepError(workshed, getWorkshed());
    }
  }

  if (garden && !Object.getOwnPropertyNames(getCampground()).includes(garden)) {
    use(Item.get(garden));
    var gardenName = Object.getOwnPropertyNames(getCampground()).find(isGarden);

    if (gardenName !== garden && throwOnFail) {
      throw new AscensionPrepError(garden, gardenName);
    }
  }

  if (eudora && eudoraItem().name !== eudora) {
    var eudoraNumber = 1 + eudorae.indexOf(eudora);

    if (!xpath(visitUrl("account.php?tab=correspondence"), "//select[@name=\"whichpenpal\"]/option/@value").includes(eudoraNumber.toString()) && throwOnFail) {
      throw new AscensionPrepError("Unable to swap eudora to ".concat(eudora, " because you are not subscribed to it."));
    } else {
      visitUrl("account.php?actions[]=whichpenpal&whichpenpal=".concat(eudoraNumber, "&action=Update"), true);
    }

    if (eudoraItem() !== Item.get(eudora) && throwOnFail) {
      throw new AscensionPrepError(eudora, eudoraItem());
    }
  }

  if (chateau && ChateauMantegna.have()) {
    var desk = chateau.desk,
        ceiling = chateau.ceiling,
        nightstand = chateau.nightstand;

    if (ceiling && ChateauMantegna.getCeiling() !== ceiling) {
      if (!ChateauMantegna.changeCeiling(ceiling) && throwOnFail) {
        var _ChateauMantegna$getC;

        throw new AscensionPrepError(ceiling, (_ChateauMantegna$getC = ChateauMantegna.getCeiling()) !== null && _ChateauMantegna$getC !== void 0 ? _ChateauMantegna$getC : "unknown");
      }
    }

    if (desk && ChateauMantegna.getDesk() !== desk) {
      if (!ChateauMantegna.changeDesk(desk) && throwOnFail) {
        var _ChateauMantegna$getD;

        throw new AscensionPrepError(desk, (_ChateauMantegna$getD = ChateauMantegna.getDesk()) !== null && _ChateauMantegna$getD !== void 0 ? _ChateauMantegna$getD : "unknown");
      }
    }

    if (nightstand && ChateauMantegna.getNightstand() !== nightstand) {
      if (!ChateauMantegna.changeNightstand(nightstand) && throwOnFail) {
        var _ChateauMantegna$getN;

        throw new AscensionPrepError(nightstand, (_ChateauMantegna$getN = ChateauMantegna.getNightstand()) !== null && _ChateauMantegna$getN !== void 0 ? _ChateauMantegna$getN : "unknown");
      }
    }
  }
}
;// CONCATENATED MODULE: ./src/tasks/structure.ts
var structure_templateObject;

function structure_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }



var Leg;

(function (Leg) {
  Leg[Leg["Aftercore"] = 0] = "Aftercore";
  Leg[Leg["GreyYou"] = 1] = "GreyYou";
  Leg[Leg["last"] = 1] = "last";
})(Leg || (Leg = {}));

function getCurrentLeg() {
  if ((0,external_kolmafia_namespaceObject.myClass)() === $class(structure_templateObject || (structure_templateObject = structure_taggedTemplateLiteral(["Grey Goo"]))) || (0,external_kolmafia_namespaceObject.myDaycount)() === 1 || property_get("_freshOutOfGreyYou", false)) return Leg.GreyYou;
  return Leg.Aftercore;
}
;// CONCATENATED MODULE: ./node_modules/libram/dist/resources/2019/Snapper.js
function Snapper_slicedToArray(arr, i) { return Snapper_arrayWithHoles(arr) || Snapper_iterableToArrayLimit(arr, i) || Snapper_unsupportedIterableToArray(arr, i) || Snapper_nonIterableRest(); }

function Snapper_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function Snapper_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function Snapper_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Snapper_toConsumableArray(arr) { return Snapper_arrayWithoutHoles(arr) || Snapper_iterableToArray(arr) || Snapper_unsupportedIterableToArray(arr) || Snapper_nonIterableSpread(); }

function Snapper_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function Snapper_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return Snapper_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Snapper_arrayLikeToArray(o, minLen); }

function Snapper_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function Snapper_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return Snapper_arrayLikeToArray(arr); }

function Snapper_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



var familiar = external_kolmafia_namespaceObject.Familiar.get("Red-Nosed Snapper");
/**
 * Map of phylum to item that phylum drops.
 */

var phylumItem = new Map([[external_kolmafia_namespaceObject.Phylum.get("beast"), external_kolmafia_namespaceObject.Item.get("patch of extra-warm fur")], [external_kolmafia_namespaceObject.Phylum.get("bug"), external_kolmafia_namespaceObject.Item.get("a bug's lymph")], [external_kolmafia_namespaceObject.Phylum.get("constellation"), external_kolmafia_namespaceObject.Item.get("micronova")], [external_kolmafia_namespaceObject.Phylum.get("construct"), external_kolmafia_namespaceObject.Item.get("industrial lubricant")], [external_kolmafia_namespaceObject.Phylum.get("demon"), external_kolmafia_namespaceObject.Item.get("infernal snowball")], [external_kolmafia_namespaceObject.Phylum.get("dude"), external_kolmafia_namespaceObject.Item.get("human musk")], [external_kolmafia_namespaceObject.Phylum.get("elemental"), external_kolmafia_namespaceObject.Item.get("livid energy")], [external_kolmafia_namespaceObject.Phylum.get("elf"), external_kolmafia_namespaceObject.Item.get("peppermint syrup")], [external_kolmafia_namespaceObject.Phylum.get("fish"), external_kolmafia_namespaceObject.Item.get("fish sauce")], [external_kolmafia_namespaceObject.Phylum.get("goblin"), external_kolmafia_namespaceObject.Item.get("guffin")], [external_kolmafia_namespaceObject.Phylum.get("hippy"), external_kolmafia_namespaceObject.Item.get("organic potpourri")], [external_kolmafia_namespaceObject.Phylum.get("hobo"), external_kolmafia_namespaceObject.Item.get("beggin' cologne")], [external_kolmafia_namespaceObject.Phylum.get("horror"), external_kolmafia_namespaceObject.Item.get("powdered madness")], [external_kolmafia_namespaceObject.Phylum.get("humanoid"), external_kolmafia_namespaceObject.Item.get("vial of humanoid growth hormone")], [external_kolmafia_namespaceObject.Phylum.get("mer-kin"), external_kolmafia_namespaceObject.Item.get("Mer-kin eyedrops")], [external_kolmafia_namespaceObject.Phylum.get("orc"), external_kolmafia_namespaceObject.Item.get("boot flask")], [external_kolmafia_namespaceObject.Phylum.get("penguin"), external_kolmafia_namespaceObject.Item.get("envelope full of Meat")], [external_kolmafia_namespaceObject.Phylum.get("pirate"), external_kolmafia_namespaceObject.Item.get("Shantix™")], [external_kolmafia_namespaceObject.Phylum.get("plant"), external_kolmafia_namespaceObject.Item.get("goodberry")], [external_kolmafia_namespaceObject.Phylum.get("slime"), external_kolmafia_namespaceObject.Item.get("extra-strength goo")], [external_kolmafia_namespaceObject.Phylum.get("undead"), external_kolmafia_namespaceObject.Item.get("unfinished pleasure")], [external_kolmafia_namespaceObject.Phylum.get("weird"), external_kolmafia_namespaceObject.Item.get("non-Euclidean angle")]]);
/**
 * Map of drop item to phylum it drops from.
 */

var itemPhylum = new Map(Snapper_toConsumableArray(phylumItem).map(_ref => {
  var _ref2 = Snapper_slicedToArray(_ref, 2),
      phylum = _ref2[0],
      item = _ref2[1];

  return [item, phylum];
}));
/**
 * Return whether you have a Red-Nosed Snapper.
 * @returns True if you have a Red-Nosed Snapper, false otherwise.
 */

function Snapper_have() {
  return haveFamiliar(familiar);
}
/**
 * Get the phylum currently being tracked by the snapper.
 * @returns Tracked phylum, or null if no phylum tracked.
 */

function getTrackedPhylum() {
  return property_get("redSnapperPhylum");
}
/**
 * Set snapper tracking to a certain phylum.
 * @param phylum Phylum to track.
 */

function trackPhylum(phylum) {
  var currentFamiliar = (0,external_kolmafia_namespaceObject.myFamiliar)();

  try {
    (0,external_kolmafia_namespaceObject.useFamiliar)(familiar);
    (0,external_kolmafia_namespaceObject.cliExecute)("snapper ".concat(phylum));
  } finally {
    (0,external_kolmafia_namespaceObject.useFamiliar)(currentFamiliar);
  }
}
/**
 * Get progress to next snapper drop.
 * @returns Number of fights completed (out of 11) to reach next drop.
 */

function getProgress() {
  return get("redSnapperProgress");
}
;// CONCATENATED MODULE: ./node_modules/libram/dist/session.js
var session_templateObject, session_templateObject2, session_templateObject3, session_templateObject4, session_templateObject5, session_templateObject6, session_templateObject7, session_templateObject8, session_templateObject9, session_templateObject10, session_templateObject11, session_templateObject12, session_templateObject13, session_templateObject14, session_templateObject15, session_templateObject16, session_templateObject17, session_templateObject18, session_templateObject19, session_templateObject20, session_templateObject21, session_templateObject22, session_templateObject23, session_templateObject24, session_templateObject25, session_templateObject26, session_templateObject27, session_templateObject28, session_templateObject29, session_templateObject30;

function session_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function session_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function session_createClass(Constructor, protoProps, staticProps) { if (protoProps) session_defineProperties(Constructor.prototype, protoProps); if (staticProps) session_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function session_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function session_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = session_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function session_slicedToArray(arr, i) { return session_arrayWithHoles(arr) || session_iterableToArrayLimit(arr, i) || session_unsupportedIterableToArray(arr, i) || session_nonIterableRest(); }

function session_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function session_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function session_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function session_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function session_toConsumableArray(arr) { return session_arrayWithoutHoles(arr) || session_iterableToArray(arr) || session_unsupportedIterableToArray(arr) || session_nonIterableSpread(); }

function session_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function session_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return session_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return session_arrayLikeToArray(o, minLen); }

function session_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function session_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return session_arrayLikeToArray(arr); }

function session_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





/**
 * Return a mapping of the session items, mapping foldable items to a single of their forms
 * @returns the item session results, with foldables mapped to a single of their folding forms
 */

function mySessionItemsWrapper() {
  var manyToOne = (primary, mapped) => mapped.map(target => [target, primary]);

  var foldable = item => manyToOne(item, getFoldGroup(item));

  var itemMappings = new Map([].concat(session_toConsumableArray(foldable(template_string_$item(session_templateObject || (session_templateObject = session_taggedTemplateLiteral(["liar's pants"]))))), session_toConsumableArray(foldable(template_string_$item(session_templateObject2 || (session_templateObject2 = session_taggedTemplateLiteral(["ice pick"]))))), session_toConsumableArray(manyToOne(template_string_$item(session_templateObject3 || (session_templateObject3 = session_taggedTemplateLiteral(["Spooky Putty sheet"]))), [template_string_$item(session_templateObject4 || (session_templateObject4 = session_taggedTemplateLiteral(["Spooky Putty monster"])))].concat(session_toConsumableArray(getFoldGroup(template_string_$item(session_templateObject5 || (session_templateObject5 = session_taggedTemplateLiteral(["Spooky Putty sheet"])))))))), session_toConsumableArray(foldable(template_string_$item(session_templateObject6 || (session_templateObject6 = session_taggedTemplateLiteral(["stinky cheese sword"]))))), session_toConsumableArray(foldable(template_string_$item(session_templateObject7 || (session_templateObject7 = session_taggedTemplateLiteral(["naughty paper shuriken"]))))), session_toConsumableArray(foldable(template_string_$item(session_templateObject8 || (session_templateObject8 = session_taggedTemplateLiteral(["Loathing Legion knife"]))))), session_toConsumableArray(foldable(template_string_$item(session_templateObject9 || (session_templateObject9 = session_taggedTemplateLiteral(["deceased crimbo tree"]))))), session_toConsumableArray(foldable(template_string_$item(session_templateObject10 || (session_templateObject10 = session_taggedTemplateLiteral(["makeshift turban"]))))), session_toConsumableArray(foldable(template_string_$item(session_templateObject11 || (session_templateObject11 = session_taggedTemplateLiteral(["turtle wax shield"]))))), session_toConsumableArray(foldable(template_string_$item(session_templateObject12 || (session_templateObject12 = session_taggedTemplateLiteral(["metallic foil bow"]))))), session_toConsumableArray(foldable(template_string_$item(session_templateObject13 || (session_templateObject13 = session_taggedTemplateLiteral(["ironic moustache"]))))), session_toConsumableArray(foldable(template_string_$item(session_templateObject14 || (session_templateObject14 = session_taggedTemplateLiteral(["bugged balaclava"]))))), session_toConsumableArray(foldable(template_string_$item(session_templateObject15 || (session_templateObject15 = session_taggedTemplateLiteral(["toggle switch (Bartend)"]))))), session_toConsumableArray(foldable(template_string_$item(session_templateObject16 || (session_templateObject16 = session_taggedTemplateLiteral(["mushroom cap"]))))), session_toConsumableArray(manyToOne(template_string_$item(session_templateObject17 || (session_templateObject17 = session_taggedTemplateLiteral(["can of Rain-Doh"]))), template_string_$items(session_templateObject18 || (session_templateObject18 = session_taggedTemplateLiteral(["empty Rain-Doh can"]))))), session_toConsumableArray(manyToOne(template_string_$item(session_templateObject19 || (session_templateObject19 = session_taggedTemplateLiteral(["meteorite fragment"]))), template_string_$items(session_templateObject20 || (session_templateObject20 = session_taggedTemplateLiteral(["meteorite earring, meteorite necklace, meteorite ring"]))))), session_toConsumableArray(manyToOne(template_string_$item(session_templateObject21 || (session_templateObject21 = session_taggedTemplateLiteral(["Sneaky Pete's leather jacket"]))), template_string_$items(session_templateObject22 || (session_templateObject22 = session_taggedTemplateLiteral(["Sneaky Pete's leather jacket (collar popped)"]))))), session_toConsumableArray(manyToOne(template_string_$item(session_templateObject23 || (session_templateObject23 = session_taggedTemplateLiteral(["Boris's Helm"]))), template_string_$items(session_templateObject24 || (session_templateObject24 = session_taggedTemplateLiteral(["Boris's Helm (askew)"]))))), session_toConsumableArray(manyToOne(template_string_$item(session_templateObject25 || (session_templateObject25 = session_taggedTemplateLiteral(["Jarlsberg's pan"]))), template_string_$items(session_templateObject26 || (session_templateObject26 = session_taggedTemplateLiteral(["Jarlsberg's pan (Cosmic portal mode)"]))))), session_toConsumableArray(manyToOne(template_string_$item(session_templateObject27 || (session_templateObject27 = session_taggedTemplateLiteral(["tiny plastic sword"]))), template_string_$items(session_templateObject28 || (session_templateObject28 = session_taggedTemplateLiteral(["grogtini, bodyslam, dirty martini, vesper, cherry bomb, sangria del diablo"]))))), session_toConsumableArray(manyToOne(template_string_$item(session_templateObject29 || (session_templateObject29 = session_taggedTemplateLiteral(["earthenware muffin tin"]))), template_string_$items(session_templateObject30 || (session_templateObject30 = session_taggedTemplateLiteral(["blueberry muffin, bran muffin, chocolate chip muffin"])))))));
  var inventory = new Map();

  for (var _i = 0, _Object$entries = Object.entries((0,external_kolmafia_namespaceObject.mySessionItems)()); _i < _Object$entries.length; _i++) {
    var _itemMappings$get, _inventory$get;

    var _Object$entries$_i = session_slicedToArray(_Object$entries[_i], 2),
        itemStr = _Object$entries$_i[0],
        quantity = _Object$entries$_i[1];

    var item = (0,external_kolmafia_namespaceObject.toItem)(itemStr);
    var mappedItem = (_itemMappings$get = itemMappings.get(item)) !== null && _itemMappings$get !== void 0 ? _itemMappings$get : item;
    inventory.set(mappedItem, quantity + ((_inventory$get = inventory.get(mappedItem)) !== null && _inventory$get !== void 0 ? _inventory$get : 0));
  }

  return inventory;
}
/**
 * Performa a binary element-wise operation on two inventories
 * @param a The LHS inventory to perform the operation on
 * @param b The RHS inventory to perform the operation on
 * @param op an operator to compute between the sets
 * @param commutative if true use the value of b for any items not in a. if false, ignore values not in a
 * @returns a new map representing the combined inventories
 */


function inventoryOperation(a, b, op, commutative) {
  // return every entry that is in a and not in b
  var difference = new Map();

  var _iterator = session_createForOfIteratorHelper(a.entries()),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _b$get;

      var _step$value = session_slicedToArray(_step.value, 2),
          _item = _step$value[0],
          _quantity = _step$value[1];

      var combinedQuantity = op(_quantity, (_b$get = b.get(_item)) !== null && _b$get !== void 0 ? _b$get : 0);
      difference.set(_item, combinedQuantity);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  if (commutative) {
    var _iterator2 = session_createForOfIteratorHelper(b.entries()),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _step2$value = session_slicedToArray(_step2.value, 2),
            item = _step2$value[0],
            quantity = _step2$value[1];

        if (!a.has(item)) {
          difference.set(item, quantity);
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }

  var diffEntries = session_toConsumableArray(difference.entries());

  return new Map(diffEntries.filter(value => value[1] !== 0));
}
/**
 * A wrapper around tracking items and meat gained from this session
 * Smartly handles foldables being added/removed based on their state
 * Provides operations to add sessions and subtract Sessions so you can isolate the value of each Session using a baseline
 * @member meat the raw meat associated with this Session
 * @member items a map representing the items gained/lost during this Session
 */


var Session = /*#__PURE__*/function () {
  /**
   * Construct a new session
   * @param meat the amount of meat associated with this session
   * @param items the items associated with this session
   */
  function Session(meat, items) {
    session_classCallCheck(this, Session);

    session_defineProperty(this, "meat", void 0);

    session_defineProperty(this, "items", void 0);

    this.meat = meat;
    this.items = items;
  }
  /**
   * Register session results that do not get tracked natively
   * @param target either the Item or a string saying "meat" of what quantity to modify
   * @param quantity How much to modify the tracked amount by
   */


  session_createClass(Session, [{
    key: "register",
    value: function register(target, quantity) {
      if (target === "meat") {
        this.meat += quantity;
      } else {
        var _this$items$get;

        this.items.set(target, ((_this$items$get = this.items.get(target)) !== null && _this$items$get !== void 0 ? _this$items$get : 0) + quantity);
      }
    }
    /**
     * Value this session
     * @param itemValue a function that, when given an item, will give a meat value of the item
     * @returns ItemResult with the full value of this session given the input function
     */

  }, {
    key: "value",
    value: function value(itemValue) {
      // TODO: add garbo specific pricing (sugar equipment for synth, etc.)
      var meat = Math.floor(this.meat);

      var itemDetails = session_toConsumableArray(this.items.entries()).map(_ref => {
        var _ref2 = session_slicedToArray(_ref, 2),
            item = _ref2[0],
            quantity = _ref2[1];

        return {
          item: item,
          quantity: quantity,
          value: itemValue(item) * quantity
        };
      });

      var items = Math.floor(sumNumbers(itemDetails.map(detail => detail.value)));
      return {
        meat: meat,
        items: items,
        total: meat + items,
        itemDetails: itemDetails
      };
    }
    /**
     * Subtract the contents of another session from this one, removing any items that have a resulting quantity of 0
     *  (this will ignore elements in b but not in a)
     * @param other the session from which to pull values to remove from this session
     * @returns a new session representing the difference between this session and the other session
     */

  }, {
    key: "diff",
    value: function diff(other) {
      return new Session(this.meat - other.meat, inventoryOperation(this.items, other.items, (a, b) => a - b, false));
    }
    /**
     * Subtract the contents of snasphot b from session a, removing any items that have a resulting quantity of 0
     *  (this will ignore elements in b but not in a)
     * @param a the session from which to subtract elements
     * @param b the session from which to add elements
     * @returns a new session representing the difference between a and b
     */

  }, {
    key: "add",
    value:
    /**
     * Generate a new session combining multiple sessions together
     * @param other the session from which to add elements to this set
     * @returns a new session representing the addition of other to this
     */
    function add(other) {
      return new Session(this.meat + other.meat, inventoryOperation(this.items, other.items, (a, b) => a + b, true));
    }
    /**
     * Combine the contents of sessions
     * @param sessions the set of sessions to combine together
     * @returns a new session representing the difference between a and b
     */

  }, {
    key: "toFile",
    value:
    /**
     * Export this session to a file in the data/ directory. Conventionally this file should end in ".json"
     * @param filename The file into which to export
     */
    function toFile(filename) {
      var val = {
        meat: this.meat,
        items: Object.fromEntries(this.items)
      };
      (0,external_kolmafia_namespaceObject.bufferToFile)(JSON.stringify(val), Session.getFilepath(filename));
    }
    /**
     * Import a session from a file in the data/ directory. Conventionally the file should end in ".json"
     * @param filename The file from which to import
     * @returns the session represented by the file
     */

  }], [{
    key: "diff",
    value: function diff(a, b) {
      return a.diff(b);
    }
  }, {
    key: "add",
    value: function add() {
      for (var _len = arguments.length, sessions = new Array(_len), _key = 0; _key < _len; _key++) {
        sessions[_key] = arguments[_key];
      }

      return sessions.reduce((previousSession, currentSession) => previousSession.add(currentSession));
    }
  }, {
    key: "getFilepath",
    value: function getFilepath(filename) {
      return filename.endsWith(".json") ? filename : "snapshots/".concat((0,external_kolmafia_namespaceObject.myName)(), "/").concat((0,external_kolmafia_namespaceObject.todayToString)(), "_").concat(filename, ".json");
    }
  }, {
    key: "fromFile",
    value: function fromFile(filename) {
      var fileValue = (0,external_kolmafia_namespaceObject.fileToBuffer)(Session.getFilepath(filename)); // fileToBuffer returns empty string for files that don't exist

      if (fileValue.length > 0) {
        var val = JSON.parse(fileValue);
        var parsedItems = Object.entries(val.items).map(_ref3 => {
          var _ref4 = session_slicedToArray(_ref3, 2),
              itemStr = _ref4[0],
              quantity = _ref4[1];

          return [(0,external_kolmafia_namespaceObject.toItem)(itemStr), quantity];
        });
        return new Session(val.meat, new Map(parsedItems));
      } else {
        // if the file does not exist, return an empty session
        return new Session(0, new Map());
      }
    }
  }, {
    key: "current",
    value: function current() {
      return new Session((0,external_kolmafia_namespaceObject.mySessionMeat)(), mySessionItemsWrapper());
    }
  }]);

  return Session;
}();
;// CONCATENATED MODULE: ./node_modules/libram/dist/resources/2022/CombatLoversLocket.js
var CombatLoversLocket_templateObject;

function CombatLoversLocket_slicedToArray(arr, i) { return CombatLoversLocket_arrayWithHoles(arr) || CombatLoversLocket_iterableToArrayLimit(arr, i) || CombatLoversLocket_unsupportedIterableToArray(arr, i) || CombatLoversLocket_nonIterableRest(); }

function CombatLoversLocket_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function CombatLoversLocket_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return CombatLoversLocket_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return CombatLoversLocket_arrayLikeToArray(o, minLen); }

function CombatLoversLocket_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function CombatLoversLocket_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function CombatLoversLocket_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function CombatLoversLocket_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





 // eslint-disable-next-line libram/verify-constants

var locket = template_string_$item(CombatLoversLocket_templateObject || (CombatLoversLocket_templateObject = CombatLoversLocket_taggedTemplateLiteral(["Combat Lover's Locket"])));
function CombatLoversLocket_have() {
  return haveItem(locket);
}
/**
 * Filters the set of all unlocked locket monsters to only the ones available to be locketed right now.
 * @returns An array consisting of all Monsters you can fight with your locket right now.
 */

function availableLocketMonsters() {
  if (reminiscesLeft() === 0) return [];
  return Object.entries(getLocketMonsters()).filter(_ref => {
    var _ref2 = CombatLoversLocket_slicedToArray(_ref, 2),
        unused = _ref2[1];

    return unused;
  }).map(_ref3 => {
    var _ref4 = CombatLoversLocket_slicedToArray(_ref3, 1),
        name = _ref4[0];

    return toMonster(name);
  });
}
/**
 * Parses getLocketMonsters and returns the collection of all Monsters as an Array.
 * @returns An array consisting of all Monsters you can hypothetically fight, regardless of whether they've been fought today.
 */

function unlockedLocketMonsters() {
  return Object.entries((0,external_kolmafia_namespaceObject.getLocketMonsters)()).map(_ref5 => {
    var _ref6 = CombatLoversLocket_slicedToArray(_ref5, 1),
        name = _ref6[0];

    return (0,external_kolmafia_namespaceObject.toMonster)(name);
  });
}

function parseLocketProperty() {
  return get("_locketMonstersFought").split(",").filter(id => id.trim().length > 0);
}
/**
 * Determines how many reminisces remain by parsing the _locketMonstersFought property.
 * @returns The number of reminisces a player has available; 0 if they lack the Locket.
 */


function reminiscesLeft() {
  return CombatLoversLocket_have() ? clamp(3 - parseLocketProperty().length, 0, 3) : 0;
}
/**
 * Determines which monsters were reminisced today by parsing the _locketMonstersFought property.
 * @returns An array consisting of the Monsters reminisced today.
 */

function monstersReminisced() {
  return parseLocketProperty().map(id => toMonster(id));
}
/**
 * Fight a Monster using the Combat Lover's Locket
 * @param monster The Monster to fight
 * @returns false if we are unable to reminisce about this monster. Else, returns whether, at the end of all things, we have reminisced about this monster.
 */

function reminisce(monster) {
  if (!CombatLoversLocket_have() || reminiscesLeft() === 0 || !getLocketMonsters()[monster.name]) {
    return false;
  }

  cliExecute("reminisce ".concat(monster));
  runCombat();
  return monstersReminisced().includes(monster);
}
/**
 * This function efficiently evaluates all of an adventurer's possibly reminiscable monsters, placing them through a filtering criteria and evaluating them based on a passed function.
 * @param criteria A filtering function for delineating which monsters are "fair game" for the search, such as "is this monster free".
 * @param value A function for deciding which monsters are "better" than others.
 * @returns A singular monster that fulfills the criteria function and maximizes the value function.
 */

function findMonster(criteria) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : () => 1;
  if (!CombatLoversLocket_have() || reminiscesLeft() === 0) return null;
  var options = availableLocketMonsters().filter(criteria);
  if (!options.length) return null;
  return options.reduce((a, b) => value(a) > value(b) ? a : b);
}
;// CONCATENATED MODULE: ./src/tasks/sim.ts
var sim_templateObject, sim_templateObject2, sim_templateObject3, sim_templateObject4, sim_templateObject5, sim_templateObject6, sim_templateObject7, sim_templateObject8, sim_templateObject9, sim_templateObject10, sim_templateObject11, sim_templateObject12, sim_templateObject13, sim_templateObject14, sim_templateObject15, sim_templateObject16, sim_templateObject17, sim_templateObject18, sim_templateObject19, sim_templateObject20, sim_templateObject21, sim_templateObject22, sim_templateObject23, sim_templateObject24, sim_templateObject25, sim_templateObject26, sim_templateObject27, sim_templateObject28, sim_templateObject29, sim_templateObject30, sim_templateObject31, sim_templateObject32, sim_templateObject33, sim_templateObject34, sim_templateObject35, sim_templateObject36, sim_templateObject37, sim_templateObject38, sim_templateObject39, sim_templateObject40, sim_templateObject41, sim_templateObject42;

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
  thing: $skill(sim_templateObject2 || (sim_templateObject2 = sim_taggedTemplateLiteral(["Curse of Weaksauce"]))),
  why: "aftercore combat"
}, {
  thing: $familiars(sim_templateObject3 || (sim_templateObject3 = sim_taggedTemplateLiteral(["Robortender, Space Jellyfish, Hobo Monkey, Leprechaun"]))),
  why: "in-run farming familiar"
}, {
  thing: $skill(sim_templateObject4 || (sim_templateObject4 = sim_taggedTemplateLiteral(["Torso Awareness"]))),
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
  thing: $skill(sim_templateObject13 || (sim_templateObject13 = sim_taggedTemplateLiteral(["Feel Pride"]))),
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
  thing: $skill(sim_templateObject16 || (sim_templateObject16 = sim_taggedTemplateLiteral(["Inscrutable Gaze"]))),
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
  thing: template_string_$item(sim_templateObject31 || (sim_templateObject31 = sim_taggedTemplateLiteral(["miniature crystal ball"]))),
  why: "additional free fight",
  optional: true
}, {
  thing: template_string_$item(sim_templateObject32 || (sim_templateObject32 = sim_taggedTemplateLiteral(["Claw of the Infernal Seal"]))),
  why: "5 additional free seals",
  optional: true
}, {
  thing: template_string_$item(sim_templateObject33 || (sim_templateObject33 = sim_taggedTemplateLiteral(["The Jokester's gun"]))),
  why: "free kill",
  optional: true
}, {
  thing: $skill(sim_templateObject34 || (sim_templateObject34 = sim_taggedTemplateLiteral(["Gingerbread Mob Hit"]))),
  why: "free kill",
  optional: true
}, {
  thing: $skill(sim_templateObject35 || (sim_templateObject35 = sim_taggedTemplateLiteral(["Shattering Punch"]))),
  why: "3 free kills",
  optional: true
}, {
  thing: template_string_$item(sim_templateObject36 || (sim_templateObject36 = sim_taggedTemplateLiteral(["Lil' Doctor\u2122 bag"]))),
  why: "3 free kills",
  optional: true
}];
var marginalList = [{
  thing: $skill(sim_templateObject37 || (sim_templateObject37 = sim_taggedTemplateLiteral(["Snokebomb"]))),
  why: "banish",
  optional: true
}, {
  thing: $skill(sim_templateObject38 || (sim_templateObject38 = sim_taggedTemplateLiteral(["Feel Hatred"]))),
  why: "banish",
  optional: true
}, {
  thing: template_string_$item(sim_templateObject39 || (sim_templateObject39 = sim_taggedTemplateLiteral(["mafia middle finger ring"]))),
  why: "banish",
  optional: true
}, {
  thing: template_string_$item(sim_templateObject40 || (sim_templateObject40 = sim_taggedTemplateLiteral(["hewn moon-rune spoon"]))),
  why: "easier perming of gnome skills",
  optional: true
}, {
  thing: $skill(sim_templateObject41 || (sim_templateObject41 = sim_taggedTemplateLiteral(["Comprehensive Cartography"]))),
  why: "gold wedding ring",
  optional: true
}];

function checkThing(thing) {
  if ("have" in thing && "name" in thing && thing.have instanceof Function) return [thing.have(), thing.name]; //if this is a SpecialThing

  if (thing instanceof external_kolmafia_namespaceObject.Familiar) return [lib_have(thing), thing.hatchling.name];
  if (thing instanceof external_kolmafia_namespaceObject.Skill) return [thing.name in (0,external_kolmafia_namespaceObject.getPermedSkills)(), thing.name];
  if (thing instanceof external_kolmafia_namespaceObject.Monster) return [new Set(unlockedLocketMonsters()).has(thing), thing.name];
  if (thing instanceof external_kolmafia_namespaceObject.Item) return [lib_have(thing) || (0,external_kolmafia_namespaceObject.storageAmount)(thing) > 0, thing.name];
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
  (0,external_kolmafia_namespaceObject.printHtml)("Checking your character... Legend: <font color='#888888'>✓ Have</font> / <font color='red'>X Missing & Required</font> / <font color='black'>X Missing & Optional");

  for (var _i = 0, _categories = categories; _i < _categories.length; _i++) {
    var _categories$_i = sim_slicedToArray(_categories[_i], 2),
        name = _categories$_i[0],
        requirements = _categories$_i[1];

    if (requirements.length === 0) continue;
    var requirements_info = requirements.map(check);
    (0,external_kolmafia_namespaceObject.print)(name, "blue");

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
        (0,external_kolmafia_namespaceObject.print)("".concat(symbol, " ").concat(_name, " - ").concat(req.why), color);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    (0,external_kolmafia_namespaceObject.print)("");
  } // Print the count of missing things


  if (missing > 0) {
    (0,external_kolmafia_namespaceObject.print)("You are missing ".concat(missing, " required things. This script will not yet work for you."), "red");
    if (missing_optional > 0) (0,external_kolmafia_namespaceObject.print)("You are also missing ".concat(missing_optional, " optional things."));
  } else {
    if (missing_optional > 0) {
      (0,external_kolmafia_namespaceObject.print)("You are missing ".concat(missing_optional, " optional things. This script should work, but it could do better."));
    } else {
      (0,external_kolmafia_namespaceObject.print)("You have everything! You are the shiniest star. This script should work great.");
    }
  }
}

function spanWrap(text, color) {
  return "<span color=\"".concat(color, "\">").concat(text, "</span>");
}

function coloredSkill(sk, nPerms, nClass) {
  return sk.name in (0,external_kolmafia_namespaceObject.getPermedSkills)() ? spanWrap(sk.name, "black") : nPerms.includes(sk) && lib_have(sk) ? spanWrap(sk.name, "fuchsia") : nPerms.includes(sk) ? spanWrap(sk.name, "blue") : lib_have(sk) ? spanWrap(sk.name, "purple") : nClass && nClass === sk.class && nClass !== $class(sim_templateObject42 || (sim_templateObject42 = sim_taggedTemplateLiteral(["none"]))) ? spanWrap(sk.name, "navy") : spanWrap(sk.name, "gray");
}
function checkPerms() {
  var nPerms = targetPerms(false);
  var nClass = targetClass(false);
  (0,external_kolmafia_namespaceObject.printHtml)("~~ Default Perm List ~~", false);
  (0,external_kolmafia_namespaceObject.printHtml)("Legend: <span color=\"black\">[permed]</span>, <span color=\"fuchsia\">[targeted/known]</span>, <span color=\"blue\">[targeted/unknown]</span>, <span color=\"purple\">[known]</span>, <span color=\"navy\">[class skills]</span>, <span color=\"gray\">[other]</span>", false);
  var count = 0;
  defaultPermList().forEach(sks => (0,external_kolmafia_namespaceObject.printHtml)("<br>~ ".concat(permTiers[count++], " ~<br> ").concat(sks.map(sk => coloredSkill(sk, nPerms, nClass)).join(", ")), false));
}
;// CONCATENATED MODULE: ./src/tasks/perm.ts
var perm_templateObject, perm_templateObject2, perm_templateObject3, perm_templateObject4, perm_templateObject5, perm_templateObject6, perm_templateObject7, perm_templateObject8, perm_templateObject9, perm_templateObject10, perm_templateObject11, perm_templateObject12, perm_templateObject13, perm_templateObject14, perm_templateObject15, perm_templateObject16;

function perm_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





function perm_getClass(property, _default) {
  return (0,external_kolmafia_namespaceObject.toClass)(property_get(property, _default.toString()));
}
function setClass(property, value) {
  _set(property, value.toString());
}
var baseClasses = $classes(perm_templateObject || (perm_templateObject = perm_taggedTemplateLiteral(["Seal Clubber, Turtle Tamer, Pastamancer, Sauceror, Disco Bandit, Accordion Thief"])));
var gnomeSkills = $skills(perm_templateObject2 || (perm_templateObject2 = perm_taggedTemplateLiteral(["Torso Awareness, Gnefarious Pickpocketing, Powers of Observatiogn, Gnomish Hardigness, Cosmic Ugnderstanding"])));
var permBlockList = $skills(perm_templateObject3 || (perm_templateObject3 = perm_taggedTemplateLiteral(["CLEESH, Chronic Indigestion"])));
var permTiers = ["Tier 0 - All permable non-guild, non-gnome skills (never target these, but perm them if you know them)", "Tier 1 - Needed for the script to run at its best", "Tier 2 - Great skills", "Tier 3 - Good skills", "Tier 4 - QoL skills", "Tier 5 - Ascension-relevant skills", "Tier 6 - Skills with non-zero utility", "Tier 7 - All other guild skills", "Tier 8 - Otherwise-blocked skills"];
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
var defaultPermList = () => permList.slice(0, args.permtier + 1);
function permOptions(planning) {
  //planning = true: next run, false: this run
  var classChoices = planning ? baseClasses : baseClasses.includes((0,external_kolmafia_namespaceObject.myClass)()) ? [(0,external_kolmafia_namespaceObject.myClass)()] : [perm_getClass("goorboNextClass", args.defaultclass)];
  var ctPerms = planning ? targetPerms(false) : [];
  return !planning //current run
  ? defaultPermList().map(sks => sks.filter(sk => !(sk.name in (0,external_kolmafia_namespaceObject.getPermedSkills)()) && (lib_have(sk) || gnomeSkills.includes(sk) && (0,external_kolmafia_namespaceObject.gnomadsAvailable)() || classChoices.includes(sk.class) && sk.level > 0))) //for current run, include skills that we know or that we can train in this run.
  : defaultPermList().map(sks => sks.filter(sk => !(sk.name in (0,external_kolmafia_namespaceObject.getPermedSkills)() || ctPerms.includes(sk)) && (gnomeSkills.includes(sk) || classChoices.includes(sk.class) && sk.level >= 0))); //for next run, exclude all skills that we are planning to perm this run, and allow all guild and gnome skills.
}
function permTier(planning) {
  // the highest tier of unpermed skills available. Returns 0 if no non-tier 0 skills are available
  return permOptions(planning).slice(1).findIndex(sks => sks.length !== 0) + 1;
}
function expectedKarma(planning) {
  return (!planning ? property_get("bankedKarma") + ((0,external_kolmafia_namespaceObject.inHardcore)() ? 200 : (0,external_kolmafia_namespaceObject.inCasual)() ? 0 : 100) : expectedKarma(false) - targetPerms(false).length * 100 + ((0,external_kolmafia_namespaceObject.inHardcore)() ? 200 : (0,external_kolmafia_namespaceObject.inCasual)() ? 0 : 100)) + (args.astralpet === template_string_$item(perm_templateObject12 || (perm_templateObject12 = perm_taggedTemplateLiteral(["none"]))) ? 10 : 0);
}

function shouldBankKarma(planning) {
  var tier = permTier(planning);
  return expectedKarma(planning) / 100 < tier || tier === 0;
}

function targetClass(planning) {
  if ((0,external_kolmafia_namespaceObject.myClass)() === $class(perm_templateObject13 || (perm_templateObject13 = perm_taggedTemplateLiteral(["Grey Goo"])))) {
    if (args["class"] && args["class"] !== $class(perm_templateObject14 || (perm_templateObject14 = perm_taggedTemplateLiteral(["none"])))) return args["class"];
    return perm_getClass("goorboNextClass", args.defaultclass);
  }

  if (planning && args["class"] && args["class"] !== $class(perm_templateObject15 || (perm_templateObject15 = perm_taggedTemplateLiteral(["none"])))) return args["class"]; //can't access permed skill status in grey goo

  if (shouldBankKarma(planning)) return args.defaultclass; //if we will be banking skills

  var sk = permOptions(planning).flat().find(sk => baseClasses.includes(sk.class));
  return sk ? sk.class : args.defaultclass;
}
function targetPerms(planning) {
  var pOptions = permOptions(planning);
  var tier = permTier(planning);
  var maxQty = Math.floor(expectedKarma(planning) / 100);
  if (tier > maxQty || tier === 0) //don't perm anything (bank karma), but do perm high-tier skills you happen to already know (probably due to Big Book or manually used skillbooks)
    return !planning ? pOptions.slice(0, tier + 1) //skills in tiers <= your current best perm target
    .flat().filter(sk => lib_have(sk)).slice(0, maxQty) //don't plan to perm more than we have karma for
    : []; //don't plan to perm anything next run if we plan to bank karma

  var qty = Math.min(maxQty, tier + Math.ceil(Math.sqrt(Math.max(0, maxQty - tier))));
  var tClass = planning ? targetClass(true) : $class(perm_templateObject16 || (perm_templateObject16 = perm_taggedTemplateLiteral(["none"])));
  return (!planning ? pOptions.flat().filter(sk => !gnomeSkills.includes(sk) || (0,external_kolmafia_namespaceObject.gnomadsAvailable)()) : //filter out gnome skills if not available (non-targetClass skills filtered out in permOptions already, for current run)
  pOptions.flat().filter(sk => sk.class === tClass || gnomeSkills.includes(sk)) //filter out non-targetClass skills
  ).slice(0, qty);
}

function planHelper(perms, cls, karma) {
  if (perms.length > 0) return "Perm plan: [".concat(perms.join(", "), "] - Class: <span color=\"blue\">").concat(cls, "</span>, Expected Karma: ").concat(karma);else return "Perm Plan: bank karma - Class: <span color=\"blue\">".concat(cls, "</span>, Expected Karma: ").concat(karma);
}

function printPermPlan() {
  var cClass = targetClass(false);
  var cPerms = targetPerms(false);
  var nClass = targetClass(true);
  var nPerms = targetPerms(true);
  (0,external_kolmafia_namespaceObject.print)();
  (0,external_kolmafia_namespaceObject.printHtml)("Current ".concat(planHelper(cPerms.map(sk => coloredSkill(sk, cPerms, cClass)), cClass, expectedKarma(false))), true);
  (0,external_kolmafia_namespaceObject.printHtml)("Next ".concat(planHelper(nPerms.map(sk => coloredSkill(sk, nPerms, nClass)), nClass, expectedKarma(true))), true);
}
;// CONCATENATED MODULE: ./src/args.ts
var args_templateObject, args_templateObject2, args_templateObject3, args_templateObject4, args_templateObject5, args_templateObject6;

function args_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }






var args = Args.create("goorbo", "Written by frazazel (ign: SketchySolid #422389). This is a full-day script for half-glooping. It aims to be a single-press script that will take you through your Aftercore and Grey You legs, collecting fat loot tokens, getting a Steel Liver, and leveling up to level 13 before running garbo. It chooses a class for you to learn guild skills, and to perm learned skills upon ascension.", {
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
    options: [[-1, "Do not perm anything"]].concat(permTiers.map((str, num) => [num, str.length < 40 ? str.substring(9) : "".concat(str.substring(9, 37), "...")])),
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
  }, external_kolmafia_namespaceObject.Item.get, "ITEM"),
  moonsign: Args.custom({
    help: "Choose the moonsign you want to ascend into",
    options: ["mongoose", "wallaby", "vole", "platypus", "opossum", "marmot", "wombat", "blender", "packrat"].map(str => [toMoonSign(str)]),
    default: toMoonSign("vole")
  }, toMoonSign, "MOONSIGN"),
  defaultclass: Args.custom({
    help: "Choose your default class, if goorbo doesn't have any other goals this run",
    options: $classes(args_templateObject3 || (args_templateObject3 = args_taggedTemplateLiteral(["Seal Clubber, Turtle Tamer, Pastamancer, Sauceror, Disco Bandit, Accordion Thief"]))).map(cl => [cl]),
    default: $class(args_templateObject4 || (args_templateObject4 = args_taggedTemplateLiteral(["Seal Clubber"])))
  }, external_kolmafia_namespaceObject.toClass, "CLASS"),
  class: Args.custom({
    help: "Choose the class to choose at prism break. If set, will override any class that might be desired for skill-perming purposes",
    options: $classes(args_templateObject5 || (args_templateObject5 = args_taggedTemplateLiteral(["none, Seal Clubber, Turtle Tamer, Pastamancer, Sauceror, Disco Bandit, Accordion Thief"]))).map(cl => [cl]),
    default: $class(args_templateObject6 || (args_templateObject6 = args_taggedTemplateLiteral(["none"])))
  }, external_kolmafia_namespaceObject.toClass, "CLASS"),
  clan: Args.string({
    help: "Your VIP Clan. Goorbo will whitelist into it at the beginning of your day. Requires clan whitelist."
  }),
  targetlevel: Args.number({
    help: "What level to target via adventuring in Uncle Gator's after breaking the prism",
    default: 13
  }),
  noticket: Args.flag({
    help: "Run with this flag to skip buying a one-day pass to Dinseylandfill at the beginning of each day. No effect for Dinsey charter owners",
    default: false
  }),
  ascend: Args.flag({
    help: "Run with this flag to skip tasks that prepare you for rollover, including steel liver.",
    default: false
  }),
  gyouscript: Args.string({
    help: "The command that will do your Grey You run for you. Include any arguments desired.",
    default: "loopgyou delaytower tune=wombat chargegoose=20"
  }),
  garbo: Args.string({
    help: "The command that will be used to diet and use all your adventures after reaching level 13 in Day 1 aftercore.",
    default: "garbo"
  }),
  roninfarm: Args.string({
    help: "A command to be run at the start of ronin-farming. For best effect, make sure that it stops when your turncount reaches 1000."
  }),
  postroninfarm: Args.string({
    help: "A command to be run at the start of post-ronin-farming. For best effect, make sure that it stops when your remaining adventures are 40."
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
;// CONCATENATED MODULE: ./src/engine/profits.ts
var profits_templateObject, profits_templateObject2, profits_templateObject3, profits_templateObject4, profits_templateObject5, profits_templateObject6, profits_templateObject7, profits_templateObject8, profits_templateObject9, profits_templateObject10, profits_templateObject11, profits_templateObject12, profits_templateObject13, profits_templateObject14, profits_templateObject15, profits_templateObject16, profits_templateObject17, profits_templateObject18, profits_templateObject19, profits_templateObject20, profits_templateObject21, profits_templateObject22, profits_templateObject23, profits_templateObject24, profits_templateObject25, profits_templateObject26, profits_templateObject27, profits_templateObject28, profits_templateObject29, profits_templateObject30, profits_templateObject31, profits_templateObject32, profits_templateObject33, profits_templateObject34, profits_templateObject35, profits_templateObject36, profits_templateObject37, profits_templateObject38, profits_templateObject39, profits_templateObject40, profits_templateObject41, profits_templateObject42, profits_templateObject43, profits_templateObject44, profits_templateObject45;

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
    var coinmaster = external_kolmafia_namespaceObject.Coinmaster.all().find(c => (0,external_kolmafia_namespaceObject.sellPrice)(c, i) > 0);

    if (!coinmaster) {
      throw "Invalid coinmaster item ".concat(i);
    } else {
      return [i, (0,external_kolmafia_namespaceObject.sellPrice)(coinmaster, i)];
    }
  });
  return () => Math.max.apply(Math, profits_toConsumableArray(unitCost.map(_ref => {
    var _ref2 = profits_slicedToArray(_ref, 2),
        item = _ref2[0],
        cost = _ref2[1];

    return garboValue(item) / cost;
  })));
}

function complexCandy() {
  var candies = external_kolmafia_namespaceObject.Item.all().filter(i => i.candyType === "complex");
  var candyLookup = [[], [], [], [], []];

  var _iterator = profits_createForOfIteratorHelper(candies),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var candy = _step.value;
      var id = (0,external_kolmafia_namespaceObject.toInt)(candy) % 5;

      if (candy.tradeable) {
        candyLookup[id].push(candy);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var candyIdPrices = candies.filter(i => !i.tradeable).map(i => [i, () => Math.min.apply(Math, profits_toConsumableArray(candyLookup[(0,external_kolmafia_namespaceObject.toInt)(i) % 5].map(i => garboValue(i))))]);
  return candyIdPrices;
}

var specialValueLookup = new Map([[template_string_$item(profits_templateObject || (profits_templateObject = profits_taggedTemplateLiteral(["Freddy Kruegerand"]))), currency.apply(void 0, profits_toConsumableArray(template_string_$items(profits_templateObject2 || (profits_templateObject2 = profits_taggedTemplateLiteral(["bottle of Bloodweiser, electric Kool-Aid, Dreadsylvanian skeleton key"])))))], [template_string_$item(profits_templateObject3 || (profits_templateObject3 = profits_taggedTemplateLiteral(["Beach Buck"]))), currency(template_string_$item(profits_templateObject4 || (profits_templateObject4 = profits_taggedTemplateLiteral(["one-day ticket to Spring Break Beach"]))))], [template_string_$item(profits_templateObject5 || (profits_templateObject5 = profits_taggedTemplateLiteral(["Coinspiracy"]))), currency.apply(void 0, profits_toConsumableArray(template_string_$items(profits_templateObject6 || (profits_templateObject6 = profits_taggedTemplateLiteral(["Merc Core deployment orders, karma shawarma"])))))], [template_string_$item(profits_templateObject7 || (profits_templateObject7 = profits_taggedTemplateLiteral(["FunFunds\u2122"]))), currency(template_string_$item(profits_templateObject8 || (profits_templateObject8 = profits_taggedTemplateLiteral(["one-day ticket to Dinseylandfill"]))))], [template_string_$item(profits_templateObject9 || (profits_templateObject9 = profits_taggedTemplateLiteral(["Volcoino"]))), currency(template_string_$item(profits_templateObject10 || (profits_templateObject10 = profits_taggedTemplateLiteral(["one-day ticket to That 70s Volcano"]))))], [template_string_$item(profits_templateObject11 || (profits_templateObject11 = profits_taggedTemplateLiteral(["Wal-Mart gift certificate"]))), currency(template_string_$item(profits_templateObject12 || (profits_templateObject12 = profits_taggedTemplateLiteral(["one-day ticket to The Glaciest"]))))], [template_string_$item(profits_templateObject13 || (profits_templateObject13 = profits_taggedTemplateLiteral(["Rubee\u2122"]))), currency(template_string_$item(profits_templateObject14 || (profits_templateObject14 = profits_taggedTemplateLiteral(["FantasyRealm guest pass"]))))], [template_string_$item(profits_templateObject15 || (profits_templateObject15 = profits_taggedTemplateLiteral(["Guzzlrbuck"]))), currency(template_string_$item(profits_templateObject16 || (profits_templateObject16 = profits_taggedTemplateLiteral(["Never Don't Stop Not Striving"]))))]].concat(profits_toConsumableArray(complexCandy()), [[template_string_$item(profits_templateObject17 || (profits_templateObject17 = profits_taggedTemplateLiteral(["Merc Core deployment orders"]))), () => garboValue(template_string_$item(profits_templateObject18 || (profits_templateObject18 = profits_taggedTemplateLiteral(["one-day ticket to Conspiracy Island"]))))], [template_string_$item(profits_templateObject19 || (profits_templateObject19 = profits_taggedTemplateLiteral(["free-range mushroom"]))), () => 3 * Math.max(garboValue(template_string_$item(profits_templateObject20 || (profits_templateObject20 = profits_taggedTemplateLiteral(["mushroom tea"])))) - garboValue(template_string_$item(profits_templateObject21 || (profits_templateObject21 = profits_taggedTemplateLiteral(["soda water"])))), garboValue(template_string_$item(profits_templateObject22 || (profits_templateObject22 = profits_taggedTemplateLiteral(["mushroom whiskey"])))) - garboValue(template_string_$item(profits_templateObject23 || (profits_templateObject23 = profits_taggedTemplateLiteral(["fermenting powder"])))), garboValue(template_string_$item(profits_templateObject24 || (profits_templateObject24 = profits_taggedTemplateLiteral(["mushroom filet"])))))], [template_string_$item(profits_templateObject25 || (profits_templateObject25 = profits_taggedTemplateLiteral(["little firkin"]))), () => garboAverageValue.apply(void 0, profits_toConsumableArray(template_string_$items(profits_templateObject26 || (profits_templateObject26 = profits_taggedTemplateLiteral(["martini, screwdriver, strawberry daiquiri, margarita, vodka martini, tequila sunrise, bottle of Amontillado, barrel-aged martini, barrel gun"])))))], [template_string_$item(profits_templateObject27 || (profits_templateObject27 = profits_taggedTemplateLiteral(["normal barrel"]))), () => garboAverageValue.apply(void 0, profits_toConsumableArray(template_string_$items(profits_templateObject28 || (profits_templateObject28 = profits_taggedTemplateLiteral(["a little sump'm sump'm, pink pony, rockin' wagon, roll in the hay, slip 'n' slide, slap and tickle"])))))], [template_string_$item(profits_templateObject29 || (profits_templateObject29 = profits_taggedTemplateLiteral(["big tun"]))), () => garboAverageValue.apply(void 0, profits_toConsumableArray(template_string_$items(profits_templateObject30 || (profits_templateObject30 = profits_taggedTemplateLiteral(["gibson, gin and tonic, mimosette, tequila sunset, vodka and tonic, zmobie"])))))], [template_string_$item(profits_templateObject31 || (profits_templateObject31 = profits_taggedTemplateLiteral(["weathered barrel"]))), () => garboAverageValue.apply(void 0, profits_toConsumableArray(template_string_$items(profits_templateObject32 || (profits_templateObject32 = profits_taggedTemplateLiteral(["bean burrito, enchanted bean burrito, jumping bean burrito"])))))], [template_string_$item(profits_templateObject33 || (profits_templateObject33 = profits_taggedTemplateLiteral(["dusty barrel"]))), () => garboAverageValue.apply(void 0, profits_toConsumableArray(template_string_$items(profits_templateObject34 || (profits_templateObject34 = profits_taggedTemplateLiteral(["spicy bean burrito, spicy enchanted bean burrito, spicy jumping bean burrito"])))))], [template_string_$item(profits_templateObject35 || (profits_templateObject35 = profits_taggedTemplateLiteral(["disintegrating barrel"]))), () => garboAverageValue.apply(void 0, profits_toConsumableArray(template_string_$items(profits_templateObject36 || (profits_templateObject36 = profits_taggedTemplateLiteral(["insanely spicy bean burrito, insanely spicy enchanted bean burrito, insanely spicy jumping bean burrito"])))))], [template_string_$item(profits_templateObject37 || (profits_templateObject37 = profits_taggedTemplateLiteral(["moist barrel"]))), () => garboAverageValue.apply(void 0, profits_toConsumableArray(template_string_$items(profits_templateObject38 || (profits_templateObject38 = profits_taggedTemplateLiteral(["cast, concentrated magicalness pill, enchanted barbell, giant moxie weed, Mountain Stream soda"])))))], [template_string_$item(profits_templateObject39 || (profits_templateObject39 = profits_taggedTemplateLiteral(["rotting barrel"]))), () => garboAverageValue.apply(void 0, profits_toConsumableArray(template_string_$items(profits_templateObject40 || (profits_templateObject40 = profits_taggedTemplateLiteral(["Doc Galaktik's Ailment Ointment, extra-strength strongness elixir, jug-o-magicalness, Marquis de Poivre soda, suntan lotion of moxiousness"])))))], [template_string_$item(profits_templateObject41 || (profits_templateObject41 = profits_taggedTemplateLiteral(["mouldering barrel"]))), () => garboAverageValue.apply(void 0, profits_toConsumableArray(template_string_$items(profits_templateObject42 || (profits_templateObject42 = profits_taggedTemplateLiteral(["creepy ginger ale, haunted battery, scroll of drastic healing, synthetic marrow, the funk"])))))], [template_string_$item(profits_templateObject43 || (profits_templateObject43 = profits_taggedTemplateLiteral(["barnacled barrel"]))), () => garboAverageValue.apply(void 0, profits_toConsumableArray(template_string_$items(profits_templateObject44 || (profits_templateObject44 = profits_taggedTemplateLiteral(["Alewife\u2122 Ale, bazookafish bubble gum, beefy fish meat, eel battery, glistening fish meat, ink bladder, pufferfish spine, shark cartilage, slick fish meat, slug of rum, slug of shochu, slug of vodka, temporary teardrop tattoo"])))))], [template_string_$item(profits_templateObject45 || (profits_templateObject45 = profits_taggedTemplateLiteral(["fake hand"]))), () => 50000]]));

function getHistoricalSaleValue(item) {
  if ((0,external_kolmafia_namespaceObject.historicalAge)(item) <= 7.0 && (0,external_kolmafia_namespaceObject.historicalPrice)(item) > 0) {
    var isMallMin = (0,external_kolmafia_namespaceObject.historicalPrice)(item) === Math.max(100, 2 * (0,external_kolmafia_namespaceObject.autosellPrice)(item));
    return isMallMin ? (0,external_kolmafia_namespaceObject.autosellPrice)(item) : 0.9 * (0,external_kolmafia_namespaceObject.historicalPrice)(item);
  }

  return getSaleValue(item);
}

var garboValueCache = new Map();
function garboValue(item) {
  var cachedValue = garboValueCache.get(item);

  if (cachedValue === undefined) {
    var specialValueCompute = specialValueLookup.get(item);
    var value = specialValueCompute ? specialValueCompute() : getHistoricalSaleValue(item);
    (0,external_kolmafia_namespaceObject.print)("Valuing ".concat(item.name, " @ ").concat(value));
    garboValueCache.set(item, value);
    return value;
  }

  return cachedValue;
}
function garboAverageValue() {
  for (var _len2 = arguments.length, items = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    items[_key2] = arguments[_key2];
  }

  return sumNumbers(items.map(garboValue)) / items.length;
}

var DailySetting = /*#__PURE__*/function () {
  function DailySetting(key) {
    profits_classCallCheck(this, DailySetting);

    profits_defineProperty(this, "key", void 0);

    this.key = key;
  }

  profits_createClass(DailySetting, [{
    key: "get",
    value: function get(def) {
      var saved = property_get(this.key, "");

      if (saved === "") return def;
      var json = JSON.parse(saved);
      if ("day" in json && "value" in json && json["day"] === (0,external_kolmafia_namespaceObject.gamedayToInt)()) return json["value"];else return def;
    }
  }, {
    key: "set",
    value: function set(value) {
      _set(this.key, JSON.stringify({
        day: (0,external_kolmafia_namespaceObject.gamedayToInt)(),
        value: value
      }));
    }
  }]);

  return DailySetting;
}();

var ProfitTracker = /*#__PURE__*/function () {
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
    this.turns = (0,external_kolmafia_namespaceObject.myTurncount)();
    this.hours = (0,external_kolmafia_namespaceObject.gametimeToInt)() / (1000 * 60 * 60);
    this.ascensions = (0,external_kolmafia_namespaceObject.myAscensions)();
    this.pulled = new Set(property_get("_roninStoragePulls").split(",").map(id => parseInt(id)).filter(id => id > 0).map(id => external_kolmafia_namespaceObject.Item.get(id)));
  }

  profits_createClass(ProfitTracker, [{
    key: "reset",
    value: function reset() {
      this.session = Session.current();
      this.turns = (0,external_kolmafia_namespaceObject.myTurncount)();
      this.hours = (0,external_kolmafia_namespaceObject.gametimeToInt)() / (1000 * 60 * 60);
      this.ascensions = (0,external_kolmafia_namespaceObject.myAscensions)();
      this.pulled = new Set(property_get("_roninStoragePulls").split(",").map(id => parseInt(id)).filter(id => id > 0).map(id => external_kolmafia_namespaceObject.Item.get(id)));
    }
  }, {
    key: "record",
    value: function record(tag) {
      if (this.ascensions < (0,external_kolmafia_namespaceObject.myAscensions)()) {
        // Session tracking is not accurate across ascensions
        this.reset();
        return;
      } // Pulled items are tracked oddly in the Session
      // (they are included in the Session diff by default)


      var newPulls = new Set(property_get("_roninStoragePulls").split(",").map(id => parseInt(id)).filter(id => id > 0).map(id => external_kolmafia_namespaceObject.Item.get(id)));

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
      var value = diff.value(garboValue);
      this.records[tag].meat += value.meat;
      this.records[tag].items += value.items;
      this.records[tag].turns += (0,external_kolmafia_namespaceObject.myTurncount)() - this.turns;
      this.records[tag].hours += (0,external_kolmafia_namespaceObject.gametimeToInt)() / (1000 * 60 * 60) - this.hours;
      (0,external_kolmafia_namespaceObject.print)("Profit: ".concat(value.meat, ", ").concat(value.items, ", ").concat((0,external_kolmafia_namespaceObject.myTurncount)() - this.turns, ", ").concat((0,external_kolmafia_namespaceObject.gametimeToInt)() / (1000 * 60 * 60) - this.hours));
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
}();

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
  (0,external_kolmafia_namespaceObject.print)("".concat(key, ": ").concat(numberWithCommas(record.meat), " meat + ").concat(numberWithCommas(record.items), " items (").concat(record.turns, " turns + ").concat(numberWithCommas(record.hours), " hours)"), color);
}

function printProfits(records) {
  (0,external_kolmafia_namespaceObject.print)("");
  (0,external_kolmafia_namespaceObject.print)("== Daily Loop Profit ==");
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

function utils_toConsumableArray(arr) { return utils_arrayWithoutHoles(arr) || utils_iterableToArray(arr) || tasks_utils_unsupportedIterableToArray(arr) || utils_nonIterableSpread(); }

function utils_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function tasks_utils_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return tasks_utils_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return tasks_utils_arrayLikeToArray(o, minLen); }

function utils_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function utils_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return tasks_utils_arrayLikeToArray(arr); }

function tasks_utils_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function utils_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





function haveAll(its) {
  return its.reduce((a, it) => a && lib_have(it), true);
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
  return "-ml, ".concat(minusMLItems.filter(it => lib_have(it)).map(it => "-equip ".concat(it.name)).join(", "));
}
function maxBase() {
  return "175 bonus June Cleaver, ".concat(garboValue(template_string_$item(utils_templateObject2 || (utils_templateObject2 = utils_taggedTemplateLiteral(["FunFunds\u2122"])))) / 20 + 5, " bonus lucky gold ring, 250 bonus Mr. Cheeng's spectacles, ").concat(0.4 * property_get("valueOfAdventure"), " bonus mafia thumb ring, 10 bonus tiny stillsuit");
}

function famValue(fam, mob) {
  switch (fam) {
    case template_string_$familiar(utils_templateObject3 || (utils_templateObject3 = utils_taggedTemplateLiteral(["Grey Goose"]))):
      return (0,external_kolmafia_namespaceObject.myLevel)() < args.targetlevel && template_string_$familiar(utils_templateObject4 || (utils_templateObject4 = utils_taggedTemplateLiteral(["Grey Goose"]))).experience < 400 ? 6000 : 0;

    case template_string_$familiar(utils_templateObject5 || (utils_templateObject5 = utils_taggedTemplateLiteral(["Red-Nosed Snapper"]))):
      if (mob && getTrackedPhylum() && mob.phylum === getTrackedPhylum()) return garboValue(phylumItem.get(getTrackedPhylum() || $phylum(utils_templateObject6 || (utils_templateObject6 = utils_taggedTemplateLiteral(["none"])))) || template_string_$item(utils_templateObject7 || (utils_templateObject7 = utils_taggedTemplateLiteral(["none"])))) / 11;
      return 0;

    case template_string_$familiar(utils_templateObject8 || (utils_templateObject8 = utils_taggedTemplateLiteral(["Cookbookbat"]))):
      return template_string_$items(utils_templateObject9 || (utils_templateObject9 = utils_taggedTemplateLiteral([""]))).find(it => it.name.indexOf("Recipe of Before Yore") >= 0 && lib_have(it)) ? garboAverageValue.apply(void 0, utils_toConsumableArray(template_string_$items(utils_templateObject10 || (utils_templateObject10 = utils_taggedTemplateLiteral(["Yeast of Boris, Vegetable of Jarlsberg, St. Sneaky Pete's Whey"]))))) * (3.0 / 11) : 5000;

    case template_string_$familiar(utils_templateObject11 || (utils_templateObject11 = utils_taggedTemplateLiteral(["Shorter-Order Cook"]))):
      return garboAverageValue.apply(void 0, utils_toConsumableArray(template_string_$items(utils_templateObject12 || (utils_templateObject12 = utils_taggedTemplateLiteral(["short white, short beer, short glass of water, short stack of pancakes, short stick of butter"]))))) / 11;
  }

  return 0;
}

function meatFam() {
  return $familiars(utils_templateObject13 || (utils_templateObject13 = utils_taggedTemplateLiteral(["Space Jellyfish, Robortender, Hobo Monkey, Cat Burglar"]))).find(fam => lib_have(fam)) || template_string_$familiar(utils_templateObject14 || (utils_templateObject14 = utils_taggedTemplateLiteral(["Leprechaun"])));
}
function bestFam(mob) {
  var fams = $familiars(utils_templateObject15 || (utils_templateObject15 = utils_taggedTemplateLiteral(["Grey Goose, Red-Nosed Snapper, Cookbookbat, Shorter-Order Cook"]))).filter(fam => lib_have(fam)).sort((a, b) => famValue(b, mob) - famValue(a, mob));
  return fams.find(fam => lib_have(fam));
}
function canDiet() {
  return (0,external_kolmafia_namespaceObject.myFullness)() < (0,external_kolmafia_namespaceObject.fullnessLimit)() || (0,external_kolmafia_namespaceObject.mySpleenUse)() < (0,external_kolmafia_namespaceObject.spleenLimit)() || (0,external_kolmafia_namespaceObject.myInebriety)() < (0,external_kolmafia_namespaceObject.inebrietyLimit)() || lib_have(template_string_$item(utils_templateObject16 || (utils_templateObject16 = utils_taggedTemplateLiteral(["distention pill"])))) && !property_get("_distentionPillUsed") || lib_have(template_string_$item(utils_templateObject17 || (utils_templateObject17 = utils_taggedTemplateLiteral(["synthetic dog hair pill"])))) && !property_get("_syntheticDogHairPillUsed") || lib_have(template_string_$item(utils_templateObject18 || (utils_templateObject18 = utils_taggedTemplateLiteral(["designer sweatpants"])))) && property_get("_sweatOutSomeBoozeUsed") < 3 && property_get("sweat") >= 25 || lib_have(template_string_$item(utils_templateObject19 || (utils_templateObject19 = utils_taggedTemplateLiteral(["mime army shotglass"])))) && !property_get("_mimeArmyShotglassUsed") || property_get("currentMojoFilters") < 3 && (0,external_kolmafia_namespaceObject.mallPrice)(template_string_$item(utils_templateObject20 || (utils_templateObject20 = utils_taggedTemplateLiteral(["mojo filter"])))) + (0,external_kolmafia_namespaceObject.mallPrice)(template_string_$item(utils_templateObject21 || (utils_templateObject21 = utils_taggedTemplateLiteral(["transdermal smoke patch"])))) < 2.5 * property_get("valueOfAdventure");
}
function stooperDrunk() {
  return (0,external_kolmafia_namespaceObject.myInebriety)() > (0,external_kolmafia_namespaceObject.inebrietyLimit)() || (0,external_kolmafia_namespaceObject.myInebriety)() === (0,external_kolmafia_namespaceObject.inebrietyLimit)() && (0,external_kolmafia_namespaceObject.myFamiliar)() === template_string_$familiar(utils_templateObject22 || (utils_templateObject22 = utils_taggedTemplateLiteral(["Stooper"])));
}
function totallyDrunk() {
  return lib_have(template_string_$familiar(utils_templateObject23 || (utils_templateObject23 = utils_taggedTemplateLiteral(["Stooper"])))) && (0,external_kolmafia_namespaceObject.myFamiliar)() !== template_string_$familiar(utils_templateObject24 || (utils_templateObject24 = utils_taggedTemplateLiteral(["Stooper"]))) ? (0,external_kolmafia_namespaceObject.myInebriety)() > (0,external_kolmafia_namespaceObject.inebrietyLimit)() + 1 : (0,external_kolmafia_namespaceObject.myInebriety)() > (0,external_kolmafia_namespaceObject.inebrietyLimit)();
}
function doneAdventuring() {
  return !canDiet() && (0,external_kolmafia_namespaceObject.myAdventures)() === 0 || stooperDrunk();
}
function backstageItemsDone() {
  return (lib_have(template_string_$item(utils_templateObject25 || (utils_templateObject25 = utils_taggedTemplateLiteral(["giant marshmallow"])))) ? 1 : 0) + (lib_have(template_string_$item(utils_templateObject26 || (utils_templateObject26 = utils_taggedTemplateLiteral(["beer-scented teddy bear"])))) ? 1 : 0) + (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(utils_templateObject27 || (utils_templateObject27 = utils_taggedTemplateLiteral(["gin-soaked blotter paper"])))) >= 2 && (lib_have(template_string_$item(utils_templateObject28 || (utils_templateObject28 = utils_taggedTemplateLiteral(["booze-soaked cherry"])))) ? 1 : 0) + (lib_have(template_string_$item(utils_templateObject29 || (utils_templateObject29 = utils_taggedTemplateLiteral(["comfy pillow"])))) ? 1 : 0) + (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(utils_templateObject30 || (utils_templateObject30 = utils_taggedTemplateLiteral(["sponge cake"])))) >= 2;
}
var utils_gardens = template_string_$items(utils_templateObject31 || (utils_templateObject31 = utils_taggedTemplateLiteral(["packet of pumpkin seeds, Peppermint Pip Packet, packet of dragon's teeth, packet of beer seeds, packet of winter seeds, packet of thanksgarden seeds, packet of tall grass seeds, packet of mushroom spores"])));
function getGarden() {
  return utils_gardens.find(it => it.name in (0,external_kolmafia_namespaceObject.getCampground)()) || template_string_$item(utils_templateObject32 || (utils_templateObject32 = utils_taggedTemplateLiteral(["none"])));
}
var banishes;
function nextUnusedBanishItem() {
  if (!banishes) banishes = template_string_$items(utils_templateObject33 || (utils_templateObject33 = utils_taggedTemplateLiteral(["human musk, tennis ball, Louder Than Bomb, divine champagne popper"]))).sort((a, b) => (0,external_kolmafia_namespaceObject.mallPrice)(a) - (0,external_kolmafia_namespaceObject.mallPrice)(b)); //sorted from cheapest to most expensive

  return banishes.find(it => !getBanishedMonsters().get(it)) || template_string_$item(utils_templateObject34 || (utils_templateObject34 = utils_taggedTemplateLiteral(["none"]))); //return the cheapest free banish not currently in use
}
function chewOrWish(it, ef) {
  if ((0,external_kolmafia_namespaceObject.mallPrice)(it) + (0,external_kolmafia_namespaceObject.mallPrice)(template_string_$item(utils_templateObject35 || (utils_templateObject35 = utils_taggedTemplateLiteral(["mojo filter"])))) < (0,external_kolmafia_namespaceObject.mallPrice)(template_string_$item(utils_templateObject36 || (utils_templateObject36 = utils_taggedTemplateLiteral(["pocket wish"]))))) {
    if ((0,external_kolmafia_namespaceObject.mySpleenUse)() === (0,external_kolmafia_namespaceObject.spleenLimit)()) (0,external_kolmafia_namespaceObject.use)(1, template_string_$item(utils_templateObject37 || (utils_templateObject37 = utils_taggedTemplateLiteral(["mojo filter"]))));
    (0,external_kolmafia_namespaceObject.chew)(it);
  } else {
    (0,external_kolmafia_namespaceObject.retrieveItem)(template_string_$item(utils_templateObject38 || (utils_templateObject38 = utils_taggedTemplateLiteral(["pocket wish"]))));
    (0,external_kolmafia_namespaceObject.cliExecute)("genie effect ".concat(ef.name));
  }
}
function expectCMC() {
  return (0,external_kolmafia_namespaceObject.getWorkshed)() !== template_string_$item(utils_templateObject39 || (utils_templateObject39 = utils_taggedTemplateLiteral(["cold medicine cabinet"]))) && lib_have(template_string_$item(utils_templateObject40 || (utils_templateObject40 = utils_taggedTemplateLiteral(["cold medicine cabinet"])))) && !property_get("_workshedItemUsed");
}
function isGoodGarboScript(scr) {
  // Returns true if scr includes "garbo", and doesn't include a semicolon
  return scr.includes("garbo") && !scr.includes(";");
}
;// CONCATENATED MODULE: ./src/tasks/aftercore.ts
var aftercore_templateObject, aftercore_templateObject2, aftercore_templateObject3, aftercore_templateObject4, aftercore_templateObject5, aftercore_templateObject6, aftercore_templateObject7, aftercore_templateObject8, aftercore_templateObject9, aftercore_templateObject10, aftercore_templateObject11, aftercore_templateObject12, aftercore_templateObject13, aftercore_templateObject14, aftercore_templateObject15, aftercore_templateObject16, aftercore_templateObject17, aftercore_templateObject18, aftercore_templateObject19, aftercore_templateObject20, aftercore_templateObject21, aftercore_templateObject22, aftercore_templateObject23, aftercore_templateObject24, aftercore_templateObject25, aftercore_templateObject26, aftercore_templateObject27, aftercore_templateObject28, aftercore_templateObject29, aftercore_templateObject30, aftercore_templateObject31, aftercore_templateObject32, aftercore_templateObject33, aftercore_templateObject34, aftercore_templateObject35, aftercore_templateObject36, aftercore_templateObject37, aftercore_templateObject38, aftercore_templateObject39, aftercore_templateObject40, aftercore_templateObject41, aftercore_templateObject42, aftercore_templateObject43, aftercore_templateObject44, aftercore_templateObject45, aftercore_templateObject46, aftercore_templateObject47, aftercore_templateObject48, aftercore_templateObject49, aftercore_templateObject50, aftercore_templateObject51, aftercore_templateObject52, aftercore_templateObject53, aftercore_templateObject54, aftercore_templateObject55, aftercore_templateObject56, aftercore_templateObject57, aftercore_templateObject58, aftercore_templateObject59, aftercore_templateObject60, aftercore_templateObject61, aftercore_templateObject62, aftercore_templateObject63, aftercore_templateObject64, aftercore_templateObject65, aftercore_templateObject66, aftercore_templateObject67, aftercore_templateObject68, aftercore_templateObject69, aftercore_templateObject70, aftercore_templateObject71, aftercore_templateObject72, aftercore_templateObject73, aftercore_templateObject74, aftercore_templateObject75, aftercore_templateObject76, aftercore_templateObject77, aftercore_templateObject78, aftercore_templateObject79, aftercore_templateObject80, aftercore_templateObject81, aftercore_templateObject82, aftercore_templateObject83, aftercore_templateObject84, aftercore_templateObject85, _templateObject86, _templateObject87, _templateObject88, _templateObject89, _templateObject90, _templateObject91, _templateObject92, _templateObject93, _templateObject94, _templateObject95, _templateObject96, _templateObject97, _templateObject98, _templateObject99, _templateObject100, _templateObject101, _templateObject102, _templateObject103, _templateObject104, _templateObject105, _templateObject106, _templateObject107, _templateObject108, _templateObject109, _templateObject110, _templateObject111, _templateObject112, _templateObject113, _templateObject114, _templateObject115, _templateObject116, _templateObject117, _templateObject118, _templateObject119, _templateObject120, _templateObject121, _templateObject122, _templateObject123, _templateObject124, _templateObject125, _templateObject126, _templateObject127;

function aftercore_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function aftercore_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? aftercore_ownKeys(Object(source), !0).forEach(function (key) { aftercore_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : aftercore_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function aftercore_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function aftercore_toConsumableArray(arr) { return aftercore_arrayWithoutHoles(arr) || aftercore_iterableToArray(arr) || aftercore_unsupportedIterableToArray(arr) || aftercore_nonIterableSpread(); }

function aftercore_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function aftercore_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return aftercore_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return aftercore_arrayLikeToArray(o, minLen); }

function aftercore_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function aftercore_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return aftercore_arrayLikeToArray(arr); }

function aftercore_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function aftercore_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }








function AftercoreQuest() {
  return {
    name: "Aftercore",
    completed: () => getCurrentLeg() > Leg.Aftercore,
    tasks: [{
      name: "Whitelist VIP Clan",
      completed: () => !args.clan || (0,external_kolmafia_namespaceObject.getClanName)().toLowerCase() === args.clan.toLowerCase(),
      do: () => (0,external_kolmafia_namespaceObject.cliExecute)("/whitelist ".concat(args.clan))
    }, {
      name: "Prep Fireworks Shop",
      completed: () => !lib_have(template_string_$item(aftercore_templateObject || (aftercore_templateObject = aftercore_taggedTemplateLiteral(["Clan VIP Lounge key"])))) || property_get("_goorboFireworksPrepped", false),
      do: () => {
        (0,external_kolmafia_namespaceObject.visitUrl)("clan_viplounge.php?action=fwshop&whichfloor=2");
        _set("_goorboFireworksPrepped", true);
      }
    }, {
      name: "Breakfast",
      completed: () => property_get("breakfastCompleted"),
      do: () => (0,external_kolmafia_namespaceObject.cliExecute)("breakfast")
    }, {
      name: "Harvest Garden",
      completed: () => getGarden() === template_string_$item(aftercore_templateObject2 || (aftercore_templateObject2 = aftercore_taggedTemplateLiteral(["none"]))) || getGarden() === template_string_$item(aftercore_templateObject3 || (aftercore_templateObject3 = aftercore_taggedTemplateLiteral(["packet of mushroom spores"]))) || (0,external_kolmafia_namespaceObject.getCampground)()[getGarden().name] === 0,
      do: () => (0,external_kolmafia_namespaceObject.cliExecute)("garden pick"),
      tracking: "Dailies",
      limit: {
        tries: 3
      }
    }, {
      name: "Plant Grass",
      completed: () => !lib_have(template_string_$item(aftercore_templateObject4 || (aftercore_templateObject4 = aftercore_taggedTemplateLiteral(["packet of tall grass seeds"])))) || getGarden() === template_string_$item(aftercore_templateObject5 || (aftercore_templateObject5 = aftercore_taggedTemplateLiteral(["packet of tall grass seeds"]))),
      do: () => (0,external_kolmafia_namespaceObject.use)(template_string_$item(aftercore_templateObject6 || (aftercore_templateObject6 = aftercore_taggedTemplateLiteral(["packet of tall grass seeds"]))))
    }, {
      name: "Drive Observantly",
      completed: () => property_get("dailyDungeonDone") || (0,external_kolmafia_namespaceObject.getWorkshed)() !== template_string_$item(aftercore_templateObject7 || (aftercore_templateObject7 = aftercore_taggedTemplateLiteral(["Asdon Martin keyfob"]))) || (0,external_kolmafia_namespaceObject.haveEffect)($effect(aftercore_templateObject8 || (aftercore_templateObject8 = aftercore_taggedTemplateLiteral(["Driving Observantly"])))) >= (totallyDrunk() || !lib_have(template_string_$item(aftercore_templateObject9 || (aftercore_templateObject9 = aftercore_taggedTemplateLiteral(["Drunkula's wineglass"])))) ? (0,external_kolmafia_namespaceObject.myAdventures)() : (0,external_kolmafia_namespaceObject.myAdventures)() + 60),
      do: () => drive($effect(aftercore_templateObject10 || (aftercore_templateObject10 = aftercore_taggedTemplateLiteral(["Driving Observantly"]))), totallyDrunk() || !lib_have(template_string_$item(aftercore_templateObject11 || (aftercore_templateObject11 = aftercore_taggedTemplateLiteral(["Drunkula's wineglass"])))) ? (0,external_kolmafia_namespaceObject.myAdventures)() : (0,external_kolmafia_namespaceObject.myAdventures)() + 60, false),
      limit: {
        tries: 5
      }
    }, {
      name: "Sample Constellation DNA",
      ready: () => lib_have(template_string_$item(aftercore_templateObject12 || (aftercore_templateObject12 = aftercore_taggedTemplateLiteral(["DNA extraction syringe"])))),
      completed: () => !DNALab_installed() || isHybridized($phylum(aftercore_templateObject13 || (aftercore_templateObject13 = aftercore_taggedTemplateLiteral(["Constellation"])))) || property_get("dnaSyringe") === $phylum(aftercore_templateObject14 || (aftercore_templateObject14 = aftercore_taggedTemplateLiteral(["Constellation"]))),
      outfit: {
        familiar: bestFam(),
        modifier: "".concat(maxBase())
      },
      do: $location(aftercore_templateObject15 || (aftercore_templateObject15 = aftercore_taggedTemplateLiteral(["The Hole in the Sky"]))),
      combat: new CombatStrategy().macro(Macro.skill($skill(aftercore_templateObject16 || (aftercore_templateObject16 = aftercore_taggedTemplateLiteral(["Infinite Loop"])))), getTodaysHolidayWanderers()).macro(Macro.tryItem(template_string_$item(aftercore_templateObject17 || (aftercore_templateObject17 = aftercore_taggedTemplateLiteral(["DNA extraction syringe"]))))).macro(Macro.tryItem(template_string_$item(aftercore_templateObject18 || (aftercore_templateObject18 = aftercore_taggedTemplateLiteral(["porquoise-handled sixgun"])))).trySkill($skill(aftercore_templateObject19 || (aftercore_templateObject19 = aftercore_taggedTemplateLiteral(["Sing Along"])))).attack().repeat())
    }, {
      name: "Hybridize Constellation",
      ready: () => property_get("dnaSyringe") === $phylum(aftercore_templateObject20 || (aftercore_templateObject20 = aftercore_taggedTemplateLiteral(["Constellation"]))),
      completed: () => !DNALab_installed() || isHybridized($phylum(aftercore_templateObject21 || (aftercore_templateObject21 = aftercore_taggedTemplateLiteral(["Constellation"])))),
      do: () => {
        makeTonic(3);
        hybridize();
      }
    }, {
      name: "LGR Seed",
      completed: () => args.noticket || property_get("_stenchAirportToday") || property_get("stenchAirportAlways") || !lib_have(template_string_$item(aftercore_templateObject22 || (aftercore_templateObject22 = aftercore_taggedTemplateLiteral(["lucky gold ring"])))),
      do: () => (0,external_kolmafia_namespaceObject.use)(template_string_$item(aftercore_templateObject23 || (aftercore_templateObject23 = aftercore_taggedTemplateLiteral(["one-day ticket to Dinseylandfill"]))))
    }, {
      name: "June Cleaver",
      completed: () => !lib_have(template_string_$item(aftercore_templateObject24 || (aftercore_templateObject24 = aftercore_taggedTemplateLiteral(["June cleaver"])))) || property_get("_juneCleaverFightsLeft") > 0 || (0,external_kolmafia_namespaceObject.myAdventures)() === 0,
      choices: {
        793: 4,
        //The Shore -> Gift Shop
        1467: 3,
        //Poetic Justice
        1468: () => property_get("_juneCleaverSkips") < 5 ? 4 : 2,
        //Aunts not Ants
        1469: 3,
        //Beware of Aligator
        1470: () => property_get("_juneCleaverSkips") < 5 ? 4 : 2,
        //Teacher's Pet
        1471: 1,
        //Lost and Found
        1472: () => property_get("_juneCleaverSkips") < 5 ? 4 : 1,
        //Summer Days
        1473: () => property_get("_juneCleaverSkips") < 5 ? 4 : 1,
        //Bath Time
        1474: () => property_get("_juneCleaverSkips") < 5 ? 4 : 2,
        //Delicious Sprouts
        1475: 1 //Hypnotic Master

      },
      prepare: () => {
        if (!(0,external_kolmafia_namespaceObject.canAdventure)($location(aftercore_templateObject25 || (aftercore_templateObject25 = aftercore_taggedTemplateLiteral(["The Shore, Inc. Travel Agency"]))))) (0,external_kolmafia_namespaceObject.retrieveItem)(template_string_$item(aftercore_templateObject26 || (aftercore_templateObject26 = aftercore_taggedTemplateLiteral(["bitchin' meatcar"]))));
      },
      do: $location(aftercore_templateObject27 || (aftercore_templateObject27 = aftercore_taggedTemplateLiteral(["The Shore, Inc. Travel Agency"]))),
      post: () => {
        if ((0,external_kolmafia_namespaceObject.handlingChoice)()) (0,external_kolmafia_namespaceObject.visitUrl)("main.php");
        if (lib_have($effect(aftercore_templateObject28 || (aftercore_templateObject28 = aftercore_taggedTemplateLiteral(["Beaten Up"]))))) uneffect($effect(aftercore_templateObject29 || (aftercore_templateObject29 = aftercore_taggedTemplateLiteral(["Beaten Up"]))));
      },
      outfit: () => ({
        equip: template_string_$items(aftercore_templateObject30 || (aftercore_templateObject30 = aftercore_taggedTemplateLiteral(["June cleaver"])))
      }),
      limit: undefined
    }, {
      name: "Restore HP",
      completed: () => (0,external_kolmafia_namespaceObject.myHp)() > 0.5 * (0,external_kolmafia_namespaceObject.myMaxhp)(),
      do: () => (0,external_kolmafia_namespaceObject.restoreHp)(0.95 * (0,external_kolmafia_namespaceObject.myMaxhp)())
    }, {
      name: "Implement Glitch",
      ready: () => lib_have(template_string_$item(aftercore_templateObject31 || (aftercore_templateObject31 = aftercore_taggedTemplateLiteral(["[glitch season reward name]"])))),
      completed: () => property_get("_glitchItemImplemented"),
      do: () => (0,external_kolmafia_namespaceObject.use)(template_string_$item(aftercore_templateObject32 || (aftercore_templateObject32 = aftercore_taggedTemplateLiteral(["[glitch season reward name]"]))))
    }, {
      name: "Fight Glitch",
      ready: () => lib_have(template_string_$item(aftercore_templateObject33 || (aftercore_templateObject33 = aftercore_taggedTemplateLiteral(["[glitch season reward name]"])))),
      completed: () => property_get("_glitchMonsterFights") > 0,
      acquire: template_string_$items(aftercore_templateObject34 || (aftercore_templateObject34 = aftercore_taggedTemplateLiteral(["gas can, gas balloon, shard of double-ice"]))).map(it => ({
        item: it,
        price: 1000
      })),
      prepare: () => {
        (0,external_kolmafia_namespaceObject.restoreHp)(0.9 * (0,external_kolmafia_namespaceObject.myHp)());
        if (lib_have($skill(aftercore_templateObject35 || (aftercore_templateObject35 = aftercore_taggedTemplateLiteral(["Blood Bubble"])))) && !lib_have($effect(aftercore_templateObject36 || (aftercore_templateObject36 = aftercore_taggedTemplateLiteral(["Blood Bubble"]))))) (0,external_kolmafia_namespaceObject.useSkill)($skill(aftercore_templateObject37 || (aftercore_templateObject37 = aftercore_taggedTemplateLiteral(["Blood Bubble"]))));
      },
      do: () => (0,external_kolmafia_namespaceObject.visitUrl)("inv_eat.php?pwd&whichitem=10207"),
      post: () => {
        if (!property_get("_lastCombatWon")) throw new Error("Lost Combat - Check to see what went wrong.");
      },
      outfit: () => ({
        familiar: bestFam(),
        modifier: "".concat((0,external_kolmafia_namespaceObject.myPrimestat)(), " experience, 5 ").concat((0,external_kolmafia_namespaceObject.myPrimestat)(), " experience percent, ").concat(noML())
      }),
      combat: new CombatStrategy().macro(() => {
        var _Macro$tryItem$trySki;

        return (_Macro$tryItem$trySki = Macro.tryItem(template_string_$item(aftercore_templateObject38 || (aftercore_templateObject38 = aftercore_taggedTemplateLiteral(["gas balloon"])))).trySkill($skill(aftercore_templateObject39 || (aftercore_templateObject39 = aftercore_taggedTemplateLiteral(["Feel Pride"]))))).tryItem.apply(_Macro$tryItem$trySki, aftercore_toConsumableArray(template_string_$items(aftercore_templateObject40 || (aftercore_templateObject40 = aftercore_taggedTemplateLiteral(["shard of double-ice, gas can"]))))).attack().repeat();
      }),
      tracking: "Leveling"
    }, {
      name: "Daily Dungeon",
      completed: () => property_get("dailyDungeonDone") || (0,external_kolmafia_namespaceObject.myAdventures)() === 0 || stooperDrunk(),
      acquire: template_string_$items(aftercore_templateObject41 || (aftercore_templateObject41 = aftercore_taggedTemplateLiteral(["eleven-foot pole, Pick-O-Matic lockpicks, ring of Detect Boring Doors"]))).map(it => ({
        item: it,
        price: 1000
      })),
      outfit: () => aftercore_objectSpread(aftercore_objectSpread({
        familiar: bestFam()
      }, property_get("_lastDailyDungeonRoom") % 5 === 4 ? {
        acc1: template_string_$item(aftercore_templateObject42 || (aftercore_templateObject42 = aftercore_taggedTemplateLiteral(["ring of Detect Boring Doors"])))
      } : {}), {}, {
        modifier: "".concat(maxBase(), ", 250 bonus carnivorous potted plant")
      }),
      prepare: () => {
        if (!property_get("_dailyDungeonMalwareUsed") && (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(aftercore_templateObject43 || (aftercore_templateObject43 = aftercore_taggedTemplateLiteral(["fat loot token"])))) < 3 && (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(aftercore_templateObject44 || (aftercore_templateObject44 = aftercore_taggedTemplateLiteral(["daily dungeon malware"])))) === 0) {
          if ((0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(aftercore_templateObject45 || (aftercore_templateObject45 = aftercore_taggedTemplateLiteral(["BACON"])))) >= 150) (0,external_kolmafia_namespaceObject.buy)($coinmaster(aftercore_templateObject46 || (aftercore_templateObject46 = aftercore_taggedTemplateLiteral(["internet meme shop"]))), 1, template_string_$item(aftercore_templateObject47 || (aftercore_templateObject47 = aftercore_taggedTemplateLiteral(["daily dungeon malware"]))));else (0,external_kolmafia_namespaceObject.retrieveItem)(1, template_string_$item(aftercore_templateObject48 || (aftercore_templateObject48 = aftercore_taggedTemplateLiteral(["daily dungeon malware"]))));
        }

        (0,external_kolmafia_namespaceObject.restoreHp)(0.75 * (0,external_kolmafia_namespaceObject.myMaxhp)());
        (0,external_kolmafia_namespaceObject.restoreMp)(8);
      },
      do: $location(aftercore_templateObject49 || (aftercore_templateObject49 = aftercore_taggedTemplateLiteral(["The Daily Dungeon"]))),
      choices: {
        692: 3,
        //dd door: lockpicks
        689: 1,
        //dd final chest : open
        690: 2,
        //dd chest 1: boring door
        691: 2,
        //dd chest 2: boring door
        693: 2 //dd trap: skip

      },
      combat: new CombatStrategy().macro(() => Macro.step("pickpocket").externalIf(!property_get("_dailyDungeonMalwareUsed"), Macro.tryItem(template_string_$item(aftercore_templateObject50 || (aftercore_templateObject50 = aftercore_taggedTemplateLiteral(["daily dungeon malware"]))))).tryItem(template_string_$item(aftercore_templateObject51 || (aftercore_templateObject51 = aftercore_taggedTemplateLiteral(["porquoise-handled sixgun"])))).trySkill($skill(aftercore_templateObject52 || (aftercore_templateObject52 = aftercore_taggedTemplateLiteral(["Saucestorm"])))).attack().repeat()),
      limit: {
        tries: 15
      }
    }, {
      name: "Train Gnome Skills",
      ready: () => (0,external_kolmafia_namespaceObject.myMeat)() >= 5000 && (0,external_kolmafia_namespaceObject.gnomadsAvailable)(),
      completed: () => !targetPerms(false).find(sk => !lib_have(sk) && $skills(aftercore_templateObject53 || (aftercore_templateObject53 = aftercore_taggedTemplateLiteral(["Torso Awareness, Gnefarious Pickpocketing, Powers of Observatiogn, Gnomish Hardigness, Cosmic Ugnderstanding"]))).includes(sk)),
      do: () => targetPerms(false).filter(sk => !lib_have(sk) && $skills(aftercore_templateObject54 || (aftercore_templateObject54 = aftercore_taggedTemplateLiteral(["Torso Awareness, Gnefarious Pickpocketing, Powers of Observatiogn, Gnomish Hardigness, Cosmic Ugnderstanding"]))).includes(sk)).forEach(sk => (0,external_kolmafia_namespaceObject.visitUrl)("gnomes.php?action=trainskill&whichskill=".concat((0,external_kolmafia_namespaceObject.toInt)(sk)), true)),
      limit: {
        tries: 5
      }
    }, {
      name: "Unlock Guild",
      ready: () => //ready if you find a skill in your perm plan that is guild-trainable that you don't know, or if you need to buy seal summoning supplies
      !!targetPerms(false).find(sk => !lib_have(sk) && sk.level > 0) || (0,external_kolmafia_namespaceObject.myClass)() === $class(aftercore_templateObject55 || (aftercore_templateObject55 = aftercore_taggedTemplateLiteral(["Seal Clubber"]))) && Math.min.apply(Math, aftercore_toConsumableArray(template_string_$items(aftercore_templateObject56 || (aftercore_templateObject56 = aftercore_taggedTemplateLiteral(["figurine of a wretched-looking seal, seal-blubber candle"]))).map(it => (0,external_kolmafia_namespaceObject.availableAmount)(it)))) < 20,
      completed: () => (0,external_kolmafia_namespaceObject.guildStoreAvailable)(),
      do: () => (0,external_kolmafia_namespaceObject.cliExecute)("guild"),
      choices: {
        //sleazy back alley
        108: 4,
        //craps: skip
        109: 1,
        //drunken hobo: fight
        110: 4,
        //entertainer: skip
        112: 2,
        //harold's hammer: skip
        21: 2,
        //under the knife: skip
        //haunted pantry
        115: 1,
        //drunken hobo: fight
        116: 4,
        //singing tree: skip
        117: 1,
        //knob goblin chef: fight
        114: 2,
        //birthday cake: skip
        //outskirts of cobb's knob
        113: 2,
        //knob goblin chef: fight
        111: 3,
        //chain gang: fight
        118: 2 //medicine quest: skip

      },
      outfit: () => ({
        familiar: bestFam(),
        modifier: "".concat(maxBase(), ", ").concat((0,external_kolmafia_namespaceObject.myPrimestat)() === $stat(aftercore_templateObject57 || (aftercore_templateObject57 = aftercore_taggedTemplateLiteral(["Muscle"]))) ? "100 combat rate 20 max" : "-100 combat rate", ", 250 bonus carnivorous potted plant")
      }),
      combat: new CombatStrategy().macro(() => Macro.step("pickpocket").externalIf(lib_have($skill(aftercore_templateObject58 || (aftercore_templateObject58 = aftercore_taggedTemplateLiteral(["Curse of Weaksauce"])))), Macro.trySkill($skill(aftercore_templateObject59 || (aftercore_templateObject59 = aftercore_taggedTemplateLiteral(["Curse of Weaksauce"])))), Macro.tryItem(template_string_$item(aftercore_templateObject60 || (aftercore_templateObject60 = aftercore_taggedTemplateLiteral(["electronics kit"]))))).tryItem(template_string_$item(aftercore_templateObject61 || (aftercore_templateObject61 = aftercore_taggedTemplateLiteral(["porquoise-handled sixgun"])))).trySkill($skill(aftercore_templateObject62 || (aftercore_templateObject62 = aftercore_taggedTemplateLiteral(["Sing Along"])))).attack().repeat(), getTodaysHolidayWanderers()).macro(() => Macro.step("pickpocket").tryItem(template_string_$item(aftercore_templateObject63 || (aftercore_templateObject63 = aftercore_taggedTemplateLiteral(["porquoise-handled sixgun"])))).attack().repeat())
    }, {
      name: "Guild Skill Training",
      ready: () => (0,external_kolmafia_namespaceObject.guildStoreAvailable)(),
      completed: () => //done if you don't find any  skills in your perm plan that are guild-trainable, that you don't have known
      !targetPerms(false).find(sk => !lib_have(sk) && (0,external_kolmafia_namespaceObject.myLevel)() >= sk.level),
      do: () => targetPerms(false).filter(sk => sk.class === (0,external_kolmafia_namespaceObject.myClass)() && !lib_have(sk) && (0,external_kolmafia_namespaceObject.myLevel)() >= sk.level).forEach(sk => {
        (0,external_kolmafia_namespaceObject.print)("Purchasing ".concat(sk, " using skillid=").concat((0,external_kolmafia_namespaceObject.toInt)(sk) % 1000));
        (0,external_kolmafia_namespaceObject.visitUrl)("guild.php?action=buyskill&skillid=".concat((0,external_kolmafia_namespaceObject.toInt)(sk) % 1000), true);
      }),
      limit: {
        tries: 3
      } //a few tries, in case your level is too low and you level up over the course of the day

    }, {
      name: "Stock Up on MMJs",
      ready: () => (0,external_kolmafia_namespaceObject.guildStoreAvailable)() && ((0,external_kolmafia_namespaceObject.myClass)().primestat === $stat(aftercore_templateObject64 || (aftercore_templateObject64 = aftercore_taggedTemplateLiteral(["Mysticality"]))) || (0,external_kolmafia_namespaceObject.myClass)() === $class(aftercore_templateObject65 || (aftercore_templateObject65 = aftercore_taggedTemplateLiteral(["Accordion Thief"]))) && (0,external_kolmafia_namespaceObject.myLevel)() >= 9),
      completed: () => (0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(aftercore_templateObject66 || (aftercore_templateObject66 = aftercore_taggedTemplateLiteral(["magical mystery juice"])))) >= 500,
      acquire: [{
        item: template_string_$item(aftercore_templateObject67 || (aftercore_templateObject67 = aftercore_taggedTemplateLiteral(["magical mystery juice"]))),
        num: 500
      }],
      do: () => false
    }, {
      name: "Buy Seal Summoning Supplies",
      ready: () => (0,external_kolmafia_namespaceObject.myClass)() === $class(aftercore_templateObject68 || (aftercore_templateObject68 = aftercore_taggedTemplateLiteral(["Seal Clubber"]))) && (0,external_kolmafia_namespaceObject.guildStoreAvailable)(),
      completed: () => Math.min.apply(Math, aftercore_toConsumableArray(template_string_$items(aftercore_templateObject69 || (aftercore_templateObject69 = aftercore_taggedTemplateLiteral(["figurine of a wretched-looking seal, seal-blubber candle"]))).map(it => (0,external_kolmafia_namespaceObject.availableAmount)(it)))) >= 40,
      acquire: template_string_$items(aftercore_templateObject70 || (aftercore_templateObject70 = aftercore_taggedTemplateLiteral(["figurine of a wretched-looking seal, seal-blubber candle"]))).map(it => ({
        item: it,
        num: 500
      })),
      do: () => false
    }, {
      name: "Garbo",
      completed: () => !isGoodGarboScript(args.garboascend) || stooperDrunk() || !canDiet() && (0,external_kolmafia_namespaceObject.myAdventures)() <= (expectCMC() ? 100 : 0) + (args.voatest ? 100 : 0),
      prepare: () => uneffect($effect(aftercore_templateObject71 || (aftercore_templateObject71 = aftercore_taggedTemplateLiteral(["Beaten Up"])))),
      do: () => {
        var adv2keep = (expectCMC() ? 100 : 0) + (args.voatest ? 100 : 0);
        if (adv2keep > 0) (0,external_kolmafia_namespaceObject.cliExecute)("".concat(args.garboascend, " -").concat(adv2keep));else (0,external_kolmafia_namespaceObject.cliExecute)("".concat(args.garboascend));
      },
      post: () => {
        if ((0,external_kolmafia_namespaceObject.myAdventures)() === 0) $effects(aftercore_templateObject72 || (aftercore_templateObject72 = aftercore_taggedTemplateLiteral(["Power Ballad of the Arrowsmith, Stevedave's Shanty of Superiority, The Moxious Madrigal, The Magical Mojomuscular Melody, Aloysius' Antiphon of Aptitude, Ur-Kel's Aria of Annoyance"]))).filter(ef => lib_have(ef)).forEach(ef => uneffect(ef));
      },
      clear: "all",
      tracking: "Garbo",
      limit: {
        tries: 2
      } //this will run again after installing CMC, by magic

    }, {
      name: "Garbo VoA Test",
      completed: () => !isGoodGarboScript(args.garboascend) || !args.voatest || stooperDrunk() || !canDiet() && (0,external_kolmafia_namespaceObject.myAdventures)() <= (expectCMC() ? 100 : 0),
      prepare: () => uneffect($effect(aftercore_templateObject73 || (aftercore_templateObject73 = aftercore_taggedTemplateLiteral(["Beaten Up"])))),
      do: () => {
        if (expectCMC()) (0,external_kolmafia_namespaceObject.cliExecute)("".concat(args.garboascend, " -100"));else (0,external_kolmafia_namespaceObject.cliExecute)("".concat(args.garboascend));
      },
      post: () => {
        args.voatest = false;
        if ((0,external_kolmafia_namespaceObject.myAdventures)() === 0) $effects(aftercore_templateObject74 || (aftercore_templateObject74 = aftercore_taggedTemplateLiteral(["Power Ballad of the Arrowsmith, Stevedave's Shanty of Superiority, The Moxious Madrigal, The Magical Mojomuscular Melody, Aloysius' Antiphon of Aptitude, Ur-Kel's Aria of Annoyance"]))).filter(ef => lib_have(ef)).forEach(ef => uneffect(ef));
      },
      clear: "all",
      tracking: "VoA Test"
    }, {
      name: "Install CMC",
      completed: () => !expectCMC(),
      do: () => (0,external_kolmafia_namespaceObject.use)(template_string_$item(aftercore_templateObject75 || (aftercore_templateObject75 = aftercore_taggedTemplateLiteral(["cold medicine cabinet"]))))
    }, {
      name: "Custom Farm Script",
      //this should only run if args.garboascend isn't a basic garbo script call
      completed: () => stooperDrunk() || !canDiet() && (0,external_kolmafia_namespaceObject.myAdventures)() === 0,
      prepare: () => uneffect($effect(aftercore_templateObject76 || (aftercore_templateObject76 = aftercore_taggedTemplateLiteral(["Beaten Up"])))),
      do: () => (0,external_kolmafia_namespaceObject.cliExecute)("".concat(args.garboascend)),
      post: () => $effects(aftercore_templateObject77 || (aftercore_templateObject77 = aftercore_taggedTemplateLiteral(["Power Ballad of the Arrowsmith, Stevedave's Shanty of Superiority, The Moxious Madrigal, The Magical Mojomuscular Melody, Aloysius' Antiphon of Aptitude, Ur-Kel's Aria of Annoyance"]))).filter(ef => lib_have(ef)).forEach(ef => uneffect(ef)),
      clear: "all",
      tracking: "Garbo"
    }, {
      name: "Stooper",
      ready: () => (0,external_kolmafia_namespaceObject.myInebriety)() === (0,external_kolmafia_namespaceObject.inebrietyLimit)() && lib_have(template_string_$item(aftercore_templateObject78 || (aftercore_templateObject78 = aftercore_taggedTemplateLiteral(["tiny stillsuit"])))) && property_get("familiarSweat") >= 300,
      completed: () => !lib_have(template_string_$familiar(aftercore_templateObject79 || (aftercore_templateObject79 = aftercore_taggedTemplateLiteral(["Stooper"])))) || stooperDrunk(),
      do: () => {
        (0,external_kolmafia_namespaceObject.useFamiliar)(template_string_$familiar(aftercore_templateObject80 || (aftercore_templateObject80 = aftercore_taggedTemplateLiteral(["Stooper"]))));
        (0,external_kolmafia_namespaceObject.cliExecute)("drink stillsuit distillate");
      }
    }, {
      name: "Barfing Drunk with Stooper",
      ready: () => stooperDrunk() && lib_have(template_string_$familiar(aftercore_templateObject81 || (aftercore_templateObject81 = aftercore_taggedTemplateLiteral(["Stooper"])))) && !lib_have(template_string_$item(aftercore_templateObject82 || (aftercore_templateObject82 = aftercore_taggedTemplateLiteral(["Drunkula's wineglass"])))),
      completed: () => (0,external_kolmafia_namespaceObject.myAdventures)() === 0 || totallyDrunk(),
      acquire: [{
        item: template_string_$item(aftercore_templateObject83 || (aftercore_templateObject83 = aftercore_taggedTemplateLiteral(["seal tooth"])))
      }],
      outfit: () => ({
        familiar: template_string_$familiar(aftercore_templateObject84 || (aftercore_templateObject84 = aftercore_taggedTemplateLiteral(["Stooper"]))),
        modifier: "".concat(maxBase(), ", 2.5 meat, 0.6 items")
      }),
      effects: $effects(aftercore_templateObject85 || (aftercore_templateObject85 = aftercore_taggedTemplateLiteral(["How to Scam Tourists"]))),
      //need to add meat buffs that we can cast
      prepare: () => {
        (0,external_kolmafia_namespaceObject.restoreHp)(0.75 * (0,external_kolmafia_namespaceObject.myMaxhp)());
        (0,external_kolmafia_namespaceObject.restoreMp)(20);
      },
      do: $location(_templateObject86 || (_templateObject86 = aftercore_taggedTemplateLiteral(["Barf Mountain"]))),
      combat: new CombatStrategy().macro(Macro.trySkill($skill(_templateObject87 || (_templateObject87 = aftercore_taggedTemplateLiteral(["Curse of Weaksauce"])))), getTodaysHolidayWanderers()).macro(() => Macro.step("pickpocket").trySkill($skill(_templateObject88 || (_templateObject88 = aftercore_taggedTemplateLiteral(["Bowl Straight Up"])))).trySkill($skill(_templateObject89 || (_templateObject89 = aftercore_taggedTemplateLiteral(["Sing Along"])))).tryItem(template_string_$item(_templateObject90 || (_templateObject90 = aftercore_taggedTemplateLiteral(["porquoise-handled sixgun"])))).externalIf((0,external_kolmafia_namespaceObject.haveEquipped)(template_string_$item(_templateObject91 || (_templateObject91 = aftercore_taggedTemplateLiteral(["mafia pointer finger ring"])))), Macro.trySkill($skill(_templateObject92 || (_templateObject92 = aftercore_taggedTemplateLiteral(["Furious Wallop"])))).trySkill($skill(_templateObject93 || (_templateObject93 = aftercore_taggedTemplateLiteral(["Summer Siesta"])))).trySkill($skill(_templateObject94 || (_templateObject94 = aftercore_taggedTemplateLiteral(["Throw Shield"])))).trySkill($skill(_templateObject95 || (_templateObject95 = aftercore_taggedTemplateLiteral(["Precision Shot"]))))).attack().repeat()),
      limit: {
        tries: 30
      }
    }, {
      name: "Nightcap (Wine Glass)",
      ready: () => lib_have(template_string_$item(_templateObject96 || (_templateObject96 = aftercore_taggedTemplateLiteral(["Drunkula's wineglass"])))),
      completed: () => totallyDrunk(),
      do: () => (0,external_kolmafia_namespaceObject.cliExecute)("CONSUME NIGHTCAP VALUE ".concat(property_get("valueOfAdventure") - 1000))
    }, {
      name: "Nightcap (Marginal)",
      ready: () => lib_have(template_string_$item(_templateObject97 || (_templateObject97 = aftercore_taggedTemplateLiteral(["Beach Comb"])))) || lib_have(template_string_$item(_templateObject98 || (_templateObject98 = aftercore_taggedTemplateLiteral(["Map to Safety Shelter Grimace Prime"])))),
      completed: () => totallyDrunk(),
      do: () => (0,external_kolmafia_namespaceObject.cliExecute)("CONSUME NIGHTCAP VALUE 500")
    }, {
      name: "Grimace Maps",
      completed: () => (0,external_kolmafia_namespaceObject.myAdventures)() === 0 || !lib_have(template_string_$item(_templateObject99 || (_templateObject99 = aftercore_taggedTemplateLiteral(["Map to Safety Shelter Grimace Prime"])))),
      effects: $effects(_templateObject100 || (_templateObject100 = aftercore_taggedTemplateLiteral(["Transpondent"]))),
      choices: {
        536: () => (0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(_templateObject101 || (_templateObject101 = aftercore_taggedTemplateLiteral(["distention pill"])))) < (0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(_templateObject102 || (_templateObject102 = aftercore_taggedTemplateLiteral(["synthetic dog hair pill"])))) + (0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(_templateObject103 || (_templateObject103 = aftercore_taggedTemplateLiteral(["Map to Safety Shelter Grimace Prime"])))) ? 1 : 2
      },
      do: () => (0,external_kolmafia_namespaceObject.use)(template_string_$item(_templateObject104 || (_templateObject104 = aftercore_taggedTemplateLiteral(["Map to Safety Shelter Grimace Prime"])))),
      limit: {
        tries: 30
      }
    }, {
      name: "Garbo (Drunk)",
      ready: () => lib_have(template_string_$item(_templateObject105 || (_templateObject105 = aftercore_taggedTemplateLiteral(["Drunkula's wineglass"])))),
      prepare: () => uneffect($effect(_templateObject106 || (_templateObject106 = aftercore_taggedTemplateLiteral(["Beaten Up"])))),
      completed: () => (0,external_kolmafia_namespaceObject.myAdventures)() === 0,
      do: () => (0,external_kolmafia_namespaceObject.cliExecute)(args.garboascend),
      post: () => $effects(_templateObject107 || (_templateObject107 = aftercore_taggedTemplateLiteral(["Power Ballad of the Arrowsmith, Stevedave's Shanty of Superiority, The Moxious Madrigal, The Magical Mojomuscular Melody, Aloysius' Antiphon of Aptitude, Ur-Kel's Aria of Annoyance"]))).filter(ef => lib_have(ef)).forEach(ef => uneffect(ef)),
      clear: "all",
      tracking: "Garbo"
    }, {
      name: "Comb Beach",
      ready: () => lib_have(template_string_$item(_templateObject108 || (_templateObject108 = aftercore_taggedTemplateLiteral(["Beach Comb"])))),
      completed: () => (0,external_kolmafia_namespaceObject.myAdventures)() === 0,
      do: () => (0,external_kolmafia_namespaceObject.cliExecute)("combo ".concat(11 - property_get("_freeBeachWalksUsed") + (0,external_kolmafia_namespaceObject.myAdventures)()))
    }, {
      name: "Turn in FunFunds",
      ready: () => property_get("_stenchAirportToday") && (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(_templateObject109 || (_templateObject109 = aftercore_taggedTemplateLiteral(["FunFunds\u2122"])))) >= 20,
      completed: () => lib_have(template_string_$item(_templateObject110 || (_templateObject110 = aftercore_taggedTemplateLiteral(["one-day ticket to Dinseylandfill"])))),
      do: () => (0,external_kolmafia_namespaceObject.buy)($coinmaster(_templateObject111 || (_templateObject111 = aftercore_taggedTemplateLiteral(["The Dinsey Company Store"]))), 1, template_string_$item(_templateObject112 || (_templateObject112 = aftercore_taggedTemplateLiteral(["one-day ticket to Dinseylandfill"])))),
      tracking: "Garbo"
    }, {
      name: "PvP",
      completed: () => (0,external_kolmafia_namespaceObject.pvpAttacksLeft)() === 0 || !(0,external_kolmafia_namespaceObject.hippyStoneBroken)(),
      do: () => {
        (0,external_kolmafia_namespaceObject.cliExecute)("unequip");
        (0,external_kolmafia_namespaceObject.cliExecute)("UberPvPOptimizer");
        (0,external_kolmafia_namespaceObject.cliExecute)("swagger");
      }
    }, {
      name: "Summon Soap Knife",
      completed: () => !lib_have($skill(_templateObject113 || (_templateObject113 = aftercore_taggedTemplateLiteral(["That's Not a Knife"])))) || property_get("_discoKnife"),
      prepare: () => (0,external_kolmafia_namespaceObject.putCloset)((0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(_templateObject114 || (_templateObject114 = aftercore_taggedTemplateLiteral(["soap knife"])))), template_string_$item(_templateObject115 || (_templateObject115 = aftercore_taggedTemplateLiteral(["soap knife"])))),
      do: () => (0,external_kolmafia_namespaceObject.useSkill)($skill(_templateObject116 || (_templateObject116 = aftercore_taggedTemplateLiteral(["That's Not a Knife"])))),
      post: () => (0,external_kolmafia_namespaceObject.takeCloset)((0,external_kolmafia_namespaceObject.closetAmount)(template_string_$item(_templateObject117 || (_templateObject117 = aftercore_taggedTemplateLiteral(["soap knife"])))), template_string_$item(_templateObject118 || (_templateObject118 = aftercore_taggedTemplateLiteral(["soap knife"]))))
    }, {
      name: "Ascend Grey You",
      completed: () => getCurrentLeg() >= Leg.GreyYou,
      do: () => {
        printPermPlan();
        if (targetPerms(false).find(sk => !lib_have(sk))) throw new Error("Trying to ascend, but don't have the following targeted skills: [".concat(targetPerms(false).filter(sk => !lib_have(sk)).join(", "), "]"));
        var nClass = targetClass(true);
        setClass("goorboNextClass", nClass);
        var skillsToPerm = new Map();
        targetPerms(false).forEach(sk => skillsToPerm.set(sk, Lifestyle.softcore));
        var nPerms = targetPerms(true);
        var moonsign = toMoonSign(lib_have(template_string_$item(_templateObject119 || (_templateObject119 = aftercore_taggedTemplateLiteral(["hewn moon-rune spoon"])))) || !$skills(_templateObject120 || (_templateObject120 = aftercore_taggedTemplateLiteral(["Torso Awareness, Gnefarious Pickpocketing, Powers of Observatiogn, Gnomish Hardigness, Cosmic Ugnderstanding"]))).find(sk => !(sk.name in (0,external_kolmafia_namespaceObject.getPermedSkills)()) //skip checking gnomes if you have a moon spoon or have all gnome skills permed
        ) ? args.moonsign : nPerms.includes($skill(_templateObject121 || (_templateObject121 = aftercore_taggedTemplateLiteral(["Torso Awareness"])))) || !!$skills(_templateObject122 || (_templateObject122 = aftercore_taggedTemplateLiteral(["Gnefarious Pickpocketing, Powers of Observatiogn, Gnomish Hardigness, Cosmic Ugnderstanding"]))).find(sk => nPerms.includes(sk)) && !$skills(_templateObject123 || (_templateObject123 = aftercore_taggedTemplateLiteral(["Gnefarious Pickpocketing, Powers of Observatiogn, Gnomish Hardigness, Cosmic Ugnderstanding"]))).find(sk => !nPerms.includes(sk) && !(sk.name in (0,external_kolmafia_namespaceObject.getPermedSkills)())) //plan to perm Torso Awareness or (plan to perm at least 1 gnome skill and will end with all gnome skills permed)
        ? "wombat" : args.moonsign);
        ascend($path(_templateObject124 || (_templateObject124 = aftercore_taggedTemplateLiteral(["Grey You"]))), $class(_templateObject125 || (_templateObject125 = aftercore_taggedTemplateLiteral(["Grey Goo"]))), Lifestyle.softcore, moonsign, template_string_$item(_templateObject126 || (_templateObject126 = aftercore_taggedTemplateLiteral(["astral six-pack"]))), args.astralpet === template_string_$item(_templateObject127 || (_templateObject127 = aftercore_taggedTemplateLiteral(["none"]))) ? undefined : args.astralpet, {
          permSkills: skillsToPerm,
          neverAbort: false
        });
        if ((0,external_kolmafia_namespaceObject.visitUrl)("choice.php").includes("somewhat-human-shaped mass of grey goo nanites")) (0,external_kolmafia_namespaceObject.runChoice)(1);
        (0,external_kolmafia_namespaceObject.cliExecute)("refresh all");
      }
    }]
  };
}
;// CONCATENATED MODULE: ./node_modules/libram/dist/resources/2022/AutumnAton.js


var item = external_kolmafia_namespaceObject.Item.get("autumn-aton");
/**
 * Is the autumn-aton currently in your inventory, available to deploy?
 */

function available() {
  return (0,external_kolmafia_namespaceObject.availableAmount)(item) > 0;
}
/**
 * Do you own the autumn-aton?
 */

function AutumnAton_have() {
  return get("hasAutumnaton") || available();
}

function checkLocations(html) {
  return (0,external_kolmafia_namespaceObject.xpath)(html, '//select[@name="heythereprogrammer"]//option[position()>1]/text()').map(name => (0,external_kolmafia_namespaceObject.toLocation)(name));
}

var AutumnAton_use = () => (0,external_kolmafia_namespaceObject.visitUrl)("inv_use.php?pwd&whichitem=10954");
/**
 * @returns The current location the autumn-aton is questing in; null if it is not on a quest.
 */


function currentlyIn() {
  return get("autumnatonQuestLocation");
}
/**
 * Deploy the autumn-aton to a location of your choosing.
 * @param target A location to send the autumn-aton to, or a prioritized list of locations to send it to, or a function to pick which location to send it to.
 * @param upgrade Should we apply any upgrades we see available?
 * @returns Where we ended up sending the autumn-aton; null if we didn't send it off.
 */

function sendTo(target) {
  var upgrade = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  if (!available()) return null;
  var pageHtml = AutumnAton_use();
  if (upgrade && (0,external_kolmafia_namespaceObject.availableChoiceOptions)()[1]) (0,external_kolmafia_namespaceObject.runChoice)(1);
  var locationsAvailable = checkLocations(pageHtml);
  var location = target instanceof external_kolmafia_namespaceObject.Location ? target : Array.isArray(target) ? target.find(l => locationsAvailable.includes(l)) : target(locationsAvailable);
  if (!location) return null;
  if (!locationsAvailable.includes(location)) return null;
  (0,external_kolmafia_namespaceObject.runChoice)(2, "heythereprogrammer=".concat(location.id));
  if ((0,external_kolmafia_namespaceObject.handlingChoice)()) (0,external_kolmafia_namespaceObject.visitUrl)("main.php");
  return location;
}
/**
 * Install any available upgrades for the autumn-aton.
 * @returns Whether there were any upgrades to install.
 */

function upgrade() {
  AutumnAton_use();
  var canUpgrade = availableChoiceOptions()[1] !== undefined;
  if (canUpgrade) runChoice(1);
  visitUrl("main.php");
  return canUpgrade;
}
/**
 * @returns A list of all locations you can send your autumn-aton to right now. Empty if you are unable to send it anywhere.
 */

function availableLocations() {
  if (!available()) return [];
  var pageHtml = AutumnAton_use();
  visitUrl("main.php");
  return checkLocations(pageHtml);
}
/**
 * The mafia names for the autumn-aton upgrades
 */

var possibleUpgrades = (/* unused pure expression or super */ null && (["leftarm1", "leftleg1", "rightarm1", "rightleg1", "base_blackhat", "cowcatcher", "periscope", "radardish", "dualexhaust"]));
/**
 * @returns An array containing the upgrades that you currently have on your autumn-aton.
 */

function currentUpgrades() {
  return property_get("autumnatonUpgrades").split(",");
}
/**
 * @returns The number of turns remaining in your current autumn-aton quest. This number may be negative for any number of reasons.
 */

function turnsLeft() {
  return get("autumnatonQuestTurn") - totalTurnsPlayed();
}
/**
 * @returns The number of turns we expect your next autumn-aton quest to take.
 */

function turnsForQuest() {
  return 11 * Math.max(1, property_get("_autumnatonQuests") - currentUpgrades().filter(u => u.includes("leg")).length);
}
/**
 * @returns The current visual acuity level of your autumn-aton as determined by the current upgrade-state.
 */

function visualAcuity() {
  var visualUpgrades = ["periscope", "radardish"];
  return 1 + currentUpgrades().filter(u => visualUpgrades.includes(u)).length;
}
/**
 * @returns The number of items from a zone we expect the autumn-aton to steal based on the current upgrade-state. It may not succeed in stealing every item it can.
 */

function zoneItems() {
  return 3 + currentUpgrades().filter(u => u.includes("arm")).length;
}
/**
 * @returns The number of seasonal items we expect the autumn-aton to return with given its current upgrade-state.
 */

function seasonalItems() {
  return currentUpgrades().includes("cowcatcher") ? 2 : 1;
}
;// CONCATENATED MODULE: ./node_modules/libram/dist/resources/2018/SongBoom.js
var SongBoom_templateObject;

function SongBoom_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var SongBoom_item = template_string_$item(SongBoom_templateObject || (SongBoom_templateObject = SongBoom_taggedTemplateLiteral(["SongBoom\u2122 BoomBox"])));
function SongBoom_have() {
  return haveItem(SongBoom_item);
}
var keywords = {
  "Eye of the Giger": "spooky",
  "Food Vibrations": "food",
  "Remainin' Alive": "dr",
  "These Fists Were Made for Punchin'": "damage",
  "Total Eclipse of Your Meat": "meat"
};
var songBoomSongs = new Set(Object.keys(keywords));
/**
 * Current song.
 */

function song() {
  var stored = property_get("boomBoxSong");
  return songBoomSongs.has(stored) ? stored : null;
}
/**
 * Song changes left today.
 */

function songChangesLeft() {
  return property_get("_boomBoxSongsLeft");
}
/**
 * Change the song.
 * @param newSong Song to change to.
 */

function setSong(newSong) {
  if (song() !== newSong) {
    if (songChangesLeft() === 0) throw new Error("Out of song changes!");
    (0,external_kolmafia_namespaceObject.cliExecute)("boombox ".concat(newSong ? keywords[newSong] : "none"));
    return true;
  } else {
    return false;
  }
}
/**
 * Progress to next song drop (e.g. gathered meat-clip).
 */

function dropProgress() {
  return get("_boomBoxFights");
}
;// CONCATENATED MODULE: ./node_modules/libram/dist/resources/2017/Robortender.js
var Robortender_templateObject, Robortender_templateObject2, Robortender_templateObject3, Robortender_templateObject4, Robortender_templateObject5, Robortender_templateObject6, Robortender_templateObject7, Robortender_templateObject8, Robortender_templateObject9, Robortender_templateObject10, Robortender_templateObject11, Robortender_templateObject12, Robortender_templateObject13, Robortender_templateObject14, Robortender_templateObject15, Robortender_templateObject16, Robortender_templateObject17, Robortender_templateObject18, Robortender_templateObject19, Robortender_templateObject20, Robortender_templateObject21, Robortender_templateObject22, Robortender_templateObject23, Robortender_templateObject24, Robortender_templateObject25, Robortender_templateObject26, Robortender_templateObject27, Robortender_templateObject28, Robortender_templateObject29, Robortender_templateObject30, Robortender_templateObject31, Robortender_templateObject32, Robortender_templateObject33, Robortender_templateObject34, Robortender_templateObject35, Robortender_templateObject36, Robortender_templateObject37;

function Robortender_toConsumableArray(arr) { return Robortender_arrayWithoutHoles(arr) || Robortender_iterableToArray(arr) || Robortender_unsupportedIterableToArray(arr) || Robortender_nonIterableSpread(); }

function Robortender_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function Robortender_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return Robortender_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Robortender_arrayLikeToArray(o, minLen); }

function Robortender_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function Robortender_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return Robortender_arrayLikeToArray(arr); }

function Robortender_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function Robortender_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




/**
 * The Robortender itself
 */

var Robortender_familiar = template_string_$familiar(Robortender_templateObject || (Robortender_templateObject = Robortender_taggedTemplateLiteral(["Robortender"])));
/**
 * @returns Whether you have the Robortender in your terrarium/available
 */

function Robortender_have() {
  return (0,external_kolmafia_namespaceObject.haveFamiliar)(Robortender_familiar);
}
var phylumDrops = new Map([[$phylum(Robortender_templateObject2 || (Robortender_templateObject2 = Robortender_taggedTemplateLiteral(["Bug"]))), template_string_$item(Robortender_templateObject3 || (Robortender_templateObject3 = Robortender_taggedTemplateLiteral(["pickled grasshopper"])))], // bottle of anís
[$phylum(Robortender_templateObject4 || (Robortender_templateObject4 = Robortender_taggedTemplateLiteral(["Constellation"]))), external_kolmafia_namespaceObject.Item.get(9348)], [$phylum(Robortender_templateObject5 || (Robortender_templateObject5 = Robortender_taggedTemplateLiteral(["Demon"]))), template_string_$item(Robortender_templateObject6 || (Robortender_templateObject6 = Robortender_taggedTemplateLiteral(["bottle of novelty hot sauce"])))], [$phylum(Robortender_templateObject7 || (Robortender_templateObject7 = Robortender_taggedTemplateLiteral(["Elemental"]))), template_string_$item(Robortender_templateObject8 || (Robortender_templateObject8 = Robortender_taggedTemplateLiteral(["elemental sugarcube"])))], [$phylum(Robortender_templateObject9 || (Robortender_templateObject9 = Robortender_taggedTemplateLiteral(["Elf"]))), template_string_$item(Robortender_templateObject10 || (Robortender_templateObject10 = Robortender_taggedTemplateLiteral(["peppermint sprig"])))], [$phylum(Robortender_templateObject11 || (Robortender_templateObject11 = Robortender_taggedTemplateLiteral(["Fish"]))), template_string_$item(Robortender_templateObject12 || (Robortender_templateObject12 = Robortender_taggedTemplateLiteral(["bottle of clam juice"])))], [$phylum(Robortender_templateObject13 || (Robortender_templateObject13 = Robortender_taggedTemplateLiteral(["Goblin"]))), template_string_$item(Robortender_templateObject14 || (Robortender_templateObject14 = Robortender_taggedTemplateLiteral(["cocktail mushroom"])))], [$phylum(Robortender_templateObject15 || (Robortender_templateObject15 = Robortender_taggedTemplateLiteral(["Hippy"]))), template_string_$item(Robortender_templateObject16 || (Robortender_templateObject16 = Robortender_taggedTemplateLiteral(["shot of granola liqueur"])))], [$phylum(Robortender_templateObject17 || (Robortender_templateObject17 = Robortender_taggedTemplateLiteral(["Hobo"]))), template_string_$item(Robortender_templateObject18 || (Robortender_templateObject18 = Robortender_taggedTemplateLiteral(["can of cherry-flavored sterno"])))], [$phylum(Robortender_templateObject19 || (Robortender_templateObject19 = Robortender_taggedTemplateLiteral(["Horror"]))), template_string_$item(Robortender_templateObject20 || (Robortender_templateObject20 = Robortender_taggedTemplateLiteral(["lump of black ichor"])))], [$phylum(Robortender_templateObject21 || (Robortender_templateObject21 = Robortender_taggedTemplateLiteral(["Humanoid"]))), template_string_$item(Robortender_templateObject22 || (Robortender_templateObject22 = Robortender_taggedTemplateLiteral(["bottle of gregnadigne"])))], // bottle of Crème de Fugu
[$phylum(Robortender_templateObject23 || (Robortender_templateObject23 = Robortender_taggedTemplateLiteral(["Mer-kin"]))), external_kolmafia_namespaceObject.Item.get(9358)], [$phylum(Robortender_templateObject24 || (Robortender_templateObject24 = Robortender_taggedTemplateLiteral(["Orc"]))), template_string_$item(Robortender_templateObject25 || (Robortender_templateObject25 = Robortender_taggedTemplateLiteral(["baby oil shooter"])))], [$phylum(Robortender_templateObject26 || (Robortender_templateObject26 = Robortender_taggedTemplateLiteral(["Penguin"]))), template_string_$item(Robortender_templateObject27 || (Robortender_templateObject27 = Robortender_taggedTemplateLiteral(["fish head"])))], [$phylum(Robortender_templateObject28 || (Robortender_templateObject28 = Robortender_taggedTemplateLiteral(["Pirate"]))), template_string_$item(Robortender_templateObject29 || (Robortender_templateObject29 = Robortender_taggedTemplateLiteral(["limepatch"])))], [$phylum(Robortender_templateObject30 || (Robortender_templateObject30 = Robortender_taggedTemplateLiteral(["Plant"]))), template_string_$item(Robortender_templateObject31 || (Robortender_templateObject31 = Robortender_taggedTemplateLiteral(["pile of dirt"])))], [$phylum(Robortender_templateObject32 || (Robortender_templateObject32 = Robortender_taggedTemplateLiteral(["Slime"]))), template_string_$item(Robortender_templateObject33 || (Robortender_templateObject33 = Robortender_taggedTemplateLiteral(["slime shooter"])))], [$phylum(Robortender_templateObject34 || (Robortender_templateObject34 = Robortender_taggedTemplateLiteral(["Weird"]))), template_string_$item(Robortender_templateObject35 || (Robortender_templateObject35 = Robortender_taggedTemplateLiteral(["imaginary lemon"])))]]);
/**
 *
 * @param target The phylum or monster you want to know the robortender drop of
 * @returns The robortender drop associated with that phylum or monster
 */

function dropFrom(target) {
  var _phylumDrops$get;

  var phylum = target instanceof Monster ? target.phylum : target;
  return (_phylumDrops$get = phylumDrops.get(phylum)) !== null && _phylumDrops$get !== void 0 ? _phylumDrops$get : $item.none;
}
/**
 * Determines the probability of getting a robortender drop based on number of drops received
 * @param dropNumber The number of drops to assume you've already received; defaults to mafia's tracked amount
 * @returns The probability of getting a robort drop
 */

function dropChance() {
  var _dropNumber;

  var dropNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : get("_roboDrops");
  return (_dropNumber = [1, 0.5, 0.4, 0.4, 0.4, 0.3, 0.3, 0.3][dropNumber]) !== null && _dropNumber !== void 0 ? _dropNumber : 0.2;
}
var minorDrinks = template_string_$items(Robortender_templateObject36 || (Robortender_templateObject36 = Robortender_taggedTemplateLiteral(["literal grasshopper, double entendre, Phlegethon, Siberian sunrise, mentholated wine, low tide martini, shroomtini, morning dew, whiskey squeeze, great old fashioned, Gnomish sagngria, vodka stinger, extremely slippery nipple, piscatini, Churchill, soilzerac, London frog, nothingtini"])));
var majorDrinks = template_string_$items(Robortender_templateObject37 || (Robortender_templateObject37 = Robortender_taggedTemplateLiteral(["eighth plague, single entendre, reverse Tantalus, elemental caipiroska, Feliz Navidad, Bloody Nora, moreltini, hell in a bucket, Newark, R'lyeh, Gnollish sangria, vodka barracuda, Mysterious Island iced tea, drive-by shooting, gunner's daughter, dirt julep, Simepore slime, Phil Collins"])));
var drinks = [].concat(Robortender_toConsumableArray(minorDrinks), Robortender_toConsumableArray(majorDrinks));
/**
 * @returns An array consisting of the drinks you've fed your robortender today.
 */

function currentDrinks() {
  var pref = property_get("_roboDrinks");
  if (!pref) return [];
  return pref.split(",").filter(x => x.trim()).map(name => (0,external_kolmafia_namespaceObject.toItem)(name)).filter(drink => drinks.includes(drink));
}
/**
 * @param beverage A robortender-consumable drink of choice (i.e. Drive-By Shooting, Single Entendre, etc)
 * @returns A boolean; if true, the user's robortender has drunk that drink after execution. If false, it has not. This ALSO returns false if the user has not passed the function a robortender-consumable drink. If the user does not already have the beverage in their inventory, this function will not purchase the requested for you.
 */

function feed(beverage) {
  if (currentDrinks().includes(beverage)) return true;
  if (currentDrinks().length >= 5) return false;
  if (!drinks.includes(beverage)) return false;
  if (!(0,external_kolmafia_namespaceObject.itemAmount)(beverage)) return false;
  if (!Robortender_have()) return false;
  var priorFamiliar = (0,external_kolmafia_namespaceObject.myFamiliar)();
  (0,external_kolmafia_namespaceObject.useFamiliar)(Robortender_familiar); // must equip Robortender to feed it

  (0,external_kolmafia_namespaceObject.visitUrl)("inventory.php?action=robooze&which=1&whichitem=".concat((0,external_kolmafia_namespaceObject.toInt)(beverage)));
  (0,external_kolmafia_namespaceObject.useFamiliar)(priorFamiliar);
  return currentDrinks().includes(beverage);
}
;// CONCATENATED MODULE: ./src/tasks/greyyou.ts
var greyyou_templateObject, greyyou_templateObject2, greyyou_templateObject3, greyyou_templateObject4, greyyou_templateObject5, greyyou_templateObject6, greyyou_templateObject7, greyyou_templateObject8, greyyou_templateObject9, greyyou_templateObject10, greyyou_templateObject11, greyyou_templateObject12, greyyou_templateObject13, greyyou_templateObject14, greyyou_templateObject15, greyyou_templateObject16, greyyou_templateObject17, greyyou_templateObject18, greyyou_templateObject19, greyyou_templateObject20, greyyou_templateObject21, greyyou_templateObject22, greyyou_templateObject23, greyyou_templateObject24, greyyou_templateObject25, greyyou_templateObject26, greyyou_templateObject27, greyyou_templateObject28, greyyou_templateObject29, greyyou_templateObject30, greyyou_templateObject31, greyyou_templateObject32, greyyou_templateObject33, greyyou_templateObject34, greyyou_templateObject35, greyyou_templateObject36, greyyou_templateObject37, greyyou_templateObject38, greyyou_templateObject39, greyyou_templateObject40, greyyou_templateObject41, greyyou_templateObject42, greyyou_templateObject43, greyyou_templateObject44, greyyou_templateObject45, greyyou_templateObject46, greyyou_templateObject47, greyyou_templateObject48, greyyou_templateObject49, greyyou_templateObject50, greyyou_templateObject51, greyyou_templateObject52, greyyou_templateObject53, greyyou_templateObject54, greyyou_templateObject55, greyyou_templateObject56, greyyou_templateObject57, greyyou_templateObject58, greyyou_templateObject59, greyyou_templateObject60, greyyou_templateObject61, greyyou_templateObject62, greyyou_templateObject63, greyyou_templateObject64, greyyou_templateObject65, greyyou_templateObject66, greyyou_templateObject67, greyyou_templateObject68, greyyou_templateObject69, greyyou_templateObject70, greyyou_templateObject71, greyyou_templateObject72, greyyou_templateObject73, greyyou_templateObject74, greyyou_templateObject75, greyyou_templateObject76, greyyou_templateObject77, greyyou_templateObject78, greyyou_templateObject79, greyyou_templateObject80, greyyou_templateObject81, greyyou_templateObject82, greyyou_templateObject83, greyyou_templateObject84, greyyou_templateObject85, greyyou_templateObject86, greyyou_templateObject87, greyyou_templateObject88, greyyou_templateObject89, greyyou_templateObject90, greyyou_templateObject91, greyyou_templateObject92, greyyou_templateObject93, greyyou_templateObject94, greyyou_templateObject95, greyyou_templateObject96, greyyou_templateObject97, greyyou_templateObject98, greyyou_templateObject99, greyyou_templateObject100, greyyou_templateObject101, greyyou_templateObject102, greyyou_templateObject103, greyyou_templateObject104, greyyou_templateObject105, greyyou_templateObject106, greyyou_templateObject107, greyyou_templateObject108, greyyou_templateObject109, greyyou_templateObject110, greyyou_templateObject111, greyyou_templateObject112, greyyou_templateObject113, greyyou_templateObject114, greyyou_templateObject115, greyyou_templateObject116, greyyou_templateObject117, greyyou_templateObject118, greyyou_templateObject119, greyyou_templateObject120, greyyou_templateObject121, greyyou_templateObject122, greyyou_templateObject123, greyyou_templateObject124, greyyou_templateObject125, greyyou_templateObject126, greyyou_templateObject127, _templateObject128, _templateObject129, _templateObject130, _templateObject131, _templateObject132, _templateObject133, _templateObject134, _templateObject135, _templateObject136, _templateObject137, _templateObject138, _templateObject139, _templateObject140, _templateObject141, _templateObject142, _templateObject143, _templateObject144, _templateObject145, _templateObject146, _templateObject147, _templateObject148, _templateObject149, _templateObject150, _templateObject151, _templateObject152, _templateObject153, _templateObject154, _templateObject155, _templateObject156, _templateObject157, _templateObject158, _templateObject159, _templateObject160, _templateObject161, _templateObject162, _templateObject163, _templateObject164, _templateObject165, _templateObject166, _templateObject167, _templateObject168, _templateObject169, _templateObject170, _templateObject171, _templateObject172, _templateObject173, _templateObject174, _templateObject175, _templateObject176, _templateObject177, _templateObject178, _templateObject179, _templateObject180, _templateObject181, _templateObject182, _templateObject183, _templateObject184, _templateObject185, _templateObject186, _templateObject187, _templateObject188, _templateObject189, _templateObject190, _templateObject191, _templateObject192, _templateObject193, _templateObject194, _templateObject195, _templateObject196, _templateObject197, _templateObject198, _templateObject199, _templateObject200, _templateObject201, _templateObject202, _templateObject203, _templateObject204, _templateObject205, _templateObject206, _templateObject207, _templateObject208, _templateObject209, _templateObject210, _templateObject211, _templateObject212, _templateObject213, _templateObject214, _templateObject215, _templateObject216, _templateObject217, _templateObject218, _templateObject219, _templateObject220, _templateObject221, _templateObject222, _templateObject223, _templateObject224, _templateObject225, _templateObject226, _templateObject227, _templateObject228, _templateObject229, _templateObject230, _templateObject231, _templateObject232, _templateObject233, _templateObject234, _templateObject235, _templateObject236, _templateObject237, _templateObject238, _templateObject239, _templateObject240, _templateObject241, _templateObject242, _templateObject243, _templateObject244, _templateObject245, _templateObject246, _templateObject247, _templateObject248, _templateObject249, _templateObject250, _templateObject251, _templateObject252, _templateObject253, _templateObject254, _templateObject255, _templateObject256, _templateObject257, _templateObject258, _templateObject259, _templateObject260, _templateObject261, _templateObject262, _templateObject263, _templateObject264, _templateObject265, _templateObject266, _templateObject267, _templateObject268, _templateObject269, _templateObject270, _templateObject271, _templateObject272, _templateObject273, _templateObject274, _templateObject275, _templateObject276, _templateObject277, _templateObject278, _templateObject279, _templateObject280, _templateObject281, _templateObject282, _templateObject283, _templateObject284, _templateObject285, _templateObject286, _templateObject287, _templateObject288, _templateObject289, _templateObject290, _templateObject291, _templateObject292, _templateObject293, _templateObject294, _templateObject295, _templateObject296, _templateObject297, _templateObject298, _templateObject299, _templateObject300, _templateObject301, _templateObject302, _templateObject303, _templateObject304, _templateObject305, _templateObject306, _templateObject307, _templateObject308, _templateObject309, _templateObject310, _templateObject311, _templateObject312, _templateObject313, _templateObject314, _templateObject315, _templateObject316, _templateObject317, _templateObject318, _templateObject319, _templateObject320, _templateObject321, _templateObject322, _templateObject323, _templateObject324, _templateObject325, _templateObject326, _templateObject327, _templateObject328, _templateObject329, _templateObject330, _templateObject331, _templateObject332, _templateObject333, _templateObject334, _templateObject335, _templateObject336, _templateObject337, _templateObject338, _templateObject339, _templateObject340, _templateObject341, _templateObject342, _templateObject343, _templateObject344, _templateObject345, _templateObject346, _templateObject347, _templateObject348, _templateObject349, _templateObject350, _templateObject351, _templateObject352, _templateObject353, _templateObject354, _templateObject355, _templateObject356, _templateObject357, _templateObject358, _templateObject359, _templateObject360, _templateObject361, _templateObject362, _templateObject363, _templateObject364, _templateObject365, _templateObject366, _templateObject367, _templateObject368, _templateObject369, _templateObject370, _templateObject371, _templateObject372, _templateObject373, _templateObject374, _templateObject375, _templateObject376, _templateObject377, _templateObject378, _templateObject379, _templateObject380, _templateObject381, _templateObject382, _templateObject383, _templateObject384, _templateObject385, _templateObject386, _templateObject387, _templateObject388, _templateObject389, _templateObject390, _templateObject391, _templateObject392, _templateObject393, _templateObject394, _templateObject395, _templateObject396, _templateObject397, _templateObject398, _templateObject399, _templateObject400, _templateObject401, _templateObject402, _templateObject403, _templateObject404, _templateObject405, _templateObject406, _templateObject407, _templateObject408, _templateObject409, _templateObject410, _templateObject411, _templateObject412, _templateObject413, _templateObject414, _templateObject415, _templateObject416, _templateObject417, _templateObject418, _templateObject419, _templateObject420, _templateObject421, _templateObject422, _templateObject423, _templateObject424, _templateObject425, _templateObject426, _templateObject427, _templateObject428, _templateObject429, _templateObject430, _templateObject431, _templateObject432, _templateObject433, _templateObject434, _templateObject435, _templateObject436, _templateObject437, _templateObject438, _templateObject439, _templateObject440, _templateObject441, _templateObject442, _templateObject443, _templateObject444, _templateObject445, _templateObject446, _templateObject447, _templateObject448, _templateObject449, _templateObject450, _templateObject451, _templateObject452, _templateObject453, _templateObject454, _templateObject455, _templateObject456, _templateObject457, _templateObject458, _templateObject459, _templateObject460, _templateObject461, _templateObject462, _templateObject463, _templateObject464, _templateObject465, _templateObject466, _templateObject467, _templateObject468, _templateObject469, _templateObject470, _templateObject471, _templateObject472, _templateObject473, _templateObject474, _templateObject475, _templateObject476, _templateObject477, _templateObject478, _templateObject479, _templateObject480, _templateObject481, _templateObject482, _templateObject483, _templateObject484, _templateObject485, _templateObject486, _templateObject487, _templateObject488, _templateObject489, _templateObject490, _templateObject491, _templateObject492, _templateObject493;

function greyyou_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function greyyou_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? greyyou_ownKeys(Object(source), !0).forEach(function (key) { greyyou_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : greyyou_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function greyyou_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function greyyou_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function greyyou_toConsumableArray(arr) { return greyyou_arrayWithoutHoles(arr) || greyyou_iterableToArray(arr) || greyyou_unsupportedIterableToArray(arr) || greyyou_nonIterableSpread(); }

function greyyou_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function greyyou_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return greyyou_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return greyyou_arrayLikeToArray(o, minLen); }

function greyyou_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function greyyou_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return greyyou_arrayLikeToArray(arr); }

function greyyou_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }








var myPulls = [].concat(greyyou_toConsumableArray(template_string_$items(greyyou_templateObject || (greyyou_templateObject = greyyou_taggedTemplateLiteral(["lucky gold ring, Mr. Cheeng's spectacles, mafia thumb ring"])))), greyyou_toConsumableArray(template_string_$items(greyyou_templateObject2 || (greyyou_templateObject2 = greyyou_taggedTemplateLiteral(["model train set, Asdon Martin keyfob, Little Geneticist DNA-Splicing Lab"]))).filter(it => lib_have(it) || (0,external_kolmafia_namespaceObject.getWorkshed)() === it || (0,external_kolmafia_namespaceObject.storageAmount)(it) > 0).slice(0, 1)));
var levelingTurns = 30;

function altWorkshed() {
  return (// eslint-disable-next-line libram/verify-constants
    template_string_$items(greyyou_templateObject3 || (greyyou_templateObject3 = greyyou_taggedTemplateLiteral(["model train set, Asdon Martin keyfob, Little Geneticist DNA-Splicing Lab, portable Mayo Clinic, warbear induction oven, snow machine"]))).find(it => lib_have(it) || (0,external_kolmafia_namespaceObject.getWorkshed)() === it || (0,external_kolmafia_namespaceObject.storageAmount)(it) > 0) || template_string_$item(greyyou_templateObject4 || (greyyou_templateObject4 = greyyou_taggedTemplateLiteral(["none"])))
  );
}

function GyouQuest() {
  return {
    name: "Grey You",
    completed: () => getCurrentLeg() !== Leg.GreyYou,
    tasks: [{
      name: "Whitelist VIP Clan",
      completed: () => !args.clan || (0,external_kolmafia_namespaceObject.getClanName)().toLowerCase() === args.clan.toLowerCase(),
      do: () => (0,external_kolmafia_namespaceObject.cliExecute)("/whitelist ".concat(args.clan))
    }, {
      name: "Prep Fireworks Shop",
      completed: () => !lib_have(template_string_$item(greyyou_templateObject5 || (greyyou_templateObject5 = greyyou_taggedTemplateLiteral(["Clan VIP Lounge key"])))) || property_get("_goorboFireworksPrepped", false),
      do: () => {
        (0,external_kolmafia_namespaceObject.visitUrl)("clan_viplounge.php?action=fwshop&whichfloor=2");
        _set("_goorboFireworksPrepped", true);
      }
    }, {
      name: "Farming Pulls",
      completed: () => myPulls.reduce((b, it) => b && (lib_have(it) || (0,external_kolmafia_namespaceObject.storageAmount)(it) === 0), true),
      //for each, you either pulled it, or you don't own it
      do: () => myPulls.forEach(it => {
        if ((0,external_kolmafia_namespaceObject.storageAmount)(it) !== 0 && !lib_have(it)) (0,external_kolmafia_namespaceObject.cliExecute)("pull ".concat(it));
      })
    }, {
      name: "LGR Seed",
      completed: () => args.noticket || property_get("_stenchAirportToday") || property_get("stenchAirportAlways"),
      do: () => {
        if (!lib_have(template_string_$item(greyyou_templateObject6 || (greyyou_templateObject6 = greyyou_taggedTemplateLiteral(["one-day ticket to Dinseylandfill"]))))) {
          if ((0,external_kolmafia_namespaceObject.storageAmount)(template_string_$item(greyyou_templateObject7 || (greyyou_templateObject7 = greyyou_taggedTemplateLiteral(["one-day ticket to Dinseylandfill"])))) === 0) (0,external_kolmafia_namespaceObject.buyUsingStorage)(template_string_$item(greyyou_templateObject8 || (greyyou_templateObject8 = greyyou_taggedTemplateLiteral(["one-day ticket to Dinseylandfill"]))));
          (0,external_kolmafia_namespaceObject.cliExecute)("pull ".concat(template_string_$item(greyyou_templateObject9 || (greyyou_templateObject9 = greyyou_taggedTemplateLiteral(["one-day ticket to Dinseylandfill"])))));
        }

        (0,external_kolmafia_namespaceObject.use)(template_string_$item(greyyou_templateObject10 || (greyyou_templateObject10 = greyyou_taggedTemplateLiteral(["one-day ticket to Dinseylandfill"]))));
      }
    }, {
      name: "Break Stone",
      completed: () => (0,external_kolmafia_namespaceObject.hippyStoneBroken)() || !args.pvp,
      do: () => {
        (0,external_kolmafia_namespaceObject.visitUrl)("peevpee.php?action=smashstone&pwd&confirm=on", true);
        (0,external_kolmafia_namespaceObject.visitUrl)("peevpee.php?place=fight");
      }
    }, {
      name: "Stillsuit Prep",
      completed: () => (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(greyyou_templateObject11 || (greyyou_templateObject11 = greyyou_taggedTemplateLiteral(["tiny stillsuit"])))) === 0,
      do: () => (0,external_kolmafia_namespaceObject.equip)(template_string_$item(greyyou_templateObject12 || (greyyou_templateObject12 = greyyou_taggedTemplateLiteral(["tiny stillsuit"]))), property_get("stillsuitFamiliar", $familiars(greyyou_templateObject13 || (greyyou_templateObject13 = greyyou_taggedTemplateLiteral(["Gelatinous Cubeling, Levitating Potato, Mosquito"]))).find(fam => lib_have(fam)) || template_string_$familiar(greyyou_templateObject14 || (greyyou_templateObject14 = greyyou_taggedTemplateLiteral(["none"])))))
    }, {
      name: "Run",
      completed: () => step("questL13Final") !== -1 && property_get("gooseReprocessed").split(",").length >= 69,
      //There are 73 total targets
      do: () => (0,external_kolmafia_namespaceObject.cliExecute)(args.gyouscript),
      clear: "all",
      tracking: "Run"
    }, {
      name: "Uncloset Special Seasoning",
      completed: () => (0,external_kolmafia_namespaceObject.myTurncount)() >= 1000 || (0,external_kolmafia_namespaceObject.closetAmount)(template_string_$item(greyyou_templateObject15 || (greyyou_templateObject15 = greyyou_taggedTemplateLiteral(["Special Seasoning"])))) === 0,
      do: () => (0,external_kolmafia_namespaceObject.takeCloset)((0,external_kolmafia_namespaceObject.closetAmount)(template_string_$item(greyyou_templateObject16 || (greyyou_templateObject16 = greyyou_taggedTemplateLiteral(["Special Seasoning"])))), template_string_$item(greyyou_templateObject17 || (greyyou_templateObject17 = greyyou_taggedTemplateLiteral(["Special Seasoning"])))),
      tracking: "Run"
    }, {
      name: "Train Gnome Skills",
      ready: () => (0,external_kolmafia_namespaceObject.myMeat)() >= 5000 && (0,external_kolmafia_namespaceObject.gnomadsAvailable)(),
      completed: () => lib_have($skill(greyyou_templateObject18 || (greyyou_templateObject18 = greyyou_taggedTemplateLiteral(["Torso Awareness"])))),
      do: () => (0,external_kolmafia_namespaceObject.visitUrl)("gnomes.php?action=trainskill&whichskill=".concat((0,external_kolmafia_namespaceObject.toInt)($skill(greyyou_templateObject19 || (greyyou_templateObject19 = greyyou_taggedTemplateLiteral(["Torso Awareness"]))))))
    }, {
      name: "June Cleaver",
      completed: () => !lib_have(template_string_$item(greyyou_templateObject20 || (greyyou_templateObject20 = greyyou_taggedTemplateLiteral(["June cleaver"])))) || property_get("_juneCleaverFightsLeft") > 0 || (0,external_kolmafia_namespaceObject.myAdventures)() === 0,
      choices: {
        793: 4,
        //The Shore -> Gift Shop
        1467: 3,
        //Poetic Justice
        1468: () => property_get("_juneCleaverSkips") < 5 ? 4 : 2,
        //Aunts not Ants
        1469: 3,
        //Beware of Aligator
        1470: () => property_get("_juneCleaverSkips") < 5 ? 4 : 2,
        //Teacher's Pet
        1471: 1,
        //Lost and Found
        1472: () => property_get("_juneCleaverSkips") < 5 ? 4 : 1,
        //Summer Days
        1473: () => property_get("_juneCleaverSkips") < 5 ? 4 : 1,
        //Bath Time
        1474: () => property_get("_juneCleaverSkips") < 5 ? 4 : 2,
        //Delicious Sprouts
        1475: 1 //Hypnotic Master

      },
      do: $location(greyyou_templateObject21 || (greyyou_templateObject21 = greyyou_taggedTemplateLiteral(["The Shore, Inc. Travel Agency"]))),
      post: () => {
        if ((0,external_kolmafia_namespaceObject.handlingChoice)()) (0,external_kolmafia_namespaceObject.visitUrl)("main.php");

        if (lib_have($effect(greyyou_templateObject22 || (greyyou_templateObject22 = greyyou_taggedTemplateLiteral(["Beaten Up"]))))) {
          if (lib_have($skill(greyyou_templateObject23 || (greyyou_templateObject23 = greyyou_taggedTemplateLiteral(["Tongue of the Walrus"]))))) (0,external_kolmafia_namespaceObject.useSkill)($skill(greyyou_templateObject24 || (greyyou_templateObject24 = greyyou_taggedTemplateLiteral(["Tongue of the Walrus"]))));else if (property_get("_hotTubSoaks") < 5) (0,external_kolmafia_namespaceObject.cliExecute)("hottub");else if (property_get("timesRested") < (0,external_kolmafia_namespaceObject.totalFreeRests)()) (0,external_kolmafia_namespaceObject.cliExecute)("campground rest");else if (!(0,external_kolmafia_namespaceObject.use)(template_string_$items(greyyou_templateObject25 || (greyyou_templateObject25 = greyyou_taggedTemplateLiteral(["tiny house, Space Tours Tripple"]))).find(it => lib_have(it)) || template_string_$item(greyyou_templateObject26 || (greyyou_templateObject26 = greyyou_taggedTemplateLiteral(["none"]))))) uneffect($effect(greyyou_templateObject27 || (greyyou_templateObject27 = greyyou_taggedTemplateLiteral(["Beaten Up"]))));
        }
      },
      outfit: () => ({
        equip: template_string_$items(greyyou_templateObject28 || (greyyou_templateObject28 = greyyou_taggedTemplateLiteral(["June cleaver"])))
      }),
      limit: undefined
    }, {
      name: "Autumnaton",
      completed: () => !lib_have(template_string_$item(greyyou_templateObject29 || (greyyou_templateObject29 = greyyou_taggedTemplateLiteral(["autumn-aton"])))) || turnsForQuest() >= (0,external_kolmafia_namespaceObject.myAdventures)() + 10,
      do: () => {
        if ((0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(greyyou_templateObject30 || (greyyou_templateObject30 = greyyou_taggedTemplateLiteral(["imp air"])))) < 5 && !lib_have($skill(greyyou_templateObject31 || (greyyou_templateObject31 = greyyou_taggedTemplateLiteral(["Liver of Steel"])))) && !lib_have(template_string_$item(greyyou_templateObject32 || (greyyou_templateObject32 = greyyou_taggedTemplateLiteral(["steel margarita"])))) && !lib_have(template_string_$item(greyyou_templateObject33 || (greyyou_templateObject33 = greyyou_taggedTemplateLiteral(["Azazel's tutu"]))))) {
          sendTo($location(greyyou_templateObject34 || (greyyou_templateObject34 = greyyou_taggedTemplateLiteral(["The Laugh Floor"]))));
        }

        if ((0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(greyyou_templateObject35 || (greyyou_templateObject35 = greyyou_taggedTemplateLiteral(["bus pass"])))) < 5 && !lib_have($skill(greyyou_templateObject36 || (greyyou_templateObject36 = greyyou_taggedTemplateLiteral(["Liver of Steel"])))) && !lib_have(template_string_$item(greyyou_templateObject37 || (greyyou_templateObject37 = greyyou_taggedTemplateLiteral(["steel margarita"])))) && !lib_have(template_string_$item(greyyou_templateObject38 || (greyyou_templateObject38 = greyyou_taggedTemplateLiteral(["Azazel's tutu"]))))) {
          sendTo($location(greyyou_templateObject39 || (greyyou_templateObject39 = greyyou_taggedTemplateLiteral(["Infernal Rackets Backstage"]))));
        }

        var autumnAtonZones = $locations(greyyou_templateObject40 || (greyyou_templateObject40 = greyyou_taggedTemplateLiteral(["The Toxic Teacups, The Oasis, The Deep Dark Jungle, The Bubblin' Caldera, The Sleazy Back Alley"])));

        if (turnsForQuest() < (0,external_kolmafia_namespaceObject.myAdventures)() + 10) {
          sendTo(autumnAtonZones);
        }
      }
    }, {
      name: "Meat Boombox",
      completed: () => !lib_have(template_string_$item(greyyou_templateObject41 || (greyyou_templateObject41 = greyyou_taggedTemplateLiteral(["SongBoom\u2122 BoomBox"])))) || property_get("boomBoxSong") === "Total Eclipse of Your Meat" || property_get("_boomBoxSongsLeft") === 0,
      do: () => setSong("Total Eclipse of Your Meat")
    }, {
      name: "Install Alternate Workshed",
      ready: () => lib_have(altWorkshed()),
      completed: () => altWorkshed() === template_string_$item(greyyou_templateObject42 || (greyyou_templateObject42 = greyyou_taggedTemplateLiteral(["none"]))) || property_get("_workshedItemUsed") || (0,external_kolmafia_namespaceObject.getWorkshed)() === altWorkshed(),
      do: () => (0,external_kolmafia_namespaceObject.use)(altWorkshed())
    }, {
      name: "Make Soda Bread",
      completed: () => (0,external_kolmafia_namespaceObject.myTurncount)() >= 1000 || (0,external_kolmafia_namespaceObject.getWorkshed)() !== template_string_$item(greyyou_templateObject43 || (greyyou_templateObject43 = greyyou_taggedTemplateLiteral(["Asdon Martin keyfob"]))) || lib_have($effect(greyyou_templateObject44 || (greyyou_templateObject44 = greyyou_taggedTemplateLiteral(["Driving Observantly"])))) || (0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(greyyou_templateObject45 || (greyyou_templateObject45 = greyyou_taggedTemplateLiteral(["loaf of soda bread"])))) >= 10,
      do: () => {
        if ((0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(greyyou_templateObject46 || (greyyou_templateObject46 = greyyou_taggedTemplateLiteral(["wad of dough"])))) < 10) {
          (0,external_kolmafia_namespaceObject.buy)(template_string_$item(greyyou_templateObject47 || (greyyou_templateObject47 = greyyou_taggedTemplateLiteral(["all-purpose flower"]))));
          (0,external_kolmafia_namespaceObject.use)(template_string_$item(greyyou_templateObject48 || (greyyou_templateObject48 = greyyou_taggedTemplateLiteral(["all-purpose flower"]))));
        }

        (0,external_kolmafia_namespaceObject.retrieveItem)(10, template_string_$item(greyyou_templateObject49 || (greyyou_templateObject49 = greyyou_taggedTemplateLiteral(["loaf of soda bread"]))));
      }
    }, {
      name: "Drive Observantly",
      completed: () => (0,external_kolmafia_namespaceObject.getWorkshed)() !== template_string_$item(greyyou_templateObject50 || (greyyou_templateObject50 = greyyou_taggedTemplateLiteral(["Asdon Martin keyfob"]))) || lib_have($effect(greyyou_templateObject51 || (greyyou_templateObject51 = greyyou_taggedTemplateLiteral(["Driving Observantly"])))),
      do: () => drive($effect(greyyou_templateObject52 || (greyyou_templateObject52 = greyyou_taggedTemplateLiteral(["Driving Observantly"]))), 30, false)
    }, {
      name: "Sample Constellation DNA",
      ready: () => lib_have(template_string_$item(greyyou_templateObject53 || (greyyou_templateObject53 = greyyou_taggedTemplateLiteral(["DNA extraction syringe"])))),
      completed: () => !DNALab_installed() || isHybridized($phylum(greyyou_templateObject54 || (greyyou_templateObject54 = greyyou_taggedTemplateLiteral(["Constellation"])))) || property_get("dnaSyringe") === $phylum(greyyou_templateObject55 || (greyyou_templateObject55 = greyyou_taggedTemplateLiteral(["Constellation"]))),
      outfit: {
        familiar: bestFam(),
        modifier: "".concat(maxBase())
      },
      do: $location(greyyou_templateObject56 || (greyyou_templateObject56 = greyyou_taggedTemplateLiteral(["The Hole in the Sky"]))),
      combat: new CombatStrategy().macro(Macro.skill($skill(greyyou_templateObject57 || (greyyou_templateObject57 = greyyou_taggedTemplateLiteral(["Infinite Loop"])))), getTodaysHolidayWanderers()).macro(Macro.tryItem(template_string_$item(greyyou_templateObject58 || (greyyou_templateObject58 = greyyou_taggedTemplateLiteral(["DNA extraction syringe"]))))).macro(Macro.tryItem(template_string_$item(greyyou_templateObject59 || (greyyou_templateObject59 = greyyou_taggedTemplateLiteral(["porquoise-handled sixgun"])))).trySkill($skill(greyyou_templateObject60 || (greyyou_templateObject60 = greyyou_taggedTemplateLiteral(["Sing Along"])))).attack().repeat())
    }, {
      name: "Hybridize Constellation",
      ready: () => property_get("dnaSyringe") === $phylum(greyyou_templateObject61 || (greyyou_templateObject61 = greyyou_taggedTemplateLiteral(["Constellation"]))),
      completed: () => !DNALab_installed() || isHybridized($phylum(greyyou_templateObject62 || (greyyou_templateObject62 = greyyou_taggedTemplateLiteral(["Constellation"])))),
      do: () => {
        makeTonic(3);
        hybridize();
      }
    }, {
      name: "Robort Collect Fish Head",
      ready: () => lib_have(template_string_$item(greyyou_templateObject63 || (greyyou_templateObject63 = greyyou_taggedTemplateLiteral(["boxed wine"])))) && meatFam() === template_string_$familiar(greyyou_templateObject64 || (greyyou_templateObject64 = greyyou_taggedTemplateLiteral(["Robortender"]))),
      completed: () => !lib_have(template_string_$item(greyyou_templateObject65 || (greyyou_templateObject65 = greyyou_taggedTemplateLiteral(["miniature crystal ball"])))) || !lib_have(template_string_$familiar(greyyou_templateObject66 || (greyyou_templateObject66 = greyyou_taggedTemplateLiteral(["Robortender"])))) || currentDrinks().includes(template_string_$item(greyyou_templateObject67 || (greyyou_templateObject67 = greyyou_taggedTemplateLiteral(["drive-by shooting"])))) || lib_have(template_string_$item(greyyou_templateObject68 || (greyyou_templateObject68 = greyyou_taggedTemplateLiteral(["fish head"])))) || lib_have(template_string_$item(greyyou_templateObject69 || (greyyou_templateObject69 = greyyou_taggedTemplateLiteral(["piscatini"])))) || lib_have(template_string_$item(greyyou_templateObject70 || (greyyou_templateObject70 = greyyou_taggedTemplateLiteral(["drive-by shooting"])))),
      outfit: {
        familiar: property_get("crystalBallPredictions").includes(":The Copperhead Club:Mob Penguin Capo") ? template_string_$familiar(greyyou_templateObject71 || (greyyou_templateObject71 = greyyou_taggedTemplateLiteral(["Robortender"]))) : lib_have(template_string_$familiar(greyyou_templateObject72 || (greyyou_templateObject72 = greyyou_taggedTemplateLiteral(["Red-Nosed Snapper"])))) ? template_string_$familiar(greyyou_templateObject73 || (greyyou_templateObject73 = greyyou_taggedTemplateLiteral(["Red-Nosed Snapper"]))) : bestFam(),
        famequip: template_string_$item(greyyou_templateObject74 || (greyyou_templateObject74 = greyyou_taggedTemplateLiteral(["miniature crystal ball"]))),
        // ...(have($item`latte lovers member's mug`) &&
        // !get("_latteCopyUsed") &&
        // get("crystalBallPredictions").includes(":The Copperhead Club:Mob Penguin Capo")
        //   ? { offhand: $item`latte lovers member's mug` }
        //   : {}),
        modifier: "".concat(maxBase())
      },
      prepare: () => {
        if ((0,external_kolmafia_namespaceObject.myFamiliar)() === template_string_$familiar(greyyou_templateObject75 || (greyyou_templateObject75 = greyyou_taggedTemplateLiteral(["Red-Nosed Snapper"]))) && getTrackedPhylum() !== $phylum(greyyou_templateObject76 || (greyyou_templateObject76 = greyyou_taggedTemplateLiteral(["penguin"])))) trackPhylum($phylum(greyyou_templateObject77 || (greyyou_templateObject77 = greyyou_taggedTemplateLiteral(["penguin"]))));
        (0,external_kolmafia_namespaceObject.restoreHp)(0.75 * (0,external_kolmafia_namespaceObject.myMaxhp)());
        (0,external_kolmafia_namespaceObject.restoreMp)(20);
      },
      do: $location(greyyou_templateObject78 || (greyyou_templateObject78 = greyyou_taggedTemplateLiteral(["The Copperhead Club"]))),
      combat: new CombatStrategy().macro(Macro.skill($skill(greyyou_templateObject79 || (greyyou_templateObject79 = greyyou_taggedTemplateLiteral(["Infinite Loop"])))), getTodaysHolidayWanderers()) // .macro(Macro.trySkill($skill`Offer Latte to Opponent`), $monster`Mob Penguin Capo`)
      .macro(() => Macro.externalIf(!$monsters(greyyou_templateObject80 || (greyyou_templateObject80 = greyyou_taggedTemplateLiteral(["Copperhead Club bartender, fan dancer, ninja dressed as a waiter, waiter dressed as a ninja"]))).find(mob => mob === getBanishedMonsters().get($skill(greyyou_templateObject81 || (greyyou_templateObject81 = greyyou_taggedTemplateLiteral(["System Sweep"])))) //get("banishedMonsters").includes(`${mob.name}:System Sweep`)
      ), Macro.trySkill($skill(greyyou_templateObject82 || (greyyou_templateObject82 = greyyou_taggedTemplateLiteral(["System Sweep"]))))), $monsters(greyyou_templateObject83 || (greyyou_templateObject83 = greyyou_taggedTemplateLiteral(["Copperhead Club bartender, fan dancer, ninja dressed as a waiter, waiter dressed as a ninja"])))).macro(Macro.tryItem(template_string_$item(greyyou_templateObject84 || (greyyou_templateObject84 = greyyou_taggedTemplateLiteral(["porquoise-handled sixgun"])))).trySkill($skill(greyyou_templateObject85 || (greyyou_templateObject85 = greyyou_taggedTemplateLiteral(["Sing Along"])))).attack().repeat()),
      limit: {
        tries: 10
      }
    }, {
      name: "Feed Robortender",
      ready: () => lib_have(template_string_$item(greyyou_templateObject86 || (greyyou_templateObject86 = greyyou_taggedTemplateLiteral(["boxed wine"])))) && lib_have(template_string_$item(greyyou_templateObject87 || (greyyou_templateObject87 = greyyou_taggedTemplateLiteral(["fish head"])))) || lib_have(template_string_$item(greyyou_templateObject88 || (greyyou_templateObject88 = greyyou_taggedTemplateLiteral(["piscatini"])))) || lib_have(template_string_$item(greyyou_templateObject89 || (greyyou_templateObject89 = greyyou_taggedTemplateLiteral(["drive-by shooting"])))),
      completed: () => !lib_have(template_string_$familiar(greyyou_templateObject90 || (greyyou_templateObject90 = greyyou_taggedTemplateLiteral(["Robortender"])))) || currentDrinks().includes(template_string_$item(greyyou_templateObject91 || (greyyou_templateObject91 = greyyou_taggedTemplateLiteral(["drive-by shooting"])))),
      do: () => {
        (0,external_kolmafia_namespaceObject.retrieveItem)(template_string_$item(greyyou_templateObject92 || (greyyou_templateObject92 = greyyou_taggedTemplateLiteral(["drive-by shooting"]))));
        (0,external_kolmafia_namespaceObject.useFamiliar)(template_string_$familiar(greyyou_templateObject93 || (greyyou_templateObject93 = greyyou_taggedTemplateLiteral(["Robortender"]))));
        feed(template_string_$item(greyyou_templateObject94 || (greyyou_templateObject94 = greyyou_taggedTemplateLiteral(["drive-by shooting"]))));
      }
    }, {
      name: "Custom Ronin Farm",
      completed: () => !args.roninfarm || args.roninfarm === "" || property_get("_goorbo_roninfarmComplete", false),
      do: () => {
        if (args.roninfarm) (0,external_kolmafia_namespaceObject.cliExecute)(args.roninfarm);
        _set("_goorbo_roninfarmComplete", true);
      },
      tracking: "GooFarming"
    }, {
      name: "In-Run Farm Initial",
      completed: () => (0,external_kolmafia_namespaceObject.myTurncount)() >= 1000,
      acquire: [{
        item: template_string_$item(greyyou_templateObject95 || (greyyou_templateObject95 = greyyou_taggedTemplateLiteral(["seal tooth"])))
      }],
      outfit: () => ({
        familiar: meatFam(),
        modifier: "".concat(maxBase(), ", 2.5 meat, 0.6 items")
      }),
      prepare: () => {
        if (lib_have(template_string_$item(greyyou_templateObject96 || (greyyou_templateObject96 = greyyou_taggedTemplateLiteral(["How to Avoid Scams"]))))) ensureEffect($effect(greyyou_templateObject97 || (greyyou_templateObject97 = greyyou_taggedTemplateLiteral(["How to Scam Tourists"]))));
        (0,external_kolmafia_namespaceObject.restoreHp)(0.75 * (0,external_kolmafia_namespaceObject.myMaxhp)());
        (0,external_kolmafia_namespaceObject.restoreMp)(20);
      },
      do: $location(greyyou_templateObject98 || (greyyou_templateObject98 = greyyou_taggedTemplateLiteral(["Barf Mountain"]))),
      combat: new CombatStrategy().macro(Macro.skill($skill(greyyou_templateObject99 || (greyyou_templateObject99 = greyyou_taggedTemplateLiteral(["Infinite Loop"])))), getTodaysHolidayWanderers()).macro(() => Macro.trySkill($skill(greyyou_templateObject100 || (greyyou_templateObject100 = greyyou_taggedTemplateLiteral(["Bowl Straight Up"])))).trySkill($skill(greyyou_templateObject101 || (greyyou_templateObject101 = greyyou_taggedTemplateLiteral(["Sing Along"])))).trySkill($skill(greyyou_templateObject102 || (greyyou_templateObject102 = greyyou_taggedTemplateLiteral(["Extract Jelly"])))).tryItem(template_string_$item(greyyou_templateObject103 || (greyyou_templateObject103 = greyyou_taggedTemplateLiteral(["porquoise-handled sixgun"])))).externalIf((0,external_kolmafia_namespaceObject.myFamiliar)() === template_string_$familiar(greyyou_templateObject104 || (greyyou_templateObject104 = greyyou_taggedTemplateLiteral(["Hobo Monkey"]))), Macro.while_("!match \"shoulder, and hands you some Meat.\" && !pastround 20 && !hppercentbelow 25", Macro.item(template_string_$item(greyyou_templateObject105 || (greyyou_templateObject105 = greyyou_taggedTemplateLiteral(["seal tooth"])))))).trySkill($skill(greyyou_templateObject106 || (greyyou_templateObject106 = greyyou_taggedTemplateLiteral(["Double Nanovision"])))).attack().repeat()),
      limit: {
        tries: 550
      },
      tracking: "GooFarming"
    }, {
      name: "Pull All",
      completed: () => (0,external_kolmafia_namespaceObject.myStorageMeat)() === 0 && (0,external_kolmafia_namespaceObject.storageAmount)(template_string_$item(greyyou_templateObject107 || (greyyou_templateObject107 = greyyou_taggedTemplateLiteral(["old sweatpants"])))) === 0,
      // arbitrary item
      do: () => {
        (0,external_kolmafia_namespaceObject.cliExecute)("pull all");
        (0,external_kolmafia_namespaceObject.cliExecute)("refresh all");
      }
    }, {
      name: "Get Amulet Coin",
      ready: () => lib_have(template_string_$familiar(greyyou_templateObject108 || (greyyou_templateObject108 = greyyou_taggedTemplateLiteral(["Cornbeefadon"])))),
      completed: () => lib_have(template_string_$item(greyyou_templateObject109 || (greyyou_templateObject109 = greyyou_taggedTemplateLiteral(["amulet coin"])))),
      acquire: [{
        item: template_string_$item(greyyou_templateObject110 || (greyyou_templateObject110 = greyyou_taggedTemplateLiteral(["box of Familiar Jacks"]))),
        price: 20000
      }],
      do: () => {
        (0,external_kolmafia_namespaceObject.useFamiliar)(template_string_$familiar(greyyou_templateObject111 || (greyyou_templateObject111 = greyyou_taggedTemplateLiteral(["Cornbeefadon"]))));
        (0,external_kolmafia_namespaceObject.use)(template_string_$item(greyyou_templateObject112 || (greyyou_templateObject112 = greyyou_taggedTemplateLiteral(["box of Familiar Jacks"]))));
      }
    }, {
      name: "Tower",
      completed: () => step("questL13Final") > 11,
      do: () => (0,external_kolmafia_namespaceObject.cliExecute)("loopgyou delaytower chargegoose=20"),
      clear: "all",
      tracking: "Run"
    }, {
      name: "Daily Dungeon",
      ready: () => (0,external_kolmafia_namespaceObject.myClass)() === $class(greyyou_templateObject113 || (greyyou_templateObject113 = greyyou_taggedTemplateLiteral(["Grey Goo"]))) && (0,external_kolmafia_namespaceObject.myAdventures)() > 40 || (0,external_kolmafia_namespaceObject.myClass)() !== $class(greyyou_templateObject114 || (greyyou_templateObject114 = greyyou_taggedTemplateLiteral(["Grey Goo"]))) && (0,external_kolmafia_namespaceObject.myLevel)() >= args.targetlevel,
      completed: () => property_get("dailyDungeonDone"),
      acquire: template_string_$items(greyyou_templateObject115 || (greyyou_templateObject115 = greyyou_taggedTemplateLiteral(["eleven-foot pole, Pick-O-Matic lockpicks, ring of Detect Boring Doors"]))).map(it => ({
        item: it,
        price: 1000
      })),
      outfit: () => {
        return greyyou_objectSpread(greyyou_objectSpread({
          familiar: bestFam()
        }, property_get("_lastDailyDungeonRoom") % 5 === 4 ? {
          acc1: template_string_$item(greyyou_templateObject116 || (greyyou_templateObject116 = greyyou_taggedTemplateLiteral(["ring of Detect Boring Doors"])))
        } : {}), {}, {
          modifier: "".concat(maxBase(), ", 250 bonus carnivorous potted plant, 100 familiar experience")
        });
      },
      prepare: () => {
        if (!property_get("_dailyDungeonMalwareUsed") && (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(greyyou_templateObject117 || (greyyou_templateObject117 = greyyou_taggedTemplateLiteral(["fat loot token"])))) < 3 && (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(greyyou_templateObject118 || (greyyou_templateObject118 = greyyou_taggedTemplateLiteral(["daily dungeon malware"])))) === 0) {
          if ((0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(greyyou_templateObject119 || (greyyou_templateObject119 = greyyou_taggedTemplateLiteral(["BACON"])))) >= 150) (0,external_kolmafia_namespaceObject.buy)($coinmaster(greyyou_templateObject120 || (greyyou_templateObject120 = greyyou_taggedTemplateLiteral(["internet meme shop"]))), 1, template_string_$item(greyyou_templateObject121 || (greyyou_templateObject121 = greyyou_taggedTemplateLiteral(["daily dungeon malware"]))));else (0,external_kolmafia_namespaceObject.retrieveItem)(1, template_string_$item(greyyou_templateObject122 || (greyyou_templateObject122 = greyyou_taggedTemplateLiteral(["daily dungeon malware"]))));
        }

        (0,external_kolmafia_namespaceObject.restoreHp)(0.75 * (0,external_kolmafia_namespaceObject.myMaxhp)());
        (0,external_kolmafia_namespaceObject.restoreMp)(20);
      },
      do: $location(greyyou_templateObject123 || (greyyou_templateObject123 = greyyou_taggedTemplateLiteral(["The Daily Dungeon"]))),
      choices: {
        692: 3,
        //dd door: lockpicks
        689: 1,
        //dd final chest : open
        690: 2,
        //dd chest 1: boring door
        691: 2,
        //dd chest 2: boring door
        693: 2 //dd trap: skip

      },
      combat: new CombatStrategy().macro(Macro.skill($skill(greyyou_templateObject124 || (greyyou_templateObject124 = greyyou_taggedTemplateLiteral(["Infinite Loop"])))), getTodaysHolidayWanderers()).macro(() => Macro.externalIf(!property_get("_dailyDungeonMalwareUsed"), Macro.tryItem(template_string_$item(greyyou_templateObject125 || (greyyou_templateObject125 = greyyou_taggedTemplateLiteral(["daily dungeon malware"]))))).tryItem(template_string_$item(greyyou_templateObject126 || (greyyou_templateObject126 = greyyou_taggedTemplateLiteral(["porquoise-handled sixgun"])))).attack().repeat()),
      limit: {
        tries: 15
      }
    }, {
      name: "Laugh Floor",
      ready: () => (0,external_kolmafia_namespaceObject.myClass)() === $class(greyyou_templateObject127 || (greyyou_templateObject127 = greyyou_taggedTemplateLiteral(["Grey Goo"]))) && (0,external_kolmafia_namespaceObject.myAdventures)() > 40 || (0,external_kolmafia_namespaceObject.myClass)() !== $class(_templateObject128 || (_templateObject128 = greyyou_taggedTemplateLiteral(["Grey Goo"]))) && (0,external_kolmafia_namespaceObject.myLevel)() >= args.targetlevel,
      completed: () => args.ascend || lib_have($skill(_templateObject129 || (_templateObject129 = greyyou_taggedTemplateLiteral(["Liver of Steel"])))) || lib_have(template_string_$item(_templateObject130 || (_templateObject130 = greyyou_taggedTemplateLiteral(["steel margarita"])))) || lib_have(template_string_$item(_templateObject131 || (_templateObject131 = greyyou_taggedTemplateLiteral(["Azazel's lollipop"])))) || lib_have(template_string_$item(_templateObject132 || (_templateObject132 = greyyou_taggedTemplateLiteral(["observational glasses"])))),
      prepare: () => {
        //add casting of +com skills here. Also request buffs from buffy?
        if (!lib_have($effect(_templateObject133 || (_templateObject133 = greyyou_taggedTemplateLiteral(["Carlweather's Cantata of Confrontation"]))))) {
          (0,external_kolmafia_namespaceObject.cliExecute)("kmail to Buffy || 10 Cantata of Confrontation");
          (0,external_kolmafia_namespaceObject.wait)(15);
          (0,external_kolmafia_namespaceObject.cliExecute)("refresh effects");
          (0,external_kolmafia_namespaceObject.restoreHp)(0.75 * (0,external_kolmafia_namespaceObject.myMaxhp)());
          (0,external_kolmafia_namespaceObject.restoreMp)(20);
        }

        if (lib_have($skill(_templateObject134 || (_templateObject134 = greyyou_taggedTemplateLiteral(["Piezoelectric Honk"])))) && !lib_have($effect(_templateObject135 || (_templateObject135 = greyyou_taggedTemplateLiteral(["Hooooooooonk!"]))))) (0,external_kolmafia_namespaceObject.useSkill)($skill(_templateObject136 || (_templateObject136 = greyyou_taggedTemplateLiteral(["Piezoelectric Honk"]))));
        $effects(_templateObject137 || (_templateObject137 = greyyou_taggedTemplateLiteral(["The Sonata of Sneakiness, Darkened Photons, Shifted Phase"]))).forEach(ef => (0,external_kolmafia_namespaceObject.cliExecute)("uneffect ".concat(ef)));
      },
      do: $location(_templateObject138 || (_templateObject138 = greyyou_taggedTemplateLiteral(["The Laugh Floor"]))),
      outfit: () => ({
        familiar: bestFam(),
        modifier: "".concat(maxBase(), ", 100 combat rate, 3 item, 250 bonus carnivorous potted plant, 100 familiar experience")
      }),
      combat: new CombatStrategy().macro(Macro.skill($skill(_templateObject139 || (_templateObject139 = greyyou_taggedTemplateLiteral(["Infinite Loop"])))), getTodaysHolidayWanderers()).macro(Macro.tryItem(template_string_$item(_templateObject140 || (_templateObject140 = greyyou_taggedTemplateLiteral(["porquoise-handled sixgun"])))).trySkill($skill(_templateObject141 || (_templateObject141 = greyyou_taggedTemplateLiteral(["Double Nanovision"])))).attack().repeat()),
      limit: {
        tries: 15
      }
    }, {
      name: "Infernal Rackets Backstage",
      ready: () => (0,external_kolmafia_namespaceObject.myClass)() === $class(_templateObject142 || (_templateObject142 = greyyou_taggedTemplateLiteral(["Grey Goo"]))) && (0,external_kolmafia_namespaceObject.myAdventures)() > 40 || (0,external_kolmafia_namespaceObject.myClass)() !== $class(_templateObject143 || (_templateObject143 = greyyou_taggedTemplateLiteral(["Grey Goo"]))) && (0,external_kolmafia_namespaceObject.myLevel)() >= args.targetlevel,
      completed: () => args.ascend || lib_have($skill(_templateObject144 || (_templateObject144 = greyyou_taggedTemplateLiteral(["Liver of Steel"])))) || lib_have(template_string_$item(_templateObject145 || (_templateObject145 = greyyou_taggedTemplateLiteral(["steel margarita"])))) || lib_have(template_string_$item(_templateObject146 || (_templateObject146 = greyyou_taggedTemplateLiteral(["Azazel's unicorn"])))) || backstageItemsDone(),
      prepare: () => {
        //add casting of -com skills here. Also request buffs from buffy?
        if (!lib_have($effect(_templateObject147 || (_templateObject147 = greyyou_taggedTemplateLiteral(["The Sonata of Sneakiness"]))))) {
          (0,external_kolmafia_namespaceObject.cliExecute)("kmail to Buffy || 10 Sonata of Sneakiness");
          (0,external_kolmafia_namespaceObject.wait)(15);
          (0,external_kolmafia_namespaceObject.cliExecute)("refresh effects");
          (0,external_kolmafia_namespaceObject.restoreHp)(0.75 * (0,external_kolmafia_namespaceObject.myMaxhp)());
          (0,external_kolmafia_namespaceObject.restoreMp)(20);
        }

        if (lib_have($skill(_templateObject148 || (_templateObject148 = greyyou_taggedTemplateLiteral(["Photonic Shroud"])))) && !lib_have($effect(_templateObject149 || (_templateObject149 = greyyou_taggedTemplateLiteral(["Darkened Photons"]))))) (0,external_kolmafia_namespaceObject.useSkill)($skill(_templateObject150 || (_templateObject150 = greyyou_taggedTemplateLiteral(["Photonic Shroud"]))));
        if (lib_have($skill(_templateObject151 || (_templateObject151 = greyyou_taggedTemplateLiteral(["Phase Shift"])))) && !lib_have($effect(_templateObject152 || (_templateObject152 = greyyou_taggedTemplateLiteral(["Shifted Phase"]))))) (0,external_kolmafia_namespaceObject.useSkill)($skill(_templateObject153 || (_templateObject153 = greyyou_taggedTemplateLiteral(["Phase Shift"]))));
        $effects(_templateObject154 || (_templateObject154 = greyyou_taggedTemplateLiteral(["Carlweather's Cantata of Confrontation, Hooooooooonk!"]))).forEach(ef => (0,external_kolmafia_namespaceObject.cliExecute)("uneffect ".concat(ef)));
      },
      do: $location(_templateObject155 || (_templateObject155 = greyyou_taggedTemplateLiteral(["Infernal Rackets Backstage"]))),
      outfit: () => ({
        familiar: bestFam(),
        modifier: "".concat(maxBase(), ", -100 combat rate, 3 item, 250 bonus carnivorous potted plant, 100 familiar experience")
      }),
      combat: new CombatStrategy().macro(Macro.skill($skill(_templateObject156 || (_templateObject156 = greyyou_taggedTemplateLiteral(["Infinite Loop"])))), getTodaysHolidayWanderers()).macro(Macro.tryItem(template_string_$item(_templateObject157 || (_templateObject157 = greyyou_taggedTemplateLiteral(["porquoise-handled sixgun"])))).trySkill($skill(_templateObject158 || (_templateObject158 = greyyou_taggedTemplateLiteral(["Double Nanovision"])))).repeat()),
      limit: {
        tries: 15
      }
    }, {
      name: "Mourn",
      ready: () => lib_have(template_string_$item(_templateObject159 || (_templateObject159 = greyyou_taggedTemplateLiteral(["observational glasses"])))),
      completed: () => args.ascend || lib_have($skill(_templateObject160 || (_templateObject160 = greyyou_taggedTemplateLiteral(["Liver of Steel"])))) || lib_have(template_string_$item(_templateObject161 || (_templateObject161 = greyyou_taggedTemplateLiteral(["steel margarita"])))) || lib_have(template_string_$item(_templateObject162 || (_templateObject162 = greyyou_taggedTemplateLiteral(["Azazel's lollipop"])))),
      outfit: {
        equip: template_string_$items(_templateObject163 || (_templateObject163 = greyyou_taggedTemplateLiteral(["hilarious comedy prop, observational glasses, Victor, the Insult Comic Hellhound Puppet"], ["hilarious comedy prop, observational glasses, Victor\\, the Insult Comic Hellhound Puppet"])))
      },
      do: () => (0,external_kolmafia_namespaceObject.cliExecute)("panda comedy insult; panda comedy observe")
    }, {
      name: "Sven Golly",
      ready: () => backstageItemsDone(),
      completed: () => args.ascend || lib_have($skill(_templateObject164 || (_templateObject164 = greyyou_taggedTemplateLiteral(["Liver of Steel"])))) || lib_have(template_string_$item(_templateObject165 || (_templateObject165 = greyyou_taggedTemplateLiteral(["steel margarita"])))) || lib_have(template_string_$item(_templateObject166 || (_templateObject166 = greyyou_taggedTemplateLiteral(["Azazel's unicorn"])))),
      do: () => {
        (0,external_kolmafia_namespaceObject.cliExecute)("panda arena Bognort ".concat(template_string_$items(_templateObject167 || (_templateObject167 = greyyou_taggedTemplateLiteral(["giant marshmallow, gin-soaked blotter paper"]))).find(a => lib_have(a))));
        (0,external_kolmafia_namespaceObject.cliExecute)("panda arena Stinkface ".concat(template_string_$items(_templateObject168 || (_templateObject168 = greyyou_taggedTemplateLiteral(["beer-scented teddy bear, gin-soaked blotter paper"]))).find(a => lib_have(a))));
        (0,external_kolmafia_namespaceObject.cliExecute)("panda arena Flargwurm ".concat(template_string_$items(_templateObject169 || (_templateObject169 = greyyou_taggedTemplateLiteral(["booze-soaked cherry, sponge cake"]))).find(a => lib_have(a))));
        (0,external_kolmafia_namespaceObject.cliExecute)("panda arena Jim ".concat(template_string_$items(_templateObject170 || (_templateObject170 = greyyou_taggedTemplateLiteral(["comfy pillow, sponge cake"]))).find(a => lib_have(a))));
      }
    }, {
      name: "Moaning Panda",
      ready: () => haveAll(template_string_$items(_templateObject171 || (_templateObject171 = greyyou_taggedTemplateLiteral(["Azazel's lollipop, Azazel's unicorn"])))),
      completed: () => args.ascend || lib_have($skill(_templateObject172 || (_templateObject172 = greyyou_taggedTemplateLiteral(["Liver of Steel"])))) || lib_have(template_string_$item(_templateObject173 || (_templateObject173 = greyyou_taggedTemplateLiteral(["steel margarita"])))) || lib_have(template_string_$item(_templateObject174 || (_templateObject174 = greyyou_taggedTemplateLiteral(["Azazel's tutu"])))),
      acquire: () => template_string_$items(_templateObject175 || (_templateObject175 = greyyou_taggedTemplateLiteral(["bus pass, imp air"]))).map(it => ({
        item: it,
        num: 5,
        price: property_get("valueOfAdventure")
      })),
      do: () => (0,external_kolmafia_namespaceObject.cliExecute)("panda moan"),
      limit: {
        tries: 3
      }
    }, {
      name: "Custom Post-Ronin Farm",
      completed: () => !args.postroninfarm || args.postroninfarm === "" || property_get("_goorbo_postroninfarmComplete", false),
      do: () => {
        if (args.postroninfarm) (0,external_kolmafia_namespaceObject.cliExecute)(args.postroninfarm);
        _set("_goorbo_postroninfarmComplete", true);
      },
      tracking: "GooFarming"
    }, {
      name: "In-Run Farm Final",
      completed: () => (0,external_kolmafia_namespaceObject.myAdventures)() <= 40 || (0,external_kolmafia_namespaceObject.myClass)() !== $class(_templateObject176 || (_templateObject176 = greyyou_taggedTemplateLiteral(["Grey Goo"]))),
      acquire: [{
        item: template_string_$item(_templateObject177 || (_templateObject177 = greyyou_taggedTemplateLiteral(["seal tooth"])))
      }],
      outfit: () => ({
        familiar: meatFam(),
        modifier: "".concat(maxBase(), ", 2.5 meat, 0.6 items")
      }),
      prepare: () => {
        if (lib_have(template_string_$item(_templateObject178 || (_templateObject178 = greyyou_taggedTemplateLiteral(["How to Avoid Scams"]))))) ensureEffect($effect(_templateObject179 || (_templateObject179 = greyyou_taggedTemplateLiteral(["How to Scam Tourists"]))));
        (0,external_kolmafia_namespaceObject.restoreHp)(0.75 * (0,external_kolmafia_namespaceObject.myMaxhp)());
        (0,external_kolmafia_namespaceObject.restoreMp)(20);
      },
      do: $location(_templateObject180 || (_templateObject180 = greyyou_taggedTemplateLiteral(["Barf Mountain"]))),
      combat: new CombatStrategy().macro(Macro.skill($skill(_templateObject181 || (_templateObject181 = greyyou_taggedTemplateLiteral(["Infinite Loop"])))), getTodaysHolidayWanderers()).macro(() => Macro.trySkill($skill(_templateObject182 || (_templateObject182 = greyyou_taggedTemplateLiteral(["Bowl Straight Up"])))).trySkill($skill(_templateObject183 || (_templateObject183 = greyyou_taggedTemplateLiteral(["Sing Along"])))).trySkill($skill(_templateObject184 || (_templateObject184 = greyyou_taggedTemplateLiteral(["Extract Jelly"])))).tryItem(template_string_$item(_templateObject185 || (_templateObject185 = greyyou_taggedTemplateLiteral(["porquoise-handled sixgun"])))).externalIf((0,external_kolmafia_namespaceObject.myFamiliar)() === template_string_$familiar(_templateObject186 || (_templateObject186 = greyyou_taggedTemplateLiteral(["Hobo Monkey"]))), Macro.while_("!match \"shoulder, and hands you some Meat.\" && !pastround 20 && !hppercentbelow 25", Macro.item(template_string_$item(_templateObject187 || (_templateObject187 = greyyou_taggedTemplateLiteral(["seal tooth"])))))).trySkill($skill(_templateObject188 || (_templateObject188 = greyyou_taggedTemplateLiteral(["Double Nanovision"])))).attack().repeat()),
      limit: {
        tries: 150
      },
      tracking: "GooFarming"
    }, {
      name: "Hatter Buff",
      completed: () => property_get("_madTeaParty"),
      acquire: template_string_$items(_templateObject189 || (_templateObject189 = greyyou_taggedTemplateLiteral(["oil cap, \"DRINK ME\" potion"]))).map(it => ({
        item: it,
        price: 1000
      })),
      do: () => (0,external_kolmafia_namespaceObject.cliExecute)("hatter ".concat(template_string_$item(_templateObject190 || (_templateObject190 = greyyou_taggedTemplateLiteral(["oil cap"])))))
    }, {
      name: "Free King",
      completed: () => (0,external_kolmafia_namespaceObject.myClass)() !== $class(_templateObject191 || (_templateObject191 = greyyou_taggedTemplateLiteral(["Grey Goo"]))),
      acquire: () => [{
        item: template_string_$item(_templateObject192 || (_templateObject192 = greyyou_taggedTemplateLiteral(["teacher's pen"]))),
        num: 3,
        price: 500
      }].concat(greyyou_toConsumableArray(targetClass(false).primestat === $stat(_templateObject193 || (_templateObject193 = greyyou_taggedTemplateLiteral(["Muscle"]))) ? template_string_$items(_templateObject194 || (_templateObject194 = greyyou_taggedTemplateLiteral(["discarded swimming trunks, battered hubcap, trench coat"]))).map(it => ({
        item: it
      })) : []), greyyou_toConsumableArray(targetClass(false).primestat === $stat(_templateObject195 || (_templateObject195 = greyyou_taggedTemplateLiteral(["Mysticality"]))) ? [] //$items``.map((it) => ({ item: it }))
      : []), greyyou_toConsumableArray(targetClass(false).primestat === $stat(_templateObject196 || (_templateObject196 = greyyou_taggedTemplateLiteral(["Moxie"]))) ? template_string_$items(_templateObject197 || (_templateObject197 = greyyou_taggedTemplateLiteral(["noir fedora"]))).map(it => ({
        item: it
      })) : [])),
      outfit: () => ({
        familiar: template_string_$familiar(_templateObject198 || (_templateObject198 = greyyou_taggedTemplateLiteral(["Grey Goose"]))),
        hat: template_string_$item(_templateObject199 || (_templateObject199 = greyyou_taggedTemplateLiteral(["giant yellow hat"]))),
        weapon: template_string_$item(_templateObject200 || (_templateObject200 = greyyou_taggedTemplateLiteral(["yule hatchet"]))),
        acc1: template_string_$item(_templateObject201 || (_templateObject201 = greyyou_taggedTemplateLiteral(["teacher's pen"]))),
        acc2: template_string_$item(_templateObject202 || (_templateObject202 = greyyou_taggedTemplateLiteral(["teacher's pen"]))),
        acc3: template_string_$item(_templateObject203 || (_templateObject203 = greyyou_taggedTemplateLiteral(["teacher's pen"]))),
        famequip: template_string_$item(_templateObject204 || (_templateObject204 = greyyou_taggedTemplateLiteral(["grey down vest"])))
      }),
      prepare: () => {
        (0,external_kolmafia_namespaceObject.cliExecute)("mcd 0");
        (0,external_kolmafia_namespaceObject.maximize)("".concat(targetClass(false).primestat, " experience, 5 ").concat(targetClass(false).primestat, " experience percent, 10 familiar experience, ").concat(noML()), false);
      },
      do: () => {
        (0,external_kolmafia_namespaceObject.cliExecute)("loopgyou class=".concat((0,external_kolmafia_namespaceObject.toInt)(targetClass(false))));
        _set("_freshOutOfGreyYou", true);
        _set("goorboNextClass", "");
        (0,external_kolmafia_namespaceObject.cliExecute)("pull all; refresh all"); //if we somehow didn't already pull everything.

        (0,external_kolmafia_namespaceObject.print)("Grey Goose exp at prism break: ".concat(template_string_$familiar(_templateObject205 || (_templateObject205 = greyyou_taggedTemplateLiteral(["Grey Goose"]))).experience, "/400"));
      },
      clear: "all"
    }, {
      name: "Call Buffy",
      completed: () => 0 !== (0,external_kolmafia_namespaceObject.haveEffect)($effect(_templateObject206 || (_templateObject206 = greyyou_taggedTemplateLiteral(["Ghostly Shell"])))) || (0,external_kolmafia_namespaceObject.myLevel)() >= args.targetlevel,
      prepare: () => $effects(_templateObject207 || (_templateObject207 = greyyou_taggedTemplateLiteral(["Carlweather's Cantata of Confrontation, The Sonata of Sneakiness, Polka of Plenty, Fat Leon's Phat Loot Lyric"]))).forEach(ef => (0,external_kolmafia_namespaceObject.cliExecute)("uneffect ".concat(ef))),
      do: () => {
        (0,external_kolmafia_namespaceObject.cliExecute)("kmail to buffy || ".concat(levelingTurns, " Ghostly Shell, Reptilian Fortitude, Empathy of the Newt, Tenacity of the Snapper, Astral Shell, Elemental Saucesphere, Stevedave's Shanty of Superiority, Power Ballad of the Arrowsmith, Aloysius's Antiphon of Aptitude"));
        (0,external_kolmafia_namespaceObject.wait)(15);
        (0,external_kolmafia_namespaceObject.cliExecute)("refresh effects");
      }
    }, {
      name: "April Shower",
      completed: () => !lib_have(template_string_$item(_templateObject208 || (_templateObject208 = greyyou_taggedTemplateLiteral(["Clan VIP Lounge key"])))) || property_get("_aprilShower"),
      do: () => (0,external_kolmafia_namespaceObject.cliExecute)("shower ".concat((0,external_kolmafia_namespaceObject.myPrimestat)()))
    }, {
      name: "Game Grid Token",
      completed: () => !lib_have(template_string_$item(_templateObject209 || (_templateObject209 = greyyou_taggedTemplateLiteral(["defective Game Grid token"])))) || property_get("_defectiveTokenUsed"),
      do: () => (0,external_kolmafia_namespaceObject.use)(template_string_$item(_templateObject210 || (_templateObject210 = greyyou_taggedTemplateLiteral(["defective Game Grid token"]))))
    }, {
      name: "Campaway",
      completed: () => !property_get("getawayCampsiteUnlocked") || property_get("_campAwayCloudBuffs") >= 1 && property_get("_campAwaySmileBuffs") >= 3,
      do: () => (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=campaway&action=campaway_sky"),
      limit: {
        tries: 4
      }
    }, {
      name: "NEP Reject Quest",
      ready: () => property_get("neverendingPartyAlways") && property_get("_questPartyFair") === "unstarted",
      completed: () => property_get("_questPartyFair") === "",
      choices: {
        1322: 2
      },
      do: $location(_templateObject211 || (_templateObject211 = greyyou_taggedTemplateLiteral(["The Neverending Party"])))
    }, {
      name: "NEP Exp Buff",
      ready: () => property_get("neverendingPartyAlways") && property_get("_questPartyFair") !== "unstarted" && lib_have(template_string_$item(_templateObject212 || (_templateObject212 = greyyou_taggedTemplateLiteral(["Clara's bell"])))),
      completed: () => property_get("_claraBellUsed"),
      choices: {
        1324: () => (0,external_kolmafia_namespaceObject.myPrimestat)() === $stat(_templateObject213 || (_templateObject213 = greyyou_taggedTemplateLiteral(["Muscle"]))) ? 2 : (0,external_kolmafia_namespaceObject.myPrimestat)() === $stat(_templateObject214 || (_templateObject214 = greyyou_taggedTemplateLiteral(["Mysticality"]))) ? 1 : 4,
        1325: 2,
        // Myst Exp %
        1326: 2,
        // Mus Exp %
        1328: 2 // Mox Exp %

      },
      prepare: () => (0,external_kolmafia_namespaceObject.use)(template_string_$item(_templateObject215 || (_templateObject215 = greyyou_taggedTemplateLiteral(["Clara's bell"])))),
      do: $location(_templateObject216 || (_templateObject216 = greyyou_taggedTemplateLiteral(["The Neverending Party"])))
    }, {
      name: "Snapper Spleen Exp %",
      completed: () => (0,external_kolmafia_namespaceObject.myLevel)() >= args.targetlevel || $effects(_templateObject217 || (_templateObject217 = greyyou_taggedTemplateLiteral(["HGH-charged, Different Way of Seeing Things, Thou Shant Not Sing"]))).reduce((a, ef) => a || lib_have(ef), false) || (0,external_kolmafia_namespaceObject.mySpleenUse)() >= (0,external_kolmafia_namespaceObject.spleenLimit)() + 3 - property_get("currentMojoFilters"),
      do: () => {
        switch ((0,external_kolmafia_namespaceObject.myPrimestat)()) {
          case $stat(_templateObject218 || (_templateObject218 = greyyou_taggedTemplateLiteral(["Muscle"]))):
            chewOrWish(template_string_$item(_templateObject219 || (_templateObject219 = greyyou_taggedTemplateLiteral(["vial of humanoid growth hormone"]))), $effect(_templateObject220 || (_templateObject220 = greyyou_taggedTemplateLiteral(["HGH-charged"]))));
            break;

          case $stat(_templateObject221 || (_templateObject221 = greyyou_taggedTemplateLiteral(["Mysticality"]))):
            chewOrWish(template_string_$item(_templateObject222 || (_templateObject222 = greyyou_taggedTemplateLiteral(["non-Euclidean angle"]))), $effect(_templateObject223 || (_templateObject223 = greyyou_taggedTemplateLiteral(["Different Way of Seeing Things"]))));
            break;

          case $stat(_templateObject224 || (_templateObject224 = greyyou_taggedTemplateLiteral(["Moxie"]))):
            chewOrWish(template_string_$item(_templateObject225 || (_templateObject225 = greyyou_taggedTemplateLiteral(["Shantix\u2122"]))), $effect(_templateObject226 || (_templateObject226 = greyyou_taggedTemplateLiteral(["Thou Shant Not Sing"]))));
        }
      },
      limit: {
        tries: Math.ceil(levelingTurns / 20)
      },
      tracking: "Leveling"
    }, {
      name: "Inscrutable Gaze",
      completed: () => (0,external_kolmafia_namespaceObject.myLevel)() >= args.targetlevel || (0,external_kolmafia_namespaceObject.myClass)().primestat !== $stat(_templateObject227 || (_templateObject227 = greyyou_taggedTemplateLiteral(["Mysticality"]))) || lib_have($effect(_templateObject228 || (_templateObject228 = greyyou_taggedTemplateLiteral(["Inscrutable Gaze"])))) || !lib_have($skill(_templateObject229 || (_templateObject229 = greyyou_taggedTemplateLiteral(["Inscrutable Gaze"])))),
      do: () => (0,external_kolmafia_namespaceObject.useSkill)($skill(_templateObject230 || (_templateObject230 = greyyou_taggedTemplateLiteral(["Inscrutable Gaze"])))),
      limit: {
        tries: Math.ceil(levelingTurns / 10)
      },
      tracking: "Leveling"
    }, {
      name: "Abstraction",
      completed: () => (0,external_kolmafia_namespaceObject.myLevel)() >= args.targetlevel || $effects(_templateObject231 || (_templateObject231 = greyyou_taggedTemplateLiteral(["Purpose, Category, Perception"]))).reduce((a, ef) => a || lib_have(ef), false) || (0,external_kolmafia_namespaceObject.mySpleenUse)() >= (0,external_kolmafia_namespaceObject.spleenLimit)() + 3 - property_get("currentMojoFilters"),
      do: () => {
        if ((0,external_kolmafia_namespaceObject.mySpleenUse)() === (0,external_kolmafia_namespaceObject.spleenLimit)()) (0,external_kolmafia_namespaceObject.use)(1, template_string_$item(_templateObject232 || (_templateObject232 = greyyou_taggedTemplateLiteral(["mojo filter"]))));
        (0,external_kolmafia_namespaceObject.chew)(1, (0,external_kolmafia_namespaceObject.myClass)().primestat === $stat(_templateObject233 || (_templateObject233 = greyyou_taggedTemplateLiteral(["Muscle"]))) ? template_string_$item(_templateObject234 || (_templateObject234 = greyyou_taggedTemplateLiteral(["abstraction: purpose"]))) : (0,external_kolmafia_namespaceObject.myClass)().primestat === $stat(_templateObject235 || (_templateObject235 = greyyou_taggedTemplateLiteral(["Mysticality"]))) ? template_string_$item(_templateObject236 || (_templateObject236 = greyyou_taggedTemplateLiteral(["abstraction: category"]))) : template_string_$item(_templateObject237 || (_templateObject237 = greyyou_taggedTemplateLiteral(["abstraction: perception"]))));
      },
      limit: {
        tries: Math.ceil(levelingTurns / 50)
      },
      tracking: "Leveling"
    }, {
      name: "Strange Leaflet",
      completed: () => property_get("leafletCompleted"),
      do: () => (0,external_kolmafia_namespaceObject.cliExecute)("leaflet")
    }, {
      name: "Frobozz",
      completed: () => (0,external_kolmafia_namespaceObject.getDwelling)() === template_string_$item(_templateObject238 || (_templateObject238 = greyyou_taggedTemplateLiteral(["Frobozz Real-Estate Company Instant House (TM)"]))),
      do: () => (0,external_kolmafia_namespaceObject.use)(template_string_$item(_templateObject239 || (_templateObject239 = greyyou_taggedTemplateLiteral(["Frobozz Real-Estate Company Instant House (TM)"]))))
    }, {
      name: "Bonerdagon Chest",
      completed: () => !lib_have(template_string_$item(_templateObject240 || (_templateObject240 = greyyou_taggedTemplateLiteral(["chest of the Bonerdagon"])))),
      do: () => (0,external_kolmafia_namespaceObject.use)(template_string_$item(_templateObject241 || (_templateObject241 = greyyou_taggedTemplateLiteral(["chest of the Bonerdagon"]))))
    }, {
      name: "Bastille Battalion",
      ready: () => lib_have(template_string_$item(_templateObject242 || (_templateObject242 = greyyou_taggedTemplateLiteral(["Bastille Battalion control rig"])))),
      completed: () => property_get("_bastilleGames") !== 0,
      do: () => (0,external_kolmafia_namespaceObject.cliExecute)("bastille mainstat draftsman gesture")
    }, {
      name: "Steel Margarita",
      ready: () => haveAll(template_string_$items(_templateObject243 || (_templateObject243 = greyyou_taggedTemplateLiteral(["Azazel's tutu, Azazel's lollipop, Azazel's unicorn"])))),
      completed: () => args.ascend || lib_have($skill(_templateObject244 || (_templateObject244 = greyyou_taggedTemplateLiteral(["Liver of Steel"])))) || lib_have(template_string_$item(_templateObject245 || (_templateObject245 = greyyou_taggedTemplateLiteral(["steel margarita"])))),
      do: () => (0,external_kolmafia_namespaceObject.cliExecute)("panda temple")
    }, {
      name: "Liver of Steel",
      ready: () => (0,external_kolmafia_namespaceObject.myClass)() !== $class(_templateObject246 || (_templateObject246 = greyyou_taggedTemplateLiteral(["Grey Goo"]))) && lib_have(template_string_$item(_templateObject247 || (_templateObject247 = greyyou_taggedTemplateLiteral(["steel margarita"])))) && (0,external_kolmafia_namespaceObject.myLevel)() >= 5,
      completed: () => args.ascend || lib_have($skill(_templateObject248 || (_templateObject248 = greyyou_taggedTemplateLiteral(["Liver of Steel"])))),
      do: () => (0,external_kolmafia_namespaceObject.drink)(1, template_string_$item(_templateObject249 || (_templateObject249 = greyyou_taggedTemplateLiteral(["steel margarita"]))))
    }, {
      name: "Taffy Effects",
      completed: () => (0,external_kolmafia_namespaceObject.myLevel)() >= args.targetlevel || $effects(_templateObject250 || (_templateObject250 = greyyou_taggedTemplateLiteral(["Orange Crusher, Purple Reign, Cinnamon Challenger"]))).reduce((a, ef) => a || (0,external_kolmafia_namespaceObject.haveEffect)(ef) >= 50, false),
      do: () => {
        if ((0,external_kolmafia_namespaceObject.myPrimestat)() === $stat(_templateObject251 || (_templateObject251 = greyyou_taggedTemplateLiteral(["Muscle"])))) (0,external_kolmafia_namespaceObject.use)(Math.ceil((50 - (0,external_kolmafia_namespaceObject.haveEffect)($effect(_templateObject252 || (_templateObject252 = greyyou_taggedTemplateLiteral(["Orange Crusher"]))))) / 10), template_string_$item(_templateObject253 || (_templateObject253 = greyyou_taggedTemplateLiteral(["pulled orange taffy"])))); //lasts for 10 turns each

        if ((0,external_kolmafia_namespaceObject.myPrimestat)() === $stat(_templateObject254 || (_templateObject254 = greyyou_taggedTemplateLiteral(["Mysticality"])))) (0,external_kolmafia_namespaceObject.use)(Math.ceil((50 - (0,external_kolmafia_namespaceObject.haveEffect)($effect(_templateObject255 || (_templateObject255 = greyyou_taggedTemplateLiteral(["Purple Reign"]))))) / 10), template_string_$item(_templateObject256 || (_templateObject256 = greyyou_taggedTemplateLiteral(["pulled violet taffy"])))); //lasts for 10 turns each

        if ((0,external_kolmafia_namespaceObject.myPrimestat)() === $stat(_templateObject257 || (_templateObject257 = greyyou_taggedTemplateLiteral(["Moxie"])))) (0,external_kolmafia_namespaceObject.use)(Math.ceil((50 - (0,external_kolmafia_namespaceObject.haveEffect)($effect(_templateObject258 || (_templateObject258 = greyyou_taggedTemplateLiteral(["Cinnamon Challenger"]))))) / 10), template_string_$item(_templateObject259 || (_templateObject259 = greyyou_taggedTemplateLiteral(["pulled red taffy"])))); //lasts for 10 turns each
      },
      limit: {
        tries: Math.ceil(levelingTurns / 10)
      },
      tracking: "Leveling"
    }, {
      name: "Curiosity",
      completed: () => (0,external_kolmafia_namespaceObject.myLevel)() >= args.targetlevel || lib_have($effect(_templateObject260 || (_templateObject260 = greyyou_taggedTemplateLiteral(["Curiosity of Br'er Tarrypin"])))) || !lib_have($skill(_templateObject261 || (_templateObject261 = greyyou_taggedTemplateLiteral(["Curiosity of Br'er Tarrypin"])))),
      do: () => (0,external_kolmafia_namespaceObject.useSkill)($skill(_templateObject262 || (_templateObject262 = greyyou_taggedTemplateLiteral(["Curiosity of Br'er Tarrypin"])))),
      limit: {
        tries: Math.ceil(levelingTurns / 10)
      },
      tracking: "Leveling"
    }, {
      name: "Ghost Dog Chow",
      completed: () => (0,external_kolmafia_namespaceObject.myLevel)() >= 8 || template_string_$familiar(_templateObject263 || (_templateObject263 = greyyou_taggedTemplateLiteral(["Grey Goose"]))).experience > 380,
      prepare: () => (0,external_kolmafia_namespaceObject.useFamiliar)(template_string_$familiar(_templateObject264 || (_templateObject264 = greyyou_taggedTemplateLiteral(["Grey Goose"])))),
      do: () => (0,external_kolmafia_namespaceObject.use)(Math.floor((400 - template_string_$familiar(_templateObject265 || (_templateObject265 = greyyou_taggedTemplateLiteral(["Grey Goose"]))).experience) / 20), template_string_$item(_templateObject266 || (_templateObject266 = greyyou_taggedTemplateLiteral(["Ghost Dog Chow"])))),
      tracking: "Leveling"
    }, {
      name: "Restore HP",
      completed: () => (0,external_kolmafia_namespaceObject.myHp)() > 0.5 * (0,external_kolmafia_namespaceObject.myMaxhp)(),
      do: () => (0,external_kolmafia_namespaceObject.restoreHp)(0.95 * (0,external_kolmafia_namespaceObject.myMaxhp)()),
      tracking: "Leveling"
    }, {
      name: "Cast Blood Bubble",
      completed: () => !lib_have($skill(_templateObject267 || (_templateObject267 = greyyou_taggedTemplateLiteral(["Blood Bubble"])))) || lib_have($effect(_templateObject268 || (_templateObject268 = greyyou_taggedTemplateLiteral(["Blood Bubble"])))) || (0,external_kolmafia_namespaceObject.myLevel)() >= args.targetlevel,
      do: () => (0,external_kolmafia_namespaceObject.useSkill)($skill(_templateObject269 || (_templateObject269 = greyyou_taggedTemplateLiteral(["Blood Bubble"])))),
      tracking: "Leveling"
    }, {
      name: "Implement Glitch",
      ready: () => lib_have(template_string_$item(_templateObject270 || (_templateObject270 = greyyou_taggedTemplateLiteral(["[glitch season reward name]"])))),
      completed: () => property_get("_glitchItemImplemented"),
      do: () => (0,external_kolmafia_namespaceObject.use)(template_string_$item(_templateObject271 || (_templateObject271 = greyyou_taggedTemplateLiteral(["[glitch season reward name]"]))))
    }, {
      name: "Fight Glitch",
      ready: () => lib_have(template_string_$item(_templateObject272 || (_templateObject272 = greyyou_taggedTemplateLiteral(["[glitch season reward name]"])))),
      completed: () => property_get("_glitchMonsterFights") > 0,
      acquire: [].concat(greyyou_toConsumableArray(template_string_$items(_templateObject273 || (_templateObject273 = greyyou_taggedTemplateLiteral(["gas can, gas balloon, shard of double-ice"]))).map(it => ({
        item: it,
        price: 1000
      }))), greyyou_toConsumableArray(lib_have(template_string_$item(_templateObject274 || (_templateObject274 = greyyou_taggedTemplateLiteral(["January's Garbage Tote"])))) ? [{
        item: template_string_$item(_templateObject275 || (_templateObject275 = greyyou_taggedTemplateLiteral(["makeshift garbage shirt"])))
      }] : [])),
      prepare: () => (0,external_kolmafia_namespaceObject.restoreHp)(0.9 * (0,external_kolmafia_namespaceObject.myHp)()),
      do: () => (0,external_kolmafia_namespaceObject.visitUrl)("inv_eat.php?pwd&whichitem=10207"),
      post: () => {
        if (!property_get("_lastCombatWon")) throw new Error("Lost Combat - Check to see what went wrong.");
      },
      outfit: () => greyyou_objectSpread(greyyou_objectSpread({
        familiar: bestFam()
      }, lib_have(template_string_$item(_templateObject276 || (_templateObject276 = greyyou_taggedTemplateLiteral(["January's Garbage Tote"])))) && lib_have($skill(_templateObject277 || (_templateObject277 = greyyou_taggedTemplateLiteral(["Torso Awareness"])))) ? {
        shirt: template_string_$item(_templateObject278 || (_templateObject278 = greyyou_taggedTemplateLiteral(["makeshift garbage shirt"])))
      } : {}), {}, {
        modifier: "".concat((0,external_kolmafia_namespaceObject.myPrimestat)(), " experience, 5 ").concat((0,external_kolmafia_namespaceObject.myPrimestat)(), " experience percent, 10 familiar experience, ").concat(noML())
      }),
      combat: new CombatStrategy().macro(() => {
        var _Macro$tryItem$trySki;

        return (_Macro$tryItem$trySki = Macro.tryItem(template_string_$item(_templateObject279 || (_templateObject279 = greyyou_taggedTemplateLiteral(["gas balloon"])))).trySkill($skill(_templateObject280 || (_templateObject280 = greyyou_taggedTemplateLiteral(["Feel Pride"]))))).tryItem.apply(_Macro$tryItem$trySki, greyyou_toConsumableArray(template_string_$items(_templateObject281 || (_templateObject281 = greyyou_taggedTemplateLiteral(["shard of double-ice, gas can"]))))).attack().repeat();
      }),
      tracking: "Leveling"
    }, {
      name: "Drunk Pygmies",
      ready: () => !!$effects(_templateObject282 || (_templateObject282 = greyyou_taggedTemplateLiteral(["HGH-charged, Different Way of Seeing Things, Thou Shant Not Sing"]))).find(ef => lib_have(ef)),
      completed: () => (0,external_kolmafia_namespaceObject.myLevel)() >= args.targetlevel || property_get("_drunkPygmyBanishes") >= 11 && !property_get("crystalBallPredictions").includes($monster(_templateObject283 || (_templateObject283 = greyyou_taggedTemplateLiteral(["drunk pygmy"]))).name),
      acquire: [{
        item: template_string_$item(_templateObject284 || (_templateObject284 = greyyou_taggedTemplateLiteral(["Bowl of Scorpions"]))),
        price: 1000
      }].concat(greyyou_toConsumableArray($monsters(_templateObject285 || (_templateObject285 = greyyou_taggedTemplateLiteral(["pygmy orderlies, pygmy bowler"]))).find(mob => !(0,external_kolmafia_namespaceObject.isBanished)(mob)) ? [{
        item: nextUnusedBanishItem(),
        price: 20000
      }] : [])),
      effects: $effects(_templateObject286 || (_templateObject286 = greyyou_taggedTemplateLiteral(["Heart of White"]))),
      outfit: () => greyyou_objectSpread(greyyou_objectSpread(greyyou_objectSpread(greyyou_objectSpread({
        familiar: template_string_$familiar(_templateObject287 || (_templateObject287 = greyyou_taggedTemplateLiteral(["Grey Goose"])))
      }, lib_have(template_string_$item(_templateObject288 || (_templateObject288 = greyyou_taggedTemplateLiteral(["cursed magnifying glass"])))) && template_string_$familiar(_templateObject289 || (_templateObject289 = greyyou_taggedTemplateLiteral(["Grey Goose"]))).experience < 400 ? {
        offhand: template_string_$item(_templateObject290 || (_templateObject290 = greyyou_taggedTemplateLiteral(["cursed magnifying glass"])))
      } : {}), lib_have(template_string_$item(_templateObject291 || (_templateObject291 = greyyou_taggedTemplateLiteral(["miniature crystal ball"])))) && property_get("_drunkPygmyBanishes") >= 10 ? {
        famequip: template_string_$item(_templateObject292 || (_templateObject292 = greyyou_taggedTemplateLiteral(["miniature crystal ball"])))
      } : {}), lib_have(template_string_$item(_templateObject293 || (_templateObject293 = greyyou_taggedTemplateLiteral(["mafia middle finger ring"])))) && (0,external_kolmafia_namespaceObject.myBasestat)($stat(_templateObject294 || (_templateObject294 = greyyou_taggedTemplateLiteral(["Muscle"])))) >= 45 && !property_get("_mafiaMiddleFingerRingUsed") ? {
        equip: [template_string_$item(_templateObject295 || (_templateObject295 = greyyou_taggedTemplateLiteral(["mafia middle finger ring"])))]
      } : {}), {}, {
        modifier: "".concat((0,external_kolmafia_namespaceObject.myPrimestat)(), " experience, 5 ").concat((0,external_kolmafia_namespaceObject.myPrimestat)(), " experience percent, 10 familiar experience")
      }),
      prepare: () => {
        (0,external_kolmafia_namespaceObject.restoreMp)(50);
        if ((0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(_templateObject296 || (_templateObject296 = greyyou_taggedTemplateLiteral(["bowling ball"])))) > 0) (0,external_kolmafia_namespaceObject.putCloset)((0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(_templateObject297 || (_templateObject297 = greyyou_taggedTemplateLiteral(["bowling ball"])))), template_string_$item(_templateObject298 || (_templateObject298 = greyyou_taggedTemplateLiteral(["bowling ball"]))));
      },
      do: $location(_templateObject299 || (_templateObject299 = greyyou_taggedTemplateLiteral(["The Hidden Bowling Alley"]))),
      combat: new CombatStrategy().macro(() => Macro.externalIf(template_string_$familiar(_templateObject300 || (_templateObject300 = greyyou_taggedTemplateLiteral(["Grey Goose"]))).experience >= 400, Macro.trySkill((0,external_kolmafia_namespaceObject.myPrimestat)() === $stat(_templateObject301 || (_templateObject301 = greyyou_taggedTemplateLiteral(["Muscle"]))) ? $skill(_templateObject302 || (_templateObject302 = greyyou_taggedTemplateLiteral(["Convert Matter to Protein"]))) : (0,external_kolmafia_namespaceObject.myPrimestat)() === $stat(_templateObject303 || (_templateObject303 = greyyou_taggedTemplateLiteral(["Mysticality"]))) ? $skill(_templateObject304 || (_templateObject304 = greyyou_taggedTemplateLiteral(["Convert Matter to Energy"]))) : $skill(_templateObject305 || (_templateObject305 = greyyou_taggedTemplateLiteral(["Convert Matter to Pomade"]))))), $monsters(_templateObject306 || (_templateObject306 = greyyou_taggedTemplateLiteral(["void slab, void guy, void spider, drunk pygmy"])))).macro(() => Macro.trySkill($skill(_templateObject307 || (_templateObject307 = greyyou_taggedTemplateLiteral(["Show them your ring"])))).externalIf(lib_have($skill(_templateObject308 || (_templateObject308 = greyyou_taggedTemplateLiteral(["Snokebomb"])))) && !getBanishedMonsters().get($skill(_templateObject309 || (_templateObject309 = greyyou_taggedTemplateLiteral(["Snokebomb"])))), Macro.trySkill($skill(_templateObject310 || (_templateObject310 = greyyou_taggedTemplateLiteral(["Snokebomb"]))))).externalIf(lib_have($skill(_templateObject311 || (_templateObject311 = greyyou_taggedTemplateLiteral(["Feel Hatred"])))) && !getBanishedMonsters().get($skill(_templateObject312 || (_templateObject312 = greyyou_taggedTemplateLiteral(["Feel Hatred"])))), Macro.trySkill($skill(_templateObject313 || (_templateObject313 = greyyou_taggedTemplateLiteral(["Feel Hatred"]))))).tryItem(nextUnusedBanishItem()), $monsters(_templateObject314 || (_templateObject314 = greyyou_taggedTemplateLiteral(["pygmy bowler, pygmy orderlies, pygmy janitor"])))).macro(Macro.tryItem(template_string_$item(_templateObject315 || (_templateObject315 = greyyou_taggedTemplateLiteral(["porquoise-handled sixgun"])))).tryItem(template_string_$item(_templateObject316 || (_templateObject316 = greyyou_taggedTemplateLiteral(["spectre scepter"])))).attack().repeat()),
      limit: {
        tries: 15
      },
      tracking: "Leveling"
    }, {
      name: "Ball Pit",
      completed: () => !lib_have(template_string_$item(_templateObject317 || (_templateObject317 = greyyou_taggedTemplateLiteral(["Clan VIP Lounge key"])))) || property_get("_ballpit"),
      do: () => (0,external_kolmafia_namespaceObject.cliExecute)("ballpit"),
      tracking: "Leveling"
    }, {
      name: "Get Lyle Favored",
      completed: () => property_get("_lyleFavored"),
      do: () => (0,external_kolmafia_namespaceObject.cliExecute)("monorail"),
      tracking: "Leveling"
    }, {
      name: "Telescope Buff",
      completed: () => !(template_string_$item(_templateObject318 || (_templateObject318 = greyyou_taggedTemplateLiteral(["Discount Telescope Warehouse gift certificate"]))).name in (0,external_kolmafia_namespaceObject.getCampground)()) || property_get("telescopeLookedHigh"),
      do: () => (0,external_kolmafia_namespaceObject.cliExecute)("telescope high"),
      tracking: "Leveling"
    }, {
      name: "Fight Seals",
      ready: () => lib_have(template_string_$item(_templateObject319 || (_templateObject319 = greyyou_taggedTemplateLiteral(["figurine of a wretched-looking seal"])))) && lib_have(template_string_$item(_templateObject320 || (_templateObject320 = greyyou_taggedTemplateLiteral(["seal-blubber candle"])))),
      completed: () => (0,external_kolmafia_namespaceObject.myClass)() !== $class(_templateObject321 || (_templateObject321 = greyyou_taggedTemplateLiteral(["Seal Clubber"]))) || property_get("_sealsSummoned") >= 10 || !lib_have(template_string_$item(_templateObject322 || (_templateObject322 = greyyou_taggedTemplateLiteral(["Claw of the Infernal Seal"])))) && property_get("_sealsSummoned") >= 5,
      outfit: () => ({
        familiar: template_string_$familiar(_templateObject323 || (_templateObject323 = greyyou_taggedTemplateLiteral(["Grey Goose"]))),
        modifier: "club, 0.125 ".concat((0,external_kolmafia_namespaceObject.myPrimestat)(), ", ").concat((0,external_kolmafia_namespaceObject.myPrimestat)(), " experience, 5 ").concat((0,external_kolmafia_namespaceObject.myPrimestat)(), " experience percent, 10 familiar experience")
      }),
      do: () => (0,external_kolmafia_namespaceObject.visitUrl)("inv_use.php?pwd&checked=1&whichitem=3902"),
      combat: new CombatStrategy().macro(() => Macro.externalIf(template_string_$familiar(_templateObject324 || (_templateObject324 = greyyou_taggedTemplateLiteral(["Grey Goose"]))).experience >= 400, Macro.trySkill((0,external_kolmafia_namespaceObject.myPrimestat)() === $stat(_templateObject325 || (_templateObject325 = greyyou_taggedTemplateLiteral(["Muscle"]))) ? $skill(_templateObject326 || (_templateObject326 = greyyou_taggedTemplateLiteral(["Convert Matter to Protein"]))) : (0,external_kolmafia_namespaceObject.myPrimestat)() === $stat(_templateObject327 || (_templateObject327 = greyyou_taggedTemplateLiteral(["Mysticality"]))) ? $skill(_templateObject328 || (_templateObject328 = greyyou_taggedTemplateLiteral(["Convert Matter to Energy"]))) : $skill(_templateObject329 || (_templateObject329 = greyyou_taggedTemplateLiteral(["Convert Matter to Pomade"]))))).trySkill($skill(_templateObject330 || (_templateObject330 = greyyou_taggedTemplateLiteral(["Sing Along"])))).tryItem(template_string_$item(_templateObject331 || (_templateObject331 = greyyou_taggedTemplateLiteral(["porquoise-handled sixgun"])))).attack().repeat()),
      limit: {
        tries: 10
      },
      tracking: "Leveling"
    }, {
      name: "Oliver's Place",
      ready: () => property_get("ownsSpeakeasy", false),
      completed: () => property_get("_speakeasyFreeFights", 0) >= 3,
      outfit: () => ({
        familiar: template_string_$familiar(_templateObject332 || (_templateObject332 = greyyou_taggedTemplateLiteral(["Grey Goose"]))),
        modifier: "".concat((0,external_kolmafia_namespaceObject.myPrimestat)(), " experience, 5 ").concat((0,external_kolmafia_namespaceObject.myPrimestat)(), " experience percent, 10 familiar experience")
      }),
      prepare: () => {
        (0,external_kolmafia_namespaceObject.restoreHp)(0.9 * (0,external_kolmafia_namespaceObject.myHp)());
        (0,external_kolmafia_namespaceObject.restoreMp)(12);
      },
      // eslint-disable-next-line libram/verify-constants
      do: $location(_templateObject333 || (_templateObject333 = greyyou_taggedTemplateLiteral(["An Unusually Quiet Barroom Brawl"]))),
      post: () => {
        if (!property_get("_lastCombatWon")) throw new Error("Lost Combat - Check to see what went wrong.");
      },
      combat: new CombatStrategy().macro(() => Macro.externalIf(template_string_$familiar(_templateObject334 || (_templateObject334 = greyyou_taggedTemplateLiteral(["Grey Goose"]))).experience >= 400, Macro.trySkill((0,external_kolmafia_namespaceObject.myPrimestat)() === $stat(_templateObject335 || (_templateObject335 = greyyou_taggedTemplateLiteral(["Muscle"]))) ? $skill(_templateObject336 || (_templateObject336 = greyyou_taggedTemplateLiteral(["Convert Matter to Protein"]))) : (0,external_kolmafia_namespaceObject.myPrimestat)() === $stat(_templateObject337 || (_templateObject337 = greyyou_taggedTemplateLiteral(["Mysticality"]))) ? $skill(_templateObject338 || (_templateObject338 = greyyou_taggedTemplateLiteral(["Convert Matter to Energy"]))) : $skill(_templateObject339 || (_templateObject339 = greyyou_taggedTemplateLiteral(["Convert Matter to Pomade"]))))).trySkill($skill(_templateObject340 || (_templateObject340 = greyyou_taggedTemplateLiteral(["Sing Along"])))).tryItem(template_string_$item(_templateObject341 || (_templateObject341 = greyyou_taggedTemplateLiteral(["porquoise-handled sixgun"])))).trySkill($skill(_templateObject342 || (_templateObject342 = greyyou_taggedTemplateLiteral(["Saucestorm"])))).trySkill($skill(_templateObject343 || (_templateObject343 = greyyou_taggedTemplateLiteral(["Saucestorm"])))).attack().repeat()),
      tracking: "Leveling",
      limit: {
        tries: 3
      }
    }, {
      name: "Buff Mainstat",
      completed: () => (0,external_kolmafia_namespaceObject.myLevel)() >= args.targetlevel || (0,external_kolmafia_namespaceObject.myBuffedstat)((0,external_kolmafia_namespaceObject.myPrimestat)()) >= 11 * (0,external_kolmafia_namespaceObject.myBasestat)((0,external_kolmafia_namespaceObject.myPrimestat)()),
      effects: $effects(_templateObject344 || (_templateObject344 = greyyou_taggedTemplateLiteral(["Trivia Master"]))),
      do: () => (0,external_kolmafia_namespaceObject.cliExecute)("gain ".concat(11 * (0,external_kolmafia_namespaceObject.myBasestat)((0,external_kolmafia_namespaceObject.myPrimestat)()), " ").concat((0,external_kolmafia_namespaceObject.myPrimestat)())),
      limit: {
        tries: levelingTurns
      },
      tracking: "Leveling"
    }, {
      name: "Fight Tentacle",
      completed: () => property_get("_eldritchTentacleFought"),
      acquire: () => greyyou_toConsumableArray(lib_have($skill(_templateObject345 || (_templateObject345 = greyyou_taggedTemplateLiteral(["Curse of Weaksauce"])))) ? [] : [{
        item: template_string_$item(_templateObject346 || (_templateObject346 = greyyou_taggedTemplateLiteral(["electronics kit"]))),
        price: 500
      }]),
      outfit: () => ({
        familiar: template_string_$familiar(_templateObject347 || (_templateObject347 = greyyou_taggedTemplateLiteral(["Grey Goose"]))),
        modifier: "effective, 0.125 ".concat((0,external_kolmafia_namespaceObject.myPrimestat)(), " 400 max, ").concat((0,external_kolmafia_namespaceObject.myPrimestat)(), " experience, 5 ").concat((0,external_kolmafia_namespaceObject.myPrimestat)(), " experience percent, 10 familiar experience, ").concat(noML())
      }),
      prepare: () => {
        (0,external_kolmafia_namespaceObject.restoreHp)(0.9 * (0,external_kolmafia_namespaceObject.myHp)());
        if ((0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(_templateObject348 || (_templateObject348 = greyyou_taggedTemplateLiteral(["eldritch essence"])))) > 0) (0,external_kolmafia_namespaceObject.putCloset)((0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(_templateObject349 || (_templateObject349 = greyyou_taggedTemplateLiteral(["eldritch essence"])))), template_string_$item(_templateObject350 || (_templateObject350 = greyyou_taggedTemplateLiteral(["eldritch essence"]))));
      },
      do: () => {
        (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=forestvillage&action=fv_scientist");
        (0,external_kolmafia_namespaceObject.runChoice)(1);
      },
      combat: new CombatStrategy().macro(() => Macro.externalIf(lib_have($skill(_templateObject351 || (_templateObject351 = greyyou_taggedTemplateLiteral(["Curse of Weaksauce"])))), Macro.trySkill($skill(_templateObject352 || (_templateObject352 = greyyou_taggedTemplateLiteral(["Curse of Weaksauce"])))), Macro.tryItem(template_string_$item(_templateObject353 || (_templateObject353 = greyyou_taggedTemplateLiteral(["electronics kit"]))))).externalIf(template_string_$familiar(_templateObject354 || (_templateObject354 = greyyou_taggedTemplateLiteral(["Grey Goose"]))).experience >= 400, Macro.trySkill((0,external_kolmafia_namespaceObject.myPrimestat)() === $stat(_templateObject355 || (_templateObject355 = greyyou_taggedTemplateLiteral(["Muscle"]))) ? $skill(_templateObject356 || (_templateObject356 = greyyou_taggedTemplateLiteral(["Convert Matter to Protein"]))) : (0,external_kolmafia_namespaceObject.myPrimestat)() === $stat(_templateObject357 || (_templateObject357 = greyyou_taggedTemplateLiteral(["Mysticality"]))) ? $skill(_templateObject358 || (_templateObject358 = greyyou_taggedTemplateLiteral(["Convert Matter to Energy"]))) : $skill(_templateObject359 || (_templateObject359 = greyyou_taggedTemplateLiteral(["Convert Matter to Pomade"]))))).tryItem(template_string_$item(_templateObject360 || (_templateObject360 = greyyou_taggedTemplateLiteral(["porquoise-handled sixgun"])))).trySkill($skill(_templateObject361 || (_templateObject361 = greyyou_taggedTemplateLiteral(["Sing Along"])))).attack().repeat()),
      tracking: "Leveling"
    }, {
      name: "God Lobster",
      ready: () => (0,external_kolmafia_namespaceObject.myLevel)() >= args.targetlevel - 1 && !!$effects(_templateObject362 || (_templateObject362 = greyyou_taggedTemplateLiteral(["HGH-charged, Different Way of Seeing Things, Thou Shant Not Sing"]))).find(ef => lib_have(ef)),
      completed: () => property_get("_godLobsterFights") >= 3,
      effects: $effects(_templateObject363 || (_templateObject363 = greyyou_taggedTemplateLiteral(["Heart of White"]))),
      acquire: () => [].concat(greyyou_toConsumableArray(lib_have($skill(_templateObject364 || (_templateObject364 = greyyou_taggedTemplateLiteral(["Curse of Weaksauce"])))) ? [] : [{
        item: template_string_$item(_templateObject365 || (_templateObject365 = greyyou_taggedTemplateLiteral(["electronics kit"]))),
        price: 500
      }]), greyyou_toConsumableArray(lib_have(template_string_$familiar(_templateObject366 || (_templateObject366 = greyyou_taggedTemplateLiteral(["God Lobster"])))) ? [] : [{
        item: template_string_$item(_templateObject367 || (_templateObject367 = greyyou_taggedTemplateLiteral(["Dish of Clarified Butter"]))),
        price: property_get("valueOfAdventure") / 2
      }]), greyyou_toConsumableArray(lib_have(template_string_$item(_templateObject368 || (_templateObject368 = greyyou_taggedTemplateLiteral(["January's Garbage Tote"])))) ? [{
        item: template_string_$item(_templateObject369 || (_templateObject369 = greyyou_taggedTemplateLiteral(["makeshift garbage shirt"])))
      }] : [])),
      outfit: () => greyyou_objectSpread(greyyou_objectSpread(greyyou_objectSpread({}, lib_have(template_string_$familiar(_templateObject370 || (_templateObject370 = greyyou_taggedTemplateLiteral(["God Lobster"])))) ? {
        familiar: template_string_$familiar(_templateObject371 || (_templateObject371 = greyyou_taggedTemplateLiteral(["God Lobster"])))
      } : {}), lib_have(template_string_$item(_templateObject372 || (_templateObject372 = greyyou_taggedTemplateLiteral(["makeshift garbage shirt"])))) ? {
        shirt: template_string_$item(_templateObject373 || (_templateObject373 = greyyou_taggedTemplateLiteral(["makeshift garbage shirt"])))
      } : {}), {}, {
        modifier: "effective, 0.125 ".concat((0,external_kolmafia_namespaceObject.myPrimestat)(), ", ").concat((0,external_kolmafia_namespaceObject.myPrimestat)(), " experience, 5 ").concat((0,external_kolmafia_namespaceObject.myPrimestat)(), " experience percent, ").concat(noML())
      }),
      choices: {
        1310: 3
      },
      prepare: () => {
        (0,external_kolmafia_namespaceObject.restoreHp)(0.75 * (0,external_kolmafia_namespaceObject.myMaxhp)());
        (0,external_kolmafia_namespaceObject.restoreMp)(8);
      },
      do: () => {
        if (lib_have(template_string_$familiar(_templateObject374 || (_templateObject374 = greyyou_taggedTemplateLiteral(["God Lobster"]))))) (0,external_kolmafia_namespaceObject.visitUrl)("main.php?fightgodlobster=1");else (0,external_kolmafia_namespaceObject.use)(template_string_$item(_templateObject375 || (_templateObject375 = greyyou_taggedTemplateLiteral(["Dish of Clarified Butter"]))));
        (0,external_kolmafia_namespaceObject.runCombat)();
        (0,external_kolmafia_namespaceObject.visitUrl)("choice.php");
        if ((0,external_kolmafia_namespaceObject.handlingChoice)()) (0,external_kolmafia_namespaceObject.runChoice)(-1);
      },
      post: () => {
        if (!property_get("_lastCombatWon")) throw new Error("Lost Combat - Check to see what went wrong.");
      },
      combat: new CombatStrategy().macro(() => Macro.step("pickpocket").externalIf(lib_have($skill(_templateObject376 || (_templateObject376 = greyyou_taggedTemplateLiteral(["Curse of Weaksauce"])))), Macro.trySkill($skill(_templateObject377 || (_templateObject377 = greyyou_taggedTemplateLiteral(["Curse of Weaksauce"])))), Macro.tryItem(template_string_$item(_templateObject378 || (_templateObject378 = greyyou_taggedTemplateLiteral(["electronics kit"]))))).tryItem(template_string_$item(_templateObject379 || (_templateObject379 = greyyou_taggedTemplateLiteral(["porquoise-handled sixgun"])))).trySkill($skill(_templateObject380 || (_templateObject380 = greyyou_taggedTemplateLiteral(["Sing Along"])))).trySkill($skill(_templateObject381 || (_templateObject381 = greyyou_taggedTemplateLiteral(["Feel Pride"])))).attack().repeat()),
      limit: {
        tries: 3
      },
      tracking: "Leveling"
    }, {
      name: "NEP Free Fights",
      ready: () => property_get("neverendingPartyAlways") && !!$effects(_templateObject382 || (_templateObject382 = greyyou_taggedTemplateLiteral(["HGH-charged, Different Way of Seeing Things, Thou Shant Not Sing"]))).find(ef => lib_have(ef)),
      completed: () => property_get("_neverendingPartyFreeTurns") >= 10 || (0,external_kolmafia_namespaceObject.myClass)() !== $class(_templateObject383 || (_templateObject383 = greyyou_taggedTemplateLiteral(["Grey Goo"]))) && (0,external_kolmafia_namespaceObject.myLevel)() >= args.targetlevel,
      effects: $effects(_templateObject384 || (_templateObject384 = greyyou_taggedTemplateLiteral(["Heart of White"]))),
      acquire: () => [].concat(greyyou_toConsumableArray(lib_have($skill(_templateObject385 || (_templateObject385 = greyyou_taggedTemplateLiteral(["Curse of Weaksauce"])))) ? [] : [{
        item: template_string_$item(_templateObject386 || (_templateObject386 = greyyou_taggedTemplateLiteral(["electronics kit"]))),
        price: 500
      }]), greyyou_toConsumableArray(lib_have(template_string_$item(_templateObject387 || (_templateObject387 = greyyou_taggedTemplateLiteral(["January's Garbage Tote"])))) ? [{
        item: template_string_$item(_templateObject388 || (_templateObject388 = greyyou_taggedTemplateLiteral(["makeshift garbage shirt"])))
      }] : [])),
      outfit: () => greyyou_objectSpread(greyyou_objectSpread({
        familiar: template_string_$familiar(_templateObject389 || (_templateObject389 = greyyou_taggedTemplateLiteral(["Grey Goose"])))
      }, lib_have(template_string_$item(_templateObject390 || (_templateObject390 = greyyou_taggedTemplateLiteral(["makeshift garbage shirt"])))) ? {
        shirt: template_string_$item(_templateObject391 || (_templateObject391 = greyyou_taggedTemplateLiteral(["makeshift garbage shirt"])))
      } : {}), {}, {
        modifier: "effective, 0.125 ".concat((0,external_kolmafia_namespaceObject.myPrimestat)(), ", ").concat((0,external_kolmafia_namespaceObject.myPrimestat)(), " experience, 5 ").concat((0,external_kolmafia_namespaceObject.myPrimestat)(), " experience percent, 10 familiar experience, ").concat(noML())
      }),
      prepare: () => {
        (0,external_kolmafia_namespaceObject.restoreHp)(0.75 * (0,external_kolmafia_namespaceObject.myMaxhp)());
        (0,external_kolmafia_namespaceObject.restoreMp)(8);
      },
      do: $location(_templateObject392 || (_templateObject392 = greyyou_taggedTemplateLiteral(["The Neverending Party"]))),
      post: () => {
        if (!property_get("_lastCombatWon")) throw new Error("Lost Combat - Check to see what went wrong.");
      },
      choices: {
        1322: 2,
        //don't take NEP quest
        1324: 5 //fight a partier

      },
      combat: new CombatStrategy().macro(() => {
        var _Macro$step$externalI;

        return (_Macro$step$externalI = Macro.step("pickpocket").externalIf(lib_have($skill(_templateObject393 || (_templateObject393 = greyyou_taggedTemplateLiteral(["Curse of Weaksauce"])))), Macro.trySkill($skill(_templateObject394 || (_templateObject394 = greyyou_taggedTemplateLiteral(["Curse of Weaksauce"])))), Macro.tryItem(template_string_$item(_templateObject395 || (_templateObject395 = greyyou_taggedTemplateLiteral(["electronics kit"]))))).trySkill($skill(_templateObject396 || (_templateObject396 = greyyou_taggedTemplateLiteral(["Bowl Sideways"])))).externalIf(template_string_$familiar(_templateObject397 || (_templateObject397 = greyyou_taggedTemplateLiteral(["Grey Goose"]))).experience >= 400, Macro.trySkill((0,external_kolmafia_namespaceObject.myPrimestat)() === $stat(_templateObject398 || (_templateObject398 = greyyou_taggedTemplateLiteral(["Muscle"]))) ? $skill(_templateObject399 || (_templateObject399 = greyyou_taggedTemplateLiteral(["Convert Matter to Protein"]))) : (0,external_kolmafia_namespaceObject.myPrimestat)() === $stat(_templateObject400 || (_templateObject400 = greyyou_taggedTemplateLiteral(["Mysticality"]))) ? $skill(_templateObject401 || (_templateObject401 = greyyou_taggedTemplateLiteral(["Convert Matter to Energy"]))) : $skill(_templateObject402 || (_templateObject402 = greyyou_taggedTemplateLiteral(["Convert Matter to Pomade"])))))).tryItem.apply(_Macro$step$externalI, greyyou_toConsumableArray(template_string_$items(_templateObject403 || (_templateObject403 = greyyou_taggedTemplateLiteral(["porquoise-handled sixgun, HOA citation pad"]))))).trySkill($skill(_templateObject404 || (_templateObject404 = greyyou_taggedTemplateLiteral(["Sing Along"])))).externalIf((0,external_kolmafia_namespaceObject.myLevel)() >= args.targetlevel - 2, Macro.trySkill($skill(_templateObject405 || (_templateObject405 = greyyou_taggedTemplateLiteral(["Feel Pride"]))))).attack().repeat();
      }),
      limit: {
        tries: 13
      },
      //+3 for unaccounted for wanderers, etc.
      tracking: "Leveling"
    }, {
      name: "Gators",
      ready: () => !!$effects(_templateObject406 || (_templateObject406 = greyyou_taggedTemplateLiteral(["HGH-charged, Different Way of Seeing Things, Thou Shant Not Sing"]))).find(ef => lib_have(ef)),
      completed: () => (0,external_kolmafia_namespaceObject.myClass)() !== $class(_templateObject407 || (_templateObject407 = greyyou_taggedTemplateLiteral(["Grey Goo"]))) && (0,external_kolmafia_namespaceObject.myLevel)() >= args.targetlevel,
      effects: $effects(_templateObject408 || (_templateObject408 = greyyou_taggedTemplateLiteral(["Heart of White, Expert Vacationer"]))),
      acquire: () => [].concat(greyyou_toConsumableArray(lib_have($skill(_templateObject409 || (_templateObject409 = greyyou_taggedTemplateLiteral(["Curse of Weaksauce"])))) ? [] : [{
        item: template_string_$item(_templateObject410 || (_templateObject410 = greyyou_taggedTemplateLiteral(["electronics kit"]))),
        price: 500
      }]), greyyou_toConsumableArray(lib_have(template_string_$item(_templateObject411 || (_templateObject411 = greyyou_taggedTemplateLiteral(["January's Garbage Tote"])))) ? [{
        item: template_string_$item(_templateObject412 || (_templateObject412 = greyyou_taggedTemplateLiteral(["makeshift garbage shirt"])))
      }] : [])),
      outfit: () => greyyou_objectSpread(greyyou_objectSpread(greyyou_objectSpread({
        familiar: template_string_$familiar(_templateObject413 || (_templateObject413 = greyyou_taggedTemplateLiteral(["Grey Goose"])))
      }, lib_have(template_string_$item(_templateObject414 || (_templateObject414 = greyyou_taggedTemplateLiteral(["The Jokester's gun"])))) && (0,external_kolmafia_namespaceObject.myBasestat)($stat(_templateObject415 || (_templateObject415 = greyyou_taggedTemplateLiteral(["Moxie"])))) >= 50 && !property_get("_firedJokestersGun") ? {
        weapon: template_string_$item(_templateObject416 || (_templateObject416 = greyyou_taggedTemplateLiteral(["The Jokester's gun"])))
      } : lib_have(template_string_$item(_templateObject417 || (_templateObject417 = greyyou_taggedTemplateLiteral(["Lil' Doctor\u2122 bag"])))) && property_get("_chestXRayUsed") < 3 ? {
        equip: [template_string_$item(_templateObject418 || (_templateObject418 = greyyou_taggedTemplateLiteral(["Lil' Doctor\u2122 bag"])))]
      } : {}), lib_have(template_string_$item(_templateObject419 || (_templateObject419 = greyyou_taggedTemplateLiteral(["makeshift garbage shirt"])))) ? {
        shirt: template_string_$item(_templateObject420 || (_templateObject420 = greyyou_taggedTemplateLiteral(["makeshift garbage shirt"])))
      } : {}), {}, {
        modifier: "effective, 0.125 ".concat((0,external_kolmafia_namespaceObject.myPrimestat)(), ", ").concat((0,external_kolmafia_namespaceObject.myPrimestat)(), " experience, 5 ").concat((0,external_kolmafia_namespaceObject.myPrimestat)(), " experience percent, 10 familiar experience, ").concat(noML())
      }),
      prepare: () => {
        (0,external_kolmafia_namespaceObject.restoreHp)(0.75 * (0,external_kolmafia_namespaceObject.myMaxhp)());
        (0,external_kolmafia_namespaceObject.restoreMp)(8);
      },
      do: $location(_templateObject421 || (_templateObject421 = greyyou_taggedTemplateLiteral(["Uncle Gator's Country Fun-Time Liquid Waste Sluice"]))),
      post: () => {
        if (!property_get("_lastCombatWon")) throw new Error("Lost Combat - Check to see what went wrong.");
      },
      combat: new CombatStrategy().macro(() => Macro.step("pickpocket").externalIf(lib_have($skill(_templateObject422 || (_templateObject422 = greyyou_taggedTemplateLiteral(["Curse of Weaksauce"])))), Macro.trySkill($skill(_templateObject423 || (_templateObject423 = greyyou_taggedTemplateLiteral(["Curse of Weaksauce"])))), Macro.tryItem(template_string_$item(_templateObject424 || (_templateObject424 = greyyou_taggedTemplateLiteral(["electronics kit"]))))).trySkill($skill(_templateObject425 || (_templateObject425 = greyyou_taggedTemplateLiteral(["Bowl Sideways"])))).externalIf(template_string_$familiar(_templateObject426 || (_templateObject426 = greyyou_taggedTemplateLiteral(["Grey Goose"]))).experience >= 400, Macro.trySkill((0,external_kolmafia_namespaceObject.myPrimestat)() === $stat(_templateObject427 || (_templateObject427 = greyyou_taggedTemplateLiteral(["Muscle"]))) ? $skill(_templateObject428 || (_templateObject428 = greyyou_taggedTemplateLiteral(["Convert Matter to Protein"]))) : (0,external_kolmafia_namespaceObject.myPrimestat)() === $stat(_templateObject429 || (_templateObject429 = greyyou_taggedTemplateLiteral(["Mysticality"]))) ? $skill(_templateObject430 || (_templateObject430 = greyyou_taggedTemplateLiteral(["Convert Matter to Energy"]))) : $skill(_templateObject431 || (_templateObject431 = greyyou_taggedTemplateLiteral(["Convert Matter to Pomade"]))))).tryItem(template_string_$item(_templateObject432 || (_templateObject432 = greyyou_taggedTemplateLiteral(["porquoise-handled sixgun"])))).trySkill($skill(_templateObject433 || (_templateObject433 = greyyou_taggedTemplateLiteral(["Sing Along"])))).externalIf((0,external_kolmafia_namespaceObject.myLevel)() >= args.targetlevel - 2, Macro.trySkill($skill(_templateObject434 || (_templateObject434 = greyyou_taggedTemplateLiteral(["Feel Pride"]))))).trySkill($skill(_templateObject435 || (_templateObject435 = greyyou_taggedTemplateLiteral(["Fire the Jokester's Gun"])))).trySkill($skill(_templateObject436 || (_templateObject436 = greyyou_taggedTemplateLiteral(["Chest X-Ray"])))).trySkill($skill(_templateObject437 || (_templateObject437 = greyyou_taggedTemplateLiteral(["Gingerbread Mob Hit"])))).trySkill($skill(_templateObject438 || (_templateObject438 = greyyou_taggedTemplateLiteral(["Shattering Punch"])))).attack().repeat()),
      limit: {
        tries: levelingTurns + 3
      },
      //+3 for unaccounted for wanderers, etc.
      tracking: "Leveling"
    }, {
      name: "Alert-Leveling Failed",
      completed: () => (0,external_kolmafia_namespaceObject.myLevel)() >= args.targetlevel,
      do: () => {
        throw new Error("Finished Leveling Tasks, but only reached level ".concat((0,external_kolmafia_namespaceObject.myLevel)(), "/").concat(args.targetlevel));
      }
    }, {
      name: "Gold Wedding Ring",
      completed: () => !lib_have($skill(_templateObject439 || (_templateObject439 = greyyou_taggedTemplateLiteral(["Comprehensive Cartography"])))) || (0,external_kolmafia_namespaceObject.myAscensions)() === property_get("lastCartographyBooPeak"),
      choices: {
        1430: 3,
        606: 4,
        610: 1,
        1056: 1
      },
      do: $location(_templateObject440 || (_templateObject440 = greyyou_taggedTemplateLiteral(["A-Boo Peak"]))),
      outfit: {
        modifier: "initiative 40 min 40 max, -tie"
      }
    }, {
      name: "Breakfast",
      completed: () => property_get("breakfastCompleted"),
      do: () => (0,external_kolmafia_namespaceObject.cliExecute)("breakfast")
    }, {
      name: "Garbo",
      ready: () => property_get("_stenchAirportToday") || property_get("stenchAirportAlways"),
      completed: () => (0,external_kolmafia_namespaceObject.myAdventures)() === 0 && !canDiet() || stooperDrunk(),
      prepare: () => uneffect($effect(_templateObject441 || (_templateObject441 = greyyou_taggedTemplateLiteral(["Beaten Up"])))),
      do: () => (0,external_kolmafia_namespaceObject.cliExecute)(args.garbo),
      post: () => $effects(_templateObject442 || (_templateObject442 = greyyou_taggedTemplateLiteral(["Power Ballad of the Arrowsmith, Stevedave's Shanty of Superiority, The Moxious Madrigal, The Magical Mojomuscular Melody, Aloysius' Antiphon of Aptitude, Ur-Kel's Aria of Annoyance"]))).filter(ef => lib_have(ef)).forEach(ef => uneffect(ef)),
      clear: "all",
      tracking: "Garbo"
    }, {
      name: "Turn in FunFunds",
      ready: () => property_get("_stenchAirportToday") && (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(_templateObject443 || (_templateObject443 = greyyou_taggedTemplateLiteral(["FunFunds\u2122"])))) >= 20,
      completed: () => lib_have(template_string_$item(_templateObject444 || (_templateObject444 = greyyou_taggedTemplateLiteral(["one-day ticket to Dinseylandfill"])))),
      do: () => (0,external_kolmafia_namespaceObject.buy)($coinmaster(_templateObject445 || (_templateObject445 = greyyou_taggedTemplateLiteral(["The Dinsey Company Store"]))), 1, template_string_$item(_templateObject446 || (_templateObject446 = greyyou_taggedTemplateLiteral(["one-day ticket to Dinseylandfill"])))),
      tracking: "Garbo"
    }, {
      name: "PvP",
      ready: () => doneAdventuring(),
      completed: () => (0,external_kolmafia_namespaceObject.pvpAttacksLeft)() === 0 || !(0,external_kolmafia_namespaceObject.hippyStoneBroken)(),
      do: () => {
        (0,external_kolmafia_namespaceObject.cliExecute)("unequip");
        (0,external_kolmafia_namespaceObject.cliExecute)("UberPvPOptimizer");
        (0,external_kolmafia_namespaceObject.cliExecute)("swagger");
      }
    }, {
      name: "Stooper",
      ready: () => (0,external_kolmafia_namespaceObject.myInebriety)() === (0,external_kolmafia_namespaceObject.inebrietyLimit)() && lib_have(template_string_$item(_templateObject447 || (_templateObject447 = greyyou_taggedTemplateLiteral(["tiny stillsuit"])))) && property_get("familiarSweat") >= 300,
      completed: () => !lib_have(template_string_$familiar(_templateObject448 || (_templateObject448 = greyyou_taggedTemplateLiteral(["Stooper"])))) || stooperDrunk(),
      do: () => {
        (0,external_kolmafia_namespaceObject.useFamiliar)(template_string_$familiar(_templateObject449 || (_templateObject449 = greyyou_taggedTemplateLiteral(["Stooper"]))));
        (0,external_kolmafia_namespaceObject.cliExecute)("drink stillsuit distillate");
      }
    }, {
      name: "Nightcap",
      ready: () => doneAdventuring(),
      completed: () => args.ascend || totallyDrunk(),
      do: () => (0,external_kolmafia_namespaceObject.cliExecute)("CONSUME NIGHTCAP")
    }, {
      name: "Barfing Drunk with Stooper",
      ready: () => stooperDrunk() && lib_have(template_string_$familiar(_templateObject450 || (_templateObject450 = greyyou_taggedTemplateLiteral(["Stooper"])))) && !lib_have(template_string_$item(_templateObject451 || (_templateObject451 = greyyou_taggedTemplateLiteral(["Drunkula's wineglass"])))),
      completed: () => !args.ascend || (0,external_kolmafia_namespaceObject.myAdventures)() === 0 || totallyDrunk(),
      acquire: [{
        item: template_string_$item(_templateObject452 || (_templateObject452 = greyyou_taggedTemplateLiteral(["seal tooth"])))
      }],
      outfit: () => ({
        familiar: template_string_$familiar(_templateObject453 || (_templateObject453 = greyyou_taggedTemplateLiteral(["Stooper"]))),
        modifier: "".concat(maxBase(), ", 2.5 meat, 0.6 items")
      }),
      effects: $effects(_templateObject454 || (_templateObject454 = greyyou_taggedTemplateLiteral(["How to Scam Tourists"]))),
      //need to add meat buffs that we can cast
      prepare: () => {
        (0,external_kolmafia_namespaceObject.restoreHp)(0.75 * (0,external_kolmafia_namespaceObject.myMaxhp)());
        (0,external_kolmafia_namespaceObject.restoreMp)(20);
      },
      do: $location(_templateObject455 || (_templateObject455 = greyyou_taggedTemplateLiteral(["Barf Mountain"]))),
      combat: new CombatStrategy().macro(Macro.trySkill($skill(_templateObject456 || (_templateObject456 = greyyou_taggedTemplateLiteral(["Curse of Weaksauce"])))), getTodaysHolidayWanderers()).macro(() => Macro.step("pickpocket").trySkill($skill(_templateObject457 || (_templateObject457 = greyyou_taggedTemplateLiteral(["Bowl Straight Up"])))).trySkill($skill(_templateObject458 || (_templateObject458 = greyyou_taggedTemplateLiteral(["Sing Along"])))).tryItem(template_string_$item(_templateObject459 || (_templateObject459 = greyyou_taggedTemplateLiteral(["porquoise-handled sixgun"])))).externalIf((0,external_kolmafia_namespaceObject.haveEquipped)(template_string_$item(_templateObject460 || (_templateObject460 = greyyou_taggedTemplateLiteral(["mafia pointer finger ring"])))), Macro.trySkill($skill(_templateObject461 || (_templateObject461 = greyyou_taggedTemplateLiteral(["Furious Wallop"])))).trySkill($skill(_templateObject462 || (_templateObject462 = greyyou_taggedTemplateLiteral(["Summer Siesta"])))).trySkill($skill(_templateObject463 || (_templateObject463 = greyyou_taggedTemplateLiteral(["Throw Shield"])))).trySkill($skill(_templateObject464 || (_templateObject464 = greyyou_taggedTemplateLiteral(["Precision Shot"]))))).attack().repeat()),
      limit: {
        tries: 30
      }
    }, {
      name: "Nightcap (Wine Glass)",
      ready: () => lib_have(template_string_$item(_templateObject465 || (_templateObject465 = greyyou_taggedTemplateLiteral(["Drunkula's wineglass"])))),
      completed: () => !args.ascend || totallyDrunk(),
      do: () => (0,external_kolmafia_namespaceObject.cliExecute)("CONSUME NIGHTCAP VALUE ".concat(property_get("valueOfAdventure") - 1000))
    }, {
      name: "Nightcap (Marginal)",
      ready: () => lib_have(template_string_$item(_templateObject466 || (_templateObject466 = greyyou_taggedTemplateLiteral(["Beach Comb"])))) || lib_have(template_string_$item(_templateObject467 || (_templateObject467 = greyyou_taggedTemplateLiteral(["Map to Safety Shelter Grimace Prime"])))),
      completed: () => !args.ascend || totallyDrunk(),
      do: () => (0,external_kolmafia_namespaceObject.cliExecute)("CONSUME NIGHTCAP VALUE 500")
    }, {
      name: "Grimace Maps",
      completed: () => !args.ascend || (0,external_kolmafia_namespaceObject.myAdventures)() === 0 || !lib_have(template_string_$item(_templateObject468 || (_templateObject468 = greyyou_taggedTemplateLiteral(["Map to Safety Shelter Grimace Prime"])))),
      effects: $effects(_templateObject469 || (_templateObject469 = greyyou_taggedTemplateLiteral(["Transpondent"]))),
      choices: {
        536: () => (0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(_templateObject470 || (_templateObject470 = greyyou_taggedTemplateLiteral(["distention pill"])))) < (0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(_templateObject471 || (_templateObject471 = greyyou_taggedTemplateLiteral(["synthetic dog hair pill"])))) + (0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(_templateObject472 || (_templateObject472 = greyyou_taggedTemplateLiteral(["Map to Safety Shelter Grimace Prime"])))) ? 1 : 2
      },
      do: () => (0,external_kolmafia_namespaceObject.use)(template_string_$item(_templateObject473 || (_templateObject473 = greyyou_taggedTemplateLiteral(["Map to Safety Shelter Grimace Prime"])))),
      limit: {
        tries: 30
      }
    }, {
      name: "Garbo (Drunk)",
      ready: () => lib_have(template_string_$item(_templateObject474 || (_templateObject474 = greyyou_taggedTemplateLiteral(["Drunkula's wineglass"])))),
      prepare: () => uneffect($effect(_templateObject475 || (_templateObject475 = greyyou_taggedTemplateLiteral(["Beaten Up"])))),
      completed: () => !args.ascend || (0,external_kolmafia_namespaceObject.myAdventures)() === 0,
      do: () => (0,external_kolmafia_namespaceObject.cliExecute)(args.garboascend),
      post: () => $effects(_templateObject476 || (_templateObject476 = greyyou_taggedTemplateLiteral(["Power Ballad of the Arrowsmith, Stevedave's Shanty of Superiority, The Moxious Madrigal, The Magical Mojomuscular Melody, Aloysius' Antiphon of Aptitude, Ur-Kel's Aria of Annoyance"]))).filter(ef => lib_have(ef)).forEach(ef => uneffect(ef)),
      clear: "all",
      tracking: "Garbo"
    }, {
      name: "Comb Beach",
      ready: () => lib_have(template_string_$item(_templateObject477 || (_templateObject477 = greyyou_taggedTemplateLiteral(["Beach Comb"])))),
      completed: () => !args.ascend || (0,external_kolmafia_namespaceObject.myAdventures)() === 0,
      do: () => (0,external_kolmafia_namespaceObject.cliExecute)("combo ".concat(11 - property_get("_freeBeachWalksUsed") + (0,external_kolmafia_namespaceObject.myAdventures)()))
    }, {
      name: "Plant Garden",
      ready: () => doneAdventuring() && !!template_string_$items(_templateObject478 || (_templateObject478 = greyyou_taggedTemplateLiteral(["packet of thanksgarden seeds, Peppermint Pip Packet, packet of winter seeds, packet of beer seeds, packet of pumpkin seeds, packet of dragon's teeth"]))).find(it => lib_have(it)),
      completed: () => getGarden() !== template_string_$item(_templateObject479 || (_templateObject479 = greyyou_taggedTemplateLiteral(["packet of tall grass seeds"]))),
      do: () => {
        (0,external_kolmafia_namespaceObject.use)(template_string_$items(_templateObject480 || (_templateObject480 = greyyou_taggedTemplateLiteral(["packet of thanksgarden seeds, Peppermint Pip Packet, packet of winter seeds, packet of beer seeds, packet of pumpkin seeds, packet of dragon's teeth"]))).find(it => lib_have(it)) || template_string_$item(_templateObject481 || (_templateObject481 = greyyou_taggedTemplateLiteral(["none"]))));
        if (args.ascend) (0,external_kolmafia_namespaceObject.cliExecute)("garden pick");
      }
    }, {
      name: "Pajamas",
      completed: () => args.ascend || (0,external_kolmafia_namespaceObject.getCampground)()[template_string_$item(_templateObject482 || (_templateObject482 = greyyou_taggedTemplateLiteral(["clockwork maid"]))).name] === 1,
      acquire: [{
        item: template_string_$item(_templateObject483 || (_templateObject483 = greyyou_taggedTemplateLiteral(["clockwork maid"]))),
        price: 7 * property_get("valueOfAdventure")
      }, {
        item: template_string_$item(_templateObject484 || (_templateObject484 = greyyou_taggedTemplateLiteral(["burning cape"])))
      }],
      do: () => (0,external_kolmafia_namespaceObject.use)(template_string_$item(_templateObject485 || (_templateObject485 = greyyou_taggedTemplateLiteral(["clockwork maid"])))),
      outfit: () => ({
        familiar: $familiars(_templateObject486 || (_templateObject486 = greyyou_taggedTemplateLiteral(["Trick-or-Treating Tot, Left-Hand Man, Disembodied Hand, Grey Goose"]))).find(fam => lib_have(fam)),
        modifier: "adventures".concat(args.pvp ? ", 0.3 fites" : "")
      })
    }, {
      name: "Summon Soap Knife",
      completed: () => !lib_have($skill(_templateObject487 || (_templateObject487 = greyyou_taggedTemplateLiteral(["That's Not a Knife"])))) || property_get("_discoKnife"),
      prepare: () => (0,external_kolmafia_namespaceObject.putCloset)((0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(_templateObject488 || (_templateObject488 = greyyou_taggedTemplateLiteral(["soap knife"])))), template_string_$item(_templateObject489 || (_templateObject489 = greyyou_taggedTemplateLiteral(["soap knife"])))),
      do: () => (0,external_kolmafia_namespaceObject.useSkill)($skill(_templateObject490 || (_templateObject490 = greyyou_taggedTemplateLiteral(["That's Not a Knife"])))),
      post: () => (0,external_kolmafia_namespaceObject.takeCloset)((0,external_kolmafia_namespaceObject.closetAmount)(template_string_$item(_templateObject491 || (_templateObject491 = greyyou_taggedTemplateLiteral(["soap knife"])))), template_string_$item(_templateObject492 || (_templateObject492 = greyyou_taggedTemplateLiteral(["soap knife"]))))
    }, {
      name: "Tip the Author",
      //disabled by default - must manually discover and enable the flag
      ready: () => args.tip,
      completed: () => !lib_have(template_string_$item(_templateObject493 || (_templateObject493 = greyyou_taggedTemplateLiteral(["soap knife"])))),
      do: () => (0,external_kolmafia_namespaceObject.cliExecute)("csend * soap knife to sketchysolid || Thanks for the script!")
    }, {
      name: "Alert-No Nightcap",
      ready: () => !doneAdventuring(),
      completed: () => stooperDrunk(),
      do: () => {
        var targetAdvs = 100 - (0,external_kolmafia_namespaceObject.numericModifier)("adventures");
        (0,external_kolmafia_namespaceObject.print)("goorbo completed, but did not overdrink.", "red");
        if (targetAdvs < (0,external_kolmafia_namespaceObject.myAdventures)() && targetAdvs > 0) (0,external_kolmafia_namespaceObject.print)("Rerun with fewer than ".concat(targetAdvs, " adventures for goorbo to handle your diet"), "red");else (0,external_kolmafia_namespaceObject.print)("Something went wrong.", "red");
      }
    }]
  };
}
;// CONCATENATED MODULE: ./src/engine/engine.ts
function engine_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function engine_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? engine_ownKeys(Object(source), !0).forEach(function (key) { engine_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : engine_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function engine_engine_toConsumableArray(arr) { return engine_engine_arrayWithoutHoles(arr) || engine_engine_iterableToArray(arr) || engine_engine_unsupportedIterableToArray(arr) || engine_engine_nonIterableSpread(); }

function engine_engine_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function engine_engine_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return engine_engine_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return engine_engine_arrayLikeToArray(o, minLen); }

function engine_engine_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function engine_engine_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return engine_engine_arrayLikeToArray(arr); }

function engine_engine_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function engine_engine_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function engine_engine_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function engine_engine_createClass(Constructor, protoProps, staticProps) { if (protoProps) engine_engine_defineProperties(Constructor.prototype, protoProps); if (staticProps) engine_engine_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function engine_get() { if (typeof Reflect !== "undefined" && Reflect.get) { engine_get = Reflect.get.bind(); } else { engine_get = function _get(target, property, receiver) { var base = engine_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return engine_get.apply(this, arguments); }

function engine_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = engine_getPrototypeOf(object); if (object === null) break; } return object; }

function engine_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) engine_setPrototypeOf(subClass, superClass); }

function engine_setPrototypeOf(o, p) { engine_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return engine_setPrototypeOf(o, p); }

function engine_createSuper(Derived) { var hasNativeReflectConstruct = engine_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = engine_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = engine_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return engine_possibleConstructorReturn(this, result); }; }

function engine_possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return engine_assertThisInitialized(self); }

function engine_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function engine_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function engine_getPrototypeOf(o) { engine_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return engine_getPrototypeOf(o); }

function engine_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var engine_grimoireCCS = "grimoire_macro";
var ccsAbortString = "if pastround 2;abort Failed to finish combat in autoattack;endif;";
var ProfitTrackingEngine = /*#__PURE__*/function (_Engine) {
  engine_inherits(ProfitTrackingEngine, _Engine);

  var _super = engine_createSuper(ProfitTrackingEngine);

  function ProfitTrackingEngine(tasks, key) {
    var _this;

    engine_engine_classCallCheck(this, ProfitTrackingEngine);

    _this = _super.call(this, tasks);

    engine_defineProperty(engine_assertThisInitialized(_this), "profits", void 0);

    _this.profits = new ProfitTracker(key);
    return _this;
  }

  engine_engine_createClass(ProfitTrackingEngine, [{
    key: "setCombat",
    value: function setCombat(task, task_combat, task_resources) {
      var _this$options;

      // Save regular combat macro
      var macro = task_combat.compile(task_resources, (_this$options = this.options) === null || _this$options === void 0 ? void 0 : _this$options.combat_defaults, task.do instanceof external_kolmafia_namespaceObject.Location ? task.do : undefined);

      if (macro.toString().length > 1) {
        macro.save();

        if (!this.options.ccs) {
          // Use the macro through a CCS file
          var otherCCSEntries = task_combat.compileCcs();
          var ccsContents = ["[default]", "\"".concat(ccsAbortString).concat(macro.toString(), "\"")].concat(engine_engine_toConsumableArray(otherCCSEntries)).join("\n"); // Log Macro + other CCS

          (0,external_kolmafia_namespaceObject.logprint)("CCS: ".concat(ccsContents.replace("\n", "\\n ")));

          if (ccsContents !== this.cachedCcsContents) {
            (0,external_kolmafia_namespaceObject.writeCcs)(ccsContents, engine_grimoireCCS);
            (0,external_kolmafia_namespaceObject.cliExecute)("ccs ".concat(engine_grimoireCCS)); // force Mafia to reparse the ccs

            var autoattack = task_combat.compileAutoattack().step(macro);

            if (autoattack.toString().length > 1) {
              autoattack.save();
              autoattack.setAutoAttack();
            } else {
              (0,external_kolmafia_namespaceObject.setAutoAttack)(0);
            }

            this.cachedCcsContents = ccsContents;
          }
        }
      }
    }
  }, {
    key: "checkLimits",
    value: function checkLimits(task, postcondition) {
      if (task.clear && !(task.clear instanceof Array)) task.clear = task.clear === "all" ? ["outfit", "macro"] : [task.clear]; //convert to an array of appropriate strings

      if (task.clear && task.clear.includes("macro")) this.cachedCcsContents = "";

      if (task.clear && task.clear.includes("outfit")) {
        clearMaximizerCache();
      }

      engine_get(engine_getPrototypeOf(ProfitTrackingEngine.prototype), "checkLimits", this).call(this, engine_objectSpread({
        limit: {
          tries: 1
        }
      }, task), postcondition); //sets the default value of limit

    }
  }, {
    key: "execute",
    value: function execute(task) {
      try {
        engine_get(engine_getPrototypeOf(ProfitTrackingEngine.prototype), "execute", this).call(this, task);
      } finally {
        var _task$tracking;

        this.profits.record("".concat(getCurrentLeg(), "@").concat((_task$tracking = task.tracking) !== null && _task$tracking !== void 0 ? _task$tracking : "Other"));
      }
    }
  }, {
    key: "destruct",
    value: function destruct() {
      engine_get(engine_getPrototypeOf(ProfitTrackingEngine.prototype), "destruct", this).call(this);

      this.profits.save();
      printProfits(this.profits.all());
    }
  }]);

  return ProfitTrackingEngine;
}(Engine);
;// CONCATENATED MODULE: ./src/main.ts
function main_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = main_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function main_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return main_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return main_arrayLikeToArray(o, minLen); }

function main_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }









var version = "0.5.1";
function main(command) {
  Args.fill(args, command);

  if (args.help) {
    Args.showHelp(args);
    return;
  }

  if (args.simperms) {
    checkPerms();
    printPermPlan();
    return;
  }

  if (args.sim) {
    checkReqs();
    printPermPlan();
    return;
  }

  if (args.version) {
    (0,external_kolmafia_namespaceObject.print)("goorbo v".concat(version));
    return;
  }

  var tasks = getTasks([AftercoreQuest(), GyouQuest()]); // Abort during the prepare() step of the specified task

  if (args.abort) {
    var to_abort = tasks.find(task => task.name === args.abort);
    if (!to_abort) throw "Unable to identify task ".concat(args.abort);

    to_abort.prepare = () => {
      throw "Abort requested";
    };
  }

  var engine = new ProfitTrackingEngine(tasks, "loop_profit_tracker");

  try {
    engine.run(args.actions); // Print the next task that will be executed, if it exists

    var task = engine.getNextTask();

    if (task) {
      (0,external_kolmafia_namespaceObject.print)("Next: ".concat(task.name), "blue");
    } // If the engine ran to completion, all tasks should be complete.
    // Print any tasks that are not complete.


    if (args.actions === undefined) {
      var uncompletedTasks = engine.tasks.filter(t => !t.completed());

      if (uncompletedTasks.length > 0) {
        (0,external_kolmafia_namespaceObject.print)("Uncompleted Tasks:");

        var _iterator = main_createForOfIteratorHelper(uncompletedTasks),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var t = _step.value;
            (0,external_kolmafia_namespaceObject.print)(t.name);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }
  } finally {
    engine.destruct();
  }
}
})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;