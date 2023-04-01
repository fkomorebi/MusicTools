<template>
  <span class="title">音阶模式图</span>
  <div class="picker-wrap">
    <picker @change="handleMusicKeyselect" :value="scaleNoteIndex" :range="scaleNote" class="key-picker">
      <span>选调：</span>
      <span>{{musicKey}}</span>
    </picker>
    
    <picker @change="handleScaleselect" :value="scaleIndex" :range="scaleIntervals" :range-key="'scaleName'" class="scale-picker">
      <span>音阶：</span>
      <span>{{currentScale}}</span>
    </picker>
  </div>
  <GuitarTab :music-key="musicKey" :show-notes="getScaleByKey(musicKey, currentScale)"/>
  
</template>
<script setup>
import GuitarTab from '@/components/guitarTab/index'
import {scaleNote, getScaleByKey, scaleIntervals} from '@/utils/music.scale'

const scaleIndex = ref(0)
const currentScale = computed(()=>scaleIntervals[scaleIndex.value].scaleName)
function handleScaleselect(e) {
  scaleIndex.value = e.detail.value
}
const scaleNoteIndex = ref(0)
function handleMusicKeyselect(e) {
  scaleNoteIndex.value = e.detail.value
}
const musicKey = computed(()=>scaleNote[scaleNoteIndex.value])
</script>
<style scoped lang="scss">
.title {
  font-size: large;
  // margin-left: 50%;
  // transform: translate(-50%, 0);
  display: flex;
  align-items: center;
  justify-content: center;
}
.key-picker {
  display: inline-block;
  background-color: azure;
  border-radius: 6px;
}
.scale-picker {
  margin-left: 5px;
  display: inline-block;
  background-color: azure;
  border-radius: 6px;
}
.picker-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
}
</style>