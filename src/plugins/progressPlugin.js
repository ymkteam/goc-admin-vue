import NProgress from 'nprogress'
import config from '../utils/config'
import { merge } from '../utils/helpers'
import { registerInstanceProgrammatic } from '../utils/plugins'

const ProgressPlugin = {
  install (Vue, options = {}) {
    merge(config, options, { targetField: 'progress' })

    NProgress.configure({ showSpinner: config.progress.showSpinner })

    registerInstanceProgrammatic(Vue, 'progress', NProgress)
  }
}

export default ProgressPlugin
