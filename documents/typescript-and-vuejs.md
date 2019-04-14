
# TypeScript and Vuejs

Create VueComponent in javascript is very easy, but in that way we loose type hint.  
In typescript we will use `class` to create VueComponent then we can get the types.

The auth of vuejs has already provide a lirbrary calls `vue-class-component`.  
let see a basic example compare with javascript and typesript.

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

Maybe you note that I I use `vue-property-decorator` instead of `vue-class-component`.  
actually the `vue-property-decorator` is just a wrapper of `vue-class-component` library,  
but provide more `decorator` for us.  

You can see that typescript is just assign object members to class property.  
and the point is that way of javascript make edior doesn't understand what is `this`  
because literal object doen't instantialize any `class`, there is no context exist.  
but in typescript we use `class`, so editor can get the context.  

OK! now we know the gold of typescript  
let's make it working in out development.  

## Dependencies
- css-loader
- vue-loader
- vue-style-loader
- vue-template-compiler
- vue-property-decorator

```shell
npm install --save-dev css-loader vue-loader vue-style-loader vue-template-compiler vue-property-decorator
```

To make webpack compile `.vue` file, we need vue-loader  
of course we need `<style>` too, so `css-laoder` and `vue-style-loader` both are required  
we will need more loader for styling, but not do it now  

let's finsh these steps in webpack.config.js to make `.vue` work  
1. import `vue-loader/lib/plugin`
2. add new rule of `.css` file
2. add new rule of `.vue` file
4. update rule of `.ts` to make it compile ts block of `.vue` file.
5. push the loader plugin in to webpack plugins

```javascript
// webpack.config.js
const path = require("path")
const CopyPlugin = require("copy-webpack-plugin")
const VueLoaderPlugin = require('vue-loader/lib/plugin')  // import vue-loader plugin

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
      options: { appendTsSuffixTo: [/\.vue$/] } // update for .vue file
    },
    exclude: /node_modules/
  }, {
    // new rule for .vue file
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
  extensions: [".tsx", ".ts", ".js", ".vue"]  // let webpack reslove .vue file
}

const plugins = [
  new VueLoaderPlugin(),  // add VueLoaderPlugin
  new CopyPlugin([
    {
      from: rootResolve("public/index.html"),
      to: rootResolve("dist/index.html")
    }
  ])
]

module.exports = {
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

let's create a `.vue` let webpack compile it!!

```shell
touch /src/App.vue
```

and copy the content below into `src/App.vue`

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

you will get a warning of App.vue from typescript.  
let's update tsconfig.json to fix it.  

```javascript
// tsconfig.json
{
  "compilerOptions": {
    "module": "esnext",
    "target": "es5",
    "experimentalDecorators": true  // add this line
  }
}
```

if you still get the warning, reload vscode should fix it.  
next, update the `src/main.ts`  

```typescript
import Vue from 'vue';
import App from './App.vue';

new Vue({
  render(h) {
    return h(App)
  }
}).$mount('#app');
```

Boom!! we will get error again. and this time we got two!!  

1. Cannot find module 'vue'.
2. Cannot find module './App.vue'.

let modify tsconfig.json to fix first issue.  
insert `"moduleResolution": "node"` into `compilerOptions`

```javascript
// tsconfig.json
{
  "compilerOptions": {
    "module": "esnext",
    "target": "es5",
    "experimentalDecorators": true,
    "moduleResolution": "node"  // add this line
  }
}
```

then create `.vue` module declaration file to fix second issue.  

```shell
touch types/vue-shims.d.ts
```

inster this content below into `types/vue-shims.d.ts` file  
```typescript
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
```

now, run `npm run serve` and visit **http://localhost:9000**  
you should see *Hello Vuejs* with blue color.  

### Next step

Our css is working, but in real world we may use it will processers, such as sass, less, stylus etc...  
in next episode let make sass working  

Quick link => [webpack-and-sass](https://github.com/cian6390/vue-spa/blob/master/documents/webpack-and-sass.md)

#### Reference
- [vue-laoder](https://vue-loader.vuejs.org/)
- [vue-class-component](https://github.com/vuejs/vue-class-component)
- [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)
- [Compiler Options · TypeScript](https://www.typescriptlang.org/docs/handbook/compiler-options.html)