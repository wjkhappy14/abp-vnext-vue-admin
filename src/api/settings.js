import request from '@/utils/request'

export function fetch() {
  return request({
    url: '/api/app/setting?providerName=T',
    method: 'GET',
    params: {}
  })
}

export function gridColumns() {
  return request({
    url: '/api/app/setting/gridColumns',
    method: 'GET',
    params: {}
  })
}

export function detail(id) {
  return request({
    url: '/api/app/setting/detail',
    method: 'GET',
    params: { id }
  })
}

export function update(item) {
  return request({
    url: '/api/app/setting/set',
    method: 'POST',
    item
  })
}
