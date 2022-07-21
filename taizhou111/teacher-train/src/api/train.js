import request from '@/utils/request'

// 流程列表
export function getColumn(data) {
  return request({
    url: '/train/train-status/tree',
    method: 'get',
    data
  })
}

// 培训活动列表
export function getList(data) {
  return request({
    url: `/train/trainActivity/list?activeName=${data.activeName}&teacherStatusId=${data.teacherStatusId}&pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
    method: 'get'
  })
}

// 培训活动列表
export function getList11(data) {
  return request({
    url: `/train/trainActivity/list?activeName=${data.activeName}&teacherStatusId=${data.teacherStatusId}&pageNum=${data.pageNum}&pageSize=${data.pageSize}&type=${0}`,
    method: 'get'
  })
}



// 区域树结构
export function getTree(data) {
  return request({
    url: `/system/area/tree`,
    method: 'get',
    data
  })
}

// 保存培训活动
export function addActivity(data) {
  return request({
    url: '/train/trainActivity/save',
    method: 'post',
    data
  })
}

// 培训活动统计
export function getStatistical(data) {
  return request({
    url: `/train/trainActivity/statistical?activeName=${data.activeName}&pageNum=${data.pageNum}&pageSize=${data.pageSize}&type=${data.type}`,
    method: 'get'
  })
}

// 删除培训活动
export function deleteData(ids) {
  return request({
    url: `/train/trainActivity/delete?id=${ids}`,
    method: 'delete'
  })
}

// 培训活动详情
export function getDetail(id) {
  return request({
    url: `/train/trainActivity/info/${id}`,
    method: 'get'
  })
}

// 负责区域责任人
export function getTrainList(data) {
  return request({
    url: `/train/trainActivity/trainInstallList?pageNum=${data.pageNum}&pageSize=${data.pageSize}&activeId=${data.activeId}`,
    method: 'get'
  })
}

// 用户列表
export function getUserList(data) {
  return request({
    url: `/system/user/list?pageNum=${data.pageNum}&pageSize=${data.pageSize}&realName=${data.realName}&schoolName=${data.schoolName}`,
    method: 'get'
  })
}

// 指定区域负责人
export function setSpecity1(data) {
  return request({
    url: `/train/trainActivity/specify?&userIds=${data.userIds}&type=${data.type}&installId=${data.installId}`,
    method: 'get'
  })
}

// 指定负责人
export function setSpecity(data) {
  return request({
    url: `/train/trainActivity/specify?areaId=${data.areaId}&userIds=${data.userIds}&type=${data.type}&activeId=${data.activeId}`,
    method: 'get'
  })
  /* by zhangzhi
    这里提交区域负责人和学校负责人
    提交学校负责人：参数areaId:学校id（不是区域id），activeId:活动id
  */
  let url = `/train/trainActivity/specify?installId=${data.installId}&userIds=${data.userIds}`
  // 指定学校负责人必须带上type
  if (data.type != undefined) {
    url =
      `/train/trainActivity/specify?areaId=${data.installId}&userIds=${data.userIds}&type=${data.type}&activeId=${data.activeId}`
  }
  return request({
    url: url,
    method: 'get'
  })
}

// 删除负责区域
export function deleteArea(id) {
  return request({
    url: `/train/trainActivity/deleteInstall?id=${id}`,
    method: 'delete'
  })
}

// 删除帖子
export function deleteTopic(id) {
  return request({
    url: `/myactivity/myTopic/delActivityTopic?topicId=${id}`,
    method: 'delete'
  })
}

// 课程分类
export function getCourse(id) {
  return request({
    url: `/train/trainCourseCategory/tree?activeId=${id}`,
    method: 'get'
  })
}

// 学情统计
export function learningLong(data) {
  return request({
    url: `/train/learningSituation/learningLong?pageNum=${data.pageNum}&pageSize=${data.pageSize}&activeId=${data.activeId}`,
    method: 'get'
  })
}

// 主题列表控制层
export function getTheme(data) {
  return request({
    url: `/train/trainTheme/list?pageNum=${data.pageNum}&pageSize=${data.pageSize}&activeId=${data.activeId}`,
    method: 'get'
  })
}

// 删除主题
export function deleteTheme(id) {
  return request({
    url: `/train/trainTheme/deleteTrainTheme?id=${id}`,
    method: 'delete'
  })
}

// 作业列表控制层
export function getWorkList(data) {
  return request({
    url: `/train/trainWork/list?pageNum=${data.pageNum}&pageSize=${data.pageSize}&activeId=${data.activeId}`,
    method: 'get'
  })
}

// 删除作业
export function deleteWork(id) {
  return request({
    url: `/train/trainWork/deleteTrainTheme?id=${id}`,
    method: 'delete'
  })
}

// 教师培训报名列表
export function getReport(data) {
  return request({
    url: `/train/trainSignup/list1?activityId=${data.activityId}&name=${data.name}&schoolName=${data.schoolName}&state=${data.state}&areaId=${data.areaId}&pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
    method: 'get'
  })
}
// 教师培训报名列表
export function getReport1(data) {
  return request({
    url: `/train/trainSignup/list1?activityId=${data.activityId}&name=${data.name}&schoolName=${data.schoolName}&state=${data.state}&areaId=${data.areaId}&pageNum=${data.pageNum}&pageSize=${data.pageSize}&train=${data.train}`,
    method: 'get'
  })
}
// 删除报名
export function deleteReport(id) {
  return request({
    url: `/train/trainSignup/delete?id=${id}`,
    method: 'delete'
  })
}

// 用户列表
export function getUserName(data) {
  return request({
    url: `/system/user/list?pageNum=${data.pageNum}&pageSize=${data.pageSize}&realName=${data.realName}&schoolName=${data.schoolName}`,
    method: 'get'
  })
}

// 添加报名
export function addReport(data) {
  return request({
    url: '/train/trainSignup/addTrainSignup',
    method: 'post',
    data
  })
}

// 添加课程分类
export function addTrainCourse(data) {
  return request({
    url: '/train/trainCourseCategory/addTrainCourseCategory',
    method: 'post',
    data
  })
}

// 状态审核
export function auditStatus(data) {
  return request({
    url: '/train/trainSignup/update',
    method: 'post',
    data
  })
}

// 更改培训活动状态
export function editStatus(data) {
  return request({
    url: '/train/trainActivity/updateStatus',
    method: 'post',
    data
  })
}

// 看课时长统计
export function getHourlog(data) {
  return request({
    url: `/train/videoStatistics/hourLong?pageNum=${data.pageNum}&pageSize=${data.pageSize}&activeId=${data.activeId}`,
    method: 'get'
  })
}

// 看课时长学校统计
export function getHourLongSchool(data) {
  return request({
    url: `/train/videoStatistics/hourLongSchool?pageNum=${data.pageNum}&pageSize=${data.pageSize}&activeId=${data.activeId}&areaId=${data.areaId}&schoolName=${data.schoolName}`,
    method: 'get'
  })
}

// 查看截止看课日期
export function getResultTime(id) {
  return request({
    url: `/train/trainCourseCategory/trainStudyRequireCommonResult?id=${id}`,
    method: 'get'
  })
}

// 查看主题列表
export function getTrainTheme(data) {
  return request({
    url: `/train/trainTheme/seeTrainThemeResultList?activeId=${data.activeId}&pageNum=${data.pageNum}&pageSize=${data.pageSize}&name=${data.name}&theme=${data.theme}`,
    method: 'get'
  })
}

// 主题详情
export function getTrainDetail(id) {
  return request({
    url: `/train/trainTheme/trainThemeInfo?id=${id}`,
    method: 'get'
  })
}

// 作业列表统计
export function getResultList(data) {
  return request({
    url: `/train/trainWork/trainWorkResultList?pageNum=${data.pageNum}&pageSize=${data.pageSize}&activeId=${data.activeId}`,
    method: 'get'
  })
}

// 学情学校统计
export function getLongSchool(data) {
  return request({
    url: `/train/learningSituation/learningLongSchool?pageNum=${data.pageNum}&pageSize=${data.pageSize}&activeId=${data.activeId}&areaId=${data.areaId}&schoolName=${data.schoolName}`,
    method: 'get'
  })
}
// 学情学校统计另用接口
export function getLongSchool1(data) {
  return request({
    url: `/train/learningSituation/learningLongSchool?pageNum=${data.pageNum}&pageSize=${data.pageSize}&activeId=${data.activeId}&areaId=${data.areaId}&schoolName=${data.schoolName}&type=${data.type}`,
    method: 'get'
  })
}

// 参训结果统计区域
export function getEndLongResult(data) {
  return request({
    url: `/train/endStatistics/endLongResult?pageNum=${data.pageNum}&pageSize=${data.pageSize}&activeId=${data.activeId}`,
    method: 'get'
  })
}

// 参训结果学校统计
export function getLogSchool(data) {
  return request({
    url: `/train/endStatistics/endLongSchoolResult?pageNum=${data.pageNum}&pageSize=${data.pageSize}&activeId=${data.activeId}&areaId=${data.areaId}&schoolName=${data.schoolName}`,
    method: 'get'
  })
}

// 学情统计（学校管理员）
export function getLearnLong(data) {
  return request({
    url: `/train/endStatistics/endLongUserResult?pageNum=${data.pageNum}&pageSize=${data.pageSize}&activeId=${data.activeId}&schoolId=${data.schoolId}&train=${data.train}&name=${data.name}`,
    method: 'get'
  })
}

// 获取文件路径
export function getFileRoute(id) {
  return request({
    url: `/system/file/getAnnexUrl/${id}`,
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

// 课程分类列表
export function getCourseGory(id) {
  return request({
    url: `/train/trainCourseCategory/courseCategory?activeId=${id}`,
    method: 'get'
  })
}

// 删除课程分类
export function deleteTrainCourse(id) {
  return request({
    url: `/train/trainCourseCategory/deleteTrainCourseCategory?id=${id}`,
    method: 'delete'
  })
}

// 修改课程分类
export function editTrainCourse(data) {
  return request({
    url: `/train/trainCourseCategory/updateTrainCourseCategory?activityId=${data.activityId}&categoryName=${data.categoryName}&parentId=${data.parentId}`,
    method: 'post'
  })
}

// 视频课程-目录-资源列表
export function getCourseList(data) {
  return request({
    url: `/train/trainResource/activityResourceList?name=${data.name}&activityId=${data.activityId}&pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
    method: 'get'
  })
}

// 树结构平台信息维护
export function getType(type) {
  return request({
    url: `/system/dictionaries/tree/${type}`,
    method: 'get'
  })
}

// 课程分类
export function getAllTree(activityId) {
  return request({
    url: `/train/trainCourseCategory/AllTree?activeId=${activityId}`,
    method: 'get'
  })
}

// 保存资源
export function keepResources(data) {
  return request({
    url: '/train/trainResource/addDuration',
    method: 'post',
    data
  })
}

// 删除资源
export function deleteResources(id) {
  return request({
    url: `/train/trainResource/delete?id=${id}`,
    method: 'delete'
  })
}

// 资源详情
export function getResourceInfo(id) {
  return request({
    url: `/train/trainResource/info?id=${id}`,
    method: 'get'
  })
}

// 树结构平台信息维护
export function getDicteTree(type) {
  return request({
    url: `/system/dictionaries/tree/${type}`,
    method: 'get'
  })
}

// 保存时长
export function addDurate(data) {
  return request({
    url: '/train/trainCourseCategory/addDuration',
    method: 'post',
    data
  })
}

// 查看截止看课日期
export function getCommonResult(id) {
  return request({
    url: `/train/trainCourseCategory/trainStudyRequireCommonResult?id=${id}`,
    method: 'get'
  })
}

// 指定学习负责人列表
export function getSchoolResult(data) {
  return request({
    // url添加了activityId参数by zhangzhi
    url: `/train/trainSignup/specifiedSchoolResult?&pageNum=${data.pageNum}&pageSize=${data.pageSize}&schoolType=${data.schoolType}&schoolName=${data.schoolName}&activityId=${data.activeId}`,
    method: 'get'
  })
}

// 未报名用户
export function getSignUpUser(data) {
  return request({
    url: `/train/trainSignup/notSignUpUser?&pageNum=${data.pageNum}&pageSize=${data.pageSize}&activeId=${data.activeId}&name=${data.name}&schoolName=${data.schoolName}`,
    method: 'get'
  })
}

// 保存主题
export function saveTrainTheme(data) {
  return request({
    url: '/train/trainTheme/saveTrainTheme',
    method: 'post',
    data
  })
}

// 置顶主题
export function setAppoint(id) {
  return request({
    url: `/train/trainTheme/appoint?id=${id}`,
    method: 'get'
  })
}

// 研讨帖子详情
export function getTopic(id) {
  return request({
    url: `/myactivity/myTopic/topicDetail?topicId=${id}`,
    method: 'get'
  })
}

// 回复帖子列表
export function getReplayTopic(data) {
  return request({
    url: `/myactivity/myTopic/replayTopicList?activityId=${data.activityId}&topicId=${data.topicId}&pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
    method: 'get'
  })
}

// 保存帖子(主贴)
export function saveActivityTopic(data) {
  return request({
    url: '/myactivity/myTopic/saveActivityTopic',
    method: 'post',
    data
  })
}

// 区域培训管理培训统计学情统计
export function transtatistical(data) {
  return request({
    url: `/train/trainActivity/statistical?pageNum=${data.pageNum}&pageSize=${data.pageSize}&activeName=${data.activeName}&teacherStatusId=${data.teacherStatusId}&type=${data.type}`,
    method: 'get'
  })
}

// 学情统计详情
export function xueqingallinfo(data) {
  return request({
    url: `/train/learningSituation/learningLongSchool?pageNum=${data.pageNum}&pageSize=${data.pageSize}&activeId=${data.activeId}&areaId=${data.areaId}&schoolName=${data.schoolName}`,
    method: 'get'
  })
}

// 移除学校管理报名人员
export function removeschoolperson(id) {
  return request({
    url: `/train/trainSignup/delete?id=${id}`,
    method: 'delete'
  })
}

// 培训统计另用接口
export function statisticalinfo(data) {
  return request({
    url: `/train/learningSituation/learningLongSchool?pageNum=${data.pageNum}&pageSize=${data.pageSize}&activeId=${data.activeId}&schoolName=${data.schoolName}`,
    method: 'get'
  })
}

// 培训统计详情
export function statisticdetail(data) {
  return request({
    url: `/train/endStatistics/endLongUserResult?pageNum=${data.pageNum}&pageSize=${data.pageSize}&activeId=${data.activeId}&name=${data.name}&topicResult=${data.topicResult}&worksResult=${data.worksResult}&duration=${data.duration}`,
    method: 'get'
  })

}

// 讨论完成情况信息
export function getTopicInfo(id) {
  return request({
    url: `/myactivity/myActivity/detail/topicInfo?activityId=${id}`,
    method: 'get'
  })
}

// 检查是否有分类
export function checkPass(id) {
  return request({
    url: `/train/trainCourseCategory/check?id=${id}`,
    method: 'get'
  })
}

// 保存讨论时间
export function keepTimepic(data) {
  return request({
    url: '/train/trainCourseCategory/saveTrainActivityTopicTime',
    method: 'post',
    data
  })
}

// 修改资源
export function updateDurate(data) {
  return request({
    url: '/train/trainResource/updateDuration',
    method: 'post',
    data
  })
}

// 视频统计
export function getStatistics(data) {
  return request({
    url: `/train/videoStatistics/videoStatistics?activeId=${data.activeId}&type=${data.type}`,
    method: 'get'
  })
}
