const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let htmlPageNames = ['colors-type', 'form-elements'];
let multipleHtmlPlugins = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    template: `./src/pages/${name}/${name}.pug`, // relative path to the HTML files
    filename: `${name}.html`, // output HTML files
    chunks: [`${name}`] // respective JS files
  })
});


module.exports = {
  entry: {
    'colors-type': path.join(__dirname, 'src', 'pages', 'colors-type', 'colors-type.js'),
    'form-elements': path.join(__dirname, 'src', 'pages', 'form-elements', 'form-elements.js'),
  },
	output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.[contenthash].js',
    assetModuleFilename: path.join('images', '[name].[contenthash][ext]'),
  },
    module: {
      rules: [
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
        generator: {
          filename: path.join('icons', '[name].[contenthash][ext]'),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
        },
      ],
    },
  plugins: [
    new FileManagerPlugin({
      events: {
        onStart: {
          delete: ['dist'],
        },
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    /*new HtmlWebpackPlugin({
      template: "./src/pages/form-elements/form-elements.pug",
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/colors-type/colors-type.pug",
      chunks: ['colors-type']
    })*/
  ].concat(multipleHtmlPlugins),

  devServer: {
  watchFiles: path.join(__dirname, 'src', 'pages',),
  port: 9000,
  },
};
