<template>
  <el-card class="box-card">
    <el-form :model="form" :inline="true" class="demo-form-inline">
      <el-form-item label="姓名:"><el-input v-model="form.name" clearable placeholder="请输入" /></el-form-item>

      <el-form-item label="单位:"><el-input v-model="form.schoolName" clearable placeholder="请输入" /></el-form-item>

      <el-form-item label="审核状态">
        <el-select v-model="form.state" clearable placeholder="请选择"><el-option v-for="item in examine" :key="item.value" :label="item.label" :value="item.value" /></el-select>
      </el-form-item>

      <el-form-item label="区域"><el-cascader v-model="form.areaId" :options="options" clearable placeholder="请选择" /></el-form-item>

      <el-form-item><el-button type="primary" @click="getTable">筛选</el-button></el-form-item>
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
      :checkbox-config="{ highlight: true }"
      @checkbox-change="checkboxChange"
      @checkbox-all="selectAllEvent"
    >
      <vxe-column type="checkbox" width="40" align="center" />
      <vxe-column type="seq" title="序号" width="60" align="center" />
      <vxe-column field="name" title="姓名" align="center" />
      <vxe-column field="sexName" title="性别" align="center" />
      <vxe-column field="areaName" title="区域" align="center" />
      <vxe-column field="unit" title="单位" min-width="200" align="center" />
      <vxe-column field="sectionName" title="学段" align="center" />
      <vxe-column field="disciplineName" title="学科" align="center" />
      <vxe-column field="stateName" title="审核状态" align="center" />
      <vxe-column field="createTime" title="报名时间" min-width="120" align="center" />
    </vxe-table>

    <vxe-pager :current-page="tablePage.currentPage" :page-size="tablePage.pageSize" :total="tablePage.total" @page-change="pageChange">
      <template #left>
        <span class="page-left">
          <el-button type="primary" size="small" plain @click="clickPass(1)">通 过</el-button>
          <el-button type="warning" size="small" plain @click="clickPass(2)">不通过</el-button>
          <el-button size="small" plain @click="deleteRow">删 除</el-button>
          <el-button type="primary" size="small" plain @click="chooseTeacher = true">选择参训教师</el-button>
        </span>
      </template>
    </vxe-pager>

    <el-dialog title="新建培训活动" width="980px" :close-on-click-modal="false" :visible.sync="chooseTeacher"><chooseTrainTeacher @chooseClose="chooseClose" /></el-dialog>
  </el-card>
</template>

<script>
import { getReport, getTree, deleteReport, auditStatus } from '@/api/train.js';
import chooseTrainTeacher from './chooseTrainTeacher.vue';

export default {
  name: 'ViewRegistrationResults',
  components: {
    chooseTrainTeacher
  },
  data() {
    return {
      form: {
        name: '',
        schoolName: '',
        state: '',
        areaId: []
      },
      // 区域
      examine: [
        {
          label: '未审核',
          value: 0
        },
        {
          label: '已通过',
          value: 1
        },
        {
          label: '未通过',
          value: 2
        }
      ],
      options: [], // 区域
      tableData: [], // 列表
      loading: false,
      // 分页
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      chooseTeacher: false,
      ids: null,
      ids2: [],
      isAll: false
    };
  },
  mounted() {
    this.getTree();
    this.getTable();
  },
  methods: {
    chooseClose(val) {
      this.chooseTeacher = val;
    },
    // type 1通过  2通过
    async clickPass(type) {
      let len = null;
      let ids = null;
      if (this.ids2.length == 0) {
        len = this.tableData.filter(item => item.isCheck);
        ids = len.map(item => item.id);
      } else {
        ids = this.ids2;
      }
      const params = {
        activeId: sessionStorage.getItem('actId'),
        state: type == 1 ? 1 : 0,
        userIds: ids
      };
      if (ids.length > 0) {
        const res = await auditStatus(params);
        if (res.code == 200) {
          this.$message.success(res.message);
          this.getTable();
        }
      } else {
        this.$message.warning('请选择审核内容');
      }
    },
    // 删除
    deleteRow() {
      if (this.isAll) {
        this.$confirm('确定要删除所勾选的教师吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.removeData(this.ids);
        });
      } else {
        const len = this.tableData.filter(item => item.isCheck);
        this.ids = len.map(item => item.id).join();
        if (this.ids) {
          this.$confirm('确定要删除所勾选的教师吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.removeData(this.ids);
          });
        } else {
          this.$message.warning('请选择删除内容');
        }
      }
    },
    removeData(id) {
      deleteReport(id).then(res => {
        this.$message.success(res.message);
        this.$refs.xGrid.removeRadioRow();
        this.getTable();
      });
    },
    // 多选
    checkboxChange({ row }) {
      row.isCheck = !row.isCheck;
    },
    // 全选
    selectAllEvent({ checked }) {
      if (checked) {
        this.ids2 = this.tableData.map(item => item.id);
        this.ids = this.tableData.map(item => item.id).join();
        this.isAll = true;
      } else {
        this.ids = null;
        this.ids2 = [];
        this.isAll = false;
      }
    },
    // 分页
    pageChange({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage;
      this.tablePage.pageSize = pageSize;
      this.getTable();
    },
    // 区域
    async getTree() {
      const res = await getTree();
      if (res.code == 200) {
        this.options = res.data;
      }
    },
    // 列表
    async getTable() {
      if (this.form.areaId.length > 0) {
        this.form.areaId = this.form.areaId.slice(-1)[0];
      }
      const params = {
        pageNum: this.tablePage.currentPage,
        pageSize: this.tablePage.pageSize,
        name: this.form.name,
        schoolName: this.form.schoolName,
        activityId: sessionStorage.getItem('actId'),
        areaId: this.form.areaId,
        state: this.form.state
      };
      this.loading = true;
      const res = await getReport(params);
      if (res.code == 200) {
        this.loading = false;
        this.tablePage.total = parseInt(res.data.total);
        this.tableData = res.data.list;
        if (this.tableData.length > 0) {
          this.tableData.forEach(item => {
            if (item.sex == 0) {
              this.$set(item, 'sexName', '女');
            }
            if (item.sex == 1) {
              this.$set(item, 'sexName', '男');
            }
            if (item.state == 0) {
              this.$set(item, 'stateName', '未通过');
            }
            if (item.state == 1) {
              this.$set(item, 'stateName', '通过');
            }
            this.$set(item, 'isCheck', false);
          });
        }
      } else {
        this.loading = false;
      }
    },
    // 给活动状态添加样式
    cellClassName({ row, column }) {
      if (column.property === 'approvalStatus') {
        if (row.approvalStatus === '未审核') {
          return 'cell-wsh';
        } else if (row.approvalStatus === '已通过') {
          return 'cell-ytg';
        } else if (row.approvalStatus === '未通过') {
          return 'cell-wtg';
        }
      }
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
.el-form--inline .el-form-item {
  margin-right: 16px;
}
::v-deep .vxe-table {
  .vxe-table--body {
    .cell-wsh,
    .cell-ytg,
    .cell-wtg {
      font-weight: bold;
      color: #f56c6c;
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
