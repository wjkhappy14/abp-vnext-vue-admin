import request from '@/utils/request'

export function fetchList(query) {
  return request({
      url: '/api/blogging/posts/5602718F-1FC5-1DE8-0C70-39F152398A16/all',
    method: 'get',
    params: query
  })
}
