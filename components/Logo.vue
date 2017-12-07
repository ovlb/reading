<template lang="pug">
  nuxt-link.logo(to="/" title="Zur Startseite" exact)
    img(src="~assets/images/site/reading-logo.svg" alt="reading.ovl")
</template>

<style lang="scss">
@import "~assets/css/sass/import";

.logo {
  max-width: 20rem;

  img {
    display: block;
    max-width: 9rem;
    width: 50vw;
  }
}

</style>
