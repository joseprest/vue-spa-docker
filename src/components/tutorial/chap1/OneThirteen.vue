<template>
  <el-collapse-item title="休止符记法" name="1.3">
    <div id="1-13-1"></div>
    <div id="1-13-2"></div>
    <div id="1-13-3"></div>
    <div id="1-13-4"></div>
    <div id="1-13-5"></div>
    <div id="1-13-6"></div>
    <div>one thirteen</div>
  </el-collapse-item>
</template>

<script>
import Vex from 'vexflow'
import {tutorialMixin} from '../tutorialMixin'
export default {
  name: "one-13",
  mixins:[tutorialMixin],
  props: {

  },
  methods: {
    drawTutorial() {
      const VF = Vex.Flow;
      var vf1 = new VF.Factory({
        renderer: {
          elementId: '1-13-1',
          width: 500,
          height: 180
        }
      });
      var score = vf1.EasyScore();
      var system = vf1.System({width:200,spaceBetweenStaves: 10});
      system.addStave({
        voices: [
          score.voice(score.notes('B4/1/r', {
            stem: 'up'
          }))
        ]
      }).addClef('treble').addTimeSignature('4/4');
      vf1.draw();

      var vf2 = new VF.Factory({
        renderer: {
          elementId: '1-13-2',
          width: 500,
          height: 180
        }
      });
      var score = vf2.EasyScore();
      var system = vf2.System({width:200,spaceBetweenStaves: 10});
      system.addStave({
        voices: [
          score.voice(score.notes('B4/2/r, B4/2/r', {
            stem: 'down'
          }))
        ]
      }).addClef('treble').addTimeSignature('4/4');
      vf2.draw();

      var vf3 = new VF.Factory({
        renderer: {
          elementId: '1-13-3',
          width: 500,
          height: 180
        }
      });
      var score = vf3.EasyScore();
      var system = vf3.System({width:300,spaceBetweenStaves: 10});
      system.addStave({
        voices: [
          score.voice(score.notes('B4/4/r,B4/4/r,B4/4/r,B4/4/r', {
            stem: 'down'
          }))
        ]
      }).addClef('treble').addTimeSignature('4/4');
      vf3.draw();

      var vf4 = new VF.Factory({
        renderer: {
          elementId: '1-13-4',
          width: 500,
          height: 180
        }
      });
      var score = vf4.EasyScore();
      var system = vf4.System({width:400,spaceBetweenStaves: 10});
      system.addStave({
        voices: [
          score.voice(score.notes('B4/8/r,B4/8/r,B4/8/r,B4/8/r,B4/8/r,B4/8/r,B4/8/r,B4/8/r', {
            stem: 'down'
          }))
        ]
      }).addClef('treble').addTimeSignature('4/4');
      vf4.draw();

      var vf5 = new VF.Factory({
        renderer: {
          elementId: '1-13-5',
          width: 500,
          height: 180
        }
      });
      var score = vf5.EasyScore();
      var system = vf5.System({width:400,spaceBetweenStaves: 10});
      system.addStave({
        voices: [
          score.voice(score.notes('B4/16/r,B4/16/r,B4/16/r,B4/16/r,B4/16/r,B4/16/r,B4/16/r,B4/16/r,B4/16/r,B4/16/r,B4/16/r,B4/16/r,B4/16/r,B4/16/r,B4/16/r,B4/16/r', {
            stem: 'up'
          }))
        ]
      }).addClef('treble').addTimeSignature('4/4');
      vf5.draw();

      var vf6 = new VF.Factory({
        renderer: {
          elementId: '1-13-6',
          width: 500,
          height: 180
        }
      });
      var score = vf6.EasyScore();
      var system = vf6.System({width:400,spaceBetweenStaves: 10});
      system.addStave({
        voices: [
          score.voice(score.notes('B4/32/r,B4/32/r,B4/32/r,B4/32/r,B4/32/r,B4/32/r,B4/32/r,B4/32/r,B4/32/r,B4/32/r,B4/32/r,B4/32/r,B4/32/r,B4/32/r,B4/32/r,B4/32/r,B4/32/r,B4/32/r,B4/32/r,B4/32/r,B4/32/r,B4/32/r,B4/32/r,B4/32/r,B4/32/r,B4/32/r,B4/32/r,B4/32/r,B4/32/r,B4/32/r,B4/32/r,B4/32/r', {
            stem: 'up'
          }))
        ]
      }).addClef('treble').addTimeSignature('4/4');
      vf6.draw();
    }
  },
  mounted() {
    this.drawTutorial()
  }
};
</script>

<style scoped lang="scss">

</style>
