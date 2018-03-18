import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger, state } from '@angular/animations';
import { FormControl } from '@angular/forms';
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

	constructor(private _contentService: ContentService, ) {
	}


	ngOnInit() {

	}
}