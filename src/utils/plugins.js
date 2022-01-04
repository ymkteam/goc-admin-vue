export const registerComponents = (Vue, components = {}) => {
  for (const component in components) {
    registerComponent(Vue, components[component].name, components[component])
  }
}

export const registerComponent = (Vue, name, def) => {
  if (Vue && name && def) {
    Vue.component(name, def)
  }
}

export const registerInstanceProgrammatic = (Vue, property, component) => {
  if (!Vue.prototype.$flex) Vue.prototype.$flex = {}
  Vue.prototype.$flex[property] = component
}

export const registerPlugins = (Vue, plugins = {}) => {
  for (const plugin in plugins) {
    if (plugin && plugins[plugin]) {
      registerPlugin(Vue, plugins[plugin])
    }
  }
}

export const registerPlugin = (Vue, plugin, config = {}) => {
  Vue.use(plugin, config)
}

export const registerInstance = (Vue, name, instance) => {
  Vue.prototype[name] = instance
}

export const registerDirective = (Vue, name, directive) => {
  Vue.directive(name, directive)
}
