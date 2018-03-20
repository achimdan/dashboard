import { Component, OnInit } from '@angular/core';
import { ContentService } from '../main-content/content-service';

import { Subject } from 'rxjs/Subject';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {

	// searchTerm: any;
	results: Object;

	constructor(private _contentService: ContentService) { }

	searchTerm(key) {
		this._contentService
			.search(key)
			.subscribe({
				next: function (value) {
					console.log(value)
				}
			})
	}

	ngOnInit() {
	}

}
