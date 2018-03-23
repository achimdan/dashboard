import { Injectable } from '@angular/core';
import { DataService } from '../_services/data.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/Rx';
import { ContentInterface } from '../main-content/content-interface';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MainServiceService {

	public dataList: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	observableData = this.dataList.asObservable();

	private searchKey = new BehaviorSubject('');
	castKeyValue = this.searchKey.asObservable();

	public stateSource: BehaviorSubject<string> = new BehaviorSubject<string>('ALL');
	viewState = this.stateSource.asObservable();

	public objectToFiles: BehaviorSubject<any> = new BehaviorSubject<any>('');
	viewObject = this.objectToFiles.asObservable();

	public toShowButtons: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	whatToShow = this.toShowButtons.asObservable();

	constructor(private http: HttpClient, private _dataService: DataService) { }

	private _response: any;
	private objects: any;

	getDataList(filter): Observable<any> {
		return this.http.get('../assets/data/data.json')
			.map((response: Response) => {
				this.objects = response;
				this.numberToString(response);
				return this._response = response;
			});
	}

	numberToString(objects) {
		objects.forEach(element => {
			if (element.sharing === 1) element.sharing = 'Public';
			else if (element.sharing === 2) element.sharing = 'Sharerd';
			else element.sharing = 'Private';
		});
	}

	public filterResults(key) {
		this.searchKey.next(key);
	}

	public changeState(state: string, firstLoading: string) {
		this.stateSource.next(state);
		if (!firstLoading) {
			this.dataList.next(true);
		} else {
			this.dataList.next(false);
		}
	}

	public addDataObject(dataObject: ContentInterface) {
		let isDuppie;
		this.dataList.next(true);
	}

}

