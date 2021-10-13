<template>
<div class="main">
  <header style="height:60px;">
    <global-header />
  </header>
  <div>
    探索专区还在开发
  </div>
  <div>
    古典歌曲
  </div>
  <div>
    中国戏剧
  </div>
  <div>
    中国风
  </div>
  <user-forms />
</div>
</template>

<script>
import UserForms from "@/components/UserFormView";
import SongGrid from "@/components/common/songGrid";
import GlobalHeader from "@/components/GlobalHeader";

export default {
  name: "explore",
  components: {
    UserForms,
    SongGrid,
    GlobalHeader
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {},
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
</style>
