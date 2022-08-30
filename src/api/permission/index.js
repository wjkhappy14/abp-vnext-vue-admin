import request from '@/utils/request'

export function getItems(key,name) {
  return request({
    url: '/api/permission-management/permissions',
    method: 'GET',
    params: {providerKey:key,providerName:name}
  })
}

export function updateItems(permissions) {
  return request({
    url: '/api/permission-management/permissions',
    method: 'PUT',
    data:permissions
  })
}
