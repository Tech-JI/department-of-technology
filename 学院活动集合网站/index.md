---
layout: page
title: 技术部
---

<script setup>
import { withBase } from 'vitepress'
import { recentWorkshops } from './theme/workshops.js'
import { announcements } from './theme/announcements.js'
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
.hero h1 + p { max-width: 55em; line-height: 1.7; }
.announcements { padding: 8px 20px 12px; border: 1px solid #c5daf2; border-radius: 16px; background: #ffffffa8; }
.announcements li + li { border-top: 1px solid #d5e1ed; }
.announcements li a { display: block; padding: 10px 0; }
.section-link { display: inline-block; margin-top: 14px; text-decoration: underline; text-underline-offset: 4px; }
.announcements a:hover, .section-link:hover { text-decoration: underline; }
.school { color: #4a627c; font-size: 14px; }
.hero h1 { font-size: clamp(36px, 6vw, 58px); line-height: 1.15; font-weight: 700; margin: 10px 0; }
.section { margin-top: 32px; }
.section h2 { font-size: 24px; font-weight: 650; margin-bottom: 14px; }
.workshop-list { display: grid; gap: 14px; }
.workshop-row { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 2fr) auto; align-items: center; gap: 20px; }
.workshop-row strong { font-size: 17px; }
.workshop-row p { color: var(--vp-c-text-2); line-height: 1.65; }
@media (max-width: 600px) {
  .workshop-row { grid-template-columns: minmax(0, 1fr) auto; gap: 6px 12px; }
  .workshop-row p { grid-row: 2; grid-column: 1 / -1; }
}

@media (prefers-reduced-motion: no-preference) {
  .hero > *, .section h2, .workshop-row {
    animation: page-arrive 300ms ease-out backwards;
  }
  .hero > :nth-child(2) { animation-delay: 40ms; }
  .hero > :nth-child(3) { animation-delay: 75ms; }
  .section h2 { animation-delay: 100ms; }
  .workshop-row { animation-delay: 130ms; }
  .workshop-row:nth-child(even) { animation-delay: 165ms; }
  .workshop-row:focus-visible { animation: none; }
}
</style>

<div class="portal">
  <header class="hero">
    <p class="school">上海交通大学 · 张江理工国际学院学生会</p>
    <h1>技术部</h1>
    <p>技术部是面向同学们的技术实践平台。零基础也欢迎，你可以从 Workshop 入门，再按兴趣参与技术维护、项目开发或宣传，在实际项目中提升工科和信息技术技能。</p>
  </header>

  <section class="section" aria-labelledby="announcements">
    <h2 id="announcements">技术部公告</h2>
    <ul class="announcements">
      <li v-for="announcement in announcements.slice(0, 5)" :key="announcement.title">
        <a :href="withBase(announcement.href)">{{ announcement.title }}</a>
      </li>
    </ul>
    <a class="section-link" :href="withBase('/technology/announcements')">更多公告 →</a>
  </section>

  <section class="section" aria-labelledby="workshops">
    <h2 id="workshops">Workshop 与教学资料</h2>
    <div class="workshop-list">
      <a v-for="workshop in recentWorkshops" :key="workshop.href" class="workshop-row glass-link" :href="withBase(workshop.href)">
        <strong>{{ workshop.name }}</strong>
        <p>{{ workshop.description }}</p>
        <span aria-hidden="true">→</span>
      </a>
    </div>
    <a class="section-link" :href="withBase('/technology/workshops')">全部 Workshop →</a>
  </section>
</div>
