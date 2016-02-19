(function () {
  'use strict';

  angular.module('wss-table')
    .directive('wssTableCell', ['$compile', '$templateRequest', wssTableCell]);

  function wssTableCell($compile, $templateRequest) {
    return {
      restrict: 'E',
      scope: {
        row: '=row',
        column: '=column'
      },
      link: link
    };

    function link(scope, element) {
      scope.$watch('column.template', function (newTemplate) {
        if (!newTemplate) {
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
        if (!newKey) {
          return;
        }
        compileTemplate('{{row[\'' + newKey + '\']}}')
      });

      function compileTemplate(template) {
        var div = document.createElement('div');
        div.innerHTML = template;
        var newScope = scope.$new(true);
        newScope.row = scope.row;
        var compiledTemplate = $compile(div)(newScope);
        element.empty();
        element.append(compiledTemplate);
      }
    }
  }
})();