const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
//   plugins:[
//       new HtmlWebpackPlugin()
//   ],
  module: {
      rules: [
          {
              test: /\.css$/,
              use: [
                  'style-loader',
                  'css-loader'
              ]
          },
          {
            test: /\.(png|svg)$/,
            use: [
                'file-loader'
            ]
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
                'babel-loader'
            ]
          }
      ]
  }
};