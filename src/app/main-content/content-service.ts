import { Injectable } from '@angular/core';
import { DataService } from '../_services/data.service';
import { BehaviorSubject } from 'rxjs/Rx';
import { ContentInterface } from '../main-content/content-interface';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { pluck, debounceTime, map, distinctUntilChanged } from 'rxjs/operators';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';

import { MainServiceService } from '../_services/main-service.service';

@Injectable()
export class ContentService {
	private _response: any;
	public objects: ContentInterface[];

	private stateSource: BehaviorSubject<string> = new BehaviorSubject<string>('ALL');
	viewState = this.stateSource.asObservable();

	private dataList: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	observableData = this.dataList.asObservable();

	private searchDataList: BehaviorSubject<string> = new BehaviorSubject<string>('SEARCH');
	observableDataSearch = this.searchDataList.asObservable();

	private toShowButtons: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	whatToShow = this.toShowButtons.asObservable();

	private filters: string;

	objectsFormGroup: FormGroup;
	formObjects: any;

	theFiles = [];

	constructor(private _mainService: MainServiceService, private _dataService: DataService, private formBuilder: FormBuilder) {
		this.objectsFormGroup = this.formBuilder.group({
			objects: this.formBuilder.array([])
		});
	}

	public changeState(state: string) {
		this.stateSource.next(state);
	}

	// public addDataObject(dataObject: ContentInterface) {
	// 	let isDuppie;
	// 	this.objects.forEach(element => {
	// 		if (dataObject.name === element.name) {
	// 			isDuppie = false;
	// 		}
	// 	})
	// 	if (isDuppie !== false) {
	// 		dataObject = {
	// 			guid: 'string',
	// 			isDeleted: false,
	// 			sizeBytes: 23253488,
	// 			name: dataObject.name,
	// 			sharing: 'Shared',
	// 			lastAccessedDate: new Date().toString()
	// 		}
	// 		this.objects.push(dataObject);
	// 		this.dataList.next(true);
	// 	}
	// }

	public showButtons(value) {
		this.toShowButtons.next(value);
	}

	// public sendFilter(filter) {
	// 	this.getDataList(filter);
	// }

	onChange(event, objects) {
		this.objects = objects;

		this.formObjects = <FormArray>this.objectsFormGroup.get('objects') as FormArray;

		if (event.checked) {
			this.formObjects.push(new FormControl(event.source.value))
		} else {
			const i = this.formObjects.controls.findIndex(x => x.value === event.source.value);
			this.formObjects.removeAt(i);
		}
		if (this.objectsFormGroup.value.objects.length >= 1) {
			this.showButtons(true);
		} else {
			this.showButtons(false);
		}

		this.theFiles = this.objectsFormGroup.value;

	}

	public deleteFiles(files) {
		this.objects = this.objects.filter((i) => (files.objects.indexOf(i) === -1));
		for (let object of files.objects) {
			object.isDeleted = true;
			console.log(object.name + ' is deleted', object.isDeleted);
		}
		this.objectsFormGroup.value.objects.length = 0;
		this.formObjects.controls = [];
		this._mainService.dataList.next(true);
		this.showButtons(false);
	}

	public restoreFiles(files) {
		this.objects = this.objects.filter((i) => (files.objects.indexOf(i) === -1));
		for (let object of files.objects) {
			object.isDeleted = false;
			console.log(object.name + ' is deleted', object.isDeleted);
		}
		this.objectsFormGroup.value.objects.length = 0;
		this.formObjects.controls = [];
		this._mainService.dataList.next(true);
		this.showButtons(false);
	}

	public changeTheState(files) {
		this.objects = this.objects.filter((i) => (files.objects.indexOf(i) === -1));
		for (let object of files.objects) {
			object.sharing = 'Sharerd';
		}
	}

}
