import request from '@/utils/request'

export function getItems(blogId,tagName) {
  return request({
      url: `/api/blogging/posts/${blogId}/all`,
    method: 'GET',
    params: tagName
  })
}

export function fetchArticle(id) {
  return request({
    url: '/api/blogging/posts/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/api/blogging/posts/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}
