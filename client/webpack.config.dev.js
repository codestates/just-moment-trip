const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  name: 'just-moment-trip',
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'index_bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
  ],

  resolve: {
    // 프로젝트의 루트디렉토리 설정, 상대경로 대신에 절대경로 가능하도록 함.(../components -> /components)
    extensions: ['*', '.js', '.jsx'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  devServer: {
    host: 'localhost',
    port: 9000,
    open: true, // open page when start
    historyApiFallback: true,
  },
};
