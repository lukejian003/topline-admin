<template>
  <el-row :gutter="0">
    <el-col :span="15">
      <div class="grid-content bg-purple">江苏传智播客教育科技股份有限公司</div>
    </el-col>
    <el-col :span="4" :offset="4">
      <div class="grid-content bg-purple">
        <el-dropdown>
          <span class="el-dropdown-link">
            <!-- <img class="tx" :src="userInfo.photo" alt="头像"> -->
            <img class="tx" src="https://i02piccdn.sogoucdn.com/730a5f7e1b989302" alt="头像">
            {{userInfo.name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>账户设置</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.userInfo = JSON.parse(window.localStorage.getItem('user_info'))
    // console.log(this.userInfo)
  }
}
</script>

<style lang="less" scoped>
.tx{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #409eff;
    margin-right: 10px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
    display: flex;
  align-items: center;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.grid-content {
  height: 60px;
  display: flex;
  align-items: center;
}
</style>
