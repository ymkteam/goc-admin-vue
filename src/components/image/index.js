import { BImg, BImgLazy } from 'bootstrap-vue'

import { registerComponent } from '../../utils/plugins'

const ImagePlugin = {
  install (Vue) {
    registerComponent(Vue, 'FImg', BImg)
    registerComponent(Vue, 'FImgLazy', BImgLazy)
  }
}

export default ImagePlugin

export { BImg as FImg, BImgLazy as FImgLazy }
