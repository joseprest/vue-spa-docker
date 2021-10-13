<template>
  <el-collapse-item title="单拍子,复拍子" name="2.6">
    <p>拍子通常分为单拍子，复拍子和混合拍子三种类型</p>
    <p>单拍子：没小节只有一个强拍的称单拍子，如2/4.3/4，3/8，我国吸取和曲艺还有1/4</p>
    <p>复拍子：两个或两个以上同类型单拍子的组合，称为复拍子。比如最常见的四四拍子（4/4），其他常用的还有6/8，9/8拍</p>
  </el-collapse-item>
</template>

<script>
import Vex from 'vexflow'
import {tutorialMixin} from '../tutorialMixin'
export default {
  name: "two-6",
  mixins:[tutorialMixin],
  props: {
    xmlArrayObj:Object,
  },
  mounted() {

  }
};
</script>

<style scoped lang="scss">

</style>
