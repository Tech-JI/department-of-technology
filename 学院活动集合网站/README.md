# 技术部网站

发布时先执行 `git push origin main`。个人仓库推送成功后，再执行 `git push tech-ji main` 同步同一提交。

在技术部文件夹运行 `pnpm docs:dev` 预览，运行 `pnpm docs:build` 构建。根目录的 VitePress 配置指向本文件夹，Cloudflare Pages 沿用原构建命令和输出目录。

新增 Workshop 时，在 `workshops/` 增加 Markdown 页面，再在 `theme/workshops.js` 添加一条记录。首页和 Workshop 目录会共用这份列表。把回放地址填入活动详情页，并标注观看所需的权限。
