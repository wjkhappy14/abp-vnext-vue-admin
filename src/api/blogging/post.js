import request from '@/utils/request'
export function getItems(query) {
  var path = "/api/blogging/posts/" + query.blogId + "/all";
  return request({
    url: path,
    method: 'GET',
    params: query
  })
}

export function getItem(item) {
  return request({
    url: '/api/blogging/posts/' + item.id,
    method: 'GET'
  })
}

export function deleteItem(item) {
  return request({
    url: '/api/blogging/posts/' + item.id,
    method: 'DELETE'
  })
}

export function create(item) {
  return request({
    url: '/api/blogging/posts',
    method: 'POST',
    item
  })
}

export function update(item) {
  return request.put('/api/blogging/posts/' + item.id, item)
}
