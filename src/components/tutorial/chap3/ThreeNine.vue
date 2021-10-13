<template>
  <el-collapse-item title="谱号" name="3.9">
    <p>G谱号/高音谱号</p>
    <div id="3-9-1" @click="loadBlocks('example_3_9_1')"></div>
    <p>F谱号/低音谱号</p>
    <div id="3-9-2" @click="loadBlocks('example_3_9_2')"></div>
  </el-collapse-item>
</template>

<script>
import Vex from 'vexflow'
import {tutorialMixin} from '../tutorialMixin'
export default {
  name: "three-9",
  props: {
    xmlArrayObj:Object,
  },
  mixins:[tutorialMixin],
  mounted() {
    const VF = Vex.Flow;
    var vf1 = new VF.Factory({
      renderer: {
        elementId: '3-9-1',
        width: 500,
        height: 180
      }
    });
    var score = vf1.EasyScore();
    var system = vf1.System({width:440,spaceBetweenStaves: 10});
    score.set({ time: '8/1' }); //important
    system.addStave({
      voices: [
        score.voice([
          score.notes('C4/1,D4,E4,F4,G4,A4,B4,C5'),
        ].reduce((a,b)=>{return a.concat(b)}))
      ]
    }).addClef('treble');
    vf1.draw();

    var vf2 = new VF.Factory({
      renderer: {
        elementId: '3-9-2',
        width: 500,
        height: 180
      }
    });
    var score = vf2.EasyScore();
    var system = vf2.System({width:440,spaceBetweenStaves: 10});
    score.set({ time: '8/1' }); //important
    system.addStave({
      voices: [
        score.voice([
          score.notes('C3/1,D3,E3,F3,G3,A3,B3,C4',{ clef: 'bass' }),
        ].reduce((a,b)=>{return a.concat(b)}))
      ]
    }).addClef('bass');

    vf2.draw();
  }
};
</script>

<style scoped lang="scss">

</style>
