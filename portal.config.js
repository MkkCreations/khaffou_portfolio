/* eslint-disable no-undef */
const path = require('path')
const fs = require('fs')

let ROOT = process.env.PWD

if (!ROOT) {
    ROOT = process.cwd()
}

const config = {
    site_name: 'Khaffou Protfolio',
    env: process.env.NODE_ENV,
    root: ROOT,
    paths: {
        src: 'src',
        dist: 'dist',
        public: 'public'
    },
    package: JSON.parse(fs.readFileSync(path.join(ROOT, '/package.json'), { encoding: 'utf-8' }))
}

module.exports = config
