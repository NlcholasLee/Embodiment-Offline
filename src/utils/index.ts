import {
   type EarringsShape,
   type GlassesShape,
   BeardShape,
   Gender,
   TopsShape
} from "../enums"

import type { AvatarOptions, None } from "../types"
import { AVATAR_LAYER, NONE, SETTINGS, SPECIAL_AVATARS } from "./constant"

// 获取一个随机的shape值
function getRandom<V = unknown>(arr: Array<V>,
   {
      avoid = [],
      usually = [],
   }: { avoid?: Array<unknown>; usually?: Array<(V | 'none')> } = {}
): V {
   const avoidVal = avoid.filter(Boolean)
   const filteredArr = arr.filter((item) => !avoidVal.includes(item))

   const usuallyVal = usually.filter(Boolean).reduce<Array<V>>((acc, cur) => acc.concat(new Array(15).fill(cur)), [])
   const finalArr = filteredArr.concat(usuallyVal)

   const randomIdx = Math.floor(Math.random() * finalArr.length)
   const randomVal = finalArr[randomIdx]

   return randomVal
}

// 获取一个随机的Color值
export function getRandomFillColor() {
   return SETTINGS.commonColors[Math.floor(Math.random() * SETTINGS.commonColors.length)]
}

// 获取一个随机的头像+背景配置
export function getRandomAvatarOptions(
   presetOption: Partial<AvatarOptions> = {},
   useOption: Partial<AvatarOptions> = {}
): AvatarOptions {
   const gender = getRandom(SETTINGS.gender)
   const beardList: BeardShape[] = []
   let topList: TopsShape[] = [TopsShape.Danny, TopsShape.Wave, TopsShape.Pixie]

   if (gender === Gender.Male) {
      beardList.push(BeardShape.Scruff)
      topList = SETTINGS.topsShape.filter(shape => !topList.includes(shape))
   }

   const beardShape = getRandom<BeardShape | None>(beardList, { usually: [NONE] })

   const avatarOption: AvatarOptions = {
      gender,
      wrapperShape: presetOption?.wrapperShape || getRandom(SETTINGS.wrapperShape),

      background: {
         color: getRandom(SETTINGS.backgroundColor, {
            avoid: [useOption.background?.color]
         })
      },
      widgets: {
         face: {
            shape: getRandom(SETTINGS.faceShape)
         },
         tops: {
            shape: getRandom(topList, {
               avoid: [useOption.widgets?.tops?.shape],
            }),
            fillColor: getRandomFillColor(),
         },
         eyebrows: {
            shape: getRandom(SETTINGS.eyebrowsShape, { avoid: [useOption.widgets?.eyebrows?.shape] })
         },
         eyes: {
            shape: getRandom(SETTINGS.eyesShape, { avoid: [useOption.widgets?.eyes?.shape] })
         },
         glasses: {
            shape: getRandom<GlassesShape | None>(SETTINGS.glassesShape, { usually: [NONE] })
         },
         ear: {
            shape: getRandom(SETTINGS.earShape, { avoid: [useOption.widgets?.ear?.shape] })
         },
         earrings: {
            shape: getRandom<EarringsShape | None>(SETTINGS.earringsShape, { usually: [NONE] })
         },
         nose: {
            shape: getRandom(SETTINGS.noseShape, { avoid: [useOption.widgets?.nose?.shape] })
         },
         mouth: {
            shape: getRandom(SETTINGS.mouthShape, { avoid: [useOption.widgets?.mouth?.shape] })
         },
         beard: {
            shape: beardShape,
            // HACK: 确定 Scruff 胡子在嘴上面
            ...(beardShape === BeardShape.Scruff
               ? { zIndex: AVATAR_LAYER['mouth'].zIndex - 1 }
               : undefined),
         },
         clothes: {
            shape: getRandom(SETTINGS.clothesShape, { avoid: [useOption.widgets?.clothes?.shape] }),
            fillColor: getRandomFillColor(),
         }
      }
   }

   return avatarOption;
}

// 获取一个特殊头像的配置
export function getSpecialAvatarOptions(): AvatarOptions {
   return SPECIAL_AVATARS[Math.floor(Math.random() * SPECIAL_AVATARS.length)]
}

// 彩条动画
export function showConfetti() {
   import('canvas-confetti').then(confetti => {
      const canvasElement: HTMLCanvasElement | null = document.querySelector('#confetti')
   
      if(!canvasElement){
         return;
      }

      const myConfetti = confetti.create(canvasElement, {
         resize: true,
         useWorker: true,
         disableForReducedMotion: true,
      })

      const duration = performance.now() + 1 * 1000

      const confettiColors = ['#6967fe', '#85e9f4', '#e16984']
   
      void (function frame() {
         myConfetti({
            particleCount: confettiColors.length,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: confettiColors,
         })

         myConfetti({
            particleCount: confettiColors.length,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: confettiColors,
         })

         if (performance.now() < duration) {
            requestAnimationFrame(frame)
         }
      })()
   })
}

// 匹配 "":""  ""   true  false  null  number
export function highlightJSON(json: string): string {
   if(!json){
      return ''
   }

   if (typeof json !== 'string') {
      json = JSON.stringify(json, undefined, 2)
   }

   json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

   return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, (match) => {
      let cls = ''
      if (/^"/.test(match)) {
         if(/:$/.test(match)){
            cls = 'key'
         } else {
            cls = 'string'
         }
      } else if(/true|false/.test(match)) {
         cls = 'boolean'
      } else if (/null/.test(match)){
         cls = 'null'
      }else {
         cls = 'number'
      }
      return `<span class="token ${cls}">${match}</span>`
   })
}