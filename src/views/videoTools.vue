<template>
  <div class="index-box">
    <div class="tyle-list"></div>
    <div class="box">
      <div class="check-file-btn btn" @click="checkBtn()">选择视频</div>
      <input
        type="file"
        accept="video/*"
        class="file-btn"
        ref="inp"
        @input="inputChange"
      />
      <input
        type="text"
        class="num"
        placeholder="请输入获取多少帧的图"
        ref="inp2"
        v-model="num"
      />
      <div class="start-btn btn" @click="startBtn()">Start</div>
    </div>
    <div class="vdo-box" v-show="false">
      <video controls ref="vdo"></video>
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
import { computed, ref, nextTick } from 'vue';

// #region data-start
const inp = ref();
const inp2 = ref();
const file = ref();
const num = ref(null);
const imgList = ref<any>([]);
const showImg = ref();
const isLoading = ref(false);
const vdo = ref();
const videoDuration = ref(0);
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
  file.value = e.target.files?.[0];
  if (file.value && file.value.type.match('video.*')) {
    showImg.value = '';
    imgList.value = [];
    if (vdo.value) {
      vdo.value.removeEventListener('loadedmetadata', handleMetadata);
      vdo.value.src = URL.createObjectURL(file.value);
      vdo.value.addEventListener('loadedmetadata', handleMetadata);
      vdo.value.load();
    }
  }
};
const handleMetadata = () => {
  if (vdo.value) {
    videoDuration.value = vdo.value.duration;
    num.value = videoDuration.value;
  }
};
const startBtn = async () => {
  if (!file.value)
    return ElMessage({
      showClose: true,
      message: '请选择视频',
      type: 'warning',
    });
  if (!num.value)
    return ElMessage({
      showClose: true,
      message: '请输入数字',
      type: 'warning',
    });
  if (isLoading.value) return;
  isLoading.value = true;
  for (let i = 0; i < num.value; i++) {
    const frame: any = await captureFrame(file.value, i);
    if (!frame) return;
    imgList.value.push(frame);
    if (!showImg.value) {
      showImg.value = imgList.value[0];
    }
  }
  isLoading.value = false;
};
const checkBtn = () => {
  const clickEvent = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  });

  inp.value.dispatchEvent(clickEvent);
};
// #endregion methods-end
</script>

<style lang="less" scoped>
.index-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .btn {
    height: 40px;
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    transition: border-color 0.25s;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      border-color: #646cff;
    }
    &:focus,
    &:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }
  }
  .box {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    .num {
      width: 200px;
      height: 40px;
      border: 1px solid #ccc;
      outline-style: none;
      padding-left: 10px;
      border-radius: 6px;
    }
  }
  .vdo-box {
    width: 800px;
    height: 600px;
    video {
      width: 100%;
      height: auto;
    }
  }
  .file-btn {
    display: none;
  }
  .check-file-btn {
    width: 120px;
    height: 40px;
    border: 1px solid #000;

    border-radius: 6px;
    margin-right: 5px;
  }
  .start-btn {
    border: 1px solid #000;
    margin-left: 5px;
  }
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
