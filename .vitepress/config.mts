import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: '技术部',
  description: '上海交通大学张江理工国际学院学生会技术部的活动与教学资料',
  appearance: false,
  srcDir: '学院活动集合网站',
  srcExclude: [
    'README.md',
    'public/**',
    '{affairs,arts,innovation,liaison,media,sports,student-union,volunteers}/**'
  ]
})
