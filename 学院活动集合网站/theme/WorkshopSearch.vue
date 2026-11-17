<script setup>
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import { workshops } from './workshops.js'

const props = defineProps({ inHeader: Boolean })
const query = ref('')
const terms = computed(() => query.value.trim().toLowerCase().split(/\s+/).filter(Boolean))
const results = computed(() => workshops.filter(workshop => {
  const text = (workshop.name + ' ' + workshop.description).toLowerCase()
  return terms.value.every(term => text.includes(term))
}))

function close() {
  if (props.inHeader) query.value = ''
}
</script>

<template>
  <section class="workshop-search" :class="{ 'header-search': inHeader }"
    aria-label="搜索 Workshop" @keydown.esc="close">
    <div class="search-input">
      <input v-model="query" type="search" aria-label="搜索 Workshop" placeholder="搜索 Workshop" />
    </div>
    <div v-if="terms.length" class="results-panel">
      <p class="search-count" aria-live="polite">{{ results.length ? '共找到 ' + results.length + ' 场 Workshop' : '没有找到匹配的 Workshop' }}</p>
      <ul v-if="results.length" class="search-results">
        <li v-for="workshop in results" :key="workshop.href">
          <a :href="withBase(workshop.href)" @click="close">{{ workshop.name }}</a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.workshop-search { margin: 18px 0 0; }
.header-search { position: relative; width: clamp(176px, 19vw, 280px); margin: 0 0 0 auto; }
.header-search .results-panel { position: absolute; inset: calc(100% + 8px) 0 auto; max-height: 60vh; overflow: auto; padding: 8px; border: 1px solid #a9c4e4; border-radius: 12px; background: #f5faff; box-shadow: 0 8px 24px #233e5a26; }
.header-search:not(:focus-within) .results-panel { display: none; }
.search-input { display: flex; gap: 8px; }
.search-input input { flex: 1; min-width: 0; padding: 9px 12px; border: 1px solid #a9c4e4; border-radius: 8px; background: #fff; }
.search-count { margin: 10px 0 0; color: var(--vp-c-text-2); font-size: 14px; }
.search-results a { display: block; padding: 6px 8px; border-radius: 6px; }
.search-results a:hover { background: #dcecff; }
</style>
