import { Injectable, Component, Inject } from "@angular/core";


import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";


import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";


import { TableComponentOption } from "../../table/class/table-option.class";
import { TableComponentState, TableComponentStateChange } from "../../table/class/table-state.class";


export interface DialogTableOption {
    title: string;

    tableOption: TableComponentOption;
    tablestate: BehaviorSubject<TableComponentState<any>>;
    onStateChange: (stateChange: TableComponentStateChange) => void;
}

@Injectable()
export class DialogTableService {
    constructor(private dialog: MatDialog) { }

    public openDialogTable(option: DialogTableOption): Observable<any> {

        let dialogRef = this.dialog.open(DialogTable, {
            width: '500px',
            data: {
                title: option.title,

                tableOption: option.tableOption,
                tableState: option.tablestate,
                onStateChange: option.onStateChange,
            },
            backdropClass: 'mat-dialog__no-overlay'
        });

        return dialogRef.afterClosed();
    }

}

@Component({
    templateUrl: './dialog-table.component.html',
    styleUrls: ['./dialog-table.component.scss', '../styles/dialog.scss']
})
export class DialogTable {
    title: string;

    tableOption: TableComponentOption;
    tableState: BehaviorSubject<TableComponentState<any>>;
    onStateChange: (stateChange: TableComponentStateChange) => void;

    constructor(
        public dialogRef: MatDialogRef<DialogTable>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.title         = data.title;

        this.tableOption   = data.tableOption;
        this.tableState    = data.tableState;
        this.onStateChange = data.onStateChange;
    }

}
