
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { APP_PROFESSIONS, Profession } from '../models/profession.model';
import { Student } from '../models/student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {
  
  @Input()
  public set student(value: Student) {
    this._student = value;
    if (this._student != undefined) {
      this.studentForm = new FormGroup({
        "idStudent": new FormControl(this.student.idStudent, [Validators.minLength(9), Validators.maxLength(9), Validators.required]),
        "firstName": new FormControl(this.student.firstName, Validators.required),
        "lastName": new FormControl(this.student.lastName, Validators.required),
        "address": new FormControl(this.student.address),
        "phone": new FormControl(this.student.phone, Validators.required),
        "active": new FormControl(this.student.active, Validators.required),
        "leavingDate": new FormControl(this.student.leavingDate),
        "tests": new FormControl(this.student.tests),
        "professionId": new FormControl(this.student.professionId),
        "year": new FormControl(this.student.year, Validators.required),
        "email": new FormControl(this.student.email),
        "average": new FormControl(this.student.average)
      })
    }
  }

  @Output()
  onSaveStudent: EventEmitter<Student> = new EventEmitter();

  studentForm: FormGroup
  private _student: Student = new Student(0, '');
  professionsList: Profession[] = APP_PROFESSIONS;

  constructor() {  
  }

  ngOnInit(): void {
  }

  public get student(): Student {
    return this._student
  }

  saveNewStudent() {
    this.student = this.studentForm.value;
    this.onSaveStudent.emit(this.student);
    this.studentForm.dirty
    
  }
}
