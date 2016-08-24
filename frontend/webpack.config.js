module.exports.getConfig = function(type) {

  var isDev = type === 'development';

  var config = {
    entry: './app/scripts/main.jsx',
    output: {
      path: __dirname,
      filename: 'main.js'
    },
    debug : isDev,
    module: {
      loaders: [{
        test: /\.jsx?$/,
        include: __dirname + '/app',
        exclude: [/node_modules/, 'scripts/config-example.jsx'],
        loader: 'babel-loader'
      }]
    },
    query: {
      presets:['react', 'es2015']
    }
    // externals: {
    //   // 'react': 'React',
    //   'react/lib/ExecutionEnvironment': true
    // }
  };

  if(isDev){
    config.devtool = 'eval';
  }

  return config;
}
