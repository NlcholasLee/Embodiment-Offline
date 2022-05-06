<script lang="ts" setup>
import { useSider } from '@/hooks'
import IconRight from '@/assets/icons/icon-right.svg'
const { isCollapsed, openSider, closeSider } = useSider()
</script>

<template>
   <aside class="sider" :class="{ collapsed: isCollapsed }">
      <slot></slot>

      <div class="trigger" @click="isCollapsed ? openSider():closeSider()">
         <img :src="IconRight" class="icon-right" alt="arrow">
      </div>
   </aside>
</template>

<style lang='scss' scoped>
@use 'src/styles/var';
@import 'src/styles/handle.scss';

.sider {
   position: fixed;
   top: 0;
   right: 0;
   z-index: 200;
   height: 100%;
   transition: transform .3s;

   .icon-right {
      transition: transform .3s;
   }

   &.collapsed {
      transform: translateX(100%);

      .icon-right{
         transform: rotateY(-180deg);
      }
   }

   .trigger {
      position: absolute;
      top: 50%;
      left: 1px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1.2rem;
      height: 4rem;
      @include configurator_color("configurator_color", null);
      border-radius: 0.4rem 0 0 0.4rem;
      transform: translate(-100%, -50%);
      cursor: pointer;
      transition: width .3s background-color .3s;

      &:hover {
         width: 1.5rem;
         @include configurator_color("configurator_color", 5);
      }
   }
}
</style>