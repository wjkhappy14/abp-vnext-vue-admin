import request from '@/utils/request'
import qs from "qs";

export function fetchList(query) {
  return request({
    url: '/api/sales/device',
    method: 'GET',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/api/sales/device/detail',
    method: 'GET',
    params: { id }
  })
}

export function deleteItem(pv) {
  return request({
    url: '/api/sales/device/delete',
    method: 'DELETE',
    params: { pv }
  })
}

export function create(data) {
  //var formData = qs.stringify(data);
  return request({
    url: '/api/sales/device',
    method: 'POST',
    data
  })
}

export function update(data) {
  return request({
    url: '/api/sales/device/update',
    method: 'PUT',
    data
  })
}
