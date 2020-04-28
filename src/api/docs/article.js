import request from '@/utils/request'
export function getItems(query) {
  return request({
    url: '/api/contents/article',
    method: 'get',
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

export function create(item) {
  return request({
    url: '/api/contents/article',
    method: 'POST',
    item
  })
}

export function update(item) {
  return request.put('/api/contents/article/' + item.id, item)
}
