<script setup>
import { ref } from 'vue'

const props = defineProps({ path: { type: String, required: true } })
const host = ref(null)
const started = ref(false)
const failed = ref(false)
const term = 'TechGC Workshop ' + props.path
const discussionUrl = 'https://github.com/Tech-JI/GCSurvivalHandbook/discussions?discussions_q=' +
  encodeURIComponent('in:title "' + term + '"')

function loadQuestions() {
  if (started.value) return
  started.value = true
  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.async = true
  script.crossOrigin = 'anonymous'
  Object.assign(script.dataset, {
    repo: 'Tech-JI/GCSurvivalHandbook',
    repoId: 'R_kgDOPdGPTg',
    category: 'Q&A',
    categoryId: 'DIC_kwDOPdGPTs4DCTrp',
    mapping: 'specific',
    term,
    strict: '1',
    reactionsEnabled: '1',
    inputPosition: 'top',
    theme: 'light',
    lang: 'zh-CN'
  })
  script.onerror = () => { failed.value = true }
  host.value.append(script)
}
</script>

<template>
  <section class="workshop-questions vp-doc" aria-labelledby="workshop-questions">
    <h2 id="workshop-questions">Workshop 问答</h2>
    <p>可以在这里提问、分享解决办法或回复同学。发言需要登录 GitHub。</p>
    <button v-if="!started" class="glass-link" type="button" @click="loadQuestions">打开问答区</button>
    <p v-if="failed" role="status">问答组件暂时无法加载。</p>
    <div ref="host" class="giscus"></div>
    <a :href="discussionUrl" target="_blank" rel="noopener noreferrer">在 GitHub 查看讨论 ↗</a>
  </section>
</template>

<style scoped>
.workshop-questions { margin-top: 32px; }
.workshop-questions button { padding: 8px 16px; margin-bottom: 12px; }
</style>
