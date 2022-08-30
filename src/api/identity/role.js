import request from '@/utils/request'

export function getItems() {
  return request({
    url: '/api/identity/roles/all',
    method: 'GET'
  })
}


export function getItem(id) {
  return request({
    url: `/api/identity/roles/${id}`,
    method: 'GET'
  })
}

export function addItem(data) {
  return request({
    url: '/api/identity/roles',
    method: 'POST',
    data
  })
}

export function updateItem(id, data) {
  return request({
    url: `/api/identity/roles/${id}`,
    method: 'PUT',
    data
  })
}

export function deleteItem(id) {
  return request({
    url: `/api/identity/roles/${id}`,
    method: 'DELETE'
  })
}
