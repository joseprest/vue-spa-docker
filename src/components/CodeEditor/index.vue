
<template>
  <div style>
    <!-- <codemirror v-model="code" :options="cmOptions"></codemirror> -->
    <codemirror
      ref="myCm"
      :value="code"
      :options="cmOptions"
      @ready="onCmReady"
      @focus="onCmFocus"
      @input="onCmCodeChange"
    ></codemirror>
  </div>
</template>

<script>
// require component
import { codemirror } from "vue-codemirror";

// require styles
import "codemirror/mode/javascript/javascript.js";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/base16-dark.css";
// require more codemirror resource...

// component
export default {
  name: "code_editor",
  props: ["onCodeChange"],
  data() {
    return {
      code:
        '\nconst gsjzy = [1, 2, 3, 4, 5];\nlet currentBase = 60;\ncreateTrack("piano", 120, 100);\nfor (let count = 0; count <= 99; count += 1) {\n  let dropNote = Math.ceil(Math.random() * 5);\n  // play rest\n  const rest = gsjzy.filter(i => i != dropNote);\n  // rest is [1,2,3,5]这种\n  createMeasureOnScaleNew(\n    [rest.map(o => `${o}`)],\n    "0",\n    "Chinese",\n    `${currentBase}`,\n    false,\n    ""\n  ); \n  if (dropNote === 1) {\n    //clockwise 5th\n    currentBase = currentBase - 5;\n  } else if (dropNote === 3) {\n    //counter-clockwise 5th\n    currentBase = currentBase + 5;\n  }\n}',
      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: "text/javascript",
        theme: "base16-dark",
        lineNumbers: true,
        line: true
        // keyMap: "sublime"
        // more codemirror options, 更多 codemirror 的高级配置...
      }
    };
  },
  components: {
    codemirror
  },
  methods: {
    onCmReady(cm) {
      this.onCodeChange(this.code);
      console.log("the editor is readied!", cm);
    },
    onCmFocus(cm) {
      console.log("the editor is focus!", cm);
    },
    onCmCodeChange(newCode) {
      // console.log("this is new code", newCode);
      console.log(JSON.stringify(newCode));
      this.code = newCode;
      this.onCodeChange(newCode);
    }
  },
  computed: {
    codemirror() {
      return this.$refs.myCm.codemirror;
    }
  },
  mounted() {
    console.log("this is current codemirror object", this.codemirror);
    setTimeout(() => {
      this.codemirror.refresh();
    }, 1000);
  }
};
</script>

<style lang="scss">
// .CodeMirror {
//   height: auto !important;
// }
</style>
