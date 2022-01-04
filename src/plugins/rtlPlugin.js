import config from '../utils/config'
import { merge } from '../utils/helpers'
import { registerInstanceProgrammatic } from '../utils/plugins'

const RtlPlugin = {
  install (Vue, options = {}) {
    merge(config, options, { targetField: 'rtl' })

    const rtl = new Vue({
      data () {
        return {
          isRtl: false
        }
      },
      created () {
        this.$isCssLoaded = false
      },
      methods: {
        enable () {
          this.isRtl = true
          this._setDirAttribute('rtl')
          this._toggle(true)
        },
        disable () {
          this.isRtl = false
          this._setDirAttribute('ltr')
          this._toggle(false)
        },
        _setDirAttribute (value) {
          const html = document.documentElement
          html.setAttribute('dir', value)
        },
        _toggle (value) {
          const { cssPath } = config.rtl

          if (!this.$isCssLoaded && value === true) {
            this._loadCss(cssPath)
            this.$isCssLoaded = true
          }
          for (const styleSheet of document.styleSheets) {
            const { href } = styleSheet
            const filename = cssPath.substring(cssPath.lastIndexOf('/') + 1)
            if (href && href.endsWith(filename)) {
              styleSheet.disabled = !value
              break
            }
          }
        },
        _loadCss (href) {
          const tag = document.createElement('link')
          tag.setAttribute('href', href)
          tag.setAttribute('rel', 'stylesheet')
          document.head.appendChild(tag)
        }
      }
    })

    registerInstanceProgrammatic(Vue, 'rtl', rtl)
  }
}

export default RtlPlugin
