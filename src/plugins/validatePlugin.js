import {
  ValidationObserver,
  ValidationProvider,
  extend,
  configure,
  setInteractionMode
} from 'vee-validate'

import {
  required,
  email,
  min,
  max,
  confirmed,
  length,
  integer
} from 'vee-validate/dist/rules'
import config from '../utils/config'
import { merge } from '../utils/helpers'
import { getDate } from '../services/date.service'
import { registerComponent } from '../utils/plugins'

const ValidatePlugin = {
  install (Vue, options = {}) {
    merge(config, options, { targetField: 'validate' })

    const { messages, interactionMode } = config.validate

    setInteractionMode(interactionMode)

    configure({
      defaultMessage: (field, values) => {
        return messages[values._rule_]
      }
    })

    extendRules({ required, email, min, max, confirmed, length, integer })

    extend('date_after', (value, params) => {
      const date = params[0]
      if (new Date(value) >= new Date(date)) {
        return true
      } else {
        return messages.date_after.replace('{date}', getDate(date))
      }
    })
    extend('password', {
      params: ['target'],
      validate (value, { target }) {
        return value === target
      },
      message: messages.password
    })

    registerComponent(Vue, 'ValidationObserver', ValidationObserver)
    registerComponent(Vue, 'ValidationProvider', ValidationProvider)
  }
}

export default ValidatePlugin

const extendRules = rules => {
  for (const rule in rules) {
    extend(rule, rules[rule])
  }
}
