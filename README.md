# vue-spa
這個 Repo 是一個基礎於 typescript 的 vue-spa 前端手腳架。  
僅用於練習搭建並記錄一個涵蓋以下[套件](##Packages)的前端開發環境  
隨著各個套件的更新(出新)，這裡會做相對應的更新，因此不會將此 Repo 加入真實專案的內容。  
有興趣的朋友可以看看[建構流程文件](##Documents)，並指正錯誤。  
當然如果你喜歡，歡迎 fork。  

## 專案結構

- src/  
    程式的主要目錄。  
    - assets/  
        靜態且必須經過 webpack 處理的東西。
    - main.ts  
        程式的主要入口點。
- dist/  
    經編譯後的程式，  
    這個目錄被設定在 .gitignore 因此只有在編譯之後才會出現。
- types/  
    typescript 的各個型別設定檔。
- tests/  
    測試相關的東西。
- public/  
    放一些靜態且不需要經過 webpack 處理的東西。  
    - index.html  
        使用者訪問網站的唯一 html 檔案。  
- documents/  
    工具、套件等等的設定說明文件。

## 前置作業
在深入各個工具、套件之前，確保完成 [nodejs 安裝](###NVM)完成，  
如果沒有選定開發工具，這裡推薦使用 [VSCode](###VisualStudioCode)  
具體建構專案流程將會分配在[各個文件](##建構流程)之中。

### [NVM](https://github.com/creationix/nvm)
```shell
# 安裝 nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash

# 設定 nvm
export NVM_DIR="${XDG_CONFIG_HOME/:-$HOME/.}nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

# 安裝當前 nodejs lts 版本 v10
# 也可以使用 v11
nvm install 10
```

### [VisualStudioCode](https://code.visualstudio.com/)
安裝以下幾個 vscode 插件，確保之後開發的語法高亮以及風格檢查可以正確執行。  
不曉得如何在 vscode 安裝插件嗎？
請參考 [Managing Extensions in Visual Studio Code](https://code.visualstudio.com/docs/editor/extension-gallery)。
- ESLint
- Prettier - Code formatter
- Vetur

## 建構流程
在完成[前置作業](##前置作業)之後，接著依照以下順序設定各個工具、套件。  

- [EP1. webpack 與 typescript](https://github.com/cian6390/vue-spa/blob/master/documents/ep1-typescript-webpack.md)
- [EP2. webpack-dev-server](https://github.com/cian6390/vue-spa/blob/master/documents/ep2-webpack-dev-server.md)
- [EP3. 使用 typescript 寫 Vue 元件](https://github.com/cian6390/vue-spa/blob/master/documents/ep3-typescript-and-vuejs.md)
- [EP4. webpack 與 sass/scss](https://github.com/cian6390/vue-spa/blob/master/documents/ep4-webpack-and-sass.md)
- [EP5. 導入 eslint 與 prettier](https://github.com/cian6390/vue-spa/blob/master/documents/ep5-import-eslint-prettier.md)
- [EP6. 導入測試](https://github.com/cian6390/vue-spa/blob/master/documents/ep6-import-test.md)

## Advantage
Even the development is working, but that not everything  
We still have a lot stuff to imporve it  
And it will always like that ...  
<br>
Comming soon ...
