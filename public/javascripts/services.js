var app = angular.module('amazonApp.services', []);

app.factory('Product', ['$resource', function($resource) {
  return $resource('/api/products/:id', { id: '@_id' }, {
    update: {
      method: 'PUT'
    }
  });
}]);