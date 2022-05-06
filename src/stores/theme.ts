import { defineStore } from "pinia";

interface ThemeType {
   themeType: ThemeColorType
}

export type ThemeColorType = "dark"|"light"

export const useTheme = defineStore({
   id: 'theme',
   state: ():ThemeType => ({
      themeType: "dark"
   })
})