import { merge } from '../utils/helpers'
import config from '../utils/config'
import { registerInstanceProgrammatic } from '../utils/plugins'

const JwtPlugin = {
  install (Vue, options = {}) {
    merge(config, options, { targetField: 'jwt' })

    const { jwtTokenKey, userDataKey, userLangKey } = config.jwt

    const jwt = {
      getToken: () => {
        const token = window.localStorage.getItem(jwtTokenKey)
        return token
      },
      setToken: token => {
        window.localStorage.setItem(jwtTokenKey, token)
      },
      getUserData: () => {
        const userData = window.localStorage.getItem(userDataKey)
        return JSON.parse(userData)
      },
      saveAuthData: (token, userData) => {
        if (token) window.localStorage.setItem(jwtTokenKey, token)
        if (userData) {
          window.localStorage.setItem(userData, JSON.stringify(userData))
          if (userData.language) {
            window.localStorage.setItem(userLangKey, userData.language)
          }
        }
      },
      destroyAuthData: () => {
        window.localStorage.removeItem(jwtTokenKey)
        window.localStorage.removeItem(userDataKey)
        window.localStorage.removeItem(userLangKey)
      }
    }

    registerInstanceProgrammatic(Vue, 'jwt', jwt)
  }
}

export default JwtPlugin
