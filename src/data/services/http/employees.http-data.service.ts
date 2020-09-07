import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Employee } from 'src/data/models/entities/Employee';
import { HttpService } from 'src/data/services/http/http.abstract-service';
import { EntityDataIService } from '../entity.data.iservice';

@Injectable()
export class EmployeesHttpDataService
  extends HttpService
  implements EntityDataIService<Employee> {

  constructor(
    protected http: HttpClient
  ) {
    super();
  }
  readById(id: string | number): Observable<Employee> {
    throw new Error('Method not implemented.');
  }
  readFiltered(f: any): Observable<Employee[]> {
    throw new Error('Method not implemented.');
  }
  update(emp: Employee, id: string | number): Observable<number> {
    throw new Error('Method not implemented.');
  }

  public readAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      this.baseURI + '/employees'
    ).pipe(
      retry(2)
    );
  }

  public create(employee: Employee): Observable<number> {
    return this.http.post<number>(
      this.baseURI + '/employee',
      employee
    );
  }

  public deleteById(employeeId: number): Observable<boolean> {
    return this.http.delete<boolean>(
      this.baseURI + `/employee/${employeeId}`
    );
  }
}
