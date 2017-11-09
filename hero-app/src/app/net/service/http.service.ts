import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptions } from '@angular/http';

import _isEqual from 'lodash.isequal';
import _cloneDeep from 'lodash.clonedeep';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';


export class RequestCache {
    constructor(public request: Request, public data: any) { }
}

export class HttpOptions {
    isFromCache: boolean;

    constructor({
        isFromCache = false
    } = {}) {
        this.isFromCache = isFromCache;
    }
}

@Injectable()
export class HttpService {
    private _cache: RequestCache[] = [];
    private _requestOptions = new RequestOptions({
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })

    constructor(private http: Http) { }

    /**
     *
     * @param requestOptions
     * @param param1
     */
    fetch(requestOptions: RequestOptions, { isFromCache}: HttpOptions = new HttpOptions() ): Observable<any> {
        let _requestOptions = this._requestOptions.merge(requestOptions);

        let _request = new Request(_requestOptions);

        // 获取缓存数据
        let cache = this._cache.filter(v => _isEqual(v.request, _request));
        if (isFromCache && cache.length > 0) {
            return Observable.of(cache[0].data);
        }

        return this.http.request(_request).switchMap(response => {
            let result;

            if (response.ok && (response.status >= 200 && response.status < 300)) {
                let json = response.json();
                this._cache.push(new RequestCache(_request, _cloneDeep(json)));
                result = json;
            } else {
                console.log(response);
                throw response;
            }

            return Observable.of(result);
        });
    }
}
