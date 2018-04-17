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
      callback(array[key], key, context);
    });
  }
  return array;
};

_.times = function() {

};

_.include = function(arr, num) {
  return arr.indexOf(num) > -1;
};

_.forEach = _.each;
_.constant = function(val) {
  function constant() {
    return val;
  }

  return constant();
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

_.filter = function(obj, callback) {
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

_.find = function(obj, callback) {
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

_.some = function(obj, callback) {
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

_.every = function(obj, callback) {
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

_.max = function(obj, callback) {
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

_.reject = function(obj, callback) {
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

_.reduce = function(obj, callback, init) {
  var current = init || 0;
  callback = callback || function(memo, num) {
    return memo + num;
  };
  if (Array.isArray(obj)) {
    for (var i = 0, length = obj.length; i < length; i++) {
      callback(current, obj[i], i, obj);
    }
    return current;
  } else {
    _.each(obj, function(val, idx, arr) {
      callback(current, val, idx, arr);
    });
    return obj.length === null ? null : obj.length || Object.keys(obj).length;
  }
};

_.reduceRight = function(obj, callback, init) {
  var current = init || 0;
  callback = callback || function(memo, num) {
    return memo + num;
  };
  if (Array.isArray(obj)) {
    for (var i = 0, length = obj.length; i < length; i++) {
      callback(current, obj[i], i, obj);
    }
    return current;
  } else {
    _.each(obj, function(val, idx, arr) {
      callback(current, val, idx, arr);
    });
    return obj.length === null ? null : obj.length || Object.keys(obj).length;
  }
};

_.findIndex = function(obj, callback) {
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
