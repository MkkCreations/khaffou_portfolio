/* eslint-disable no-undef */
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = module.exports = merge(common, {
	mode: 'production',
})
