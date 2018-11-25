const path = require('path');
const PWAPlugin = require('pwa');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const app = new PWAPlugin({
  name: 'Marker',
  scope: 'marker',
  description: "Markdown Notepad",
  theme: '#fffff0',
  tag: 4
})

module.exports = [
  {
    name: 'client',
    entry: './main.js',
    target: 'web', // by default
    output: {
      path: path.resolve(__dirname, 'docs'),
      filename: 'bundle.[contenthash].js',
    },
    watch: true,
    mode: 'development',
    devServer: {
      contentBase: path.join(__dirname, 'docs'),
      port: 3012
    },
    plugins: [
      new CleanWebpackPlugin(['docs']),
      app
    ]
  }
];
