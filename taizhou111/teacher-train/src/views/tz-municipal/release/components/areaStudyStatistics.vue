<template>
  <div>
    <el-form
      :model="form"
      :inline="true"
      class="demo-form-inline"
    >
      <el-form-item label="单位:">
        <el-input
          v-model="form.units"
          clearable
          placeholder="请输入"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="getTable"
        >
          筛选
        </el-button>
      </el-form-item>
    </el-form>

    <vxe-table
      ref="sGrid"
      border
      stripe
      header-align="center"
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
        field="schoolName"
        title="学校名称"
        align="center"
        width="150"
      />
      <vxe-column
        field="responsibleName"
        title="学校管理员"
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
        field="discussNumber"
        title="讨论完成人数"
        align="center"
      />
      <vxe-column
        field="workNumber"
        title="作业完成人数"
        align="center"
      />
      <vxe-column
        field="checkNumber"
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
      title="学校学情统计"
      width="980px"
      :close-on-click-modal="false"
      :modal="false"
      :visible.sync="schoolStudyStatistics"
    >
      <schoolStudyStatistics />
    </el-dialog>
  </div>
</template>

<script>
import schoolStudyStatistics from './schoolStudyStatistics.vue'
import { getLongSchool } from '@/api/train.js'
export default {
  name: 'TimeStatisticsDetails',
  components: {
    schoolStudyStatistics
  },
  props: {
    areaId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      form: {
        units: ''
      },
      tableData: [],
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      schoolStudyStatistics: false
    }
  },
  watch: {
    areaId(newVal, oldVal) {
      if (newVal) {
        this.getTable()
      }
    }
  },
  mounted() {
    this.getTable()
  },
  methods: {
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
        activeId: sessionStorage.getItem('actId'),
        areaId: this.areaId,
        schoolName: this.form.units
      }
      const res = await getLongSchool(params)
      if (res.code == 200) {
        this.tableData = res.data.list
        this.tablePage.total = parseInt(res.data.total)
      }
    },
    // 给活动状态添加样式
    cellClassName({ row, column }) {
      if (column.title === '学校名称') {
        return 'cell-click'
      }
    },
    // 给培训活动添加点击事件
    cellClick({ row, column }) {
      if (column.title === '学校名称') {
        this.schoolStudyStatistics = true
      }
    },
    // 导出
    exportExcel() {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['学校名称', '学校管理员', '管理员手机', '参训总人数', '看课完成人数', '讨论完成人数', '作业完成人数', '看课完成率(%)', '讨论完成率(%)', '作业完成率(%)'] // 表格
        const filterVal = [
          'schoolName',
          'responsibleName',
          'responsiblePhone',
          'totalNumber',
          'completeNumber',
          'discussNumber',
          'workNumber',
          'checkNumber',
          'discussCheckNumber',
          'workCheckNumber'
        ] // 表格内容
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '区学情统计' // 文件名
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
::v-deep .el-form {
  .el-form-item {
    .el-checkbox-group {
      height: 36px;
    }
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
