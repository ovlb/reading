import Vuex from 'vuex'
import marked from 'marked'
const contentful = require('contentful')

const space = process.env.cfSpace || process.env.CF_SPACE
const token = process.env.cfToken || process.env.CF_TOKEN

let client
if (space && token) {
  client = contentful.createClient({
    space: space,
    accessToken: token
  })
}

/**
 * Get entries from Contentful and commit them to the store
 *
 * @param {Object} contentType Contentful content type
 * @param {String} contentType.name The name of the content type
 * @param {String} contentType.order Parameter to order the type by
 * @param {String} contentType.commit A vuex commit action
 * @param {Vuex Commmit} commit Vuex Commit
 * @returns
 */
const getEntriesOfContentType = (contentType, commit) => {
  return client.getEntries({
    content_type: contentType.name,
    order: contentType.order
  })
    .then((response) => {
      commit(contentType.commit, response.items)
    })
    .catch((error) => {
      console.error(error)
    })
}

const createStore = () => {
  return new Vuex.Store({
    state: {
      posts: [],
      categories: []
    },
    mutations: {
      addPosts (state, posts) {
        if (posts) {
          posts.forEach((post) => {
            const description = post.fields.description
            // Trim whitespace to be sure that splice() only cuts of the opening
            // and closing <p> tags
            post.fields.compiledDescription = marked(description).trim().slice(3, -4)
            state.posts.push(post)
          })
        }
      },
      addCategories (state, items) {
        if (items) {
          items.forEach((item) => {
            state.categories.push(item)
          })
        }
      }
    },
    actions: {
      nuxtServerInit ({ commit }) {
        const contentTypes = [
          {name: 'article', order: '-sys.createdAt', commit: 'addPosts'},
          {name: 'category', order: 'fields.title', commit: 'addCategories'}
        ]

        return Promise.all(contentTypes.map((type) => {
          return getEntriesOfContentType(type, commit)
        }))
      }
    }
  })
}

export default createStore
