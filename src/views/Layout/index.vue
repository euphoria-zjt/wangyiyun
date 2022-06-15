<template>
  <div>
    <van-nav-bar :title="activeTitle" fixed />
    <div class="main">
      <!-- 二级路由 -->
      <router-view></router-view>
    </div>

    <van-tabbar route>
      <van-tabbar-item replace to="/layout/home" icon="home-o"
        >首页</van-tabbar-item
      >
      <van-tabbar-item replace to="/layout/search" icon="search"
        >搜索</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTitle: this.$route.meta.title,//顶部导航要显示标题(默认获取当前路由对象里的meta中的title值)
    }
  },
  watch: {//路由切换侦听$route对象改变
    $route() {
      this.activeTitle = this.$route.meta.title//提取切换后路由里的title显示
    }
  }
}
</script>

<style scoped>
/* 中间内容区域 - 容器样式(留好上下导航所占位置) */
.main {
  padding-top: 46px;
  padding-bottom: 50px;
}
</style>