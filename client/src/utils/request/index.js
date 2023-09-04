import axios from 'axios'

import { handleError } from './errorHandling'
import { SetPathsToUrl, SetQueryParamsToUrl } from './simple'

export const Request = async (args) => {
  const { cfg, data } = args
  const { baseURLData, primaryRoute, route, query: queryCfg, method, token, headers } = cfg
  const { path, query, body } = data
  const { domain, getToken } = baseURLData

  const url =
    SetPathsToUrl(domain + primaryRoute + route, path) + SetQueryParamsToUrl(queryCfg, query)

  const accumulator = (({ url, method, data, isToken, headers = {} }) => {
    const AxiosCfg = { url, method, data, headers }

    if (isToken) {
      const token = getToken()
      if (token) {
        AxiosCfg.headers = { 'Authorization': 'Bearer ' + token }
      }
    }
    return axios(AxiosCfg)
  }).bind(null, { url, method, data: body, isToken: token, headers })
  try {
    return (await accumulator()).data
  } catch (e) {
    const result = await handleError(e, accumulator, cfg, args)
    if (!!result.data) {
      return result.data
    } else {
      throw new Error(result)
    }
  }
}
