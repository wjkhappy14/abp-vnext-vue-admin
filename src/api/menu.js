import request from '@/utils/request'


export function routerMenu() {
  return request({
    url: '/api/generic/routerMenu/menuByRoles',
    method: 'get'
  })
}

export function deleteItem(pv) {
  return request({
    url: '/api/generic/routerMenu/delete',
    method: 'get',
    params: { pv }
  })
}

export function create(data) {
  return request({
    url: '/api/generic/routerMenu/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/api/generic/routerMenu/update',
    method: 'post',
    data
  })
}
