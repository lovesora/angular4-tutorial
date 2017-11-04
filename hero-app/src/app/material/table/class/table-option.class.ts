import { CONSTANT } from "./table-constant.class";

// ^------------------ Paginator Option ------------------
export class PaginatorOption {
    constructor(
        public pageSize: number = 25,
        public pageIndex: number = 0,
        public pageSizeOptions: number[] = [5, 10, 25, 100]
    ) { }
}
// $------------------ Paginator Option ------------------


// ^------------------ Table Option ------------------
export enum TableEditColType {
    INPUT,
    SELECT
}
export class TableEditColOption {
    constructor(
        public placeholder: string,
        public type: TableEditColType = TableEditColType.INPUT,
        public value: any = null,
    ) { }
}
export class TableColDefOption {
    constructor(
        public col: string,
        public header: string,
        public visible: boolean = true,
        public editOption: TableEditColOption = null,
    ) { }
}
export class TableOptColDefOption extends TableColDefOption {
    constructor(
        public header: string,
        public menus: TableRowMenuOption[],
        public visible: boolean = true,
    ) {
        super(CONSTANT.TABLE.COL.OPT_DEF, header, visible);
    }
}
export class TableRowMenuOption {
    constructor(
        public icon: string,
        public text: string,
        public onClick: Function
    ) { }
}
export class TableAddOption {
    constructor(
        public disabled: boolean = true,
        public click: Function = null,
    ) { }
}
export class TableOption {
    constructor(
        public colDef: TableColDefOption[],
        public addOption: TableAddOption = new TableAddOption(),
    ) { }
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
