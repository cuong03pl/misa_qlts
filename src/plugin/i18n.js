import { createI18n } from 'vue-i18n'
import viCommon from '@/locales/vi/common.json'
import viHeader from '@/locales/vi/header.json'
import viAsset from '@/locales/vi/asset.json'
import viSidebar from '@/locales/vi/sidebar.json'
const messages = {
  vi: {
    common: viCommon,
    header: viHeader,
    asset: viAsset,
    sidebar: viSidebar,
  },
}

export const i18n = createI18n({
  legacy: false,
  locale: 'vi',
  fallbackLocale: 'vi',
  messages,
})
