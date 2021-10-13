<template>
  <div style="padding-left:20px;">
    <five-one />
    <five-sixteen />
    <five-seventeen />
    <six-one />
    <six-four />
    <six-eight />
    <six-nine />
  </div>
</template>

<script>
import Vex from 'vexflow'

import FiveOne from "./FiveOne.vue";
import FiveSixteen from "./FiveSixteen.vue";
import FiveSeventeen from "./FiveSeventeen.vue";
import SixOne from "./SixOne.vue";
import SixFour from "./SixFour.vue";
import SixEight from "./SixEight.vue";
import SixNine from "./SixNine.vue";

export default {
  name: "chap4",
  components: {
    FiveOne,
    FiveSixteen,
    FiveSeventeen,
    SixOne,
    SixFour,
    SixEight,
    SixNine
  },
  props: {

  },
  mounted() {

  }
};
</script>

<style scoped lang="scss">

</style>
