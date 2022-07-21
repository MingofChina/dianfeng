<template>
	<div>
		<vxe-table
			ref="xGrid"
			border
			stripe
			header-align="center"
			show-header-overflow
			show-overflow
			:row-config="{isHover: true}"
			:data="tableData"
			:loading="loading"
			:cell-class-name="cellClassName"
			:edit-config="{trigger: 'manual', mode: 'row'}"
			@cell-click="cellClick" >
			<vxe-column field="level" title="级别" align="center" />
			<vxe-column field="hierarchy" title="层级" align="center" />
			<vxe-column field="remark" title="备注" align="center" />
			<vxe-column title="操作" align="center">
				<template #default="{ row }">
					<vxe-button type="text" status="primary" content="修改" />
					<vxe-button type="text" status="primary" content="删除" />
				</template>
			</vxe-column>
		</vxe-table>
	</div>
</template>

<script>
export default {
  name: 'newTrainingJob',
  data() {
    return {
			tableData: [
			  { level: '- 学前', hierarchy: '0', remark: '' },
			  { level: '- 学前', hierarchy: '0', remark: '' },
			  { level: '- 学前', hierarchy: '0', remark: '' },
			  { level: '- 学前', hierarchy: '0', remark: '' },
			  { level: '- 学前', hierarchy: '0', remark: '' },
			],
    }
  },
  methods: {
		
  }
}
</script>

<style lang="scss" scoped>
	::v-deep .el-form  {
		.el-form-item {
			.el-checkbox-group {
				height: 36px;
			}
		}
	}
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
			border-top: 1px solid #DCDFE6;
		}
		div {
			display: inline-block;
		}
		.el-button + .el-button {
		  margin-left: 24px;
		}
	}
</style>
