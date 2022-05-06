import { WidgetType } from "@/enums"

export default {
   navigation: {
      home: "Home",
      about: "About",
   },
   action: {
      flip: "flip",
      revoke: "revoke",
      redu: "reduction",
      random: "Radom",
      downloading: "DownLoading",
      download: "DownLoad",
      close: "Close"
   },
   label: {
      wrapperShape: "Wrapper Shape",
      backgroundColor: "Background Color",
   },
   widgetType: {
      [WidgetType.Face]: "Face",
      [WidgetType.Tops]: "Hair / Headwear",
      [WidgetType.Eyebrows]: "Eyebrows",
      [WidgetType.Eyes]: "Eyes",
      [WidgetType.Glasses]: "Glasses",
      [WidgetType.Ear]: "Ear",
      [WidgetType.Earrings]: "Earrings",
      [WidgetType.Nose]: "Nose",
      [WidgetType.Mouth]: "Mouth",
      [WidgetType.Beard]: "Beard",
      [WidgetType.Clothes]: "Clothes",
   },
   widgetPickColor: {
      [WidgetType.Tops]: "Hair Color",
      [WidgetType.Clothes]: "Clothes Color",
   },
   wrapperShape: {
      circle: "Circle",
      square: "Square",
      squircle: "Squircle"
   },
   text: {
      downloadTip: "Long press the picture or right-click to download to the local album."
   }
}