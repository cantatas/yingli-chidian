# fanyi-app

> An electron-vue project

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


# lint all JS/Vue component files in `src/`
npm run lint

```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).


### eslint配置

``` json
{
    // 编辑粘贴自动格式化
    "editor.formatOnPaste": false,
    // 控制字体系列。
    "editor.fontFamily": "pingfang,Menlo, Monaco, 'Courier New', monospace",
    // 字体大小
    "editor.fontSize": 13,
    // 行高
    "editor.lineHeight": 26,
    // 保存自动修复
    "eslint.autoFixOnSave": true,
    // tab锁紧
    "editor.tabSize": 4,
    //屏幕缩放
    "window.zoomLevel": 0,
    // "workbench.colorTheme": "Solarized Light",
    //prettier代替vscode的自动格式化按键
    "prettier.eslintIntegration": true,
    //eslint的配置
    "eslint.validate": [
        "javascript",
        {
         "language": "vue",
         "autoFix": true
        }
    ],
    // 使用 js-beautify-html 插件格式化 html
    "vetur.format.defaultFormatter.html": "js-beautify-html",
    // 格式化插件的配置
    "vetur.format.defaultFormatterOptions": {
    
    },
    "files.autoSave": "afterDelay",
    "editor.renderWhitespace": "all",
    "editor.accessibilitySupport": "off",
}

```