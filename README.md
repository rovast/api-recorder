# api-recorder


<p align="center">
  <a href="https://img.shields.io/github/issues/rovast/record-api/issues">
    <img src="https://img.shields.io/github/issues/rovast/record-api" height="18"
         alt="Issues"></a>
  
  <a href="https://img.shields.io/github/license/rovast/record-api">
    <img src="https://img.shields.io/github/license/rovast/record-api" height="18"
         alt="GitHub license"></a>
  
  <a href="https://www.npmjs.com/package/@rovast/api-recorder">
    <img src="https://badge.fury.io/js/@rovast%2Fapi-recorder.svg" height="18"
         alt="GitHub license"></a>
</p>


[简体中文](README.md) | [English](README-en.md)

---

## 使用场景

录制浏览网站的 API，记录结果，并导出至 Postman。可用于以下场景：

### 1. MOCK 已有网站

通过录制 API 和其结果，可以将其返回结果作为数据 MOCK 的返回值。这样就可以达到快速 mock 已有网站的目的。

### 2. 补录 API 文档

对于已有的网站，如果需要补录 API 文档，可直接通过该工具打开浏览器访问网站，导入 Postman 即可。


## 使用方法

### 1. 安装

```bash
npm i -g @rovast/api-recorder
```

### 2. 使用

```bash
api-recorder
```

会自动打开浏览器，直接访问自己需要录制的网站即可。

关闭浏览器时，会自动在配置的 `output` 中生成文件

## 配置

```bash

Usage: index [options]

A tool for record your api

Options:
  -n, --name <name>             collection name (default: "record-api")
  -o, --output <output_file>    output json file path (default: "postman-collection.json")
  -b, --browser <execute_path>  browser execute path (default: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")
  -m, --match <regex>           match the api path (default: "/api/")
  -h, --help                    display help for command
```


## 贡献

```bash
npm run build # 构建 TS 至 JS
npm run dev:start # 监听变化，实时编译
```
