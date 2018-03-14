import { Injectable } from '@angular/core';
import { DataService } from '../_services/data.service';
import { BehaviorSubject } from 'rxjs/Rx';
import { ContentInterface } from '../main-content/content-interface';

@Injectable()
export class ContentService {
	private _response : any;
	public objects: ContentInterface[];

	public dataList: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(private _dataService: DataService) { }

	public getDataList() {
		this._dataService
			.getAllData<ContentInterface>('../assets/data/data.json')
			.subscribe((data: ContentInterface) => this._response  = data,
				error => () => {
					console.log(error);
				},
				() => {
					this.objects = this._response;
					
					// maybe another method 
					this.objects.forEach(each => {
						if(each.sharing === 1) each.sharing = 'Public';
						else if (each.sharing === 2) each.sharing = 'Sharerd';
						else each.sharing = 'Private'
					})

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


}
