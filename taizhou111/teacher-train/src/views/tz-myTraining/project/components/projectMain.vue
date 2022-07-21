<template>
  <el-card class="box-card">
    <el-tabs v-model="activeName">
      <el-tab-pane label="进行中的项目"
                   name="first">
        <ongoingProject />
      </el-tab-pane>

    <!--  <el-tab-pane label="已完成的项目"
                   name="second">
        <completedProjects />
      </el-tab-pane> -->
    </el-tabs>

  </el-card>
</template>

<script>
import ongoingProject from './ongoingProject.vue'
import completedProjects from './completedProjects.vue'
// import { datalist, editusersectioninfo, getsecbindsections } from '../../../../api/mypractice.js'
export default {
  name: 'ProjectMain',
  components: {
    ongoingProject,
    completedProjects
  },
  data () {
    return {
      activeName: 'first',
      dialogTableVisible: true,
      Learningperiodlist: [],
      radio_1: '',
      ids: ''
    }
  },
 mounted () {
  
  },
  methods: {
    // 获取学员是否绑定信息
    async getsections () {
      const res = await getsecbindsections()
      if (res.code == 200) {
        if (res.data.length != 0) {
          this.ids = res.data[0].sectionId
        }
      }
    },
    async choselearngperion (e) {
      this.ids = e
      const res = await editusersectioninfo(this.ids)
      if (res.code == 200) {
        this.dialogTableVisible = false
      }
    },
    sureinfo () {
      this.dialogTableVisible = false
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
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
