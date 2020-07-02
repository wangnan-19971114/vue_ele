<template>

  <div id="app">
    <div id="nav">
      <div>
        <el-page-header @back="$store.commit('OUT_LOGIN')" content="饿了吗后台管理系统" class="el_header"></el-page-header>
      </div>
      <!--<el-page-header @back="$store.commit('OUT_LOGIN')" content="饿了吗后台管理系统"></el-page-header>-->
      <el-col :span="5">
        <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose">
          <el-submenu index="1">
            <template s lot="title">
              <i class="el-icon-location"></i>
              <span>后台管理</span>
            </template>
              <el-menu-item index="1-1-1"><router-link to="/">返回首页</router-link></el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>管理员登陆日志</span>
            </template>
              <el-menu-item index="2-1-1"><router-link to="/adminLog">查看管理员登陆日志111</router-link></el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商店管理</span>
            </template>
            <el-menu-item index="3-1-1"><router-link to="/shopType">店铺类别管理</router-link></el-menu-item>
            <el-menu-item index="3-1-2"><router-link to="/shop">店铺管理</router-link></el-menu-item>
          </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>商品管理</span>
                </template>
                <el-menu-item index="4-1-1"><router-link to="/commodityType">商品类别管理</router-link></el-menu-item>
            </el-submenu>
        </el-menu>
      </el-col>
      <!--<router-link to="/about">About</router-link>|-->
      <!--<router-link to="/shopManage">店铺管理</router-link>|-->
    </div>
    <router-view/>
  </div>
</template>
<script>
    export default {
        methods: {
            handleOpen(key, keyPath) {
              //  console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
             //   console.log(key, keyPath);
            }
        }
    }
</script>
<style lang="less">
    *{
        margin:0;padding:0;
    }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
    .el-col{
        height:600px;
    }
    .el_header{
      padding:10px 0;border-bottom: 1px solid #999999;margin-bottom:5px;
    }
</style>
