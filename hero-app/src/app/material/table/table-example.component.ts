import { Component } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { TableComponentOption, TableOption, TableColDefOption, TableOptColDefOption, PaginatorOption, TableComponentStateChange, TableRowMenuOption } from "./table.component";
import { SearchArray, SearchOption, SearchType, SearchRule } from "../../common/ext/array-search.ext";

export interface Element {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}
const _data: Element[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
    { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
    { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
    { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
    { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
    { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
    { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
    { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
    { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
    { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
    { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];


@Component({
    template: '<mat-table-component [tableComponentOption]="tableComponentOption" (stateChange)="onStateChange($event)"></mat-table-component>'
})

export class TableExampleComponent {
    tableComponentOption: BehaviorSubject<TableComponentOption<Element>>;
    searchArray = new SearchArray(_data);

    constructor() {
        this.tableComponentOption = new BehaviorSubject(new TableComponentOption(
            new TableOption(
                _data,
                [
                    new TableColDefOption('position', 'No.'),
                    new TableColDefOption('name', 'Name'),
                    new TableColDefOption('weight', 'Weight'),
                    new TableColDefOption('symbol', 'Symbol'),
                    new TableOptColDefOption('Opt', [
                        new TableRowMenuOption(
                            'dialpad',
                            'Redial',
                            function(row) {
                                console.log(row);
                            }
                        ),
                        new TableRowMenuOption(
                            'voicemail',
                            'Check voicemail',
                            function(row) {
                                console.log(row);
                            }
                        ),
                        new TableRowMenuOption(
                            'notifications_off',
                            'Disable alerts',
                            function(row) {
                                console.log(row);
                            }
                        ),
                    ]),
                ]
            ),
            new PaginatorOption(_data.length, 5, 0, [5, 10])
        ));
    }

    onStateChange(stateChange: TableComponentStateChange) {
        let option = this.tableComponentOption.value;
        let data = this.searchArray.search([
            new SearchOption(
                new SearchRule(
                    stateChange.search
                )
            )
        ]);

        option.paginator.length = data.length;
        option.table.data = data.slice(stateChange.pageIndex * stateChange.pageSize, (stateChange.pageIndex + 1) * stateChange.pageSize);

        this.tableComponentOption.next(option);
    }
}
