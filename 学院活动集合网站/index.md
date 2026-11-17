---
layout: page
title: 学院活动集合
---

<script setup>
import { withBase } from 'vitepress'
import organizations from './theme/organizations.json'
</script>

<style scoped>
.portal { width: min(1120px, calc(100% - 40px)); margin: 24px auto 64px; }
.hero {
  border: 1px solid #c5daf2;
  border-radius: 20px;
  background: radial-gradient(ellipse at 12% 0%, #fff6d8, transparent 52%),
    linear-gradient(120deg, #c9eee4, #d8e6ff 58%, #dbeef5);
  color: #24384e;
  padding: clamp(24px, 4vw, 48px);
}
.school { color: #4a627c; font-size: 14px; }
.hero h1 { font-size: clamp(32px, 5vw, 54px); line-height: 1.15; font-weight: 700; margin: 10px 0; }
.directory { margin-top: 32px; }
.directory h2 { font-size: 24px; font-weight: 650; margin-bottom: 12px; }
.group { margin-top: 24px; }
.group h3 { margin: 0; }
.group-link { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.group-link strong { font-size: 19px; font-weight: 650; }
.group-link .label { display: block; margin-top: 4px; font-size: 14px; font-weight: 400; color: var(--vp-c-text-2); }
.group-link .arrow { flex: none; display: grid; place-items: center; width: 36px; height: 36px; border-radius: 50%; background: #dcecff; }
.group .grid { margin-top: 12px; }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 235px), 1fr)); gap: 14px; }
.org strong { font-size: 17px; font-weight: 650; }
.org p { margin-top: 6px; font-size: 14px; color: var(--vp-c-text-2); }
.org { position: relative; }
.org-home::after { content: ''; position: absolute; inset: 0; border-radius: inherit; }
.org:focus-within { outline: 2px solid #486f9c; outline-offset: 3px; }
.activity-links { position: relative; display: flex; flex-wrap: wrap; gap: 4px 14px; width: fit-content; margin-top: 6px; font-size: 14px; }
.activity-links a { padding: 4px 0; text-decoration: underline; text-underline-offset: 4px; }
.activity-links a:hover, .activity-links a:focus-visible {
  color: #234765;
  background: #d0e5fa;
  border-radius: 4px;
  box-shadow: 0 0 0 4px #d0e5fa;
}

@media (prefers-reduced-motion: no-preference) {
  .hero > *, .directory > h2, .group > h3, .org {
    animation: arrive 440ms cubic-bezier(.2, .7, .25, 1) backwards;
    animation-delay: var(--arrival-delay, 0ms);
  }
  .hero > :nth-child(2) { --arrival-delay: 65ms; }
  .hero > :nth-child(3) { --arrival-delay: 125ms; }
  .directory > h2 { --arrival-delay: 165ms; }
  .group > h3 { --arrival-delay: 210ms; }
  .org { --arrival-delay: 250ms; }
  .org:nth-child(3n + 2) { --arrival-delay: 290ms; }
  .org:nth-child(3n) { --arrival-delay: 330ms; }
  .group > h3:focus-within, .org:focus-within { animation: none; }

  @keyframes arrive {
    from { opacity: 0; translate: 0 12px; }
    to { opacity: 1; translate: 0 0; }
  }
}
</style>

<div class="portal">
  <header class="hero">
    <p class="school">上海交通大学 · 张江理工国际学院</p>
    <h1>学院活动集合</h1>
    <p>学生组织活动、Workshop 回放与比赛记录</p>
  </header>
  <section class="directory" aria-labelledby="organizations">
    <h2 id="organizations">学生组织</h2>
    <section class="group" v-for="group in organizations" :key="group.name">
      <h3>
        <a class="group-link glass-link" :href="withBase(group.href)">
          <span><strong>{{ group.name }}</strong><span class="label">{{ group.label }}</span></span>
          <span class="arrow" aria-hidden="true">→</span>
        </a>
      </h3>
      <div v-if="group.topics?.length" class="activity-links">
        <a v-for="topic in group.topics.slice(0, 2)" :key="topic.href" :href="withBase(topic.href)">{{ topic.name }}</a>
      </div>
      <div v-if="group.departments" class="grid">
        <div v-for="department in group.departments" :key="department.href" class="org glass-link">
          <a class="org-home" :href="withBase(department.href)"><strong>{{ department.name }}</strong></a>
          <div v-if="department.topics?.length" class="activity-links">
            <a v-for="topic in department.topics.slice(0, 2)" :key="topic.href" :href="withBase(topic.href)">{{ topic.name }}</a>
          </div>
          <p v-else>暂无活动记录</p>
        </div>
      </div>
    </section>
  </section>
</div>
