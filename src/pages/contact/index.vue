<template>
  <h1 class="head-title center">MusicTools</h1>
  <div class="content-wrap">
    <h2 class="sec-title">简介</h2>
    <br/>
    <p class="content-text">&nbsp;&nbsp;&nbsp;&nbsp;“MusicTools”想做到让热爱音乐的人有办法通过自学来学习音乐，创造音乐。
      未来还有很远的道路要走，若是有什么更加新奇有趣的想法，可以通过下方的<span style="font-weight: bold;">联系客服按钮</span>告知我们！
    </p>
  </div>

  <button open-type="contact" class="contact-btn" type='primary'>联系客服</button>
</template>
<style scoped>
:root {
  --font-color: black;
}
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.content-wrap {
  border:solid 2px #b3b3b3;
  border-radius: 6px;
  padding: 0 5px;
}
.head-title {
  font-size: 2em;
  font-weight: 600;
  color:var(--font-color);
}
.sec-title {
  font-size: 1.5em;
  font-weight: 500;
  color: var(--font-color);
}
.content-text {
  font-size: 1em;
  color:var(--font-color);
  font-size: medium;
}
.contact-btn{
  position: fixed;
  bottom: 5px;
  margin-left: 50%;
  transform: translate(-50%, 0);
}
</style>