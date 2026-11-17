---
aside: false
---

<script setup>
import { withBase } from 'vitepress'
import { workshops } from '../theme/workshops.js'
</script>

# 技术部 Workshop

<div class="workshop-directory">
  <div>
    <div v-for="workshop in workshops" :key="workshop.href" class="activity-card">
      <a class="glass-link" :href="withBase(workshop.href)">
        <strong>{{ workshop.name }} →</strong>
        <small>{{ workshop.description }}</small>
      </a>
    </div>
  </div>
  <nav aria-label="Workshop 导航">
    <strong>Workshop 导航</strong>
    <a v-for="workshop in workshops" :key="workshop.href" :href="withBase(workshop.href)">{{ workshop.name }}</a>
  </nav>
</div>
