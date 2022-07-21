<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="130px" class="demo-ruleForm">
		<el-form-item label="单位名称:" prop="name">
		  <el-input
		    v-model="ruleForm.name"
		    placeholder="请输入"
		  />
		</el-form-item>
		<el-form-item label="所属区域:" prop="name">
		  <el-select v-model="ruleForm.name" placeholder="请选择">
				<el-option
					v-for="item in options_1"
					:key="item.value"
					:label="item.label"
					:value="item.value">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="单位类型" prop="name">
		  <el-select v-model="ruleForm.name" placeholder="请选择">
				<el-option
					v-for="item in options_1"
					:key="item.value"
					:label="item.label"
					:value="item.value">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="管理员:" prop="name">
		  <el-input
		    v-model="ruleForm.name"
		    placeholder="请输入"
		  />
		</el-form-item>
		<el-form-item label="地址:" prop="name">
		  <el-input
		    v-model="ruleForm.name"
		    placeholder="请输入"
		  />
		</el-form-item>
		<el-form-item label="电话" prop="name">
		  <el-input
		    v-model="ruleForm.name"
		    placeholder="请输入"
		  />
		</el-form-item>
		<el-form-item label="E-mail:" prop="name">
		  <el-input
		    v-model="ruleForm.name"
		    placeholder="请输入"
		  />
		</el-form-item>
		<el-form-item label="描述:" prop="name">
		  <el-input
		    v-model="ruleForm.illustrate"
		    type="textarea"
		  	:autosize="{ minRows: 3, maxRows: 5}"
		    placeholder="请输入"
		  />
		</el-form-item>
    <div class="buttonItem">
      <div>
        <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
        <el-button @click="resetForm('ruleForm')">关 闭</el-button>
      </div>
    </div>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        trainingDate: '',
        illustrate: '',
        studyTime: '',
        signUp: [],
        audit: '',
        deadline: '',
				trainObject: '全体教师',
				trainObjectArea: [],
				subject: [],
        notRoleId:"",
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 60, message: '长度不超过60个字符', trigger: 'blur' }
        ],
        trainingDate: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
				trainObject: [
					{ required: true, message: '请选择培训对象', trigger: 'blur' }
				],
        illustrate: [
          { required: true, message: '请填写培训说明', trigger: 'blur' }
        ],
        studyTime: [
          { type: 'number', message: '请填写培训学时', trigger: 'blur' },
          { min: 1, max: 3, message: '时长不得超过3位数', trigger: 'blur' }
        ],
        signUp: [
          { type: 'array', required: true, message: '请至少选择一种报名方式', trigger: 'change' }
        ],
        audit: [
          { required: true, message: '请选择审核方式', trigger: 'blur' }
        ],
        deadline: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
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
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleRemove(file, fileList) {
    },
    handlePreview(file) {
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3)
    }
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
</style>
