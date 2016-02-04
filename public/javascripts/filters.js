var app = angular.module('amazonApp.filters', []);

app.filter('afterDiscount', function() {
  return function(price, discount) {
    return ((1 - discount) * price).toFixed(2);
  }
});

app.filter('inPercentage', function() {
  return function(discount) {
    return (discount * 100) + '%';
  }
});