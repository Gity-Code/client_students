import { Test } from './test.model';

export class Student{
    idStudent: number;
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    active: boolean;
    average: number;// לאתחל בממוצע הציונים
    leavingDate?: Date;
    tests?: Test[];
    professionId?: number;
    year?: Year;
    email?: string;

    constructor(idStudent: number, firstName: string){
        this.idStudent = idStudent;
        this.firstName = firstName;
    }
}

export enum Year{
    A,
    B,
    C
}