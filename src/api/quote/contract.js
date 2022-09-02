import request from '@/utils/request'

export function getItems(query) {
  return request({
    url: '/api/quote/contract/page',
    method: 'GET',
    params: query
  })
}

export function getItem(id) {
  return request({
    url: `/api/quote/contract/${id}`,
    method: 'GET'
  })
}

export function addItem(item) {
  return request({
    url: '/api/quote/contract',
    method: 'POST',
    data:item
  })
}

export function updateItem(item) {
  return request({
    url: '/api/quote/contract',
    method: 'PUT',
    data:item
  })
}
export function deleteItem(id) {
  return request({
    url: `/api/quote/contract/${id}`,
    method: 'DELETE'
  })
}