<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
    <el-form-item label="视频来源:" prop="theSource">
      <el-radio-group v-model="ruleForm.theSource">
        <el-radio label="本地电脑选择" />
        <!-- <el-radio label="从课程库中选择" /> -->
      </el-radio-group>
    </el-form-item>

    <el-form-item label="视频文件:" prop="filePath">
      <el-upload
        v-model="ruleForm.filePath"
        :action="baseImgUrl"
        :limit="1"
        :headers="requestHeader"
        :on-success="fileSuccess"
        :before-upload="beforeUpload"
        :file-list="fileList3"
        :on-remove="removeVideo"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">
          只能上传mp4格式H264编码的视频，单个视频不超过200MB，如果视频过大可下载
          <a style="color: #1890ff;" @click="DownGj">“视频转码工具”</a>
          转换
        </div>
      </el-upload>
    </el-form-item>

    <el-form-item label="视频名称:" prop="resourceTitle"><el-input v-model="ruleForm.resourceTitle" placeholder="请输入" maxlength="60" show-word-limit /></el-form-item>

    <el-form-item label="所属分类:" prop="categoryId">
      <el-cascader v-model="ruleForm.categoryId" :props="props" :options="options" style="margin-left: 0;" clearable />
    </el-form-item>

    <el-form-item label="适用学段:" prop="sectionIds">
      <el-select v-model="ruleForm.sectionIds" multiple placeholder="请选择">
        <el-option v-for="item in sectionOptions" :key="item.value" :label="item.label" :value="item.id" />
      </el-select>
    </el-form-item>

    <el-form-item label="适用学科:">
      <el-select v-model="ruleForm.subjectIds" multiple placeholder="请选择">
        <el-option v-for="item in subjectOptions" :key="item.value" :label="item.label" :value="item.id" />
      </el-select>
    </el-form-item>

    <el-form-item label="自定义分类:"><el-input v-model="ruleForm.categoryName" placeholder="请输入" /></el-form-item>

    <el-form-item label="视频简介:"><el-input v-model="ruleForm.introduction" type="textarea" :autosize="{ minRows: 3, maxRows: 5 }" placeholder="请输入" /></el-form-item>

    <el-form-item label="主讲人:"><el-input v-model="ruleForm.speaker" placeholder="请输入" /></el-form-item>

    <el-form-item label="主讲人单位:"><el-input v-model="ruleForm.speakerUnit" placeholder="请输入" /></el-form-item>

    <el-form-item label="缩略图:">
      <el-upload
        v-model="ruleForm.thumbFilePath"
        :action="baseImgUrl"
        :headers="requestHeader"
        :on-success="fileImg"
        :before-upload="beforeImg"
        :file-list="fileList1"
        list-type="picture"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg文件</div>
      </el-upload>
    </el-form-item>
    <!--
    <el-form-item label="相关附件:">
      <el-upload v-model="ruleForm.appendix" :action="baseImgUrl" :headers="requestHeader" :on-success="fileFile" :before-upload="beforeFile" :file-list="fileList2">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传doc/docx/pdf文件</div>
      </el-upload>
    </el-form-item> -->

    <div class="buttonItem">
      <div>
        <el-button type="primary" :disabled="isOk" @click="submitForm('ruleForm')">提 交</el-button>
        <el-button @click="closeDia">取 消</el-button>
      </div>
    </div>
  </el-form>
</template>

<script>
import { baseImgUrl, baseURL, baseURL11 } from '@/utils/request.js';
import { getFileRoute, geturlpath, keepResources, getResourceInfo, updateDurate } from '@/api/train.js';
import CryptoJS from 'crypto-js';
import { geturlinfo } from '@/api/system.js';
export default {
  props: {
    videoId: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: []
    },
    subjectOptions: {
      type: Array,
      default: []
    },
    sectionOptions: {
      type: Array,
      default: []
    },
    isTypes: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      requestHeader: {
        // 未上传图片的请求头加token
        token: window.localStorage.getItem('localtoken')
      },
      baseImgUrl,
      baseURL11,
      ruleForm: {
        theSource: '本地电脑选择',
        filePath: null,
        resourceTitle: '',
        categoryId: [],
        sectionIds: [],
        subjectIds: [],
        categoryName: '',
        introduction: '',
        speaker: '',
        speakerUnit: '',
        thumbFilePath: ''
        // appendix: ''
      },
      rules: {
        theSource: [{ required: true, message: '请选择视频来源', trigger: 'blur' }],
        // filePath: [{ required: true, message: '请上传视频', trigger: 'blur' }],
        resourceTitle: [{ required: true, message: '请填写视频名称', trigger: 'blur' }],
        categoryId: [{ required: true, message: '请选择所属分类', trigger: 'blur' }],
        sectionIds: [{ required: true, message: '请选择适用学段', trigger: 'blur' }]
      },
      fileList1: [],
      fileList2: [],
      fileList3: [],
      props: {
        multiple: false,
        label: 'name',
        value: 'id'
      },
      isOk: true
    };
  },
  watch: {
    videoId(newVal, oldVal) {
      if (newVal) {
        this.getResourceInfo();
      }
    }
  },
  mounted() {
    if (this.videoId) {
      this.getResourceInfo();
    }
  },
  methods: {
    removeVideo() {
      this.isOk = true;
    },
    DownGj() {
      window.open(this.baseURL11 + '/convert.zip');
    },
    // 详情
    async getResourceInfo() {
      const res = await getResourceInfo(this.videoId);
      if (res.code == 200) {
        this.ruleForm = res.data;
        const arr = [];
        const url = this.baseURL11 + '/upload' + res.data.filePath;
        arr.push({ name: res.data.fileName, url });
        this.fileList3 = arr;
        this.isOk = false;
        this.ruleForm.categoryId = res.data.categorys.reverse();
        this.ruleForm.sectionIds = res.data.sectionIds.split(',');
        this.ruleForm.theSource = '本地电脑选择';
        if (res.data.thumbFilePath) {
          const imgArr = [];
          imgArr.push({ url: this.baseURL11 + '/upload' + res.data.thumbFilePath });
          this.fileList1 = imgArr;
        }
      }
    },
    // 保存资源
    async keepResources(params) {
      const res = await keepResources(params);
      if (res.code == 200) {
        this.$message.success(res.message);
        this.closeDia();
        for (const key in this.ruleForm) {
          this.ruleForm[key] = '';
        }
        this.ruleForm.subjectIds = this.ruleForm.categoryId = this.ruleForm.sectionIds = this.fileList1 = this.fileList2 = this.fileList3 = [];
        this.ruleForm.theSource = '本地电脑选择';
        this.isOk = true;
      }
    },
    async updateDurate(params) {
      const res = await updateDurate(params);
      if (res.code == 200) {
        this.$message.success(res.message);
        this.closeDia();
        for (const key in this.ruleForm) {
          this.ruleForm[key] = '';
        }
        this.ruleForm.categoryId = this.ruleForm.sectionIds = this.fileList1 = this.fileList2 = this.fileList3 = [];
        this.ruleForm.theSource = '本地电脑选择';
        this.isOk = true;
      }
    },
    // 关闭弹窗
    closeDia() {
      for (const key in this.ruleForm) {
        this.ruleForm[key] = '';
      }
      this.fileList1 = this.fileList2 = this.fileList3 = [];
      const obj = {
        type: this.videoId ? 1 : 2,
        value: false
      };
      this.$emit('closeVideo', obj);
    },
    // 新建提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.activityId = sessionStorage.getItem('actId');
          if (this.ruleForm.categoryId.length > 1) {
            this.ruleForm.categoryId = this.ruleForm.categoryId.pop();
          }
          this.ruleForm.sectionIds = this.ruleForm.sectionIds.join();
          if (this.isTypes == 1) {
            this.ruleForm.categoryId = this.ruleForm.categoryId.toString();
            this.keepResources(this.ruleForm);
          } else {
            this.ruleForm.categoryId = this.ruleForm.categoryId.toString();
            this.updateDurate(this.ruleForm);
          }
        } else {
          return false;
        }
      });
    },
    // 视频上传成功
    fileSuccess(file) {
      if (file.code == 200) {
        const id = file.data[0].id;
        this.ruleForm.fileName = file.data[0].name;
        this.ruleForm.fileMd5 = file.data[0].fileMd5;
        this.ruleForm.videoDuration = file.data[0].duration;
        this.ruleForm.video = id;
        getFileRoute(id).then(res => {
          const result = res.data;
          const url = this.decrypt(result.key, result.iv, result.url);
          this.geturlpath().then(res => {
            this.ruleForm.filePath = url;
            this.isOk = false;
            // this.ruleForm.filePath = res.ip + ':' + res.iport + '/upload' + url;
          });
        });
        // if (file.data[0].isRepeat) {
        //   this.$message.warning('您当前所选的视频已经在本次培训活动中已经上传了，同一视频不允许重复上传！')
        //   this.fileList3 = []
        // } else {
        //   const id = file.data[0].id
        //   this.ruleForm.fileName = file.data[0].name
        //   this.ruleForm.fileMd5 = file.data[0].fileMd5
        //   this.ruleForm.videoDuration = file.data[0].duration
        //   this.ruleForm.video = id
        //   getFileRoute(id).then(res => {
        //     const result = res.data
        //     const url = this.decrypt(result.key, result.iv, result.url)
        //     this.geturlpath().then(res => {
        //       this.ruleForm.filePath = url
        //       this.isOk = false
        //       // this.ruleForm.filePath = res.ip + ':' + res.iport + '/upload' + url;
        //     })
        //   })
        // }
      } else {
        this.$message.error(file.msg);
      }
    },
    // 视频上传之前
    beforeUpload(file) {
      const size = file.size < 419730566;
      const isVidep = file.type === 'video/mp4';
      if (!isVidep) {
        this.$message.error('上传视频只能是mp4格式');
      }
      if (!size) {
        this.$message.error('上传文件不能超过400MB');
      }
      return isVidep && size;
    },
    // 图片 => 上传成功
    fileImg(file) {
      if (file.code == 200) {
        const id = file.data[0].id;
        // this.ruleForm.courseCover = id;
        getFileRoute(id).then(res => {
          const result = res.data;
          const url = this.decrypt(result.key, result.iv, result.url);
          this.geturlpath().then(res => {
            this.ruleForm.thumbFilePath = url;
            // this.ruleForm.thumbFilePath = res.ip + ':' + res.iport + '/upload' + url;
          });
        });
      } else {
        this.$message.error(file.msg);
      }
    },
    // 图片 => 上传前
    beforeImg(file) {
      let isTrue = null;
      const isType = file.type;
      if (isType == 'image/jpeg' || isType == 'image/png') {
        isTrue = true;
      } else {
        isTrue = false;
        this.$message.error('文件格式不正确');
      }
      return isTrue;
    },
    // 文件 => 上传成功
    fileFile(file) {
      const id = file.data[0].id;
      // this.ruleForm.trainingDesign = id;
      getFileRoute(id).then(res => {
        const result = res.data;
        const url = this.decrypt(result.key, result.iv, result.url);
        let fileUrl = null;
        this.geturlpath().then(res => {
          fileUrl = res.ip + ':' + res.iport + '/upload' + url;
          // console.log(fileUrl, '文件');
        });
      });
    },
    // 文件 => 上传前
    beforeFile(file) {
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
