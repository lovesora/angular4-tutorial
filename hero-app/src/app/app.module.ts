import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeroModule } from './hero/hero.module';
import { AppRoutingModule } from './app-routing.module';
import { EmptyComponent } from './empty.component';
import { MaterialModule } from './material/material.module';

@NgModule({
    declarations: [
        AppComponent,
        EmptyComponent
    ],
    // 路由配置的顺序很重要。 路由器会接受第一个匹配上导航所要求的路径的那个路由。
    imports: [
        BrowserModule,
        HeroModule,
        MaterialModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
