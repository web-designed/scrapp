
   const path = require('path')
   const ExtractTextPlugin = require('extract-text-webpack-plugin')
   const webpack = require('webpack')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   // const ModernizrWebpackPlugin = require('modernizr-webpack-plugin');

   module.exports = (env) => {

      const isProduction = env === 'production';
      const isStaging = env === 'staging';

      const CSSExtract = new ExtractTextPlugin({
         filename: '[name].css'
      });

      return {
         entry    : {
            app: './src/js/app.js',
            contact: './src/js/contact.js'
         },
         output   : {
            filename : '[name].bundle.js',
            chunkFilename: '[name].chunk.js', //naming convention for the codesplitting
            path     : path.resolve(__dirname, 'public/'),
            publicPath: isStaging ? 'https://stagingurl.com/assets/' : '/',
            // publicPath: isStaging ? 'https://stagingurl.com/assets/' : '/assets/',
         },
         module: {
            rules:[
               {
                  test: /\.js?$/,
                  loader:'babel-loader',
                  exclude: /node_modules\/(?!(dom7|swiper)\/).*/,
               }, {
                  test:/\.s?css$/,
                  use: CSSExtract.extract({
                     use: [
                        {
                           loader: 'css-loader',
                           options: {
                              sourceMap: true
                           }
                        },
                        {
                           loader: "postcss-loader",
                           options: {
                              sourceMap: true
                           }
                        },
                        {
                           loader:'sass-loader',
                           options: {
                              sourceMap: true
                           }
                        }
                     ]
                  })
               },
               {
                  test: /\.(eot|svg|ttf|woff|woff2)$/,
                  use: [
                     'file-loader'
                  ]
               }
            ]
         },
         plugins: [

            // optimize the performance with the commons chunks plugin
            new webpack.optimize.CommonsChunkPlugin({
               name: 'common'
            }),

            CSSExtract,

            //html
            new HtmlWebpackPlugin({
               title: 'Scrapp - webpack boilerplate',
               template: 'ejs-render-loader!./src/templates/index.ejs',
               chunks: ['app', 'common']
            }),

            new HtmlWebpackPlugin({
               title: 'contact.html',
               filename: 'contact.html',
               template: 'ejs-render-loader!./src/templates/contact.ejs',
               chunks: ['contact', 'common']
            }),

            new HtmlWebpackPlugin({
               title: 'about.html',
               filename: 'about.html',
               template: 'ejs-render-loader!./src/templates/about.ejs',
               chunks: ['about', 'common']
            })

            // modernizr
            // new ModernizrWebpackPlugin({
            //    'feature-detects': [
            //       'a/download'
            //    ],
            //    filename: 'modernizr.js',
            //    minify: {
            //       output: {
            //         comments: true,
            //         beautify: true
            //       }
            //    }
            // }),

            // Make bootstrap work with jquery
            // new webpack.ProvidePlugin({
            //    '$': 'jquery',
            //    jQuery: 'jquery',
            //    Popper: 'popper.js',
            //    Popper: ['popper.js', 'default'],
            //    'Util': "exports-loader?Util!bootstrap/js/dist/util",
            //    'Collapse': "exports-loader?Dropdown!bootstrap/js/dist/collapse"
            // })
         ],
         devtool: isProduction || isStaging ? 'source-map' : 'inline-source-map',
         devServer: {
            contentBase: path.join(__dirname, "public"),
            historyApiFallback: true,
            publicPath: '/' //serve the memory files from this directory
         }
      };
   };

   //loader
