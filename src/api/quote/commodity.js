import request from '@/utils/request'

export function getItems(query) {
  return request({
    url: '/api/quote/commodity/page',
    method: 'GET',
    params: query
  })
}

export function getItem(id) {
  return request({
    url: `/api/quote/commodity/${id}`,
    method: 'GET'
  })
}

export function deleteItem(id) {
  return request({
    url: `/api/quote/commodity/${id}`,
    method: 'DELETE'
  })
}

export function addItem(item) {
  return request({
    url: '/api/quote/commodity',
    method: 'POST',
    data:item
  })
}

export function updateItem(item) {
  return request({
    url: '/api/quote/commodity',
    method: 'PUT',
    data:item
  })
}
