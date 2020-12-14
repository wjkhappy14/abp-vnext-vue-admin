import request from '@/utils/request'
import qs from "qs";
export function login(data) {
  var formData = qs.stringify(data);
  return request.post('http://106.13.130.51:6060/connect/token', formData)
}
export function getMyProfile() {
  return request({
    url: '/api/abp/api-definition',
    method: 'GET'
  })
}
export function getUsers() {
  return request({
    url: '/api/identity/users',
    method: 'GET'
  })
}
export function endSession() {
  return request({
    url: '/connect/endsession',
    method: 'POST'
  })
}
export function checkSession() {
  return request({
    url: '/connect/checksession',
    method: 'POST'
  })
}
export function introspect() {
  return request({
    url: '/connect/introspect',
    method: 'POST'
  })
}


