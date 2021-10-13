<template>
<el-collapse v-model="activeNames" @change="handleChange">
  <el-collapse-item title="音的长短" name="1">
    <el-collapse>
      <chapone />
    </el-collapse>
  </el-collapse-item>
  <el-collapse-item title="节奏与节拍" name="2">
    <el-collapse>
      <chaptwo />
    </el-collapse>
  </el-collapse-item>
  <el-collapse-item title="音的高低" name="3">
    <el-collapse>
      <chapthree />
    </el-collapse>
  </el-collapse-item>
  <el-collapse-item title="大小调体系" name="4">
    <el-collapse>
      <chapfour />
    </el-collapse>
  </el-collapse-item>
</el-collapse>
</template>

<script>
import Vex from 'vexflow'
import Chapone from "./chap1/index.vue";
import Chaptwo from "./chap2/index.vue";
import Chapthree from "./chap3/index.vue";
import Chapfour from "./chap4/index.vue";

export default {
  name: "HelloWorld",
  components: {
    Chapone,
    Chaptwo,
    Chapthree,
    Chapfour,
  },
  props: {
    msg: String
  },
  mounted() {

  },
  data() {
    return {
      activeNames: ['1']
    };
  },
  methods: {
    handleChange(e) {
      // e is same as this.activeNames
      // console.log(e)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
