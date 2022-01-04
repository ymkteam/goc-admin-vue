import Wizard from './Wizard'

import { registerComponents } from '../../utils/plugins'

const WizardPlugin = {
  install (Vue) {
    registerComponents(Vue, { Wizard })
  }
}

export default WizardPlugin

export { Wizard as GWizard }
