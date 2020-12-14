import request from '@/utils/request'

export function lotReportSummary(lotNumber) {
  return request({
    url: '/api/app/report/lotReportSummary?lotNumber=SYA298-80 ',
    method: 'GET'
  })
}

export function defectCategories(data) {
  return request({
    url: '/api/app/defect/defectCategories',
    method: 'GET',
    data
  })
}

export function machineClothLength() {
  return request({
    url: `/api/app/summary/machineClothLength`,
    method: 'GET'
  })
}

export function defectsCount(date) {
  return request({
    url: `/api/app/summary/defectsCount?date=${date}`,
    method: 'GET',
    data
  })
}

export function machineDefectCount() {
  return request({
    url: `/api/app/summary/machineDefectCount`,
    method: 'GET'
  })
}

export function clothCount() {
  return request({
    url: `/api/app/inspectionReport/clothCount`,
    method: 'GET'
  })
}

export function defectClothCount() {
  return request({
    url: `/api/app/inspectionReport/defectClothCount`,
    method: 'GET'
  })
}

export function clothLength() {
  return request({
    url: `/api/app/summary/clothLength`,
    method: 'GET'
  })
}

export function monthClothLength() {
  return request({
    url: `/api/app/summary/monthClothLength`,
    method: 'GET'
  })
}

export function clothGroupWeight() {
  return request({
    url: `/api/app/summary/clothGroupWeight`,
    method: 'GET'
  })
}

export function companyMonthWeight() {
  return request({
    url: `/api/app/summary/companyMonthWeight`,
    method: 'GET'
  })
}
