import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/permission-management/permissions?providerName=R&providerKey=admin',
    method: 'GET',
    params: query
  })
}


export function update(options) {
  return request({
    url: '/api/permission-management/permissions',
    method: 'PUT',
    options
  })
}
