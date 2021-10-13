<template>
  <el-collapse-item title="附点" name="1.17">
    <div id="1-17" @click="loadBlocks('example_1_17')"></div>
    <div>1-17</div>
  </el-collapse-item>
</template>

<script>
import Vex from 'vexflow'
import {tutorialMixin} from '../tutorialMixin'
export default {
  name: "one-17",
  mixins:[tutorialMixin],
  props: {

  },
  methods: {
    drawTutorial() {
      const VF = Vex.Flow;
      var vf = new VF.Factory({
        renderer: {
          elementId: '1-17',
          width: 500,
          height: 180
        }
      });
      var score = vf.EasyScore();
      var system = vf.System({width:200,spaceBetweenStaves: 10});

      system.addStave({
        voices: [
          score.voice(score.notes('C#5/2., B4/4', {
            stem: 'up'
          }))
        ]
      }).addClef('treble').addTimeSignature('4/4');
      vf.draw();
    }
  },
  mounted() {
    this.drawTutorial()
  }
};
</script>

<style scoped lang="scss">

</style>
