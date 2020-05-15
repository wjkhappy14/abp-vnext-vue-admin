import request from '@/utils/request'
export function getItems(query) {
  return request({
    url: '/api/blogging/blogs',
    method: 'get',
    params: query
  })
}

export function getItem(item) {
  return request({
    url: '/api/blogging/article/' + item.id,
    method: 'GET'
  })
}

export function deleteItem(item) {
  return request({
    url: '/api/blogging/article/' + item.id,
    method: 'DELETE'
  })
}

export function create(item) {
  return request({
    url: '/api/blogging/article',
    method: 'POST',
    item
  })
}

export function update(item) {
  return request.put('/api/blogging/article/' + item.id, item)
}
