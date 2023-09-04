export class DispatchHelper {
    static dispatch
}
export const ProxyForDispatch = {
  get: function (target, name) {
    return (...args) => {
      DispatchHelper.dispatch(target[name](...args))
    }
  }
}
