import request from '@/utils/request'
import qs from "qs";
export function login(data) {
  var formData = qs.stringify(data);
  return request.post('http://localhost:44379/connect/token', formData)
}

export function getMyProfile() {
  return request({
    url: '/api/identity/my-profile',
    method: 'get'
  })
}
export function getUsers() {
  return request({
    url: '/api/identity/users',
    method: 'get'
  })
}


export function addUser() {
  return request({
    url: '/api/identity/users',
    method: 'get'
  })
}

export function updateUser() {
  return request({
    url: '/api/identity/users',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
