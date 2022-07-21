<template>
  <el-card class="box-card">
    <el-form :model="form" :inline="true" class="demo-form-inline">
      <el-form-item label="活动名称:">
        <el-input
          v-model="form.name"
          clearable
          placeholder="请输入"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>

      <el-form-item style="margin-left: 24px;">
        <div class="grid-content bg-purple">最后一次统计时间：<span class="redText">{{ datetime }}</span></div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" size="medium" @click="gettime">更新统计</el-button>
      </el-form-item>
    </el-form>

    <vxe-table
     :column-config="{resizable: true}"
      ref="sGrid"
      border
      stripe
      header-align="center"
      show-header-overflow
      show-overflow
      :cell-class-name="cellClassName"
      :row-config="{isHover: true}"
      :data="tableData"
      :edit-config="{trigger: 'manual', mode: 'row'}"
      @cell-click="cellClick"
    >
      <vxe-column type="seq" title="序号" width="60" align="center" />
      <vxe-column field="activeName" title="活动名称" align="center" min-width="300" />
      <!-- <vxe-column field="createUserName" title="创建人" align="center" />
			<vxe-column field="createUnitName" title="创建人单位" align="center" /> -->
      <vxe-column field="trainingPeriod" title="培训时间" align="center" />
      <vxe-column field="activeStatus" title="状态" align="center" />
      <vxe-column field="totalNumber" title="参训总人数" align="center" />
      <vxe-column field="completeNumber" title="合格人数" align="center" />
      <vxe-column field="unfinishedNumber" title="不合格人数" align="center" />
      <vxe-column field="checkNumber" title="合格率" align="center" />
        <vxe-column title="操作" align="center">
        <template #default="{ row }">
         <!-- <vxe-button v-if="row.status == 1" type="text" status="primary" content="已报名" /> -->
          <vxe-button  type="text" status="primary" content="查看详情" />
        </template>
      </vxe-column>
    </vxe-table>

    <vxe-pager
      :current-page="tablePage.currentPage"
      :page-size="tablePage.pageSize"
      :total="tablePage.total"
      @page-change="pageChange"
    >
      <template #left>
        <span class="page-left">
          <el-button type="primary" size="small" plain @click="exportExcel22">导出Excel</el-button>
        </span>
      </template>
    </vxe-pager>
    <areaDisStatistics ref="ids" :dioalgdata="dioalgdata" />


  <el-dialog title="人员列表" width="1300px" :close-on-click-modal="false" :visible.sync="modelshows"  @close="closeddata"  >
      <div>当前学校名称:</div>
      <vxe-table
      style="margin-top:20px"
      ref="xGrid"
      border
      stripe
      header-align="center"
      show-header-overflow
      show-overflow
      :row-config="{ isHover: true }"
      :data="teacherlist1"
      :cell-class-name="cellClassName"
      :edit-config="{ trigger: 'manual', mode: 'row' }"
    >
      <vxe-column type="seq" title="序号" width="60" align="center" />
      <vxe-column field="schoolName" title="学校名称" align="center"/>
      <vxe-column field="name" title="姓名" align="center" />
      <vxe-column field="sex" title="性别" align="center" />
      <vxe-column field="sectionName" title="学段" align="center" />
      <vxe-column field="subject" title="学科" align="center" />
      <vxe-column field="phone" title="联系电话" align="center" />
      <vxe-column field="duration" title="看课完成状态" align="center" />
       <vxe-column field="topicResult" title="讨论完成" align="center" />
       <vxe-column field="worksResult" title="作业完成" align="center" />
       <vxe-column field="complete" title="测评完成" align="center" />
       <vxe-column field="train" title="培训结果" align="center" />

    </vxe-table>
       <vxe-pager
      :current-page="teacher1.currentPage"
      :page-size="teacher1.pageSize"
      :total="teacher1.total"
      @page-change="pageChangeteacher"
    >
    </vxe-pager>

    </el-dialog>



  </el-card>
</template>

<script>
import areaDisStatistics from './areaDisStatistics.vue'
import { transtatistical } from '@/api/train.js'

export default {
  name: 'ViewClassTimeStatistics',
  components: {
    areaDisStatistics
  },
  data() {
    return {
      form: {
        name: ''
      },
      teacherlist1:[],
      modelshows:false,
      dioalgdata: '',
      datetime: '',
      tableData: [],
      tablePage: {
			  total: 0,
			  currentPage: 1,
			  pageSize: 10
      },
      teacher1:{
	     total: 0,
			  currentPage: 1,
			  pageSize: 10
      },
      areaDisStatistics: false
    }
  },
  mounted() {
    this.getDataList()
  },
  methods: {
        pageChangeteacher({ currentPage, pageSize }) {
      this.teacher1.currentPage = currentPage
      this.teacher1.pageSize = pageSize
      this.getteacherdatalist()
    },
    closeddata(){


    },
    // 更新时间
    gettime() {
      this.tablePage = {
			  total: 0,
			  currentPage: 1,
			  pageSize: 10
      },
      this.getDataList()
    },
    exportExcel22() {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['活动名称', '创建人', '创建人单位', '培训时间', '状态', '参训总人数', '合格人数', '不合格人数', '合格率(%)'] // 表格
        const filterVal = ['activeName', 'createUserName', 'createUnitName', 'trainingPeriod', 'activeStatus', 'totalNumber', 'completeNumber', 'unfinishedNumber', 'checkNumber'] // 表格内容
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '区级培训管理统计' // 文件名
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    onSubmit() {
      this.tablePage = {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      this.getDataList()
    },
    // 获取表格数据
    async   getDataList() {
      const data = {
        pageSize: this.tablePage.pageSize,
        pageNum: this.tablePage.currentPage,
        activeName: this.form.name,
        teacherStatusId: '',
        type: 0
      }
      const res = await transtatistical(data)
      if (res.code == 200) {
        this.tableData = []
        this.tableData = res.data.list.map((el) => {
          return {
            ...el,
            trainingPeriod: el.trainStartTime + '~' + el.trainEndTime,
            checkNumber:el.checkNumber==null?el.checkNumber:parseInt(el.checkNumber*100)+"%",
          }
        })
        this.tablePage.total = Number(res.data.total)
        const data = new Date()
        var d = new Date(data)
        var datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
        this.datetime = datetime
      } else {

      }
    },
    // 翻页
    pageChange({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
      this.getDataList()
    },
    // 给活动状态添加样式
    cellClassName({ row, column }) {
		  if (column.title === '活动名称') {
		    return 'cell-click'
		  }
    },
    // 给培训活动添加点击事件
    cellClick({ row, column }) {
		  if (column.title === '活动名称'||column.title === '操作') {
        this.dioalgdata = row.id
        this.$nextTick(() => {
          this.$refs.ids.shows()
          this.areaDisStatistics = true
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
	.redText {
		margin: 12px 0;
		color: #F56C6C;
	}
	.conditionRow {
		margin-bottom: 22px;
		.el-col {
			line-height: 36px;
			font-size: 14px;
		}
	}
	::v-deep .vxe-table {
		.vxe-table--body {
			.vxe-body--column.cell-click {
				color: #409eff;
				cursor: pointer;
			}
		}
	}
	::v-deep .vxe-pager {
		padding-top: 10px;
		.vxe-pager--left-wrapper {
			float: left;
			margin: 0;
		}
	}
</style>
