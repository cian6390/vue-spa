module.exports = {
  env: {
    es6: true, // 啟用全局es6特性
    browser: true // 提示 eslint 要導入 browser 全局特性
  },
  parserOptions: {
    // vue 依賴全局的 "parser" 屬性去驅動 "vue-eslint-parser"
    // 所以全局 parser 如果有定義，將會使 vue-eslint-parser 壞掉
    // 因此我們需要把自訂 parser 設定移動到這裡
    // 使用 ts-parser 來檢查語法
    parser: '@typescript-eslint/parser',
    ecmaVersion: 8, // 目前可以介於 3 ~ 10，取決於專案使用到 es{n} 的語法。
    sourceType: 'module' // script, module 2選1，模組化開發一律使用 "module"
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
    '@typescript-eslint/no-var-requires': false,
    '@typescript-eslint/explicit-function-return-type': false,
    // 以下 "index" 規則是一個範例
    // 當 prettier 規則與 eslint 衝突時，應該先將其關閉(設為"off")
    // 然後再寫入個人或團隊所想要的規則。
    'indent': 'off',
    '@typescript-eslint/indent': ['error', 2]
  }
}
