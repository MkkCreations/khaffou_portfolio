/* eslint-disable no-undef */
const path = require('path')
const config = require('../portal.config')
const Dotenv = require('dotenv-webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

/* const environements = new Dotenv({
	path: path.join(__dirname, '..', `.env`),
	safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
	allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
	systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
	silent: false, // hide any errors
	defaults: false, // load '.env.defaults' as the default values if empty.
}) */

// Clean webpack
const clean = new CleanWebpackPlugin()

// HTML generation
const generateHTML = new HtmlWebpackPlugin({
	template: './public/index.html'
})

const copyAssets = new CopyPlugin({
	patterns: [
		{
			from: path.join(config.root, 'public', 'assets', 'images'),
			to: path.join('assets', 'images'),
		},
		{
			from: path.join(config.root, 'public', 'assets', 'fonts'),
			to: path.join('assets', 'fonts'),
		},
		{
			from: path.join(config.root, 'public', 'assets', 'svg'),
			to: path.join('assets', 'svg'),
		},
	],
})
module.exports = [environements, clean, generateHTML /*, copyAssets*/]
