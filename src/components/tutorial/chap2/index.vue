<template>
  <div style="padding-left:20px;">
    <two-two :xmlArrayObj="xmlArrayObj" />
    <two-six :xmlArrayObj="xmlArrayObj" />
    <two-twelve :xmlArrayObj="xmlArrayObj" />
  </div>
</template>

<script>
import Vex from 'vexflow'

import TwoTwo from "./TwoTwo.vue";
import TwoSix from "./TwoSix.vue";
import TwoTwelve from "./TwoTwelve.vue";
import xmlArrayObj from './blocks'

export default {
  name: "chap1",
  data() {
    return {
      xmlArrayObj:xmlArrayObj,
    }
  },
  components: {
    TwoTwo,
    TwoSix,
    TwoTwelve,
    // TwoSeventeen,
    // TwoTwentythree
  },
  props: {

  },
  mounted() {

  }
};
</script>

<style scoped lang="scss">

</style>
