<template>
  <el-card class="box-card">
    <el-form :inline="true" :model="ruleForm" class="demo-form-inline">
      <el-form-item label="每人至少完成讨论数量:">
        <el-input v-model="ruleForm.amountCompleted" style="width: 70px;" />
        条
      </el-form-item>
      <el-form-item label="讨论截止:">
        <el-date-picker
          v-model="ruleForm.discussionDeadline"
          type="datetime"
          placeholder="请选择"
          default-time="12:00:00"
          style="width: 240px"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="discussionDeadlineChange"
        />

        <el-button type="primary" style="margin-left: 72px;" @click="saveSettings">保存设置</el-button>
      </el-form-item>
    </el-form>

    <vxe-table
      ref="vGrid"
      border
      stripe
      header-align="center"
      show-header-overflow
      show-overflow
      :cell-class-name="cellClassName"
      :row-config="{ isHover: true }"
      :data="seminarData"
      :edit-config="{ trigger: 'manual', mode: 'row' }"
      @cell-click="cellClick"
    >
      <vxe-column type="seq" title="序号" width="60" align="center" />
      <vxe-column field="theme" title="讨论主题" min-width="200">
        <template #default="{ row }">
          <span v-if="row.orderTop == 1" class="topText">【置顶】</span>
          <span>{{ row.discussionTopic }}</span>
        </template>
      </vxe-column>
      <vxe-column field="createUserName" title="创建人" align="center" />
      <vxe-column field="createUserUnit" title="创建人单位" align="center" />
      <vxe-column field="categoryName" title="所属分类" align="center" />
      <vxe-column field="checkNumber" title="查看" align="center" />
      <vxe-column field="returnCard" title="回帖" align="center" />
      <vxe-column title="操作" align="center" width="180">
        <template #default="{ row }">
          <vxe-button type="text" status="primary" content="修改" @click="reviseClick(row)" />
          <vxe-button type="text" status="primary" content="删除" @click="deleteClick(row)" />
          <vxe-button v-if="row.orderTop !== 1" type="text" status="primary" content="置顶" @click="topClick(row)" />
        </template>
      </vxe-column>
    </vxe-table>

    <vxe-pager :current-page="tablePage.currentPage" :page-size="tablePage.pageSize" :total="tablePage.total" @page-change="pageChange">
      <template #left>
        <span class="page-left"><el-button type="primary" size="small" plain @click="newBuild">新建</el-button></span>
      </template>
    </vxe-pager>

    <el-dialog title="新建主题研讨" width="800px" :visible.sync="newTheme"><newSeminar :options="options" @closeSeminar="closeSeminar" /></el-dialog>

    <el-dialog title="修改主题研讨" width="800px" :visible.sync="reviseTheme"><newSeminar :options="options" :seminar-obj="seminarObj" @closeSeminar="closeSeminar" /></el-dialog>
  </el-card>
</template>

<script>
import VXETable from 'vxe-table'
import newSeminar from './newSeminar.vue'
import { getTheme, getAllTree, deleteTheme, setAppoint, getTrainDetail, keepTimepic, getResultTime } from '@/api/train.js'

export default {
  name: 'SetThemeSeminar',
  components: {
    newSeminar
  },
  data() {
    return {
      ruleForm: {
        amountCompleted: '',
        discussionDeadline: ''
      },
      seminarData: [], // 列表
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      newTheme: false,
      reviseTheme: false,
      seminarObj: {},
      options: []
    }
  },
  mounted() {
    this.getTable()
    this.getTimes()
  },
  methods: {
    newBuild() {
      this.getCourse().then(res => {
        this.newTheme = true
      })
    },
    // 所属分类
    async getCourse() {
      const id = sessionStorage.getItem('actId')
      const res = await getAllTree(id)
      if (res.code == 200) {
        this.options = res.data
      }
    },
    async getTimes() {
      const id = sessionStorage.getItem('actId')
      const res = await getResultTime(id)
      if (res.code == 200) {
        this.ruleForm.discussionDeadline = res.data.topicEndTime
        this.ruleForm.amountCompleted = res.data.topicRequire
      }
    },
    // 弹窗关闭 1新增 2修改
    closeSeminar(val) {
      if (val.type == 1) {
        this.newTheme = this.reviseTheme = val.value
      }
      // else {
      //   this.reviseTheme = val.value;
      // }
      this.getTable()
    },
    // 分页
    pageChange({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
      this.getTable()
    },
    // 列表
    async getTable() {
      const params = {
        pageNum: this.tablePage.currentPage,
        pageSize: this.tablePage.pageSize,
        activeId: sessionStorage.getItem('actId')
      }
      const res = await getTheme(params)
      if (res.code == 200) {
        this.seminarData = res.data.list
        this.tablePage.total = parseInt(res.data.total)
      }
    },
    // 讨论截止
    discussionDeadlineChange(val) {
      this.discussionDeadline = val
    },
    // 保存设置
    saveSettings() {
      if (this.ruleForm.amountCompleted === '') {
        this.$message({
          type: 'warning',
          message: '请先填写讨论数量！'
        })
      } else if (this.ruleForm.discussionDeadline === '') {
        this.$message({
          type: 'warning',
          message: '请先选择讨论截止时间！'
        })
      } else {
        const params = {
          activeId: sessionStorage.getItem('actId'),
          topicEndTime: this.ruleForm.discussionDeadline,
          topicRequire: this.ruleForm.amountCompleted
        }
        keepTimepic(params).then(res => {
          if (res.code == 200) {
            this.getTable()
            this.getTimes()
          }
        })
      }
    },
    // 给讨论主题添加样式
    cellClassName({ row, column }) {
      if (column.title === '讨论主题') {
        return 'cell-click'
      }
    },
    // 给讨论主题添加点击事件
    cellClick({ row, column }) {
      if (column.title === '讨论主题') {
        this.$router.push({
          path: `/tz-municipal/release/components/seminarDetails?id=${row.id}`
        })
      }
    },
    // 修改
    reviseClick(row) {
      this.getCourse().then(() => {
        getTrainDetail(row.id).then(res => {
          this.seminarObj = res.data
          this.reviseTheme = true
        })
      })
      // const res = await getTrainDetail(row.id)
      // if (res.code == 200) {
      //   this.seminarObj = res.data
      //   this.reviseTheme = true
      // }
    },
    // 删除
    deleteClick(row) {
      this.$confirm('此操作将永久删除该讨论主题, 是否继续?', '删除讨论主题', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteTheme(row.id).then(res => {
            this.$refs.vGrid.removeRadioRow()
            this.$message.success(res.message)
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
    // 置顶
    async topClick(row) {
      console.log(row, 'row')
      const res = await setAppoint(row.id)
      if (res.code == 200) {
        this.$message.success(res.message)
        this.getTable()
      }
      // let values = this.seminarData;
      // let value = row;
      // let res = [value].concat(values.filter(item => item != value));
      // this.seminarData = res;
      // row.top = 1;
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
.el-form--inline .el-form-item {
  margin-right: 24px;
}
.redText {
  margin: 12px 0;
  color: #f56c6c;
}
::v-deep .vxe-table {
  .vxe-table--body {
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
      content: '';
      border-top: 1px solid #dcdfe6;
    }
  }
  .el-dialog__body {
    flex: 1;
    overflow: auto;
    .el-form {
      margin-bottom: 0;
    }
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
}
.topText {
  margin-right: 5px;
  color: #f56c6c;
  font-weight: bold;
}
</style>
