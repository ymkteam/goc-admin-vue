import firebase from 'firebase/app'
import 'firebase/database'
import { merge } from '../utils/helpers'
import config from '../utils/config'
import { registerInstanceProgrammatic } from '../utils/plugins'

const FirebasePlugin = {
  install (Vue, options = {}) {
    merge(config, options, { targetField: 'firebase' })

    firebase.initializeApp(config.firebase)

    registerInstanceProgrammatic(Vue, 'firebase', firebase)
  }
}

export default FirebasePlugin
