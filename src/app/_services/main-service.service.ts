import { Injectable } from '@angular/core';
import { DataService } from '../_services/data.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/Rx';
import { ContentInterface } from '../main-content/content-interface';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MainServiceService {

	private searchKey = new BehaviorSubject('');
	cast = this.searchKey.asObservable();

	constructor(private http: HttpClient, private _dataService: DataService) { }

	private _response: any;

	getDataList(): Observable<any> {
		return this.http.get('../assets/data/data.json')
			.map((response: Response) => {
				return this._response = response
			});
	}

	public filterResults(key) {
		this.searchKey.next(key);
	}

}
