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
