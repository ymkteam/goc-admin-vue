import Modal from './Modal'
import { BModal } from 'bootstrap-vue'

import {
  registerComponents,
  registerInstanceProgrammatic
} from '../../utils/plugins'
import { merge } from '../../utils/helpers'

let localVueInstance

function open (message, propsData) {
  let slot

  if (message) {
    slot = message
  }

  const vm = localVueInstance

  const ModalComponent = vm.extend(BModal)

  const component = new ModalComponent({
    el: document.createElement('div'),
    propsData
  })

  if (slot) {
    component.$slots.default = slot
    component.show()
  }

  return new Promise(resolve => {
    component.$on('ok', event => resolve(event || true))
    component.$on('cancel', () => resolve(false))
  })
}

const ModalProgrammatic = {
  async alert (message, params) {
    const defaultParam = {
      okOnly: true,
      okDisabled: false,
      hideFooter: false,
      hideHeader: true
    }
    const propsData = merge(defaultParam, params)
    return open(message, propsData)
  },
  async confirm (message, params) {
    const defaultParam = {
      okOnly: false,
      okDisabled: false,
      cancelDisabled: false,
      hideFooter: false,
      hideHeader: true
    }
    const propsData = merge(defaultParam, params)
    return open(message, propsData)
  }
}

const ModalPlugin = {
  install (Vue) {
    localVueInstance = Vue
    registerComponents(Vue, { Modal })
    registerInstanceProgrammatic(Vue, 'modal', ModalProgrammatic)
  }
}

export default ModalPlugin

export { ModalProgrammatic, Modal as FModal }
