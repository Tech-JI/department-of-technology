---
aside: false
---

<script setup>
const workshops = [
  { name: 'Missing Workshop', href: '../workshops/missing.html', description: '飞书妙记回放 · GitHub 资料' },
  { name: 'Git 与 GitHub 入门', href: '../workshops/git.html', description: '示例活动' }
]
</script>

# 技术部 Workshop

<div class="workshop-directory">
  <div>
    <div v-for="workshop in workshops" :key="workshop.href" class="activity-card">
      <a class="glass-link" :href="workshop.href">
        <strong>{{ workshop.name }} →</strong>
        <small>{{ workshop.description }}</small>
      </a>
    </div>
  </div>
  <nav aria-label="Workshop 导航">
    <strong>Workshop 导航</strong>
    <a v-for="workshop in workshops" :key="workshop.href" :href="workshop.href">{{ workshop.name }}</a>
  </nav>
</div>
