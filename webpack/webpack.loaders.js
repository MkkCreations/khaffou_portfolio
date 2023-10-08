/* eslint-disable no-undef */
const path = require('path')
const config = require('../portal.config')

// Define common loader constants
const sourceMap = config.env !== 'production'

// Javascript loaders
const js = {
    test: /\.(js|jsx)$/,
    include: [path.join(config.root, config.paths.src)],
    exclude: [path.join(config.root, 'node_modules')],
    use: {
        loader: 'babel-loader',
        options: {
            cacheDirectory: true
        }
    }
}

// css loader with modules and custom class name style options
const cssLoaderClassNameStyle = {
    loader: 'css-loader',
    options: {
        sourceMap: true,
        modules: {
            auto: true,
            localIdentName: '[local]___[hash:base64:5]'
        }
    }
}
const svgr = {
    test: /\.svg$/,
    use: ['@svgr/webpack']
}

const sassLoader = {
    loader: 'sass-loader',
    options: {
        sourceMap,
        sassOptions: {
            javascriptEnabled: true
        }
    }
}

const style = {
    test: /\.(css|sass|scss)$/,
    use: ['style-loader', cssLoaderClassNameStyle, sassLoader]
}

// Images loaders
const images = {
    test: /\.(gif|png|jpe?g|svg)$/i,
    exclude: /fonts/,
    use: ['file-loader?name=images/[name].[hash].[ext]']
}

// MP4 loaders
const mp4 = {
    test: /\.mp4$/,
    use: ['file-loader?name=videos/[name].[hash].[ext]']
}

const autoprefixer = {
    loader: 'postcss-loader',
    options: {
        postcssOptions: {
            plugins: [['autoprefixer']]
        }
    }
}
module.exports = [js, style, svgr, images, mp4]
