import request from '@/utils/request'

export function getHome(data) {
  return request({
    url: '/system/login/doLogin',
    method: 'post',
    data
  })
}
