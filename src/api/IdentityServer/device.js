import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/app/deviceFlowCodes/pagedList?maxResultCount=50&sorting=id',
    method: 'GET',
    params: query
  })
}

export function fetchPv(pv) {
  return request({
    url: '/api/app/deviceFlowCodes/delete',
    method: 'DELETE',
    params: { pv }
  })
}

export function create(data) {
  return request({
    url: '/api/app/deviceFlowCodes/create',
    method: 'PUT',
    data
  })
}

export function update(data) {
  return request({
    url: '/api/app/deviceFlowCodes/update',
    method: 'POST',
    data
  })
}
