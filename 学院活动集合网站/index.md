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
  border: 1px solid #e6e9df;
  border-radius: 20px;
  background: linear-gradient(110deg, #f7f6ef, #eaf0e8);
  color: #292e29;
  padding: clamp(24px, 4vw, 48px);
}
.school { color: #555f51; font-size: 14px; }
.hero h1 { font-size: clamp(32px, 5vw, 54px); line-height: 1.15; font-weight: 700; margin: 10px 0; }
.directory { margin-top: 32px; }
.directory h2 { font-size: 24px; font-weight: 650; margin-bottom: 16px; }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 235px), 1fr)); gap: 14px; }
.org { display: block; padding: 21px; border: 1px solid var(--vp-c-divider); border-radius: 14px; background: var(--vp-c-bg); }
.org:hover, .org:focus-visible { background: var(--vp-c-bg-soft); border-color: var(--vp-c-text-2); }
.org h3 { font-size: 17px; font-weight: 650; }
.org p { margin-top: 6px; font-size: 14px; color: var(--vp-c-text-2); }
</style>

<div class="portal">
  <header class="hero">
    <p class="school">上海交通大学 · 张江理工国际学院</p>
    <h1>学院活动集合</h1>
    <p>学生组织活动、Workshop 回放与比赛记录</p>
  </header>
  <section class="directory" aria-labelledby="organizations">
    <h2 id="organizations">学生组织</h2>
    <div class="grid">
      <a v-for="org in organizations" :key="org.href" class="org" :href="withBase(org.href)">
        <h3>{{ org.name }}</h3>
        <p>{{ org.href === '/technology/' ? 'Workshop · 比赛' : '暂无活动记录' }}</p>
      </a>
    </div>
  </section>
</div>
