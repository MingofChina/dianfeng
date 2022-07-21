<template>
  <el-card class="box-card">
    <el-form :model="form" :inline="true" class="demo-form-inline">
      <el-form-item label="单位名称">
        <el-input
          v-model="form.name"
          clearable
          placeholder="请输入单位名称"
        />
      </el-form-item>

      <el-form-item label="区域">
        <el-cascader
          v-model="form.areaId"
          placeholder="请选择区域"
          :clearable="true"
          :options="options"
          :props="{ checkStrictly: true }"
          @visible-change="handleChange"
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
      :edit-config="{trigger: 'manual', mode: 'row'}"
      :radio-config="{highlight: true}"
      @radio-change="radioChange"
    >
      <vxe-column type="radio" width="40" align="center" />
      <vxe-column field="name" title="单位名称" align="center" />
      <vxe-column field="areaName" title="所属区域" align="center" />
      <!-- 		<vxe-column field="khSchoolType" title="单位类型" align="center" /> -->
      <vxe-column field="admin" title="单位管理员" min-width="200" />
      <vxe-column field="createTime" title="创建时间" align="center" />
    </vxe-table>

    <vxe-pager
      :current-page="form.pageNum"
      :page-size="form.pageSize"
      :total="total"
      @page-change="pageChange"
    >
      <template #left>
        <span class="page-left">
          <el-button type="primary" size="small" plain @click="newadds">新 建</el-button>
          <el-button type="warning" size="small" plain @click="editinfo(1)">修 改</el-button>
          <el-button size="small" plain @click="deleteinfo">删 除</el-button>
        </span>
      </template>
    </vxe-pager>

    <el-dialog
      :title="vidledata?'修改单位':'新建单位'"
      :close-on-click-modal="false"
      :visible.sync="newClickVisible"
      @close="closedialog('ruleForm')"
    >
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="130px" class="demo-ruleForm">
        <el-form-item label="单位名称:" prop="name">
          <el-input
            v-model="ruleForm.name"
            placeholder="请输入单位名称"
          />
        </el-form-item>
        <el-form-item label="所属区域:" prop="areaId">

          <el-cascader
            v-model="ruleForm.areaId"
            placeholder="请选择所属区域"
            :clearable="true"
            :options="options"
            :props="{ checkStrictly: true }"
            @visible-change="handleChangedata"
          />
        </el-form-item>
        <!--  	<el-form-item label="单位类型" prop="name">
	  	  <el-select v-model="ruleForm.name" placeholder="请选择单位类型">
	  			<el-option
	  				v-for="item in options_1"
	  				:key="item.value"
	  				:label="item.label"
	  				:value="item.value">
	  			</el-option>
	  		</el-select>
	  	</el-form-item> -->
        	<el-form-item label="管理员:" prop="ids">
	  <el-select v-model="ruleForm.ids"
                multiple
	             placeholder="请选择管理员"
	             @change="shooseuser"

               >
	    <el-option v-for="item in userlist"
	               :key="item.value"
	               :label="item.label"
	               :value="item.value" />
	  </el-select>
	  	</el-form-item>
        <el-form-item label="地址:" prop="address">
          <el-input
            v-model="ruleForm.address"
            placeholder="请输入地址"
          />
        </el-form-item>
        <el-form-item label="电话" prop="telPhone">
          <el-input
            v-model="ruleForm.telPhone"
            placeholder="请输入电话"
          />
        </el-form-item>
        <el-form-item label="E-mail:" prop="email">
          <el-input
            v-model="ruleForm.email"
            placeholder="请输入E-mail"
          />
        </el-form-item>
        <el-form-item label="描述:" prop="description">
          <el-input
            v-model="ruleForm.description"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 5}"
            :max="200"
            placeholder="请输入描述信息"
          />
        </el-form-item>
        <div class="buttonItem" style="display: flex;justify-content: center;">
          <div>
            <el-button type="primary" @click="submitForm('ruleForm')">{{vidledata? '修 改':'保 存'}}</el-button>
            <el-button @click="resetForm('ruleForm')">关 闭</el-button>
          </div>
        </div>
      </el-form>
    </el-dialog>
  </el-card>
</template>

<script>

import {editunitinfo,getunitinformations, getunittablelist, gettreeinfo, deletunitinfos, newaddunitinfo, getActivitiesTableData,deleteunitinfo } from '../../../../api/system.js'

export default {
  name: 'User',
  data() {
    return {
      form: {
		    areaId: '',
        // areaids:"",
        pageNum: 1,
        pageSize: 10,
        name:"",
        notRoleId:"",
      },
      ruleForm: {
        name: '',
        areaId: '',
        address: '',
        telPhone: '',
        email: '',
        description: '',
        ids:[],
        notRoleId:"",
      },
      userlist:[],
      fileList1: [
        {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ],
      props: { multiple: true },
      options_1: [{
      	value: '',
      	label: '全部 '
      }],
      options_2: [{
      	value: '',
      	label: '全部 '
      }],
      rules: {
        //  ids:[
        //       { required: true, message: '请选择管理员', trigger: 'change' },

        //  ],
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 60, message: '长度不超过60个字符', trigger: 'blur' }
        ],
        // email: [
        //   { required: true, message: '请输入邮箱', trigger: 'blur' }
        // ],
      	areaId: [
      		{ required: true, message: '请选择所属区域', trigger: 'change' }
      	],
        // address: [
        //   { required: true, message: '请填写地址', trigger: 'blur' }
        // ],
        // telPhone: [
        //   { required: true, message: '请填写电话号码', trigger: 'blur' },
        //   { min: 11, max: 11, message: '电话号码应为11位', trigger: 'blur' }
        // ],
        signUp: [
          { type: 'array', required: true, message: '请至少选择一种报名方式', trigger: 'blur' }
        ],
        audit: [
          { required: true, message: '请选择审核方式', trigger: 'blur' }
        ],
        // description: [
        //   { required: true, message: '请输入描述信息', trigger: 'blur' },
        //   { min: 1, max: 2000, message: '描述信息为2000字以内', trigger: 'blur' }
        // ]
      },
      total: 0,
      vidledata: '',
      options: [],
      deletedata: '',
      tableData: [],
      loading: false,
      tablePage: {
			  total: 0,
			  currentPage: 1,
			  pageSize: 10
      },

      newClickVisible: false
    }
  },
  mounted() {
    this.getTableList()
    this.getareainfo()
    this.getusertable()
  },
  methods: {
    //新建
    newadds(){
      this.vidledata=""
      this.newClickVisible=true

    },
    //修改信息
  async  editinfo(e){
      if (!this.deletedata) {
        this.$message({
          showClose: true,
          message: '请勾选数据',
          type: 'error'
        })
        return
      }
      this.vidledata=e
        const schoolId =this.deletedata
     const  res  = await getunitinformations(schoolId)
         if(res.code==200){
            this.ruleForm={}
            this.ruleForm=res.data
            this.newClickVisible=true
         }

    },
    //选择管理员
    shooseuser(){

    },
    // 获取区域下拉框数据
    async getareainfo() {
      const res = await gettreeinfo()
      if (res.code == 200) {
        this.options = res.data
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    closedialog(formName) {
      this.$refs[formName].resetFields()
      this.ruleForm={}
    },
    // 保存数据
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(!this.vidledata){
            const school = this.ruleForm
            newaddunitinfo(school).then(res => {
              if (res.code == 200) {
                this.$message({
                  showClose: true,
                  message: '新增成功',
                  type: 'success'
                })

                this.getTableList()
                this.vidledata = ''
                this.deletedata = ''
                this.$refs[formName].resetFields()
                this.newClickVisible = false
              } else {
                this.$message({
                  showClose: true,
                  message: res.message,
                  type: 'error'
                })
              }
            })
          }else {

          const school = this.ruleForm
          editunitinfo(school).then(res => {
                 if(res.code==200){
                   this.$message({
                     showClose: true,
                     message: '修改成功',
                     type: 'success'
                   })
                   this.getTableList()
                   this.vidledata = ''
                   this.deletedata = ''
                   this.$refs[formName].resetFields()
                   this.newClickVisible = false
                 }else {
                   this.$message({
                     showClose: true,
                     message: res.message,
                     type: 'error'
                   })


                 }
            })



          }

        } else {

        }
      })
    },
    // 关闭
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.newClickVisible = false
      this.ruleForm={}
    },
    // 删除数据
    async deleteinfo() {
      if (!this.deletedata) {
        this.$message({
          showClose: true,
          message: '请勾选数据',
          type: 'error'
        })
        return
      }
      const schoolId = this.deletedata
      const res = await deletunitinfos(schoolId)

      if (res.code == 200) {
        this.$message({
          showClose: true,
          message: '删除成功',
          type: 'success'
        })
        this.deletedata = ''
        this.getTableList()
      } else {

      }
    },
    // 选中区域信息
    handleChange(e) {
      const data = this.form.areaId.slice(-1)
      this.form.areaId = data[0]
    },
    handleChangedata(e) {
      const data = this.ruleForm.areaId.slice(-1)
      this.ruleForm.areaId = data[0]
    },
    // 提交信息
    onSubmit() {
      this.form.pageNum = 1
      this.getTableList()
    },
    // 勾选表格数据
    radioChange(e, a, b) {
      this.deletedata = e.row.id
    },
    // 获取表格信息
    getTableList() {
      const data = {
        areaId: this.form.areaId,
        name: this.form.name==undefined?"":this.form.name,
        pageNum: this.form.pageNum,
        pageSize: this.form.pageSize,
        notRoleId:"",
      }
      getunittablelist(data).then(res => {
        if (res.code == 200) {
          this.tableData = []
          this.total = Number(res.data.total)
          this.tableData = res.data.list
        } else {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    // 页码改变时
    pageChange(e) {
      this.form.pageNum = e.currentPage
      this.form.pageSize = e.pageSize
      this.getTableList()
    },

  async  getusertable() {
        this.form={
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
        notRoleId:"",
      }
       const  res  = await getActivitiesTableData(this.form)
           if(res.code==200){
             this.userlist=[]
              this.userlist=res.data.list.map((el)=>{
                  return {
                      id:el.id,
                      value:el.id,
                      label:el.realName,
                  }
              })

           }
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
