import { Component, Input, OnInit } from '@angular/core';
import { Student } from '../models/student.model';
import { Test } from '../models/test.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'test-history-list',
  templateUrl: './test-history-list.component.html',
  styleUrls: ['./test-history-list.component.scss']
})
export class TestHistoryListComponent implements OnInit {

  average: number;
  @Input() 
  testsToShow: Test[];
  //  students[] : Student[] ; 
  constructor(){

  //// this.students = _studentService.getStudents(); 
  //  this.average =   _studentService.getAverage(_studentService.getStudents());
    // this.average =   _studentService.getAverage(_studentService.getStudents());
    //  _studentService.getStudents();

  }
  // constructor(private _studentService: StudentService) {
  //   if(this.testsToShow != null){
  //     this.average = _studentService.getAverage();
  //   }
  // }

  ngOnInit(): void {
  }

}
