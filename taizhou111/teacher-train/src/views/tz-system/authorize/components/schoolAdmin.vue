<template>
	<div>
		<el-form :model="form" :inline="true" class="demo-form-inline">
		<el-form-item label="单位名称">
						<el-input
							v-model="form.unit"
							clearable
							placeholder="请输入"
						/>
					</el-form-item>

				  <el-form-item label="区域">
             <el-cascader v-model="form.areaId"
                     placeholder="请选择区域"
                     :options="options"
                     :props="{ checkStrictly: true }"
                     @visible-change="handleChange" 
					 
					 />
      </el-form-item>

					<el-form-item>
						<el-button type="primary" @click="onSubmit">筛选</el-button>
							<el-button type="primary" @click="remove">重置</el-button>
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

					:edit-config="{trigger: 'manual', mode: 'row'}"
					:radio-config="{highlight: true}"
				
					@cell-click="cellClick" >
				
					<vxe-column field="name" title="单位名称" align="center" />
					<vxe-column field="areaName" title="所属区域" align="center" />
					<!-- <vxe-column field="khSchoolType" title="单位类型" align="center" /> -->
					<vxe-column field="manageUsername" title="管理员姓名" min-width="200" />
					<vxe-column field="createTime" title="创建时间" align="center" />
					<vxe-column title="操作" align="center">
						<template #default="{ row }">
							<vxe-button type="text" status="primary" @click="sureperson(row,1)"   content="指 定" />
							<vxe-button type="text" status="primary"  @click="deleteinfo(row,2)"  content="删 除" />
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

              <el-dialog title="指定学校管理员" :visible.sync="dialogTableVisible">

              	<vxe-table
					ref="xGrid"
					border
					stripe
					header-align="center"
					show-header-overflow
					show-overflow
					:row-config="{isHover: true}"
					:data="tableData1"
					:loading="loading"
					:edit-config="{trigger: 'manual', mode: 'row'}"
					@checkbox-change="checkboxChange"
					:radio-config="{highlight: true}"
				    >
				  <vxe-column type="checkbox"
                  width="40"
                  align="center" />
      <vxe-column field="realName"
                  title="姓名"
                  align="center" />
      <vxe-column field="loginName"
                  title="登录名"
                  align="center" />
      <vxe-column field="sex"
                  title="性别"
                  align="center" />
      <vxe-column field="schoolName"
                  title="单位"
                  min-width="200"
                  align="center" />
      <vxe-column field="roleName"
                  title="角色"
                  align="center" />
      <vxe-column field="useFlag"
                  title="状态"
                  align="center" />
				</vxe-table>
				<vxe-pager
					:current-page="tablePage1.currentPage1"
					:page-size="tablePage1.pageSize1"
					:total="tablePage1.total"
					@page-change="pageChange1"
				>
				</vxe-pager>
            <el-button type="primary"   @click="submitinfos">提交</el-button>
            </el-dialog>


               <el-dialog title="移除学校管理员" :visible.sync="shows">

              	<vxe-table
					ref="xGrid"
					border
					stripe
					header-align="center"
					show-header-overflow
					show-overflow
					:row-config="{isHover: true}"
					:data="tableData4"
					:loading="loading"
					:edit-config="{trigger: 'manual', mode: 'row'}"
					@checkbox-change="changebox"
					:radio-config="{highlight: true}"
				    >
				  <vxe-column type="checkbox"
                  width="40"
                  align="center" />
      <vxe-column field="realName"
                  title="姓名"
                  align="center" />
      <vxe-column field="tel"
                  title="手机号"
                  align="center" />
  
				</vxe-table>
            <el-button type="primary"   @click="removes" style="margin-top:20px">移除</el-button>
            </el-dialog>


	</div>
</template>

<script>
 import {getschoolmanger,gettreeinfo,deletesystemuser,getActivities1,getpaichuperson,surerole} from '../../../../api/system.js'


export default {
  name: 'newTrainingJob',
  data() {
    return {
	     	shows:false,
		   schoolidss:"",
		    tableData1:[],
				status1:"",
			form: {
				loginName: '',
				name: '',
				unit: '',
				state: '',
				roles: '',
				subject: '',
				areaId: ''
			},
			tableData4:[],
			 form1: {
        loginName: '',
	
        realName: '',
        schoolId: '',
        useFlag: '',
        roleId: '',
        subjectId: '',
        pageNum: 1,
        pageSize: 10,
        sectionId: '',
        subjectId: '',
        areaId: '',
        notUserId:"",
      },
	  datalists1:[],
	  deletedata:[],
			areadatas:"",
			dialogTableVisible:false,
			options:[],
			tableData: [],
			loading: false,
			tablePage: {
			  total: 0,
			  currentPage: 1,
			  pageSize: 10
			},
			tablePage1:{
			  total1: 0,
			  currentPage1: 1,
			  pageSize1: 10
			},
    }
  },
  methods: {
	//提交
async	submitinfos(){
     if(this.deletedata.length==0){
          this.$message({
          showClose: true,
          message: '请勾选数据',
          type: 'error'
        })
	  return
	 }
	 let param ={
           roleType:4,
		   schoolId:this.schoolidss,
		   userIds:this.deletedata
	 }
    const  res =await surerole(param)
        if(res.code==200){
         this.$message({
          showClose: true,
          message:"指定成功",
          type: 'success'
        })
        this.dialogTableVisible=false
          this.tablePage={
			  total: 0,
			  currentPage:1,
			  pageSize: 10
			}
		this.deletedata=[]
		this.schoolidss=""
        this.gettablelist()
		}
	},
     // 勾选表格数据
    checkboxChange (e,) {
	  this.deletedata=[]
      this.deletedata = e.records.map((el)=>{
            return el.id
	  })
    },
    //指定
	sureperson(e,b){
		this.status1=b
	this.schoolidss=e.id
     //获取排除人员
     this.getuserids()
	},
	changebox(e){
      this.datalists1=[]
    this.datalists1 = e.records.map((el)=>{
            return el.id
	  })
	},
async	removes(){
     if(this.datalists1.length==0){
        this.$message({
          showClose: true,
          message:"请先勾选数据",
          type: 'error'
        })
       return
	 }
	 let  data1 ={
       delType:4,
	   ids:this.datalists1,
       type:1,
	 }

     const  res = await deletesystemuser(data1)
      if(res.code==200){
            this.shows=false
			this.datalists1=[]
            this.tablePage={
			  total: 0,
			  currentPage: 1,
			  pageSize: 10
			}
           this.gettablelist()
	  }
	},
  async	  getuserids(){
     let  data = this.schoolidss
     const res  =await getpaichuperson(data) 
	     this.form1.notUserId=""
		  if(res.data.length!=0){
		 
         this.form1.notUserId=res.data.map((el)=>{
            return el.userId
		 })
         this.form1.notUserId=this.form1.notUserId.toString()

		  }else{
		  this.form1.notUserId=""
		  }
        this.getdatas()
	},
   async  getdatas(){
	   this.form1.pageNum=this.tablePage1.currentPage1
	   this.form1.pageSize=this.tablePage1.pageSize1
     const res =await getActivities1(this.form1)
    //   console.log(res,444444444)
        this.tableData1=[]
        this.tableData1=res.data.list
         this.tablePage1.total = Number(res.data.total)
          this.tableData1 = res.data.list.map(el => {
            return {
              ...el,
              sex: el.sex == 0 ? '女' : '男',
              useFlag: el.useFlag == 0 ? '禁用' : el.useFlag == 1 ? '正常' : el.useFlag == 2 ? '退休' : '调离'
            }
          })
		 this.dialogTableVisible=true
	},
    //删除
  async	 deleteinfo(e,b){
     	 this.status1=b
         this.schoolidss=e.id
         this.getremovelist()
	},
  async   getremovelist(){
       let  data = this.schoolidss
    const  res  =await getpaichuperson(data)
          if(res.code==200){
            this.tableData4=[]
            this.tableData4=res.data
            this.shows=true
		  }
  },
     pageChange1(e){
	 console.log()
     this.tablePage1.pageSize1=e.pageSize
     this.tablePage1.currentPage1=e.currentPage
     this.getdatas()
	},
	handleChange(e){
   
    let data = this.form.areaId
    this.areadatas=data.slice(-1)[0]

	},
	 onSubmit(){
		 this.tablePage={
			  total: 0,
			  currentPage: 1,
			  pageSize: 10
			}
    this.gettablelist()
     },
     pageChange(e){
     this.tablePage.pageSize=e.pageSize
     this.tablePage.currentPage=e.currentPage
     this.gettablelist()
     },
     cellClick(){

     },
	 remove(){
	this.form.unit=""
    this.areadatas=""
    this.form.areaId=""
    this.tablePage={
			  total: 0,
			  currentPage: 1,
			  pageSize: 10
			}
    this.gettablelist()
	 },
     //获取表格数据
    async gettablelist(){
     
	    let  data ={
           areaId:this.areadatas,
		   pageSize:this.tablePage.pageSize,
		   pageNum:this.tablePage.currentPage,
           name:this.form.unit,
		}
      const  res  = await getschoolmanger(data)
         if(res.code==200){
         this.tablePage.total=Number(res.data.total)
         this.tableData=[]
         this.tableData=res.data.list
		 }
	},

      // 获取区域下拉框数据
    async getareainfo () {
      const res = await gettreeinfo()
      if (res.code == 200) {
        this.options = []
        this.options = res.data
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
	//获取用户列表
    gettablieinfo(){
    
	},
  },
  created(){
   this.getareainfo()
  },
  mounted(){

  this.gettablelist()
//   this.gettablieinfo()
  },
  





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
	.buttonItem {
		position: relative;
		text-align: center;
		margin-top: 36px;
		padding: 36px 0 16px;
		&::before {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			content: '';
			border-top: 1px solid #DCDFE6;
		}
		div {
			display: inline-block;
		}
		.el-button + .el-button {
		  margin-left: 24px;
		}
	}
</style>
