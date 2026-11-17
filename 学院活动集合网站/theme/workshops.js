export const workshops = [
  { name: 'Missing Workshop', href: '/workshops/missing', description: '从包管理器、Shell 和 VS Code 入手，了解如何用 WSL 在 Windows 上搭建 Linux 开发环境。' },
  { name: 'Git Workshop 入门', href: '/workshops/git', description: '从安装 Git、配置 SSH 开始，练习用 Git 跟踪文件变化，理解提交和分支的基本用法。' },
  { name: 'Git Workshop 进阶', href: '/workshops/git-2-26su', description: '进阶练习 Git 的合并、变基和提交整理，并用 reflog 恢复误操作、用 worktree 并行处理分支。' },
  { name: 'Arch Linux 安装 Workshop', href: '/workshops/arch', description: '了解 Linux 的启动流程和磁盘分区，跟着指南安装 Arch Linux 并配置 Windows 双系统。' },
  { name: 'Bash Workshop', href: '/workshops/bash', description: '学习 Bash 的基础用法，从终端命令入手，了解如何用脚本把重复操作自动化。' },
  { name: 'Linux Install Party', href: '/workshops/linux-install-party', description: '比较虚拟机和双系统两种安装方式，从准备安装环境到熟悉 Linux 桌面的基本操作。' },
  { name: 'Git Workshop 基础与协作', href: '/workshops/git-2025', description: '学习 Git 的基本操作、分支管理和 GitHub 协作，通过练习熟悉版本控制。' },
  { name: 'Vim Workshop', href: '/workshops/vim', description: '用键盘练习 Vim 的移动、编辑和搜索，逐步建立高效的文本编辑习惯。' },
  { name: 'Visual Studio Code Workshop', href: '/workshops/vscode', description: '从编辑器设置和扩展入手，了解在 VS Code 中配置开发、调试与远程开发环境。' },
  { name: 'Markdown Workshop', href: '/workshops/markdown', description: '用纯文本写出结构清楚的笔记、报告和项目文档，并通过练习熟悉常用语法。' },
  { name: 'LaTeX Workshop', href: '/workshops/latex', description: '学习排版包含数学公式的报告和论文，教学资料另含 Beamer 和 TikZ。' }
]

// The two summer workshops share the same known period. List Git first by archive publication order.
const recentPaths = ['/workshops/git', '/workshops/missing', '/workshops/git-2-26su']
export const recentWorkshops = recentPaths.map(path => workshops.find(workshop => workshop.href === path))
