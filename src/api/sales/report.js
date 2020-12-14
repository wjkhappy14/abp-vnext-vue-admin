import request from '@/utils/request'

export function getQueryItems() {
  return request({
    url: '/api/app/queryItem/showText',
    method: 'GET'
  })
}

export function getDefects() {
  return request({
    url: '/api/app/defect',
    method: 'GET',
    params: { MaxResultCount: 999 }
  })
}

export function setSheetFilters(filters) {
  filters = filters || {};
  return request.post('/api/app/summary/setSheetFilters', filters, {
    headers: { 'Content-Type': 'application/json' }
  });
}

export function fetchItems(filters) {
  return request({
    url: '/api/app/report/report',
    method: 'GET',
    params: filters
  })
}
