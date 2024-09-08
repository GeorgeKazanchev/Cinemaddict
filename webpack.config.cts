import * as path from 'path';
import * as webpack from 'webpack';
import _ from 'webpack-dev-server';

type Mode = 'production' | 'development';

interface EnvVariables {
    mode: Mode;
    port: number;
}

export default (env: EnvVariables) => {
    const isDev = env.mode === 'development';

    const config: webpack.Configuration = {
        mode: env.mode ?? 'development',
        entry: path.resolve(__dirname, 'src', 'main.ts'),
        output: {
            path: path.resolve(__dirname, 'public'),
            filename: '[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node-modules/
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.js']
        },
        devtool: isDev ? 'inline-source-map' : false,
        devServer: {
            port: env.port ?? 3000,
            open: true
        }
    };

    return config;
}
