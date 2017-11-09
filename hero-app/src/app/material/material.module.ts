import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TableComponent } from "./table/table.component";
import { ConfirmDialogService, ConfirmInputDialog, ConfirmTextDialog } from './services/confirm/confirm.component';

// material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatPaginatorModule, MatInputModule, MatButtonModule, MatIconModule, MatMenuModule, MatDialogModule, MatSortModule, MatProgressSpinnerModule } from '@angular/material';
import { DialogTableService, DialogTable } from './services/dialog-table/dialog-table.component';
import { DetailComponent } from './detail/detail.component';
import { DialogDetail, DialogDetailService } from './services/dialog-detail/dialog-detail.component';

@NgModule({
    declarations: [
        TableComponent,
        DetailComponent,
        ConfirmInputDialog,
        ConfirmTextDialog,
        DialogTable,
        DialogDetail,
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,


        // prod模式下不能使用concat
        BrowserAnimationsModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatDialogModule,
        MatProgressSpinnerModule,
    ],
    providers: [
        ConfirmDialogService,
        DialogTableService,
        DialogDetailService,
    ],
    exports: [
        TableComponent,
        DetailComponent,
    ],
    entryComponents: [
        ConfirmInputDialog,
        ConfirmTextDialog,
        DialogTable,
        DialogDetail,
    ]
})

export class MaterialModule {
}
