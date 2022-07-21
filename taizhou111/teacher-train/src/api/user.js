import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/system/login/doLogin',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/system/login/userPermissionList',
    method: 'get',
    params: { token }
  })
}



export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

export function singlelogin(data) {
  return request({
    url: `/system/auth/authorize?ticket=${data}`,
    method: 'get',
  })
}