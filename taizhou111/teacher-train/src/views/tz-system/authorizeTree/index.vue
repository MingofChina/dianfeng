<template>
  <el-main>
    <el-card class="box-card">
      <div>
        <vxe-button type="primary" status="primary" content="添加" @click="add" />
      </div>
      <vxe-table
        border="inner"
        ref="xTree"
        :tree-config="{children: 'children'}"
        :column-config="{resizable: true}"
        :data="tableData">
        <vxe-column type="radio" tree-node></vxe-column>
        <vxe-column field="name" title="权限名称" tree-node></vxe-column>
        <vxe-column field="url" title="后台路由"></vxe-column>
        <vxe-column field="path" title="前端菜单"></vxe-column>
        <vxe-column field="sort" title="序号"></vxe-column>
        <vxe-column title="操作">
          <template #default="{row}">
            <vxe-button type="text" status="primary" content="添加子集" @click="add(row)" />
            <vxe-button type="text" status="primary" content="修改" @click="edit(row)" />
            <vxe-button type="text" status="primary" content="删除" @click="del(row)" />
          </template>
        </vxe-column>
      </vxe-table>
    </el-card>
    <el-dialog
      title="配置权限"
      :close-on-click-modal="false"
      :visible.sync="visible"
    >
      <el-form ref="ruleForm" :model="formData" label-width="130px" class="demo-ruleForm">
        <el-form-item label="父级权限名称:" v-if="parentName">
          {{parentName}}
        </el-form-item>
        <el-form-item label="权限名称:" prop="name">
          <el-input size="small" v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="前端菜单:" prop="permissionList">
          <el-input size="small" v-model="formData.path"></el-input>
        </el-form-item>
        <el-form-item label="后台路由:" prop="permissionList">
          <el-input size="small" v-model="formData.url"></el-input>
        </el-form-item>
        <el-form-item label="序号:" prop="permissionList">
          <el-input size="small" v-model="formData.sort"></el-input>
        </el-form-item>
        <div class="buttonItem" style="display: flex;justify-content: center;">
          <div>
            <el-button type="primary" @click="submitForm">修改</el-button>
            <el-button @click="visible = false">关 闭</el-button>
          </div>
        </div>
      </el-form>
    </el-dialog>
  </el-main>
</template>

<script>
import { getPermissionTree, addPermissionTree, editPermissionTree, delPermissionTree } from '@/api/system'
export default {
  name: 'authorize-tree',
  data () {
    return {
      tableData: [],
      formData: {},
      visible: false,
      mode: 'add',
      parentName: '',
    }
  },
  async mounted () {
    this.getPermissionTree()
    
  },
  methods: {
    add(row) {
      console.log(row)
      this.mode = 'add'
      this.parentName = ''
      this.formData = {}
      if (row) {
        this.parentName = row.name
        this.formData.parentId = row.id
      }
      this.visible = true
    },
    edit(row) {
      this.mode = 'edit'
      this.formData = row
      this.visible = true
    },
    async del(row) {
      await delPermissionTree(row.id)
      this.$message('删除成功')
      this.getPermissionTree()
    },
    async submitForm () {
      const params = {
        ...this.formData
      }
      const api = {
        add: addPermissionTree,
        edit: editPermissionTree
      }
      await api[this.mode](params)
      this.visible = false
      this.getPermissionTree()

    },
    async getPermissionTree () {
      const data = await getPermissionTree()
      this.tableData = data.data
    },
  }
}
</script>