# record-api

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
npm install -g record-api
```

### 2. 使用

```bash
record-api
```

会自动打开浏览器，直接访问自己需要录制的网站即可。

关闭浏览器时，会自动在配置的 `output` 中生成文件

## 配置

| Option      | Shortcut | default                                                        | 说明                           |
|-------------|----------|----------------------------------------------------------------|------------------------------|
| `--match`   | `-m`     | `/api/`                                                        | 根据路径匹配，录制哪些 API              |
| `--output`  | `-o`     | `postman-collection.json`                                      | 生成的可以导入至 postman 的 json 文件路径 |
| `--browser` | `-b`     | `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome` | 浏览器的可执行文件路径                  |


## 贡献

```bash
npm run build # 构建 TS 至 JS
npm run dev:start # 监听变化，实时编译
```
