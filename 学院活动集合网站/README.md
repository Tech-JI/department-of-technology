# 学院活动集合网站

在技术部文件夹运行 `pnpm docs:dev` 预览，运行 `pnpm docs:build` 构建。根目录的 VitePress 配置指向本文件夹，Cloudflare Pages 沿用原构建命令和输出目录。

新增活动时，在 `workshops/` 增加 Markdown 页面，再在 `index.md` 添加链接。视频发布后，把活动详情页中「待上传」改成实际的回放链接。
