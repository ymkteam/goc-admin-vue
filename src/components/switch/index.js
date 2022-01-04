import Switch from './Switch'

import { registerComponents } from '../../utils/plugins'

const SwitchPlugin = {
  install (Vue) {
    registerComponents(Vue, { Switch })
  }
}

export default SwitchPlugin

export { Switch as GSwitch }
