<script setup lang="ts">
import {computed, ref, watch} from "vue";
import {getUserPermissionOptions} from "@/Utils/UserPermission.ts";
import {getManagerPermissionOptions} from "@/Utils/ManagerPermission.ts";

interface SelectFormImpl {
  username: string; nickname: string; identity: "USER" | "MANAGER"; permission: number;
}

const identityOptions = [
  {value: "USER", label: "用户"},
  {value: "MANAGER", label: "管理员"},
];

const selectForm = ref<SelectFormImpl>({username: '', nickname: '', identity: "USER", permission: 1});

// 计算属性：根据身份动态获取权限选项
const permissionOptions = computed(() => {
  return selectForm.value.identity === 'MANAGER'? getManagerPermissionOptions(): getUserPermissionOptions();
})

// 格式化显示权限文本
const formatPermissionText = (permission: number): string => {
  const options = permissionOptions.value;
  const selectedOption = options.find(option => option.value === permission);
  return selectedOption ? selectedOption.label : `未知权限${permission}`;
}

// 监听身份变化，重置权限为默认值
watch(() => selectForm.value.identity, (newVal: string) => {
  selectForm.value.permission = 1;
})
</script>

<template>
  <div class="container">
    <el-form class="select_bar" label-width="auto" :model="selectForm">
      <el-form-item label="用户名：">
        <el-input v-model="selectForm.username"/>
      </el-form-item>
      <el-form-item label="昵称：">
        <el-input v-model="selectForm.nickname"/>
      </el-form-item>
      <el-form-item label="角色：">
        <el-select v-model="selectForm.identity" placeholder="选择角色" style="width: 10rem">
          <el-option v-for="item in identityOptions" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="权限：">
        <el-select v-model="selectForm.permission" placeholder="选择权限" style="width: 12rem">
          <el-option v-for="item in permissionOptions" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button native-type="submit" type="primary">搜索</el-button>
        <el-button native-type="reset" type="default">重置</el-button>
        <el-button native-type="button" type="warning">以当前检索刷新</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
:deep(.el-form-item__label) {
  color: #fff;
}
.container {
  animation: container_in 1s ease forwards;
  height: 100%;
  overflow: auto;
  background-color: rgba(84, 92, 100, .5);
  backdrop-filter: blur(5px);
  box-shadow: white 0 0 5px;
  .select_bar {
    border-bottom: #deefff solid 1px;
    padding: 2rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
}
</style>