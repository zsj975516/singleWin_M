<template>
  <div class="home">
    <div class="win_title">
      <div class="btn-control" @click="min">-</div>
      <div class="btn-control" @click="max">🧡</div>
      <div class="btn-control" @click="close">X</div>
    </div>
    主页
    <button @click="logout">注销</button>
  </div>
</template>

<script>
  export default {
    name: "Home",
    data () {
      return {
        isMax: false
      }
    },
    created () {
      this.$electron.remote.getCurrentWindow().setSize(800, 600)
      this.$electron.remote.getCurrentWindow().center()
      this.$electron.remote.getCurrentWindow().setResizable(true)
      this.$electron.remote.getCurrentWindow().setMaximizable(true)

      this.$electron.remote.getCurrentWindow().on('maximize', evt => this.isMax = true)
      this.$electron.remote.getCurrentWindow().on('unmaximize', evt => this.isMax = false)
    },
    methods: {
      min () {
        this.$electron.remote.getCurrentWindow().minimize()
      },
      max () {
        if (this.isMax) {
          this.$electron.remote.getCurrentWindow().unmaximize()
          this.isMax = false
        } else {
          this.$electron.remote.getCurrentWindow().maximize()
          this.isMax = true
        }
      },
      close () {
        this.$electron.remote.getCurrentWindow().close()
      },
      logout () {
        this.$router.replace('/login')
      }
    }
  }
</script>

<style scoped lang="scss">
  .home {
    .win_title {
      height: 30px;
      -webkit-app-region: drag;
      background-color: #f2f2f2;
      text-align: right;

      .btn-control {
        -webkit-app-region: no-drag;
        display: inline-block;
        text-align: center;
        cursor: default;
        line-height: 30px;
        width: 30px;
        user-select: none;

        &:hover {
          background-color: grey;
        }
      }
    }
  }
</style>
