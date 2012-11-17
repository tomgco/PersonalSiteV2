var _ = require('lodash')
  , basePort = 3022
  , join = require('path').join

var properties =
  { version: '0.1.0'
  , name: 'tomgco'
  , tagline: 'Tom\'s Website'
  , description: 'A node.js CMS for quickly building powerful web sites, tailored to your exact needs'
  , keywords: 'tomgco, gallacher'
  , pageTitle: 'Personal Site'
  , port: basePort + 1
  , email: 'me@tomg.co'
  , siteUrl: 'http://localhost:' + (basePort + 1)
  , logPath: join(__dirname, '/logs')
  , cachePath: join(__dirname, '/cache')
  , dataPath: join(__dirname, '/data')
  , binaryCachePath: join(__dirname, '/data/binary')
  , database:
    { host: '127.0.0.1'
    , port: 27017
    , name: 'tomgco-development'
    }
  , bcryptWorkFactor: 1
  , debug: true
  , changeEmailSender: 'nobody@example.com'
}

var environmentProperties = {
    development: {}
  , testing: {
    siteUrl: 'http://localhost:' + (basePort + 2)
    , database:
      { replSet:
        { name: 'tomgco'
        , servers: [
          { host: 'localhost', port: 28000 }
          , { host: 'localhost', port: 28001 }
          ]
        }
      , name: 'tomgco-testing'
      }
  }
  , production: {
    siteUrl: 'http://xana.clockhosting.com:' + (basePort + 3)
    , port: basePort + 3
    , email: 'me@tomg.co'
    , database:
      { host: '127.0.0.1'
      , port: 27017
      , name: 'tomgco-production'
      }
  }
}

module.exports = function getProperties (environment) {

  properties.env = environment = environment || process.env.NODE_ENV || 'development'

  if (environmentProperties[environment] === undefined) {
    throw new RangeError('No properties for environment \'' + environment + '\'')
  }
  return _.extend({}, properties, environmentProperties[environment])
}
