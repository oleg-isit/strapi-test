import { Request } from './index'
import {API} from "../../api";
import {resetAuth} from "../../store/auth/reducer";
import {store} from "../../store";


export const handleError = async (error, acc, cfg, args) => {
  const { request, response } = error

  if (!!response) {
    if (response.status === 401 && !!cfg.token) {
      const refreshToken = cfg.baseURLData.getRefreshToken()
      try {
        if (!!refreshToken) {
          try {
            const res = await API.auth.refreshToken({ body: { refreshToken } })
            localStorage.setItem('token', res.jwt)
            localStorage.setItem('refreshToken', res.refreshToken)
          } catch (e) {
            store.dispatch(resetAuth())
            return 'Auth is expired'
          }
          const res = { data: await Request(args) }
          return res
        }
      } catch (e) {
        return e.message
      }
    }
    if (response.status === 404) {
      return `${response.status}`
    }

    if (response.status >= 500) {
      if (!args.retry) {
        return '500'
      }

      try {
        const res = { data: await Request({ ...args, retry: false }) }
        return res
      } catch (e) {
        return e.message
      }
    }

    if (!response.data) {
      return 'Network error'
    }

    if (!!response.data) {
      return cfg.baseURLData.errorHandling(response.data)
    }
  }
  if (!!request) {
    console.log('error', error)
  }
}
