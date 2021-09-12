// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from 'src/app/models/entities/Image';
import { EntityDataHttpApiService } from '../entity-data.http-api.abstract.service';
import { IEntityDataApiService } from '../../entity.data-api.iservice';

@Injectable()
export class ImagesDataHttpApiService
  extends EntityDataHttpApiService
  implements IEntityDataApiService<Image> {

  constructor(
    protected http: HttpClient
  ) {
    super();
    this.baseURI = `${this.baseURI}/images`;
  }

  public create(instance: Image): Observable<number> {
    return this.http.post<number>(
      this.baseURI,
      instance
    );
  }

  public readById(id: number): Observable<Image> {
    return this.http.get<Image>(
      `${this.baseURI}/${id}`
    );
  }

  public readAll(): Observable<Image[]> {
    return this.http.get<Image[]>(
      this.baseURI
    );
  }

  public readFiltered(filters: any): Observable<Image[]> {
    return this.http.get<Image[]>(
      this.baseURI,
      this.httpParamsOf(filters)
    );
  }

  public update(instance: Image, id: number): Observable<number> {
    return this.http.put<number>(
      `${this.baseURI}/${id}`,
      instance
    );
  }

  public deleteById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.baseURI}/${id}`
    );
  }
}
