// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpApiService } from './http-api.abstract.service';
import { DataPage } from 'src/app/models/DataPage';

export abstract class ReadOnlyEntityDataHttpApiService<T>
  extends HttpApiService {

  baseUrl = environment.apiUrls.data;

  constructor(http: HttpClient) {
    super(http);
  }

  readById(id: number) {
    return this.http.get<T>(
      `${this.baseUrl}/${id}`
    );
  }

  readAll() {
    return this.http.get<DataPage<T>>(
      this.baseUrl
    );
  }

  readFiltered(filters: any) {
    return this.http.get<DataPage<T>>(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: filters })
      }
    );
  }

}
