import path from 'path';
import webpack from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

type EnvVariables = {
  mode: 'production' | 'development',
  port: number,
};

export default (env: EnvVariables) => {
  const isProd = env.mode === 'production';

  const config: webpack.Configuration = {
    mode: env.mode,
    entry: './js/main.js',
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, './build'),
    },
    devtool: isProd ? false : 'source-map',
    devServer: {
      port: env.port,
      compress: false,
      open: true,
    }
  };

  return config;
};
