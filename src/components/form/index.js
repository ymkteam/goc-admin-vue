import Form from './Form'

import { registerComponents } from '../../utils/plugins'

const FormPlugin = {
  install (Vue) {
    registerComponents(Vue, { Form })
  }
}

export default FormPlugin

export { Form as FForm }
