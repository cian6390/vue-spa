
# ESLint, Prettier

`eslint` 是程式語法檢查器, 而 `prettier`則是拿來修正程式格式。  
透過這兩個工具再加上 `husky`, `lint-staged` 來自動化檢查，即可做到風格一致的需求。  

## ESLint

> 為什麼要用 eslint 檢查 typescript，請看 [Using ESLint and Prettier in a TypeScript Project](https://dev.to/robertcoopercode/using-eslint-and-prettier-in-a-typescript-project-53jb)

### 依賴

```shell
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin husky
touch ./eslintrc.js
touch .eslintignore
```

這個步驟我們除了安裝依賴之外，也額外建立了以下幾個設定檔，  
- `.eslintrc.js` eslint 的主要設定檔文件
- `.eslintignore` 告訴 eslint 哪些目錄、檔案不要檢查的設定檔文件

> 使用 `.eslintrc.js`，的原因是因為 `js` 格式比 `json` 格式更靈活。  

### 設定

將以下內容複製到 `.eslintrc.js` 文件之中。  

```javascript
module.exports = {
  parser: "@typescript-eslint/parser",  // 使用 ts-parser 來檢查語法
  env: {
    es6: true,  // 啟用全局es6特性
    browser: true   // 提示 eslint 要導入 browser 全局特性
  },
  parserOptions: {
    ecmaVersion: 8, // 目前可以介於 3 ~ 10，取決於專案使用到 es{n} 的語法。
    sourceType: "module",   // script, module 2選1，模組化開發一律使用 "module"
  },
  extends: [
    // 啟用 typescript 的 recommended 程式碼風格
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    // 一些個人或團隊的自定義規則
  }
};
```
### package.json

#### 新增 lint 命令

加入新命令 `"lint": "eslint \"src/**/*.ts\""` 到 package.json 的 scripts 之中，  
現在 packages.json 的 scripts 裡頭應該要像這樣

```json
{
    "test": "jest",
    "build": "rimraf dist && webpack",
    "serve": "webpack-dev-server",
    "lint": "eslint \"src/**/*.ts\""
}
```

現在我們的 eslint 已經知道該如何檢查 `.ts` 文件，  
執行命令 `npm run lint` 來檢查並 src 目錄中的所有 ts 文件。

#### 新增 pre-commit

將以下內容加入 `package.json`，來啟用 `pre-commit`  
在這之後，我們所有的 `commit` 都會先觸發 `lint` 命令，確保所提交程式碼風格符合規範。  

```javascript
{
  // 一些其他設定 ....
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint"
    }
  },
  // 一些其他設定 ...
}
```

## Prettier

### 依賴

- prettier
- eslint-config-prettier
- eslint-plugin-prettier

```shell
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
touch ./prettierrc.js
```

將以下設定複製並貼入 `prettierrc.js`  

```javascript
module.exports = {
  trailingComma: "none",  // 永不使用尾隨逗號
  tabWidth: 2,  // 使用 2個 空白的縮排
  semi: true,  // 使用分號
  singleQuote: true // 使用單引號
};
```

接著更新 `.eslintrc.js`

```javascript
module.exports = {
  parser: "@typescript-eslint/parser",  // 使用 ts-parser 來檢查語法
  env: {
    es6: true,  // 啟用全局es6特性
    browser: true   // 提示 eslint 要導入 browser 全局特性
  },
  parserOptions: {
    ecmaVersion: 8, // 目前可以介於 3 ~ 10，取決於專案使用到 es{n} 的語法。
    sourceType: "module",   // script, module 2選1，模組化開發一律使用 "module"
  },
  extends: [
    // 啟用 typescript 的 recommended 程式碼風格
    'plugin:@typescript-eslint/recommended',

    // 繼承 plugin:prettier/recommended 使得 prettier 得以跟 eslint 合作
    // 更多資訊請閱讀 https://prettier.io/docs/en/integrating-with-linters.html#use-eslint-to-run-prettier
    'plugin:prettier/recommended' 
  ],
  rules: {
    // 一些個人或團隊的自定義規則
    "@typescript-eslint/explicit-function-return-type": false
    // 以下 "index" 規則是一個範例
    // 當 prettier 規則與 eslint 衝突時，應該先將其關閉(設為"off")
    // 然後再寫入個人或團隊所想要的規則。
    "indent": "off",
    "@typescript-eslint/indent": ["error", 2],
  }
};
```

最後新增命令 `"format": "prettier --write \"src/**/*.ts\""` 至 `package.json`  

```javascript
{
  // 一些其他設定 ...
  "scripts": {
    "test": "jest",
    "build": "rimraf dist && webpack",
    "serve": "webpack-dev-server",
    "lint": "eslint \"src/**/*.ts\"",
    "format": "prettier --write \"src/**/*.ts\""
  },
  // 一些其他設定 ...
}
```

先在我們可以使用 `npm run format` 來修正程式碼風格

## Vue

現在我們的 ESLint 跟 Prettier，僅針對 `.ts` 文件做檢查  
接著我們來讓他一併檢查 `.vue` 文件。

### 依賴

- eslint-plugin-vue

```shell
npm install --save-dev eslint-plugin-vue
```

### 設定

將 `'plugin:vue/recommended'` 加入 `.eslintrc.js` 的 `extends` 之中  
以及調整 `parser` 屬性至 `parserOptions` 物件裡，請參考註解說明。  

```javascript
module.exports = {
  env: {
    es6: true,  // 啟用全局es6特性
    browser: true   // 提示 eslint 要導入 browser 全局特性
  },
  parserOptions: {
    // vue 依賴全局的 "parser" 屬性去驅動 "vue-eslint-parser"
    // 所以全局 parser 如果有定義，將會使 vue-eslint-parser 壞掉
    // 因此我們需要把自訂 parser 設定移動到這裡
    // 使用 ts-parser 來檢查語法
    parser: "@typescript-eslint/parser",  
    ecmaVersion: 8, // 目前可以介於 3 ~ 10，取決於專案使用到 es{n} 的語法。
    sourceType: "module",   // script, module 2選1，模組化開發一律使用 "module"
  },
  extends: [
    // 啟用 typescript 的 recommended 程式碼風格
    'plugin:@typescript-eslint/recommended',

    // 繼承 vue-plugin 的 recommended 設定
    'plugin:vue/recommended',

    // 繼承 plugin:prettier/recommended 使得 prettier 得以跟 eslint 合作
    // 更多資訊請閱讀 https://prettier.io/docs/en/integrating-with-linters.html#use-eslint-to-run-prettier
    'plugin:prettier/recommended' 
  ],
  rules: {
    // 一些個人或團隊的自定義規則
    "@typescript-eslint/explicit-function-return-type": false,
    // 以下 "index" 規則是一個範例
    // 當 prettier 規則與 eslint 衝突時，應該先將其關閉(設為"off")
    // 然後再寫入個人或團隊所想要的規則。
    "indent": "off",
    "@typescript-eslint/indent": ["error", 2]
  }
};
```

在這之後，我們要讓 `lint`、`format` 命令檢查 `.vue` 文件。  
修改 `package.json` 的 `scripts` 如以下  

```javascript
{
  // 一些其他設定 ...
  "scripts": {
    "test": "jest",
    "build": "rimraf dist && webpack",
    "serve": "webpack-dev-server",
    "lint": "eslint \"src/**/*.{ts,vue}\" --fix",
    "format": "prettier --write \"src/**/*.{ts,vue}\""
  },
  // 一些其他設定 ...
}
```

## 下一步

現在我們可以寫 typescript、也可以使用命令檢查程式語法、格式  
該是時候導入測試工具了

傳送門 => [import-test](https://github.com/cian6390/vue-spa/blob/master/documents/ep6-import-test.md)

#### 參考資料
- [ESLint](https://eslint.org/)
- [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)
- [Prettier](https://prettier.io/)
- [eslint-plugin-vue](https://eslint.vuejs.org/)
