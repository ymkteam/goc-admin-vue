import * as componentsPlugins from './components'
import * as directivesPlugins from './directives'
import {
  ValidatePlugin,
  JwtPlugin,
  ProgressPlugin,
  NotificationPlugin,
  ApiPlugin,
  FirebasePlugin,
  RecaptchaPlugin
} from './plugins'

import { merge } from './utils/helpers'
import config from './utils/config'
import { registerPlugins } from './utils/plugins'

const GocAdmin = {
  install (Vue, options = {}) {
    merge(config, options, { deep: true })

    // Components Plugins
    registerPlugins(Vue, componentsPlugins)

    // Directives Plugins
    registerPlugins(Vue, directivesPlugins)

    if (options.validate) {
      Vue.use(ValidatePlugin)
    }
    if (options.jwt) {
      Vue.use(JwtPlugin)
    }
    if (options.progress) {
      Vue.use(ProgressPlugin)
    }
    if (options.notification) {
      Vue.use(NotificationPlugin)
    }
    if (options.api) {
      Vue.use(ApiPlugin)
    }
    if (options.firebase) {
      Vue.use(FirebasePlugin)
    }
    if (options.recaptcha) {
      Vue.use(RecaptchaPlugin)
    }
  }
}

export default GocAdmin

// export all components as vue plugin
export * from './components'

// export all plugins as vue plugin
export * from './plugins'

// export all directives as vue plugin
export * from './directives'
