const config = {
  // components
  datatable: {
    labels: {
      create: 'Add New',
      edit: 'Edit',
      delete: 'Delete',
      actions: 'Actions',
      cancel: 'Cancel'
    },
    messages: {
      errorOccurred: 'An error occurred!',
      deleteConfirmMessage: 'Are you sure to delete?'
    }
  },
  upload: {
    labels: {
      selectedFileCount: 'Selected File Count'
    }
  },

  // directives
  disableAll: {
    tags: ['input', 'button', 'textarea', 'select']
  },

  // services
  mask: {
    phoneMask: '0### ### ## ##',
    numberMask: '#########'
  },
  date: {
    dateFormat: 'MM/dd/yyyy',
    datetimeFormat: 'MM/dd/yyyy HH:mm'
  },

  // plugins
  api: {
    rootUrl: '',
    // request interceptor handler
    reqCallback: config => config,
    reqErrorCallback: error => Promise.reject(error),
    // response interceptor handler
    resCallback: response => response,
    resErrorCallback: error => Promise.reject(error)
  },
  firebase: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: ''
  },
  jwt: {
    jwtTokenKey: 'id_token',
    userDataKey: 'user_data',
    userLangKey: 'user_lang'
  },
  notification: {
    closeButton: true
  },
  progress: {
    showSpinner: false
  },
  recaptcha: {
    siteKey: '',
    loaderOptions: {
      useRecaptchaNet: true,
      autoHideBadge: true
    }
  },
  rtl: {
    cssPath: '/css/goc-admin-vue-rtl.css'
  },
  validate: {
    messages: {
      confirmed: 'This does not match',
      date_after: 'It should be before {date}',
      email: 'Please, enter valid email address',
      integer: 'Only enter integer',
      length: 'This field must have 2 options',
      max: 'It must be at most {length} length',
      min: 'It must be at least {length} length',
      password: 'Passwords do not match',
      required: 'This is required'
    },
    interactionMode: 'lazy'
  }
}

export { config as default }
