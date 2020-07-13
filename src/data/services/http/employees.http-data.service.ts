import { Injectable } from '@angular/core';
import { HttpService } from 'src/data/services/http/http.abstract-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from 'src/data/models/entities/Employee';
import { retry, map } from 'rxjs/operators';
import { EntityDataIService } from '../entity.data.iservice';

@Injectable()
export class EmployeesHttpDataService
  extends HttpService
  implements EntityDataIService<Employee> {

  protected baseURI = this.baseURI + '/gestion/empleados';

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
  update(emp: Employee, id: string | number): Observable<Employee> {
    throw new Error('Method not implemented.');
  }

  public readAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      this.baseURI
    ).pipe(
      retry(2)
    );
  }

  public create(emp: Employee): Observable<Employee> {
    return this.http.post<number>(
      this.baseURI + '/guardar',
      emp
    ).pipe(
      map(id => {
        emp.id = id;
        return emp;
      })
    );
  }

  public deleteById(idEmpleado: number): Observable<boolean> {
    return this.http.post<boolean>(
      this.baseURI + '/borrar',
      idEmpleado
    );
  }
}
