import { TestBed, inject } from '@angular/core/testing';

import { NotAnAppService } from './not-an-app.service';

describe('NotAnAppService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotAnAppService]
    });
  });

  it('should be created', inject([NotAnAppService], (service: NotAnAppService) => {
    expect(service).toBeTruthy();
  }));
});
