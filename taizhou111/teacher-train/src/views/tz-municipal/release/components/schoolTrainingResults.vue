<template>
  <div>
    <vxe-table
      ref="xGrid"
      border
      stripe
      header-align="center"
      show-header-overflow
      show-overflow
      :row-config="{ isHover: true }"
      :data="tableData_1"
      :edit-config="{ trigger: 'manual', mode: 'row' }"
      style="margin-bottom: 20px;"
    >
      <vxe-column
        field="eventName"
        title="活动名称"
        align="center"
      />
      <vxe-column
        field="founder"
        title="创建人"
        align="center"
      />
      <vxe-column
        field="creatorUnit"
        title="创建人单位"
        align="center"
      />
      <vxe-column
        field="trainingPeriod"
        title="培训时间"
        align="center"
      />
      <vxe-column
        field="state"
        title="状态"
        align="center"
      />
      <vxe-column
        field="totalPeople"
        title="参训总人数"
        align="center"
      />
      <vxe-column
        field="eligiblePeople"
        title="合格人数"
        align="center"
      />
      <vxe-column
        field="unqualified"
        title="不合格人数"
        align="center"
      />
      <vxe-column
        field="passRate"
        title="合格率(%)"
        align="center"
      />
    </vxe-table>

    <el-form
      :model="form"
      :inline="true"
      class="demo-form-inline"
    >
      <el-form-item label="姓名:">
        <el-input
          v-model="form.name"
          clearable
          placeholder="请输入"
        />
      </el-form-item>

      <el-form-item label="培训结果:">
        <el-select
          v-model="form.trainingResults"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in resultArr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="getTable"
        >
          查询
        </el-button>
      </el-form-item>
    </el-form>

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
    >
      <vxe-column
        type="seq"
        title="序号"
        width="60"
        align="center"
      />
      <vxe-column
        field="name"
        title="姓名"
        align="center"
      />
      <vxe-column
        field="sexName"
        title="性别"
        align="center"
      />
      <vxe-column
        field="sectionName"
        title="学段"
        align="center"
      />
      <vxe-column
        field="subject"
        title="学科"
        align="center"
      />
      <vxe-column
        field="phone"
        title="联系电话"
        align="center"
      />
      <vxe-column
        field="durateName"
        title="看课完成状态"
        align="center"
      />
      <vxe-column
        field="topicResultName"
        title="讨论完成"
        align="center"
      />
      <vxe-column
        field="worksResultName"
        title="作业完成"
        align="center"
      />
      <vxe-column
        field="completeName"
        title="测评完成"
        align="center"
      />
      <vxe-column
        field="trainName"
        title="培训结果"
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
  </div>
</template>

<script>
import { getLearnLong } from '@/api/train.js'
export default {
  name: 'SchoolClassTimeStatistics',
  props: {
    schoolId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      form: {
        name: '',
        trainingResults: ''
      },
      resultArr: [{ label: '合格', value: 1 }, { label: '不合格', value: 0 }],
      tableData_1: [{ schoolName: '兴化实验小学', totalPeople: '1653', eligiblePeople: '1000', unqualified: '0', passRate: '100' }],
      tableData: [],
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  watch: {
    schoolId(newVal, oldVal) {
      if (newVal) {
        this.form.name = this.form.trainingResults = ''
        this.getTable()
      }
    }
  },
  mounted() {
    this.getTable()
    this.form.name = this.form.trainingResults = ''
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
        schoolId: this.schoolId,
        train: this.form.trainingResults,
        name: this.form.name
      }
      const res = await getLearnLong(params)
      if (res.code == 200) {
        this.tableData = res.data.list
        this.tablePage.total = parseInt(res.data.total)
        if (this.tableData.length > 0) {
          this.tableData.forEach(item => {
            if (item.sex == 0) {
              this.$set(item, 'sexName', '女')
            } else {
              this.$set(item, 'sexName', '男')
            }
            if (item.duration == 0) {
              this.$set(item, 'durateName', '未完成')
            } else {
              this.$set(item, 'durateName', '完成')
            }
            if (item.topicResult == 0) {
              this.$set(item, 'topicResultName', '未完成')
            } else {
              this.$set(item, 'topicResultName', '未完成')
            }
            if (item.worksResult == 0) {
              this.$set(item, 'worksResultName', '未完成')
            } else {
              this.$set(item, 'worksResultName', '未完成')
            }

            if (item.complete == 0) {
              this.$set(item, 'completeName', '未完成')
            } else {
              this.$set(item, 'completeName', '未完成')
            }

            if (item.train == 0) {
              this.$set(item, 'trainName', '未完成')
            } else {
              this.$set(item, 'trainName', '未完成')
            }
          })
        }
      }
    },
    // 给活动状态添加样式
    cellClassName({ row, column }) {
      if (column.title === '看课完成状态') {
        if (row.classFinished === '已完成') {
          return 'cell-ywc'
        } else if (row.classFinished === '未完成') {
          return 'cell-wwc'
        }
      } else if (column.title === '培训结果') {
        if (row.trainingResults === '合格') {
          return 'cell-hg'
        } else if (row.trainingResults === '不合格') {
          return 'cell-bhg'
        }
      } else if (column.title === '讨论完成') {
        if (row.discussionComplete === '已完成') {
          return 'cell-ywc'
        } else if (row.discussionComplete === '未完成') {
          return 'cell-wwc'
        }
      } else if (column.title === '作业完成') {
        if (row.homeworkDone === '已完成') {
          return 'cell-ywc'
        } else if (row.homeworkDone === '未完成') {
          return 'cell-wwc'
        }
      } else if (column.title === '测评完成') {
        if (row.assessmentCompleted === '已完成') {
          return 'cell-ywc'
        } else if (row.assessmentCompleted === '未完成') {
          return 'cell-wwc'
        }
      }
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
    .cell-wwc,
    .cell-bhg {
      font-weight: bold;
      color: #f56c6c;
    }
    .cell-ywc,
    .cell-hg {
      font-weight: bold;
      color: #67c23a;
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
