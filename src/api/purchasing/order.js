import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/purchasing/order',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/api/purchasing/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/api/purchasing/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/api/purchasing/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/api/purchasing/update',
    method: 'post',
    data
  })
}
