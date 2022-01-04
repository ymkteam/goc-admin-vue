'use strict'
const pack = require('../package.json')

const bannerTxt = `/*! Admin Dashboard v${pack.version} | MIT License | github.com/gocteam/goc-admin-vue */\n`

process.stdout.write(bannerTxt)
process.stdin.pipe(process.stdout)
