<!-- <p align="center">
    <a href="">
        <img src="" width="500" />
    </a>
</p> -->

> GocAdmin is a lightweight library of responsive UI components and plugins for [Vue.js](https://vuejs.org/).


# Features

* Components, Plugins for admin applications
* Very lightweight with none internal dependencies aside from Vue & BootstrapVue

## Table of contents

- [Quick start](#quick-start)
- [Install](#install)
- [Import and use GocAdmin Components](#import-and-use-GocAdmin-components)
- [GocAdminVue Plugins](#GocAdminvue-plugins)

# Quick start

You need [Vue.js](https://vuejs.org/) **version 2.6+**.

## Install 

In Package.json, you should add following

```bash
 "dependencies": {
    "@gocteam/goc-admin-vue": "1.0.0"
  }
```

In order to find this package, you should create ".npmrc" file, and copy below

```bash
registry=https://registry.npmjs.org/
@gocteam:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=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
```

## Import and use GocAdmin Components
### Using the package with all components
```javascript
import Vue from 'vue'
import GocAdmin from '@gocteam/goc-admin-vue'
import '@gocteam/goc-admin-vue/dist/goc-admin-vue.min.css'

Vue.use(GocAdmin)
```

* Config target field needs to be defined, when you want to change options for each plugin.
* You can see default config [here](https://github.com/gocteam/goc-admin-vue/blob/master/src/utils/config.js).

```javascript
import Vue from 'vue'
import GocAdmin from '@gocteam/goc-admin-vue'
import '@gocteam/goc-admin-vue/dist/goc-admin-vue.min.css'

Vue.use(GocAdmin, {
  api: { rootUrl: '' },
  progress: { showSpinner: false }
})
```

| Category | Modules |
|-------------------------------|------|
| Directives:                         | [disable-all](https://github.com/gocteam/goc-admin-vue/blob/master/src/directives/disable-all.js) |
| Plugins:                            | [api](#api-plugin), [firebase](#firebase-plugin), [jwt](#jwt-plugin), [notification](#notification-plugin), [progress](#progress-plugin), [recaptcha](#recaptcha-plugin), [rtl](#rtl-plugin), [validate](#validate-plugin) |
| Prototypes ($goc.prototype)        | [config](https://github.com/gocteam/goc-admin-vue/blob/master/src/utils/config.js), [jwt](https://github.com/gocteam/goc-admin-vue/blob/master/src/plugins/jwtPlugin.js), [notification](https://github.com/gocteam/goc-admin-vue/blob/master/src/plugins/notificationPlugin.js), [progress](https://github.com/gocteam/goc-admin-vue/blob/master/src/plugins/progressPlugin.js), [modal](https://github.com/gocteam/goc-admin-vue/blob/master/src/components/modal/index.js#L12-L61)  |

Package includes these modules above. You can use above features, when you install GocAdmin.

Or, You can install each plugin one by one.

```javascript
import Vue from 'vue'
import { CoreComponentsPlugin, ApiPlugin, ProgressPlugin } from '@gocteam/goc-admin-vue'
import '@gocteam/goc-admin-vue/dist/goc-admin-vue.min.css'

Vue.use(CoreComponentsPlugin)
Vue.use(ApiPlugin, { rootUrl: '' })
Vue.use(ProgressPlugin, { showSpinner: false })
```

Config Usage in Vue Components : 
```javascript
// To get config, you can use
this.$goc.config.datatable
this.$goc.config.disableAll
this.$goc.config.mask
this.$goc.config.date
this.$goc.config.api
this.$goc.config.firebase
this.$goc.config.jwt
this.$goc.config.notification
this.$goc.config.progress
this.$goc.config.recaptcha
this.$goc.config.rtl
this.$goc.config.validate
```

### Importing Core Components

```javascript
import Vue from 'vue'
import { CoreComponentsPlugin } from '@gocteam/goc-admin-vue'
import '@gocteam/goc-admin-vue/dist/goc-admin-vue.css'

Vue.use(CoreComponentsPlugin)
```

| UI Components | Component |
|-------|------------------------------|
| Alert:     | [f-alert] |
| Button:    | [f-button] |
| Card:      | [f-card] |
| Core:      | [generateId], [validate](#validate-plugin), [config], [f-modal], [f-button], [f-card], [f-form], [f-input], [f-page], [f-select], [f-select-group], [f-container], [f-row], [f-col], [f-form-row], [f-form-group], [f-tabs], [f-tab] |
| Datatable: | [f-datatable] |
| Form:      | [f-form] |
| Image:     | [f-img], [f-img-lazy] |
| Input:     | [f-input] |
| Modal:     | [f-modal] |
| MultiselectListbox: | [f-multiselect-listbox] |
| Page:      | [f-page] |
| Select:    | [f-select], [f-select-group] |
| Switch:    | [f-switch] |
| Upload:    | [f-upload] |
| UserEditInfo: | [f-user-edit-info] |
| Wizard:    | [f-wizard] |


[f-alert]: https://github.com/gocteam/goc-admin-vue/blob/master/src/components/alert/Alert.vue
[f-button]: https://github.com/gocteam/goc-admin-vue/blob/master/src/components/button/Button.vue
[f-card]: https://github.com/gocteam/goc-admin-vue/blob/master/src/components/card/Card.vue
[generateId]: https://github.com/gocteam/goc-admin-vue/blob/master/src/components/utils.js#L1-L6
[config]: https://github.com/gocteam/goc-admin-vue/blob/master/src/utils/config.js#L1-L88
[f-modal]: https://github.com/gocteam/goc-admin-vue/blob/master/src/components/modal/Modal.vue
[f-datatable]: https://github.com/gocteam/goc-admin-vue/blob/master/src/components/datatable/Datatable.vue
[f-form]: https://github.com/gocteam/goc-admin-vue/blob/master/src/components/form/Form.vue
[f-image]: https://github.com/gocteam/goc-admin-vue/blob/master/src/components/image/index.js
[f-input]: https://github.com/gocteam/goc-admin-vue/blob/master/src/components/input/Input.vue
[f-multiselect-listbox]: https://github.com/gocteam/goc-admin-vue/blob/master/src/components/multiselect-listbox/MultiselectListbox.vue
[f-page]: https://github.com/gocteam/goc-admin-vue/blob/master/src/components/page/Page.vue
[f-select]: https://github.com/gocteam/goc-admin-vue/blob/master/src/components/select/Select.vue
[f-select-group]: https://github.com/gocteam/goc-admin-vue/blob/master/src/components/select/SelectGroup.vue
[f-Switch]: https://github.com/gocteam/goc-admin-vue/blob/master/src/components/switch/Switch.vue
[f-upload]: https://github.com/gocteam/goc-admin-vue/blob/master/src/components/upload/Upload.vue
[f-user-edit-info]: https://github.com/gocteam/goc-admin-vue/blob/master/src/components/user-edit-info/UserEditInfo.vue
[f-wizard]: https://github.com/gocteam/goc-admin-vue/blob/master/src/components/wizard/Wizard.vue
[f-img]: https://github.com/gocteam/goc-admin-vue/blob/master/src/components/image/index.js
[f-img-lazy]: https://github.com/gocteam/goc-admin-vue/blob/master/src/components/image/index.js
[f-container]: https://github.com/gocteam/goc-admin-vue/blob/master/src/components/core/index.js
[f-row]: https://github.com/gocteam/goc-admin-vue/blob/master/src/components/core/index.js
[f-col]: https://github.com/gocteam/goc-admin-vue/blob/master/src/components/core/index.js
[f-form-row]: https://github.com/gocteam/goc-admin-vue/blob/master/src/components/core/index.js
[f-form-group]: https://github.com/gocteam/goc-admin-vue/blob/master/src/components/core/index.js
[f-tabs]: https://github.com/gocteam/goc-admin-vue/blob/master/src/components/core/index.js
[f-tab]: https://github.com/gocteam/goc-admin-vue/blob/master/src/components/core/index.js

* If you use ModalPlugin or CoreComponentsPlugin, you can use programmatic modal as below:

```javascript
 const result = await this.$goc.modal.confirm(
      'Are you sure to confirm?',
      {
        size: 'md',
        okTitle: 'Yes',
        cancelTitle: 'No',
        okVariant: 'danger',
        cancelVariant: 'light'
      }
    )
if(result) {
  // Do something
}

// OR

this.$goc.modal.alert(
      'This is an alert modal.',
      {
        size: 'md',
        okTitle: 'Ok',
        okVariant: 'danger',
        cancelVariant: 'light'
      }
    )
```

* If you want to export xlsx from your datatable, you should add followings into your "main.js" file:

```javascript
import * as XLSX from 'xlsx'
import 'tableexport.jquery.plugin/tableExport.min.js'
window.XLSX = XLSX
```

### or Individual Components as Plugin
```javascript
import Vue from 'vue'
import { ModalPlugin } from '@gocteam/goc-admin-vue'
import '@gocteam/goc-admin-vue/src/scss/components/_f-modal.scss'

Vue.use(ModalPlugin)

```

### or Individual Components as Exporting
```javascript
import Vue from 'vue'
import { GModal } from '@gocteam/goc-admin-vue/src/components/modal'
import '@gocteam/goc-admin-vue/src/scss/components/_f-modal.scss'

Vue.component(GModal, 'GModal')
```

## Flex Admin Plugins

| Name | Config Target Field |
|-------------------------------|------|
| [ApiPlugin](#api-plugin)            | [api] |
| [FirebasePlugin](#firebase-plugin)  | [firebase] |
| [JwtPlugin](#jwt-plugin)            | [jwt] |
| [NotificationPlugin](#notification-plugin) | [notification] |
| [ProgressPlugin](#progress-plugin)  | [progress] |
| [RecaptchaPlugin](#recaptcha-plugin)| [recaptcha] |
| [RtlPlugin](#rtl-plugin)  | [rtl] |
| [ValidatePlugin](#validate-plugin)  | [validate] |

[api]: https://github.com/gocteam/goc-admin-vue/blob/master/src/utils/config.js#L38-L46
[firebase]: https://github.com/gocteam/goc-admin-vue/blob/master/src/utils/config.js#L47-L56
[jwt]: https://github.com/gocteam/goc-admin-vue/blob/master/src/utils/config.js#L57-L61
[notification]: https://github.com/gocteam/goc-admin-vue/blob/master/src/utils/config.js#L62-L64
[progress]: https://github.com/gocteam/goc-admin-vue/blob/master/src/utils/config.js#L65-L67
[recaptcha]: https://github.com/gocteam/goc-admin-vue/blob/master/src/utils/config.js#L68-L74
[rtl]: https://github.com/gocteam/goc-admin-vue/blob/master/src/utils/config.js#L75-L77
[validate]: https://github.com/gocteam/goc-admin-vue/blob/master/src/utils/config.js#L78-L91

IMPORTANT:
* Config target field automatically applied, when you import each plugin.

### Api Plugin
```javascript
import Vue from 'vue'
import { ApiPlugin } from '@gocteam/goc-admin-vue'

const apiConfig = {
  reqCallback: config => config,
  reqErrorCallback: error => Promise.reject(error),
  resCallback: response => response,
  resErrorCallback: error => Promise.reject(error)
}

Vue.use(ApiPlugin, apiConfig)
```

Usage : 
```javascript
await this.$http.get()
await this.$http.post()
await this.$http.put()
await this.$http.delete()
```

### Firebase Plugin
```javascript
import Vue from 'vue'
import { FirebasePlugin } from '@gocteam/goc-admin-vue'

Vue.use(FirebasePlugin, {
  apiKey: '',
  authDomain: '',
  databaseURL:'',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: ''
})
```
This plugin uses [firebase](https://www.npmjs.com/package/nprogress). You can use [firebase options](https://www.npmjs.com/package/nprogress) in this plugin.

Usage : 
```javascript
this.$goc.progress.start()
this.$goc.progress.done()
```

### JWT Plugin
```javascript
import Vue from 'vue'
import { JwtPlugin } from '@gocteam/goc-admin-vue'

Vue.use(JwtPlugin, {
  jwtTokenKey: 'id_token',
  userDataKey: 'user_data',
  userLangKey: 'user_lang'
})
```
Usage : 
```javascript
this.$goc.jwt.getToken()
this.$goc.jwt.setToken() 
this.$goc.jwt.getUserData()
this.$goc.jwt.saveAuthData() 
this.$goc.jwt.destroyAuthData()
```

You can check [methods here](https://github.com/gocteam/goc-admin-vue/blob/master/src/plugins/jwtPlugin.js). 

### Notification Plugin
```javascript
import Vue from 'vue'
import { NotificationPlugin } from '@gocteam/goc-admin-vue'

Vue.use(NotificationPlugin, { closeButton: true })
```
This plugin uses [toastr](https://github.com/CodeSeven/toastr). You can use [toastr options](https://www.npmjs.com/package/toastr) in this plugin.

Usage : 
```javascript
this.$goc.notification.success('Success')
this.$goc.notification.info('Info')
this.$goc.notification.error('Error')
this.$goc.notification.warning('Warning')
```

### Progress Plugin
```javascript
import Vue from 'vue'
import { ProgressPlugin } from '@gocteam/goc-admin-vue'

Vue.use(ProgressPlugin, { showSpinner: false })
```
This plugin uses [NProgress](https://www.npmjs.com/package/nprogress). You can use [NProgress options](https://www.npmjs.com/package/nprogress) in this plugin.

Usage : 
```javascript
this.$goc.progress.start()
this.$goc.progress.done()
```

### Recaptcha Plugin
```javascript
import Vue from 'vue'
import { RecaptchaPlugin } from '@gocteam/goc-admin-vue'

Vue.use(RecaptchaPlugin, {
  siteKey: '',
  loaderOptions: {
    useRecaptchaNet: true,
    autoHideBadge: true
  }
})
```
This plugin uses [vue-recaptcha-v3](https://www.npmjs.com/package/vue-recaptcha-v3). You can use [vue-recaptcha-v3 options](https://www.npmjs.com/package/vue-recaptcha-v3) in this plugin.

Usage :
```javascript
await this.$recaptchaLoaded()
this.$recaptchaInstance.showBadge()
this.$recaptchaInstance.hideBadge()
```

### Rtl Plugin

In your 'vue.config.js', you should add 'copy-webpack-plugin' dependency to copy 'goc-admin-vue-rtl.css' from 'node_modules/goc-admin-vue/dist/goc-admin-vue-rtl.css' to your dist folder in your project. You can see example below:

```javascript
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    output: {
      filename: 'js/[name].[hash:8].js',
      chunkFilename: 'js/[id].[chunkhash:8].chunk.js'
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: 'node_modules/@gocteam/goc-admin-vue/dist/goc-admin-vue-rtl.css', // source
          to: 'css' // target
        }
      ])
    ]
  }
}
```

When you copy your rtl css file, you should pass cssPath to RtlPlugin. The path will be <b>'/css/goc-admin-vue-rtl.css'</b>.

```javascript
import Vue from 'vue'
import { RtlPlugin } from '@gocteam/goc-admin-vue'

Vue.use(RtlPlugin, { cssPath: '/css/goc-admin-vue-rtl.css' })
```

Usage : 
```javascript
this.$goc.rtl.isRtl
this.$goc.rtl.enable()
this.$goc.rtl.disable()
```

### Validate Plugin
```javascript
import Vue from 'vue'
import { ValidatePlugin } from '@gocteam/goc-admin-vue'

Vue.use(ValidatePlugin, { i18nField: 'validation' })
```

This plugin uses [vee-validate](https://vee-validate.logaretm.com/v3/). You can use [vee-validate options](https://vee-validate.logaretm.com/v3/overview.html#usage) in this plugin.
