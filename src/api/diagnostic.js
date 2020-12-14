import request from '@/utils/request'
import qs from "qs";
export function getRouteOptions() {
  return request({
    url: '/api/app/options/routeOptions',
    method: 'GET'
  })
}
export function getKestrelServerOptions() {
  return request({
    url: '/api/app/options/kestrelServerOptions',
    method: 'GET'
  })
}

export function getIdentityServerOptions() {
  return request({
    url: '/api/app/options/identityServerOptions',
    method: 'GET'
  })
}

export function getCorsOptions() {
  return request({
    url: '/api/app/options/corsOptions',
    method: 'GET'
  })
}
export function getMvcOptions() {
  return request({
    url: '/api/app/options/mvcOptions',
    method: 'GET'
  })
}


