import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/app/background-job',
    method: 'GET',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/api/app/background-job/article',
    method: 'GET',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/api/app/background-job/pv',
    method: 'GET',
    params: { pv }
  })
}



export function updateArticle(data) {
  return request({
    url: '/api/app/background-job/update',
    method: 'POST',
    data
  })
}
