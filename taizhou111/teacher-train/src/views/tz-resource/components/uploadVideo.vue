<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
		<el-form-item label="视频文件:">
		  <upload
		    :fileList.sync="fileList"
        :accept="['mp4']"
        :sizeLimit='400 * 1024 * 1024'
        :limit="1"
		  >
		    <div slot="tip" class="el-upload__tip">只能上传mp4/H264编码文件，每个文件不超过400MB，如果视频过大可下载“<a href="">视频转码工具</a>”转换。</div>
		  </upload>
		</el-form-item>
		
		<el-form-item label="视频名称:" prop="fileName">
		  <el-input
		    v-model="ruleForm.resourceTitle"
		    placeholder="请输入"
		  />
		</el-form-item>
		
		<el-form-item label="适用学段:" prop="sectionIds">
		  <el-select v-model="ruleForm.sectionIds" multiple clearable placeholder="请选择">
				<el-option
					v-for="item in dictList.schoolSection"
					:key="item.id"
					:label="item.dictName"
					:value="item.id">
				</el-option>
			</el-select>
		</el-form-item>
		
		<el-form-item label="适用学科:" prop="subjectIds">
		  <el-select v-model="ruleForm.subjectIds" multiple clearable placeholder="请选择">
				<el-option
					v-for="item in dictList.subject"
					:key="item.id"
					:label="item.dictName"
					:value="item.id">
				</el-option>
			</el-select>
		</el-form-item>
		
		<el-form-item label="视频简介:" prop="introduction">
		  <el-input
		    v-model="ruleForm.introduction"
		    type="textarea"
				:autosize="{ minRows: 3, maxRows: 5}"
		    placeholder="请输入"
		  />
		</el-form-item>
		
		<el-form-item label="主讲人:" prop="speaker">
		  <el-input
		    v-model="ruleForm.speaker"
		    placeholder="请输入"
		  />
		</el-form-item>
		
		<el-form-item label="主讲人单位 :" prop="speakerUnit">
		  <el-input
		    v-model="ruleForm.speakerUnit"
		    placeholder="请输入"
		  />
		</el-form-item>
		
		<!-- <el-form-item label="缩略图:">
      <upload
		    :fileList="fileList1"
        :accept="['jpg', 'png', 'jpeg']"
        listType="picture"
		  >
		    <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg文件</div>
		  </upload>
		</el-form-item>
		
		<el-form-item label="相关附件:">
      <upload
		    :fileList.sync="fileList2"
        :accept="['doc', 'docx', 'pdf']"
		  >
		    <div slot="tip" class="el-upload__tip">只能上传doc/docx/pdf文件</div>
		  </upload>
		</el-form-item> -->

    <div class="buttonItem">
      <div>
        <el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>
        <el-button @click="close">返 回</el-button>
      </div>
    </div>
  </el-form>
</template>

<script>
import upload from './upload'
import { geturlobj } from '@/api/system'
export default {
	components: {
    upload
  },
  props: {
    dictList: {
      type: Object
    },
	sourceForm: {
      type: Object
    }
  },
  watch: {
	sourceForm: {
		immediate: true,
		async handler(v) {
			const data = JSON.parse(JSON.stringify(v))
			data.subjectIds = data.subjectIds ? data.subjectIds.split(',') : []
			data.sectionIds = data.sectionIds ? data.sectionIds.split(',') : []
			console.log(data)
			if (data.refId) {
				let file = await this.geturlobj(data.refId)
				this.fileList.push(file)
			}
			this.ruleForm = data
		}
	}
  },
  data() {
    return {
      ruleForm: {
      },
      rules: {
        resourceTitle: [
          { required: true, message: '请输入视频文件名称', trigger: 'blur' }
        ],
        sectionIds: [
          { required: true, message: '请选择学段', trigger: 'change' }
        ],
				subjectIds: [
					{ required: true, message: '请选择学科', trigger: 'change' }
				],
        introduction: [
          { required: true, message: '请填写简介', trigger: 'blur' }
        ],
        speaker: [
          { required: true, message: '请填写主讲人', trigger: 'blur' }
        ],
        speakerUnit: [
          { required: true, message: '请填写主讲人单位', trigger: 'blur' }
        ],
      },
	  fileList: [],
    }
  },
  methods: {
    submitForm(formName = 'ruleForm') {
      this.$refs[formName].validate((valid) => {
        console.log(valid)
        if (valid) {
			console.log(this.fileList)
			if (!this.fileList.length) {
				this.$message('请上传视频')
				return
			}
			const params = {
				...this.ruleForm,
				userId: localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo')).id : '',
				refId: this.fileList[0].id,
				resType: 'video',
				videoDuration: this.fileList[0].duration,
			}
          this.$emit('submit', params)
        } else {
          return false
        }
      })
    },
    close () {
      this.resetForm()
      this.$emit('close')
    },
    resetForm(formName = 'ruleForm') {
		this.fileList = []
      this.ruleForm = {}
    },
	async geturlobj (id) {
		const data = await geturlobj(id)
		return data.data
	}
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
	.el-cascader.el-cascader--medium {
		margin-left: 12px;
	}
</style>
