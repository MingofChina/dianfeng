<template>
	<el-card class="box-card">
		<div>
			<h5 class="redText">说明：如果您在第三方系统中进行了测评，可以将测试的结果导入到此系统中。具体操作步骤如下：</h5>
			<ul>
				<li>1、可在此处导出本次培训活动所有的参训人员信息（推荐用“问卷星”）（包括姓名、登录账号、学校等信息）；</li>
				<li>2、在第三方系统中用导入参训人员信息，生成相应的考试密码并进行考试；</li>
				<li>3、将考试的成绩导入到系统中。</li>
			</ul>
		</div>
		
		<el-tabs v-model="activeName">
			<el-tab-pane label="导出参训人员信息" name="first">
				<el-form :model="form" :inline="true" class="demo-form-inline">
					<el-form-item label="姓名:">
						<el-input
							v-model="form.name"
							clearable
							placeholder="请输入"
						/>
					</el-form-item>
					
					<el-form-item label="单位:">
						<el-input
							v-model="form.units"
							clearable
							placeholder="请输入"
						/>
					</el-form-item>
				
					<el-form-item label="考试状态">
						<el-select
							v-model="form.approvalStatus"
							clearable
							placeholder="请选择"
						>
							<el-option label="已完成" value="ywc" />
							<el-option label="未完成" value="wwc" />
						</el-select>
					</el-form-item>
					
					<el-form-item label="区域">
						<el-cascader
							v-model="form.area"
							:options="options"
							clearable
							placeholder="请选择" />
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
					:edit-config="{trigger: 'manual', mode: 'row'}" >
					<vxe-column type="seq" title="序号" width="60" align="center" />
					<vxe-column field="area" title="区域" align="center" />
					<vxe-column field="schoolName" title="学校名称" align="center" />
					<vxe-column field="name" title="姓名" align="center" />
					<vxe-column field="loginAccount" title="登录账号" align="center" />
					<vxe-column field="gender" title="性别" align="center" />
					<vxe-column field="schoolSection" title="学段" align="center" />
					<vxe-column field="subject" title="学科" align="center" />
					<vxe-column field="contactNum" title="联系电话" align="center" />
					<vxe-column field="examCompletionStatus" title="考试完成状态" align="center" />
				</vxe-table>
				
				<vxe-pager
					:current-page="tablePage.currentPage"
					:page-size="tablePage.pageSize"
					:total="tablePage.total"
					@page-change="pageChange"
				>
					<template #left>
						<span class="page-left">
							<el-button type="primary" size="small" plain>导出Excel</el-button>
						</span>
					</template>
				</vxe-pager>
			</el-tab-pane>
			
			<el-tab-pane label="导入/查看考试成绩" name="second">
				<h5 class="redText">说明：请先严格根据导入模板各列内容及顺序（要导入的表格各列顺序必须与模板完成一致），整理好后，在下方“考试成绩”处选择附件，并执行导入。</h5>
				
				<el-form :inline="true" class="demo-form-inline">
					<el-form-item label="考试成绩:">
						<el-upload
							class="upload-demo"
							action="https://jsonplaceholder.typicode.com/posts/"
							:on-preview="handlePreview"
							:on-remove="handleRemove"
							:before-remove="beforeRemove"
							multiple
							:limit="3"
							:on-exceed="handleExceed"
							:file-list="fileList">
							<el-button type="primary" plain>点击上传</el-button>
							<div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件</div>
						</el-upload>
					</el-form-item>
				
					<el-form-item>
						<el-button type="primary">开始导入</el-button>
						<h5 class="redText">说明：导入时间较长，请点击“开始导入”后请耐心等待，直至显示完成提示，不要重复导入。</h5>
					</el-form-item>
				</el-form>
				
				<el-form :model="form_1" :inline="true" class="demo-form-inline">
					<el-form-item label="姓名:">
						<el-input
							v-model="form_1.name"
							clearable
							placeholder="请输入"
						/>
					</el-form-item>
					
					<el-form-item label="单位:">
						<el-input
							v-model="form_1.units"
							clearable
							placeholder="请输入"
						/>
					</el-form-item>
					
					<el-form-item label="区域">
						<el-cascader
							v-model="form_1.area"
							:options="options"
							clearable
							placeholder="请选择" />
					</el-form-item>
				
					<el-form-item>
						<el-button type="primary">查询</el-button>
					</el-form-item>
				</el-form>
				
				<el-form :model="form_2" :inline="true" class="demo-form-inline">
					<el-form-item label="考试合格分数线:">
						<el-input
							v-model="form_2.fractionalLine"
							clearable
							style="width: 120px;"
						/>
					</el-form-item>
				
					<el-form-item>
						<el-button type="primary">批量设置考试结果</el-button>
					</el-form-item>
				</el-form>
				
				<vxe-table
					ref="sGrid"
					border
					stripe
					header-align="center"
					show-header-overflow
					show-overflow
					:row-config="{isHover: true}"
					:data="tableData_1"
					:loading="loading"
					:cell-class-name="cellClassName_1"
					:edit-config="{trigger: 'manual', mode: 'row'}" >
					<vxe-column type="seq" title="序号" width="60" align="center" />
					<vxe-column field="area" title="区域" align="center" />
					<vxe-column field="schoolName" title="学校名称" align="center" />
					<vxe-column field="name" title="姓名" align="center" />
					<vxe-column field="gender" title="性别" align="center" />
					<vxe-column field="schoolSection" title="学段" align="center" />
					<vxe-column field="subject" title="学科" align="center" />
					<vxe-column field="score" title="成绩" align="center" />
					<vxe-column field="eligibility" title="是否合格" align="center" />
				</vxe-table>
				
				<vxe-pager
					:current-page="tablePage.currentPage"
					:page-size="tablePage.pageSize"
					:total="tablePage.total"
					@page-change="pageChange_1"
				>
					<template #left>
						<span class="page-left">
							<el-button type="primary" size="small" plain>导出Excel</el-button>
						</span>
					</template>
				</vxe-pager>
			</el-tab-pane>
		</el-tabs>
	</el-card>
</template>

<script>
export default {
  name: 'seminarDetails',
  data() {
    return {
			form: {
			  name: '',
			  units: '',
				approvalStatus: '',
				area: ''
			},
			form_1: {
			  name: '',
			  units: '',
				area: ''
			},
			form_2: {
				fractionalLine: ''
			},
			options: [{
				value: 'zhinan1',
				label: '01',
				children: [{
					value: 'shejiyuanze1',
					label: '01-1'
				}, {
					value: 'daohang1',
					label: '01-2'
				}]
			},{
				value: 'zhinan2',
				label: '02',
				children: [{
					value: 'shejiyuanze2',
					label: '02-1'
				}, {
					value: 'daohang2',
					label: '02-2'
				}]
			},{
				value: 'zhinan3',
				label: '03'
			}],
			activeName: 'first',
			tableData: [
			  { area: '兴化市', schoolName: '兴化实验小学', name: '张三', loginAccount: 'zhangsan', gender: '男', schoolSection: '小学', subject: '语文', contactNum: '1561231234', examCompletionStatus: '未完成' },
			  { area: '兴化市', schoolName: '兴化实验小学', name: '张三', loginAccount: 'zhangsan', gender: '男', schoolSection: '小学', subject: '语文', contactNum: '1561231234', examCompletionStatus: '已完成' },
			  { area: '兴化市', schoolName: '兴化实验小学', name: '张三', loginAccount: 'zhangsan', gender: '男', schoolSection: '小学', subject: '语文', contactNum: '1561231234', examCompletionStatus: '已完成' },
			  { area: '兴化市', schoolName: '兴化实验小学', name: '张三', loginAccount: 'zhangsan', gender: '男', schoolSection: '小学', subject: '语文', contactNum: '1561231234', examCompletionStatus: '已完成' },
			  { area: '兴化市', schoolName: '兴化实验小学', name: '张三', loginAccount: 'zhangsan', gender: '男', schoolSection: '小学', subject: '语文', contactNum: '1561231234', examCompletionStatus: '未完成' },
			],
			tableData_1: [
			  { area: '兴化市', schoolName: '兴化实验小学', name: '张三', gender: '男', schoolSection: '小学', subject: '语文', score: '75', eligibility: '合格' },
				{ area: '兴化市', schoolName: '兴化实验小学', name: '张三', gender: '男', schoolSection: '小学', subject: '语文', score: '75', eligibility: '合格' },
				{ area: '兴化市', schoolName: '兴化实验小学', name: '张三', gender: '男', schoolSection: '小学', subject: '语文', score: '75', eligibility: '合格' },
				{ area: '兴化市', schoolName: '兴化实验小学', name: '张三', gender: '男', schoolSection: '小学', subject: '语文', score: '75', eligibility: '不合格' },
				{ area: '兴化市', schoolName: '兴化实验小学', name: '张三', gender: '男', schoolSection: '小学', subject: '语文', score: '75', eligibility: '不合格' },
			],
			loading: false,
			tablePage: {
			  total: 0,
			  currentPage: 1,
			  pageSize: 10
			},
			tablePage_1: {
			  total: 0,
			  currentPage: 1,
			  pageSize: 10
			},
			fileList: [
				{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, 
				{name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
			]
    }
  },
  methods: {
		// 查询
		onSubmit() {
		  this.loading = true
		  this.getLists(1)
		},
		// tableLists
		getLists(val) {
		  this.loading = false
		},
    pageChange_1(){
      
    },
		// 给活动状态添加样式
		cellClassName({ row, column }) {
		  if (column.property === 'examCompletionStatus') {
		    if (row.examCompletionStatus === '已完成') {
		      return 'cell-ywc'
		    } else if (row.examCompletionStatus === '未完成') {
		      return 'cell-wwc'
		    }
		  }
		},
		cellClassName_1({ row, column }) {
		  if (column.property === 'eligibility') {
		    if (row.eligibility === '合格') {
		      return 'cell-hg'
		    } else if (row.eligibility === '不合格') {
		      return 'cell-bhg'
		    }
		  }
		},
		// 翻页
		pageChange({ currentPage, pageSize }) {
		  this.tablePage.currentPage = currentPage
		  this.tablePage.pageSize = pageSize
		  this.loading = true
		  this.getList(this.tablePage.currentPage)
		},
		handleRemove(file, fileList) {
			console.log(file, fileList);
		},
		handlePreview(file) {
			console.log(file);
		},
		handleExceed(files, fileList) {
			this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
		},
		beforeRemove(file, fileList) {
			return this.$confirm(`确定移除 ${ file.name }？`);
		}
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
		margin: 0 0 20px 0;
		padding: 0 0 0 40px;
		font-size: 14px;
		line-height: 1.5;
		color: #F56C6C;
	}
	.redText {
		margin: 12px 0;
		color: #F56C6C;
	}
	.el-form--inline .el-form-item {
		margin-right: 16px;
	}
	.el-form-item__content {
		.el-button + .redText {
			display: inline-block;
			margin: 0 0 0 12px;
		}
	}
	::v-deep .vxe-table {
		.vxe-table--body {
			.cell-wwc, .cell-bhg {
				font-weight: bold;
				color: #F56C6C;
			}
			.cell-ywc, .cell-hg {
				font-weight: bold;
				color: #67C23A;
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
