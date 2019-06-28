<template>

    <el-container>
      <el-aside width="200px"><AppAside/></el-aside>
      <el-container>
        <el-header><AppHeader/></el-header>
        <el-main><router-view/></el-main>
      </el-container>
    </el-container>

</template>

<script>
import AppAside from './components/appAside.vue'
import AppHeader from './components/appHeader.vue'

export default {
  name: 'AppLayout',
  components: {
    AppAside,
    AppHeader
  },
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.el-container{
    height: 100%;
    .el-aside{
        height: 100%;

    }
    .el-header{
        height: 100%;
        border-bottom: 1px solid rgb(233, 233, 233);
    }
    .el-main{
        height: 100%;
        background-color: rgb(228, 228, 228);
    }

}
</style>
