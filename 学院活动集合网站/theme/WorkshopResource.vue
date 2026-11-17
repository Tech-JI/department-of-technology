<script setup>
import { ref } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps({
  href: { type: String, required: true },
  label: { type: String, required: true },
  download: Boolean,
  preview: Boolean,
  note: String
})
const feedback = ref('')

async function copyLink() {
  try {
    const url = new URL(withBase(props.href), window.location.href)
    await navigator.clipboard.writeText(url.href)
    feedback.value = '已复制'
  } catch {
    feedback.value = '复制失败'
  }
}
</script>

<template>
  <div class="resource glass-link">
    <a class="resource-main no-icon" :href="withBase(href)" :download="download || undefined"
      :target="download ? undefined : '_blank'" :rel="download ? undefined : 'noopener noreferrer'">
      <strong>{{ label }} <span aria-hidden="true">{{ download ? '↓' : '↗' }}</span></strong>
      <small v-if="note">{{ note }}</small>
    </a>
    <a v-if="preview" class="resource-action" :href="withBase(href)" target="_blank" rel="noopener noreferrer"
      :aria-label="'预览 PDF：' + label">PDF 预览</a>
    <button v-if="!preview" class="resource-action" type="button" :aria-label="'复制链接：' + label" @click="copyLink">
      <span aria-live="polite">{{ feedback || '复制链接' }}</span>
    </button>
  </div>
</template>

<style scoped>
.resource { position: relative; display: flex; align-items: center; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
.resource-main { flex: 1 1 150px; }
.resource-main::after { content: ''; position: absolute; inset: 0; border-radius: inherit; }
.resource-main small { display: block; color: var(--vp-c-text-2); }
.vp-doc .resource a { text-decoration: none; }
.resource-action { position: relative; border: 1px solid #a9c4e4; border-radius: 8px; padding: 4px 9px; font-size: 13px; background: #f5faff; }
.resource-action:hover, .resource-action:focus-visible { background: #dcecff; }
.resource:focus-within { outline: 2px solid #486f9c; outline-offset: 3px; }
</style>
