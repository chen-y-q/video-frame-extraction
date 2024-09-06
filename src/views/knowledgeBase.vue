<template>
  <div class="box">
    <div class="search-box">
      <el-input
        v-model="searchValue"
        style="max-width: 600px;"
        placeholder="请输入题目"
        class="input-with-select"
        clearable
      >
        <template #append>
          <el-button :icon="Search" @click="searchBtn()" />
        </template>
      </el-input>
    </div>
    <div class="show-box">
      <template v-if="showData.length">
        <div class="item" v-for="(i, index) in showData" :key="index">
          <div class="t-a">
            <div class="t">{{ i.topic }}</div>
            <div class="a"><span>答案：</span>{{ i.answer }}</div>
          </div>
          <div class="a-list" v-if="i.type != 'determine'">
            <div
              class="a-i"
              v-for="(subI, subIndex) in i.answer_arr"
              :key="subIndex"
              :class="{
                active: isOn(subI, i.answer, subIndex),
              }"
            >
              {{ subI }}
            </div>
          </div>
        </div>
      </template>
      <div class="item" v-if="showData.length == 0">
        题目暂无收录
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, computed } from 'vue';
import { dataJson } from '../utils/data';
import { Search } from '@element-plus/icons-vue';

// #region data-start
const data = ref();
const showData = ref([]);
const searchValue = ref();
// #endregion data-end

// #region methods-start
const searchBtn = () => {
  if (searchValue.value) {
    let filterData = data.value.filter((item) => {
      return item.topic.indexOf(searchValue.value) != -1;
    });

    if (filterData.length > 0) showData.value = filterData;
    if (filterData.length == 0) showData.value = [];
  } else {
    showData.value = data.value;
  }
  searchValue.value = '';
};
const isOn = (subI: any, answer: any, index: any) => {
  const answerArr = answer.split('');
  let is = false;
  answerArr.forEach((val) => {
    if (subI.substring(0, 2).indexOf(val) != -1) {
      is = true;
    }
  });
  return is;
};
// #endregion methods-end
onBeforeMount(() => {
  data.value = dataJson;
});
</script>

<style lang="less" scoped>
.box {
  padding-top: 20px;
  .show-box {
    width: 1200px;
    margin: 20px auto;
  }
  .a-list {
    text-align: left;
  }
  .t-a {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .t {
      text-align: left;
    }
  }
  .a {
    flex-shrink: 0;
    color: red;
    font-size: 20px;
    margin-left: 20px;
  }
  .a-i {
    margin-bottom: 10px;
    &.active {
      color: red;
      font-size: 20px;
    }
  }
}
</style>
