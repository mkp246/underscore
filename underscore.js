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

_.times = function() {

};

_.forEach = _.each;
_.constant = function(val) {
  return function() {
    return val;
  };
};

_.size = function(obj) {
  return Object.keys(obj).length;
};

_.toArray = function(obj) {
  var arr = [];
  Object.keys(obj).forEach(function(key) {
    arr.push(obj[key]);
  });
  return arr;
};

_.shuffle = _.toArray;

_.sample = function(arr, len) {
  len = len || 1;
  if (len === 1) {
    return _.toArray(arr)[0];
  } else {
    return Array.prototype.slice.call(_.toArray(arr), 0, len + 1);
  }
};

_.map = function(obj, callback, context) {
  if (this.obj !== undefined) {
    callback = obj;
    context = callback;
    obj = this.obj;
  }
  if (obj === null) return [];
  var result = [];
  if (typeof callback === 'string') {
    _.each(obj, function(val) {
      result.push(val[callback]);
    });
    return result;
  }
  //array like objects {length :2, 0:'hello', 1:'world'}
  if (obj.length === Object.keys(obj).length - 1 || Array.isArray(obj)) {
    for (var i = 0, length = obj.length; i < length; i++) {
      result.push(callback.bind(context)(obj[i], i, obj));
    }
    return result;
  } else {
    Object.keys(obj).forEach(function(key) {
      callback(obj[key], key);
    });
  }
};

_.collect = _.map;

_.find = function(array, predicate) {
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

_.findIndex = function(obj, predicate, context) {
  if (Array.isArray(obj)) {
    return obj.findIndex(predicate.bind(context));
  } else {
    Object.keys(obj).find(function(key) {
      return callback.bind(context)(obj[key], key);
    });
  }
};

_.detect = _.find;

_.filter = function(obj, predicate, context) {
  if (this.obj !== undefined) {
    context = predicate;
    predicate = obj;
    obj = this.obj;
  }
  if (typeof predicate === 'string') {
    return _.filter(obj, function(val) {
      return Boolean(val[predicate]);
    });
  }
  if (typeof predicate === 'object') {
    return obj.filter(function(val) {
      return Object.keys(predicate).every(function(value) {
        return predicate[value] === val[value];
      });
    });
  }
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

_.reject = function(obj, predicate, context) {
  var result = [];
  if (typeof predicate === 'string') {
    return obj.filter(function(val) {
      return val[predicate] === undefined;
    });
  }
  if (typeof predicate === 'object') {
    return obj.filter(function(val) {
      return Object.keys(predicate).some(function(value) {
        return predicate[value] !== val[value];
      });
    });
  }
  if (Array.isArray(obj)) {
    for (var i = 0, length = obj.length; i < length; i++) {
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
_.every = function(obj, predicate, context) {
  if (typeof predicate === 'string') {
    return obj.every(function(value) {
      return Boolean(value[predicate]);
    });
  }
  if (typeof predicate === 'object') {
    return obj.every(function(value) {
      return Object.keys(predicate).every(function(key) {
        return value[key] === predicate[key];
      });
    });
  }
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

_.some = function(obj, predicate, context) {
  if (typeof predicate === 'string') {
    return obj.every(function(value) {
      return Boolean(value[predicate]);
    });
  }
  if (predicate === undefined) predicate = _.identity;
  if (typeof predicate === 'object') {
    return obj.some(function(value) {
      return Object.keys(predicate).every(function(key) {
        return value[key] === predicate[key];
      });
    });
  }
  if (Array.isArray(obj)) {
    for (var i = 0, length = obj.length; i < length; i++) {
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

_.partial = function(func, ...args) {
  return function(...someMoreArgs) {
    return func(...args, ...someMoreArgs);
  };
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

_.max = function(obj, callback) {
  if (!Boolean(obj)) return -Infinity;
  callback = callback || _.identity;
  if (Array.isArray(obj)) {
    for (var i = 0, length = obj.length; i < length; i++) {
      callback(obj[i], i, obj);
    }
  } else {
    Object.keys(obj).forEach(function(key) {
      callback(obj[key], key);
    });
  }
};
_.min = function(obj, callback) {
  if (Array.isArray(obj)) {
    for (var i = 0, length = obj.length; i < length; i++) {
      callback(obj[i], i, obj);
    }
  } else {
    Object.keys(obj).forEach(function(key) {
      callback(obj[key], key);
    });
  }
};

_.groupBy = function(obj, callback) {
  if (Array.isArray(obj)) {
    for (var i = 0, length = obj.length; i < length; i++) {
      callback(obj[i], i, obj);
    }
  } else {
    Object.keys(obj).forEach(function(key) {
      callback(obj[key], key);
    });
  }
};

_.countBy = function(obj, callback) {
  if (Array.isArray(obj)) {
    for (var i = 0, length = obj.length; i < length; i++) {
      callback(obj[i], i, obj);
    }
  } else {
    Object.keys(obj).forEach(function(key) {
      callback(obj[key], key);
    });
  }
};

_.partition = function(obj, callback) {
  if (Array.isArray(obj)) {
    for (var i = 0, length = obj.length; i < length; i++) {
      callback(obj[i], i, obj);
    }
  } else {
    Object.keys(obj).forEach(function(key) {
      callback(obj[key], key);
    });
  }
};

_.indexBy = function(obj, callback) {
  if (Array.isArray(obj)) {
    for (var i = 0, length = obj.length; i < length; i++) {
      callback(obj[i], i, obj);
    }
  } else {
    Object.keys(obj).forEach(function(key) {
      callback(obj[key], key);
    });
  }
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

_.keys = function(obj) {
  return Object.keys(obj);
};

_.findLastIndex = function(obj, callback) {
  if (Array.isArray(obj)) {
    for (var i = 0, length = obj.length; i < length; i++) {
      callback(obj[i], i, obj);
    }
  } else {
    Object.keys(obj).forEach(function(key) {
      callback(obj[key], key);
    });
  }
};

_.mapObject = function(obj, callback, init) {
  var current = init || 0;
  callback = callback || function(memo, num) {
    return memo + num;
  };
  _.each(obj, function(val, idx, arr) {
    callback(current, val, idx, arr);
  });
  return current;
};

_.findKey = function(obj, callback, init) {
  var current = init || 0;
  callback = callback || function(memo, num) {
    return memo + num;
  };
  _.each(obj, function(val, idx, arr) {
    callback(current, val, idx, arr);
  });
  return current;
};

_.pick = function(obj, callback, init) {
  var current = init || 0;
  callback = callback || function(memo, num) {
    return memo + num;
  };
  _.each(obj, function(val, idx, arr) {
    callback(current, val, idx, arr);
  });
  return current;
};

_.omit = function(obj, callback, init) {
  var current = init || 0;
  callback = callback || function(memo, num) {
    return memo + num;
  };
  _.each(obj, function(val, idx, arr) {
    callback(current, val, idx, arr);
  });
  return current;

};
