import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { EmptyComponent } from "./empty.component";

const routes: Routes = [{
    path: '',
    redirectTo: '/hero',
    pathMatch: 'full'
}, {
    path: '**',
    component: EmptyComponent
}]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }
