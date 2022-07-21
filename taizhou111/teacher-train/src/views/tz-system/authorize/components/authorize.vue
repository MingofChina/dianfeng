<template>
	<el-card class="box-card">
		<el-tabs v-model="activeName">
			<el-tab-pane label="系统管理员" name="first">
				<systemAdmin />
			</el-tab-pane>
			
			<el-tab-pane label="项目管理员" name="second">
				<projectAdmin />
			</el-tab-pane>
			
			<el-tab-pane label="区域管理员" name="third">
				<areaAdmin />
			</el-tab-pane>
			
			<el-tab-pane label="学校管理员" name="fourth">
				<schoolAdmin />
			</el-tab-pane>
		</el-tabs>
	</el-card>
</template>

<script>
import systemAdmin from './systemAdmin.vue'
import projectAdmin from './projectAdmin.vue'
import areaAdmin from './areaAdmin.vue'
import schoolAdmin from './schoolAdmin.vue'

export default {
  name: 'seminarDetails',
	components: {
		systemAdmin,
		projectAdmin,
		areaAdmin,
		schoolAdmin
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
