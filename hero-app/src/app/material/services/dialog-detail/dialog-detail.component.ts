import { Injectable, Component, Inject } from "@angular/core";


import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";


import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";


import { DetailComponentOption } from "../../detail/class/detail-option.class";


export interface DialogDetailOption {
    title: string;
    detailOption: DetailComponentOption;
}

@Injectable()
export class DialogDetailService {
    constructor(private dialog: MatDialog) { }

    public openDialogDetail(option: DialogDetailOption): Observable<any> {

        let dialogRef = this.dialog.open(DialogDetail, {
            width: '500px',
            data: {
                title: option.title,
                detailOption: option.detailOption,
            },
            backdropClass: 'mat-dialog__no-overlay'
        });

        return dialogRef.afterClosed();
    }

}

@Component({
    templateUrl: './dialog-detail.component.html',
    styleUrls: ['./dialog-detail.component.scss', '../styles/dialog.scss']
})
export class DialogDetail {
    title: string;
    detailOption: DetailComponentOption;


    constructor(
        public dialogRef: MatDialogRef<DialogDetail>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.title        = data.title;
        this.detailOption = data.detailOption;
    }

}
