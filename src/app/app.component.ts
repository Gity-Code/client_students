import { Component, EventEmitter, Output } from '@angular/core';
import { Student } from './models/student.model';
import { Test } from './models/test.model';
import { StudentService } from './student.service';

@Component({
    templateUrl: "./app.Component.html",
    selector: "app-root"
})
export class AppComponent {

    studentsList: Student[];
    tests: Test[] = [];
    constructor(private _studentService: StudentService) {
        _studentService.getStudents().subscribe((data) =>
            this.studentsList = data
            // console.log("data from server getStudents" ,this.studentsList )
        );
        console.log("data from server getStudents", this.studentsList)
    }

    // showTestsList(currentStudent: Student) {
    //     this.id = currentStudent.idStudent;
    //     this._studentService.getStudents().subscribe(data => {
    //         this.studentsList = data;
    //         students => {
    //             let student = students.filter(x => x.idStudent == this.id)[0];
    //             if (student != null)
    //                 this.tests = student.tests;
    //         }
    //     })
    // }
    showTestsList(currentStudent: Student) {
        let student = this.studentsList.filter(x => x.idStudent == currentStudent.idStudent)[0];
        if (student != null)
            this.tests = student.tests;
    }
}
