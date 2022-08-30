import request from '@/utils/request'

export function getItems(query) {
  return request({
    url: '/api/identity/users',
    method: 'GET',
    params: query
  })
}
export function getItem(id) {
  return request({
    url: `/api/identity/users/${id}`,
    method: 'GET'
  })
}

export function addItem(item) {
  return request({
    url: '/api/identity/users',
    method: 'POST',
    data:item
  })
}

export function updateItem(item) {
  return request({
    url: '/api/identity/users',
    method: 'PUT',
    data:item
  })
}

export function deleteItem() {
  return request({
    url: '/api/identity/users',
    method: 'DELETE'
  })
}

export function getRoles(id) {
  return request({
    url: `/api/identity/users/${id}/roles`,
    method: 'GET'
  })
}

export function getAssignableRoles() {
  return request({
    url: `/api/identity/users/assignable-roles`,
    method: 'GET'
  })
}

export function setRoles(roles) {
  return request({
    url: `/api/identity/users/${id}/roles`,
    method: 'PUT',
    data:roles
  })
}

export function getItemByEmail(email) {
  return request({
    url: `/api/identity/users/by-email/${email}`,
    method: 'GET'
  })
}

export function getItemByUsername(username) {
  return request({
    url: `/api/identity/users/by-username/${username}`,
    method: 'GET'
  })
}