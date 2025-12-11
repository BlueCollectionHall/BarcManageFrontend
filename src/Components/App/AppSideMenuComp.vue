<script setup lang="ts">
import {PERMISSION} from "@/Utils/Permission.ts";
import {useUserStore} from "@/Stores/UserStore.ts";
import {storeToRefs} from "pinia";

const userStore = useUserStore();

const {userArchive} = storeToRefs(userStore);
</script>

<template>
  <el-aside width="20rem" >
    <el-menu
        style="min-height: calc(100vh - 90px); max-height: calc(100vh - 90px); background-color: #545c6490; overflow: auto;"
        active-text-color="#ffd04b"
        background-color="#545c6490"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        v-if="userArchive && userArchive.identity === 'MANAGER'"
    >
      <el-sub-menu index="1"v-if="userArchive && userArchive.identity === 'MANAGER'">
        <template #title>
          <span>用户管理</span>
        </template>
        <el-menu-item-group title="馆长" v-if="PERMISSION.ADVANCED_ADMINISTRATOR <= userArchive.permission">
          <el-menu-item index="1-1">裁撤、更换权限</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="管理员" v-if="PERMISSION.ADMINISTRATOR <= userArchive.permission">
          <el-menu-item index="1-2">裁撤、更换权限</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="用户" v-if="(userArchive.permission & PERMISSION.THI_MAINTAINER) === PERMISSION.THI_MAINTAINER">
          <el-menu-item index="1-3">冻结、修改用户</el-menu-item>
        </el-menu-item-group>
        <el-menu-item index="1-4">向用户、管理员发出警告</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2" v-if="((userArchive.permission & PERMISSION.SEC_MAINTAINER) === PERMISSION.SEC_MAINTAINER) || ((userArchive.permission & PERMISSION.DISCIPLINARY_COMMITTEE) === PERMISSION.DISCIPLINARY_COMMITTEE)">
        <template #title>
          <span>作品管理</span>
        </template>
        <el-menu-item v-if="((userArchive.permission & PERMISSION.SEC_MAINTAINER) === PERMISSION.SEC_MAINTAINER) || ((userArchive.permission & PERMISSION.DISCIPLINARY_COMMITTEE) === PERMISSION.DISCIPLINARY_COMMITTEE)">认领、原著</el-menu-item>
        <el-menu-item v-if="(userArchive.permission & PERMISSION.SEC_MAINTAINER) === PERMISSION.SEC_MAINTAINER">下架、封禁</el-menu-item>
        <el-menu-item v-if="(userArchive.permission & PERMISSION.SEC_MAINTAINER) === PERMISSION.SEC_MAINTAINER">人工巡检</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3" v-if="(userArchive.permission & PERMISSION.FIR_MAINTAINER) === PERMISSION.FIR_MAINTAINER">
        <template #title>
          <span>评论、留言管理</span>
        </template>
        <el-menu-item>敏感、非法、违禁、色情</el-menu-item>
        <el-menu-item>人工巡检</el-menu-item>
      </el-sub-menu>
      <el-menu-item>自动预警</el-menu-item>
    </el-menu>
  </el-aside>
</template>

<style scoped>

</style>