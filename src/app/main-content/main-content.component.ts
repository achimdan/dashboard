import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { ContentService } from './content-service';
import { ContentInterface } from '../main-content/content-interface';
import { MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
	selector: 'main-content',
	templateUrl: './main-content.component.html',
	styleUrls: ['./main-content.component.less']
})
export class MainContentComponent implements OnInit {

	@ViewChild(MatSort) sort: MatSort;

	private objects: any;
	private selectedRows:any = [];
	private filter: string;

	displayedColumns = ['select', 'name', 'lastAccessedDate', 'sharing', 'sizeBytes'];
	dataSource: any;
	selection = new SelectionModel<any>(true, []);

	objectsFormGroup : FormGroup;

	constructor(private _contentService: ContentService, private formBuilder: FormBuilder) { }

	ngOnInit() {
		this._contentService.filterFiles.subscribe(
			value => {
				this.filter = value;
				console.log(value);
				this._contentService.dataList.next(true);
			}
		);
		this._contentService.getDataList(this.filter);
		this._contentService.dataList
			.subscribe(
				values => {
					if (values) {
						this.objects = this._contentService.objects;

						if (this.objects) {
							this.objects.forEach((each, index) => {
								each.sizeBytes = this._contentService.niceBytes(each.sizeBytes);
								if (this.filter === 'DELETED') {
									if (each.isDeleted === true) {
										this.objects.splice(index, 1);
									}
								} else if (this.filter === 'DATE') {
									if (each.isDeleted === true) {
										this.objects.splice(index, 1);
									}
								}
								if (each.sharing === 1) each.sharing = 'Public';
								else if (each.sharing === 2) each.sharing = 'Sharerd';
								else each.sharing = 'Private'
							})
						}


						this.dataSource = new MatTableDataSource(this.objects);
						this.dataSource.sort = this.sort;
						this._contentService.dataList.next(false);
					}
				}
			);

		this.objectsFormGroup = this.formBuilder.group({
			objects: this.formBuilder.array([])
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

		// const objects = <FormArray>this.objectsFormGroup.get('objects') as FormArray;

		// if (event.checked) {
		// 	objects.push(new FormControl(event.source.value))
		// } else {
		// 	const i = objects.controls.findIndex(x => x.value === event.source.value);
		// 	objects.removeAt(i);
		// }
		// if (this.objectsFormGroup.value.objects.length >= 1) {
		// 	this._contentService.showButtons(true);
		// } else {
		// 	this._contentService.showButtons(false);
		// }

		// this._contentService.theFiles = this.objectsFormGroup.value;

	}

}