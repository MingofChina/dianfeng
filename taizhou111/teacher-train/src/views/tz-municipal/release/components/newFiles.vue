<template>
  <el-dialog
    title="发表新帖子"
    width="800px"
  :visible.sync="newClick"
  @close="closeDia"
  >
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
    <el-form-item label="讨论主题:" prop="discussionTopic"><el-input v-model="ruleForm.discussionTopic" placeholder="请输入" maxlength="60" show-word-limit /></el-form-item>

    <el-form-item label="所属分类:" prop="classification"><el-cascader :props="props" v-model="ruleForm.classification"  :options="options" clearable /></el-form-item>

    <el-form-item label="详细描述:" prop="trainInstructions">
      <!--    <div style="border: 1px solid #ccc;">
        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" />
        <Editor style="height: 400px; overflow-y: hidden;" v-model="html" :defaultConfig="editorConfig" :mode="mode" @onCreated="onCreated" />
      </div> -->
      <el-input type="textarea" :rows="5" placeholder="请输入详细描述" v-model="ruleForm.trainInstructions"></el-input>
    </el-form-item>

   <!-- <el-form-item label="相关附件:">
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
    </el-dialog>
</template>

<script>
// import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { saveActivityTopic } from '@/api/train.js';
import { baseImgUrl } from '@/utils/request.js';
import CryptoJS from 'crypto-js';
export default {
  name: 'newSeminar',

  // components: { Editor, Toolbar },
  data() {
    return {
      newClick:false,
      editor: null,
      html: '<p>hello</p>',
      toolbarConfig: {},
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default', // or 'simple'

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
      options: [], //所属分类
      fileList: [],
      content: '这里是要发布的内容'
    };
  },
  props:['childlist'],
  mounted() {
    // this.getCourse();
    // this.html = '<p>模拟 Ajax 异步设置内容 HTML</p>';
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    //提交
    async saveTrainTheme(params) {
      const res = await saveTrainTheme(params);
      if (res.code == 200) {
        this.closeDia();
      }
    },
    shows(){
     this.options=this.childlist
     this.newClick=true
    },
    //取消
    closeDia() {
    this.ruleForm.discussionTopic=""
    this.ruleForm.trainInstructions=""
    this.ruleForm.classification=[]
     this.newClick=false
    },
    //所属分类
    // async getCourse() {
    //   let id = sessionStorage.getItem('actId');
    //   const res = await getAllTree(id);
    //   if (res.code == 200) {
    //     this.options = res.data;
    //   }
    // },
    // 提交
  submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {

             let data11=this.ruleForm.classification.toString()

          let  topicParam ={
            topicTitle:this.ruleForm.discussionTopic,
            comment:this.ruleForm.trainInstructions,
            courseCategoryId:data11,
            activityId:this.$route.query.activityId
          }
   saveActivityTopic(topicParam).then((res)=>{

               if(res.data==true){
               this.$message.success('发帖成功');
                 this.ruleForm.discussionTopic=""
                 this.ruleForm.trainInstructions=""
                 this.ruleForm.classification=[]
                 this.newClick=false
                 this.$emit("changefatie",1)
               }

   })



        } else {

        }
      });
    },
    // 培训方案 => 上传前
    beforeUpload(file) {
      let isTrue = null;
      const isType = file.type;
      if (isType == 'application/pdf' || isType == 'application/msword' || isType == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        isTrue = true;
      } else {
        isTrue = false;
        this.$message.error('文件格式不正确');
      }
      return isTrue;
    },
    // 培训方案 => 上传成功
    fileSuccess(file) {
      const id = file.data[0].id;
      getFileRoute(id).then(res => {
        const result = res.data;
        const url = this.decrypt(result.key, result.iv, result.url);
        let fileUrl = null;
        this.geturlpath().then(res => {
          fileUrl = res.ip + ':' + res.iport + '/upload' + url;
          console.log(fileUrl, '路径');
          // this.fileList.push({ url: fileUrl });
        });
      });
    },
    // 培训方案 => 删除
    removeOne(file, fileList) {
      this.fileList = fileList;
    },
    // 解密
    decrypt(key, iv, text) {
      const d = text.substr(9);
      const newKey = CryptoJS.enc.Latin1.parse(key); // 需要与后台保持一致
      const newIv = CryptoJS.enc.Latin1.parse(iv); // 需要与后台保持一致
      const decrypted = CryptoJS.AES.decrypt(d, newKey, {
        iv: newIv,
        padding: CryptoJS.pad.ZeroPadding
      });
      const password = decrypted.toString(CryptoJS.enc.Utf8);
      return password;
    },
    // 本地路径
    async geturlpath() {
      const res = await geturlpath();
      if (res.code == 200) {
        const data = res.data;
        const key = data[0].key;
        const iv = data[0].iv;
        const siteIp = data[0].siteIp;
        const sitePort = data[0].sitePort;
        const route = {};
        route.ip = this.decrypt(key, iv, siteIp);
        route.iport = this.decrypt(key, iv, sitePort);
        return route;
      }
    }
  }
};
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
