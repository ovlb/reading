const contentful = require('contentful')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'reading.ovlb',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A list of articles' },
      // Open Graph
      { property: 'og:image', content: 'https://reading.ovlb.net/og/image.png' },
      { property: 'og:image:width', content: '2400px' },
      { property: 'og:image:height', content: '1260px' },
      { property: 'og:title', content: 'reading.ovlb' },
      { property: 'og:description', content: 'A list of articles' }
    ],
    htmlAttrs: {
      lang: 'de'
    },
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  env: {
    cfSpace: process.env.CF_SPACE,
    cfToken: process.env.CF_TOKEN
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#000' },
  /*
  ** Load categories to build routes
  */
  generate: {
    routes () {
      const space = process.env.cfSpace || process.env.CF_SPACE
      const token = process.env.cfToken || process.env.CF_TOKEN

      let client
      if (space && token) {
        client = contentful.createClient({
          space: space,
          accessToken: token
        })
      }
      return client.getEntries({
        content_type: 'category',
        order: 'fields.title'
      }).then((response) => {
        return response.items.map((entry) => {
          return `/c/${entry.fields.slug}`
        })
      })
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    loaders: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 0,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 0,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  }
}
