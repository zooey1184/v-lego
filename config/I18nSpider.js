const pluginName = 'I18nSpider'

class I18nSpiderWebpackPlugin {
  apply(compiler){
    compiler.hooks.beforeRun.tap(pluginName, (compilation, args) => {
      console.log('=======\n\n',compilation, args, '\n\n=========');
    })
  }
}

module.exports = I18nSpiderWebpackPlugin