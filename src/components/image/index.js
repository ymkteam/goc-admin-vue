import { BImg, BImgLazy } from 'bootstrap-vue'

import { registerComponent } from '../../utils/plugins'

const ImagePlugin = {
  install (Vue) {
    registerComponent(Vue, 'GImg', BImg)
    registerComponent(Vue, 'GImgLazy', BImgLazy)
  }
}

export default ImagePlugin

export { BImg as GImg, BImgLazy as GImgLazy }
