import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component';
import { StudentListComponent } from './student-list/student-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentDetailsComponent } from "./student-details/student-details.component";
import { TestHistoryListComponent } from './test-history-list/test-history-list.component';
import { StudentService } from './student.service';
import { HttpClientModule } from '@angular/common/http';
import { StudentObservableComponent } from './student-observable/student-observable.component';

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule,HttpClientModule],
    declarations: [AppComponent, StudentListComponent, StudentDetailsComponent, TestHistoryListComponent, StudentObservableComponent],
    providers: [StudentService],
    bootstrap: [AppComponent]
})
export class AppModule {

}