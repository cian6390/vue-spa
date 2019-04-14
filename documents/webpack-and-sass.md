
# Webpack and Sass

befor start to configure, let refac our webpack.config.js again like below

```javascript
// webpack.config.js

const path = require("path")
const CopyPlugin = require("copy-webpack-plugin")
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const rootResolve = (file) => path.resolve(__dirname, file)

const devServer = {
  contentBase: rootResolve("dist"),
  port: 9000
}

const tsRule = {
  test: /\.tsx?$/,
  use: {
    loader: 'ts-loader',
    options: { appendTsSuffixTo: [/\.vue$/] }
  },
  exclude: /node_modules/
}

const vueRule = {
  test: /\.vue$/,
  loader: 'vue-loader'
}

const styleRule = {
  test: /\.css$/,
  use: [
    'vue-style-loader',
    'css-loader'
  ]
}

const resolve = {
  extensions: [".tsx", ".ts", ".js"]
}

const plugins = [
  new VueLoaderPlugin(),
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
  module: {
    rules: [
      tsRule,
      vueRule,
      styleRule
    ]
  },
  plugins
}

```

OK! let do this  
make style procssors working  

## Dependencies
- sass-loader
- node-sass
- postcss
- postcss-loader
- autoprefixer

```shell
npm install --save-dev node-sass postcss autoprefixer sass-loader postcss-loader
touch ./.browserslistrc
touch ./postcss.config.js
```

in this step we create two configue file `.browserrc` and `postcss.config.js`  

### .browserrc
let insert the context into `.browserrc` like below  
and that actually the default value of `browserrc`  

```
> 0.5%
last 2 versions
Firefox ESR
not dead
```

### postcss.config.js
let insert the context into `.browserrc` like below  
and that actually the default value of `browserrc`  

```javascript
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```

### webpack.config.js

```javascript
// webpack.config.js

// ... 


// remove current styleRule
// const styleRule = {
//   test: /\.css$/,
//   use: [
//     'vue-style-loader',
//     'css-loader'
//   ]
// }

// create new styleRule for sass/scss
const styleRule = {
  test: /\.s[ac]ss$/,
  use: [
    'vue-style-loader',
    'css-loader',
    'postcss-loader',
    'sass-loader'
  ]
}
// ...
```

### src/App.vue

Update the style block of `src/App.vue` 

```typescript
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class App extends Vue {
    msg: string = 'Hello Vuejs';
}
</script>

<template>
    <h4 v-text="msg" />
</template>

<style lang="scss" scoped>
h4 {
    color: blue;
    &:hover {
        color: red;
    }
}
</style>
```

rerun the command `npm run serve`, make sure the compile success.  
and open browser check the `h4:hover` style working.  

### Next step


#### Reference
- [browserlist](https://github.com/browserslist/browserslist)
- [autoprefixer](https://github.com/postcss/autoprefixer#options)
- [node-sass](https://github.com/sass/node-sass)
- [postcss](https://github.com/postcss/postcss)
- [postcss-loader](https://github.com/postcss/postcss-loader)
- [sass-loader](https://github.com/webpack-contrib/sass-loader)
- [webpack#sass-loader](https://webpack.js.org/loaders/sass-loader/#root)
