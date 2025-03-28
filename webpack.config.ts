import path from 'path';
import webpack, { ModuleOptions } from 'webpack';
import autoprefixer from 'autoprefixer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

type EnvVariables = {
  mode: 'production' | 'development',
  port: number,
};

export default (env: EnvVariables) => {
  const isProd = env.mode === 'production';

  const buildLoaders = (): ModuleOptions['rules'] => {
    const cssLoader = {
      loader: 'css-loader',
      options: {
        url: false,
      },
    };

    const postCssLoader = {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            autoprefixer({
              overrideBrowserslist: ['ie >= 9', 'last 4 versions'],
            }),
          ],
        },
      },
    };

    const stylesLoader = {
      test: /\.s[ac]ss$/i,
      use: [
        !isProd ? 'style-loader' : MiniCssExtractPlugin.loader,
        cssLoader,
        postCssLoader,
        'sass-loader',
      ],
    };

    const tsLoader = {
      test: /\.ts/,
      use: 'ts-loader',
      exclude: /node_modules/
    };

    return [
      stylesLoader,
      tsLoader,
    ];
  };

  const config: webpack.Configuration = {
    mode: env.mode ?? 'development',
    entry: './src/ts/index.ts',
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, './public'),
    },
    devtool: isProd ? false : 'source-map',
    devServer: {
      port: env.port,
      compress: false,
      open: true,
    },
    module: {
      rules: buildLoaders(),
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/style.min.css',
        chunkFilename: 'css/style.min.css',
      }),
    ],
    resolve: {
      extensions: ['.ts', '.js'],
    },
  };

  return config;
};
