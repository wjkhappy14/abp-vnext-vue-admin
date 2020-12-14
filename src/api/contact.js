import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/app/contact/pagedList?sorting=name',
    method: 'GET',
    params: query
  })
}

export function detail(id) {
  return request({
    url: '/api/app/contact/detail',
    method: 'GET',
    params: { id }
  })
}

export function fetchPv(id) {
  return request({
    url: '/api/app/contact/delete',
    method: 'DELETE',
    params: { id }
  })
}

export function create(item) {
  return request({
    url: '/api/app/contact/create',
    method: 'POST',
    item
  })
}

export function update(item) {
  return request({
    url: '/api/app/contact/update',
    method: 'PUT',
    item
  })
}
