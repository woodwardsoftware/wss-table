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
      controller: wssTableCtrl,
      link: link
    };

    function wssTableCtrl() {
      var vm = this;

      vm.sortable = false;
      vm.sortColumn = '';
      vm.sortDesc = false;

      vm.setSortable = setSortable;
      vm.setSortColumn = setSortColumn;

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
angular.module("wss-table").run(["$templateCache", function($templateCache) {$templateCache.put("wss-table.html","<table ng-class=\"table.classes\">\n  <thead>\n  <tr>\n    <th ng-repeat=\"column in table.columns\"\n        ng-bind-html=\"column.heading\"\n        ng-click=\"table.setSortColumn(column)\"\n        ng-class=\"{\'wss-column-sortable\': table.sortable || column.sortable}\">\n    </th>\n  </tr>\n  </thead>\n  <tbody>\n  <tr ng-repeat=\"(rowIndex, row) in table.rows | orderBy : table.sortColumn : table.sortDesc\">\n    <td ng-repeat=\"(columnIndex, column) in table.columns\" ng-class=\"column.class\">\n      <wss-table-cell>\n      </wss-table-cell>\n    </td>\n  </tr>\n  </tbody>\n</table>\n");}]);