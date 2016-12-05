import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CalculatorService {
	
	constructor(private http: Http) { }

	calculate(operation: string, first: number, second: number): Observable<CalculationResult> {
		return this.http
			.get(`/api/calculator/calculate?operation=${operation}&first=${first}&second=${second}`)
			.map((res: Response) => {
				let result: CalculationResult = res.json()
				return result;
			})
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}
}

interface CalculationResult {
    result: number;
}
