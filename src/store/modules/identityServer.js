import client from './IdentityServer/client'
import apiResource from './IdentityServer/apiResource'
import identityResource from './IdentityServer/identityResource'
export default {
  namespaced: true,
  modules: {
    client,
    apiResource,
    identityResource
  }
}
