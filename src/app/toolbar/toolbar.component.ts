import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddDataComponent } from '../add-data/add-data.component'

@Component({
	selector: 'app-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.less']
})
export class ToolbarComponent{
	
	name: string;

	constructor(public dialog: MatDialog) { }

	openDialog(): void {
		let dialogRef = this.dialog.open(AddDataComponent, {
			width: '500px',
			data: { name: this.name }
		});
	  }
}
