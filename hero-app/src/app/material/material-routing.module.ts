import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialComponent } from './material.component';
import { TableExampleComponent } from './table/table-example.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [{
    path: 'material',
    component: MaterialComponent,
    children: [{
        path: 'table',
        // component: TableComponent
        component: TableExampleComponent
    }]
}]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})

export class MaterialRoutingModule {

}
