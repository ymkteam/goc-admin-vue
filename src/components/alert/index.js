import Alert from './Alert'

import { registerComponents } from '../../utils/plugins'

const AlertPlugin = {
  install (Vue) {
    registerComponents(Vue, { Alert })
  }
}

export default AlertPlugin

export { Alert as FAlert }
