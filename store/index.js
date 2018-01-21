import Vuex from 'vuex'
import marked from 'marked'
import getEntriesOfContentType from '../lib/getEntriesOfContentType'

const createStore = () => {
  return new Vuex.Store({
    state: {
      postTotal: 0,
      posts: [],
      categories: []
    },
    mutations: {
      addPosts (state, data) {
        const posts = data.items
        if (posts) {
          posts.forEach((post) => {
            const description = post.fields.description
            // Trim whitespace to be sure that slice() cuts of the opening
            // and closing <p> tags
            post.fields.compiledDescription = marked(description)
            state.posts.push(post)
          })
        }

        state.postTotal = data.total
      },
      addCategories (state, data) {
        const items = data.items
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
          {name: 'article', order: '-sys.createdAt', limit: 25, commit: 'addPosts'},
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
