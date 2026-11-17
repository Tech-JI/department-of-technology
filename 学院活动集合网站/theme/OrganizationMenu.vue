<script setup>
import { ref } from 'vue'
import { useRoute, withBase } from 'vitepress'
import organizations from './organizations.json'

const panel = ref(null)
const route = useRoute()

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
      <h2 id="organization-panel-title">网站导航</h2>
      <form method="dialog"><button type="submit" aria-label="关闭导航" autofocus>×</button></form>
    </header>
    <nav aria-label="网站导航" @click="$event.target.closest('a') && panel.close()">
      <a :href="withBase('/')">学院活动集合</a>
      <template v-for="group in organizations" :key="group.name">
        <div v-if="group.departments" class="split-row">
          <a class="row-label group-name" :href="withBase(group.href)">{{ group.name }}</a>
          <details open class="disclosure">
            <summary :aria-label="group.name + '部门列表'"></summary>
            <div v-for="department in group.departments" :key="department.href" class="department">
              <a :class="{ 'row-label': department.topics?.length }" :href="withBase(department.href)">{{ department.name }}</a>
              <details v-if="department.topics?.length" class="disclosure activity-disclosure">
                <summary :aria-label="department.name + '活动主题'"></summary>
                <a v-for="topic in department.topics" :key="topic.href" :href="withBase(topic.href)">{{ topic.name }}</a>
              </details>
            </div>
          </details>
        </div>
        <a v-else :href="withBase(group.href)">{{ group.name }}</a>
      </template>
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
form button, nav a, summary { padding: 8px 10px; border-radius: 8px; }
form button { font-size: 26px; line-height: 1; }
summary { cursor: pointer; }
nav a { display: block; }
nav a:hover, form button:hover, summary:hover { background: #d8eaff; }
.split-row, .department { position: relative; }
.department { margin-left: 12px; }
nav .row-label { position: absolute; z-index: 1; top: 8px; left: 10px; padding: 0; }
nav .group-name { font-weight: 650; }
.disclosure > summary { display: flex; align-items: center; justify-content: flex-end; height: 40px; list-style: none; }
.disclosure > summary::-webkit-details-marker { display: none; }
.disclosure > summary::after { content: '⌄'; font-size: 20px; line-height: 1; }
.disclosure[open] > summary::after { transform: rotate(180deg); }
.activity-disclosure > a { margin-left: 16px; }

@media (prefers-reduced-motion: no-preference) {
  .organization-panel[open] { animation: panel-in 180ms ease-out; }
  .organization-panel::backdrop { animation: backdrop-in 180ms ease-out; }
  .disclosure[open] > :not(summary) { animation: disclosure-in 150ms ease-out; }
  nav a, summary, form button { transition: background-color 150ms ease; }
  .disclosure > summary::after { transition: transform 150ms ease; }
  @keyframes panel-in { from { transform: translateX(-100%); } }
  @keyframes backdrop-in { from { opacity: 0; } }
  @keyframes disclosure-in { from { opacity: 0; transform: translateY(-4px); } }
}
</style>
