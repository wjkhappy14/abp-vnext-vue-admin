import request from '@/utils/request'

export function fetchList(query) {
  return request({
      url: '/api/app/channelRouter',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
      url: '/api/app/product/delete',
    method: 'get',
    params: { pv }
  })
}

export function create(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}
