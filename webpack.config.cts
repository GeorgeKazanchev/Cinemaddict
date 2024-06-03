import * as path from 'path';
import * as webpack from 'webpack';

type Mode = 'production' | 'development';

interface EnvVariables {
    mode: Mode;
}

export default (env: EnvVariables) => {
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
        }
    };

    return config;
}