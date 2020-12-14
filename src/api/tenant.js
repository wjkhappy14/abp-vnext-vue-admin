import request from '@/utils/request'

export function fetchList(query) {
  return request({
      url: '/api/multi-tenancy/tenants?page=1&size=2000',
    method: 'GET',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'GET',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'GET',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'POST',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'POST',
    data
  })
}
