# rachio-api

## Quickstart

```
npm install jspm --save-dev

jspm install
```

Manually monkeypatch form-data, from [here](https://github.com/form-data/form-data/pull/272/files)

```
diff --git a/lib/browser.js b/lib/browser.js
index f683b05..bb8ddea 100644
--- a/lib/browser.js
+++ b/lib/browser.js
@@ -1,2 +1,2 @@
 /* eslint-env browser */
-module.exports = self.FormData;
+module.exports = (typeof self === 'undefined' ? global : self).FormData;
```

Start the demo

```
jspm run demo
```