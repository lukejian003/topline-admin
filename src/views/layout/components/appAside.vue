<template>
  <el-menu
    default-active="/"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <div class="logo">
      <img src="../logo_admin.png">
    </div>

    <el-menu-item index="/">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>

    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-s-order"></i>
        <span>内容</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/publish">
          <i class="el-icon-edit"></i>
          <span>发布</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span>内容列表</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-menu-item index="/comment">
      <i class="el-icon-s-comment"></i>
      <span slot="title">评论</span>
    </el-menu-item>

    <el-menu-item index="/image">
      <i class="el-icon-picture"></i>
      <span slot="title">素材</span>
    </el-menu-item>

    <el-menu-item index="/fans">
      <i class="el-icon-s-promotion"></i>
      <span slot="title">粉丝</span>
    </el-menu-item>

    <el-menu-item index="/account">
      <i class="el-icon-s-custom"></i>
      <span slot="title">账户</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'appAside',
  data () {
    return {}
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less" scoped>
.logo {
  width: 100%;
  background-color: rgb(67, 74, 80);
  img {
    padding: 15px;
    width: 80%;
  }
}

.el-menu {
  height: 100%;
}
</style>
