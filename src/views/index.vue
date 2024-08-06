<template>
  <div class="index-box">
    <div class="search-box">
      <el-input
        v-model="searchValue"
        style="max-width: 600px;"
        placeholder="请输入工具名称"
        class="input-with-select"
      >
        <template #append>
          <el-button :icon="Search" @click="searchBtn()" />
        </template>
      </el-input>
    </div>
    <div class="list">
      <el-button
        v-for="(i, index) in showLinkList"
        :key="index"
        @click="linkBtn(i.link, i.type)"
      >
        {{ i.name }}
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

// #region data-start
const router = useRouter();
const linkList = ref([
  {
    name: 'element-plus文档',
    link: 'https://element-plus.org/zh-CN/guide/design.html',

    type: 'external',
  },
  {
    name: 'Excel转JSON',
    link: 'https://www.toolnb.com/tools/exceltojson.html',
    type: 'external',
  },
  {
    name: '二维码生成器',
    link: 'https://www.toolnb.com/tools/qrcode.html',
    type: 'external',
  },
  {
    name: '视频抽帧',
    link: '/videoTools',
    type: 'local',
  },
  {
    name: '壁纸',
    link: 'https://wallhaven.cc',
    type: 'external',
  },
  {
    name: 'Vant4文档',
    link: 'https://vant.pro/vant/#/zh-CN/quickstart',
    type: 'external',
  },
  {
    name: '签名插件(signature_pad)',
    link: 'https://github.com/szimek/signature_pad',
    type: 'external',
  },
  {
    name: 'ScrollReveal文档',
    link: 'https://scrollrevealjs.org/',
    type: 'external',
  },
  {
    name: 'LimeUI文档(uniapp插件)',
    link: 'https://limeui.qcoon.cn/',
    type: 'external',
  },
]);
const showLinkList: any = ref();
const searchValue = ref();
// #endregion data-end

// #region methods-start
const linkBtn = (link: string, type: string) => {
  if (type == 'external') {
    window.open(link);
  } else {
    router.push({ path: link });
  }
};
const searchBtn = () => {
  if (searchValue.value) {
    showLinkList.value = linkList.value.filter((item) => {
      return item.name.indexOf(searchValue.value) != -1;
    });
  } else {
    showLinkList.value = linkList.value;
  }
};
// #endregion methods-end

onBeforeMount(() => {
  showLinkList.value = linkList.value;
});
</script>

<style lang="less" scoped>
.search-box {
  margin-top: 20px;
}
.list {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
}
</style>
