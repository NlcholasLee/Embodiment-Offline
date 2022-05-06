import { WrapperShape } from '@/enums'
import { AvatarOptions } from '@/types'
import { getRandomAvatarOptions } from '@/utils'
import { SCREEN } from '@/utils/constant'
import { defineStore } from 'pinia'
import { 
  SET_AVATAR_OPTION,
  REVOKE,
  REDU,
  SET_SIDER_STATUS 
} from './actionTypes'

export interface State {
  history: {
    past: AvatarOptions[]
    present: AvatarOptions
    future: AvatarOptions[]
  }
  isSiderCollapsed: boolean
}

// 头像历史记录的存取
export const useHistoryStore = defineStore({
  id: 'historyAvatar',
  state: ():State => ({
    history: {
      past: [],
      present: getRandomAvatarOptions({ wrapperShape: WrapperShape.Square }),
      future: [],
    },
    isSiderCollapsed: window.innerWidth <= SCREEN.lg,
  }),
  actions: {
    [SET_AVATAR_OPTION](data: AvatarOptions){
      this.history = {
        past: [...this.history.past, this.history.present],
        present: data,
        future: [],
      }
    },
    [REVOKE](){
      if (this.history.past.length > 0) {
        const previous = this.history.past[this.history.past.length - 1]
        const updatedPast = this.history.past.slice(0, this.history.past.length - 1)
      
        this.history = {
          past: updatedPast,
          present: previous,
          future: [this.history.present, ...this.history.future],
        }
      }
    },
    [REDU](){
      if (this.history.future.length > 0) {
        const next = this.history.future[0]
        const updatedFuture = this.history.future.slice(1)
        this.history = {
          past: [...this.history.past, this.history.present],
          present: next,
          future: updatedFuture,
        }
      }
    },
    [SET_SIDER_STATUS](collapsed: boolean) {
      if (collapsed !== this.isSiderCollapsed) {
        this.isSiderCollapsed = collapsed
      }
    },
  },
})

