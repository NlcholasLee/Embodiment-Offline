<script lang="ts" setup>
const props = defineProps<{
   title?: string
}>()
</script>

<template>
   <div class="setting-section">
      <div class="section-title">{{ props.title }}</div>
      <div><slot></slot></div>
   </div>
</template>

<style lang="scss" scoped>
.setting-section {
   padding: 1.8rem 1rem;
   .section-title {
      margin-bottom: 1.5rem;
      font-weight: bold;
   }
}
</style>