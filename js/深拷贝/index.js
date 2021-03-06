function deepClone (obj, map = new Map()) {
  if (typeof obj !== 'object') return obj
  if (obj === null) return null
  if (obj instanceof RegExp) return RegExp(obj)
  if (obj instanceof Date) return new Date(obj)

  if (map.get(obj)) {
    return obj
  }
  var newObj = new obj.__proto__.constructor;
  map.set(obj, newObj)
  for (var key in obj) {
    newObj[key] = deepClone(obj[key], map)
  }
  return newObj
}



var a = [1,2,3]
var b  = deepClone(a)
console.log(a === b)


// number string object null undefined  boolean

// object -> function date regexp date