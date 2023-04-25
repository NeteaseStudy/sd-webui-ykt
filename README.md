# 云课堂 stable diffusion 创建历史插件

目前主要包含：

- 注入云课堂页面layout
- 通过配置控制 webui 功能展示
- 图片展示
- 图片上传 NOS

## 配置 webui 功能
通过配置config.json, 启动webui的时候附带ui-settings-file参数
```bash
sh webui.sh --api --ui-settings-file ./extensions/sd-webui-ykt/config.json
```

## 

## 图片展示
- 瀑布流基于 masonry.pkgd.min.js
- 图片 PNG_INFO 获取 & 重新生成 基于sd-webui & gradio 实现

## NOS 上传图片
基于 nos-python3-sdk 实现

需要在启动应用时添加环境变量启用nos文件上传
```bash
export NOS_ACCESS_KEY = "xxx";
export NOS_SECRET_KEY = "xx";
export NOS_END_POINT = "xxx";
```
