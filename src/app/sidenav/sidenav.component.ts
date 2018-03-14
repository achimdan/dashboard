import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.less']
})
export class SidenavComponent implements OnInit {

	@Input() displayFromParent = true
	navigation: Array<{}>

	constructor() { }

	ngOnInit() {
		this.navigation = [
			{
				id: 1,
				name: 'All',
				icon: 'fas fa-angle-right'
			},{
				id: 2,
				name: 'Accessed Last Day',
				icon: 'fas fa-angle-right'
			},{
				id: 2,
				name: 'Recycle bin',
				icon: 'fas fa-angle-right'
			}
		];
	}

}
