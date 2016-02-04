var app = angular.module('amazonApp', ['ngRoute', 'amazonApp.controllers', 'amazonApp.filters', 'ngResource', 'amazonApp.services']);

app.config(['$routeProvider', function($routeProvider) {

  // configure routes
  $routeProvider
    .when('/products', { templateUrl: 'partials/products.html', controller: 'ProductListController' })
    .when('/products/new', { templateUrl: 'partials/product-create.html', controller: 'ProductCreateController' })
    .when('/products/:id', { templateUrl: 'partials/product-view.html', controller: 'ProductViewController' })
    .when('/products/:id/edit', { templateUrl: 'partials/product-edit.html', controller: 'ProductEditController' })
    .otherwise({ redirectTo: '/products' });

}]);