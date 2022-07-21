<template>
	<el-card class="box-card">
		<el-form :model="form" :inline="true" class="demo-form-inline">

      <el-form-item label="区域">
			  <el-cascader v-model="form.id"   :clearable="true"  :options="options" @visible-change="handleChange" popper-class='radio-classstyle'  :props="{ checkStrictly: true }"  />
			</el-form-item>


			<el-form-item>
				<el-button type="primary" @click="onSubmit">查询</el-button>
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
			@radio-change="radioChange"
       >
			<vxe-column type="radio" width="40" align="center" />
			<vxe-column field="areaName" title="区域名称" align="center" />
			<vxe-column field="areaUnitNnm" title="区域内单位数量" align="center" />
			<vxe-column field="userNum" title="区域内用户数量" align="center" />
	<!--<vxe-column field="admin" title="区域管理员" min-width="200" />
			<vxe-column field="telephone" title="联系电话" align="center" /> -->
		</vxe-table>

		<vxe-pager
			:current-page="form.pageNum"
			:page-size="form.pageSize"
			:total="total"
			@page-change="pageChange"
		>
			<template #left>
				<span class="page-left">
					<el-button type="primary" size="small" plain @click="newadd(1)">新 建</el-button>
					<el-button type="warning" size="small" plain  @click="revamp(2)">修 改</el-button>
					<el-button size="small" plain  @click="deleteinfo">删 除 {{numberid}}</el-button>
				</span>
			</template>
		</vxe-pager>

	<!-- 		<newArea  @closedilog="getsondata"  ref="newareas" /> -->
   <el-dialog
   	title="新建区域"
   	:close-on-click-modal="false"
   	:visible.sync="newClickVisible"
   >
   <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="130px" class="demo-ruleForm">
   	<el-form-item label="上级区域名称:">
   	  <el-cascader v-model="ruleForm.parentId" :options="options11"  @visible-change="handleChangedata"  :props="{ checkStrictly: true }"   :clearable="true"     placeholder="请选择上级区域名称" />
   	</el-form-item>
   	<el-form-item label="区域名称:" prop="areaName">
   	  <el-input
   	    v-model="ruleForm.areaName"
   	    placeholder="请输入区域名称"
   	  />
   	</el-form-item>
     <div class="buttonItem" style="display: flex;justify-content: center;">
       <div>
          <el-button v-if="numberid==1?true:false"   el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
           <el-button  v-else  type="primary" @click="editinfo('ruleForm')">修改</el-button>
         <el-button @click="resetForm('ruleForm')">关 闭</el-button>
       </div>
     </div>
   </el-form>
   </el-dialog>
	</el-card>
</template>

<script>
import newArea from './newArea.vue'
import {getarealist,gettreeinfo,deleteid,newaddareainfo,editareainfo}  from '../../../../api/system.js'
// import {mapMutations}  from "vuex"


export default {
  name: 'user',
	components: {
		newArea,
	},
  data() {
    return {
      options:[],
      parentIddata:"",
      ruleForm: {
        areaName: '',
        parentId:"",
        id:"",
      },
      rules: {
        areaName: [
          { required: true, message: '请输入区域名称', trigger: 'blur' },
        ],
       parentId:[
         { required: true, message: '请选择上级区域名称', trigger: 'change' },
       ]
      },
      options11:[],
			form: {
				id: '',
        pageNum: 1,
        pageSize: 10,
			},
        total: 0,
			tableData: [

			],
			loading: false,
      numberid:null,
			newClickVisible: false,
      remavpdatainfo:{},
      remavpdatas:{}
    }
  },
  mounted() {
          this.getTableList();
          this.getareainfo()
  },
  methods: {
    //修改保存
    editinfo(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let  area = {
              areaName:this.ruleForm.areaName,
              parentId:this.parentIddata,
              id:this.ruleForm.id
          }

         editareainfo(area).then(res => {

          if(res.code==200){
               this.$message({
                 showClose: true,
                 message:'修改成功',
                 type: 'success'
               });
             this.$refs[formName].resetFields()
             this.getareainfo()
             this.getTableList()
             this.newClickVisible=false
          }else {
            this.$message({
              showClose: true,
              message: res.message,
              type: 'error'
            });

          }

            })
        } else {
          return false
        }
      })

    },
   newadd(e){
      this.getareainfo()
      this.numberid=e
     this.ruleForm= {
       areaName: '',
       parentId:"",
       id:"",
     }
     this.newClickVisible=true
   },
   resetForm(formName){
        this.$refs[formName].resetFields()
     this.newClickVisible=false
   },
   //保存
   submitForm(formName) {
       this.$refs[formName].validate((valid) => {
         if (valid) {
           let  area = {
               areaName:this.ruleForm.areaName,
               parentId:this.parentIddata
           }
          newaddareainfo(area).then(res => {

           if(res.code==200){
                this.$message({
                  showClose: true,
                  message:'新增成功',
                  type: 'success'
                });
              this.$refs[formName].resetFields()
              this.getareainfo()
              this.getTableList()
              this.newClickVisible=false
           }else {
             this.$message({
               showClose: true,
               message: res.message,
               type: 'error'
             });

           }

             })
         } else {
           return false
         }
       })
     },
   //获取选中的值
   handleChangedata(e){

    console.log(this.ruleForm.parentId,2222)
     let data  = this.ruleForm.parentId.slice(-1)
     this.parentIddata =data[0]
   // if(this.ruleForm.parentId.length==3){
   //    this.ruleForm.parentId= this.ruleForm.parentId[2]
   // }else if(this.ruleForm.parentId.length==2){
   //     this.ruleForm.parentId= this.ruleForm.parentId[1]
   // }else {
   // this.ruleForm.parentId= this.ruleForm.parentId[0]
   // }

   },
   //修改数据
   revamp(e){

      this.numberid=e
     if (!this.deletedata) {
       this.$message({
         showClose: true,
         message: '请勾选数据',
         type: 'error'
       });
       return;
     }

        let data =this.remavpdatainfo.areaName.split('-->')

        let datas=this.remavpdatainfo={
             ...this.remavpdatainfo,
             areaName:data[1]
        }

        this.ruleForm.areaName=datas.areaName
        this.ruleForm.parentId=datas.parentId
        this.ruleForm.id=datas.id
        this.newClickVisible=true
   },
    //选择区域
  handleChange(e) {
     if(this.form.id.length==3){
        this.form.id= this.form.id[2]
     }else if(this.form.id.length==2){
         this.form.id= this.form.id[1]
     }else {
     this.form.id= this.form.id[0]
     }

  },
  //获取子组件传的值
  getsondata(e){

   if(e){
     // this.newClickVisible=false
   }


  },
  //查询数据
  onSubmit(){

    this.getTableList()
  },
  // 删除数据
  async deleteinfo() {
    if (!this.deletedata) {
      this.$message({
        showClose: true,
        message: '请勾选数据',
        type: 'error'
      });
      return;
    }
    let  id =this.deletedata
    const res = await deleteid(id);
    if (res.code == 200) {
      this.$message({
        showClose: true,
        message: '删除成功',
        type: 'success'
      });
      this.deletedata = '';
      this.remavpdatainfo={}
      this.getTableList();
    } else {
    }
  },
		// 获取表格信息
		getTableList(){
         let  data =this.form={
                id:this.form.id,
                pageNum:this.form.pageNum,
                pageSize:this.form.pageSize
         }
		  getarealist(data).then(res => {
		    if (res.code == 200) {
		      this.tableData = [];
		      this.total =Number(res.data.total);
		      this.tableData = res.data.list.map((el)=>{
              return {
                  ...el,
                  areaName:el.parentAreaName+"-->"+el.areaName,
              }
          })
		    } else {
		      this.$message({
		        showClose: true,
		        message: res.message,
		        type: 'error'
		      });
		    }
		  });
		},
    // 获取区域下拉框数据
    async getareainfo() {
      const res = await gettreeinfo();
      if (res.code == 200) {
         this.options=[]
         this.options11=[]
        this.options = res.data;
        this.options11=res.data;
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        });
      }
    },
    // 页码改变时
    pageChange(e) {
      this.form.pageNum = e.currentPage;
      this.form.pageSize = e.pageSize;
      this.getTableList();
    },
    // 勾选表格数据
    radioChange(e, a, b){
      this.remavpdatainfo=e.row
      this.deletedata = e.row.id;
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
	::v-deep .el-form.demo-form-inline {
		margin-bottom: -12px;
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
	::v-deep .el-dialog {
	  display: flex;
	  flex-direction: column;
	  margin: 0 !important;
	  position: absolute;
	  top: 50%;
	  left: 50%;
	  transform: translate(-50%, -50%);
	  max-height: calc(100% - 60px);
	  max-width: calc(100% - 60px);
		.el-dialog__header {
			position: relative;
			&:after {
				position: absolute;
				bottom: 0;
				left: 20px;
				right: 20px;
				content: '';
	      border-top: 1px solid #DCDFE6;
			}
		}
		.el-dialog__body {
		  flex: 1;
		  overflow: auto;
		}
	}


</style>
