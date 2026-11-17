<script setup>
import { ref } from 'vue'
import { withBase } from 'vitepress'
import organizations from './organizations.json'

const panel = ref(null)

function closeFromBackdrop(event) {
  const { left, right, top, bottom } = panel.value.getBoundingClientRect()
  if (event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom) {
    panel.value.close()
  }
}
</script>

<template>
  <button class="organization-toggle" type="button" aria-haspopup="dialog"
    aria-controls="organization-panel" @click="panel.showModal()">
    <span aria-hidden="true">☰</span> 导航
  </button>
  <dialog id="organization-panel" ref="panel" class="organization-panel"
    aria-labelledby="organization-panel-title" @click.self="closeFromBackdrop">
    <header>
      <h2 id="organization-panel-title">网站导航</h2>
      <form method="dialog"><button type="submit" aria-label="关闭导航" autofocus>×</button></form>
    </header>
    <nav aria-label="网站导航" @click="$event.target.closest('a') && panel.close()">
      <a :href="withBase('/')">学院活动集合</a>
      <template v-for="group in organizations" :key="group.name">
        <details v-if="group.departments">
          <summary>{{ group.name }}</summary>
          <div v-for="department in group.departments" :key="department.href" class="department">
            <a :href="withBase(department.href)">{{ department.name }}</a>
            <details v-if="department.topics" class="activity-disclosure">
              <summary :aria-label="department.name + '活动主题'"></summary>
              <a v-for="topic in department.topics" :key="topic.href" :href="withBase(topic.href)">{{ topic.name }}</a>
            </details>
          </div>
        </details>
        <a v-else :href="withBase(group.href)">{{ group.name }}</a>
      </template>
    </nav>
  </dialog>
</template>

<style scoped>
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
.organization-panel {
  position: fixed;
  inset: 0 auto 0 0;
  width: min(320px, 90vw);
  height: 100%;
  max-height: none;
  margin: 0;
  padding: 24px;
  border-right: 1px solid var(--vp-c-divider);
  background: linear-gradient(145deg, #f7fbff, #e2efff);
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
.department { position: relative; margin-left: 12px; }
.department:has(.activity-disclosure) > a { margin-right: 44px; }
.activity-disclosure { padding-left: 16px; }
.activity-disclosure summary { position: absolute; right: 0; top: 0; width: 44px; height: 40px; display: grid; place-items: center; }
.activity-disclosure summary::before { content: '⌄'; font-size: 20px; line-height: 1; }
.activity-disclosure[open] summary::before { transform: rotate(180deg); }
</style>
