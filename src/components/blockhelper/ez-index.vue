<template>
  <!-- <div class="blockly-editor" id="blockly-area" style="position:absolute;width:100%;height:100%;left:0;"> -->
  <div class="blockly-editor" id="blockly-area" style="flex:1">
    <div id="blockly-div" style="position:absolute;"></div>
    <xml id="toolbox" style="display: none">
      <category name="Loops" colour="0">
        <block type="controls_repeat_ext">
          <value name="TIMES">
            <shadow type="math_number">
              <field name="NUM">5</field>
            </shadow>
          </value>
        </block>
        <block type="controls_if"></block>
        <block type="controls_for">
          <value name="FROM">
            <block type="math_number">
              <field name="NUM">1</field>
            </block>
          </value>
          <value name="TO">
            <block type="math_number">
              <field name="NUM">10</field>
            </block>
          </value>
          <value name="BY">
            <block type="math_number">
              <field name="NUM">1</field>
            </block>
          </value>
        </block>
        <!-- <block type="controls_whileUntil"></block> -->
        <block type="math_number"></block>
        <block type="variables_get"></block>
      </category>
      <category name="Functions" colour="290" custom="PROCEDURE"></category>
      <category name="Sounds" colour="90">
        <block type="ez_create_track">
          <value name="TIMBRE">
            <block type="text">
              <field name="TEXT">piano</field>
            </block>
          </value>
          <value name="TEMPO">
            <block type="math_number">
              <field name="NUM">120</field>
            </block>
          </value>
          <value name="VOLUMN">
            <block type="math_number">
              <field name="NUM">100</field>
            </block>
          </value>
          <value name="METRE">
            <block type="text">
              <field name="TEXT">4/4</field>
            </block>
          </value>
        </block>
        <block type="create_note">
          <field name="NOTE_LEN">4</field>
          <value name="NOTE_PITCH">
            <block type="text">
              <field name="TEXT">C4</field>
            </block>
          </value>
        </block>
        <block type="create_rest">
          <field name="NOTE_LEN">4</field>
        </block>
        <block type="operate_musixise_string">
          <field name="NOTE_LEN">4</field>
        </block>
        <block type="ez_create_measure_match_zero_new">
          <value name="SEQUENCE">
            <block type="text">
              <field name="TEXT">C4,C4</field>
            </block>
          </value>
          <value name="BEAT">
            <block type="text">
              <field name="TEXT">00</field>
            </block>
          </value>
        </block>
        <block type="ez_create_measure_on_scale_match_zero_new">
          <value name="SEQUENCE">
            <block type="text">
              <field name="TEXT">1,2</field>
            </block>
          </value>
          <value name="BEAT">
            <block type="text">
              <field name="TEXT">00</field>
            </block>
          </value>
          <value name="BASENOTE">
            <block type="text">
              <field name="TEXT">G4</field>
            </block>
          </value>
        </block>
      </category>

      <category name="Timbre" colour="120">
        <block type="text">
          <field name="TEXT">pulse</field>
        </block>
        <block type="text">
          <field name="TEXT">triangle</field>
        </block>
        <block type="text">
          <field name="TEXT">square</field>
        </block>
        <block type="text">
          <field name="TEXT">noise</field>
        </block>
      </category>
      <category name="Sequence" colour="170">
        <block type="text">
          <field name="TEXT">C4,D4,E4,F4</field>
        </block>
        <block type="text">
          <field name="TEXT">C4,D4,E4,F4,G4,A4,B4,C5,E4,E4,E4,E4,E4,E4,E4,E4,G4,G4,G4,G4,G4,G4,G4,G4,B4,B4,B4,B4,B4,B4,B4,B4</field>
        </block>
        <!-- SUPER MARIO - CASTLE THEME -->
        <block type="text">
          <field name="TEXT">[Bb4,D5],G4,[A4,C#5],G4,[Ab4,C5],G4,[A4,C#5],G4,[Bb4,D5],G4,[Cb5,Eb5],G4,[Bb4,D5],G4,[A4,C#5],G4</field>
        </block>
        <block type="text">
          <field name="TEXT">[A4,C#5],Gb4,[Ab4,C5],Gb4,[A4,C#5],Gb4,[Bb4,D5],Gb4,[A4,C#5],Gb4,[Bb4,D5],Gb4,[A4,C#5],Gb4,[Ab4,C5],Gb4</field>
        </block>
        <block type="text">
          <field name="TEXT">[Db5,F5],Bb4,[D5,F#5],Bb4,[Db5,F5],Bb4,[C5,E5],Bb4,[Db5,F5],Bb4,[C5,E5],Bb4,[Cb5,Eb5],Bb4,[C5,E5],Bb4</field>
        </block>
      </category>
      <category name="Beats" colour="210">
        <block type="text">
          <field name="TEXT">0---0---0---0---</field>
        </block>
        <block type="text">
          <field name="TEXT">0000000000000000</field>
        </block>
        <block type="text">
          <field name="TEXT">0--0--0--</field>
        </block>
        <block type="text"></block>
      </category>
    </xml>
  </div>
</template>

<script>
export default {};
</script>

<style lang="css">
</style>
