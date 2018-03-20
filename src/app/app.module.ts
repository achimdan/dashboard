import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
//FORMS
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MainContentComponent } from './main-content/main-content.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';

import { ContentService } from './main-content/content-service';
import { DataService } from './_services/data.service';
import { AddDataComponent } from './add-data/add-data.component';
import { SearchComponent } from './search/search.component';

@NgModule({
	declarations: [
		AppComponent,
		SidenavComponent,
		ToolbarComponent,
		MainContentComponent,
		AddDataComponent,
		SearchComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,

		MatButtonModule,
		MatMenuModule,
		MatIconModule,
		MatAutocompleteModule,
		MatFormFieldModule,
		MatInputModule,
		MatDialogModule,
		MatTableModule,
		MatCheckboxModule,
		MatSortModule,
		MatSelectModule
	],
	entryComponents: [
		AddDataComponent,
	],
	providers: [ContentService,DataService],
	bootstrap: [AppComponent]
})
export class AppModule { }
