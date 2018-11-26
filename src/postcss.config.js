module.exports = {
    // parser: 'sugarss',
    plugins: {
        "postcss-preset-env":{
            stage: 3,
            features: {
              'nesting-rules': true,
              'color-mod-function': { unresolved: 'warn' }
            }
        }
    }
  }