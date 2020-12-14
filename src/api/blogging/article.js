import request from '@/utils/request'

export function getItems(query) {
  return request({
    url: '/api/contents/article',
    method: 'GET',
    params: query
  })
}

export function getItem(item) {
  return request({
    url: '/api/contents/article/' + item.id,
    method: 'GET'
  })
}

export function deleteItem(item) {
  return request({
    url: '/api/contents/article/' + item.id,
    method: 'DELETE'
  })
}

export function create(data) {
  return request({
    url: '/api/contents/article',
    method: 'POST',
    data
  })
}

export function update(data) {
  return request({
    url: '/api/contents/article',
    method: 'PUT',
    data
  })
}
