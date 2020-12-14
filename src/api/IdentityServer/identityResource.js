import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/app/identityResource?maxResultCount=10',
    method: 'get',
    params: query
  })
}


export function fetchPv(pv) {
  return request({
    url: '/api/identityResource/stock/delete',
    method: 'DELETE',
    params: { pv }
  })
}

export function create(data) {
  return request({
    url: '/api/identityResource/stock/create',
    method: 'PUT',
    data
  })
}

export function update(data) {
  return request({
    url: '/api/identityResource/stock/update',
    method: 'POST',
    data
  })
}
