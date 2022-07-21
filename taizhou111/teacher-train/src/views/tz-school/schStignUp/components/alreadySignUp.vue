<template>
	<div>
      <el-dialog title="已报名" width="1200px"    :close-on-click-modal="false" :visible.sync="alreadySignUp" @closed="closed">
		<el-form :model="form" :inline="true" class="demo-form-inline">
			<el-form-item label="姓名:">
				<el-input
					v-model="tablePage.name"
					clearable
					placeholder="请输入"
				/>
			</el-form-item>

			<el-form-item label="单位:">
				<el-input
					v-model="tablePage.schoolName"
					clearable
					placeholder="请输入"
				/>
			</el-form-item>

			<el-form-item label="审核状态">
				<el-select
					v-model="tablePage.state"
					clearable
					placeholder="请选择"
          @change="choosedata"
				>
					<el-option label="未审核" value="2" />
					<el-option label="已通过" value="1" />
					<el-option label="未通过" value="0" />
				</el-select>
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
			:checkbox-config="{highlight: true}"
			@checkbox-change="checkboxChange" 
			@checkbox-all="checkboxChange"
			>
			<vxe-column type="checkbox" width="40" align="center" />
			<vxe-column type="seq" title="序号" width="60" align="center" />
			<vxe-column field="name" title="姓名" align="center" />
			<vxe-column field="sex" title="性别" align="center" />
			<vxe-column field="areaName" title="区域" align="center" />
			<vxe-column field="unit" title="单位" min-width="200" align="center" />
			<vxe-column field="sectionId" title="学段" align="center" />
			<vxe-column field="subjectId" title="学科" align="center" />
			<vxe-column field="state" title="审核状态" align="center" />
			<vxe-column field="createTime" title="报名时间" min-width="120" align="center" />
		</vxe-table>

		<vxe-pager
			:current-page="tablePage.currentPage"
			:page-size="tablePage.pageSize"
			:total="total"
			@page-change="pageChange"
		>
			<template #left>
				<span class="page-left">
					<el-button size="small" plain  @click="remove">移 除</el-button>
				<!-- 	<el-button type="primary" size="small" plain @click="chooseTeacher = true">选择参训教师</el-button> -->
				</span>
			</template>
		</vxe-pager>
       </el-dialog>
	</div>
</template>

<script>
 import { getReport,removeschoolperson } from '@/api/train.js';


export default {
  name: 'viewRegistrationResults',
  data() {
    return {
      datalist:[],
      alreadySignUp:false,
			form: {
			  name: '',
			  unit: '',
				state: ''
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
			tableData: [],
			loading: false,
      total:0,
			tablePage: {
			  total: 0,
			  currentPage:1,
			  pageSize: 10,
        name:"",
        schoolName:"",
        state:"",
        areaId:"",
        activityId:"",
			},
			chooseTeacher: false
    }
  },
  props:['activiid'],
  mounted(){

     // console.log(this.activiid,666)
    //  this.gettablelist()
  },
  methods: {
    showfalse1(){
         this.alreadySignUp=false
    },
    //移除信息
 async   remove(){
      if(this.datalist.length==0){
       this.$message({
         showClose: true,
         message:"请先勾选数据",
         type: 'error'
       })
        return
      }
     this.datalist=this.datalist.map((el)=>{
           return el.id
     })

     const  res =  await removeschoolperson(this.datalist)
       if(res.code==200){
         this.$message({
           showClose: true,
           message:"移除成功",
           type: 'success'
         })
      this.datalist=[]
      this.alreadySignUp=false
      this.$emit("update",1)
       }else {
      this.$message({
        showClose: true,
        message:"请先勾选数据",
        type: 'error'
      })
       }
    },
    choosedata(e){
     this.tablePage.state=e

    },
    shows(){
      this.alreadySignUp=true
    },
    closed(){
      this.	tablePage={
			  total: 0,
			  currentPage:1,
			  pageSize: 10,
        name:"",
        schoolName:"",
        state:"",
        areaId:"",
        activityId:"",
			},
      this.tablePage.currentPage=1
    },
 async  gettablelist(){
       this.tablePage.activityId=this.activiid
       this.tablePage.pageNum=this.tablePage.currentPage
      const  res  =await getReport(this.tablePage)
      if(res.code==200){
          this.tableData=[]
          this.tableData=res.data.list.map((el)=>{
             return {
                  ...el,
                  sex:el.sex==0?"女":el.sex==1?"男":"",
                  state:el.state==0?"未通过":"通过"
             }
          })
          this.total= Number(res.data.total)
          this.loading = false
      }else{

      }
    },
		// 查询
		onSubmit() {
		  this.loading = true
		  this.gettablelist()
		},
		// tableLists
		getLists(val) {
		  this.loading = false
		},
		// 给活动状态添加样式
		cellClassName({ row, column }) {
		  if (column.property === 'approvalStatus') {
		    if (row.approvalStatus === '未审核') {
		      return 'cell-wsh'
		    } else if (row.approvalStatus === '已通过') {
		      return 'cell-ytg'
		    } else if (row.approvalStatus === '未通过') {
		      return 'cell-wtg'
		    }
		  }
		},
		// 翻页
		pageChange({ currentPage, pageSize }) {
		  this.tablePage.currentPage= currentPage
		  this.tablePage.pageSize = pageSize
		  this.loading = true
		  this.gettablelist()
		},
		// 单选按钮
		checkboxChange(e) {
	  
	   this.datalist=[]
       this.datalist=e.records
	   console.log(e,444)
	   console.log( this.datalist,555555555555555)

		},
  }
}
</script>

<style lang="scss" scoped>
	.el-form--inline .el-form-item {
		margin-right: 16px;
	}
	::v-deep .vxe-table {
		.vxe-table--body {
			.cell-wsh, .cell-ytg, .cell-wtg {
				font-weight: bold;
				color: #F56C6C;
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
