<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n';
import PerfectScrollbarComp from '@/components/PerfectScrollbarComp.vue'
import SectionWrapperComp from './SectionWrapperComp.vue';
import {
   type WidgetShape,
   type WrapperShape,
   BeardShape,
   WidgetType
} from '@/enums'
import { useAvatarOptions } from '@/hooks'
import { AVATAR_LAYER, SETTINGS } from '@/utils/constant';
import { previewData } from '@/utils/dynamicData';
type SectionType = Array<{
  widgetType: WidgetType
  widgetList: {
    widgetType: WidgetType
    widgetShape: WidgetShape
    svgRaw: string
  }[]
}>

const { t } = useI18n()
const [avatarOptions, setAvatarOptions] = useAvatarOptions()

const sectionList = reactive(Object.values(WidgetType))
const sections = ref<SectionType>([])

onMounted(() => {
  void (async () => {
    const a = await Promise.all(
      sectionList.map((section) => {
        return getWidgets(section)
      })
    )

    sections.value = sectionList.map((li, index) => {
      return {
        widgetType: li,
        widgetList: a[index],
      }
    }) as SectionType
  })()
})

async function getWidgets(widgetType: WidgetType) {
  const list = SETTINGS[`${widgetType}Shape`]
  const promises: Promise<string>[] = list.map(async (widget: string) => {
    if (widget !== 'none' && previewData?.[widgetType]?.[widget]) {
      return (await previewData[widgetType][widget]() as any).default
    }
    return 'X'
  })

  const svgRawList = await Promise.all(promises).then((raw) => {
    return raw.map((svgRaw, i) => {
      return {
        widgetType,
        widgetShape: list[i],
        svgRaw,
      }
    })
  })
  return svgRawList
}

function switchWrapperShape(wrapperShape: WrapperShape) {
  if (wrapperShape !== avatarOptions.value.wrapperShape) {
    setAvatarOptions({ ...avatarOptions.value, wrapperShape })
  }
}

function switchBgColor(bgColor: string) {
  if (bgColor !== avatarOptions.value.background.color) {
    setAvatarOptions({
      ...avatarOptions.value,
      background: { ...avatarOptions.value.background, color: bgColor },
    })
  }
}

function switchWidget(widgetType: WidgetType, widgetShape: WidgetShape) {
  if (widgetShape && avatarOptions.value.widgets?.[widgetType]) {
    setAvatarOptions({
      ...avatarOptions.value,
      widgets: {
        ...avatarOptions.value.widgets,
        [widgetType]: {
          ...avatarOptions.value.widgets?.[widgetType],
          shape: widgetShape,
          ...(widgetShape === BeardShape.Scruff
            ? { zIndex: AVATAR_LAYER['mouth'].zIndex - 1 }
            : undefined),
        },
      },
    })
  }
}

function setWidgetColor(widgetType: WidgetType, fillColor: string) {
  if (avatarOptions.value.widgets?.[widgetType]) {
    setAvatarOptions({
      ...avatarOptions.value,
      widgets: {
        ...avatarOptions.value.widgets,
        [widgetType]: {
          ...avatarOptions.value.widgets?.[widgetType],
          fillColor,
        },
      },
    })
  }
}
</script>

<template>
  <PerfectScrollbarComp class="configurator-scroll">
    <div class="configurator">
      <SectionWrapperComp :title="t('label.wrapperShape')">
        <ul class="wrapper-shape">
          <li
            v-for="wrapperShape in SETTINGS.wrapperShape"
            :key="wrapperShape"
            class="wrapper-shape__item"
            :title="t(`wrapperShape.${wrapperShape}`)"
            @click="switchWrapperShape(wrapperShape)"
          >
            <i
              class="shape"
              :class="[
                wrapperShape,
                { active: wrapperShape === avatarOptions.wrapperShape },
              ]"
            ></i>
          </li>
        </ul>
      </SectionWrapperComp>

      <SectionWrapperComp :title="t('label.backgroundColor')">
        <ul class="color-list">
          <li
            v-for="bgColor in SETTINGS.backgroundColor"
            :key="bgColor"
            class="color-list__item"
            @click="switchBgColor(bgColor)"
          >
            <div
              :style="{ background: bgColor }"
              class="bg-color"
              :class="{
                active: bgColor === avatarOptions.background.color,
                transparent: bgColor === 'transparent',
              }"
            ></div>
          </li>
        </ul>
      </SectionWrapperComp>

      <SectionWrapperComp
        v-for="s in sections"
        :key="s.widgetType"
        :title="t(`widgetType.${s.widgetType}`)"
      >
        <ul class="widget-list">
          <li
            v-for="it in s.widgetList"
            :key="it.widgetShape"
            class="list-item"
            :class="{
              selected:
                it.widgetShape === avatarOptions.widgets?.[s.widgetType]?.shape,
            }"
            @click="switchWidget(s.widgetType, it.widgetShape)"
            v-html="it.svgRaw"
          ></li>
        </ul>

        <details
          v-if="
            s.widgetType === WidgetType.Tops ||
            s.widgetType === WidgetType.Clothes
          "
          class="color-picker"
        >
          <summary class="color">{{ t(`widgetPickColor.${s.widgetType}`) }}</summary>
          <ul class="color-list">
            <li
              v-for="fillColor in SETTINGS.commonColors"
              :key="fillColor"
              class="color-list__item"
              @click="setWidgetColor(s.widgetType, fillColor)"
            >
              <div :style="{ background: fillColor }" class="bg-color" ></div>
            </li>
          </ul>
        </details>
      </SectionWrapperComp>
    </div>
  </PerfectScrollbarComp>
</template>

<style lang="scss" scoped>
@use 'src/styles/var';
@import 'src/styles/handle.scss';
.configurator-scroll {
  width: var.$layout-sider-width;
  height: 100%;
  @include configurator_color("configurator_color", null);
}

.configurator {
  width: 100%;
  @include font_color("font_color", null);

  .wrapper-shape {
    display: flex;
    align-items: center;

    .wrapper-shape__item {
      padding: 0.4rem 0.5rem;
      cursor: pointer;

      .shape {
        display: inline-block;
        width: 1.5rem;
        height: 1.5rem;
        @include basic_color("text", null);
        transition: background-color 0.2s;

        &.circle {
          border-radius: 50%;
        }

        &.squircle {
          border-radius: 20%;
        }

        &.active {
          @include basic_color("accent", null);
        }
      }
    }
  }

  .color-picker {
    margin-top: 1rem;

    summary {
      @include font_color("font_color", 20);
      font-size: small;
      cursor: pointer;
      user-select: none;
    }
  }

  .color-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .color-list__item {
      position: relative;
      z-index: 1;
      width: calc(100% / 7);
      padding: 0.6rem 0;
      cursor: pointer;
      transition: transform 0.2s;

      .bg-color {
        position: relative;
        box-sizing: content-box;
        width: 1.3em;
        height: 1.3em;
        margin: 0 auto;
        font-size: 16px;
        border-radius: 50%;
        @include shadow_configurator_color("configurator_color");
        &.transparent {
          background: #fff !important;

          &::after {
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 1;
            color: #ff4757;
            font-weight: bold;
            font-size: 1.8rem;
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 1;
            content: '\\';
          }
        }

        &::before {
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: -1;
          width: 100%;
          height: 100%;
          background: inherit;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          opacity: 0.5;
          transition: width 0.15s, height 0.15s;
          content: '';
        }

        &::after {
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 1;
          @include font_color("icon_color", null);
          font-size: 1.5rem;
          transform: translate(-50%, -50%) scale(0.5);
          opacity: 0;
          transition: opacity 0.15s;
          content: '\2714';
        }

        &.active::before {
          width: 160%;
          height: 160%;
        }

        &.active::after {
          opacity: 1;
        }
      }
    }
  }

  .widget-list {
    display: flex;
    flex-wrap: wrap;

    .list-item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: calc(100% / 4);
      height: 5rem;
      padding: 1rem;
      border-radius: 0.8rem;
      cursor: pointer;
      transition: background-color 0.2s;

      &.selected.selected {
        @include configurator_color("configurator_color", 6);
      }

      &:hover {
        @include darken_configurator_color("configurator_color", 3) 
      }

      & > :deep(svg) {
        width: 100% !important;
        height: 100% !important;
      }

      & :deep(path) {
        stroke: #eee !important;
      }
    }
  }
}
</style>
