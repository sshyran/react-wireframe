const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = ({ publicPath = '/react-wireframe' } = { publicPath: '/react-wireframe' }) => ({
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    publicPath,
  },
  entry: [
    `webpack-dev-server/client?http://localhost:${process.env.PORT || 3000}`,
    'webpack/hot/dev-server',
    path.join(__dirname, 'index.js'),
  ],
  module: {
    rules: [
      // Babel loader, will use your project’s .babelrc
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                'env',
                {
                  targets: {
                    browsers: ['last 2 versions'],
                  },
                },
              ],
              'react',
            ],
            plugins: ['transform-object-rest-spread', 'transform-runtime', 'babel-plugin-transform-class-properties'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|webp|ico)$/,
        use: 'file-loader',
      },
      {
        test: /\.(svg|woff|woff2|eot|otf|ttf)$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
      inject: 'body',
      filename: 'index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
});
