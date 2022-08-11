import request from '@/utils/request'
//http://82.157.167.144:30571/swagger-blog/swagger/index.html
//http://www.tallper.top/swagger-blog/swagger/index.html

///api/blogging/blogs/admin
export function fetchList(query) {
  return request({
    url: '/api/blogging/blogs/admin',
    method: 'GET',
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
