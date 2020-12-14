import request from '@/utils/request'

export function getMyProfile() {
  return request({
    url: '/api/identity/my-profile',
    method: 'get'
  })
}
export function getUsers() {
  return request({
    url: '/api/identity/users',
    method: 'GET'
  })
}


export function addUser() {
  return request({
    url: '/api/identity/users',
    method: 'GET'
  })
}

export function updateUser() {
  return request({
    url: '/api/identity/users',
    method: 'GET'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'POST'
  })
}
