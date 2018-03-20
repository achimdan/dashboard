import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger, state } from '@angular/animations';

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

	constructor() {}

	ngOnInit() {}
}