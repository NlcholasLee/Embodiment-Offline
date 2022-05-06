<script lang="ts">
export interface AvatarPictureRef {
   avatarRef: HTMLDivElement
}
</script>
<script lang="ts" setup>
import { ref, toRefs, watchEffect } from 'vue'
import { WrapperShape } from '@/enums'
import type { AvatarOptions } from '@/types'
import { getRandomAvatarOptions } from '@/utils'
import { AVATAR_LAYER, NONE } from '@/utils/constant'
import { widgetData } from '@/utils/dynamicData'
import BackgroundComp from '@/components/widgets/BackgroundComp.vue'

interface AvatarPicture {
   options: AvatarOptions
   size?: number
}

const props = withDefaults(defineProps<AvatarPicture>(), {
   options: () => getRandomAvatarOptions(),
   size: 280,
})

const { options: avatarOptions, size: avatarSize } = toRefs(props);

const avatarRef = ref<AvatarPictureRef['avatarRef']>()

defineExpose({ avatarRef })

function getWrapperShapeClassName() {
   return {
      [WrapperShape.Circle]: avatarOptions.value.wrapperShape === WrapperShape.Circle,
      [WrapperShape.Square]: avatarOptions.value.wrapperShape === WrapperShape.Square,
      [WrapperShape.Squircle]: avatarOptions.value.wrapperShape === WrapperShape.Squircle,
   }
}

const svgContent = ref('')

watchEffect(async () => {
   const sortedList = Object.entries(avatarOptions.value.widgets).sort(
      ([pervShape, prev], [nextShape, next]) => {
         const ix = prev.zIndex ?? AVATAR_LAYER[pervShape]?.zIndex ?? 0
         const iix = next.zIndex ?? AVATAR_LAYER[nextShape]?.zIndex ?? 0
         return ix - iix
      }
   )

   const promises: Promise<string>[] = sortedList.map(
      async ([widgetType, opt]) => {
         if(opt.shape !== NONE && widgetData?.[widgetType]?.[opt.shape]){
            return (await widgetData[widgetType][opt.shape]()).default
         }
         return ''
      }
   )

   const svgRawList = await Promise.all(promises).then((raw) => {
      return raw.map((svgRaw, i) => {
         const widgetFillColor = sortedList[i][1].fillColor
         const content = svgRaw
            .slice(svgRaw.indexOf('>', svgRaw.indexOf('<svg')) + 1)
            .replace('</svg>', '')
            .replaceAll('$fillColor', widgetFillColor || 'transparent')
         return `
            <g id="avatar-picture-${sortedList[i][0]}">
               ${content}
            </g>
         `
      })
   })

   svgContent.value = `
      <svg
         width="${avatarSize.value}"
         height="${avatarSize.value}"
         viewBox="0 0 ${avatarSize.value / 0.7} ${avatarSize.value / 0.7}"
         preserveAspectRatio="xMidYMax meet"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
      >
         <g transform="translate(100, 65)">
            ${svgRawList.join('')}
         </g>
   `
})
</script>

<template>
   <div 
      ref="avatarRef" 
      class="avatar-picture"
      :style="{
         width: `${avatarSize}px`,
         height: `${avatarSize}px`,
      }"
      :class="getWrapperShapeClassName()"
   >
      <BackgroundComp :color="avatarOptions.background.color"></BackgroundComp>
      <div class="avatar-payload" v-html="svgContent"></div>
   </div>
</template>
<style lang="scss" scoped>
.avatar-picture {
   position: relative;
   overflow: hidden;

   &.circle {
      border-radius: 50%;
   }

   &.squircle {
      border-radius: 25px;
   }

   .avatar-payload {
      position: relative;
      z-index: 2;
      width: 100%;
      height: 100%;
   }
}
</style>