import { MatTableModule, MatPaginatorModule, MatInputModule } from '@angular/material';


import { MaterialRoutingModule } from './material-routing.module';
import { MaterialComponent } from './material.component';
import { TableComponent } from "./table/table.component";

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        MaterialComponent,
        TableComponent
    ],
    imports: [
        MaterialRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
    ],
    exports: [
        MaterialRoutingModule
    ]
})

export class MaterialModule {

}
