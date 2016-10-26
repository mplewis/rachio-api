var JspmWatch = require('jspm-watch')

var watcher = new JspmWatch({
  app: {
    input: 'src/rachio.js',
    output: 'dist/rachio.js'
  }
})

watcher.start()
