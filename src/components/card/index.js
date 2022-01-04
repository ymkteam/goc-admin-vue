import Card from './Card'

import { registerComponents } from '../../utils/plugins'

const CardPlugin = {
  install (Vue) {
    registerComponents(Vue, { Card })
  }
}

export default CardPlugin

export { Card as FCard }
