<template>
  <el-collapse-item title="自然小调" name="6.1">
    <div id="6-1-1"></div>
  </el-collapse-item>
</template>

<script>
import Vex from 'vexflow'
export default {
  name: "six-1",
  props: {

  },
  mounted() {
    const VF = Vex.Flow;
    var vf1 = new VF.Factory({
      renderer: {
        elementId: '6-1-1',
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
          score.notes('A4/1,B4,C5,D5,E5,F5,G5,A5'),
        ].reduce((a,b)=>{return a.concat(b)}))
      ]
    }).addClef('treble');
    vf1.draw();
  }
};
</script>

<style scoped lang="scss">

</style>
