import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { CompilerConfig } from '@angular/compiler';
import { Hero } from '../class/hero';

@Injectable()
export class HeroService {
    private api = '/api/heroes';
    private headers = new Headers({
        'Content-Type': 'application/json'
    });

    constructor(private http: Http) { }

    create(name: string): Promise<Hero> {
        return this.http.post(`${this.api}`, JSON.stringify({name}), {headers: this.headers})
            .toPromise()
            .then(response => response.json() as Hero)
            .catch(this.handleError);
    }

    getList(): Promise<Hero[]> {
        return this.http.get(this.api)
            .toPromise()
            .then(response => response.json() as Hero[])
            .catch(this.handleError)
    }

    getById(id: number): Promise<Hero> {
        return this.http.get(`${this.api}/${id}`)
            .toPromise()
            .then(response => response.json() as Hero)
            .catch(this.handleError);
    }

    update(hero: Hero): Promise<Hero> {
        return this.http.put(`${this.api}/${hero.id}`, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then(response => response.json() as Hero)
            .catch(this.handleError);
    }

    delete(id: number): Promise<null> {
        return this.http.delete(`${this.api}/${id}`)
            .toPromise()
            .then(Response => null)
            .catch(this.handleError);
    }

    handleError(msg: any): Promise<any> {
        console.log('Error http request: ', msg);
        return Promise.reject(msg);
    }

}
