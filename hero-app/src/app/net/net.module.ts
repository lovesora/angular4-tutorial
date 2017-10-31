import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpService } from './service/http.service';

@NgModule({
    imports: [HttpModule],
    exports: [NetModule]
})

export class NetModule {
    static HttpService = HttpService;
    static services = [
        HttpService
    ];
}
