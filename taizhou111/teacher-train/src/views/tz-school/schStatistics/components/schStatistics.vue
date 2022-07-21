<template>
  <el-card class="box-card">
    <el-form :model="form" :inline="true" class="demo-form-inline">
      <el-form-item label="活动名称:"><el-input v-model="form.name" clearable placeholder="请输入" /></el-form-item>

      <el-form-item><el-button type="primary" @click="getStatistical">查询</el-button></el-form-item>

      <el-form-item label="最后一次统计时间:" style="margin: 0 10px 0 24px;">
        <span class="redText">{{ nowTime }}</span>
      </el-form-item>

      <el-form-item><el-button type="primary" @click="getStatistical">更新统计</el-button></el-form-item>
    </el-form>

    <vxe-table
       :column-config="{resizable: true}"
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
      @cell-click="cellClickFirst"
    >
      <vxe-column type="seq" title="序号" width="60" align="center" />
      <vxe-column field="activeName" title="活动名称" align="center" min-width="300" />
      <!-- <vxe-column field="createUserName" title="创建人" align="center" />
      <vxe-column field="createUnitName" title="创建人单位" align="center" /> -->
      <vxe-column field="createTime" title="培训时间" align="center"   width="150"/>
      <vxe-column field="activeStatus" title="状态" align="center" />
      <vxe-column field="totalNumber" title="参训总人数" align="center" />
      <vxe-column field="completeNumber" title="合格人数" align="center" />
      <vxe-column field="unfinishedNumber" title="不合格人数" align="center" />
      <vxe-column field="checkNumber" title="合格率" align="center" />
        <vxe-column title="操作" align="center">
        <template #default="{ row }">
         <!-- <vxe-button v-if="row.status == 1" type="text" status="primary" content="已报名" /> -->
          <vxe-button  type="text" status="primary" content="查看详情" @click="cellClickFirst" />
        </template>
      </vxe-column>
    </vxe-table>

    <vxe-pager :current-page="tablePage.currentPage" :page-size="tablePage.pageSize" :total="tablePage.total" @page-change="pageChange">
      <template #left>
        <span class="page-left"><el-button type="primary" size="small" plain @click="exportExcel">导出Excel</el-button></span>
      </template>
    </vxe-pager>

    <el-dialog title="新建培训活动" width="980px" :close-on-click-modal="false" :visible.sync="chooseTeacher" />



    <el-dialog title="人员列表" width="1300px" :close-on-click-modal="false" :visible.sync="teacherlistshow"  @close="closeddata"  >

    
      <div>当前学校名称:{{schoolnames}}</div>
      <vxe-table
      style="margin-top:20px"
      ref="xGrid"
      border
      stripe
      header-align="center"
      show-header-overflow
      show-overflow
      :row-config="{ isHover: true }"
      :data="teacherlist1"
      :cell-class-name="cellClassName"
      :edit-config="{ trigger: 'manual', mode: 'row' }"
    >
      <vxe-column type="seq" title="序号" width="60" align="center" />
      <vxe-column field="name" title="姓名" align="center" />
      <vxe-column field="sex" title="性别" align="center" />
      <vxe-column field="sectionName" title="看课完成率" align="center" />
      <vxe-column field="subject" title="学科" align="center" />
      <vxe-column field="phone" title="联系电话" align="center" />
      <vxe-column field="duration" title="看课完成状态" align="center" />
       <vxe-column field="topicResult" title="讨论完成" align="center" />
       <vxe-column field="worksResult" title="作业完成" align="center" />
       <vxe-column field="complete" title="测评完成" align="center" />
       <vxe-column field="train" title="培训结果" align="center" />

    </vxe-table>
       <vxe-pager
      :current-page="teacher1.currentPage"
      :page-size="teacher1.pageSize"
      :total="teacher1.total"
      @page-change="pageChangeteacher"
    >
    </vxe-pager>

    </el-dialog>



  </el-card>
</template>

<script>
import { getStatistical,getList,getReport1 } from '@/api/train.js'
// import XLSX from 'xlsx'
export default {
  name: 'ViewClassTimeStatistics',
  data() {
    return {
      statuss:"",
      id:"",
      form: {
        name: ''
      },
      schoolnames:"",
      teacherlist1:[],
      teacherlistshow:false,
      chooseTeacher: false,
      nowTime: '',
      tableData: [], // 表格
      tablePage: {
        // 分页
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      teacher1:{
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
      let data = JSON.parse(window.localStorage.getItem('userinfo'))
   this.schoolnames=data.schoolName
    this.getStatistical()
  },
  methods: {
    closeddata(){
    this.teacher1={
        total: 0,
        currentPage: 1,
        pageSize: 10

    }
    },
    //获取教师合格人员列表
   async    getteacherdatalist(){
   const params = {
       
        pageNum: this.teacher1.currentPage,
        pageSize: this.teacher1.pageSize,
        activityId:this.id,
        areaId:"",
        areaIds:"",
        name:"",
        schoolName:"",
        schoolType:"",
        state:"",
        train:this.statuss,
        unitId:"",
      };
      const res = await getReport1(params);
      if (res.code == 200) {
       
        this.teacherlist1=[]
        this.teacherlist1 = res.data.list;
        this.teacher1.total = parseInt(res.data.total);
        this.teacherlistshow=true
      }


   },
    // 给培训活动添加点击事件
    cellClickFirst({ row, column }) {
         console.log(row,3333)
      if (column.title === '活动名称'||column.title === '操作') {
        this.$router.push({ path: './statisticaltime', query: { id: row.id,train:"", }})
      }
        if (column.title === '合格人数') {
             this.$router.push({ path: './statisticaltime', query: { id: row.id,train:1, }})
      }
       if (column.title === '不合格人数') {
             this.$router.push({ path: './statisticaltime', query: { id: row.id,train:0 }})
      }
    },
    // 给活动状态添加样式
    cellClassName({ row, column }) {
      if (column.title === '活动名称') {
        return 'cell-click'
      }
       if (column.title === '合格人数') {
        return 'cell-click'
      }
       if (column.title === '不合格人数') {
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
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
      this.getStatistical()
    },
    pageChangeteacher({ currentPage, pageSize }) {
      this.teacher1.currentPage = currentPage
      this.teacher1.pageSize = pageSize
      this.getteacherdatalist()
    },
    // 列表
    async getStatistical() {
      const params = {
        activeName: this.form.name,
        pageNum: this.tablePage.currentPage,
        pageSize: this.tablePage.pageSize,
        type: 1
      }
      this.getTime()
      const res = await getStatistical(params)
      if (res.code == 200) {
         this.tableData=[]
        this.tableData = res.data.list.map((el)=>{

            return {
              ...el,
              checkNumber:el.checkNumber==null?el.checkNumber:parseInt(el.checkNumber*100)+"%",
            }
        })

        this.tablePage.total = Number(res.data.total)
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
          filename: '学校培训活动统计' // 文件名
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
