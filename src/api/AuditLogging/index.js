import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/app/audit-logging?maxResultCount=50',
    method: 'GET',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/api/app/audit-logging/detail',
    method: 'GET',
    params: { id }
  })
}

export function updateArticle(data) {
  return request({
    url: '/api/app/audit-logging/update',
    method: 'POST',
    data
  })
}
