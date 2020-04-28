import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/abp/permissions',
    method: 'GET',
    params: query
  })
}

export function update(data) {
  return request({
    url: '/api/abp/permissions',
    method: 'PUT',
    data
  })
}
