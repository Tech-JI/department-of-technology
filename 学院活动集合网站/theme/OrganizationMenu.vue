<script setup>
import { ref } from 'vue'
import { withBase } from 'vitepress'
import organizations from './organizations.json'

const panel = ref(null)
</script>

<template>
  <button class="organization-toggle" type="button" aria-haspopup="dialog"
    aria-controls="organization-panel" @click="panel.showModal()">
    <span aria-hidden="true">☰</span> 导航
  </button>
  <dialog id="organization-panel" ref="panel" class="organization-panel"
    aria-labelledby="organization-panel-title">
    <header>
      <h2 id="organization-panel-title">网站导航</h2>
      <form method="dialog"><button type="submit" autofocus>关闭</button></form>
    </header>
    <nav aria-label="网站导航" @click="panel.close()">
      <a :href="withBase('/')">学院活动集合</a>
      <template v-for="org in organizations" :key="org.href">
        <a :href="withBase(org.href)">{{ org.name }}</a>
        <div v-if="org.href === '/technology/'" class="topics">
          <a :href="withBase('/technology/workshops.html')">Workshop</a>
          <a :href="withBase('/technology/competitions.html')">比赛</a>
        </div>
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
  background: var(--vp-c-bg);
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
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  overflow-y: auto;
}
.organization-panel::backdrop { background: rgb(25 30 26 / 32%); }
header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
h2 { font-weight: 700; }
form button, nav a { padding: 8px 10px; border-radius: 8px; }
nav a { display: block; }
nav a:hover, form button:hover { background: var(--vp-c-bg-soft); }
.topics { padding-left: 16px; }
</style>
