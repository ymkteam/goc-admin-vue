import toastr from 'toastr'
import { merge } from '../utils/helpers'
import config from '../utils/config'
import { registerInstanceProgrammatic } from '../utils/plugins'

const NotificationPlugin = {
  install (Vue, options = {}) {
    merge(config, options, { targetField: 'notification' })

    toastr.options = { ...toastr.options, ...config.notification }

    registerInstanceProgrammatic(Vue, 'notification', Toastr)
  }
}

export default NotificationPlugin

const Toastr = {
  info: (message, config) => {
    toastr.options = Object.assign(toastr.options, config)
    toastr.info(message, config)
  },
  success: (message, config) => {
    toastr.options = Object.assign(toastr.options, config)
    toastr.success(message)
  },
  error: (message, config) => {
    toastr.options = Object.assign(toastr.options, config)
    toastr.error(message)
  },
  warning: (message, config) => {
    toastr.options = Object.assign(toastr.options, config)
    toastr.warning(message)
  }
}
