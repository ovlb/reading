import Vuex from 'vuex'
import { SPACE_ID, ACCESS_TOKEN } from '../contentful_tokens'
const contentful = require('contentful')

const client = contentful.createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN
})

const getEntriesOfContentType = (contentType, sortOrder, commit, action) => {
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
        /* return getEntriesOfContentType('article', '-sys.createdAt')
          .then(posts => {
            commit('addPosts', posts)
          }) */

        /* return client.getEntries({
          content_type: 'article',
          order: '-sys.createdAt'
        })
          .then((response) => {
            commit('addPosts', response.items)
          }) */
      }
    }
  })
}

export default createStore
