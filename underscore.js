//******Collection module start*********//
var _ = function(input) {
  var newObject = Object.create(_);
  newObject.obj = input;
  return newObject;
};

_.each = function(array, callback, context) {
  if (!Boolean(array)) return null;
  if (Array.isArray(array)) {
    for (var i = 0, length = array.length; i < length; i++) {
      callback.bind(context)(array[i], i, array);
    }
  } else {
    Object.keys(array).forEach(function(key) {
      callback.bind(context)(array[key], key, array);
    });
  }
  return array;
};

_.times = function(count, callback, context) {
  while (count--) {
    callback.bind(context)();
  }
};

_.forEach = _.each;
_.constant = function(val) {
  return function() {
    return val;
  };
};

_.map = function(obj, cb, context) {
  [obj, cb, context] = fixOOArgs(this, arguments);
  if (obj === null) return [];
  var result = [];
  let callback = _.iteratee(cb);
  //array like objects {length :2, 0:'hello', 1:'world'}
  if (obj.length === Object.keys(obj).length - 1 || Array.isArray(obj)) {
    for (var i = 0, length = obj.length; i < length; i++) {
      result.push(callback.bind(context)(obj[i], i, obj));
    }
    return result;
  } else {
    Object.keys(obj).forEach(function(key) {
      result.push(callback(obj[key], key));
    });
    return result;
  }
};

_.collect = _.map;

_.find = function(array, pred) {
  let predicate = _.iteratee(pred);
  if (predicate === undefined) {
    _.each(array, predicate);
    return array.length;
  }
  if (Array.isArray(array)) {
    if (typeof predicate === 'function') {
      return array.find(predicate);
    } else {
      return array.find(function(value) {
        return Object.keys(predicate).every(function(key) {
          return value[key] === predicate[key];
        });
      });
    }
  } else {
    if (typeof predicate === 'function') {
      var idx = Object.keys(array).find(function(key) {
        return predicate(array[key], key);
      });
      return array[idx];
    } else {
      return Object.values(array).find(function(value) {
        return Object.keys(predicate).every(function(key) {
          return value[key] === predicate[key];
        });
      });
    }
  }
};

_.findIndex = function(obj, pred, context) {
  if (obj === undefined || obj === null) return -1;
  let predicate = _.iteratee(pred);
  if (typeof predicate === 'string') predicate = val => _.isTrue(val[pred]);
  if (Array.isArray(obj)) {
    return obj.findIndex(predicate.bind(context));
  } else {
    Object.keys(obj).find(function(key) {
      return callback.bind(context)(obj[key], key);
    });
  }
};

_.detect = _.find;

_.filter = function(obj, pred, context) {
  let predicate = _.iteratee(pred);
  var result = [];
  if (Array.isArray(obj)) {
    for (var i = 0, length = obj.length; i < length; i++) {
      if (predicate.bind(context)(obj[i], i, obj)) result.push(obj[i]);
    }
    return result;
  } else {
    Object.keys(obj).forEach(function(key) {
      if (predicate.bind(context)(obj[key], key)) result.push(obj[key]);
    });
    return result;
  }
};

_.select = _.filter;

_.reject = function(obj, pred, context) {
  let result = [];
  let predicate = _.iteratee(pred);
  if (Array.isArray(obj)) {
    for (let i = 0, length = obj.length; i < length; i++) {
      if (!predicate.bind(context)(obj[i], i, obj)) result.push(obj[i]);
    }
    return result;
  } else {
    Object.keys(obj).forEach(function(key) {
      predicate.bind(context)(obj[key], key);
    });
  }
};

_.identity = function(input) {
  return input;
};
_.every = function(obj, pred, context) {
  let predicate = _.iteratee(pred);
  if (Array.isArray(obj)) {
    for (var i = 0, length = obj.length; i < length; i++) {
      if (!predicate.bind(context)(obj[i], i, obj)) return false;
    }
    return true;
  } else {
    return Object.keys(obj).every(function(key) {
      return predicate.bind(context)(obj[key], key);
    });
  }
};

_.isNumber = function(input) {
  return typeof input === 'number';
};

_.isObject = function(input) {
  return typeof input === 'object';
};

_.hasOwnProperty = function(object, key) {
  var obj = {};
  if (!_.isObject(object)) {
    key = object;
    object = this;
  }
  return obj.__proto__.hasOwnProperty.call(object, key);
};

_.all = _.every;

_.some = function(obj, pred, context) {
  if (typeof pred === 'object') {
    return obj.some(function(value) {
      return Object.keys(pred).every(function(key) {
        return value[key] === pred[key];
      });
    });
  }
  let predicate = _.iteratee(pred);
  if (Array.isArray(obj)) {
    for (let i = 0, length = obj.length; i < length; i++) {
      if (predicate.bind(context)(obj[i], i, obj)) return true;
    }
    return false;
  } else {
    return Object.keys(obj).some(function(key) {
      if (predicate.bind(context)(obj[key], key)) return true;
    });
  }
};

_.any = _.some;

_.include = function(arr, num, fromIndex) {
  if (this.obj !== undefined) {
    fromIndex = num;
    num = arr;
    arr = this.obj;
  }
  if (arr === null || arr === undefined) return false;
  if (typeof fromIndex === 'boolean') fromIndex = 0;
  if (isNaN(num)) {
    return _.any(arr, function(val) {
      return isNaN(val);
    });
  }
  if (Array.isArray(arr)) return arr.indexOf(num, fromIndex) > -1;
  if (typeof arr === 'object') {
    return _.hasOwnProperty(arr, num) || _.any(arr, function(val) {
      return val === num;
    });
  }
  return false;
};

_.includes = _.include;
_.contains = _.include;

_.invoke = function(list, method, ...args) {
  var result = [];
  var toExecute, context;
  _.each(list, function(listItem) {
    context = listItem;
    if (Array.isArray(method)) {
      toExecute = listItem[method[0]];
      _.each(method.slice(1), function(val) {
        if (toExecute === undefined) {
          return;
        }
        if (toExecute === null) {
          toExecute = undefined;
          return;
        }
        context = toExecute;
        toExecute = toExecute[val];
      });
    } else if (typeof method === 'function') {
      result.push(method.call(listItem, ...args));
      return;
    } else {
      toExecute = listItem[method];
    }
    if (toExecute === null || toExecute === void 0) {
      result.push(toExecute);
    } else if (typeof toExecute !== 'function') {
      throw new TypeError();
    } else {
      result.push(toExecute.call(context, ...args));
    }
  });
  return result;
};

_.pluck = function(array, key) {
  var result = [];
  _.each(array, function(element) {
    result.push(element[key]);
  });
  return result;
};

_.where = function(list, props) {
  var result = [];
  _.each(list, function(item) {
    if (Object.keys(props).every(function(value) {
      return props[value] === item[value];
    })) {
      result.push(item);
    }
  });
  return result;
};

_.findWhere = function(list, props) {
  for (let i = 0, length = list.length; i < length; i++) {
    var item = list[i];
    if (Object.keys(props).every(function(value) {
      return props[value] === item[value];
    })) {
      return item;
    }
  }
};

_.isUndefined = function(val) {
  return typeof val === 'undefined';
};
_.isNull = function(val) {
  return val === null;
};

_.max = function(obj, cb, context) {
  if (!Boolean(obj)) return -Infinity;
  let callback = _.iteratee(cb);
  let max = -Infinity;
  let maxObj = -Infinity;
  if (Object.keys(obj).length === 0) return -Infinity;
  if (Array.isArray(obj)) {
    _.each(obj, function(val, idx) {
      let cbResult = callback.bind(context)(val, idx, obj);
      if (cbResult >= max) {
        max = cbResult;
        maxObj = val;
      }
    });
  } else {
    Object.keys(obj).forEach(function(key) {
      var cbResult = callback.bind(context)(obj[key], key, obj);
      if (cbResult >= max) {
        max = cbResult;
        maxObj = obj[key];
      }
    });
  }
  return maxObj;
};

_.range = function(start, stop, step) {
  if (arguments.length == 1) {
    stop = arguments[0];
    start = 0;
    if (stop < 0) {
      step = -1;
    } else {
      step = 1;
    }
  } else if (arguments.length == 2) {
    step = 1;
    if (start > stop) step = -1;
  }

  function comp(v1, v2) {
    return (step > 0) ? (v1 < v2) : (v1 > v2);
  }

  var result = [];
  for (let i = start; comp(i, stop); i += step) {
    result.push(i);
  }
  return result;
};

_.min = function(obj, cb, context) {
  if (!Boolean(obj)) return Infinity;
  let callback = _.iteratee(cb);
  let min = Infinity;
  let minObj = Infinity;
  if (Object.keys(obj).length === 0) return Infinity;
  if (Array.isArray(obj)) {
    _.each(obj, function(val, idx) {
      var cbResult = callback.bind(context)(val, idx, obj);
      if (cbResult !== null && cbResult <= min) {
        min = cbResult;
        minObj = val;
      }
    });
  } else {
    Object.keys(obj).forEach(function(key) {
      var cbResult = callback.bind(context)(obj[key], key);
      if (cbResult !== null && cbResult <= min) {
        min = cbResult;
        minObj = obj[key];
      }
    });
  }
  return minObj;
};

_.sortBy = function(array, pred) {
  let predicate = _.iteratee(pred);
  if (!Array.isArray(array)) array = Object.values(array);
  return array.sort(function(val1, val2) {
    let cmp1 = predicate(val1);
    let cmp2 = predicate(val2);
    let cmpResult;
    if (cmp1 === undefined && cmp2 === undefined) {
      cmpResult = 0;
    } else if (cmp1 === undefined) {
      cmpResult = 1;
    } else if (cmp2 === undefined) {
      cmpResult = -1;
    } else {
      cmpResult = (cmp1 > cmp2) ? +1 : -1;
    }
    return cmpResult;
  });
};

_.object = function(list, values) {
  var result = {};
  if (values === undefined) {
    _.each(list, function(item) {
      result[item[0]] = item[1];
    });
  } else {
    _.each(list, function(val, idx) {
      result[val] = values[idx];
    });
  }
  return result;
};

_.groupBy = function(obj, pred, context) {
  let result = {};
  let predicate = _.iteratee(pred);
  if (predicate === undefined) predicate = _.identity;
  if (Array.isArray(obj)) {
    for (var i = 0, length = obj.length; i < length; i++) {
      var group = predicate.bind(context)(obj[i], i, obj);
      if (!Array.isArray(result[group])) result[group] = [];
      result[group].push(obj[i]);
    }
  } else {
    Object.keys(obj).forEach(function(key) {
      predicate.bind(context)(obj[key], key);
    });
  }
  return result;
};

_.indexBy = function(obj, pred, context) {
  var result = {};
  var predicate = _.iteratee(pred);
  if (Array.isArray(obj)) {
    for (var i = 0, length = obj.length; i < length; i++) {
      var group = predicate.bind(context)(obj[i], i, obj);
      result[group] = obj[i];
    }
  } else {
    Object.keys(obj).forEach(function(key) {
      predicate.bind(context)(obj[key], key);
    });
  }
  return result;
};

_.countBy = function(obj, pred, context) {
  var result = {};
  let predicate = _.iteratee(pred);
  if (Array.isArray(obj)) {
    for (var i = 0, length = obj.length; i < length; i++) {
      var group = predicate.bind(context)(obj[i], i, obj);
      if (typeof result[group] !== 'number') result[group] = 0;
      result[group]++;
    }
  } else {
    Object.keys(obj).forEach(function(key) {
      predicate.bind(context)(obj[key], key);
    });
  }
  return result;
};

_.shuffle = function(list) {
  if (!Array.isArray(list)) {
    return _.shuffle(Object.values(list));
  } else {
    var newList = list.concat();
    var tmp = newList[list.length - 1];
    newList[list.length - 1] = newList[0];
    newList[0] = tmp;
    return newList;
  }
};

_.sample = function(arr, len) {
  len = len || 1;
  if (len < 1) return [];
  if (len === 1) {
    return _.toArray(arr)[0];
  } else {
    return Array.prototype.slice.call(_.toArray(arr), 0, len + 1);
  }
};

_.isArray = function(array) {
  return Array.isArray(array);
};

_.toArray = function(obj) {
  if (obj.constructor.toString().split(' ')[1] === 'Object()') obj = Object.values(obj);
  return Array.from(obj);
};

_.size = function(obj) {
  if (obj === undefined || obj === null || typeof obj === 'number') return 0;
  if (obj.length === Object.keys(obj).length - 1) return obj.length;
  return Object.keys(obj).length;
};

_.partition = function(obj, cb, context) {
  let result = [[], []];
  cb = cb || _.isTrue;
  let callback = _.iteratee(cb);
  if (Array.isArray(obj)) {
    for (var i = 0, length = obj.length; i < length; i++) {
      var cbResult = callback.bind(context)(obj[i], i, obj);
      var index = Boolean(cbResult) ? 0 : 1;
      result[index].push(obj[i]);
    }
  } else {
    Object.keys(obj).forEach(function(key) {
      var cbResult = callback.bind(context)(obj[key], key, obj);
      var index = Boolean(cbResult) ? 0 : 1;
      result[index].push(obj[key]);
    });
  }
  return result;
};

_.isTrue = function(val) {
  return Boolean(val);
};
_.isFalse = function(val) {
  return !Boolean(val);
};

_.reduce = function(obj, callback, init, context) {
  if (this.obj !== undefined) {
    init = callback;
    callback = obj;
    obj = this.obj;
  }
  if (obj === null) return init;
  if (Array.isArray(obj) && !Boolean(obj.length) && callback === undefined &&
      init === void 0) {
    return void 0;
  }
  if (Array.isArray(obj) && obj.length === 1 && init === undefined) {
    return obj[0];
  }
  var current = init || 0;
  callback = callback || function(memo, num) {
    return memo + num;
  };
  if (Array.isArray(obj)) {
    for (var i = 0, length = obj.length; i < length; i++) {
      current = callback.bind(context)(current, obj[i], i, obj);
      if (current === 0 && i === 0) {
        current = obj[i];
      }
    }
    return current;
  } else {
    _.each(obj, function(val, idx, arr) {
      callback(current, val, idx, arr);
    });
    return obj.length === null ? null : obj.length || Object.keys(obj).length;
  }
};

_.foldl = _.reduce;
_.inject = _.reduce;

_.reduceRight = function(obj, callback, init, context) {
  if (this.obj !== undefined) {
    init = callback;
    callback = obj;
    obj = this.obj;
  }
  if (obj === null) return init;
  if (Array.isArray(obj) && !Boolean(obj.length) && callback === undefined &&
      init === void 0) {
    return void 0;
  }
  if (Array.isArray(obj) && obj.length === 1 && init === undefined) {
    return obj[0];
  }
  var current = init || 0;
  callback = callback || function(memo, num) {
    return Number(memo) + Number(num);
  };
  if (Array.isArray(obj)) {
    var start = obj.length - 1;
    for (var i = start; i > -1; i--) {
      if (i === start && typeof obj[start] === 'string') {
        current = '';
      }
      current = callback.bind(context)(current, obj[i], i, obj);
      if (current === 0 && i === 0) {
        current = obj[i];
      }
    }
    return current;
  } else {
    _.each(Object.keys(obj).reverse(), function(val) {
      current = callback(current, obj[val], val, obj);
    });
    var temp = current || ((obj.length === null) ? null : (obj.length || Object.keys(obj).length));
    return obj.length || temp;
  }
};

_.foldr = _.reduceRight;

_.findLastIndex = function(obj, callback, context) {
  if (obj === undefined || obj === null) return -1;
  if (Array.isArray(obj)) {
    let result = _.findIndex(obj.slice().reverse(), callback, context);
    return (result === -1) ? -1 : obj.length - 1 - result;
  } else {
    Object.keys(obj).forEach(function(key) {
      callback(obj[key], key);
    });
  }
};

_.mapObject = function(obj, cb, init) {
  [obj, cb, init] = fixOOArgs(this, arguments);
  if (obj === null) return [];
  let callback = _.iteratee(cb);
  let result = {};
  _.each(obj, function(val, key, obj) {
    result[key] = callback(val, key, obj);
  });
  return result;
};

_.findKey = function(obj, cb, init) {
  var current = init || 0;
  let callback = _.iteratee(cb);
  callback = callback || function(memo, num) {
    return memo + num;
  };

  for (let i = current, length = obj.length; i < length; i++) {
    if (callback(obj[i], i, obj)) return i.toString();
  }
};

_.pick = function(obj, ...cb) {
  let result = {};
  if (_.isUndefined(obj) || _.isNull(obj)) return result;
  cb = _.flatten(cb);
  let context, callback;
  if (typeof cb[0] === 'function') {
    context = cb[1];
    callback = _.iteratee(cb[0]);
    _.each(obj, function(val, key) {
      if (callback.call(context, val, key, obj)) result[key] = val;
    });
  } else {
    _.each(cb, function(key) {
      let val = obj[key];
      if (val !== undefined) result[key] = val;
    });
  }
  return result;
};

_.has = _.hasOwnProperty;

_.omit = function(obj, ...cb) {
  let result = _.extend({}, obj);
  if (_.isUndefined(obj) || _.isNull(obj)) return result;
  cb = _.flatten(cb);
  let context, callback;
  if (typeof cb[0] === 'function') {
    context = cb[1];
    callback = _.iteratee(cb[0]);
    _.each(obj, function(val, key) {
      if (callback.call(context, val, key, obj)) delete result[key];
    });
  } else {
    _.each(cb, function(key) {
      delete result[key];
    });
  }
  return result;
};

_.isElement = function(node) {
  return node.nodeType === Node.ELEMENT_NODE;
};

//******Collection module ends*********//
//*********Arrays module starts*********//

var fixOOArgs = function(thisArg, otherArgs) {
  if (thisArg.obj !== undefined) {
    otherArgs[3] = otherArgs[2];
    otherArgs[2] = otherArgs[1];
    otherArgs[1] = otherArgs[0];
    otherArgs[0] = thisArg.obj;
  }
  return _.toArray(otherArgs);
};

_.first = function(array, n) {
  [array, n] = fixOOArgs(this, arguments);
  if (array === undefined || array === null || array.length === 0) {
    return void 0;
  }
  if (n === undefined) n = 1;
  if (n <= 0) return [];
  if (n === 1) return array[0];
  return array.slice(0, n);
};

_.head = _.first;
_.take = _.first;

_.rest = function(array, n) {
  [array, n] = fixOOArgs(this, arguments);
  array = _.toArray(array);
  if (n === 0) return array;
  n = n || 1;
  return array.slice(n);
};

_.tail = _.rest;
_.drop = _.rest;

_.initial = function(array, n) {
  [array, n] = fixOOArgs(this, arguments);
  array = _.toArray(array);
  n = n || 1;
  var sliceEnd = array.length < n ? 0 : array.length - n;
  return array.slice(0, sliceEnd);
};

_.last = function(array, n) {
  [array, n] = fixOOArgs(this, arguments);
  if (array === undefined || array === null || array.length === 0) {
    return void 0;
  }
  array = _.toArray(array);
  if (n <= 0) return [];
  n = n || 1;
  if (n === 1) return array[array.length - 1];
  if (array.length < n) return array;
  return array.slice(array.length - n);
};

_.compact = function(array) {
  [array] = fixOOArgs(this, arguments);
  array = _.toArray(array);
  return _.reject(array, _.isFalse);
};

function pushArray(result, val) {
  _.each(val, function(val1) {
    result.push(val1);
  });
}

_.flatten = function(array, shallow) {
  if (shallow === undefined) shallow = false;
  var result = [];
  _.each(array, function(val) {
    if (!_.isArray(val)) result.push(val);
    else if (shallow) pushArray(result, val);
    else {
      var res = _.flatten(val, false);
      pushArray(result, res);
    }
  });
  return result;
};

_.without = function(array, ...values) {
  if (typeof array.callee === 'function') array = _.toArray(array);
  var newArray = array.concat();
  _.each(values, function(value) {
    while (true) {
      var idx = newArray.indexOf(value);
      if (idx === -1) break;
      newArray.splice(idx, 1);
    }
  });
  return newArray;
};

_.sortedIndex = function(array, value, pred, context) {
  let predicate = _.iteratee(pred);
  let toSearch = predicate.bind(context)(value);
  for (let i = 0, length = array.length; i < length; i++) {
    let currentResult = predicate.bind(context)(array[i]);
    if (toSearch <= currentResult) {
      return i;
    }
  }
  return array.length;
};

_.uniq = function(array, isSorted, pred, context) {
  if (typeof isSorted !== 'boolean') {
    context = pred;
    pred = isSorted;
    isSorted = false;
  }
  let predicate = _.iteratee(pred);
  let mappedArray = _.map(array, predicate, context);
  let newArray = [];
  _.each(mappedArray, function(val, index) {
    if (mappedArray.indexOf(val) === index) newArray.push(array[index]);
  });
  return newArray;
};

_.unique = _.uniq;

_.intersection = function(arrays) {
  let args = _.toArray(arguments);
  if (args[0] !== null && typeof args[0].callee === 'function') args[0] = _.toArray(args[0]);
  if (this.obj !== undefined) args = [this.obj, ...args];
  if (_.some(args, function(val) {
    return val === null;
  })) return [];
  var intersection = [];
  _.each(args[0], function(val) {
    var foundInAll = args.every(function(otherArray) {
      return otherArray.indexOf(val) !== -1;
    });
    if (foundInAll) intersection.push(val);
  });
  return _.uniq(intersection);
};

_.union = function(arrays) {
  let args = _.toArray(arguments);
  if (args[0] !== null && typeof args[0].callee === 'function') args[0] = _.toArray(args[0]);
  if (this.obj !== undefined) args = [this.obj, ...args];
  let union = [];
  _.each(args, function(array) {
    _.each(array, function(val) {
      if (union.indexOf(val) === -1) union.push(val);
    });
  });
  return union;
};

_.difference = function(array, ...others) {
  if (this.obj !== undefined) {
    others = [array, ...others];
    array = this.obj;
  }
  if (array !== null && typeof array.callee === 'function') array = _.toArray(array);
  let result = [];
  _.each(array, function(val) {
    if (!_.any(others, function(other) {
      return _.isArray(other) ? other.indexOf(val) !== -1 : false;
    })) {
      result.push(val);
    }
  });
  return result;
};

_.zip = function(...arrays) {
  let result = [];
  if (arrays === undefined || arrays.length === 0 || _.any(arrays, _.isNull)) return [];
  let maxArrayLength = _.max(arrays, 'length').length;
  for (let i = 0; i < maxArrayLength; i++) {
    let tempArray = [];
    _.each(arrays, function(array) {
      tempArray.push(array[i]);
    });
    result.push(tempArray);
  }
  return result;
};

_.unzip = function(arrays) {
  let result = [];
  if (arrays === undefined || _.isNull(arrays) || arrays.length === 0) return [];
  for (let i = 0, length = arrays[0].length; i < length; i++) {
    let tempArray = [];
    _.each(arrays, function(array) {
      tempArray.push(array[i]);
    });
    result.push(tempArray);
  }
  return result;
};

_.object = function(list, values) {
  var result = {};
  if (values === undefined) {
    _.each(list, function(pair) {
      result[pair[0]] = pair[1];
    });
  } else {
    for (let i = 0, length = list.length; i < length; i++) {
      result[list[i]] = values[i];
    }
  }
  return result;
};

_.pairs = function(obj) {
  let result = [];
  _.each(obj, function(val, key) {
    result.push([key, val]);
  });
  return result;
};

_.indexOf = function(array, val, fromIndex) {
  if (!Boolean(array) || array.length === 0) return -1;
  if (typeof  array.callee === 'function') array = _.toArray(array);
  if (typeof  fromIndex === 'boolean') fromIndex = undefined;
  if (isNaN(val)) {
    return _.findIndex(array, value => isNaN(value));
  }
  return array.indexOf(val, fromIndex);
};

_.lastIndexOf = function(array, val, fromIndex) {
  if (!Boolean(array) || array.length === 0) return -1;
  if (typeof  array.callee === 'function') array = _.toArray(array);
  if (fromIndex === undefined || typeof  fromIndex === 'boolean') {
    fromIndex = -1;
  }
  if (!Boolean(fromIndex) && !(fromIndex === 0) && !isNaN(fromIndex)) {
    fromIndex = -1;
  }
  if (typeof fromIndex !== 'number') fromIndex = -1;
  if (val !== undefined && isNaN(val)) {
    return _.findLastIndex(array, value => isNaN(value));
  }
  return Array.prototype.lastIndexOf.call(array, val, fromIndex);
};

_.chunk = function(array, size) {
  if (size === undefined || array.length === 0 || size <= 0) return [];
  let result = [];
  let newArray = array.concat();
  while (newArray.length > 0) {
    result.push(newArray.splice(0, size));
  }
  return result;
};

//*********Arrays module ends*********//
//*********Functions module starts*********//

_.bind = function(fun, context, ...extraArgs) {
  [fun, context] = fixOOArgs(this, arguments);
  if (typeof fun !== 'function') {
    throw new TypeError();
  }
  let result = function(...someMoreArgs) {
    return fun.call(this, ...extraArgs, ...someMoreArgs);
  }.bind(context);
  return result;
};

_.partial = function(func, ...args) {
  return function(...someMoreArgs) {
    let argsTemp = args.concat();
    let ph = _.partial.placeholder || _;
    while (argsTemp.indexOf(ph) !== -1) {
      argsTemp[argsTemp.indexOf(ph)] = someMoreArgs.splice(0, 1)[0];
    }
    let result = func.bind(this)(...argsTemp, ...someMoreArgs);
    return result;
  };
};

_.bindAll = function(obj, ...methods) {
  if (methods.length === 0) throw  new Error();
  _.each(methods, function(method) {
    obj[method] = obj[method].bind(obj);
  });
};

_.memoize = function(func, hashFunction) {
  if (hashFunction === undefined) hashFunction = _.identity;
  let result = function(...args) {
    result.cache = result.cache || {};
    let hash = hashFunction(...args);
    if (!_.hasOwnProperty(result.cache, hash)) {
      let currentResult = func(...args);
      result.cache[hash] = currentResult;
    }
    return result.cache[hash];
  };
  return result;
};

_.delay = function(func, delay, ...args) {
  setTimeout(() => func(...args), delay);
};

_.defer = function(func, ...args) {
  setTimeout(() => func(...args), 0);
};

_.throttle = function(func, wait, opts) {
  let pending = 0;
  let lastResult;
  let leading = true;
  let trailing = true;
  if (opts !== undefined && opts.leading !== undefined) leading = opts.leading;
  if (opts !== undefined && opts.trailing !== undefined) trailing = opts.trailing;
  let argx;
  let initDone = false;

  function handler() {
    if (pending !== 0) {
      clearInterval(intervalChecker);
      lastResult = func(...argx);
      pending = Math.max(0, pending - 1);
    } else {
      clearInterval(interval);
      intervalChecker = setInterval(() => {
        if (pending !== 0) {
          lastResult = func(...argx);
          pending--;
          interval = setInterval(handler, wait);
        }
      }, 5);
    }
  };
  let interval = undefined;
  let intervalChecker = undefined;
  return function xx(...args) {
    argx = args;
    if (!initDone && leading) {
      lastResult = func(...argx);
      initDone = true;
      interval = setInterval(handler, wait);
    } else {
      pending++;
    }
    return lastResult;
  };
};

_.debounce = function(func, wait, immediate) {
  let lastRun = 0;
  immediate = immediate || false;
  let lastResult;
  let cancel = false;

  function f() {
    if (cancel) return lastResult;
    if (immediate) {
      lastRun = new Date();
      immediate = false;
      lastResult = func();
    } else {
      if (new Date() - lastRun > wait) {
        lastRun = new Date();
        lastResult = func();
      }
    }
    return lastResult;
  }

  f.cancel = function() {
    cancel = true;
  };
  return f;
};

_.once = function(func) {
  let done = false;
  let result;
  return function() {
    if (!done) {
      done = true;
      result = func();
    }
    return result;
  };
};

_.wrap = function(func, wrapper) {
  return function(...args) {
    return wrapper.bind(this)(func, ...args);
  };
};

_.negate = function(predicate) {
  return function(...args) {
    return !predicate(...args);
  };
};

_.compose = function(...functions) {
  return function(...args) {
    let maxIdx = functions.length - 1;
    var result = functions[maxIdx](...args);
    for (let i = maxIdx - 1; i >= 0; i--) {
      result = functions[i](result);
    }
    return result;
  };
};

_.after = function(count, func) {
  let currentCount = 0;
  return function() {
    if (currentCount < count) currentCount++;
    if (currentCount === count) {
      currentCount = 0;
      return func();
    }
  };
};

_.before = function(count, func) {
  let currentCount = 0;
  let result;
  return function() {
    currentCount++;
    if (currentCount < count) {
      result = func.bind(this)();
    } else {
      return result;
    }
  };
};

_.iteratee = function(value, context) {
  if (value === undefined) return _.identity;
  else if (typeof value === 'function') return value;
  else if (_.isArray(value)) return obj => {
    let result = obj;
    _.each(value, key => result = result[key]);
    return result;
  };
  else if (typeof value === 'number' || typeof value === 'string') return obj => obj[value];
};

_.isRegExp = function(val) {
  return val.constructor.toString().startsWith('function RegExp()');
};

_.restArgs = function(func, startIndex) {
  return function(...args) {
    let newArgs = [];
    if (startIndex === undefined) startIndex = func.length;
    for (let i = 1; i < startIndex; i++) {
      newArgs.push(args.splice(0, 1)[0]);
    }
    newArgs.push(args);
    return func.bind(this)(...newArgs);
  };
};

//*********Functions module ends*********//
//*********Objects module starts*********//

_.keys = function(obj) {
  let type = typeof obj;
  if (obj === null || type === 'undefined' || type === 'boolean' || type === 'string' || type === 'number') return [];
  return Object.keys(obj);
};

_.allKeys = function(obj) {
  let type = typeof obj;
  if (obj === null || type === 'undefined' || type === 'boolean' || type === 'string' || type === 'number') return [];
  let result = [];
  let tmpObj = obj;
  while (tmpObj !== null) {
    result.push(...Object.keys(tmpObj));
    tmpObj = tmpObj.__proto__;
  }
  return result;
};

_.values = function(obj) {
  return Object.values(obj);
};

_.invert = function(obj) {
  let result = {};
  _.each(_.pairs(obj), function(keyVal) {
    result[keyVal[1]] = keyVal[0];
  });
  return result;
};

_.functions = function(obj) {
  return _.filter(_.allKeys(obj), function(key) {
    return typeof obj[key] === 'function';
  });
};

_.methods = _.functions;

_.extend = function(destination, ...sources) {
  if (_.isNull(destination) || _.isUndefined(destination)) return destination;
  _.each(sources, function(source) {
    _.each(_.allKeys(source), function(key) {
      destination[key] = source[key];
    });
  });
  return destination;
};

_.extendOwn = function(destination, ...sources) {
  if (_.isNull(destination) || _.isUndefined(destination)) return destination;
  Object.assign(destination, ...sources);
  return destination;
};

_.assign = _.extendOwn;

_.defaults = function(obj, ...defaults) {
  if (_.isUndefined(obj) || _.isNull(obj)) obj = defaults.splice(0, 1)[0];
  _.each(defaults, function(def) {
    _.each(def, function(val, key) {
      if (obj[key] === undefined) obj[key] = val;
    });
  });
  return obj;
};

_.isNaN = function(val) {
  return val !== undefined && isNaN(val);
};

_.clone = function(obj) {
  if (_.isUndefined(obj) || _.isNull(obj) || !_.isObject(obj)) return obj;
  return _.extendOwn({}, obj);
};

_.create = function(proto, props) {
  if (_.isArray(proto)) return proto.concat();
  if (_.isUndefined(proto) || _.isNull(proto) || !_.isObject(proto)) return {};
  let result = Object.create(proto);
  return _.assign(result, props);
};

_.isEqual = function(obj, other) {
  let r1 = Object.is(obj, other);
  if (_.isNull(obj) || _.isNull(other)) return r1;
  if (_.isUndefined(obj) || _.isUndefined(other)) return r1;

  function isAny(obj1, obj2, constructor) {
    let o1c = obj1.constructor.name === constructor;
    let o2c = obj2.constructor.name === constructor;
    return o1c || o2c;
  }

  function isAll(obj1, obj2, constructor) {
    let o1c = obj1.constructor.name === constructor;
    let o2c = obj2.constructor.name === constructor;
    return o1c && o2c;
  }

  let any = _.partial(isAny, obj, other);
  let all = _.partial(isAll, obj, other);
  if (any('Number')) {
    return all('Number') && Object.is(obj.valueOf(), other.valueOf());
  }
  if (any('Boolean')) {
    return all('Boolean') && Object.is(obj.valueOf(), other.valueOf());
  }
  if (any('Date')) {
    return all('Date') && obj.valueOf() === other.valueOf();
  }
  if (any('RegExp')) {
    return all('RegExp') && obj.toString() === other.toString();
  }
  if (any('Array')) {
    return all('Array') && obj === other;
  }
  let r2 = false;
  let type = typeof obj;
  let ifAnyString = type === 'string' || typeof  other === 'string';
  let ifAny = ifAnyString;
  if (ifAny || (!_.isNull(obj) && !_.isUndefined(obj) && type === 'object')) {
    r2 = _.every(obj, function(val, key) {
      return other[key] === val;
    });
  }
  return r1 || r2;
};
//*********Objects module ends*********//
