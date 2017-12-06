<template lang="pug">
section.category-list
  h3.category-list__headline(@click="toggleCategoryList") Kategorien
    button.category-list__toggle(:aria-label="toggleCategoryListButtonLabel") {{ toggleCategoryListButtonText }}
  ul.category-list__ul(:class="listClasses")
    li.category-list__item(v-for="category in categories" :key="category.fields.slug")
      nuxt-link(:to="{ path: `/c/${category.fields.slug}/`}") {{ category.fields.title }}
</template>

<script>
export default {
  data () {
    return {
      categories: this.$store.state.categories,
      hidesList: true
    }
  },
  methods: {
    toggleCategoryList () {
      this.hidesList = !this.hidesList
    }
  },
  computed: {
    listClasses () {
      return {
        'category-list__ul--hidden': this.hidesList
      }
    },
    toggleCategoryListButtonText () {
      return (this.hidesList) ? 'anzeigen' : 'ausblenden'
    },
    toggleCategoryListButtonLabel () {
      return `Liste der Kategorien ${this.toggleCategoryListButtonText}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/css/sass/import";
@import "~assets/css/base/custom-properties";

.category-list {
  font-family: $fonts-secondary;
  font-size: .833em;
  font-size: var(--type-small);
  margin: space(full, viewport) 0 space(double, viewport);

  @media (min-width: breakpoint(large)) {
    align-self: flex-start;
    margin-top: 0;
    width: 12rem;
    position: sticky;
    top: calc(2rem + 8vmin)
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

  @media(max-width: breakpoint(large)) {
    cursor: pointer;
  }
}

.category-list__toggle {
  background: none;
  border: none;
  cursor: pointer;
  text-transform: uppercase;

  @media(min-width: breakpoint(large)) {
    display: none;
  }
}

.category-list__ul {
  display: flex;
  flex-flow: row wrap;
  list-style: none;
  padding: 0;

  &--hidden {
    @media(max-width: breakpoint(large)) {
      display: none;
    }
  }

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
}
</style>
