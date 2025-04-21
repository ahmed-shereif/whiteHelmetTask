import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionPageComponent } from './attraction-page.component';

describe('AttractionPageComponent', () => {
  let component: AttractionPageComponent;
  let fixture: ComponentFixture<AttractionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttractionPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttractionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
