import Page from './Page'

import { registerComponents } from '../../utils/plugins'

const PagePlugin = {
  install (Vue) {
    registerComponents(Vue, { Page })
  }
}

export default PagePlugin

export { Page as FPage }
