import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'FilterPipe'
})
export class FilterPipe implements PipeTransform {
	transform(value: any, input: string) {
		if (input.length >= 1) {
			input = input.toLowerCase();
			return value.filter(function (el: any) {
				return el.name.toLowerCase().indexOf(input) > -1;
			})
		} else {
			value = [];
		}
		console.log(value);
		return value;
	}
}
