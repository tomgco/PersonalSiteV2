var send = require('send')
  , url = require('url')

module.exports = function createRoutes (serviceLocator) {
  serviceLocator.router.get('/'
    , serviceLocator.widgetManager.load(['frontpage::recent'])
    , function(req, res) {
    res.render(__dirname + '/views/index', {
      page: {
        layoutType: 'feature',
        title: 'Home ',
        section: 'home'
      }
      , widgetManager: serviceLocator.widgetManager
      , 
    })
  })

  serviceLocator.router.get('/images/:path/:basename'
    , function(req, res) {
      send(req, url.parse(req.params.path + '/' + req.params.basename).pathname)
        .root(serviceLocator.properties.dataPath)
        .pipe(res)
  })

  serviceLocator.router.get('/gzippo', function(req, res) {
    res.redirect('https://github.com/tomgco/gzippo')
  })
}