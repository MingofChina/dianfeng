<template>
  <el-upload
    :action="action"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :before-upload="beforeUpload"
    :file-list="currentFileList"
    :list-type="listType"
    :limit="limit"
    :headers="{
      token: token
    }"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <template #[item] v-for="(item) in Object.keys($slots)">
        <slot :name="item"></slot>
      </template>
	</el-upload>
</template>

<script>
import { baseurlimgs, baseURL11 } from '@/utils/request.js';
import { mapGetters } from 'vuex';
export default {
  name: 'uploadCompent',
  props: {
    fileList: {
      type: Array
    },
    listType: {
      type: String,
      default: ''
    },
    accept: {
      type: Array
    },
    sizeLimit: {
      type: [String, Number]
    },
    limit: {
      type: [String, Number]
    }
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['token']),
    action () {
      return baseurlimgs
    },
    currentFileList: {
      get () {
        return this.fileList
      },
      set (v) {
        this.$emit('update:fileList', v)
      }
    }
  },
  mounted () {
  },
  methods: {
    handleRemove(file, fileList) {
      let index = this.currentFileList.findIndex(item => item.id == file.id)
      this.currentFileList.splice(index, 1)
     console.log(this.currentFileList)
    },
    beforeUpload(file) {
      console.log(file)
      const type = file.name.split('.').slice(-1)[0]
      const size = file.size
      if (this.accept) {
        if (!this.accept.includes(type)) {
          this.$message('上传格式不对')
          return false
        }
      }
      if (this.sizeLimit && this.sizeLimit < size) {
          this.$message('上传文件超过限制')
          return false
      }
      return true
    },
    handleSuccess (res) {
      const files = res.data.map(item => ({...item, url: baseURL11 +'/upload/'+item.url + '/'+item.annexName, originUrl: item.url}))
      this.currentFileList.push(...files)
      console.log(this.currentFileList)
    }
  }
}
</script>