<template>
  <div style="padding-left:20px;">
    <three-one />
    <three-five />
    <three-nine :xmlArrayObj="xmlArrayObj" />
    <three-fourteen :xmlArrayObj="xmlArrayObj" />
  </div>
</template>

<script>
import Vex from 'vexflow'

import ThreeOne from "./ThreeOne.vue";
import ThreeFive from "./ThreeFive.vue";
import ThreeNine from "./ThreeNine.vue";
import ThreeFourteen from "./ThreeFourteen.vue";
import xmlArrayObj from './blocks'

export default {
  name: "chap3",
  data() {
    return {
      xmlArrayObj:xmlArrayObj,
    }
  },
  components: {
    ThreeOne,
    ThreeFive,
    ThreeNine,
    ThreeFourteen
  },
  props: {

  },
  mounted() {

  }
};
</script>

<style scoped lang="scss">

</style>
