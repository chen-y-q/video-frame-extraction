<template>
  <div class="bg-box">
    <vue-particles id="tsparticles" :options="optionList[type]" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import {
  particlesOption,
  particlesOption2,
  particlesOption3,
  particlesOption4,
  particlesOption5,
  particlesOption6
} from '../utils/particleConfig';

interface Props {
  type: string | number;
}
withDefaults(defineProps<Props>(), {
  type: () => 1,
});
// #region data-start
const optionList = reactive<any>({
  1: particlesOption,
  2: particlesOption2,
  3: particlesOption3,
  4: particlesOption4,
  5: particlesOption5,
  6: particlesOption6
});
// #endregion data-end

// #region methods-start
// const particlesLoaded = async (container: any) => {
//   console.log('Particles container loaded', container);
// };
// #endregion methods-end
</script>

<style lang="less" scoped>
.bg-box {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>
