import request from '@/utils/request'

export function fetchList(name) {
  return request({
    url: '/api/app/eztv/pages?page=1&limit=100',
    method: 'get',
    params: { name }
  })
}

export function transactionList(query) {
  return request({
      url: '/api/identity/roles',
    method: 'get',
    params: query
  })
}
