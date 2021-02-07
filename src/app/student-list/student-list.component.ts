import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { from, interval, Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { StudentService } from '../student.service';
import { map } from 'rxjs/operators'

@Component({
  selector: 'student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  students: Student[] = [];
  selectedStudent: Student;
  isLoad : boolean = false;
  @Output()
  public onShowStudent: EventEmitter<Student> = new EventEmitter();

  constructor(private _studentsService: StudentService) {
    _studentsService.getStudents().subscribe(data => {
      this.isLoad = true;
      this.students = data;
      this._studentsService.getAverage(this.students);
       
      // this.students.forEach(element => {
      //  let res =  _studentsService.getAverage(element.idStudent, this.students);
      //   debugger; 
      //  console.log("getAverage" , res);
      // });
    }, err => { });
  }
      


  ngOnInit(): void {
  }

  showDetails(studentToShow: Student) {
    this.selectedStudent = studentToShow;
    console.log("selectedStudent", this.selectedStudent);
    this.onShowStudent.emit(this.selectedStudent);
  }

  deleteStudent(student: Student) {
    let indexToDelete = this.students.indexOf(student)
    this.students.splice(indexToDelete, 1)
  }

  showNewStudentDetails() {
    this.selectedStudent = new Student(0, "");
  }

  ShowStudentsByActive(active: boolean) {
    this._studentsService.getStudentsByActive(active).subscribe(data => {
      this.students = data;
    },err=> alert(err.message))
  }

  saveStudentToList(studentToSave: Student) {
    if (this.students.find(x => x.idStudent == studentToSave.idStudent)) {
      let studentToUpdate = this.students.filter(x => x.idStudent == studentToSave.idStudent)[0]
      console.log("studentToSave: " + JSON.stringify(studentToSave) + " studentToUpdate: " + JSON.stringify(studentToUpdate))
      this._studentsService.updateStudent({ id: studentToUpdate.idStudent, student: studentToSave }).subscribe(data => {
        if (data) {
          alert("The changes saved successfully");
        }
        else
          alert("saved failed");
      }, err => alert(err.message)
      );
      let index = this.students.indexOf(studentToUpdate);
      this.students[index] = studentToSave;
    }
    else {
      this._studentsService.addStudent(studentToSave).subscribe(data => {
        if (data) {
          alert("The student saved successfully " + studentToSave.firstName)
        }
        else
          alert("savad failed")
      }, err => alert(err.message)
      );
      this.students.push(studentToSave);
    }
    this.selectedStudent = null;
  }

}
