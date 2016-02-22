(function () {
  'use strict';

  angular.module('wss-table')
    .directive('wssTableCell', ['$compile', '$templateRequest', wssTableCell]);

  function wssTableCell($compile, $templateRequest) {
    return {
      restrict: 'E',
      link: link
    };

    function link(scope, element) {
      scope.$watch('column.template', function (newTemplate) {
        if (!newTemplate || scope.column.templateUrl) {
          return;
        }
        compileTemplate(newTemplate);
      });

      scope.$watch('column.templateUrl', function (newTemplateUrl) {
        if (!newTemplateUrl) {
          return;
        }

        $templateRequest(newTemplateUrl).then(function (template) {
          compileTemplate(template);
        });
      });

      scope.$watch('column.key', function (newKey) {
        if (!newKey || scope.column.template || scope.column.templateUrl) {
          return;
        }
        compileTemplate('{{row.' + newKey + '}}')
      });

      function compileTemplate(template) {
        var div = document.createElement('div');
        div.innerHTML = template;
        var compiledTemplate = $compile(div)(scope);
        element.empty();
        element.append(compiledTemplate);
      }
    }
  }
})();