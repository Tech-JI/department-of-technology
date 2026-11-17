<script setup>
import { ref } from 'vue'
import { useData, useRoute, withBase } from 'vitepress'

const panel = ref(null)
const route = useRoute()
const { theme } = useData()

function goBack() {
  if (window.history.length > 1) window.history.back()
  else window.location.assign(withBase('/'))
}

function closeFromBackdrop(event) {
  const { left, right, top, bottom } = panel.value.getBoundingClientRect()
  if (event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom) {
    panel.value.close()
  }
}
</script>

<template>
  <button class="organization-toggle" type="button" aria-label="导航" aria-haspopup="dialog"
    aria-controls="organization-panel" @click="panel.showModal()">
    <span aria-hidden="true">☰</span><span class="navigation-label"> 导航</span>
  </button>
  <button v-if="route.path !== withBase('/') && route.path !== withBase('/index.html')"
    class="history-back" type="button" aria-label="返回上一页" title="返回上一页" @click="goBack">←</button>
  <dialog id="organization-panel" ref="panel" class="organization-panel"
    aria-labelledby="organization-panel-title" @click.self="closeFromBackdrop">
    <header>
      <h2 id="organization-panel-title">技术部</h2>
      <form method="dialog"><button type="submit" aria-label="关闭导航" autofocus>×</button></form>
    </header>
    <nav aria-label="网站导航" @click="$event.target.closest('a') && panel.close()">
      <a v-for="item in theme.nav" :key="item.link" :href="withBase(item.link)">{{ item.text }}</a>
      <a :href="withBase('/technology/announcements')">技术部公告</a>
    </nav>
  </dialog>
</template>

<style scoped>
.history-back {
  position: fixed;
  z-index: 45;
  left: 88px;
  top: 14px;
  width: 36px;
  height: 36px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: #f1f7ff;
  font-size: 20px;
}
.history-back:hover { background: #d8eaff; }
.organization-toggle {
  position: fixed;
  z-index: 45;
  top: 14px;
  left: 16px;
  padding: 5px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  font-size: 14px;
  background: #f1f7ff;
}
@media (max-width: 1488px) {
  .organization-toggle:has(+ .history-back) {
    width: 36px;
    height: 36px;
    padding: 0;
  }
  .organization-toggle:has(+ .history-back) .navigation-label { display: none; }
  .history-back { left: 58px; }
}
.organization-panel {
  position: fixed;
  inset: 0 auto 0 0;
  width: min(320px, 90vw);
  height: 100%;
  max-height: none;
  margin: 0;
  padding: 24px;
  border-right: 1px solid var(--vp-c-divider);
  background: linear-gradient(155deg, #f7fbff, #e5f3ee);
  color: var(--vp-c-text-1);
  overflow-y: auto;
}
.organization-panel::backdrop { background: rgb(24 45 73 / 32%); }
header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
h2 { font-weight: 700; }
form button, nav a { padding: 8px 10px; border-radius: 8px; }
form button { font-size: 26px; line-height: 1; }
nav a { display: block; }
nav a:hover, form button:hover { background: #d8eaff; }

@media (prefers-reduced-motion: no-preference) {
  .organization-panel[open] { animation: panel-in 180ms ease-out; }
  .organization-panel::backdrop { animation: backdrop-in 180ms ease-out; }
  nav a, form button { transition: background-color 150ms ease; }
  @keyframes panel-in { from { transform: translateX(-100%); } }
  @keyframes backdrop-in { from { opacity: 0; } }
}
</style>
