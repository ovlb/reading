<template lang="pug">
section.category-list
  h3.category-list__headline Kategorien
  ul.category-list__ul
    li.category-list__item(v-for="category in categories" :key="category.fields.slug")
      nuxt-link(:to="{ path: `/c/${category.fields.slug}/`}") {{ category.fields.title }}
</template>

<script>
export default {
  computed: {
    categories () {
      return this.$store.state.categories
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/css/sass/import";

.category-list {
  font-family: $fonts-secondary;
  font-size: .84rem;
  margin-bottom: space(full, viewport);

  @media (min-width: breakpoint(large)) {
    align-self: flex-start;
    max-width: 15rem;
    position: sticky;
    top: 6em;
  }
}

.category-list__headline {
  font-weight: normal;
  letter-spacing: .05em;
  margin-bottom: space(half, relative);
  text-transform: uppercase;

  &::before {
    background: url('~assets/images/icons/list.svg') center no-repeat;
    background-size: cover;
    content: "";
    display: inline-block;
    height: 1.25em;
    margin-right: space(half, relative);
    margin-bottom: -.25em;
    width: 1.25em;
  }
}

.category-list__ul {
  display: flex;
  flex-flow: row wrap;
  list-style: none;
  padding: 0;

  @media(min-width: breakpoint(large)) {
    flex-flow: column nowrap;
  }
}

.category-list__item {
  margin-bottom: space(half, relative);

  @media(max-width: breakpoint(large)) {
    &:not(:last-child) {
      margin-right: space(full, relative);
    }
  }

a {
  &.nuxt-link-active {
    font-weight: bold;
    text-decoration: underline;
  }
  }
}
</style>
