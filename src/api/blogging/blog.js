import request from '@/utils/request'
export function getItems(query) {
  return request({
    url: "/api/blogging/blogs",
    method: 'GET',
    params: query
  })
}

export function getItem(item) {
  return request({
    url: '/api/blogging/blogs/' + item.id,
    method: 'GET'
  })
}

export function deleteItem(item) {
  return request({
    url: '/api/blogging/blogs/' + item.id,
    method: 'DELETE'
  })
}

export function create(item) {
  return request({
    url: '/api/blogging/blogs',
    method: 'POST',
    item
  })
}

export function update(item) {
  return request.put('/api/blogging/blogs/' + item.id, item)
}
