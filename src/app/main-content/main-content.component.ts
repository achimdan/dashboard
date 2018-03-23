import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { ContentService } from './content-service';
import { ContentInterface } from '../main-content/content-interface';
import { MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { MainServiceService } from '../_services/main-service.service';

@Component({
	selector: 'main-content',
	templateUrl: './main-content.component.html',
	styleUrls: ['./main-content.component.less']
})
export class MainContentComponent implements OnInit {

	@ViewChild(MatSort) sort: MatSort;

	private objects: any;
	private filter: string;
	private _response: any;

	displayedColumns = ['select', 'name', 'lastAccessedDate', 'sharing', 'sizeBytes'];
	dataSource: any;
	selection = new SelectionModel<any>(true, []);

	objectsFormGroup: FormGroup;


	constructor(private _mainService: MainServiceService, private _contentService: ContentService, private formBuilder: FormBuilder) { }

	ngOnInit() {

		this._mainService.viewState
			.subscribe(filter => this.filter = filter)

		this._mainService.observableData
			.subscribe(data => {
				if (data) {
					this.objects = this._response;
					if (this.filter === 'ALL') {
						this.objects = this._response.filter((object) => object.isDeleted === false);
						// return this._response = this._response.filter((object) => object.isDeleted === false);
					} else if (this.filter === 'DELETED') {
						this.objects = this._response.filter((object) => object.isDeleted === true);
					} else {
						// const startDate = new Date('2018-03-22T03:57:32');
						const startDate = new Date();
						startDate.setDate(startDate.getDate() - 1);
						this.objects = this._response.filter((object) => {
							object.lastAccessedDate = new Date(object.lastAccessedDate);
							return object.lastAccessedDate >= startDate;
						});
					}
					this.dataSource = new MatTableDataSource(this.objects);
					this.dataSource.sort = this.sort;
				}
			})


		this._mainService.getDataList(this.filter)
			.subscribe((data: any) => this._response = data,
				error => () => {
					console.log(error);
				},
				() => {
					this.objects = this._response.filter((object) => object.isDeleted === false);
					this.dataSource = new MatTableDataSource(this.objects);
					this.dataSource.sort = this.sort;
				});


		this._mainService.castKeyValue
			.subscribe( key => {
				if (key) {
					let cloned = this.objects.map(x => Object.assign({}, x));
	
					if (key.length >= 1) {
						key = key.toLowerCase();
						cloned = cloned.filter(function (el: any) {
							return el.name.toLowerCase().indexOf(key) > -1;
						})
						this.dataSource = new MatTableDataSource(cloned);
					} 

				} else {
					this.dataSource = new MatTableDataSource(this.objects);
				}
				this.dataSource.sort = this.sort;
				console.log(this.dataSource);
			})

		this._mainService.viewObject
		.subscribe((dataObject: any) => {
			if (dataObject) {
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
						sharing: 'Shared',
						lastAccessedDate: new Date().toString()
					}
					this._response.push(dataObject);
					this._mainService.dataList.next(true);
				}
			}
		})
	}

	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	}

	toggleAll() {
		this.isAllSelected() ?
			this.selection.clear() :
			this.dataSource.data.forEach(row => this.selection.select(row));
	}

	onChange(event) {
		this._contentService.onChange(event, this.objects);
	}
	

}