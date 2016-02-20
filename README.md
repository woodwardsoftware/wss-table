WSS-Table
=========

A simple read only table with sortable columns.

``` html
<wss-table columns="array"
           rows="array"
           [classes="expression"]
           [sortable]>
</wss-table>
```

Param | Type | Details
------|------|--------
columns|array|An array of column objects, seen below
rows|array|An array of data objects that will be bound to each row
classes *(optional)*|expression|Passed through to an `ng-class` attribute on the table element
sortable *(optional)*|null|If this attribute is present every column in the table will be sortable (unless overridden in the column definition) 


Column
------
###Properties
``` javascript
{
    heading: string,
    key: string,
    template: string,
    templateUrl: string,
    sortable: boolean
}
```
Only one of key, template and templateUrl should be delcared for each column.

`heading`: what is shown in the table column heading.

`key`: the property name on the row object to display in the table cell.

`template`: the template string to render in the cell.

`templateUrl`:  the path to a template to render in the cell.

`sortable`: an optional boolean that overrides the table sortable option for the column.

The templates are compiled with a scope containing only a row property.
For example `<div>{{row.rowProperty}}</div>`
    