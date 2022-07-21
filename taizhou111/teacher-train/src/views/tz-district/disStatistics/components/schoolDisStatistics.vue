<template>
	<div>
    <el-dialog
    	title="学校参训结果"
    	width="1100px"
    	:close-on-click-modal="false"
    	:modal="false"
    	:visible.sync="schoolDisStatistics"
      @close="close"
    >
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
			<vxe-column field="totalNumber" title="参训总人数" align="center" />
			<vxe-column field="completeNumber" title="看课完成人数" align="center" />
			<vxe-column field="discussNumber" title="讨论完成人数" align="center" />
			<vxe-column field="workNumber" title="作业完成人数" align="center" />
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
          @change="chosestate"
				>
					<el-option label="已完成" value="1" />
					<el-option label="未完成" value="0" />
				</el-select>
			</el-form-item>

			<el-form-item label="作业完成状态">
				<el-select
					v-model="form.approvalStatus1"
					clearable
					placeholder="请选择"
             @change="chosestate1"
				>
					<el-option label="已完成" value="1" />
					<el-option label="未完成" value="0" />
				</el-select>
			</el-form-item>

			<el-form-item label="讨论完成状态">
				<el-select
					v-model="form.approvalStatus2"
					clearable
					placeholder="请选择"
          @change="chosestate2"
				>
					<el-option label="已完成" value="1" />
					<el-option label="未完成" value="0" />
				</el-select>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="submits">查询</el-button>
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
      <vxe-column field="schoolName" title="学校名称" align="center" />
			<vxe-column field="name" title="姓名" align="center" />
			<vxe-column field="sex" title="性别" align="center" />
			<vxe-column field="sectionName" title="学段" align="center" />
			<vxe-column field="subject" title="学科" align="center" />
			<vxe-column field="phone" title="联系电话" align="center" />
			<vxe-column field="duration" title="看课完成状态" align="center" />
			<vxe-column field="topicResult" title="讨论完成状态" align="center" />
			<vxe-column field="worksResult" title="作业完成状态" align="center" />
		</vxe-table>

		<vxe-pager
			:current-page="tablePage.currentPage"
			:page-size="tablePage.pageSize"
			:total="tablePage.total"
      @page-change="pageChange"
		>
			<template #left>
				<span class="page-left">
					<el-button type="primary" size="small" plain  @click="exportExcels">导出Excel</el-button>
				</span>
			</template>
		</vxe-pager>
    	</el-dialog>
	</div>
</template>

<script>
 import { statisticalinfo,statisticdetail} from '@/api/train.js'

export default {
  name: 'schoolClassTimeStatistics',
  data() {
    return {
			form: {
			  name: '',
        approvalStatus:"",
        approvalStatus1:"",
        approvalStatus2:"",
			},
      schoolDisStatistics:false,
			tableData_1: [],
			tableData: [],
			tablePage: {
			  total: 0,
			  currentPage: 1,
			  pageSize: 10
			}
    }
  },
  props:['activictiesid','schoolnames'],
  methods: {
		// 给活动状态添加样式
		cellClassName({ row, column }) {
		  if (column.title === '学校名称') {
		    return 'cell-click'
		  }
		},
    shows(){

      this.tablePage={
			  total: 0,
			  currentPage: 1,
			  pageSize: 10
			}
      this.getlist()
      this.tabledata()
      this.schoolDisStatistics=true
    },
    pageChange ({ currentPage, pageSize }) {
       this.tablePage.currentPage = currentPage
       this.tablePage.pageSize = pageSize
       this.tabledata()
     },
     //导出
    exportExcels(){
    import('@/vendor/Export2Excel').then(excel => {
      const tHeader = ['学校名称', '姓名', '性别','学段','学科','联系电话','看课完成状态','讨论完成状态','作业完成状态'] // 表格
      const filterVal = ['name', 'sex', 'sectionName','subject','phone','duration','topicResult','worksResult'] // 表格内容
      const list = this.tableData
      const data = this.formatJson(filterVal, list)
      excel.export_json_to_excel({
        header: tHeader,
        data,
        filename: '区级培训管理统计' // 文件名
      })
    })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
     //下面的表格
 async  tabledata(){
        let  data = {
           duration:this.form.approvalStatus,
           pageSize:this.tablePage.pageSize,
           pageNum:this.tablePage.currentPage,
           activeId:this.activictiesid,
           name:this.form.name,
           topicResult:this.form.approvalStatus2,
           worksResult:this.form.approvalStatus1,
        }
      const  res  = await  statisticdetail(data)
      if(res.code==200){
        this.tableData=[]
        this.tableData=res.data.list
        this.tablePage.total=Number(res.data.total)
      }else{

      }
    },
   //上面的表格
    async  getlist(){
         let  data = {
           pageNum:1,
           pageSize:10,
           activeId: this.activictiesid,
           schoolName:this.schoolnames
         }
         const  res   = await  statisticalinfo(data)
         if(res.code==200){
           this.tableData_1=[]
           this.tableData_1=res.data.list
         }else{

         }
       },
   //下拉框事件
   chosestate(e){
     this.form.approvalStatus=e
   },
   chosestate1(e){
     this.form.approvalStatus1=e
   },
   chosestate2(e){
     this.form.approvalStatus2=e
   },
   //关闭
   close(){
     this.tablePage={
        total: 0,
        currentPage: 1,
        pageSize: 10
    }
    this.form={
			  name: '',
        approvalStatus:"",
        approvalStatus1:"",
        approvalStatus2:"",
			}

   },
   //查询
   submits(){
     this.tablePage={
       total: 0,
       currentPage: 1,
       pageSize: 10
     }
    this.tabledata()
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
