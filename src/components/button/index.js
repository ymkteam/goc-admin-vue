import Button from './Button'

import { registerComponents } from '../../utils/plugins'

const ButtonPlugin = {
  install (Vue) {
    registerComponents(Vue, { Button })
  }
}

export default ButtonPlugin

export { Button as GButton }
