import { TestBed } from '@angular/core/testing';
import { EntityDataApiIService } from 'src/app/api/entity-data-api.iservice';
import { Image } from 'src/app/models/entities/Image';
import { ImagesService } from './images.service';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { of, concat } from 'rxjs';
import { take, takeLast } from 'rxjs/operators';

describe('ImagesService', () => {
  let service: ImagesService;
  let mockDataService: Partial<EntityDataApiIService<Image>>;

  beforeEach(() => {
    mockDataService = {
      readAll() { return of([]); }
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: API_SERVICE_INJECTION_TOKENS.imagesCrud, useValue: mockDataService }
      ]
    });
  });

  it('should be created', () => {
    service = TestBed.inject(ImagesService);
    expect(service).toBeTruthy();
  });

  it('should cache images after creation and expose an observable of its cache array', () => {
    service = TestBed.inject(ImagesService);
    service.images$.pipe(
      take(1)
    ).subscribe(
      payload => {
        expect(payload).toBeTruthy();
      }
    );
  });

  it('should re-cache after calling fetch()', () => {
    const exampleImageArray: Image[] = [ { url: 'fake', filename: 'example', id: 'fake' } ];
    mockDataService = {
      readAll() { return of(exampleImageArray); }
    };
    TestBed.overrideProvider(API_SERVICE_INJECTION_TOKENS.imagesCrud, { useValue: mockDataService });
    service = TestBed.inject(ImagesService);

    concat(
      service.fetch(),
      service.images$.pipe(take(1))
    ).pipe(
      takeLast(1)
    ).subscribe(
      payload => {
        expect(payload).toEqual(exampleImageArray);
      }
    );

  });
});
