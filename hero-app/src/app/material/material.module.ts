import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialRoutingModule } from './material-routing.module';
import { MaterialComponent } from './material.component';
import { TableComponent } from "./table/table.component";
import { TableExampleComponent } from './table/table-example.component';

// material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatPaginatorModule, MatInputModule, MatButtonModule, MatIconModule, MatMenuModule } from '@angular/material';


@NgModule({
    declarations: [
        MaterialComponent,
        TableComponent,
        TableExampleComponent
    ],
    imports: [
        MaterialRoutingModule,
        FormsModule,
        ReactiveFormsModule,

        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
    ],
    exports: [
        MaterialRoutingModule,
        TableComponent
    ]
})

export class MaterialModule {

}
