(function () {
  'use strict';

  angular.module('wss-table', []);
})();


(function () {
  'use strict';

  angular.module('wss-table')
    .directive('wssTable', wssTable);

  function wssTable() {
    return {
      restrict: 'E',
      templateUrl: 'wss-table.html',
      require: 'wssTable',
      scope: {
        columns: '=',
        rows: '=',
        sortable: '@?',
        classes: '='
      },
      bindToController: true,
      controllerAs: 'table',
      controller: ['$templateRequest', wssTableCtrl],
      link: link
    };

    function wssTableCtrl($templateRequest) {
      var vm = this;

      vm.sortable = false;
      vm.sortColumn = '';
      vm.sortDesc = false;

      vm.setSortable = setSortable;
      vm.setSortColumn = setSortColumn;

      setup();

      function setup() {
        vm.columns.forEach(function (column) {
          if (column.templateUrl) {
          }
        });
      }

      function setSortable(sortable) {
        vm.sortable = sortable;
      }

      function setSortColumn(column) {
        if (!vm.sortable && !column.sortable) {
          return;
        }

        if (column.key === vm.sortColumn) {
          vm.sortDesc = !vm.sortDesc;
        } else {
          vm.sortColumn = column.key;
          vm.sortDesc = false;
        }
      }
    }

    function link(scope, element, attributes, controller) {
      attributes.$observe('sortable', function (value) {
        controller.setSortable(value !== undefined);
      });
    }
  }
})();

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
angular.module("wss-table").run(["$templateCache", function($templateCache) {$templateCache.put("wss-table.html","<table ng-class=\"table.classes\" style=\"width:100%;\">\n  <thead>\n  <tr>\n    <th ng-repeat=\"column in table.columns\"\n        ng-bind=\"column.heading\"\n        ng-click=\"table.setSortColumn(column)\"\n        ng-class=\"{\'wss-column-sortable\': table.sortable || column.sortable}\">\n    </th>\n  </tr>\n  </thead>\n  <tbody>\n  <tr ng-repeat=\"row in table.rows | orderBy : table.sortColumn : table.sortDesc\">\n    <td ng-repeat=\"column in table.columns\">\n      <wss-table-cell column=\"column\" row=\"row\">\n      </wss-table-cell>\n    </td>\n  </tr>\n  </tbody>\n</table>\n");}]);