import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialRoutingModule } from './material-routing.module';
import { MaterialComponent } from './material.component';
import { TableComponent } from "./table/table.component";
import { TableExampleComponent } from './table/table-example.component';

// material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatPaginatorModule, MatInputModule, MatButtonModule, MatIconModule, MatMenuModule } from '@angular/material';

let MatModules = [
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
];

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
    ].concat(MatModules),
    exports: [
        MaterialRoutingModule
    ]
})

export class MaterialModule {

}
