import request from '@/utils/request'

export function fetchList(query) {
    return request({
      url: '/api/production/device',
        method: 'get',
        params: query
    })
}

export function fetchArticle(id) {
    return request({
      url: '/api/production/device/detail',
        method: 'get',
        params: { id }
    })
}

export function fetchPv(pv) {
    return request({
      url: '/api/production/device/pv',
        method: 'get',
        params: { pv }
    })
}

export function create(data) {
    return request({
      url: '/api/production/device',
        method: 'post',
        data
    })
}

export function updateArticle(data) {
    return request({
      url: '/api/production/device/update',
        method: 'post',
        data
    })
}
