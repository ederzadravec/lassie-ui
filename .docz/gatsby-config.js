const { mergeWith } = require('docz-utils')
const fs = require('fs-extra')

let custom = {}
const hasGatsbyConfig = fs.existsSync('./gatsby-config.custom.js')

if (hasGatsbyConfig) {
  try {
    custom = require('./gatsby-config.custom')
  } catch (err) {
    console.error(
      `Failed to load your gatsby-config.js file : `,
      JSON.stringify(err),
    )
  }
}

const config = {
  pathPrefix: '/',

  siteMetadata: {
    title: 'Lassie Ui',
    description: 'My awesome app using docz',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: {},
        src: './',
        gatsbyRoot: null,
        themesDir: 'src',
        mdxExtensions: ['.md', '.mdx'],
        docgenConfig: {},
        menu: [],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [],
        typescript: true,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: null,
        o: null,
        open: null,
        'open-browser': null,
        root: '/Users/ederzadravec/Projects/lassie-ui/.docz',
        base: '/',
        source: './',
        'gatsby-root': null,
        files: '**/*.{md,markdown,mdx}',
        public: '/public',
        dest: '.docz/dist',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'Lassie Ui',
        description: 'My awesome app using docz',
        host: 'localhost',
        port: 3000,
        p: 3000,
        separator: '-',
        paths: {
          root: '/Users/ederzadravec/Projects/lassie-ui',
          templates:
            '/Users/ederzadravec/Projects/lassie-ui/node_modules/docz-core/dist/templates',
          docz: '/Users/ederzadravec/Projects/lassie-ui/.docz',
          cache: '/Users/ederzadravec/Projects/lassie-ui/.docz/.cache',
          app: '/Users/ederzadravec/Projects/lassie-ui/.docz/app',
          appPackageJson: '/Users/ederzadravec/Projects/lassie-ui/package.json',
          appTsConfig: '/Users/ederzadravec/Projects/lassie-ui/tsconfig.json',
          gatsbyConfig:
            '/Users/ederzadravec/Projects/lassie-ui/gatsby-config.js',
          gatsbyBrowser:
            '/Users/ederzadravec/Projects/lassie-ui/gatsby-browser.js',
          gatsbyNode: '/Users/ederzadravec/Projects/lassie-ui/gatsby-node.js',
          gatsbySSR: '/Users/ederzadravec/Projects/lassie-ui/gatsby-ssr.js',
          importsJs:
            '/Users/ederzadravec/Projects/lassie-ui/.docz/app/imports.js',
          rootJs: '/Users/ederzadravec/Projects/lassie-ui/.docz/app/root.jsx',
          indexJs: '/Users/ederzadravec/Projects/lassie-ui/.docz/app/index.jsx',
          indexHtml:
            '/Users/ederzadravec/Projects/lassie-ui/.docz/app/index.html',
          db: '/Users/ederzadravec/Projects/lassie-ui/.docz/app/db.json',
        },
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)
