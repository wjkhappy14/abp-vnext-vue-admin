import request from '@/utils/request'

export function getCountry(query) {
  //https://restcountries.eu/rest/v2/all
  return request({
    url: '/api/hello/angkor/country',
    method: 'GET',
    params: query
  })
}

export function getCountries(query) {
  return request({
    url: 'https://restcountries.eu/rest/v2/all',
    method: 'GET',
    params: query
  })
}

export function getCities(query) {
  return request({
    url: '/api/hello/angkor/city',
    method: 'get',
    params: query
  })
}

export function getStateProvinces(query) {
  return request({
    url: '/api/hello/angkor/stateProvince',
    method: 'get',
    params: query
  })
}

export function create(data) {
  return request({
    url: '/api/hello/contact/angkor/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/api/hello/contact/angkor/update',
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
