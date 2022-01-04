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

import { FButton } from '../button'
import { FCard } from '../card'
import { FForm } from '../form'
import { FInput } from '../input'
import ModalPlugin, { ModalProgrammatic, FModal } from '../modal'
import { FPage } from '../page'
import { FSelect, FSelectGroup } from '../select'

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

    registerComponent(Vue, 'FContainer', BContainer)
    registerComponent(Vue, 'FRow', BRow)
    registerComponent(Vue, 'FCol', BCol)
    registerComponent(Vue, 'FFormRow', BFormRow)
    registerComponent(Vue, 'FFormGroup', BFormGroup)
    registerComponent(Vue, 'FTabs', BTabs)
    registerComponent(Vue, 'FTab', BTab)

    registerComponents(Vue, {
      FButton,
      FCard,
      FForm,
      FInput,
      FPage,
      FSelect,
      FSelectGroup
    })
  }
}

export default CoreComponentsPlugin

export {
  BContainer as FContainer,
  BRow as FRow,
  BCol as FCol,
  BFormRow as FFormRow,
  BFormGroup as FFormGroup,
  BTabs as FTabs,
  BTab as FTab,
  FButton,
  FCard,
  FForm,
  FInput,
  ModalProgrammatic,
  FModal,
  FPage,
  FSelect,
  FSelectGroup
}
