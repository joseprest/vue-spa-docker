<template>
  <el-collapse-item title="旋律小调" name="6.9">
    <div id="6-9-1"></div>
  </el-collapse-item>
</template>

<script>
import Vex from 'vexflow'
export default {
  name: "six-9",
  props: {

  },
  mounted() {
    const VF = Vex.Flow;
    var vf1 = new VF.Factory({
      renderer: {
        elementId: '6-9-1',
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
          score.notes('A3/1,B3,C4,D4,E4,F#4,G#4,A4'),
        ].reduce((a,b)=>{return a.concat(b)}))
      ]
    }).addClef('treble');
    vf1.draw();
  }
};
</script>

<style scoped lang="scss">

</style>
