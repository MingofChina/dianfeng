<template>
  <el-card class="box-card">
 <!--   <el-form :model="form" :inline="true" class="demo-form-inline">
      <el-form-item label="活动名称"><el-input v-model="form.eventName" clearable placeholder="请输入" /></el-form-item>

      <el-form-item><el-button type="primary" @click="getData">筛选</el-button></el-form-item>

      <el-form-item style="margin-left: 24px;">
        <div class="grid-content bg-purple">
          最后一次统计时间：
          <span class="redText">{{ nowTime }}</span>
        </div>
      </el-form-item>

      <el-form-item><el-button type="primary" size="medium" @click="getData">更新统计</el-button></el-form-item>
    </el-form> -->
  <!-- <vxe-table
      ref="xGrid"
      border
      stripe
      header-align="center"
      show-header-overflow
      show-overflow
      :row-config="{ isHover: true }"
      :data="tableData1"
      :loading="loading"
      :cell-class-name="cellClassName"
      :edit-config="{ trigger: 'manual', mode: 'row' }"
    >
      <vxe-column type="seq" title="序号" width="60" align="center" />
      <vxe-column field="schoolName" title="学校名称" min-width="200"  align="center"/>
      <vxe-column field="totalNumber" title="参训总人数" align="center" />
      <vxe-column field="qualifiedNumber" title="合格人数" align="center" />
      <vxe-column field="notQualifiedNumber" title="不合格人数" align="center" />
      <vxe-column field="qualifiedCheckNumber" title="合格率(%)" align="center" />
    </vxe-table>
 -->
      
      <div>当前学校:{{nowschool}}</div>
      <el-form :model="form" :inline="true" class="demo-form-inline" style="margin-top:20px;">
         <el-form-item label="姓名"><el-input v-model="form.name" clearable placeholder="请输入" /></el-form-item>
        <el-form-item   label="培训结果">
       <el-select v-model="form.result"
                  clearable
                  placeholder="请选择培训结果"
                  @change="getstatus">
         <el-option label="合格"
                    value="0" />
         <el-option label="不合格"
                    value="1" />
       </el-select>


        </el-form-item>

       <el-form-item><el-button type="primary" @click="getData1">筛选</el-button></el-form-item>
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
      @cell-click="cellClick"
    >
      <vxe-column type="seq" title="序号" width="60" align="center" />
      <vxe-column field="name" title="姓名" align="center" />
      <vxe-column field="sex" title="性别" align="center" />
      <vxe-column field="durationRate" sortable  title="看课完成率" align="center" width='150' />
       <vxe-column field="topicRate"  sortable  title="讨论完成率" align="center" width='150'/>
       <vxe-column field="workRate" sortable   title="作业完成率" align="center" width='150' />
       <vxe-column field="complete"  sortable  title="考试结果" align="center" />
       <vxe-column field="train" sortable  title="培训结果" align="center" />
      <vxe-column field="studyDuration" title="学时" align="center" />

    </vxe-table>
    <vxe-pager @page-change="pageChange" :current-page="tablePage.currentPage" :page-size="tablePage.pageSize" :total="tablePage.total">
      <template #left>
        <span class="page-left"><el-button type="primary" size="small" plain @click="exportExcels">导出Excel</el-button></span>
      </template>
    </vxe-pager>

  </el-card>
</template>

<script>
import { getList,getLearnLong,getLongSchool1 } from '@/api/train.js';

export default {
  name: 'trainingRegistration',
  components: {

  },
  data() {
    return {
      nowschool:"",
      form:{
        result:"",
        name:"",
      },
      activiid:"",
      tableData1:[],
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
      wantId: '',
      train11:null,
    };
  },
  created(){
    // this.getData()
    // this.getData1()

  },
  activated(){
   let data = JSON.parse(window.localStorage.getItem('userinfo'))
   this.nowschool=data.schoolName
    this.train11=this.$route.query.train
    this.getData()
    // this.getData1()
  },
  // mounted(){
  // this.getData()
  //   this.getData1()
  // },
  methods: {

    // 导出
    exportExcels() {
     
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['姓名', '性别', '看课完成率', '讨论完成率', '作业完成率', '考试结果', '培训结果', '学时'] // 表格
        const filterVal = [ 'name', 'sex', 'durationRate', 'topicRate', 'workRate', 'complete', 'train', 'studyDuration'] // 表格内容
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '学校培训活动统计详情' // 文件名
        })
      })
    },
    getstatus(e){
    this.form.result=e
    },
async   getData1(){
      // console.log(this.$route.query.id,444444444)
       let data ={
         pageSize:this.tablePage.pageSize,
         pageNum:this.tablePage.currentPage,
         activeId:this.$route.query.id,
         areaId: "",
         schoolName: "",
         type:1,
       }
      const  res  = await getLongSchool1(data)
        if(res.code==200){
         this.tableData1=[]
         this.tableData1=res.data.list
        }else{

        }
    },
    chooseClose(val) {
      this.wantSignUp = val;
      this.getData();
    },
    // 我要报名
    wantReport(row) {
      sessionStorage.setItem('actId', row.id);
      this.wantId = row.id;
      this.wantSignUp = true;
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
    // 表格数据
    async getData() {
      const params = {
        // activeName: this.form.eventName,
        pageNum: this.tablePage.currentPage,
        pageSize: this.tablePage.pageSize,
        // teacherStatusId: ''
        activeId:this.$route.query.id,
        schoolId:"",
        train:this.train11,
        name: "",
      };
      this.loading = true;
      const res = await getLearnLong(params);
      //  console.log(res,7777777)
      
      if (res.code == 200) {
        this.getTime();
        this.loading = false;
         this.tableData=[]
        this.tableData = res.data.list.map((el)=>{
                   return {
                    ...el,
                    sex:el.sex==0?"女":el.sex==1?"男":"",
                    durationRate:el.durationRate===0?el.durationRate: parseInt(el.durationRate*100)+"%",
                   topicRate:el.topicRate===0?el.topicRate:parseInt(el.topicRate*100)+"%",
                   workRate:el.workRate===0?el.workRate:parseInt(el.workRate*100)+"%",
                   }

        })
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
