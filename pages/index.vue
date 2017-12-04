<template lang="pug">
  section.articles
    post(v-for="post in posts" :post="post" :key="post.sys.id")
</template>

<script>
import Post from '~/components/Post'

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
  }
}
</script>
