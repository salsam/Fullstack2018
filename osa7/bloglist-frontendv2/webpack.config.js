const path = require('path')
const webpack = require('webpack')

const config = (mode, argv) => {
  console.log(mode, argv)

  const backend_url = 'http://localhost:3003'
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js'
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      compress: true,
      port: 3000,
      historyApiFallback: true
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            plugins: [require('babel-plugin-transform-class-properties'),
              require('babel-plugin-transform-object-rest-spread'),
              require('babel-plugin-transform-runtime')],
            presets: ['env', 'react']
          }
        },
        {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader']
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backend_url)
      })
    ]
  }
}

module.exports = config
