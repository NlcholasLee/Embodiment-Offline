import type { AvatarOptions, AvatarSettings } from "../types"
import {
   BeardShape,
   ClothesShape,
   EarShape,
   EarringsShape,
   EyebrowsShape,
   EyesShape,
   FaceShape,
   Gender,
   GlassesShape,
   MouthShape,
   NoseShape,
   TopsShape,
   WrapperShape,
   WidgetType,
} from "../enums"

// 定义空数据
export const NONE = 'none'

// 人像的各个part的层叠位置（个别层叠顺序需要修改可到index导出时修改）
export const AVATAR_LAYER: Readonly<{
   [key in `${WidgetType}`]: { zIndex: number }
}> = {
   [WidgetType.Face]: {
      zIndex: 10,
   },
   [WidgetType.Tops]: {
      zIndex: 80
   },
   [WidgetType.Eyebrows]: {
      zIndex: 70,
   },
   [WidgetType.Eyes]: {
      zIndex: 50,
   },
   [WidgetType.Glasses]: {
      zIndex: 90,
   },
   [WidgetType.Ear]: {
      zIndex: 102,
   },
   [WidgetType.Earrings]: {
      zIndex: 103,
   },
   [WidgetType.Nose]: {
      zIndex: 60,
   },
   [WidgetType.Mouth]: {
      zIndex: 100,
   },
   [WidgetType.Beard]: {
      zIndex: 105,
   },
   [WidgetType.Clothes]: {
      zIndex: 110,
   }
}

// 画像的所有可设置的值
export const SETTINGS: Readonly<AvatarSettings> = {
   gender: [Gender.Male, Gender.Female],
   wrapperShape: Object.values(WrapperShape),
   faceShape: Object.values(FaceShape),
   topsShape: Object.values(TopsShape),
   eyebrowsShape: Object.values(EyebrowsShape),
   eyesShape: Object.values(EyesShape),
   glassesShape: Object.values(GlassesShape),
   earShape: Object.values(EarShape),
   earringsShape: Object.values(EarringsShape),
   noseShape: Object.values(NoseShape),
   mouthShape: Object.values(MouthShape),
   beardShape: Object.values(BeardShape),
   clothesShape: Object.values(ClothesShape),
   commonColors: [
      '#177cb0',
      '#FC909F',
      '#F4D150',
      '#E0DDFF',
      '#D2EFF3',
      '#FFEDEF',
      '#000000',
      '#FFEBA4',
      '#70f3ff',
      '#F48150',
      '#48A99A',
      '#C09FFF',
      '#FD6F5D',
      '#FF0000'
   ],
   get backgroundColor() {
      return [
         ...this.commonColors, 
         "linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%)",
         "linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)",
         "linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)",
         "linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)",
         "linear-gradient(to top, #48c6ef 0%, #6f86d6 100%)",
         "linear-gradient(15deg, #13547a 0%, #80d0c7 100%)",
         "linear-gradient(to top, #09203f 0%, #537895 100%)",
      ]
   },
   skinColor: ['#F9C9B6', '#AC6651'],
}

// 屏幕大小
export const SCREEN = {
   lg: 976,
} as const

// 定义触发的概率
export const TRIGGER_PROBABILTY = 0.1

// 定义特殊头像（特殊头像生成时可触发彩条动画）
export const SPECIAL_AVATARS: Readonly<AvatarOptions[]> = [
   {
      wrapperShape: "squircle",
      background: {
         color: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
      },
      widgets: {
         face: {
            shape: FaceShape.Base
         },
         tops: {
            shape: TopsShape.Beanie,
            fillColor: '#D2EFF3'
         },
         eyebrows: {
            shape: EyebrowsShape.Down
         },
         eyes: {
            shape: EyesShape.Ellipse
         },
         glasses: {
            shape: GlassesShape.None
         },
         ear: {
            shape: EarShape.Attached
         },
         earrings: {
            shape: EarringsShape.Hoop
         },
         nose: {
            shape: NoseShape.Curve
         },
         mouth: {
            shape: MouthShape.Frown
         },
         beard: {
            shape: BeardShape.None
         },
         clothes: {
            shape: ClothesShape.Collared,
            fillColor: '#FFEDEF'
         }
      }
   },
   {
      wrapperShape: "squircle",
      background: {
         color: "linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)",
      },
      widgets: {
         face: {
            shape: FaceShape.Base
         },
         tops: {
            shape: TopsShape.Danny,
            fillColor: '#E0DDFF'
         },
         eyebrows: {
            shape: EyebrowsShape.Eyelashesup
         },
         eyes: {
            shape: EyesShape.Eyeshadow
         },
         glasses: {
            shape: GlassesShape.None
         },
         ear: {
            shape: EarShape.Attached
         },
         earrings: {
            shape: EarringsShape.Hoop
         },
         nose: {
            shape: NoseShape.Curve
         },
         mouth: {
            shape: MouthShape.Frown
         },
         beard: {
            shape: BeardShape.None
         },
         clothes: {
            shape: ClothesShape.Crew,
            fillColor: '#C09FFF'
         }
      }
   }
];

// 不兼容代理
export const NOT_COMPATIBLE_AGENTS = [
   'quark',
   'micromessenger',
   'weibo',
   'douban',
] as const;

// 点击下载的延时时间（ms）
export const DOWNLOAD_DELAY = 1000;