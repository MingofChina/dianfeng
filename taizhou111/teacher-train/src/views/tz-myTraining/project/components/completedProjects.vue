<template>
  <div>

      <div class="projectList">
        <div class="num">01</div>
        <div class="con">
          <h3 class="conTitle">2022年泰州市“泰州师说”全员培训活动</h3>
          <el-descriptions class="margin-top" :column="2">
            <template slot="extra">
              <el-button type="primary" icon="el-icon-caret-right" size="small">进入学习</el-button>
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
              <template slot="label">培训结果</template>
              <span style="color: #67C23A;">合格</span>
              <!-- <span style="color: #F56C6C;">不合格</span> -->
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
      </div>

      <div class="projectList">
        <div class="num">05</div>
        <div class="con">
          <h3 class="conTitle">2022年泰州市“泰州师说”全员培训活动</h3>
          <el-descriptions class="margin-top" :column="2">
            <template slot="extra">
              <el-button type="primary" icon="el-icon-caret-right" size="small">进入学习</el-button>
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
              <template slot="label">培训结果</template>
              <!-- <span style="color: #67C23A;">合格</span> -->
              <span style="color: #F56C6C;">不合格</span>
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
      </div>


    <div class="page">
      <vxe-pager
        :current-page="form.pageNum"
        :page-size="form.pageSize"
        :total="total"
        @page-change="pageChange"
      />
        </vxe-pager>
    </div>
  </div>
</template>

<script>
import { getpracticelist } from '../../../../api/mypractice.js'
export default {
  name: 'CompletedProjects',
  data() {
    return {
      title: '123',
      form: {
        pageNum: 1,
        pageSize: 10,
        finished:0
      },
      tableData: [],
      total: 0
    }
  },
  mounted() {

    // this.getTableList()

  },
  methods: {
    // 页码改变时
    pageChange(e) {
      this.form.pageNum = e.currentPage
      this.form.pageSize = e.pageSize
      this.getTableList()
    },
    // 获取列表信息
    async   getTableList() {
      const data = this.form
      const res = await getpracticelist(data)
      getpracticelist(this.form).then(res => {
        if (res.code == 200) {
          this.tableData = []
          this.total = Number(res.data.total)
          this.tableData = res.data.list
        } else {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
	::v-deep .el-form  {
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
			content: '';
			border-top: 1px solid #DCDFE6;
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
				color: #409EFF;
				cursor: pointer;
			}
		}
		.num {
			position: absolute;
			top: 0;
			left: 0;
			font-size: 72px;
			font-weight: bolder;
			color: #67C23A;
		}
		::v-deep .el-descriptions {
			a {
				cursor: pointer;
				color: #409EFF;
			}
			.el-descriptions__header {
				.el-descriptions__title {
					font-size: 18px;
				}
			}
			.el-descriptions__body {
				.el-descriptions-item {
					padding-top: 10px;
					border-top: 1px dashed #DCDFE6;
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
			border-top: 1px solid #DCDFE6;
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
</style>
