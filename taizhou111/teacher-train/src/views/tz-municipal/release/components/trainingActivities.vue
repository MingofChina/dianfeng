<template>
  <el-card class="box-card">
    <el-form :model="form" :inline="true" class="demo-form-inline">
      <el-form-item label="活动名称"><el-input v-model="form.eventName" clearable placeholder="请输入" /></el-form-item>

      <el-form-item label="活动状态">
        <el-select v-model="form.activeStatus" clearable placeholder="请选择">
          <el-option v-for="(item, index) in activeList" :key="index" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>

      <el-form-item><el-button type="primary" @click="getData">查询</el-button></el-form-item>
    </el-form>

    <vxe-table
      ref="xGrid"
      border
      stripe
      header-align="center"
      show-header-overflow
      show-overflow
      :row-config="{ isHover: true }"
      :data="tableData"
      :loading="loading"
      :cell-class-name="cellClassName"
      :edit-config="{ trigger: 'manual', mode: 'row' }"
      :radio-config="{ highlight: true }"
      @radio-change="radioChange"
      @cell-click="cellClick"
    >
      <vxe-column type="radio" width="40" align="center" />
      <vxe-column field="activeName" title="培训活动" min-width="200" />
      <vxe-column field="createUserName" title="创建人" width="100" align="center" />
      <vxe-column field="createUnitName" title="创建人单位" width="180" align="center" />
      <vxe-column field="activeStatus" title="活动状态" width="100" align="center" />
      <vxe-column field="trainingTime" title="培训时间" min-width="200" align="center" />
      <vxe-column title="操作" align="center" width="180">
        <template #default="{ row }">
          <vxe-button type="text" status="primary" content="进入管理" @click="enterClick(row)" />
          <vxe-button type="text" status="primary" content="学情统计" @click="goStudy(row)" />
        </template>
      </vxe-column>
    </vxe-table>

    <vxe-pager :current-page="tablePage.currentPage" :page-size="tablePage.pageSize" :total="tablePage.total" @page-change="pageChange">
      <template #left>
        <span class="page-left">
          <el-button type="primary" size="small" plain @click="createNewCon = true">新 建</el-button>
          <el-button type="warning" size="small" plain @click="reviseClick(radioChangeRow)">修 改</el-button>
          <el-button size="small" plain @click="deleteClick(radioChangeRow)">删 除</el-button>
        </span>
      </template>
    </vxe-pager>

    <el-dialog title="新建培训活动" width="800px" :close-on-click-modal="false" :visible.sync="createNewCon"><newTrainingEvent @reviseStatus="reviseStatus" /></el-dialog>

    <el-dialog title="修改培训活动" width="800px" :close-on-click-modal="false" :visible.sync="reviseClickVisible">
      <newTrainingEvent :radio-change-row="radioChangeRow" :rule-form2="ruleForm" @reviseStatus="reviseStatus" />
    </el-dialog>
  </el-card>
</template>

<script>
// import VXETable from 'vxe-table'
import newTrainingEvent from './newTrainingEvent.vue'
import { getList, getColumn, deleteData, getDetail } from '@/api/train.js'

export default {
  name: 'PostTrainingEvent',
  components: {
    newTrainingEvent
  },
  data() {
    return {
      // 表头
      form: {
        eventName: '',
        activeStatus: ''
      },
      // 分页
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      activeList: [], // 活动状态
      tableData: [], // 表格数据
      loading: false,
      radioChangeRow: undefined,
      createNewCon: false,
      reviseClickVisible: false,
      ruleForm: {} // 活動詳情
    }
  },
  mounted() {
    this.getColumn()
    this.getData()
  },
  methods: {
    // 子组件 修改弹窗状态
    reviseStatus(status) {
      this.createNewCon = this.reviseClickVisible = status
      this.getData()
    },
    // 活动状态
    async getColumn() {
      const res = await getColumn()
      if (res.code == 200) {
        this.activeList = res.data
      }
    },
    // 表格数据
    async getData() {
      const params = {
        activeName: this.form.eventName,
        teacherStatusId: this.form.activeStatus,
        pageNum: this.tablePage.currentPage,
        pageSize: this.tablePage.pageSize
      }
      this.loading = true
      const res = await getList(params)
      if (res.code == 200) {
        this.loading = false
        this.tableData = res.data.list
        this.tablePage.total = parseInt(res.data.total)
      }
    },
    // 给活动状态添加样式
    cellClassName({ row, column }) {
      if (column.property === 'activeStatus') {
        if (row.activeStatus === '准备阶段') {
          return 'cell-zb'
        } else if (row.activeStatus === '报名中') {
          return 'cell-bm'
        } else if (row.activeStatus === '培训中') {
          return 'cell-px'
        } else if (row.activeStatus === '评价中') {
          return 'cell-pj'
        } else if (row.activeStatus === '已结束') {
          return 'cell-js'
        }
      }
      if (column.title === '培训活动') {
        return 'cell-click'
      }
    },
    // 给培训活动添加点击事件
    cellClick({ row, column }) {
      if (column.title === '培训活动') {
        sessionStorage.setItem('actId', row.id)
        this.$router.push({
          name: 'eventManagement',
          params: {
            row: row
          }
        })
      }
    },
    // 翻页
    pageChange({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
      this.getData()
    },
    // 单选按钮
    radioChange({ row }) {
      this.radioChangeRow = row
    },
    // 修改
    reviseClick(row) {
      if (row) {
        console.log(row, 'row')
        getDetail(row.id).then(res => {
          this.ruleForm = res.data
        })
        this.reviseClickVisible = true
      } else {
        this.$message({
          type: 'warning',
          message: '请先选择需要修改的培训活动'
        })
      }
    },
    // 删除
    deleteClick(row) {
      if (row) {
        this.open(row.id)
      } else {
        this.$message({
          type: 'warning',
          message: '请先选择需要删除的培训活动'
        })
      }
    },
    // 提示框
    open(id) {
      this.$confirm('此操作将永久删除该培训活动, 是否继续?', '删除培训活动', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteData(id).then(res => {
            if (res.code == 200) {
              this.$message.success(res.message)
              this.$refs.xGrid.removeRadioRow()
              this.radioChangeRow = undefined
              this.getData()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 进入管理，带参数跳转
    enterClick(row) {
      sessionStorage.setItem('actId', row.id)
      this.$router.push({
        name: 'eventManagement',
        params: {
          row: row
        }
      })
    },
    goStudy(row) {
      sessionStorage.setItem('actId', row.id)
      this.$router.push({
        name: 'studyStatistics',
        params: {
          row: row
        }
      })
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
  margin-right: 16px;
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
      content: '';
      border-top: 1px solid #dcdfe6;
    }
  }
  .el-dialog__body {
    flex: 1;
    overflow: auto;
  }
}
</style>
