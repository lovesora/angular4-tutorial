import { RequestOptions } from '@angular/http';
import { RequestMethod } from '@angular/http';
import { Headers } from '@angular/http';
import _cloneDeep from 'lodash.clonedeep';
import { apiConfig } from '../../common/config/net.config';

export enum BodyParseType {
    JSON = 'applicaion/json',
    URL_ENCODED = 'application/x-www-form-urlencoded'
}

export class ApiOptions {
    apiArg: ApiArg;
    restArgs: {};

    constructor({
        apiArg = null,
        restArgs = {}
    } = {}) {
        this.apiArg = apiArg;
        this.restArgs = restArgs;
    }
}

/**
 * 单独请求的参数
 */
export interface ApiArg {
    url: string;
    method: RequestMethod;
    headers?: Headers;
    params?: object;
    body?: any;
}

export class Api {
    host: string;
    prefix: string;
    version: string;
    module: string;
    params: object;
    body: object;
    headers: Headers;
    apis: {
        [key: string]: ApiArg
    };

    // {
    //     host: http://192.168.1.1,
    //     prefix: 'api/admin',
    //     version: 'v1'
    //     module: 'user'
    // }
    // http://192.168.1.1/api/admin/v1/user
    constructor ({
        host    = apiConfig.host,
        prefix  = apiConfig.prefix,
        version = apiConfig.version,
        module  = '',
        params  = {},
        body    = {},
        headers = null
    } = {}, apis: {[key: string]: ApiArg} = {}) {
        this.host    = host;
        this.prefix  = prefix;
        this.version = version;
        this.module  = module;
        this.params  = params;
        this.body    = body;
        this.headers = headers;

        this.apis = {};

        this.add(apis);
    }

    add(apis: {[key: string]: ApiArg}) {
        for (let api in apis) {
            this.apis[api] = {
                url: this.host + `/${this.prefix}/${this.version}/${this.module}/${apis[api].url || ''}`.replace(/\/+/g, '/').replace(/\/+$/, ''),
                method: apis[api].method,
                params: {...(apis[api].params || {}), ...this.params},
                body: {...this.body, ...apis[api].body},
                headers: new Headers({...(this.headers && this.headers.toJSON()), ...(apis[api].headers && apis[api].headers.toJSON())}),
            };
        }

        return this;
    }

    get(key: string, {apiArg, restArgs} = new ApiOptions()): RequestOptions {
        // let _requestOptions = (this.apis[key] as RequestOptions).mrge(requestOptions || new RequestOptions());

        let _requestOptions = _cloneDeep(this.apis[key]) as ApiArg;
        _requestOptions.body = this.transBody({..._requestOptions.body, ...apiArg.body}, _requestOptions.headers.get('Content-Type') as BodyParseType);
        _requestOptions.headers = new Headers({..._requestOptions.headers.toJSON(), ...(apiArg.headers && apiArg.headers.toJSON())});


        // 格式化rest风格url
        for (let key in restArgs) {
            _requestOptions.url = _requestOptions.url.replace(`:${key}`, restArgs[key]);
        }


        return new RequestOptions(_requestOptions);
    }

    transBody(body: object, type: BodyParseType): string|object {
        switch (type) {
            case BodyParseType.JSON: {
                return JSON.stringify(body);
            }
            case BodyParseType.URL_ENCODED: {
                let data = '';
                for (let key in body) {
                    data += `&${key}=${body[key]}`
                }
                return data.replace(/^&/, '');
            }
            default: {
                return body;
            }
        }
    }
}
