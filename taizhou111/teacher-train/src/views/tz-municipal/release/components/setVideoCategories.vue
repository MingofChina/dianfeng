<template>
  <el-card class="box-card">
    <div>
      <h5 class="redText">说明：在开始培训前请务必设置“学习时长要求”和看课截止时间！</h5>
      <el-divider />
    </div>

    <el-form :label-position="labelPosition" :model="studyTime" label-width="180px" class="demo-form-inline">
      <el-form-item label="各学段教师学习时长要求:">
        <el-row :gutter="12">
          <el-col v-for="(item, index) in durateList" :key="item.id" :span="3.5">
            {{ item.name }}：
            <el-input v-model="item.dictionaries" style="width: 70px;" />
            分钟
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="看课截止时间:">
        <el-date-picker
          v-model="studyTime.deadline"
          type="datetime"
          placeholder="请选择"
          default-time="12:00:00"
          style="width: 240px"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="deadlineChange"
        />

        <el-button type="primary" style="margin-left: 72px;" @click="saveSettings">保存设置</el-button>
      </el-form-item>
    </el-form>

    <el-tabs v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="课程分类" name="first">
        <h5 class="redText">说明：请至少添加一个分类（最多允许添加二级分类），添加完分类后可上传视频。视频数量只有上传了视频才显示</h5>

        <vxe-table
          ref="xGrid"
          border
          stripe
          header-align="center"
          show-header-overflow
          show-overflow
          :row-config="{ isHover: true }"
          :data="courseData"
          :edit-config="{ trigger: 'manual', mode: 'row' }"
          :radio-config="{ highlight: true }"
          @radio-change="radioChange"
        >
          <vxe-column type="radio" width="40" align="center" />
          <vxe-column field="classificationOne" title="一级分类" align="center" />

          <vxe-column field="classificationTow" title="二级分类" align="center" />
          <vxe-column field="videoNumber" title="视频数量" align="center" />
          <vxe-column field="duration" title="总时长" align="center" />
        </vxe-table>

        <div style="padding-top: 14px;">
          <!-- <el-button type="primary" size="small" plain @click="newSortingClasses = true">新 建</el-button> -->
          <el-button type="primary" size="small" plain @click="openDia">新 建</el-button>
          <el-button type="warning" size="small" plain @click="reviseClickZero(radioChangeRow)">修 改</el-button>
          <el-button size="small" plain @click="deleteClick(radioChangeRow)">删 除</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane label="上传视频" name="second">
        <el-form :label-position="labelPosition" :model="form_1" label-width="60px" class="demo-form-inline">
          <el-form-item label="标题:">
            <el-input v-model="form_1.videoTitle" placeholder="请输入内容" style="width: 250px;" />

            <el-button type="primary" style="margin-left: 72px;" @click="getTable2">查 询</el-button>
          </el-form-item>
        </el-form>

        <vxe-table
          ref="sGrid"
          border
          stripe
          header-align="center"
          show-header-overflow
          show-overflow
          :row-config="{ isHover: true }"
          :data="videoData"
          :cell-class-name="cellClassName"
          :edit-config="{ trigger: 'manual', mode: 'row' }"
          :radio-config="{ highlight: true }"
          @radio-change="radioChange_1"
          @cell-click="cellClick"
        >
          <vxe-column type="radio" width="40" align="center" />
          <vxe-column field="resourceTitle" title="标题" min-width="200" />
          <vxe-column field="classification" title="分类" align="center" />
          <vxe-column field="sectionName" title="学段" align="center" />
          <vxe-column field="subject" title="学科" align="center" />
          <vxe-column field="duration" title="时长" align="center" />
          <vxe-column field="question" title="问答" align="center" />
          <vxe-column field="source" title="来源" align="center" />
        </vxe-table>

        <vxe-pager :current-page="tablePage.currentPage" :page-size="tablePage.pageSize" :total="tablePage.total" @page-change="pageChange">
          <template #left>
            <span class="page-left">
              <el-button type="primary" size="small" plain @click="btnUploadVideo">上传视频</el-button>
              <el-button type="warning" size="small" plain @click="reviseClickTwo(radioChangeRow_1)">修 改</el-button>
              <el-button size="small" plain @click="deleteClick2(radioChangeRow_1)">删 除</el-button>
              <el-button size="small" plain @click="videoStatisticsClick">视频统计</el-button>
            </span>
          </template>
        </vxe-pager>
      </el-tab-pane>

      <!-- <el-tab-pane label="添加视频互动问答" name="third">333</el-tab-pane> -->
    </el-tabs>

    <el-dialog title="新建课程分类" :visible.sync="newSortingClasses"><newCourseCategory :options="selectList1" @closeDia="closeDia" /></el-dialog>

    <el-dialog title="修改课程分类" :visible.sync="reviseSortingClasses">
      <newCourseCategory :options="selectList1" :radio-change-row="radioChangeRow" @closeDia="closeDia" />
    </el-dialog>

    <el-dialog title="上传视频" width="800px" :close-on-click-modal="false" :visible.sync="uploadVideo">
      <uploadVideo :options="selectList" :subject-options="subjectOptions" :section-options="sectionOptions" :is-types="1" @closeVideo="closeVideo2" />
    </el-dialog>

    <el-dialog title="修改视频" width="800px" :close-on-click-modal="false" :visible.sync="editVideo">
      <uploadVideo
        :video-id="videoId"
        :radio-change-row="radioChangeRow_1"
        :options="selectList"
        :subject-options="subjectOptions"
        :section-options="sectionOptions"
        @closeVideo="closeVideo2"
      />
    </el-dialog>

    <el-dialog title="视频统计" width="980px" append-to-body :close-on-click-modal="false" :visible.sync="videoStatistics">
      <videoStatistics :table-arr="tableArr" @checkTab="checkTab" />
    </el-dialog>
  </el-card>
</template>

<script>
import { baseURL11 } from '@/utils/request.js'
import { geturlinfo } from '@/api/system.js'
import VXETable from 'vxe-table'
import uploadVideo from './uploadVideo.vue'
import newCourseCategory from './newCourseCategory.vue'
import videoStatistics from './videoStatistics.vue'
import {
  getCourseGory,
  getCourse,
  deleteTrainCourse,
  getCourseList,
  getType,
  deleteResources,
  getDicteTree,
  addDurate,
  getCommonResult,
  checkPass,
  getAllTree,
  getStatistics
} from '@/api/train.js'

export default {
  name: 'EventManagement',
  components: {
    uploadVideo,
    newCourseCategory,
    videoStatistics
  },
  data() {
    return {
      selectList: [],
      tableArr: [],
      baseURL11,
      labelPosition: 'left',
      studyTime: {
        preschool: '',
        primarySchool: '',
        juniorSchool: '',
        highSchool: '',
        secVocational: '',
        otherSchool: '',
        deadline: ''
      },

      activeName: 'first',
      courseData: [], // 课程分类
      radioChangeRow: '',
      newSortingClasses: false,
      reviseSortingClasses: false,
      form_1: {
        videoTitle: ''
      },
      videoData: [
        { title: '名著导读《学习论》1111-专家点评', classification: '名著导读', schoolSection: '小学', subject: '语文', duration: '23:36', answers: '2', theSource: '本地上传' }
      ],
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      radioChangeRow_1: '',
      uploadVideo: false,
      editVideo: false,
      videoStatistics: false,
      ids: null,
      videoId: '',
      durateList: [],
      sectionOptions: [],
      subjectOptions: [],
      selectList1: [],
      types: 0
    }
  },
  mounted() {
    this.getTable()
    this.getCommonResult()
  },
  methods: {
    // 分类
    async getCourse() {
      const id = sessionStorage.getItem('actId')
      const res = await getCourse(id)
      if (res.code == 200) {
        this.selectList1 = res.data
      }
    },
    // 打开
    openDia() {
      this.getCourse()
      this.newSortingClasses = true
    },
    // 获取学段（1），学科（2）
    async getType(type) {
      const res = await getType(type)
      if (res.code == 200) {
        if (type == 1) {
          this.sectionOptions = res.data
        } else {
          this.subjectOptions = res.data
        }
      }
    },
    // 给培训活动添加点击事件
    cellClick({ row, column }) {
      if (column.title === '标题') {
        const url = this.baseURL11 + '/upload' + row.url
        window.open(url)
      }
    },
    // 给活动状态添加样式
    cellClassName({ row, column }) {
      if (column.title === '标题') {
        return 'cell-click'
      }
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
    // 上传视频
    async btnUploadVideo() {
      const id = sessionStorage.getItem('actId')
      const res = await checkPass(id)
      if (res.code == 200) {
        if (res.data) {
          this.uploadVideo = true
          this.getAllTree()
        } else {
          this.$message.warning('请先创建课程分类后再上传视频')
          this.activeName = 'first'
        }
      }
    },
    // 所属分类
    async getAllTree() {
      const id = sessionStorage.getItem('actId')
      const res = await getAllTree(id)
      if (res.code == 200) {
        this.selectList = res.data
        this.getType(1)
        this.getType(2)
      }
    },
    // 时长要求
    async getDicteTree() {
      const res = await getDicteTree(1)
      if (res.code == 200) {
        this.durateList = res.data
        if (this.durateList.length > 0) {
          this.durateList.forEach(item => {
            this.$set(item, 'dictionaries', '')
          })
        }
      }
    },
    // 关闭弹窗  value: 1修改 2新增
    closeVideo2(val) {
      if (val.type == 1) {
        this.editVideo = val.value
      } else {
        this.uploadVideo = val.value
      }
      this.getTable2()
    },
    // 翻页
    pageChange({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
      this.getTable2()
    },
    // tab切换
    tabClick(e) {
      const index = e.index
      if (index == 0) {
        this.getTable()
      } else {
        this.getTable2()
      }
    },
    // 上传视频
    getTable2() {
      const params = {
        activityId: sessionStorage.getItem('actId'),
        name: this.form_1.videoTitle,
        pageNum: this.tablePage.currentPage,
        pageSize: this.tablePage.pageSize
      }
      getCourseList(params).then(res => {
        this.videoData = res.data.list
        this.tablePage.total = parseInt(res.data.total)
      })
    },
    // 课程分类 => 修改
    reviseClickZero(row) {
      if (row) {
        this.radioChangeRow = row
        this.reviseSortingClasses = true
        this.getCourse()
      } else {
        this.$message.warning('请选择修改内容')
      }
    },
    // 列表数据 => 课程分类
    async getTable() {
      const id = sessionStorage.getItem('actId')
      const res = await getCourseGory(id)
      if (res.code == 200) {
        this.courseData = res.data
      }
    },
    // 弹窗关闭
    closeDia(val) {
      if (val.type == 1) {
        this.reviseSortingClasses = val.value
      } else {
        this.newSortingClasses = val.value
      }
      this.getTable()
    },
    // 看课截止时间
    deadlineChange(val) {
      this.deadline = val
    },
    // 保存设置
    saveSettings() {
      if (
        this.studyTime.preschool.length > 4 ||
        this.studyTime.primarySchool.length > 4 ||
        this.studyTime.juniorSchool.length > 4 ||
        this.studyTime.highSchool.length > 4 ||
        this.studyTime.secVocational.length > 4 ||
        this.studyTime.otherSchool.length > 4
      ) {
        this.$message({
          type: 'warning',
          message: '学习时长最大不能超过4位数！'
        })
      } else if (this.deadline === '') {
        this.$message({
          type: 'warning',
          message: '请先选择看课截止时间！'
        })
      } else {
        const params = {
          activeId: sessionStorage.getItem('actId'),
          dictionariesIds: this.durateList,
          studyEndTime: this.studyTime.deadline
        }
        addDurate(params).then(res => {
          this.$message.success(res.message)
          this.getCommonResult()
          this.getTable()
        })
      }
    },
    // 查看截止看课日期
    async getCommonResult() {
      const id = sessionStorage.getItem('actId')
      const res = await getCommonResult(id)
      if (res.code == 200) {
        if (res.data.dictionariesIds.length == 0) {
          this.getDicteTree()
        } else {
          this.durateList = res.data.dictionariesIds
          this.studyTime.deadline = res.data.studyEndTime
        }
      }
    },
    // 单选按钮
    radioChange({ row }) {
      this.radioChangeRow = row
    },
    radioChange_1({ row }) {
      this.radioChangeRow_1 = row
    },
    // 上传视频 => 修改
    reviseClickTwo(row) {
      if (row) {
        this.videoId = row.id
        this.getAllTree()
        this.editVideo = true
      } else {
        this.$message.warning('请选择修改内容')
      }
    },
    // 删除
    deleteClick(row) {
      this.ids = row.id
      if (row.classificationOne) {
        this.open('一级分类')
      } else if (row.classificationTow) {
        this.open('二级分类')
      } else if (row.title) {
        this.open('视频')
      } else {
        this.$message({
          type: 'warning',
          message: '请先选择需要删除的内容'
        })
      }
    },
    // 上传视频 => 删除
    deleteClick2(row) {
      if (row) {
        deleteResources(row.id).then(res => {
          this.$message.success(res.message)
          this.$refs.sGrid.removeRadioRow()
          this.getTable2()
        })
        this.radioChangeRow_1 = undefined
      } else {
        this.$message({
          type: 'warning',
          message: '请先选择需要删除的内容'
        })
      }
    },
    // 提示框
    open(val) {
      this.$confirm('此操作将永久删除该' + val + ', 是否继续?', '删除' + val, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteTrainCourse(this.ids)
            .then(res => {
              if (res.code == 200) {
                this.$message.success(res.message)
                this.$refs.xGrid.removeRadioRow()
                this.getTable()
              }
            })
            .catch(err => {
              this.getTable()
            })
          this.radioChangeRow = undefined
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    checkTab(n) {
      this.types = n
      this.videoStatisticsClick()
    },
    // 视频统计
    async videoStatisticsClick(row) {
      const params = {
        activeId: sessionStorage.getItem('actId'),
        type: this.types
      }
      const res = await getStatistics(params)
      if (res.code == 200) {
        this.videoStatistics = true
        this.tableArr = res.data
      }
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
.redText {
  margin: 12px 0;
  color: #f56c6c;
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
      content: '';
      border-top: 1px solid #dcdfe6;
    }
  }
  .el-dialog__body {
    flex: 1;
    overflow: auto;
  }
  .buttonItem {
    position: relative;
    text-align: center;
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
  ::v-deep .vxe-table {
    .vxe-table--body {
      .cell-zb,
      .cell-bm,
      .cell-px,
      .cell-pj,
      .cell-js {
        font-weight: bold;
      }

      .vxe-body--column.cell-click {
        color: #409eff;
        cursor: pointer;
      }
    }
  }
}
</style>
