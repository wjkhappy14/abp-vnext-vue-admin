import user from './identity/user'
import role from './identity/role'
import grant from './identity/grant'

export default {
  namespaced: true,
  modules: {
    user,
    role,
    grant
  }
}
