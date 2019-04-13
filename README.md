# vue-spa
這個 Repo 是一個基礎於 typescript 的 vue-spa 前端手腳架。  
僅用於練習搭建並記錄一個涵蓋以下[套件](##Packages])的前端開發環境  
隨著各個套件的更新(出新)，這裡會做相對應的更新，因此不會將此 Repo 加入真實專案的內容。  
有興趣的朋友可以看看[建構流程文件](#Documents)，並指正錯誤。  
當然如果你喜歡，歡迎 fork。
<br>
<br>

## Packages
在深入各個工具、套件之前，確保完成以下基本套件的安裝，  
當前這份文件只做安裝，具體配置將會分配在[各個文件](##Documents)之中。
- [nvm](##NVM)
- [vscode](###vscode)
- [typescript](###typescript)
- [eslint, prettier](###eslint-prettier)
- [jest](###jest)
- [webpack](###webpack)
- [vue](###vuejs)
- [apollo](###apollo)

### [NVM](https://github.com/creationix/nvm)
若開發環境已經有 nodejs 可以跳過這個步驟。
```shell
# 安裝 nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash

# 設定 nvm
export NVM_DIR="${XDG_CONFIG_HOME/:-$HOME/.}nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

# 安裝當前 nodejs lts 版本 v10
nvm install 10
```

### [Visual Studio Code](https://code.visualstudio.com/)
安裝以下幾個 vscode 插件，確保之後開發的語法高亮以及風格檢查可以正確執行。  
不曉得如何在 vscode 安裝插件嗎？請參考 [Managing Extensions in Visual Studio Code](https://code.visualstudio.com/docs/editor/extension-gallery)。
- ESLint
- Prettier - Code formatter
- Vetur

### [TypeScript](https://www.typescriptlang.org/)
安裝並建立定檔。
```shell
npm install --save-dev typescript
npx tsc --init
```

### [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)
安裝並建立定檔。
```shell
npm install --save-dev eslint prettier
touch ./.eslintrc.json
touch ./.eslintignore
touch ./.prettierrc
```

### [Jest](https://jestjs.io/)
安裝並建立定檔。
```shell
npm install --save-dev jest
npx jest --init
```

### [Webpack](https://webpack.js.org/)
安裝並建立定檔。
```shell
npm install --save-dev webpack webpack-cli
touch ./webpack.config.js
```

### [Vue](https://vuejs.org/)
安裝 vuejs 以及相關生態系統插件。
```
npm install --save vue vuex vue-router vue-i18n
```

### [Apollo](https://www.apollographql.com/)
如果你有興趣，並且想要將 Apollo-GraphQL 加入至專案  
在了解什麼是 [GraphQL](https://graphql.org/) 之後，請參考 [apollo](#) 文件。  

## Documents
在安裝[基本套件](##Packages)之後，接著我將依照以下順序設定各個工具、套件。
- [typescript](#)
- [eslint, prettier](#)
- [webpack for typescript](#)
- [webpack for css](#)
- [webpack for vuejs](#)
- [jest](#)
- [apollo](#)
