<script lang="ts" setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router';
import { useTheme, type ThemeColorType } from '@/stores/theme'
import LogoComp from '@/components/LogoComp.vue';
import { useI18n } from 'vue-i18n'
import themeSVGDay from "@/assets/day.svg"
import themeSVGNight from "@/assets/night.svg"

const { t } = useI18n()
const themeStore = useTheme()
let isDay = ref(true)
if(themeStore.themeType === "light"){
   isDay.value = false
}

function theme() {
   let changeTheme:ThemeColorType = "dark"
   if (themeStore.themeType === "dark") {
      changeTheme = "light"
      isDay.value = false
   }else {
      isDay.value = true
   }

   themeStore.themeType = changeTheme
   window.document.documentElement.setAttribute( "data-theme", changeTheme );
}

</script>
<template>
   <header class="header">
      <LogoComp class="logo"></LogoComp>
      <h2 class="site-title">Embodiment</h2>

      <nav class="header-right">
         <RouterLink to="/" class="nav-link">{{ t(`navigation.home`) }}</RouterLink>
         <RouterLink to="/about" class="nav-link">{{ t(`navigation.about`) }}</RouterLink>
         <RouterLink to="" class="nav-link" @click="theme">
            <img :src="themeSVGDay" alt="theme" style="width: 1.5rem; height: 1.5rem;" v-show="isDay">
            <img :src="themeSVGNight" alt="theme" style="width: 1.5rem; height: 1.5rem;" v-show="!isDay">
            </RouterLink>
      </nav>
   </header>
</template>

<style lang='scss' scoped>
@use 'src/styles/var';
@import 'src/styles/handle.scss';

.header {
   display: flex;
   align-items: center;
   height: var.$layout-header-height;
   padding: 1rem 2rem;

   .logo {
      border-radius: 10%;
   }
   .site-title {
      margin-left: 1rem;
      font-weight: bold;
      font-size: 1.9rem;
      cursor: default;

      @media screen and (max-width: var.$screen-sm) {
         display: none;
      }
   }
   .header-right {
      display: flex;
      flex: 1;
      justify-content: flex-end;
      font-size: 1.2rem;
      .nav-link{
         margin-left: 12px;
         &:hover {
            @include font_color("font_color", 15);
         }
      }
   }
}
</style>