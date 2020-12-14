import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/app/auditLog',
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



export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'POST',
    data
  })
}
