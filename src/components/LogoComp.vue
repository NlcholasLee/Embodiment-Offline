<script lang="ts" setup>
import Logo from '@/assets/logo.svg'

const props = withDefaults(defineProps<{size?:number}>(), {
   size: 2.5
})
</script>

<template>
   <img :src="Logo" alt="logo" style="width: 40px; height: 40px;" :style="{ width:`${props.size}rem`, height: `${props.size}rem` }">
</template>