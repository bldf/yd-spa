module.exports = {
    // parser: 'sugarss',
    plugins: {
        "postcss-preset-env":{
            stage: 1,
            features: {
              'nesting-rules': true,
              'color-mod-function': { unresolved: 'warn' }
            }
        }
    }
  }