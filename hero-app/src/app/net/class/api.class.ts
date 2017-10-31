import { RequestOptions } from '@angular/http';

export class ApiOptions {
    requestOptions: RequestOptions;
    restArgs: {};

    constructor({
        requestOptions = null,
        restArgs = {}
    } = {}) {
        this.requestOptions = requestOptions;
        this.restArgs = restArgs;
    }
}

export class Api {
    host: string;
    prefix: string;
    version: string;
    module: string;
    apis: {};

    // {
    //     host: http://192.168.1.1,
    //     prefix: 'api/admin',
    //     version: 'v1'
    //     module: 'user'
    // }
    // http://192.168.1.1/api/admin/v1/user
    constructor ({
        host    = location.origin,
        prefix  = '',
        version = '',
        module  = ''
    } = {}, apis = {}) {
        this.host    = host;
        this.prefix  = prefix;
        this.version = version;
        this.module  = module;

        this.apis = {};

        this.add(apis);
    }

    add(apis) {
        for (let api in apis) {
            this.apis[api] = new RequestOptions({
                url: this.host + `/${this.prefix}/${this.version}/${this.module}/${apis[api].url || ''}`.replace(/\/+/g, '/').replace(/\/+$/, ''),
                method: apis[api].method
            });
        }
        return this;
    }

    get(key: string, {requestOptions, restArgs} = new ApiOptions()): RequestOptions {
        let _requestOptions = (this.apis[key] as RequestOptions).merge(requestOptions || new RequestOptions());

        // 格式化rest风格url
        for (let key in restArgs) {
            _requestOptions.url = _requestOptions.url.replace(`:${key}`, restArgs[key]);
        }

        return _requestOptions;
    }
}
