import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/abp/eztv/pages',
    method: 'get',
    params: query
  })
}

export function transactionList(query) {
  return request({
      url: '/api/identity/roles',
    method: 'get',
    params: query
  })
}
