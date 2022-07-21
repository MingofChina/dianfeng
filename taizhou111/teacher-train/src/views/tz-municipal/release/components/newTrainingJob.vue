<template>
	<el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
		<el-form-item label="讨论主题:" prop="theme">
		  <el-input
		    v-model="ruleForm.theme"
		    placeholder="请输入"
				maxlength="60"
				show-word-limit
		  />
		</el-form-item>
		
		<el-form-item label="作业要求:" prop="require">
			<el-input
			  v-model="ruleForm.trainInstructions"
			  type="textarea"
				:autosize="{ minRows: 3, maxRows: 5}"
			  placeholder="请输入"
				maxlength="5000"
				show-word-limit
			/>
			更换富文本编辑器
		  <!-- <vue-html5-editor :content="content" @change="updateData" :height="500" /> -->
		</el-form-item>
		
		<el-form-item label="字数至少:" prop="wordCount">
		  <el-input
		    v-model="ruleForm.wordCount"
		    placeholder="请输入"
				style="width: 40%"
				maxlength="5000"
				show-word-limit
		  /> 字
		</el-form-item>
				
<!-- 		<el-form-item label="相关附件:">
		  <el-upload
		    action="https://jsonplaceholder.typicode.com/posts/"
		    :on-change="handleChange"
		    :file-list="fileList2"
		  >
		    <el-button size="small" type="primary">点击上传</el-button>
		    <div slot="tip" class="el-upload__tip">只能上传doc/docx/pdf文件</div>
		  </el-upload>
		</el-form-item> -->
	
	  <div class="buttonItem">
	    <div>
	      <el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>
	      <el-button>返 回</el-button>
	    </div>
	  </div>
	</el-form>
</template>

<script>
export default {
  name: 'newTrainingJob',
  data() {
    return {
			ruleForm: {
				theme: '',
				wordCount: '',
				trainInstructions: ''
			},
			rules: {
			  theme: [
			    { required: true, message: '请输入讨论主题', trigger: 'blur' },
			  ],
				wordCount: [
				  { required: true, message: '请输入字数', trigger: 'blur' },
				]
			},
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
		}
  }
}
</script>

<style lang="scss" scoped>
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
