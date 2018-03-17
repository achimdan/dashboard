import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { trigger, style, transition, animate, keyframes, query, stagger, state } from '@angular/animations';
import { FormControl } from '@angular/forms';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

import { ContentService } from './main-content/content-service';

export class State {
	constructor(public name: string, public population: string, public flag: string) { }
}

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less'],
	animations: [
		trigger('slideLeftRight', [
			state('in', style({ 'grid-template-columns': '100px auto' })),
			state('out', style({ width: '*' })),
			transition('in => out', animate('300ms ease-in-out')),
			transition('out => in', animate('300ms ease-in-out'))
		])
	]
})
export class AppComponent implements OnInit {

	private myControl: FormControl = new FormControl();
	private objects: any;
	private filter: string;
	private styleHeight: any
	private filteredOptions: Observable<string[]>;
	public options = {
		position: ["top", "right"],
		timeOut: 5000,
		lastOnBottom: true
	}

	constructor(private _contentService: ContentService, ) {
		this.filteredOptions = this.myControl.valueChanges
			.pipe(
				startWith(''),
				map(val => this.filterValues(val))
			);
	 }


	ngOnInit() {
		this.styleHeight = window.innerHeight - 90 + 'px';
		this._contentService.filterFiles.subscribe(
			value => {
				this.filter = value;
				this._contentService.dataList.next(true);
			}
		);
		this._contentService.dataList
			.subscribe(
				values => {
					if (values) {
						this.objects = this._contentService.objects;
					}
				}
			);

	}

	filterValues(val: string): string[] {
		return this.objects.filter(option =>
			option.toLowerCase().indexOf(val.toLowerCase()) === 0);
	}

	onResize(event: any) {
		this.styleHeight = event.target.innerHeight - 90 + 'px';
	}

}