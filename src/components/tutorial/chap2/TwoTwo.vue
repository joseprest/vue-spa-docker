<template>
  <el-collapse-item title="舞曲节奏型" name="2.2">
    <div id="2-2-1" @click="loadBlocks('example_2_2_1')"></div>
    <div id="2-2-2" @click="loadBlocks('example_2_2_2')"></div>
    <div id="2-2-3" @click="loadBlocks('example_2_2_3')"></div>
    <div id="2-2-4" @click="loadBlocks('example_2_2_4')"></div>
    <div id="2-2-5" @click="loadBlocks('example_2_2_5')"></div>
    <div>2-2</div>
  </el-collapse-item>
</template>

<script>
import Vex from 'vexflow'
import {tutorialMixin} from '../tutorialMixin'
export default {
  name: "two-2",
  mixins:[tutorialMixin],
  props: {
    xmlArrayObj:Object,
  },
  mounted() {
    const VF = Vex.Flow;
    var vf1 = new VF.Factory({
      renderer: {
        elementId: '2-2-1',
        width: 500,
        height: 180
      }
    });
    var score = vf1.EasyScore();
    var system = vf1.System({width:220,spaceBetweenStaves: 10});
    system.addStave({
      voices: [
        score.voice([
          score.notes('C5/q,C5'),
          score.beam(score.notes('A4/8, E4')),
          score.notes('C5/q')
        ].reduce((a,b)=>{return a.concat(b)}))
      ]
    }).addClef('treble').addTimeSignature('4/4');
    var system = vf1.System({x:230,width:180,spaceBetweenStaves: 10});
    system.addStave({
      voices: [
        score.voice([
          score.beam(score.notes('A4/8, E4')),
          score.beam(score.notes('A4/8, E4')),
          score.beam(score.notes('A4/8, E4')),
          score.notes('C5/q')
        ].reduce((a,b)=>{return a.concat(b)}))
      ]
    })
    vf1.draw();

    var vf2 = new VF.Factory({
      renderer: {
        elementId: '2-2-2',
        width: 500,
        height: 180
      }
    });
    var score = vf2.EasyScore();
    var system = vf2.System({width:220,spaceBetweenStaves: 10});
    score.set({ time: '2/4' }); //important
    system.addStave({
      voices: [
        score.voice([
          score.beam(score.notes('A4/16, A4/8,A4/16')),
          score.beam(score.notes('A4/8,A4/8')),
        ].reduce((a,b)=>{return a.concat(b)}))
      ]
    }).addClef('treble').addTimeSignature('2/4');

    var system = vf2.System({x:230,width:180,spaceBetweenStaves: 10});
    system.addStave({
      voices: [
        score.voice([
          score.beam(score.notes('A4/16, A4,A4,A4')),
          score.notes('A4/q'),
        ].reduce((a,b)=>{return a.concat(b)}))
      ]
    })

    vf2.draw();


    var vf3 = new VF.Factory({
      renderer: {
        elementId: '2-2-3',
        width: 500,
        height: 180
      }
    });
    var score = vf3.EasyScore();
    var system = vf3.System({width:220,spaceBetweenStaves: 10});
    score.set({ time: '6/8' }); //important
    system.addStave({
      voices: [
        score.voice([
          score.beam(score.notes('A4/8., A4/16,A4/8')),
          score.beam(score.notes('A4/8,A4/8,A4/16,A4/16')),
        ].reduce((a,b)=>{return a.concat(b)}))
      ]
    }).addClef('treble').addTimeSignature('6/8');

    var system = vf3.System({x:230,width:180,spaceBetweenStaves: 10});
    system.addStave({
      voices: [
        score.voice([
          score.beam(score.notes('A4/8., A4/16,A4/8')),
          score.notes('A4/8'),
          score.notes('A4/4'),
        ].reduce((a,b)=>{return a.concat(b)}))
      ]
    })

    vf3.draw();

    var vf4 = new VF.Factory({
      renderer: {
        elementId: '2-2-4',
        width: 500,
        height: 180
      }
    });
    var score = vf4.EasyScore();
    var system = vf4.System({width:220,spaceBetweenStaves: 10});
    score.set({ time: '2/4' }); //important
    system.addStave({
      voices: [
        score.voice([
          score.beam(score.notes('A4/8., A4/16')),
          score.beam(score.notes('A4/8,A4/8')),
        ].reduce((a,b)=>{return a.concat(b)}))
      ]
    }).addClef('treble').addTimeSignature('2/4');

    var system = vf4.System({x:230,width:180,spaceBetweenStaves: 10});
    system.addStave({
      voices: [
        score.voice([
          score.beam(score.notes('A4/16, A4/8,A4/16')),
          score.beam(score.notes('A4/8,A4')),
        ].reduce((a,b)=>{return a.concat(b)}))
      ]
    })

    vf4.draw();

    var vf5 = new VF.Factory({
      renderer: {
        elementId: '2-2-5',
        width: 500,
        height: 180
      }
    });
    var score = vf5.EasyScore();
    var system = vf5.System({width:220,spaceBetweenStaves: 10});
    score.set({ time: '4/4' }); //important
    system.addStave({
      voices: [
        score.voice([
          score.notes('A4/8, A4/q,A4/8'),
          score.beam(score.notes('A4/8,A4/8')),
          score.beam(score.notes('A4/8,A4/8'))
        ].reduce((a,b)=>{return a.concat(b)}))
      ]
    }).addClef('treble').addTimeSignature('4/4');

    var system = vf5.System({x:230,width:180,spaceBetweenStaves: 10});
    system.addStave({
      voices: [
        score.voice([
          score.notes('A4/8, A4/q,A4/8'),
          score.beam(score.notes('A4/8,A4/8')),
          score.beam(score.notes('A4/8,A4/8'))
        ].reduce((a,b)=>{return a.concat(b)}))
      ]
    })

    vf5.draw();
  }
};
</script>

<style scoped lang="scss">

</style>
