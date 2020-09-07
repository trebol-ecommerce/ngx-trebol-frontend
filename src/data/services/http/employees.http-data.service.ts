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

  public create(employee: Employee): Observable<number> {
    return this.http.post<number>(
      this.baseURI + '/employee',
      employee
    );
  }

  public readById(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(
      this.baseURI + `/employee/${employeeId}`
    );
  }

  public readAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      this.baseURI + '/employees'
    );
  }

  public readFiltered(filters: any): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      this.baseURI + '/employees',
      this.httpParamsOf(filters)
    );
  }

  public update(employee: Employee, employeeId: number): Observable<number> {
    return this.http.put<number>(
      this.baseURI + `/employee/${employeeId}`,
      employee
    );
  }

  public deleteById(employeeId: number): Observable<boolean> {
    return this.http.delete<boolean>(
      this.baseURI + `/employee/${employeeId}`
    );
  }
}
