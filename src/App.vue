<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>
<script>
export default {
  created() {
    // alert('jb')
    this.$store.dispatch("loginUser", {}); // 有cookie时 自动登录 auto login
  }
};
</script>

<style lang="scss">
body,
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  text-decoration: none;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  position: absolute;
  height: 100%;
  width: 100%;
}
#nav {
  position: fixed;
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
