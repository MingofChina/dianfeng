<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="getTab">
      <el-tab-pane label="按学段统计" name="first"></el-tab-pane>
      <el-tab-pane label="按学科统计" name="second"></el-tab-pane>
      <el-tab-pane label="按课程分类统计" name="third"></el-tab-pane>
    </el-tabs>
    <el-table style="width: 100%"><el-table-column v-for="(item, index) in tableArr" prop="dictionaries" :label="item.name"></el-table-column></el-table>
  </div>
</template>

<script>
import VXETable from 'vxe-table';
import { getStatistics } from '@/api/train.js';
export default {
  props: {
    tableArr: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      activeName: 'first'
    };
  },
  methods: {
    getTab(e) {
      this.$emit('checkTab', e.index);
    }
  }
};
</script>

<style lang="scss" scoped></style>
