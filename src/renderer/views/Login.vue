<template>
  <div>
    登录
    <button @click="login">登录</button>
    <button @click="exit">退出</button>
  </div>
</template>

<script>
  export default {
    name: "Login",
    created () {
      this.$electron.remote.getCurrentWindow().setSize(400, 300)
      this.$electron.remote.getCurrentWindow().center()
      this.$electron.remote.getCurrentWindow().setResizable(false)
      this.$electron.remote.getCurrentWindow().setMaximizable(false)
    },
    methods: {
      login () {
        this.$router.replace('/home')
      },
      exit () {
        this.$electron.remote.getCurrentWindow().close()
      }
    }
  }
</script>

<style scoped>

</style>
