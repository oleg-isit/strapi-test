import {Request} from "./index"
export const SetPathsToUrl = (url, paths) => {
  if (!paths || !Object.keys(paths).length) return url
  return url.replaceAll(/\{(.*?)\}/g, (value) => {
    const val = paths[value.slice(1, -1)]
    if (!val) {
      throw new Error(`${value} is not defined in paths`)
    }
    return val
  })
}

export const SetQueryParamsToUrl = (cfg = [], args = {}) => {
  const queries = Object.entries(args)

  const tempArrQueries = queries.reduce((acc, [name, value]) => {
    if (cfg.includes(name)) {
      if (Object.prototype.toString.call(value) === '[object Array]') {
        value.forEach((item) => {
          acc.push(`${name}=${item}`)
        })
      } else if (value) {
        acc.push(`${name}=${value}`)
      }
    }
    return acc
  }, [])

  const finalUrl = tempArrQueries.reduce(
    (acc, query, i, arr) => {
      acc += query
      if (i !== arr.length - 1) {
        acc += '&'
      }
      return acc
    },
    tempArrQueries.length ? '?' : ''
  )
  return finalUrl
}


export const createAPI = (allApi, config) =>  Object.entries(allApi).reduce((acc, [api, routes]) => {
    acc[api] = Object.entries(routes.endpoints).reduce((acc, [name, route]) => {
        acc[name] = (
            { ...args } = {},
        ) =>
            Request({
                cfg: {
                    baseURLData: config,
                    primaryRoute: `${routes.url}`,
                    ...route
                },
                data: args,
                retry: true
            })
        return acc
    }, {})
    return acc
}, {})
export const arrToMap = (arr, prop="id") =>
    arr.reduce(
        (acc, item) => acc.set(item[prop], item),
        new Map()
    );
export const arrToObj = (arr, prop="id") =>
    arr.reduce((acc, item) => {
            acc[item[prop]] = item;
            return acc
        }, {}
    );
