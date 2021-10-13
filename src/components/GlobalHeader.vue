<template>
  <div class="global-header">
    <router-link tag="p" to="/">
      <a>音乐练习</a>
    </router-link>
    
    <el-menu :default-active="activeIndex" 
    class="el-menu-demo" 
    mode="horizontal" 
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="handleSelect">
      <el-menu-item index="1">
        <router-link tag="li" to="/create">
          <p>新建作品</p>
        </router-link>
      </el-menu-item>
      <el-menu-item index="2" disabled>
        <router-link tag="li" to="/explore">
          <p>探索</p>
        </router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link tag="li" to="/about">
          <p>介绍</p>
        </router-link>
      </el-menu-item>
    </el-menu>
    <!-- <div class="menu-btns" v-show="userInfo.userId">
      我的作品
    </div> -->
    <div class="search">
      <el-autocomplete
        disabled
        clearable
        v-model="searchKey"
        :fetch-suggestions="querySearchAsync"
        placeholder="搜索作品/作者/课程"
        @select="handleSelect"
      ></el-autocomplete>
    </div>
    <div class="avatar">  
      <avatar />
    </div>
  </div>
</template>

<script>
import Avatar from "@/components/avatar.vue";

export default {
  name: "workspace",
  components: {
    Avatar
  },
  data() {
    return {
      searchKey: ""
    };
  },
  computed: {
    userInfo() {
      // this.fetchData();
      return this.$store.state.user.userInfo;
    },
    activeIndex() {
      const a = { create: "1", explore: "2", about: "3" };
      return a[this.$route.name];
    }
  },
  methods: {
    handleSelect(e) {
      const a = ["create", "explore", "about"];
      console.log(a[e - 1]);
      this.$router.push(a[e - 1]);
    },
    querySearchAsync() {}
    // fetchData() {
    //   let userId = this.$store.state.user.userInfo.userId;
    //   if (userId) {
    //     this.$store.dispatch("loadMusixiserDetail", {
    //       userId
    //     });
    //     this.$store.dispatch("loadMusixiserWorks", {
    //       userId,
    //       pagination: { currentPage: 1 }
    //     });
    //     this.$store.dispatch("loadMusixiserFavWorks", {
    //       userId,
    //       pagination: { currentPage: 1 }
    //     });
    //   }
    // }
  },
  created() {
    // this.fetchData();
  },
  mounted() {},
  updated() {}
};
</script>
<style lang="scss" scoped>
.global-header {
  display: flex;
  justify-content: space-between;
  background-color: white;
  height: 60px;
  line-height: 60px;
  margin: 0;
  padding-left: 28px;
  background-color: #ffcc33;
  .menu-btns {
    flex: 2;
    padding-left: 30%;
  }
  .avatar {
    padding-right: 10px;
    // padding-top: 5px;
    display: flex;
    align-items: center;
  }
}
</style>
