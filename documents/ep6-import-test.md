
# Jest

## 依賴

### [jest](https://jestjs.io/)
主要由 facebook 團隊所維護的測試工具

### [babel-jest](https://github.com/facebook/jest/tree/master/packages/babel-jest)
透過 babel-jest，可以使 jest 在運行時套用 babel 設定

### [vue-jest](https://github.com/vuejs/vue-jest)
vue-jest 用來 transform `.vue` 文件，沒有這個套件將無法測試 `.vue`文件

### [@vue/test-utils](https://vue-test-utils.vuejs.org/)
vue 官方所提供的測試開發套件，提供許多讓我們更好測試 VueComponent 的函數。

### [babel](https://babeljs.io/)
babel 用於處理 js 資源，由於我們所寫的程式是要給 browser，但測試環境是 nodejs  
所以在測試的時候我們需要透過 babel 幫我們處理一些東西，使其可以在 nodejs 環境下執行。  

#### [@babel/core](https://github.com/babel/babel/tree/master/packages/babel-core)
babel 的核心套件，只要需要使用到 babel，就必須安裝  
而 babel 的官方延伸套件例如 `babel-preset-*` 與 `babel-plugin-*`，  
現在程式統一在 babel github 的 [packages](https://github.com/babel/babel/tree/master/packages) 底下，並無外分 Repo

#### [babel-core](https://github.com/babel/babel-bridge)
這個套件很特別，由於專案內部分套件依賴的 babel 版本可能是 babel 7 之前的版本  
而專案開發人員(使用 babel 的人)，可能想要使用 babel 7  
但由於 babel 在 7 版之後已經使用 scope 的套件命名方式，所以只接改變套件名稱將會對專案造成破壞  
為此，`babel-core@7.0.0-bridge.0` 事實上只是一個過渡期的依賴。  

#### [@babel/preset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env)
一個 babel-preset 事實上只是多個 babel-plugin 的集合。  
`@babel/preset-env` 包含了所有新特性  

#### [@babel/plugin-syntax-dynamic-import](https://github.com/babel/babel/tree/master/packages/babel-plugin-syntax-dynamic-import)
由於前端程式使用 ES `import` 語法來 import 模組，nodejs 並不相同，因此需要透過這個 `plugin` 進行處理。  

#### [@babel/preset-typescript](https://github.com/babel/babel/tree/master/packages/babel-preset-typescript)
簡單通過這個 preset 來幫我們處理 `.ts` 文件。

#### @types/jest
由於我們使用 ts 來寫測試，因此需要安裝來自於 [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) 的 jest 型別。  

#### 快速安裝

```shell
npm install --save-dev @babel/core @babel/plugin-syntax-dynamic-import @babel/preset-env @babel/preset-typescript
npm install --save-dev jest @types/jest vue-jest babel-jest @vue/test-utils babel-core@7.0.0-bridge.0
touch ./jest.config.js
touch ./babel.config.js
```

## 設定

1. 設定 babel，使其幫我們轉換 es 模組、vue 文件至 node 看得懂的文件
2. 設定 jest，讓 jest 知道在測試時，面對不同的文件，該如何處理

### jest.config.js
```javascript
module.exports = {
  // 讓 jest 知道要處理以下這幾種類型的文件
  // 在未來遇到其他文件類型時，這裡也需要做相對應的調整
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  // 告訴 jest 在遇到哪些副檔名，要交由哪些套件處理
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.[jt]sx?$': 'babel-jest'
  },
  // 像是 webpack 的 alias 設定，我們也需要告訴 jest '@' 所代表的位置
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  globals: {
    'ts-jest': {
      babelConfig: 'babelrc.config.js'
    }
  }
}
```

### Babel
```javascript
module.exports = api => {
  // 判斷是否為測試環境的 flag
  const isTest = api.env('test')
  // 所以環境下都會使用到的通用 preset
  const presets = ['@babel/preset-typescript']
  // 所有環境下都會使用到的通用 plugin
  const plugins = ['@babel/plugin-syntax-dynamic-import']

  // 由於我們使用 js config 的方式
  // babel 在每次運行時都需要重新計算 configure file
  // 我們可以通過設定 true 來告訴 babel cache 這個設定結果
  // 用法還有很多，請參考 https://babeljs.io/docs/en/config-files#apicache
  api.cache(true)

  const presetEnv = ['@babel/preset-env']

  /**
   * 下面這段程式，由於測試環境的不同，
   * 我們所需要 babel 轉譯的結果也不同
   * 因此通過 isTest 來決定 @babel/preset-env 設定
   */
  if (isTest) {
    // 給測試環境的設定，我們僅需提示 babel 所使用的是 nodejs 以及其版本
    presetEnv[1] = {
      targets: {
        node: 'current'
      }
    }
  } else {
    // 給瀏覽器的設定，我們想要最小化的轉譯
    // 詳細請參考 https://babeljs.io/docs/en/babel-preset-env
    presetEnv[1] = {
      corejs: '2',
      useBuiltIns: 'usage',
      modules: false
    }
  }

  presets.unshift(presetEnv)

  return { presets, plugins }
}
```

## 使用

新增一隻測試檔案 `tests/App.spec.ts` 並輸入以下內容  

```typescript
// tests/App.spec.ts
import App from '@/App.vue'
import { shallowMount } from '@vue/test-utils'

test('App should render  the msg prop', () => {
  const msg = 'vue test'
  const wrapper = shallowMount(App, {
    propsData: { msg }
  })

  expect(wrapper.html()).toContain(msg)
})
```

確認你的 `package.json` 中 scripts 欄位有 `test` 命令  
```javascript
{
  // 一些其他設定 ...
  "scripts": {
    "test": "jest",
    // 一些其他命令 ...
  },
  // 一些其他設定 ...
}
```

現在執行 `npm run test`，如果一切順利，將會看一個 `.vue` 文件的測試通過。

## 下一步

到目前為止，專案已經導入大部分的主要功能  
但有些設定並不夠完善，下一步，在我們繼續往前之前，把專案稍作整理。
