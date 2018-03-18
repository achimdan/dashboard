import { Injectable } from '@angular/core';
import { DataService } from '../_services/data.service';
import { BehaviorSubject } from 'rxjs/Rx';
import { ContentInterface } from '../main-content/content-interface';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';

@Injectable()
export class ContentService {
	private _response : any;
	public objects: ContentInterface[];

	public dataList: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	observableData = this.dataList.asObservable();

	private toShowButtons: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	whatToShow = this.toShowButtons.asObservable();
	
	// private filters: BehaviorSubject<string> = new BehaviorSubject<string>('ALL');
	// filterFiles = this.filters.asObservable();

	private filters:string;

	objectsFormGroup : FormGroup;
	formObjects: any;

	theFiles = [];

	units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	constructor(private _dataService: DataService, private formBuilder: FormBuilder) {
		this.objectsFormGroup = this.formBuilder.group({
			objects: this.formBuilder.array([])
		});
	 }

	public niceBytes(x){
		let l = 0, n = parseInt(x, 10) || 0;
	  
		while(n >= 1024 && ++l)
			n = n/1024;
	  
		return(n.toFixed(n >= 10 || l < 1 ? 0 : 1) + ' ' + this.units[l]);
	}

	public getDataList(filter) {
		this.filters = filter || 'ALL';
		this._dataService
			.getAllData<ContentInterface>('../assets/data/data.json')
			.subscribe((data: ContentInterface) => this._response  = data,
				error => () => {
					console.log(error);
				},
				() => {
					if (this.filters === 'ALL') {
						this.objects = this._response.filter((object) => object.isDeleted === false );
					} else if (this.filters === 'DELETED') {
						this.objects = this._response.filter((object) => object.isDeleted === true );
					} else {
						const startDate = new Date('2018-03-09T03:57:32');
						const endDate = new Date();
						this.objects = this._response.filter((object) => {
							object.lastAccessedDate = new Date(object.lastAccessedDate);
							return object.lastAccessedDate >= startDate;
						});
					}
					console.log(this.objects);
					this.dataList.next(true);
				});
	}

	public addDataObject(dataObject: ContentInterface) {
		let isDuppie;
		this.objects.forEach(element => {
			if (dataObject.name === element.name) {
				isDuppie = false;
			}
		})
		if (isDuppie !== false) {
			dataObject = {
				guid: 'string',
				isDeleted: false,
				sizeBytes: 23253488,
				name: dataObject.name,
				sharing: 2,
				lastAccessedDate: new Date().toString()
			}
			this.objects.push(dataObject);
			this.dataList.next(true);
			console.log(this.objects);
		}
	}

	public showButtons(value) {
		this.toShowButtons.next(value);
	}

	public sendFilter(filter) {
		this.getDataList(filter);	
	}

	onChange(event) {

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
			object.isDeleted = true
		}
		this.objectsFormGroup.value.objects.length = 0;
		this.formObjects.controls = [];
		this.dataList.next(true);
		this.showButtons(false);
	}


}
