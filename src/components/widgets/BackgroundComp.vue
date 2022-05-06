<script lang="ts" setup>
import type { AvatarOptions } from '@/types'

interface BackgroundProps {
   color: AvatarOptions["background"]["color"]
}

const props = defineProps<BackgroundProps>()
</script>
<template>
   <div class="avatar-background" :style="{ background: props.color }"></div>
</template>
<style lang="scss" scoped>
.avatar-background {
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   transition: background-color .2s;
}
</style>