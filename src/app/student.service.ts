import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from './models/student.model';
import { Test } from './models/test.model';

const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
headers.append('Accept', 'application/json');
const STUDENTS = []

@Injectable()
export class StudentService {

    students: Student[] = [];
    public tests: Test[] = [];

    constructor(private _http: HttpClient) {
    }

    getStudents(): Observable<Student[]> {
        return this._http.get<Student[]>("/api/Students");
    }

    addStudent(student: Student): Observable<boolean> {
        return this._http.post<boolean>("/api/Students", student);
    }

    updateStudent({ id, student }: { id: number; student: Student; }): Observable<boolean> {
        return this._http.put<any>("/api/Students/" + id,
            {
                student: student
            }, { headers: headers }
        );
    }

    getStudentsByActive(active: boolean): Observable<Student[]> {
        return this._http.get<Student[]>("/api/Students/?active=" + active);
    }

    getStudentsByPromise(): Promise<Student[]> {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res(STUDENTS);
            }, 1000);
        })
    }

    getAverage(students) {
        // let student = this.students.filter(x => x.idStudent == idStudent)[0];
        let student = students.filter(x => x.idStudent)[0];
        let sum = 0;
        debugger;
        for (let i = 0; i < student.tests.length; i++) {
            sum = sum + student.tests[i].grade;
            // sum += student.tests[i].grade;
        }
        //   sum/student.tests.length;
        student.average = sum;
        return sum;
        // return sum/student.tests.length;
    }
}
