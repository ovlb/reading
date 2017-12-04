import Vuex from 'vuex'
const contentful = require('contentful')

/**
 * Get entries from Contentful and commit them to the store
 *
 * @param {String} contentType
 * @param {String} sortOrder
 * @param {Vuex Commmit} commit Vuex Commit
 * @param {String} action Commit action
 * @returns
 */
const getEntriesOfContentType = (contentType, sortOrder, commit, action) => {
  const space = process.env.cfSpace || process.env.CF_SPACE
  const token = process.env.cfToken || process.env.CF_TOKEN
  let client
  console.log(space, token)
  if (space && token) {
    client = contentful.createClient({
      space: space,
      accessToken: token
    })
  }

  return client.getEntries({
    content_type: contentType,
    order: sortOrder
  })
    .then((response) => {
      commit(action, response.items)
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
          return getEntriesOfContentType(type.name, type.order, commit, type.commit)
        }))
      }
    }
  })
}

export default createStore
