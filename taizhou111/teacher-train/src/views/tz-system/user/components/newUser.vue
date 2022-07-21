<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="130px" class="demo-ruleForm">
    <el-row :gutter="24">
      <el-col :span="8">
        <el-form-item label="登录名:" prop="loginName"><el-input v-model="ruleForm.loginName" placeholder="请输入登录名" /></el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="真实姓名:" prop="realName"><el-input v-model="ruleForm.realName" placeholder="请输入真实姓名" /></el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="性别:" prop="sex">
          <el-select v-model="ruleForm.sex" placeholder="请选择性别">
            <el-option v-for="item in options_1" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="登录密码:" prop="userpwd"><el-input v-model="ruleForm.userpwd" placeholder="请输入登录密码" /></el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="确认密码:" prop="doublename"><el-input v-model="doublename" placeholder="请输入" /></el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="身份证号:" prop="idCard"><el-input v-model="ruleForm.idCard" placeholder="请输入" /></el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="出生日期:" prop="birthday"><el-date-picker v-model="ruleForm.birthday" type="date" placeholder="请选择出生日期" /></el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="手机号:" prop="mobile"><el-input v-model="ruleForm.mobile" placeholder="请输入手机号" /></el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="E-mail:" prop="email"><el-input v-model="ruleForm.email" placeholder="请输入email" /></el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="现任教学段:" prop="sectionIdList">
          <el-cascader v-model="ruleForm.sectionIdList" :options="options_2" placeholder="请选择现任教学段" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="现任教学科:" prop="subjectIdList">
          <el-cascader v-model="ruleForm.subjectIdList" :options="options_2" placeholder="请选择现任教学科" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="所在单位:" prop="schoolId"><el-cascader v-model="ruleForm.schoolId" :options="options" placeholder="请选择所在单位" /></el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="照片:" prop="fileList1">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="ruleForm.fileList1" list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg文件</div>
          </el-upload>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="个人简介:" prop="description">
          <el-input v-model="ruleForm.description" type="textarea" :autosize="{ minRows: 3, maxRows: 5 }" placeholder="请输入个人简介" />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="状态" prop="useFlag">
          <el-radio-group v-model="ruleForm.useFlag">
            <el-radio label="正常" />
            <el-radio label="退休" />
            <el-radio label="调离" />
            <el-radio label="禁用" />
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="选择角色:" prop="roleIdList">
          <el-checkbox-group v-for="(item, index) in ruleForm.roleoptions" :key="item.id" v-model="ruleForm.roleIdList" @change="getrolebox(item.id)">
            <el-checkbox :label="item.roleName" />
            <!-- <el-checkbox label="系统管理员" name="academy" />
				    <el-checkbox label="主管领导" name="manager" />
				    <el-checkbox label="教师" name="manager" /> -->
          </el-checkbox-group>
        </el-form-item>
      </el-col>
    </el-row>
    <div class="buttonItem">
      <div>
        <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
        <el-button @click="resetForm('ruleForm')">关 闭</el-button>
      </div>
    </div>
  </el-form>
</template>

<script>
import { getroleinfo, getunitinfo } from '../../../../api/system.js'

export default {
  data() {
    return {
      doublename: '',
      rolelist: [],
      ruleForm: {
        loginName: '',
        realName: '',
        sex: '',
        userpwd: '',
        idCard: '',
        birthday: '',
        mobile: '',
        email: '',
        sectionIdList: [],
        subjectIdList: [],
        schoolId: '',
        fileList1: [],
        description: '',
        useFlag: '',
        roleName: '',
        roleIdList: []
      },
      rules: {
        loginName: [{ required: true, message: '请输入请输入登录名', trigger: 'blur' }, { min: 1, max: 60, message: '长度不超过60个字符', trigger: 'blur' }],
        realName: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        userpwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        doublename: [{ required: true, message: '请输入确认密码', trigger: 'blur' }],
        idCard: [{ required: true, message: '请输入请输入登录名', trigger: 'blur' }, { min: 18, max: 18, message: '身份证应为18位', trigger: 'blur' }],
        birthday: [{ required: true, message: '请选择出生日期', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入电话号码', trigger: 'blur' }, { min: 11, max: 11, message: '电话号码应为11位', trigger: 'blur' }],
        email: [{ required: true, message: '请输入电子邮箱', trigger: 'blur' }],
        sectionIdList: [{ required: true, message: '请输入学段', trigger: 'blur' }],
        subjectIdList: [{ required: true, message: '请输入学科', trigger: 'blur' }],
        schoolId: [{ required: true, message: '请选择所在单位', trigger: 'blur' }],
        fileList1: [{ required: true, message: '请选上传图片', trigger: 'blur' }],
        description: [{ required: true, message: '请填写个人简介', trigger: 'blur' }],
        useFlag: [{ required: true, message: '请选择状态', trigger: 'blur' }],
        roleIdList: [{ required: true, message: '请选择角色', trigger: 'blur' }]
      },
      fileList1: [
        {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ],
      props: { multiple: true },
      options_1: [
        {
          value: '',
          label: '全部 '
        }
      ],
      options: [],
      roleoptions: [],
      options_2: [
        {
          value: '01',
          label: '01',
          children: [
            {
              value: '01-1',
              label: '01-1'
            },
            {
              value: '01-2',
              label: '01-2'
            }
          ]
        },
        {
          value: '02',
          label: '02',
          children: [
            {
              value: '02-1',
              label: '02-1'
            },
            {
              value: '02-2',
              label: '02-2'
            }
          ]
        }
      ]
    }
  },
  mounted() {
    this.getroleinfos()
    this.getunitinfos()
  },
  methods: {
    // 获取单位列表信息
    async getunitinfos() {
      const res = await getunitinfo()
      console.log(res, 4444)
      if (res.code == 200) {
        this.options = []
        this.options = res.data
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    // 监听勾选的角色
    getrolebox(e) {},
    // 获取角色用户信息
    async getroleinfos() {
      const res = await getroleinfo()
      if (res.code == 200) {
        console.log(res, 1111)
        this.ruleForm.roleoptions = []
        this.ruleForm.roleoptions = res.data
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
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
    handleRemove(file, fileList) {},
    handlePreview(file) {},
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form {
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
