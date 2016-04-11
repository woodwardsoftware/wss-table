(function () {
  'use strict';

  angular.module('wss-table')
    .directive('wssTableHeading', ['$compile', '$templateRequest', wssTableHeading]);

  function wssTableHeading($compile, $templateRequest) {
    return {
      restrict: 'E',
      link: link
    };

    function link(scope, element) {
      scope.$watch('column.headingTemplate', function (newTemplate) {
        if (!newTemplate || scope.column.headingTemplateUrl) {
          return;
        }
        compileTemplate(newTemplate);
      });

      scope.$watch('column.headingTemplateUrl', function (newTemplateUrl) {
        if (!newTemplateUrl) {
          return;
        }

        $templateRequest(newTemplateUrl).then(function (template) {
          compileTemplate(template);
        });
      });

      scope.$watch('column.heading', function (newKey) {
        if (!newKey || scope.column.headingTemplate || scope.column.headingTemplateUrl) {
          return;
        }
        compileTemplate('{{column.heading}}');
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

