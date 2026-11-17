<script setup>
import { withBase } from 'vitepress'
import organizations from '../theme/organizations.json'

const studentUnion = organizations.find(group => group.href === '/student-union/')
</script>

# 学生会

## 学生会简介

学生会是学院本科生规模最大的学生组织，负责组织和管理课外活动，并维护学生权益。学生会由主席团和六个部门组成，主席团负责学生会的日常工作。[学院官网](https://gc.sjtu.edu.cn/cn/campus-life/student-organizations/ji-student-union/)

## 部门

<div class="topic-grid">
  <a v-for="department in studentUnion.departments" :key="department.href" class="glass-link" :href="withBase(department.href)">
    {{ department.name }} <span aria-hidden="true">→</span>
  </a>
</div>
