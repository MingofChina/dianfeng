import request from '@/utils/request'



//获取发布活动表格信息
export function getActivitiesTableData(data) {
    return request({
      url: '/vue-element-admin/article/update',
      method: 'post',
      data
    })
  }
  