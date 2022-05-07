<script setup lang="ts">
import { ref } from 'vue'
import ActionBarComp from '@/components/ActionBarComp.vue';
import AvatarPictureComp, { type AvatarPictureRef } from '@/components/AvatarPictureComp.vue';
import { useHistoryStore } from '@/stores/historyAvatar'
import { useAvatarOptions } from '@/hooks';
import { useI18n } from 'vue-i18n';
import { DOWNLOAD_DELAY, NOT_COMPATIBLE_AGENTS, TRIGGER_PROBABILTY } from '@/utils/constant';
import { getRandomAvatarOptions, getSpecialAvatarOptions, showConfetti } from '@/utils';
import { recordEvent } from '@/utils/ga';
import { ActionType } from '@/enums';
const historyStore = useHistoryStore()
const [avatarOptions, setAvatarOptions] = useAvatarOptions()
const { t } = useI18n()
const avatarPictureRef = ref<AvatarPictureRef>()

function handlerGenerate() {
  if (Math.random() <= TRIGGER_PROBABILTY) {
    let colorfulOption = getSpecialAvatarOptions()
    while (JSON.stringify(colorfulOption) === JSON.stringify(avatarOptions.value)) {
      colorfulOption = getSpecialAvatarOptions()
    }
    colorfulOption.wrapperShape = avatarOptions.value.wrapperShape
    setAvatarOptions(colorfulOption)
    showConfetti()
  } else {
    const randomOption = getRandomAvatarOptions(avatarOptions.value)
    setAvatarOptions(randomOption)
  }

  recordEvent('click_random', {
    event_category:'click'
  })
}

const downloadModalVisible = ref(false)
const downloading = ref(false)
const imageDataURL = ref('')

async function handlerDownload() {
  try {
    downloading.value = true
    const avatarEle = avatarPictureRef.value?.avatarRef

    const userAgent = window.navigator.userAgent.toLowerCase()
    const notCompatible = NOT_COMPATIBLE_AGENTS.some(
      (agent) => userAgent.indexOf(agent) !== -1
    )

    if (avatarEle) {
      const html2canvas = (await import('html2canvas')).default
      const canvas = await html2canvas(avatarEle, {
        backgroundColor: null,
      })
      const dataURL = canvas.toDataURL()
      console.log(dataURL, notCompatible)
      if (notCompatible) {
        imageDataURL.value = dataURL
        downloadModalVisible.value = true
      } else {
        const trigger = document.createElement('a')
        trigger.href = dataURL
        trigger.download = 'Embodiment.png'
        trigger.click()
      }
    }

    recordEvent('click_download', {
      event_category: 'click',
    })
  } finally {
    setTimeout(() => {
      downloading.value = false
    }, DOWNLOAD_DELAY)
  }
}

const flipped = ref(false)

function handlerAction(actionType: ActionType) {
  switch (actionType) {
    case ActionType.Revoke:
      historyStore.REVOKE()
      recordEvent('action_revoke', {
        event_category:'action',
        event_lavel: 'revoke'
      })
      break
    case ActionType.Redu:
      historyStore.REDU()
      recordEvent('action_redu', {
        event_category:'action',
        event_lavel: 'redu'
      })
      break
    case ActionType.Flip:
      flipped.value = !flipped.value
      recordEvent('action_flip_avatar', {
        event_category:'action',
        event_lavel: 'Flip Avatar',
      })
      break
  }
}
</script>

<template>
  <div class="home-main">
      <div class="avatar-wrapper">
        <AvatarPictureComp
          ref="avatarPictureRef"
          :options="avatarOptions"
          :size="280"
          :style="{
            transform: `rotateY(${flipped ? -180:0}deg)`,
          }"
        ></AvatarPictureComp>
      </div>
      <ActionBarComp @action="handlerAction"></ActionBarComp>

      <div class="action-group">
        <button class="action-random" @click="handlerGenerate">
          {{ t('action.random') }}
        </button>
        <button
          class="action-download"
          :disabled="downloading"
          @click="handlerDownload"
        >{{ downloading ? `${t('action.downloading')}···`: t('action.download') }}</button>
      </div>
  </div>
</template>

<style lang="scss" scoped>
@use 'src/styles/var';
@import 'src/styles/handle.scss';
.home-main{
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.7rem 0;
  .avatar-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width:var.$screen-sm){
      transform: scale(0.85);
    }
  }

  .action-group {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 4rem;

    .action-random,.action-download {
      min-width: 6rem;
      height: 2.5rem;
      margin: 0 1rem;
      padding: 0 1rem;
      @include font_color("font_color", null);
      font-weight: bold;
      @include basic_color("dark", 5);
      border-radius: 0.6rem;
      cursor: pointer;
      transition: color .3s;
      user-select: none;

      &:hover{
        @include font_color("font_color", 10);
      }

      &:disabled,&[disabled]{
        @include font_color("font_color", 0.5);
        cursor: default;
      }
    }
  }
}

</style>
