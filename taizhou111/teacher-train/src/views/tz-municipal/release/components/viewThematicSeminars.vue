<template>
  <el-card class="box-card">
    <el-row :gutter="24" class="conditionRow">
      <el-col :span="6.5">
        <div class="grid-content bg-purple">
          最后一次统计时间：
          <span class="redText">{{ nowTime }}</span>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content bg-purple"><el-button type="primary" size="medium" @click="getTable">更新统计</el-button></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          讨论截止时间：
          <span class="redText">2022-03-02 15:00</span>
        </div>
      </el-col>
    </el-row>

    <el-form :model="form" :inline="true" class="demo-form-inline">
      <el-form-item label="讨论主题:"><el-input v-model="form.discussionTopic" clearable placeholder="请输入" /></el-form-item>

      <el-form-item label="创建人:"><el-input v-model="form.founder" clearable placeholder="请输入" /></el-form-item>

      <el-form-item><el-button type="primary" @click="getTable">筛选</el-button></el-form-item>
    </el-form>

    <vxe-table
      ref="sGrid"
      border
      stripe
      header-align="center"
      show-header-overflow
      :scroll-y="{ enabled: false }"
      :cell-class-name="cellClassName"
      :row-config="{ isHover: true }"
      :data="tableData"
      :edit-config="{ trigger: 'manual', mode: 'row' }"
      @cell-click="cellClick"
    >
      <vxe-column type="seq" title="序号" width="60" align="center" />
      <vxe-column field="discussionTopic" title="讨论主题" min-width="200">
        <template #default="{ row }">
          <span v-if="row.top === 1" class="topText">【置顶】</span>
          <span>{{ row.discussionTopic }}</span>
        </template>
      </vxe-column>
      <vxe-column field="createUserName" title="创建人" align="center" />
      <vxe-column field="createUserUnit" title="创建人单位" align="center" />
      <vxe-column field="checkNumber" title="查看数" align="center" />
      <vxe-column field="returnCard" title="回帖数" align="center" />
      <vxe-column title="操作" align="center" width="180">
        <template #default="{ row }">
          <vxe-button type="text" status="primary" content="导出Excel" />
        </template>
      </vxe-column>
    </vxe-table>

    <vxe-pager :current-page="tablePage.currentPage" :page-size="tablePage.pageSize" :total="tablePage.total" @page-change="pageChange">
      <template #left>
        <span class="page-left"><el-button type="primary" size="small" plain @click="exportExcel">导出Excel</el-button></span>
      </template>
    </vxe-pager>
  </el-card>
</template>

<script>
import { getTrainTheme } from '@/api/train.js';
export default {
  name: 'ViewClassTimeStatistics',
  data() {
    return {
      form: {
        discussionTopic: '',
        founder: ''
      },
      tableData: [],
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      nowTime: null
    };
  },
  mounted() {
    this.getTable();
  },
  methods: {
    // 分页
    pageChange({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage;
      this.tablePage.pageSize = pageSize;
      this.getTable();
    },
    // 获取时间
    getTime() {
      const myDate = new Date();
      this.nowTime = myDate.toLocaleDateString() + ' ' + myDate.toLocaleTimeString();
    },
    // 表格
    async getTable() {
      const params = {
        pageNum: this.tablePage.currentPage,
        pageSize: this.tablePage.pageSize,
        name: this.form.founder,
        theme: this.form.discussionTopic,
        activeId: sessionStorage.getItem('actId')
      };
      const res = await getTrainTheme(params);
      if (res.code == 200) {
        this.getTime();
        this.tableData = res.data.list;
        this.tablePage.total = parseInt(res.data.total);
      }
    },
    // 给活动状态添加样式
    cellClassName({ row, column }) {
      console.log(row, 'row');
      if (column.title === '讨论主题') {
        return 'cell-click';
      }
    },
    // 给培训活动添加点击事件
    cellClick({ row, column }) {
      console.log(row, 'row');
      if (column.title === '讨论主题') {
        this.$router.push({
          path: `/tz-municipal/release/components/seminarDetails?id=${row.id}`
        });
      }
    },
    // 导出
    exportExcel() {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['讨论主题', '创建人', '创建人单位', '查看数', '回帖数']; // 表格
        const filterVal = ['discussionTopic', 'createUserName', 'createUserUnit', 'checkNumber', 'returnCard']; // 表格内容
        const list = this.tableData;
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '主题研讨' // 文件名
        });
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  }
};
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
      padding: 8px 0;
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
.topText {
  margin-right: 5px;
  color: #f56c6c;
  font-weight: bold;
}
</style>
