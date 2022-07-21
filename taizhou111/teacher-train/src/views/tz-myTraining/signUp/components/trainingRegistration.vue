<template>
	<el-card class="box-card">
		<el-form :model="form" :inline="true" class="demo-form-inline">
			<el-form-item label="活动名称">
				<el-input
					v-model="form.eventName"
					clearable
					placeholder="请输入"
				/>
			</el-form-item>
		
			<el-form-item>
				<el-button type="primary" @click="onSubmit">筛选</el-button>
			</el-form-item>
		</el-form>
		
		<vxe-table
			ref="xGrid"
			border
			stripe
			header-align="center"
			show-header-overflow
			show-overflow
			:row-config="{isHover: true}"
			:data="tableData"
			:loading="loading"
			:cell-class-name="cellClassName"
			:edit-config="{trigger: 'manual', mode: 'row'}"
			@cell-click="cellClick" >
			<vxe-column type="seq" title="序号" width="60" align="center" />
			<vxe-column field="eventName" title="活动名称" min-width="200" />
			<vxe-column field="unit" title="发起人单位" align="center" />
			<vxe-column field="time" title="培训时间" align="center" />
			<vxe-column field="trainingObject" title="培训对象" align="center" />
			<vxe-column field="deadline" title="报名截止" align="center" />
			<vxe-column field="state" title="报名状态" align="center" />
			<vxe-column field="audit" title="报名审核" align="center" />
			<vxe-column title="操作" align="center">
				<template #default="{ row }">
					<vxe-button type="text" status="primary" content="我要报名" />
					<vxe-button v-if="row.activeStatus === '培训中'" type="text" status="primary" content="去学习" />
				</template>
			</vxe-column>
		</vxe-table>
		
		<vxe-pager
			:current-page="tablePage.currentPage"
			:page-size="tablePage.pageSize"
			:total="tablePage.total"
			@page-change="pageChange"
		>
		</vxe-pager>
	</el-card>
</template>

<script>
export default {
  name: 'trainingRegistration',
  data() {
    return {
			form: {
			  eventName: ''
			},
			tableData: [
			  { eventName: '2022年泰州师说全员培训', unit: '泰州市教育局', time: '2022/06/30~2022/08/20', trainingObject: '全体教师', deadline: '2022-07-15 18:00', state: '未报名', audit: '已通过' },
			  { eventName: '2022年泰州师说全员培训', unit: '泰州市教育局', time: '2022/06/30~2022/08/20', trainingObject: '全体教师', deadline: '2022-07-15 18:00', state: '未报名', audit: '已通过' },
			  { eventName: '2022年泰州师说全员培训', unit: '泰州市教育局', time: '2022/06/30~2022/08/20', trainingObject: '全体教师', deadline: '2022-07-15 18:00', state: '未报名', audit: '已通过' },
			  { eventName: '2022年泰州师说全员培训', unit: '泰州市教育局', time: '2022/06/30~2022/08/20', trainingObject: '全体教师', deadline: '2022-07-15 18:00', state: '未报名', audit: '已通过' },
			  { eventName: '2022年泰州师说全员培训', unit: '泰州市教育局', time: '2022/06/30~2022/08/20', trainingObject: '全体教师', deadline: '2022-07-15 18:00', state: '未报名', audit: '已通过' },
			],
			loading: false,
			tablePage: {
			  total: 0,
			  currentPage: 1,
			  pageSize: 10
			},
    }
  },
  methods: {
		// 给活动状态添加样式
		cellClassName({ row, column }) {
		  if (column.property === 'activeStatus') {
		    if (row.activeStatus === '准备阶段') {
		      return 'cell-zb'
		    } else if (row.activeStatus === '报名中') {
		      return 'cell-bm'
		    } else if (row.activeStatus === '培训中') {
		      return 'cell-px'
		    } else if (row.activeStatus === '评价中') {
		      return 'cell-pj'
		    } else if (row.activeStatus === '已结束') {
		      return 'cell-js'
		    }
		  }
		  if (column.title === '培训活动') {
		    return 'cell-click'
		  }
		},
		// 给培训活动添加点击事件
		cellClick({ row, column }) {
		  if (column.title === '培训活动') {
		    this.$router.push({
		      path: '/tz-municipal/release/components/eventManagement'
		    })
		  }
		},
  }
}
</script>

<style lang="scss" scoped>
	.el-card.box-card {
	  min-height: calc(100vh - 204px);
		border-radius: 6px;
		box-shadow: 0 0 24px 0 rgba(51, 117, 185, 0.35);
	}
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
</style>
