
<template>
  <el-form :label-position="labelPosition" label-width="120px" :model="form">
    <el-form-item label="请选择上级分类:" v-if="!isShow">
      <el-select v-model="form.chooseCategory" placeholder="请选择" clearable>
        <el-option :label="item.name" :value="item.id" v-for="(item, index) in options" :key="index"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="分类名称:"><el-input v-model="form.categoryName" maxlength="20" show-word-limit></el-input></el-form-item>

    <div class="buttonItem">
      <div>
        <el-button type="primary" @click="submitForm('form')">保 存</el-button>
        <el-button @click="closeDia">关 闭</el-button>
      </div>
    </div>
  </el-form>
</template>
<script>
import { getCourse, addTrainCourse, editTrainCourse } from '@/api/train.js';
export default {
  name: 'newCourseCategory',
  props: ['radioChangeRow','options'],
  data() {
    return {
      labelPosition: 'left',
      form: {
        chooseCategory: '',
        categoryName: ''
      },
      ids:'',
      isShow:''
    };
  },
  mounted() {
    if(this.radioChangeRow){
      this.ids = this.radioChangeRow.id
      if(this.radioChangeRow.classificationOne){
        this.form.categoryName = this.radioChangeRow.classificationOne
        this.form.chooseCategory  = ''
      }else{
        this.form.categoryName = this.radioChangeRow.classificationTow
        this.form.chooseCategory = this.radioChangeRow.parentId
      }
    }
  },
  watch: {
    radioChangeRow(newVal, oldVal) {
      if (newVal) {
        this.ids = newVal.id
        this.isShow = newVal.classificationOne ? true : false
        if(newVal.classificationOne){
          this.form.chooseCategory  = ''
          this.form.categoryName = newVal.classificationOne
        }else{
          this.form.categoryName = newVal.classificationTow
          this.form.chooseCategory = newVal.parentId
        }
      }
    }
  },
  methods: {
    // 新建保存
    submitForm() {
      if (this.form.categoryName == '') {
        this.$message.warning('请填写分类名称');
        return;
      }
      let params = {};
      if(this.radioChangeRow){
        params={
          id: this.ids,
          categoryName: this.form.categoryName,
          parentId: this.form.chooseCategory || 0,
        }
      }else{
        params ={
          activityId: sessionStorage.getItem('actId'),
         categoryName: this.form.categoryName,
         parentId: this.form.chooseCategory || 0}
      }
      addTrainCourse(params).then(res => {
        if (res.code == 200) {
          this.$message.success(res.message)
          this.closeDia();
          this.form.categoryName = this.form.chooseCategory = '';
        }
      });
    },
    //课程分类
    closeDia() {
      let obj = {
        type: this.radioChangeRow ? 1 : 2,
        value: false
      };
      this.$emit('closeDia', obj);
    }
  }
};
</script>

<style lang="scss" scoped>
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
    border-top: 1px solid #dcdfe6;
  }
  div {
    display: inline-block;
  }
  .el-button + .el-button {
    margin-left: 24px;
  }
}
.el-cascader.el-cascader--medium {
  margin-left: 12px;
}
