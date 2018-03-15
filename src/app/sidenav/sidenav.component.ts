import { Component, OnInit, Input } from '@angular/core';
import { ContentService } from '../main-content/content-service';

@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.less']
})
export class SidenavComponent implements OnInit {

	@Input() displayFromParent = true
	navigation: Array<{}>

	constructor(private _contentService: ContentService) { }

	ngOnInit() {
		this.navigation = [
			{
				id: 1,
				name: 'All',
				icon: 'fas fa-angle-right',
				filter: 'ALL'
			},{
				id: 2,
				name: 'Accessed Last Day',
				icon: 'fas fa-angle-right',
				filter: 'DATE'
			},{
				id: 2,
				name: 'Recycle bin',
				icon: 'fas fa-angle-right',
				filter: 'DELETED'
			}
		];
	}

	filterFiles(filter) {
		this._contentService.sendFilter(filter || 'ALL');
	}

}
