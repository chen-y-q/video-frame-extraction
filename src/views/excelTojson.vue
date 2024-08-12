<template>
  <el-radio-group v-model="isToJson" style="margin: 20px 20px 0;">
    <el-radio-button :value="true">Excel转json </el-radio-button>
    <el-radio-button :value="false">Json转Excel </el-radio-button>
  </el-radio-group>
  <div class="to-json-box">
    <!-- <div class="title">Excel转json</div> -->
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
        :accept="isToJson ? ['.xlxs', '.xlsx'].join(',') : '.json'"
        :on-remove="handleRemove"
        :before-upload="beforeUpload"
        ref="upload"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          在此放入文件或单击上传
        </div>
      </el-upload>
    </div>
    <div class="download-btn">
      <el-button
        type="primary"
        @click="saveJsonFile"
        :disabled="jsonData ? false : true"
        >{{ isToJson ? '下载json' : '下载Excel' }}</el-button
      >
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
import { computed, ref, watch } from 'vue';
import { UploadFilled } from '@element-plus/icons-vue';
import type {
  UploadInstance,
  UploadProps,
  UploadRawFile,
  UploadRequestOptions,
  TabsPaneContext,
} from 'element-plus';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// #region data-start
const jsonData = ref<any>();
const fileList = ref<any>();
const upload = ref<UploadInstance>();
const jsonColumns = computed(() => {
  if (!jsonData.value) return [];
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
const isToJson = ref(true);
// #endregion data-end

// #region methods-start
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
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
  if (!jsonData.value) return;
  if (isToJson.value) {
    const jsonBlob = new Blob([JSON.stringify(jsonData.value)], {
      type: 'application/json;charset=utf-8',
    });
    saveAs(jsonBlob, 'data.json');
  } else {
    downloadXlsx(jsonData.value);
  }
};
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  fileList.value = [file];
  upload.value!.handleStart(file);
};
const handleChange = (fileData: UploadRequestOptions | any) => {
  console.log(fileData, '999');

  try {
    const data = fileData.raw;
    if (isToJson.value) {
      jsonData.value = convertExcelToJSON(data);
    } else {
      getJsonData(data);
    }
  } catch (error) {
    console.error('文件读取或处理出错:', error);
  }
};
const handleRemove = (file) => {
  jsonData.value = null;
};
const beforeUpload = (file) => {
  console.log(file);
};
const downloadXlsx = (data: any) => {
  const headers = new Set();
  // 从组件的数据属性获取数据

  // 收集所有表头
  data.forEach((item: any) => {
    Object.keys(item).forEach((key) => {
      headers.add(key);
    });
  });

  const headerArray = Array.from(headers);
  const worksheetData = [headerArray];

  data.forEach((item: any) => {
    const row = headerArray.map((header: any) => item[header] || '');
    worksheetData.push(row);
  });

  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  XLSX.writeFile(workbook, 'data.xlsx');
};
const getJsonData = (file) => {
  const reader = new FileReader();
  reader.onload = (e: any) => {
    const parsedData = JSON.parse(e.target.result);
    const isT = isValidFormat(parsedData);
    if (isT) {
      jsonData.value = parsedData;
    } else {
      ElMessage({
        showClose: true,
        message: '请选择数据类型格式的json',
        type: 'error',
      });
    }
  };
  reader.readAsText(file);
};
const isValidFormat = (jsonArray) => {
  if (!Array.isArray(jsonArray)) {
    upload.value!.clearFiles();
    return false;
  }
  const firstItemKeys = Object.keys(jsonArray[0] || {});
  for (let i = 1; i < jsonArray.length; i++) {
    const itemKeys = Object.keys(jsonArray[i]);
    if (!itemKeys.every((key) => firstItemKeys.includes(key))) {
      upload.value!.clearFiles();
      return false;
    }
  }

  return true;
};

// #endregion methods-end

watch(isToJson, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    fileList.value = [];
    upload.value!.clearFiles();
    jsonData.value = null;
  }
});
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
