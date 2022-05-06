import { computed } from "vue"

import { useHistoryStore } from '@/stores/historyAvatar'
import type { AvatarOptions } from '@/types'

export default function useAvatarOptions() {
   const store = useHistoryStore()
   const avatarOptions = computed(() => store.history.present)
   
   const setAvatarOptions = (newOption: AvatarOptions) => {
      store.SET_AVATAR_OPTION(newOption);
   }

   return [avatarOptions, setAvatarOptions] as const
}