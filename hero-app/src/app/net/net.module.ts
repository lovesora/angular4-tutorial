import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { HttpService } from './service/http.service';

@NgModule({
    imports: [HttpModule, CommonModule]
})

export class NetModule {
    static HttpService = HttpService;
    static services = [
        HttpService
    ];
}
