<template>
  <!--index.wxml-->
  <view class="title">工具:</view>
  <button @click="onClick('tuner')" size="mini" class="button">调音器</button>
  <!-- <button size="mini" class="button" style="height: 100rpx;width: 210rpx;">鼓机</button>
  <button @click="onClick('metronome')" size="mini" class="button" style="height: 100rpx;width: 210rpx;">节拍器</button> -->
  <view class="title">指板：</view>
  <!-- <button size="mini" class="button" style="height: 100rpx;width: 210rpx;">和弦</button> -->
  <!-- <button size="mini" class="button" style="height: 100rpx;width: 210rpx;">音符</button> -->
  <button @click="onClick('scale')" size="mini" class="button">音阶</button>
  <!-- <view class="title">交流区：</view>
  <button size="mini" class="button" style="height: 100rpx;width: 210rpx;">问题</button>
  <button size="mini" class="button" style="height: 100rpx;width: 210rpx;">心得分享</button> -->
</template>

<script setup>
function onClick(type) {
  uni.navigateTo({ url: '/pages/' + type + '/index' })
  // switch (type) {
  //   case 'tuner':
  //     uni.navigateTo({ url: '/pages/tuner/index' })
  //     break;
  //   case 'metronome':
  //     uni.navigateTo({ url: '/pages/metronome/index' })
  //     break;
  //   case 'functionalExercises':
  //     uni.navigateTo({ url: '/pages/functionalExercises/index'});
  //     break;
  // }
}
</script>

<style scoped lang="scss">
.title {
  color: gray;
  font-size: 50rpx;
}

.button {
  background-color: #71a193;
  color: rgb(255, 255, 255);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
  height: 50px;
  width: 100px;
}
</style>
