import { Component, Inject, OnInit } from '@angular/core';
import { ContentService } from '../main-content/content-service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddDataComponent } from '../add-data/add-data.component'

@Component({
	selector: 'app-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.less']
})
export class ToolbarComponent implements OnInit {

	name: string;
	isShow: boolean = true;
	isResored: boolean = false;
	state: string;

	constructor(public dialog: MatDialog, private _contentService: ContentService) { }

	ngOnInit() {
		this._contentService.viewState.subscribe( state => {
			this.state = state
			console.log(this.state);
			if (this.state !== 'DELETED') {
				this._contentService.whatToShow.subscribe( isShow => this.isShow = isShow);
				this.isResored = false;
			} else {
				this._contentService.whatToShow.subscribe( isShow => this.isShow = false);
				this.isResored = true;
			}
		});
	}

	newFile() {
		let dialogRef = this.dialog.open(AddDataComponent, {
			width: '500px',
			data: { name: this.name }
		});
	}

	deleteFiles() {
		this._contentService.deleteFiles(this._contentService.theFiles);
	}
	
	restoreFiles() {
		this._contentService.restoreFiles(this._contentService.theFiles);
	}
	
	changeState() {
		this._contentService.changeTheState(this._contentService.theFiles);
	}
}
