import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/purchasing/supplier',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/api/purchasing/supplier/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/api/purchasing/supplier/pv',
    method: 'get',
    params: { pv }
  })
}

export function create(data) {
  return request({
    url: '/api/purchasing/supplier',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/api/purchasing/supplier/update',
    method: 'post',
    data
  })
}
