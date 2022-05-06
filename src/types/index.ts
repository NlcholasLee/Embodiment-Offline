import type { NONE } from "../utils/constant";

export type None = typeof NONE;

import type {
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
} from "../enums"

// 人像的每个part的类型
interface Widget<Shape> {
   shape: Shape | None
   zIndex?: number
   fillColor?: string
   strokeColor?: string
}

// 人像的类型
type AvatarWidgets = {
   face: Widget<FaceShape>,
   tops: Widget<TopsShape>,
   eyebrows: Widget<EyebrowsShape>,
   eyes: Widget<EyesShape>,
   glasses: Widget<GlassesShape>,
   ear: Widget<EarShape>,
   earrings: Widget<EarringsShape>,
   nose: Widget<NoseShape>,
   mouth: Widget<MouthShape>,
   beard: Widget<BeardShape>,
   clothes: Widget<ClothesShape>
}

// 人物+背景的选项
export interface AvatarOptions {
   gender?: Gender
   wrapperShape?: `${WrapperShape}`
   background: {
      color: string
   }
   widgets: Partial<AvatarWidgets>
}

// 要导出的图片（画像）的所有设置
export interface AvatarSettings {
   gender: [Gender, Gender]
   wrapperShape: Array<WrapperShape>
   faceShape: Array<FaceShape>
   topsShape: Array<TopsShape>
   eyebrowsShape: Array<EyebrowsShape>
   eyesShape: Array<EyesShape>
   glassesShape: Array<GlassesShape>
   earShape: Array<EarShape>
   earringsShape: Array<EarringsShape>
   noseShape: Array<NoseShape>
   mouthShape: Array<MouthShape>
   beardShape: Array<BeardShape>
   clothesShape: Array<ClothesShape>
   commonColors: Array<string>
   backgroundColor: Array<string>
   skinColor: Array<string>
}