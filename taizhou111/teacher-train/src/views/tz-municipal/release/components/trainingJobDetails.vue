<template>
	<el-card class="box-card">
		<div class="operationContent">
			<h4>作业名称作业名称作业名称作业名称作业名称</h4>
			<div class="opeConMain">
				<span><i class="fa fa-bookmark" aria-hidden="true"></i>题目：</span>
				<div>作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称作业名称.</div>
			</div>
			<el-collapse-transition>
				<div v-show="showCon" class="opeConFoot">
					<span><i class="fa fa-bookmark-o" aria-hidden="true"></i>我的答案：</span>
					<div>我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案我的答案.</div>
				</div>
			</el-collapse-transition>
			
			<div class="opeConBtn">
				<el-button @click="showCon = !showCon">
					{{ showCon ? '收起我的答案' : '展开我的答案' }}
					<i :class="showCon ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" />
				</el-button>
			</div>
		</div>
		
		<comment></comment>
	</el-card>
</template>

<script>
import comment from './Comment/Comment.vue'

export default {
  name: 'seminarDetails',
	components:{
	  comment
	},
  data() {
    return {
			showCon: false
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
		padding: 20px 120px;
	}
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.operationContent {
		font-size: 14px;
		h4 {
			font-size: 24px;
			text-align: center;
		}
		.opeConMain {
			line-height: 2;
			& span {
				font-size: 16px;
				color: #67C23A;
			}
			.fa {
				margin-right: 6px;
			}
		}
		.opeConFoot{
			margin-top: 20px;
			padding-top: 20px;
			line-height: 2;
			border-top: 1px dashed #C0C4CC;
			& span {
				font-size: 16px;
				color: #67C23A;
			}
			.fa {
				margin-right: 6px;
			}
		}
		.opeConBtn {
			margin-top: 16px;
			text-align: center;
		}
	}
	::v-deep .hbl-fa {
		.hbl-comm {
			position: relative;
			padding: 36px 0 36px 79px;
			.comment-avatar {
				position: absolute;
				top: 36px;
				left: 0;
			}
			.comment {
				width: 100%;
			}
		}
	}
</style>
