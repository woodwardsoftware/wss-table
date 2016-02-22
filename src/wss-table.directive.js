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
