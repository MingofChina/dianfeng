<template>
  <el-card class="box-card">
    <el-form
      :model="form"
      :inline="true"
      class="demo-form-inline"
    >
      <el-form-item label="活动名称:">
        <el-input
          v-model="form.name"
          clearable
          placeholder="请输入"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="getStatistical"
        >
          查询
        </el-button>
      </el-form-item>

      <el-form-item
        label="最后一次统计时间:"
        style="margin: 0 10px 0 24px;"
      >
        <span class="redText">{{ nowTime }}</span>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="getStatistical"
        >
          更新统计
        </el-button>
      </el-form-item>
    </el-form>

    <vxe-table
      id="table"
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
    >
      <vxe-column
        type="seq"
        title="序号"
        width="60"
        align="center"
      />
      <vxe-column
        field="activeName"
        title="活动名称"
        align="center"
      />
      <vxe-column
        field="createUserName"
        title="创建人"
        align="center"
      />
      <vxe-column
        field="createUnitName"
        title="创建人单位"
        align="center"
      />
      <vxe-column
        field="createTime"
        title="创建时间"
        align="center"
      />
      <vxe-column
        field="activeStatus"
        title="状态"
        align="center"
      />
      <vxe-column
        field="totalNumber"
        title="参训总人数"
        align="center"
      />
      <vxe-column
        field="completeNumber"
        title="合格人数"
        align="center"
      />
      <vxe-column
        field="unfinishedNumber"
        title="不合格人数"
        align="center"
      />
      <vxe-column
        field="checkNumber"
        title="合格率(%)"
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
  </el-card>
</template>

<script>
import { getStatistical } from '@/api/train.js'
// import XLSX from 'xlsx'
export default {
  name: 'ViewClassTimeStatistics',
  data() {
    return {
      form: {
        name: ''
      },
      nowTime: '',
      tableData: [], // 表格
      tablePage: {
        // 分页
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      timeStatisticsDetails: false,
      filename: ''
    }
  },
  mounted() {
    this.getStatistical()
  },
  methods: {
    // 给活动状态添加样式
    cellClassName({ row, column }) {
      if (column.title === '活动名称') {
        return 'cell-click'
      }
    },
    // 获取当前时间
    getTime() {
      const myDate = new Date()
      this.nowTime = myDate.toLocaleDateString() + ' ' + myDate.toLocaleTimeString()
    },
    // 分页
    pageChange({ currentPage, pageSize }) {
      this.tablePage.currentPage= currentPage
      this.tablePage.pageSize = pageSize
      this.getStatistical()
    },
    // 列表
    async getStatistical() {
      const params = {
        activeName: this.form.name,
        pageNum: this.tablePage.currentPage,
        pageSize: this.tablePage.pageSize,
        type:0,
      }
      this.getTime()
      const res = await getStatistical(params)
      if (res.code == 200) {
        this.tableData = res.data.list
        this.tablePage.total = parseInt(res.data.total)
      }
    },
    // 导出
    exportExcel() {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['活动名称', '创建人', '创建人单位', '创建时间', '状态', '参训总人数', '合格人数', '不合格人数', '合格率(%)'] // 表格
        const filterVal = ['activeName', 'createUserName', 'createUnitName', 'createTime', 'activeStatus', 'totalNumber', 'completeNumber', 'unfinishedNumber', 'checkNumber'] // 表格内容
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '培训活动统计' // 文件名
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
