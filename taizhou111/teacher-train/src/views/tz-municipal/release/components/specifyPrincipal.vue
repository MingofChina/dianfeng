<template>
  <div>
    <el-form :model="form" :inline="true" class="demo-form-inline">
      <el-form-item label="姓名:"><el-input v-model="form.name" clearable placeholder="请输入" /></el-form-item>
      <el-form-item label="单位:"><el-input v-model="form.schoolName" clearable placeholder="请输入" /></el-form-item>
      <el-form-item><el-button type="primary" @click="search">查询</el-button></el-form-item>
    </el-form>

    <vxe-table
      ref="sGrid"
      border
      stripe
      header-align="center"
      show-header-overflow
      show-overflow
      :row-config="{ isHover: true }"
      :data="tableData"
      :edit-config="{ trigger: 'manual', mode: 'row' }"
      :checkbox-config="{ highlight: true }"
      @checkbox-all="selectAllEvent"
      @checkbox-change="selectChangeEvent"
    >
      <vxe-column type="checkbox" width="40" align="center" />
      <vxe-column type="seq" title="序号" width="60" align="center" />
      <vxe-column field="realName" title="姓名" align="center" />
      <vxe-column field="sexName" title="性别" align="center" />
      <vxe-column field="schoolName" title="单位" min-width="200" align="center" />
      <vxe-column field="sectionName" title="所教学段" align="center" />
      <vxe-column field="subjectName" title="所教学科" align="center" />
    </vxe-table>

    <vxe-pager :current-page="tablePage.currentPage" :page-size="tablePage.pageSize" :total="tablePage.total" @page-change="pageChange">
      <template #left>
        <span class="page-left"><el-button type="primary" size="small" @click="submitClick">提 交</el-button></span>
      </template>
    </vxe-pager>
  </div>
</template>

<script>
import { getUserList, setSpecity1 } from '@/api/train.js'
export default {
  name: 'NewTrainingJob',
  props: {
    areaId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      form: {
        name: '',
        schoolName: ''
      },
      tableData: [], // 表格
      loading: false,
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      usersId: null //	负责人ID
    }
  },
  mounted() {
    this.getTable()
  },
  methods: {
    search() {
      this.tablePage.currentPage = 1
      this.getTable()
    },
    // 列表
    async getTable() {
      const params = {
        pageNum: this.tablePage.currentPage,
        pageSize: this.tablePage.pageSize,
        realName: this.form.name,
        schoolName: this.form.schoolName
      }
      const res = await getUserList(params)
      if (res.code == 200) {
        this.tableData = res.data.list
        this.tablePage.total = parseInt(res.data.total)
        if (this.tableData.length > 0) {
          this.tableData.forEach(item => {
            this.$set(item, 'isCheck', false)
            if (item.sex === 0) {
              this.$set(item, 'sexName', '女')
            }
            if (item.sex === 1) {
              this.$set(item, 'sexName', '男')
            }
          })
        }
      }
    },
    // 全选
    selectAllEvent({ checked }) {
      if (checked) {
        this.usersId = this.tableData.map(item => item.id).join()
      } else {
        this.usersId = null
      }
    },
    // 单选
    selectChangeEvent(e) {
      e.row.isCheck = !e.row.isCheck
      this.usersId = this.tableData
        .filter(item => item.isCheck)
        .map(ele => ele.id)
        .join()
    },
    // 提交
    async submitClick() {
      if (this.usersId) {
        const params = {
          installId: this.areaId,
          userIds: this.usersId,
          type: 0
        }
        const res = await setSpecity1(params)
        if (res.code == 200) {
          this.$message.success(res.message)
          this.getTable()
          this.form.name = this.form.schoolName = ''
          this.$emit('closeSpecify', false)
        }
      } else {
        this.$message.warning('请选择区域负责人')
      }
    },
    // 翻页
    pageChange({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
      this.getTable()
    }
  }
}
</script>

<style lang="scss" scoped>
.redText {
  margin: 12px 0;
  color: #f56c6c;
}
</style>
