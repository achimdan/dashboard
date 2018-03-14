import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { trigger, style, transition, animate, keyframes, query, stagger, state } from '@angular/animations';
import { FormControl } from '@angular/forms';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

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
	stateCtrl: FormControl;
	filteredStates: Observable<any[]>;

	states: State[] = [
		{
			name: 'Arkansas',
			population: '2.978M',
			// https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
			flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
		},
		{
			name: 'California',
			population: '39.14M',
			// https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
			flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
		},
		{
			name: 'Florida',
			population: '20.27M',
			// https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
			flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
		},
		{
			name: 'Texas',
			population: '27.47M',
			// https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
			flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
		}
	];
	
	styleHeight: any

	public options = {
		position: ["top", "right"],
		timeOut: 5000,
		lastOnBottom: true
	}

	constructor() {
		this.stateCtrl = new FormControl();
		this.filteredStates = this.stateCtrl.valueChanges
			.pipe(
				startWith(''),
				map(state => state ? this.filterStates(state) : this.states.slice())
			);
	}

	filterStates(name: string) {
		return this.states.filter(state =>
			state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
	}

	ngOnInit() {
		this.styleHeight = window.innerHeight - 90 + 'px'
	}

	onResize(event: any) {
		this.styleHeight = event.target.innerHeight - 90 + 'px'
	}

}