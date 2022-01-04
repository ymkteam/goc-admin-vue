import 'bootstrap'
import {
  BContainer,
  BRow,
  BCol,
  BFormRow,
  BFormGroup,
  BTabs,
  BTab
} from 'bootstrap-vue'

import { GButton } from '../button'
import { GCard } from '../card'
import { GForm } from '../form'
import { GInput } from '../input'
import ModalPlugin, { ModalProgrammatic, GModal } from '../modal'
import { GPage } from '../page'
import { GSelect, GSelectGroup } from '../select'

import {
  registerPlugins,
  registerComponent,
  registerComponents,
  registerInstanceProgrammatic
} from '../../utils/plugins'

import { generateId } from '../utils'

import config from '../../utils/config'
import { merge } from '../../utils/helpers'

import ValidatePlugin from '../../plugins/validatePlugin'

const CoreComponentsPlugin = {
  install (Vue, options = {}) {
    // Options
    merge(config, options, { deep: true })

    // Mixin
    Vue.mixin({
      methods: {
        generateId
      }
    })

    // Config component
    registerInstanceProgrammatic(Vue, 'config', config)

    registerPlugins(Vue, { ValidatePlugin, ModalPlugin })

    registerComponent(Vue, 'GContainer', BContainer)
    registerComponent(Vue, 'GRow', BRow)
    registerComponent(Vue, 'GCol', BCol)
    registerComponent(Vue, 'GFormRow', BFormRow)
    registerComponent(Vue, 'GFormGroup', BFormGroup)
    registerComponent(Vue, 'GTabs', BTabs)
    registerComponent(Vue, 'GTab', BTab)

    registerComponents(Vue, {
      GButton,
      GCard,
      GForm,
      GInput,
      GPage,
      GSelect,
      GSelectGroup
    })
  }
}

export default CoreComponentsPlugin

export {
  BContainer as GContainer,
  BRow as GRow,
  BCol as GCol,
  BFormRow as GFormRow,
  BFormGroup as GFormGroup,
  BTabs as GTabs,
  BTab as GTab,
  GButton,
  GCard,
  GForm,
  GInput,
  ModalProgrammatic,
  GModal,
  GPage,
  GSelect,
  GSelectGroup
}
