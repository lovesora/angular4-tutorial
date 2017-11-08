import { Component, ViewChild, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { FormControl } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';

import { MatPaginator, MatSort } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';

import _forEach from 'lodash.foreach';

import { TableComponentOption, TableEditColType } from './class/table-option.class';
import { TableComponentState, TableComponentStateChange, TablePaginatorStateChange, TablePaginatorState, TableStateChange, _TableComponentState, _TableAction, _TableAnimationState } from './class/table-state.class';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { animations } from './animation/animations';
import { ShowHiddenAnimationState } from './animation/show-hidden';
import { IconBtnAnimationState } from './animation/icon-btn';
import { CollapseExpandedAnimationState } from './animation/cllapseExpanded';

import { DomSanitizer } from '@angular/platform-browser';


@Component({
    selector: 'mat-table-component',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    animations: animations
})

export class TableComponent implements OnInit {
    @Input() option: TableComponentOption;
    @Input() state: Observable<TableComponentState<any>>;
    @Output() stateChange: EventEmitter<TableComponentStateChange> = new EventEmitter();

    // ------------------ 枚举赋值，让模版可以使用枚举变量 ------------------
    _TableAction = _TableAction;
    _TableEditColType = TableEditColType;


    // ------------------ 私有状态 ------------------
    // 抽象状态
    _state: _TableComponentState;
    // 动画状态
    _animationState: _TableAnimationState;


    // ------------------ 数据绑定 ------------------
    // MatTable数据
    dataSource: TableDataSource<any>;
    // MatTable
    displayedColumns: string[];


    // ------------------ 组件绑定 ------------------
    // 搜索
    matTableSearch = new FormControl();
    // 翻页
    @ViewChild(MatPaginator) paginator: MatPaginator;


    constructor(@Inject(DomSanitizer) public sanitizer: DomSanitizer) {
        this._state = new _TableComponentState(_TableAction.LIST);
        this._animationState = new _TableAnimationState();
    }


    ngOnInit() {
        /**
         * 初始化表格数据
         */
        this.dataSource = new TableDataSource(this.state.map((option: TableComponentState<any>) => option.table.data));
        this.displayedColumns = this.option.table.colDef.filter(v => v.visible).map(v => v.col);

        let editModels = {};
        this.option.table.colDef.filter(v => !!v.editOption).map(v => {
            editModels[v.col] = v.editOption.value;
        });
        this._state.forms = editModels;


        /**
         * 响应:搜索、 翻页
         */
        this.valueChange().subscribe((state: TableComponentStateChange) => {
            this.stateChange.emit(state);
        });


        /**
         * 初始化
         */
        // 中文替换
        document.querySelector('.mat-paginator-page-size-label').textContent = '每页行数：';
        // 禁用搜索
        !this.option.table.searchable && this.matTableSearch.disable()
        // 发送初始搜索
        this.stateChange.emit(new TableComponentStateChange(
            new TableStateChange(this.option.table.searchValue),
            new TablePaginatorStateChange(this.option.paginator.pageSize, this.option.paginator.pageIndex))
        );
    }

    valueChange(): Observable<TableComponentStateChange> {
        return Observable.merge(this.matTableSearch.valueChanges, this.paginator.page)
            .debounceTime(500)
            .map(() => {
                let search = this.matTableSearch.value ? this.matTableSearch.value.split(' ').filter(v => !!v) : '';
                return new TableComponentStateChange(
                    new TableStateChange(search),
                    new TablePaginatorStateChange(this.paginator.pageSize, this.paginator.pageIndex)
                );
            });
    }

    private _animationStateChange(action: _TableAction) {
        this._state.action = action;

        switch (this._state.action) {
            case _TableAction.UPDATE: {

            }
            case _TableAction.ADD: {
                this._animationState.search = ShowHiddenAnimationState.HIDDEN;
                this._animationState.title = ShowHiddenAnimationState.SHOW;
                this._animationState.iconBtn = IconBtnAnimationState.BACK;
                this._animationState.table = CollapseExpandedAnimationState.COLLAPSE;
                this._animationState.edit = CollapseExpandedAnimationState.EXPANDED;

                this.matTableSearch.setValue('');
                break;
            }
            case _TableAction.LIST: {
                this._animationState.search = ShowHiddenAnimationState.SHOW;
                this._animationState.title = ShowHiddenAnimationState.HIDDEN;
                this._animationState.iconBtn = IconBtnAnimationState.ADD;
                this._animationState.table = CollapseExpandedAnimationState.EXPANDED;
                this._animationState.edit = CollapseExpandedAnimationState.COLLAPSE;


                _forEach(this._state.forms, (v, k) => {
                    this._state.forms[k] = null;
                });
                break;
            }
        }
    }

    onClickAdd() {
        switch (this._state.action) {
            case _TableAction.UPDATE:
            case _TableAction.ADD: {
                this._animationStateChange(_TableAction.LIST);
                break;
            }
            case _TableAction.LIST: {
                this._animationStateChange(_TableAction.ADD);
                break;
            }
        }

    }

    onClickOK() {
        switch (this._state.action) {
            case _TableAction.UPDATE: {
                this.option.table.updateOption.click(this._state.forms)
                    .subscribe(isSuccess => {
                        isSuccess && this._animationStateChange(_TableAction.LIST);
                    })
                break;
            }
            case _TableAction.ADD: {
                this.option.table.addOption.click(this._state.forms)
                    .subscribe(isSuccess => {
                        isSuccess && this._animationStateChange(_TableAction.LIST);
                    })
            }
        }
    }

    public openUpdate(row) {
        this.option.table.colDef.map(col => {
            if (col.editOption) {
                this._state.forms[col.col] = row[col.col];
            }
        })

        this._animationStateChange(_TableAction.UPDATE);
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
