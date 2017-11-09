import { ShowHiddenAnimationState } from "../animation/show-hidden";
import { IconBtnAnimationState } from "../animation/icon-btn";
import { CollapseExpandedAnimationState } from "../animation/cllapseExpanded";

// ^------------------ Table Component State ------------------
export class TableState<T> {
    constructor(
        public data: T[] = [],
        public isLoading: boolean = false,
        public action: _TableAction = _TableAction.LIST,
    ) { }
}
export class TablePaginatorState {
    constructor(
        public length: number = 0,
    ) { }
}
export class TableComponentState<T> {
    constructor(
        public table: TableState<T> = new TableState(),
        public paginator: TablePaginatorState = new TablePaginatorState(),
    ) { }
}
// ^------------------ Table Component State ------------------


// ^------------------ Table Component StateChange ------------------
export class TableStateChange {
    constructor(
        public search: string | string[]
    ) { }
}
export class TablePaginatorStateChange {
    constructor(
        public pageSize: number,
        public pageIndex: number
    ) { }
}
export class TableComponentStateChange {
    constructor(
        public table: TableStateChange,
        public paginator: TablePaginatorStateChange,
    ) { }
}
// $------------------ Table Component StateChange ------------------


// ^------------------ private Table Component State ------------------
export enum _TableAction {
    ADD = 'add',
    UPDATE = 'update',
    LIST = 'list'
}

export class _TableComponentState {
    constructor(
        public action: _TableAction = _TableAction.LIST,
        public forms = {},
    ) { }
}
// $------------------ private Table Component State ------------------


// ^------------------ private Table Component Animation State ------------------
export class _TableAnimationState {
    constructor(
        public table: CollapseExpandedAnimationState = CollapseExpandedAnimationState.EXPANDED,
        public edit: CollapseExpandedAnimationState = CollapseExpandedAnimationState.COLLAPSE,
        public iconBtn: IconBtnAnimationState = IconBtnAnimationState.ADD,
        public search: ShowHiddenAnimationState = ShowHiddenAnimationState.SHOW,
        public title: ShowHiddenAnimationState = ShowHiddenAnimationState.HIDDEN,
    ) { }
}
// $------------------ private Table Component Animation State ------------------
