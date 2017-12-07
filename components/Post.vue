<template lang="pug">
  article.post(v-once)
    header.post__meta.post__meta--author(v-html="authorMeta")
    h2.post__headline {{ post.fields.title }}
    p.post__content(v-html="post.fields.compiledDescription")
    a.button.post__button(:href="post.fields.link") Artikel lesen »
    nav(aria-label="Kategorien des Posts")
      ul.nav__list.post__meta.post__meta--categories
        li.post__category(v-for="category in post.fields.categories")
          nuxt-link(:to="{ path: `/c/${category.fields.slug}/`}" :key="category.fields.slug" :title="`Archiv der Kategorie ${category.fields.title}`") {{ category.fields.title }}
</template>

<script>
export default {
  props: ['post'],
  computed: {
    authorMeta () {
      const author = this.post.fields.author.trim()
      const medium = this.post.fields.medium

      if (author && medium) {
        return `${author}&ensp;—&ensp;${medium.trim()}`
      } else if (!medium) {
        return author
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/css/sass/import";
@import "~assets/css/base/custom-properties";


.post {
  &:not(:last-child) {
    margin-bottom: space(triple, relative);
  }
}

.post__meta {
  color: lighten(color(dark), 25);
  display: flex;
  flex-wrap: wrap;
  font-size: .833em;
  font-size: var(--type-small);


  &--categories {
    font-family: $fonts-secondary;
    justify-content: flex-end;
    margin-top: space(full, relative);
    text-align: right;

    &::before {
      background: url('~assets/images/icons/list.svg') center no-repeat;
      background-size: cover;
      content: "";
      display: inline-block;
      margin-right: space(full, relative);
      width: 2 * .694em;
    }
  }

  &--author {
    font-size: .694em;
    font-size: var(--type-very-small);
    letter-spacing: .05em;
    margin-bottom: .25em;
    text-transform: uppercase;
  }
}

.post__headline {
  font-size: 1.2em;
  font-size: var(--type-medium);
  margin-bottom: space(half, relative);
}

.post__content {
  text-indent: 0;
}

.post__button {
  display: block;
  font-weight: bold;
  font-size: 90%;
  letter-spacing: .1em;
  margin: space(full, relative) 0;
  padding-left: 0;
  text-transform: uppercase;
  transform-origin: left center;
  transition: transform .2s ease-out;

  &:hover {
    transform: scale(1.075) translateX(.133em);
  }
}

.post__category {
    &:not(:first-child) {
      margin-left: space(full, relative);
    }
}
</style>

