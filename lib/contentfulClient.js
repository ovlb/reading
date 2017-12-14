const contentful = require('contentful')

const space = process.env.cfSpace || process.env.CF_SPACE
const token = process.env.cfToken || process.env.CF_TOKEN

let client
if (space && token) {
  client = contentful.createClient({
    space: space,
    accessToken: token
  })
}

export default client
