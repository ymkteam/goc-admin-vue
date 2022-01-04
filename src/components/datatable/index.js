import Datatable from './Datatable'

import config from '../../utils/config'
import { merge } from '../../utils/helpers'
import { registerComponents } from '../../utils/plugins'

const DatatablePlugin = {
  install (Vue, options = {}) {
    merge(config, options, { targetField: 'datatable' })

    registerComponents(Vue, { Datatable })
  }
}

export default DatatablePlugin

export { Datatable as FDatatable }
