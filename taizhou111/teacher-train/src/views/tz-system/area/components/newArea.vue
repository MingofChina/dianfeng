<template>
  <el-dialog
  	title="新建区域"
  	:close-on-click-modal="false"
  	:visible.sync="newClickVisible"
  >
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="130px" class="demo-ruleForm">
		<el-form-item label="上级区域名称:" prop="parentId">
		  <el-cascader v-model="ruleForm.parentId" :options="options11"  @visible-change="handleChangedata"  :props="{ checkStrictly: true }"   :clearable="true"     placeholder="请选择上级区域名称" />
		</el-form-item>
		<el-form-item label="区域名称:" prop="areaName">
		  <el-input
		    v-model="ruleForm.areaName"
		    placeholder="请输入区域名称"
		  />
		</el-form-item>
    <div class="buttonItem">
      <div>
        <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
        <el-button @click="resetForm('ruleForm')">关 闭</el-button>
      </div>
    </div>
  </el-form>
  </el-dialog>
</template>

<script>

  import {gettreeinfo,newaddareainfo}  from '../../../../api/system.js'
  // import {mapState}  from "vuex"
export default {
  data() {
    return {
      newClickVisible:false,
       datainfo:{},
      ruleForm: {
        areaName: '',
        parentId:"",
      },
      options11:[],
      rules: {
        areaName: [
          { required: true, message: '请输入区域名称', trigger: 'blur' },
        ],
       parentId:[
         { required: true, message: '请选择上级区域名称', trigger: 'change' },
       ]
      },
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
			options_2: [
				{ value: '01',
			    label: '01',
			    children: [{
			      value: '01-1',
			      label: '01-1',
			    },{
			      value: '01-2',
			      label: '01-2',
			    }]
				},
				{ value: '02',
				  label: '02',
				  children: [{
				    value: '02-1',
				    label: '02-1',
				  },{
				    value: '02-2',
				    label: '02-2',
				  }]
				}
			],
    }
  },
  computed:{
     // ...mapState('user',['remvpdata'])
  },
  methods: {
    visibles(){
      this.newClickVisible=true
    },
    //获取选中的值
    handleChangedata(e){
    if(this.ruleForm.parentId.length==3){
       this.ruleForm.parentId= this.ruleForm.parentId[2]
    }else if(this.ruleForm.parentId.length==2){
        this.ruleForm.parentId= this.ruleForm.parentId[1]
    }else {
    this.ruleForm.parentId= this.ruleForm.parentId[0]
    }
    },
    //获取上层区域名称
  async  getupareainfo(){
        const res = await gettreeinfo();
        if (res.code == 200) {
          this.options11 = res.data;

          console.log(this.$store.state.user.remvpdata ,444444444444)
            // remvpdata

        } else {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'error'
          });
        }

    },
  submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let  area = {
              areaName:this.ruleForm.areaName,
              parentId:this.ruleForm.parentId
          }
         newaddareainfo(area).then(res => {

          if(res.code==200){
               this.$message({
                 showClose: true,
                 message:'新增成功',
                 type: 'success'
               });
             this.$emit("closedilog",true)
             this.$refs[formName].resetFields()
             // this.$emit("refresh",true)
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
    resetForm(formName) {
       this.$emit("closedilog",true)
      this.$refs[formName].resetFields()

    },
    handleRemove(file, fileList) {
    },
    handlePreview(file) {
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3)
    }
  },
  mounted(){
     this.getupareainfo()
      // this.datainfo= this.remavpdata
      //   var data =this.datainfo.areaName.split("-->")
      //  this.datainfo={
      //       ...this.datainfo,
      //       areaName:data[1]
      // }
      // console.log(  this.datainfo,222)
  },
  credted(){

  }
}
</script>

<style lang="scss" scoped>
	::v-deep .el-form  {
		margin-bottom: -20px;
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
	.el-cascader.el-cascader--medium {
		margin-left: 12px;
	}
  .el-radio__inner {
      border-radius: 0;
      border: 0;
      width: 170px;
      height: 34px;
      background-color: transparent;
      cursor: pointer;
      box-sizing: border-box;
      position: absolute;
      top: -18px;
      left: -19px;
  }

  .el-radio__input.is-checked .el-radio__inner {
      background: transparent;
  }

</style>
