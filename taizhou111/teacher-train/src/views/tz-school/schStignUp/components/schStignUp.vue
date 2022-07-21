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

      <!-- <el-form-item><el-button type="primary" size="medium" @click="getData">更新统计</el-button></el-form-item> -->
    </el-form>

    <vxe-table
      :column-config="{resizable: true}"
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
      @cell-click="cellClick"
    >
      <vxe-column type="seq" title="序号" width="60" align="center" />
      <vxe-column field="activeName" title="活动名称" min-width="200" />
      <vxe-column field="createUserName" title="创建人" align="center" />
      <vxe-column field="createUnitName" title="创建人单位" align="center" />
      <vxe-column field="signupEndTime" title="报名截止时间" align="center" />
      <vxe-column field="activeStatus" title="培训状态" align="center" />
      <vxe-column field="applicantsNumber" title="已报名人数" align="center" />
      <vxe-column title="操作" align="center">
        <template #default="{ row }">
         <!-- <vxe-button v-if="row.status == 1" type="text" status="primary" content="已报名" /> -->
          <vxe-button  type="text" status="primary" content="我要报名" @click="wantReport(row)" />
        </template>
      </vxe-column>
    </vxe-table>

    <vxe-pager @page-change="pageChange" :current-page="tablePage.currentPage" :page-size="tablePage.pageSize" :total="tablePage.total">
      <template #left>
        <span class="page-left"><el-button type="primary" size="small" plain @click="exportExcel">导出Excel</el-button></span>
      </template>
    </vxe-pager>

    <wantSignUp :rowId="wantId" ref="choosedata"   @chooseClose="chooseClose" />
    <alreadySignUp  ref="singup"  @update="updeteddata"    :activiid="activiid"> </alreadySignUp>
  </el-card>
</template>

<script>
import wantSignUp from './wantSignUp.vue';
import alreadySignUp from './alreadySignUp.vue';
import { getList } from '@/api/train.js';

export default {
  name: 'trainingRegistration',
  components: {
    wantSignUp,
    alreadySignUp
  },
  data() {
    return {
      activiid:"",
      form: {
        eventName: ''
      },
      tableData: [],
      loading: false,
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      wantSignUp: false,
      alreadySignUp: false,
      nowTime: null,
      wantId: ''
    };
  },
  activated() {
    this.getData();
  },
  methods: {
    chooseClose(val) {
      this.wantSignUp = val;
      this.getData();
    },
    // 我要报名
    wantReport(row) {
      sessionStorage.setItem('actId', row.id);
      this.wantId = row.id;
      // this.wantSignUp = true;
      this.$nextTick(()=>{
         this.$refs.choosedata.getData()
      })
    },
    // 获取当前时间
    getTime() {
      const myDate = new Date();
      this.nowTime = myDate.toLocaleDateString() + ' ' + myDate.toLocaleTimeString();
    },
    // 翻页
    pageChange({ currentPage, pageSize }) {
      this.tablePage.currentPage= currentPage;
      this.tablePage.pageSize = pageSize;
      this.getData();
    },
    //刷新表格
    updeteddata(){
      this.$refs.singup.showfalse1()
      this.tablePage={
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      this.getData()
    },
    // 表格数据
    async getData() {
      const params = {
        activeName: this.form.eventName,
        pageNum: this.tablePage.currentPage,
        pageSize: this.tablePage.pageSize,
        teacherStatusId: ''
      };
      this.loading = true;
      const res = await getList(params);
      if (res.code == 200) {
        this.getTime();
        this.loading = false;
        this.tableData=[]
        this.tableData = res.data.list;
        this.tablePage.total = parseInt(res.data.total);
      }
    },
    // 导出
    exportExcel() {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['活动名称', '创建人', '创建人单位', '培训时间', '培训状态', '已报名人数']; // 表格
        const filterVal = ['activeName', 'createUserName', 'createUnitName', 'trainingTime', 'activeStatus', 'applicantsNumber']; // 表格内容
        const list = this.tableData;
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '培训报名' // 文件名
        });
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    // 给活动状态添加样式
    cellClassName({ row, column }) {
      if (column.title === '活动名称') {
        return 'cell-click';
      }
    },
    // 给培训活动添加点击事件
    cellClick({ row, column }) {
      if (column.title === '活动名称') {
        this.activiid=row.id

        this.$nextTick(()=>{
          this.$refs.singup.shows()
          this.$refs.singup.gettablelist()
          this.alreadySignUp = true;
        })

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
</style>
