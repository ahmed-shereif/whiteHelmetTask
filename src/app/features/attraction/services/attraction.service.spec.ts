import { TestBed } from '@angular/core/testing';
import { AttractionService } from './attraction.service';


describe('UserService', () => {
  let service: AttractionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttractionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
