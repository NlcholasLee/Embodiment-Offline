// 国际化语言类型
export const enum Locale {
  ZH = 'zh',
  EN = 'en',
}

// 按钮类型
export const enum ActionType {
  Revoke = 'revoke',
  Redu = 'redu',
  Flip = 'flip',
}

// 性别类型
export enum Gender {
  Male = 'male',
  Female = 'female',
  NotSet = 'notSet',
}

// 画中的人物配置
export enum WidgetType {
  Face = 'face',
  Tops = 'tops',
  Ear = 'ear',
  Earrings = 'earrings',
  Eyebrows = 'eyebrows',
  Eyes = 'eyes',
  Nose = 'nose',
  Glasses = 'glasses',
  Mouth = 'mouth',
  Beard = 'beard',
  Clothes = 'clothes',
}

// 图片形状的类型
export enum WrapperShape {
  Circle = 'circle',
  Square = 'square',
  Squircle = 'squircle',
}


// WidgetShape All Attribute
export enum FaceShape {
  Base = 'base',
}

export enum TopsShape {
  Fonze = 'fonze',
  Funny = 'funny',
  Clean = 'clean',
  Punk = 'punk',
  Danny = 'danny',
  Wave = 'wave',
  Turban = 'turban',
  Pixie = 'pixie',
  Beanie = 'beanie',
}

export enum EarShape {
  Attached = 'attached',
  Detached = 'detached',
}

export enum EarringsShape {
  Hoop = 'hoop',
  Stud = 'stud',
  None = 'none',
}

export enum EyebrowsShape {
  Up = 'up',
  Down = 'down',
  Eyelashesup = 'eyelashesup',
  Eyelashesdown = 'eyelashesdown',
}

export enum EyesShape {
  Ellipse = 'ellipse',
  Smiling = 'smiling',
  Eyeshadow = 'eyeshadow',
  Round = 'round',
}

export enum NoseShape {
  Curve = 'curve',
  Round = 'round',
  Pointed = 'pointed',
}

export enum MouthShape {
  Frown = 'frown',
  Laughing = 'laughing',
  Nervous = 'nervous',
  Pucker = 'pucker',
  Sad = 'sad',
  Smile = 'smile',
  Smirk = 'smirk',
  Surprised = 'surprised',
}

export enum BeardShape {
  Scruff = 'scruff',
  None = 'none',
}

export enum GlassesShape {
  Round = 'round',
  Square = 'square',
  None = 'none',
}

export enum ClothesShape {
  Crew = 'crew',
  Collared = 'collared',
  Open = 'open',
}

export type WidgetShape =
  | FaceShape
  | TopsShape
  | EarShape
  | EarringsShape
  | EyebrowsShape
  | EyesShape
  | NoseShape
  | MouthShape
  | BeardShape
  | GlassesShape
  | ClothesShape;