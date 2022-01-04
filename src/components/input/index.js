import Input from './Input'

import { registerComponents } from '../../utils/plugins'

const InputPlugin = {
  install (Vue) {
    registerComponents(Vue, { Input })
  }
}

export default InputPlugin

export { Input as GInput }
