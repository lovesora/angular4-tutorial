import { CONSTANT } from "./table-constant.class";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { TableComponent } from "../table.component";

// ^------------------ Paginator Option ------------------
export class PaginatorOption {
    showPaginator: boolean = true;

    constructor(
        public pageSize: number = 10,
        public pageIndex: number = 0,
        public pageSizeOptions: number[] = [5, 10, 25, 100]
    ) { }

    config({
        showPaginator = true
    } = {}) {
        this.showPaginator = showPaginator;

        return this;
    }
}
// $------------------ Paginator Option ------------------


// ^------------------ Table Option ------------------
export enum TableEditColType {
    INPUT,
    SELECT
}
export class TableEditColOption {
    constructor(
        public placeholder: string = '',
        public type: TableEditColType = TableEditColType.INPUT,
        public value: any = null,
    ) { }
}
export class TableColDefOption {
    type:string = 'TableColDefOption';
    mapText: (text: string) => string;

    private _click: Function;

    constructor(
        public col: string,
        public header: string,
        public visible: boolean = true,
        public editOption: TableEditColOption = new TableEditColOption(),
    ) { }

    config({
        mapText = null
    }: {mapText: (text: string) => string}) {
        this.mapText = mapText;
        return this;
    }

    click(fn: (row: any, table: TableComponent) => void): TableColDefOption {
        this._click = fn;
        return this;
    }

    canClick(): boolean {
        return !!this._click;
    }

    onClick(row, table): void {
        this._click && this._click(row, table);
    }
}
export class TableOptColDefOption extends TableColDefOption {
    type = 'TableOptColDefOption';

    constructor(
        public header: string,
        public menus: TableRowMenuOption[],
        public visible: boolean = true,
    ) {
        super(CONSTANT.TABLE.COL.OPT_DEF, header, visible, null);
    }
}
export class TableRowMenuOption {
    constructor(
        public icon: string,
        public text: string,
        public onClick: (row: any, table: TableComponent) => void
    ) { }
}
export class TableAddOption {
    constructor(
        public disabled: boolean = true,
        public click: (any) => Observable<boolean> = () => Observable.of(true),
    ) { }
}
export class TableUpdateOption {
    constructor(
        public disabled: boolean = true,
        public click: (any) => Observable<boolean> = () => Observable.of(true),
    ) { }
}
export class TableOption {
    showSearch: boolean = true;
    searchable: boolean = true;
    searchValue: string = '';
    searchPlaceholder: string = '';

    constructor(
        public colDef: TableColDefOption[],
        public addOption: TableAddOption = new TableAddOption(),
        public updateOption: TableUpdateOption = new TableUpdateOption(),
    ) { }

    config({
        showSearch = true,
        searchable = true,
        searchPlaceholder = '',
        searchValue = '',
    }): TableOption {
        this.showSearch = showSearch;
        this.searchable = searchable;
        this.searchPlaceholder = searchPlaceholder;
        this.searchValue = searchValue;

        return this;
    }
}
// $------------------ Table Option ------------------


// ^------------------ Table Component Option ------------------
export class TableComponentOption {
    constructor(
        public table: TableOption,
        public paginator: PaginatorOption = new PaginatorOption()
    ) { }
}
// $------------------ Table Component Option ------------------
