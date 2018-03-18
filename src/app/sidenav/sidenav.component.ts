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
	selectedButton: any;
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
				id: 3,
				name: 'Recycle bin',
				icon: 'fas fa-angle-right',
				filter: 'DELETED'
			}
		];

		this.filterFiles(this.navigation[0]);
	}

	filterFiles(button: any) {
		this._contentService.showButtons(false);
		this.selectedButton = button;
		this._contentService.sendFilter(button.filter || 'ALL');
		this._contentService.changeState(button.filter);
	}


}
