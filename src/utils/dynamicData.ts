import {
  BeardShape,
  ClothesShape,
  EarringsShape,
  EarShape,
  EyebrowsShape,
  EyesShape,
  FaceShape,
  GlassesShape,
  MouthShape,
  NoseShape,
  TopsShape,
  WidgetType,
} from '../enums'

// 定义导出图片组成的对象类型
type Data = Readonly<{
  [key in `${WidgetType}`]: {
    [key in string]: () => Promise<unknown>
  }
}>

// handle函数中的文件夹类型
type SupHandlerFolder = 'widgets' | 'preview'

// handle函数中widget的类型
type SuphandlerWidget =
  | 'face'
  | 'tops'
  | 'ear'
  | 'earrings'
  | 'eyebrows'
  | 'eyes'
  | 'nose'
  | 'glasses'
  | 'mouth'
  | 'beard'
  | 'clothes'
// 把传入的shape绑定对应的图片生成的函数返回

export function handleShape(
  shape: Record<string, string>,
  shapeName: SuphandlerWidget,
  FloderName: SupHandlerFolder = 'widgets'
) {
  const mapper = {}
  if (shapeName !== undefined) {
    for (const key in shape) {
      const element = shape[key]
      mapper[element] = () => import(`../assets/${FloderName}/${shapeName}/${element}.svg?raw`)
    }
  }
  return mapper
}

// widget对应导入图片的对象
const widgetData: Data = {
  [WidgetType.Face]: handleShape(FaceShape, 'face', 'widgets'),

  [WidgetType.Ear]: handleShape(EarShape, 'ear', 'widgets'),

  [WidgetType.Eyes]: handleShape(EyesShape, 'eyes', 'widgets'),

  [WidgetType.Beard]: handleShape(BeardShape, 'beard', 'widgets'),

  [WidgetType.Clothes]: handleShape(ClothesShape, 'clothes', 'widgets'),

  [WidgetType.Earrings]: handleShape(EarringsShape, 'earrings', 'widgets'),

  [WidgetType.Eyebrows]: handleShape(EyebrowsShape, 'eyebrows', 'widgets'),

  [WidgetType.Glasses]: handleShape(GlassesShape, 'glasses', 'widgets'),

  [WidgetType.Mouth]: handleShape(MouthShape, 'mouth', 'widgets'),

  [WidgetType.Nose]: handleShape(NoseShape, 'nose', 'widgets'),

  [WidgetType.Tops]: handleShape(TopsShape, 'tops', 'widgets'),
}

// 预览的图片对象
const previewData: Data = {
  [WidgetType.Face]: handleShape(FaceShape, 'face', 'preview'),

  [WidgetType.Ear]: handleShape(EarShape, 'ear', 'preview'),

  [WidgetType.Eyes]: handleShape(EyesShape, 'eyes', 'preview'),

  [WidgetType.Beard]: handleShape(BeardShape, 'beard', 'preview'),

  [WidgetType.Clothes]: handleShape(ClothesShape, 'clothes', 'preview'),

  [WidgetType.Earrings]: handleShape(EarringsShape, 'earrings', 'preview'),

  [WidgetType.Eyebrows]: handleShape(EyebrowsShape, 'eyebrows', 'preview'),

  [WidgetType.Glasses]: handleShape(GlassesShape, 'glasses', 'preview'),

  [WidgetType.Mouth]: handleShape(MouthShape, 'mouth', 'preview'),

  [WidgetType.Nose]: handleShape(NoseShape, 'nose', 'preview'),

  [WidgetType.Tops]: handleShape(TopsShape, 'tops', 'preview'),
}

export { previewData, widgetData }