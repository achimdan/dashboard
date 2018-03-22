import { Component, OnInit } from '@angular/core';
import { ContentService } from '../main-content/content-service';
import { FormsModule } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';

import {FilterPipe} from '../filter.pipe';

import { MainServiceService } from '../_services/main-service.service';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {

	constructor(private _contentService: ContentService, private _mainService: MainServiceService) {}

	ngOnInit() {
		// this._contentService.observableData
		// 	.subscribe(values => {
		// 		this.objects = this._contentService.objects
		// 	});
	}

	// search(keyword) {
	// 	this._contentService.filterResults(keyword);
	// }
	search(keyword) {
		this._mainService.filterResults(keyword);
	}

	searchedObj(object) {
		console.log(object);
	}

}
