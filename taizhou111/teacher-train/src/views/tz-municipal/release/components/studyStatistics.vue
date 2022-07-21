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
        title="区管理员"
        align="center"
      />
      <vxe-column
        field="totalNumber"
        title="参训总人数(%)"
        align="center"
      />
      <vxe-column
        field=" checkNumber"
        title="看课完成率(%)"
        align="center"
      />
      <vxe-column
        field="discussCheckNumber"
        title="讨论完成率(%)"
        align="center"
      />
      <vxe-column
        field="workCheckNumber"
        title="作业完成率(%)"
        align="center"
      />
       <vxe-column
        field="examRate"
        title="考试合格率(%)"
        align="center"
      />
      <vxe-column
        field="qualifiedCheckNumber"
        title="培训最终合格率(%)"
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
      title="区学情统计"
      width="1200px"
      :close-on-click-modal="false"
      :visible.sync="areaStudyStatistics"
    >
      <areaStudyStatistics :area-id="areaId" />
    </el-dialog>
  </el-card>
</template>

<script>
import areaStudyStatistics from './areaStudyStatistics.vue'
import { learningLong } from '@/api/train.js'

export default {
  name: 'ViewClassTimeStatistics',
  components: {
    areaStudyStatistics
  },
  data() {
    return {
      tableData: [],
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      areaStudyStatistics: false,
      nowTime: '',
      areaId: '' // 区域id
    }
  },
  mounted() {
    this.getTable()
  },
  methods: {
    // 获取当前时间
    getTime() {
      const myDate = new Date()
      this.nowTime = myDate.toLocaleDateString() + ' ' + myDate.toLocaleTimeString()
    },
    // 分页
    pageChange({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
      this.getTable()
    },
    // 列表数据
    async getTable() {
      const params = {
        pageNum: this.tablePage.currentPage,
        pageSize: this.tablePage.pageSize,
        activeId: sessionStorage.getItem('actId')
      }
      const res = await learningLong(params)
      if (res.code == 200) {
        this.getTime()
        this.tableData = res.data.list
        this.tablePage.total = parseInt(res.data.total)
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
      if (column.title === '区域') {
        this.areaId = row.areaId
        this.areaStudyStatistics = true
      }
    },
    // 导出
    exportExcel() {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['区域', '区管理员', '参训总人数', '看课完成率(%)', '讨论完成率(%)', '作业完成率(%)', '考试合格率(%)','培训最终合格率(%)'] // 表格
        const filterVal = [
          'areaName',
          'responsibleName',
          'totalNumber',
          'checkNumber',
          'discussCheckNumber',
          'workCheckNumber',
          'examRate',
          'qualifiedCheckNumber',
    
        ] // 表格内容
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '学情统计' // 文件名
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
