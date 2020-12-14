import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/sales/order',
    method: 'GET',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/sales/detail',
    method: 'GET',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/api/sales/pv',
    method: 'GET',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/api/sales/create',
    method: 'POST',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/api/sales/update',
    method: 'POST',
    data
  })
}
