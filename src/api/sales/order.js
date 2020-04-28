import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/sales/order',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/sales/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/api/sales/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/api/sales/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/api/sales/update',
    method: 'post',
    data
  })
}
