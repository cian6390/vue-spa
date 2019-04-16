
# TypeScript and Vuejs

在 javascript 建立原件非常容易，但我們也因此失去了編輯器的智能推斷功能。 
而 typescript 中由於我們使用 `class` 來建立 Vue 元件, 因此編輯器能夠智能推斷上下文。 

Vuejs 的作者去時上有很貼心的為開發者寫了一個庫叫做 `vue-class-component`  
下面我們比較一下 javascript 跟 typescript 建立元件的差異。  

```javascript
// javascript
export default {
    name: 'CustomComponent',
    props: {
        propA: {
            type: String,
            default: ''
        },
        propB: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            msg: 'Hello Vuejs.'
        }
    },
    mounted() {
        console.log('CustomComponent mounted !')
    },
    methods: {
        greeting() {
            alert(this.msg)
        }
    }
}
```

```typescript
// typescript
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class CustomComponent extends Vue {
    msg: string = 'Hello Vuejs';
    @Prop({ type: String, default: '' }) propA!: string;
    @Prop({ type: Number, default: 0 }) propB!: number;
    mounted() {
        console.log('CustomComponent mounted !')
    }
    greeting() {
        alert(this.msg)
    }
}
```

或許你已經注意到，我使用的是 `vue-property-decorator` 而不是前文所說的 `vue-class-component`。  
事實上 `vue-property-decorator` 只是 `vue-class-component` 的在封裝，只是它提供了更多的 `裝飾器` 給我們。  

通過上面的範例，可以發現 typescript 的寫法，其實只是把原本 javascript 方式中的幾個物件成員  
改為 `class` 的屬性及方法，而且這樣的方式也讓程式縮排更少，可讀性也因此提高了。
最重要的是，由於使用 `class` 的關西，現在編輯器能夠智能地推斷出 `this` 是什麼。

好了，現在我們已經知道 typescript 可以帶給我們什麼好處
現在我們就開始將 typescript 導入專案

## Dependencies
- css-loader
- vue-loader
- vue-style-loader
- vue-template-compiler
- vue-property-decorator

```shell
npm install --save-dev css-loader vue-loader vue-style-loader vue-template-compiler vue-property-decorator
```

我們需要 `vue-loader` 讓 webpack 編譯編譯 `.vue` 文件。
而且，我們也希望 `.vue` 文件中的樣式能夠正確被編譯，因此 `css-laoder` 與 `vue-style-loader` 也是必要的。
事實上我們需要更多的配置來讓我們可以使用 css 預處理器，但我們不現在配置。

現在，我們需要先調整 webpack.config.js
1. import `vue-loader/lib/plugin`
2. add new rule of `.css` file
2. add new rule of `.vue` file
4. update rule of `.ts` to make it compile ts block of `.vue` file.
5. push the loader plugin in to webpack plugins

```javascript
// webpack.config.js
const path = require("path")
const CopyPlugin = require("copy-webpack-plugin")
const VueLoaderPlugin = require('vue-loader/lib/plugin')  // import vue-loader 插件

const isProd = process.env.NODE_ENV === 'production'
const mode = isProd ? 'production' : 'development'

const rootResolve = (file) => path.resolve(__dirname, file)

const devServer = {
  contentBase: rootResolve("dist"),
  port: 9000
}

const rules = [
  {
    test: /\.tsx?$/,
    use: {
      loader: 'ts-loader',
      // 新增這個設定，使 vue 元件中的 ts 可以正確的被 ts-loader 處理
      options: { appendTsSuffixTo: [/\.vue$/] }
    },
    exclude: /node_modules/
  }, {
    // 錫增 vue 文件的 loader
    test: /\.vue$/,
    loader: 'vue-loader'
  }, {
    // new rule for css, this make vue file style block working.
    test: /\.css$/,
    use: [
      'vue-style-loader',
      'css-loader'
    ]
  }
]

const resolve = {
  // 將 .vue 加入到 extensions
  // 這讓 wenpack 認得 vue 文件
  extensions: [".tsx", ".ts", ".js", ".vue"]
}

const plugins = [
  new VueLoaderPlugin(),  // 將 VueLoaderPlugin 加入 plugins 陣列
  new CopyPlugin([
    {
      from: rootResolve("public/index.html"),
      to: rootResolve("dist/index.html")
    }
  ])
]

module.exports = {
  mode,
  devServer,
  entry: "./src/main.ts",
  output: {
    filename: "bundle.js",
    path: rootResolve("dist")
  },
  resolve,
  module: { rules },
  plugins
}
```

建立一個 `App.vue` 文件來給 webpack 處理！！  

```shell
touch /src/App.vue
```

將以下內容複製到 `src/App.vue`，這只是一個很簡單的 VueComponent  

```typescript
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class App extends Vue {
    msg: string = 'Hello Vuejs';
}
</script>

<template>
    <h4 v-text="msg" />
</template>

<style scoped>
h4 {
    color: blue;
}
</style>
```

很快地你會注意到 vscode 提醒 App.vue 出現了一個警告  
現在我們更新 `tsconfig.json` 來解決這個問題

```javascript
// tsconfig.json
{
  "compilerOptions": {
    "module": "esnext",
    "target": "es5",
    "experimentalDecorators": true  // 加入這行設定
  }
}
```

如果 vscode 的警告依然存在，重新開啟編輯器可以解決這個問題。  
完成之後，接著調整 `src/main.ts` 文件  

```typescript
import Vue from 'vue';
import App from './App.vue';

new Vue({
  render(h) {
    return h(App)
  }
}).$mount('#app');
```

蹦 !! 再一次的又出現錯誤，而且這次是兩個！

1. Cannot find module 'vue'.
2. Cannot find module './App.vue'.

問題一是因為 typescript 對於模組的路徑處理不正確
將 `"moduleResolution": "node"` 加到 tsconfig.js 的 `compilerOptions` 之中來解決。

```javascript
// tsconfig.json
{
  "compilerOptions": {
    "module": "esnext",
    "target": "es5",
    "experimentalDecorators": true,
    "moduleResolution": "node"  // 追加這一行設定
}
```

問題二是因為現在 typescript 不認得 `.vue` 文件
接著新增一個型別設定檔案給 typescript，讓 typescript 認得 `.vue` 文件

```shell
touch types/vue-shims.d.ts
```

將以下內容複製到 `types/vue-shims.d.ts`
```typescript
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
```

現在，問題都解決了！關閉並再次執行 `npm run serve` 來使剛剛的設定生效。
這時候訪問 **http://localhost:9000** 應該要能夠看到藍色的 *Hello Vuejs*

### 下一步

雖然我們的 `.vue` 文件已經可以被 webpack 處理，但樣式處理器的部分還不夠好  
下一個步我們來導入 webpack `sass/scss` 處理器。

傳送門 => [webpack-and-sass](https://github.com/cian6390/vue-spa/blob/master/documents/webpack-and-sass.md)

#### Reference
- [vue-laoder](https://vue-loader.vuejs.org/)
- [vue-class-component](https://github.com/vuejs/vue-class-component)
- [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)
- [Compiler Options · TypeScript](https://www.typescriptlang.org/docs/handbook/compiler-options.html)