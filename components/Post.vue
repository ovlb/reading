<template lang="pug">
  article.post
    .post__meta.post__meta--author {{ post.fields.author }}&ensp;—&ensp;{{ post.fields.medium }}
    h2.post__headline {{ post.fields.title }}
    p.post__content {{ post.fields.description }}
    a.button.post__button(:href="post.fields.link") Artikel lesen »
    .post__meta.post__meta--categories
      nuxt-link.post__category(:to="{ path: `/c/${category.fields.slug}/`}" v-for="category in post.fields.categories" :key="category.fields.slug") {{ category.fields.title }}
</template>

<script>
export default {
  props: ['post']
}
</script>

<style lang="scss" scoped>
@import "~assets/css/sass/import";


.post {
  &:not(:last-child) {
    margin-bottom: space(triple, viewport);
  }
}

.post__meta {
  color: lighten(color(dark), 25);
  display: flex;
  flex-wrap: wrap;
  font-size: .694em;
  letter-spacing: .05em;
  text-transform: uppercase;

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
    margin-bottom: .25em;
  }
}

.post__headline {
  font-size: 1.2em;
  margin-bottom: space(half, relative);
}

.post__button {
  display: block;
  font-weight: bold;
  font-size: 85%;
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

