import axios from 'axios/dist/axios'
import config from '../utils/config'
import { merge } from '../utils/helpers'
import { registerInstance } from '../utils/plugins'

const ApiPlugin = {
  install (Vue, options = {}) {
    merge(config, options, { targetField: 'api' })

    const {
      rootUrl,
      reqCallback,
      reqErrorCallback,
      resCallback,
      resErrorCallback
    } = config.api

    const axiosInstance = axios.create(config.api)

    axiosInstance.defaults.baseURL = rootUrl

    // Add a request interceptor
    axiosInstance.interceptors.request.use(
      config => reqCallback(config),
      error => reqErrorCallback(error)
    )
    // Add a response interceptor
    axiosInstance.interceptors.response.use(
      response => resCallback(response),
      error => resErrorCallback(error)
    )

    registerInstance(Vue, '$http', axiosInstance)
  }
}

export default ApiPlugin
