import request from '@/utils/request'

// 获取培训信息列表
export function getpracticelist(data) {
    return request({
        url: `/myactivity/myActivity/list?finished=${data.finished}`,
        method: 'get'
    })
}

// 获取项目首页头部信息
export function getheaderinfo(data) {
    return request({
        url: `/myactivity/myActivity/detail/activityInfo?activityId=${data}`,
        method: 'get'
    })
}

// 获取培训简介
export function practicedetail(data) {
    return request({
        url: `/myactivity/myActivity/detail/activityIntroducation?activityId=${data}`,
        method: 'get'
    })
}
// 讨论最新列表

export function latestinfo(data) {
    return request({
        url: `/myactivity/myActivity/detail/topicList?activityId=${data.activityId}&limit=${data.limit}`,
        method: 'get'
    })
}
// 我的课程学习信息
export function mystudyinfo(data) {
    return request({
        url: `/myactivity/myActivity/detail/studyInfo?activityId=${data}`,
        method: 'get'
    })
}

// 讨论完成情况信息
export function finshinfo(data) {
    return request({
        url: `/myactivity/myActivity/detail/studyProcess?activityId=${data}`,
        method: 'get'
    })
}
// 获取数据字典列表

export function datalist(data) {
    return request({
        url: `/myactivity/dict/list`,
        method: 'get',
        params: data
    })
}
//获取学段
export function datalist111(data) {
    return request({
        url: `/myactivity/myCourse/getCourseSubjectList?includeAll=${data.includeAll}&activityId=${data.activityId}`,
        method: 'get'
    })
}

// 获取所有课程
export function getallcourse(data) {
    return request({
        url: `/myactivity/myCourse/list?activityId=${data.activityId}&completeFlag=${data.completeFlag}&pageNum=${data.pageNum}&pageSize=${data.pageSize}&sectionId=${data.sectionId}&subjectId=${data.subjectId}&courseCategoryId=${data.courseCategoryId}`,
        method: 'get'
    })
}

// 研讨列表信息
export function discusslist(data) {
    return request({
        url: `/myactivity/myTopic/list?activityId=${data.activityId}&pageNum=${data.pageNum}&pageSize=${data.pageSize}&keyword=${data.keyword}&userId=${data.userId}&topicId=${data.topicId}`,
        method: 'get'
    })
}

// 我的课程学习信息
export function getfilelist(data) {
    return request({
        url: `/myactivity/mirror/list`,
        method: 'get'
    })
}

// 获取视频课程时长
export function getvideoinfo(data) {
    return request({
        url: `/myactivity/myCourse/courseInfo`,
        method: 'get'
    })
}
// 视频课程详情
export function getcourseinfo(data){
    return request({
        url: `/myactivity/myCourse/courseInfo?resourceId=${data.resourceId}&activityId=${data.activityId}`,
        method: 'get'
    })
}
// 获取资源列表
export function getroulist(data) {
    return request({
        url: `/myactivity/myCourse/courseListByCategory?activityId=${data.activityId}&sectionId=${data.sectionId}&subjectId=${data.subjectId}&courseCategoryId=${data.courseCategoryId}`,
        method: 'get'
    })
}
// 获取附件列表
export function getfileslist(data) {
    return request({
        url: `/myactivity/myCourse/attachmentListBy?resourceId=${data}`,
        method: 'get'
    })
}
// 将当前视频播放时间传给后端
export function uploadvideotime(data) {
    return request({
        url: `/myactivity/studyLog/updateStudyLog`,
        method: 'post',
        data
    })
}
// 更新用户的学段信息
export function editusersectioninfo(data) {
    return request({
        url: `/myactivity/userActivitySection/updateUserActivitySection`,
        method: 'post',
        data,
    })
}
// 获取绑定的学段
export function getsecbindsections(data) {
    return request({
        url: `/myactivity/userActivitySection/getUserSections?activityId=${data}`,
        method: 'get'
    })
}

//课程分类
export function coursecategory(data) {
    return request({
        url: `/train/trainCourseCategory/tree?activeId=${data}`,
        method: 'get'
    })
}

//研讨列表
export function discusstablelist(data){
    return request({
        url:`/myactivity/myTopic/list?pageNum=${data.pageNum}&pageSize=${data.pageSize}&keyword=${data.keyword}&courseCategoryId=${data.courseCategoryId}&activityId=${data.activityId}`,
        method: 'get'
    })
}
//验证完成信息情况
export function isfinishsend(data){
    return request({
        url: `/myactivity/myActivity/detail/topicInfo?activityId=${data}`,
        method: 'get'
    })
}
//获取上次播放的进度
export function getlatestprogress(data) {
    return request({
        url: `/myactivity/myCourse/courseInfo?resourceId=${data}`,
        method: 'get'
    })
}
