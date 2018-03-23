import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs/Rx';

import { MainServiceService } from '../_services/main-service.service';

@Component({
	selector: 'app-add-data',
	templateUrl: './add-data.component.html',
	styleUrls: ['./add-data.component.less']
})
export class AddDataComponent {

	public dataObject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(
		public dialogRef: MatDialogRef<AddDataComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private _mainService: MainServiceService) { }

	sendData(data) {
		if (data.name) {
			// this._mainService.addDataObject(data);
			// this._mainService.dataList.next(true);
			this._mainService.objectToFiles.next(data);
			this.onNoClick()
		}
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

}
