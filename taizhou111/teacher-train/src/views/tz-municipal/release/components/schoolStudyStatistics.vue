<template>
	<div>
		<vxe-table
			ref="xGrid"
			border
			stripe
			header-align="center"
			show-header-overflow
			show-overflow
			:row-config="{isHover: true}"
			:data="tableData_1"
			:edit-config="{trigger: 'manual', mode: 'row'}"
			style="margin-bottom: 20px;">
			<vxe-column field="schoolName" title="学校名称" align="center" />
			<vxe-column field="totalPeople" title="参训总人数" align="center" />
			<vxe-column field="completed" title="看课完成人数" align="center" />
			<vxe-column field="disCompleted" title="讨论完成人数" align="center" />
			<vxe-column field="opeCompleted" title="作业完成人数" align="center" />
		</vxe-table>
		
		<el-form :model="form" :inline="true" class="demo-form-inline">
			<el-form-item label="姓名:">
				<el-input
					v-model="form.name"
					clearable
					placeholder="请输入"
				/>
			</el-form-item>
			
			<el-form-item label="看课完成状态">
				<el-select
					v-model="form.approvalStatus"
					clearable
					placeholder="请选择"
				>
					<el-option label="已完成" value="ywc" />
					<el-option label="未完成" value="wwc" />
				</el-select>
			</el-form-item>
			
			<el-form-item label="作业完成状态">
				<el-select
					v-model="form.approvalStatus"
					clearable
					placeholder="请选择"
				>
					<el-option label="已完成" value="ywc" />
					<el-option label="未完成" value="wwc" />
				</el-select>
			</el-form-item>
			
			<el-form-item label="讨论完成状态">
				<el-select
					v-model="form.approvalStatus"
					clearable
					placeholder="请选择"
				>
					<el-option label="已完成" value="ywc" />
					<el-option label="未完成" value="wwc" />
				</el-select>
			</el-form-item>
			
			<el-form-item>
				<el-button type="primary">查询</el-button>
			</el-form-item>
		</el-form>
		
		<vxe-table
			ref="sGrid"
			border
			stripe
			header-align="center"
			show-header-overflow
			show-overflow
			:cell-class-name="cellClassName"
			:row-config="{isHover: true}"
			:data="tableData"
			:edit-config="{trigger: 'manual', mode: 'row'}" >
			<vxe-column type="seq" title="序号" width="60" align="center" />
			<vxe-column field="name" title="姓名" align="center" />
			<vxe-column field="gender" title="性别" align="center" />
			<vxe-column field="schoolSection" title="学段" align="center" />
			<vxe-column field="subject" title="学科" align="center" />
			<vxe-column field="contactNum" title="联系电话" align="center" />
			<vxe-column field="isItDone" title="看课完成人数" align="center" />
			<vxe-column field="disIsItDone" title="讨论完成人数" align="center" />
			<vxe-column field="opeIsItDone" title="作业完成人数" align="center" />
		</vxe-table>
		
		<vxe-pager
			:current-page="tablePage.currentPage"
			:page-size="tablePage.pageSize"
			:total="tablePage.total"
		>
			<template #left>
				<span class="page-left">
					<el-button type="primary" size="small" plain>导出Excel</el-button>
				</span>
			</template>
		</vxe-pager>
	</div>
</template>

<script>
export default {
  name: 'schoolClassTimeStatistics',
  data() {
    return {
			form: {
			  name: ''
			},
			tableData_1: [
			  { schoolName: '兴化实验小学', totalPeople: '1653', completed: '1000', disCompleted: '1000', opeCompleted: '1000' }
			],
			tableData: [
			  { schoolName: '兴化实验小学', name: '张三', gender: '男', schoolSection: '小学', subject: '语文', contactNum: '1561231234', isItDone: '已完成', disIsItDone: '未完成', opeIsItDone: '未完成' },
				{ schoolName: '兴化实验小学', name: '张三', gender: '男', schoolSection: '小学', subject: '语文', contactNum: '1561231234', isItDone: '已完成', disIsItDone: '未完成', opeIsItDone: '未完成' },
				{ schoolName: '兴化实验小学', name: '张三', gender: '男', schoolSection: '小学', subject: '语文', contactNum: '1561231234', isItDone: '已完成', disIsItDone: '未完成', opeIsItDone: '未完成' },
				{ schoolName: '兴化实验小学', name: '张三', gender: '男', schoolSection: '小学', subject: '语文', contactNum: '1561231234', isItDone: '已完成', disIsItDone: '未完成', opeIsItDone: '未完成' },
				{ schoolName: '兴化实验小学', name: '张三', gender: '男', schoolSection: '小学', subject: '语文', contactNum: '1561231234', isItDone: '已完成', disIsItDone: '未完成', opeIsItDone: '未完成' },
			],
			tablePage: {
			  total: 0,
			  currentPage: 1,
			  pageSize: 10
			}
    }
  },
  methods: {
		// 给活动状态添加样式
		cellClassName({ row, column }) {
		  if (column.title === '学校名称') {
		    return 'cell-click'
		  }
		},
  }
}
</script>

<style lang="scss" scoped>
	::v-deep .el-form  {
		.el-form-item {
			.el-checkbox-group {
				height: 36px;
			}
		}
	}
	::v-deep .vxe-table {
		.vxe-table--body {
			.vxe-body--column.cell-click {
				color: #409eff;
				cursor: pointer;
			}
		}
	}
	::v-deep .vxe-pager {
		padding-top: 10px;
		.vxe-pager--left-wrapper {
			float: left;
			margin: 0;
		}
	}
</style>
