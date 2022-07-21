<template>
  <div>
    <h5 class="redText">说明：勾选教师后，必须在当前页点击下方的“提交”按钮，不能跨页选择后提交。</h5>

    <el-form :model="form" :inline="true" class="demo-form-inline">
      <el-form-item label="姓名:"><el-input v-model="form.name" clearable placeholder="请输入" /></el-form-item>

      <el-form-item label="单位:"><el-input v-model="form.units" clearable placeholder="请输入" /></el-form-item>

      <el-form-item><el-button type="primary" @click="getUserName">查询</el-button></el-form-item>
    </el-form>

    <vxe-table
      ref="xGrid"
      border
      stripe
      header-align="center"
      show-header-overflow
      show-overflow
      :row-config="{ isHover: true }"
      :data="tableData"
      :edit-config="{ trigger: 'manual', mode: 'row' }"
      :checkbox-config="{ highlight: true }"
      @checkbox-change="checkboxChange"
      @checkbox-all="selectAllEvent"
    >
      <vxe-column type="checkbox" width="40" align="center" />
      <vxe-column type="seq" title="序号" width="60" align="center" />
      <vxe-column field="realName" title="姓名" align="center" />
      <vxe-column field="sexName" title="性别" align="center" />
      <vxe-column field="areaName" title="区域" align="center" />
      <vxe-column field="schoolName" title="单位" min-width="200" align="center" />
      <vxe-column field="sectionName" title="学段" align="center" />
      <vxe-column field="subjectName" title="学科" align="center" />
    </vxe-table>

    <vxe-pager :current-page="tablePage.currentPage" :page-size="tablePage.pageSize" :total="tablePage.total" @page-change="pageChange">
      <template #left>
        <span class="page-left"><el-button type="primary" size="small" @click="onSubmit">提 交</el-button></span>
      </template>
    </vxe-pager>
  </div>
</template>

<script>
import { getUserName, addReport } from '@/api/train.js'
export default {
  name: 'NewTrainingJob',
  data() {
    return {
      form: {
        name: '',
        units: ''
      },
      tableData: [],
      loading: false,
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      ids: null,
      useridsss:[],
      isAllCheck: false
    }
  },
  mounted() {
    this.getUserName()
  },
  methods: {
    // 多选
    checkboxChange(row) {
      // row.isCheck = !row.isCheck
      // if (this.tableData.length > 0) {
      //   this.tableData.forEach(item => {
      //     if (item.isCheck == false) {
      //       this.isAllCheck = false
      //     }
      //   })
      // }
      console.log(row,4444)
         this.useridsss=[]
        this.useridsss=row.records
    },
    // 全选
    selectAllEvent(row) {
    
        this.useridsss=[]
        this.useridsss=row.records
    },
    // 提交
    onSubmit() {
      // let id = ''
      // if (this.isAllCheck) {
      //   id = this.ids
      // } else {
      //   const len = this.tableData.filter(item => item.isCheck)
      //   id = len.map(item => item.id)
      // }
      // if (id) {
      //   const params = {
      //     activeId: sessionStorage.getItem('actId'),
      //     userIds: id
      //   }

          if ( this.useridsss.length > 0) {
        let  data =sessionStorage.getItem('actId')
         let  param = this.useridsss.map((el)=>{
                return {
                     areaId:el.areaId,
                     schoolId:el.schoolId,
                     userId:el.id
                    }
         })
        let datas = {
          activeId:data,
          params:param
        };
        addReport(datas).then(res => {
          this.$message.success(res.message)
          this.$refs.xGrid.removeRadioRow()
          this.$emit('chooseClose', false)
          this.getUserName()
        })
      } else {
        this.$message.warning('请选择新增教师')
      }
    },
    // 分页
    pageChange({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
      this.getUserName()
    },
    // 表格
    async getUserName() {
      const params = {
        pageNum: this.tablePage.currentPage,
        pageSize: this.tablePage.pageSize,
        realName: this.form.name,
        schoolName: this.form.units
      }
      const res = await getUserName(params)
      if (res.code == 200) {
        this.tableData = res.data.list
        this.tablePage.total = parseInt(res.data.total)
        if (this.tableData.length > 0) {
          this.tableData.forEach(item => {
            if (item.sex == 0) {
              this.$set(item, 'sexName', '女')
            }
            if (item.sex == 1) {
              this.$set(item, 'sexName', '男')
            }
            this.$set(item, 'isCheck', false)
          })
        }
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
