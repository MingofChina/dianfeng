<template>
  <el-main>
    <el-card class="box-card">
      <el-form :model="form" :inline="true" class="demo-form-inline">
        <el-form-item label="资源名称">
          <el-input
            v-model="form.resourceTitle"
            clearable
            placeholder="请输入"
          />
        </el-form-item>

        <el-form-item label="学段">
          <el-select
            v-model="form.sectionId"
            clearable
            placeholder="请选择"
          >
            <el-option label="全部" value="" />
            <el-option :label="item.dictName" :value="item.id" v-for="(item, index) in dictList.schoolSection" :key="index" />
          </el-select>
        </el-form-item>

        <el-form-item label="学科">
          <el-select
            v-model="form.subjectId"
            clearable
            placeholder="请选择"
          >
            <el-option label="全部" value="" />
            <el-option :label="item.dictName" :value="item.id" v-for="(item, index) in dictList.subject" :key="index" />
          </el-select>
        </el-form-item>

        <!-- <el-form-item label="互动问答">
          <el-select
            v-model="form.interactive"
            clearable
            placeholder="请选择"
          >
            <el-option label="全部" value="" />
            <el-option label="是" :value="1" />
            <el-option label="否" :value="0" />
          </el-select>
        </el-form-item> -->

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>

      <vxe-table
        ref="xGrid"
        border
        stripe
        header-align="center"
        show-header-overflow
        show-overflow
        :row-config="{isHover: true}"
        :data="tableData"
        :loading="loading"
        :cell-class-name="cellClassName"
        :edit-config="{trigger: 'manual', mode: 'row'}"
        :checkbox-config="{highlight: true}"
        @checkbox-change="checkboxChange"
      >
        <vxe-column type="checkbox" width="40" align="center" />
        <vxe-column field="resourceTitle" title="资源名称" min-width="200" />
        <vxe-column field="speaker" title="上传人" align="center" />
        <vxe-column field="speakerUnit" title="上传人单位" align="center" />
        <vxe-column field="createTime" title="上传时间" align="center" />
        <!-- <vxe-column field="interactive" title="互动问答" align="center" /> -->
        <vxe-column field="sectionIds" title="所属学段" align="center" >
          <template #default="{row}">
            {{(row.sectionIds && dictList.schoolSection.length) ? row.sectionIds.split(',').map(item => dictList.schoolSection.find(_item => _item.id == item).dictName).join(',') : ''}}
          </template>
        </vxe-column>
        <vxe-column field="subjectIds" title="所属学科" align="center" >
          <template #default="{row}">
            {{(row.subjectIds && dictList.subject.length) ? row.subjectIds.split(',').map(item => dictList.subject.find(_item => _item.id == item).dictName).join(',') : ''}}
          </template>
        </vxe-column>
        <vxe-column field="videoDuration" title="时长" align="center" />
        <!-- <vxe-column field="size" title="大小(MB)" align="center" /> -->
      </vxe-table>

      <vxe-pager
        :current-page="tablePage.pageNum"
        :page-size="tablePage.pageSize"
        :total="tablePage.total"
        @page-change="pageChange"
      >
        <template #left>
          <span class="page-left">
            <el-button type="primary" size="small" plain @click="optionDialog('add')">上传资源</el-button>
            <el-button type="warning" size="small" plain @click="optionDialog('edit')">修 改</el-button>
            <el-button size="small" plain @click="delResource">删 除</el-button>
            <el-button type="primary" size="small" plain @click="chooseTeacher = true">导出Excel</el-button>
          </span>
        </template>
      </vxe-pager>

      <el-dialog title="发表新帖子" width="800px" :visible.sync="newClick">
        <uploadVideo v-if="newClick" ref="uploadVideo" :sourceForm='currentResource' :dictList="dictList" @submit="saveResource" @close="closeDialog" />
      </el-dialog>
    </el-card>
  </el-main>
</template>

<script>
import uploadVideo from './components/uploadVideo.vue'
import { datalist } from '@/api/mypractice'
import { getResourceList, saveResource, delResource } from '@/api/resource'
export default {
  name: 'TzResource',
  components: {
    uploadVideo
  },
  data() {
    return {
      form: {
			  resourceName: '',
			  sectionId: null,
			  subjectId: null
      },
      tableData: [{id: 1},{id: 2},{id: 3}],
      loading: false,
      tablePage: {
			  total: 0,
			  pageNum: 1,
			  pageSize: 10
      },
      newClick: false,
      dictList: {
        schoolSection: [],
        subject: []
      },
      currentResourceList: [],
      currentResource: {}
    }
  },
  mounted() {
    this.getDict(['1', '2'])
    this.getResourceList()
  },
  methods: {
    optionDialog (type) {
      if (type == 'add') {
        this.currentResource = {}
        this.newClick = true
      } else {
        if (!this.currentResourceList.length) {
          this.$message('请选择资源')
          return
        } else if (this.currentResourceList.length > 1) {
          this.$message('请选择一条资源进行修改')
        } else {
          this.currentResource = this.currentResourceList[0]
          this.newClick = true
        }
      }
    },
    closeDialog () {
      this.newClick = false
      this.$refs.uploadVideo.resetForm()
    },
    async saveResource (data) {
      console.log(data, 'form')
      await saveResource(data)
      this.$message.success('新增成功')
      this.closeDialog()
      this.onSubmit()
    },
    onSubmit() {
      this.tablePage.currentPage= 1
      this.getResourceList()
    },
    // 给活动状态添加样式
    cellClassName({ row, column }) {
		  if (column.property === 'resourceName') {
		    return 'cell-click'
		  }
    },
    async delResource () {
      if (!this.currentResourceList.length) {
        this.$message('请选择资源')
        return
      }
      const params = {
        resourceIds: this.currentResourceList.map(item => item.id)
      }
      await delResource(params.resourceIds)
      this.$message.success('删除成功')
      this.onSubmit()
    },
    checkboxChange({records}) {
      console.log(records)
      this.currentResourceList = records
    },
    getDict(keys = []) {
      const fns = keys.map(item => datalist({ category: item }))
      Promise.all(fns).then(res => {
        console.log(res)
        this.dictList.schoolSection = res[0].data
        this.dictList.subject = res[1].data
      })
    },
    pageChange (v) {
      this.tablePage.pageNum = v.currentPage
      this.tablePage.pageSize = v.pageSize
      this.getResourceList()
    },
    async getResourceList () {
      let params = {
        ...this.form,
        ...this.tablePage
      }
      delete params.total
      const data = await getResourceList(params)
      console.log(data)
      this.tableData = data.data.list
      this.tablePage.total = +data.data.total
    }
  }
}
</script>

<style lang="scss" scoped>
	.el-main {
		margin: 0 auto;
		padding: 24px;
		max-width: 1400px;
		min-width: 1100px;
		.el-page-header {
			margin-bottom: 16px;
		}
	}
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
	::v-deep .vxe-table {
		.vxe-table--body {
			.cell-click {
				font-weight: bold;
				color: #409EFF;
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
