---
aside: false
---

<script setup>
const workshops = [
  { name: 'Missing Workshop', href: '../workshops/missing.html', description: '飞书妙记回放 · GitHub 资料' },
  { name: 'Git Wksp 26Fa', href: '../workshops/git.html', description: '飞书妙记回放 · PDF 讲义' },
  { name: 'Archlinux Installation Wksp 26Su', href: '../workshops/arch.html', description: 'GitHub 安装教程' },
  { name: 'Bash Wksp 26Sp', href: '../workshops/bash.html', description: '飞书妙记回放 · PDF 讲义' }
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
