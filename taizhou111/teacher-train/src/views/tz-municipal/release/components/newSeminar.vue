<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
    <el-form-item label="讨论主题:" prop="discussionTopic"><el-input v-model="ruleForm.discussionTopic" placeholder="请输入" maxlength="60" show-word-limit /></el-form-item>

    <el-form-item label="所属分类:" prop="classification"><el-cascader v-model="ruleForm.classification" :props="props" :options="options" clearable /></el-form-item>

    <el-form-item label="详细描述:" prop="trainInstructions">
      <div class="content">
        <!-- 工具栏 -->
        <Toolbar class="toolbar" :editor="editor" :default-config="toolbarConfig" />
        <!-- 编辑器 -->
        <Editor
          v-model="html"
          style="border: 1px solid #c0c4cc;height: 300px;margin-top: 20px;"
          class="editor"
          :default-config="editorConfig"
          @onChange="onChange"
          @onCreated="onCreated"
        />
      </div>
      <!-- <el-input v-model="ruleForm.trainInstructions" type="textarea" :rows="5" placeholder="请输入详细描述" /> -->
    </el-form-item>

    <!--    <el-form-item label="相关附件:">
      <el-upload
        v-model="ruleForm.appendix"
        :headers="requestHeader"
        :action="baseImgUrl"
        :on-success="fileSuccess"
        :before-upload="beforeUpload"
        :on-remove="removeOne"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传doc/docx/pdf文件</div>
      </el-upload>
    </el-form-item> -->

    <div class="buttonItem">
      <div>
        <el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>
        <el-button @click="closeDia">返 回</el-button>
      </div>
    </div>
  </el-form>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { geturlpath, getFileRoute, saveTrainTheme } from '@/api/train.js'
import { baseImgUrl, baseURL11 } from '@/utils/request.js'
// import { geturlinfo } from '@/api/system.js'
import CryptoJS from 'crypto-js'
export default {
  name: 'NewSeminar',
  components: { Editor, Toolbar },
  props: ['radioChangeRow', 'seminarObj', 'options'],
  data() {
    return {
      requestHeader: {
        // 未上传图片的请求头加token
        token: window.localStorage.getItem('localtoken')
      },
      ruleForm: {
        discussionTopic: '',
        classification: [],
        trainInstructions: '',
        appendix: ''
      },
      baseURL11,
      rules: {
        discussionTopic: [{ required: true, message: '请填写讨论主题', trigger: 'blur' }],
        classification: [{ required: true, message: '请选择所属分类', trigger: 'blur' }],
        trainInstructions: [{ required: true, message: '请填写详细描述', trigger: 'blur' }]
      },
      props: {
        multiple: false,
        label: 'name',
        value: 'id'
      },
      baseImgUrl,
      // options: [], // 所属分类
      fileList: [],
      content: '这里是要发布的内容',
      uploadId: '',
      ids: '',
      mode: 'default', // or 'simple'
      editor: null,
      html: '',
      // 工具栏配置
      toolbarConfig: {
        excludeKeys: ['group-video']
      },
      // 上传图片地址
      editorConfig: {
        placeholder: '请输入内容...',
        // autoFocus: false,
        // 所有的菜单配置，都要在 MENU_CONF 属性下
        MENU_CONF: {
          // 配置上传图片
          uploadImage: {
            server: baseImgUrl,
            fieldName: 'file',
            headers: {
              token: window.localStorage.getItem('localtoken')
            },
            // onBeforeUpload: this.uploadBefores,
            customInsert: this.upload
          }
        }
      }
    }
  },
  watch: {
    seminarObj(newVal, oldVal) {
      this.ids = newVal.id
      this.ruleForm.discussionTopic = newVal.topicTitle
      this.ruleForm.trainInstructions = newVal.comment
      this.ruleForm.classification = newVal.categorys.reverse()
      this.$nextTick(() => {
        this.editor.setHtml(newVal.comment)
      })
    }
  },
  mounted() {
    if (this.seminarObj) {
      this.ids = this.seminarObj.id
      this.ruleForm.discussionTopic = this.seminarObj.topicTitle
      this.ruleForm.trainInstructions = this.seminarObj.comment
      this.ruleForm.classification = this.seminarObj.categorys.reverse()
      this.$nextTick(() => {
        this.editor.setHtml(this.seminarObj.comment)
      })
    }
  },
  methods: {
    upload(file, insertFn) {
      if (file.code == 200) {
        const id = file.data[0].id
        this.ruleForm.courseCover = id
        const imgUrl = baseURL11 + '/upload/' + file.data[0].url + '/' + file.data[0].annexName
        insertFn(imgUrl)
      }
    },
    // 实时获取输入的内容
    onChange(editor) {
      this.content = editor.getHtml()
      this.ruleForm.trainInstructions = editor.getHtml()
    },
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    async saveTrainTheme(params) {
      const res = await saveTrainTheme(params)
      if (res.code == 200) {
        this.$message.success(res.message)
        for (const key in this.ruleForm) {
          this.ruleForm[key] = ''
        }
        this.fileList = []
        this.closeDia()
      }
    },
    // 取消
    closeDia() {
      this.ruleForm.discussionTopic = ''
      this.ruleForm.classification = []
      this.editor.clear()
      this.$emit('closeSeminar', {
        type: 1,
        value: false
      })
      // const editor = this.editor
      // if (editor == null) return
      // editor.destroy() // 组件销毁时，及时销毁编辑器
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            activityId: sessionStorage.getItem('actId'),
            comment: this.ruleForm.trainInstructions,
            topicTitle: this.ruleForm.discussionTopic,
            courseCategoryId: this.ruleForm.classification.pop(),
            id: this.ids
            // attachmentId: this.uploadId
          }
          this.saveTrainTheme(params)
        } else {
          return false
        }
      })
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
      const id = file.data[0].id
      this.uploadId = id
      getFileRoute(id).then(res => {
        const result = res.data
        const url = this.decrypt(result.key, result.iv, result.url)
        let fileUrl = null
        this.geturlpath().then(res => {
          fileUrl = res.ip + ':' + res.iport + '/upload' + url
          this.fileList = []
          this.fileList.push(fileUrl)
        })
      })
    },
    // 培训方案 => 删除
    removeOne(file, fileList) {
      this.fileList = fileList
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
<style src="@wangeditor/editor/dist/css/style.css"></style>
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
    border-top: 1px solid #dcdfe6;
  }
  div {
    display: inline-block;
  }
  .el-button + .el-button {
    margin-left: 24px;
  }
}
</style>
