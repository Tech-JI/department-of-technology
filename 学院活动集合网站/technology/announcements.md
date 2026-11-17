<script setup>
import { withBase } from 'vitepress'
import { announcements } from '../theme/announcements.js'
</script>

# 技术部公告

<ul>
  <li v-for="announcement in announcements" :key="announcement.title">
    <time :datetime="announcement.date">{{ announcement.date }}</time> ·
    <a :href="withBase(announcement.href)">{{ announcement.title }}</a>
  </li>
</ul>
