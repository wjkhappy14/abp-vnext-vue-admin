import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/warehouse/stock',
    method: 'get',
    params: query
  })
}

export function fetchItem(id) {
  return request({
    url: '/api/warehouse/stock/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/api/warehouse/stock/delete',
    method: 'DELETE',
    params: { pv }
  })
}

export function create(data) {
  return request({
    url: '/api/warehouse/stock/create',
    method: 'PUT',
    data
  })
}

export function update(data) {
  return request({
    url: '/api/warehouse/stock/update',
    method: 'POST',
    data
  })
}
