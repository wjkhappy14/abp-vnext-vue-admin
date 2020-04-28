import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/sales/contract',
    method: 'GET',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/api/sales/contract/detail',
    method: 'GET',
    params: { id }
  })
}

export function deleteItem(pv) {
  return request({
    url: '/api/sales/contract',
    method: 'DELETE',
    params: { pv }
  })
}

export function create(data) {
  return request({
    url: '/api/sales/contract',
    method: 'POST',
    data
  })
}

export function update(data) {
  return request({
    url: '/api/sales/contract',
    method: 'PUT',
    data
  })
}
