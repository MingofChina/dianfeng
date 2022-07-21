<template>
	<div>
    <el-dialog
    	title="区参训结果"
    	width="1300px"
    	:close-on-click-modal="false"
    	:visible.sync="areaDisStatistics"
    >
		<el-form :model="form" :inline="true" class="demo-form-inline">
			<el-form-item label="单位:">
				<el-input
					v-model="form.units"
					clearable
					placeholder="请输入"
				/>
			</el-form-item>

			<el-form-item>
				<el-button type="primary"  @click="submit">筛选</el-button>
			</el-form-item>
		</el-form>

		<vxe-table
			ref="sGrid"
			border
			stripe
			header-align="center"

			show-overflow
			:cell-class-name="cellClassName"
			:row-config="{isHover: true}"
			:data="tableData"
			:edit-config="{trigger: 'manual', mode: 'row'}"
			@cell-click="cellClick" >
			<vxe-column type="seq" title="序号" width="60" align="center" />
			<vxe-column field="schoolName" title="学校名称" align="center" width="150" />
		
			<vxe-column field="responsibleName" title="学校管理员" align="center" />
					<vxe-column field="totalNumber" title="参训总人数" align="center" />
			<vxe-column field="checkNumber" title="看课完成率" align="center"  width="150" />
			<vxe-column field="discussRate" title="讨论完成率" align="center"  width="150"/>
			<vxe-column field="operationRate" title="作业完成率" align="center"  width="150"/>
			<vxe-column field="examRate" title="考试合格率" align="center"  width="150"/>
			<vxe-column field="qualifiedCheckNumber" title="培训最终合格率" align="center"  width="150"/> 
		</vxe-table>
		<vxe-pager
			:current-page="tablePage1.currentPage"
			:page-size="tablePage1.pageSize"
			:total="tablePage1.total"
       @page-change="pageChange"
		>
			<template #left>
				<span class="page-left">
					<el-button type="primary" size="small" plain  @click="exportExcel22">导出Excel</el-button>
				</span>
			</template>
		</vxe-pager>
			<schoolDisStatistics  ref="schooldetails" :activictiesid="activictiesid"  :schoolnames="schoolnames"   />
    	</el-dialog>
	</div>
</template>

<script>
import schoolDisStatistics from './schoolDisStatistics.vue'
import { xueqingallinfo} from '@/api/train.js'


export default {
  name: 'areaDisStatistics',
	components: {
		schoolDisStatistics
	},
  props:['dioalgdata'],
  data() {
    return {
      schoolnames:"",
			form: {
			  units: ''
			},
      activictiesid:"",
      areaDisStatistics:false,
			tableData: [],
			tablePage1: {
			  total: 0,
			  currentPage: 1,
			  pageSize: 10
			},
			schoolDisStatistics: false
    }
  },
  methods: {
    exportExcel22(){
    import('@/vendor/Export2Excel').then(excel => {
      const tHeader = ['学校名称', '学校管理员','参训总人数','看课完成率(%)','讨论完成率(%)','作业完成率(%)',"考试合格率(%)","培训最终合格率(%)"] // 表格
      const filterVal = ['schoolName', 'responsibleName','totalNumber',"checkNumber","discussRate","operationRate","examRate","qualifiedCheckNumber", ] // 表格内容
      const list = this.tableData
      const data = this.formatJson(filterVal, list)
      excel.export_json_to_excel({
        header: tHeader,
        data,
        filename: '区级参训结果统计' // 文件名
      })
    })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    submit(){
      this.tablePage1= {
			  total: 0,
			  currentPage: 1,
			  pageSize: 10
			},
      this.gettable()
    },
   pageChange ({ currentPage, pageSize }) {
      this.tablePage1.currentPage = currentPage
      this.tablePage1.pageSize = pageSize
      this.gettable()
    },
  async  shows(){
      await  this.gettable()
     this.areaDisStatistics=true
    },
		// 给活动状态添加样式
		cellClassName({ row, column }) {
		  if (column.title === '学校名称') {
		    return 'cell-click'
		  }
		},
		// 给培训活动添加点击事件
		cellClick({ row, column }) {


		  if (column.title === '学校名称') {

          this.schoolnames=row.schoolName
         this.activictiesid=row.id
        this.$nextTick(()=>{
          this.$refs.schooldetails.shows()
          this.schoolDisStatistics = true
        })
		  }
		},
 async   gettable(){
          let  data ={
            pageNum:this.tablePage1.currentPage,
            pageSize:this.tablePage1.pageSize,
            activeId:this.dioalgdata,
            schoolName:this.form.units,
            areaId:"",
          }
      const res  =await xueqingallinfo(data)
         console.log(res,7777)
         if(res.code==200){
           this.tableData=[]
           this.tableData=res.data.list.map((el)=>{

			return {
				...el,
				checkNumber:el.checkNumber===0?el.checkNumber:el.checkNumber==null?"":parseInt(el.checkNumber*100)+"%",
            discussRate:el.discussRate===0?el.discussRate:el.discussRate==null?"":parseInt(el.discussRate*100)+"%",
            operationRate:el.operationRate===0?el.operationRate:el.operationRate==null?"":parseInt(el.discussRate*100)+"%",
            examRate:el.examRate===0?el.examRate:el.examRate ==null?"":parseInt(el.examRate*100)+"%",
			qualifiedCheckNumber:el.qualifiedCheckNumber===0?el.qualifiedCheckNumber:el.qualifiedCheckNumber==null?"":parseInt(el.qualifiedCheckNumber*100)+"%"
			}
          
		   })



           this.tablePage1.total= Number(res.data.total)
         }else{



         }



    },
  },
  mounted() {

  },
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
	::v-deep .vxe-table {
		.vxe-table--body {
			.vxe-body--column.cell-click {
				color: #409eff;
				cursor: pointer;
			}
		}
	}
	::v-deep .vxe-pager {
		padding-top: 10px;
		.vxe-pager--left-wrapper {
			float: left;
			margin: 0;
		}
	}
</style>
