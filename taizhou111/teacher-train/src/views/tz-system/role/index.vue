<template>
  <el-main>
    <el-card class="box-card">
      <!-- <el-form :model="form" :inline="true" class="demo-form-inline">
        <el-form-item label="角色名称">
          <el-input
            v-model="form.roleName"
            clearable
            placeholder="请输入角色名称"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">筛选</el-button>
        </el-form-item>
      </el-form> -->
      <vxe-table ref="xGrid"
                 border
                 stripe
                 header-align="center"
                 show-header-overflow
                 show-overflow
                 :row-config="{isHover: true}"
                 :data="tableData"
                 :loading="loading"
                 :edit-config="{trigger: 'manual', mode: 'row'}"
                 :radio-config="{highlight: true}"
                 @radio-change="radioChange">
        <vxe-column type="radio"
                    width="40"
                    align="center" />
        <!-- <vxe-column field="id" title="id" align="center" /> -->
        <vxe-column field="roleName"
                    title="角色名称"
                    align="center" />
        <!-- 		<vxe-column field="khSchoolType" title="单位类型" align="center" /> -->
      </vxe-table>

      <vxe-pager :current-page="form.pageNum"
                 :page-size="form.pageSize"
                 :total="total"
                 @page-change="pageChange">
        <template #left>
          <span class="page-left">
            <el-button type="primary"
                       size="small"
                       plain
                       @click="editPerssion">配置权限</el-button>
          </span>
        </template>
      </vxe-pager>

      <el-dialog title="配置权限"
                 :close-on-click-modal="false"
                 :visible.sync="visible"
                 @close="close">
        <el-form ref="ruleForm"
                 :model="ruleForm"
                 label-width="130px"
                 class="demo-ruleForm">
          <el-form-item label="角色名称:"
                        prop="name">
            {{ currentData.roleName }}
          </el-form-item>
          <el-form-item label="权限:"
                        prop="permissionList">
            <!-- <el-tree ref="perssionRef" :data="permissionList" show-checkbox default-expand-all node-key="key" /> -->
            <el-tree ref="perssionRef" :props="perssionProps" :data="permissionList" show-checkbox :default-expand-all="false" node-key="id" />
          </el-form-item>

          <div class="buttonItem"
               style="display: flex;justify-content: center;">
            <div>
              <el-button type="primary"
                         @click="submitForm">修改</el-button>
              <el-button @click="close">关 闭</el-button>
            </div>
          </div>
        </el-form>
      </el-dialog>
    </el-card>
  </el-main>
</template>
<script>
import { getroleinfo, getroledetail, editRoledetail, getPermissionTree } from '@/api/system'
export default {
  name: 'Role',
  data () {
    return {
      form: {
        pageNum: 1,
        pageSize: 10,
        roleName: ''
      },
      total: 0,
      tableData: [],
      loading: false,
      ruleForm: {},
      currentDataID: null,
      currentData: {},
      visible: false,
      permissionList: [{
        label: '系统管理',
        children: [
          {
            label: '用户管理',
            children: [
              {
                label: '增加'
              },
              {
                label: '删除'
              },
              {
                label: '修改'
              }
            ]
          }
        ]
      }],
      perssionProps: {
        label: 'name',
        children: 'children'
      },

    }
  },
  mounted () {
    this.getTableList()
    // this.permissionList = getPerssionList
    this.getPermissionTree()
  },
  methods: {
    async submitForm () {
      const data = this.$refs.perssionRef.getCheckedKeys()
      console.log(data)
      await this.editRoledetail(data)
      this.close()
      this.onSubmit()
    },
    onSubmit () {
      this.form.pageNum = 1
      this.getTableList()
    },
    radioChange (e, a, b) {
      console.log(e, a, b)
      this.currentDataID = e.row.id
    },
    editPerssion () {
      if (!this.currentDataID) return
      this.visible = true
      this.getroledetail()
    },
    pageChange (e) {
      this.form.pageNum = e.currentPage
      this.form.pageSize = e.pageSize
      this.getTableList()
    },
    getTableList () {
      const params = {
        ...this.form
      }
      this.loading = true
      getroleinfo(params).then(res => {
        console.log(res)
        this.tableData = res.data
      }).finally(() => {
        this.loading = false
      })
    },
    getroledetail () {
      getroledetail(this.currentDataID).then(res => {
        this.currentData = res.data
        this.$nextTick(() => {
          // this.currentData.permissionList = ['/user/add']
          this.currentData.permissionList = this.currentData.permissionList ?? []
          this.$refs.perssionRef.setCheckedKeys(this.currentData.permissionList.map(item => item.id))
        })
      })
    },
    async editRoledetail (permissionList = []) {
      const params = {
        id: this.currentDataID,
        permissionList: permissionList.map(item => ({id: item}))
      }
      await editRoledetail(params)
      this.$message('修改成功')
      return
    },
    getPermissionTree () {
      getPermissionTree().then(res => {
        console.log(res)
        this.permissionList = res.data
      })
    },
    close () {
      this.visible = false
      this.currentData = {}
    }
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
::v-deep .el-form.demo-form-inline {
  margin-bottom: -12px;
}
::v-deep .vxe-table {
  .vxe-table--body {
    .cell-zb,
    .cell-bm,
    .cell-px,
    .cell-pj,
    .cell-js {
      font-weight: bold;
    }
    .vxe-body--column.cell-zb {
      color: #e6a23c;
    }
    .vxe-body--column.cell-bm {
      color: #409eff;
    }
    .vxe-body--column.cell-px {
      color: #67c23a;
    }
    .vxe-body--column.cell-pj {
      color: #f56c6c;
    }
    .vxe-body--column.cell-js {
      color: #b1b3b8;
    }
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
      content: "";
      border-top: 1px solid #dcdfe6;
    }
  }
  .el-dialog__body {
    flex: 1;
    overflow: auto;
  }
}
</style>
