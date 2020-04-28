import request from '@/utils/request'

export function fetchList(query) {
  return request({
      url: '/api/abp/permissions?providerName=R&providerKey=admin',
    method: 'get',
    params: query
  })
}


export function updatePermission(data) {
  return request({
      url: '/permission/update',
    method: 'post',
    data
  })
}
