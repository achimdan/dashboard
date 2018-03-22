import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {

	private _baseUrl: string;

	constructor(private _http: HttpClient) { }

	public getAllData<T>(path: string): Observable<T> {
		const url = `${this._baseUrl}/${path}`;

		return this._http.get<T>(url);
	}

}
