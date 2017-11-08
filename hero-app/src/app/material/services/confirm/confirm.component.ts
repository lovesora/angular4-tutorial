import { Component, Injectable, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';


export interface ConfirmInputDialogOption {
    title?: string;
    inputs?: {
        name: string,
        placeholder: string,
        disabled?: boolean,
    } []
}
export interface ConfirmTextDialogOption {
    title?: string;
    content?: string;
}

@Injectable()
export class ConfirmDialogService {

    constructor(private dialog: MatDialog) { }

    openConfirmInput(option: ConfirmInputDialogOption): Observable<any> {
        let dialogRef = this.dialog.open(ConfirmInputDialog, {
            width: '250px',
            data: {
                title: option.title,
                inputs: option.inputs,
            },
            backdropClass: 'mat-dialog__no-overlay',
        });

        return dialogRef.afterClosed();
    }

    openConfirmText(option: ConfirmTextDialogOption): Observable<any> {
        let dialogRef = this.dialog.open(ConfirmTextDialog, {
            width: '250px',
            data: {
                title: option.title,
                content: option.content,
            },
            backdropClass: 'mat-dialog__no-overlay',
        });

        return dialogRef.afterClosed();
    }

}

@Component({
    selector: 'confirm-input-dialog',
    templateUrl: './confirm-input-dialog.html',
    styleUrls: ['../styles/dialog.scss']
})
export class ConfirmInputDialog {
    inputValues: object = {};

    constructor(
        public dialogRef: MatDialogRef<ConfirmInputDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

}

@Component({
    selector: 'confirm-text-dialog',
    styleUrls: ['./confirm-text-dialog.scss', '../styles/dialog.scss'],
    templateUrl: './confirm-text-dialog.html',
})
export class ConfirmTextDialog {
    constructor(
        public dialogRef: MatDialogRef<ConfirmTextDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }
}
