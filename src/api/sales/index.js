import request from '@/utils/request'

export function fetchList(query) {
  return request({
      url: '/api/app/channelRouter',
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
      url: '/api/app/product/delete',
    method: 'GET',
    params: { pv }
  })
}

export function create(data) {
  return request({
    url: '/article/create',
    method: 'POST',
    data
  })
}

export function update(data) {
  return request({
    url: '/article/update',
    method: 'POST',
    data
  })
}
