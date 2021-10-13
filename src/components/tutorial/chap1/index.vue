<template>
  <div style="padding-left:20px;">
    <one-five :xmlArrayObj="xmlArrayObj" />
    <one-thirteen :xmlArrayObj="xmlArrayObj" />
    <one-seventeen :xmlArrayObj="xmlArrayObj" />
    <one-twentythree :xmlArrayObj="xmlArrayObj" />
  </div>
</template>

<script>
import Vex from 'vexflow'

import OneFive from "./OneFive.vue";
import OneThirteen from "./OneThirteen.vue";
import OneSeventeen from "./OneSeventeen.vue";
import OneTwentythree from "./OneTwentythree.vue";
import xmlArrayObj from './blocks'

export default {
  name: "chap1",
  data() {
    return {
      xmlArrayObj:xmlArrayObj,
    }
  },
  components: {
    OneFive,
    OneThirteen,
    OneSeventeen,
    OneTwentythree
  },
  props: {

  },
  mounted() {

  }
};
</script>

<style scoped lang="scss">

</style>
