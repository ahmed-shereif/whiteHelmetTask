import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionTableComponent } from './attraction-table.component';

describe('AttractionTableComponent', () => {
  let component: AttractionTableComponent;
  let fixture: ComponentFixture<AttractionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttractionTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttractionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
