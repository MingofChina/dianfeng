<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="'/index'"> 🏠 </el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="breadCrumbItem in breadCrumbList"
        :key="breadCrumbItem.path"
        :to="breadCrumbItem.path"
      >
        {{ breadCrumbItem.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  computed: {
    breadCrumbList() {
      return (
        this.$route.matched
          .map((item) => {
            return { path: item.path, meta: item.meta };
          })
          ?.splice(1) || []
      );
    },
  },
};
</script>

<style>
</style>