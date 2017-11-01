import { Component, ViewChild, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { MatPaginator } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FormControl } from '@angular/forms';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import _forEach from 'lodash.foreach';

@Component({
    selector: 'mat-table-component',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {
    dataSource: TableDataSource;

    displayedColumns = ['position', 'name', 'weight', 'symbol'];

    tableDb = new TableDB();
    @ViewChild(MatPaginator) paginator: MatPaginator;

    matTableSearch = new FormControl();

    ngOnInit () {
        this.dataSource = new TableDataSource(this.tableDb, this.paginator);

        document.querySelector('.mat-paginator-page-size-label').textContent = '每页行数：';

        this.matTableSearch.valueChanges.subscribe(search => {
            this.tableDb.search(search);
        })
    }
}



export interface Element {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

const data: Element[] = [
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

export class TableDB {
    behaviorSubject: BehaviorSubject<Element[]> = new BehaviorSubject<Element[]>([]);

    get data(): Element[] {
        return this.behaviorSubject.value;
    }

    constructor() {
        this.behaviorSubject.next(data);
    }

    filter (data, filterRules) {
        let _data = data;

        let _defaultCols = [];
        _forEach(data[0], (v, k) => {
            _defaultCols.push(k);
        });

        let _filter = function (row, cols, filterValue) {
            return cols.filter(colName => {
                if (filterValue === undefined || filterValue === null)
                    filterValue = '';
                // 或规则，有一个匹配成功就返回true
                if (typeof filterValue === 'object') {
                    return filterValue.filter(filterItem => {
                        return String(row[colName]).toLowerCase().indexOf(String(filterItem).toLowerCase()) > -1;
                    }).length > 0;
                }
                return String(row[colName]).toLowerCase().indexOf(String(filterValue).toLowerCase()) > -1;
            }).length;
        };
        let _orFilter = function (data, filterRule) {
            return data.filter(v => _filter(v, filterRule.cols || _defaultCols, filterRule.value) > 0);
        };
        let _andFilter = function (data, filterRule) {
            return data.filter(v => _filter(v, filterRule.cols || _defaultCols, filterRule.value) === filterRule.cols.length);
        };
        _forEach(filterRules, rule => {
            switch (rule.type) {
                case '&': {
                    _data = _andFilter(_data, rule.rule);
                    break;
                }
                case '|': {
                    _data = _orFilter(_data, rule.rule);
                    break;
                }
            }
        });
        return _data;
    };

    search(search): void {
        let _data = this.filter(data, [{
            type: '|',
            rule: {
                value: search
            }
        }]);

        this.behaviorSubject.next(_data);
    }
}

export class TableDataSource extends DataSource<any> {
    constructor(private tableDb: TableDB, private paginator: MatPaginator) {
        super();
    }

    connect(): Observable<Element[]> {
        return Observable.merge(this.tableDb.behaviorSubject, this.paginator.page)
            .map(() => {
                let start = this.paginator.pageIndex * this.paginator.pageSize;
                return this.tableDb.data.slice(start, start + this.paginator.pageSize);
            });
    }

    disconnect() { }
}
