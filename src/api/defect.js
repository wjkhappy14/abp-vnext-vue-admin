import request from '@/utils/request'

export function fetch() {
  return request({
    url: '/api/app/defect',
    method: 'GET',
    params: {}
  })
}

export function defectCategories(id) {
  return request({
    url: '/api/app/defect/defectCategories',
    method: 'GET',
    params: { id }
  })
}

export function update(item) {
  return request({
    url: '/api/app/defect/set',
    method: 'POST',
    item
  })
}

export function exchange(items) {
  return request({
    url: '/api/app/defect/exchange',
    method: 'POST',
    items
  })
}
