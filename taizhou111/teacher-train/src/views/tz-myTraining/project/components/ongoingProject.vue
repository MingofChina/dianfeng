<template>
  <div>
    <div class="projectLists" v-if="tableData.length!=0">
      <div v-for="(item,index) in tableData"
  
           :key="item.id"
           class="projectList">
        <div class="num">{{index+1}}</div>
        <div class="con">
          <h3 class="conTitle">{{ item.activityName }}</h3>
          <el-descriptions class="margin-top"
                           :column="2">
            <template slot="extra">
              <el-button type="primary"
                         icon="el-icon-caret-right"
                         size="small"
                         @click="conTitleClick(item.id)">进入学习</el-button>
            <!--  <el-button type="primary"
                         icon="el-icon-caret-right"
                         size="small">学习档案</el-button> -->
            </template>
            <el-descriptions-item :span="2">
              <template slot="label">培训通知</template>
              <a :href=" baseURL11+'/upload/'+item.trainingDesignPath" >{{ item.trainingDesignName }}</a>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">起止时间</template>
              {{ item.startTime }}---{{ item.finishTime }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">培训学时</template>
              {{ item.classHours }}
            </el-descriptions-item>
            <!-- <el-descriptions-item :span="2">
              <template slot="label">我的学习</template>
              <el-descriptions class="conDes"
                               :column="4">
                <el-descriptions-item label="视频课程">(考核要求:{{item.requireDuration}}分钟,已完成{{item.studyDuration}}分钟)</el-descriptions-item>
               
              </el-descriptions>
            </el-descriptions-item> -->
             <!-- <el-descriptions-item label="研讨">3 / 5</el-descriptions-item>
                <el-descriptions-item label="作业">3 / 5</el-descriptions-item>
                <el-descriptions-item label="测评">3 / 5</el-descriptions-item> -->
          </el-descriptions>
        </div>
      </div>

      <!--   <div class="projectList">
        <div class="num">02</div>
        <div class="con">
          <h3 class="conTitle" @click="conTitleClick">2022年泰州市“泰州师说”全员培训活动</h3>
          <el-descriptions class="margin-top" :column="2">
            <template slot="extra">
              <el-button type="primary" icon="el-icon-caret-right" size="small" @click="conTitleClick">进入学习</el-button>
              <el-button type="primary" icon="el-icon-caret-right" size="small">学习档案</el-button>
            </template>
            <el-descriptions-item :span="2">
              <template slot="label">培训通知</template>
              <a href="">市教育局关于组织开展2021年《泰州师说》全员培训活动的通知0706</a>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">起止时间</template>
              2021.05.01-2021.07.31
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">培训学时</template>
              20
            </el-descriptions-item>
            <el-descriptions-item :span="2">
              <template slot="label">我的学习</template>
              <el-descriptions class="conDes" :column="4">
                <el-descriptions-item label="视频课程">162 / 1200</el-descriptions-item>
                <el-descriptions-item label="研讨">3 / 5</el-descriptions-item>
                <el-descriptions-item label="作业">3 / 5</el-descriptions-item>
                <el-descriptions-item label="测评">3 / 5</el-descriptions-item>
              </el-descriptions>
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </div> -->
    </div>
     <div  v-else="tableData.length==0?true:false">您暂未报名培训项目，可联系学校管理员报名！</div>
    <div class="page">
      <vxe-pager :current-page="form.pageNum"
                 :page-size="form.pageSize"
                 :total="total"
                 @page-change="pageChange" />
      </vxe-pager>
    </div>

    <el-dialog title="请选择学段"
               :show-close="true"
               width="50%"
               :center="true"
               :visible.sync="dialogTableVisible"
                @close="closediolg"
               >
      <div style="display:flex;justify-content: center;">
        <el-radio-group v-for="(item,index) in Learningperiodlist "
                        :key="item.id"
                        v-model="radio_1"
                        size="small"
                        @change="choselearngperion(item.id)">
          <el-radio-button :label="item.dictName" />
        </el-radio-group>

      </div>
      <div
           style="display: flex;justify-content: center;margin-top: 30px;">
        <el-button type="primary"
                   style="display: flex;justify-content: center;"
                   @click="sureinfo">确定</el-button>
      </div>
    </el-dialog>
          <el-dialog
  title="温馨提示"
  :visible.sync="centerDialogVisible"
  width="30%"
  center>
  <span style="text-align:center!important">确定要选择当前学段吗?</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="surego">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>

import { getpracticelist,datalist, editusersectioninfo, getsecbindsections } from '../../../../api/mypractice.js'
import {baseURL11} from "../../../../utils/request.js"
export default {
  name: 'OngoingProject',
  data () {
    return {
      loading:false,
      centerDialogVisible:false,
      baseURL11:"",
      ACid:"",
      activeName: 'first',
      dialogTableVisible: false,
      Learningperiodlist: [],
      radio_1: '',
      ids: '',
      form: {
        pageNum: 1,
        pageSize: 10,
        finished:0
      },
      total: 0,
      tableData: []
    }
  },
  filters:{
  studyDurationss(e){




  }
  },
 async mounted () {
   this.baseURL11=baseURL11
    await this.getTableList()
    // await this.getsections()
    await this.open()
  },
  methods: {
  async  surego(){
          let userActivitySectionParam ={
           activityId:this.ACid,
           sectionId:this.ids
      }
      const res = await editusersectioninfo(userActivitySectionParam)
      if (res.code == 200) {
        this.dialogTableVisible = false
       let  datas = {
          activityId:this.ACid,
          ids:this.ids
        }
        let  a =  JSON.stringify(datas)
       window.localStorage.setItem('activitiesids',a)
       this.dialogTableVisible=false
       this.ids=""
       this.ACid=""
       this.radio_1=""
      this.$router.push({
        path: '/tz-myTraining/project/components/projectHome'
      })
      }

    },
    // 获取学员是否绑定信息
    async getsections () {
       let activityId=this.ACid
      const res = await getsecbindsections(activityId)
      if (res.code == 200) {
        let data1 =res.data?.sectionId
         if(data1){
       let  datas = {
          activityId:this.ACid,
          ids:res.data.sectionId
        }
        let  a =  JSON.stringify(datas)
        window.localStorage.setItem('activitiesids',a)
          this.$router.push({
          path: '/tz-myTraining/project/components/projectHome'} )
         }else{

         this.ids =""
         this.dialogTableVisible=true

         }
        // if (res.data!=null) {
        //   this.Learningperiodlist.map((el)=>{
        //        if(el.id==res.data.sectionId){
        //          this.radio_1 = el.dictName
        //          this.ids =el.id
        //        }
        //   })
        //   // this.ids = res.data.sectionId
        //   this.dialogTableVisible=true
        // }else{
        //   this.ids =""
        //   this.dialogTableVisible=true
        // }
      }

    },
    closediolg(){
     this.ids=""
     this.ACid=""
       this.radio_1=""
    },
    //下载文档
    uploaddoc(e){


      let path =baseURL11+"/upload/"+e

    },
    async choselearngperion (e) {

      this.ids = e
      // let userActivitySectionParam ={
      //      activityId:this.ACid,
      //      sectionId:this.ids
      // }
      // const res = await editusersectioninfo(userActivitySectionParam)
      // if (res.code == 200) {
      //   this.dialogTableVisible = false
      //   let  datas = {
      //     activityId:this.ACid,
      //     ids:this.ids
      //   }
      //   let  a =  JSON.stringify(datas)
      //    window.localStorage.setItem('activitiesids',a)
        // this.$router.push({
        //   path: '/tz-myTraining/project/components/projectHome'} )
    // }
    },
  sureinfo(){
        if(!this.ids){
            this.$message({
            showClose: true,
            message: "请先选择选段",
            type: 'error'
          })
          return
        }
        this.centerDialogVisible=true
    },
    async open () {
      this.form = {
        category: 1,
        createTime: '',
        delFlag: '',
        dictName: '',
        id: '',
        pid: '',
        refId: '',
        updateTime: '',
        includeAll: true
      }
      const res = await datalist(this.form)
      if (res.code == 200) {
          
        this.Learningperiodlist = []
        const data = res.data.map((el) => {
          if (el.id) {
            this.Learningperiodlist.push(el)
          }
        })
      }
      if (this.ids) {
        this.Learningperiodlist.map((el) => {
          if (el.id == this.ids) {
            this.radio_1 = el.dictName
          }
        })
      }
    },
    // 页码改变时
    pageChange (e) {
      this.form.pageNum = e.currentPage
      this.form.pageSize = e.pageSize
      this.getTableList()
    },
    // 获取列表信息
    async getTableList () {
      const data = this.form
      const res = await getpracticelist(data)
      // getpracticelist(this.form).then(res => {
            // console.log(res,777777777)
        
  const loading = this.$loading({
          lock: true,
          text: '数据加载中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });




        if (res.code == 200) {
          this.tableData = []
          this.total = Number(res.data.total)
            // var newDate=/\d{4}-\d{1,2}-\d{1,2}/g.exec(date)
      
          this.tableData = res.data.list.map((el)=>{
               let data =el.startTime
               var newDate=/\d{4}-\d{1,2}-\d{1,2}/g.exec(data)
               let data1 =el.finishTime
                 var newDatefinsh=/\d{4}-\d{1,2}-\d{1,2}/g.exec(data1)

                 let  data22 =el.studyDuration
                    
   let theTime = parseInt(data22)// 秒
              let middle = 0// 分
              let hour = 0// 小时
              if (theTime >= 60) {
                middle = parseInt(theTime / 60)
                theTime = parseInt(theTime % 60)
                if (middle >= 60) {
                  hour = parseInt(middle / 60)
                  middle = parseInt(middle % 60)
                }
              }
              let result = '' + parseInt(theTime) + '秒'
              if (middle > 0) {
                result = '' + parseInt(middle) + '分' + result
              }
              if (hour > 0) {
                result = '' + parseInt(hour) + '小时' + result
              }


               return {
                   ...el,
                  //  studyDuration:el.studyDuration==null?0:el.studyDuration
                   startTime:newDate[0],
                   finishTime:newDatefinsh[0],
                 studyDuration: parseInt(el.studyDuration/60)
               }
          })

      //  this.tableData=this.tableData.map((el)=>{
      //         let theTime = parseInt(el.studyDuration)// 秒
      //         let middle = 0// 分
      //         let hour = 0// 小时
      //         if (theTime >= 60) {
      //           middle = parseInt(theTime / 60)
      //           theTime = parseInt(theTime % 60)
      //           if (middle >= 60) {
      //             hour = parseInt(middle / 60)
      //             middle = parseInt(middle % 60)
      //           }
      //         }
      //         let result = '' + parseInt(theTime) + '秒'
      //         if (middle > 0) {
      //           result = '' + parseInt(middle) + '分' + result
      //         }
      //         if (hour > 0) {
      //           result = '' + parseInt(hour) + '小时' + result
      //         }

      //        let theTime1 = parseInt(el.totalDuration)// 秒
      //         let middle1 = 0// 分
      //         let hour1 = 0// 小时
      //         if (theTime1 >= 60) {
      //           middle1 = parseInt(theTime1 / 60)
      //           theTime1 = parseInt(theTime1 % 60)
      //           if (middle1 >= 60) {
      //             hour1 = parseInt(middle1 / 60)
      //             middle1 = parseInt(middle1 % 60)
      //           }
      //         }
      //         let result1 = '' + parseInt(theTime1) + '秒'
      //         if (middle1 > 0) {
      //           result1 = '' + parseInt(middle1) + '分' + result1
      //         }
      //         if (hour1 > 0) {
      //           result1 = '' + parseInt(hour1) + '小时' + result1
      //         }
         
      //         return {
      //             ...el,
      //             studyDuration:result,
      //             totalDuration:result1,
      //         }


    loading.close();
      //    })

        } else {
            loading.close();
          this.$message({
            showClose: true,
            message: res.message,
            type: 'error'
          })
        }
      // })
    },
    conTitleClick (id) {
      this.ACid=id
      this.getsections()
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
.buttonItem {
  position: relative;
  text-align: center;
  margin-top: 36px;
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
.projectList {
  position: relative;
  padding: 0 0 20px 108px;
  .conTitle {
    position: absolute;
    top: 0;
    left: 108px;
    right: 250px;
    margin: 0;
    line-height: 32px;
    &:hover {
      color: #409eff;
      cursor: pointer;
    }
  }
  .num {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 72px;
    font-weight: bolder;
    color: #67c23a;
  }
  ::v-deep .el-descriptions {
    a {
      cursor: pointer;
      color: #409eff;
    }
    .el-descriptions__header {
      .el-descriptions__title {
        font-size: 18px;
      }
    }
    .el-descriptions__body {
      .el-descriptions-item {
        padding-top: 10px;
        border-top: 1px dashed #dcdfe6;
      }
    }
    .conDes {
      .el-descriptions-item {
        padding-top: 0;
        border-top: 0;
      }
    }
  }
  & + .projectList {
    padding-top: 20px;
    border-top: 1px solid #dcdfe6;
    .conTitle {
      top: 20px;
    }
    .num {
      top: 20px;
    }
  }
}
.page {
  text-align: center;
}

::v-deep .el-dialog--center .el-dialog__body {
    text-align: center!important;
   
}
</style>
