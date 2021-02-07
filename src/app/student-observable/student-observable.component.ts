import { Component, Input, OnInit } from '@angular/core';
import { from, interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Student } from '../models/student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'student-observable',
  templateUrl: './student-observable.component.html',
  styleUrls: ['./student-observable.component.scss']
})
export class StudentObservableComponent implements OnInit {

  @Input()
  students: Student[];
  studentsNameByFrom: Observable<string>;
  timerValue: string;
  emails: Observable<string>;
  emailsByFrom: Observable<string>;
  studentsForObs: Student[];

  studentsName: Observable<string> = new Observable(obs => {
    for (var i = 0; i < this.students.length; i++) {
      obs.next(this.students[i].firstName);
    }
  })

  timer: Observable<string> = new Observable(obs => {
    setInterval(() => {
      obs.next((new Date().toLocaleTimeString()));
    }, 1000);
  })

  //i need to return next() without date and in the subsribe to put a new Date() ????
  // timerByOperator: Observable<string> = interval(1000).pipe(map(x=> {return new Date().toLocaleTimeString()}));
  timerByOperator: Observable<string> = interval(1000).pipe(map(x => { return new Date().toLocaleTimeString() }));

  constructor(private _studentService: StudentService) { }

  ngOnInit(): void {
    this.studentsName.subscribe(val => {
      console.log(val);

      this.studentsNameByFrom = from(this.students).pipe(map(x => {
        return x.firstName;
      }))

      this.studentsNameByFrom.subscribe(val => {
        console.log("by from:" + val)
      })

      this.emails = new Observable(obs => {
        for (var i = 0; i < this.students.length; i++) {
          if (this.students[i].active)
            obs.next("The email was sent successfully to " + this.students[i].email)
        }
      })
      this.emailsByFrom = from(this.students).pipe(map(x => {
        return "The email was sent successfully to " + x.email
      }))
    })
    this.timerByOperator.subscribe(val => {
      this.timerValue = val;
    })
    //how to do pipe with filter() and map() together ????
    this.studentsForObs = this.students.filter(x => {
      x.active;
    })
    this.emailsByFrom = from(this.studentsForObs).pipe(map(x => {
      return "The email was sent successfully to " + x.email
    }))


  }

  sendEmail() {
    this.emailsByFrom.subscribe(val => {
      alert(val);
    })
  }
}
