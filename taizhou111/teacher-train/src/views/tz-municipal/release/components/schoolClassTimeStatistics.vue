<template>
  <div>
    <el-form :model="form" :inline="true" class="demo-form-inline">
      <el-form-item label="姓名:"><el-input v-model="form.name" clearable placeholder="请输入" /></el-form-item>

      <el-form-item><el-button type="primary">筛选</el-button></el-form-item>
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
      <vxe-column type="seq" title="序号" width="60" align="center" />
      <vxe-column field="schoolName" title="学校名称" align="center" />
      <vxe-column field="name" title="姓名" align="center" />
      <vxe-column field="gender" title="性别" align="center" />
      <vxe-column field="schoolSection" title="学段" align="center" />
      <vxe-column field="subject" title="学科" align="center" />
      <vxe-column field="contactNum" title="联系电话" align="center" />
      <vxe-column field="lessonTimeWatched" title="已看课时长(分钟)" align="center" />
      <vxe-column field="isItDone" title="是否完成" align="center" />
    </vxe-table>

    <vxe-pager :current-page="tablePage.currentPage" :page-size="tablePage.pageSize" :total="tablePage.total">
      <template #left>
        <span class="page-left"><el-button type="primary" size="small" plain>导出Excel</el-button></span>
      </template>
    </vxe-pager>
  </div>
</template>

<script>
export default {
  name: 'schoolClassTimeStatistics',
  data() {
    return {
      form: {
        name: ''
      },
      tableData: [
        { schoolName: '兴化实验小学', name: '张三', gender: '男', schoolSection: '小学', subject: '语文', contactNum: '1561231234', lessonTimeWatched: '1456', isItDone: '是' },
        { schoolName: '兴化实验小学', name: '张三', gender: '男', schoolSection: '小学', subject: '语文', contactNum: '1561231234', lessonTimeWatched: '1456', isItDone: '是' },
        { schoolName: '兴化实验小学', name: '张三', gender: '男', schoolSection: '小学', subject: '语文', contactNum: '1561231234', lessonTimeWatched: '1456', isItDone: '是' },
        { schoolName: '兴化实验小学', name: '张三', gender: '男', schoolSection: '小学', subject: '语文', contactNum: '1561231234', lessonTimeWatched: '1456', isItDone: '是' },
        { schoolName: '兴化实验小学', name: '张三', gender: '男', schoolSection: '小学', subject: '语文', contactNum: '1561231234', lessonTimeWatched: '1456', isItDone: '是' }
      ],
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      }
    };
  },
  methods: {
    // 给活动状态添加样式
    cellClassName({ row, column }) {
      if (column.title === '学校名称') {
        return 'cell-click';
      }
    }
  }
};
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
