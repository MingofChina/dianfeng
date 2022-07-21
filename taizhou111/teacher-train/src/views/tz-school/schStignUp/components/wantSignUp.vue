<template>
  <div>
    <el-dialog title="我要报名" width="980px" :close-on-click-modal="false" :visible.sync="wantSignUp">
    <h5 class="redText">说明：勾选教师后，必须在当前页点击下方的“提交”按钮，不能跨页选择后提交。</h5>

    <el-form :model="form" :inline="true" class="demo-form-inline">
      <el-form-item label="姓名:"><el-input v-model="form.name" clearable placeholder="请输入" /></el-form-item>

      <el-form-item label="单位:"><el-input v-model="form.units" clearable placeholder="请输入" /></el-form-item>

      <el-form-item><el-button type="primary" @click="getData">查询</el-button></el-form-item>
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
    </el-dialog>
  </div>
</template>

<script>
import { getSignUpUser, addReport } from '@/api/train.js';
export default {
  name: 'newTrainingJob',
  props: {
    rowId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      wantSignUp:false,
      form: {
        name: '',
        units: ''
      },
      useridsss:[],
      tableData: [],
      loading: false,
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      ids: ''
    };
  },
  watch: {
    // rowId(newVal, oldVal) {
    //   if (newVal) {
    //     this.getData();
    //   }
    // }
  },
  mounted() {
    // this.getData();
  },
  methods: {
     shows(){

       this.wantSignUp=true

     },
    // 多选
    checkboxChange(row ) {
   
      // row.isCheck = !row.isCheck;
      // let len = this.tableData.filter(item => item.isCheck);
      // this.ids = len.map(item => item.id);
        this.useridsss=[]
        this.useridsss=row.records
    },
    // 全选
    selectAllEvent(row) {

        this.useridsss=[]
        this.useridsss=row.records
    },
    //提交
    onSubmit() {
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
          this.$refs.xGrid.removeRadioRow();
          this.$message.success(res.message);
          this.wantSignUp=false
          this.$emit('chooseClose', false);
          // this.getData();
        });
      } else {
        this.$message.warning('请选择报名数据');
      }
    },
    // 翻页
    pageChange(e) {

      this.tablePage.currentPage= e.currentPage;
      this.tablePage.pageSize =e.pageSize;

      this.getData();
    },
    // 表格数据
    async getData() {
      const params = {
        activeId: this.rowId,
        pageNum: this.tablePage.currentPage,
        pageSize: this.tablePage.pageSize,
        name: this.form.name,
        schoolName: this.form.units
      };
      this.loading = true;
      const res = await getSignUpUser(params);
      if (res.code == 200) {

        this.loading = false;
        this.tableData = res.data.list;
        this.tablePage.total = parseInt(res.data.total);
         this.wantSignUp=true
        if (this.tableData.length > 0) {
          this.tableData.forEach(item => {
            if (item.sex == 1) {
              this.$set(item, 'sexName', '男');
            } else if(item.sex == 0) {
              this.$set(item, 'sexName', '女');
            }else {
               this.$set(item, 'sexName', ' ');
            }
            this.$set(item, 'isCheck', false);
          });

        }
      }else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
       this.loading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.redText {
  margin: 12px 0;
  color: #f56c6c;
}
</style>
