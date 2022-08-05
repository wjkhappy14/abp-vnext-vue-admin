import request from '@/utils/request'
export function routerMenu() {
  return request({
    url: '/api/abp/router-menu/menuByRoles',
    method: 'GET'
  })
}

export function deleteItem(pv) {
  return request({
    url: '/api/abp/router-menu/delete',
    method: 'DELETE',
    params: { pv }
  })
}

export function create(data) {
  return request({
    url: '/api/abp/router-menu/create',
    method: 'POST',
    data
  })
}

export function update(data) {
  return request({
    url: '/api/abp/router-menu/update',
    method: 'POST',
    data
  })
}
