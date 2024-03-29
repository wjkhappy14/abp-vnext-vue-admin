import request from '@/utils/request'
//http://82.157.167.144:30571/swagger-blog/swagger/index.html
//http://www.tallper.top/swagger-blog/swagger/index.html

///api/blogging/blogs/admin
export function getItems(query) {
  return request({
    url: '/api/blogging/blogs/admin',
    method: 'GET',
    params: query
  })
}

export function getItem(id) {
  return request({
    url: '/api/blogging/blogs/admin/' + id,
    method: 'GET'
  })
}

export function deleteItem(item) {
  return request({
    url: '/api/blogging/blogs/admin' + item.id,
    method: 'DELETE'
  })
}

export function addItem(item) {
  return request({
    url: '/api/blogging/blogs/admin',
    method: 'POST',
    data: item
  })
}

export function updateItem(item) {
  return request({
    url: '/api/blogging/blogs/admin',
    method: 'PUT',
    dataLitem
  })
}
