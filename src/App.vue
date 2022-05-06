<script setup lang="ts">
import { RouterView } from 'vue-router'
import BasicContainer from './layouts/BasicContainer.vue';
import BasicFooter from './layouts/BasicFooter.vue';
import BasicHeader from './layouts/BasicHeader.vue';
import BaiscSider from './layouts/BasicSider.vue'
import ConfettiCanvasComp from './components/ConfettiCanvasComp.vue';
import ConfiguratorComp from './components/ConfiguratorComp.vue';
import PerfectScrollbarComp from './components/PerfectScrollbarComp.vue';
</script>

<template>
  <main class="main">
    <PerfectScrollbarComp>
      <BasicContainer>
        <div class="content-wrapper">
          <div class="content-view">
            <BasicHeader></BasicHeader>
            <div class="middle">
              <RouterView></RouterView>
            </div>
            <BasicFooter></BasicFooter>

          </div>
          <ConfettiCanvasComp></ConfettiCanvasComp>
        </div>
      </BasicContainer>
    </PerfectScrollbarComp>
    <BaiscSider>
      <ConfiguratorComp></ConfiguratorComp>
    </BaiscSider>
  </main>
</template>
<style lang="scss" scoped>
@import "@/styles/handle.scss";

.main {
  width: 100%;
  height: 100%;
  overflow: hidden;
  @include font_color("font_color", null);
  @include background_color("background_color");
  transition: background-image .3s;

  .content-wrapper {
    height: 100%;
    transform: scale(1);
  }

  .content-view {
    position: relative;
    z-index: 110;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
  }
}
</style>
