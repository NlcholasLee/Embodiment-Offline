import { WidgetType } from "@/enums"

export default {
   navigation: {
      home: "首页",
      about: "关于",
   },
   action: {
      flip: "水平翻转",
      revoke: "撤销",
      redu: "还原",
      random: "随机生成",
      downloading: "准备下载",
      download: "下载画像",
      close: "关闭"
   },
   label: {
      wrapperShape: "画像形状",
      backgroundColor: "背景颜色",
   },
   widgetType: {
      [WidgetType.Face]: "脸蛋",
      [WidgetType.Tops]: "头发/头饰",
      [WidgetType.Eyebrows]: "眉毛",
      [WidgetType.Eyes]: "眼睛",
      [WidgetType.Glasses]: "眼镜",
      [WidgetType.Ear]: "耳朵",
      [WidgetType.Earrings]: "耳饰",
      [WidgetType.Nose]: "鼻子",
      [WidgetType.Mouth]: "嘴巴",
      [WidgetType.Beard]: "胡子",
      [WidgetType.Clothes]: "衣着",
   },
   widgetPickColor: {
      [WidgetType.Tops]: "头发颜色",
      [WidgetType.Clothes]: "衣服颜色",
   },
   wrapperShape: {
      circle: "圆形",
      square: "方形",
      squirecle: "圆角方形"
   },
   text: {
      downloadTip: "长按图片或右键点击下载至本地相册"
   }
}