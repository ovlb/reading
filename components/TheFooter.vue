<template lang="pug">
.main-footer
  <a href="https://www.contentful.com/" rel="nofollow" target=“_blank”><img src="https://images.contentful.com/fo9twyrwpveg/44baP9Gtm8qE2Umm8CQwQk/c43325463d1cb5db2ef97fca0788ea55/PoweredByContentful_LightBackground.svg" class="hosting-icon" alt="Powered by Contentful" /></a>
  <a href="https://www.netlify.com/" rel="nofollow" target=“_blank”><img src="https://www.netlify.com/img/global/badges/netlify-dark.svg" class="hosting-icon" alt="Deploys by Netlify" /></a>
</template>

<script>

</script>

<style lang="scss">
@import "~assets/css/sass/import";

.main-footer {
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: space(double, viewport);
  padding: space(double, viewport);
}

.hosting-icon {
  margin-right: 2.5rem;
  width: 5rem;
}
</style>