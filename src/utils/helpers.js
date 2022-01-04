/**
 * Merge function to replace Object.assign with deep merging possibility
 */
const isObject = item => typeof item === 'object' && !Array.isArray(item)
const mergeFn = (target, source, opt) => {
  const defaultOpt = { deep: false }

  if (opt) {
    Object.assign(defaultOpt, opt)
  }

  opt = defaultOpt

  if (opt.targetField) {
    source = { [opt.targetField]: source }
    opt.deep = true
  }

  if (opt.deep || !Object.assign) {
    const isDeep = prop =>
      isObject(source[prop]) &&
      target !== null &&
      Object.prototype.hasOwnProperty.call(target, prop) &&
      isObject(target[prop])

    const replaced = Object.getOwnPropertyNames(source)
      .map(prop => ({
        [prop]: isDeep(prop)
          ? mergeFn(target[prop], source[prop], opt.deep)
          : source[prop]
      }))
      .reduce((a, b) => ({ ...a, ...b }), {})

    return {
      ...target,
      ...replaced
    }
  } else {
    return Object.assign(target, source)
  }
}
export const merge = (target, source, opt) => {
  target = mergeFn(target, source, opt)
  return target
}
