import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialComponent } from './material.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [{
    path: 'material',
    component: MaterialComponent,
    children: [{
        path: 'table',
        component: TableComponent
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
