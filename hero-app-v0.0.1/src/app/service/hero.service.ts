import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import { Hero } from '../class/hero';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService {
    private api = '/api/heroes';
    private headers = new Headers({
        'Content-type': 'application/json'
    });

    constructor(private http:Http) { }

    create(hero: Hero): Promise<Hero> {
        return this.http
            .post(this.api, JSON.stringify(hero), { headers: this.headers})
            .toPromise()
            .then(response => response.json() as Hero)
            .catch(this.handleError);
    }

    getList(): Promise<Hero []> {
        return this.http
            .get(this.api)
            .toPromise()
            .then(response => response.json() as Hero[])
            .catch(this.handleError);
    }

    getById(id: number): Promise<Hero> {
        return this.http
            .get(`${this.api}/${id}`)
            .toPromise()
            .then(response => response.json() as Hero)
            .catch(this.handleError);
    }

    update(hero: Hero): Promise<Hero> {
        return this.http
            .put(this.api, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then(response => response.json() as Hero)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        return this.http
            .delete(`${this.api}/${id}`)
            .toPromise()
            .then(response => null)
            .catch(this.handleError);
    }

    handleError(msg: any): Promise<any> {
        console.log('Errored!', msg);
        throw msg && msg.message || msg;
    }
}
