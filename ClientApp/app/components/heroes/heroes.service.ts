import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Hero } from './hero'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HeroesService {
	
	constructor(private http: Http) { }

	loadAll(): Observable<Hero[]> {
		return this.http
			.get('/api/heroes/loadAll')
			.map((res: Response) => {
				let heroes: Hero[] = res.json();
				return heroes;
			})
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}	
	
}


