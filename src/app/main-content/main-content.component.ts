import { Component, OnInit, ViewChild } from '@angular/core';
import { ContentService } from './content-service'
import { ContentInterface } from '../main-content/content-interface';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
	selector: 'main-content',
	templateUrl: './main-content.component.html',
	styleUrls: ['./main-content.component.less']
})
export class MainContentComponent implements OnInit {
	
	@ViewChild(MatSort) sort: MatSort;
	
	private objects: any;
	
	displayedColumns = ['name', 'lastAccessedDate', 'sharing', 'sizeBytes'];
	dataSource:any;

	constructor(private _contentService: ContentService) { }

	ngOnInit() {

		this._contentService.getDataList();
		this._contentService.dataList
			.subscribe(
				values => {
					if (values) {
						this.objects = this._contentService.objects;
						this.dataSource = new MatTableDataSource(this.objects);
						this.dataSource.sort = this.sort;	
						this._contentService.dataList.next(false);
					}
				}
			);
	}

}