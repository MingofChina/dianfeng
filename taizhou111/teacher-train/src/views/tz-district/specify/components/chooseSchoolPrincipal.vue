<template>
  <div>
    <el-dialog :modal="false"
               title="选择学校负责人"
               width="800px"
               :visible.sync="newClick"
               @closed="closeddialog">
      <el-form :model="form"
               :inline="true"
               class="demo-form-inline">
        <el-form-item label="姓名:">
          <el-input v-model="form.name"
                    clearable
                    placeholder="请输入" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     @click="getTable1">查询</el-button>
        </el-form-item>
      </el-form>

      <vxe-table ref="sGrid"
                 border
                 stripe
                 header-align="center"
                 show-header-overflow
                 show-overflow
                 :row-config="{ isHover: true }"
                 :data="tableData"
                 :loading="loading22"
                 :edit-config="{ trigger: 'manual', mode: 'row' }"
                 :checkbox-config="{ highlight: true }"
                 @checkbox-all="selectAllEvent"
                 @checkbox-change="selectChangeEvent">
        <vxe-column type="checkbox"
                    width="40"
                    align="center" />
        <vxe-column type="seq"
                    title="序号"
                    width="60"
                    align="center" />
        <vxe-column field="realName"
                    title="姓名"
                    align="center" />
        <vxe-column field="sexName"
                    title="性别"
                    align="center" />
        <vxe-column field="schoolName"
                    title="单位"
                    min-width="200"
                    align="center" />
        <vxe-column field="sectionName"
                    title="所教学段"
                    align="center" />
        <vxe-column field="subjectName"
                    title="所教学科"
                    align="center" />
      </vxe-table>

      <vxe-pager :current-page="tablePage.currentPage"
                 :page-size="tablePage.pageSize"
                 :total="tablePage.total"
                 @page-change="pageChange">
        <template #left>
          <span class="page-left">
            <el-button type="primary"
                       size="small"
                       @click="submitClick">提 交</el-button>
          </span>
        </template>
      </vxe-pager>
    </el-dialog>
  </div>
</template>

<script>
import { getUserName, setSpecity } from '@/api/train.js'
export default {
  name: 'NewTrainingJob',
  props: {
    rowName: {
      type: String,
      default: ''
    },
    rowId: {
      type: String,
      default: ''
    },
    activityId: {
      type: String,
      default: ''
    },
    areaid: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loading22: false,
      newClick: false,
      form: {
        name: ''
      },
      tableData: [],
      loading: false,
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      usersId: null //	负责人ID
    }
  },
  watch: {
    rowName (newVal, oldVal) {
      if (newVal) {
        this.getTable()
      }
    }
  },

  created () {
    this.getTable()
  },
  methods: {
    closeddialog () {
      this.tablePage = {
        total: 0,
        currentPage: 1,
        pageSize: 10
      }
      this.form.name = ''
    },
    // 翻页
    pageChange ({ currentPage, pageSize }) {
      this.tablePage.currentPage= currentPage
      this.tablePage.pageSize = pageSize
      this.getTable()
    },
    shows () {
      this.newClick = true
    },
    getTable1 () {
      this.tablePage.currentPage= 1
      this.getTable()
    },
    // 全选
    selectAllEvent ({ checked }) {
      console.log(checked, '')
      if (checked) {
        this.usersId = this.tableData.map(item => item.id).join()
      } else {
        this.usersId = null
      }
    },
    // 单选
    selectChangeEvent (e) {
      e.row.isCheck = !e.row.isCheck
      this.usersId = this.tableData
        .filter(item => item.isCheck)
        .map(ele => ele.id)
        .join()
    },
    // 提交
    async submitClick () {
      
    
      if (this.usersId) {
        const params = {
          areaId: this.areaid,
          userIds: this.usersId,
          type: 1,
          activeId: this.activityId
        }
        const res = await setSpecity(params)
        if (res.code == 200) {
          this.$message.success(res.message)
          this.form.name = ''
          this.newClick = false
          this.$emit('closeDia', false)
        }else {
           this.$message.warning('请选择区域负责人')
        }
      }
    },
    // 表格
    async getTable () {
      this.loading22 = true
      const params = {
        pageNum: this.tablePage.currentPage,
        pageSize: this.tablePage.pageSize,
        realName: this.form.name,
        schoolName: this.rowName,
        activityId: this.activityId
      }
      const res = await getUserName(params)
      if (res.code == 200) {
        this.tableData = []
        this.tableData = res.data.list
        this.tablePage.total = parseInt(res.data.total)

        this.loading22 = false
        if (this.tableData.length > 0) {
          this.tableData.forEach(item => {
            this.$set(item, 'isCheck', false)
            if (item.sex == 1) {
              this.$set(item, 'sexName', '男')
            } else {
              this.$set(item, 'sexName', '女')
            }
          })
        }
      } else {
        this.loading22 = false
      }
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
