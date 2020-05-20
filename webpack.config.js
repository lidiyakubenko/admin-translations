const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

config = {
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    pathinfo: false,
  },
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Calendar Mac OS',
      template: './index.html',
    }),
    new CleanWebpackPlugin(),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru/),
  ],
};

const [, ...rules] = config.module.rules;

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map';
    config.devServer = {
      contentBase: './dist',
      hot: true,
      port: 3000
    };
    config.plugins = [
      ...config.plugins,
      new webpack.HotModuleReplacementPlugin(),
    ];
  }

  if (argv.mode === 'production') {
    config.devtool = 'cheap-source-map';
    config.plugins = [
      ...config.plugins,
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
    ];

    config.optimization = {
      noEmitOnErrors: true,
      runtimeChunk: true,
      minimizer: [new TerserJSPlugin()],
      splitChunks: {
        chunks: 'all',
      },
    };

    config.module.rules = [
      ...rules,
      {
        test: /\.(css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ];
  }

  return config;
};
