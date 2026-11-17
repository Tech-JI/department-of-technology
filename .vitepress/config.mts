import { defineConfig } from 'vitepress'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export default defineConfig({
  lang: 'zh-CN',
  title: '技术部',
  description: '上海交通大学张江理工国际学院学生会技术部的活动与教学资料',
  appearance: false,
  cleanUrls: true,
  async buildEnd({ outDir }) {
    for (const file of ['02.png', '03.png']) {
      const image = await readFile(join(outDir, 'announcements/git-workshop', file))
      if (image.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') {
        throw new Error(`Announcement image ${file} is missing its Git LFS content. Run git lfs pull before building.`)
      }
    }
  },
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '关于技术部', link: '/technology/' },
      { text: 'Workshop', link: '/technology/workshops' },
      { text: '加入我们', link: '/technology/join' }
    ]
  },
  srcDir: '学院活动集合网站',
  srcExclude: [
    'README.md',
    'public/**',
    '{affairs,arts,innovation,liaison,media,sports,student-union,volunteers}/**'
  ]
})
