<template>
  <el-card class="box-card">
    <el-form :model="form" :inline="true" class="demo-form-inline">
      <el-form-item label="活动名称"><el-input v-model="form.eventName" clearable placeholder="请输入" /></el-form-item>

      <el-form-item><el-button type="primary" @click="getData">筛选</el-button></el-form-item>

      <el-form-item style="margin-left: 24px;">
        <div class="grid-content bg-purple">
          最后一次统计时间：
          <span class="redText">{{ nowTime }}</span>
        </div>
      </el-form-item>
      <el-form-item><el-button type="primary" size="medium" @click="getData">更新统计</el-button></el-form-item>
    </el-form>
    <vxe-table
      ref="xGrid"
      border
      stripe
      header-align="center"
      show-header-overflow
      show-overflow
      :row-config="{ isHover: true }"
      :data="tableDataFirst"
      :loading="loading1"
      :cell-class-name="cellClassName"
      :edit-config="{ trigger: 'manual', mode: 'row' }"
      @cell-click="cellClickFirst"
    >
      <vxe-column type="seq" title="序号" width="60" align="center" />
      <vxe-column field="activeName" title="活动名称" min-width="200" />
      <vxe-column field="createUserName" title="创建人" align="center" />
      <vxe-column field="createUnitName" title="创建人单位" align="center" />
      <vxe-column field="trainingTime" title="培训时间" align="center" />
      <vxe-column field="activeStatus" title="培训状态" align="center" />
      <vxe-column field="applicantsNumber" title="已报名人数" align="center" />
    </vxe-table>

    <vxe-pager :current-page="tablePage1.currentPage1" :page-size="tablePage1.pageSize1" :total="tablePage1.total1" @page-change="pageChange1">
      <template #left>
        <span class="page-left"><el-button type="primary" size="small" plain @click="exportExcel11">导出Excel</el-button></span>
      </template>
    </vxe-pager>

    <el-dialog title="指定学校管理员" :visible.sync="isShow" width="70%">
      <h5 class="redText">说明：只有被指定了项目负责人的学校，才可以管理本学校教师的培训情况。学校负责人可指定多名。</h5>

      <el-form :model="form" :inline="true" class="demo-form-inline">
        <el-form-item label="单位名称:"><el-input v-model="form.unitName" clearable placeholder="请输入" /></el-form-item>
        <el-form-item><el-button type="primary" @click="getTable">查询</el-button></el-form-item>
      </el-form>

      <vxe-table
        ref="sGrid"
        border
        stripe
        header-align="center"
        show-header-overflow
        show-overflow
        :row-config="{ isHover: true }"
        :data="tableData"
        :edit-config="{ trigger: 'manual', mode: 'row' }"
        @cell-click="cellClicktwo"
      >
        <vxe-column type="seq" title="序号" width="60" align="center" />
        <vxe-column field="schoolName" title="单位名称" min-width="200" align="center" />
        <vxe-column field="areaName" title="所属区域" align="center" />
        <!--  <vxe-column field="schoolType" title="单位类型" align="center" /> -->
        <vxe-column field="userName" title="负责人姓名" align="center" />
        <!--     <vxe-column field="phone" title="负责人手机" align="center" /> -->
        <vxe-column title="操作" align="center" width="180">
          <template #default="{ row }">
            <vxe-button type="text" status="primary" content="指定" @click="appoint(row)" />
            <!--    <vxe-button type="text"
                        status="primary"
                        content="删除"
                        @click="deleteClick(row)" /> -->
          </template>
        </vxe-column>
      </vxe-table>

      <vxe-pager :current-page="tablePage.currentPage" :page-size="tablePage.pageSize" :total="tablePage.total" @page-change="pageChange">
        <template #left>
          <span class="page-left"><el-button type="primary" size="small" @click="exportExcel22">导出Excel</el-button></span>
        </template>
      </vxe-pager>
      <chooseSchoolPrincipal ref="showdilogs" :activity-id="activityId" :areaid="areaid" :row-name="rowName" :row-id="rowId" @closeDia="closeDia" />
    </el-dialog>
  </el-card>
</template>

<script>
import chooseSchoolPrincipal from './chooseSchoolPrincipal.vue'
import { getSchoolResult, deleteArea, getList11 } from '@/api/train.js'

export default {
  name: 'Specify',
  components: {
    chooseSchoolPrincipal
  },
  data() {
    return {
      form: {
        unitName: '',
        unitType: '',
        eventName: ''
      },
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        }
      ],
      tableData: [], // 表格
      loading: false,
      loading1: false,
      tablePage1: {
        total1: 0,
        currentPage1: 1,
        pageSize1: 10
      },
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      // newClick: false,
      rowName: '',
      activityId: '',
      rowId: '',
      nowTime: '',
      isShow: false,
      tableDataFirst: [],
      areaid: ''
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    // 给培训活动添加点击事件
    cellClickFirst({ row, column }) {
      if (column.title === '活动名称') {
        this.activityId = row.id
        this.$nextTick(() => {
          this.getTable()
          this.isShow = true
        })
      }
    },
    // 第二层
    cellClicktwo({ row, column }) {
      this.areaid = row.id
    },
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
    // 表格数据
    async getData() {
      const params = {
        activeName: this.form.eventName,
        pageNum: this.tablePage1.currentPage1,
        pageSize: this.tablePage1.pageSize1,
        teacherStatusId: ''
      }
      this.loading1 = true
      const res = await getList11(params)
      if (res.code == 200) {
        this.getTime()
        this.loading1 = false
        this.tableDataFirst = []
        this.tableDataFirst = res.data.list
        this.tablePage1.total1 = parseInt(res.data.total)
      }
    },
    closeDia(val) {
      // this.newClick = val;
      // this.isShow = false
      this.getTable()
    },
    // 指定
    appoint(row) {
      this.rowName = row.schoolName
      this.rowId = row.id
      // this.newClick = true;
      this.$refs.showdilogs.shows()
    },
    // 翻页
    pageChange({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
      this.getTable()
    },
    // 翻页
    pageChange1({ currentPage, pageSize }) {
      this.tablePage1.currentPage1 = currentPage
      this.tablePage1.pageSize1 = pageSize
      this.getData()
    },
    // 删除
    deleteClick(row) {
      this.$confirm('此操作将永久删除该活动区域, 是否继续?', '删除活动区域', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteArea(row.id).then(res => {
            this.$message.success(res.message)
            this.getTable()
          })
          // this.radioChangeRow = undefined;
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 表格
    async getTable() {
      const params = {
        pageNum: this.tablePage.currentPage,
        pageSize: this.tablePage.pageSize,
        schoolType: this.form.unitType,
        schoolName: this.form.unitName,
        activeId: this.activityId // 似乎少了这个参数 by zhangzhi
      }
      const res = await getSchoolResult(params)
      if (res.code == 200) {
        this.tableData = res.data.list
        this.tablePage.total = parseInt(res.data.total)
      }
    },
    // 导出
    exportExcel11() {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['活动名称', '创建人', '创建人单位', '培训时间', '培训状态', '已报名人数'] // 表格
        const filterVal = ['activeName', 'createUserName', 'createUnitName', 'trainingTime', 'activeStatus', 'applicantsNumber'] // 表格内容
        const list = this.tableDataFirst
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '指定学校管理员' // 文件名
        })
      })
    },

    exportExcel22() {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['单位名称', '所属区域', '负责人姓名'] // 表格
        const filterVal = ['schoolName', 'areaName', 'userName'] // 表格内容
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '指定学校管理员' // 文件名
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
ul {
  list-style: none;
  margin: 0;
  padding: 0;
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
    // &:after {
    //   position: absolute;
    //   bottom: 0;
    //   left: 20px;
    //   right: 20px;
    //   content: '';
    //   border-top: 1px solid #dcdfe6;
    // }
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
}
</style>
