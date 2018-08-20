const path = require('path');
var webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2' // THIS IS THE MOST IMPORTANT LINE! :mindblow: I wasted more than 2 days until realize this was the line most important in all this guide.
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        loader: "babel-loader", // or just "babel"
        query: {
            presets: ['es2015', 'stage-0']
        }
      }
    ]
  },
  externals: {
    'react': 'commonjs react' // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    // new webpack.ProvidePlugin({
    //   React: 'react'
    // }),
    // new webpack.IgnorePlugin(/moment/),
    // new webpack.IgnorePlugin(/immutable/),
    // new webpack.IgnorePlugin(/antd/),
    // new webpack.IgnorePlugin(/react/),
    // new webpack.IgnorePlugin(/react-dom/)
  ]
};
