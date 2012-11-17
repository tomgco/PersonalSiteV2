module.exports = function createRoutes (serviceLocator) {
  serviceLocator.router.get('/'
    , serviceLocator.widgetManager.load(['frontpage::recent'])
    , function(req, res) {
    res.render(__dirname + '/views/index', {
      page: {
        layoutType: 'feature',
        title: 'Home ',
        section: 'home'
      }, widgetManager: serviceLocator.widgetManager
    })
  })

  serviceLocator.router.get('/gzippo', function(req, res) {
    res.redirect('https://github.com/tomgco/gzippo')
  })
}