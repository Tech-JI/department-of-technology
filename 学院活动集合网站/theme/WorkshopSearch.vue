<script setup>
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import { workshops } from './workshops.js'

const props = defineProps({ inHeader: Boolean })
const dialog = ref(null)
const query = ref('')
const terms = computed(() => query.value.trim().toLowerCase().split(/\s+/).filter(Boolean))
const results = computed(() => workshops.filter(workshop => {
  const text = (workshop.name + ' ' + workshop.description).toLowerCase()
  return terms.value.every(term => text.includes(term))
}))

function close() {
  if (props.inHeader) dialog.value.close()
}
</script>

<template>
  <button v-if="inHeader" class="search-toggle" type="button" aria-haspopup="dialog"
    aria-label="搜索 Workshop" @click="dialog.showModal()">搜索</button>
  <component :is="inHeader ? 'dialog' : 'section'" ref="dialog" class="workshop-search"
    aria-label="搜索 Workshop" @click.self="close">
    <div class="search-input">
      <input v-model="query" type="search" aria-label="搜索 Workshop" placeholder="搜索 Workshop，例如 Git、WSL 或 Vim" />
      <button v-if="inHeader" type="button" aria-label="关闭搜索" @click="close">×</button>
    </div>
    <template v-if="terms.length">
      <p class="search-count" aria-live="polite">{{ results.length ? '共找到 ' + results.length + ' 场 Workshop' : '没有找到匹配的 Workshop' }}</p>
      <ul v-if="results.length" class="search-results">
        <li v-for="workshop in results" :key="workshop.href">
          <a :href="withBase(workshop.href)" @click="close">{{ workshop.name }}</a>
        </li>
      </ul>
    </template>
  </component>
</template>

<style scoped>
.search-toggle, .search-input button { padding: 6px 10px; border: 1px solid #a9c4e4; border-radius: 8px; background: #f5faff; }
.search-toggle { white-space: nowrap; }
.workshop-search { margin: 18px 0 0; }
dialog.workshop-search { position: fixed; inset: 12vh 0 auto; margin: 0 auto; width: min(540px, calc(100% - 32px)); max-height: 70vh; overflow: auto; padding: 20px; border: 1px solid #a9c4e4; border-radius: 14px; background: #f2f7ff; color: var(--vp-c-text-1); pointer-events: auto; }
dialog::backdrop { background: rgb(24 45 73 / 32%); }
.search-input { display: flex; gap: 8px; }
.search-input input { flex: 1; min-width: 0; padding: 8px 12px; border: 1px solid #a9c4e4; border-radius: 8px; background: #fff; }
.search-count { margin: 10px 0 0; color: var(--vp-c-text-2); font-size: 14px; }
.search-results a { display: block; padding: 6px 8px; border-radius: 6px; }
.search-results a:hover { background: #dcecff; }
</style>
