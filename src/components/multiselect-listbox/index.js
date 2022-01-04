import MultiselectListbox from './MultiselectListbox'

import { registerComponents } from '../../utils/plugins'

const MultiselectListboxPlugin = {
  install (Vue) {
    registerComponents(Vue, { MultiselectListbox })
  }
}

export default MultiselectListboxPlugin

export { MultiselectListbox as FMultiselectListbox }
