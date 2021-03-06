const { createImportSpecifier } = require("typescript");
const fs = require('fs')
const path = require('path')

class BasicPlugin {
  // 在构造函数中获取用户给该插件传入的配置
  constructor(options) {
    console.log('options: ', options);
    fs.watch(path.resolve(__dirname, '../src'), (e, filename) => {
      console.log('filename123: ', filename);
    })
  }
  // Webpack 会调用 BasicPlugin 实例的 apply 方法给插件实例传入 compiler 对象
  // compiler.plugin(事件名称, 回调函数) 监听到 Webpack 广播出来的事件。 并且可以通过 compiler 对象去操作 Webpack。
  apply(compiler) {
    let test
    compiler.plugin('compilation', function(compilation) {
      // console.log('compilation: ', typeof compilation);
      test = compilation
      console.log('from basic plugin')
    })
    compiler.hooks.compilation.tap('compilation', compilation => {
      console.log('compilation: ',  compilation === test);
      console.log('from basic plugin2')
    })

    compiler.hooks.afterCompile.tap('MyPlugin', (compilation, callback) => {
      // 把 HTML 文件添加到文件依赖列表，好让 Webpack 去监听 HTML 模块文件，在 HTML 模版文件发生变化时重新启动一次编译
      // compilation.fileDependencies.push(filePath);
      console.log('after compile')
      console.log(compilation.chunks.length)
      compilation.chunks.forEach(function (chunk) {
              // 检索由 chunk 生成的每个资源(asset)文件名：
        chunk.files.forEach(function(filename) {
          console.log('filename: ', filename);
          // Get the asset source for each file generated by the chunk:
          var source = compilation.assets[filename].source();
          // console.log('source: ', source);
        });
      })
      // callback();
    });


    compiler.hooks.watchRun.tap('watch', (compiler, callback) => {
      const fileWatcher = compiler.watchFileSystem.watcher.mtimes;
      console.log(111);
      console.log(Object.keys(fileWatcher));
      console.log(222);
    })
    
  }
}

module.exports = BasicPlugin;