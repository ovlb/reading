<template lang="pug">
button(@click="loadItems") Mehr Artikel laden
</template>

<script>
import getEntriesOfContentType from '~/lib/getEntriesOfContentType'

export default {
  methods: {
    async loadItems () {
      const name = 'article'
      const order = '-sys.createdAt'
      const skip = this.$store.state.posts.length
      const limit = 25

      const data = await getEntriesOfContentType({ name, order, limit, skip })
      console.log(data)
      this.$store.commit('addPosts', data)
    }
  }
}
</script>

<style lang="scss">
@import "~assets/css/sass/import";

</style>