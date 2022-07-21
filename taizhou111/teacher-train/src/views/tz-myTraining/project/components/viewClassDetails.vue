<template>
  <el-card class="box-card">
    <div class="viewClassHeader">
      <div class="left" v-if="showinfoss">
        本视频最多记录<span>{{ longtime }}</span
        >,您已经学习<span>{{ hasstudy }} </span>。
      </div>
      <span  v-if="completeno">
          本视频与所选学段不符,将不会记录观看时长
       </span>
       <span  v-if="completeok">
          本视频已学习完成,再次观看将不会重复记录观看时长
       </span>
        <span style="color:red;margin-left: 10px;">说明：您当前所选观看学段为：{{xueduana}}，您观看其他学段课程时系统不会记录观看时长！</span>
      <!--     <div class="right">
        20秒后开始计时
      </div> -->
    </div>
    <h3 class="viewClassTitle">{{ cagetoryname }}</h3>
    <el-container>
      <el-main style="position:relative">
        <!-- <d-player id="dplayer" ref="player" :options="options" /> -->
        <video
          id="video-active"
          type="video/mp4"
          :src="src"
          ref="videoss"
          controls="controls"
          controlslist="noplaybackrate nodownload "
          style="width: 100%;"
          @play="getVidDur"
          @pause="pausevideo"
          @ended="endvideos"
        >
          您的浏览器不支持 video 标签。
      
        </video>
        <img src="../../../../assets/playimg.png"  style="position: absolute;left:38%;top:25%" v-show="imgvisable" @click="doubleclick" ></img>
        <div class="viewClassFoot">
          <div class="left">
            当前镜像：<span>{{ testadress }}</span>
              <span style="color:red;margin-left:20px;">课程未观看到100%不计入总时长，请务必观看完毕！</span>
          </div>
           
              <div class="right"
               @click="changeroutes">
            <i class="el-icon-refresh" />
            切换其他镜像
          </div>
        </div>
      </el-main>
      <el-aside width="300px">
        <div class="tz-row">
          <h4 class="rowTitle">
            <i class="fa fa-tags" aria-hidden="true" />{{ titless }}
          </h4>
          <ul class="rowLists one" style="overflow-y: scroll; height:100%;">
            <li 
              :style="{'color':resourid==item.resourceId?'#409EFF':''}"
              class="stylesss"
              v-for="(item, index) in booklist"
              :key="index"
              @click="changefiles(item)"
            >
              <i :class="item.completeFlag ? 'el-icon-success' : 'el-icon-video-play'"/>
               {{ item.resourceTitle }}
            </li>
          </ul>
        </div>
        <div class="tz-row">
          <!--  <h4 class="rowTitle">
            <i class="fa fa-tags" aria-hidden="true" />相关附件
           <el-button type="text" size="mini">更多 <i class="el-icon-d-arrow-right" /></el-button>
          </h4> -->
          <!--  <ul class="rowLists one">
            <li><i class="el-icon-connection" /><span class="redLabel">New</span>张三看完教师的一年一月张三看完教师的一年一月</li>
            <li><i class="el-icon-connection" /><span class="redLabel">New</span>张三看完教师的一年一月张三看完教师的一年一月</li>
            <li><i class="el-icon-connection" />张三看完教师的一年一月张三看完教师的一年一月</li>
          </ul> -->
        </div>
      </el-aside>
    </el-container>

    <el-dialog
      title="为您测速确定镜像站点:"
      :visible.sync="dialogVisible"
      width="500px"
    >
      <el-form ref="form" :model="form" label-width="0">
        <el-form-item>

          <el-radio-group v-model="form.choice"  v-for="(item,index) in  indexlist"  :key="index"  @change="nowchoose(item.imgs,item.siteName)"   >
            <el-radio :label="item.siteName">{{item.siteName}}:<span>当前网速延迟为{{item.datanumber}}毫秒</span></el-radio>
            <!-- <el-radio :label="2">兴公网：<span>延迟691毫秒</span></el-radio>
            <el-radio :label="3">直属城域网：<span>出错！</span></el-radio> -->
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div class="dialogFoot">
        <i class="el-icon-success" />
        当前选择的镜像站点：
        <span>{{testadress}}</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="issureinfo"
          >确 定</el-button
        >
      </span>
    </el-dialog>
 
    <el-dialog
      title="温馨提示"
      :visible.sync="centerDialogVisible"
      :close-on-click-modal="false"
      width="30%"
      center
    >
      <div>
        <div>为您测速确定镜像站点：</div>
        <div
          v-for="(item, index) in testlist"
          :key="item.datanumber"
          style="display: flex; margin-top: 5px"
        >
          <div>{{item.siteName}}</div>
          <div>当前网速延迟为{{item.datanumber}}毫秒</div>
        </div>
        <div style="display: flex; margin-top: 5px">
          <div>已为您选择最优镜像站点:</div>
          <div style="font-weight: 600">{{ testadress }}</div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    
<!-- <el-dialog title="温馨提示" :visible.sync="timerplay">
               <div>
                <img src="../../../../assets/playimg.jpg"></img>
               </div>
</el-dialog> -->
                <!-- <div  style="position: absolute;top:40%;left: 35%;">
                <img src="../../../../assets/playimg.jpg"></img>
                </div> -->

  </el-card>
</template>

<script>
import { getfilelist, getcourseinfo, getroulist, datalist, getfileslist, uploadvideotime,getlatestprogress } from '../../../../api/mypractice.js'
import CryptoJS from 'crypto-js'
import DPlayer from 'dplayer'
// var video = () => {
//   var videoTime = document.getElementById('video-active')
//   // console.log(videoTime.duration,4444444); //获取视频时长
//   // console.log(videoTime.currentTime,555555); //获取视频当前播放时间
// }
export default {
  name: 'SeminarDetails',

  data () {
    return {
      xueduana:"",
      showinfoss:false,
      completeno:false,
      completeok:false,
      testid:"",
      sitenames:"",
      imgvisable:false,
      timerplay:false,
      titless:"",
      timeinterinterval: '',
      booklist: [],
      indexlist:[],
      cagetoryname: '',
      ziduanlist: [],
      datasss: {},
      xuekelist: [],
      subjectidss: '',
      sectionidss: '',
      testadress: '',
      centerDialogVisible: false,
      nomaladress: '',
      datalist: [],
      longtime: '',
      hasstudy: '',
      testlist: [],
      mindata: [],
      settimes: '',
      src: '',
      activityIds: '',
      resourid: '',
      zantingstatus:"",
      dialogVisible: false,
      form: {
        choice: ''
      }
    }
  },
  watch: {
    // src(new1,old1){
    // },
  },
  mounted () {
   this.xueduana= window.localStorage.getItem('dictnamess')
    this.titless= window.localStorage.getItem('title')
    let activitydata= window.localStorage.getItem('activityIds')
    this.activityIds=activitydata
    window.addEventListener('beforeunload', e => this.beforeunloadHandler(e)) // 监听页面刷新触发清除定时器事件
    // 判断是否需要弹窗
    const data = window.localStorage.getItem('testadress')
    if (data) {
      this.testadress = data
      this.getresourceinfo()
    } else {
      this.getfilepath()
    }
  },
  destroyed () {
    clearInterval(this.timeinterinterval)
    clearInterval(this.zantingstatus)
      clearInterval(this.settimes)
  },
  async created () {
    await this.getdatalist1()
    await this.getdatalist2()
  },
  methods: {
    //保存
    issureinfo(){
       if(!this.testid){
        this.dialogVisible=false
       return 
       }
       this.testadress=""
       this.form.choice="" 
       this.testadress =this.sitenames
       this.form.choice=this.testid
       const datass =this.form.choice.split('/video')
       this.nomaladress = datass[0]
       window.localStorage.setItem('testadress', this.testadress)
       window.localStorage.setItem('https', this.nomaladress)
       this.dialogVisible=false
         this.$message({
          showClose: true,
          message: '镜像切换成功',
          type: 'success'
        })
      this.refreshvideo()
    },
 async   refreshvideo(){
 clearInterval(this.settimes)
           let data1111 =  JSON.parse(window.localStorage.getItem('activitiesids')) 
               let videodatas ={
                  resourceId:this.resourid,
                  activityId:data1111.activityId
               }
      const  res  =await getcourseinfo(videodatas)
        let nowsubdata = res.data?.sectionNames
        if(nowsubdata){
        let b =nowsubdata.indexOf( String(this.xueduana))
        if(b==-1){
         this.showinfoss=false
         this.completeno=true
         this.completeok=false
        }else if(res.data.completeFlag == 1){
          this.showinfoss=false
          this.completeno=false
          this.completeok=true
        }else{
          this.showinfoss=true
          this.completeno=false
          this.completeok=false
        }
        }
          const videodata = this.decrypt(res.data.key,res.data.iv,res.data.filePath)
          const data11 = window.localStorage.getItem('https')
          this.src=""
          this.src = data11 + '/video' + videodata
           if(res.code==200){
             const data = res.data.videoDuration
             let theTime = parseInt(data)// 秒
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
             this.longtime = result
             this.hasstudy=res.data.studyDuration
             if (this.hasstudy) {
               let theTime = parseInt(this.hasstudy)// 秒
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
               this.hasstudy = ''
               this.hasstudy = result
             } else {
               this.hasstudy = res.data.studyDuration ? res.data.studyDuration : 0 + '分钟'
             }

        if (res.data.completeFlag == 1) {
        clearInterval(this.timeinterinterval)
        //    var videoTime = document.getElementById('video-active')
        //  videoTime.style.timeline.display='block'
      } else {
        clearInterval(this.timeinterinterval)
        var sym
        var video = document.querySelector('video')
        this.timeinterinterval = setInterval(() => {
          var time = video.currentTime
          if (time - sym > 1) {
            video.currentTime = sym
          }
          sym = video.currentTime
        }, 500)
      }

             this.$nextTick(()=>{
             this.$refs.videoss.currentTime =res.data.studyDuration?res.data.studyDuration:0
             })
           }
    },
    //选择站点
    nowchoose(e,a){
        this.testid=""
        this.testid=e
        this.sitenames=""
        this.sitenames=a

  },
    //监听播放结束
    endvideos(){
   var videoTime = document.getElementById('video-active')
   const videoalldatas = parseInt(videoTime.currentTime)
         const videodata = {
           activityId: this.activityIds,
           resourceId: this.resourid,
           studyDuration:videoalldatas
         }

         uploadvideotime(videodata).then((res) =>{
              if(res.code==200){
                this.hasstudy= res.data.studyDuration
               if (this.hasstudy) {
                 let theTime = parseInt(this.hasstudy)// 秒
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
                 this.hasstudy = ''
                 this.hasstudy = result
               } else {
                 this.hasstudy = res.data.studyDuration ? res.data.studyDuration : 0 + '分钟'
               }
              }
          })

        this.getrouselist()
    },
    // 监听用户刷新页面
      beforeunloadHandler (e) { // 根据事件进行操作进行操作
      clearInterval(this.timeinterinterval)
      clearInterval(this.settimes)
      clearInterval(this.zantingstatus)
    },
    doubleclick(){
     this.imgvisable=false
      var videoTime = document.getElementById('video-active')
      videoTime.play()
    },
    //开始播放
    getVidDur (){
      this.imgvisable=false
      var videoTime = document.getElementById('video-active')
         console.log(videoTime.currentTime,2222)
      this.settimes = setInterval(() => {
        let datas = parseInt(videoTime.currentTime)
      
        const videoalldatas = parseInt(videoTime.duration)
        if (datas > videoalldatas) {
          datas = videoalldatas
        }
        var sym
        var video = document.querySelector('video')
        this.timeinterinterval = setInterval(() => {
          var time = video.currentTime
          if (time - sym > 1) {
            video.currentTime = sym
          }
          sym = video.currentTime
        }, 500)
        const videodata = {
          activityId: this.activityIds,
          resourceId: this.resourid,
          studyDuration: datas
        }
        uploadvideotime(videodata).then((res) =>{
          if (res.code == 200) {
             if(res.data.studyFlag==false){
              clearInterval(this.settimes)   
             }
            this.hasstudy=res.data.studyDuration
            if (this.hasstudy) {
              let theTime = parseInt(this.hasstudy)// 秒
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
              this.hasstudy = ''
              this.hasstudy = result
            } else {
              this.hasstudy = res.data.studyDuration ? res.data.studyDuration : 0 + '分钟'
            }
            if (datas == videoalldatas) {
              clearInterval(this.settimes)
            }
          } else {
            clearInterval(this.settimes)
          }
        })
      },31000)
        this.zantingstatus=  setInterval(()=>{
        this.$refs.videoss.pause()
        this.imgvisable=true
      },300000)
    },
    // 暂停播放
    pausevideo (){
      this.timerplay=true
      clearInterval(this.settimes)
      clearInterval(this.zantingstatus)
    },
    // 获取附件列表
     async   changefiles (e) {
      clearInterval(this.settimes)
    
      this.resourid = e.resourceId
      this.cagetoryname = e.resourceTitle
      const videodata = this.decrypt(e.key, e.iv, e.filePath)
      const data = window.localStorage.getItem('https')
      this.src = ''
      this.src = data + '/video' + videodata // 播放视频的路径
      // completeFlag 1是是0是否 ,判断是否可以快进
         
        let nowsubdata =e?.sectionNames
        if(nowsubdata){
        let b =nowsubdata.indexOf( String(this.xueduana))
        if(b==-1){
         this.showinfoss=false
         this.completeno=true
         this.completeok=false
        }else if(e.completeFlag == 1){
          this.showinfoss=false
          this.completeno=false
          this.completeok=true
        }else{
          this.showinfoss=true
          this.completeno=false
          this.completeok=false
        }
        }


      if (e.completeFlag == 1) {
        clearInterval(this.timeinterinterval)
      } else {
        clearInterval(this.timeinterinterval)
        var sym
        var video = document.querySelector('video')
        this.timeinterinterval = setInterval(() => {
          var time = video.currentTime
          if (time - sym > 1) {
            video.currentTime = sym
          }
          sym = video.currentTime
        }, 500)
      }
           let data1111 =  JSON.parse(window.localStorage.getItem('activitiesids')) 

               let videodatas ={
                  resourceId:this.resourid,
                  activityId:data1111.activityId
               }
      const  res  =await getcourseinfo(videodatas)
           if(res.code==200){
             const data = res.data.videoDuration
             let theTime = parseInt(data)// 秒
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
             this.longtime = result
             this.hasstudy=res.data.studyDuration
             if (this.hasstudy) {
               let theTime = parseInt(this.hasstudy)// 秒
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
               this.hasstudy = ''
               this.hasstudy = result
             } else {
               this.hasstudy = res.data.studyDuration ? res.data.studyDuration : 0 + '分钟'
             }
            this.$refs.videoss.currentTime =res.data.studyDuration?res.data.studyDuration:0
           }
          
    },
    // 获取资源列表信息
    async getrouselist () {
      const data = JSON.parse(window.localStorage.getItem('subjectId'))
      this.subjectidss = ''
      this.sectionidss = ''
      const sub = this.xuekelist.map((el) => {
        if (el.dictName == data.sectionId) {
          this.sectionId = el.id
        }
      })
      data.sectionId = this.sectionId == null ? '' : this.sectionId
      const sce = this.ziduanlist.map((el) => {
        if (el.dictName == data.subjectId) {
          this.subjectidss = el.id
        }
      })
      data.subjectId = this.subjectidss == null ? '' : this.subjectidss
 
      const res = await getroulist(data)
      if (res.code == 200) {
   
        this.booklist = []
        this.booklist = res.data
       
      }
    },
    // 学段信息
    async getdatalist1 () {
      const data = {
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
      const res = await datalist(data)
      if (res.code == 200) {
        this.xuekelist = [],
          this.xuekelist = res.data
      }
    },
    // 学科信息
    async getdatalist2 () {
      const data = {
        category: 2,
        createTime: '',
        delFlag: '',
        dictName: '',
        id: '',
        pid: '',
        refId: '',
        updateTime: '',
        includeAll: true
      }
      const res = await datalist(data)
      if (res.code == 200) {
        this.ziduanlist = [],
          this.ziduanlist = res.data
        this.getrouselist()
      }
    },
    // 获取头部信息
    async getresourceinfo () {
     let datassss=   window.localStorage.getItem('rouses')
       let data1111 =  JSON.parse(window.localStorage.getItem('activitiesids')) 
         let data333 ={
          resourceId:datassss,
          activityId:data1111.activityId
      }
      const res = await getcourseinfo(data333)
      if (res.code == 200) {
       
         let nowsubdata =res.data?.sectionNames
        if(nowsubdata){
        let b =nowsubdata.indexOf( String(this.xueduana))
        if(b==-1){
         this.showinfoss=false
         this.completeno=true
         this.completeok=false
        }else if(res.data.completeFlag == 1){
          this.showinfoss=false
          this.completeno=false
          this.completeok=true
        }else{
          this.showinfoss=true
          this.completeno=false
          this.completeok=false
        }
        }
      const videodata = this.decrypt(res.data.key,res.data.iv,res.data.filePath)
      const data11 = window.localStorage.getItem('https')
      this.src = data11 + '/video' + videodata
      // console.log(this.src,24755)
      this.$refs.videoss.currentTime =res.data.studyDuration?res.data.studyDuration:0
       this.cagetoryname =res.data.resourceTitle
        // 活动id
        // this.activityIds = res.data.activityId
        // 资源id
        this.resourid =res.data.resourceId
        const data = res.data.videoDuration
        let theTime = parseInt(data)// 秒
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
        this.longtime = result
        this.hasstudy = res.data.studyDuration
        if (this.hasstudy) {
          let theTime = parseInt(this.hasstudy)// 秒
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
          this.hasstudy = ''
          this.hasstudy = result
        } else {
          this.hasstudy = res.data.studyDuration ? res.data.studyDuration : 0 + '分钟'
        }

         if (res.data.completeFlag == 1) {
        clearInterval(this.timeinterinterval)
      
      } else {
        clearInterval(this.timeinterinterval)
        var sym
        var video = document.querySelector('video')
        this.timeinterinterval = setInterval(() => {
          var time = video.currentTime
          if (time - sym > 1) {
            video.currentTime = sym
          }
          sym = video.currentTime
        }, 500)
      }


      }
    },
    //切换镜像站点
    changemirror(){


    },
    //点击切换站点
  async  changeroutes(){

      clearInterval(this.timeinterinterval)
      // clearInterval(this.settimes)
      // clearInterval(this.zantingstatus)
      var videoTime = document.getElementById('video-active')
      videoTime.pause()
      var  that =this
      const res  = await getfilelist()
      if (res.code == 200) {
        that.datalist = []
        that.mindata = []
         that.testlist=[]
        const data = res.data.map((el) => {
          const ips = that.decrypt(el.key, el.iv, el.siteIp)
          const iport = that.decrypt(el.key, el.iv, el.sitePort)
          const data = {
            ipport: ips + ':' + iport + '/video/test.jpg',
            siteName: el.siteName
          }
          that.datalist.push(data)
        })
    that.datalist.map((el) => {
          const starttime = new Date().getTime()
          var img = new Image()
             img.src = el.ipport
              let start = null;
     start =new Date().getTime()
   img.onload = ()=> {
    // console.log(img);
    // console.log(img.src);
    // console.log(img.height);
    // console.log(img.naturalHeight);
    // console.log(img.width);
    // console.log(img.naturalWidth);

    if(img.height!=0){
    let  datasss=  parseInt(img.height*img.width/100)
     let end = null;
     end = new Date().getTime ()
    //  console.log(start,77777777777)
    //  console.log(end,8888)
     const speed = parseInt(datasss/(end - start))
       const data1 ={
              imgs: img.src,
              datanumber: speed,
              siteName: el.siteName
            }
            that.mindata.push(speed)
            that.testlist.push(data1)
    }else{

    }
    
}
      // fetch(el).then(function (res) {
      // return res.blob()
      // }).then(function (data) {
          // 图片大小
            // console.log(data,555)
           
          //    let  datasss= data.size
          //    let end = null;
          //   end = new Date().getTime ()
        
          // const speed = parseInt(datasss *1 /(end - start))    
          // // console.log(speed,22222)
          //    const data1 ={
          //     imgs: img.src,
          //     datanumber: speed,
          //     siteName: el.siteName
          //   }
          //   console.log(1)
          //   that.mindata.push(speed)
          //   that.testlist.push(data1)
          
      //  }).catch(()=>{
            
      //  })
        })
   this.$nextTick(()=>{
        this.indexlist=[]
        this.indexlist=this.testlist
        let  data112233=  window.localStorage.getItem('https')
        let  datass112=  window.localStorage.getItem('testadress')
        this.form.choice=datass112
        this.dialogVisible=true
          })
      }
    },
    //首次测试镜像
    async getfilepath () {
      var  that =this
      const res = await getfilelist()
      if (res.code == 200) {
        that.datalist = []
        that.mindata = []
        const data = res.data.map((el) => {
          const ips = that.decrypt(el.key, el.iv, el.siteIp)
          const iport = that.decrypt(el.key, el.iv, el.sitePort)
          const data = {
            ipport: ips + ':' + iport + '/video/test.jpg',
            siteName: el.siteName
          }
          that.datalist.push(data)
        })
        that.datalist.map((el) => {
          const starttime = new Date().getTime()
          var img = new Image()
             img.src = el.ipport
             let start = null; 
           start =new Date().getTime()
          fetch(el).then(function (res) {

         return res.blob()
      }).then(function (data) {
          // 图片大小
             let  datasss= data.size
             let end = null;
              end = new Date().getTime () 
          const speed = parseInt(datasss *1 /(end - start))    
          // console.log(speed,22222)
             const data1 = {
              imgs: img.src,
              datanumber: speed,
              siteName: el.siteName
            }
            that.mindata.push(speed)
            that.testlist.push(data1)
       }).then(()=>{
     this.$nextTick(()=>{
        const mindatas = Math.min(...this.mindata)
        const s = this.testlist.map((el) => {
          this.mindata.map((al) => {
          
            if (el.datanumber == al) {
              this.testadress = el.siteName
              this.form.choice=el.siteName
              const datass = el.imgs.split('/video')
              this.nomaladress = datass[0]
              window.localStorage.setItem('testadress', this.testadress)
              window.localStorage.setItem('https', this.nomaladress)
            }
          })
        })
        this.$nextTick(()=>{
         this.getresourceinfo()
          // this.centerDialogVisible = true
        })
          })
       })
        })
      }
    },
    // 解密
    decrypt (key, iv, text) {
      var d = text.substr(9)
      var newKey = CryptoJS.enc.Latin1.parse(key)// 需要与后台保持一致
      var newIv = CryptoJS.enc.Latin1.parse(iv)// 需要与后台保持一致
      var decrypted = CryptoJS.AES.decrypt(d, newKey, {
        iv: newIv,
        padding: CryptoJS.pad.ZeroPadding
      })
      var password = decrypted.toString(CryptoJS.enc.Utf8)
      return password
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

.stylesss{
   cursor: pointer;

}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
 
}

.viewClassHeader {
  padding: 4px 20px;
  background: #d9ecff;
  border-radius: 3px;
  height: 44px;
  line-height: 36px;
  font-size: 14px;
  color: #606266;

  .left {
    float: left;
  }

  .right {
    float: right;
  }
}

.viewClassTitle {
  text-align: center;
}

.el-container {
  .el-main {
    padding: 0 36px 0 0;
  }

  .el-aside {
    background: #fff;
    margin: 0;
    padding: 0;
  }
}

.tz-row {
  & + .tz-row {
    margin-top: 24px;
  }

  .rowTitle {
    position: relative;
    margin: 10px 0;
    line-height: 1.15;

    .fa {
      margin-right: 12px;
      color: #67c23a;
    }

    .el-button {
      position: absolute;
      top: -3px;
      right: 0;
      color: #c0c4cc;

      &:hover {
        color: #409eff;
      }
    }
  }

  .rowLists {
    font-size: 14px;

    li {
      padding: 12px 0;
      border-bottom: 1px dashed #dcdfe6;
      line-height: 1.15;

      i {
        margin-right: 5px;
      }

      .el-icon-success {
        color: #67c23a;
      }

      .el-icon-video-play {
        color: #c0c4cc;
      }

      .el-icon-connection {
        color: #e6a23c;
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
    }

    &.one li {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}

.viewClassFoot {
  padding-top: 24px;
  height: 36px;
  line-height: 36px;
  font-size: 14px;
  color: #606266;

  .left {
    float: left;
  }

  .right {
    float: right;

    &:hover {
      color: #409eff;
      cursor: pointer;
    }
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
  .el-dialog__body {
    padding: 0 20px;
    .el-radio-group {
      .el-radio {
        display: block;
        padding: 5px 0;
      }
    }
  }
  .dialogFoot {
    .el-icon-success {
      color: #67c23a;
    }
  }
  .el-dialog__footer {
    text-align: center;
    padding-top: 20px;
  }
}
// video::-webkit-media-controls-volume-slider {
//     display: none;
// }
// video::-webkit-media-controls-fullscreen-button {
//     display: none;
// }

// video::-webkit-media-controls-play-button {
//     display: none;
// }

// video::-webkit-media-controls-timeline {
//   display: none;
// }

// video::-webkit-media-controls-current-time-display {
//     display: none;
// }

// video::-webkit-media-controls-time-remaining-display {
//     display: none;
// }

// video::-webkit-media-controls-mute-button {
//     display: none;
// }

// video::-webkit-media-controls-toggle-closed-captions-button {
//     display: none;
// }

// video::-webkit-media-controls-enclosure {
//     display: none;
// }
</style>
