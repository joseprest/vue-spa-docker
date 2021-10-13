<template>
<div class="main">
  <header style="height:60px;">
    <global-header />
  </header>
  <div id="work-container">
    <div class="song-item" v-for="item in musixiserOwnWorks" :key="item.id">
      <song-grid :workObj="item" :onclickcell="onClickCell"/>
    </div>
  </div>
  <user-forms />
</div>
</template>

<script>
import UserForms from "@/components/UserFormView";
import SongGrid from "@/components/common/songGrid";
import GlobalHeader from "@/components/GlobalHeader";
// import scopeEval from "scope-eval";
// import {
//   createTrack,
//   cleanTrack,
//   createMeasureNew,
//   createMeasureOnScaleNew,
//   createEffect,
//   makeSound,
//   prepareProject,
//   highlightBlock
// } from "../util/core/audioAPI";

export default {
  name: "workspace",
  components: {
    UserForms,
    SongGrid,
    GlobalHeader
  },
  data() {
    return {
      showTutorial: false,
      tutorialHeight: 0,
      startMeasure: 1
    };
  },
  computed: {
    userInfo() {
      this.fetchData();
      return this.$store.state.user.userInfo;
    },
    musixiserOwnWorks() {
      return this.$store.state.musixiserdetail.ownWorks;
    }
  },
  methods: {
    fetchData() {
      let userId =
        this.$route.params.id || this.$store.state.user.userInfo.userId;
      console.log("user id is,", userId);
      if (userId) {
        this.$store.dispatch("loadMusixiserDetail", {
          userId
        });
        this.$store.dispatch("loadMusixiserWorks", {
          userId,
          pagination: { currentPage: 1 }
        });
        this.$store.dispatch("loadMusixiserFavWorks", {
          userId,
          pagination: { currentPage: 1 }
        });
      }
    },
    handleToggleTutorial() {
      this.showTutorial = !this.showTutorial;
    },
    onClickCell(a) {
      console.log(a);
      this.$router.push(`/work/${a.id}`);
    }
  },
  created() {
    console.log("user created");
    this.fetchData();
  },
  mounted() {
    console.log("user mounted");
  },
  beforeRouteUpdate(to, from, next) {
    // react to route changes...
    // don't forget to call next()
    // navigate between `/foo/1` and `/foo/2`
    const userId = to.params.id;
    if (userId) {
      this.$store.dispatch("loadMusixiserDetail", {
        userId
      });
      this.$store.dispatch("loadMusixiserWorks", {
        userId,
        pagination: { currentPage: 1 }
      });
      this.$store.dispatch("loadMusixiserFavWorks", {
        userId,
        pagination: { currentPage: 1 }
      });
    }
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log("router leaving to: ", to);
    next();
  },
  updated() {}
};
</script>
<style lang="scss" scoped>
.main {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}
#work-container {
  position: relative;
  display: flex;
  .song-item {
    margin: 20px;
  }
}
</style>
