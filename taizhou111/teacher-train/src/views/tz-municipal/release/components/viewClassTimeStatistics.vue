<template>
  <el-card class="box-card">
    <el-row
      :gutter="24"
      class="conditionRow"
    >
      <el-col :span="6.5">
        <div class="grid-content bg-purple">
          最后一次统计时间：
          <span class="redText">{{ nowTime }}</span>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <el-button
            type="primary"
            size="medium"
            @click="getTable"
          >
            更新统计
          </el-button>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          看课截止时间：
          <span class="redText">{{ endTime }}</span>
        </div>
      </el-col>
    </el-row>

    <vxe-table
      ref="sGrid"
      border
      stripe
      header-align="center"
      show-header-overflow
      show-overflow
      :cell-class-name="cellClassName"
      :row-config="{ isHover: true }"
      :data="tableData"
      :edit-config="{ trigger: 'manual', mode: 'row' }"
      @cell-click="cellClick"
    >
      <vxe-column
        type="seq"
        title="序号"
        width="60"
        align="center"
      />
      <vxe-column
        field="areaName"
        title="区域"
        align="center"
      />
      <vxe-column
        field="responsibleName"
        title="区域管理员"
        align="center"
      />
      <vxe-column
        field="responsiblePhone"
        title="管理员手机"
        align="center"
      />
      <vxe-column
        field="totalNumber"
        title="参训总人数"
        align="center"
      />
      <vxe-column
        field="completeNumber"
        title="看课完成人数"
        align="center"
      />
      <vxe-column
        field="unfinishedNumber"
        title="看课未完成人数"
        align="center"
      />
      <vxe-column
        field="checkNumber"
        title="完成率(%)"
        align="center"
      />
    </vxe-table>

    <vxe-pager
      :current-page="tablePage.currentPage"
      :page-size="tablePage.pageSize"
      :total="tablePage.total"
      @page-change="pageChange"
    >
      <template #left>
        <span class="page-left"><el-button
          type="primary"
          size="small"
          plain
          @click="exportExcel"
        >导出Excel</el-button></span>
      </template>
    </vxe-pager>

    <el-dialog
      title="看课时长统计详情"
      width="980px"
      :close-on-click-modal="false"
      :visible.sync="timeStatisticsDetails"
    >
      <timeStatisticsDetails :area-id="areaId" />
    </el-dialog>
  </el-card>
</template>

<script>
import timeStatisticsDetails from './timeStatisticsDetails.vue'
import { getHourlog, getResultTime } from '@/api/train.js'
export default {
  name: 'ViewClassTimeStatistics',
  components: {
    timeStatisticsDetails
  },
  data() {
    return {
      tableData: [],
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      nowTime: null,
      timeStatisticsDetails: false,
      areaId: '', // 区域id
      endTime: ''
    }
  },
  mounted() {
    this.getResultTime()
    this.getTable()
  },
  methods: {
    // 分页
    pageChange({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
      this.getTable()
    },
    // 获取当前时间
    getTime() {
      const myDate = new Date()
      this.nowTime = myDate.toLocaleDateString() + ' ' + myDate.toLocaleTimeString()
    },
    // 表格
    async getTable() {
      const params = {
        pageNum: this.tablePage.currentPage,
        pageSize: this.tablePage.pageSize,
        activeId: sessionStorage.getItem('actId')
      }
      const res = await getHourlog(params)
      if (res.code == 200) {
        this.getTime()
        this.tableData = res.data.list
        this.tablePage.total = parseInt(res.data.total)
      }
    },
    // 截止时间
    async getResultTime() {
      const id = sessionStorage.getItem('actId')
      const res = await getResultTime(id)
      if (res.code == 200) {
        this.endTime = res.data.endTime
        console.log('res', res)
      }
    },
    // 给活动状态添加样式
    cellClassName({ row, column }) {
      if (column.title === '区域') {
        return 'cell-click'
      }
    },
    // 给培训活动添加点击事件
    cellClick({ row, column }) {
      // console.log(row.areaId);
      if (column.title === '区域') {
        this.areaId = row.areaId
        this.timeStatisticsDetails = true
      }
    },
    // 导出
    exportExcel() {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['区域', '区域管理员', '管理员手机', '参训总人数', '看课完成人数', '看课未完成人数', '完成率(%)'] // 表格
        const filterVal = ['areaName', 'responsibleName', 'responsiblePhone', 'totalNumber', 'completeNumber', 'unfinishedNumber', 'checkNumber'] // 表格内容
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '看课时长' // 文件名
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
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
.conditionRow {
  margin-bottom: 22px;
  .el-col {
    line-height: 36px;
    font-size: 14px;
  }
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
</style>
