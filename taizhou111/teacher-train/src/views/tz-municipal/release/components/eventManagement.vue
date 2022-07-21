<template>
  <el-card class="box-card">
    <div class="tz_title">
      <h3>{{ actObj.activityName }}</h3>
      <ul>
        <li>
          报名审核：
          <span>{{ actObj.reviewFlag == 0 ? '无需审核' : '徐管理员审核' }}</span>
        </li>
        <li>
          学时：
          <span>{{ actObj.classHours }}</span>
        </li>
        <li>
          培训时间：
          <span>{{ actObj.startTime }} ~ {{ actObj.finishTime }}</span>
        </li>
      </ul>
    </div>
    <!-- 流程 -->
    <div class="box-flow">
      <div class="flow-item">
        <div v-for="(item, index) in flowArr" :key="index">
          <div class="flow-tag">
            <div v-if="index !== 4" class="tag-item">
              <el-button type="primary" plain v-if="index == 0" :disabled="status !== '0'" @click="checkTag">开启报名</el-button>
              <el-button type="primary" plain v-if="index == 1" :disabled="status == '0' || status == '2' || status == '3' || status == '4'" @click="checkTag">开启培训</el-button>
              <el-button type="primary" plain v-if="index == 2" :disabled="status == '0' || status == '1' || status == '3' || status == '4'" @click="checkTag">进入评价</el-button>
              <el-button type="primary" plain v-if="index == 3" :disabled="status !== '3'" @click="checkTag">结束培训</el-button>
              <div class="tag-line"></div>
            </div>
          </div>
          <div>
            <div class="item-num" :class="item.disable ? '' : 'active'">{{ index + 1 }}</div>
            <div>{{ item.name }}</div>
          </div>
          <div v-for="(ele, indexs) in item.children" :key="indexs">
            <el-button style="width: 150px;" class="ele-btn" type="primary" size="medium" :disabled="ele.disable" @click="goRoute(ele.name, ele.url)">{{ ele.name }}</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹窗 -->
    <el-dialog title="活动信息设置" width="800px" :close-on-click-modal="false" :visible.sync="reviseClickVisible">
      <newTrainingEvent :revise-click-data="reviseClickData" :rule-form2="actObj" @reviseStatus="reviseStatus" />
    </el-dialog>
  </el-card>
</template>

<script>
import newTrainingEvent from './newTrainingEvent.vue';
import { getDetail, getColumn, editStatus } from '@/api/train.js';
export default {
  name: 'EventManagement',
  components: {
    newTrainingEvent
  },
  data() {
    return {
      actObj: {}, //活动详情
      flowArr: [], //流程
      reviseClickVisible: false, //弹窗
      reviseClickData: undefined,
      status: ''
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    // 子组件 修改弹窗状态
    reviseStatus(status) {
      this.createNewCon = this.reviseClickVisible = status;
    },
    //标签
    async checkTag() {
      let params = {
        id: this.actObj.id,
        status: parseInt(this.status) + 1
      };
      const res = await editStatus(params);
      if (res.code == 200) {
        this.$message.success(res.message);
        this.getDetail();
      }
    },
    //详情
    async getDetail() {
      let id = sessionStorage.getItem('actId');
      const res = await getDetail(id);
      if (res.code == 200) {
        this.actObj = res.data;
        this.status = this.actObj.status;
        this.getColumn();
      }
    },
    //流程图
    async getColumn() {
      const res = await getColumn();
      if (res.code == 200) {
        this.flowArr = res.data;
        if (this.flowArr.length > 0) {
          this.flowArr.forEach((item, index) => {
            if (this.status > index || this.status == index) {
              this.$set(item, 'disable', false);
              if (item.children) {
                if (item.children.length > 0) {
                  item.children.forEach(item2 => {
                    this.$set(item2, 'disable', false);
                  });
                }
              }
            } else {
              this.$set(item, 'disable', true);
              if (item.children) {
                if (item.children.length > 0) {
                  item.children.forEach(item2 => {
                    this.$set(item2, 'disable', true);
                  });
                }
              }
            }
          });
        }
      }
    },
    //路由
    goRoute(name, url) {
      if (name == '活动信息设置') {
        this.reviseClickVisible = true;
        this.getDetail();
      } else if (name == '选择参训教师') {
        console.log('参训教师');
      } else if (name == '评价考试') {
        console.log('评价考试');
      } else if (name == '导入成绩考试') {
        console.log('导入成绩考试');
      } else if (name == '培训学时认定') {
        console.log('培训学时认定');
      } else {
        this.$router.push(url);
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
.active {
  background-color: #1890ff !important;
  color: #fff !important;
  border: none !important;
}
.tz_title {
  h3 {
    font-size: 24px;
    text-align: center;
    color: #606266;
  }
  ul {
    margin-bottom: 24px;
    padding-bottom: 12px;
    text-align: center;
    border-bottom: 1px solid #c0c4cc;
    li {
      display: inline-block;
      margin: 0 12px;
      font-size: 14px;
      color: #909399;
    }
  }
}
.box-flow {
  margin-top: 6%;
  .flow-item {
    display: flex;
    text-align: center;
    justify-content: space-around;
    .item-num {
      width: 54px;
      height: 54px;
      border-radius: 18px;
      font-size: 28px;
      line-height: 54px;
      margin: 0 auto 10px;
      color: #b8bcc5;
      border: 2px solid #b8bcc5;
    }
    .flow-tag {
      position: relative;
      width: 100%;
      .tag-item {
        position: absolute;
        margin-left: 105%;
        margin-top: -30px;
      }
      @media screen and (max-width: 1510px) {
        .tag-item {
          margin-left: 95%;
        }
      }
      .tag-line {
        width: 100%;
        background-color: #b8bcc5;
        height: 2px;
        margin-top: 20px;
      }
    }
    .ele-btn {
      margin-top: 20px;
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
  .el-dialog__header {
    position: relative;
    &:after {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      content: '';
      border-top: 1px solid #dcdfe6;
    }
  }
  .el-dialog__body {
    flex: 1;
    overflow: auto;
    .el-form {
      margin-bottom: 36px;
    }
  }
}
.el-button {
  position: relative;
  .el-tag {
    position: absolute;
    top: -10px;
    right: -10px;
    border-radius: 10px;
  }
}
</style>
