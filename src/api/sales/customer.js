import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/sales/customer',
    method: 'GET',
    params: query
  })
}

export function fetchItem(id) {
  return request({
    url: '/api/sales/customer/detail',
    method: 'GET',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/api/sales/customer/pv',
    method: 'GET',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/api/sales/customer/create',
    method: 'POST',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/api/sales/customer/update',
    method: 'POST',
    data
  })
}
