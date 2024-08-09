<template>
  <div class="to-json-box">
    <div class="title">Excel转json</div>
    <div class="upload-box">
      <el-upload
        class="upload-demo"
        drag
        multiple
        :auto-upload="false"
        v-model:file-list="fileList"
        :limit="1"
        :on-exceed="handleExceed"
        :on-change="handleChange"
        :accept="['.xlxs', '.xlsx'].join(',')"
        ref="upload"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          在此放入文件或单击上传
        </div>
      </el-upload>
    </div>
    <div class="download-btn">
      <el-button type="primary" @click="saveJsonFile">下载json</el-button>
    </div>
    <div class="json-data" v-if="jsonData">
      <el-auto-resizer class="table-box">
        <template #default="{ height, width }">
          <el-table-v2
            :columns="jsonColumns"
            :data="jsonData"
            :width="width"
            :height="height"
          />
        </template>
      </el-auto-resizer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { UploadFilled } from '@element-plus/icons-vue';
import type {
  UploadInstance,
  UploadProps,
  UploadRawFile,
  UploadRequestOptions,
} from 'element-plus';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import InfiniteList from 'vue3-infinite-list';
// #region data-start
const jsonData = ref<any>();
const fileList = ref<any>();
const upload = ref<UploadInstance>();
const jsonColumns = computed(() => {
  const keys = Object.keys(jsonData.value[0]);
  const keysArr = keys.map((val: any, index) => {
    return {
      key: val,
      dataKey: val,
      title: val,
      width: 100 / keys.length + '%',
    };
  });
  return keysArr;
});
// #endregion data-end

// #region methods-start
const convertExcelToJSON = (file: any) => {
  const reader = new FileReader();
  reader.onload = async (e: ProgressEvent<FileReader>) => {
    const data = e.target?.result as ArrayBuffer;
    if (data) {
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      // 使用 json 更新组件状态或进行其他处理
      jsonData.value = json;
    }
  };
  reader.readAsArrayBuffer(file);
};
const saveJsonFile = () => {
  const jsonBlob = new Blob([JSON.stringify(jsonData.value)], { type: 'application/json' });
  saveAs(jsonBlob, 'data.json');
};
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  fileList.value = [file];
  upload.value!.handleStart(file);
};
const handleChange = (fileData: UploadRequestOptions) => {
  try {
    const data = fileData.raw;
    jsonData.value = convertExcelToJSON(data);
  } catch (error) {
    console.error('文件读取或处理出错:', error);
  }
};

// #endregion methods-end
</script>

<style lang="less" scoped>
.to-json-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .title {
    flex-shrink: 0;
    margin: 20px auto;
  }
  .upload-box {
    width: 100%;
    flex-shrink: 0;
    padding: 20px;
  }
  .download-btn {
    flex-shrink: 0;
  }
  .json-data {
    flex: 1;
    height: 100%;
    width: 100%;
    padding: 0 20px;
    .table-box {
      width: 100%;
      height: 100%;
      .el-table-v2 {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
