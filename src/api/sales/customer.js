import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/sales/customer',
    method: 'get',
    params: query
  })
}

export function fetchItem(id) {
  return request({
    url: '/api/sales/customer/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/api/sales/customer/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/api/sales/customer/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/api/sales/customer/update',
    method: 'post',
    data
  })
}
