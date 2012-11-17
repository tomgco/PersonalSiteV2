var _ = require('lodash')
  , widget = require('../../../../lib/widget-manager/widget-manager').widget
  , jade = require('../../../../lib/widget-manager/engines/jade')
  , fn = {
      recent: jade.compile(__dirname + '/recent.jade')
    };

module.exports = function(serviceLocator) {
  var data = serviceLocator.app._locals;

  return widget({
    name: 'recent',
    namespace: 'frontpage',
    render: function(layout) {
      if (!layout) {
        layout = 'recent';
      }
      return fn[layout](data);
    },
    load: function(req, res, next) {
      serviceLocator.articleModel.findLive({},
        { sort: { publishedDate: -1} }, function(error, dataSet) {
        if (!error && dataSet.length !== 0) {
          data = _.extend({}, data, {
            latestPost: dataSet[0],
            recentPosts: dataSet
          });
        }
        next();
      });
    }
  });
};