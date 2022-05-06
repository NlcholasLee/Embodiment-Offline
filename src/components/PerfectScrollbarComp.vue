<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import PerfectScrollbar from 'perfect-scrollbar'

const props = defineProps<{options?: PerfectScrollbar.Options}>()
const scrollWrapper = ref<HTMLDivElement>()
let ps: PerfectScrollbar

onMounted(() => {
   if (!scrollWrapper.value) {
      console.warn(`No valid 'PerfectScrollbal' container found`);
      return
   }

   ps = new PerfectScrollbar(scrollWrapper.value, {
      minScrollbarLength: 20,
      maxScrollbarLength: 160,
      ...props.options
   })
})

onUnmounted(() => {
   ps.destroy()
})
</script>

<template>
   <div ref="scrollWrapper" style="position: relative; overflow: hidden;">
      <slot></slot>
   </div>
</template>

<style lang="scss">
.ps--active-y .ps__rail-y{
   &:hover, &.ps-clicking {
      background-color: #464646;
   }
}

</style>