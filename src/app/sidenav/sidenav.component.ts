import { Component, OnInit, Input } from '@angular/core';
import { ContentService } from '../main-content/content-service';
import { MainServiceService } from '../_services/main-service.service';

@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.less']
})
export class SidenavComponent implements OnInit {

	@Input() displayFromParent = true
	navigation: Array<{}>
	selectedButton: any;
	constructor(private _mainService: MainServiceService ,private _contentService: ContentService) { }

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

		this.filterFiles(this.navigation[0],'firstLoading');
		// this._mainService.observableData.subscribe( data => {
		// 	console.log(data)
		// })
	}

	filterFiles(button: any,firstLoading: string) {
		this._contentService.showButtons(false);
		this.selectedButton = button;
		this._contentService.changeState(button.filter);
		this._mainService.changeState(button.filter, firstLoading);
	}


}
