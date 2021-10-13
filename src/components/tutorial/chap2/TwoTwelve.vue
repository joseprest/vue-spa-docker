<template>
  <el-collapse-item title="混合拍子" name="2.12">
    <div id="2-12-1" @click="loadBlocks('example_2_12_1')"></div>
    <div id="2-12-2" @click="loadBlocks('example_2_12_2')"></div>
    <div>2-12</div>
  </el-collapse-item>
</template>

<script>
import Vex from 'vexflow'
import {tutorialMixin} from '../tutorialMixin'
export default {
  name: "two-12",
  mixins:[tutorialMixin],
  props: {
    xmlArrayObj:Object,
  },
  mounted() {
    const VF = Vex.Flow;
    var vf1 = new VF.Factory({
      renderer: {
        elementId: '2-12-1',
        width: 500,
        height: 180
      }
    });
    var score = vf1.EasyScore();
    var system = vf1.System({width:220,spaceBetweenStaves: 10});
    score.set({ time: '5/4' }); //important
    system.addStave({
      voices: [
        score.voice([
          score.notes('A4/q, A4,A4,A4,A4'),
        ].reduce((a,b)=>{return a.concat(b)}))
      ]
    }).addClef('treble').addTimeSignature('5/4');


    vf1.draw();

    var vf2 = new VF.Factory({
      renderer: {
        elementId: '2-12-2',
        width: 500,
        height: 180
      }
    });
    var score = vf2.EasyScore();
    var system = vf2.System({width:220,spaceBetweenStaves: 10});
    score.set({ time: '7/4' }); //important
    system.addStave({
      voices: [
        score.voice([
          score.notes('A4/q, A4,A4,A4,A4,A4,A4'),
        ].reduce((a,b)=>{return a.concat(b)}))
      ]
    }).addClef('treble').addTimeSignature('7/4');

    vf2.draw();
  }
};
</script>

<style scoped lang="scss">

</style>
