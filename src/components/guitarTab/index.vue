<template>
  <scroll-view :scroll-x="true" class="guitar-tab-wrap">
    <div :class="'strings ' + 'strings-' + i" v-for="i in 6" :key="i + 'head'">
        <div :class="(i===6? 'fret-no-border fret-no-border-':'fret fret-') + n" v-for="n in 22" :key="i+'fret' + n">
          <span v-show="!showNotes || showNotes.length == 0 || !(showNotes.indexOf(getNote(guitarRootNote[i-1], n-1)) === -1)">
            <span :class="getNote(guitarRootNote[i-1], n-1) === musicKey ? 'note-root': 'note'">{{ getNote(guitarRootNote[i-1], n-1) }}</span>
          </span>
        </div>
    </div>
    <div class="fret-strings">
      <div v-for="i in 22" :key="i + 'fret-num'" :class="'fret-no-border fret-no-border-' + i">
        <span class="fret-num-tip" v-if="[0, 3, 5, 7, 9, 12, 15, 17, 19].indexOf(i-1) !== -1">{{ i-1 }}</span>
      </div>
    </div>
  </scroll-view>
</template>
<script setup>
import {guitarStanderTuner, getNote} from '@/utils/music.scale'
const guitarRootNote = reactive(guitarStanderTuner)
const props = defineProps({
  musicKey: {
    require: true,
    type: String,
  },
  showNotes: {
    require: false,
    type: Array,
  }
})

</script>
<style scoped lang="scss">
$--fret-height: 40px;
$--fret-width: 50px;
.guitar-tab-wrap {
  height: $--fret-height * 8;
}
.strings {
  height: $--fret-height;
  width: ($--fret-width + 3) * 22;
  border-top: solid 3px #888;
}
.strings-1 {
  margin-top: 20px;
}
.fret {
  height: $--fret-height;
  width: $--fret-width;
  border-right: 3px double #ccc;
  text-align: center;
  float: left;
}
.fret-1 {
  width: $--fret-width - 10;
  border-right: 6px solid #777;
}
.fret-no-border {
  @extend .fret;
  border-color: rgba($color: #000000, $alpha: 0);
}
.fret-no-border-1 { 
  @extend .fret-1;
  border-color: rgba($color: #000000, $alpha: 0);
}
.note {
  width: 30px;
  display: block;
  margin: -12px auto 0 auto;
  font-size: 14px;
  text-align: center;
  border-radius: 13px;
  background-color: #666;
  color: white;
}
.note-root {
  @extend .note;
  background-color: green;
}
.fret-num-tip{
  @extend .note;
  background-color: cadetblue;
}
.fret-strings {
  @extend .strings;
  border-top: none;
}
.fret-num {
  height: $--fret-height;
  width: $--fret-width;
  border-right: 3px double #ccc;
  text-align: center;
  float: left;
}
</style>