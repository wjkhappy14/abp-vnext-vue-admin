import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/generic/contact',
    method: 'GET',
    params: query
  })
}

export function detail(id) {
  return request({
    url: '/api/generic/contact/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/api/generic/contact/delete',
    method: 'get',
    params: { pv }
  })
}

export function create(data) {
  return request({
    url: '/api/generic/contact/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/api/generic/contact/update',
    method: 'post',
    data
  })
}
