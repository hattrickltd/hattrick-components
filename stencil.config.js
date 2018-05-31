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
      injectGlobalPaths: [
        'src/global/mixins.scss'
      ]
    })
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**',
}
