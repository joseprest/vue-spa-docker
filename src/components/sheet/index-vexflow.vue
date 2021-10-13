<template>
<div id="sheet-container">
  <div ref="sheet" id="sheetcanvas"></div>
</div>
</template>

<script>
import Vex from "vexflow";
const VF = Vex.Flow;

export default {
  data() {
    return {};
  },
  mounted() {
    var div = document.getElementById("sheetcanvas");
    var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
    renderer.resize(500, 500);
    var context = renderer.getContext();
    // Create a stave at position 10, 40 of width 400 on the canvas.
    var stave = new VF.Stave(10, 40, 400);
    // Add a clef and time signature.
    stave.addClef("treble").addTimeSignature("4/4");
    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();
  },
  created() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>
