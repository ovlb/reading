<template lang="pug">
  section.articles
    post(v-for="post in posts" :post="post" :key="post.sys.id")
</template>

<script>
import Post from '~/components/Post'
// import CategoryList from '~/components/CategoryList'
// import axios from 'axios'

export default {
  components: {
    Post
    // CategoryList
  },
  data () {
    return {
      nosts: 0
    }
  },
  computed: {
    posts () {
      return this.$store.state.posts
    }
  },
  async fetch ({ store, params }) {
    // let { data } = await axios.get('https://jsonplaceholder.typicode.com/posts')
    // store.commit('addPosts', data)
  }
}
</script>

<style lang="scss">
@import "~assets/css/sass/import";
</style>
