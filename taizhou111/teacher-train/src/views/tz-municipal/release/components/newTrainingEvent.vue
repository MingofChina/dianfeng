<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
    <el-form-item label="活动名称:" prop="activityName"><el-input v-model="ruleForm.activityName" placeholder="请输入" maxlength="60" show-word-limit /></el-form-item>

    <el-form-item label="培训时间:" prop="trainPeriod">
      <el-date-picker
        v-model="ruleForm.trainPeriod"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        style="width: 100%"
        value-format="yyyy-MM-dd"
        @change="trainPeriodChange"
      />
    </el-form-item>

    <el-form-item label="培训对象:" prop="trainee">
      <el-radio-group v-model="ruleForm.trainee">
        <el-radio :label="0">全体教师</el-radio>
        <el-radio :label="1">区教师</el-radio>
      </el-radio-group>

      <el-cascader v-if="ruleForm.trainee === 1" v-model="ruleForm.areaIds" :options="options" :props="props" collapse-tags clearable />
    </el-form-item>

    <el-form-item label="培训说明:" prop="introduction">
      <el-input v-model="ruleForm.introduction" type="textarea" :autosize="{ minRows: 3, maxRows: 5 }" placeholder="请输入" maxlength="1000" show-word-limit />
    </el-form-item>

    <el-form-item label="培训学时:" prop="classHours">
      <el-input v-model.number="ruleForm.classHours" placeholder="请输入" maxlength="3" show-word-limit style="width: 40%" />
    </el-form-item>

    <el-form-item label="报名方式:" prop="signupType">
      <el-checkbox-group v-model="ruleForm.signupType">
        <el-checkbox v-for="(city, index) in cities" :key="index" :label="city.id">{{ city.name }}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item label="审核方式:" prop="reviewFlag">
      <el-radio-group v-model="ruleForm.reviewFlag">
        <el-radio :label="0">无需审核</el-radio>
        <el-radio :label="1">需管理员审核</el-radio>
        <!-- <el-radio :label="2">系统自动报名</el-radio> -->
      </el-radio-group>
    </el-form-item>

    <el-form-item label="报名截止:" prop="signupEndTime">
      <el-date-picker
        v-model="ruleForm.signupEndTime"
        type="datetime"
        placeholder="请选择"
        default-time="12:00:00"
        style="width: 40%"
        value-format="yyyy-MM-dd HH:mm:ss"
        @change="registrationDeadlineChange"
      />
    </el-form-item>

    <el-form-item label="课程封面:" prop="courseCover">
      <el-upload
        v-model="ruleForm.courseCover"
        :headers="requestHeader"
        :action="baseImgUrl"
        :file-list="fileList_1"
        :on-success="fileSuccessZero"
        :before-upload="beforeUploadZero"
        :on-remove="removeZero"
        list-type="picture"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg文件</div>
      </el-upload>
    </el-form-item>

    <el-form-item label="培训方案:" prop="trainingDesign">
      <el-upload
        v-model="ruleForm.trainingDesign"
        :headers="requestHeader"
        :action="baseImgUrl"
        :on-success="fileSuccess"
        :before-upload="beforeUpload"
        :on-remove="removeOne"
        :file-list="fileList_2"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传doc/docx/pdf文件</div>
      </el-upload>
    </el-form-item>

    <div class="buttonItem">
      <div>
        <el-button v-if="!radioChangeRow" type="primary" @click="submitForm('ruleForm')">保存并下一步</el-button>
        <el-button v-else type="primary" @click="submitForm('ruleForm')">保 存</el-button>
        <el-button @click="cancelBtn">取 消</el-button>
      </div>
    </div>
  </el-form>
</template>

<script>
import { baseImgUrl, baseURL11 } from '@/utils/request.js'
import { getTree, addActivity, getFileRoute, geturlpath } from '@/api/train.js'
import CryptoJS from 'crypto-js'
import { geturlinfo } from '@/api/system.js'
export default {
  name: 'NewTrainingEvent',
  props: ['radioChangeRow', 'ruleForm2'],
  data() {
    return {
      requestHeader: {
        // 未上传图片的请求头加token
        token: window.localStorage.getItem('localtoken')
      },
      cities: [
        {
          name: '学员自主报名',
          id: 1
        },
        {
          name: '学校管理员报名',
          id: 2
        }
      ],
      ruleForm: {
        activityName: '',
        startTime: '',
        finishTime: '',
        trainee: 0,
        areaIds: [],
        introduction: '',
        classHours: null,
        signupType: [],
        reviewFlag: 0,
        signupEndTime: '',
        courseCover: '',
        trainingDesign: ''
      },
      rules: {
        activityName: [
          {
            required: true,
            message: '请输入活动名称',
            trigger: 'blur'
          }
        ],
        trainPeriod: [
          {
            required: true,
            message: '请选择日期',
            trigger: 'blur'
          }
        ],
        trainee: [
          {
            required: true,
            message: '请选择培训对象',
            trigger: 'blur'
          }
        ],
        introduction: [
          {
            required: true,
            message: '请填写培训说明',
            trigger: 'blur'
          }
        ],
        classHours: [
          {
            type: 'number',
            message: '请填写培训学时',
            trigger: 'blur'
          }
        ],
        signupType: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一种报名方式',
            trigger: 'blur'
          }
        ],
        reviewFlag: [
          {
            required: true,
            message: '请选择审核方式',
            trigger: 'blur'
          }
        ],
        signupEndTime: [
          {
            required: true,
            message: '请选择日期',
            trigger: 'blur'
          }
        ],
        trainingDesign: [
          {
            required: true,
            message: '请上传培训方案',
            trigger: 'blur'
          }
        ]
      },
      fileList_1: [], // 课程封面
      fileList_2: [], // 培训方案
      props: {
        multiple: true,
        label: 'name',
        value: 'id'
      },
      baseImgUrl,
      baseURL11,
      options: [] // 区域
    }
  },
  watch: {
    ruleForm2(newVal, oldVal) {
      this.ruleForm = newVal
      this.ruleForm.trainPeriod = []
      this.ruleForm.trainPeriod.push(this.ruleForm.startTime)
      this.ruleForm.trainPeriod.push(this.ruleForm.finishTime)
      this.ruleForm.signupType = this.ruleForm.signupType.split(',').map(Number)
      this.ruleForm.classHours = parseInt(this.ruleForm.classHours)
      this.ruleForm.areaIds = this.ruleForm.areaIdList
      if (newVal.courseCover) {
        geturlinfo(newVal.courseCover).then(res => {
          if (res.code == 200) {
            const url1 = this.decrypt(res.data.key, res.data.iv, res.data.url)
            const url2 = { url: this.baseURL11 + '/upload' + url1 }
            this.fileList_1 = []
            this.fileList_1.push(url2)
          }
        })
      }
      if (newVal.trainingDesign) {
        geturlinfo(newVal.trainingDesign).then(res => {
          if (res.code == 200) {
            const url1 = this.decrypt(res.data.key, res.data.iv, res.data.url)
            const url2 = { name: newVal.fileName, url: this.baseURL11 + '/upload' + url1 }
            this.fileList_2 = []
            this.fileList_2.push(url2)
          }
        })
      }
    }
  },
  mounted() {
    this.getTree()
  },
  methods: {
    // 区域
    async getTree() {
      const res = await getTree()
      if (res.code == 200) {
        this.options = res.data
      }
    },
    // 培训时间
    trainPeriodChange(val) {
      this.ruleForm.startTime = val[0]
      this.ruleForm.finishTime = val[1]
    },
    // 报名截止
    registrationDeadlineChange(val) {
      this.registrationDeadline = val
    },
    // 保存
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const arr = []
          this.ruleForm.areaIds.forEach(item => {
            arr.push(item.pop())
          })
          this.ruleForm.areaIds = arr.join()
          this.ruleForm.signupType = this.ruleForm.signupType.join()
          this.addActivity(this.ruleForm)
        } else {
          return false
        }
      })
    },
    // 新增
    async addActivity(params) {
      const res = await addActivity(params)
      if (res.code == 200) {
        this.$message.success(res.message)
        this.cancelBtn()
        for (const key in this.ruleForm) {
          this.ruleForm[key] = ''
        }
        this.ruleForm.areaIds = this.ruleForm.signupType = this.fileList_1 = this.fileList_2 = []
      } else {
        this.ruleForm.signupType = []
      }
    },
    // 取消操作
    cancelBtn() {
      this.$emit('reviseStatus', false)
    },
    // 修改保存
    submitForm_1(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          return false
        }
      })
    },
    // 课程封面 => 上传前
    beforeUploadZero(file) {
      let isTrue = null
      const isType = file.type
      if (isType == 'image/jpeg' || isType == 'image/png') {
        isTrue = true
      } else {
        isTrue = false
        this.$message.error('文件格式不正确')
      }
      return isTrue
    },
    // 课程封面 => 上传成功
    fileSuccessZero(file) {
      if (file.code == 200) {
        const id = file.data[0].id
        this.ruleForm.courseCover = id
        getFileRoute(id).then(res => {
          const result = res.data
          const url = this.decrypt(result.key, result.iv, result.url)
          let imgUrl = null
          this.geturlpath().then(res => {
            imgUrl = res.ip + ':' + res.iport + '/upload' + url
            console.log(imgUrl, 'imgUrl')
            this.fileList_1 = []
            this.fileList_1.push(imgUrl)
          })
        })
      }
    },
    // 课程封面 => 删除
    removeZero(file, fileList) {
      this.fileList_1 = fileList
    },
    // 培训方案 => 上传前
    beforeUpload(file) {
      let isTrue = null
      const isType = file.type
      if (isType == 'application/pdf' || isType == 'application/msword' || isType == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        isTrue = true
      } else {
        isTrue = false
        this.$message.error('文件格式不正确')
      }
      return isTrue
    },
    // 培训方案 => 上传成功
    fileSuccess(file) {
      if (file.code == 200) {
        const id = file.data[0].id
        this.ruleForm.trainingDesign = id
        getFileRoute(id).then(res => {
          const result = res.data
          const url = this.decrypt(result.key, result.iv, result.url)
          let fileUrl = null
          this.geturlpath().then(res => {
            fileUrl = res.ip + ':' + res.iport + '/upload' + url
            this.fileList_2 = []
            this.fileList_2.push(fileUrl)
          })
        })
      }
    },
    // 培训方案 => 删除
    removeOne(file, fileList) {
      this.fileList_2 = fileList
    },
    // 解密
    decrypt(key, iv, text) {
      const d = text.substr(9)
      const newKey = CryptoJS.enc.Latin1.parse(key) // 需要与后台保持一致
      const newIv = CryptoJS.enc.Latin1.parse(iv) // 需要与后台保持一致
      const decrypted = CryptoJS.AES.decrypt(d, newKey, {
        iv: newIv,
        padding: CryptoJS.pad.ZeroPadding
      })
      const password = decrypted.toString(CryptoJS.enc.Utf8)
      return password
    },
    // 本地路径
    async geturlpath() {
      const res = await geturlpath()
      if (res.code == 200) {
        const data = res.data
        const key = data[0].key
        const iv = data[0].iv
        const siteIp = data[0].siteIp
        const sitePort = data[0].sitePort
        const route = {}
        route.ip = this.decrypt(key, iv, siteIp)
        route.iport = this.decrypt(key, iv, sitePort)
        return route
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form {
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
    border-top: 1px solid #dcdfe6;
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
