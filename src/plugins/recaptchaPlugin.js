import config from '../utils/config'
import { merge } from '../utils/helpers'
import { VueReCaptcha } from 'vue-recaptcha-v3'
import { registerPlugin } from '../utils/plugins'

const RecaptchaPlugin = {
  install (Vue, options = {}) {
    merge(config, options, { targetField: 'recaptcha' })

    registerPlugin(Vue, VueReCaptcha, config)
  }
}

export default RecaptchaPlugin
