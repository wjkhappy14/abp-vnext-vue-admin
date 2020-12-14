import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/app/dI/serviceProvider',
    method: 'GET',
    params: query
  })
}

