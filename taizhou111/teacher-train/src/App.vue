<template>
  <div id="app"><router-view /></div>
</template>

<script>
export default {
  name: 'App',
    data() {
    return {
			
    }
  },
  mounted(){
    //添加监听事件
    window.addEventListener('beforeunload ', e => this.beforeunloadHandler(e))
  },
  methods: {
     beforeunloadFn(e) {
      console.log(111111111111111111)
       this.$store.dispatch('user/logout')
    }
  },
  created() {
    window.addEventListener('beforeunload', e => this.beforeunloadFn(e))
  },


}
</script>

<style lang="scss" scoped>
#app {
  min-width: 1300px;
}
</style>
