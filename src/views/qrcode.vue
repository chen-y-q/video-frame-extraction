<template>
  <div class="code-index">
    <div class="title">二维码生成</div>
    <div class="con-box">
      <div class="lf-box">
        <div class="title">内容</div>
        <el-input
          class="textarea-box"
          v-model="codeTxt"
          :rows="2"
          type="textarea"
          placeholder="请输入生成内容"
        />
        <div class="options-box">
          <div class="item">
            <div class="tit">大小</div>
            <div class="inp-box">
              <el-input type="text" v-model="codeSize"></el-input>
            </div>
          </div>
          <div class="item">
            <div class="tit">颜色</div>
            <div class="inp-box">
              <el-input type="color" v-model="codeColor"></el-input>
            </div>
          </div>
          <div class="item">
            <div class="tit">背景色</div>
            <div class="inp-box">
              <el-input type="color" v-model="codeBgColor"></el-input>
            </div>
          </div>
          <div class="item">
            <div class="tit">颜色透明度</div>
            <div class="inp-box">
              <el-select v-model="colorVal" placeholder="Select">
                <el-option
                  v-for="item in transparentOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div class="item">
            <div class="tit">背景色透明度</div>
            <div class="inp-box">
              <el-select v-model="bgColorVal" placeholder="Select">
                <el-option
                  v-for="item in transparentOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
        </div>
      </div>
      <div class="rh-box">
        <div class="title">生成结果</div>
        <div class="code-img-box" v-if="true">
          <img :src="codeImg" alt="" />
        </div>
      </div>
    </div>
    <div class="create-btn" @click="createdBtn()">
      <el-button type="primary">生成</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import QRCode from 'qrcode';

// #region data-start
const codeImg = ref<string>('');
const codeTxt = ref<string>('');
const codeSize = ref<string | number>(200);
const codeColor = ref<string>('#000000');
const codeBgColor = ref<string>('#ffffff');
const colorVal = ref<string>('ff');
const bgColorVal = ref<string>('ff');
const transparentOption = ref<any>([
  {
    value: 'ff',
    label: '不透明',
  },
  {
    value: 'E6',
    label: '10%透明',
  },
  {
    value: '40',
    label: '25%透明',
  },
  {
    value: '80',
    label: '50%透明',
  },
  {
    value: 'BF',
    label: '75%透明',
  },
  {
    value: '1A',
    label: '90%透明',
  },
  {
    value: '00',
    label: '100%透明',
  },
]);
// #endregion data-end

// #region methods-start
const createdQrcode = () => {
  return new Promise((resolve) => {
    const options = {
      width: Number(codeSize.value),
      height: Number(codeSize.value),
      margin: 0,
      errorCorrectionLevel: 'H', // 纠错级别L, M, Q, H
      scale: 1,
      color: {
        dark: codeColor.value + colorVal.value, // 二维码颜色
        light: codeBgColor.value + bgColorVal.value, // 背景颜色
      },
    };
    QRCode.toDataURL(codeTxt.value, options, (err, url) => {
      if (err) console.error(err);
      codeImg.value = url;
      resolve(true);
    });
  });
};
const createdBtn = async () => {
  if (!codeTxt.value) {
    ElMessage({
      showClose: true,
      message: '请输入生成二维码的内容',
      type: 'warning',
    });
    return;
  }
  await createdQrcode();
};
// #endregion methods-end
</script>

<style lang="less" scoped>
.code-index {
  .con-box {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    .lf-box {
      width: 50%;
      padding: 20px;
      text-align: left;
      .textarea-box {
        width: 100%;
        height: 160px;

        :deep(.el-textarea__inner) {
          resize: none;
          height: 120px !important;
        }
      }
      .options-box {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        .item {
          width: 30%;
          margin-left: 5%;
          margin-bottom: 20px;
          &:nth-child(3n + 1) {
            margin-left: 0;
          }
          .tit {
            margin-bottom: 10px;
          }
        }
      }
    }
  }
  .rh-box {
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding-left: 50px;
    .title {
      margin-top: 20px;
    }
    .code-img-box {
      min-width: 200px;
      min-height: 200px;
      img {
        display: block;
      }
    }
  }
  .create-btn {
    margin: 20px auto;
    :deep(.el-button) {
      width: 120px;
      height: 50px;
    }
  }
}
</style>
