<template>
  <el-card class="box-card">
    <h5 class="redText">说明：每次培训务必要指定各区域负责人，方便各区域负责人再指定此次培训每个学校的负责人</h5>

    <vxe-table
      ref="vGrid"
      border
      stripe
      header-align="center"
      show-header-overflow
      show-overflow
      :row-config="{ isHover: true }"
      :data="tableData"
      :edit-config="{ trigger: 'manual', mode: 'row' }"
    >
      <vxe-column field="areaName" title="区域名称" align="center" />
      <vxe-column field="responsibleName" title="负责人姓名" align="center" />
      <vxe-column field="responsibleUnit" title="负责人单位" align="center" />
      <vxe-column field="phones" title="联系手机" align="center" />
      <vxe-column title="操作" align="center">
        <template #default="{ row }">
          <vxe-button type="text" status="primary" content="指定" @click="specifyClick(row)" />
          <vxe-button type="text" status="primary" content="删除" @click="deleteClick(row)" />
        </template>
      </vxe-column>
    </vxe-table>

    <el-dialog title="指定区域负责人" width="980px" :close-on-click-modal="false" :visible.sync="specifyPrincipal">
      <specifyPrincipal @closeSpecify="closeSpecify" :areaId="areaId" />
    </el-dialog>
  </el-card>
</template>

<script>
import specifyPrincipal from './specifyPrincipal.vue';
import { getTrainList, deleteArea } from '@/api/train.js';

export default {
  name: 'seminarDetails',
  components: {
    specifyPrincipal
  },
  data() {
    return {
      tableData: [],
      specifyPrincipal: false,
      areaId: null
    };
  },
  mounted() {
    this.getTrainList1();
  },
  methods: {
    //列表
    async getTrainList1() {
      let params = {
        pageNum: 1,
        pageSize: 999,
        activeId: sessionStorage.getItem('actId')
      };
      const res = await getTrainList(params);
      if (res.code == 200) {
        this.tableData = res.data.list;
      }
    },
    // 指定
    specifyClick(row) {
      this.areaId = row.id;
      this.specifyPrincipal = true;
    },
    //弹窗关闭
    closeSpecify(val) {
      this.specifyPrincipal = val;
      this.getTrainList1();
    },
    // 删除
    deleteClick(row) {
      this.$confirm('此操作将永久删除该活动区域, 是否继续?', '删除活动区域', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteArea(row.id).then(res => {
            this.$message.success(res.message);
            this.getTrainList1();
          });
          this.radioChangeRow = undefined;
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    }
  }
};
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
.redText {
  margin: 12px 0;
  color: #f56c6c;
}
::v-deep .vxe-pager {
  padding-top: 10px;
  .vxe-pager--left-wrapper {
    float: left;
    margin: 0;
  }
}
::v-deep .el-dialog {
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: calc(100% - 60px);
  max-width: calc(100% - 60px);
  .el-dialog__header {
    position: relative;
    &:after {
      position: absolute;
      bottom: 0;
      left: 20px;
      right: 20px;
      content: '';
      border-top: 1px solid #dcdfe6;
    }
  }
  .el-dialog__body {
    flex: 1;
    overflow: auto;
  }
  .buttonItem {
    position: relative;
    text-align: center;
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
}
</style>
