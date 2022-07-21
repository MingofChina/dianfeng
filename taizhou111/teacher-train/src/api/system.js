import request from '@/utils/request'

// 获取用户管理列表信息
export function getActivitiesTableData(data) {
    return request({
        url: `/system/user/list?areaId=${data.areaId}&loginName=${data.loginName}&pageSize=${data.pageSize}&pageNum=${data.pageNum}&realName=${data.realName}&roleId=${data.roleId}&schoolName=${data.schoolId}&sectionId=${data.sectionId}&subjectId=${data.subjectId}&useFlag=${data.useFlag}&notRoleId=${data.notRoleId}`,
        method: 'get'
    })
}
export function getActivities1(data) {
    return request({
        url: `/system/user/list?areaId=${data.areaId}&loginName=${data.loginName}&pageSize=${data.pageSize}&pageNum=${data.pageNum}&realName=${data.realName}&roleId=${data.roleId}&schoolId=${data.schoolId}&sectionId=${data.sectionId}&subjectId=${data.subjectId}&useFlag=${data.useFlag}&notUserId=${data.notUserId}`,
        method: 'get'
    })
}
// 获取区域树结构信息
export function gettreeinfo() {
    return request({
        url: '/system/area/tree',
        method: 'get'
    })
}

// 删除用户信息
export function deleteuserinfo(query) {
    return request({
        url: `/system/user/remove/${query}`,
        method: 'get',
        query
    })
}

// 获取学科信息 type==2为学科 1为学段
export function getsubjects(query) {
    return request({
        url: `/system/dictionaries/tree/${query}`,
        method: 'get',
        query
    })
}

// 角色信息获取
export function getroleinfo() {
    return request({
        url: `/system/role/list`,
        method: 'get'
    })
}
// 角色信息获取
export function getroledetail(id) {
    return request({
      url: `/system/role/info/${id}`,
      method: 'get'
    })
  }
  // 角色信息获取
  export function editRoledetail(data) {
    return request({
      url: `/system/role/edit`,
      method: 'post',
      data
    })
  }
// 获取单位信息列表
export function getunitinfo() {
    return request({
        url: `/system/area/mergeTree`,
        method: 'get'
    })
}

// 获取区域信息列表
export function getarealist(data) {
    return request({
        url: `/system/area/list?id=${data.id}&pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
        method: 'get'
    })
}

// 获取区域信息列表
export function deleteid(query) {
    return request({
        url: `/system/area/remove/${query}`,
        method: 'get'
    })
}

// 新建区域信息
export function newaddareainfo(data) {
    return request({
        url: '/system/area/add',
        method: 'post',
        data
    })
}
// 新建区域信息
export function editareainfo(data) {
    return request({
        url: '/system/area/edit',
        method: 'post',
        data
    })
}
// 用户新增保存
export function adduserinfo(data) {
    return request({
        url: '/system/user/add',
        method: 'post',
        data
    })
}

// 获取单位树结构
export function gettreeinfos() {
    return request({
        url: `/system/area/mergeTree`,
        method: 'get'
    })
}

// 获取用户信息
export function getuserinfo(data) {
    return request({
        url: `/system/user/info/${data}`,
        method: 'get'
    })
}
// 获取文件路径

export function geturlinfo(data) {
    return request({
        url: `/system/file/getAnnexUrl/${data}`,
        method: 'get'
    })
}

export function geturlobj(id) {
    return request({
        url: `/system/file/getAnnexInfoById/${id}`,
        method: 'get'
    })
}

// 获取本地路径
export function geturlpath(data) {
    return request({
        url: `/myactivity/mirror/list`,
        method: 'get'
    })
}

// 修改用户信息
export function edituserinfo(data) {
    return request({
        url: `/system/user/edit`,
        method: 'post',
        data
    })
}

// 获取单位列表
export function getunittablelist(data) {
    return request({
        url: `/system/school/list?name=${data.name}&areaId=${data.areaId}&pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
        method: 'get'
    })
}
// 删除单位信息
export function deletunitinfos(data) {
    return request({
        url: `/system/school/remove/${data}`,
        method: 'get'
    })
}

// 新增单位信息
export function newaddunitinfo(data) {
    return request({
        url: `/system/school/add`,
        method: 'post',
        data
    })
}

//修改单位信息
export function editunitinfo(data) {
    return request({
        url: `/system/school/edit`,
        method: 'post',
        data
    })
}

//获取单位信息
export function getunitinformations(data) {
    return request({
        url: `/system/school/info/${data}`,
        method: 'get'
    })
}

//获取角色授权列表
export function getrolelist(data) {
    return request({
        url: `/system/userAuthorization/list?pageNum=${data.pageNum}&pageSize=${data.pageSize}&type=${data.type}`,
        method: 'get'
    })
}
//删除人员信息
export function deletesystemuser(data) {
    return request({
        url: `/system/userAuthorization/removeSchoolManager`,
        method: 'post',
        data
    })
}

//指定角色
export function surerole(data) {
    return request({
        url: `/system/userAuthorization/appointSchoolManager`,
        method: 'post',
        data
    })
}
// 权限树结构
export function getPermissionTree() {
  return request({
    url: `/system/permission/tree`,
    method: 'get'
  })
}

export function addPermissionTree (data) {
  return request({
    url: '/system/permission/add',
    method: 'post',
    data
  })
}
export function editPermissionTree (data) {
  return request({
    url: '/system/permission/edit',
    method: 'post',
    data
  })
}

export function delPermissionTree (id) {
  return request({
    url: `/system/permission/del/${id}`,
    method: 'get'
  })
}

//获取学校管理员列表
export function getschoolmanger (data) {
    return request({
      url: `/system/userAuthorization/schoolList?areaId=${data.areaId}&name=${data.name}&pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
      method: 'get'
    })
  }

//获取排除人员id
export function getpaichuperson (data) {
    return request({
      url: `/system/userAuthorization/getUserListBySchoolId/${data}`,
      method: 'get'
    })
  }
