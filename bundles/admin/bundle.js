var _ = require('lodash')
  ;

module.exports = {
  name: 'Admin',
  version: '0.0.1',
  description: 'Admin section for the site',
  publicRoute: '/admin',
  middleware: [
    function(serviceLocator) {
      return function(req, res, next) {

        res.locals.adminIsAllowed = function (resource, action) {
          return serviceLocator.adminAccessControl.isAllowed(req, resource, action);
        };

        if (serviceLocator.adminAccessControl.isAllowed(req, 'Admin Bar', 'read')) {
          res.bodyStart = [__dirname + '/views/admin-bar.jade'];
        }
        next();
      };
    }
  ],
  initialize: [

    function(serviceLocator, done) {

      // Register the admin view helpers for global use
      serviceLocator.viewHelpers.querystring = require('./lib/pagination-helpers');

      // Register the generic route creator for other admin bundles to use.
      serviceLocator.register('admin',
        { routes: require('./lib/routes')
        , viewConfig: require('./lib/view-config')
        , viewRender: require('./lib/view-render')
        });

      // Adding this bundle registers the admin acl
      serviceLocator.register('adminAccessControlList',
        require('secure').createAccessControlList(serviceLocator.logger));

      done();
    },
    function(serviceLocator, done) {

      // The resource you need access of see the admin bundles
      serviceLocator.adminAccessControlList.addResource('Admin');
      serviceLocator.adminAccessControlList.addResource('Admin Bar');

      // This controls the authentication and authorisation of the admin
      serviceLocator.register('adminAccessControl',
        require('secure').createAccessControl(
          serviceLocator.administratorModel.authenticate, serviceLocator.adminAccessControlList,
          {}, 'admin', serviceLocator.logger,
          function(req, res, resource, action, next) {
            res.redirect('/admin/login');
          }));
      done();
    },
    function(serviceLocator, done) {

      var compact = serviceLocator.compact;

      compact.addNamespace('admin', __dirname + '/public')
        .addJs('/js/lib/chosen/chosen.jquery.js')
        .addJs('/js/lib/fancybox/jquery.fancybox.pack.js')
        .addJs('/js/admin.js')
        ;

      // Create controller
      require('./controller')(serviceLocator, __dirname + '/views');
      done();
    },
    function(serviceLocator, done) {

      // This is watch recompiles your stylus. Any that you need to compile to CSS
      // need to be defined here. This is quicker than the standard middleware.
      serviceLocator.stylusWatch(__dirname + '/public/css/index.styl',
      { compile: serviceLocator.stylusCompile });

      done();
    }
  ]
};