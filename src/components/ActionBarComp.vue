<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n';
import IconBack from '@/assets/icons/icon-back.svg'
import IconFlip from '@/assets/icons/icon-flip.svg'
import IconNext from '@/assets/icons/icon-next.svg'
import { ActionType } from '@/enums';
import { useHistoryStore } from '@/stores/historyAvatar'

const emit = defineEmits<{
   (e: 'action', actionType: ActionType): void
}>()

const { t } = useI18n()

const historyStore = useHistoryStore()

const canRevoke = computed(() => historyStore.history.past.length > 0)
const canRedu = computed(() => historyStore.history.future.length > 0)

const actions = computed(() => [
   {
      type: ActionType.Revoke,
      icon: IconBack,
      tip: t('action.revoke'),
      disabled: !canRevoke.value
   },
   {
      type: ActionType.Redu,
      icon: IconNext,
      tip: t('action.redu'),
      disabled: !canRedu.value
   },
   {
      type: ActionType.Flip,
      icon: IconFlip,
      tip: t('action.flip'),
   },
])
</script>
<template>
   <menu class="action-menu">
      <div
         v-for="action in actions"
         :key="action.type"
         class="menu-item"
         :class="{ disabled: action.disabled }"
         :title="action.tip"
         @click="emit('action', action.type)"
      >
         <img :src="action.icon" :alt="action.tip" />
      </div>
   </menu>
</template>
<style lang="scss" scoped>
@use 'src/styles/var';
@import 'src/styles/handle.scss';

.action-menu {
   display: flex;
   align-items: center;
   margin-top: 5rem;
   padding: 0.5rem;
   @include basic_color("dark", 5);
   border-radius: 2rem;

   .menu-item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 2.5rem;
      height: 2.5rem;
      margin: 0 0.5rem;
      @include basic_color("dark", 13);
      border-radius: 50%;
      cursor: pointer;
      transition: opacity .3s;

      &.disabled {
         cursor: pointer;
         opacity: 0.6;
      }
   }
}
</style>