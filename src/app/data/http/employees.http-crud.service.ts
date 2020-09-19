import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/data/models/entities/Employee';
import { EntityHttpCrudService } from './entity.http-crud.aservice';
import { EntityCrudIService } from '../entity.crud.iservice';

@Injectable()
export class EmployeesHttpCrudService
  extends EntityHttpCrudService
  implements EntityCrudIService<Employee> {

  constructor(
    protected http: HttpClient
  ) {
    super();
  }

  public create(employee: Employee): Observable<number> {
    return this.http.post<number>(
      `${this.baseURI}/employee`,
      employee
    );
  }

  public readById(id: number): Observable<Employee> {
    return this.http.get<Employee>(
      `${this.baseURI}/employee/${id}`
    );
  }

  public readAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      `${this.baseURI}/employees`
    );
  }

  public readFiltered(filters: any): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      `${this.baseURI}/employees`,
      this.httpParamsOf(filters)
    );
  }

  public update(employee: Employee, id: number): Observable<number> {
    return this.http.put<number>(
      `${this.baseURI}/employee/${id}`,
      employee
    );
  }

  public deleteById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.baseURI}/employee/${id}`
    );
  }
}
