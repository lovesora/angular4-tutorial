/**
 * 2017-11-02 11:14:24
 * @author liuxin
 * @description 数组的搜索扩展
 */

import _forEach from 'lodash.foreach';

export enum SearchType {
    AND,
    OR
}

export class SearchRule {
    constructor (public value: string | string[], public cols: string[] = null) { }
}

export class SearchOption {
    constructor (public rule: SearchRule, public type: SearchType = SearchType.OR) { }
}

export class SearchArray<T> {
    constructor(public data: T[]) { }

    public search(filterOption: SearchOption[]) {
        let _data = this.data;

        // 默认搜索所有列
        let _defaultCols = [];
        _forEach(_data[0], (v, k) => {
            _defaultCols.push(k);
        });

        /**
         * @param row 行数据
         * @param cols 列名数组
         * @param filterValue 需要过滤的值
         * @returns 包含filterValue的col的数量
         */
        let _filter = function (row: T, cols: string[], filterValue: string): number {
             return cols.filter(colName => {
                if (filterValue === undefined || filterValue === null)
                    filterValue = '';
                return String(row[colName]).toLowerCase().indexOf(String(filterValue).toLowerCase()) > -1;
            }).length;
        };
        /**
         *
         * @param data 源数据
         * @param rule 搜索规则
         * @returns rule.cols中匹配rule.value的data数据，如果rule.value是一个数组，则每行匹配数组中所有数据才返回，单位是“行”
         */
        let _orFilter = function (data: T[], rule: SearchRule): T[] {
            return data.filter(v => {
                if (Object.prototype.toString.call(rule.value) === '[object Array]') {
                    let value = rule.value as string[];
                    let result = value.filter(_value => {
                        return _filter(v, rule.cols || _defaultCols, _value) > 0
                    }).length === value.length;
                    return result;
                } else {
                    return _filter(v, rule.cols || _defaultCols, rule.value as string) > 0
                }
            });
        };

        /**
         * @param row 行数据
         * @param cols 列名数组
         * @param filterValue 需要过滤的值 string | string[]
         * @returns 包含filterValue的col的数量，如果filterValue是一个数组的话则列中会包含数组中的"所有"值才会被认为匹配成功，单位是“列”
         */
        let _filterAnd = function (row: T, cols: string[], filterValue): number {
             return cols.filter(colName => {
                if (filterValue === undefined || filterValue === null)
                    filterValue = '';
                // 或规则，有一个匹配成功就返回true
                if (Object.prototype.toString.call(filterValue) === '[object Array]') {
                    return filterValue.filter(filterItem => {
                        return String(row[colName]).toLowerCase().indexOf(String(filterItem).toLowerCase()) > -1;
                    }).length === filterValue.length;
                }
                return String(row[colName]).toLowerCase().indexOf(String(filterValue).toLowerCase()) > -1;
            }).length;
        };
        /**
         *
         * @param data 源数据
         * @param rule 搜索规则
         * @returns rule.cols中匹配rule.value的data数据，如果rule.value是一个数组，则每列匹配数组中所有数据才返回，单位是“列”
         */
        let _andFilter = function (data: T[], rule: SearchRule): T[] {
            return data.filter(v => _filterAnd(v, rule.cols || _defaultCols, rule.value) === rule.cols.length);
        };

        _forEach(filterOption, (option: SearchOption) => {
            switch (option.type) {
                case SearchType.AND: {
                    _data = _andFilter(_data, option.rule);
                    break;
                }
                case SearchType.OR: {
                    _data = _orFilter(_data, option.rule);
                    break;
                }
            }
        });

        return _data;
    };

}
