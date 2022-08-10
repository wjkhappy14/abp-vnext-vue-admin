import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/abp/dI/serviceProvider',
    method: 'GET',
    params: query
  })
}

