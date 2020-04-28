import request from '@/utils/request'

export function getCountries(query) {
  return request({
    url: '/api/generic/country',
    method: 'GET',
    params: query
  })
}

export function getCities(query) {
  return request({
    url: '/api/generic/city',
    method: 'get',
    params: query
  })
}

export function getStateProvinces(query) {
  return request({
    url: '/api/generic/stateProvince',
    method: 'get',
    params: query
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


export function deleteItem(data) {
  return request({
    url: '/api/generic/contact/update',
    method: 'post',
    data
  })
}
