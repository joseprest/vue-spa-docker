<template>
  <el-collapse-item title="平行调" name="6.4">
    <div id="6-4"></div>
  </el-collapse-item>
</template>

<script>
import Vex from 'vexflow'
export default {
  name: "six-4",
  props: {

  },
  mounted() {
    const VF = Vex.Flow;
    var vf1 = new VF.Factory({
      renderer: {
        elementId: '6-4',
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
          // vexflow asks notes should be in order from low note to high note!
          score.notes('(A3 C4)/1,(B3 D4),(C4 E4),(D4 F4),(E4 G4),(F4 A4),(G4 B4),(A4 C5)'),
        ].reduce((a,b)=>{return a.concat(b)}))
      ]
    }).addClef('treble');
    vf1.draw();
  }
};
</script>

<style scoped lang="scss">

</style>
