<template>
  <el-card class="box-card">
    <el-form :inline="true" :model="ruleForm" class="demo-form-inline">
      <el-form-item label="作业提交截止时间:">
        <el-date-picker
          v-model="ruleForm.homeworkDeadline"
          type="datetime"
          placeholder="请选择"
          default-time="12:00:00"
          style="width: 240px"
          value-format="yyyy-MM-dd HH:mm"
          @change="homeworkDeadlineChange"
        />

        <el-button type="primary" style="margin-left: 72px;" @click="saveSettings">确定</el-button>
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
      :data="jobsData"
      :edit-config="{ trigger: 'manual', mode: 'row' }"
      @cell-click="cellClick"
    >
      <vxe-column type="seq" title="序号" width="60" align="center" />
      <vxe-column field="workName" title="作业名称" minWidth="200" />
      <vxe-column field="workCount" title="字数要求" align="center" />
      <vxe-column field="completeNumber" title="完成人数" align="center" />
      <vxe-column field="unfinishedNumber" title="未完成人数" align="center" />
      <vxe-column title="操作" align="center" width="180">
        <template #default="{ row }">
          <vxe-button type="text" status="primary" content="修改" @click="reviseClick(row)" />
          <vxe-button type="text" status="primary" content="删除" @click="deleteClick(row)" />
        </template>
      </vxe-column>
    </vxe-table>

    <vxe-pager :current-page="tablePage.currentPage" :page-size="tablePage.pageSize" :total="tablePage.total" @page-change="pageChange">
      <template #left>
        <span class="page-left"><el-button type="primary" size="small" plain @click="newClick = true">新建</el-button></span>
      </template>
    </vxe-pager>

    <el-dialog title="新建培训作业" width="800px" :visible.sync="newClick"><newTrainingJob /></el-dialog>

    <el-dialog title="修改培训作业" width="800px" :visible.sync="reviseJob"><newTrainingJob /></el-dialog>
  </el-card>
</template>

<script>
import newTrainingJob from './newTrainingJob.vue';
import { getWorkList, deleteWork } from '@/api/train.js';

export default {
  name: 'seminarDetails',
  components: {
    newTrainingJob
  },
  data() {
    return {
      ruleForm: {
        homeworkDeadline: ''
      },
      jobsData: [], //列表
      //分頁
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      newClick: false,
      reviseJob: false
    };
  },
  mounted() {
    this.getTableList();
  },
  methods: {
    //分页
    pageChange({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage;
      this.tablePage.pageSize = pageSize;
      this.getTableList();
    },
    //表格
    async getTableList() {
      let params = {
        pageNum: this.tablePage.currentPage,
        pageSize: this.tablePage.pageSize,
        activeId: sessionStorage.getItem('actId')
      };
      const res = await getWorkList(params);
      if (res.code == 200) {
        this.jobsData = res.data.list;
        this.tablePage.total = parseInt(res.data.total);
      }
    },
    // 作业截止
    homeworkDeadlineChange(val) {
      this.homeworkDeadline = val;
    },
    // 保存设置
    saveSettings() {
      if (this.ruleForm.homeworkDeadline === '') {
        this.$message({
          type: 'warning',
          message: '请先选择作业提交截止时间！'
        });
      } else {
        this.$message({
          type: 'success',
          message: '保存成功!'
        });
      }
    },
    // 给活动状态添加样式
    cellClassName({ row, column }) {
      if (column.title === '作业名称') {
        return 'cell-click';
      }
    },
    // 给培训活动添加点击事件
    cellClick({ row, column }) {
      if (column.title === '作业名称') {
        this.$router.push({
          path: '/tz-municipal/release/components/seminarDetails'
        });
      }
    },
    // 修改
    reviseClick(row) {
      this.reviseJob = true;
    },
    // 删除
    deleteClick(row) {
      this.$confirm('此操作将永久删除该培训作业, 是否继续?', '删除培训作业', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteWork(row.id).then(res => {
            this.$message.success(res.message);
            this.$refs.vGrid.removeRadioRow();
            this.getTableList();
          });
          this.radioChangeRow = undefined;
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
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
ul {
  list-style: none;
  margin: 0;
  padding: 0;
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
