<template>
  <el-main>
    <router-view></router-view>
  </el-main>
</template>

<script>
export default {
  name: 'project',
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
</style>
