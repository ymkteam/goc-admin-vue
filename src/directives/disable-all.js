import config from '../utils/config'
import { merge } from '../utils/helpers'
import { registerDirective } from '../utils/plugins'

const DisableAllDirectivePlugin = {
  install (Vue, options = {}) {
    merge(config, options, { targetField: 'disableAll' })

    registerDirective(Vue, 'disable-all', disableAllDirective)
  }
}

export default DisableAllDirectivePlugin

const disableAllDirective = (el, binding) => {
  const tags = config.disableAll.tags
  tags.forEach(tagName => {
    const nodes = el.getElementsByTagName(tagName)
    for (let i = 0; i < nodes.length; i++) {
      const element = nodes[i]
      if (
        binding.value.disabledIds &&
        binding.value.disabledIds.includes(element.id)
      ) {
        element.disabled = true
      } else if (
        !binding.value.excludedIds ||
        !binding.value.excludedIds.includes(element.id)
      ) {
        element.disabled = binding.value.disabled
      }
    }
  })
}
