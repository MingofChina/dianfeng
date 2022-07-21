<template>
  <el-card class="box-card">
    <div class="proHomeHeader">
      <el-image
        style="width: 240px; height: 180px"
        :src="courseCover"
        fit="cover"
      />

      <h3 class="proHomeTitle">{{ activityName }}</h3>
      <el-card shadow="always">
        <h4>进行中</h4>
        <p>距离结束还剩<span>{{ timer }}</span>天</p>
      </el-card>
      <el-descriptions
        ref="itemCon"
        column="1">
        <el-descriptions-item label="起止时间">{{ startTime }}-{{ finishTime }}</el-descriptions-item>
       <!-- <el-descriptions-item label="看课时长要求">{{requireDuration}}</el-descriptions-item> -->
        <!-- <el-descriptions-item
          :span="1"
        >
        </el-descriptions-item> -->
        <el-descriptions-item
          label="培训说明"
          :span="1"
          content-class-name="itemCon"
          :content-style="{'height': itemHight}"
        >
          {{ introductions }}
          <div
            ref="gradient"
            class="gradient"
            :style="{'background': itemBackground}"
          />
        </el-descriptions-item>
      </el-descriptions>
      <el-button
        class="detailsBtn"
        type="primary"
        size="mini"
        plain
        @click="detailsClick"
      >
        {{ showregion ? "收起说明" : "展开说明" }}
      </el-button>
    </div>

    <el-tabs v-model="activeName" @tab-click="check">
      <el-tab-pane
        label="项目首页"
        name="first"
      >
        <el-container>
          <el-main>
            <div class="tz-row">
              <h4 class="rowTitle">
                <i class="fa fa-tags" aria-hidden="true"/>培训方案</h4>
              <ul class="rowLists">
                <a :href=" baseURL11+'/upload/'+trainingDesignPath"   style="color: deepskyblue;"><span style="color: deepskyblue;">【方案】</span>{{ names }}</a>
              </ul>
            </div>

            <div class="tz-row">
              <h4 class="rowTitle"><i
                class="fa fa-tags"
                aria-hidden="true"
              />课程学习</h4>
              <el-descriptions :column="4">
                <el-descriptions-item label="考核要求">{{ requiretimes }}</el-descriptions-item>
                <!-- {{ hasfinsheds }} -->
                <el-descriptions-item label="已完成"><div  style="color:red">正在更换统计方法,稍后上线,请先确保所选学段课程全部看完</div></el-descriptions-item>
              </el-descriptions>
              <div class="rowProgress">
                <!-- <el-progress
                  :text-inside="true"
                  :stroke-width="18"
                  :percentage="percentage"
                  status="success"
                /> -->
                <el-button
                  type="primary"
                  size="small"
                  round
                  @click="gotostudy"
                >查 看</el-button>
              </div>
            </div>

            <div class="tz-row">
              <h4 class="rowTitle"><i
                class="fa fa-tags"
                aria-hidden="true"
              />讨论</h4>
              <el-descriptions :column="4">
                <el-descriptions-item label="考核要求">{{ requiretime }}</el-descriptions-item>
                <el-descriptions-item label="已完成">{{ hasfinshed }}</el-descriptions-item>
              </el-descriptions>
              <div class="rowProgress">
                <el-progress
                  :text-inside="true"
                  :stroke-width="18"
                  :percentage="percentages"
                  status="success"
                />
                <el-button
                  type="primary"
                  size="small"
                  round
                  @click="gotodiscuss"
                >查 看</el-button>
              </div>
            </div>

            <!--    <div class="tz-row">
              <h4 class="rowTitle"><i class="fa fa-tags"
                   aria-hidden="true" />作业</h4>
              <el-descriptions :column="4">
                <el-descriptions-item label="考核要求">2个作业</el-descriptions-item>
                <el-descriptions-item label="已完成">1个</el-descriptions-item>
              </el-descriptions>
              <div class="rowProgress">
                <el-progress :text-inside="true"
                             :stroke-width="18"
                             :percentage="72"
                             status="success" />
                <el-button type="primary"
                           size="small"
                           round>查 看</el-button>
              </div>
            </div> -->

               <div class="tz-row">
              <h4 class="rowTitle"><i class="fa fa-tags"
                   aria-hidden="true" />考试</h4>
              <el-descriptions :column="4">
                <el-descriptions-item label="考核要求"
                                     >1</el-descriptions-item>
                <el-descriptions-item label="已完成">0</el-descriptions-item>
              </el-descriptions>
                <div class="rowProgress">
                <el-progress
                  :text-inside="true"
                  :stroke-width="18"
                  percentage=0
                  status="success"
                />
                <el-button
                  type="primary"
                  size="small"
                  round
                  @click="gohomework"
                >查 看</el-button>
              </div>
            </div>
          </el-main>

          <el-aside width="300px">
            <!--    <div class="tz-row">
              <h4 class="rowTitle"><i class="fa fa-tags"
                   aria-hidden="true" />学习动态</h4>
              <ul class="rowLists one">
                <li>张三看完教师的一年一月张三看完教师的一年一月</li>
                <li>张三看完教师的一年一月张三看完教师的一年一月</li>
                <li>张三看完教师的一年一月张三看完教师的一年一月</li>
              </ul>
            </div> -->

            <div class="tz-row">
              <h4 class="rowTitle"><i
                class="fa fa-tags"
                aria-hidden="true"
              />讨论</h4>
              <el-descriptions
                class="main"
                :column="1"
                direction="vertical"
              >
                <el-descriptions-item v-for="(item,index) in discusslist " :key="item.topicId">
                  <template slot="label">
                    <i class="el-icon-document-copy"/>
                    <span  style="color:#409EFF;cursor: pointer;" @click="godiscuss(item.topicId)">{{ item.topicTitle }}</span> 
                  </template>
                  <el-descriptions
                    class="con"
                    :column="2"
                  >
                    <el-descriptions-item label="发表人">{{ item.createUserName?item.createUserName:"暂无" }}</el-descriptions-item>
                    <el-descriptions-item label="发表时间">{{ item.createTime }}</el-descriptions-item>
                  </el-descriptions>
                </el-descriptions-item>
                <!--   <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-document-copy" />
                    青春期学生有哪些变化
                  </template>
                  <el-descriptions class="con"
                                   :column="2">
                    <el-descriptions-item label="发表人">张三</el-descriptions-item>
                    <el-descriptions-item label="发表时间">2020-10-11</el-descriptions-item>
                  </el-descriptions>
                </el-descriptions-item> -->
                <!--     <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-document-copy" />
                    青春期学生有哪些变化
                  </template>
                  <el-descriptions class="con"
                                   :column="2">
                    <el-descriptions-item label="发表人">张三</el-descriptions-item>
                    <el-descriptions-item label="发表时间">2020-10-11</el-descriptions-item>
                  </el-descriptions>
                </el-descriptions-item> -->
              </el-descriptions>
            </div>

            <!--   <div class="tz-row">
              <h4 class="rowTitle"><i class="fa fa-tags"
                   aria-hidden="true" />作业</h4>
              <ul class="rowLists one">
                <li>张三看完教师的一年一月张三看完教师的一年一月</li>
                <li>张三看完教师的一年一月张三看完教师的一年一月</li>
                <li>张三看完教师的一年一月张三看完教师的一年一月</li>
              </ul>
            </div> -->
          </el-aside>
        </el-container>
      </el-tab-pane>
      <el-tab-pane
        label="课程学习"
        name="second"
      >
        <courseStudy   ref="studycourse11"/>
      </el-tab-pane>
      <el-tab-pane
        label="讨论"
        name="third"
      >
        <discuss   ref="show"/>
      </el-tab-pane>
     <!-- <el-tab-pane
        label="作业"
        name="fourth"
      /> -->
       <el-tab-pane
        label="考试"
        name="fiveth">
       <test></test>
       </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import courseStudy from './courseStudy.vue'
import discuss from './discuss.vue'
import test from './test.vue'
import { getheaderinfo, practicedetail, latestinfo, mystudyinfo, finshinfo } from '../../../../api/mypractice.js'
import {baseURL11} from "../../../../utils/request.js"
export default {
  name: 'SeminarDetails',
  components:{
    courseStudy,
    discuss,
    test,
  },
  data() {
    return {
      baseURL11:"",
      discusslist: [],
      percentage: 0,
      requireDuration:"",
      trainingDesignPath:"",
      percentages: 0,
      requiretimes: '',
      names:"",
      hasfinsheds: '',
      requiretime: '',
      hasfinshed: '',
      activityName: '',
      startTime: '',
      finishTime: '',
      courseCover:'',
      activeName: 'first',
      showregion: false,
      itemHight: '86px',
      itemBackground: 'linear-gradient(rgba(255,255,255,0), rgba(255,255,255,1))',
      // url: '/plaImage.jpeg',
      activityName: '',
      introductions: ''
    }
  },
  computed: {
    timer() {
      const data = new Date()
      const sDate = Date.parse(data)
      const eDate = Date.parse(this.finishTime)
      if (sDate > eDate) return 0 // 开始日期大于结束日期，返回0
      if (sDate === eDate) return 1 // 如果日期相同 返回一天
      return parseInt((eDate - sDate) / (1 * 24 * 60 * 60 * 1000))
    }
  },
  mounted() {
    this.baseURL11=baseURL11
    this.getheadinfo()
    this.getdetail()
    this.getnewinfo()
    // this.getstudyinfo()
    this.getfinshinfo()
  },
  methods: {
  
    check(e){
     if(e.index==2){
     this.$refs.show.shows()
     }
     if(e.index==1){
     this.$refs.studycourse11.showsubject()

     }
    },
    godiscuss(e){
         let data11 =  JSON.parse(window.localStorage.getItem('activitiesids')) 
     window.sessionStorage.setItem('actId',data11.activityId)
      this.$router.push({
          path: `/tz-municipal/release/components/seminarDetails?id=${e}`
        })
    },
    // 讨论完成情况信息
    async getfinshinfo() {
       let data11 =  JSON.parse(window.localStorage.getItem('activitiesids')) 
      window.localStorage.setItem('activityIds', data11.activityId)
      const res = await finshinfo(data11.activityId)
      if (res.code == 200) {

  
        this.hasfinshed = res.data.topicProgressResult.topicCount
        this.requiretime = res.data.topicProgressResult.topicRequire
        this.percentages = Number(res.data.topicProgressResult.progress)

          this.hasfinsheds = res.data.studyInfoResult.studyDuration
        
          if (this.hasfinsheds) {
          let theTime = parseInt(this.hasfinsheds)// 秒
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
          this.hasfinsheds = ''
          this.hasfinsheds = result
        } else {
          this.hasfinsheds = res.data.studyInfoResult.studyDuration ? res.data.studyInfoResult.studyDuration : 0 + '分钟'
        }


        this.requiretimes = res.data.studyInfoResult.requireDuration ? res.data.studyInfoResult.requireDuration +"分钟" : 0 + '分钟'
      

        this.percentage = Number(res.data.studyInfoResult.progress)



      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    // 获取我的学习课程信息
    async getstudyinfo() {
       let data11 =  JSON.parse(window.localStorage.getItem('activitiesids')) 
      const activityId = data11.activityId
      const res = await mystudyinfo(activityId)
      if (res.code == 200) {
       console.log(res,3333)
        this.hasfinsheds = res.data.studyDuration
        
          if (this.hasfinsheds) {
          let theTime = parseInt(this.hasfinsheds)// 秒
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
          this.hasfinsheds = ''
          this.hasfinsheds = result
        } else {
          this.hasfinsheds = res.data.studyDuration ? res.data.studyDuration : 0 + '分钟'
        }


         
   
        this.requiretimes = res.data.requireDuration ? res.data.requireDuration +"分钟" : 0 + '分钟'
      

        this.percentage = Number(res.data.progress)
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    // 获取讨论最新列表
    async   getnewinfo() {
       let data11 =  JSON.parse(window.localStorage.getItem('activitiesids')) 
      const data = {
        activityId:data11.activityId,
        limit: 3
      }
      const res = await latestinfo(data)
      if (res.code == 200) {
        this.discusslist = []
        this.discusslist = res.data
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    // 获取简介
    async getdetail() {
        let data11 =  JSON.parse(window.localStorage.getItem('activitiesids')) 
      const activityId =data11.activityId
      const res = await practicedetail(activityId)
      if (res.code == 200) {
        this.introductions = res.data.introduction
      }
    },
    // 获取头部信息
    async getheadinfo() {
           let data11 =  JSON.parse(window.localStorage.getItem('activitiesids')) 
      const res = await getheaderinfo(data11.activityId)
      if (res.code == 200) {
       this.requireDuration=res.data.requireDuration+"分钟"
      this.trainingDesignPath=res.data.trainingDesignPath
      this.courseCover=res.data.courseCoverPath?res.data.courseCoverPath:'/plaImage.jpeg'
      this.courseCover=this.baseURL11+'/upload/'+res.data.courseCoverPath
     var theTime = res.data.requireDuration //时间戳(秒)
     var minute= 0; // 分
     var hour = 0;//小时
     if(theTime > 60){
       minute= parseInt(theTime / 60);
       theTime = parseInt(theTime % 60);
       if(minute> 60){
         hour = parseInt(minute/ 60);
         middle = parseInt(minute% 60);
       }
     }
     var result= "" + parseInt(theTime) + "秒"
     if(minute> 0){
       result= "" + parseInt(minute) + "分" + result;
     }
     if(hour > 0){
       result= "" + parseInt(hour) + "小时" + result;
     }
        this.activityName = res.data.activityName
        this.names= res.data.trainingDesignName
      //  this.requireDuration=result+"分钟"
      var date = res.data.startTime
      var newDate=/\d{4}-\d{1,2}-\d{1,2}/g.exec(date)
       this.startTime=newDate[0]
      let  date2= res.data.finishTime
      var newDate1=/\d{4}-\d{1,2}-\d{1,2}/g.exec(date2)
        this.finishTime = newDate1[0]
      }
    },
    detailsClick() {
      this.showregion = !this.showregion
      if (this.showregion) {
        this.itemHight = 'auto'
        this.$refs.gradient.style.background = 'transparent'
      } else {
        this.itemHight = '86px'
        this.$refs.gradient.style.background = 'linear-gradient(rgba(255,255,255,0), rgba(255,255,255,1))'
      }
    },
    gotodiscuss(){
        
        this.$refs.show.shows()
        this.activeName="third"
    },
    gohomework(){

   this.activeName="fiveth"
    },
    gotostudy(){
    
      this.$refs.studycourse11.showsubject()
         this.activeName="second"
    },
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
.proHomeHeader {
  position: relative;
  padding-left: 264px;
  min-height: 190px;
  .el-image {
    position: absolute;
    top: 0;
    left: 0;
  }
  .proHomeTitle {
    margin: 0 0 40px;
    padding-right: 200px;
  }
  ::v-deep .el-card.is-always-shadow {
    display: inline-block;
    position: absolute;
    top: -20px;
    right: 0;
    padding: 16px;
    border-radius: 0 0 24px 24px;
    text-align: center;
    background: rgb(225, 243, 216);
    .el-card__body {
      padding: 0;
    }
    h4 {
      margin: 0 0 8px;
      color: #67c23a;
    }
    p {
      margin: 0;
      font-size: 14px;
      color: #606266;
      span {
        margin: 0 6px;
        font-weight: bold;
        color: #67c23a;
      }
    }
  }
  ::v-deep .el-descriptions-item__content.itemCon {
    position: relative;
    overflow: hidden;
    .gradient {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 50px;
    }
  }
  .detailsBtn {
    position: absolute;
    bottom: -28px;
    right: 0;
    z-index: 10;
  }
}
::v-deep .el-container {
  .el-main {
    padding: 0 24px 0 0;
  }
  .el-aside {
    padding: 0 0 0 24px;
    border-left: 1px solid #dcdfe6;
    background-color: #fff;
  }
}
.tz-row {
  & + .tz-row {
    margin-top: 24px;
  }
  .rowTitle {
    margin: 10px 0;
    line-height: 1.15;
    .fa {
      margin-right: 12px;
      color: #67c23a;
    }
  }
  .rowLists {
    font-size: 14px;
    li {
      padding: 12px 0;
      border-bottom: 1px dashed #dcdfe6;
      line-height: 1.15;
    }
    &.one li {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .rowProgress {
    position: relative;
    padding: 7px 200px 7px 0;
    .el-button {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
  ::v-deep .main.el-descriptions {
    margin-bottom: -12px;
    .el-descriptions--medium:not(.is-bordered) .el-descriptions-item__cell {
      padding-bottom: 2px;
    }
    .el-icon-document-copy {
      color: #e6a23c;
    }
    .con {
      margin-bottom: 12px;
      font-size: 12px;
      color: #c0c4cc;
    }
  }
}
</style>
