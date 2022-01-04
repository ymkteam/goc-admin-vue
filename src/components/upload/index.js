import Upload from './Upload'

import config from '../../utils/config'
import { merge } from '../../utils/helpers'
import { registerComponents } from '../../utils/plugins'

const UploadPlugin = {
  install (Vue, options = {}) {
    merge(config, options, { targetField: 'upload' })

    registerComponents(Vue, { Upload })
  }
}

export default UploadPlugin

export { Upload as GUpload }
