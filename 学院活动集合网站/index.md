---
layout: page
title: 技术部
---

<script setup>
import { withBase } from 'vitepress'
import { workshops } from './theme/workshops.js'
</script>

<style scoped>
.portal { width: min(1080px, calc(100% - 40px)); margin: 24px auto 64px; }
.hero {
  border: 1px solid #c5daf2;
  border-radius: 20px;
  background: radial-gradient(ellipse at 12% 0%, #fff6d8, transparent 52%),
    linear-gradient(120deg, #c9eee4, #d8e6ff 58%, #dbeef5);
  color: #24384e;
  padding: clamp(24px, 4vw, 48px);
}
.school { color: #4a627c; font-size: 14px; }
.hero h1 { font-size: clamp(36px, 6vw, 58px); line-height: 1.15; font-weight: 700; margin: 10px 0; }
.section { margin-top: 32px; }
.section h2 { font-size: 24px; font-weight: 650; margin-bottom: 14px; }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 230px), 1fr)); gap: 14px; }
.grid strong { display: block; font-size: 17px; font-weight: 650; }
.grid p { margin-top: 6px; font-size: 14px; color: var(--vp-c-text-2); }
.entry { display: flex; justify-content: space-between; gap: 12px; align-items: center; }
.entry .arrow { flex: none; display: grid; place-items: center; width: 36px; height: 36px; border-radius: 50%; background: #dcecff; }
.workshop-list { display: grid; gap: 14px; }
.workshop-row { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 2fr) auto; align-items: center; gap: 20px; }
.workshop-row strong { font-size: 17px; }
.workshop-row p { color: var(--vp-c-text-2); line-height: 1.65; }
@media (max-width: 600px) {
  .workshop-row { grid-template-columns: minmax(0, 1fr) auto; gap: 6px 12px; }
  .workshop-row p { grid-row: 2; grid-column: 1 / -1; }
}

@media (prefers-reduced-motion: no-preference) {
  .hero > *, .section h2, .grid > a, .workshop-row {
    animation: page-arrive 300ms ease-out backwards;
  }
  .hero > :nth-child(2) { animation-delay: 40ms; }
  .hero > :nth-child(3) { animation-delay: 75ms; }
  .section h2 { animation-delay: 100ms; }
  .grid > a, .workshop-row { animation-delay: 130ms; }
  .grid > a:nth-child(even), .workshop-row:nth-child(even) { animation-delay: 165ms; }
  .grid > a:focus-visible, .workshop-row:focus-visible { animation: none; }
}
</style>

<div class="portal">
  <header class="hero">
    <p class="school">上海交通大学 · 张江理工国际学院学生会</p>
    <h1>技术部</h1>
    <p>技术科普 Workshop、回放、教学资料与比赛记录</p>
  </header>

  <section class="section" aria-labelledby="activities">
    <h2 id="activities">活动</h2>
    <div class="grid">
      <a class="entry glass-link" :href="withBase('/technology/workshops.html')">
        <div><strong>Workshop</strong><p>浏览讲座、回放和讲义</p></div>
        <span class="arrow" aria-hidden="true">→</span>
      </a>
      <a class="entry glass-link" :href="withBase('/technology/competitions.html')">
        <div><strong>比赛</strong><p>查看技术部比赛记录</p></div>
        <span class="arrow" aria-hidden="true">→</span>
      </a>
    </div>
  </section>

  <section class="section" aria-labelledby="workshops">
    <h2 id="workshops">Workshop 与教学资料</h2>
    <div class="workshop-list">
      <a v-for="workshop in workshops" :key="workshop.href" class="workshop-row glass-link" :href="withBase(workshop.href)">
        <strong>{{ workshop.name }}</strong>
        <p>{{ workshop.description }}</p>
        <span aria-hidden="true">→</span>
      </a>
    </div>
  </section>
</div>
