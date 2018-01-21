<template lang="pug">
  main.articles
    post(v-for="post in posts" :post="post" :key="post.sys.id")
    load-more-button(v-if="totalIsLargerThanExisting")
</template>

<script>
import Post from '~/components/Post'
import LoadMoreButton from '~/components/LoadMoreButton'

export default {
  components: {
    Post,
    LoadMoreButton
    // CategoryList
  },
  data () {
    return {
      posts: this.$store.state.posts,
      postTotal: this.$store.state.postTotal
    }
  },
  computed: {
    totalIsLargerThanExisting () {
      return this.postTotal > this.posts.length
    }
  }
}
</script>
