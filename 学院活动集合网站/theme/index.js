import DefaultTheme from 'vitepress/theme-without-fonts'
import { h } from 'vue'
import OrganizationMenu from './OrganizationMenu.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {
    'layout-top': () => h(OrganizationMenu)
  })
}
