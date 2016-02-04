var app = angular.module('amazonApp.controllers', []);

app.controller('MainController', ['$scope', function($scope) {
  $scope.products = [
    {
      name: 'AmazonBasics Dual Port USB Wall Charger - 4.2 Amp',
      price: 14.99,
      discount: 0.13
    },
    {
      name: 'AmazonBasics Apple Certified Lightning to USB Cable - 6 Feet (1.8 Meters) - White',
      price: 7.99,
      discount: 0
    }
  ];
}]);

// list all products
app.controller('ProductListController', ['$scope', '$window', '$location', function($scope, $window, $location) {
  // assign behavior for deleting product
  $scope.deleteProduct = function(index) {
    if ($window.confirm('Are you sure you want to delete this product?')) {
      // deletes 1 product at the position = index
      $scope.products.splice(index, 1);

      $window.alert('Successfully deleted product!');
      $location.path('/');
    }
  };
}]);

// create a new product
app.controller('ProductCreateController', ['$scope', '$window', '$location', function($scope, $window, $location) {
  $scope.product = {};

  $scope.addProduct = function() {
    // adding the product into the products array
    // remember, inheritance here ($scope.products)
    $scope.products.push($scope.product);

    $window.alert('Successfully added product!');
    $location.path('/products');
  };
}]);

// view a product
app.controller('ProductViewController', ['$scope', '$window', '$location', '$routeParams', function($scope, $window, $location, $routeParams) {
  // get a product and assign to scope
  $scope.product = $scope.products[$routeParams.id];

  // if the product is undefined, display error message
  // and redirect back to listing
  if ($scope.product === undefined) {
    $window.alert('Unable to locate product');
    $location.path('/products');
  }

  // grab the :id from the route parameters and assign to $scope
  $scope.productId = $routeParams.id;
}]);

// edit a product
app.controller('ProductEditController', ['$scope', '$routeParams', '$window', '$location',  function($scope, $routeParams, $window, $location) {

  // assign a behavior to update product
  $scope.updateProduct = function() {
    // update the elements in the product list with a new one
    $scope.products[$routeParams.id] = $scope.product;

    $window.alert('Successfully updated product!');
    $location.path('/products/' + $routeParams.id);
  };

  // get a product and assign to scope
  $scope.product = $scope.products[$routeParams.id];

  // if the product is undefined, display error message
  // and redirect back to listing
  if ($scope.product === undefined) {
    $window.alert('Unable to locate product');
    $location.path('/products');
  }
}]);