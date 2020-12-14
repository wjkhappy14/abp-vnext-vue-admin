import request from '@/utils/request'


export function routerMenu() {
  return request({
    url: '/api/generic/routerMenu/menuByRoles',
    method: 'GET'
  })
}

export function deleteItem(pv) {
  return request({
    url: '/api/generic/routerMenu/delete',
    method: 'DELETE',
    params: { pv }
  })
}

export function create(data) {
  return request({
    url: '/api/generic/routerMenu/create',
    method: 'POST',
    data
  })
}

export function update(data) {
  return request({
    url: '/api/generic/routerMenu/update',
    method: 'POST',
    data
  })
}
