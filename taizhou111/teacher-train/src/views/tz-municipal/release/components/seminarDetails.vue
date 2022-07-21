<template>
  <el-card class="box-card">
    <div class="postContent">
      <h4>{{ detailObj.topicTitle }}</h4>
      <div class="postConHead">
        <span>所属分类：{{ detailObj.courseCategoryName }}</span>
        <span>发布人：{{ detailObj.createUserName }}</span>
        <span>发表于：{{ detailObj.createTime }}</span>
      </div>

      <div class="postConMain" :style="{ height: itemHight }">
        <div v-html="detailObj.comment" />
        <div ref="gradient" class="gradient" :style="{ background: itemBackground }" />
      </div>

      <!--   <div class="postConFoot">
        <span>
          <i class="fa fa-link" aria-hidden="true"></i>
          附件：
        </span>
        <ul>
          <li><a href="#">小学语文学习任务设计.mp4</a></li>
          <li><a href="#">小学语文学习任务设计.mp4</a></li>
        </ul>
      </div> -->

      <div class="postConBtn">
        <el-button @click="detailsClick">
          {{ showregion ? '展开研讨内容' : '收起研讨内容' }}
          <i :class="showregion ? 'el-icon-arrow-down' : 'el-icon-arrow-up'" />
        </el-button>
      </div>
    </div>
    <comment
      :comment-list="replyList"
      :comment-num="detailObj.replayCount"
      :topic-id="ids"
      :course-category-id="detailObj.courseCategoryId"
      :topic-title="detailObj.topicTitle"
      :ava-img="detailObj.createPhotoUrl"
      @refreshList="getReplayTopic"
      @upList="getReplayTopic"
    />

    <!-- 评论分页 -->
    <vxe-pager :current-page="tablePage.currentPage" :page-size="tablePage.pageSize" :total="tablePage.total" @page-change="pageChange" />
  </el-card>
</template>

<script>
import { getTopic, getReplayTopic } from '@/api/train.js'
import comment from './Comment/Comment.vue'

export default {
  name: 'SeminarDetails',
  components: {
    comment
  },
  data() {
    return {
      itemHight: '200px',
      itemBackground: 'linear-gradient(rgba(255,255,255,0), rgba(255,255,255,1))',
      showregion: false,
      detailObj: {},
      ids: '',
      // 分页
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      replyList: [] // 评论列表
    }
  },
  mounted() {
    this.ids = this.$route.query.id
    this.getDetail(this.ids)
    this.getReplayTopic()
  },
  methods: {
    // 翻页
    pageChange({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
      this.getReplayTopic()
    },
    // 回复帖子列表
    async getReplayTopic() {
      const params = {
        activityId: sessionStorage.getItem('actId'),
        topicId: this.ids,
        pageNum: this.tablePage.currentPage,
        pageSize: this.tablePage.pageSize
      }
      const res = await getReplayTopic(params)
      if (res.code == 200) {
        this.getDetail(this.ids)
        this.replyList = res.data.list
        this.tablePage.total = parseInt(res.data.total)
        if (this.replyList.length > 0) {
          this.calleArr(this.replyList)
        }
      }
    },
    calleArr(arr) {
      arr.forEach(item => {
        if (item.childTopicList) {
          this.$set(item, 'isShow', false)
          this.$set(item, 'commentText', '')
          this.calleArr(item.childTopicList)
        } else {
          this.$set(item, 'isShow', false)
          this.$set(item, 'commentText', '')
        }
      })
    },
    // 详情
    async getDetail(id) {
      const res = await getTopic(id)
      if (res.code == 200) {
        this.detailObj = res.data
        console.log(this.detailObj, 'detailObj')
      }
    },
    // 展开收起
    detailsClick() {
      this.showregion = !this.showregion
      if (this.showregion) {
        this.itemHight = 'auto'
        this.$refs.gradient.style.background = 'transparent'
      } else {
        this.itemHight = '200px'
        this.$refs.gradient.style.background = 'linear-gradient(rgba(255,255,255,0), rgba(255,255,255,1))'
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
  padding: 20px 120px;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.postContent {
  font-size: 14px;
  h4 {
    font-size: 24px;
    text-align: center;
  }
  .postConMain {
    position: relative;
    overflow: hidden;
    line-height: 2;
    .gradient {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 50px;
    }
  }
  .postConHead {
    padding: 16px 0;
    text-align: center;
    color: #909399;
    & > span {
      margin: 0 12px;
    }
  }
  .postConFoot {
    position: relative;
    margin-top: 16px;
    padding-left: 80px;
    & > span {
      position: absolute;
      top: 0;
      left: 0;
      color: #67c23a;
      .fa {
        margin-right: 6px;
      }
    }
    ul li {
      & + li {
        margin-top: 12px;
      }
      a {
        color: #409eff;
        cursor: pointer;
      }
    }
  }
  .postConBtn {
    margin-top: 16px;
    text-align: center;
  }
}
::v-deep .hbl-fa {
  .hbl-comm {
    position: relative;
    padding: 36px 0 36px 79px;
    .comment-avatar {
      position: absolute;
      top: 36px;
      left: 0;
    }
    .comment {
      width: 100%;
    }
  }
}
</style>
