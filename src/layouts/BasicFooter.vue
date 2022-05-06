<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { Locale } from '@/enums';

const { locale } = useI18n()

function switchLocale() {
   locale.value = locale.value === Locale.EN ? Locale.ZH : Locale.EN
}
</script>
<template>
   <footer class="footer">
      <div>
         Made by
         <a href="" class="link" target="_blank" rel="nofollow noopener noreferrer">
            Thunder
         </a>
      </div>
      <div class="gap">|</div>
      <div class="locale" @click="switchLocale">
         {{ locale === Locale.EN ? '简体中文' : 'English' }}
      </div>
   </footer>
</template>


<style lang='scss' scoped>
@use 'src/styles/var';
@import 'src/styles/handle.scss';

.footer{
   display: flex;
   justify-content: center;
   align-items: center;
   height: var.$layout-footer-height;
   padding: 0.8rem 0;
   @include font_color("font_color", 0.4);
   font-weight: bold;
   font-size: 0.8rem;
   .gap{
      padding: 0 1rem;
   }
   .locale {
      cursor: pointer;
   }

   .link, .locale{
      transition: color .2s;
   }

   &:hover {
      @include font_color("font_color", null);
   }
}
</style>