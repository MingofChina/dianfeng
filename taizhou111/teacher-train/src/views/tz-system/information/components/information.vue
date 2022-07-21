<template>
	<el-card class="box-card">
		<el-tabs v-model="activeName">
			<el-tab-pane label="学段" name="first">
				<sectionManage />
			</el-tab-pane>
			
			<el-tab-pane label="学科" name="second">
				<subjectManage />
			</el-tab-pane>
		</el-tabs>
	</el-card>
</template>

<script>
import sectionManage from './sectionManage.vue'
import subjectManage from './subjectManage.vue'

export default {
  name: 'seminarDetails',
	components: {
		sectionManage,
		subjectManage,
	},
  data() {
    return {
			activeName: 'first'
    }
  },
  methods: {
		
  }
}
</script>

<style lang="scss" scoped>
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
</style>
