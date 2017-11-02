import { Component, ViewChild, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';

import { MatPaginator } from '@angular/material';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FormControl } from '@angular/forms';

import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import _forEach from 'lodash.foreach';
import { SearchArray, SearchOption, SearchType, SearchRule } from '../../common/ext/array-search.ext';

export class PaginatorOption {
    constructor(
        public length: number = 0,
        public pageSize: number = 25,
        public pageIndex: number = 0,
        public pageSizeOptions: number[] = [5, 10, 25, 100]
    ) { }
}

export class TableColDefOption {
    constructor(
        public col: string,
        public header: string,
        public visible: boolean = true
    ) { }
}

export class TableRowMenuOption {
    constructor(
        public icon: string,
        public text: string,
        public onClick: Function
    ) { }
}

export class TableOptColDefOption extends TableColDefOption {
    constructor(
        public header: string,
        public menus: TableRowMenuOption[],
        public visible: boolean = true
    ) {
        super('opt', header, visible);
    }
}

export class TableOption<T> {
    constructor(
        public data: T[],
        public colDef: TableColDefOption[]
    ) { }
}

export class TableComponentOption<T> {
    constructor(
        public table: TableOption<T>,
        public paginator: PaginatorOption = new PaginatorOption()
    ) { }
}

export class TableComponentStateChange {
    constructor(
        public search: string | string[],
        public pageSize: number,
        public pageIndex: number
    ) { }
}

@Component({
    selector: 'mat-table-component',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {
    @Input() tableComponentOption: BehaviorSubject<TableComponentOption<any>>;
    @Output() stateChange: EventEmitter<TableComponentStateChange> = new EventEmitter();

    // MatTable数据
    dataSource: TableDataSource<any>;
    // MatTable
    displayedColumns: string[];

    // 搜索
    matTableSearch = new FormControl();
    // 翻页
    @ViewChild(MatPaginator) paginator: MatPaginator;

    get state(): TableComponentOption<any> {
        return this.tableComponentOption.value;
    }

    ngOnInit() {
        /**
         * 初始化表格数据
         */
        this.dataSource = new TableDataSource(this.tableComponentOption.map(option => option.table.data));
        this.displayedColumns = this.state.table.colDef.filter(v => v.visible).map(v => v.col);

        /**
         * 响应:搜索、 翻页
         */
        this.valueChange().subscribe((state: TableComponentStateChange) => {
            this.stateChange.emit(state);
        });


        /**
         * 初始化
         */
        document.querySelector('.mat-paginator-page-size-label').textContent = '每页行数：';
        this.stateChange.emit(new TableComponentStateChange('', this.state.paginator.pageSize, this.state.paginator.pageIndex));

        console.log(this.state);
    }

    valueChange(): Observable<TableComponentStateChange> {
        return Observable.merge(this.matTableSearch.valueChanges, this.paginator.page)
            .map(() => {
                let search = this.matTableSearch.value ? this.matTableSearch.value.split(' ').filter(v => !!v) : '';
                return new TableComponentStateChange(search, this.paginator.pageSize, this.paginator.pageIndex);
            });
    }
}


/**
 * 订阅table数据和paginator页数的变化返回对应的数据
 */
export class TableDataSource<T> extends DataSource<any> {
    constructor(private data: Observable<T[]>) {
        super();
    }

    connect(): Observable<T[]> {
        return this.data;
    }

    disconnect() { }
}
