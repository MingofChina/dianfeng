<template>
  <div class="dashboard-editor-container">
    <div class=" clearfix">
      <pan-thumb :image="avatar1" style="float: left">
        您的角色:
        <span v-for="(item,index) in roles11" :key="index" class="pan-info-roles">{{ item.roleName }}</span>
      </pan-thumb>
      <github-corner style="position: absolute; top: 0px; border: 0; right: 0;" />
      <div class="info-container">
        <span class="display_name">{{ name1 }},您好!</span>
        <span style="font-size:20px;padding-top:20px;display:inline-block;">欢迎光临泰州教师培训系统！</span>
        <a :href="baseurls+'/readme.zip'" style="color:#53A8FF;margin-left: 20px;" >下载使用手册</a>
      </div>
    </div>
    <div>
      <!-- <img src="../../../assets/backgroundimages.png" class="emptyGif">
      </img> -->
      <div style="margin-left:190px;" >
        <div style="font-weight:600">温馨提示：</div>
<div class="title-ste">1、如果您是任课教师，左侧“我的培训”看不到培训活动，请联系您学校负责教师培训的管理员给您报名；</div>
<div class="title-ste">2、如果您是学校管理员，左侧看不到“学校培训管理”菜单，请联系您学校上级负责培训管理员（教师发展中心）给您赋权；</div>
<div class="title-ste">3、教师培训的"学校管理员"与智慧云平台中的“学校管理员”并非共用一个权限（类似school_20***账号是不能在培训系统中给教师报名的），培训系统全部是实名账号。</div>

<div class="title-ste">4、有的教师存在多个机构（学校）的情况，培训报名一定要由原编制机构（学校）负责人报名</div>

      </div>
         <img src="../../../assets/backgroundimages.png" class="emptyGif">
      </img>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'
import GithubCorner from '@/components/GithubCorner'
import {baseURL11}  from "../../../utils/request.js"
import {geturlinfo} from "../../../api/system.js"
import CryptoJS from 'crypto-js'
import { getInfo } from '@/api/user'

export default {
  name: 'DashboardEditor',
  components: { PanThumb, GithubCorner },
  data() {
    return {
      emptyGif: '',
      baseurls:"",
      avatar1:"",
      name1:"管理员",
      roles11:[],
      data:""
    }
  },
// async  
created(){

      //  const data111= await getInfo()
      //   window.localStorage.setItem('perssionList', JSON.stringify(data111.data))
  //  this.data=setTimeout(()=>{
  //    location.reload()
  //    clearTimeout(this.data)
  //    },500)   
  },
  mounted(){
    this.baseurls=baseURL11
    let data = JSON.parse(window.localStorage.getItem('userinfo'))
    this.name1=data.realName
    this.roles11=data.roles
    let datas=data?.photoId
     if(datas){
       geturlinfo(datas).then(res =>{
          const url1 = this.decrypt(res.data.key, res.data.iv, res.data.url)
          // this.emptyGif=this.baseurls + '/upload' + url1
          this.avatar1=this.baseurls + '/upload' + url1
       })
     }else{
      //  this.emptyGif="https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3"
       this.avatar1=this.avatar
     }

      // this.emptyGif="../../../assets/backgroundimages.png"
  },
  methods:{
  decrypt (key, iv, text) {
      var d = text.substr(9)
      var newKey = CryptoJS.enc.Latin1.parse(key) // 需要与后台保持一致
      var newIv = CryptoJS.enc.Latin1.parse(iv) // 需要与后台保持一致
      var decrypted = CryptoJS.AES.decrypt(d, newKey, {
        iv: newIv,
        padding: CryptoJS.pad.ZeroPadding
      })
      var password = decrypted.toString(CryptoJS.enc.Utf8)
      return password
    },

  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .emptyGif {
    display: block;
    width:60%;
    margin: 0 auto;
    
  }

  .dashboard-editor-container {
    // background-image: url('../../../assets/backgroundimages.png');
    background-color: #e3e3e3;
    min-height:100vh;
    padding: 50px 60px 0px;
    .pan-info-roles {
      font-size: 12px;
      font-weight: 700;
      color: #333;
      display: block;
      margin-top: 5px;
    }
    .info-container {
      position: relative;
      margin-left: 190px;
      height: 150px;
      line-height: 200px;
      .display_name {
        font-size: 48px;
        line-height: 48px;
        color: #212121;
        position: absolute;
        top: 25px;
      }
    }
  }
  .title-ste{
   margin-top: 10px;
  }
</style>
