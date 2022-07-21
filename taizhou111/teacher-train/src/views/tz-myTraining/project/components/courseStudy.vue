<template>
  <el-tabs v-model="activeName"
           type="card"
           @tab-click="handleClick">
    <el-tab-pane label="所有课程"
                 name="2">
      <!--      <el-descriptions :column="6">
        <el-descriptions-item label="要求">1200分钟</el-descriptions-item>
        <el-descriptions-item label="已学完">650分钟</el-descriptions-item>
      </el-descriptions> -->
      <el-form ref="form"
               :model="form"
               label-width="75px"
               label-position="left">
        <el-form-item label="学段:">
          <el-radio-group v-for="(item,index) in Learningperiodlist "
                          :key="item.id"
                          v-model="radio_1"
                          size="small"
                          @change="choselearngperion(item.dictName)">
            <!--     :style="{background:radio_1===item.id?'red':'blue'}" -->
            <el-radio-button :label="item.dictName" />
            <!--      <el-radio-button label="全部" />
            <el-radio-button label="学前" />
            <el-radio-button label="小学" />
            <el-radio-button label="初中" />
            <el-radio-button label="高中" />
            <el-radio-button label="中职" />
            <el-radio-button label="通用" /> -->
          </el-radio-group>
        </el-form-item>
        <el-form-item label="学科:">
          <el-radio-group v-for="(item,index) in subjectlist "
                          :key="item.id"
                          v-model="radio_2"
                          size="small"
                          @change="choselearngperion1(item.dictName)">
            <el-radio-button :label="item.dictName" />
            <!--  <el-radio-button label="全部" />
            <el-radio-button label="幼儿教育" />
            <el-radio-button label="语文" />
            <el-radio-button label="数学" />
            <el-radio-button label="英语" />
            <el-radio-button label="物理" />
            <el-radio-button label="化学" />
            <el-radio-button label="生物" />
            <el-radio-button label="历史" />
            <el-radio-button label="地理" />
            <el-radio-button label="政治" />
            <el-radio-button label="体育" />
            <el-radio-button label="心理" />
            <el-radio-button label="信息技术" /> -->
          </el-radio-group>
        </el-form-item>
           <el-form-item label="课程分类:">
          <el-radio-group v-model="radio_3"
                          size="small"
                          v-for="(item,index) in ordercourse "
                          :key="item.id"
                            @change="chosecoursed(item.name)"
                          >
                   <el-radio-button :label="item.name" />
         <!--   <el-radio-button label="全部" />
            <el-radio-button label="全面培养与学生评价" />
            <el-radio-button label="学校治理与学校评价" />
            <el-radio-button label="政府履职与用人评价" />
            <el-radio-button label="教师素养与教师评价" />
            <el-radio-button label="教育改革形势任务" />
            <el-radio-button label="教育评价改革政策与理论" /> -->
          </el-radio-group>
        </el-form-item>

        
      </el-form>

      <vxe-table ref="sGrid"
                 border
                 stripe
                 header-align="center"
                 show-header-overflow
                 show-overflow
                 :row-config="{isHover: true}"
                 :data="tableData"
                 :edit-config="{trigger: 'manual', mode: 'row'}"
                 :checkbox-config="{highlight: true}">
        <vxe-column type="checkbox"
                    width="40"
                    align="center" />
        <vxe-column field="resourceTitle"
                    title="课程标题"
                    width="300">
          <template #default="{ row }">
            <span class="redLabel" v-if="row.progress==0?true:false" >New</span>
            <span>{{ row.resourceTitle }}</span>
          </template>
        </vxe-column>
        <vxe-column field="videoDuration"
                    title="时长"
                    align="center" />
        <vxe-column field="sectionNames"
                    title="学段"
                    align="center" />
        <vxe-column field="subjectNames"
                    title="学科"
                    align="center" />
        <vxe-column field="progress"
                    title="学习进度"
                    align="center"
                    width="300">
          <template #default="{ row }">
            <el-progress :percentage="row.progress"
                         color="#67C23A" />
          </template>
        </vxe-column>
        <vxe-column title="操作"
                    align="center">
          <template #default="{ row }">
            <vxe-button status="primary"
                        size="medium"
                        icon="fa fa-play"
                        content="学习"
                        @click="studyClick(row)" />
          </template>
        </vxe-column>
      </vxe-table>

      <vxe-pager :current-page="forms.pageNum"
                 :page-size="forms.pageSize"
                 :total="total"
                 @page-change="pageChange">
        <!--     <template #left>
          <span class="page-left">
            <el-button
              type="primary"
              size="small"
              <
              el-button
            /></span>

        </template> -->
      </vxe-pager>
    </el-tab-pane>

    <el-tab-pane label="未学完的课程"
                 name="0">
      <!--   <el-descriptions :column="6">
        <el-descriptions-item label="要求">1200分钟</el-descriptions-item>
        <el-descriptions-item label="已学完">650分钟</el-descriptions-item>
      </el-descriptions> -->

      <vxe-table ref="sGrid"
                 border
                 stripe
                 header-align="center"
                 show-header-overflow
                 show-overflow
                 :row-config="{isHover: true}"
                 :data="tableData_1"
                 :edit-config="{trigger: 'manual', mode: 'row'}"
                 :checkbox-config="{highlight: true}">
        <vxe-column field="resourceTitle"
                    title="课程标题"
                    width="300">
          <template #default="{ row }">
      <span class="redLabel" v-if="row.progress==0?true:false" >New</span>
            <span>{{ row.resourceTitle }}</span>
          </template>
        </vxe-column>
        <vxe-column field="videoDuration"
                    title="时长"
                    align="center" />
        <vxe-column field="sectionNames"
                    title="学段"
                    align="center" />
        <vxe-column field="subjectNames"
                    title="学科"
                    align="center" />
        <vxe-column field="progress"
                    title="学习进度"
                    align="center"
                    width="300">
          <template #default="{ row }">
            <el-progress :percentage="Number(row.progress)"
                         color="#67C23A" />
          </template>
        </vxe-column>
        <vxe-column title="操作"
                    align="center"
                    width="200">
          <template #default="{ row }">
            <vxe-button size="medium"
                        status="primary"
                        icon="fa fa-play"
                        content="学习"
                        @click="studyClick(row)" />
            <!-- <vxe-button size="medium"
                        content="移除" /> -->
          </template>
        </vxe-column>
      </vxe-table>

      <vxe-pager :current-page="forms3.pageNum"
                 :page-size="forms3.pageSize"
                 :total="total3"
                 @page-change="pageChange3">
        <!--    <template #left> -->
        <!--     <span class="page-left">
            <el-button
              type="primary"
              size="small"
              <
              el-button
            /></span>

        </template> -->
      </vxe-pager>
    </el-tab-pane>

    <el-tab-pane label="已学完的课程"
                 name="1">
      <!--   <el-descriptions :column="6">
        <el-descriptions-item label="要求">1200分钟</el-descriptions-item>
        <el-descriptions-item label="已学完">650分钟</el-descriptions-item>
      </el-descriptions> -->

      <vxe-table ref="sGrid"
                 border
                 stripe
                 header-align="center"
                 show-header-overflow
                 show-overflow
                 :row-config="{isHover: true}"
                 :data="tableData_2"
                 :edit-config="{trigger: 'manual', mode: 'row'}"
                 :checkbox-config="{highlight: true}">
        <vxe-column field="resourceTitle"
                    title="课程标题"
                    width="300">
          <template #default="{ row }">
         <span class="redLabel" v-if="row.progress==0?true:false" >New</span>
            <span>{{ row.resourceTitle }}</span>
          </template>
        </vxe-column>
        <vxe-column field="videoDuration"
                    title="时长"
                    align="center" />
        <vxe-column field="sectionNames"
                    title="学段"
                    align="center" />
        <vxe-column field="sectionId"
                    title="学科"
                    align="center" />
        <vxe-column field="progress"
                    title="学习进度"
                    align="center"
                    width="300">
          <template #default="{ row }">
            <el-progress :percentage=" Number( row.progress)"
                         color="#67C23A" />
          </template>
        </vxe-column>
        <vxe-column title="操作"
                    align="center">
          <template #default="{ row }">
            <vxe-button size="medium"
                        status="primary"
                        icon="fa fa-play"
                        content="学习"
                        @click="studyClick(row)" />
          </template>
        </vxe-column>
      </vxe-table>

      <vxe-pager :current-page="forms2.pageNum"
                 :page-size="forms2.pageSize"
                 :total="total2"
                 @page-change="pageChange1">
        <!--  <template #left>
          <span class="page-left">
            <el-button
              type="primary"
              size="small"
              <
              el-button
            /></span>

        </template> -->
      </vxe-pager>
    </el-tab-pane>

  </el-tabs>
</template>

<script>
import { datalist111, getallcourse,datalist,coursecategory } from '../../../../api/mypractice.js'

export default {
  name: 'CourseStudy',
  data () {
    return {
      subjectlist: [],
      form: {},
      activeName: '2',
      radio_1: '',
      radio_2:'全部',
      radio_3: '',
      tableData: [
      ],
      tableData_1: [
      ],
      total2: 0,
      total3: 0,
      tableData_2: [],
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      form1: {
        category: '',
        includeAll: true,
        createTime: '',
        delFlag: '',
        dictName: '',
        id: '',
        pid: '',
        refId: '',
        updateTime: ''
      },
      forms: {
        activityId: '',
        categoryName: '',
        completeFlag: '',
        pageNum: 1,
        pageSize: 10,
        subjectId: '',
        sectionId: '',
        courseCategoryId:""
      },
      ordercourse:[],
      forms3: {
        activityId: '',
        categoryName: '',
        completeFlag: '',
        pageNum: 1,
        pageSize: 10,
        subjectId: '',
        sectionId: '',
        courseCategoryId:""
      },
      forms2: {
        activityId: '',
        categoryName: '',
        completeFlag: '',
        pageNum: 1,
        pageSize: 10,
        subjectId: '',
        sectionId: '',
        courseCategoryId:"",
      },
      total: 0,
      sub:"",
      courseids:"",
      Learningperiodlist: []
    }
  },
 async created () {

    let data =  JSON.parse(window.localStorage.getItem('activitiesids'))
    this.forms.sectionId=data.ids
    await  this.getcoursesss()
  
  },
  mounted () {
 
  },
  methods: {
   //获取学科、学段字段
async   showsubject(){
     console.log(12233455)

    await  this.gettableinfo()
    await this.gettableinfo1()
   },
  async  getcoursesss(){
      let data =  JSON.parse(window.localStorage.getItem('activitiesids'))  
    const  res  = await  coursecategory(data.activityId)
      if(res.code==200){
        this.ordercourse=[]
        this.ordercourse=res.data
       let courseid = JSON.stringify(this.ordercourse)
       window.localStorage.setItem('courseid',courseid)
        if(this.ordercourse.length!=0){
          this.radio_3=this.ordercourse[0]?.name
          this.courseids=this.ordercourse[0]?.id
        }
      }
  },
    // 获取所有课程
    async getallcourse () {
       let data =  JSON.parse(window.localStorage.getItem('activitiesids'))  
      this.forms.activityId = data.activityId


      this.forms.courseCategoryId=this.courseids
      const  data111 = this.subjectlist.map((el)=>{
          if(this.radio_2==el.dictName){
                this.forms.subjectId=el.id
          } 
      })
      // Learningperiodlist
      // this.$route.query.ids
      // console.log( this.forms.sectionId,444444444)
      // this.forms.sectionId=this.
      if(!this.forms.subjectId){
          this.forms.subjectId=""
      }
      const res = await getallcourse(this.forms)
      if (res.code == 200) {

        this.tableData = []
        this.tableData
        const datas = res.data.list
        const data = datas.map((el) => {
          this.Learningperiodlist.map((al) => {
            if (el.sectionId == al.id) {
              el.sectionId = al.dictName
            }
          })
        })
        const data1 = datas.map((el) => {
            
          this.subjectlist.map((al) => {
            if (el.subjectId == al.id) {
              
              el.subjectId = al.dictName
            }
          })
        })
        this.tableData = datas.map((el)=>{
          let theTime = parseInt(el.videoDuration)// 秒
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
          el.videoDuration = ''
          el.videoDuration = result
          return {
               ...el,
               videoDuration:el.videoDuration
          }
        })
          // console.log(this.tableData,9999)
        this.total = Number(res.data.total)
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    // 选择学段
    async choselearngperion (e) {
      this.radio_1 = e
        let data11 =  JSON.parse(window.localStorage.getItem('activitiesids'))  
       this.forms.activityId = data11.activityId
      const data = this.Learningperiodlist.filter((el) => {
        return el.dictName == e
      })
      this.forms.sectionId = data[0].id ? data[0].id : ''
      this.forms.courseCategoryId=this.courseids
      const res = await getallcourse(this.forms)
      if (res.code == 200) {
        this.tableData = []
        const datas = res.data.list
        const data = datas.map((el) => {
          this.Learningperiodlist.map((al) => {
            if (el.sectionId == al.id) {
              el.sectionId = al.dictName
            }
          })
        })
        const data1 = datas.map((el) => {
          this.subjectlist.map((al) => {
            if (el.subjectId == al.id) {
              el.subjectId = al.dictName
            }
          })
        })
        this.tableData = datas.map((el)=>{
          let theTime = parseInt(el.videoDuration)// 秒
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
          el.videoDuration = ''
          el.videoDuration = result
          return {
               ...el,
               videoDuration:el.videoDuration
          }
        })
        this.total = Number(res.data.total)
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    // 选择学科
    async choselearngperion1 (e) {
      this.radio_2 = e
      const  data111 = this.subjectlist.map((el)=>{
              if(e==el.dictName){
                this.forms.subjectId=el.id
              }
      })
      let data11 =  JSON.parse(window.localStorage.getItem('activitiesids'))  
      this.forms.activityId = data11.activityId
      const data = this.subjectlist.filter((el) => {
        return el.dictName == e
      })
      this.forms.subjectId = data[0].id ? data[0].id : ''
      this.forms.courseCategoryId=this.courseids
      const res = await getallcourse(this.forms)
      if (res.code == 200) {
        this.tableData = []
        const datas = res.data.list
        const data = datas.map((el) => {
          this.Learningperiodlist.map((al) => {
            if (el.sectionId == al.id) {
              el.sectionId = al.dictName
            }
          })
        })
        const data1 = datas.map((el) => {
          this.subjectlist.map((al) => {
            if (el.subjectId == al.id) {
              el.subjectId = al.dictName
            }
          })
        })
           this.tableData = datas
           this.tableData = datas.map((el)=>{
          let theTime = parseInt(el.videoDuration)// 秒
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
          el.videoDuration = ''
          el.videoDuration = result
          return {
               ...el,
               videoDuration:el.videoDuration
          }
        })
        this.total = Number(res.data.total)
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
   chosecoursed(e){
       this.ordercourse.map((el)=>{
             if(el.name==e){
            this.radio_3=el.name
            this.courseids=el.id
             }
      })
     this.$nextTick(()=>{
     this.getallcourse()
     })
     
    },
    // 获取学段数据
    async gettableinfo () {
      this.form1.category = 1
      this.form1.includeAll = true
      const res = await datalist(this.form1)
      if (res.code == 200) {
        this.Learningperiodlist = []
        this.Learningperiodlist = res.data
        let data11 =  JSON.parse(window.localStorage.getItem('activitiesids')) 
        let data22 =data11.ids
          let a = res.data.map((el)=>{
              if(el.id==data22){
                this.radio_1=""
                this.radio_1=el.dictName
                window.localStorage.setItem('dictnamess',this.radio_1)
           }
          })
      }
    },
    // 获取学科数据
    async gettableinfo1 () {
      // this.form1.category = 2
      // this.form1.includeAll = true

        let data11 =  JSON.parse(window.localStorage.getItem('activitiesids')) 
      let data ={
           includeAll:true,
           activityId:data11.activityId
      }

      const res = await datalist111(data)
      if (res.code == 200) {
        this.subjectlist = []
        this.subjectlist = res.data
        // this.radio_2= this.subjectlist[1]?.dictName
        this.getallcourse()
      }
    },
    studyClick (e) {
    window.localStorage.setItem('title',e.categoryName)
      const data = {
        activityId: e.activityId,
        sectionId: e.sectionId ? e.sectionId : '',
        subjectId: e.subjectId ? e.subjectId : '',
        courseCategoryId:e.courseCategoryId?e.courseCategoryId:"",
      }
      const datas = JSON.stringify(data)
      window.localStorage.setItem('subjectId', datas)
       window.localStorage.setItem('rouses',  e.resourceId)
      this.$router.push({
        path: '/tz-myTraining/project/components/viewClassDetails'

      })
    },
    handleClick (e, b) {
      if (e.name == 2) {
        this.forms.completeFlag = ''
        this.getallcourse()
      } else if (e.name == 0) {
        // 未完成的
        this.forms3.completeFlag = e.name
        this.gettablenofinshed()
      } else {
        // 已学完的课程
        this.forms2.completeFlag = e.name
        this.hasok()
      }
    },
    async gettablenofinshed () {
       let data11 =  JSON.parse(window.localStorage.getItem('activitiesids')) 
      this.forms3.activityId = data11.activityId
      this.forms3.subjectId = this.forms.subjectId
      this.forms3.sectionId = this.forms.sectionId
      this.forms3.courseCategory=""
      // this.forms3.courseCategoryId=this.courseids
      const res = await getallcourse(this.forms3)
      if (res.code == 200) {
        this.tableData_1 = []
        const datas = res.data.list
        const data = datas.map((el) => {
          this.Learningperiodlist.map((al) => {
            if (el.sectionId == al.id) {
              el.sectionId = al.dictName
            }
          })
        })
        const data1 = datas.map((el) => {
          this.subjectlist.map((al) => {
            if (el.subjectId == al.id) {
              el.subjectId = al.dictName
            }
          })
        })
        this.tableData_1 = datas.map((el)=>{

       let theTime = parseInt(el.videoDuration)// 秒
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
          el.videoDuration = ''
          el.videoDuration = result
          return {
               ...el,
               videoDuration:el.videoDuration
          }

        })
        this.total3 = Number(res.data.total)
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    // 已完成的
    async hasok () {
        let data11 =  JSON.parse(window.localStorage.getItem('activitiesids')) 
      this.forms2.activityId = data11.activityId
      this.forms2.subjectId = this.forms.subjectId
      this.forms2.sectionId = this.forms.sectionId
      this.forms2.courseCategoryId=""
      // this.forms2.courseCategoryId= this.courseids
      const res = await getallcourse(this.forms2)
      if (res.code == 200) {
     
        this.tableData_2 = []
        const datas = res.data.list
        const data = datas.map((el) => {
          this.Learningperiodlist.map((al) => {
            if (el.sectionId == al.id) {
              el.sectionId = al.dictName
            }
          })
        })
        const data1 = datas.map((el) => {
          this.subjectlist.map((al) => {
            if (el.subjectId == al.id) {
              el.subjectId = al.dictName
            }
          })
        })

        this.tableData_2 = datas.map((el)=>{

        let theTime = parseInt(el.videoDuration)// 秒
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
          el.videoDuration = ''
          el.videoDuration = result
          return {
               ...el,
               videoDuration:el.videoDuration
          }

        })
        this.total2 = Number(res.data.total)
        

        //  console.log( this.tableData_2,77777777777)

      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    // 页码改变时
    pageChange (e) {
      this.forms.pageNum = e.currentPage
      this.forms.pageSize = e.pageSize
      this.getallcourse()
    },
    // 页码改变时
    pageChange1 (e) {
      this.forms2.pageNum = e.currentPage
      this.forms2.pageSize = e.pageSize
      this.hasok()
    },
    // 页码改变时
    pageChange3 (e) {
      this.forms3.pageNum = e.currentPage
      this.forms3.pageSize = e.pageSize
      this.gettablenofinshed()
    }
  }

}
</script>

<style lang="scss" scoped>
::v-deep .el-descriptions {
  padding-left: 75px;
}
::v-deep .el-form {
  margin-bottom: 20px;
  .el-form-item {
    margin-bottom: 12px;
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
</style>
