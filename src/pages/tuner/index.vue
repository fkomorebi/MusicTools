<template>
  <div class="meter">
    <div class="meter-dot"></div>
    <div class="meter-pointer" :style="'transform: rotate(' + delta + 'deg)'"></div>
    <template v-for="n in standardInterval" :key="n + 'meter'">
      <div v-if="n%5 === 0" 
        class="meter-scale meter-scale-strong" 
        :style="'transform: rotate(' + (n * 9 - 45) + 'deg)'"
        >
      </div>
      <div v-else class="meter-scale" :style="'transform: rotate(' + (n * 9 - 45) + 'deg)'"></div>
    </template>
    <span :class="noteStyle">{{ note }}</span>
    <span :class="tipsStyle">{{ tips }}</span>
  </div>
  <div class="note-tips">
    <span>吉他标准调弦：E2、A2、D3、G3、B3、E4</span>
    <br />
    <span>尤克里里标准调弦：G4、C4、E4、A4</span>
    <br />
    <span>4弦贝斯：E1、A1、D2、G2</span>
  </div>
  <button v-if="isPauseRecord" class="continue-btn" type='primary' @click="onResumeRecord">继续调音</button>
</template>

<script setup>
import { reactive, ref, onMounted, onUnmounted, computed } from 'vue'
import Tuner from "../../utils/tuner.note"
const recorderConfig = reactive({
  sampleRate: 8000,
  numberOfChannels: 1,
  encodeBitRate: 48000,
  format: 'PCM',
  frameSize: 3
})
const note = ref('')
const delta = ref(0)
const type = uni.getSystemInfoSync().uniPlatform
const standardInterval = 9
const tips = ref('')
const tipsStyle = ref('')
const isPauseRecord = ref(false)
const noteStyle = computed(()=> {
  if(delta.value > 5) {
    tips.value = '太高啦'
    tipsStyle.value = 'tips toHeight'
    return 'note toHeight'
  } else if(delta.value < -5) {
    tips.value = '太低啦'
    tipsStyle.value = 'tips toLow'
    return 'note toLow'
  } else {
    tips.value = '调好啦'
    tipsStyle.value = 'tips stander'
    return 'note stander'
  }
})

function onResumeRecord() {
  uni.getRecorderManager().resume()
  isPauseRecord.value = false
}

function onStartRecord() {
  var n = new Tuner.Note();
  let onFrameRecordedCallBack = res => {
    if (res.frameBuffer.byteLength == 0) return
    let arrayBuffer = new Int16Array(res.frameBuffer)
    let correlate = n.autoCorrelate(arrayBuffer, recorderConfig.sampleRate)
    n.from_frequency(correlate)
    note.value = n.fullface()==NaN ? note.value : n.fullface()
    delta.value = n.diff_cents(correlate)
  }
  if (type === 'web') {

  }else { 
    let recorderManager = uni.getRecorderManager()
    recorderManager.onFrameRecorded(onFrameRecordedCallBack)
    recorderManager.onPause(()=>{isPauseRecord.value = true})
    recorderManager.onStop((src)=>{onStartRecord()})
    recorderManager.onError(e=>{console.log('录音错误', e)})
    recorderManager.start(recorderConfig)
  }
}

onMounted(() => {
  onStartRecord()
})
onUnmounted(() => {
  uni.getRecorderManager().stop();
})
</script>

<style>
.note-tips{
  color: darkgray;
  position: absolute;
  bottom: 40vh;
}
.note{
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, 0);
  font-size: 50px;
}

.tips {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 150%);
  font-size: 25px;
}
.toHeight {
  color: red;
}
.toLow {
  color: blue;
}
.stander {
  color: green;
}
.meter {
  position: fixed;
  left: 0;
  right: 0;
  top: 5vh;
  width: 100%;
  height: 30%;
  margin: 0 auto 5vh auto;
}
.meter-pointer {
  width: 2px;
  height: 100%;
  background: #2c3e50;
  transform: rotate(45deg);
  transform-origin: bottom;
  transition: transform 0.5s;
  position: absolute;
  right: 50%;
}
.meter-scale {
  width: 1px;
  height: 100%;
  transform-origin: bottom;
  transition: transform 0.2s;
  box-sizing: border-box;
  border-top: 10px solid;
  position: absolute;
  right: 50%;
}

.meter-scale-strong {
  width: 2px;
  border-top-width: 20px;
}

.meter-pointer {
  width: 2px;
  height: 100%;
  background: #2c3e50;
  transform: rotate(45deg);
  transform-origin: bottom;
  transition: transform 0.5s;
  position: absolute;
  right: 50%;
}

.meter-dot {
  width: 10px;
  height: 10px;
  background: #2c3e50;
  border-radius: 50%;
  position: absolute;
  bottom: -5px;
  right: 50%;
  margin-right: -4px;
}
.continue-btn {
  position:absolute;
  bottom: 0;
  margin-left: 50%;
  transform: translate(-50%,0);
}
</style>