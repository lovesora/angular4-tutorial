import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestMethod } from '@angular/http';

import _isEqual from 'lodash.isequal';
import _cloneDeep from 'lodash.clonedeep';

import 'rxjs/add/operator/toPromise';

class RequestCache {
    request: Request;
    data: any;

    constructor(request: Request, data: any) {
        this.request = request;
        this.data = data;
    }
}

@Injectable()
export class HttpService {
    private _cache: RequestCache[] = [];
    private _headers = new Headers({
        'Content-Type': 'application/json'
    });

    constructor(private http: Http) { }

    request(request: Request, restArgs: {} = {}, { isFromCache = false } = {} ): void {
        let _request = _cloneDeep(request) as Request;
        _request.headers = { ...this._headers, ..._request.headers } as Headers;

        // 格式化rest风格url
        for (let key in restArgs) {
            _request.url = _request.url.replace(`:${key}`, restArgs[key]);
        }

        // 获取缓存数据
        let cache = this._cache.filter(v => _isEqual(v.request, request));
        if (isFromCache && cache.length > 0) {
            return cache[0].data;
        }

        this.http.request(_request).toPromise().then(response => {
            let result;

            if (response.ok && (response.status >= 200 && response.status < 300)) {
                let json = response.json();
                this._cache.push(new RequestCache(_request, _cloneDeep(json)));
                result = json;
            }
            return result;
        }).catch(e => {
            console.log(e);
            throw e;
        });
    }
}
