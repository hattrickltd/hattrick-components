const sass = require('@stencil/sass');

exports.config = {
  namespace: 'ht-stencil',
  outputTargets:[
    { 
      type: 'dist' 
    },
    { 
      type: 'www',
      serviceWorker: false
    }
  ],
  globalStyle: 'src/global/variables.css',
  plugins: [
    sass({
      // https://github.com/ionic-team/stencil-sass/pull/2
      injectGlobalPaths: [
        // 'src/global/variables.scss',
        'src/global/mixins.scss'
      ]
    })
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**',
}
