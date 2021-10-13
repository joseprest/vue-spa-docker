<template>
  <el-collapse-item title="音符特殊划分" name="1.23">
    <div id="1-23"  @click="loadBlocks('example_1_23')"></div>
    <div>1-23</div>
  </el-collapse-item>
</template>

<script>
import Vex from 'vexflow'
import {tutorialMixin} from '../tutorialMixin'

export default {
  name: "one-23",
  mixins:[tutorialMixin],
  props: {

  },
  methods: {
    drawTutorial(){
      const VF = Vex.Flow;
      var vf = new VF.Factory({
        renderer: {
          elementId: '1-23',
          width: 500,
          height: 180
        }
      });
      var score = vf.EasyScore();
      var system = vf.System({width:250,spaceBetweenStaves: 10});

      system.addStave({
        voices: [
          score.voice(
            score.notes('C#5/q, B4, B4')
              .concat(
              score.tuplet(score.beam(score.notes('A4/8, E4, C4'))))
            )
          // score.voice(score.beam(score.notes('A4/8, E4, C4, D4', {
          //   stem: 'down'
          // })))
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
