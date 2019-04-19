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
