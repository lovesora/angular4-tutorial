import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { CompilerConfig } from '@angular/compiler';
import { ReactiveFormsModule } from '@angular/forms';
import { Hero } from '../class/hero';
import { HttpService } from '../../net/service/http.service';
import { Api, ApiOptions } from '../../net/class/api.class';

@Injectable()
export class HeroService {
    private apis = new Api({
        prefix: 'api',
        module: 'heroes'
    }, {
            create: {
                method: RequestMethod.Post
            },
            list: {
                method: RequestMethod.Get
            },
            getById: {
                url: '/:id',
                method: RequestMethod.Get
            },
            update: {
                url: '/:id',
                method: RequestMethod.Put
            },
            delete: {
                url: '/:id',
                method: RequestMethod.Delete
            }
        }
    );

    constructor(private http: Http, private httpService: HttpService) { }

    create(name: string): Promise<Hero> {
        return this.httpService
            .fetch(this.apis.get('create', new ApiOptions({
                requestOptions: new RequestOptions({
                    body: { name }
                })
            })))
            .then(r => r as Hero)
            .catch(this.handleError);
    }

    getList(): Promise<Hero[]> {
        return this.httpService
            .fetch(this.apis.get('list'))
            .then(r => r as Hero[])
            .catch(this.handleError);
    }

    getById(id: number): Promise<Hero> {
        return this.httpService
            .fetch(this.apis.get('getById', new ApiOptions({
                restArgs: { id }
            })))
            .then(r => r as Hero)
            .catch(this.handleError);
    }

    update(hero: Hero): Promise<Hero> {
        return this.httpService
            .fetch(this.apis.get('update', new ApiOptions({
                requestOptions: new RequestOptions({
                    body: hero
                }),
                restArgs: { id: hero.id }
            })))
            .then(r => r as Hero)
            .catch(this.handleError);
    }

    delete(id: number): Promise<null> {
        return this.httpService
            .fetch(this.apis.get('delete', new ApiOptions({
                restArgs: { id }
            })))
            .then(r => null)
            .catch(this.handleError);
    }

    handleError(msg: any): Promise<any> {
        console.log('Error http request: ', msg);
        return Promise.reject(msg);
    }

}
