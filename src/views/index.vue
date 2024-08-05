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
const captureFrame = (file: File, time = 0): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    const vdo = document.createElement('video');
    const url = URL.createObjectURL(file);
    vdo.src = url;
    vdo.currentTime = time;
    vdo.muted = true;
    vdo.autoplay = true;
    vdo.oncanplay = () => {
      const cvs = document.createElement('canvas');
      const ctx = cvs.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas context could not be created'));
        return;
      }
      cvs.width = vdo.videoWidth;
      cvs.height = vdo.videoHeight;
      ctx.drawImage(vdo, 0, 0, cvs.width, cvs.height);
      cvs.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Blob could not be created'));
          return;
        }
        const imgUrl = URL.createObjectURL(blob);
        resolve(imgUrl);
      }, 'image/png'); // 明确指定图片格式
    };
    vdo.onerror = (error) => {
      reject(new Error(`Video error: ${error.message}`));
    };
  }).finally(() => {
    // 清理创建的 URL 对象
    URL.revokeObjectURL(url);
  });
};
const inputChange = (e: any) => {
  file.value = e.target.files[0];
};
const input2Change = (e: any) => {
  num.value = e.target.value;
};
const startBtn = async () => {
  try {
    for (let i = 0; i < num.value; i++) {
      const frame = await captureFrame(file.value, i);
      if (!frame) {
        console.error('Failed to capture frame at time', i);
        continue; // 跳过当前帧，继续捕获后续帧
      }
      imgList.value.push(frame);
      if (!showImg.value) {
        showImg.value = imgList.value[0];
      }
    }
  } catch (error) {
    console.error('Error during frame capture:', error);
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
