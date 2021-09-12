// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from 'src/app/models/entities/Image';
import { EntityDataHttpApiService } from '../entity-data.http-api.abstract.service';
import { IEntityDataApiService } from '../../entity.data-api.iservice';

@Injectable()
export class ImagesDataHttpApiService
  extends EntityDataHttpApiService
  implements IEntityDataApiService<Image> {

  baseUrl = `${super.baseUrl}/images`;

  constructor(http: HttpClient) {
    super(http);
  }

  public create(instance: Image): Observable<number> {
    return this.http.post<number>(
      this.baseUrl,
      instance
    );
  }

  public readById(id: number): Observable<Image> {
    return this.http.get<Image>(
      `${this.baseUrl}/${id}`
    );
  }

  public readAll(): Observable<Image[]> {
    return this.http.get<Image[]>(
      this.baseUrl
    );
  }

  public readFiltered(filters: any): Observable<Image[]> {
    return this.http.get<Image[]>(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: filters })
      }
    );
  }

  public update(instance: Image, id: number): Observable<number> {
    return this.http.put<number>(
      `${this.baseUrl}/${id}`,
      instance
    );
  }

  public deleteById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.baseUrl}/${id}`
    );
  }
}
