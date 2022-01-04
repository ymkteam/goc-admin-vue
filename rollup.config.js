import vue from 'rollup-plugin-vue'
import node from '@rollup/plugin-node-resolve'
import cjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import inject from '@rollup/plugin-inject'

import fs from 'fs'
import path from 'path'

import { version } from './package.json'

const babelConfig = {
  exclude: 'node_modules/**',
  babelHelpers: 'runtime',
  presets: [['@babel/preset-env', { modules: false }]],
  plugins: ['@babel/plugin-transform-runtime']
}

const bannerTxt = `/*! Admin Dashboard v${version} | MIT License | github.com/gocteam/admin-dasboard */`

const baseFolder = './src/'
const componentsFolder = 'components/'
const pluginsFolder = 'plugins/'

const components = fs
  .readdirSync(baseFolder + componentsFolder)
  .filter(f =>
    fs.statSync(path.join(baseFolder + componentsFolder, f)).isDirectory()
  )

const packagePlugins = fs.readdirSync(baseFolder + pluginsFolder)

const entries = {
  index: './src/index.js'
  // helpers: './src/utils/helpers.js',
  // config: './src/utils/config.js',
  // ...components.reduce((obj, name) => {
  //   obj[name] = baseFolder + componentsFolder + name
  //   return obj
  // }, {}),
  // ...packagePlugins.reduce((obj, name) => {
  //   obj[name] = baseFolder + pluginsFolder + name
  //   return obj
  // }, {})
}

const capitalize = s => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const vuePluginConfig = {
  template: {
    isProduction: true,
    compilerOptions: {
      whitespace: 'condense'
    }
  }
}

const external = ['vue', 'jquery']
const globals = {
  vue: 'Vue',
  jquery: '$'
}
const plugins = [
  inject({
    include: '**/*.js',
    exclude: 'node_modules/**',
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery'
  }),
  node({
    extensions: ['.vue', '.js']
  }),
  vue(vuePluginConfig),
  babel(babelConfig),
  cjs()
]

export default () => {
  const mapComponent = name => {
    return [
      {
        input: baseFolder + componentsFolder + `${name}/index.js`,
        external,
        output: {
          format: 'umd',
          name: capitalize(name),
          file: `dist/components/${name}/index.js`,
          banner: bannerTxt,
          exports: 'named',
          globals
        },
        plugins
      }
    ]
  }

  const mapPlugin = name => {
    return [
      {
        input: baseFolder + pluginsFolder + `${name}`,
        external,
        output: {
          format: 'umd',
          name: capitalize(name),
          file: `dist/plugins/${name}/index.js`,
          banner: bannerTxt,
          exports: 'named',
          globals
        },
        plugins
      }
    ]
  }

  let config = [
    {
      input: entries,
      external,
      output: {
        format: 'esm',
        dir: 'dist/esm'
      },
      plugins
    },
    {
      input: entries,
      external,
      output: {
        format: 'cjs',
        dir: 'dist/cjs',
        exports: 'named'
      },
      plugins
    },
    {
      input: 'src/index.js',
      external,
      output: {
        format: 'umd',
        name: capitalize('goc-admin-vue'),
        file: 'dist/goc-admin-vue.js',
        exports: 'named',
        banner: bannerTxt,
        globals
      },
      plugins
    },
    {
      input: 'src/index.js',
      external,
      output: {
        format: 'esm',
        file: 'dist/goc-admin-vue.esm.js',
        banner: bannerTxt
      },
      plugins
    }
    // individual components
    // ...components.map(f => mapComponent(f)).reduce((r, a) => r.concat(a), []),
    // ...packagePlugins.map(f => mapPlugin(f)).reduce((r, a) => r.concat(a), [])
  ]

  if (process.env.MINIFY === 'true') {
    config = config.filter(c => !!c.output.file)
    config.forEach(c => {
      c.output.file = c.output.file.replace(/\.js/g, '.min.js')
      c.plugins.push(
        terser({
          output: {
            comments: '/^!/'
          }
        })
      )
    })
  }
  return config
}
