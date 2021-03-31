import {get, patch, post, del} from "@/plugins/request"

const settingUrl = "/settings"

// Settings
export function getSetting(tabName) {
  return get(`${settingUrl}/${tabName}`)
}
export function check(tabName,data){
  return post(`${settingUrl}/check/${tabName}`,data)
}

export function updateSetting(arch, data) {
  return patch(`${settingUrl}/registry/${arch}`,data)
}

export function createSetting(data) {
  return post(settingUrl,data)
}

// Registry
export function listRegistry(currentPage, pageSize) {
  return get(`${settingUrl}/registry?pageNum=${currentPage}&pageSize=${pageSize}`)
}

export function createRegistry(data) {
  return post(`${settingUrl}/registry`,data)
}

export function updateRegistry(arch, data) {
  return patch(`${settingUrl}/registry/${arch}`,data)
}

export function getRegistry(arch) {
  return get(`${settingUrl}/registry/${arch}`)
}

export function deleteRegistry(arch) {
  return del(`${settingUrl}/registry/${arch}`)
}



