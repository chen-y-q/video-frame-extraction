<template>
  <div class="index-box">
    <div class="box">
      <input type="file" class="file-btn" ref="inp" @input="inputChange" />
      <input
        type="number"
        class="num"
        placeholder="请输入获取多少帧的图"
        ref="inp2"
        @input="input2Change"
      />
      <button class="btn" @click="startBtn()">Start</button>
    </div>
    <div class="show-img">
      <img :src="showImg" alt="" />
    </div>
    <div class="img-list">
      <div
        class="item"
        v-for="(i, index) in imgList"
        :key="index"
        @click="showImg = i"
      >
        <img :src="i" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// #region data-start
const inp = ref();
const inp2 = ref();
const file = ref();
const num = ref(1);
const imgList = ref([]);
const showImg = ref();
// #endregion data-end

// #region methods-start
const captureFrame = (file: any, time = 0) => {
  return new Promise((resolve) => {
    const vdo = document.createElement('video');
    vdo.src = URL.createObjectURL(file);
    vdo.currentTime = time;
    vdo.muted = true;
    vdo.autoplay = true;
    vdo.oncanplay = () => {
      const cvs = document.createElement('canvas');
      cvs.width = vdo.videoWidth;
      cvs.height = vdo.videoHeight;
      const ctx = cvs.getContext('2d');
      if (!ctx) return resolve(null);
      ctx.drawImage(vdo, 0, 0, cvs.width, cvs.height);
      cvs.toBlob((blob: any) => {
        const url = URL.createObjectURL(blob);
        resolve(url);
      });
    };
  });
};
const inputChange = (e: any) => {
  file.value = e.target.files[0];
};
const input2Change = (e: any) => {
  num.value = e.target.value;
};
const startBtn = async () => {
  for (let i = 0; i < num.value; i++) {
    const frame: any = await captureFrame(file.value, i);
    if (!frame) return;
    imgList.value.push(frame);
    if (!showImg.value) {
      showImg.value = imgList.value[0];
    }
  }
};
// #endregion methods-end
</script>

<style lang="less" scoped>
.index-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.show-img {
  width: 60%;
  img {
    width: 100%;
    height: auto;
  }
}
.img-list {
  display: flex;
  width: 70%;
  height: 200px;
  overflow: auto hidden;
  .item {
    flex-shrink: 0;
    width: 300px;
    height: 100%;
    margin: 0 2px;
    cursor: pointer;
    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>
