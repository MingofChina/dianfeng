import request from '../utils/requers'
// 文旅巅峰大会信息
export function convention(query) {
  return request({
    url: '/api/Intopeak/Peak_News_Top',
    method: 'post',
    data:query
  })
}
// 首页接口
export function firstone(query) {
  return request({
    url: 'api/Index/Index',
    method: 'post',
    data:query

  })
}
// 搜索页面提交表单接口
export function formsjie(query) {
  return request({
    url: 'api/Index/Form_Action',
    method: 'post',
    data:query
  })
}
export function column(query) {
  return request({
    url: 'api/Commons/Column_Group',
    method: 'post',
    data:query
  })
}
// 搜索功能
export function search(query) {
  return request({
    url: 'api/Commons/Search_Func',
    method: 'post',
    data:query
  })
}
// 底部信息
export function BottomMessage(query) {
  return request({
    url: 'api/Commons/Bottom_Message',
    method: 'post',
    data:query
  })
}
// 巅峰介绍
export function productions(query) {
  return request({
    url: 'api/Intopeak/Peak_Introduction',
    method: 'post',
    data:query
  })
}

// 所有公共的banner图
// 巅峰介绍
export function banner(query) {
  return request({
    url: 'api/Commons/Banner',
    method: 'post',
    params: query
  })
}

// 走进巅峰要闻 巅峰大会内容
export function meetingContent(query) {
  return request({
    url: 'api/Intopeak/Peak_News_Top',
    method: 'post',
    data:query
  })
}

// 走进巅峰要闻
export function Storyhead(query) {
  return request({
    url: 'api/Intopeak/Peak_News_Bottom',
    method: 'post',
    data:query
  })
}
// 走近巅峰 要闻详情 页面

export function Storydetail(query) {
  return request({
    url: 'api/Intopeak/Peak_News_Detail',
    method: 'post',
    data:query

  })
}


// 走进巅峰 -合作伙伴
export function cooperation(query) {
  return request({
    url: 'api/Intopeak/Cooperative_Partner',
    method: 'post',
    data:query

  })
}


// 走进巅峰 -巅峰团队
export function team(query) {
  return request({
    url: 'api/Intopeak/Peak_Team',
    method: 'post',
    params: query
  })
}

// 走进巅峰 -巅峰团队-详情
export function teamdetail(query) {
  return request({
    url: 'api/Intopeak/Peak_Team_Detail',
    method: 'post',
    params: query
  })
}
// 走进巅峰 -巅峰风采
export function Mien(query) {
  return request({
    url: 'api/Intopeak/Peak_Style',
    method: 'post',
    params: query
  })
}

//巅峰业务
export function Business(query) {
  return request({
    url: 'api/Business/Business_Detail',
    method: 'post',
    params: query
  })
}

//产业联盟
export function leagues(query) {
  return request({
    url: 'api/Intopeak/Industrial_Alliance',
    method: 'post',
    params: query
  })
}



// 巅峰案例 
export function sexample(query) {
  return request({
    url: 'api/Cases/Case_List',
    method: 'post',
    params: query
  })
}

// 巅峰案例  --详情
export function sexampledetail(query) {
  return request({
    url: 'api/Cases/Case_Detail',
    method: 'post',
    params: query
  })
}

// 巅峰观点  --观点列表
export function viewpoints(query) {
  return request({
    url: 'api/Viewpoint/Industry_Perspective_List',
    method: 'post',
    params: query
  })
}


// 巅峰观点  -- 观点详情
export function viewpointdetail(query) {
  return request({
    url: 'api/Viewpoint/Industry_Perspective_Detail',
    method: 'post',
    params: query
  })
}

// 巅峰观点  -- 专业著作  列表页
export function specialty(query) {
  return request({
    url: 'api/Viewpoint/Major_Books_List',
    method: 'post',
    params: query
  })
}

// 巅峰观点  -- 专业著作  详情
export function specialtyde(query) {
  return request({
    url: 'api/Viewpoint/Major_Books_Detail',
    method: 'post',
    params: query
  })
}


//-- 联系我们  详情
export function relation(query) {
  return request({
    url: 'api/Contact/Contact_Us',
    method: 'post',
    params: query
  })
}

//-- 法律声明  
export function legislation(query) {
  return request({
    url: 'api/Contact/Legal_Declaration',
    method: 'post',
    params: query
  })
}


