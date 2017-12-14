import Vuex from 'vuex'
import marked from 'marked'
import getEntriesOfContentType from '../lib/getEntriesOfContentType'

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
            // Trim whitespace to be sure that slice() cuts of the opening
            // and closing <p> tags
            post.fields.compiledDescription =
                marked(description).trim().slice(3, -4)
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

        // let promises = []

        const promises = contentTypes.map((type) => {
          return new Promise((resolve, reject) => {
            const f = async () => {
              const data = await getEntriesOfContentType(type)
              await commit(type.commit, data)
              resolve()
            }
            f()
          })
        })

        return Promise.all(promises)
      }
    }
  })
}

export default createStore
