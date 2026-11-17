import DefaultTheme from 'vitepress/theme-without-fonts'
import { h } from 'vue'
import { useRoute, withBase } from 'vitepress'
import OrganizationMenu from './OrganizationMenu.vue'
import WorkshopSearch from './WorkshopSearch.vue'
import WorkshopQuestions from './WorkshopQuestions.vue'
import { workshops } from './workshops.js'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: {
    setup() {
      const route = useRoute()
      return () => h(DefaultTheme.Layout, null, {
        'layout-top': () => h(OrganizationMenu),
        'nav-bar-content-after': () => h(WorkshopSearch, { inHeader: true }),
        'doc-after': () => {
          const path = route.path.replace(/\.html$/, '')
          const workshop = workshops.find(item => withBase(item.href) === path)
          return workshop ? h(WorkshopQuestions, { key: workshop.href, path: workshop.href }) : null
        }
      })
    }
  }
}
