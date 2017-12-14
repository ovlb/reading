'use strict'

import client from './contentfulClient'

/**
 * Get entries from Contentful and commit them to the store
 *
 * @param {Object} contentType Contentful content type
 * @param {String} contentType.name The name of the content type
 * @param {String} contentType.order Parameter to order the type by
 * @param {String} contentType.commit A vuex commit action
 * @returns
 */
const getEntriesOfContentType = async (contentType) => {
  return client.getEntries({
    content_type: contentType.name,
    order: contentType.order
  })
    .then((response) => {
      return response.items
    })
    .catch((error) => {
      console.error(error)
    })
}

export default getEntriesOfContentType
