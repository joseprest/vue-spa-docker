<template>
<div class="main">
  <header style="height:60px;">
    <global-header />
  </header>
  <div>
    <section class="page-block page-block--image music"></section>
    <section class="page-block">
      <div class="container-flex">
        <div class="color-callout orange color-callout--pull-up">
          <div class="color-callout__content type-xl--serif">
            “音乐教育结合逻辑思维，让学生提高综合素质”
            <!-- <div class="color-callout__attribution bottom type-sm--sans">
              — De La Soul
            </div> -->
          </div>
        </div>

      </div>
    </section>
    <section class="page-block page-block--image dela"></section>
    <section class="page-block">
      <div class="container-flex">
        <div class="color-callout orange color-callout--pull-up">
          <div class="color-callout__content type-xl--serif">
            “官方教程源于教材，方便音乐老师辅导学生”
            <!-- <div class="color-callout__attribution bottom type-sm--sans">
              — De La Soul
            </div> -->
          </div>
        </div>

      </div>
    </section>
  </div>
  <user-forms />
</div>
</template>

<script>
import UserForms from "@/components/UserFormView";
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
  name: "about",
  components: {
    UserForms,
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
// from kickstart about page https://www.kickstarter.com/about?ref=about_subnav
.page-block {
  position: relative;
  margin: 0;
  display: inline-block;
  width: 100%;
  background-color: #fff;
}
.page-block--image {
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  height: 850px;
  &.dela {
    background-image: url("https://d3mlfyygrfdi2i.cloudfront.net/AboutPage_1.jpg");
  }
  &.music {
    background-image: url("https://drscdn.500px.org/photo/119045311/q%3D80_h%3D450/v2?webp=true&sig=6531fb6aad64e4ad9a7dec91005ed1b77b9fe6ecd180fe0792c7de08e24f426a");
  }
}
.container-flex {
  max-width: 1040px;
  margin-right: auto;
  margin-left: auto;
}
.color-callout.orange,
.image-callout.orange {
  background-color: #ff7c5fe1;
}

.color-callout--pull-up,
.image-callout--pull-up {
  margin-top: -425px;
}
.color-callout,
.image-callout {
  color: #ffffff;
  position: relative;
  text-align: center;
  border-radius: 0;
  margin-bottom: 75px;
  z-index: 101;
}
.color-callout {
  padding: 100px;
}
.color-callout__content,
.image-callout__content {
  width: 75%;
  margin: auto;
}

.type-xl--serif {
  font-family: "Cooper Light", Georgia, serif;
  font-size: 2.8rem;
  font-weight: 500;
  line-height: 1.8;
}
.color-callout__attribution.bottom,
.image-callout__attribution.bottom {
  margin-top: 60px;
}

.color-callout__attribution,
.image-callout__attribution {
  font-weight: 500;
}
.type-sm--sans {
  font-family: "Maison Neue Book", "Helvetica Neue", Helvetica, Arial,
    "Liberation Sans", FreeSans, sans-serif;
  font-size: 1.4rem;
  line-height: 1.4;
}
</style>
