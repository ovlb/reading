<template lang="pug">
  section.articles
    post(v-for="post in filteredPosts" :post="post" :key="post.fields.id")
</template>

<script>
import Post from '~/components/Post'

export default {
  components: {
    Post
  },
  computed: {
    filteredPosts () {
      return this.$store.state.posts.filter((post) => {
        const categories = post.fields.categories
        let found = false

        categories.forEach((category) => {
          if (!found) {
            if (category.fields.slug === this.$route.params.category) found = true
          }
        })

        return found
      })
    }
  }
}
</script>
