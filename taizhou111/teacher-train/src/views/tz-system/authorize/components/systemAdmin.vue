<template>
	<div>
		<vxe-table
			ref="xGrid"
			border
			stripe
			header-align="center"
			show-header-overflow
			show-overflow
      type="checkbox"
			:row-config="{isHover: true}"
			:data="tableData"
			:loading="loading"
			:edit-config="{trigger: 'manual', mode: 'row'}"
			:checkbox-config="{highlight: true}"
			@checkbox-change="checkboxChange"
      @checkbox-all="checkedChange"
			@cell-click="onChange"
      >
			<vxe-column type="checkbox" width="40" align="center" />
			<vxe-column field="realName" title="姓名" align="center" />
			<vxe-column field="loginName" title="用户名" align="center" />
			<vxe-column field="tel" title="联系电话" align="center" />
			<vxe-column field="email" title="E-mail" min-width="200" />
			<vxe-column field="areaName" title="区域" align="center" />
      	<vxe-column field="schoolName" title="单位" align="center" />
		</vxe-table>
		<vxe-pager
			:current-page="tablePage.currentPage"
			:page-size="tablePage.pageSize"
			:total="total"
			@page-change="pageChange"
		>
			<template #left>
				<span class="page-left">
				<!-- 	<el-button type="primary" size="small" plain @click="newClickVisible = true">新 建</el-button> -->
					<el-button type="warning" size="small" plain @click="chooserole">选择用户</el-button>
					<el-button size="small" plain @click="deleteinfo">删 除</el-button>
				</span>
			</template>
		</vxe-pager>

    <el-dialog title="选择用户" :visible.sync="dialogTableVisible" style="width: 100%;">
          <vxe-table
          	border
          	stripe
          	header-align="center"
          	show-header-overflow
          	show-overflow
            type="checkbox"
          	:row-config="{isHover: true}"
          	:data="userdata"
          	:loading="loading"
          	:edit-config="{trigger: 'manual', mode: 'row'}"
          	:checkbox-config="{highlight: true}"
          	@checkbox-change="checkboxChange1"
            @checkbox-all="checkedChange1"

            >
          	<vxe-column type="checkbox" width="40" align="center" />
          	<vxe-column field="realName" title="姓名" align="center" />
          	<vxe-column field="loginName" title="用户名" align="center" />

          	<vxe-column field="roleName" title="角色" min-width="200" />
          	<vxe-column field="areaName" title="区域" align="center" />
            <vxe-column field="schoolName" title="单位" align="center" min-width="300"  />
          </vxe-table>

           	<el-button size="small" plain @click="sureroleinfo" type="primary"   style="margin-top: 20px;">保存</el-button>

          <vxe-pager
          	:current-page="userPage.currentPage"
          	:page-size="userPage.pageSize"
          	:total="totals"
          	@page-change="pageChange11"
          >
	</vxe-pager>
    </el-dialog>



	</div>
</template>

<script>
 import {getrolelist,deletesystemuser,getActivitiesTableData,surerole} from '../../../../api/system.js'

export default {
  name: 'newTrainingJob',
  data() {
    return {
      userdata:[],
      dialogTableVisible:false,
        form:{
          pageNum:1,
          pageSize:10,
          type:1,
        },
      deleteinfolist:[],
			tableData:[],
			loading: false,
      total:0,
      userlist1:[],
      totals:0,
			tablePage: {
			  total: 0,
			  currentPage: 1,
			  pageSize: 10
			},
      userPage:{
			  currentPage: 1,
			  pageSize: 10
			},
    }
  },
  mounted() {
      this.gettablelist()
  },
  methods: {
    //授权
chooserole(){
    // const  res  = await
    // this.dialogTableVisible=true
    this.getusertable()
    },
    //删除数据
  async  deleteinfo(){
       if(this.deleteinfolist.length===0){
         this.$message({
           showClose: true,
           message: '请先勾选数据',
           type: 'error'
         })
         return
       }
       let ids = this.deleteinfolist.map((el)=>{
              return el.id
       })

       let  param={}
       param.type=1
       param.ids=ids
       param.delType=1
      const res  = await deletesystemuser(param)
          if(res.code==200){
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
          this.gettablelist()
          this.deleteinfolist=[]
          }else {
           this.$message({
             showClose: true,
             message: res.message,
             type: 'error'
           })
          }
    },
    //获取内部弹框列表
   async  getusertable(){
            let  data = {
              pageNum:this.userPage.currentPage,
              pageSize:this.userPage.pageSize,
              notRoleId:1,
              areaId:"",
              loginName: "",
              realName:"",
              roleId: "",
              schoolId: "",
              sectionId: "",
              subjectId: "",
              useFlag:"",
            }
       const res  = await getActivitiesTableData(data)
         if(res.code==200){
           console.log(res,333)
           this.userdata =[]
           this.userdata=res.data.list
           this.totals= Number(res.data.total)
          this.dialogTableVisible=true
         }else{
           this.$message({
             showClose: true,
             message: res.message,
             type: 'error'
           })
         }
     },

    //获取列表
  async  gettablelist(){
      let  data =this.form
      const res  = await getrolelist(data)
        if(res.code==200){

          this.tableData =[]
          this.tableData=res.data.list
          this.total= Number(res.data.total)
          // this.dialogTableVisible=true
        }else{
          this.$message({
            showClose: true,
            message: res.message,
            type: 'error'
          })
        }
    },
    //勾选数据
     checkboxChange(e){
      this.deleteinfolist=e.records
     },
     //指定角色
    async sureroleinfo(){

      if(this.userlist1.length==0){
        this.$message({
          showClose: true,
          message:"请勾选数据",
          type: 'error'
        })
        return
      }

      let datas =this.userlist1.map((el)=>{
           return el.id
      })
        const param ={
          roleType:1,
          userIds:datas
        }
      const  res  =await surerole(param)
        if(res.code==200){
           this.$message({
             showClose: true,
             message:"保存成功",
             type: 'success'
           })
           this.dialogTableVisible=false
           this.gettablelist()
        }

     },
     checkedChange(e){

     this.deleteinfolist=e.records
     },
     checkboxChange1(e){
       this.userlist1=e.records

     },
    checkedChange1(e){
    this.userlist1=e.records
    },
     //选择数据
     onChange(e){


     },
    // 页码改变时
    pageChange(e) {
      this.form.pageNum = e.currentPage
      this.form.pageSize = e.pageSize
      this.gettablelist()
    },
    //内部弹框
    pageChange11(e) {
      this.userPage.currentPage = e.currentPage
      this.userPage.pageSize = e.pageSize
      this.getusertable()
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
	::v-deep .vxe-table {
		.vxe-table--body {
			.cell-zb, .cell-bm, .cell-px, .cell-pj, .cell-js {
				font-weight: bold;
			}
			.vxe-body--column.cell-zb {
				color: #E6A23C;
			}
			.vxe-body--column.cell-bm {
				color: #409EFF;
			}
			.vxe-body--column.cell-px {
				color: #67C23A;
			}
			.vxe-body--column.cell-pj {
				color: #F56C6C;
			}
			.vxe-body--column.cell-js {
				color: #b1b3b8;
			}
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
