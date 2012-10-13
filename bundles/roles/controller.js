module.exports = function createRoutes (serviceLocator, bundleViewPath) {

  serviceLocator.admin.routes(
    serviceLocator,
    require('./admin-view-config')(serviceLocator),
    serviceLocator.roleModel,
    {
      requiredAccess: 'Role',
      renderFn: serviceLocator.admin.viewRender()
    }
  );
};