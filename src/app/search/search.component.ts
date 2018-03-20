import { Component, OnInit } from '@angular/core';
import { ContentService } from '../main-content/content-service';
import { FormsModule } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';

import {FilterPipe} from '../filter.pipe'

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {

	isShow = false;
	filter: string;
	objects: any;

	constructor(private _contentService: ContentService) {}

	ngOnInit() {
		// this._contentService.getDataList('SEARCH');
		this._contentService.observableDataSearch
			.subscribe(values => {
				this.objects = this._contentService.objects
			});
	}

	search(keyword) {
		if (keyword.length > 0) {
			this.isShow = true;
		} else {
			this.isShow = false;
		}
	}

	searchedObj(object) {
		console.log(object);
	}

}
