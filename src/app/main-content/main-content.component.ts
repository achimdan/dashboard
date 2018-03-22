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

	displayedColumns = ['select', 'name', 'lastAccessedDate', 'sharing', 'sizeBytes'];
	dataSource: any;
	selection = new SelectionModel<any>(true, []);

	objectsFormGroup: FormGroup;

	_response: any;
	constructor(private _mainService: MainServiceService, private _contentService: ContentService, private formBuilder: FormBuilder) { }

	ngOnInit() {
		// this._contentService.getDataList(this.filter || 'ALL');
		// this._contentService.observableData
		// 	.subscribe(
		// 		values => {
		// 			if (values) {
		// 				this.objects = this._contentService.objects;
		// 				this.dataSource = new MatTableDataSource(this.objects);
		// 				this.dataSource.sort = this.sort;
		// 			}
		// 		}
		// 	);

		// this.objectsFormGroup = this.formBuilder.group({
		// 	objects: this.formBuilder.array([])
		// });

		this._mainService.getDataList()
			.subscribe((data: any) => this._response = data,
				error => () => {
					console.log(error);
				},
				() => {
					this.objects = this._response;
					this.dataSource = new MatTableDataSource(this.objects);
					this.dataSource.sort = this.sort;
				});

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
		this._contentService.onChange(event);
	}

}