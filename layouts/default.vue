<template lang="pug">
  .content
    header.main-header
      nav.main-nav(aria-label="Seiten-Navigation")
        ul.nav__list.main-nav__list
          li.main-nav__item
            <logo/>
          li.main-nav__item
            nuxt-link(to="/meta/") Meta
    section.container
      category-list(v-if="this.$route.name !== 'meta'")
      <nuxt/>
  </div>
</template>

<script>
import Logo from '~/components/Logo'
import CategoryList from '~/components/CategoryList'

export default {
  components: {
    Logo,
    CategoryList
  },
  data () {
    return {
      activeCategory: this.$route.params.category
    }
  }
}
</script>


<style lang="scss">
@import "~assets/css/sass/import";

@import "~assets/css/base/font-face";
@import "~assets/css/base/custom-properties";
@import "~assets/css/base/universal-selector";
@import "~assets/css/base/html";
@import "~assets/css/base/body";
@import "~assets/css/base/main";
@import "~assets/css/base/page-transition";

@import "~assets/css/media/img";
@import "~assets/css/type/typography";
@import "~assets/css/type/a";

@import "~assets/css/structures/main-header";
@import "~assets/css/structures/nav";
@import "~assets/css/structures/main-nav";

.container {
  display: flex;
  flex-flow: column;
  margin: 0 auto;
  padding: space(double, viewport);
  position: relative;
  max-width: 35rem;

  @media (min-width: breakpoint(large)) {
    flex-flow: row;
    max-width: unset;
  }
}

.articles {
  max-width: 35rem;

  @media(min-width: breakpoint(large)) {
    margin-left: 5vw;
  }
}
</style>
