var app = angular.module('amazonApp.controllers', []);

// app.controller('MainController', ['$scope', function($scope) {
//   $scope.products = [
//     {
//       name: 'AmazonBasics Dual Port USB Wall Charger - 4.2 Amp',
//       price: 14.99,
//       discount: 0.13
//     },
//     {
//       name: 'AmazonBasics Apple Certified Lightning to USB Cable - 6 Feet (1.8 Meters) - White',
//       price: 7.99,
//       discount: 0
//     }
//   ];
// }]);

// list all products
app.controller('ProductListController', ['$scope', '$window', '$location', 'Product', function($scope, $window, $location, Product) {

  // query all the products
  $scope.products = Product.query();

  // assign behavior for deleting product
  $scope.deleteProduct = function(product) {
     if ($window.confirm('Are you sure you want to delete this product?')) {
      product.$delete(function(e) { // success
        $window.alert(e.message);
        $location.path('/');
      }, function(res) { // error
        $window.alert(res.data.error);
      });
     }
  };
}]);

// create a new product
app.controller('ProductCreateController', ['$scope', '$window', '$location', 'Product', function($scope, $window, $location, Product) {
  $scope.product = new Product();

  // assign behavior to add product
  $scope.addProduct = function() {
    $scope.product.$save(function(e) { // success
      $window.alert(e.message);
      $location.path('/products');
    },function(res) { // error
      $window.alert(res.data.error);
    });
  };
}]);

// view a product
app.controller('ProductViewController', ['$scope', '$window', '$location', '$routeParams', 'Product', function($scope, $window, $location, $routeParams, Product) {
  // get a product and assign to scope
  $scope.product = Product.get({ id: $routeParams.id }, function() {
    // do nothing
  }, function(res) { // error
    $window.alert(res.data.error);
    $location.path('/products');
  });
}]);

// edit a product
app.controller('ProductEditController', ['$scope', '$routeParams', '$window', '$location', 'Product', function($scope, $routeParams, $window, $location, Product) {

  // assign a behavior to update product
  $scope.updateProduct = function() {
    var productId = $scope.product._id;
    $scope.product.$update(function(e) {
      $window.alert(e.message);
      $location.path('/products/' + productId);
    });
  };

  // get a product and assign to scope
  $scope.product = Product.get({ id: $routeParams.id }, function() {
    // good code
  }, function(res) {
    $window.alert(res.data.error);
    $location.path('/products');
  });
}]);