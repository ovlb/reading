# reading.ovlb

reading.ovlb is a page to aggregate a list of articles.

This site uses Vue, Nuxt and the Contentful API.

## Connect

To connect to Contentful the `NODE_ENV`s `CF_SPACE` and `CF_TOKEN` have to be set. The Vue component `Post` uses the fields `author`, `medium`, `title`, `description`, `link` and an array of `categories` of a content type `article`.
