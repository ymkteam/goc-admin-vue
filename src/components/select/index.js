import Select from './Select'
import SelectGroup from './SelectGroup'

import { registerComponents } from '../../utils/plugins'

const SelectPlugin = {
  install (Vue) {
    registerComponents(Vue, { Select, SelectGroup })
  }
}

export default SelectPlugin

export { Select as GSelect, SelectGroup as GSelectGroup }
