The base files for build system with gulp and webpack

## CLI

```bash
npm run build:dev
npm run build:prod
npm run clean
```

Note that these tasks require global installation for gulp4 and webpack:
```bash
sudo npm i -g webpack gulpjs/gulp#4.0
```

If you have win system then you need replace scripts block in package.json:
```json
...
"scripts": {
  "clean": "gulp clean",
  "build:dev": "gulp build",
  "build:prod": "set NODE_ENV=production&&gulp build",
  "watch": "set LIVE_RELOAD=true&&gulp watch"
},
...
```

## Tasks

* JS task (`gulp js`)
  - webpack
  - babel
  - sourcemaps (for watching mode)
  - minification with uglify (for production)
  - generates json with bundles (by assets-webpack-plugin for production)

* CSS task (`gulp css`)
  - inline sourcemaps (for watching mode)
  - stylus
  - minification (for production)
  - autoprefixer
  - normalize.css
  - integration images in base64 for lines: (`background: url("/test.svg#base64")`)
  - csscomb sorts (for develop mode)
  - images for base64 integration are located in the dir `frontend/img/base64/`

* HTML task (`gulp html`)
  - jade
  - minification (for production)

* SVG sprite task (`gulp sprite`)
  - remove fill and style attributes from svg
  - optimization svg
  - svg files are located in the dir `frontend/img/sprite/`
  - svg sprite in symbol mode (`use xlink:href="assets/img/sprite.svg#my-icon"`). read this [article](https://css-tricks.com/svg-use-external-source/)

* Image task (`gulp img`)
  - optimization images from the dir `frontend/img/content/`

* Copy task
  - js files (`gulp js:copy`)
  - fonts from the dir `frontend/fonts/` (`gulp fonts`)

* Clean task
  - clean output dir (`dist`)
