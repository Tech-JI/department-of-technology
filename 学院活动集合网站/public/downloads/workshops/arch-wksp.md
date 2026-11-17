# Arch Linux 与 Win + Arch 双系统安装指南

> I use Arch btw.

---

<details>
<summary>目录</summary>

- [第零部分：认识 Arch Linux](#第零部分认识-arch-linux)
  - [0.1 它从哪里来](#01-它从哪里来)
  - [0.2 Arch 的几个核心特征](#02-arch-的几个核心特征)
  - [0.3 和其他主流发行版的差别](#03-和其他主流发行版的差别)
  - [0.4 它适合我吗](#04-它适合我吗)
- [第一部分：桌面 Linux 系统由什么组成](#第一部分桌面-linux-系统由什么组成)
  - [1.1 从开机到桌面的启动链](#11-从开机到桌面的启动链)
  - [1.2 UEFI、BIOS、GPT、MBR 的区别](#12-uefibiosgptmbr-的区别)
  - [1.3 安装前必须懂的几个词](#13-安装前必须懂的几个词)
  - [1.4 一个桌面系统的核心组件](#14-一个桌面系统的核心组件)
  - [1.5 DE、WM、Wayland、X11、GTK、Qt 的区别](#15-dewmwaylandx11gtkqt-的区别)
  - [1.6 常见文件系统怎么选](#16-常见文件系统怎么选)
  - [1.7 系统安装到底在做什么](#17-系统安装到底在做什么)
- [第二部分：安装前的准备](#第二部分安装前的准备)
  - [2.1 Windows 侧的准备](#21-windows-侧的准备)
  - [2.2 网络环境](#22-网络环境)
  - [2.3 下载安装镜像](#23-下载安装镜像)
  - [2.4 刻录安装 U 盘](#24-刻录安装-u-盘)
  - [2.5 BIOS / UEFI 设置](#25-bios--uefi-设置)
- [第三部分：进入 Arch 安装环境](#第三部分进入-arch-安装环境)
  - [3.1 确认 UEFI 模式](#31-确认-uefi-模式)
  - [3.2 联网](#32-联网)
  - [3.3 同步系统时钟](#33-同步系统时钟)
  - [3.4 换成国内镜像源](#34-换成国内镜像源)
- [第四部分：分区、格式化与挂载](#第四部分分区格式化与挂载)
  - [4.1 识别磁盘](#41-识别磁盘)
  - [4.2 分区方案](#42-分区方案)
  - [4.3 用 cfdisk 分区](#43-用-cfdisk-分区)
  - [4.4 格式化](#44-格式化)
  - [4.5 创建 Btrfs 子卷](#45-创建-btrfs-子卷)
  - [4.6 挂载（顺序重要，从根开始）](#46-挂载顺序重要从根开始)
- [第五部分：安装基础系统](#第五部分安装基础系统)
  - [5.1 pacstrap 拉包](#51-pacstrap-拉包)
  - [5.2 生成 fstab](#52-生成-fstab)
  - [5.3 进入新系统](#53-进入新系统)
  - [5.4 主机名与 hosts](#54-主机名与-hosts)
  - [5.5 时区与硬件时钟](#55-时区与硬件时钟)
  - [5.6 Locale](#56-locale)
  - [5.7 root 密码](#57-root-密码)
  - [5.8 微码](#58-微码)
- [第六部分：安装双系统引导（GRUB + os-prober）](#第六部分安装双系统引导grub--os-prober)
  - [6.1 装包](#61-装包)
  - [6.2 把 GRUB 装到 EFI 分区](#62-把-grub-装到-efi-分区)
  - [6.3 修改 GRUB 默认配置](#63-修改-grub-默认配置)
  - [6.4 生成最终配置](#64-生成最终配置)
  - [6.5 退出、卸载、重启](#65-退出卸载重启)
- [第七部分：第一次进入新系统](#第七部分第一次进入新系统)
  - [7.1 启用网络](#71-启用网络)
  - [7.2 配置 swap](#72-配置-swap)
  - [7.3 看一眼系统信息](#73-看一眼系统信息)
- [第八部分：安装桌面环境](#第八部分安装桌面环境)
  - [8.1 前置准备（任意桌面都要做）](#81-前置准备任意桌面都要做)
  - [8.2 通用桌面基础包](#82-通用桌面基础包)
  - [8.3 默认方案：KDE Plasma](#83-默认方案kde-plasma)
  - [8.4 GNOME](#84-gnome)
  - [8.5 Cinnamon](#85-cinnamon)
  - [8.6 Xfce](#86-xfce)
  - [8.7 Hyprland](#87-hyprland)
  - [8.8 Niri](#88-niri)
  - [8.9 Sway / i3](#89-sway--i3)
- [第九部分：Btrfs 快照与 grub-btrfs](#第九部分btrfs-快照与-grub-btrfs)
  - [9.1 先删掉 fstab 里的 subvolid](#91-先删掉-fstab-里的-subvolid)
  - [9.2 推荐方案：Snapper](#92-推荐方案snapper)
  - [9.3 可选方案：Timeshift](#93-可选方案timeshift)
  - [9.4 立刻拍第一张快照](#94-立刻拍第一张快照)
  - [9.5 配 grub-btrfs（启动菜单里直接进快照）](#95-配-grub-btrfs启动菜单里直接进快照)
  - [9.6 怎么用：回滚](#96-怎么用回滚)
  - [9.7 游戏库和大目录不要进快照](#97-游戏库和大目录不要进快照)
- [第十部分：显卡驱动](#第十部分显卡驱动)
  - [10.1 Intel 核显](#101-intel-核显)
  - [10.2 AMD 集显 / 独显](#102-amd-集显--独显)
  - [10.3 NVIDIA 独显](#103-nvidia-独显)
  - [10.4 双显卡笔记本（Intel / AMD 核显 + NVIDIA 独显）](#104-双显卡笔记本intel--amd-核显--nvidia-独显)
  - [10.5 装完验证](#105-装完验证)
- [第十一部分：功耗管理](#第十一部分功耗管理)
  - [11.1 power-profiles-daemon（默认方案）](#111-power-profiles-daemon默认方案)
  - [11.2 TLP（可选细调方案）](#112-tlp可选细调方案)
  - [11.3 auto-cpufreq（备选）](#113-auto-cpufreq备选)
  - [11.4 thermald（Intel 推荐叠加）](#114-thermaldintel-推荐叠加)
  - [11.5 其他实用小工具](#115-其他实用小工具)
  - [11.6 关于休眠](#116-关于休眠)
- [第十二部分：日常软件选择](#第十二部分日常软件选择)
  - [12.1 浏览器](#121-浏览器)
  - [12.2 即时通讯](#122-即时通讯)
  - [12.3 办公](#123-办公)
  - [12.4 媒体播放](#124-媒体播放)
  - [12.5 图像 / 创意](#125-图像--创意)
  - [12.6 开发](#126-开发)
  - [12.7 游戏](#127-游戏)
  - [12.8 系统工具](#128-系统工具)
  - [12.9 更多字体](#129-更多字体)
  - [12.10 输入法补充：Rime 方案](#1210-输入法补充rime-方案)
- [第十三部分：日常系统管理维护](#第十三部分日常系统管理维护)
  - [13.1 更新系统](#131-更新系统)
  - [13.2 查询和管理软件包](#132-查询和管理软件包)
  - [13.3 清理无用包](#133-清理无用包)
  - [13.4 清理软件包缓存](#134-清理软件包缓存)
  - [13.5 清理磁盘空间](#135-清理磁盘空间)
  - [13.6 软件降级](#136-软件降级)
  - [13.7 快照维护](#137-快照维护)
  - [13.8 备份](#138-备份)
  - [13.9 服务和日志排错](#139-服务和日志排错)
  - [13.10 桌面崩了：切到 TTY](#1310-桌面崩了切到-tty)
  - [13.11 系统进不去：用安装环境急救](#1311-系统进不去用安装环境急救)
- [第十四部分：双系统常见坑位](#第十四部分双系统常见坑位)
- [第十五部分：软件包链接索引](#第十五部分软件包链接索引)
- [第十六部分：参考资料](#第十六部分参考资料)

</details>

---

## 第零部分：认识 Arch Linux

### 0.1 它从哪里来

2002 年 3 月 11 日，Judd Vinet 发布了 Arch Linux 0.1，灵感来自 Slackware、BSD、PLD Linux 和 CRUX。配套的包管理器 `pacman` 也是当时为 Arch 量身写的。

Arch 一直由社区维护，背后没有 Canonical、Red Hat 这种商业公司撑腰。

### 0.2 Arch 的几个核心特征

1. **简洁（Simplicity）**：Arch 只装一个最小系统，桌面、驱动、服务都由你自己选；代价是手动配置多。
2. **滚动更新（Rolling Release）**：没有版本号概念，永远跟随最新。`pacman -Syu` 一条命令就能把内核、应用、库一起更新到最新版。
3. **实用至上（Pragmatism）**：技术决策看事实和讨论，不掺意识形态。仓库里开源闭源软件都收（闭源多数在 AUR）。
4. **面向用户，而非「用户友好」**：Arch 默认你愿意读文档、自己排错。
5. **AUR（Arch User Repository）**：社区维护的 `PKGBUILD` 仓库，几乎涵盖了 Linux 上能见到的所有软件。配合 `makepkg` 和 `pacman` 就能装。
6. **激进的内核更新**：升级 `linux` 包时旧内核文件会被直接覆盖。所以 **升级内核后最好重启**：当前运行的是旧内核，但磁盘上的内核模块已经换成新版的，运行中按需加载模块会因版本对不上而失败（插上声卡突然不工作之类的怪问题多半源于此）。重启后一切恢复正常。
7. **单一包管理体系**：只有 `pacman` 一套，安装与构建门槛都低，这也是 AUR 能繁荣的根本原因。代价是 `pacman` 不支持虚包。

### 0.3 和其他主流发行版的差别

| 发行版                | 与 Arch 的核心差别                                                                                                                                                   |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Ubuntu**            | Debian 系，由 Canonical 商业支持；半年一个版本；预装齐全；用 `apt + .deb`                                                                                            |
| **Linux Mint**        | 基于 Ubuntu（或 Debian），桌面环境开箱即用；半年一发布                                                                                                               |
| **Manjaro**           | 基于 Arch，但拥有 **独立软件仓库**，软件版本比 Arch 滞后 1–2 周；预装桌面；用 AUR 时容易因为依赖版本错位而构建失败。**Manjaro ≠ Arch**，Arch 的解决方案套不上 Manjaro |
| **Fedora / openSUSE** | 半年/一年发布；有 Red Hat / SUSE 商业背景；用 `dnf` / `zypper`                                                                                                       |

### 0.4 它适合我吗

动手之前，先诚实地问自己三个问题：

1. **是否有一定的 Linux 基础？** 没有的话，建议先用一段时间 Ubuntu / Fedora，把基本概念（用户、权限、包管理、文件系统、systemd）跑顺了再来 Arch。
2. **愿不愿意花时间折腾系统？** Arch 装出来只是一个无图形界面的最小系统，桌面、驱动、输入法、字体、声卡都要自己来。
3. **遇到难解的问题能不能冷静处理？** 滚挂了别第一反应就重装，多数情况下用安装盘 `arch-chroot` 进原系统就能修。

三条都是 yes，就继续往下读。

---

## 第一部分：桌面 Linux 系统由什么组成

Arch 装起来麻烦，不是因为它神秘，而是因为它默认只给一个最小系统。桌面、驱动、输入法、快照这些组件都得自己挑。

### 1.1 从开机到桌面的启动链

电脑从按下电源键到进入桌面，大致要经过这么几层：

| 层级                        | 负责什么                                                         | 本指南默认                         |
| --------------------------- | ---------------------------------------------------------------- | ---------------------------------- |
| 固件（Firmware）            | 主板里的 UEFI/BIOS，负责初始化硬件、寻找启动项                   | UEFI                               |
| EFI System Partition（ESP） | FAT32 小分区，存放各系统的 EFI 启动程序                          | 复用 Windows ESP，挂到 `/efi` |
| 引导器（Bootloader）        | 显示启动菜单，加载 Linux 内核，也能链式启动 Windows              | GRUB                               |
| 内核（Kernel）              | Linux 本体，管理 CPU、内存、进程、驱动、文件系统                 | `linux`，可选 `linux-zen` 等       |
| initramfs                   | 内核启动早期用的小型临时系统，负责加载必要模块、找到真正的根分区 | `mkinitcpio` 生成                  |
| init 系统                   | 用户空间的第一个进程，拉起网络、登录、桌面等服务                 | `systemd`                          |
| 登录与桌面                  | 进入图形界面，启动桌面环境或窗口管理器                           | SDDM + KDE Plasma                  |

排错也按这条链子从上到下看：看不到 Linux 启动项，多半是 UEFI / ESP / 引导器的问题；能进 GRUB 但进不了系统，多半卡在内核、initramfs 或根分区挂载；能到 TTY 但起不来桌面，多半是显示管理器、显卡驱动或桌面环境出了岔子。

### 1.2 UEFI、BIOS、GPT、MBR 的区别

这几个词分别讲的是「机器怎么启动」和「硬盘怎么分区」。

- **BIOS**：老式固件。开机后读取磁盘开头的启动代码，配合 MBR 分区表使用。新机器基本不再走这条路。
- **UEFI**：现代固件。它会去 EFI 分区里读 `.efi` 启动程序，比如 Windows Boot Manager 或 GRUB。本指南要求使用 UEFI。
- **MBR**：老式分区表，最多 4 个主分区，对大硬盘支持差，通常和 BIOS 搭配。
- **GPT**：现代分区表，支持更多分区和更大容量，通常和 UEFI 搭配。本指南默认 `UEFI + GPT`。
- **ESP（EFI System Partition）**：UEFI 启动必须的 FAT32 分区，里面放着 `EFI/Microsoft/...`、`EFI/ARCH/...` 这类启动文件。

简单判断办法：

```bash
ls /sys/firmware/efi/efivars
```

有输出就是 UEFI 模式。后面用 `cfdisk` 新建整盘分区表时选 `gpt`；双系统复用 Windows 时则 **不要** 重建整盘分区表。

### 1.3 安装前必须懂的几个词

后面分区、挂载、生成 fstab、chroot 会反复出现这些词。先把它们弄清楚，安装时不容易把命令当咒语背。

- **Linux 目录树**：Linux 只有一棵从 `/` 开始的目录树，`/` 叫根目录。`/home`、`/boot`、`/etc` 都是这棵树上的目录，不是 Windows 那种 `C:`、`D:` 盘符。
- **块设备**：硬盘、SSD、U 盘和它们的分区在 Linux 里会显示成 `/dev/...`。例如 `/dev/nvme0n1` 是一整块 NVMe 硬盘，`/dev/nvme0n1p1` 是它的第 1 个分区；`/dev/sda` 是一整块 SATA/USB 磁盘，`/dev/sda1` 是它的第 1 个分区。
- **分区**：把一块磁盘切成几段。分区本身只是容器，里面还要格式化成 ext4、Btrfs、FAT32、NTFS 这类文件系统才能放文件。
- **挂载（mount）**：把某个分区 / 子卷接到 Linux 目录树的某个目录上。比如把 EFI 分区挂到 `/efi`，访问 `/efi` 时实际读写的就是那块 FAT32 分区。
- **挂载点（mount point）**：被接上的目录。`/mnt` 是安装时临时使用的挂载点；装完后真实系统的挂载点会写进 `/etc/fstab`。
- **fstab**：`/etc/fstab` 记录“开机时把哪个分区 / 子卷挂到哪个目录”。`genfstab` 会按当前 `/mnt` 下的挂载状态自动生成它。
- **chroot**：`arch-chroot /mnt` 会把当前命令环境切到新系统里。进入 chroot 后，`pacman -S`、改 `/etc/default/grub`、设置密码等操作改的是硬盘里的新系统，不再是 U 盘临时环境。
- **Btrfs 子卷**：Btrfs 里的轻量级独立目录树，常见名字有 `@`、`@home`、`@snapshots`。它们不是传统分区，但可以像分区一样分别挂到 `/`、`/home`、`/.snapshots`。

本指南把 ESP 挂到 `/efi`，而不是 `/boot`。原因是 `/boot` 里会放 Linux 内核、initramfs、微码等文件；如果 `/boot` 本身是 Btrfs 根分区的一部分，这些文件可以跟随快照一起回滚。ESP 是 FAT32，不能被 Btrfs 快照保护，所以只用来放 EFI 启动程序更合适。

### 1.4 一个桌面系统的核心组件

桌面 Linux 不是单独一个软件，而是一组组件拼起来的系统：

| 组件                | 作用                                                   | 常见选择                                     |
| ------------------- | ------------------------------------------------------ | -------------------------------------------- |
| 包管理器            | 安装、删除、升级软件                                   | Arch 用 `pacman`；AUR 常用 `yay` 或 `paru`   |
| 文件系统            | 决定数据如何放在磁盘上                                 | 本指南用 Btrfs，支持子卷、压缩、快照         |
| Swap                | 内存压力大时的后备空间；休眠也依赖磁盘 swap            | 推荐 `zram`；可选 swapfile                   |
| 网络管理            | 管理有线、Wi-Fi、VPN、DNS                              | `NetworkManager`                             |
| 图形协议            | 应用把窗口画到屏幕上的基础协议                         | Wayland / X11                                |
| 图形工具包          | 应用开发所用的界面库，影响外观、主题和文件对话框       | Qt / GTK                                     |
| 显示服务器 / 合成器 | 管理窗口、输入、屏幕输出、动画和合成                   | KDE 的 KWin、GNOME 的 Mutter、Hyprland、Sway |
| 桌面环境（DE）      | 一整套桌面体验：面板、设置、文件管理器、通知等         | KDE Plasma、GNOME、Cinnamon、Xfce            |
| 窗口管理器（WM）    | 只管理窗口，其他组件要自己拼                           | i3、Sway、Hyprland、Niri                     |
| 显示管理器（DM）    | 图形登录界面，登录后启动桌面会话                       | SDDM、GDM、LightDM                           |
| 显卡驱动            | 让图形界面、游戏、硬解、外接屏正常工作                 | Intel/AMD 多用 Mesa；NVIDIA 用专有驱动       |
| 声音系统            | 管理声卡、蓝牙耳机、应用音量、录音                     | PipeWire                                     |
| 输入法              | 中文 / 日文 / 韩文输入                                 | Fcitx5 + Rime 或 Fcitx5 拼音                 |
| 字体                | 决定中文、emoji、网页、代码显示是否正常                | Noto CJK、Noto Emoji、文泉驿等               |
| Portal              | Wayland 下给截图、录屏、文件选择、沙盒应用提供统一接口 | `xdg-desktop-portal-*`                       |
| 电源管理            | 管理功耗、休眠、合盖、温度、频率                       | TLP、auto-cpufreq、thermald                  |
| 快照 / 备份         | 系统升级或折腾前留回滚点                               | Snapper 或 Timeshift                         |

### 1.5 DE、WM、Wayland、X11、GTK、Qt 的区别

- **桌面环境（DE）**：比如 KDE Plasma / GNOME，装完就自带设置中心、任务栏、文件管理器、通知、电源菜单、截图工具等等。
- **窗口管理器（WM）**：比如 i3 / Sway / Hyprland，只负责把窗口摆好。状态栏、启动器、锁屏、壁纸、通知都得自己选。
- **X11**：老牌图形协议，兼容性强，很多老工具都围绕它构建。如今已逐渐退场，不再推荐。
- **Wayland**：新的图形协议，安全模型更现代，高刷、缩放、触控板手势体验通常更好，但极少数老工具可能还要适配。
- **Qt**：一套图形界面工具包，KDE Plasma、Dolphin、Konsole、Kate 等主要用 Qt。Qt 应用在 KDE 下通常外观最统一。
- **GTK**：另一套图形界面工具包，GNOME、Cinnamon、Xfce 以及大量 GNOME 应用主要用 GTK。GTK 应用在 GNOME 下通常外观最统一。

一句话区分：KDE / GNOME 是桌面环境，Wayland / X11 是图形协议，Qt / GTK 是应用界面库。Qt 和 GTK 应用可以混着用，但主题、文件选择器、暗色模式、输入法这些细节有时会对不齐。新机器优先试 Wayland；遇到录屏、共享屏幕、输入法、NVIDIA 相关问题时再切回 X11 排查。

### 1.6 常见文件系统怎么选

分区表决定磁盘切成几块；文件系统决定每块分区里的数据怎么存。`/dev/nvme0n1` 是整盘，`/dev/nvme0n1p1` 是分区，Btrfs / ext4 / FAT32 这些才是文件系统。

本指南只推荐把 Linux 根分区做成 Btrfs，但你在双系统和日常使用里会遇到这些文件系统：

| 文件系统  | 适合放哪里                                            | 优点                                                     | 注意点                                                                     |
| --------- | ----------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------- |
| **Btrfs** | Linux 根分区、`/home`、需要快照的系统盘               | 子卷、透明压缩、快照、在线扩容、校验；适合滚动发行版回滚 | 概念比 ext4 多；swapfile 要单独处理；不建议新手折腾复杂 RAID               |
| **ext4**  | Linux 根分区、服务器、简单稳定优先的机器              | 成熟、简单、资料多、恢复工具多；几乎所有 Linux 都稳      | 没有原生快照和子卷；想回滚要靠 rsync / Timeshift rsync 模式 / 外部备份     |
| **XFS**   | 大文件、服务器、数据盘                                | 大文件和高并发场景表现好，成熟稳定                       | 不能缩小分区；桌面新手没必要优先选                                         |
| **F2FS**  | 闪存设备、部分 U 盘 / SD 卡 / 特定 SSD 场景           | 面向闪存设计                                             | 桌面根分区通用性和资料不如 Btrfs / ext4                                    |
| **FAT32** | EFI System Partition、启动 U 盘                       | UEFI 固件原生识别，跨系统兼容                            | 单文件最大 4 GiB；不适合 Linux 根分区                                      |
| **exFAT** | 移动硬盘、U 盘，在 Windows / macOS / Linux 之间传文件 | 跨平台好，没有 FAT32 的 4 GiB 单文件限制                 | 没有 Linux 权限模型；不适合系统盘                                          |
| **NTFS**  | Windows 系统分区、Windows 数据盘                      | Windows 原生文件系统                                     | Linux 可读写，但双系统下要关闭 Windows 快速启动；不适合拿来装 Linux 根分区 |
| **ZFS**   | NAS、服务器、大容量存储池                             | 数据完整性、快照、压缩、存储池能力强                     | Arch 默认内核不内置 ZFS，维护成本高；不适合这份新手安装路线                |

本指南选 Btrfs 不是为了「跑得更快」，而是为了 **回滚更方便**。Arch 滚动更新偶尔会翻车，Btrfs + Snapper / Timeshift 能在升级前先拍快照，出问题就能退回去。

如果你只想要最简单、最传统的 Linux 安装，也可以把根分区做成 ext4：

```bash
mkfs.ext4 -L arch /dev/nvmeXnYpB
```

但后面 Btrfs 子卷、透明压缩、`grub-btrfs`、Btrfs 快照这几节就不适用了；系统级回滚也没那么方便。

几条实用结论：

- **Arch 主系统分区**：新手按本指南用 Btrfs；想极简稳定就选 ext4。
- **EFI 分区**：必须是 FAT32，不要去格式化 Windows 已有的 ESP。
- **Windows 分区**：保持 NTFS，Linux 安装过程中别动它。
- **移动硬盘 / U 盘跨平台传文件**：优先选 exFAT。
- **想用快照回滚系统**：优先 Btrfs；ext4 没有原生快照。

### 1.7 系统安装到底在做什么

Arch 装机不是「点点安装器」就完事，而是手工把一个系统搭出来：先用 U 盘启进临时系统，再把 Arch 装到硬盘，最后给 UEFI 留一个启动入口。

整个流程分成下面几个阶段：

| 阶段                       | 你在做什么                                                | 结果                                                     |
| -------------------------- | --------------------------------------------------------- | -------------------------------------------------------- |
| 1. Windows 侧准备          | 备份数据、关闭快速启动、压缩出未分配空间                  | 给 Arch 腾出安全的安装位置，避免 Windows 锁住 NTFS       |
| 2. 启动安装 U 盘           | 从 Arch ISO 进入一个临时 Linux 环境                       | 有一个能联网、能分区、能装包的救援系统                   |
| 3. 确认 UEFI 和联网        | 检查 `/sys/firmware/efi/efivars`，连上网络                | 确认后面能写 EFI 启动项、能从镜像站下载软件包            |
| 4. 分区和格式化            | 复用 Windows ESP，给 Arch 创建 Linux 分区并格式化为 Btrfs | 硬盘上出现能承载 Arch 文件的空间                         |
| 5. 创建子卷并挂载到 `/mnt` | 把根、home、快照、var 高变化目录等子卷挂到 `/mnt` 下      | `/mnt` 暂时代表“未来 Arch 系统的 `/`”                    |
| 6. `pacstrap` 安装基础包   | 把 `base`、内核、固件、网络工具等下载安装到 `/mnt`        | 硬盘上有了最小 Arch 系统文件                             |
| 7. `genfstab` 生成挂载表   | 记录每个分区 / 子卷开机后应该挂到哪里                     | 新系统知道 `/`、`/home`、`/.snapshots`、`/var/*` 等挂载点 |
| 8. `arch-chroot /mnt`      | 从 U 盘环境“切进”硬盘上的新系统                           | 后续命令改的是新系统，不是 U 盘临时系统                  |
| 9. 配置新系统基础项        | 设置主机名、时区、locale、root 密码、微码                 | 新系统有身份、时间、语言和 CPU 微码                      |
| 10. 安装引导器             | 把 GRUB 写入 ESP，并生成启动菜单                          | 主板 UEFI 能找到 Arch，GRUB 能启动 Arch / Windows        |
| 11. 重启进入硬盘系统       | 退出 chroot、卸载 `/mnt`、拔 U 盘、重启                   | 验证新系统能独立启动                                     |
| 12. 安装桌面和常用服务     | 创建普通用户，安装 KDE / GNOME 等桌面，启用显示管理器     | 从 TTY 命令行变成可日常使用的桌面系统                    |
| 13. 配置回滚和驱动         | 配 Snapper / Timeshift、显卡驱动、电源管理、输入法        | 系统进入主力机可用状态                                   |

## 第二部分：安装前的准备

### 2.1 Windows 侧的准备

先在 Windows 里把这几件事做完：

1. **备份重要数据**：分区操作一旦出错，很难再挽回。
2. **建议关闭 Windows 设备加密 / BitLocker**：双系统会改变启动链，BitLocker 可能反复弹出恢复密钥；新手安装前先关掉最省事。至少也要先备份恢复密钥，一般可在 [aka.ms/myrecoverykey](https://aka.ms/myrecoverykey) 用相同微软账号查到。
3. **关闭快速启动**：控制面板 → 电源选项 → 选择电源按钮的功能 → 更改当前不可用的设置 → 取消勾选「启用快速启动」。否则 Windows 会以「混合休眠」的状态关机，Linux 挂载 NTFS 分区时可能只读甚至损坏数据。
4. **让 Windows 走 UTC 硬件时钟** （推荐，避免双系统时间错乱）：

```ps1
reg add "HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\TimeZoneInformation" /v RealTimeIsUniversal /d 1 /t REG_DWORD /f
```

5. **在 Windows 磁盘管理里压缩出空闲空间** 给 Arch：
   - 右键开始 → 磁盘管理 → 右键 Windows 主分区 → 压缩卷
   - 至少 `128 GB`（131072 MB）。游戏、虚拟机、开发环境多准备点
   - **不要在压缩出的空间里新建分区**，保持「未分配」状态

6. **检查 EFI 分区容量**：用 DiskGenius 之类工具看看那个 100 MiB 左右的 ESP 是否 ≥ 256 MiB。太小时有三种处理思路：照本指南默认把 ESP 挂 `/efi`、让内核留在 Btrfs 根分区的 `/boot`；额外新建一个独立 `/boot` 分区；或者在 Arch 那块盘新建一个 ESP。不要为了「腾空间」随手删掉 Windows ESP 里的 Microsoft 目录。

只装 Arch 的话，这一节的 Windows 操作可以跳过，但后面的分区步骤里仍然要新建 ESP。如果是 **多硬盘双系统**，可以在 Windows 里先确认哪块盘是 Windows 盘、哪块盘准备给 Arch，避免装错盘。

### 2.2 网络环境

- 安装过程 **必须联网**。能用网线 DHCP 直接上网是最省事的方案。
- 只能用 Wi-Fi 的话，先在路由器里把 SSID 改成 **纯 ASCII** （英文+数字+短横线）。安装环境的 TTY 不支持中文/emoji 输入，看到一堆方块就抓瞎了。

### 2.3 下载安装镜像

去官网下载最新的 `archlinux-YYYY.MM.DD-x86_64.iso`：<https://archlinux.org/download/>

也可以从国内任一镜像站下载：

- 中科大：<https://mirrors.ustc.edu.cn/archlinux/iso/>
- 清华：<https://mirrors.tuna.tsinghua.edu.cn/archlinux/iso/>

Arch 是滚动发行版，**永远用最新镜像**，没有「旧镜像装旧版」这种说法。每月 1 号会出新版。

担心镜像被劫持的话，可以顺手验签：从下载页同一目录拿 `archlinux-*.iso.sig`，用 `pacman-key -v archlinux-*.iso.sig` 验证（已装 Arch 的机器上可用；Windows / macOS 上没有 Arch 钥匙环，需要用 `gpg` 手动导入 [archlinux.org/master-keys](https://archlinux.org/master-keys/) 里的签名者公钥）。镜像站本身做了校验和分发，对绝大多数人来说不是必须步骤。

### 2.4 刻录安装 U 盘

准备一块 ≥ 2 GB 的 U 盘（**里面的数据会被全部清空**）。

Windows 下常用：

- **Ventoy**：复制 ISO 进 U 盘就行，可以同时塞多个 ISO，还能继续当普通盘用；不过部分 Secure Boot / 主板组合下兼容性一般。
- **Rufus**：选好 ISO 写入，最稳。
- **balenaEtcher**：操作最傻瓜；缺点是写完后想把 U 盘再当普通盘用，要先重建分区表。

如果用 Ventoy 卡在启动菜单、找不到介质，换 Rufus 或 Etcher。

Linux 下可用 `dd`：

```bash
sudo dd if=archlinux-*.iso of=/dev/sdX bs=4M status=progress oflag=sync
# /dev/sdX 是 U 盘整盘，不是分区！弄错盘会毁数据
```

### 2.5 BIOS / UEFI 设置

插上 U 盘，开机时连按 `F2` / `F8` / `F10` / `F12` / `Del`（具体哪个键看主板）进 BIOS。也可以在 Windows 里按住 `Shift` 点重启 → 疑难解答 → 高级选项 → UEFI 固件设置。

在 BIOS 里要做三件事：

1. **关闭 Secure Boot**：Arch 安装镜像默认不带签名，在 `Security` 选项卡里把它 Disable。
2. **启动模式设为 UEFI only**：在 `Boot` 选项卡找到 `Boot Mode`，确保不是 Legacy/CSM。
3. **把 U 盘调到启动项第一位** （或者用一次性启动菜单选 U 盘）。
4. `F10` 保存退出。

---

## 第三部分：进入 Arch 安装环境

正常启动后，回车选第一项就能进入 root 的 zsh shell。

### 3.1 确认 UEFI 模式

```bash
ls /sys/firmware/efi/efivars
```

能看到一堆 EFI 变量文件就说明 UEFI 模式正常。如果目录不存在，**不要继续往下走**，先回 BIOS 把启动模式改对。

### 3.2 联网

**有线**：插上网线一般就自动 DHCP 通了。

**无线**：用 `iwctl` 进交互界面连接：

```bash
iwctl
device list                           # 看无线网卡设备名，通常 wlan0
station wlan0 scan                    # 扫描
station wlan0 get-networks            # 列出附近 Wi-Fi
station wlan0 connect "Your-SSID"     # 回车后输密码
exit
```

如果网卡被 RF-kill 阻塞：

```bash
rfkill list
rfkill unblock wifi
ip link set wlan0 up
```

测试一下连通性：

```bash
ping -c 3 archlinux.org
```

### 3.3 同步系统时钟

```bash
timedatectl set-ntp true
timedatectl status
```

### 3.4 换成国内镜像源

```bash
vim /etc/pacman.d/mirrorlist
```

如果不习惯 `vim`，也可以用 `nano`：

```bash
nano /etc/pacman.d/mirrorlist
```

第一次用 `vim` 的话，记住这几个键就够了：

- 按 `i` 进入编辑模式，然后正常输入 / 粘贴文本。
- 按 `Esc` 回到普通模式。
- 输入 `:wq` 回车，保存并退出。
- 输入 `:q!` 回车，不保存直接退出。

`nano` 更接近普通文本编辑器：

- 直接输入 / 粘贴文本即可编辑。
- 按 `Ctrl + O` 保存，回车确认文件名。
- 按 `Ctrl + X` 退出。
- 不想保存时，退出时按 `N`。

把以下几行 **放在文件最上面** （pacman 从上往下挨个试）：

```
Server = https://mirrors.ustc.edu.cn/archlinux/$repo/os/$arch
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinux/$repo/os/$arch
```

> ⚠️ 这一步 **不要** 在 `/etc/pacman.conf` 里加 `archlinuxcn` 源。

可选：也可以用 `reflector` 自动筛选官方镜像源。它只管理 `/etc/pacman.d/mirrorlist`，不管理 archlinuxcn / AUR / Flatpak。

```bash
pacman -S reflector
reflector -p https -a 12 -c cn --verbose --sort rate --save /etc/pacman.d/mirrorlist
```

参数含义：

- `-p https`：只保留 HTTPS 镜像。
- `-a 12`：只保留最近 12 小时内同步过的镜像。
- `-c cn`：只保留中国大陆镜像；也可以写成 `-c China`。
- `--verbose`：显示筛选过程。
- `--sort rate`：按实际测速结果排序。
- `--save /etc/pacman.d/mirrorlist`：写回 pacman 的官方仓库镜像列表。

reflector 适合想自动测速的人。新手或校园网环境不稳定时，手动把清华 / 中科大放在最上面反而更可控。

---

## 第四部分：分区、格式化与挂载

> ⚠️ 分区、格式化属于高危操作。**动手前请务必备份 Windows 中的重要数据**。本文中所有形如 `/dev/sdXn` 或 `/dev/nvmeXnYpZ` 的路径都是占位符，请用 `lsblk` 反复确认后再替换为自己机器上的真实路径。

### 4.1 识别磁盘

```bash
lsblk -f
fdisk -l
```

重点辨认：

- Windows 的 **EFI 分区**：FAT32，常见 `100M`–`512M`，类型 `EFI System`
- Windows 主分区：NTFS（不要碰）
- Windows 留下的恢复分区、MSR 分区（不要碰）
- 你之前压缩出来的 **未分配空间**

记下目标磁盘路径（SATA 是 `/dev/sdX`，NVMe 是 `/dev/nvmeXnY`）。

只装 Arch 时，关键是确认目标盘没有要保留的数据；多硬盘双系统时，关键是分清 Windows 盘和 Arch 盘。容量、型号、厂商信息都要一起看，不要只凭 `/dev/sda` / `/dev/nvme0n1` 这种名字下判断。

### 4.2 分区方案

先判断自己属于哪种场景：

| 场景                 | ESP 怎么处理                                       | Arch 分区怎么放                                   |
| -------------------- | -------------------------------------------------- | ------------------------------------------------- |
| 单硬盘双系统（默认） | 复用 Windows 现有 ESP，挂到 `/efi`                     | 在 Windows 压缩出的空闲空间中新建 Arch Btrfs 分区 |
| 多硬盘双系统         | 可复用 Windows ESP，也可在 Arch 那块盘新建一个 ESP | Arch 全部放在第二块盘                             |
| 只装 Arch            | 新建 ESP                                           | 整盘按 Arch 需要重新分区                          |

#### 4.2.1 默认：单硬盘双系统

Windows 已经有 ESP，默认复用就行，不重新格式化：

| 用途                        | 分区                      | 文件系统                | 大小     |
| --------------------------- | ------------------------- | ----------------------- | -------- |
| `/efi`（EFI System）           | **复用 Windows 已有 ESP** | FAT32（不要重新格式化） | 已存在   |
| `/` + `/home`（含 `/boot`） | 新建                      | Btrfs（用子卷分）       | 剩余空间 |

> ⚠️ 这里 **把 Windows 的 ESP 挂到 `/efi`**，而不是 `/boot`。原因是 Windows 自带的 ESP 通常不到 300 MiB，挂到 `/boot` 上后，内核、initramfs、微码全要塞进去，很快就会被撑爆。
>
> Swap 不再默认单独分区。日常桌面优先用 `zram`，不吃磁盘、响应也更快；确实需要磁盘交换空间或要休眠时再加 `swapfile`。不再推荐单独分一个 `swap` 分区。

#### 4.2.2 多硬盘双系统

多硬盘场景下有两种做法：

| 做法             | 分区方式                                                                      | 优点                                              | 注意点                                                                             |
| ---------------- | ----------------------------------------------------------------------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------- |
| 复用 Windows ESP | Windows 盘 ESP 挂 `/efi`；Arch 盘只建 Btrfs 根分区                              | 一个统一启动入口，GRUB 更容易识别 Windows         | 会向 Windows 盘的 ESP 写入 `EFI/ARCH`                                              |
| Arch 盘自建 ESP  | Arch 盘新建 512 MiB-1 GiB FAT32 ESP，挂 `/efi`；Arch 盘再建 Btrfs 根分区        | 两块盘更独立，拔掉 Arch 盘通常不影响 Windows 启动 | BIOS/UEFI 里要选 Arch 盘启动；GRUB 识别 Windows 要进系统后再跑一次 `grub-mkconfig` |

如果想「尽量不动 Windows 那块盘」，就在 Arch 那块盘新建 ESP。这样 Windows 盘保持原样，Arch 的 EFI 文件写到 Arch 盘自己的 ESP 里。

#### 4.2.3 只装 Arch

只装 Arch、准备整盘清空时，没有 Windows ESP 可复用，需要新建一个 ESP：

| 用途                        | 分区 | 文件系统          | 大小          |
| --------------------------- | ---- | ----------------- | ------------- |
| `/efi`（EFI System）           | 新建 | FAT32             | 512 MiB-1 GiB |
| `/` + `/home`（含 `/boot`） | 新建 | Btrfs（用子卷分） | 剩余空间      |

`cfdisk` 里 ESP 的分区类型选 `EFI System`。格式化 ESP 用：

```bash
mkfs.fat -F32 /dev/nvmeXnYpA
```

> ⚠️ 只有新建 ESP 时才格式化。双系统复用 Windows ESP 时 **绝对不要** 格式化。

### 4.3 用 cfdisk 分区

```bash
cfdisk /dev/nvmeXnY      # 或 /dev/sdX
```

操作要点：

- 只在 `Free space` 上 `[ New ]`
- 默认单盘双系统：新建一个分区，剩余空间全分给它，类型保留默认 `Linux filesystem`
- 只装 Arch 或 Arch 盘自建 ESP：先新建 512 MiB-1 GiB ESP，`[ Type ]` 改成 `EFI System`，再新建 Btrfs 根分区
- 可选独立 `/boot`：在 ESP 和 Btrfs 根分区之间额外新建 1-2 GiB 分区，类型保留 `Linux filesystem`
- `[ Write ]` → 输入 `yes` 写入分区表 → `[ Quit ]` 退出

> ⚠️ 写盘前再核对一次！Windows 分区一个都不要动。
>
> 可选：如果你确定要独立 swap 分区，再额外新建一个 `Linux swap` 分区。普通使用不建议这么干，灵活性不如 zram / swapfile。

复查一下：

```bash
lsblk -f
```

### 4.4 格式化

**EFI 分区**：

- 复用 Windows ESP：**绝对不要格式化**。
- 只装 Arch / Arch 盘自建 ESP：新建的 ESP 要格式化为 FAT32。

```bash
mkfs.fat -F32 /dev/nvmeXnYpA
```

**可选独立 `/boot` 分区**：

```bash
mkfs.ext4 -L boot /dev/nvmeXnYpB
```

**Btrfs 根**：

```bash
mkfs.btrfs -L arch /dev/nvmeXnYpB # -L arch 是分区标签名，可以换
```

如果创建了独立 `/boot` 分区，Btrfs 根分区的编号可能顺延成 `/dev/nvmeXnYpC`，命令也要相应改成：

```bash
mkfs.btrfs -L arch /dev/nvmeXnYpC
```

> 如果你坚持用 ext4 做根分区：`mkfs.ext4 -L arch /dev/nvmeXnYpB`。后面就没有子卷概念，也没有原生快照了。
>
> 单独 swap 分区才需要执行 `mkswap /dev/nvmeXnYpZ`。这里的 `Z` 按你的真实分区编号替换；如果还建了独立 `/boot`，注意不要把 `/boot`、根分区和 swap 分区编号搞混。

### 4.5 创建 Btrfs 子卷

**推荐：Snapper 布局**

```bash
mount -t btrfs -o compress=zstd /dev/nvmeXnYpB /mnt
btrfs subvolume create /mnt/@
btrfs subvolume create /mnt/@home
btrfs subvolume create /mnt/@snapshots
btrfs subvolume create /mnt/@home_snapshots
btrfs subvolume create /mnt/@var_log
btrfs subvolume create /mnt/@var_cache
btrfs subvolume create /mnt/@var_tmp

# 只有要用 swapfile 时才创建 @swap。
# btrfs subvolume create /mnt/@swap
btrfs subvolume list -p /mnt
umount /mnt
```

这样分子卷是为了把“需要回滚的内容”和“变化很快、不该反复进快照的内容”分开：

- `@`：系统根目录，用于系统回滚。
- `@home`：用户数据，和系统根分开快照，避免回滚系统时误动个人文件。
- `@snapshots`：root 的快照目录，作为顶层子卷挂到 `/.snapshots`，不能放在 `@` 里面。
- `@home_snapshots`：home 的快照目录，作为顶层子卷挂到 `/home/.snapshots`。
- `@var_log`、`@var_cache`、`@var_tmp`：日志、包缓存、临时文件变化频繁，单独挂载后不会被根快照反复带进去。
- `@swap`：只有使用 swapfile 时才需要，用来避免活跃 swapfile 影响 Btrfs 快照。

`compress=zstd` 表示启用 zstd 透明压缩；不写等级时默认就是 `zstd:3`，压缩率和 CPU 开销比较均衡，适合桌面系统长期使用。通常没必要把等级调高，空间收益有限，CPU 开销会变大。

**可选：Timeshift 布局**

Timeshift 保持 Ubuntu 风格子卷即可：

```bash
mount -t btrfs -o compress=zstd /dev/nvmeXnYpB /mnt
btrfs subvolume create /mnt/@
btrfs subvolume create /mnt/@home

# 只有要用 swapfile 时才创建 @swap。
# btrfs subvolume create /mnt/@swap
btrfs subvolume list -p /mnt
umount /mnt
```

如果创建了独立 `/boot` 分区，Btrfs 根分区可能是 `/dev/nvmeXnYpC`，这里同样把 `/dev/nvmeXnYpB` 改成真实的 Btrfs 根分区。

### 4.6 挂载（顺序重要，从根开始）

```bash
# 挂根
mount -t btrfs -o subvol=/@,compress=zstd /dev/nvmeXnYpB /mnt

# 挂 home
mkdir /mnt/home
mount -t btrfs -o subvol=/@home,compress=zstd /dev/nvmeXnYpB /mnt/home

# Snapper 布局：挂 root / home 各自的快照顶层子卷
mkdir -p /mnt/.snapshots /mnt/home/.snapshots
mount -t btrfs -o subvol=/@snapshots,compress=zstd /dev/nvmeXnYpB /mnt/.snapshots
mount -t btrfs -o subvol=/@home_snapshots,compress=zstd /dev/nvmeXnYpB /mnt/home/.snapshots

# Snapper 布局：挂 var 里的高变化目录
mkdir -p /mnt/var/log /mnt/var/cache /mnt/var/tmp
mount -t btrfs -o subvol=/@var_log,compress=zstd /dev/nvmeXnYpB /mnt/var/log
mount -t btrfs -o subvol=/@var_cache,compress=zstd /dev/nvmeXnYpB /mnt/var/cache
mount -t btrfs -o subvol=/@var_tmp,compress=zstd /dev/nvmeXnYpB /mnt/var/tmp

# 挂 swapfile 专用子卷，如果用 swapfile
# mkdir /mnt/swap
# mount -t btrfs -o subvol=/@swap,nodatacow /dev/nvmeXnYpB /mnt/swap

# 挂 EFI（复用 Windows 的）到 /efi
mkdir -p /mnt/efi
mount /dev/nvmeXnYpA /mnt/efi
```

如果选 Timeshift 布局，跳过 `@snapshots`、`@home_snapshots`、`@var_log`、`@var_cache`、`@var_tmp` 这些挂载，只挂 `/`、`/home` 和 `/efi`。`@swap` 只有创建 swapfile 时才挂。

分区编号不同的话，按 `lsblk -f` 实际看到的替换。

如果上一步建了可选的独立 swap 分区，再启用它：

```bash
swapon /dev/nvmeXnYpZ
```

确认：

```bash
df -h
free -h
```

---

## 第五部分：安装基础系统

### 5.1 pacstrap 拉包

```bash
pacstrap /mnt base base-devel linux linux-firmware btrfs-progs
pacstrap /mnt networkmanager vim sudo zsh zsh-completions
```

> 遇到 GPG 错误多半是镜像过时：`pacman -S archlinux-keyring` 之后重试。

`btrfs-progs`（否则进系统挂不了 Btrfs）和 `networkmanager`（否则进系统连不上网）这两个包千万别漏装。

可选其他内核：

```bash
pacstrap /mnt linux-zen linux-zen-headers   # 桌面响应优化
pacstrap /mnt linux-lts linux-lts-headers   # 更保守，适合兜底
pacstrap /mnt linux-hardened linux-hardened-headers # 安全加固取向，兼容性略差
```

默认的 `linux` 已经够用了。

### 5.2 生成 fstab

```bash
genfstab -U /mnt > /mnt/etc/fstab
cat /mnt/etc/fstab           # 复查一下，默认应该有 / /home /efi 三条。
```

### 5.3 进入新系统

```bash
arch-chroot /mnt
```

提示符变样后，**你已经身处新系统** 了，下文的命令都在 chroot 环境里跑。

### 5.4 主机名与 hosts

```bash
echo 'arch' > /etc/hostname # arch 是主机名，可以改
```

```bash
vim /etc/hosts
```

写入：

```
127.0.0.1   localhost
::1         localhost
127.0.1.1   arch.localdomain arch
```

> 这里的 arch 是主机名，跟 hostname 保持一致。

### 5.5 时区与硬件时钟

```bash
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
hwclock --systohc
```

### 5.6 Locale

```bash
vim /etc/locale.gen
```

把 `en_US.UTF-8 UTF-8` 和 `zh_CN.UTF-8 UTF-8` 前面的 `#` 去掉，保存。

```bash
locale-gen
echo 'LANG=en_US.UTF-8' > /etc/locale.conf
```

> ⚠️ 这里 **只是临时** 用 `en_US.UTF-8`。当前还在 TTY 里跑，把 `LANG` 设成 `zh_CN.UTF-8` 会因为 TTY 字体没有中文字形而显示成方块。进了桌面之后再切到 `zh_CN.UTF-8` 不影响（桌面环境一般通过区域设置覆盖系统 locale，不会动到 TTY）。

### 5.7 root 密码

```bash
passwd root
```

输入时不会显示字符，这是正常现象。

### 5.8 微码

```bash
pacman -S intel-ucode     # Intel CPU
pacman -S amd-ucode       # AMD CPU
```

---

## 第六部分：安装双系统引导（GRUB + os-prober）

本指南选 GRUB。其他可选引导器还有：

- `limine`：配置直观、轻量、启动快。
- `systemd-boot` / `system-boot`：极简，适合只引导 Linux 或愿意自己手写 loader entry 的用户；通常要求内核 / initramfs 放在 ESP 或 XBOOTLDR。
- `rEFInd`：自动扫描 EFI 程序，界面友好，适合多系统；配置方式和 GRUB 不一样。

### 6.1 装包

```bash
pacman -S grub efibootmgr os-prober
```

- `grub`：引导器本体
- `efibootmgr`：写 NVRAM 启动项
- `os-prober`：让 GRUB 自动识别 Windows Boot Manager

只装 Arch 时可以不装 `os-prober`，装了也没坏处。多硬盘双系统下，如果 Windows 在另一块盘上，`os-prober` 要等进系统后、所有相关分区都能被探测到时，再跑一次 `grub-mkconfig`。

### 6.2 把 GRUB 装到 EFI 分区

```bash
grub-install --target=x86_64-efi --efi-directory=/efi --bootloader-id=ARCH
```

`--efi-directory` 指向刚才挂载 Windows ESP 的位置。`ARCH` 是自己起的名字，想换也行。安装完后 `grubx64.efi` 会出现在 `/efi/EFI/ARCH/` 下，和 Windows 自己的 `/efi/EFI/Microsoft/` 互不干扰。

只装 Arch 或 Arch 盘自建 ESP 的情况下，`--efi-directory=/efi` 不变；区别只是 `/efi` 挂载的是你新建的 ESP，而不是 Windows 的 ESP。

### 6.3 修改 GRUB 默认配置

```bash
vim /etc/default/grub
```

要调整三处：

1. 把 `GRUB_CMDLINE_LINUX_DEFAULT="loglevel=3 quiet"` 改成
   `GRUB_CMDLINE_LINUX_DEFAULT="loglevel=5 nowatchdog"`
   - 去掉 `quiet`、把 `loglevel` 调到 `5`：启动时 NOTICE / WARNING 都可见，新装机排错最有用的级别
   - `nowatchdog` 关掉通用看门狗，关机会快几秒
   - 如果仍然看到硬件 watchdog 模块被加载，可以再 blacklist 对应模块：
     - AMD 平台常见：`modprobe.blacklist=sp5100_tco`
     - Intel 平台常见：`modprobe.blacklist=iTCO_wdt`
     - 例如 AMD：`GRUB_CMDLINE_LINUX_DEFAULT="loglevel=5 nowatchdog modprobe.blacklist=sp5100_tco"`
     - 例如 Intel：`GRUB_CMDLINE_LINUX_DEFAULT="loglevel=5 nowatchdog modprobe.blacklist=iTCO_wdt"`
     - 重启后检查：
       ```bash
       lsmod | grep -E 'watchdog|iTCO_wdt|sp5100_tco'
       journalctl -b | grep -i watchdog
       ```
       如果还能看到 `iTCO_wdt` 或 `sp5100_tco`，说明对应硬件 watchdog 模块仍在加载。
2. **加一行** 让 os-prober 启用，从而引导 Windows：
   ```
   GRUB_DISABLE_OS_PROBER=false
   ```
   只装 Arch 时可以跳过这一行。
3. 联想小新 / YOGA 14s 2021 一类机型如果出现键盘失灵，再加 `i8042.dumbkbd`。

### 6.4 生成最终配置

```bash
grub-mkconfig -o /boot/grub/grub.cfg
```

输出里看到类似：

```
Found Windows Boot Manager on /dev/nvmeXnYpA@/EFI/Microsoft/Boot/bootmgfw.efi
```

就说明 Windows 已经被识别，GRUB 菜单里会出现 Windows 条目。

> 如果 Windows 装在另一块物理硬盘上，chroot 里的 `os-prober` 可能识别不到。先继续往下装，进入系统后确认能看到 Windows 盘，再 `sudo grub-mkconfig -o /boot/grub/grub.cfg` 一次。

> 某些主板（比如部分微星 Z170）不认自定义 EFI 名，GRUB 引导项可能不出现。重新挂载并 chroot 后追加 `--removable` 参数：
> `grub-install --target=x86_64-efi --efi-directory=/efi --bootloader-id=ARCH --removable`

### 6.5 退出、卸载、重启

```bash
exit                # 退出 chroot
umount -R /mnt
reboot
```

**重启前先拔 U 盘**，不然又会进安装环境。

---

## 第七部分：第一次进入新系统

GRUB 菜单里应该能看到 `Arch Linux` 和 `Windows Boot Manager` 两个条目。如果还没关闭 BitLocker / 设备加密，第一次进 Windows 可能会要求恢复密钥；建议进 Windows 后暂停或关闭加密，等双系统稳定运行后再决定要不要重新启用。

进入 Arch 后用 `root` 登录，接着：

### 7.1 启用网络

```bash
systemctl enable --now NetworkManager
```

无线连接：

```bash
nmcli dev wifi list
nmcli dev wifi connect "SSID" password "你的密码"
# 或者交互式
nmtui
```

### 7.2 配置 swap

桌面 / 笔记本日常优先用 `zram`。它在内存里开一块压缩 swap，不写磁盘，通常比传统 swap 分区更适合桌面场景。

```bash
pacman -S zram-generator
vim /etc/systemd/zram-generator.conf
```

写入：

```ini
[zram0]
zram-size = ram / 2
compression-algorithm = zstd
swap-priority = 100
```

启用：

```bash
systemctl daemon-reload
systemctl start systemd-zram-setup@zram0.service
swapon --show
```

`zram-size` 是 zram 设备的最大容量，不是开机后立刻占掉这么多物理内存；真正占用取决于实际换出量和压缩率。桌面日常可以按物理内存大小这样选：

| 物理内存 | 推荐 `zram-size` | 配置写法示例 | 说明 |
| -------- | ---------------- | ------------ | ---- |
| 4G       | 4G 或 `ram`      | `zram-size = ram` | 内存很紧张，给足一点能减少卡死概率，但别指望替代加内存 |
| 8G       | 4G 到 8G         | `zram-size = ram / 2` 或 `zram-size = ram` | 普通轻办公用一半；浏览器标签多、IDE 多就给到等于内存 |
| 16G      | 8G              | `zram-size = ram / 2` | 最通用的桌面 / 笔记本选择 |
| 32G      | 8G，重负载可到 16G | `zram-size = ram / 4` | 日常没有必要给 16G；只有长期跑虚拟机、容器、大编译、大型 IDE 时再考虑 `ram / 2` |
| 64G 及以上 | 8G 到 16G      | `zram-size = 16G` | 内存很大时没必要按比例继续放大，固定上限更清楚 |

拿不准就用上面的默认值 `zram-size = ram / 2`；32G 内存机器更建议先用 `ram / 4`，也就是 8G。只有机器经常在内存压力下卡死、或者 `swapon --show` 里 zram 经常接近用满，才把 zram 调大一档；如果 zram 长期几乎不用，调小也可以。

zram 不是越大越好。设得太大时，系统可能把更多冷数据留在压缩内存里，换来额外 CPU 压缩 / 解压开销；内存真的不够时，也可能拖慢 OOM 触发，让机器长时间卡顿而不是尽快杀掉占内存的进程。zram 只解决内存压力下的临时换出，不支持休眠。

确认 zram 状态可以看：

```bash
zramctl
swapon --show
```

可选：如果你只想保留 zram，不想让 zswap 也参与交换路径，可以在 GRUB 启动参数里追加：

```ini
zswap.enabled=0
```

然后重新生成 GRUB 配置：

```bash
grub-mkconfig -o /boot/grub/grub.cfg
```

重启后用下面的命令确认：

```bash
cat /sys/module/zswap/parameters/enabled
```

输出 `N` 就表示 zswap 没启用。大多数桌面用户只需要 zram 这一层，配置更简单。

**可选：swapfile**

要磁盘 swap、但又不想重新分区，用 swapfile。Btrfs 上不要把 swapfile 放在根子卷 `/`，否则会影响根快照；本指南单独把 `@swap` 挂到 `/swap`：

```bash
# 8G 是示例，按需调整；要休眠就 >= 物理内存
btrfs filesystem mkswapfile --size 8G /swap/swapfile
swapon /swap/swapfile
echo '/swap/swapfile none swap defaults 0 0' >> /etc/fstab
```

大小按需求改。`/swap` 是独立子卷，不纳入根快照，避免 Snapper / Timeshift 被活跃 swapfile 卡住。要休眠的话，swapfile 大小要接近物理内存，再额外配置 `resume`。

**不推荐：独立 swap 分区**

仅当你按第四部分已经建好独立 swap 分区时才用：

```bash
mkswap /dev/nvmeXnYpZ
swapon /dev/nvmeXnYpZ
```

然后确认 `/etc/fstab` 里有对应 UUID。没有就用 `blkid /dev/nvmeXnYpZ` 查 UUID，手动追加一行：

```fstab
UUID=<swap-uuid> none swap defaults 0 0
```

**可选：启用休眠到磁盘**

`zram` 不能用来休眠。要想 hibernate，必须额外准备 **磁盘 swap**：优先用 `/swap/swapfile`，大小建议 ≥ 物理内存；已有独立 swap 分区也可以。

先确认 initramfs 里有 `resume` hook：

```bash
vim /etc/mkinitcpio.conf
```

找到 `HOOKS=(...)`，把 `resume` 放在 `udev` 后、`filesystems` 前，例如：

```ini
HOOKS=(base udev autodetect microcode modconf kms keyboard keymap consolefont block resume filesystems fsck)
```

然后按 swap 类型配置 GRUB。

如果用 **swapfile**：

```bash
findmnt -no UUID -T /swap/swapfile
btrfs inspect-internal map-swapfile -r /swap/swapfile
```

记下第一条命令输出的 Btrfs 文件系统 UUID，以及第二条命令输出的 offset。编辑：

```bash
vim /etc/default/grub
```

在 `GRUB_CMDLINE_LINUX_DEFAULT` 里追加：

```ini
resume=UUID=<btrfs-uuid> resume_offset=<offset>
```

如果用 **独立 swap 分区**：

```bash
blkid /dev/nvmeXnYpZ
```

记下 swap 分区 UUID，在 `GRUB_CMDLINE_LINUX_DEFAULT` 里追加：

```ini
resume=UUID=<swap-uuid>
```

最后重建 initramfs 和 GRUB 配置：

```bash
mkinitcpio -P
grub-mkconfig -o /boot/grub/grub.cfg
systemctl hibernate
```

机器关机后再开机，能恢复到休眠前的状态就算成功。失败时先把 GRUB 里的 `resume...` 参数去掉，再回头检查 UUID、offset、swap 大小和 `HOOKS` 顺序。

### 7.3 看一眼系统信息

```bash
pacman -S fastfetch
fastfetch
```

到这一步，一个 **最小可用的 Arch Linux** 就装好了。

---

## 第八部分：安装桌面环境

到这一步系统还只有 TTY 命令行。本节装图形桌面，**默认走 KDE Plasma**，再顺带介绍几个其他常见选择（GNOME / Cinnamon / Xfce / Hyprland / Niri / Sway·i3）。

DE 和 WM 其实可以同时装多套，SDDM / GDM 会在登录时让你选会话。不过混装可能带来 GTK/Qt 主题不一致、portal 冲突等小问题，主力系统不建议长期混用。

### 8.1 前置准备（任意桌面都要做）

#### 8.1.1 创建普通用户

用 root 长期跑桌面是个坏习惯。先建一个普通用户，加进 `wheel` 组，给它 sudo 权限。

```bash
useradd -m -G wheel -s /bin/bash myusername
passwd myusername
EDITOR=vim visudo
```

在 visudo 里去掉 `%wheel ALL=(ALL:ALL) ALL` 前的 `#`，保存退出。

想把默认 shell 从 Bash 换成 Zsh，有两种做法：

```bash
# 创建用户时直接指定
useradd -m -G wheel -s /bin/zsh myusername

# 已经创建过用户，事后再改
chsh -s /bin/zsh myusername
```

改完重新登录就能生效。要确认可用 shell 路径，先看 `/etc/shells`；比如 `chsh -s /usr/bin/fish myusername` 也是一样的用法。

#### 8.1.2 开启 multilib 和 archlinuxcn 源

```bash
vim /etc/pacman.conf
```

要改三处：

1. 在 `[options]` 一节里取消这几项注释：

   ```ini
   Color
   ParallelDownloads = 5
   VerbosePkgLists
   ```

   - `Color`：让 pacman 输出带颜色，可读性更好。
   - `ParallelDownloads = 5`：同时下载 5 个包，大版本更新会快不少；网络不稳定时可以改小，比如 `3`。
   - `VerbosePkgLists`：升级前显示旧版本、新版本和下载大小，方便确认这次到底更新了什么。

   不要乱改 `SigLevel`、`LocalFileSigLevel`、`RemoteFileSigLevel`。这些控制软件包签名校验，改错会降低安全性或导致包无法安装。
2. 去掉 `[multilib]` 一节那两行前面的 `#`（32 位库，Steam 等要用）。
3. 在文件末尾追加 archlinuxcn：

```
[archlinuxcn]
Server = https://mirrors.ustc.edu.cn/archlinuxcn/$arch
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch
```

刷新数据库、装密钥、装 AUR helper：

```bash
pacman -Syyu
pacman -S archlinuxcn-keyring     # cn 源的 GPG 密钥
pacman -S yay                     # AUR helper
```

> 如果 `archlinuxcn-keyring` 装不上提示 `marginal trust`：
> 先执行 `sudo pacman-key --lsign-key "farseerfc@archlinux.org"` 再装。

### 8.2 通用桌面基础包

下面这些不属于某个具体桌面，但大多数桌面系统都会用到。还在 chroot / root TTY 里时不需要 `sudo`；已经切到普通用户后就在命令前加 `sudo`。

```bash
# 让 sudoedit、visudo、git 等工具默认调用 vim，而不是找不到 vi
echo 'EDITOR=vim' >> /etc/environment

# 声音固件、PipeWire 声音服务
pacman -S sof-firmware alsa-ucm-conf alsa-firmware
pacman -S pipewire wireplumber pipewire-pulse pipewire-alsa pipewire-jack

# 常用字体、NTFS 读写、Flatpak
pacman -S noto-fonts noto-fonts-cjk noto-fonts-emoji ttf-jetbrains-mono-nerd
pacman -S ntfs-3g flatpak
```

PipeWire 是用户服务，装完后通常会在进入桌面会话时自动由 systemd user socket 拉起。进桌面后如果没声音，再用普通用户执行：

```bash
systemctl --user enable --now pipewire pipewire-pulse wireplumber
```

有蓝牙设备再装并启用蓝牙：

```bash
pacman -S bluez bluez-utils
systemctl enable --now bluetooth
```

Flatpak 默认不一定带 Flathub 源，想用 Flatpak 软件先加源：

```bash
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
```

国内网络访问 Flathub 慢时，可以换成镜像：

```bash
flatpak remote-modify flathub --url=https://mirror.sjtu.edu.cn/flathub
# 或者
flatpak remote-modify flathub --url=https://mirrors.ustc.edu.cn/flathub
```

### 8.3 默认方案：KDE Plasma

KDE Plasma 是基于 Qt 的现代桌面，布局类 Windows（任务栏、开始菜单、系统托盘），开箱即用程度高、可调项也多，从 Windows 迁过来阻力较小。

#### 8.3.1 安装

```bash
pacman -S plasma-meta konsole dolphin sddm
```

- `plasma-meta`：KDE Plasma 元包，包含合成器、面板、系统设置等
- `konsole`：默认终端
- `dolphin`：默认文件管理器
- `sddm`：默认 greeter

KDE 默认走 X11 会话。要用 Wayland 再追加：

```bash
pacman -S plasma-workspace xdg-desktop-portal xdg-desktop-portal-kde
# N 卡用户再加: pacman -S egl-wayland
```

登录界面会同时列出 Plasma (X11) 和 Plasma (Wayland) 两个会话，按需选。

#### 8.3.2 启用 SDDM

```bash
systemctl enable sddm
reboot
# 或者不重启
# systemctl enable --now sddm
```

重启后用 8.1.1 建的普通用户名 + 密码登录，就能看到 Plasma 桌面了。

#### 8.3.3 进桌面后的 KDE 补充包

打开 Konsole：

```bash
# 浏览器 / 压缩 / 看图
sudo pacman -S firefox chromium ark gwenview

# Discover（KDE 软件中心）需要
sudo pacman -S packagekit-qt6 packagekit appstream-qt appstream
```

#### 8.3.4 中文输入法（fcitx5）

```bash
sudo pacman -S fcitx5-im fcitx5-chinese-addons
```

如果要使用 Rime：

```bash
sudo pacman -S fcitx5-im fcitx5-rime
```

> `fcitx5-im` 是元包（含 fcitx5、配置工具、Qt/GTK 模块）。
>
> `fcitx5-chinese-addons` 提供 Fcitx 5 自带的智能拼音 / 双拼 / 五笔等方案，配置少、开箱即用，但词库和现代化程度不如雾凇 / 万象之类的 Rime 社区方案。
>
> Rime 是一个 **输入法引擎**，本身只附带几个比较粗糙的基础方案；真正好用的是上层的社区配置（雾凇拼音 / 万象拼音 等），见 12.10。

环境变量：

```bash
mkdir -p ~/.config/environment.d
cat > ~/.config/environment.d/im.conf <<'EOF'
GTK_IM_MODULE=fcitx
QT_IM_MODULE=fcitx
XMODIFIERS=@im=fcitx
SDL_IM_MODULE=fcitx
EOF
```

> 走 Wayland 的话只保留 `XMODIFIERS=@im=fcitx` 一行，并在「系统设置 → 输入设备 → 虚拟键盘」里把 Fcitx 5 设为默认；Chromium / Electron 类程序额外加启动参数 `--enable-features=UseOzonePlatform --ozone-platform=wayland --enable-wayland-ime`。

注销重登；进「系统设置 → 区域设置 → 输入法」→ 添加 **Rime** 或 **Pinyin**。`Ctrl+空格` 切换中英文。

选的是 Rime 的话，下一步建议换成更现代的社区方案（雾凇拼音 / 万象拼音），见 **12.10 输入法补充**。

#### 8.3.5 把系统语言改成中文

系统设置 → 区域设置 → 语言 → Add languages → 选「中文」拖到第一位 → Apply → 注销重登。

> **不要** 改 `Formats` 里的值，保持 `en_US` 或 `zh_CN` 即可，否则会出现「一半中文一半英文」的尴尬。

### 8.4 GNOME

GNOME 是 GTK 阵营的旗舰桌面。工作流跟其他桌面差别明显：**没有传统任务栏**，靠 Super 键唤起活动概览 + 动态工作区串起来；触屏 / 触控板手势体验好；可定制性弱，需要 GNOME Extensions 来补。

```bash
pacman -S gnome gnome-tweaks            # 核心
pacman -S gnome-extra                   # 可选：附带更多 GNOME 应用
systemctl enable gdm                    # 配套的 greeter
```

- 默认终端：`gnome-terminal`（或较新版本里的 `kgx` / Console）
- 默认文件管理器：`nautilus`（汉化叫「文件」）
- 默认走 Wayland 会话

#### 8.4.1 中文输入法（ibus）

GNOME 跟 ibus 集成最深，**GNOME 下优先用 ibus，不建议照搬 KDE 小节里的 fcitx5 环境变量**。

```bash
pacman -S ibus ibus-libpinyin
```

如果要使用 Rime：

```bash
pacman -S ibus ibus-rime
```

注销重登后，进「设置 → 键盘 → 输入源」添加 **Chinese (Rime)** 或 **Chinese (Intelligent Pinyin)**。GNOME 会通过 ibus 自己接管输入法，不需要额外写 `GTK_IM_MODULE` / `QT_IM_MODULE` / `XMODIFIERS`。

### 8.5 Cinnamon

Cinnamon 是 Linux Mint 团队从 GNOME 3 早期 fork 出来的桌面，保留了「任务栏 + 开始菜单 + 系统托盘」的传统布局，注重稳定和易用，是 Windows 移民最熟悉的那种界面。

```bash
pacman -S cinnamon
pacman -S lightdm lightdm-gtk-greeter   # 配套显示管理器
systemctl enable lightdm
```

- 默认终端：`gnome-terminal`（Cinnamon 没自带，借用 GNOME 的）
- 默认文件管理器：`nemo`

### 8.6 Xfce

老牌轻量级桌面，GTK 2/3 混编，资源占用低，对老硬件和虚拟机非常友好。面板可以任意拖动摆放，布局自由。外观比较老派。

```bash
pacman -S xfce4 xfce4-goodies
pacman -S lightdm lightdm-gtk-greeter
systemctl enable lightdm
```

- 默认终端：`xfce4-terminal`
- 默认文件管理器：`thunar`

### 8.7 Hyprland

从这里开始进入 **窗口管理器（WM）** 的世界 —— 不再是「装一个包就齐活」，而是要自己把状态栏、launcher、终端、锁屏、壁纸、portal 一件件拼起来。

Hyprland 是基于 wlroots 的动态平铺 Wayland 合成器，主打 **视觉特效** （毛玻璃、动画、过渡曲线）和 **高可配性**。配置文件驱动（`~/.config/hypr/hyprland.conf`），社区活跃。

最小一套：

```bash
pacman -S hyprland kitty wofi waybar    # 合成器 + 终端 + 启动器 + 状态栏
pacman -S hyprpaper hypridle hyprlock   # 壁纸 / 空闲 / 锁屏（Hyprland 生态自家组件）
pacman -S xdg-desktop-portal-hyprland   # 截图 / 录屏 / 文件选择对话框
pacman -S polkit-kde-agent              # 图形 polkit 鉴权（弹密码框）
```

不带显示管理器也能用：在 TTY 登录后直接 `hyprland` 即可。需要 greeter 的话 `pacman -S sddm; systemctl enable sddm`，SDDM 会自动识别 Hyprland 会话。

### 8.8 Niri

Niri 是相对比较新的 **卷动式（scrollable）平铺** Wayland 合成器，灵感来自 GNOME 的 PaperWM 扩展。**没有传统工作区或 master/stack 概念**，所有窗口排在一条无限长的水平卷轴上，左右滚动浏览。

```bash
pacman -S niri waybar fuzzel alacritty
pacman -S xdg-desktop-portal-gnome      # niri 官方推荐配 GNOME 的 portal
```

进 TTY 后直接 `niri-session` 启动；也能被 SDDM / GDM 识别。

### 8.9 Sway / i3

**i3** 是 X11 上的经典手动平铺 WM，2009 年发布，文档清晰、配置简单（一个文本文件搞定）、生态最成熟，多年来几乎是 Linux WM 教学的标准教材。

**Sway** 是 Wayland 上的 i3 兼容实现，i3 配置文件几乎可以直接复用（差异主要在输入设备和输出配置）。

```bash
# Wayland 路线（推荐）
pacman -S sway swaylock swayidle waybar wofi foot
pacman -S xdg-desktop-portal-wlr

# X11 路线
pacman -S i3-wm i3status i3lock dmenu rxvt-unicode xorg-server xorg-xinit
```

启动：

- Sway：TTY 登录后输入 `sway`
- i3：先在 `~/.xinitrc` 写 `exec i3`，然后 `startx`

---

## 第九部分：Btrfs 快照与 grub-btrfs

Btrfs 最大的好处之一就是 **原生快照** —— 想折腾之前先拍一张，搞挂了一键回滚。本节推荐 `snapper`，它更贴近 Arch / openSUSE 风格，命令行和自动快照都比较清晰；如果更想要图形界面和向导，也可以选 `timeshift`。但同一个根分区 **不要混着两种工具管**。

### 9.1 先删掉 fstab 里的 subvolid

```bash
sudo sed -i -E 's/(subvolid=[0-9]+,)|(,subvolid=[0-9]+)//g' /etc/fstab
```

子卷除了名字（`subvol=@`），还有一个数字 ID（`subvolid=256`）。回滚工具可能会新建一个同名子卷，但 ID 跟原来不一样。如果 fstab 用 `subvolid=` 挂载，下次开机就找不到根分区，会卡在 emergency shell。删掉 subvolid，只按名字 `subvol=@` 挂载，回滚之后才能正常开机。

### 9.2 推荐方案：Snapper

安装：

```bash
sudo pacman -S snapper snap-pac
# 可选图形界面 / 辅助工具
sudo pacman -S btrfs-assistant

# root 快照：使用顶层 @snapshots
sudo umount /.snapshots
sudo rmdir /.snapshots
sudo snapper -c root create-config /
sudo btrfs subvolume delete /.snapshots
sudo mkdir /.snapshots
sudo mount /.snapshots
sudo chmod 750 /.snapshots

# home 快照：使用顶层 @home_snapshots
sudo umount /home/.snapshots
sudo rmdir /home/.snapshots
sudo snapper -c home create-config /home
sudo btrfs subvolume delete /home/.snapshots
sudo mkdir /home/.snapshots
sudo mount /home/.snapshots
sudo chmod 750 /home/.snapshots
```

- `snapper`：快照管理本体
- `snap-pac`：每次 `pacman` 安装 / 升级 / 删除包前后自动创建快照
- `btrfs-assistant`：图形化管理 Snapper / Btrfs 的工具，适合进桌面后查看和恢复快照；命令行用户可以不装

前面已经创建并在 `/etc/fstab` 里记录了顶层子卷 `@snapshots` 和 `@home_snapshots`。这里先让 Snapper 生成配置，再删掉它临时创建的嵌套 `.snapshots` 子卷，最后把顶层快照子卷挂回来。这样 root 和 home 的快照彼此独立，根子卷 `@` 回滚时也不会把快照目录本身一起回滚。

编辑配置：

```bash
sudo vim /etc/snapper/configs/root
sudo vim /etc/snapper/configs/home
```

建议先改这几项，避免快照无限堆积：

```ini
TIMELINE_CREATE="yes"
TIMELINE_LIMIT_HOURLY="10"
TIMELINE_LIMIT_DAILY="10"
TIMELINE_LIMIT_WEEKLY="0"
TIMELINE_LIMIT_MONTHLY="0"
TIMELINE_LIMIT_YEARLY="0"
NUMBER_LIMIT="20"
NUMBER_LIMIT_IMPORTANT="10"
```

启用定时快照和自动清理：

```bash
sudo systemctl enable --now snapper-timeline.timer snapper-cleanup.timer
```

立刻拍第一张：

```bash
sudo snapper -c root create --description "desktop-installed-before-graphics-driver"
sudo snapper -c home create --description "desktop-installed-before-graphics-driver"
sudo snapper -c root list
sudo snapper -c home list
```

### 9.3 可选方案：Timeshift

Timeshift 更适合想要图形界面的人，配置少、上手快：

```bash
sudo pacman -S timeshift
sudo systemctl enable --now cronie       # Timeshift 用 cron 跑定时快照
```

打开 Timeshift（或在终端跑 `sudo timeshift-gtk`），首次会有个向导：

1. **快照类型**：选 `BTRFS`
2. **快照位置**：选装 Arch 的那块 Btrfs 分区
3. **快照计划**：按需勾选 每小时 / 每天 / 每周 / 每月 以及保留张数
4. **要快照的子卷**：`@`（根）必选；想连家目录一起快照就勾上 `@home`
5. 完成

> Timeshift **只认 Ubuntu 风格的子卷布局** （`@` / `@home`）。
>
> 如果用 `ext4` 则选 `RSYNC`。

### 9.4 立刻拍第一张快照

用 Snapper 的话前面已经拍过了。后续可以随时：

```bash
sudo snapper -c root create --description "before-risky-change"
sudo snapper -c home create --description "before-risky-change"
sudo snapper -c root list
sudo snapper -c home list
```

用 Timeshift 的话，GUI → 点 **Create** → 描述填「桌面装完、装显卡驱动前」之类 → 等几秒搞定。

Timeshift 命令行：

```bash
sudo timeshift --create --comments "before-graphics-driver" --tags D
sudo timeshift --list
```

### 9.5 配 grub-btrfs（启动菜单里直接进快照）

```bash
sudo pacman -S grub-btrfs inotify-tools
sudo systemctl enable --now grub-btrfsd.service
```

用 Snapper 的话，`grub-btrfsd` 默认监视 `/.snapshots`，通常不用改。之后每次创建 root 快照，`grub-btrfsd` 会自动跑 `grub-mkconfig`，把 root 快照塞进 GRUB 启动菜单。home 快照用于恢复用户文件，不会作为可启动系统出现在 GRUB 里。

用 Timeshift 的话，需要改成监视 Timeshift：

```bash
sudo systemctl edit grub-btrfsd.service
```

在打开的编辑器空白处粘贴：

```
[Service]
ExecStart=
ExecStart=/usr/bin/grub-btrfsd --syslog --timeshift-auto
```

保存退出，然后：

```bash
sudo systemctl daemon-reload
sudo systemctl restart grub-btrfsd.service
```

### 9.6 怎么用：回滚

**还能进桌面**：

- Snapper：`sudo snapper -c root list` 或 `sudo snapper -c home list` 找编号，再用 `sudo snapper -c <配置名> undochange <旧编号>..<新编号>` 回退文件级变更；完整根回滚建议从安装盘 chroot 进去处理
- Timeshift：打开 Timeshift → 选目标快照 → Restore → 重启

**进不去桌面 / 黑屏**：

1. 开机时在 GRUB 菜单选 `Arch Linux snapshots`，再选要恢复的那张快照进去
2. 这个快照默认 **只读** 挂载，先在里面检查一下，确认是想要回滚的那张
3. 用 Timeshift 的话，跑：
   ```bash
   sudo timeshift --list                    # 找到快照名
   sudo timeshift --restore --snapshot '2026-05-19_22-00-01' # 例子
   ```
   或者在 Timeshift GUI 里点 Restore。
4. 用 Snapper 的话，优先从安装 U 盘进安装环境，按第四部分挂载根分区后 `arch-chroot /mnt`，再根据 `sudo snapper -c root list` 或 `sudo snapper -c home list` 的编号回滚
5. 重启

> 进阶：装上 `grub-btrfs-overlayfs` initramfs hook 之后，只读快照启动时所有写操作会自动重定向到内存（overlayfs），用起来像 live-cd，不会污染快照本身。

### 9.7 游戏库和大目录不要进快照

Steam 游戏库、虚拟机镜像、下载缓存这类目录很大，而且变化频繁。把它们放进 `@home` 快照里，会让快照占用迅速膨胀；更好的做法是单独建一个和 `@home` 平级的 Btrfs 子卷，再挂到对应目录。

以 Steam 默认库 `~/.local/share/Steam/steamapps` 为例：

```bash
# 挂载 Btrfs 顶层子卷；把设备名换成你的根分区
sudo mount -o subvolid=5 /dev/nvmeXnYpB /mnt

# 新建独立子卷
sudo btrfs subvolume create /mnt/@steamgames

# 游戏库里大量大文件频繁改写，可选关闭 CoW；必须在目录为空时设置才干净
sudo chattr +C /mnt/@steamgames

sudo umount /mnt
```

如果已经有 Steam 游戏，先备份旧目录：

```bash
mv ~/.local/share/Steam/steamapps ~/.local/share/Steam/steamapps.bak
mkdir -p ~/.local/share/Steam/steamapps
```

然后在 `/etc/fstab` 里追加一行，UUID 用 `findmnt -no UUID /` 查。如果你前面用了 `chattr +C`，新写入的游戏文件不会走 CoW，也不会再透明压缩；这里保留 `compress=zstd` 是为了没有关闭 CoW 的情况。

```fstab
UUID=<btrfs-uuid> /home/<用户名>/.local/share/Steam/steamapps btrfs subvol=/@steamgames,compress=zstd 0 0
```

挂载并确认：

```bash
sudo systemctl daemon-reload
sudo mount -a
findmnt ~/.local/share/Steam/steamapps
```

确认没问题后，再把 `steamapps.bak` 里的内容搬回去。虚拟机镜像目录、容器数据目录也可以用同样思路处理：单独子卷、单独挂载、按需决定是否 `chattr +C`。

---

## 第十部分：显卡驱动

虚拟机和只有核显的台式机大多数情况下装好 `mesa` 就够了；但 NVIDIA 独显、双显卡笔记本、老 AMD APU 各有各的坑。本节按集显 / 独显 / 双显卡分开讲。

> 按第九部分的顺序，到这一步 **Snapper 或 Timeshift 应该已经配好并拍过快照** 了。装显卡驱动后黑屏并不罕见，有快照就能从 GRUB 滚回去。
>
> 黑屏不要慌：按 `Ctrl + Alt + F3`–`F6` 切到 TTY，从 TTY 里改回配置 / 卸载错误的包 / 回滚快照都行。笔记本可能要同时按 `Fn` 键。

### 10.1 Intel 核显

最省心的一档，开箱即用：

```bash
sudo pacman -S mesa lib32-mesa vulkan-intel lib32-vulkan-intel intel-media-driver
```

- `vulkan-intel`：Intel HD 4000 及之后支持 Vulkan
- `intel-media-driver`：硬件视频编解码（VAAPI），Broadwell 及之后；更老的 CPU 改用 `libva-intel-driver`
- **千万不要装** `xf86-video-intel`（已弃用，反而会带来卡顿/撕裂）。Xorg 用内置的 `modesetting` 就行

### 10.2 AMD 集显 / 独显

AMD 桌面端 **全部用开源驱动** 就行，按架构分两档：

- **GCN 3 及之后** （Polaris / Vega / RDNA，含锐龙 APU、所有 RX 系列）：用 **AMDGPU**
  ```bash
  sudo pacman -S mesa lib32-mesa vulkan-radeon lib32-vulkan-radeon libva-mesa-driver mesa-vdpau
  ```
- **GCN 2 及之前** （HD 5000–8000 系列、第一代 A 系列 APU）：用开源 **ATI**
  ```bash
  sudo pacman -S mesa lib32-mesa xf86-video-ati
  ```

> 不清楚架构？查显卡型号 → [TechPowerUp GPU 数据库](https://www.techpowerup.com/gpu-specs/) → 看 _Architecture_ 字段。
>
> 闭源 AMDGPU PRO（专业图形/计算才需要）和已弃用的 Catalyst 都不要装。

### 10.3 NVIDIA 独显

NVIDIA 在 Linux 下必须装专有驱动才能发挥正常性能。按显卡代际选包：

| 显卡代际                           | 推荐包                                                |
| ---------------------------------- | ----------------------------------------------------- |
| Turing（RTX 20 / GTX 16）及之后    | `nvidia-open`                                         |
| Maxwell – Pascal（GTX 9xx / 10xx） | `nvidia`                                              |
| Kepler（GTX 6xx / 7xx）            | 官方停止支持，用 `nvidia-470xx-dkms`<sup>aur</sup>    |
| Fermi（GTX 4xx / 5xx）             | 用 `nvidia-390xx-dkms`<sup>aur</sup>                  |
| 更老                               | 只能用开源 `xf86-video-nouveau`（性能差，能亮屏而已） |

主线推荐：

```bash
# Turing 及之后
sudo pacman -S nvidia-open nvidia-utils lib32-nvidia-utils nvidia-settings

# Maxwell – Pascal
sudo pacman -S nvidia nvidia-utils lib32-nvidia-utils nvidia-settings
```

> 跑非默认 `linux` 内核（`linux-zen` / `linux-lts` / `linux-hardened`）的话，把包名换成 dkms 版本：`nvidia` → `nvidia-dkms`，`nvidia-open` → `nvidia-open-dkms`。

装完之后改一下 mkinitcpio，避免和 nouveau 冲突：

```bash
sudo vim /etc/mkinitcpio.conf
# 找到 HOOKS 行，确保里面没有 "kms"。如果有，删掉它。
sudo mkinitcpio -P
```

重启生效。

#### 10.3.1 Wayland 下 N 卡

KDE / GNOME 上 N 卡 Wayland 在 565+ 驱动之后已经基本可用，但仍然需要：

1. 额外装 `egl-wayland`
2. 启用 `nvidia-drm.modeset=1`：编辑 `/etc/default/grub`，在 `GRUB_CMDLINE_LINUX_DEFAULT` 里追加 `nvidia-drm.modeset=1`，然后 `sudo grub-mkconfig -o /boot/grub/grub.cfg`

### 10.4 双显卡笔记本（Intel / AMD 核显 + NVIDIA 独显）

先 **按 10.1 / 10.2 + 10.3 各自装好两套驱动**。

> 老 Arch 教程里常见的 **`optimus-manager` 已经停止积极维护，也不支持 Wayland**。

#### 10.4.1 方案 A：PRIME render offload（默认推荐）

最轻量，无需切档。装好 `nvidia-prime` 之后用 `prime-run` 前缀启动需要独显的程序：

```bash
sudo pacman -S nvidia-prime
prime-run glxinfo | grep "OpenGL renderer"     # 验证一下：应该输出 NVIDIA
prime-run steam                                # 用独显跑 Steam
```

Steam 单游戏 → 属性 → 启动选项填 `prime-run %command%`。

KDE Plasma 6 / GNOME 在文件管理器和任务栏的应用右键菜单里都内置了「使用独显运行 / Launch using dedicated GPU」入口，比命令行前缀更顺手。

> AMD 独显 + AMD/Intel 核显的笔记本更简单：`DRI_PRIME=1 %command%`，不需要额外的包。

#### 10.4.2 方案 B：系统级 GPU 模式切换（按需切，重启生效）

PRIME offload 模式下独显仍处于待命状态，会有少量空载功耗。**想彻底关掉独显省电** 可以用下面两个工具之一（二选一，不要同时装）：

**supergfxctl** （来自 asus-linux 项目，通用，社区活跃）：

```bash
yay -S supergfxctl
sudo systemctl enable --now supergfxd
supergfxctl -g                        # 查看当前模式
sudo supergfxctl -m Integrated        # 切到仅核显（彻底关 dGPU）
sudo supergfxctl -m Hybrid            # 切到按需混合
sudo supergfxctl -m AsusMuxDgpu       # 切到仅独显（仅部分笔记本支持）
```

**envycontrol** （Python 写的轻量 CLI，配置最少）：

```bash
yay -S envycontrol
sudo envycontrol -s integrated        # 仅核显
sudo envycontrol -s hybrid            # 混合（等同 PRIME offload）
sudo envycontrol -s nvidia            # 仅独显
sudo envycontrol -q                   # 查询当前
```

两者切换之后 **都必须重启** 才能生效（系统级切换驱动加载）。日常推荐 `hybrid` 模式 + PRIME offload，电池续航在意时再切 `integrated`。

### 10.5 装完验证

```bash
sudo pacman -S mesa-utils vulkan-tools libva-utils
glxinfo | grep "OpenGL renderer"     # 看当前在用哪块 GPU
vulkaninfo --summary                 # 看 Vulkan 是否就绪
vainfo                               # 看 VAAPI 硬件视频编解码是否就绪
```

多显卡机器验证 NVIDIA VAAPI 时可以临时指定驱动：

```bash
LIBVA_DRIVER_NAME=nvidia vainfo
```

如果要跑 Blender、DaVinci Resolve、AI / GPGPU 之类的 OpenCL 任务，再额外装 OpenCL 运行时：

```bash
# NVIDIA
sudo pacman -S opencl-nvidia lib32-opencl-nvidia

# AMD / Intel 通用开源 OpenCL，需求不高时够用
sudo pacman -S opencl-mesa lib32-opencl-mesa
```

跑分可以装 `glmark2`（OpenGL）或 `vkmark`<sup>aur</sup>（Vulkan），都有图形界面的小测试。

---

## 第十一部分：功耗管理

> 台式机可以略过本节，直接跳第十二部分。
>
> 笔记本想要正常续航，**至少** 装一套电源管理工具。本指南默认用 `power-profiles-daemon`；只有想细调电池、阈值、无线省电时再换 TLP。几套电源管理工具不要叠着开。

### 11.1 power-profiles-daemon（默认方案）

`power-profiles-daemon` 提供 Performance / Balanced / Power Saver 三档，KDE、GNOME 都能在系统设置里直接切换。对多数新笔记本来说，这个方案最省心，也是本指南默认推荐。

```bash
sudo pacman -S power-profiles-daemon
sudo systemctl enable --now power-profiles-daemon
```

查看当前档位：

```bash
powerprofilesctl
```

如果之后改用 TLP，先关掉它：

```bash
sudo systemctl disable --now power-profiles-daemon
```

### 11.2 TLP（可选细调方案）

[TLP](https://linrunner.de/tlp/) 是社区最成熟的电源管理工具，适合需要细调电池阈值、CPU 策略、无线省电、ThinkPad 电池维护的人。普通用户先用上一节的 `power-profiles-daemon` 即可。

```bash
sudo pacman -S tlp tlp-rdw
sudo systemctl enable tlp.service
sudo systemctl enable NetworkManager-dispatcher.service
# 屏蔽冲突服务
sudo systemctl mask systemd-rfkill.service
sudo systemctl mask systemd-rfkill.socket
sudo tlp start
```

可选图形界面：

```bash
yay -S tlpui
```

查看状态：

```bash
sudo tlp-stat -b     # 电池
sudo tlp-stat -p     # CPU
sudo tlp-stat -g     # GPU
tlp-stat -s          # 服务运行情况
```

ThinkPad 用户可以再看看 [TLP ThinkPad 说明](https://linrunner.de/tlp/installation/arch.html#thinkpads-only)。

> ⚠️ **TLP 跟 GNOME 的 `power-profiles-daemon` 是互斥的**，二选一。装 GNOME 时会带上 ppd，要用 TLP 就先：
> `sudo systemctl disable --now power-profiles-daemon`

可选：如果你想用 TLP 管电池阈值和 ThinkPad 细项，同时又想保留 KDE / GNOME / COSMIC 里的“性能 / 均衡 / 省电”电源模式入口，可以装 `tlp-pd`：

```bash
sudo pacman -S tlp-pd
sudo systemctl enable --now tlp-pd
powerprofilesctl
```

`tlp-pd` 不是 USB-C Power Delivery，而是 TLP 的 power-profiles-daemon 兼容层：它提供桌面环境会调用的电源档位 D-Bus 接口，再由 TLP 执行实际策略。装它时不要同时启用真正的 `power-profiles-daemon`。

### 11.3 auto-cpufreq（备选）

更自动化的方案，适合不想看 TLP 一堆配置项的人。不要和 TLP / power-profiles-daemon 叠着用。

```bash
yay -S auto-cpufreq
sudo systemctl enable --now auto-cpufreq
```

### 11.4 thermald（Intel 推荐叠加）

Intel CPU 用户额外开启热管理 daemon，温度过高时主动降频：

```bash
sudo pacman -S thermald
sudo systemctl enable --now thermald
```

可与 TLP / auto-cpufreq 共存。

### 11.5 其他实用小工具

```bash
sudo pacman -S powertop                 # 实时功耗分析；运行后看 Tunables 标签
sudo pacman -S s-tui                    # TUI 形式的温度 / 频率 / TDP 监控
sudo pacman -S brightnessctl            # 调亮度（Wayland 也能用）
```

`sudo powertop --auto-tune` 可以一键应用所有省电建议，但某些设置会影响外设响应（比如 USB 自动挂起、网卡省电延迟）。建议先逐项试，确认没副作用后再写进 systemd 服务持久化。

### 11.6 关于休眠

- **挂起到内存（suspend / S3）**：默认可用，合盖即生效。
- **休眠到磁盘（hibernate / S4）** 和 **混合休眠（hybrid-sleep）**：需要一块 **大于物理内存的磁盘 swap**，并配置 `resume`。`zram` 不能承载休眠镜像。

本指南默认走 `zram`，所以默认不开启 hibernate。需要的话回 7.2「可选：启用休眠到磁盘」一节按步骤做。

---

## 第十二部分：日常软件选择

Arch 仓库加上 AUR，几乎涵盖了所有能在 Linux 上跑的软件。

### 12.1 浏览器

```bash
sudo pacman -S firefox firefox-i18n-zh-cn    # Firefox + 中文语言包
sudo pacman -S chromium                       # 开源版 Chrome
yay -S google-chrome microsoft-edge-stable-bin # Chrome / Edge
sudo pacman -S vivaldi                        # Vivaldi
yay -S brave-bin zen-browser-bin              # Brave / Zen Browser
```

> 启用了 archlinuxcn 源的话，Brave / Zen 也可以用 `sudo pacman -S brave-bin zen-browser zen-browser-i18n-zh-cn`。
>
> Wayland 下 Chromium 系浏览器默认仍走 X11。要原生 Wayland 加启动参数：`--enable-features=UseOzonePlatform --ozone-platform=wayland`

### 12.2 即时通讯

```bash
yay -S linuxqq                                # 腾讯官方 QQ Linux 版
yay -S wechat wechat-bin                      # 微信 Linux 版，自带沙箱隔离功能
yay -S feishu-bin                             # 飞书
```

历史上的 wine 微信 / 第三方 QQ 客户端，自从腾讯 2024 年放出 Linux 原生版后基本就用不上了。

### 12.3 办公

```bash
sudo pacman -S libreoffice-fresh libreoffice-fresh-zh-cn   # Libre Office
yay -S wps-office wps-office-mui-zh-cn ttf-wps-fonts       # WPS
yay -S onlyoffice-bin                                      # Only Office
```

> 启用了 archlinuxcn 源的话，也可以直接 `sudo pacman -S onlyoffice-bin`。

### 12.4 媒体播放

```bash
sudo pacman -S mpv                  # 万能播放器，几乎一切格式
sudo pacman -S vlc                  # 备选播放器
sudo pacman -S strawberry           # 音乐播放器（Clementine 的活跃 fork）
yay -S netease-cloud-music-gtk4     # 网易云音乐第三方客户端
```

### 12.5 图像 / 创意

```bash
sudo pacman -S flameshot            # 截屏
sudo pacman -S gimp                 # Photoshop 替代
sudo pacman -S krita                # 数字绘画，比 GIMP 更适合手绘
sudo pacman -S inkscape             # 矢量图（Illustrator 替代）
sudo pacman -S darktable            # RAW 处理（Lightroom 替代）
sudo pacman -S blender              # 3D 建模 / 渲染 / 动画
sudo pacman -S obs-studio           # 录屏 / 直播
```

### 12.6 开发

```bash
# 编辑器
sudo pacman -S code                        # VS Code 开源构建（无遥测）
yay -S visual-studio-code-bin              # 官方构建（有遥测、含 Live Share 等）
yay -S vscodium-bin                        # VSCodium，无微软品牌和遥测
sudo pacman -S zed                         # Zed，现代图形代码编辑器
sudo pacman -S neovim helix                # 终端编辑器
sudo pacman -S emacs                       # Emacs 普通版
sudo pacman -S emacs-wayland               # Emacs PGTK 版，Wayland 用户二选一
sudo pacman -S gedit kate                  # GNOME / KDE 图形文本编辑器
sudo pacman -S nano msedit                 # 简单终端文本编辑器

# 现代 CLI
sudo pacman -S kitty alacritty wezterm ghostty          # GPU 加速终端
sudo pacman -S fish nushell                             # 现代交互式 shell，不兼容 bash
sudo pacman -S starship                                 # 提示符
sudo pacman -S fzf ripgrep fd bat eza zoxide            # 现代化命令行工具
sudo pacman -S yazi                                     # 命令行文件浏览器
```

### 12.7 游戏

```bash
sudo pacman -S steam                                   # Steam（必须先开 multilib，见 8.1.2）
sudo pacman -S lutris                                  # 非 Steam 游戏管家
sudo pacman -S wine wine-mono wine-gecko winetricks    # Wine，Windows 兼容层
yay -S protonup-qt                                     # 一键安装 / 更新 Proton-GE
sudo pacman -S gamemode lib32-gamemode mangohud lib32-mangohud
```

Steam 游戏 → 属性 → 启动选项填 `gamemoderun mangohud %command%`，就能启用 CPU 调度优化和帧率叠加显示。

### 12.8 系统工具

```bash
sudo pacman -S htop btop             # 进程查看（btop 更好看）
sudo pacman -S fastfetch             # 系统信息（neofetch 已停更）
sudo pacman -S gparted               # 图形分区
sudo pacman -S gdu filelight         # 磁盘空间查看
sudo pacman -S flatpak               # 跨发行版包管理（沙盒）
sudo pacman -S downgrade             # 软件包降级工具
```

### 12.9 更多字体

```bash
# 思源系列
sudo pacman -S adobe-source-han-sans-cn-fonts adobe-source-han-serif-cn-fonts adobe-source-han-mono-cn-fonts

# Noto 全家桶
sudo pacman -S noto-fonts noto-fonts-cjk noto-fonts-emoji noto-fonts-extra

# 微软系字体
yay -S ttf-ms-fonts

# 等宽字体
sudo pacman -S ttf-jetbrains-mono ttf-jetbrains-mono-nerd
yay -S nerd-fonts-meta                # 完整 Nerd Fonts
```

### 12.10 输入法补充：Rime 方案

8.3.4 已经装好了 fcitx5 + Rime 引擎。Rime 自带的朙月 / 地球拼音功能比较朴素，几乎所有人都会再装一套现代化的社区方案。下面两个最流行：

#### 12.10.1 雾凇拼音 rime-ice

近两年 GitHub 上最火的 Rime 配置之一，主打 **开箱即用** —— 词库丰富、智能纠错、英文混输、模糊音、自定义符号都已经调好，拿来就能用。

```bash
yay -S rime-ice-git
# 启用了 archlinuxcn 源的话，也可以直接用 pacman 安装同名包
```

Fcitx5 用户编辑 `~/.local/share/fcitx5/rime/default.custom.yaml`，IBus 用户编辑 `~/.config/ibus/rime/default.custom.yaml`：

```yaml
patch:
  schema_list:
    - schema: rime_ice
```

之后右键托盘 Fcitx 5 图标 → **重新部署** （或终端跑 `fcitx5 -r`），再点托盘的输入方案切换，就能看到「雾凇拼音」「雾凇拼音·简体」等条目。更多配置见 [雾凇拼音文档](https://github.com/iDvel/rime-ice)。

#### 12.10.2 万象拼音 rime-wanxiang

更「现代化」也更激进的方案：自带 **语法语言模型（LMDG）** 做同音字消歧、可叠加各种辅助码、丰富的模糊音和方言拼写。功能多，配置项也多，适合愿意花点时间调一调的人。

万象按拼写方案拆包，基础版形如 `rime-wanxiang-[拼写方案名]`，双拼辅助码增强版形如 `rime-wanxiang-pro-[拼写方案名]`。启用了 archlinuxcn 源后可以直接用 `pacman` 装：

```bash
pacman -Ss rime-wanxiang                       # 看看有哪些方案可选
sudo pacman -S rime-wanxiang-abc               # 示例：智能 ABC 双拼基础版
sudo pacman -S rime-wanxiang-data              # 词库/语法数据（基础版/Pro 版都需要）
```

然后参照 [万象拼音官方文档](https://amzxyz.github.io/doc/intro) 的 Linux Fcitx5 / IBus 章节，按所选方案在 `default.custom.yaml` 里启用对应 schema（如 `wanxiang` 或 `wanxiang_pro`）。包安装路径下通常会附带示例 `default.custom.yaml`，照搬即可。

> 万象的方案名、数据包名和推荐 patch 写法随版本变动较快，**以官方文档和包内 README 为准**，不要照搬别处教程里的旧配置。

万象拼音内置了一批默认快捷键，建议先去 Fcitx5 全局快捷键里把会冲突的项关掉，再重新部署。

> 雾凇和万象都属于 Rime 方案配置，**不要把两个项目同时手动复制到同一个 rime 用户目录里**，会冲突。用包管理器装时按包的说明启用方案即可。

#### 12.10.3 其他方案

- [**oh-my-rime**](https://github.com/Mintimate/oh-my-rime)：薄荷输入法风格，偏重美化、emoji、流行词
- [**薄荷拼音 mintype**](https://github.com/oh-my-rime/oh-my-rime)：oh-my-rime 的下游精简版
- [**plum**](https://github.com/rime/plum)：rime 官方的"包管理器"，可批量装 / 切换多套方案

#### 12.10.4 其他语言 / 词库叠加

```bash
sudo pacman -S fcitx5-anthy           # 日文
sudo pacman -S fcitx5-mozc            # 备选日文（Google 日本語输入开源版）
sudo pacman -S fcitx5-hangul          # 韩文
# 下面的词库仅适用 fcitx5-chinese-addons
yay -S fcitx5-pinyin-moegirl          # 萌娘百科词库
sudo pacman -S fcitx5-pinyin-zhwiki   # 中文维基词库
```

---

## 第十三部分：日常系统管理维护

Arch 长期用得舒不舒服，全看维护习惯：小步更新、保留快照、定期清理、必要时回滚。

### 13.1 更新系统

Arch 有一条基本原则：**只做完整系统更新，不要做局部更新**。不要长期只升级某个包，也不要手动覆盖零散的包文件。

```bash
sudo pacman -Syu
```

用了 AUR helper 的话：

```bash
yay -Syu
```

几条建议：

- 更新前先确认网络稳定、电量足够。
- 看到内核、显卡驱动、Mesa、systemd、桌面环境的大版本更新时，更新完直接重启。
- 更新前拍一张快照，或者确认 `snap-pac` 已经自动拍过快照。
- 不要一边更新系统一边强行关机。

很久没更新的话，先看一眼 Arch 新闻：<https://archlinux.org/news/>。需要手动干预的变更通常都会写在这里。

### 13.2 查询和管理软件包

常用查询：

```bash
pacman -Qs keyword          # 在本机已安装包中搜
pacman -Ss keyword          # 在官方仓库里搜
pacman -Qi package          # 看本机包信息
pacman -Ql package          # 看包安装了哪些文件
pacman -Qo /path/to/file    # 看某个文件属于哪个包
```

删除软件：

```bash
sudo pacman -R package      # 只删指定包
sudo pacman -Rs package     # 连同不再需要的依赖一起删
sudo pacman -Rns package    # 连同不再需要的依赖一起删，并删除全局配置文件
```

`-Rdd`、`--overwrite` 会绕过依赖或文件保护，新手别照搬。遇到冲突先读报错。

### 13.3 清理无用包

列出孤儿包：曾经作为依赖装的、现在不再被需要的那些。

```bash
pacman -Qdt
```

确认没问题后删除：

```bash
sudo pacman -Rns $(pacman -Qdtq)
```

提示 `error: no targets specified` 就说明当前没有孤儿包，正常。

AUR 构建残留和下载缓存也会占空间：

```bash
yay -Sc
```

执行清理前看清楚提示，不确定就先选 `n`。

### 13.4 清理软件包缓存

pacman 默认保留旧版本包缓存，方便降级，但同时也占空间。

先装工具：

```bash
sudo pacman -S pacman-contrib
```

保留最近 3 个版本，删除更老的缓存：

```bash
sudo paccache -r
```

更激进一点，只保留最近 1 个版本：

```bash
sudo paccache -rk1
```

清理已卸载包的缓存：

```bash
sudo paccache -ruk0
```

不建议直接 `sudo pacman -Scc`。缓存不是垃圾，出问题时可以用来降级。

### 13.5 清理磁盘空间

看整体空间：

```bash
df -h
```

看 Btrfs 子卷和用量：

```bash
sudo btrfs filesystem usage /
sudo btrfs subvolume list /
```

找大目录：

```bash
sudo pacman -S gdu filelight
gdu /
```

清理 systemd journal：

```bash
journalctl --disk-usage
sudo journalctl --vacuum-time=14d
```

常见占空间位置：

- `/var/cache/pacman/pkg`：pacman 包缓存，用 `paccache` 清。
- `~/.cache`：用户缓存，通常可以删，但先关掉相关程序。
- `~/.local/share/Trash`：桌面回收站。
- Btrfs 快照目录：Snapper 在 `/.snapshots` 和 `/home/.snapshots`，Timeshift 有自己的目录。
- Flatpak：用 `flatpak uninstall --unused` 清理不用的运行时。

#### Btrfs 扩容和缩小

如果 Windows 磁盘管理或 `cfdisk` 已经把 Arch 分区后面扩出连续空间，Btrfs 文件系统可以在线扩容：

```bash
sudo btrfs filesystem resize max /
df -h /
```

缩小要反过来：**先缩 Btrfs 文件系统，再缩物理分区**。先确认已用空间，留足余量：

```bash
df -h /
sudo btrfs filesystem resize -10G /
```

确认文件系统已经缩小后，再用 `cfdisk` / GParted 缩小分区。顺序反了会损坏文件系统。新手做缩容前先备份重要数据，并拍一张快照；快照不能替代备份。

如果想把另一块分区加入当前 Btrfs 文件系统，也可以：

```bash
sudo btrfs device add /dev/nvmeXnYpZ /
sudo btrfs filesystem show /
```

但跨设备 Btrfs 会增加维护复杂度；普通桌面不建议把系统盘做成跨盘文件系统。已经用了 Btrfs swapfile 的机器尤其要注意：跨多个设备的 Btrfs 不适合继续用 swapfile，需要改用独立 swap 分区。

### 13.6 软件降级

刚更新完某个包就出问题，先看本机缓存里有没有旧版本：

```bash
ls /var/cache/pacman/pkg/package-*.pkg.tar.zst
sudo pacman -U /var/cache/pacman/pkg/package-oldversion-x86_64.pkg.tar.zst
```

缓存里没有的话，可以装 `downgrade`：

```bash
yay -S downgrade
sudo downgrade package
```

降级只是临时止血。长期固定在旧版本会越来越容易撞依赖冲突；别把大量包长期放进 `IgnorePkg`。

### 13.7 快照维护

Snapper 查看快照：

```bash
sudo snapper -c root list
sudo snapper -c home list
```

手动创建快照：

```bash
sudo snapper -c root create --description "before-big-change"
sudo snapper -c home create --description "before-big-change"
```

删除指定快照：

```bash
sudo snapper -c root delete <编号>
sudo snapper -c home delete <编号>
```

Timeshift 用户用 GUI 管理就行，也可以走命令行：

```bash
sudo timeshift --list
sudo timeshift --delete --snapshot '快照名'
```

快照不是越多越好。保留最近几次更新前后、关键配置完成后的快照就够了。

### 13.8 备份

快照和备份不是一回事：

- **快照**：在同一块盘上快速回滚系统状态。适合撤销错误升级、错误配置。
- **备份**：把重要数据复制到另一块盘、NAS、移动硬盘或云端。适合应对硬盘损坏、误删、整机丢失。

至少备份这些：

- `~/Documents`、`~/Pictures`、`~/Videos`、`~/Projects`
- `~/.ssh`、`~/.gnupg`、密码管理器数据库
- 重要配置：`~/.config` 里自己改过的部分
- `/etc` 中手动改过的系统配置

简单的备份可以用 `rsync`：

```bash
rsync -aAXHv --info=progress2 ~/Documents /run/media/$USER/Backup/
```

更完整的方案可以选：

```bash
sudo pacman -S borg restic
```

备份的最低标准是：**能恢复**。要定期试着恢复一个小目录，验证一下。

### 13.9 服务和日志排错

查看失败的服务：

```bash
systemctl --failed
```

查看某个服务的状态和日志：

```bash
systemctl status NetworkManager
journalctl -u NetworkManager -b
```

看本次启动的错误：

```bash
journalctl -b -p warning
```

系统出问题时，先收集日志再去搜。服务名、错误码、设备名比「黑屏了」「没网了」要有用得多。

### 13.10 桌面崩了：切到 TTY

图形桌面崩溃不等于系统死了。黑屏、登录循环、显卡驱动配置错时，先切到 TTY。

常用快捷键：

```text
Ctrl + Alt + F3     # 常见可用 tty
Ctrl + Alt + F4-F6  # 其他常见可用 tty
Ctrl + Alt + F1/F2/F7  # 可能是图形会话、锁屏或显示管理器，具体取决于桌面环境
```

部分笔记本要同时按 `Fn`，比如 `Ctrl + Alt + Fn + F3`。`F2` 是锁屏或没反应的话，继续试 `F3`–`F6`。

进入 TTY 后，用普通用户名和密码登录。常用排错命令：

```bash
systemctl status sddm              # KDE 默认显示管理器
systemctl status gdm               # GNOME 默认显示管理器
journalctl -b -p warning
journalctl -b -u sddm
journalctl -b -u gdm
```

如果是刚装完显卡驱动后黑屏，可以先撤销可疑配置 / 卸载可疑包 / 回滚快照：

```bash
sudo pacman -Rns package
sudo mkinitcpio -P
sudo grub-mkconfig -o /boot/grub/grub.cfg
sudo reboot
```

只是桌面卡死的话，也可以直接重启显示管理器：

```bash
sudo systemctl restart sddm
# 或 GNOME:
sudo systemctl restart gdm
```

这会结束当前图形会话，未保存的内容会丢。

### 13.11 系统进不去：用安装环境急救

连 TTY 都进不去，或者 GRUB 之后直接卡住，就用 Arch 安装 U 盘急救：启动临时系统，挂载硬盘里的 Arch，再 `arch-chroot /mnt` 修。

启动安装 U 盘后先联网，然后识别分区：

```bash
lsblk -f
```

按本指南推荐的 Snapper 子卷布局挂载：

```bash
mount -t btrfs -o subvol=/@,compress=zstd /dev/nvmeXnYpB /mnt
mkdir -p /mnt/home /mnt/.snapshots /mnt/var/log /mnt/var/cache /mnt/var/tmp /mnt/swap /mnt/efi
mount -t btrfs -o subvol=/@home,compress=zstd /dev/nvmeXnYpB /mnt/home
mkdir -p /mnt/home/.snapshots
mount -t btrfs -o subvol=/@snapshots,compress=zstd /dev/nvmeXnYpB /mnt/.snapshots
mount -t btrfs -o subvol=/@home_snapshots,compress=zstd /dev/nvmeXnYpB /mnt/home/.snapshots
mount -t btrfs -o subvol=/@var_log,compress=zstd /dev/nvmeXnYpB /mnt/var/log
mount -t btrfs -o subvol=/@var_cache,compress=zstd /dev/nvmeXnYpB /mnt/var/cache
mount -t btrfs -o subvol=/@var_tmp,compress=zstd /dev/nvmeXnYpB /mnt/var/tmp
# 如果用了 swapfile，再挂 @swap
# mount -t btrfs -o subvol=/@swap,nodatacow /dev/nvmeXnYpB /mnt/swap
mount /dev/nvmeXnYpA /mnt/efi
```

如果装的是 Timeshift 布局，只挂 `@`、`@home` 和 ESP；如果用了 swapfile，再额外挂 `@swap`。

如果用了独立 swap 分区，急救时一般不需要启用它。确认挂载没问题：

```bash
findmnt /mnt
findmnt /mnt/efi
```

进入原系统：

```bash
arch-chroot /mnt
```

进入 chroot 之后可以做这些事：

```bash
pacman -Syu                         # 修复没完成的更新
pacman -S linux linux-firmware      # 重装内核和固件
mkinitcpio -P                       # 重建 initramfs
grub-install --target=x86_64-efi --efi-directory=/efi --bootloader-id=ARCH
grub-mkconfig -o /boot/grub/grub.cfg
systemctl disable broken.service    # 禁用导致启动卡住的服务
```

修完退出并卸载：

```bash
exit
umount -R /mnt
reboot
```

挂载报错时不要直接格式化。先用 `lsblk -f` 核对设备名、文件系统、UUID 和子卷名；`nvmeXnYpZ` 必须替换成真实分区。

---

## 第十四部分：双系统常见坑位

1. **Windows 时间错乱**：Windows 默认把硬件时钟当本地时间，Linux 当 UTC。按 2.1 把 Windows 也改成 UTC 是最干净的做法。
2. **GRUB 没显示 Windows**：确认 `GRUB_DISABLE_OS_PROBER=false` 已经写入；进系统后再 `grub-mkconfig -o /boot/grub/grub.cfg` 一次。
3. **Windows 大更新后 GRUB 被 Windows Boot Manager 顶掉**：开机进 BIOS，把启动顺序里的 `ARCH` 调到 `Windows Boot Manager` 之前；或者用 U 盘 chroot 进去重跑 `grub-install`。
4. **无法挂载 Windows NTFS 分区 / 只能只读挂载**：最常见原因是 Windows 没有真正关机，而是处于快速启动、休眠或 BitLocker 锁定状态。先不要在 Linux 里强行写入，更不要格式化。

   先确认分区和错误信息：

   ```bash
   lsblk -f
   sudo mkdir -p /mnt/windows
   sudo mount -t ntfs3 /dev/nvmeXnYpZ /mnt/windows
   ```

   `ntfs3` 是内核自带 NTFS 驱动；如果你更想用 `ntfs-3g`，先确认已经安装 `ntfs-3g` 包，再把命令里的 `ntfs3` 换成 `ntfs-3g`。

   如果提示 `Windows is hibernated`、`unsafe state`、`dirty bit`、`Operation not permitted` 之类，回到 Windows 做这几件事：

   - 关闭「快速启动」：控制面板 → 电源选项 → 选择电源按钮的功能 → 更改当前不可用的设置 → 取消勾选「启用快速启动」。
   - 关闭休眠，并完整关机：

     ```powershell
     powercfg /h off
     shutdown /s /t 0
     ```

   - 如果分区开了 BitLocker，先在 Windows 里解锁、暂停或关闭 BitLocker；未解锁的 BitLocker 分区不能当普通 NTFS 直接挂载。
   - 如果 Windows 提示磁盘需要修复，先在 Windows 管理员终端里跑：

     ```powershell
     chkdsk C: /f
     ```

     数据盘就把 `C:` 换成对应盘符。修完后再完整关机。

   如果只是临时从 Windows 分区拷文件，不需要写入，可以只读挂载：

   ```bash
   sudo mount -t ntfs3 -o ro /dev/nvmeXnYpZ /mnt/windows
   ```

   Linux 侧的 `ntfsfix` 只能清一点 NTFS 状态、触发 Windows 下次检查，不能替代 `chkdsk`。确实要用也只作为临时手段：

   ```bash
   sudo ntfsfix /dev/nvmeXnYpZ
   ```

   修 Windows 系统盘优先回 Windows 处理；Linux 里强行 `remove_hiberfile` 会丢掉 Windows 休眠状态，除非你明确知道自己在放弃那次休眠会话，否则不建议用。

5. **Windows 里怎么看 Linux 分区**：Windows 磁盘管理只能看到 Linux 分区存在，通常会显示成「未知分区」「健康」或没有盘符；它不能原生读取 Btrfs / ext4，更不能理解 Btrfs 子卷。看到提示「需要格式化」「初始化磁盘」时一律点取消，别给 Linux 分区分配盘符，也别删除。

   只想确认分区位置，可以在 Windows 里用：

   - 磁盘管理：右键开始菜单 → 磁盘管理，看容量、分区顺序和 EFI 分区。
   - DiskGenius 之类分区工具：只用来查看分区表、容量、文件系统类型，不要随手点修复、格式化、调整大小。

   想从 Windows 访问 Linux 里的文件，可以安装第三方 Btrfs / ext4 驱动或文件系统工具。建议把它当成 **临时查看 / 只读拷贝** 手段，不要长期用 Windows 直接写 Linux 根分区；写入驱动一旦出问题，可能绕过 Linux 权限、破坏元数据，或者影响 Btrfs 子卷和快照。

   更稳的做法是：

   - 重启进 Arch 后，把文件复制到 Windows 的 NTFS 数据盘、exFAT U 盘、移动硬盘或 NAS。
   - 准备一个专门的共享数据分区，格式用 exFAT 或 NTFS，不要直接拿 Linux 根分区当共享盘。
   - 系统进不去时，用 Arch 安装 U 盘按 13.11 挂载 Linux 分区，再把文件拷到外置盘。

   如果根分区按本指南用了 Btrfs，Windows 侧最多把它当作「能识别位置、必要时只读取文件」的分区看待；真正读写 Linux 分区，优先回 Linux 或安装 U 盘环境处理。

6. **第一次进 Windows 要 BitLocker 密钥**：说明启动链变化触发了 BitLocker。按 2.1 的建议先关闭或暂停 Windows 设备加密 / BitLocker；要是已经触发了，就先输入恢复密钥进系统再处理。
7. **EFI 分区空间不够**：100 MiB 的 ESP 装 GRUB 主体已经偏紧。本指南默认把 ESP 挂到 `/efi`、把内核留在 Btrfs 根分区的 `/boot`，就是为了少占 ESP。仍然不够时有三种办法：扩容 ESP 到 ≥ 512 MiB；在 Arch 那块盘新建 ESP；或者新建 1-2 GiB 的独立 `/boot` 分区，把内核和 initramfs 放进去。不要格式化 Windows 现有的 ESP。
8. **桌面黑屏 / 登录循环**：先按 `Ctrl + Alt + F3`–`F6` 切到 TTY；部分笔记本要加 `Fn`。`F2` 有时是锁屏或图形会话，不行就继续试其他 F 键。登录后看 `journalctl -b -p warning` 和显示管理器日志。能进 TTY 通常就不用重装。
9. **滚挂了进不去系统**：插安装 U 盘 → 进安装环境 → 按 13.11 挂载原系统 → `arch-chroot /mnt` → 该回滚的回滚（Btrfs 快照）、该重建的 initramfs / GRUB 就重建。**千万不要直接重新安装整个系统**。

---

## 第十五部分：软件包链接索引

命令块里的包名保持纯文本，方便直接复制执行。这里集中放链接：官方仓库包指向 Arch Packages 搜索，AUR 包指向 AUR 页面；启用 archlinuxcn 后可直接 `pacman -S` 的包，也可能同时在 AUR 有页面。

**基础系统与引导**

- [`base`](https://archlinux.org/packages/?q=base)、[`base-devel`](https://archlinux.org/packages/?q=base-devel)、[`linux`](https://archlinux.org/packages/?q=linux)、[`linux-firmware`](https://archlinux.org/packages/?q=linux-firmware)、[`btrfs-progs`](https://archlinux.org/packages/?q=btrfs-progs)
- [`networkmanager`](https://archlinux.org/packages/?q=networkmanager)、[`vim`](https://archlinux.org/packages/?q=vim)、[`sudo`](https://archlinux.org/packages/?q=sudo)、[`zsh`](https://archlinux.org/packages/?q=zsh)、[`zsh-completions`](https://archlinux.org/packages/?q=zsh-completions)
- [`linux-zen`](https://archlinux.org/packages/?q=linux-zen)、[`linux-zen-headers`](https://archlinux.org/packages/?q=linux-zen-headers)、[`linux-lts`](https://archlinux.org/packages/?q=linux-lts)、[`linux-lts-headers`](https://archlinux.org/packages/?q=linux-lts-headers)、[`linux-hardened`](https://archlinux.org/packages/?q=linux-hardened)、[`linux-hardened-headers`](https://archlinux.org/packages/?q=linux-hardened-headers)
- [`intel-ucode`](https://archlinux.org/packages/?q=intel-ucode)、[`amd-ucode`](https://archlinux.org/packages/?q=amd-ucode)、[`grub`](https://archlinux.org/packages/?q=grub)、[`efibootmgr`](https://archlinux.org/packages/?q=efibootmgr)、[`os-prober`](https://archlinux.org/packages/?q=os-prober)
- [`reflector`](https://archlinux.org/packages/?q=reflector)、[`archlinux-keyring`](https://archlinux.org/packages/?q=archlinux-keyring)、[`archlinuxcn-keyring`](https://github.com/archlinuxcn/repo/tree/master/archlinuxcn/archlinuxcn-keyring)、[`yay`](https://aur.archlinux.org/packages/yay)、[`paru`](https://aur.archlinux.org/packages/paru)

**文件系统、快照与维护**

- [`zram-generator`](https://archlinux.org/packages/?q=zram-generator)、[`snapper`](https://archlinux.org/packages/?q=snapper)、[`snap-pac`](https://archlinux.org/packages/?q=snap-pac)、[`btrfs-assistant`](https://archlinux.org/packages/?q=btrfs-assistant)、[`timeshift`](https://archlinux.org/packages/?q=timeshift)
- [`grub-btrfs`](https://archlinux.org/packages/?q=grub-btrfs)、[`inotify-tools`](https://archlinux.org/packages/?q=inotify-tools)、[`pacman-contrib`](https://archlinux.org/packages/?q=pacman-contrib)、[`downgrade`](https://archlinux.org/packages/?q=downgrade)、[`borg`](https://archlinux.org/packages/?q=borg)、[`restic`](https://archlinux.org/packages/?q=restic)
- [`fastfetch`](https://archlinux.org/packages/?q=fastfetch)、[`gdu`](https://archlinux.org/packages/?q=gdu)、[`filelight`](https://archlinux.org/packages/?q=filelight)、[`gparted`](https://archlinux.org/packages/?q=gparted)、[`flatpak`](https://archlinux.org/packages/?q=flatpak)、[`ntfs-3g`](https://archlinux.org/packages/?q=ntfs-3g)

**桌面基础、音频、蓝牙、字体**

- [`sof-firmware`](https://archlinux.org/packages/?q=sof-firmware)、[`alsa-ucm-conf`](https://archlinux.org/packages/?q=alsa-ucm-conf)、[`alsa-firmware`](https://archlinux.org/packages/?q=alsa-firmware)、[`pipewire`](https://archlinux.org/packages/?q=pipewire)、[`wireplumber`](https://archlinux.org/packages/?q=wireplumber)
- [`pipewire-pulse`](https://archlinux.org/packages/?q=pipewire-pulse)、[`pipewire-alsa`](https://archlinux.org/packages/?q=pipewire-alsa)、[`pipewire-jack`](https://archlinux.org/packages/?q=pipewire-jack)、[`bluez`](https://archlinux.org/packages/?q=bluez)、[`bluez-utils`](https://archlinux.org/packages/?q=bluez-utils)
- [`noto-fonts`](https://archlinux.org/packages/?q=noto-fonts)、[`noto-fonts-cjk`](https://archlinux.org/packages/?q=noto-fonts-cjk)、[`noto-fonts-emoji`](https://archlinux.org/packages/?q=noto-fonts-emoji)、[`noto-fonts-extra`](https://archlinux.org/packages/?q=noto-fonts-extra)
- [`ttf-jetbrains-mono`](https://archlinux.org/packages/?q=ttf-jetbrains-mono)、[`ttf-jetbrains-mono-nerd`](https://archlinux.org/packages/?q=ttf-jetbrains-mono-nerd)、[`adobe-source-han-sans-cn-fonts`](https://archlinux.org/packages/?q=adobe-source-han-sans-cn-fonts)、[`adobe-source-han-serif-cn-fonts`](https://archlinux.org/packages/?q=adobe-source-han-serif-cn-fonts)、[`adobe-source-han-mono-cn-fonts`](https://archlinux.org/packages/?q=adobe-source-han-mono-cn-fonts)
- [`ttf-ms-fonts`](https://aur.archlinux.org/packages/ttf-ms-fonts)、[`nerd-fonts-meta`](https://aur.archlinux.org/packages/nerd-fonts-meta)

**桌面环境与窗口管理器**

- [`plasma-meta`](https://archlinux.org/packages/?q=plasma-meta)、[`plasma-workspace`](https://archlinux.org/packages/?q=plasma-workspace)、[`konsole`](https://archlinux.org/packages/?q=konsole)、[`dolphin`](https://archlinux.org/packages/?q=dolphin)、[`sddm`](https://archlinux.org/packages/?q=sddm)
- [`packagekit-qt6`](https://archlinux.org/packages/?q=packagekit-qt6)、[`packagekit`](https://archlinux.org/packages/?q=packagekit)、[`appstream-qt`](https://archlinux.org/packages/?q=appstream-qt)、[`appstream`](https://archlinux.org/packages/?q=appstream)
- [`gnome`](https://archlinux.org/packages/?q=gnome)、[`gnome-tweaks`](https://archlinux.org/packages/?q=gnome-tweaks)、[`gnome-extra`](https://archlinux.org/packages/?q=gnome-extra)、[`cinnamon`](https://archlinux.org/packages/?q=cinnamon)、[`xfce4`](https://archlinux.org/packages/?q=xfce4)、[`xfce4-goodies`](https://archlinux.org/packages/?q=xfce4-goodies)
- [`lightdm`](https://archlinux.org/packages/?q=lightdm)、[`lightdm-gtk-greeter`](https://archlinux.org/packages/?q=lightdm-gtk-greeter)
- [`hyprland`](https://archlinux.org/packages/?q=hyprland)、[`hyprpaper`](https://archlinux.org/packages/?q=hyprpaper)、[`hypridle`](https://archlinux.org/packages/?q=hypridle)、[`hyprlock`](https://archlinux.org/packages/?q=hyprlock)、[`polkit-kde-agent`](https://archlinux.org/packages/?q=polkit-kde-agent)
- [`niri`](https://archlinux.org/packages/?q=niri)、[`sway`](https://archlinux.org/packages/?q=sway)、[`swaylock`](https://archlinux.org/packages/?q=swaylock)、[`swayidle`](https://archlinux.org/packages/?q=swayidle)、[`i3-wm`](https://archlinux.org/packages/?q=i3-wm)、[`i3status`](https://archlinux.org/packages/?q=i3status)、[`i3lock`](https://archlinux.org/packages/?q=i3lock)
- [`waybar`](https://archlinux.org/packages/?q=waybar)、[`wofi`](https://archlinux.org/packages/?q=wofi)、[`fuzzel`](https://archlinux.org/packages/?q=fuzzel)、[`dmenu`](https://archlinux.org/packages/?q=dmenu)、[`rxvt-unicode`](https://archlinux.org/packages/?q=rxvt-unicode)、[`xorg-server`](https://archlinux.org/packages/?q=xorg-server)、[`xorg-xinit`](https://archlinux.org/packages/?q=xorg-xinit)
- [`xdg-desktop-portal`](https://archlinux.org/packages/?q=xdg-desktop-portal)、[`xdg-desktop-portal-kde`](https://archlinux.org/packages/?q=xdg-desktop-portal-kde)、[`xdg-desktop-portal-gnome`](https://archlinux.org/packages/?q=xdg-desktop-portal-gnome)、[`xdg-desktop-portal-hyprland`](https://archlinux.org/packages/?q=xdg-desktop-portal-hyprland)、[`xdg-desktop-portal-wlr`](https://archlinux.org/packages/?q=xdg-desktop-portal-wlr)

**输入法**

- [`fcitx5-im`](https://archlinux.org/packages/?q=fcitx5-im)、[`fcitx5-chinese-addons`](https://archlinux.org/packages/?q=fcitx5-chinese-addons)、[`fcitx5-rime`](https://archlinux.org/packages/?q=fcitx5-rime)、[`ibus`](https://archlinux.org/packages/?q=ibus)、[`ibus-libpinyin`](https://archlinux.org/packages/?q=ibus-libpinyin)、[`ibus-rime`](https://archlinux.org/packages/?q=ibus-rime)
- [`rime-ice-git`](https://aur.archlinux.org/packages/rime-ice-git)、[`rime-wanxiang-abc`](https://github.com/archlinuxcn/repo/tree/master/archlinuxcn/rime-wanxiang-abc)、[`rime-wanxiang-data`](https://github.com/archlinuxcn/repo/tree/master/archlinuxcn/rime-wanxiang-data)
- [`fcitx5-anthy`](https://archlinux.org/packages/?q=fcitx5-anthy)、[`fcitx5-mozc`](https://archlinux.org/packages/?q=fcitx5-mozc)、[`fcitx5-hangul`](https://archlinux.org/packages/?q=fcitx5-hangul)、[`fcitx5-pinyin-zhwiki`](https://archlinux.org/packages/?q=fcitx5-pinyin-zhwiki)、[`fcitx5-pinyin-moegirl`](https://aur.archlinux.org/packages/fcitx5-pinyin-moegirl)

**显卡、硬解与计算**

- [`mesa`](https://archlinux.org/packages/?q=mesa)、[`lib32-mesa`](https://archlinux.org/packages/?q=lib32-mesa)、[`vulkan-intel`](https://archlinux.org/packages/?q=vulkan-intel)、[`lib32-vulkan-intel`](https://archlinux.org/packages/?q=lib32-vulkan-intel)、[`intel-media-driver`](https://archlinux.org/packages/?q=intel-media-driver)
- [`vulkan-radeon`](https://archlinux.org/packages/?q=vulkan-radeon)、[`lib32-vulkan-radeon`](https://archlinux.org/packages/?q=lib32-vulkan-radeon)、[`libva-mesa-driver`](https://archlinux.org/packages/?q=libva-mesa-driver)、[`mesa-vdpau`](https://archlinux.org/packages/?q=mesa-vdpau)、[`xf86-video-ati`](https://archlinux.org/packages/?q=xf86-video-ati)
- [`nvidia-open`](https://archlinux.org/packages/?q=nvidia-open)、[`nvidia`](https://archlinux.org/packages/?q=nvidia)、[`nvidia-utils`](https://archlinux.org/packages/?q=nvidia-utils)、[`lib32-nvidia-utils`](https://archlinux.org/packages/?q=lib32-nvidia-utils)、[`nvidia-settings`](https://archlinux.org/packages/?q=nvidia-settings)、[`nvidia-prime`](https://archlinux.org/packages/?q=nvidia-prime)、[`egl-wayland`](https://archlinux.org/packages/?q=egl-wayland)
- [`mesa-utils`](https://archlinux.org/packages/?q=mesa-utils)、[`vulkan-tools`](https://archlinux.org/packages/?q=vulkan-tools)、[`libva-utils`](https://archlinux.org/packages/?q=libva-utils)
- [`opencl-nvidia`](https://archlinux.org/packages/?q=opencl-nvidia)、[`lib32-opencl-nvidia`](https://archlinux.org/packages/?q=lib32-opencl-nvidia)、[`opencl-mesa`](https://archlinux.org/packages/?q=opencl-mesa)、[`lib32-opencl-mesa`](https://archlinux.org/packages/?q=lib32-opencl-mesa)
- [`supergfxctl`](https://aur.archlinux.org/packages/supergfxctl)、[`envycontrol`](https://aur.archlinux.org/packages/envycontrol)

**功耗管理**

- [`power-profiles-daemon`](https://archlinux.org/packages/?q=power-profiles-daemon)、[`tlp`](https://archlinux.org/packages/?q=tlp)、[`tlp-rdw`](https://archlinux.org/packages/?q=tlp-rdw)、[`tlp-pd`](https://archlinux.org/packages/?q=tlp-pd)、[`tlpui`](https://aur.archlinux.org/packages/tlpui)
- [`auto-cpufreq`](https://aur.archlinux.org/packages/auto-cpufreq)、[`thermald`](https://archlinux.org/packages/?q=thermald)、[`powertop`](https://archlinux.org/packages/?q=powertop)、[`s-tui`](https://archlinux.org/packages/?q=s-tui)、[`brightnessctl`](https://archlinux.org/packages/?q=brightnessctl)

**日常软件、开发与游戏**

- [`firefox`](https://archlinux.org/packages/?q=firefox)、[`firefox-i18n-zh-cn`](https://archlinux.org/packages/?q=firefox-i18n-zh-cn)、[`chromium`](https://archlinux.org/packages/?q=chromium)、[`vivaldi`](https://archlinux.org/packages/?q=vivaldi)、[`google-chrome`](https://aur.archlinux.org/packages/google-chrome)、[`microsoft-edge-stable-bin`](https://aur.archlinux.org/packages/microsoft-edge-stable-bin)、[`brave-bin`](https://aur.archlinux.org/packages/brave-bin)、[`zen-browser-bin`](https://aur.archlinux.org/packages/zen-browser-bin)
- [`linuxqq`](https://aur.archlinux.org/packages/linuxqq)、[`wechat`](https://aur.archlinux.org/packages/wechat)、[`wechat-bin`](https://aur.archlinux.org/packages/wechat-bin)、[`feishu-bin`](https://aur.archlinux.org/packages/feishu-bin)
- [`libreoffice-fresh`](https://archlinux.org/packages/?q=libreoffice-fresh)、[`libreoffice-fresh-zh-cn`](https://archlinux.org/packages/?q=libreoffice-fresh-zh-cn)、[`wps-office`](https://aur.archlinux.org/packages/wps-office)、[`wps-office-mui-zh-cn`](https://aur.archlinux.org/packages/wps-office-mui-zh-cn)、[`ttf-wps-fonts`](https://aur.archlinux.org/packages/ttf-wps-fonts)、[`onlyoffice-bin`](https://aur.archlinux.org/packages/onlyoffice-bin)
- [`mpv`](https://archlinux.org/packages/?q=mpv)、[`vlc`](https://archlinux.org/packages/?q=vlc)、[`strawberry`](https://archlinux.org/packages/?q=strawberry)、[`netease-cloud-music-gtk4`](https://aur.archlinux.org/packages/netease-cloud-music-gtk4)
- [`flameshot`](https://archlinux.org/packages/?q=flameshot)、[`gimp`](https://archlinux.org/packages/?q=gimp)、[`krita`](https://archlinux.org/packages/?q=krita)、[`inkscape`](https://archlinux.org/packages/?q=inkscape)、[`darktable`](https://archlinux.org/packages/?q=darktable)、[`blender`](https://archlinux.org/packages/?q=blender)、[`obs-studio`](https://archlinux.org/packages/?q=obs-studio)
- [`code`](https://archlinux.org/packages/?q=code)、[`visual-studio-code-bin`](https://aur.archlinux.org/packages/visual-studio-code-bin)、[`vscodium-bin`](https://aur.archlinux.org/packages/vscodium-bin)、[`zed`](https://archlinux.org/packages/?q=zed)、[`neovim`](https://archlinux.org/packages/?q=neovim)、[`helix`](https://archlinux.org/packages/?q=helix)、[`emacs`](https://archlinux.org/packages/?q=emacs)、[`emacs-wayland`](https://archlinux.org/packages/?q=emacs-wayland)
- [`gedit`](https://archlinux.org/packages/?q=gedit)、[`kate`](https://archlinux.org/packages/?q=kate)、[`nano`](https://archlinux.org/packages/?q=nano)、[`msedit`](https://archlinux.org/packages/?q=msedit)
- [`kitty`](https://archlinux.org/packages/?q=kitty)、[`alacritty`](https://archlinux.org/packages/?q=alacritty)、[`wezterm`](https://archlinux.org/packages/?q=wezterm)、[`ghostty`](https://archlinux.org/packages/?q=ghostty)
- [`fish`](https://archlinux.org/packages/?q=fish)、[`nushell`](https://archlinux.org/packages/?q=nushell)、[`starship`](https://archlinux.org/packages/?q=starship)、[`fzf`](https://archlinux.org/packages/?q=fzf)、[`ripgrep`](https://archlinux.org/packages/?q=ripgrep)、[`fd`](https://archlinux.org/packages/?q=fd)、[`bat`](https://archlinux.org/packages/?q=bat)、[`eza`](https://archlinux.org/packages/?q=eza)、[`zoxide`](https://archlinux.org/packages/?q=zoxide)、[`yazi`](https://archlinux.org/packages/?q=yazi)
- [`steam`](https://archlinux.org/packages/?q=steam)、[`lutris`](https://archlinux.org/packages/?q=lutris)、[`wine`](https://archlinux.org/packages/?q=wine)、[`wine-mono`](https://archlinux.org/packages/?q=wine-mono)、[`wine-gecko`](https://archlinux.org/packages/?q=wine-gecko)、[`winetricks`](https://archlinux.org/packages/?q=winetricks)、[`protonup-qt`](https://aur.archlinux.org/packages/protonup-qt)
- [`gamemode`](https://archlinux.org/packages/?q=gamemode)、[`lib32-gamemode`](https://archlinux.org/packages/?q=lib32-gamemode)、[`mangohud`](https://archlinux.org/packages/?q=mangohud)、[`lib32-mangohud`](https://archlinux.org/packages/?q=lib32-mangohud)
- [`htop`](https://archlinux.org/packages/?q=htop)、[`btop`](https://archlinux.org/packages/?q=btop)

## 第十六部分：参考资料

- [ArchWiki（简体中文）](<https://wiki.archlinux.org/title/Main_page_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)>)
- [Installation guide（ArchWiki）](<https://wiki.archlinux.org/title/Installation_guide_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)>)
- [GRUB（ArchWiki）](<https://wiki.archlinux.org/title/GRUB_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)>)
- [Btrfs（ArchWiki）](<https://wiki.archlinux.org/title/Btrfs_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)>)
- [ArchLinuxTutorial](https://github.com/ArchLinuxStudio/ArchLinuxTutorial)

---

> 🎉 装完别忘了 `pacman -Syu`，然后欢迎来到 Arch 的世界。
