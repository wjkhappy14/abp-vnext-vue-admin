import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/generic/address',
    method: 'GET',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/api/generic/address/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/api/generic/address/delete',
    method: 'get',
    params: { pv }
  })
}

export function create(data) {
  return request({
    url: '/api/generic/address/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/api/generic/address/update',
    method: 'post',
    data
  })
}
