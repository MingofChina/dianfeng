<template>
  <div>
    <!--   <el-descriptions :column="6">
      <el-descriptions-item label="要求">10个</el-descriptions-item>
      <el-descriptions-item label="已学完">10个</el-descriptions-item>
    </el-descriptions> -->

    <!--  <el-form ref="form"
             :model="form"
             label-width="75px"
             label-position="left">
      <el-form-item label="课程分类:">
        <el-radio-group v-model="radio_1"
                        size="small">
          <el-radio-button label="全部" />
          <el-radio-button label="全面培养与学生评价" />
          <el-radio-button label="学校治理与学校评价" />
          <el-radio-button label="政府履职与用人评价" />
          <el-radio-button label="教师素养与教师评价" />
          <el-radio-button label="教育改革形势任务" />
          <el-radio-button label="教育评价改革政策与理论" />
        </el-radio-group>
      </el-form-item>
    </el-form>
 -->
    <vxe-toolbar>
      <template #buttons>
        <vxe-input
          v-model="filterName1"
          type="search"
          placeholder="按标题或作者搜索"
          @search-click='searchEvent'
        />
      </template>
      <template #tools>
        <vxe-button
          status="primary"
          icon="el-icon-s-promotion"
          @click="sendinfo11"
        >发 帖</vxe-button>
      </template>
    </vxe-toolbar>
    <el-form ref="form"
             :model="form"
             label-width="75px"

             style="display: flex;"
             >
  <el-form-item label="课程分类:">
       <el-radio-group v-for="(item,index) in fenleilist "
                       :key="item.id"
                       v-model="infos"
                       size="small"
                       @change="chosedata(item.id)">
         <el-radio-button :label="item.name" />
       </el-radio-group>
    </el-form-item>
    <el-form-item label="要求:" style="margin-left: 20px">
          <div>{{required}}个,</div>
      </el-form-item>
      <el-form-item label="已完成:">
            <div>{{hasfinished}}个,</div>
        </el-form-item>
    </el-form>
    <vxe-table
      ref="sGrid"
      border
      stripe
      header-align="center"
      show-header-overflow
      show-overflow
      :row-config="{isHover: true}"
      :data="tableData"
      :edit-config="{trigger: 'manual', mode: 'row'}"
      :checkbox-config="{highlight: true}"
      @cell-click="onChange"
      :cell-class-name="cellClassName"
    >
      <vxe-column
        field="topicTitle"
        title="标题"
        min-width="300"
         align="center"
      >
        <template #default="{ row }">
          <span class="redLabel" v-show="row.orderTop?true:false">置顶</span>
          <span style="color: #409eff;cursor: pointer;">{{ row.topicTitle }}</span>
        </template>
      </vxe-column>
      <vxe-column
        field="athuor"
        title="作者"
        align="center"
      />
      <vxe-column
        field="replays"
        title="浏览/回复"
        align="center"
      />
      <vxe-column
        field="replayLastTime"
        title="最后更新时间"
        align="center"
      />
    </vxe-table>
    <vxe-pager
      :current-page="tablePage.currentPage"
      :page-size="tablePage.pageSize"
      :total="tablePage.total"
      @page-change="pageChange11"
    />
      <newFiles  ref="diolginfos"  @changefatie="changedateinfo"   :childlist="childlist"/>
  </div>
</template>
<script>
import newFiles from '@/views/tz-municipal/release/components/newFiles.vue'
import { discusslist,discusstablelist,isfinishsend,coursecategory} from '../../../../api/mypractice.js'
export default {
  name: 'CourseStudy',
  components: {
    newFiles
  },
  data() {
    return {
      fenleilist:[],
      kid:"",
      infos:"",
      required:null,
      hasfinished:null,
      forms5: {
        pageNum: 1,
        pageSize: 10,
        activityId: '',
        keyword: '',
        topicId: '',
        userId: ''
      },
      childlist:[],
      total5: 0,
      form: {},
      filterName1: '',
      activeName: 'first',
      radio_1: '全部',
      tableData: [],
      courseCategoryId:"",
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      newClick: false
    }
  },
// async created(){
//  await  this.getcourse()

//   },
mounted() {
   
  },
  methods: {
       // 给活动状态添加样式
    cellClassName({ row, column }) {
      if (column.title === '标题') {
        return 'cell-click'
      }


    },
  async  shows(){

      await  this.getdiscusslists()
      await  this.getnumerinfo()
      await  this.getcourse()
    },
    //获取完成数量
    async  getnumerinfo(){
              let data11 =  JSON.parse(window.localStorage.getItem('activitiesids')) 
        const  res  =await isfinishsend(data11.activityId)
       if(res.code==200){
          this.hasfinished= Number(res.data.topicCount)
          this.required= Number(res.data.topicRequire)

       }else{

       }
      },
      changedateinfo(){
        this.tablePage={
          total: 0,
          currentPage: 1,
          pageSize: 10
        },
        this.getdiscusslists()
        this.getcourse()
      },
    //发帖前验证
  async  sendinfo11(){
              let data11 =  JSON.parse(window.localStorage.getItem('activitiesids')) 
      const  res  =await isfinishsend(data11.activityId)
     if(res.code==200){

         if(res.data.topicEndFlag==true){
             this.$refs.diolginfos.shows()
         }else{
          this.$message({
            showClose: true,
            message:"已截止发帖",
            type: 'error'
          })
         }
     }else{
     }
    },
    // 获取研讨列表
    async  getdiscusslists() {
         let data11 =  JSON.parse(window.localStorage.getItem('activitiesids')) 
      let data = {
        courseCategoryId:this.kid,
        pageSize:this.tablePage.pageSize,
        pageNum:this.tablePage.currentPage,
        keyword:this.filterName1,
        activityId:data11.activityId,
      }
      const res = await discusstablelist(data)
      if(res.code==200){
        this.tablePage.total=Number(res.data.total)
         this.tableData=[]
         this.tableData=res.data.list.map((el)=>{
             return {
                  ...el,
                  replays:el.readCount+"/"+el.replayCount,
                  athuor: el.createUserName?el.createUserName+"("+el.createUserSchoolName+")":"暂无"
             }
         })

      }
    },
 async   getcourse(){
     let data11 =  JSON.parse(window.localStorage.getItem('activitiesids')) 
      const  res  =await coursecategory(data11.activityId)
      if(res.code==200){
        let  datas= JSON.stringify(res.data)
        window.localStorage.setItem('courselist',datas)
         this.fenleilist=[]
         this.fenleilist=res.data
         this.infos=this.fenleilist[0]?.name
         this.kid=this.fenleilist[0]?.id
         this.childlist=[]
         this.childlist=res.data
         this.getdiscusslists()
      }
    },
    pageChange11(e) {
      this.tablePage.currentPage = e.currentPage
      this.tablePage.pageSize = e.pageSize
      this.getdiscusslists()
    },
    studyClick() {
      this.$router.push({
        path: '/tz-myTraining/project/components/viewClassDetails'
      })
    },
    searchEvent(){

       this.tablePage={
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      this.getdiscusslists()
    },
    chosedata(e){
      this.kid=e
      this.getdiscusslists()
    },
    onChange({ row, column }){
     
          let data11 =  JSON.parse(window.localStorage.getItem('activitiesids')) 
          window.sessionStorage.setItem('actId',data11.activityId)
        this.$router.push({
          path: `/tz-municipal/release/components/seminarDetails?id=${row.topicId}`
        })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-descriptions {
  padding-left: 75px;
}
::v-deep .el-form {
  margin-bottom: 0;
  .el-form-item {
    margin-bottom: 8px;
  }
}
.redLabel {
  display: inline-block;
  margin-right: 3px;
  padding: 0 5px;
  background-color: #f56c6c;
  border-radius: 3px;
  font-size: 12px;
  color: #fff;
  line-height: 16px;
}
::v-deep .vxe-pager {
  padding-top: 10px;
  .vxe-pager--left-wrapper {
    float: left;
    margin: 0;
  }
}
::v-deep .vxe-toolbar {
  margin-bottom: 8px;
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
      content: "";
      border-top: 1px solid #dcdfe6;
    }
  }
  .el-dialog__body {
    flex: 1;
    overflow: auto;
    .el-form {
      margin-bottom: 36px;
      .el-form-item {
        margin-bottom: 22px;
      }
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
      content: "";
      border-top: 1px solid #dcdfe6;
    }
    div {
      display: inline-block;
    }
    .el-button + .el-button {
      margin-left: 24px;
    }
  }
  
  // .cell-click {
  //     color: #409eff;
  //     cursor: pointer;
  //   }


}
</style>
