'use strict';

angular.module('flexeWebApp')
  .directive('file', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the file directive');
      }
    };
  });
