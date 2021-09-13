// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpApiService } from './http-api.abstract.service';
import { DataPage } from 'src/app/models/DataPage';
import { Observable } from 'rxjs';

export abstract class EntityDataHttpApiService<T>
  extends HttpApiService {

  baseUrl = environment.apiUrls.data;

  constructor(http: HttpClient, urlSuffix?: string) {
    super(http);
    if (urlSuffix) {
      this.baseUrl += urlSuffix;
    }
  }

  abstract fetchExisting(itemLike: Partial<T>): Observable<T>;

  fetchPage() {
    return this.http.get<DataPage<T>>(
      this.baseUrl
    );
  }

  fetchPageFilteredBy(filters: any) {
    return this.http.get<DataPage<T>>(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: filters })
      }
    );
  }

}
