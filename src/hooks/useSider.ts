import { computed } from 'vue'
import { useHistoryStore } from '@/stores/historyAvatar'

export default function useSider() {
   const store = useHistoryStore()
   const isCollapsed = computed(() => store.isSiderCollapsed)

   const openSider = () => {
      store.SET_SIDER_STATUS(false)
   }

   const closeSider = () => {
      store.SET_SIDER_STATUS(true)
   }

   return { isCollapsed, openSider, closeSider }
}