<template>
  <el-card class="box-card">
    <el-form
      :model="form"
      :inline="true"
      class="demo-form-inline"
    >
      <el-form-item label="登录名称">
        <el-input
          v-model="form.loginName"
          clearable
          placeholder="请输入登录名称"
        />
      </el-form-item>

      <el-form-item label="姓名">
        <el-input
          v-model="form.realName"
          clearable
          placeholder="请输入姓名"
        />
      </el-form-item>

      <el-form-item label="单位">
        <el-input
          v-model="form.schoolId"
          clearable
          placeholder="请输入单位"
        />
      </el-form-item>

      <el-form-item label="状态">
        <el-select
          v-model="form.useFlag"
          clearable
          placeholder="请选择状态"
          @change="getstatus"
        >
          <el-option
            label="禁用"
            value="0"
          />
          <el-option
            label="正常"
            value="1"
          />
          <el-option
            label="退休"
            value="2"
          />
          <el-option
            label="调离"
            value="3"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="角色">
        <el-select
          v-model="form.roleId"
          clearable
          placeholder="请选择角色"
        >
          <el-option
            v-for="item in rolelists"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="学科">
        <el-cascader
          v-model="form.subjectId"
          :options="subjectoptions"
          placeholder="请选择学科"
          @change="getsubjectsinfo"
        />
      </el-form-item>
      <el-form-item label="学段">
        <el-cascader
          v-model="form.sectionId"
          :options="sectionoptions"
          placeholder="请选择学段"
          @change="getsectioninfo"
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
        <el-button
          type="primary"
          @click="onSubmit"
        >筛选</el-button>
        <el-button
          type="primary"
          style="margin-left:20px"
          @click="reset"
        >重置</el-button>
      </el-form-item>
    </el-form>
    <vxe-table
      ref="xGrid"
      style="margin-top:20px"
      border
      stripe
      header-align="center"
      show-header-overflow
      show-overflow
      :row-config="{ isHover: true }"
      :data="tableData"
      :loading="loading"
      :edit-config="{ trigger: 'manual', mode: 'row' }"
      :radio-config="{ highlight: true }"
      @radio-change="radioChange"
      @cell-click="cellClick"
    >
      <vxe-column
        type="radio"
        width="40"
        align="center"
      />
      <vxe-column
        field="realName"
        title="姓名"
        align="center"
      />
      <vxe-column
        field="loginName"
        title="登录名"
        align="center"
      />
      <vxe-column
        field="sex"
        title="性别"
        align="center"
      />
      <vxe-column
        field="schoolName"
        title="单位"
        min-width="200"
        align="center"
      />
      <vxe-column
        field="roleName"
        title="角色"
        align="center"
      />
      <vxe-column
        field="useFlag"
        title="状态"
        align="center"
      />
    </vxe-table>
    <vxe-pager
      :current-page="form.pageNum"
      :page-size="form.pageSize"
      :total="total"
      @page-change="pageChange"
    >
      <template #left>
        <span class="page-left">
          <el-button
            type="primary"
            size="small"
            plain
            @click="newadd"
          >新 建</el-button>
          <el-button
            type="warning"
            size="small"
            plain
            @click="modification(1)"
          >修 改</el-button>
          <el-button
            size="small"
            plain
            @click="deleteinfo"
          >删 除</el-button>
        </span>
      </template>
    </vxe-pager>
    <el-dialog
      :title="vidledata ? '修改用户' : '新建用户'"
      width="1000px"
      :close-on-click-modal="false"
      :visible.sync="newClickVisible"
      @close="closedialog('ruleForm')"
    >
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="130px"
        class="demo-ruleForm"
      >
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item
              label="登录名:"
              prop="loginName"
            >
              <el-input
                v-model="ruleForm.loginName"
                placeholder="请输入登录名"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="真实姓名:"
              prop="realName"
            >
              <el-input
                v-model="ruleForm.realName"
                placeholder="请输入真实姓名"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="性别:"
              prop="sex"
            >
              <el-select
                v-model="ruleForm.sex"
                placeholder="请选择性别"
                @change="shoosesex"
              >
                <el-option
                  v-for="item in sexlist"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="登录密码:"
              :prop="vidledata ? 'tal' : 'userpwd'"
            >
              <el-input
                v-model="ruleForm.userpwd"
                placeholder="请输入登录密码"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="确认密码:"
              :prop="vidledata ? 'tal' : 'doublename'"
            >
              <el-input
                v-model="ruleForm.doublename"
                placeholder="请输入确认密码"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="身份证号:"
              prop="idCard"
            >
              <el-input
                v-model="ruleForm.idCard"
                placeholder="请输入身份证号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="出生日期:"
              prop="birthday"
            >
              <el-date-picker
                v-model="ruleForm.birthday"
                type="date"
                placeholder="请选择出生日期"
                @change="chosedate"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="手机号:"
              prop="mobile"
            >
              <el-input
                v-model="ruleForm.mobile"
                placeholder="请输入手机号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="E-mail:"
              prop="email"
            >
              <el-input
                v-model="ruleForm.email"
                placeholder="请输入email"
              />
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="现任教学段:"
              prop="sectionIdList"
            >
              <el-cascader
                v-model="ruleForm.sectionIdList"
                :props="{ multiple: true, checkStrictly: true }"
                :options="options_2"
                placeholder="请选择现任教学段"
                @visible-change="changexueduan"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="现任教学科:"
              prop="subjectIdList"
            >
              <el-cascader
                v-model="ruleForm.subjectIdList"
                :props="{ multiple: true, checkStrictly: true }"
                :options="options_3"
                placeholder="请选择现任教学科"
                @visible-change="changexueke"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="所在单位:"
              prop="schoolId"
            >
              <el-cascader
                ref="cascader"
                v-model="ruleForm.schoolId"
                :options="optionsss"
                placeholder="请选择所在单位"
                :props="{ checkStrictly: true }"
                @visible-change="changeunit"
                @change="chosenode"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="照片:"
              :prop="vidledata?'file':'fileList1'"
            >
              <el-upload
                :on-success="getfiles"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="ruleForm.fileList1"
                list-type="picture"
                :action="action"
                :limit="1"
                :headers="requestHeader"
              >
                <!-- :headers="{ token:this.tokendata }" -->
                <el-button
                  size="small"
                  type="primary"
                >点击上传</el-button>
                <div
                  slot="tip"
                  class="el-upload__tip"
                >只能上传jpg/png/jpeg文件</div>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="个人简介:"
              prop="description"
            >
              <el-input
                v-model="ruleForm.description"
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 5 }"
                placeholder="请输入个人简介"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="状态"
              prop="useFlag"
            >
              <el-radio-group
                v-model="ruleForm.useFlag"
                @change="getstatus11"
              >
                <el-radio
                  label="禁用"
                  value="0"
                />
                <el-radio
                  label="正常"
                  value="1"
                />
                <el-radio
                  label="退休"
                  value="2"
                />
                <el-radio
                  label="调离"
                  value="3"
                />
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">

            <el-form-item
              label="选择角色:"
              prop="roleIdList"
            >
              <el-checkbox-group v-model="ruleForm.roleIdList">
                <el-checkbox
                  v-for="(item,index) in roleoptions"
                  :key="item.id"
                  :label="item.label"
                  :checked="item.checked"
                />
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <div
          class="buttonItem"
          style="text-align: center"
        >
          <div>
            <el-button
              type="primary"
              @click="submitForm('ruleForm')"
            >保 存</el-button>
            <el-button @click="resetForm('ruleForm')">关 闭</el-button>
          </div>
        </div>
      </el-form>
    </el-dialog>
  </el-card>
</template>

<script>

import newUser from './newUser.vue'
import { baseurlimgs, baseURL11 } from '../../../../utils/request.js'
import { getToken } from '../../../../utils/auth.js'
import { getActivitiesTableData, edituserinfo, gettreeinfo, deleteuserinfo, getsubjects, getroleinfo, getunitinfo, adduserinfo, gettreeinfos, getuserinfo, geturlinfo, geturlpath } from '../../../../api/system.js'
// import { getToken } from '../../../../utils/auth.js'
import CryptoJS from 'crypto-js'
export default {
  name: 'User',
  components: {
    newUser
  },
  data() {
    return {
      baseurls: '',
      action: '',
      requestHeader: {
        // 未上传图片的请求头加token
        token: window.localStorage.getItem('localtoken')
      },
      tokendata: '',
      sexlist: [
        {
          label: '男',
          value: '1'
        },
        {
          label: '女',
          value: '0'
        }
      ],
      roleoptions: [],
      rolelist: [],
      optionsss: [],
      ruleForm: {
        doublename: '',
        schoolId: '',
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
        fileList1: [],
        photoId: '',
        description: '',
        useFlag: '正常',
        roleIdList: ['教师'],
        notRoleId: ''
      },
      rolelists: [],
      deletedata: '',
      options_2: [],
      options_3: [],
      form: {
        loginName: '',
        realName: '',
        schoolId: '',
        useFlag: '',
        roleId: '',
        subjectId: '',
        pageNum: 1,
        pageSize: 10,
        sectionId: '',
        areaId: '',
        notRoleId: ''
      },
      rules: {
        loginName: [{ required: true, message: '请输入请输入登录名', trigger: 'blur' }, { min: 1, max: 60, message: '长度不超过60个字符', trigger: 'blur' }],
        realName: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        userpwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        doublename: [{ required: false, message: '请输入确认密码', trigger: 'blur' }],
        idCard: [{ required: false, message: '请输入请输入身份证号码', trigger: 'blur' }, { min: 18, max: 18, message: '身份证应为18位', trigger: 'blur' }],
        birthday: [{ required: false, message: '请选择出生日期', trigger: 'blur' }],
        mobile: [{ required: false, message: '请输入电话号码', trigger: 'blur' }, { min: 11, max: 11, message: '电话号码应为11位', trigger: 'blur' }],
        email: [{ required: false, message: '请输入电子邮箱', trigger: 'blur' }],
        sectionIdList: [{ required: true, message: '请输入学段', trigger: 'blur' }],
        subjectIdList: [{ required: true, message: '请输入学科', trigger: 'blur' }],
        schoolId: [{ required: true, message: '请选择所在单位', trigger: 'blur' }],
        fileList1: [{ required: false, message: '请选上传图片', trigger: 'blur' }],
        description: [{ required: false, message: '请填写个人简介', trigger: 'blur' }],
        useFlag: [{ required: true, message: '请选择状态', trigger: 'blur' }],
        roleIdList: [{ required: true, message: '请选择角色', trigger: 'blur' }]
      },
      // fileList1: [
      //   {
      //     name: 'food.jpeg',
      //     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      //   }
      // ],
      subjectoptions: [],
      sectionoptions: [],
      total: 0,
      options: [],
      tableData: [],
      vidledata: '',
      pushdata: [],
      pushdata1: [],
      pushdata3: [],
      pictyre: '',
      loading: false,
      datas: {},
      rolelistss: [],
      newClickVisible: false,
      datalistone: [],
      getdata: [],
      rolelistsss: [],
      ktlist: []

    }
  },
  created() {
    this.getsubjects()
    this.getphase()
    this.getTableList()
    this.getrolein()
  },
  mounted() {
    this.baseurls = baseURL11
    this.action = baseurlimgs
    this.getunittree()
    this.getareainfo()
    // this.tokendata=window.localStorage.getItem('localtoken')
  },
  methods: {
    async newadd() {
      // let data =this.roleoptions.map((el)=>{
      //    return delete el.checked
      // })
      //   console.log(this.roleoptions,33333)
      //   console.log(this.rolelist,222)
      // await this.getrolein()
      this.newClickVisible = true
    },
    async getunittree() {
      const res = await gettreeinfos()
      if (res.code == 200) {
        this.optionsss = []
        this.optionsss = res.data
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
      this.ruleForm = {
        doublename: '',
        schoolId: '',
        userpwd: '',
        birthday: '',
        mobile: '',
        email: '',
        sectionIdList: [],
        subjectIdList: [],
        fileList1: [],
        photoId: '',
        description: '',
        useFlag: '正常',
        roleIdList: ['教师']
      }
    },
    // 选中节点
    chosenode(e) { },
    // 关闭清空数据
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.newClickVisible = false
      this.vidledata = ''
      this.ruleForm = {
        doublename: '',
        schoolId: '',
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
        fileList1: [],
        photoId: '',
        description: '',
        useFlag: '正常',
        roleIdList: ['教师']

      }
    },
    // 处理学段
    changexueduan() {
      this.pushdata = []
      const data = this.ruleForm.sectionIdList.map(el => {
        el.map(al => {
          this.pushdata.push(al)
        })
      })
    },
    // 处理学科
    changexueke() {
      this.pushdata1 = []
      const datas = this.ruleForm.subjectIdList.map(el => {
        el.map(al => {
          this.pushdata1.push(al)
        })
      })
    },
    // 获取上传文件
    getfiles(file, filelist) {
      if (file.code == 200) {
        this.ruleForm.photoId = file.data[0].id
        geturlinfo(this.ruleForm.photoId).then(res => {
          const url1 = this.decrypt(res.data.key, res.data.iv, res.data.url)
          const urls = { url: this.baseurls + '/upload' + url1 }
          this.ruleForm.fileList1 = []
          this.ruleForm.fileList1.push(urls)
        })

        // status: "success"
        // uid: 1656052146559
        // url: "http://221.194.44.131:8900/upload/20220616/1349/20220616134914683015.jpg"
        // this.ruleForm.fileList1 = file.data
        // console.log(this.ruleForm.photoId, 77777)
        // console.log(this.ruleForm.fileList1, 99999999999999)
      } else {
        this.$message({
          showClose: true,
          message: file.message,
          type: 'error'
        })
      }
    },
    // 选择时间
    chosedate(dealdate) {
      const date = new Date(dealdate)
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      month = month < 10 ? '0' + month : month
      let day = date.getDate()
      day = day < 10 ? '0' + day : day
      let hour = date.getHours()
      hour = hour < 10 ? '0' + hour : hour
      let minute = date.getMinutes()
      minute = minute < 10 ? '0' + minute : minute
      let second = date.getSeconds()
      second = second < 10 ? '0' + second : second
      this.ruleForm.birthday = year + '-' + month + '-' + day
    },
    // 选择性别
    shoosesex(e) {
      this.ruleForm.sex = e
    },
    // 新增保存
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.vidledata) {
            let data = this.ruleForm

            this.pushdata3 = []
            const datass = this.roleoptions.map(el => {
              this.ruleForm.roleIdList.map(al => {
                if (el.label === al) {
                  this.pushdata3.push(el.id)
                }
              })
            })
            data = {
              // doublename:data.doublename,
              schoolId: data.schoolId,
              loginName: data.loginName,
              realName: data.realName,
              sex: data.sex,
              userpwd: data.userpwd,
              idCard: data.idCard,
              birthday: data.birthday,
              mobile: data.mobile,
              email: data.email,
              sectionIdList: this.pushdata,
              subjectIdList: this.pushdata1,
              photoId: data.photoId,
              description: data.description,
              useFlag: data.useFlag == '禁用' ? 0 : data.useFlag == '正常' ? 1 : data.useFlag == '退休' ? 2 :data.useFlag=="调离"?3:"",
              roleIdList: this.pushdata3
            }
            adduserinfo(data).then(res => {
              if (res.code == 200) {
                this.$message({
                  showClose: true,
                  message: '新增成功',
                  type: 'success'

                })

                this.newClickVisible = false
                this.pushdata = []
                this.pushdata1 = []
                this.pushdata3 = []
                this.getTableList()
                this.vidledata = ''
                this.deletedata = ''
                this.$refs[formName].resetFields()
              } else {
                this.$message({
                  showClose: true,
                  message: res.message,
                  type: 'error'
                })
              }
            })
          } else {
            console.log(this.ruleForm.roleIdList, 9999)
            if (this.ruleForm.sex == '女') {
              this.ruleForm.sex = 0
            }
            if (this.ruleForm.sex == '男') {
              this.ruleForm.sex = 1
            }
            if (this.ruleForm.useFlag == '禁用') {
              this.ruleForm.useFlag = 0
            } else if (this.ruleForm.useFlag == '正常') {
              this.ruleForm.useFlag = 1
            } else if (this.ruleForm.useFlag == '退休') {
              this.ruleForm.useFlag = 2
            } else if (this.ruleForm.useFlag == '调离') {
              this.ruleForm.useFlag = 3
            } else {
              this.ruleForm.useFlag = ""
            }

            // const datas = this.ruleForm.roleIdList.filter(el => {
            //   el = parseInt(el)
            //   return !!el
            // })
            //     if(datas.length==0){
            // //       this.roleoptions.map((el)=>{
            // // this.ruleForm.roleIdList = datas.map((al)=>{
            // //              if(el.roleName==al){
            // //                 al=el.id
            // //              }
            // //         })
            // //       })
            //     }

            this.rolelistsss = []
            this.roleoptions.map((el) => {
              this.ruleForm.roleIdList.map((al) => {
                if (el.label == al) {
                  this.rolelistsss.push(el.id)
                }
              })
            })
            this.ruleForm.roleIdList = []
            this.ruleForm.roleIdList = this.rolelistsss
            const sectiondata = this.ruleForm.sectionIdList.flat(Infinity)
            this.ruleForm.sectionIdList = sectiondata
            const subjectdata = this.ruleForm.subjectIdList.flat(Infinity)
            this.ruleForm.subjectIdList = subjectdata
            edituserinfo(this.ruleForm).then(res => {
              if (res.code == 200) {
                this.$message({
                  showClose: true,
                  message: '修改成功',
                  type: 'success'
                })
                this.getTableList()
                this.newClickVisible = false
                this.vidledata = ''
                this.deletedata = ''
                this.$refs[formName].resetFields()
              } else {
                this.$message({
                  showClose: true,
                  message: res.message,
                  type: 'error'

                })
              }
            })
          }
        } else {
          return false
        }
      })
    },
    handlePreview() { },
    flattenMd(arr) {
      const res = []
      function flatten(arr) {
        for (let i = 0; i < arr.length; i++) {
          if (Array.isArray(arr[i])) {
            flatten(arr[i])
          } else {
            res.push(arr[[i]])
          }
        }
      }
      flatten(arr)
      return res
    },
    flattenMd(arr) {
      const res = []
      function flatten(arr) {
        for (let i = 0; i < arr.length; i++) {
          if (Array.isArray(arr[i])) {
            flatten(arr[i])
          } else {
            res.push(arr[[i]])
          }
        }
      }
      flatten(arr)
      return res
    },
    changeunit() {
      if (this.ruleForm.schoolId) {
        const a = this.$refs['cascader'].getCheckedNodes()
        if (a[0].data.type == 0) {
          this.$message({
            showClose: true,
            message: '不能选择区域',
            type: 'error'
          })
          this.ruleForm.schoolId = ''
        } else {
          if (this.ruleForm.schoolId) {
            const data = this.ruleForm.schoolId.slice(-1)
            this.ruleForm.schoolId = data[0].toString()
          }
        }
      }
    },
    // 移除照片
    handleRemove() { },
    // 获取角色列表信息
    async getrolein() {
      const res = await getroleinfo()
      if (res.code == 200) {
        this.rolelists = []
        this.roleoptions = []
        this.getdata = []

        this.getdata = res.data.map(el => {
          return {
            ...el,
            label: el.roleName,
            value: el.id
          }
        })
        this.getdata = this.getdata.filter(el => {
          return el.label != '学校管理员'
        })
        this.getdata = this.getdata.filter(el => {
          return el.label != '区域管理员'
        })
        this.roleoptions = res.data.map(el => {
          return {
            ...el,
            label: el.roleName,
            value: el.id
          }
        })
        this.roleoptions = this.roleoptions.filter(el => {
          return el.label != '学校管理员'
        })
        this.roleoptions = this.roleoptions.filter(el => {
          return el.label != '区域管理员'
        })

        this.ruleForm.rolelists = res.data.map(el => {
          return {
            ...el,
            label: el.roleName,
            value: el.id
          }
        })
        // this.rolelists = this.rolelists.filter((el) => {
        //   return el.label != '学校管理员'
        // })
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    // 修改数据
    async modification(e) {
      this.vidledata = e
      if (!this.deletedata) {
        this.$message({
          showClose: true,
          message: '请勾选数据',
          type: 'error'
        })
        return
      }
      const userId = this.deletedata
    
      const res = await getuserinfo(userId)
      if (res.code == 200) {
        this.datas = res.data
        if (this.datas.sex == 0) {
          this.datas.sex = '女'
        } else {
          this.datas.sex = '男'
        }
        if (this.datas.useFlag == 0) {
          this.datas.useFlag = '禁用'
        } else if (this.datas.useFlag == 1) {
          this.datas.useFlag = '正常'
        } else if (this.datas.useFlag == 2) {
          this.datas.useFlag = '退休'
        } else if(this.datas.useFlag == 3) {
          this.datas.useFlag = '调离'
        }else{
          this.datas.useFlag = ""
        }
        this.datas.userpwd = ''
        if (this.datas.photoId) {
          geturlinfo(this.datas.photoId).then(res => {
            if (res.code == 200) {
              this.ruleForm.fileList1 = []
              this.pictyre = ''
              this.pictyre = this.decrypt(res.data.key, res.data.iv, res.data.url)
              // geturlpath().then(res => {
              //   if (res.code == 200) {
              // const ips = this.decrypt(res.data[0].key, res.data[0].iv, res.data[0].siteIp)
              // const iport = this.decrypt(res.data[0].key, res.data[0].iv, res.data[0].sitePort)
              const urls = { url: this.baseurls + '/upload' + this.pictyre }
              // this.ruleForm.fileList1.push(urls)
              // this.rolelistss=[]
              // console.log(urls, 33333333333333)

              this.ktlist = []
              const datasss = this.roleoptions.map(al => {
                this.datas.roleIdList.map(el => {
                  if (el == al.id) {
                    al.checked = true
                    this.ktlist.push(al.label)
                  }
                })
              })
              this.datas.fileList1 = []
              this.datas.fileList1.push(urls)
              this.ruleForm.fileList1 = this.datas.fileList1
              this.ruleForm = this.datas

              this.newClickVisible = true
              this.$nextTick(() => {
                this.ruleForm.roleIdList = this.ktlist
              })
            }
          })
        } else {
          this.ktlist = []
          this.ruleForm.fileList1 = []
          const datasss = this.roleoptions.map(al => {
            this.datas.roleIdList.map(el => {
              if (el == al.id) {
                al.checked = true
                this.ktlist.push(al.label)
              }
            })
          })
          this.datas.fileList1 = []
          this.ruleForm = this.datas
          this.newClickVisible = true
          this.$nextTick(() => {
            this.ruleForm.roleIdList = this.ktlist
          })
        }
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    decrypt(key, iv, text) {
      var d = text.substr(9)
      var newKey = CryptoJS.enc.Latin1.parse(key) // 需要与后台保持一致
      var newIv = CryptoJS.enc.Latin1.parse(iv) // 需要与后台保持一致
      var decrypted = CryptoJS.AES.decrypt(d, newKey, {
        iv: newIv,
        padding: CryptoJS.pad.ZeroPadding
      })
      var password = decrypted.toString(CryptoJS.enc.Utf8)
      return password
    },
    // 获取学段选项
    getsectioninfo(e) {
      this.form.sectionId = e[0]
    },
    // 获取学科选项
    getsubjectsinfo(e) {
      this.form.subjectId = e[0]
    },
    // 获取状态选项
    getstatus(e) {
      this.form.useFlag = e
    },
    getstatus11(e) { },
    // 获取学段信息
    async getphase() {
      const type = 1
      const res = await getsubjects(type)
      if (res.code == 200) {
        this.sectionoptions = []
        this.options_2 = []
        this.options_2 = res.data
        this.sectionoptions = res.data
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    // 获取学科信息
    async getsubjects() {
      const type = 2
      const res = await getsubjects(type)
      if (res.code == 200) {
        this.subjectoptions = []
        this.options_3 = []
        this.subjectoptions = res.data
        this.options_3 = res.data
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    // 获取表格信息
    getTableList() {
      getActivitiesTableData(this.form).then(res => {
        if (res.code == 200) {
          this.tableData = []
          this.total = Number(res.data.total)
          this.tableData = res.data.list.map(el => {
            return {
              ...el,
              sex: el.sex == 0 ? '女' : el.sex == 'null' ? ' ' : '男',
              useFlag: el.useFlag == 0 ? '禁用' : el.useFlag == 1 ? '正常' : el.useFlag == 2 ? '退休' :el.useFlag == 3 ? '调离':""
            }
          })
        } else {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    // 筛选
    onSubmit() {
      this.form.pageNum = 1
      this.getTableList()
    },
    // 勾选表格数据
    radioChange(e, a, b) {
      this.deletedata = e.row.id
    },
    // 单击单元格
    cellClick() { },
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
      const userId = this.deletedata
     
      const res = await deleteuserinfo(userId)

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
    // 页码改变时
    pageChange(e) {
      this.form.pageNum = e.currentPage
      this.form.pageSize = e.pageSize
      this.getTableList()
    },
    // 清空数据
    reset() {
      this.form = {
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
        notRoleId: ''
      }
      this.deletedata = ''

      this.getTableList()
    },
    // 获取区域下拉框数据
    async getareainfo() {
      const res = await gettreeinfo()
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
    // 选中区域信息
    handleChange(e) {
      const data = this.form.areaId.slice(-1)
      this.form.areaId = data[0]
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
    .cell-zb,
    .cell-bm,
    .cell-px,
    .cell-pj,
    .cell-js {
      font-weight: bold;
    }
    .vxe-body--column.cell-zb {
      color: #e6a23c;
    }
    .vxe-body--column.cell-bm {
      color: #409eff;
    }
    .vxe-body--column.cell-px {
      color: #67c23a;
    }
    .vxe-body--column.cell-pj {
      color: #f56c6c;
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
      content: "";
      border-top: 1px solid #dcdfe6;
    }
  }
  .el-dialog__body {
    flex: 1;
    overflow: auto;
  }
}
</style>
