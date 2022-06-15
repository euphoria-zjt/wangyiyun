<template>
  <div>
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      shape="round"
      @input="inputFn"
    />
    <!-- 搜索下的容器 -->
    <div class="search_wrap" v-if="this.resultsList.length === 0">
      <!-- 标题 -->
      <p class="hot_title">热门搜索</p>
      <!-- 热搜关键词容器 -->
      <div class="hot_name_wrap">
        <!-- 搜索词 -->
        <span
          class="hot_item"
          v-for="(obj, index) in hotArr"
          :key="index"
          @click="fn(obj.first)"
          >{{ obj.first }}</span
        >
      </div>
    </div>

    <!-- 搜索结果 -->
    <div class="search_wrap" v-else>
      <!-- 标题 -->
      <p class="hot_title">最佳匹配</p>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <SongItem
          v-for="obj in resultsList"
          :key="obj.id"
          :name="obj.name"
          :author="obj.ar[0].name"
          :id="obj.id"
        ></SongItem>
      </van-list>
    </div>
  </div>
</template>

<script>
// 铺设热搜关键字
// 1.使用van-search组件创建搜索框
// 2.找接口api/Search.js里面封装获取热搜关键词的请求方法
// 3.拿到数据循环铺设到页面
// 4. 给搜索词绑定点击事件，点击搜索词把值赋给 v-model绑定的变量上
// import { hostMusicAPI } from '/@api'

//需求 搜索结果
//1. 找到接口 Search.js中定义发起请求的方法
//2. methods里getListfn方法中调用发起请求的方法并将结果返回
//3. 在点击事件里调用getListfn方法拿到搜索结果的数据
//4.铺设页面 把首页里的van-cell复制过来
//5. 把数据保存到data里在标签内循环使用
//6. 热搜关键字 搜索结果互斥显示 v-if、v-else

//需求 输入框显示搜索结果
//1.给van-search绑定@input事件
//2.@input事件中获取搜素结果保存到resultsList
//3. 判断搜索关键字是否为空 如果为空清空数组，return阻止网络请求

//需求 加载更多
// 1.集成 van-list 定义相关的变量 检测触底的事件
// 2.触底自动执行onLoad事件
// 3.对page++ 给后台传递offset偏移量 请求下一页数据
// 4.把当前数据和下一页新来的数据 拼接在一起 用在当前页面的数组里
// 加载更多数据后 一定要把 loading改为false 保证下一次还能触发loading方法
import { hostSreachAPI, searchResultsAPI } from "@/api";
import SongItem from '@/components/SongItem'
export default {
  data() {
    return {
      value: '',
      hotArr: [],
      resultsList: [],
      loading: false,//控制加载中的状态，值为false才能触底后自动触发onLoad方法
      finished: false,//未加载全部 如果为true代表加载完成 底部就不在触发onLoad方法
      page: 1,//当前搜索结果的页码
      timer: null
    }
  },
  components: {
    SongItem
  },
  async created() {
    const res = await hostSreachAPI();
    console.log(res);
    this.hotArr = res.data.result.hots;
  },
  methods: {

    async getListfn() {
      return await searchResultsAPI({
        keywords: this.value,
        limit: 20,
        offset: (this.page - 1) * 20//固定公式
      })//把搜索结果return出去
      // 拿到getListfn返回值用await提取结果
    },
    async fn(val) {

      this.page = 1//点击重新获取第一页数据
      //输入框值改变-可能有新的更多数据
      this.finished = false
      this.value = val
      const res = await this.getListfn()
      // console.log(res);
      this.resultsList = res.data.result.songs
      this.loading = false

    },
    async inputFn() {//输入框值改变
      this.page = 1 //点击重新获取第一页数据
      this.finished = false
      // 需求 解决防抖 输入框改变 逻辑代码慢点执行
      //计时n秒,最后执行一次,如果再次触发 重新计时
      //用户在n秒内不触发这个事件了才会执行逻辑代码
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        if (this.value.length === 0) {
          this.resultsList = []
          return
        }
        const res = await this.getListfn()
        if (res.data.result.songs === undefined) {//没有数据
          this.resultsList = []
        } else {
          this.resultsList = res.data.result.songs
        }
        this.loading = false
      }, 700)

    },
    async onLoad() {// 触底事件 加载下一页数据 内部会自动把loading改为true
      this.page++;
      const res = await this.getListfn()
      if (res.data.result.songs === undefined) {//没有更多数据
        // this.resultsList = []
        this.finished = true//设置true,list再次触发不会执行onLoad函数 显示没有更多数据
        this.loading = false

        return
      }
      this.resultsList = [...this.resultsList, ...res.data.result.songs]
      this.loading = false
    }
  }
};
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
.van-cell {
  border-bottom: 1px solid lightgray;
}
</style>