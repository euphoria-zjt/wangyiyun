<template>
  <van-cell center :title="name" :label="author + ' - ' + name">
    <template #right-icon>
      <van-icon name="play-circle-o" size="0.6rem" @click="playFn" />
    </template>
  </van-cell>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  props: {
    name: String,
    author: String,
    id: Number
  },
  methods: {
    playFn() {
      this.$router.push({
        path: '/play',
        query: {
          id: this.id//歌曲id通过路由跳转传过去
        }
      })
    }
  }
}
</script>

<style scoped>
.van-cell {
  border-bottom: 1px solid lightgray;
}
</style>